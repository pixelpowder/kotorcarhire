import { t, buildAlternates } from '../../metadata';
import Locations from '@/src/components/pages/Locations';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'locations.title') + ' | Kotor Car Hire',
    description: t(lang, 'locations.seoDesc'),
    alternates: buildAlternates('locations', lang),
  };
}

export default function LangLocationsRoute() {
  return <Locations />;
}
