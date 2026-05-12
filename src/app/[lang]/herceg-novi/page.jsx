import { t, buildAlternates } from '../../metadata';
import HercegNovi from '@/src/components/pages/HercegNovi';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'hercegNovi.title') + ' | Kotor Car Hire',
    description: t(lang, 'hercegNovi.seoDesc'),
    alternates: buildAlternates('herceg-novi', lang),
  };
}

export default function LangHercegNoviRoute() { return <HercegNovi />; }
