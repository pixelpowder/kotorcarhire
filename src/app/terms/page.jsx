import { t, buildAlternates } from '../metadata';
import Terms from '@/src/components/pages/Terms';

export async function generateMetadata() {
  return {
    title: t('en', 'terms.title') + ' | Montenegro Car Hire',
    description: t('en', 'terms.seoDesc'),
    alternates: buildAlternates('terms'),
  };
}

export default function TermsRoute() {
  return <Terms />;
}
