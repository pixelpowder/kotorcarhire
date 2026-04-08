import { t, buildAlternates } from '../../metadata';
import KotorCityWallsHike from '@/src/components/pages/blog/KotorCityWallsHike';

export async function generateMetadata() {
  return {
    title: t('en', 'blogWalls.title') + ' | Kotor Car Hire',
    description: t('en', 'blogWalls.description'),
    alternates: buildAlternates('blog/kotor-city-walls-hike'),
  };
}

export default function KotorCityWallsHikeRoute() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t('en', 'blogWalls.title'),
    "description": t('en', 'blogWalls.description'),
    "image": "https://www.kotorcarhire.com/img/blog-kotor-walls.webp",
    "datePublished": "2026-04-08",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" },
    "publisher": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" }
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <KotorCityWallsHike />
    </>
  );
}
