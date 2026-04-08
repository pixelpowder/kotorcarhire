import { buildMetadata } from '../metadata';
import BlogIndex from '@/src/components/pages/blog/BlogIndex';

export async function generateMetadata() {
  return buildMetadata('en', 'blogIndex.heroTitle', 'blogIndex.heroSubtitle', 'blog');
}

export default function BlogPage() {
  return <BlogIndex />;
}
