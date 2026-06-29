// Re-export hook + constants from the provider module so existing
// `import { useI18n, LANG_OPTIONS } from '../i18n'` calls keep working,
// while the provider file stays component-only (react-refresh friendly).
export { useI18n } from './context.js';
export { I18nProvider } from './provider.jsx';
export { LANG_OPTIONS, LOCALES, RTL_LANGS } from './config.js';
