import { t, buildAlternates } from '../metadata';
import BorderCrossing from '@/src/components/pages/BorderCrossing';

export async function generateMetadata() {
  return {
    title: t('en', 'border-crossing.title') + ' | Montenegro Car Hire',
    description: t('en', 'border-crossing.seoDesc'),
    alternates: buildAlternates('border-crossing-guide'),
  };
}

export default function BorderCrossingRoute() {
  return <BorderCrossing />;
}
