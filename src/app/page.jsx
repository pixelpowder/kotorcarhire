import { t, buildAlternates, OG_LOCALE } from './metadata';
import HomeClient from '@/src/HomeClient';

export async function generateMetadata() {
  const title = 'Car Hire in Montenegro — Tivat & Podgorica Airport Pickup | Kotor Car Hire';
  const description = t('en', 'home.seoDesc');
  return {
    title,
    description,
    alternates: buildAlternates(''),
    openGraph: {
      title,
      description,
      locale: OG_LOCALE.en,
      type: 'website',
    },
  };
}

export default function HomePage() {
  return <HomeClient />;
}
