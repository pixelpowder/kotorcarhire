import { t, buildAlternates } from '../metadata';
import BorderCrossing from '@/src/components/pages/BorderCrossing';

export async function generateMetadata() {
  const title = t('en', 'border-crossing.title') + ' | Kotor Car Hire';
  const description = t('en', 'border-crossing.seoDesc');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('border-crossing-guide'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function BorderCrossingRoute() {
  return <BorderCrossing />;
}
