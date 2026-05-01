import { Suspense } from 'react';
import { t, buildAlternates } from '../metadata';
import BookPage from '@/src/BookPage';

// Force dynamic rendering — useSearchParams() inside BookPage requires per-request
// SSR with the live search params. Without this, Next.js leaves the Suspense
// boundary in display:none fallback state and the iframe collapses to 0x0.
export const dynamic = 'force-dynamic';

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
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <BookPage />
    </Suspense>
  );
}
