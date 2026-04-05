import { t, buildAlternates } from '../../metadata';
import CookiePolicy from '@/src/components/pages/CookiePolicy';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'cookie-policy.title') + ' | Montenegro Car Hire',
    description: t(lang, 'cookie-policy.seoDesc'),
    alternates: buildAlternates('cookie-policy'),
  };
}

export default function LangCookiePolicyRoute() {
  return <CookiePolicy />;
}
