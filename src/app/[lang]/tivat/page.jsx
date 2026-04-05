import { t, buildAlternates } from '../../metadata';
import Tivat from '@/src/components/pages/Tivat';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'tivat.title') + ' | Montenegro Car Hire',
    description: t(lang, 'tivat.seoDesc'),
    alternates: buildAlternates('tivat'),
  };
}

export default function LangTivatRoute() {
  return <Tivat />;
}
