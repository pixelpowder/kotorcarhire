import { t, buildAlternates } from '../../metadata';
import KotorNightlifeDining from '@/src/components/pages/blog/KotorNightlifeDining';

export async function generateMetadata() {
  const title = t('en', 'blogDining.title') + ' | Kotor Car Hire';
  const description = t('en', 'blogDining.description');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('blog/kotor-nightlife-dining'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function KotorNightlifeDiningRoute() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t('en', 'blogDining.title'),
    "description": t('en', 'blogDining.description'),
    "image": "https://www.kotorcarhire.com/img/blog-kotor-dining.webp",
    "datePublished": "2026-04-08",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" },
    "publisher": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" }
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <KotorNightlifeDining />
    </>
  );
}
