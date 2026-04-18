import { t, buildAlternates } from '../../../metadata';
import KotorToLovcenDrive from '@/src/components/pages/blog/KotorToLovcenDrive';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'blogLovcen.title') + ' | Kotor Car Hire',
    description: t(lang, 'blogLovcen.description'),
    alternates: buildAlternates('blog/kotor-to-lovcen-drive'),
  };
}

export default function LangKotorToLovcenDriveRoute() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t('en', 'blogLovcen.title'),
    "description": t('en', 'blogLovcen.description'),
    "image": "https://www.kotorcarhire.com/img/blog-lovcen-road.webp",
    "datePublished": "2026-04-08",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" },
    "publisher": { "@type": "Organization", "name": "Kotor Car Hire", "url": "https://www.kotorcarhire.com" }
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <KotorToLovcenDrive />
    </>
  );
}
