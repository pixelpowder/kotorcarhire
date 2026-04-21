import { t, buildAlternates } from '../metadata';
import Perast from '@/src/components/pages/Perast';

export async function generateMetadata() {
  const title = t('en', 'perast.title') + ' | Kotor Car Hire';
  const description = t('en', 'perast.seoDesc');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('perast'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function PerastRoute() {
  return <Perast />;
}
