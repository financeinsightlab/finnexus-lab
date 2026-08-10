import Link from 'next/link';
import TiltCard from '@/components/ui/TiltCard';
import { formatDate } from '@/lib/utils';
import type { InsightPost } from '@/types';
import { ArrowRight, Clock } from 'lucide-react';

interface InsightCardProps {
  post: InsightPost;
}

export default function InsightCard({ post }: InsightCardProps) {
  return (
    <TiltCard maxTilt={4} className="h-full">
      <Link
        href={`/insights/${post.slug}`}
        className="group block h-full select-none cursor-pointer"
        aria-label={`Read strategic insight: ${post.title}`}
      >
        <article className="flex flex-col h-full overflow-hidden rounded-2xl bg-[#0E1626] border border-white/10 hover:border-cinema-cyan/40 shadow-lg hover:shadow-[0_8px_30px_rgba(13,110,110,0.15)] transition-all duration-300">
          {/* ── 3D Image Banner ── */}
          <div className="relative h-44 w-full overflow-hidden bg-[#0A101D] border-b border-white/10">
            {post.coverImage ? (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#101E35] to-[#0A101D] flex items-center justify-center">
                <span className="text-4xl opacity-60">💡</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1626] via-transparent to-transparent opacity-80" />

            {/* Category Badge on Top of Image */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/60 backdrop-blur-md text-cinema-cyan border border-white/15 shadow-sm">
                {post.category}
              </span>
            </div>

            <div className="absolute bottom-2.5 right-3 z-10 text-[11px] font-mono text-gray-300 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1">
              <Clock className="w-3 h-3 text-cinema-cyan" /> {post.readingTime} min
            </div>
          </div>

          {/* ── Card Body ── */}
          <div className="p-5 flex flex-col flex-1">
            <h2 className="text-base md:text-lg font-bold text-white leading-snug mb-3 group-hover:text-cinema-cyan transition-colors duration-200 line-clamp-2">
              {post.title}
            </h2>

            {/* Executive Thesis Box */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 mb-4 flex-1">
              <p className="text-xs text-gray-300 leading-relaxed italic line-clamp-3">
                &quot;{post.thesis}&quot;
              </p>
            </div>

            {/* Footer Metadata */}
            <div className="flex justify-between items-center pt-3 mt-auto border-t border-white/10 text-xs">
              <span className="text-gray-400 font-mono">{formatDate(post.date)}</span>
              <span className="inline-flex items-center gap-1 font-semibold text-cinema-cyan group-hover:gap-2 transition-all">
                Read Brief <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </TiltCard>
  );
}
