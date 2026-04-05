import { t, buildAlternates } from '../../metadata';
import Perast from '@/src/components/pages/Perast';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'perast.title') + ' | Montenegro Car Hire',
    description: t(lang, 'perast.seoDesc'),
    alternates: buildAlternates('perast'),
  };
}

export default function LangPerastRoute() {
  return <Perast />;
}
