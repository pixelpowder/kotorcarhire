import { t, buildAlternates } from '../../../metadata';
import KotorPhotographySpots from '@/src/components/pages/blog/KotorPhotographySpots';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'blogPhoto.title') + ' | Kotor Car Hire',
    description: t(lang, 'blogPhoto.description'),
    alternates: buildAlternates('blog/kotor-photography-spots', lang),
  };
}

export default function LangKotorPhotographySpotsRoute() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t(lang, 'blogPhoto.title'),
    "description": t(lang, 'blogPhoto.description'),
    "image": "https://www.kotorcarhire.com/img/blog-kotor-photo.webp",
    "datePublished": "2026-04-08",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" },
    "publisher": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" }
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <KotorPhotographySpots />
    </>
  );
}
