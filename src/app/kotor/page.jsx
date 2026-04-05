import { t, buildAlternates } from '../metadata';
import Kotor from '@/src/components/pages/Kotor';

export async function generateMetadata() {
  return {
    title: t('en', 'kotor.title') + ' | Kotor Car Hire',
    description: t('en', 'kotor.seoDesc'),
    alternates: buildAlternates('kotor'),
  };
}

export default function KotorRoute() {
  return <Kotor />;
}
