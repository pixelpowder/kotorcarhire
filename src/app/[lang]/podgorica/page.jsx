import { t, buildAlternates } from '../../metadata';
import Podgorica from '@/src/components/pages/Podgorica';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'podgorica.title') + ' | Kotor Car Hire',
    description: t(lang, 'podgorica.seoDesc'),
    alternates: buildAlternates('podgorica', lang),
  };
}

export default function LangPodgoricaRoute() {
  return <Podgorica />;
}
