import { t, buildAlternates } from '../../metadata';
import Budva from '@/src/components/pages/Budva';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'budva.title') + ' | Kotor Car Hire',
    description: t(lang, 'budva.seoDesc'),
    alternates: buildAlternates('budva'),
  };
}

export default function LangBudvaRoute() {
  return <Budva />;
}
