import { Suspense } from 'react';
import { t, buildAlternates } from '../metadata';
import BookPage from '@/src/BookPage';

export async function generateMetadata() {
  const title = t('en', 'book.seoTitle') + ' | Kotor Car Hire';
  const description = t('en', 'book.seoDesc');
  return {
    title: title,
    description: description,
    alternates: buildAlternates('book'),
    openGraph: { title, description, type: 'website' },
  };
}

export default function BookRoute() {
  return (
    <Suspense>
      <BookPage />
    </Suspense>
  );
}
