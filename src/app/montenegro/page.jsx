import { t, buildAlternates } from '../metadata';
import Montenegro from '@/src/components/pages/Montenegro';

export async function generateMetadata() {
  const title = t('en', 'montenegro.title') + ' | Kotor Car Hire';
  const description = t('en', 'montenegro.seoDesc');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('montenegro'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function MontenegroRoute() {
  return <Montenegro />;
}
