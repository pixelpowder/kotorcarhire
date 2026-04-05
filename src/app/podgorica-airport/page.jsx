import { t, buildAlternates } from '../metadata';
import PodgoricaAirport from '@/src/components/pages/PodgoricaAirport';

export async function generateMetadata() {
  return {
    title: t('en', 'podgorica-airport.title') + ' | Montenegro Car Hire',
    description: t('en', 'podgorica-airport.seoDesc'),
    alternates: buildAlternates('podgorica-airport'),
  };
}

export default function PodgoricaAirportRoute() {
  return <PodgoricaAirport />;
}
