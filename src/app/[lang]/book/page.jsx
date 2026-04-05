import { Suspense } from 'react';
import { t, buildAlternates } from '../../metadata';
import BookPage from '@/src/BookPage';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'book.seoTitle') + ' | Montenegro Car Hire',
    description: t(lang, 'book.seoDesc'),
    alternates: buildAlternates('book'),
  };
}

export default function LangBookRoute() {
  return (
    <Suspense>
      <BookPage />
    </Suspense>
  );
}
