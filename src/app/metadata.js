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
  // Fallback to English
  let fallback = translations.en;
  for (const p of parts) fallback = fallback?.[p];
  return fallback || key;
}

const SITE_NAME = 'Montenegro Car Hire';
const BASE_URL = 'https://www.montenegrocarhire.com';

export function buildAlternates(slug) {
  const path = slug ? `/${slug}` : '';
  return {
    canonical: `${BASE_URL}${path}`,
    languages: {
      'en': path || '/',
      'de': `/de${path || '/'}`,
      'ru': `/ru${path || '/'}`,
      'it': `/it${path || '/'}`,
      'fr': `/fr${path || '/'}`,
      'x-default': path || '/',
    },
  };
}

export function buildMetadata(lang, titleKey, descKey, slug) {
  const resolvedLang = lang || 'en';
  const title = t(resolvedLang, titleKey);
  const desc = t(resolvedLang, descKey);
  const displayTitle = title !== titleKey ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    title: displayTitle,
    description: desc !== descKey ? desc : undefined,
    alternates: buildAlternates(slug),
  };
}
