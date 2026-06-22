import BlogDetail from '@/components/BlogDetail';
import { articles } from '@/data/servicesData';

export function generateStaticParams() {
  return articles.map(art => ({
    id: art.id
  }));
}

export default async function BlogPage({ params }) {
  const { id } = await params;
  return <BlogDetail articleId={id} />;
}
