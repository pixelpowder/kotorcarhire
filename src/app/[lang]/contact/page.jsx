import Contact from '@/src/components/pages/Contact';
import { t, buildAlternates } from '@/src/app/metadata';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'contact.title') + ' | Kotor Car Hire',
    description: t(lang, 'contact.seoDesc'),
    alternates: buildAlternates('contact', lang),
  };
}

export default function ContactPage() {
  return <Contact />;
}
