import { t, buildAlternates } from '../../metadata';
import DubrovnikAirport from '@/src/components/pages/DubrovnikAirport';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'dubrovnik-airport.title') + ' | Montenegro Car Hire',
    description: t(lang, 'dubrovnik-airport.seoDesc'),
    alternates: buildAlternates('dubrovnik-airport'),
  };
}

export default function LangDubrovnikAirportRoute() {
  return <DubrovnikAirport />;
}
