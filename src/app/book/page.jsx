import { Suspense } from 'react';
import { t, buildAlternates } from '../metadata';
import BookPage from '@/src/BookPage';

export async function generateMetadata() {
  return {
    title: t('en', 'book.seoTitle') + ' | Montenegro Car Hire',
    description: t('en', 'book.seoDesc'),
    alternates: buildAlternates('book'),
  };
}

export default function BookRoute() {
  return (
    <Suspense>
      <BookPage />
    </Suspense>
  );
}
