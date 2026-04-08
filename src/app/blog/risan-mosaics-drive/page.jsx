import { t, buildAlternates } from '../../metadata';
import RisanMosaicsDrive from '@/src/components/pages/blog/RisanMosaicsDrive';

export async function generateMetadata() {
  return {
    title: t('en', 'blogRisan.title') + ' | Kotor Car Hire',
    description: t('en', 'blogRisan.description'),
    alternates: buildAlternates('blog/risan-mosaics-drive'),
  };
}

export default function RisanMosaicsDriveRoute() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t('en', 'blogRisan.title'),
    "description": t('en', 'blogRisan.description'),
    "image": "https://www.kotorcarhire.com/img/blog-risan-mosaics.webp",
    "datePublished": "2026-04-08",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" },
    "publisher": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" }
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <RisanMosaicsDrive />
    </>
  );
}
