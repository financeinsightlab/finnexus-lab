// FILE: components/podcast/PodcastEpisodeCard.tsx (presentational, works in client & server)
import Link from 'next/link';
import { Clock, CalendarDays, Mic2, ArrowRight } from 'lucide-react';
import type { PodcastEpisode } from '@/types';

interface PodcastEpisodeCardProps {
  episode: PodcastEpisode;
  compact?: boolean;
}

export default function PodcastEpisodeCard({ episode, compact = false }: PodcastEpisodeCardProps) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <article
      className={`card p-6 flex flex-col md:flex-row gap-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow bg-white ${
        compact ? 'md:gap-4' : ''
      }`}
    >
      {/* Left: episode number circle */}
      <div className="flex-shrink-0">
        <div
          className={`rounded-full bg-brand-navy flex items-center justify-center ${
            compact ? 'w-12 h-12' : 'w-16 h-16'
          }`}
        >
          <span className={`font-bold text-brand-teal ${compact ? 'text-lg' : 'text-2xl'}`}>
            {episode.episodeNumber}
          </span>
        </div>
      </div>

      {/* Right: content */}
      <div className="flex-grow min-w-0">
        {/* Format tag + season */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-brand-teal/10 text-brand-teal">
            {episode.format}
          </span>
          {episode.season && (
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
              Season {episode.season}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={`font-bold text-brand-navy mb-2 ${compact ? 'text-base' : 'text-xl'}`}>
          <Link href={`/podcast/${episode.slug}`} className="hover:text-brand-teal transition-colors">
            {episode.title}
          </Link>
        </h3>

        {/* Guest info if present */}
        {episode.guestName && (
          <p className="text-sm text-gray-600 mb-2 flex items-center gap-1.5">
            <Mic2 className="w-3.5 h-3.5 text-gray-400" />
            <span>
              Guest: <span className="font-medium">{episode.guestName}</span>
              {episode.guestRole && `, ${episode.guestRole}`}
            </span>
          </p>
        )}

        {/* Description */}
        {!compact && <p className="text-gray-700 mb-4">{episode.description}</p>}

        {/* Tags */}
        {!compact && episode.tags && episode.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {episode.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-sm text-gray-500">
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
            className="btn-ghost text-brand-navy hover:text-brand-teal inline-flex items-center gap-2"
          >
            {compact ? 'Open episode' : 'Listen & Read Notes'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
