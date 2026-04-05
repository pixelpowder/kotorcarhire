import { t, buildAlternates } from '../../metadata';
import Montenegro from '@/src/components/pages/Montenegro';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'montenegro.title') + ' | Montenegro Car Hire',
    description: t(lang, 'montenegro.seoDesc'),
    alternates: buildAlternates('montenegro'),
  };
}

export default function LangMontenegroRoute() {
  return <Montenegro />;
}
