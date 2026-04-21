import { t, buildAlternates } from '../metadata';
import Privacy from '@/src/components/pages/Privacy';

export async function generateMetadata() {
  const title = t('en', 'privacy.title') + ' | Kotor Car Hire';
  const description = t('en', 'privacy.seoDesc');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('privacy'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function PrivacyRoute() {
  return <Privacy />;
}
