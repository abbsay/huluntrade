import { FLAT_LOCALES, RTL_LANGS } from './config';

export const SUPPORTED_LANGS = ['en', 'ar', 'ru', 'fr'] as const;
export type SupportedLang = typeof SUPPORTED_LANGS[number];
export const DEFAULT_LANG: SupportedLang = 'en';

export function isRTL(lang: string): boolean {
  return RTL_LANGS.includes(lang);
}

export function getLangFromUrl(url: URL): SupportedLang {
  const [, lang] = url.pathname.split('/');
  if (lang && SUPPORTED_LANGS.includes(lang as SupportedLang)) {
    return lang as SupportedLang;
  }
  return DEFAULT_LANG;
}

export function useTranslations(lang: string) {
  const currentDict = (FLAT_LOCALES as Record<string, Record<string, string>>)[lang] || {};
  const fallbackDict = (FLAT_LOCALES as Record<string, Record<string, string>>)[DEFAULT_LANG] || {};

  return function t(key: string, fallback?: string): string {
    const val = currentDict[key] ?? fallbackDict[key] ?? fallback ?? key;
    return typeof val === 'string'
      ? val.replace('{year}', String(new Date().getFullYear()))
      : String(val);
  };
}

export function useTranslatedPath(lang: string) {
  return function translatePath(path: string, targetLang: string = lang): string {
    // Clean leading slash
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    // Remove existing lang prefix if any
    const segments = cleanPath.split('/').filter(Boolean);
    let restPath = cleanPath;
    if (segments.length > 0 && SUPPORTED_LANGS.includes(segments[0] as SupportedLang)) {
      restPath = '/' + segments.slice(1).join('/');
      if (restPath === '') restPath = '/';
    }

    if (targetLang === DEFAULT_LANG) {
      return restPath;
    }
    return restPath === '/' ? `/${targetLang}` : `/${targetLang}${restPath}`;
  };
}
