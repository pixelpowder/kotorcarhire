import { t, buildAlternates } from '../../metadata';
import Ulcinj from '@/src/components/pages/Ulcinj';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'ulcinj.title') + ' | Kotor Car Hire',
    description: t(lang, 'ulcinj.seoDesc'),
    alternates: buildAlternates('ulcinj', lang),
  };
}

export default function LangUlcinjRoute() { return <Ulcinj />; }
