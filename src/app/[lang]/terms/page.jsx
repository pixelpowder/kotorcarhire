import { t, buildAlternates } from '../../metadata';
import Terms from '@/src/components/pages/Terms';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'terms.title') + ' | Kotor Car Hire',
    description: t(lang, 'terms.seoDesc'),
    alternates: buildAlternates('terms', lang),
  };
}

export default function LangTermsRoute() {
  return <Terms />;
}
