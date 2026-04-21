import { t, buildAlternates } from '../../metadata';
import KotorToLovcenDrive from '@/src/components/pages/blog/KotorToLovcenDrive';

export async function generateMetadata() {
  const title = t('en', 'blogLovcen.title') + ' | Kotor Car Hire';
  const description = t('en', 'blogLovcen.description');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('blog/kotor-to-lovcen-drive'),
    openGraph: { title, description, type: 'website' },
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
