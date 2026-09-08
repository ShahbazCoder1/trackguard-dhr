export type Language = 'en' | 'bn' | 'ne';

export interface Translations {
  // Navigation & Branding
  brandTitle: string;
  brandSubtitle: string;
  navHome: string;
  navReports: string;
  navDashboard: string;
  newReportCta: string;
  newReportSub: string;

  // Connection & Offline
  stationSignal: string;
  trackOffline: string;
  online: string;
  offline: string;
  backOnline: string;
  offlineBanner: string;
  offlineSafeNotice: string;
  syncSafeStored: string;
  syncChecking: string;
  syncWaitingControl: string;
  syncNoAction: string;
  syncSuccess: string;
  allSynced: string;
  waitingToSync: string;
  syncingProgress: string;
  syncFailed: string;
  syncRetry: string;
  syncNow: string;

  // Home Page
  inspectionModeTitle: string;
  offlineTag: string;
  inspectionModeDesc: string;
  gemmaEngine: string;
  configure: string;
  activeSector: string;
  myReportsCardTitle: string;
  myReportsCardSub: string;
  pendingCountLabel: string;
  syncedLabel: string;
  dashboardCardTitle: string;
  dashboardCardSub: string;
  footerText: string;

  // Camera & GPS
  cancel: string;
  retake: string;
  lockingGps: string;
  manualKm: string;
  stationSimulator: string;
  stationSimulatorDesc: string;

  // Review & Confirmation
  stepIndicator: string;
  humanReviewTitle: string;
  gemmaAiTitle: string;
  webgpuOnDevice: string;
  standardBaseline: string;
  analyzingHazard: string;
  suggestedHazard: string;
  suggestedSeverity: string;
  aiDisclaimer: string;
  hazardClassificationTitle: string;
  inspectionSeverityTitle: string;
  kmMarkerLabel: string;
  kmMarkerPlaceholder: string;
  observationalNoteTitle: string;
  factualOnly: string;
  notePlaceholder: string;
  confirmAndSave: string;
  savedToQueue: string;
  savingLogbook: string;
  localStoreNotice: string;
  translateWithGemma: string;
  translatingNote: string;

  // Queue Page
  myReportsHeader: string;
  myReportsSub: string;
  recentReports: string;
  waitingBadge: string;
  noReportsTitle: string;
  noReportsDesc: string;
  createReportButton: string;

  // Dashboard Page
  controlOverview: string;
  dashboardHeader: string;
  dashboardSub: string;
  trackStatus: string;
  totalReports: string;
  filters: string;
  clearFilters: string;
  recentHazards: string;
  reportsShown: string;
  noMatchingReports: string;
  sectionsTitle: string;

  // Detail Page
  backButton: string;
  reportNotFound: string;
  reportNotFoundDesc: string;
  returnToReports: string;
  confirmedHazard: string;
  statusLabel: string;
  gangmanNoteTitle: string;
  noNoteProvided: string;
  originalAiOutput: string;
  auditedBadge: string;
  aiSuggestedTypeLabel: string;
  aiSuggestedSeverityLabel: string;
  supervisorActions: string;
  statusUpdate: string;
  actionAcknowledge: string;
  actionRequireInsp: string;
  actionResolved: string;
  telemetryTitle: string;
  sectionLabel: string;
  gpsCoordsLabel: string;
  gpsAccuracyLabel: string;
  syncAttemptsLabel: string;

  // Hazard options
  hazard_slip: string;
  hazard_rockfall: string;
  hazard_blocked_drain: string;
  hazard_damaged_wall: string;
  hazard_track_defect: string;
  hazard_vegetation: string;
  hazard_other: string;

  // Severity options
  severity_low: string;
  severity_medium: string;
  severity_high: string;
  severity_critical: string;

  // Status options
  status_open: string;
  status_acknowledged: string;
  status_inspection_required: string;
  status_resolved: string;

  // Filter options
  allHazards: string;
  allSeverities: string;
  allStatuses: string;
  allSections: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    brandTitle: 'TrackGuard',
    brandSubtitle: 'Darjeeling Himalayan Railway · Gangman Logbook',
    navHome: 'Home',
    navReports: 'Reports',
    navDashboard: 'Dashboard',
    newReportCta: 'NEW REPORT',
    newReportSub: 'Photo + GPS + Gemma 4 AI',

    stationSignal: 'Station Signal',
    trackOffline: 'Track Offline',
    online: 'Online',
    offline: 'Offline',
    backOnline: 'Back online',
    offlineBanner: "You're offline · Reports are saved on this device",
    offlineSafeNotice: 'Offline — reports are safe',
    syncSafeStored: 'stored on this device. Sync will resume when connectivity returns.',
    syncChecking: 'Checking reports stored on this device.',
    syncWaitingControl: 'Ready to send to the control desk.',
    syncNoAction: 'No action needed right now.',
    syncSuccess: 'All reports synced',
    allSynced: 'All reports synced',
    waitingToSync: 'Waiting to sync',
    syncingProgress: 'Syncing…',
    syncFailed: 'Sync failed',
    syncRetry: 'Retry',
    syncNow: 'Sync now',

    inspectionModeTitle: 'Alignment Inspection Mode',
    offlineTag: '100% Offline',
    inspectionModeDesc:
      'Record rockfalls, slope slips, and culvert blockages on track. Reports queue locally until the next railway station.',
    gemmaEngine: 'Gemma 4 WebGPU Engine',
    configure: 'Configure',
    activeSector: 'Active Sector: Kurseong ↔ Ghum ↔ Darjeeling',
    myReportsCardTitle: 'My Reports',
    myReportsCardSub: 'Offline queue & sync',
    pendingCountLabel: 'Pending',
    syncedLabel: 'Synced',
    dashboardCardTitle: 'Section View',
    dashboardCardSub: 'Supervisor overview',
    footerText: 'TrackGuard DHR · GDG Siliguri Toy Train Edition · On-Device Gemma 4',

    cancel: 'Cancel',
    retake: 'Retake',
    lockingGps: 'Locking GPS...',
    manualKm: 'Manual',
    stationSimulator: 'DHR Station Simulator',
    stationSimulatorDesc: 'Testing at home? Select any DHR waypoint along the 88km line:',

    stepIndicator: 'STEP 2/2',
    humanReviewTitle: 'Human-in-the-Loop Review',
    gemmaAiTitle: 'Gemma 4 E2B AI Suggestions',
    webgpuOnDevice: 'WebGPU On-Device',
    standardBaseline: 'Standard Baseline',
    analyzingHazard: 'Analyzing hazard & drafting observational note...',
    suggestedHazard: 'Suggested Hazard:',
    suggestedSeverity: 'Suggested Severity:',
    aiDisclaimer: 'AI assists only. Gangman holds complete authority over final report.',
    hazardClassificationTitle: 'Hazard Classification (Human Confirmed)',
    inspectionSeverityTitle: 'Inspection Severity Level',
    kmMarkerLabel: 'DHR Alignment Km Marker',
    kmMarkerPlaceholder: 'e.g. 74.2 (Ghum)',
    observationalNoteTitle: 'Observational Inspection Note',
    factualOnly: 'Factual details only',
    notePlaceholder:
      'Describe visible signs (e.g. mud slurry over culvert inlet, rail clearance obstructed by rockfall)...',
    confirmAndSave: 'Confirm & Save Report',
    savedToQueue: 'Saved to Offline Queue!',
    savingLogbook: 'Saving to Logbook...',
    localStoreNotice:
      'Stores securely in local IndexedDB. Syncs when station Wi-Fi/signal returns.',
    translateWithGemma: 'Translate with Gemma',
    translatingNote: 'Translating with Gemma…',

    myReportsHeader: 'My reports',
    myReportsSub: 'Track inspection reports saved on this device',
    recentReports: 'Recent',
    waitingBadge: 'waiting',
    noReportsTitle: 'No reports yet',
    noReportsDesc: 'When you capture a track hazard, it will be saved here safely—even offline.',
    createReportButton: 'Create report',

    controlOverview: 'Control overview',
    dashboardHeader: 'Dashboard',
    dashboardSub: 'DHR track inspection status',
    trackStatus: 'Track status',
    totalReports: 'Total reports',
    filters: 'Filters',
    clearFilters: 'Clear',
    recentHazards: 'Recent hazards',
    reportsShown: 'shown',
    noMatchingReports: 'No reports match these filters',
    sectionsTitle: 'Sections',

    backButton: 'Back',
    reportNotFound: 'Report Not Found',
    reportNotFoundDesc: 'The requested inspection report could not be found in local storage.',
    returnToReports: 'Return to Reports',
    confirmedHazard: 'Confirmed Hazard',
    statusLabel: 'Status',
    gangmanNoteTitle: "Gangman's Official Inspection Note",
    noNoteProvided: 'No additional note provided.',
    originalAiOutput: 'Original Gemma 4 E2B AI Output',
    auditedBadge: 'Audited',
    aiSuggestedTypeLabel: 'AI Suggested Type:',
    aiSuggestedSeverityLabel: 'AI Suggested Severity:',
    supervisorActions: 'Supervisor Actions',
    statusUpdate: 'Status Update',
    actionAcknowledge: 'Acknowledge',
    actionRequireInsp: 'Require Insp.',
    actionResolved: 'Resolved',
    telemetryTitle: 'Alignment & Device Telemetry',
    sectionLabel: 'Section:',
    gpsCoordsLabel: 'GPS Coordinates:',
    gpsAccuracyLabel: 'GPS Accuracy:',
    syncAttemptsLabel: 'Sync Attempts:',

    hazard_slip: 'Slip / Landslide',
    hazard_rockfall: 'Rockfall',
    hazard_blocked_drain: 'Blocked Drain',
    hazard_damaged_wall: 'Damaged Retaining Wall',
    hazard_track_defect: 'Track Defect',
    hazard_vegetation: 'Vegetation Overgrowth',
    hazard_other: 'Other',

    severity_low: 'Low Severity',
    severity_medium: 'Medium Severity',
    severity_high: 'High Severity',
    severity_critical: 'Critical Hazard',

    status_open: 'Open',
    status_acknowledged: 'Acknowledged',
    status_inspection_required: 'Inspection Required',
    status_resolved: 'Resolved',

    allHazards: 'All hazards',
    allSeverities: 'All severity',
    allStatuses: 'All status',
    allSections: 'All sections',
  },

  bn: {
    brandTitle: 'ট্র্যাকগার্ড',
    brandSubtitle: 'দার্জিলিং হিমালয়ান রেলওয়ে · গ্যাংম্যান লগবই',
    navHome: 'হোম',
    navReports: 'রিপোর্ট',
    navDashboard: 'ড্যাশবোর্ড',
    newReportCta: 'নতুন রিপোর্ট',
    newReportSub: 'ছবি + জিপিএস + জেমা ৪ এআই',

    stationSignal: 'স্টেশন সিগন্যাল',
    trackOffline: 'ট্র্যাক অফলাইন',
    online: 'অনলাইন',
    offline: 'অফলাইন',
    backOnline: 'পুনরায় অনলাইন',
    offlineBanner: 'আপনি অফলাইনে আছেন · রিপোর্ট এই ডিভাইসে সংরক্ষিত হচ্ছে',
    offlineSafeNotice: 'অফলাইন — রিপোর্ট সম্পূর্ণ নিরাপদ',
    syncSafeStored: 'এই ডিভাইসে সংরক্ষিত। স্টেশনের সিগন্যাল পেলে নিজে থেকেই সিঙ্ক হবে।',
    syncChecking: 'সংরক্ষিত রিপোর্ট যাচাই করা হচ্ছে...',
    syncWaitingControl: 'কন্ট্রোল ডেস্কে পাঠানোর জন্য প্রস্তুত।',
    syncNoAction: 'আপাতত কোনো পদক্ষেপের প্রয়োজন নেই।',
    syncSuccess: 'সব রিপোর্ট সিঙ্ক সম্পন্ন',
    allSynced: 'সব রিপোর্ট সিঙ্ক সম্পন্ন',
    waitingToSync: 'সিঙ্কের অপেক্ষায়',
    syncingProgress: 'সিঙ্ক হচ্ছে…',
    syncFailed: 'সিঙ্ক ব্যর্থ',
    syncRetry: 'পুনরায় চেষ্টা',
    syncNow: 'এখনই সিঙ্ক করুন',

    inspectionModeTitle: 'ট্র্যাক পরিদর্শন মোড',
    offlineTag: '১০০% অফলাইন',
    inspectionModeDesc:
      'রেললাইনে শিলা পতন, মাটি ধস এবং ড্রেন ব্লকেজ নথিভুক্ত করুন। পরবর্তী স্টেশন পর্যন্ত রিপোর্ট অফলাইনে সংরক্ষিত থাকে।',
    gemmaEngine: 'জেমা ৪ WebGPU ইঞ্জিন',
    configure: 'সেটিংস',
    activeSector: 'সক্রিয় সেক্টর: কার্শিয়াং ↔ ঘুম ↔ দার্জিলিং',
    myReportsCardTitle: 'আমার রিপোর্ট',
    myReportsCardSub: 'অফলাইন কিউ ও সিঙ্ক',
    pendingCountLabel: 'বাকি আছে',
    syncedLabel: 'সিঙ্কড',
    dashboardCardTitle: 'সেকশন ওভারভিউ',
    dashboardCardSub: 'সুপারভাইজার ড্যাশবোর্ড',
    footerText: 'ট্র্যাকগার্ড DHR · জিডিজি শিলিগুড়ি খেলনা ট্রেন সংস্করণ · অন-ডিভাইস জেমা ৪',

    cancel: 'বাতিল',
    retake: 'আবার তুলুন',
    lockingGps: 'জিপিএস সন্ধান চলছে...',
    manualKm: 'ম্যানুয়াল',
    stationSimulator: 'DHR স্টেশন সিমুলেটর',
    stationSimulatorDesc: 'বাসা থেকে পরীক্ষা করছেন? ৮৮ কিমি লাইনের যেকোনো স্টেশন বেছে নিন:',

    stepIndicator: 'ধাপ ২/২',
    humanReviewTitle: 'গ্যাংম্যান যাচাইকরণ',
    gemmaAiTitle: 'জেমা ৪ E2B এআই পরামর্শ',
    webgpuOnDevice: 'অন-ডিভাইস WebGPU',
    standardBaseline: 'স্ট্যান্ডার্ড বেসলাইন',
    analyzingHazard: 'বিপদ বিশ্লেষণ ও নোট তৈরি হচ্ছে...',
    suggestedHazard: 'প্রস্তাবিত বিপদ:',
    suggestedSeverity: 'প্রস্তাবিত তীব্রতা:',
    aiDisclaimer: 'এআই শুধুমাত্র সহায়তা করে। চূড়ান্ত রিপোর্টের সিদ্ধান্ত গ্যাংম্যানের হাতে।',
    hazardClassificationTitle: 'বিপদ শ্রেণিবিন্যাস (যাচাইকৃত)',
    inspectionSeverityTitle: 'তীব্রতার স্তর',
    kmMarkerLabel: 'DHR কিমি মার্কার',
    kmMarkerPlaceholder: 'যেমন: ৭৪.২ (ঘুম)',
    observationalNoteTitle: 'পরিদর্শন পর্যবেক্ষণ নোট',
    factualOnly: 'কেবলমাত্র প্রত্যক্ষ প্রমাণ',
    notePlaceholder:
      'দৃশ্যমান লক্ষণ বর্ণনা করুন (যেমন: কালভার্টে কাদা ঢুকে বন্ধ, লাইনে পাথর পড়ে পথ অবরুদ্ধ)...',
    confirmAndSave: 'রিপোর্ট নিশ্চিত ও সংরক্ষণ করুন',
    savedToQueue: 'অফলাইন কিউতে সংরক্ষিত হয়েছে!',
    savingLogbook: 'লগবইয়ে সংরক্ষিত হচ্ছে...',
    localStoreNotice:
      'স্থানীয় IndexedDB-তে সুরক্ষিত। স্টেশনের ওয়াই-ফাই বা নেটওয়ার্ক পেলে নিজে থেকেই সিঙ্ক হবে।',
    translateWithGemma: 'জেমা দিয়ে অনুবাদ করুন',
    translatingNote: 'জেমা দিয়ে অনুবাদ হচ্ছে…',

    myReportsHeader: 'আমার রিপোর্টসমূহ',
    myReportsSub: 'এই ডিভাইসে সংরক্ষিত ট্র্যাক পরিদর্শনের তথ্য',
    recentReports: 'সাম্প্রতিক',
    waitingBadge: 'অপেক্ষমাণ',
    noReportsTitle: 'এখনও কোনো রিপোর্ট নেই',
    noReportsDesc: 'ট্র্যাকের যেকোনো বিপদ ক্যামেরা দিয়ে তুললে অফলাইনেও নিরাপদে জমা থাকবে।',
    createReportButton: 'নতুন রিপোর্ট তৈরি করুন',

    controlOverview: 'কন্ট্রোল ওভারভিউ',
    dashboardHeader: 'ড্যাশবোর্ড',
    dashboardSub: 'DHR ট্র্যাক নিরাপত্তা পর্যবেক্ষণ',
    trackStatus: 'ট্র্যাকের বর্তমান অবস্থা',
    totalReports: 'মোট রিপোর্ট',
    filters: 'ফিল্টার',
    clearFilters: 'মুছে ফেলুন',
    recentHazards: 'সাম্প্রতিক বিপদসমূহ',
    reportsShown: 'প্রদর্শিত',
    noMatchingReports: 'ফিল্টারের সাথে কোনো রিপোর্ট মেলেনি',
    sectionsTitle: 'সেকশনসমূহ',

    backButton: 'পেছনে',
    reportNotFound: 'রিপোর্ট পাওয়া যায়নি',
    reportNotFoundDesc: 'অনুরোধ করা রিপোর্টটি স্থানীয় মেমোরিতে খুঁজে পাওয়া যায়নি।',
    returnToReports: 'রিপোর্টে ফিরে যান',
    confirmedHazard: 'নিশ্চিতকৃত বিপদ',
    statusLabel: 'অবস্থা',
    gangmanNoteTitle: 'গ্যাংম্যানের অফিসিয়াল নোট',
    noNoteProvided: 'কোনো অতিরিক্ত নোট দেওয়া হয়নি।',
    originalAiOutput: 'আসল জেমা ৪ এআই আউটপুট',
    auditedBadge: 'যাচাইকৃত',
    aiSuggestedTypeLabel: 'এআই প্রস্তাবিত ধরন:',
    aiSuggestedSeverityLabel: 'এআই প্রস্তাবিত তীব্রতা:',
    supervisorActions: 'সুপারভাইজার অ্যাকশন',
    statusUpdate: 'অবস্থা পরিবর্তন',
    actionAcknowledge: 'স্বীকৃত',
    actionRequireInsp: 'পরিদর্শন চাই',
    actionResolved: 'সমাধান হয়েছে',
    telemetryTitle: 'ট্র্যাক ও ডিভাইস টেলিমেট্রি',
    sectionLabel: 'সেকশন:',
    gpsCoordsLabel: 'জিপিএস স্থানাঙ্ক:',
    gpsAccuracyLabel: 'জিপিএস নির্ভুলতা:',
    syncAttemptsLabel: 'সিঙ্ক চেষ্টা:',

    hazard_slip: 'ভূমিধস / পাহাড়ি ধস',
    hazard_rockfall: 'পাথর পড়া / শিলা পতন',
    hazard_blocked_drain: 'নিকাশি বন্ধ / ড্রেন জাম',
    hazard_damaged_wall: 'ক্ষতিগ্রস্ত সুরক্ষা প্রাচীর',
    hazard_track_defect: 'রেললাইন ত্রুটি',
    hazard_vegetation: 'অতিরিক্ত গাছপালা / ঝোপঝাড়',
    hazard_other: 'অন্যান্য',

    severity_low: 'কম তীব্রতা',
    severity_medium: 'মাঝারি তীব্রতা',
    severity_high: 'উচ্চ তীব্রতা',
    severity_critical: 'জরুরি / সংকটজনক',

    status_open: 'উন্মুক্ত',
    status_acknowledged: 'স্বীকৃত',
    status_inspection_required: 'পরিদর্শন প্রয়োজন',
    status_resolved: 'সমাধান হয়েছে',

    allHazards: 'সব ধরনের বিপদ',
    allSeverities: 'সব তীব্রতা',
    allStatuses: 'সব অবস্থা',
    allSections: 'সব সেকশন',
  },

  ne: {
    brandTitle: 'ट्र्याकगार्ड',
    brandSubtitle: 'दार्जिलिङ हिमालयन रेलवे · ग्याङ्गम्यान लगबुक',
    navHome: 'गृह',
    navReports: 'रिपोर्टहरू',
    navDashboard: 'ड्यासबोर्ड',
    newReportCta: 'नयाँ रिपोर्ट',
    newReportSub: 'फोटो + GPS + जेम्मा ४ AI',

    stationSignal: 'स्टेसन सिग्नल',
    trackOffline: 'ट्र्याक अफलाइन',
    online: 'अनलाइन',
    offline: 'अफलाइन',
    backOnline: 'पुनः अनलाइन',
    offlineBanner: 'तपाईं अफलाइन हुनुहुन्छ · रिपोर्टहरू यसै उपकरणमा सुरक्षित छन्',
    offlineSafeNotice: 'अफलाइन — रिपोर्टहरू पूर्ण सुरक्षित छन्',
    syncSafeStored: 'यस उपकरणमा सुरक्षित। स्टेसनको नेटवर्क पाएपछि स्वतः सिङ्क हुनेछ।',
    syncChecking: 'उपकरणमा रहेका रिपोर्टहरू जाँच्दै...',
    syncWaitingControl: 'नियन्त्रण कक्षमा पठाउन तयार छ।',
    syncNoAction: 'अहिले कुनै कार्य आवश्यक छैन।',
    syncSuccess: 'सबै रिपोर्टहरू सिङ्क भए',
    allSynced: 'सबै रिपोर्टहरू सिङ्क भए',
    waitingToSync: 'सिङ्क हुन बाँकी',
    syncingProgress: 'सिङ्क हुँदैछ…',
    syncFailed: 'सिङ्क असफल भयो',
    syncRetry: 'पुनः प्रयास',
    syncNow: 'अहिले सिङ्क गर्नुहोस्',

    inspectionModeTitle: 'ट्र्याक निरीक्षण मोड',
    offlineTag: '१००% अफलाइन',
    inspectionModeDesc:
      'रेल ट्र्याकमा पहिरो, ढुङ्गा खस्ने र नाली थुनिएको घटना दर्ता गर्नुहोस्। अर्को स्टेसन नपुगेसम्म रिपोर्टहरू सुरक्षित रहन्छन्।',
    gemmaEngine: 'जेम्मा ४ WebGPU इन्जिन',
    configure: 'सेटिङ',
    activeSector: 'सक्रिय क्षेत्र: खर्साङ ↔ घूम ↔ दार्जिलिङ',
    myReportsCardTitle: 'मेरा रिपोर्टहरू',
    myReportsCardSub: 'अफलाइन लाम र सिङ्क',
    pendingCountLabel: 'बाँकी',
    syncedLabel: 'सिङ्क भएको',
    dashboardCardTitle: 'सेक्सन अवलोकन',
    dashboardCardSub: 'पर्यवेक्षक ड्यासबोर्ड',
    footerText: 'ट्र्याकगार्ड DHR · GDG सिलिगुडी खेलौना रेल संस्करण · अन-डिभाइस जेम्मा ४',

    cancel: 'रद्द गर्नुहोस्',
    retake: 'पुनः फोटो लिनुहोस्',
    lockingGps: 'GPS खोज्दै...',
    manualKm: 'म्यानुअल',
    stationSimulator: 'DHR स्टेसन सिमुलेटर',
    stationSimulatorDesc: 'घरबाट परीक्षण गर्दै हुनुहुन्छ? ८८ किमी मार्गको कुनै पनि स्टेसन छान्नुहोस्:',

    stepIndicator: 'चरण २/२',
    humanReviewTitle: 'मानव प्रमाणीकरण समीक्षा',
    gemmaAiTitle: 'जेम्मा ४ E2B AI सुझावहरू',
    webgpuOnDevice: 'अन-डिभाइस WebGPU',
    standardBaseline: 'मानक आधाररेखा',
    analyzingHazard: 'जोखिम विश्लेषण र टिप्पणी तयार हुँदैछ...',
    suggestedHazard: 'सुझाव गरिएको जोखिम:',
    suggestedSeverity: 'सुझाव गरिएको गम्भीरता:',
    aiDisclaimer: 'AI ले केवल सहयोग गर्दछ। अन्तिम रिपोर्टको पूर्ण अधिकार ग्याङ्गम्यानसँग छ।',
    hazardClassificationTitle: 'जोखिम वर्गीकरण (प्रमाणित)',
    inspectionSeverityTitle: 'निरीक्षण गम्भीरता स्तर',
    kmMarkerLabel: 'DHR किलोमिटर मार्कर',
    kmMarkerPlaceholder: 'जस्तै: ७४.२ (घूम)',
    observationalNoteTitle: 'निरीक्षण अवलोकन टिप्पणी',
    factualOnly: 'प्रत्यक्ष विवरण मात्र',
    notePlaceholder:
      'प्रत्यक्ष देखिएका लक्षणहरू लेख्नुहोस् (जस्तै: नालीमा माटो भरिएर थुनिएको, ट्र्याकमा ढुङ्गा खसेको)...',
    confirmAndSave: 'रिपोर्ट पुष्टि र सुरक्षित गर्नुहोस्',
    savedToQueue: 'अफलाइन लाममा सुरक्षित भयो!',
    savingLogbook: 'लगबुकमा सुरक्षित हुँदैछ...',
    localStoreNotice:
      'स्थानीय IndexedDB मा सुरक्षित राखिएको छ। स्टेसनको नेटवर्क प्राप्त भएपछि स्वतः सिङ्क हुन्छ।',
    translateWithGemma: 'जेम्माद्वारा अनुवाद गर्नुहोस्',
    translatingNote: 'जेम्माद्वारा अनुवाद हुँदैछ…',

    myReportsHeader: 'मेरा रिपोर्टहरू',
    myReportsSub: 'यस उपकरणमा सुरक्षित ट्र्याक निरीक्षण रिपोर्टहरू',
    recentReports: 'हालका रिपोर्टहरू',
    waitingBadge: 'प्रतीक्षारत',
    noReportsTitle: 'अहिलेसम्म कुनै रिपोर्ट छैन',
    noReportsDesc: 'तपाईंले ट्र्याकको जोखिम फोटो खिचेपछि अफलाइन भए पनि यहाँ सुरक्षित रहनेछ।',
    createReportButton: 'नयाँ रिपोर्ट सिर्जना गर्नुहोस्',

    controlOverview: 'नियन्त्रण सारांश',
    dashboardHeader: 'ड्यासबोर्ड',
    dashboardSub: 'DHR ट्र्याक निरीक्षण स्थिति',
    trackStatus: 'ट्र्याक अवस्था',
    totalReports: 'कुल रिपोर्टहरू',
    filters: 'फिल्टरहरू',
    clearFilters: 'हटाउनुहोस्',
    recentHazards: 'हालका जोखिमहरू',
    reportsShown: 'देखाइएको',
    noMatchingReports: 'कुनै पनि रिपोर्ट मेल खाएन',
    sectionsTitle: 'सेक्सनहरू',

    backButton: 'फिर्ता',
    reportNotFound: 'रिपोर्ट फेला परेन',
    reportNotFoundDesc: 'अनुरोध गरिएको निरीक्षण रिपोर्ट स्थानीय भण्डारणमा फेला परेन।',
    returnToReports: 'रिपोर्टहरूमा फर्कनुहोस्',
    confirmedHazard: 'पुष्टि गरिएको जोखिम',
    statusLabel: 'स्थिति',
    gangmanNoteTitle: 'ग्याङ्गम्यानको आधिकारिक निरीक्षण टिप्पणी',
    noNoteProvided: 'थप कुनै टिप्पणी दिइएको छैन।',
    originalAiOutput: 'मूल जेम्मा ४ E2B AI आउटपुट',
    auditedBadge: 'प्रमाणित',
    aiSuggestedTypeLabel: 'AI सुझाव प्रकार:',
    aiSuggestedSeverityLabel: 'AI सुझाव गम्भीरता:',
    supervisorActions: 'पर्यवेक्षक कार्यहरू',
    statusUpdate: 'स्थिति अद्यावधिक',
    actionAcknowledge: 'स्वीकार गरियो',
    actionRequireInsp: 'निरीक्षण चाहियो',
    actionResolved: 'समाधान भयो',
    telemetryTitle: 'ट्र्याक र उपकरण टेलिमेट्री',
    sectionLabel: 'सेक्सन:',
    gpsCoordsLabel: 'GPS निर्देशांक:',
    gpsAccuracyLabel: 'GPS शुद्धता:',
    syncAttemptsLabel: 'सिङ्क प्रयासहरू:',

    hazard_slip: 'पहिरो / भूस्खलन',
    hazard_rockfall: 'ढुङ्गा खस्ने',
    hazard_blocked_drain: 'नाली थुनिएको / बन्द नाली',
    hazard_damaged_wall: 'पर्खाल क्षति / भत्किएको पर्खाल',
    hazard_track_defect: 'ट्र्याक दोष / रेललाइन समस्या',
    hazard_vegetation: 'झाडी / रुखको अवरोध',
    hazard_other: 'अन्य',

    severity_low: 'न्यून गम्भीरता',
    severity_medium: 'मध्यम गम्भीरता',
    severity_high: 'उच्च गम्भीरता',
    severity_critical: 'गम्भीर / संकटकालीन',

    status_open: 'खुला',
    status_acknowledged: 'स्वीकार गरिएको',
    status_inspection_required: 'निरीक्षण आवश्यक',
    status_resolved: 'समाधान भएको',

    allHazards: 'सबै जोखिमहरू',
    allSeverities: 'सबै गम्भीरता',
    allStatuses: 'सबै स्थिति',
    allSections: 'सबै सेक्सनहरू',
  },
};
