import { t, buildAlternates } from '../metadata';
import Ulcinj from '@/src/components/pages/Ulcinj';

export async function generateMetadata() {
  const title = t('en', 'ulcinj.title') + ' | Kotor Car Hire';
  const description = t('en', 'ulcinj.seoDesc');
  return { title, description, alternates: buildAlternates('ulcinj'), openGraph: { title, description, type: 'website' } };
}

export default function UlcinjRoute() { return <Ulcinj />; }
