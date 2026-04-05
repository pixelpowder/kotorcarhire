import { t, buildAlternates } from '../metadata';
import Privacy from '@/src/components/pages/Privacy';

export async function generateMetadata() {
  return {
    title: t('en', 'privacy.title') + ' | Montenegro Car Hire',
    description: t('en', 'privacy.seoDesc'),
    alternates: buildAlternates('privacy'),
  };
}

export default function PrivacyRoute() {
  return <Privacy />;
}
