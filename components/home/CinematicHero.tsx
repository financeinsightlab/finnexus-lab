// FILE: components/home/CinematicHero.tsx
'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import RevealText from '@/components/ui/RevealText'
import MagneticButton3D from '@/components/ui/MagneticButton3D'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import HeroFinancialVisual from '@/components/home/HeroFinancialVisual'

/**
 * CinematicHero — client-side hero with WebGL 3D background.
 * Dynamically imports HeroScene (no SSR) to avoid WebGL on server.
 * Handles prefers-reduced-motion detection and passes to 3D scene.
 * Responsively transforms between left-aligned desktop and clean vertical mobile.
 */

// Lightweight placeholder shown while the ~200KB Three.js bundle downloads
function HeroPlaceholder() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.08), transparent 70%), radial-gradient(ellipse at 70% 50%, rgba(124,58,237,0.06), transparent 70%)',
      }}
    />
  )
}

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => <HeroPlaceholder />,
})

const HERO_STATS = [
  { value: 10, suffix: '+', label: 'Reports' },
  { value: 1, prefix: '₹', suffix: 'T+', label: 'Market Cap' },
  { value: 5, suffix: '+', label: 'Sectors' },
]

export default function CinematicHero() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background dark:bg-cinema-black">
      {/* 3D WebGL hero scene (ambient background) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroScene reduced={reduced} />
      </div>

      {/* Ambient gradient overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none cinema-mesh hidden opacity-40 dark:block" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/70 dark:from-cinema-black/40 dark:via-transparent dark:to-cinema-black/85" />
      <div className="absolute inset-0 z-[1] pointer-events-none cinema-noise hidden dark:block" />

      {/* Content Container */}
      <div className="content-page relative z-10 py-24 sm:py-28 md:py-36 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (Desktop) / Primary Stack (Mobile) */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* 1. Eyebrow */}
            <p className="section-label mb-4 sm:mb-5 anim-fade text-cyan-700 dark:text-cyan-400 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm">
              Financial Intelligence Platform
            </p>

            {/* 2. Headline with fluid typography clamp */}
            <RevealText
              as="h1"
              className="display-hero-headline font-bold text-slate-900 dark:text-white leading-[1.08] mb-5 sm:mb-6 max-w-2xl"
              delay={0.1}
              stagger={0.08}
            >
              Smarter Decisions Start Here.
            </RevealText>

            {/* 3. Description */}
            <RevealText
              as="p"
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-gray-300 max-w-2xl leading-relaxed mb-8 sm:mb-10"
              delay={0.5}
              stagger={0.03}
              y={20}
            >
              Institutional-quality research on Indian markets — free. Sector analysis, unit economics, and strategic intelligence for investors, analysts, and founders.
            </RevealText>

            {/* 4. CTA buttons (stacked on small mobile, row on tablet/desktop) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto anim-fade-up delay-300">
              <MagneticButton3D href="/research" variant="solid" className="w-full sm:w-auto px-7 py-3 text-base min-h-[44px] justify-center text-center">
                View Research →
              </MagneticButton3D>
              <MagneticButton3D href="/insights" variant="outline" className="w-full sm:w-auto px-7 py-3 text-base min-h-[44px] justify-center text-center">
                Explore Insights
              </MagneticButton3D>
            </div>

            {/* 5. Statistics cards (responsive 2-column grid on mobile, 4-column on desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mt-10 sm:mt-12 lg:mt-16 w-full max-w-xl lg:max-w-none anim-fade delay-500">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card/75 px-4 py-3.5 sm:px-5 sm:py-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 text-center lg:text-left flex flex-col justify-center min-w-0"
                  data-cursor="card"
                >
                  <p className="hero-stat-value text-2xl sm:text-3xl font-bold mb-1 truncate">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix ?? ''}
                      suffix={stat.suffix ?? ''}
                      duration={2500}
                    />
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider truncate">{stat.label}</p>
                </div>
              ))}
              <div className="glass-cinema rounded-xl px-4 py-3.5 sm:px-5 sm:py-4 text-center lg:text-left flex flex-col justify-center min-w-0" data-cursor="card">
                <p className="text-2xl sm:text-3xl font-bold cinema-text-gradient mb-1">Free</p>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider">Always</p>
              </div>
            </div>
          </div>

          {/* Right Column on Desktop / 6. Visual on Mobile */}
          <div className="lg:col-span-5 xl:col-span-5 w-full flex items-center justify-center anim-fade delay-700">
            <HeroFinancialVisual />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden sm:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center z-10 anim-fade delay-700 pointer-events-none">
        <span className="text-xs text-slate-500 dark:text-gray-500 mb-2 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-cinema-cyan to-transparent" />
      </div>
    </section>
  )
}
