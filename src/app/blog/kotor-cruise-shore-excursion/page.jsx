import { t, buildAlternates } from '../../metadata';
import KotorCruiseShoreExcursion from '@/src/components/pages/blog/KotorCruiseShoreExcursion';

export async function generateMetadata() {
  return {
    title: t('en', 'blogCruise.title') + ' | Kotor Car Hire',
    description: t('en', 'blogCruise.description'),
    alternates: buildAlternates('blog/kotor-cruise-shore-excursion'),
  };
}

export default function KotorCruiseShoreExcursionRoute() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t('en', 'blogCruise.title'),
    "description": t('en', 'blogCruise.description'),
    "image": "https://www.kotorcarhire.com/img/blog-cruise-port.webp",
    "datePublished": "2026-04-08",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" },
    "publisher": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" }
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <KotorCruiseShoreExcursion />
    </>
  );
}
