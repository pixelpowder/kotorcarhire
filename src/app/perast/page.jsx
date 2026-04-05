import { t, buildAlternates } from '../metadata';
import Perast from '@/src/components/pages/Perast';

export async function generateMetadata() {
  return {
    title: t('en', 'perast.title') + ' | Montenegro Car Hire',
    description: t('en', 'perast.seoDesc'),
    alternates: buildAlternates('perast'),
  };
}

export default function PerastRoute() {
  return <Perast />;
}
