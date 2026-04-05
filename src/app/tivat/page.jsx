import { t, buildAlternates } from '../metadata';
import Tivat from '@/src/components/pages/Tivat';

export async function generateMetadata() {
  return {
    title: t('en', 'tivat.title') + ' | Montenegro Car Hire',
    description: t('en', 'tivat.seoDesc'),
    alternates: buildAlternates('tivat'),
  };
}

export default function TivatRoute() {
  return <Tivat />;
}
