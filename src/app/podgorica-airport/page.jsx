import { t, buildAlternates } from '../metadata';
import PodgoricaAirport from '@/src/components/pages/PodgoricaAirport';

export async function generateMetadata() {
  const title = t('en', 'podgorica-airport.title') + ' | Kotor Car Hire';
  const description = t('en', 'podgorica-airport.seoDesc');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('podgorica-airport'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function PodgoricaAirportRoute() {
  return <PodgoricaAirport />;
}
