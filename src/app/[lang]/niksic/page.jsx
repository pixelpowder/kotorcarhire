import { t, buildAlternates } from '../../metadata';
import Niksic from '@/src/components/pages/Niksic';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'niksic.title') + ' | Kotor Car Hire',
    description: t(lang, 'niksic.seoDesc'),
    alternates: buildAlternates('niksic', lang),
  };
}

export default function LangNiksicRoute() { return <Niksic />; }
