import React, { useState, useEffect, useCallback } from 'react';
import { LOCALES, RTL_LANGS, STORAGE_KEY, FLAT_LOCALES } from './config.js';
import { I18nContext } from './context.js';

// Apply RTL and lang attribute to <html>
function applyLangToDOM(lang: string) {
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && saved in LOCALES) {
          return saved;
        }
      } catch {
        /* ignore */
      }
    }
    return 'en';
  });

  useEffect(() => {
    applyLangToDOM(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore quota / disabled storage */
    }
  }, [lang]);

  const t = useCallback(
    (key: string) => {
      const locales = FLAT_LOCALES as Record<string, Record<string, string>>;
      const str = locales[lang]?.[key] ?? locales['en']?.[key] ?? key;
      return typeof str === 'string'
        ? str.replace('{year}', String(new Date().getFullYear()))
        : key;
    },
    [lang]
  );

  const isRTL = RTL_LANGS.includes(lang);

  return (
    <I18nContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
}
