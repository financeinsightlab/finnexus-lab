// FILE: components/home/CinematicHero.tsx
'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import RevealText from '@/components/ui/RevealText'
import MagneticButton3D from '@/components/ui/MagneticButton3D'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

/**
 * CinematicHero — client-side hero with WebGL 3D background.
 * Dynamically imports HeroScene (no SSR) to avoid WebGL on server.
 * Handles prefers-reduced-motion detection and passes to 3D scene.
 */

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false })

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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cinema-black">
      {/* 3D WebGL hero scene */}
      <div className="absolute inset-0 z-0">
        <HeroScene reduced={reduced} />
      </div>

      {/* Ambient gradient overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none cinema-mesh opacity-40" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-cinema-black/40 via-transparent to-cinema-black/80" />
      <div className="absolute inset-0 z-[1] pointer-events-none cinema-noise" />

      {/* Content */}
      <div className="wrap relative z-10 py-32 md:py-40">
        <p className="section-label mb-5 anim-fade" style={{ color: '#06b6d4' }}>
          Financial Intelligence Platform
        </p>

        <RevealText
          as="h1"
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6"
          delay={0.1}
          stagger={0.08}
        >
          Smarter Decisions Start Here.
        </RevealText>

        <RevealText
          as="p"
          className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-10"
          delay={0.5}
          stagger={0.03}
          y={20}
        >
          Institutional-quality research on Indian markets — free. Sector analysis, unit economics, and strategic intelligence for investors, analysts, and founders.
        </RevealText>

        <div className="flex flex-wrap gap-4 anim-fade-up delay-300">
          <MagneticButton3D href="/research" variant="solid" className="px-7 py-3 text-base">
            View Research →
          </MagneticButton3D>
          <MagneticButton3D href="/insights" variant="outline" className="px-7 py-3 text-base">
            Explore Insights
          </MagneticButton3D>
        </div>

        {/* Animated stat counters */}
        <div className="flex flex-wrap gap-6 mt-16 anim-fade delay-500">
          {HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass-cinema min-w-[120px] rounded-xl px-5 py-4"
              data-cursor="card"
            >
              <p className="text-3xl font-bold cinema-text-gradient mb-1">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix ?? ''}
                  suffix={stat.suffix ?? ''}
                  duration={2500}
                />
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
          <div className="glass-cinema min-w-[120px] rounded-xl px-5 py-4" data-cursor="card">
            <p className="text-3xl font-bold cinema-text-gradient mb-1">Free</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Always</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 anim-fade delay-700">
        <span className="text-xs text-gray-500 mb-2 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-cinema-cyan to-transparent" />
      </div>
    </section>
  )
}
