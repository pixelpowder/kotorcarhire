'use client';

// Client-side LanguageContext provider that re-derives the current locale from
// the URL pathname on every navigation. Wraps the root layout so client-side
// nav (router.push) from /de/book back to /book correctly updates the locale
// context — the server-rendered root layout alone can't do this because it
// doesn't re-run on client-side transitions.

import { usePathname } from 'next/navigation';
import { LanguageContext } from './LanguageContext';
import { SUPPORTED_LANGS, DEFAULT_LANG } from './languages';

export default function DynamicLanguageProvider({ children, initialLang }) {
  const pathname = usePathname() || '/';
  const first = pathname.replace(/^\//, '').split('/')[0];
  const lang = SUPPORTED_LANGS.includes(first) && first !== DEFAULT_LANG
    ? first
    : DEFAULT_LANG;
  const active = lang || initialLang || DEFAULT_LANG;
  return <LanguageContext value={active}>{children}</LanguageContext>;
}
