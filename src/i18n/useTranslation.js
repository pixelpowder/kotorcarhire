'use client';
import { useLanguage } from './LanguageContext';
import { DEFAULT_LANG } from './languages';

import en from './locales/en.json';
import de from './locales/de.json';
import ru from './locales/ru.json';
import it from './locales/it.json';
import fr from './locales/fr.json';
import me from './locales/me.json';

const translations = { en, de, ru, it, fr, me };

function getNestedValue(obj, path) {
  return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
}

export default function useTranslation() {
  const lang = useLanguage();

  function t(key, fallback) {
    const value = getNestedValue(translations[lang], key);
    if (value !== undefined) return value;
    // Fallback to English
    const enFallback = getNestedValue(translations[DEFAULT_LANG], key);
    if (enFallback !== undefined) return enFallback;
    // If an explicit fallback was provided, use it
    if (fallback !== undefined) return fallback;
    // Return empty string instead of the raw key — so that the `t(...) || 'default'`
    // pattern in callers works correctly (raw key is truthy and blocks the fallback).
    return '';
  }

  function localePath(path) {
    if (lang === DEFAULT_LANG) return path;
    // Handle anchor links like /#fleet
    if (path.startsWith('/#')) return `/${lang}${path}`;
    // Handle absolute paths
    if (path.startsWith('/')) return `/${lang}${path}`;
    return `/${lang}/${path}`;
  }

  return { t, lang, localePath };
}
