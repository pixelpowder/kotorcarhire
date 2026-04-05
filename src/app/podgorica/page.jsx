import { t, buildAlternates } from '../metadata';
import Podgorica from '@/src/components/pages/Podgorica';

export async function generateMetadata() {
  return {
    title: t('en', 'podgorica.title') + ' | Montenegro Car Hire',
    description: t('en', 'podgorica.seoDesc'),
    alternates: buildAlternates('podgorica'),
  };
}

export default function PodgoricaRoute() {
  return <Podgorica />;
}
