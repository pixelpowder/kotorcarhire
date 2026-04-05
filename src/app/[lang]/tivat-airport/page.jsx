import { t, buildAlternates } from '../../metadata';
import TivatAirport from '@/src/components/pages/TivatAirport';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'tivat-airport.title') + ' | Montenegro Car Hire',
    description: t(lang, 'tivat-airport.seoDesc'),
    alternates: buildAlternates('tivat-airport'),
  };
}

export default function LangTivatAirportRoute() {
  return <TivatAirport />;
}
