import { useState, useEffect, useCallback } from 'react';
import { LOCALES, RTL_LANGS, STORAGE_KEY, FLAT_LOCALES } from './config.js';
import { I18nContext } from './context.js';

// Apply RTL and lang attribute to <html>
function applyLangToDOM(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && LOCALES[saved]) {
        setLang(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    applyLangToDOM(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore quota / disabled storage */
    }
  }, [lang]);

  const t = useCallback(
    (key) => {
      const str = FLAT_LOCALES[lang]?.[key] ?? FLAT_LOCALES['en']?.[key] ?? key;
      return typeof str === 'string'
        ? str.replace('{year}', new Date().getFullYear())
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
