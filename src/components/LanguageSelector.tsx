'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Language } from '@/lib/i18n/translations';

interface LanguageSelectorProps {
  compact?: boolean;
  className?: string;
}

const LANGUAGES: { code: Language; label: string; short: string; localName: string }[] = [
  { code: 'en', label: 'English', short: 'EN', localName: 'English' },
  { code: 'bn', label: 'Bengali', short: 'বাং', localName: 'বাংলা' },
  { code: 'ne', label: 'Nepali', short: 'नेप', localName: 'नेपाली' },
];

export default function LanguageSelector({
  compact = false,
  className = '',
}: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-xl border p-0.5 shadow-sm backdrop-blur-sm ${className}`}
      style={{
        backgroundColor: 'var(--tg-surface-container)',
        borderColor: 'var(--tg-outline)',
      }}
      role="group"
      aria-label="Select Language"
    >
      <div className="flex items-center pl-2 pr-1 text-slate-400">
        <Globe className="h-3.5 w-3.5" style={{ color: 'var(--tg-primary)' }} />
      </div>

      <div className="flex items-center gap-0.5">
        {LANGUAGES.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`rounded-lg px-2 py-1 text-xs font-semibold transition-all ${
                isActive
                  ? 'shadow-sm'
                  : 'hover:text-white'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--tg-primary)' : 'transparent',
                color: isActive ? 'var(--tg-on-primary)' : 'var(--tg-on-surface-variant)',
              }}
              title={lang.localName}
            >
              {compact ? lang.short : lang.localName}
            </button>
          );
        })}
      </div>
    </div>
  );
}
