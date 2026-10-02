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
  description: 'The Kunwar Analytics podcast: markets, strategy and data conversations with practitioners — episode notes, transcripts and takeaways.',
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
    accent: 'border-teal-600/30 bg-teal-500/10 text-teal-700 dark:border-cinema-cyan/30 dark:bg-cinema-cyan/10 dark:text-cinema-cyan',
  },
  {
    format: 'Expert Interview' as const,
    icon: Users,
    desc: 'Macro strategists, fund managers, and researchers on the questions that move markets.',
    accent: 'border-violet-600/30 bg-violet-500/10 text-violet-700 dark:border-cinema-violet/30 dark:bg-cinema-violet/10 dark:text-cinema-violet',
  },
  {
    format: 'Quarterly Tracker' as const,
    icon: BarChart3,
    desc: 'Every quarter, the numbers that matter — IPOs, earnings, flows — with no noise.',
    accent: 'border-amber-600/30 bg-amber-500/10 text-amber-700 dark:border-cinema-amber/30 dark:bg-cinema-amber/10 dark:text-cinema-amber',
  },
  {
    format: 'Research Summary' as const,
    icon: FileText,
    desc: 'Our institutional research notes, distilled into a listenable 30-minute brief.',
    accent: 'border-emerald-600/30 bg-emerald-500/10 text-emerald-700 dark:border-cinema-aurora/30 dark:bg-cinema-aurora/10 dark:text-cinema-aurora',
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
    <div className="min-h-screen min-w-0 overflow-hidden bg-background text-foreground">
      <JsonLd data={podcastSeriesSchema} />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative aurora-bg pt-16 md:pt-24 pb-16 md:pb-24">
        {/* Ambient glows */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-cinema-cyan/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-cinema-violet/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 hidden opacity-[0.04] bg-grid pointer-events-none dark:block" />

        <div className="content-page relative z-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                <Radio className="w-3.5 h-3.5" />
                The Kunwar Analytics Podcast
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
                Market intelligence,
                <span className="block bg-gradient-to-r from-cinema-cyan via-cinema-aurora to-cinema-violet bg-clip-text text-transparent">
                  in 30 minutes.
                </span>
              </h1>

              <p className="mt-6 max-w-[72ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
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
                  <div key={s.label} className="rounded-xl border border-border bg-card/70 px-4 py-3 text-center shadow-sm backdrop-blur-md">
                    <div className="text-2xl font-extrabold tabular-nums text-foreground">{s.value}</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Subscribe */}
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={`/podcast/${featured?.slug ?? ''}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground shadow-sm transition-transform hover:scale-[1.03] active:scale-95"
                >
                  <Play className="h-4 w-4 fill-current" /> Listen to latest
                </a>
                <a
                  href="https://open.spotify.com/show/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  🎵 Spotify
                </a>
                <a
                  href="https://podcasts.apple.com/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  🍎 Apple
                </a>
                <a
                  href="https://podcasts.google.com/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  📻 Google
                </a>
                <a
                  href="/podcast/feed.xml"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  <Rss className="h-4 w-4 text-primary" /> RSS
                </a>
              </div>
            </div>

            {/* Right: now playing */}
            {featured && (
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-cinema-cyan/20 to-cinema-violet/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />
                <div className="relative rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
                  <div className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                    Now playing — latest episode
                  </div>
                  <div className="flex items-center gap-5">
                    <PodcastCover episode={featured} size="lg" />
                    <div className="min-w-0">
                      <span className="mb-2 inline-block rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                        EP {String(featured.episodeNumber).padStart(2, '0')} · {featured.format}
                      </span>
                      <h3 className="line-clamp-3 text-lg font-bold leading-snug text-foreground">
                        <Link href={`/podcast/${featured.slug}`} className="transition-colors hover:text-primary">
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
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5"
                  >
                    Read show notes & transcript <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED SPOTLIGHT (if different from latest) ═══════════ */}
      {featured && featured !== episodes[0] && (
        <section className="content-page py-8">
          <div className="flex flex-col items-start gap-8 rounded-3xl border border-border bg-card p-8 shadow-sm md:flex-row md:p-10">
            <PodcastCover episode={featured} size="xl" />
            <div className="flex-grow">
              <span className="section-label flex items-center gap-2 text-amber-700 dark:text-cinema-amber">
                <Sparkles className="w-4 h-4" /> Featured episode
              </span>
              <h2 className="mb-3 mt-3 text-2xl font-bold text-foreground md:text-3xl">{featured.title}</h2>
              <p className="mb-6 text-muted-foreground">{featured.description}</p>
              <AudioPlayer src={featured.mp3Url ?? featured.audioUrl ?? ''} title={featured.title} episodeNumber={featured.episodeNumber} />
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ BROWSE BY FORMAT ═══════════ */}
      <section className="content-page py-12 md:py-16">
        <div className="mb-10">
          <span className="section-label text-primary">Pick your format</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">Browse the show</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FORMAT_CARDS.map((card) => {
            const count = episodes.filter((e) => e.format === card.format).length;
            return (
              <Link
                key={card.format}
                href={`/podcast?format=${encodeURIComponent(card.format)}#episodes`}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${card.accent}`}>
                  <card.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 font-bold text-foreground">{card.format}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{count} episode{count === 1 ? '' : 's'}</span>
                  <span className="inline-flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100">
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
      <section className="border-y border-border bg-muted/40">
        <div className="content-page grid items-center gap-8 py-16 md:grid-cols-[auto_1fr] md:gap-14">
          <div className="relative flex-shrink-0 mx-auto md:mx-0">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-cinema-cyan/30 to-cinema-violet/30 blur-xl opacity-60" />
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-violet-600 text-5xl font-black text-white md:h-44 md:w-44 md:text-6xl">
              K
            </div>
          </div>
          <div>
            <span className="section-label text-primary">About the host</span>
            <h2 className="mb-4 mt-2 text-3xl font-bold text-foreground md:text-4xl">Kunwar — analyst, researcher, host</h2>
            <p className="mb-6 max-w-2xl leading-relaxed text-muted-foreground">
              Kunwar Analytics started as a research desk publishing institutional-grade notes on Indian
              markets. The podcast is that same desk, out loud — every episode built from primary filings,
              unit-economics models, and earnings-call transcripts, not headlines.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Financial modelling', 'Quick commerce', 'Unit economics', 'IPO markets', 'Startup strategy'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground">
                  <BadgeCheck className="h-3.5 w-3.5 text-primary" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="content-page py-16 md:py-20">
        <div className="text-center mb-12">
          <span className="section-label text-primary">Listeners</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">What our listeners say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
              <Quote className="mb-4 h-8 w-8 text-primary/40" />
              <blockquote className="flex-grow leading-relaxed text-muted-foreground">“{t.quote}”</blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <div className="font-semibold text-foreground">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ═══════════ SUBSCRIBE CTA ═══════════ */}
      <section className="relative aurora-bg">
        <div className="content-page py-20 text-center md:py-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-primary" /> New episodes every two weeks
          </div>
          <h2 className="mb-4 text-3xl font-extrabold text-foreground md:text-5xl">
            Never miss an episode
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
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
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground shadow-sm transition-transform hover:scale-[1.03] active:scale-95"
              >
                <span>{p.icon}</span> {p.label}
              </a>
            ))}
            <a
              href="/podcast/feed.xml"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <Rss className="h-4 w-4 text-primary" /> RSS Feed
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
