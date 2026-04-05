import { t, buildAlternates } from '../metadata';
import Montenegro from '@/src/components/pages/Montenegro';

export async function generateMetadata() {
  return {
    title: t('en', 'montenegro.title') + ' | Montenegro Car Hire',
    description: t('en', 'montenegro.seoDesc'),
    alternates: buildAlternates('montenegro'),
  };
}

export default function MontenegroRoute() {
  return <Montenegro />;
}
