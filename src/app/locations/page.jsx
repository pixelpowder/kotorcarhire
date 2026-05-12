import { t, buildAlternates } from '../metadata';
import Locations from '@/src/components/pages/Locations';

export async function generateMetadata() {
  const title = t('en', 'locations.title') + ' | Kotor Car Hire';
  const description = t('en', 'locations.seoDesc');
  return {
    title,
    description,
    alternates: buildAlternates('locations'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function LocationsRoute() {
  return <Locations />;
}
