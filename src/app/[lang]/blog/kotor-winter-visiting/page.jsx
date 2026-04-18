import { t, buildAlternates } from '../../../metadata';
import KotorWinterVisiting from '@/src/components/pages/blog/KotorWinterVisiting';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'blogWinter.title') + ' | Kotor Car Hire',
    description: t(lang, 'blogWinter.description'),
    alternates: buildAlternates('blog/kotor-winter-visiting', lang),
  };
}

export default function LangKotorWinterVisitingRoute() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t('en', 'blogWinter.title'),
    "description": t('en', 'blogWinter.description'),
    "image": "https://www.kotorcarhire.com/img/blog-kotor-winter.webp",
    "datePublished": "2026-04-08",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" },
    "publisher": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" }
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <KotorWinterVisiting />
    </>
  );
}
