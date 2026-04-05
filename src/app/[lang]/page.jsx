import { t, buildAlternates } from '../metadata';
import HomeClient from '@/src/HomeClient';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'home.seoDesc').slice(0, 60) + ' | Montenegro Car Hire',
    description: t(lang, 'home.seoDesc'),
    alternates: buildAlternates(''),
  };
}

export default function LangHomePage() {
  return <HomeClient />;
}
