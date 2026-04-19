import { t, buildAlternates } from '../../../metadata';
import KotorOldTownCats from '@/src/components/pages/blog/KotorOldTownCats';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'blogCats.title') + ' | Kotor Car Hire',
    description: t(lang, 'blogCats.description'),
    alternates: buildAlternates('blog/kotor-old-town-cats', lang),
  };
}

export default async function LangKotorOldTownCatsRoute({ params }) {
  const { lang } = await params;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t(lang, 'blogCats.title'),
    "description": t(lang, 'blogCats.description'),
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
