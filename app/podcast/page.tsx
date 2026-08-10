// FILE: app/podcast/page.tsx (server component)
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPodcastEpisodes } from '@/lib/content';
import JsonLd from '@/components/seo/JsonLd';
import PodcastClient from '@/components/podcast/PodcastClient';
import PodcastCover from '@/components/podcast/PodcastCover';
import AudioPlayer from '@/components/podcast/AudioPlayer';
import {
  Rss,
  Mic,
  Users,
  BarChart3,
  FileText,
  Clock,
  ArrowRight,
  Sparkles,
  Radio,
  BadgeCheck,
  Quote,
  Play,
} from 'lucide-react';
import type { PodcastEpisode } from '@/types';

export const metadata: Metadata = {
  title: 'Podcast | Kunwar Analytics',
  description:
    'Market intelligence in 30 minutes. The Kunwar Analytics Podcast delivers sharp analysis on Indian startups, quick commerce, financial markets, and institutional-grade research.',
};

const BASE = 'https://kunwaranalytics.in';

const podcastSeriesSchema = {
  '@context': 'https://schema.org',
  '@type': 'PodcastSeries',
  name: 'The Kunwar Analytics Podcast',
  url: `${BASE}/podcast`,
  description:
    'Market intelligence in 30 minutes. Sharp analysis on Indian startups, quick commerce, and financial markets.',
  webFeed: `${BASE}/podcast/feed.xml`,
  author: { '@type': 'Organization', name: 'Kunwar Analytics' },
};

const FORMAT_CARDS = [
  {
    format: 'Solo Analysis' as const,
    icon: Mic,
    desc: 'One host, one deep dive — earnings calls, unit economics, and strategy unpacked in 30 minutes.',
    accent: 'text-cinema-cyan border-cinema-cyan/30 bg-cinema-cyan/10',
  },
  {
    format: 'Expert Interview' as const,
    icon: Users,
    desc: 'Macro strategists, fund managers, and researchers on the questions that move markets.',
    accent: 'text-cinema-violet border-cinema-violet/30 bg-cinema-violet/10',
  },
  {
    format: 'Quarterly Tracker' as const,
    icon: BarChart3,
    desc: 'Every quarter, the numbers that matter — IPOs, earnings, flows — with no noise.',
    accent: 'text-cinema-amber border-cinema-amber/30 bg-cinema-amber/10',
  },
  {
    format: 'Research Summary' as const,
    icon: FileText,
    desc: 'Our institutional research notes, distilled into a listenable 30-minute brief.',
    accent: 'text-cinema-aurora border-cinema-aurora/30 bg-cinema-aurora/10',
  },
];

const TESTIMONIALS = [
  {
    quote: 'The only India-focussed finance podcast that reads like a research desk, not a news feed.',
    name: 'Arjun Mehta',
    role: 'Portfolio Manager, Mumbai',
  },
  {
    quote: 'I started with the Blinkit EBITDA episode. Now I listen to every drop — the unit-economics breakdowns are gold.',
    name: 'Sneha Reddy',
    role: 'Founder, D2C brand',
  },
  {
    quote: 'Quarterly trackers are the first thing I share with my team. Clean, fast, and no filler.',
    name: 'Vikram Nair',
    role: 'Analyst, Bengaluru',
  },
];

function computeStats(episodes: PodcastEpisode[]) {
  const totalMinutes = episodes.reduce((acc, ep) => {
    const parts = ep.duration.split(':').map(Number);
    return acc + (parts.length >= 2 ? parts[0] * 60 + (parts[1] || 0) : 0);
  }, 0);
  const topics = new Set(episodes.flatMap((e) => e.tags ?? []));
  return {
    count: episodes.length,
    hours: totalMinutes >= 60 ? Math.round((totalMinutes / 60) * 10) / 10 : 0,
    formats: new Set(episodes.map((e) => e.format)).size,
    topics: topics.size,
  };
}

export default async function PodcastPage({
  searchParams,
}: {
  searchParams: Promise<{ format?: string }>;
}) {
  const { format } = await searchParams;
  const episodes = getAllPodcastEpisodes();
  const stats = computeStats(episodes);
  const featured = episodes.find((e) => e.featured) ?? episodes[0];

  return (
    <div className="min-h-screen bg-cinema-black text-white overflow-hidden">
      <JsonLd data={podcastSeriesSchema} />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative aurora-bg pt-16 md:pt-24 pb-16 md:pb-24">
        {/* Ambient glows */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-cinema-cyan/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-cinema-violet/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] bg-grid pointer-events-none" />

        <div className="wrap max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cinema-cyan/10 border border-cinema-cyan/30 text-cinema-cyan text-xs font-bold uppercase tracking-widest mb-6">
                <Radio className="w-3.5 h-3.5" />
                The Kunwar Analytics Podcast
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
                Market intelligence,
                <span className="block bg-gradient-to-r from-cinema-cyan via-cinema-aurora to-cinema-violet bg-clip-text text-transparent">
                  in 30 minutes.
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
                Sharp analysis on Indian startups, quick commerce, and financial markets — the same
                depth as our research desk, in a format you can listen to on your commute.
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
                {[
                  { label: 'Episodes', value: stats.count },
                  { label: 'Hours of audio', value: stats.hours },
                  { label: 'Formats', value: stats.formats },
                  { label: 'Topics', value: stats.topics },
                ].map((s) => (
                  <div key={s.label} className="glass-cinema rounded-xl border border-white/10 px-4 py-3 text-center">
                    <div className="text-2xl font-extrabold text-white tabular-nums">{s.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Subscribe */}
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={`/podcast/${featured?.slug ?? ''}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cinema-cyan text-cinema-black font-bold shadow-glow-cyan hover:scale-[1.03] active:scale-95 transition-transform"
                >
                  <Play className="w-4 h-4 fill-current" /> Listen to latest
                </a>
                <a
                  href="https://open.spotify.com/show/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  🎵 Spotify
                </a>
                <a
                  href="https://podcasts.apple.com/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  🍎 Apple
                </a>
                <a
                  href="https://podcasts.google.com/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  📻 Google
                </a>
                <a
                  href="/podcast/feed.xml"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  <Rss className="w-4 h-4 text-cinema-cyan" /> RSS
                </a>
              </div>
            </div>

            {/* Right: now playing */}
            {featured && (
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-cinema-cyan/20 to-cinema-violet/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />
                <div className="relative glass-cinema rounded-3xl border border-white/10 p-6 md:p-8 shadow-cinema-lg">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-cinema-cyan mb-5">
                    <span className="w-2 h-2 rounded-full bg-cinema-cyan animate-pulse" />
                    Now playing — latest episode
                  </div>
                  <div className="flex items-center gap-5">
                    <PodcastCover episode={featured} size="lg" />
                    <div className="min-w-0">
                      <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border border-cinema-cyan/30 bg-cinema-cyan/10 text-cinema-cyan mb-2">
                        EP {String(featured.episodeNumber).padStart(2, '0')} · {featured.format}
                      </span>
                      <h3 className="font-bold text-white text-lg leading-snug line-clamp-3">
                        <Link href={`/podcast/${featured.slug}`} className="hover:text-cinema-cyan transition-colors">
                          {featured.title}
                        </Link>
                      </h3>
                    </div>
                  </div>
                  <div className="mt-6">
                    <AudioPlayer
                      src={featured.mp3Url ?? featured.audioUrl ?? ''}
                      title={featured.title}
                      episodeNumber={featured.episodeNumber}
                      compact
                    />
                  </div>
                  <Link
                    href={`/podcast/${featured.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cinema-cyan hover:gap-2.5 transition-all"
                  >
                    Read show notes & transcript <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED SPOTLIGHT (if different from latest) ═══════════ */}
      {featured && featured !== episodes[0] && (
        <section className="wrap max-w-6xl py-8">
          <div className="glass-cinema rounded-3xl border border-white/10 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
            <PodcastCover episode={featured} size="xl" />
            <div className="flex-grow">
              <span className="section-label text-cinema-amber flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Featured episode
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-3">{featured.title}</h2>
              <p className="text-gray-400 mb-6">{featured.description}</p>
              <AudioPlayer src={featured.mp3Url ?? featured.audioUrl ?? ''} title={featured.title} episodeNumber={featured.episodeNumber} />
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ BROWSE BY FORMAT ═══════════ */}
      <section className="wrap max-w-6xl py-12 md:py-16">
        <div className="mb-10">
          <span className="section-label text-cinema-cyan">Pick your format</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Browse the show</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FORMAT_CARDS.map((card) => {
            const count = episodes.filter((e) => e.format === card.format).length;
            return (
              <Link
                key={card.format}
                href={`/podcast?format=${encodeURIComponent(card.format)}#episodes`}
                className="group glass-cinema rounded-2xl border border-white/10 p-6 hover:border-white/25 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${card.accent}`}>
                  <card.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-bold text-white mb-2">{card.format}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{card.desc}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{count} episode{count === 1 ? '' : 's'}</span>
                  <span className="inline-flex items-center gap-1 text-cinema-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                    Browse <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══════════ ALL EPISODES (search / filter / list) ═══════════ */}
      <PodcastClient episodes={episodes} initialFormat={format} />

      {/* ═══════════ HOST ═══════════ */}
      <section className="border-y border-white/5 bg-cinema-ink/60">
        <div className="wrap max-w-6xl py-16 md:py-20 grid md:grid-cols-[auto_1fr] gap-8 md:gap-14 items-center">
          <div className="relative flex-shrink-0 mx-auto md:mx-0">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-cinema-cyan/30 to-cinema-violet/30 blur-xl opacity-60" />
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-cinema-cyan to-cinema-violet flex items-center justify-center text-5xl md:text-6xl font-black text-cinema-black">
              K
            </div>
          </div>
          <div>
            <span className="section-label text-cinema-cyan">About the host</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Kunwar — analyst, researcher, host</h2>
            <p className="text-gray-400 leading-relaxed max-w-2xl mb-6">
              Kunwar Analytics started as a research desk publishing institutional-grade notes on Indian
              markets. The podcast is that same desk, out loud — every episode built from primary filings,
              unit-economics models, and earnings-call transcripts, not headlines.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Financial modelling', 'Quick commerce', 'Unit economics', 'IPO markets', 'Startup strategy'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                  <BadgeCheck className="w-3.5 h-3.5 text-cinema-cyan" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="wrap max-w-6xl py-16 md:py-20">
        <div className="text-center mb-12">
          <span className="section-label text-cinema-cyan">Listeners</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">What our listeners say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="glass-cinema rounded-2xl border border-white/10 p-6 flex flex-col">
              <Quote className="w-8 h-8 text-cinema-cyan/40 mb-4" />
              <blockquote className="text-gray-300 leading-relaxed flex-grow">“{t.quote}”</blockquote>
              <figcaption className="mt-6 pt-4 border-t border-white/10">
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-sm text-gray-500">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ═══════════ SUBSCRIBE CTA ═══════════ */}
      <section className="relative aurora-bg">
        <div className="wrap max-w-4xl py-20 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-gray-300 text-xs font-bold uppercase tracking-widest mb-6">
            <Clock className="w-3.5 h-3.5 text-cinema-cyan" /> New episodes every two weeks
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Never miss an episode
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Market intelligence in 30 minutes, delivered to your favourite podcast app. Subscribe free —
            no spam, ever.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Spotify', icon: '🎵', href: 'https://open.spotify.com/show/example' },
              { label: 'Apple Podcasts', icon: '🍎', href: 'https://podcasts.apple.com/example' },
              { label: 'Google Podcasts', icon: '📻', href: 'https://podcasts.google.com/example' },
            ].map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cinema-cyan text-cinema-black font-bold shadow-glow-cyan hover:scale-[1.03] active:scale-95 transition-transform"
              >
                <span>{p.icon}</span> {p.label}
              </a>
            ))}
            <a
              href="/podcast/feed.xml"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              <Rss className="w-4 h-4 text-cinema-cyan" /> RSS Feed
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
