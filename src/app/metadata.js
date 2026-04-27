import en from '@/src/i18n/locales/en.json';
import de from '@/src/i18n/locales/de.json';
import ru from '@/src/i18n/locales/ru.json';
import it from '@/src/i18n/locales/it.json';
import fr from '@/src/i18n/locales/fr.json';
import me from '@/src/i18n/locales/me.json';
import { LANG_HREFLANG } from '@/src/i18n/languages';

const translations = { en, de, ru, it, fr, me };

export function t(lang, key) {
  const parts = key.split('.');
  let val = translations[lang || 'en'];
  for (const p of parts) val = val?.[p];
  if (val !== undefined) return val;
  let fallback = translations.en;
  for (const p of parts) fallback = fallback?.[p];
  return fallback || key;
}

const SITE_NAME = 'Kotor Car Hire';
const BASE_URL = 'https://www.kotorcarhire.com';

export const OG_LOCALE = {
  en: 'en_US',
  de: 'de_DE',
  fr: 'fr_FR',
  it: 'it_IT',
  ru: 'ru_RU',
  me: 'sr_ME',
};

export function buildAlternates(slug, lang = 'en') {
  const path = slug ? `/${slug}` : '';
  const canonicalPath = !lang || lang === 'en' ? path : `/${lang}${path}`;
  return {
    canonical: `${BASE_URL}${canonicalPath || '/'}`,
    languages: {
      // hreflang URLs must match the canonical (no trailing slash for non-
      // root paths) so Google doesn't follow a 308 on every alternate.
      'en': path || '/',
      'de': `/de${path}`,
      'ru': `/ru${path}`,
      'it': `/it${path}`,
      'fr': `/fr${path}`,
      'cnr': `/me${path}`,
      'x-default': path || '/',
    },
  };
}

export function buildMetadata(lang, titleKey, descKey, slug) {
  const resolvedLang = lang || 'en';
  const title = t(resolvedLang, titleKey);
  const desc = t(resolvedLang, descKey);
  const displayTitle = title !== titleKey ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const resolvedDesc = desc !== descKey ? desc : undefined;

  return {
    title: displayTitle,
    description: resolvedDesc,
    alternates: buildAlternates(slug, resolvedLang),
    openGraph: {
      title: displayTitle,
      description: resolvedDesc,
      locale: OG_LOCALE[resolvedLang] || 'en_US',
      type: 'website',
    },
  };
}
