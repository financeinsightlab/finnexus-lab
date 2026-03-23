// FILE: components/research/ResearchGrid.tsx
import ResearchCard from './ResearchCard';
import type { ResearchPost } from '@/types';

interface ResearchGridProps {
  posts: ResearchPost[];
  columns?: 2 | 3;
}

export default function ResearchGrid({ posts, columns = 2 }: ResearchGridProps) {
  const gridClass = columns === 3 ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'grid gap-6 sm:grid-cols-2';

  return (
    <div className={gridClass}>
      {posts.map((post) => (
        <ResearchCard key={post.slug} post={post} />
      ))}
    </div>
  );
}