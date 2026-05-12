import { t, buildAlternates } from '../metadata';
import HercegNovi from '@/src/components/pages/HercegNovi';

export async function generateMetadata() {
  const title = t('en', 'hercegNovi.title') + ' | Kotor Car Hire';
  const description = t('en', 'hercegNovi.seoDesc');
  return { title, description, alternates: buildAlternates('herceg-novi'), openGraph: { title, description, type: 'website' } };
}

export default function HercegNoviRoute() { return <HercegNovi />; }
