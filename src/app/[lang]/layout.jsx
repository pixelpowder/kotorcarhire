import { notFound } from 'next/navigation';
import { SUPPORTED_LANGS, DEFAULT_LANG } from '@/src/i18n/languages';
import { LanguageContext } from '@/src/i18n/LanguageContext';

// Only generate pages for non-default languages (en has no prefix)
const LANG_PREFIXES = SUPPORTED_LANGS.filter(l => l !== DEFAULT_LANG);

export function generateStaticParams() {
  return LANG_PREFIXES.map(lang => ({ lang }));
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;

  if (!LANG_PREFIXES.includes(lang)) {
    notFound();
  }

  return (
    <LanguageContext value={lang}>
      {children}
    </LanguageContext>
  );
}
