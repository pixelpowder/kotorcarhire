import { t, buildAlternates } from '../../metadata';
import KotorOldTownCats from '@/src/components/pages/blog/KotorOldTownCats';

export async function generateMetadata() {
  return {
    title: t('en', 'blogCats.title') + ' | Kotor Car Hire',
    description: t('en', 'blogCats.description'),
    alternates: buildAlternates('blog/kotor-old-town-cats'),
  };
}

export default function KotorOldTownCatsRoute() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t('en', 'blogCats.title'),
    "description": t('en', 'blogCats.description'),
    "image": "https://www.kotorcarhire.com/img/blog-kotor-cats.webp",
    "datePublished": "2026-04-08",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" },
    "publisher": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" }
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <KotorOldTownCats />
    </>
  );
}
