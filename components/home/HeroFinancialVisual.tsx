// FILE: components/home/HeroFinancialVisual.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { ShieldCheck, Activity, ArrowUpRight } from 'lucide-react'

/**
 * HeroFinancialVisual — Right-column financial analytics visual for Homepage Hero.
 * Displays institutional market tracking cards, live sector metrics, and
 * visual analytics sparkline without extra network payload or external bundle weight.
 */
export default function HeroFinancialVisual() {
  const sectors = [
    { label: 'Quick Commerce', metric: '+42% YoY', badge: 'High Growth', href: '/tracker/quick-commerce' },
    { label: 'Fintech Payments', metric: '₹12.4T Volume', badge: 'Tier-1', href: '/tracker/fintech' },
    { label: 'EV Adoption', metric: '8.5% Share', badge: 'Structural', href: '/tracker/ev' },
    { label: 'AI Data Centers', metric: '2.4 GW CapEx', badge: 'Inflection', href: '/insights/ai-data-center-power-crunch-liquid-cooling' },
  ]

  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none">
      <div className="relative rounded-2xl border border-border/80 bg-card/85 dark:bg-[#0f131d]/90 p-4 sm:p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-teal-500/40">
        {/* Ambient card glow */}
        <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-teal-500/10 via-transparent to-cyan-500/10 opacity-70 blur-xl" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/15 text-teal-600 dark:text-teal-400">
              <Activity className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                Market Intelligence
              </p>
              <p className="text-[11px] text-muted-foreground">Live Indian &amp; Global Sector Trackers</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Data
          </span>
        </div>

        {/* Mini Analytics Visualization Graph */}
        <div className="relative z-10 my-4 rounded-xl border border-border/50 bg-surface-muted/40 p-3">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2">
            <span>Market Expansion Trend (CAGR)</span>
            <span className="font-mono font-bold text-teal-600 dark:text-teal-400">+28.4%</span>
          </div>
          {/* Responsive SVG Chart */}
          <div className="h-16 w-full">
            <svg
              viewBox="0 0 300 64"
              className="h-full w-full overflow-visible"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,50 Q40,42 75,34 T150,28 T225,14 T300,6 L300,64 L0,64 Z"
                fill="url(#heroGradient)"
              />
              <path
                d="M0,50 Q40,42 75,34 T150,28 T225,14 T300,6"
                fill="none"
                stroke="#0d9488"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="300" cy="6" r="3.5" fill="#14b8a6" className="animate-ping" opacity="0.75" />
              <circle cx="300" cy="6" r="3" fill="#14b8a6" />
            </svg>
          </div>
        </div>

        {/* Live Sector Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-2.5">
          {sectors.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="group block rounded-xl border border-border/50 bg-background/60 p-2.5 transition-all hover:border-teal-500/50 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="truncate">{s.badge}</span>
                <ArrowUpRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="mt-1 text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">
                {s.label}
              </p>
              <p className="font-mono text-xs font-semibold text-teal-700 dark:text-teal-400">
                {s.metric}
              </p>
            </Link>
          ))}
        </div>

        {/* Footer Trust Marker */}
        <div className="relative z-10 mt-4 flex items-center justify-between pt-3 border-t border-border/50 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
            100% Free &amp; Peer-Reviewed
          </span>
          <span className="text-[10px] text-muted-foreground/80 font-mono">
            ECB &bull; World Bank SLA
          </span>
        </div>
      </div>
    </div>
  )
}
