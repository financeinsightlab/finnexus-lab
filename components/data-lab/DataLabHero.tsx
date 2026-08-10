'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { ArrowUpRight, PlayCircle } from 'lucide-react';

// WebGL particle field (no SSR) — dark neural network background
const ParticleField = dynamic(() => import('@/components/three/ParticleField'), { ssr: false });

const HERO_STATS = [
  { value: 6, suffix: '+', label: 'Interactive Models' },
  { value: 4, suffix: '', label: 'Core Tools' },
  { value: 5, suffix: '+', label: 'Sectors Analysed' },
  { value: 100, suffix: '%', label: 'Dataset-driven' },
];

export default function DataLabHero() {
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-cinema-black">
      {/* 3D particle background */}
      {mounted && (
        <div className="absolute inset-0 z-0">
          <ParticleField reduced={reduced} />
        </div>
      )}

      {/* Overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none cinema-mesh opacity-30" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-cinema-black/60 via-transparent to-cinema-ink" />
      <div className="absolute inset-0 z-[1] pointer-events-none cinema-noise" />
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full bg-cinema-glow-blue/15 blur-[140px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full bg-cinema-violet/15 blur-[140px]" />

      {/* Content */}
      <div className="wrap relative z-10 max-w-6xl py-28 md:py-36">
        <div className="max-w-3xl">
          <p className="section-label mb-5 anim-fade" style={{ color: '#06b6d4' }}>
            The Quantitative Engine
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.06] mb-2 anim-fade-up">
            Where Data Becomes
          </h1>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.06] mb-6 cinema-text-glow anim-fade-up delay-200">
            Intelligence
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-10 anim-fade-up delay-300">
            Interactive models, live simulators, and downloadable datasets —
            the analytical backbone of Kunwar Analytics, built to be explored.
          </p>

          <div className="flex flex-wrap gap-4 anim-fade-up delay-300">
            <a
              href="#explorer"
              className="inline-flex items-center gap-2 rounded-xl bg-cinema-cyan px-7 py-3.5 text-base font-semibold text-cinema-ink hover:shadow-cinema-lg transition group"
            >
              Explore the Lab
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-base font-medium text-white hover:border-cinema-cyan/50 transition"
            >
              <PlayCircle className="w-4 h-4 text-cinema-cyan" />
              How It Works
            </a>
          </div>

          {/* Animated stat counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 anim-fade delay-500">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="glass-cinema rounded-2xl border border-white/10 px-5 py-5"
              >
                <div className="text-3xl md:text-4xl font-bold cinema-text-glow">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1800} />
                </div>
                <div className="text-xs text-gray-400 mt-1.5 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
