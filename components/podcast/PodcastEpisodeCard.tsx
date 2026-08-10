// FILE: components/podcast/PodcastEpisodeCard.tsx (presentational, works in client & server)
import Link from 'next/link';
import { Clock, CalendarDays, Mic2, ArrowRight, Play, Zap } from 'lucide-react';
import type { PodcastEpisode } from '@/types';
import PodcastCover from '@/components/podcast/PodcastCover';

interface PodcastEpisodeCardProps {
  episode: PodcastEpisode;
  compact?: boolean;
}

const FORMAT_ACCENTS: Record<string, string> = {
  'Solo Analysis': 'text-cinema-cyan border-cinema-cyan/30 bg-cinema-cyan/10',
  'Expert Interview': 'text-cinema-violet border-cinema-violet/30 bg-cinema-violet/10',
  'Quarterly Tracker': 'text-cinema-amber border-cinema-amber/30 bg-cinema-amber/10',
  'Research Summary': 'text-cinema-aurora border-cinema-aurora/30 bg-cinema-aurora/10',
};

export default function PodcastEpisodeCard({ episode, compact = false }: PodcastEpisodeCardProps) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <article className="group relative glass-cinema rounded-2xl border border-white/10 p-5 md:p-6 flex gap-5 md:gap-6 hover:border-cinema-cyan/40 transition-all duration-300 hover:shadow-cinema-md">
      {/* Play button overlay on cover */}
      <div className="relative flex-shrink-0">
        <PodcastCover episode={episode} size={compact ? 'sm' : 'md'} />
        <Link
          href={`/podcast/${episode.slug}`}
          aria-label={`Play ${episode.title}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <span className="w-10 h-10 rounded-full bg-cinema-cyan/90 text-cinema-black flex items-center justify-center shadow-glow-cyan">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-grow min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${FORMAT_ACCENTS[episode.format] ?? 'text-gray-300 border-white/20 bg-white/5'}`}>
            <Zap className="w-3 h-3" />
            {episode.format}
          </span>
          {episode.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border border-cinema-amber/30 bg-cinema-amber/10 text-cinema-amber">
              Featured
            </span>
          )}
        </div>

        <h3 className={`font-bold text-white mb-1.5 ${compact ? 'text-base' : 'text-lg md:text-xl'} leading-snug`}>
          <Link href={`/podcast/${episode.slug}`} className="hover:text-cinema-cyan transition-colors">
            {episode.title}
          </Link>
        </h3>

        {episode.guestName && (
          <p className="text-sm text-gray-400 mb-2 flex items-center gap-1.5">
            <Mic2 className="w-3.5 h-3.5 text-cinema-cyan/70" />
            <span>
              <span className="text-gray-300 font-medium">{episode.guestName}</span>
              {episode.guestRole && ` — ${episode.guestRole}`}
            </span>
          </p>
        )}

        {!compact && <p className="text-sm text-gray-400 mb-3 line-clamp-2">{episode.description}</p>}

        {!compact && episode.tags && episode.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {episode.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" />
              {formatDate(episode.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {episode.duration}
            </span>
          </div>
          <Link
            href={`/podcast/${episode.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cinema-cyan hover:gap-2.5 transition-all"
          >
            {compact ? 'Open episode' : 'Listen & read notes'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
