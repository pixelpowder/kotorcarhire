import { t, buildAlternates } from '../metadata';
import Budva from '@/src/components/pages/Budva';

export async function generateMetadata() {
  return {
    title: t('en', 'budva.title') + ' | Montenegro Car Hire',
    description: t('en', 'budva.seoDesc'),
    alternates: buildAlternates('budva'),
  };
}

export default function BudvaRoute() {
  return <Budva />;
}
