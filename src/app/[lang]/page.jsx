import { t, buildAlternates, OG_LOCALE } from '../metadata';
import HomeClient from '@/src/HomeClient';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const title = t(lang, 'home.seoDesc').slice(0, 60) + ' | Kotor Car Hire';
  const description = t(lang, 'home.seoDesc');
  return {
    title,
    description,
    alternates: buildAlternates('', lang),
    openGraph: {
      title,
      description,
      locale: OG_LOCALE[lang] || 'en_US',
      type: 'website',
    },
  };
}

export default function LangHomePage() {
  return <HomeClient />;
}
