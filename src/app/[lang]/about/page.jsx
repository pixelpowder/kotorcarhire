import { t, buildAlternates } from '../../metadata';
import About from '@/src/components/pages/About';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'about.title') + ' | Montenegro Car Hire',
    description: t(lang, 'about.seoDesc'),
    alternates: buildAlternates('about'),
  };
}

export default function LangAboutRoute() {
  return <About />;
}
