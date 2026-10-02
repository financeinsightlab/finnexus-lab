'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { ArrowUpRight, PlayCircle } from 'lucide-react';

// WebGL particle field (no SSR) — dark neural network background
const ParticleField = dynamic(() => import('@/components/three/ParticleField'), { ssr: false });

const HERO_STATS = [
  { value: 7, suffix: '', label: 'Published Project Pages' },
  { value: 8, suffix: '', label: 'Tracked Sectors' },
  { value: 16, suffix: '', label: 'Financial Calculators' },
];

export default function DataLabHero() {
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setMounted(true);
  }, []);

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-background dark:bg-cinema-black">
      {/* 3D particle background */}
      {mounted && (
        <div className="absolute inset-0 z-0">
          <ParticleField reduced={reduced} />
        </div>
      )}

      {/* Overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none cinema-mesh hidden opacity-30 dark:block" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/70 dark:from-cinema-black/60 dark:to-cinema-ink" />
      <div className="absolute inset-0 z-[1] pointer-events-none cinema-noise hidden dark:block" />
      <div className="absolute left-1/4 top-1/4 h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-[140px] dark:bg-cinema-glow-blue/15" />
      <div className="absolute bottom-1/4 right-1/4 h-[30rem] w-[30rem] rounded-full bg-violet-500/10 blur-[140px] dark:bg-cinema-violet/15" />

      {/* Content */}
      <div className="content-page relative z-10 py-28 md:py-36">
        <div className="max-w-3xl">
          <p className="section-label mb-5 anim-fade text-cyan-700 dark:text-cyan-400">
            The Quantitative Engine
          </p>

          <h1 className="anim-fade-up mb-2 text-5xl font-bold leading-[1.06] text-slate-900 dark:text-white md:text-6xl lg:text-7xl">
            Where Data Becomes
          </h1>
          <span className="anim-fade-up mb-6 block text-5xl font-bold leading-[1.06] text-primary md:text-6xl lg:text-7xl dark:cinema-text-glow">
            Intelligence
          </span>

          <p className="anim-fade-up mb-10 max-w-[72ch] text-xl leading-relaxed text-slate-600 dark:text-gray-300 md:text-2xl">
            Explore published project pages, interactive views, and downloads where provided. Source and update details vary by project; no intraday market-data feed is included.
          </p>

          <div className="flex flex-wrap gap-4 anim-fade-up delay-300">
            <a
              href="#explorer"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:shadow-lg"
            >
              Explore the Lab
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-base font-medium text-foreground transition hover:border-primary/50"
            >
              <PlayCircle className="h-4 w-4 text-primary" />
              How It Works
            </a>
          </div>

          {/* Animated stat counters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-16 anim-fade delay-500">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card/70 px-5 py-5 shadow-sm backdrop-blur-md"
              >
                <div className="text-3xl font-bold text-foreground md:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1800} />
                </div>
                <div className="mt-1.5 text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
