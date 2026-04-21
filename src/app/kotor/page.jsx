import { t, buildAlternates } from '../metadata';
import Kotor from '@/src/components/pages/Kotor';

export async function generateMetadata() {
  const title = t('en', 'kotor.title') + ' | Kotor Car Hire';
  const description = t('en', 'kotor.seoDesc');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('kotor'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function KotorRoute() {
  return <Kotor />;
}
