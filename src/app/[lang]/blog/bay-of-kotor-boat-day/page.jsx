import { t, buildAlternates } from '../../../metadata';
import BayOfKotorBoatDay from '@/src/components/pages/blog/BayOfKotorBoatDay';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'blogBoat.title') + ' | Kotor Car Hire',
    description: t(lang, 'blogBoat.description'),
    alternates: buildAlternates('blog/bay-of-kotor-boat-day', lang),
  };
}

export default async function LangBayOfKotorBoatDayRoute({ params }) {
  const { lang } = await params;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t(lang, 'blogBoat.title'),
    "description": t(lang, 'blogBoat.description'),
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
