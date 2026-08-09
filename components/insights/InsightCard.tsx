import Link from 'next/link';
import CardImageBanner from '@/components/ui/CardImageBanner';
import Tag from '@/components/ui/Tag';
import TiltCard from '@/components/ui/TiltCard';
import { formatDate, CATEGORY_VARIANT } from '@/lib/utils';
import type { InsightPost } from '@/types';

interface InsightCardProps {
  post: InsightPost;
}

export default function InsightCard({ post }: InsightCardProps) {
  const variant = CATEGORY_VARIANT[post.category] ?? 'teal';

  return (
    <TiltCard maxTilt={5} className="h-full">
    <article className="card flex flex-col h-full depth-2 hover:depth-3 transition-shadow duration-300 overflow-hidden bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-2xl group">
      {/* ── Image Banner ── */}
      <div className="relative h-28 w-full border-b border-gray-200 dark:border-white/10">
        <CardImageBanner
          src={`/card-${post.category.toLowerCase().replace(/\s+/g, '-')}.png`}
          alt={post.category}
          icon="💡"
          overlayOpacity="opacity-40"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
      <Tag text={post.category} variant={variant} className="mb-3 w-fit" />
      <h3 className="text-base font-bold text-brand-navy dark:text-white leading-snug mb-2 line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm text-brand-slate italic leading-relaxed flex-1 line-clamp-2 mb-4">
        {post.thesis}
      </p>
      <div className="flex justify-between pt-3 border-t border-gray-100 dark:border-white/10 mt-auto">
        <span className="text-[11px] text-gray-500 dark:text-gray-400">
          {formatDate(post.date)} · {post.readingTime} min
        </span>
        <Link href={`/insights/${post.slug}`} className="text-sm font-semibold text-brand-teal hover:text-brand-navy dark:hover:text-white transition-colors">
          Read →
        </Link>
      </div>
      </div>
    </article>
    </TiltCard>
  );
}