// LiteRT-LM / Gemma 4 E2B Multimodal Inference Wrapper for TrackGuard DHR
import { AIAnalysisResult, HazardType, Severity } from './types';
import { extractVisualCues, VisualInspectionCues } from './vision';

// Web model checkpoint from litert-community
export const GEMMA_4_E2B_MODEL_URL =
  'https://huggingface.co/litert-community/gemma-4-E2B-it-litert-lm/resolve/main/gemma-4-E2B-it-web.litertlm';

// Filter benign C++ WASM stdout/stderr logs that cause Turbopack to print stack traces in terminal
if (typeof window !== 'undefined' && !(window as any).__litertLogFiltered) {
  (window as any).__litertLogFiltered = true;
  const origWarn = console.warn;
  const origInfo = console.info;

  console.warn = (...args: any[]) => {
    const str = args.map((a) => String(a)).join(' ');
    if (str.includes('npu_registry.cc') || str.includes('NPU accelerator could not be loaded')) {
      return; // Safe benign notice from LiteRT: NPU not found, falling back to WebGPU
    }
    origWarn.apply(console, args);
  };

  console.info = (...args: any[]) => {
    const str = args.map((a) => String(a)).join(' ');
    if (
      str.includes('environment.cc') ||
      str.includes('accelerator_registry.cc') ||
      str.includes('gpu_registry.cc') ||
      str.includes('cpu_registry.cc')
    ) {
      return; // Safe benign C++ WASM accelerator registry log
    }
    origInfo.apply(console, args);
  };
}

let engineInstance: any = null;
let isInitializing = false;
let initError: string | null = null;

let customModelSource: Blob | string | null = null;
let customModelName: string | null = null;

/**
 * Configure a custom model source (e.g. a local .litertlm file from disk or alternate URL).
 */
export function setCustomModel(source: Blob | string, name?: string) {
  customModelSource = source;
  customModelName = name || (typeof source === 'string' ? 'Custom URL' : 'Local File');
  if (engineInstance) {
    try {
      engineInstance.delete?.();
    } catch {
      // ignore cleanup errors
    }
    engineInstance = null;
  }
}

export function getCustomModelInfo(): { isCustom: boolean; name: string | null } {
  return {
    isCustom: !!customModelSource,
    name: customModelName,
  };
}

export function resetToDefaultModel() {
  customModelSource = null;
  customModelName = null;
  if (engineInstance) {
    try {
      engineInstance.delete?.();
    } catch {
      // ignore
    }
    engineInstance = null;
  }
}

/**
 * Checks whether WebGPU is supported on this browser / device.
 */
export function isLLMAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  return 'gpu' in navigator && (navigator as any).gpu !== undefined;
}

/**
 * Initializes the LiteRT-LM Engine with Gemma 4 E2B.
 */
export async function initLLM(
  modelSource: string | Blob = customModelSource || GEMMA_4_E2B_MODEL_URL
): Promise<any> {
  if (engineInstance) return engineInstance;
  if (!isLLMAvailable()) {
    throw new Error('WebGPU is not supported on this device. Manual hazard selection enabled.');
  }

  if (isInitializing) {
    // Wait for in-progress initialization
    while (isInitializing) {
      await new Promise((r) => setTimeout(r, 100));
    }
    if (engineInstance) return engineInstance;
  }

  isInitializing = true;
  initError = null;

  try {
    const { Engine } = await import('@litert-lm/core');
    engineInstance = await Engine.create({
      model: modelSource,
      mainExecutorSettings: {
        maxNumTokens: 1024,
      },
    });
    return engineInstance;
  } catch (err: unknown) {
    initError = err instanceof Error ? err.message : 'Failed to initialize LiteRT-LM model';
    console.warn('[LiteRT-LM] Model init failed, fallback mode active:', initError);
    throw new Error(initError);
  } finally {
    isInitializing = false;
  }
}

/**
 * Translates arbitrary text into Bengali, Nepali, or English using Gemma 4 / LiteRT-LM.
 */
export async function translateWithGemma(
  text: string,
  targetLang: 'en' | 'bn' | 'ne'
): Promise<string> {
  if (!text || !text.trim()) return text;
  if (targetLang === 'en' && /^[a-zA-Z0-9\s.,!?'"()-]+$/.test(text)) return text;

  const langNames = {
    en: 'English',
    bn: 'Bengali (বাংলা)',
    ne: 'Nepali (नेपाली)',
  };

  if (!isLLMAvailable()) {
    // Offline heuristic fallback when WebGPU is unavailable
    return fallbackTranslate(text, targetLang);
  }

  try {
    const engine = await initLLM();
    const conversation = await engine.createConversation({
      preface: {
        messages: [
          {
            role: 'system',
            content: `You are a professional multilingual translator for the Darjeeling Himalayan Railway (DHR).
Translate the following railway track hazard observation into accurate ${langNames[targetLang]}.
Preserve railway terminology (e.g. km marker, fishplate, culvert, ballast).
Output ONLY the raw translated text, with no preamble, quotes, markdown, or explanation.`,
          },
        ],
      },
    });

    const stream = conversation.sendMessageStreaming(
      `Translate to ${langNames[targetLang]}:\n${text}`
    );
    let translated = '';
    for await (const chunk of stream) {
      if (chunk.content && chunk.content[0]?.text) {
        translated += chunk.content[0].text;
      }
    }

    const clean = translated.trim().replace(/^["']|["']$/g, '');
    return clean || fallbackTranslate(text, targetLang);
  } catch (err) {
    console.warn('[LiteRT-LM] Gemma translation fallback active:', err);
    return fallbackTranslate(text, targetLang);
  }
}

function fallbackTranslate(text: string, targetLang: 'en' | 'bn' | 'ne'): string {
  if (targetLang === 'en') return text;
  if (targetLang === 'bn') {
    if (text.includes('fracture') || text.includes('defect')) {
      return 'রেললাইনে ফাটল ও স্থানচ্যুতি দেখা গেছে। জরুরি ট্র্যাক সুরক্ষা ও পরিদর্শন প্রয়োজন।';
    }
    if (text.includes('slip') || text.includes('mud')) {
      return 'পাহাড় থেকে মাটি ও কাদা ধসে লাইনে এসে পড়েছে। ঢালু অংশের স্থিতিশীলতা পরীক্ষা প্রয়োজন।';
    }
    if (text.includes('rockfall') || text.includes('boulder')) {
      return 'কাটা পাহাড় থেকে লাইনের ওপর পাথর ও বোল্ডার পড়ে ট্র্যাক অবরুদ্ধ হয়েছে। অবিলম্বে লাইন পরিষ্কার প্রয়োজন।';
    }
    if (text.includes('drain') || text.includes('culvert')) {
      return 'কালভার্ট ও ড্রেনে পলি জমে জল নিষ্কাশন বন্ধ হয়ে গেছে। ড্রেন পরিষ্কার প্রয়োজন।';
    }
    if (text.includes('wall')) {
      return 'পাথুরে রিটেইনিং ওয়ালে ফাটল দেখা গেছে। কাঠামোগত পরিদর্শন প্রয়োজন।';
    }
    if (text.includes('vegetation')) {
      return 'ট্র্যাকের ওপর গাছের ডালপালা ও ঝোপঝাড় নেমে এসেছে। ছাঁটাই প্রয়োজন।';
    }
    return `[বাংলায় অনুদিত]: ${text}`;
  }
  if (targetLang === 'ne') {
    if (text.includes('fracture') || text.includes('defect')) {
      return 'रेललाइनमा दरार र क्षति देखिएको छ। तत्काल ट्र्याक सुरक्षा र निरीक्षण आवश्यक छ।';
    }
    if (text.includes('slip') || text.includes('mud')) {
      return 'भीरबाट पहिरो र हिलो ट्र्याकमा खसेको छ। भीरको स्थिरता जाँच गर्नुपर्नेछ।';
    }
    if (text.includes('rockfall') || text.includes('boulder')) {
      return 'भीरबाट चट्टान र ढुङ्गा खसेर ट्र्याक अवरुद्ध भएको छ। तत्काल सफा गर्नुपर्छ।';
    }
    if (text.includes('drain') || text.includes('culvert')) {
      return 'नाली र कल्भर्टमा फोहोर जमेर पानी थुनिएको छ। नाली खोल्न आवश्यक छ।';
    }
    if (text.includes('wall')) {
      return 'सुरक्षा पर्खालमा दरार र ढुङ्गा हल्लिएको छ। प्राविधिक निरीक्षण आवश्यक छ।';
    }
    if (text.includes('vegetation')) {
      return 'रुखका हाँगा र झाडी ट्र्याकमा फैलिएका छन्। हाँगा काट्न आवश्यक छ।';
    }
    return `[नेपालीमा अनुवादित]: ${text}`;
  }
  return text;
}

/**
 * Analyzes a track inspection photo and location context using Gemma 4 E2B.
 * Returns structured hazard suggestions (type, severity, observational note).
 */
export async function analyzeHazard(
  imageBlob: Blob,
  location: { lat: number; lng: number; kmMarker: string },
  lang: 'en' | 'bn' | 'ne' = 'en'
): Promise<AIAnalysisResult> {
  // Extract visual cues from image canvas
  const visualCues = await extractVisualCues(imageBlob);

  // Compute smart baseline based on visual cues
  const smartBaseline = getBaselineFromVisualCues(visualCues, location, lang);

  // If WebGPU is not supported, return the vision-derived baseline
  if (!isLLMAvailable()) {
    return smartBaseline;
  }

  try {
    const engine = await initLLM();
    const noteLangInstruction =
      lang === 'bn'
        ? 'in fluent Bengali (বাংলা)'
        : lang === 'ne'
        ? 'in fluent Nepali (नेपाली)'
        : 'in English';

    const conversation = await engine.createConversation({
      preface: {
        messages: [
          {
            role: 'system',
            content: `You are an expert railway track safety inspection assistant for the Darjeeling Himalayan Railway (DHR).
Analyze the camera visual cues and location context provided.
IMPORTANT RAILWAY SAFETY CLASSIFICATION RULES:
- If a rail is fractured, cracked, broken, separated, or misaligned, the hazard is STRICTLY "track_defect" and severity is "critical". Note: Track ballast (gravel aggregate under sleepers) is normal track foundation, NOT a rockfall.
- If mud or soil has slid down a slope, the hazard is "slip".
- If loose boulders or detached rocks from the cutting face block the line, the hazard is "rockfall".
- If culverts or drainage channels are choked or waterlogged, the hazard is "blocked_drain".
- If masonry retaining walls show cracks or displacement, the hazard is "damaged_wall".
- If tree branches or foliage encroaches within train clearance, the hazard is "vegetation".

Provide:
1. HAZARD TYPE: strictly one of [slip, rockfall, blocked_drain, damaged_wall, track_defect, vegetation, other]
2. SUGGESTED SEVERITY: strictly one of [low, medium, high, critical]
3. OBSERVATIONAL NOTE: A brief factual note under 40 words ${noteLangInstruction} describing the visible condition.
   - Mention what is visible.
   - Do NOT give operational orders (like halting train traffic).
   - Suggest what field inspection is needed.

Respond strictly with valid JSON:
{"type": "...", "severity": "...", "note": "..."}`,
          },
        ],
      },
    });

    const prompt = `Camera Inspection Telemetry:
- Visual Observation: ${visualCues.summaryDescription}
- Detected Cues: ${visualCues.detectedPatterns.join(', ')}
- Primary Visual Indicator: ${visualCues.suggestedHazardType} (Estimated severity: ${visualCues.suggestedSeverity})
- Alignment Location: DHR km ${location.kmMarker} (${location.lat.toFixed(4)}°N, ${location.lng.toFixed(4)}°E)
- Language Request: ${lang}

Provide suggested hazard type, severity suggestion, and observational note in JSON.`;

    const stream = conversation.sendMessageStreaming(prompt);
    let fullResponse = '';

    for await (const chunk of stream) {
      if (chunk.content && chunk.content[0] && chunk.content[0].text) {
        fullResponse += chunk.content[0].text;
      }
    }

    // Try parsing JSON response
    const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      let parsedType = sanitizeHazardType(parsed.type);

      // Guard against common LLM hallucination: confusing normal ballast gravel with rockfall
      if (
        visualCues.suggestedHazardType === 'track_defect' &&
        parsedType === 'rockfall'
      ) {
        parsedType = 'track_defect';
      }

      if (parsedType && parsedType !== 'other') {
        return {
          type: parsedType,
          severity:
            parsedType === 'track_defect'
              ? 'critical'
              : sanitizeSeverity(parsed.severity),
          note: parsed.note || smartBaseline.note,
        };
      }
    }

    // If model returned generic text or "please provide photo", use visual cues
    if (fullResponse.toLowerCase().includes('please provide') || !jsonMatch) {
      return smartBaseline;
    }

    return {
      type: sanitizeHazardType(smartBaseline.type),
      severity: sanitizeSeverity(smartBaseline.severity),
      note: fullResponse.slice(0, 160) || smartBaseline.note,
    };
  } catch (error) {
    console.warn('[LiteRT-LM] Inference failed, using visual telemetry fallback:', error);
    return smartBaseline;
  }
}

function getBaselineFromVisualCues(
  cues: VisualInspectionCues,
  location: { lat: number; lng: number; kmMarker: string },
  lang: 'en' | 'bn' | 'ne' = 'en'
): AIAnalysisResult {
  const hazardType = cues.suggestedHazardType || 'track_defect';
  const severity = cues.suggestedSeverity || (hazardType === 'track_defect' ? 'critical' : 'high');

  const notesEn: Record<HazardType, string> = {
    track_defect: `Severe transverse rail fracture with visible separation gap on rail head near km ${location.kmMarker}. Critical track defect; requires emergency track protection and fishplate clamping.`,
    slip: `Slope earth movement / mud slurry displacing onto cutting near km ${location.kmMarker}. Inspect slope stability and clear track profile.`,
    rockfall: `Loose rock debris / boulder mass detached from cutting near km ${location.kmMarker}. Clearance envelope inspection advised.`,
    blocked_drain: `Culvert waterlogging or drain channel silt obstruction visible near km ${location.kmMarker}. Check intake for silt and debris.`,
    damaged_wall: `Masonry retaining wall displaying shear cracking or stone displacement near km ${location.kmMarker}. Structural inspection advised.`,
    vegetation: `Vegetation / tree branches encroaching on track clearance near km ${location.kmMarker}. Clearance trimming suggested.`,
    other: `Track alignment anomaly recorded near km ${location.kmMarker}. Physical verification suggested.`,
  };

  const notesBn: Record<HazardType, string> = {
    track_defect: `কিমি ${location.kmMarker}-এর কাছে রেললাইনের ফাটল ও দূরত্ব দেখা যাচ্ছে। জরুরি ট্র্যাক সুরক্ষা এবং ফিশপ্লেট ক্ল্যাম্পিং প্রয়োজন।`,
    slip: `কিমি ${location.kmMarker}-এর কাছে পাহাড়ের মাটি ধসে লাইনের ওপর এসে পড়েছে। ঢালু অংশের স্থিতিশীলতা পরীক্ষা ও লাইন পরিষ্কার আবশ্যক।`,
    rockfall: `কিমি ${location.kmMarker}-এর কাছে কাটা পাহাড় থেকে বোল্ডার ও পাথরের টুকরো লাইনে খসে পড়েছে। ট্রেন চলাচলের পথ পরীক্ষা প্রয়োজন।`,
    blocked_drain: `কিমি ${location.kmMarker}-এর কাছে কালভার্ট ও ড্রেনে পলি জমে জল নিষ্কাশন বন্ধ হয়ে গেছে। ড্রেন পরিষ্কার করা প্রয়োজন।`,
    damaged_wall: `কিমি ${location.kmMarker}-এর কাছে সুরক্ষার পাথুরে প্রাচীরে ফাটল ও পাথর স্থানচ্যুতি দেখা যাচ্ছে। কাঠামোগত পরিদর্শন প্রয়োজন।`,
    vegetation: `কিমি ${location.kmMarker}-এর কাছে গাছের ডালপালা ও ঝোপঝাড় রেল ট্র্যাকে ঢুকে পড়েছে। ডালপালা ছাঁটা প্রয়োজন।`,
    other: `কিমি ${location.kmMarker}-এর কাছে লাইনে অস্বাভাবিক সমস্যা ধরা পড়েছে। সরাসরি পরিদর্শন প্রয়োজন।`,
  };

  const notesNe: Record<HazardType, string> = {
    track_defect: `किमी ${location.kmMarker} नजिकै रेललाइनमा दरार र छुट्टिएको ग्याप देखिएको छ। तत्काल सुरक्षा र फिसप्लेट क्ल्याम्पिङ आवश्यक छ।`,
    slip: `किमी ${location.kmMarker} नजिकै भीरबाट पहिरो र हिलो ट्र्याकमा खसेको छ। भीर निरीक्षण गरी ट्र्याक खाली गर्नुपर्छ।`,
    rockfall: `किमी ${location.kmMarker} नजिकै भीरबाट ढुङ्गा र चट्टान ट्र्याकमा खसेको छ। मार्ग सुरक्षा निरीक्षण आवश्यक छ।`,
    blocked_drain: `किमी ${location.kmMarker} नजिकै नाली वा कल्भर्टमा हिलो र फोहोर जमेर पानी थुनिएको छ। नाली सफा गर्नुपर्नेछ।`,
    damaged_wall: `किमी ${location.kmMarker} नजिकैको पर्खालमा दरार र ढुङ्गा हल्लिएको देखिएको छ। संरचनात्मक निरीक्षण आवश्यक छ।`,
    vegetation: `किमी ${location.kmMarker} नजिकै रुखका हाँगा र झाडी ट्र्याकमा फैलिएका छन्। हाँगा काट्न आवश्यक छ।`,
    other: `किमी ${location.kmMarker} नजिकै ट्र्याकमा समस्या रेकर्ड गरिएको छ। प्रत्यक्ष निरीक्षण आवश्यक छ।`,
  };

  const dict = lang === 'bn' ? notesBn : lang === 'ne' ? notesNe : notesEn;

  return {
    type: hazardType,
    severity,
    note: dict[hazardType] || dict.other,
  };
}

function sanitizeHazardType(val: any): HazardType {
  const allowed: HazardType[] = [
    'slip',
    'rockfall',
    'blocked_drain',
    'damaged_wall',
    'track_defect',
    'vegetation',
    'other',
  ];
  if (typeof val === 'string' && allowed.includes(val.toLowerCase() as HazardType)) {
    return val.toLowerCase() as HazardType;
  }
  return 'other';
}

function sanitizeSeverity(val: any): Severity {
  const allowed: Severity[] = ['low', 'medium', 'high', 'critical'];
  if (typeof val === 'string' && allowed.includes(val.toLowerCase() as Severity)) {
    return val.toLowerCase() as Severity;
  }
  return 'medium';
}
