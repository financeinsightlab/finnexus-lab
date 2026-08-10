import Link from 'next/link';
import TiltCard from '@/components/ui/TiltCard';
import { formatDate } from '@/lib/utils';
import { calculateReportFreshness } from '@/lib/freshness';
import type { ResearchPost } from '@/types';
import { ArrowRight } from 'lucide-react';

interface ResearchCardProps {
  post: ResearchPost;
}

function FreshnessDot({ score }: { score: number }) {
  const color =
    score > 70 ? '#22c55e' :
    score > 40 ? '#f59e0b' : '#ef4444';
  const label =
    score > 70 ? 'Fresh'  :
    score > 40 ? 'Active' : 'Archived';

  return (
    <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
      <span
        className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />
      <span>Freshness: <strong style={{ color }}>{score}%</strong> ({label})</span>
    </span>
  );
}

export default function ResearchCard({ post }: ResearchCardProps) {
  const freshScore = calculateReportFreshness(post);
  const showFreshness = post.content !== undefined;

  return (
    <TiltCard maxTilt={4} className="h-full">
      <Link
        href={`/research/${post.slug}`}
        className="group block h-full select-none cursor-pointer"
        aria-label={`Read research report: ${post.title}`}
      >
        <article className="flex flex-col h-full overflow-hidden rounded-2xl bg-[#0E1626] border border-white/10 hover:border-cinema-cyan/40 shadow-lg hover:shadow-[0_8px_30px_rgba(13,110,110,0.15)] transition-all duration-300">
          {/* ── Featured Image Banner ── */}
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
                <span className="text-4xl opacity-60">📊</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1626] via-transparent to-transparent opacity-80" />
            
            {/* Sector Pill on Top of Image */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/60 backdrop-blur-md text-cinema-cyan border border-white/15 shadow-sm">
                {post.sector}
              </span>
            </div>

            <div className="absolute bottom-2.5 right-3 z-10 text-[11px] font-mono text-gray-300 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10">
              {post.pageCount} Pages
            </div>
          </div>

          {/* ── Body Content ── */}
          <div className="p-5 flex flex-col flex-1">
            <h2 className="text-base md:text-lg font-bold text-white leading-snug mb-2 line-clamp-2 group-hover:text-cinema-cyan transition-colors duration-200">
              {post.title}
            </h2>
            
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed flex-1 line-clamp-3 mb-4">
              {post.summary}
            </p>

            {showFreshness && (
              <div className="mb-3 pt-2">
                <FreshnessDot score={freshScore} />
              </div>
            )}

            {/* Footer metadata */}
            <div className="flex justify-between items-center pt-3 mt-auto border-t border-white/10 text-xs">
              <span className="text-gray-400 font-mono">{formatDate(post.date)}</span>
              <span className="inline-flex items-center gap-1 font-semibold text-cinema-cyan group-hover:gap-2 transition-all">
                Read Report <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </TiltCard>
  );
}
