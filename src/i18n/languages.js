export const SUPPORTED_LANGS = ['en', 'de', 'ru', 'it', 'fr', 'me'];
export const DEFAULT_LANG = 'en';

export const LANG_LABELS = {
  en: 'EN',
  de: 'DE',
  ru: 'RU',
  it: 'IT',
  fr: 'FR',
  me: 'ME',
};

// hreflang codes for SEO
export const LANG_HREFLANG = {
  en: 'en',
  de: 'de',
  ru: 'ru',
  it: 'it',
  fr: 'fr',
  me: 'cnr', // Montenegrin ISO 639-3
};

// LocalRent widget locale codes
export const WIDGET_LOCALE = {
  en: 'en',
  de: 'de',
  ru: 'ru',
  it: 'it',
  fr: 'fr',
  me: 'en', // fallback to English for Montenegrin
};

export function isLangPrefix(segment) {
  return SUPPORTED_LANGS.includes(segment) && segment !== DEFAULT_LANG;
}
