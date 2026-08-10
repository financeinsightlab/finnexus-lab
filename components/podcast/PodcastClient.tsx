// FILE: components/podcast/PodcastClient.tsx
'use client';

import { useMemo, useState } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import type { PodcastEpisode } from '@/types';
import PodcastEpisodeCard from '@/components/podcast/PodcastEpisodeCard';

const PAGE_SIZE = 5;
const ALL_FORMATS = ['Solo Analysis', 'Expert Interview', 'Quarterly Tracker', 'Research Summary'] as const;

interface PodcastClientProps {
  episodes: PodcastEpisode[];
}

export default function PodcastClient({ episodes }: PodcastClientProps) {
  const [query, setQuery] = useState('');
  const [format, setFormat] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Only show formats that actually exist in the content
  const availableFormats = useMemo(() => {
    const present = new Set(episodes.map((e) => e.format));
    return ['All', ...ALL_FORMATS.filter((f) => present.has(f))];
  }, [episodes]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const matches = episodes.filter((episode) => {
      const matchFormat = format === 'All' || episode.format === format;
      const haystack = [
        episode.title,
        episode.description,
        episode.format,
        episode.guestName ?? '',
        episode.guestRole ?? '',
        ...(episode.tags ?? []),
      ]
        .join(' ')
        .toLowerCase();
      const matchQuery = !q || haystack.includes(q);
      return matchFormat && matchQuery;
    });
    // Already sorted newest-first by getAllPodcastEpisodes; keep stable
    return matches;
  }, [episodes, query, format]);

  const shown = filtered.slice(0, visibleCount);
  const hasActiveFilters = query.trim() !== '' || format !== 'All';

  const clearAllFilters = () => {
    setQuery('');
    setFormat('All');
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section className="wrap max-w-6xl py-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold text-brand-navy">Latest Episodes</h2>
        <p className="text-sm text-gray-500">
          {filtered.length} episode{filtered.length === 1 ? '' : 's'}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="ml-3 inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> Reset
            </button>
          )}
        </p>
      </div>

      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-teal" />
          <input
            type="text"
            placeholder="Search episodes, guests, topics…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Format chips */}
        <div className="flex flex-wrap items-center gap-2">
          {availableFormats.map((f) => (
            <button
              key={f}
              onClick={() => {
                setFormat(f);
                setVisibleCount(PAGE_SIZE);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                format === f
                  ? 'bg-brand-navy text-brand-teal border-brand-navy'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-brand-teal hover:text-brand-teal'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Episode list */}
      <div className="space-y-6">
        {shown.map((episode) => (
          <PodcastEpisodeCard key={episode.slug} episode={episode} />
        ))}
      </div>

      {/* Load more */}
      {visibleCount < filtered.length && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
            className="btn-outline inline-flex items-center gap-2 cursor-pointer"
          >
            <ChevronDown className="w-4 h-4" />
            Load more episodes ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Empty states */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🎙️</div>
          <p className="text-lg font-semibold text-gray-700 mb-1">No episodes found</p>
          <p className="text-gray-500">
            {hasActiveFilters
              ? 'Try adjusting your search or filters.'
              : 'No podcast episodes published yet. Check back soon!'}
          </p>
        </div>
      )}
    </section>
  );
}
