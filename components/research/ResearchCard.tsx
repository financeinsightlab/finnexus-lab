// FILE: components/research/ResearchCard.tsx
import Link from 'next/link';
import Tag from '@/components/ui/Tag';
import { formatDate } from '@/lib/utils';
import type { ResearchPost } from '@/types';

interface ResearchCardProps {
  post: ResearchPost;
}

export default function ResearchCard({ post }: ResearchCardProps) {
  return (
    <article className="research-card p-6 flex flex-col h-full">
      <div className="flex justify-between gap-3 mb-3">
        <Tag text={post.sector} />
        <span className="text-[11px] text-gray-400 font-mono">{post.pageCount}p</span>
      </div>
      <h2 className="text-lg font-bold text-brand-navy leading-snug mb-2 line-clamp-2 hover:text-brand-teal transition-colors">
        {post.title}
      </h2>
      <p className="text-sm text-brand-slate leading-relaxed flex-1 line-clamp-3 mb-4">
        {post.summary}
      </p>
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <span className="text-[11px] text-gray-400">{formatDate(post.date)}</span>
        <Link href={`/research/${post.slug}`} className="text-sm font-semibold text-brand-teal hover:text-brand-navy">
          Read Report →
        </Link>
      </div>
    </article>
  );
}