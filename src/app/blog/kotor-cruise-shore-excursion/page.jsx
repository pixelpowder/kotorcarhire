import { t, buildAlternates } from '../../metadata';
import KotorCruiseShoreExcursion from '@/src/components/pages/blog/KotorCruiseShoreExcursion';

export async function generateMetadata() {
  const title = t('en', 'blogCruise.title') + ' | Kotor Car Hire';
  const description = t('en', 'blogCruise.description');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('blog/kotor-cruise-shore-excursion'),
    openGraph: { title, description, type: 'website' },
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
