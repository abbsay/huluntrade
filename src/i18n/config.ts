import en from './locales/en.json';
import ar from './locales/ar.json';
import ru from './locales/ru.json';
import fr from './locales/fr.json';

export const LOCALES = { en, ar, ru, fr };
export const RTL_LANGS = ['ar'];
export const STORAGE_KEY = 'madasweet-lang';

export const LANG_OPTIONS = [
  { code: 'en', label: 'EN', native: 'English' },
  { code: 'ar', label: 'AR', native: 'عربي' },
  { code: 'ru', label: 'RU', native: 'Русский' },
  { code: 'fr', label: 'FR', native: 'Français' },
];

// Flatten nested keys: { nav: { home: 'Home' } } -> { 'nav.home': 'Home' }
function flatten(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'object' && val !== null) {
      Object.assign(acc, flatten(val, fullKey));
    } else {
      acc[fullKey] = val;
    }
    return acc;
  }, {});
}

export const FLAT_LOCALES = Object.fromEntries(
  Object.entries(LOCALES).map(([lang, dict]) => [lang, flatten(dict)])
);
