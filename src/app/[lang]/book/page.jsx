import { Suspense } from 'react';
import { t, buildAlternates } from '../../metadata';
import BookPage from '@/src/BookPage';

// Force dynamic rendering — useSearchParams() inside BookPage requires per-request
// SSR with the live search params. Without this, Next.js leaves the Suspense
// boundary in display:none fallback state and the iframe collapses to 0x0.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'book.seoTitle') + ' | Kotor Car Hire',
    description: t(lang, 'book.seoDesc'),
    alternates: buildAlternates('book', lang),
  };
}

export default function LangBookRoute() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <BookPage />
    </Suspense>
  );
}
