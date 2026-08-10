// FILE: app/podcast/[slug]/page.tsx (server async)
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Download, Share2, Clock, CalendarDays } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { getPodcastEpisodeBySlug, getAllPodcastEpisodes } from '@/lib/content';
import JsonLd from '@/components/seo/JsonLd';
import PodcastEpisodeCard from '@/components/podcast/PodcastEpisodeCard';
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
    return {
      title: 'Episode Not Found',
    };
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
    ...(episode.guestName
      ? { actor: [{ '@type': 'Person', name: episode.guestName }] }
      : {}),
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

  // Related episodes: same format first, then newest, excluding current — max 3
  const related = getAllPodcastEpisodes()
    .filter((ep) => ep.slug !== episode.slug)
    .sort((a, b) => {
      const sameFormat = (ep: PodcastEpisode) => ep.format === episode.format ? 0 : 1;
      return sameFormat(a) - sameFormat(b) || new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  const episodeUrl = `${BASE}/podcast/${episode.slug}`;
  const shareText = encodeURIComponent(`${episode.title} — The Kunwar Analytics Podcast`);
  const shareUrl = encodeURIComponent(episodeUrl);
  const directAudio = episode.mp3Url;
  const hasAudio = Boolean(directAudio || episode.audioUrl);

  return (
    <div className="min-h-screen">
      <JsonLd data={buildEpisodeSchema(episode)} />

      {/* Episode header */}
      <section className="bg-brand-navy py-16">
        <div className="wrap max-w-4xl">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            {' / '}
            <Link href="/podcast" className="hover:text-white">Podcast</Link>
            {' / '}
            <span className="text-white">Episode {episode.episodeNumber}</span>
          </nav>

          {/* Episode number badge + format tag */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-brand-teal flex items-center justify-center">
              <span className="text-lg font-bold text-white">
                {episode.episodeNumber}
              </span>
            </div>
            <span className="px-4 py-2 text-sm font-semibold rounded-full bg-white/20 text-white">
              {episode.format}
            </span>
            {episode.season && (
              <span className="px-4 py-2 text-sm font-semibold rounded-full bg-white/10 text-gray-200">
                Season {episode.season}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {episode.title}
          </h1>

          {/* Guest info if present */}
          {episode.guestName && (
            <div className="text-lg text-gray-300 mb-6">
              Guest: <span className="font-medium">{episode.guestName}</span>
              {episode.guestRole && `, ${episode.guestRole}`}
            </div>
          )}

          {/* Duration badge + date */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-white font-medium">{episode.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-gray-400" />
              <span className="text-white">{formatDate(episode.date)}</span>
            </div>
          </div>

          {/* Tags */}
          {episode.tags && episode.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {episode.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Audio player section */}
      <section className="wrap max-w-4xl py-12">
        <h2 className="text-2xl font-bold text-brand-navy mb-6">Listen Now</h2>
        {hasAudio ? (
          <div className="mb-10">
            <div className="bg-gray-100 p-6 rounded-xl border border-gray-300">
              <p className="text-sm text-gray-600 mb-4">
                Listen on your preferred platform:
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={episode.audioUrl ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex items-center gap-2"
                >
                  <span>🎵</span> Spotify
                </a>
                <a
                  href="#"
                  className="btn-outline flex items-center gap-2"
                >
                  <span>🍎</span> Apple Podcasts
                </a>
                <a
                  href="#"
                  className="btn-outline flex items-center gap-2"
                >
                  <span>📻</span> Google Podcasts
                </a>
                {directAudio && (
                  <a
                    href={directAudio}
                    download
                    className="btn-outline flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download MP3
                  </a>
                )}
              </div>
              <div className="mt-6">
                <audio controls className="w-full" preload="metadata">
                  <source src={directAudio ?? episode.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 text-center mb-10">
            <div className="text-5xl mb-4">🎙️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Audio Coming Soon</h3>
            <p className="text-gray-600 mb-6">
              This episode will be available on podcast platforms shortly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://open.spotify.com/show/example"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <span>🎵</span> Spotify
              </a>
              <a
                href="https://podcasts.apple.com/example"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <span>🍎</span> Apple Podcasts
              </a>
            </div>
          </div>
        )}

        {/* Share buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <Share2 className="w-4 h-4" /> Share this episode:
          </span>
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-black transition-colors"
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
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">Show Notes & Transcript</h2>
          {episode.content ? (
            <MDXRemote source={episode.content} />
          ) : (
            <p className="text-gray-500">No show notes available for this episode.</p>
          )}
        </div>
      </section>

      {/* Related episodes */}
      {related.length > 0 && (
        <section className="bg-gray-50 border-y border-gray-200 py-12">
          <div className="wrap max-w-4xl">
            <h2 className="text-2xl font-bold text-brand-navy mb-8">More Episodes</h2>
            <div className="space-y-6">
              {related.map((ep) => (
                <PodcastEpisodeCard key={ep.slug} episode={ep} compact />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/podcast" className="btn-ghost text-brand-navy hover:text-brand-teal font-semibold">
                View all episodes →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Subscribe CTA at bottom */}
      <section className="bg-gradient-to-r from-brand-navy to-slate-800 py-12">
        <div className="wrap max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Never Miss an Episode</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to the Kunwar Analytics Podcast for weekly market intelligence, delivered in 30 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://open.spotify.com/show/example"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white flex items-center gap-2"
            >
              <span>🎵</span> Spotify
            </a>
            <a
              href="https://podcasts.apple.com/example"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white flex items-center gap-2"
            >
              <span>🍎</span> Apple Podcasts
            </a>
            <a
              href="https://podcasts.google.com/example"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white flex items-center gap-2"
            >
              <span>📻</span> Google Podcasts
            </a>
            <a
              href="/podcast/feed.xml"
              className="btn-white flex items-center gap-2"
            >
              <span>📡</span> RSS Feed
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
