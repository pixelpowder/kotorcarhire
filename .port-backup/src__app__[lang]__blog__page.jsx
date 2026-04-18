import { t, buildAlternates } from '../../metadata';
import BlogIndex from '@/src/components/pages/blog/BlogIndex';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: t(lang, 'blogIndex.heroTitle') + ' | Kotor Car Hire',
    description: t(lang, 'blogIndex.heroSubtitle'),
    alternates: buildAlternates('blog'),
  };
}

export default function LangBlogPage() {
  return <BlogIndex />;
}
