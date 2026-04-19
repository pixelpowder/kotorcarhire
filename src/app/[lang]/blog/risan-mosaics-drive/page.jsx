import { t, buildAlternates } from '../../../metadata';
import RisanMosaicsDrive from '@/src/components/pages/blog/RisanMosaicsDrive';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'blogRisan.title') + ' | Kotor Car Hire',
    description: t(lang, 'blogRisan.description'),
    alternates: buildAlternates('blog/risan-mosaics-drive', lang),
  };
}

export default function LangRisanMosaicsDriveRoute() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t(lang, 'blogRisan.title'),
    "description": t(lang, 'blogRisan.description'),
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
