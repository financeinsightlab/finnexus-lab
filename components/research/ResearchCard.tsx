// FILE: components/research/ResearchCard.tsx
import Link from 'next/link';
import Tag from '@/components/ui/Tag';
import { formatDate } from '@/lib/utils';
import { calculateReportFreshness } from '@/lib/freshness';
import type { ResearchPost } from '@/types';

interface ResearchCardProps {
  post: ResearchPost;
}

function FreshnessDot({ score }: { score: number }) {
  const color =
    score > 70 ? '#22c55e' :
    score > 40 ? '#f59e0b' : '#ef4444';
  const label =
    score > 70 ? 'Fresh'  :
    score > 40 ? 'Aging'  : 'Stale';

  return (
    <span className="flex items-center gap-1 text-[10px] text-gray-400">
      <span
        className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: color }}
      />
      Data freshness: <strong style={{ color }}>{score}%</strong>
      <span className="text-gray-300 ml-0.5">({label})</span>
    </span>
  );
}

export default function ResearchCard({ post }: ResearchCardProps) {
  const freshScore = calculateReportFreshness(post);
  const showFreshness = post.content !== undefined;

  return (
    <article className="research-card p-6 flex flex-col h-full">
      <div className="flex justify-between gap-3 mb-3">
        <Tag text={post.sector} />
        <span className="text-[11px] text-gray-400 font-mono">
          {post.pageCount}p {post.readingTime && `· ${post.readingTime}`}
        </span>
      </div>
      <h2 className="text-lg font-bold text-brand-navy leading-snug mb-2 line-clamp-2 hover:text-brand-teal transition-colors">
        {post.title}
      </h2>
      <p className="text-sm text-brand-slate leading-relaxed flex-1 line-clamp-3 mb-4">
        {post.summary}
      </p>
      {showFreshness && (
        <div className="mb-3">
          <FreshnessDot score={freshScore} />
        </div>
      )}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <span className="text-[11px] text-gray-400">{formatDate(post.date)}</span>
        <Link href={`/research/${post.slug}`} className="text-sm font-semibold text-brand-teal hover:text-brand-navy">
          Read Report →
        </Link>
      </div>
    </article>
  );
}