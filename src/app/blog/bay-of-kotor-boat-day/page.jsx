import { t, buildAlternates } from '../../metadata';
import BayOfKotorBoatDay from '@/src/components/pages/blog/BayOfKotorBoatDay';

export async function generateMetadata() {
  return {
    title: t('en', 'blogBoat.title') + ' | Kotor Car Hire',
    description: t('en', 'blogBoat.description'),
    alternates: buildAlternates('blog/bay-of-kotor-boat-day'),
  };
}

export default function BayOfKotorBoatDayRoute() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t('en', 'blogBoat.title'),
    "description": t('en', 'blogBoat.description'),
    "image": "https://www.kotorcarhire.com/img/blog-bay-boat.webp",
    "datePublished": "2026-04-08",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" },
    "publisher": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" }
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BayOfKotorBoatDay />
    </>
  );
}
