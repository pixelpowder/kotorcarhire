import { t, buildAlternates } from '../../metadata';
import KotorToLovcenDrive from '@/src/components/pages/blog/KotorToLovcenDrive';

export async function generateMetadata() {
  return {
    title: t('en', 'blogLovcen.title') + ' | Kotor Car Hire',
    description: t('en', 'blogLovcen.description'),
    alternates: buildAlternates('blog/kotor-to-lovcen-drive'),
  };
}

export default function KotorToLovcenDriveRoute() {
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
