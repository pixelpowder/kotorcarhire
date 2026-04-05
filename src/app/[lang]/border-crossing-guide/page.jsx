import { t, buildAlternates } from '../../metadata';
import BorderCrossing from '@/src/components/pages/BorderCrossing';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'border-crossing.title') + ' | Montenegro Car Hire',
    description: t(lang, 'border-crossing.seoDesc'),
    alternates: buildAlternates('border-crossing-guide'),
  };
}

export default function LangBorderCrossingRoute() {
  return <BorderCrossing />;
}
