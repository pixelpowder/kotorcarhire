import { t, buildAlternates } from '../metadata';
import DubrovnikAirport from '@/src/components/pages/DubrovnikAirport';

export async function generateMetadata() {
  return {
    title: t('en', 'dubrovnik-airport.title') + ' | Montenegro Car Hire',
    description: t('en', 'dubrovnik-airport.seoDesc'),
    alternates: buildAlternates('dubrovnik-airport'),
  };
}

export default function DubrovnikAirportRoute() {
  return <DubrovnikAirport />;
}
