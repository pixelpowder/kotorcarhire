import { t, buildAlternates } from '../metadata';
import TivatAirport from '@/src/components/pages/TivatAirport';

export async function generateMetadata() {
  const title = t('en', 'tivat-airport.title') + ' | Kotor Car Hire';
  const description = t('en', 'tivat-airport.seoDesc');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('tivat-airport'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function TivatAirportRoute() {
  return <TivatAirport />;
}
