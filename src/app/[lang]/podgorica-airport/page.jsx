import { t, buildAlternates } from '../../metadata';
import PodgoricaAirport from '@/src/components/pages/PodgoricaAirport';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'podgorica-airport.title') + ' | Montenegro Car Hire',
    description: t(lang, 'podgorica-airport.seoDesc'),
    alternates: buildAlternates('podgorica-airport'),
  };
}

export default function LangPodgoricaAirportRoute() {
  return <PodgoricaAirport />;
}
