import { t, buildAlternates } from './metadata';
import HomeClient from '@/src/HomeClient';

export async function generateMetadata() {
  return {
    title: 'Car Hire in Montenegro — Tivat & Podgorica Airport Pickup | Montenegro Car Hire',
    description: t('en', 'home.seoDesc'),
    alternates: buildAlternates(''),
  };
}

export default function HomePage() {
  return <HomeClient />;
}
