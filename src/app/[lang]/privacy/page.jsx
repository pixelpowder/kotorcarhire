import { t, buildAlternates } from '../../metadata';
import Privacy from '@/src/components/pages/Privacy';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'privacy.title') + ' | Montenegro Car Hire',
    description: t(lang, 'privacy.seoDesc'),
    alternates: buildAlternates('privacy'),
  };
}

export default function LangPrivacyRoute() {
  return <Privacy />;
}
