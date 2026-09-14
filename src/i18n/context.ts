import { createContext, useContext } from 'react';
import { FLAT_LOCALES } from './config';

export interface I18nContextType {
  lang: string;
  setLang: (lang: string) => void;
  isRTL?: boolean;
  t: (key: string, fallback?: string) => string;
}

const defaultI18n: I18nContextType = {
  lang: 'en',
  setLang: () => {},
  isRTL: false,
  t: (key: string, fallback?: string) => {
    const dict = FLAT_LOCALES?.['en'] as Record<string, string> | undefined;
    const str = dict?.[key] ?? fallback ?? key;
    return typeof str === 'string'
      ? str.replace('{year}', String(new Date().getFullYear()))
      : String(str);
  },
};

export const I18nContext = createContext<I18nContextType>(defaultI18n);

export function useI18n() {
  const ctx = useContext(I18nContext);
  return ctx || defaultI18n;
}
