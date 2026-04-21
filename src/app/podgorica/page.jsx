import { t, buildAlternates } from '../metadata';
import Podgorica from '@/src/components/pages/Podgorica';

export async function generateMetadata() {
  const title = t('en', 'podgorica.title') + ' | Kotor Car Hire';
  const description = t('en', 'podgorica.seoDesc');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('podgorica'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function PodgoricaRoute() {
  return <Podgorica />;
}
