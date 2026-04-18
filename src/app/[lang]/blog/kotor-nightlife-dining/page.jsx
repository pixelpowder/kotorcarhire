import { t, buildAlternates } from '../../../metadata';
import KotorNightlifeDining from '@/src/components/pages/blog/KotorNightlifeDining';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'blogDining.title') + ' | Kotor Car Hire',
    description: t(lang, 'blogDining.description'),
    alternates: buildAlternates('blog/kotor-nightlife-dining', lang),
  };
}

export default function LangKotorNightlifeDiningRoute() {
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
