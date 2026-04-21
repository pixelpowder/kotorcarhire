import { t, buildAlternates } from '../../metadata';
import KotorPhotographySpots from '@/src/components/pages/blog/KotorPhotographySpots';

export async function generateMetadata() {
  const title = t('en', 'blogPhoto.title') + ' | Kotor Car Hire';
  const description = t('en', 'blogPhoto.description');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('blog/kotor-photography-spots'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function KotorPhotographySpotsRoute() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t('en', 'blogPhoto.title'),
    "description": t('en', 'blogPhoto.description'),
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
