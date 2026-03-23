// FILE: components/insights/InsightGrid.tsx
import InsightCard from './InsightCard';
import type { InsightPost } from '@/types';

interface InsightGridProps {
  posts: InsightPost[];
}

export default function InsightGrid({ posts }: InsightGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <InsightCard key={post.slug} post={post} />
      ))}
    </div>
  );
}