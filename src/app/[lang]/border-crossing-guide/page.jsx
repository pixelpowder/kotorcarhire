import { t, buildAlternates } from '../../metadata';
import BorderCrossing from '@/src/components/pages/BorderCrossing';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'border-crossing.title') + ' | Kotor Car Hire',
    description: t(lang, 'border-crossing.seoDesc'),
    alternates: buildAlternates('border-crossing-guide', lang),
  };
}

export default function LangBorderCrossingRoute() {
  return <BorderCrossing />;
}
