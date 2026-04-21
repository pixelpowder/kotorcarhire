import { t, buildAlternates } from '../metadata';
import Budva from '@/src/components/pages/Budva';

export async function generateMetadata() {
  const title = t('en', 'budva.title') + ' | Kotor Car Hire';
  const description = t('en', 'budva.seoDesc');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('budva'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function BudvaRoute() {
  return <Budva />;
}
