import { t, buildAlternates } from '../metadata';
import DubrovnikAirport from '@/src/components/pages/DubrovnikAirport';

export async function generateMetadata() {
  const title = t('en', 'dubrovnik-airport.title') + ' | Kotor Car Hire';
  const description = t('en', 'dubrovnik-airport.seoDesc');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('dubrovnik-airport'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function DubrovnikAirportRoute() {
  return <DubrovnikAirport />;
}
