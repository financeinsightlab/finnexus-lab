// FILE: app/podcast/[slug]/page.tsx (server async)
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Share2, Clock, CalendarDays, ArrowLeft, Rss, Sparkles } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { getPodcastEpisodeBySlug, getAllPodcastEpisodes } from '@/lib/content';
import JsonLd from '@/components/seo/JsonLd';
import PodcastEpisodeCard from '@/components/podcast/PodcastEpisodeCard';
import PodcastCover, { formatIcon } from '@/components/podcast/PodcastCover';
import AudioPlayer from '@/components/podcast/AudioPlayer';
import type { PodcastEpisode } from '@/types';

const BASE = 'https://kunwaranalytics.in';

export async function generateStaticParams() {
  const episodes = getAllPodcastEpisodes();
  return episodes.map((ep) => ({
    slug: ep.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getPodcastEpisodeBySlug(slug);

  if (!episode) {
    return { title: 'Episode Not Found' };
  }

  return {
    title: `${episode.title} | Kunwar Analytics Podcast`,
    description: episode.description,
  };
}

/** 'MM:SS' | 'H:MM:SS' -> ISO-8601 duration for schema.org */
function toISODuration(duration: string): string {
  const parts = duration.split(':').map(Number).filter((n) => !Number.isNaN(n));
  if (parts.length === 2) return `PT${parts[0]}M${parts[1]}S`;
  if (parts.length >= 3) return `PT${parts[0]}H${parts[1]}M${parts[2]}S`;
  return `PT${duration}M`;
}

function buildEpisodeSchema(episode: PodcastEpisode) {
  const directAudio = episode.mp3Url;
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: episode.title,
    url: `${BASE}/podcast/${episode.slug}`,
    description: episode.description,
    datePublished: episode.date,
    episodeNumber: episode.episodeNumber,
    duration: toISODuration(episode.duration),
    ...(episode.season ? { seasonNumber: episode.season } : {}),
    ...(episode.guestName ? { actor: [{ '@type': 'Person', name: episode.guestName }] } : {}),
    ...(directAudio
      ? {
          associatedMedia: {
            '@type': 'AudioObject',
            contentUrl: directAudio,
            encodingFormat: 'audio/mpeg',
            duration: toISODuration(episode.duration),
          },
        }
      : {}),
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: 'The Kunwar Analytics Podcast',
      url: `${BASE}/podcast`,
      webFeed: `${BASE}/podcast/feed.xml`,
    },
  };
}

export default async function PodcastEpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const episode = await getPodcastEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const related = getAllPodcastEpisodes()
    .filter((ep) => ep.slug !== episode.slug)
    .sort((a, b) => {
      const sameFormat = (ep: PodcastEpisode) => (ep.format === episode.format ? 0 : 1);
      return sameFormat(a) - sameFormat(b) || new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  const episodeUrl = `${BASE}/podcast/${episode.slug}`;
  const shareText = encodeURIComponent(`${episode.title} — The Kunwar Analytics Podcast`);
  const shareUrl = encodeURIComponent(episodeUrl);
  const audioSrc = episode.mp3Url ?? episode.audioUrl ?? '';
  const FormatIcon = formatIcon(episode.format);

  return (
    <div className="min-h-screen bg-cinema-black text-white">
      <JsonLd data={buildEpisodeSchema(episode)} />

      {/* ═══════════ HEADER ═══════════ */}
      <header className="relative aurora-bg overflow-hidden pt-10 pb-14">
        <div className="absolute -top-24 right-1/4 w-[400px] h-[400px] rounded-full bg-cinema-cyan/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] bg-grid pointer-events-none" />

        <div className="wrap max-w-4xl relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/podcast" className="inline-flex items-center gap-1.5 hover:text-cinema-cyan transition-colors">
              <ArrowLeft className="w-4 h-4" /> Podcast
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-gray-300">Episode {episode.episodeNumber}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Cover */}
            <PodcastCover episode={episode} size="xl" className="shadow-cinema-lg" />

            {/* Title block */}
            <div className="flex-grow min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full border border-cinema-cyan/30 bg-cinema-cyan/10 text-cinema-cyan">
                  <FormatIcon className="w-3.5 h-3.5" /> {episode.format}
                </span>
                {episode.season && (
                  <span className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full border border-white/15 bg-white/5 text-gray-300">
                    Season {episode.season}
                  </span>
                )}
                {episode.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full border border-cinema-amber/30 bg-cinema-amber/10 text-cinema-amber">
                    <Sparkles className="w-3.5 h-3.5" /> Featured
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                {episode.title}
              </h1>

              {episode.guestName && (
                <p className="text-gray-300 mb-4">
                  Guest: <span className="font-semibold text-white">{episode.guestName}</span>
                  {episode.guestRole && <span className="text-gray-400"> — {episode.guestRole}</span>}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400 mb-5">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cinema-cyan" /> {episode.duration} min
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 text-cinema-cyan" /> {formatDate(episode.date)}
                </span>
                <span>EP {String(episode.episodeNumber).padStart(2, '0')}</span>
              </div>

              {/* Tags */}
              {episode.tags && episode.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {episode.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/podcast?format=All#episodes`}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-cinema-cyan hover:border-cinema-cyan/40 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════ AUDIO + SHARE ═══════════ */}
      <section className="wrap max-w-4xl py-10">
        {audioSrc ? (
          <AudioPlayer src={audioSrc} title={episode.title} episodeNumber={episode.episodeNumber} />
        ) : (
          <div className="glass-cinema rounded-2xl border border-white/10 p-8 text-center">
            <div className="text-5xl mb-4">🎙️</div>
            <h3 className="text-xl font-bold text-white mb-2">Audio coming soon</h3>
            <p className="text-gray-400 mb-6">This episode will be available on podcast platforms shortly.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://open.spotify.com/show/example" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cinema-cyan text-cinema-black font-bold">
                🎵 Spotify
              </a>
              <a href="https://podcasts.apple.com/example" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white font-semibold">
                🍎 Apple Podcasts
              </a>
            </div>
          </div>
        )}

        {/* Share */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300">
            <Share2 className="w-4 h-4 text-cinema-cyan" /> Share this episode:
          </span>
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            𝕏 Post
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#0A66C2] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            LinkedIn
          </a>
          <a
            href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            WhatsApp
          </a>
        </div>

        {/* Show notes + transcript */}
        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Show Notes & Transcript</h2>
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-blockquote:text-gray-400 prose-blockquote:border-cinema-cyan prose-li:text-gray-300 prose-hr:border-white/10">
            {episode.content ? (
              <MDXRemote source={episode.content} />
            ) : (
              <p className="text-gray-500">No show notes available for this episode.</p>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ RELATED ═══════════ */}
      {related.length > 0 && (
        <section className="border-y border-white/5 bg-cinema-ink/60">
          <div className="wrap max-w-4xl py-14">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">More Episodes</h2>
              <Link href="/podcast" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cinema-cyan hover:gap-2.5 transition-all">
                View all <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
            <div className="space-y-5">
              {related.map((ep) => (
                <PodcastEpisodeCard key={ep.slug} episode={ep} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ SUBSCRIBE CTA ═══════════ */}
      <section className="aurora-bg">
        <div className="wrap max-w-4xl py-16 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">Never miss an episode</h2>
          <p className="text-gray-400 mb-8">New episodes every two weeks — market intelligence in 30 minutes.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://open.spotify.com/show/example" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cinema-cyan text-cinema-black font-bold shadow-glow-cyan hover:scale-[1.03] transition-transform">
              🎵 Spotify
            </a>
            <a href="https://podcasts.apple.com/example" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors">
              🍎 Apple Podcasts
            </a>
            <a href="https://podcasts.google.com/example" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors">
              📻 Google Podcasts
            </a>
            <a href="/podcast/feed.xml" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors">
              <Rss className="w-4 h-4 text-cinema-cyan" /> RSS
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
