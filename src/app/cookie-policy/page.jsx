import { t, buildAlternates } from '../metadata';
import CookiePolicy from '@/src/components/pages/CookiePolicy';

export async function generateMetadata() {
  const title = t('en', 'cookie-policy.title') + ' | Kotor Car Hire';
  const description = t('en', 'cookie-policy.seoDesc');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('cookie-policy'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function CookiePolicyRoute() {
  return <CookiePolicy />;
}
