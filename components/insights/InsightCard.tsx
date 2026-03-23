// FILE: components/insights/InsightCard.tsx
import Link from 'next/link';
import Tag from '@/components/ui/Tag';
import { formatDate, CATEGORY_VARIANT } from '@/lib/utils';
import type { InsightPost } from '@/types';

interface InsightCardProps {
  post: InsightPost;
}

export default function InsightCard({ post }: InsightCardProps) {
  const variant = CATEGORY_VARIANT[post.category] ?? 'teal';

  return (
    <article className="card p-5 flex flex-col h-full">
      <Tag text={post.category} variant={variant} className="mb-3" />
      <h3 className="text-base font-bold text-brand-navy leading-snug mb-2 line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm text-brand-slate italic leading-relaxed flex-1 line-clamp-2 mb-4">
        {post.thesis}
      </p>
      <div className="flex justify-between pt-3 border-t border-gray-100">
        <span className="text-[11px] text-gray-400">
          {formatDate(post.date)} · {post.readingTime} min
        </span>
        <Link href={`/insights/${post.slug}`} className="text-sm font-semibold text-brand-teal hover:text-brand-navy">
          Read →
        </Link>
      </div>
    </article>
  );
}