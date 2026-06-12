import { t, buildAlternates, OG_LOCALE } from './metadata';
import HomeClient from '@/src/HomeClient';
import { getHeroIdx } from '@/src/lib/heroRotation';

const SITE_URL = 'https://www.kotorcarhire.com';
const SITE_NAME = 'Kotor Car Hire';

export async function generateMetadata() {
  const title = 'Car Hire in Montenegro, Tivat & Podgorica Airport Pickup | Kotor Car Hire';
  const description = t('en', 'home.seoDesc');
  return {
    title,
    description,
    alternates: buildAlternates(''),
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: SITE_NAME,
      type: 'website',
      locale: OG_LOCALE.en,
      alternateLocale: ['de_DE', 'fr_FR', 'it_IT', 'ru_RU', 'sr_ME'],
      images: [{ url: `${SITE_URL}/hero-bg.webp`, width: 1200, height: 630, alt: SITE_NAME }],
    },
  };
}

export default function HomePage() {
  // Computed per request (homepage is dynamically rendered) so the hero
  // image rotates day to day. Passed down so the SSR <img> matches the
  // layout <link rel=preload> for the same request.
  return <HomeClient heroIdx={getHeroIdx()} />;
}
