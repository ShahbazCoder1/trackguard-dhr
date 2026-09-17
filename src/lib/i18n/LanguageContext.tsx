'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Language, Translations, translations } from './translations';
import { HazardType, InspectionStatus, Severity } from '../types';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
  hazardLabel: (type: HazardType | string) => string;
  severityLabel: (severity: Severity | string) => string;
  statusLabel: (status: InspectionStatus | string) => string;
  sectionLabel: (section: string) => string;
  formatDate: (timestamp: string | Date) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'tg_language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved && (saved === 'en' || saved === 'bn' || saved === 'ne')) {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  const t = useMemo(() => {
    const dict = translations[language] || translations.en;
    return (key: keyof Translations): string => {
      return dict[key] || translations.en[key] || String(key);
    };
  }, [language]);

  const hazardLabel = useMemo(() => {
    const dict = translations[language] || translations.en;
    return (type: HazardType | string): string => {
      const key = `hazard_${type}` as keyof Translations;
      return dict[key] || translations.en[key] || type;
    };
  }, [language]);

  const severityLabel = useMemo(() => {
    const dict = translations[language] || translations.en;
    return (severity: Severity | string): string => {
      const key = `severity_${severity.toLowerCase()}` as keyof Translations;
      return dict[key] || translations.en[key] || severity;
    };
  }, [language]);

  const statusLabel = useMemo(() => {
    const dict = translations[language] || translations.en;
    return (status: InspectionStatus | string): string => {
      const key = `status_${status.toLowerCase()}` as keyof Translations;
      return dict[key] || translations.en[key] || status;
    };
  }, [language]);

  const sectionLabel = useMemo(() => {
    return (section: string): string => {
      if (!section) return '';
      if (language === 'bn') {
        return section
          .replace('kurseong-ghum', 'কার্শিয়াং → ঘুম')
          .replace('Kurseong → Ghum', 'কার্শিয়াং → ঘুম')
          .replace('ghum-darjeeling', 'ঘুম → দার্জিলিং')
          .replace('Ghum → Darjeeling', 'ঘুম → দার্জিলিং');
      }
      if (language === 'ne') {
        return section
          .replace('kurseong-ghum', 'खर्साङ → घूम')
          .replace('Kurseong → Ghum', 'खर्साङ → घूम')
          .replace('ghum-darjeeling', 'घूम → दार्जिलिङ')
          .replace('Ghum → Darjeeling', 'घूम → दार्जिलिङ');
      }
      return section.replace('-', ' → ');
    };
  }, [language]);

  const formatDate = useMemo(() => {
    const locale = language === 'bn' ? 'bn-IN' : language === 'ne' ? 'ne-NP' : 'en-IN';
    const dict = translations[language] || translations.en;
    const todayLabel = dict.today || 'Today';

    return (timestamp: string | Date): string => {
      const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
      if (Number.isNaN(date.getTime())) return String(timestamp);

      const now = new Date();
      const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

      if (isToday) {
        return `${todayLabel}, ${date.toLocaleString(locale, {
          hour: '2-digit',
          minute: '2-digit',
        })}`;
      }

      return date.toLocaleString(locale, {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    };
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      hazardLabel,
      severityLabel,
      statusLabel,
      sectionLabel,
      formatDate,
    }),
    [language, t, hazardLabel, severityLabel, statusLabel, sectionLabel, formatDate]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: (key: keyof Translations) => translations.en[key] || String(key),
      hazardLabel: (type: HazardType | string) => {
        const key = `hazard_${type}` as keyof Translations;
        return translations.en[key] || type;
      },
      severityLabel: (severity: Severity | string) => {
        const key = `severity_${severity.toLowerCase()}` as keyof Translations;
        return translations.en[key] || severity;
      },
      statusLabel: (status: InspectionStatus | string) => {
        const key = `status_${status.toLowerCase()}` as keyof Translations;
        return translations.en[key] || status;
      },
      sectionLabel: (section: string) => section.replace('-', ' → '),
      formatDate: (timestamp: string | Date) => {
        const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
        if (Number.isNaN(date.getTime())) return String(timestamp);
        return date.toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
    };
  }
  return context;
}
