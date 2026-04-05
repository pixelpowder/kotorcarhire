import { t, buildAlternates } from '../metadata';
import TivatAirport from '@/src/components/pages/TivatAirport';

export async function generateMetadata() {
  return {
    title: t('en', 'tivat-airport.title') + ' | Montenegro Car Hire',
    description: t('en', 'tivat-airport.seoDesc'),
    alternates: buildAlternates('tivat-airport'),
  };
}

export default function TivatAirportRoute() {
  return <TivatAirport />;
}
