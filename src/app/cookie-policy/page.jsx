import { t, buildAlternates } from '../metadata';
import CookiePolicy from '@/src/components/pages/CookiePolicy';

export async function generateMetadata() {
  return {
    title: t('en', 'cookie-policy.title') + ' | Kotor Car Hire',
    description: t('en', 'cookie-policy.seoDesc'),
    alternates: buildAlternates('cookie-policy'),
  };
}

export default function CookiePolicyRoute() {
  return <CookiePolicy />;
}
