import Contact from '@/src/components/pages/Contact';
import { buildAlternates } from '@/src/app/metadata';

export function generateMetadata() {
  const title = 'Contact Us | Kotor Car Hire';
  const description = 'Get in touch with Kotor Car Hire. Email, phone, or WhatsApp — we\'re here to help you find the perfect rental car.';
  return {
    title: title,
    description: description,
    alternates: buildAlternates('contact'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function ContactPage() {
  return <Contact />;
}
