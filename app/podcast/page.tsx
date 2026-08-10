// FILE: app/podcast/page.tsx (server component, Metadata)
import { Metadata } from 'next';
import { getAllPodcastEpisodes } from '@/lib/content';
import HeroBackground from '@/components/ui/HeroBackground';
import JsonLd from '@/components/seo/JsonLd';
import PodcastClient from '@/components/podcast/PodcastClient';
import { Rss } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Podcast | Kunwar Analytics',
  description: 'Market intelligence in 30 minutes. The Kunwar Analytics Podcast delivers sharp analysis on Indian startups, quick commerce, and financial markets.',
};

const podcastSeriesSchema = {
  '@context': 'https://schema.org',
  '@type': 'PodcastSeries',
  name: 'The Kunwar Analytics Podcast',
  url: 'https://kunwaranalytics.in/podcast',
  description:
    'Market intelligence in 30 minutes. Sharp analysis on Indian startups, quick commerce, and financial markets.',
  webFeed: 'https://kunwaranalytics.in/podcast/feed.xml',
  author: { '@type': 'Organization', name: 'Kunwar Analytics' },
};

export default function PodcastPage() {
  const episodes = getAllPodcastEpisodes();

  return (
    <div className="min-h-screen">
      <JsonLd data={podcastSeriesSchema} />

      {/* Page header */}
      <section className="relative overflow-hidden bg-brand-navy py-20">
        <HeroBackground />
        <div className="wrap max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🎙️</span>
              <span className="section-label text-brand-teal">Podcast</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
              The Kunwar Analytics Podcast
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              Market Intelligence in 30 Minutes
            </p>

            {/* Subscribe buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://open.spotify.com/show/example"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white flex items-center gap-2"
              >
                <span>🎵</span> Spotify
              </a>
              <a
                href="https://podcasts.apple.com/example"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white flex items-center gap-2"
              >
                <span>🍎</span> Apple Podcasts
              </a>
              <a
                href="https://podcasts.google.com/example"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white flex items-center gap-2"
              >
                <span>📻</span> Google Podcasts
              </a>
              <a
                href="/podcast/feed.xml"
                className="btn-white flex items-center gap-2"
              >
                <Rss className="w-4 h-4" /> RSS Feed
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes list — search, filter, pagination */}
      <PodcastClient episodes={episodes} />
    </div>
  );
}
