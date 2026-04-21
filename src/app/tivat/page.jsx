import { t, buildAlternates } from '../metadata';
import Tivat from '@/src/components/pages/Tivat';

export async function generateMetadata() {
  const title = t('en', 'tivat.title') + ' | Kotor Car Hire';
  const description = t('en', 'tivat.seoDesc');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('tivat'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function TivatRoute() {
  return <Tivat />;
}
