import { t, buildAlternates } from '../metadata';
import Terms from '@/src/components/pages/Terms';

export async function generateMetadata() {
  const title = t('en', 'terms.title') + ' | Kotor Car Hire';
  const description = t('en', 'terms.seoDesc');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('terms'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function TermsRoute() {
  return <Terms />;
}
