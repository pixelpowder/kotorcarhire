import { t, buildAlternates } from '../metadata';
import About from '@/src/components/pages/About';

export async function generateMetadata() {
  const title = t('en', 'about.title') + ' | Kotor Car Hire';
  const description = t('en', 'about.seoDesc');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('about'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function AboutRoute() {
  return <About />;
}
