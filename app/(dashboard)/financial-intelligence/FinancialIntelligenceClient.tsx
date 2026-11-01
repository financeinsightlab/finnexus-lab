'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import type { MetricRecord } from '@/lib/financial-data';
import {
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Clock,
  Layers,
  BarChart3,
  Globe2,
  DollarSign,
  Landmark,
  Percent,
  Flame,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Search,
} from 'lucide-react';

interface SectorSummary {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  temperature: number;
  tempLabel: string;
  consensus: string;
  headline: string;
  keyMetrics: Array<{ label: string; value: string; delta?: string }>;
}

interface FinancialIntelligenceClientProps {
  metrics: MetricRecord[];
  freshnessSummary: {
    total: number;
    fresh: number;
    aging: number;
    stale: number;
    lastSuccessfulIngestion: string | null;
    latestObservation: string | null;
  };
  sectors: SectorSummary[];
}

const TABS = [
  { id: 'overview', label: 'Terminal Overview', icon: Layers },
  { id: 'markets', label: 'Equities & Indices', icon: BarChart3 },
  { id: 'macro', label: 'Indian Macro & RBI', icon: Landmark },
  { id: 'forex', label: 'Forex & Fixed Income', icon: DollarSign },
  { id: 'commodities', label: 'Commodities', icon: Flame },
  { id: 'sectors', label: 'Sector Intelligence', icon: Globe2 },
  { id: 'provenance', label: 'Data Quality & Provenance', icon: ShieldCheck },
] as const;

type TabId = (typeof TABS)[number]['id'];

const FRESHNESS_BADGES: Record<string, { label: string; color: string; bg: string; border: string }> = {
  'real-time': { label: 'Real-time', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  delayed: { label: 'Delayed', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  'end-of-day': { label: 'End-of-day', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  'daily-reference': { label: 'Daily Ref', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  weekly: { label: 'Weekly', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  monthly: { label: 'Monthly', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
  quarterly: { label: 'Quarterly', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/30' },
  annual: { label: 'Annual', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
  stale: { label: 'Stale', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
};

export default function FinancialIntelligenceClient({
  metrics,
  freshnessSummary,
  sectors,
}: FinancialIntelligenceClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Group metrics by category
  const categories = useMemo(() => {
    const map = new Map<string, MetricRecord[]>();
    for (const m of metrics) {
      const list = map.get(m.category) ?? [];
      list.push(m);
      map.set(m.category, list);
    }
    return map;
  }, [metrics]);

  const equities = categories.get('equity') ?? [];
  const fxList = categories.get('fx') ?? [];
  const macroList = categories.get('macro') ?? [];
  const rbiList = categories.get('rbi') ?? [];
  const bondList = categories.get('bond') ?? [];
  const commodities = categories.get('commodity') ?? [];

  // Filtered metrics for provenance
  const filteredMetrics = useMemo(() => {
    if (!searchQuery.trim()) return metrics;
    const q = searchQuery.toLowerCase();
    return metrics.filter(
      (m) =>
        m.label.toLowerCase().includes(q) ||
        m.key.toLowerCase().includes(q) ||
        m.source.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
    );
  }, [metrics, searchQuery]);

  return (
    <div className="space-y-8">
      {/* ─── Bloomberg Navigation Ribbon ─── */}
      <div className="border-b border-white/10 bg-[#0E121D]/90 backdrop-blur sticky top-16 z-30 -mx-6 px-6 py-2.5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          <nav className="flex items-center gap-1.5 shrink-0" role="tablist">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                    isActive
                      ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30 shadow-[0_0_12px_rgba(20,184,166,0.15)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3 shrink-0 text-xs">
            <span className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SLA: {freshnessSummary.fresh}/{freshnessSummary.total} Fresh
            </span>
            <Link
              href="/data-freshness"
              className="text-xs text-teal-400 hover:text-teal-300 font-medium inline-flex items-center gap-1"
            >
              Freshness SLA &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* ─── TAB CONTENT ─── */}

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-12">
          {/* Key Macro Strip */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-teal-400" />
                <span>Macroeconomic &amp; Monetary Anchors (India)</span>
              </h2>
              <span className="text-[11px] text-slate-500 font-mono">Source: World Bank &amp; RBI Official</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {[
                { label: 'Repo Rate', value: '6.50%', sub: 'MPC: Neutral Stance', source: 'RBI' },
                { label: 'SDF Rate', value: '6.25%', sub: 'Operating Floor', source: 'RBI' },
                { label: 'MSF Rate', value: '6.75%', sub: 'Standing Ceiling', source: 'RBI' },
                { label: '10Y G-Sec', value: '6.84%', sub: 'Sovereign Benchmark', source: 'CCIL' },
                { label: 'India GDP', value: '$3.96T', sub: 'Nominal (Current USD)', source: 'World Bank' },
                { label: 'CPI Inflation', value: '5.49%', sub: 'Annual Headline YoY', source: 'MoSPI' },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-xl border border-white/10 bg-[#121624] p-4 flex flex-col justify-between hover:border-teal-500/40 transition-colors"
                >
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{card.label}</p>
                  <p className="text-2xl font-extrabold text-white mt-1.5 font-mono">{card.value}</p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="truncate">{card.sub}</span>
                    <span className="font-bold text-teal-400/80">{card.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Markets & Indices Module A */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span>Major Benchmarks &amp; Closing References</span>
              </h2>
              <span className="text-[11px] text-slate-500">Delayed / End-of-Day closing levels</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {equities.map((item) => (
                <TerminalCard key={item.key} metric={item} />
              ))}
              {commodities.slice(0, 4).map((item) => (
                <TerminalCard key={item.key} metric={item} />
              ))}
            </div>
          </section>

          {/* Currency & Forex Module D */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Forex &amp; Cross Rates (ECB Indicative Reference)</span>
              </h2>
              <span className="text-[11px] text-slate-500">Free keyless public rates (Frankfurter)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {fxList.map((item) => (
                <TerminalCard key={item.key} metric={item} />
              ))}
            </div>
          </section>

          {/* Sector Intelligence Snapshots Module G */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-purple-400" />
                  <span>Indian Sector Intelligence &amp; Thermometer</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Quarter-keyed verified sector snapshots and competitive positioning.</p>
              </div>
              <Link href="/tracker" className="text-xs text-teal-400 hover:text-teal-300 font-semibold inline-flex items-center gap-1">
                Explore All Trackers &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sectors.map((sec) => (
                <Link
                  key={sec.slug}
                  href={`/tracker/${sec.slug}`}
                  className="group rounded-xl border border-white/10 bg-[#121624] p-4 flex flex-col justify-between hover:border-teal-500/40 hover:bg-[#151b2c] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-bold text-white flex items-center gap-2">
                        <span>{sec.icon}</span>
                        <span>{sec.name}</span>
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                        {sec.tempLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{sec.headline}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                    {sec.keyMetrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">{m.label}</span>
                        <span className="font-mono font-bold text-slate-200">{m.value}</span>
                      </div>
                    ))}
                    <div className="text-right pt-1">
                      <span className="text-[10px] text-teal-400 font-semibold group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
                        Open Tracker <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* EQUITIES TAB */}
      {activeTab === 'markets' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">
              Equities &amp; Global Benchmark Indices
            </h2>
            <p className="text-xs text-slate-500">
              Official closing benchmark figures. No intraday quotes or fabricated values are published.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {equities.map((item) => (
              <TerminalCard key={item.key} metric={item} />
            ))}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-400 leading-relaxed">
            <p className="font-semibold text-slate-200 mb-1">Market Data Statement:</p>
            <p>
              Values shown for NIFTY 50, BSE SENSEX, NIFTY Bank, S&amp;P 500, and NASDAQ Composite reflect official
              end-of-day market closes or published reference summaries. KunwarAnalytics does not provide streaming
              tick-by-tick trading data.
            </p>
          </div>
        </section>
      )}

      {/* MACRO & RBI TAB */}
      {activeTab === 'macro' && (
        <section className="space-y-8">
          {/* Module C: RBI Monetary Policy */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">
                Module C — RBI &amp; Monetary Policy Framework
              </h2>
              <p className="text-xs text-slate-500">
                Official policy interest rates, reserve ratios, and Monetary Policy Committee (MPC) resolutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rbiList.map((item) => (
                <TerminalCard key={item.key} metric={item} />
              ))}
            </div>

            <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
                  Latest Monetary Policy Decision &middot; MPC Resolution
                </span>
                <span className="text-xs text-slate-400 font-mono">Date: October 2024</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Policy Repo Rate maintained at 6.50% &middot; Monetary Policy Stance changed to &lsquo;Neutral&rsquo;
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The Monetary Policy Committee (MPC) voted by a majority of 5 to 1 to keep the policy repo rate unchanged at 6.50%.
                The stance was revised unanimously to &lsquo;Neutral&rsquo; from &lsquo;Withdrawal of Accommodation&rsquo;, while remaining
                unambiguously focused on a durable alignment of inflation with the 4% target while supporting growth.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs">
                <a
                  href="https://www.rbi.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  Official RBI Press Release <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Module B: Macro Indicators */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">
                Module B — Indian Macroeconomic Indicators
              </h2>
              <p className="text-xs text-slate-500">
                GDP, consumer price inflation, wholesale inflation, and foreign exchange reserves.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {macroList.map((item) => (
                <TerminalCard key={item.key} metric={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOREX & FIXED INCOME TAB */}
      {activeTab === 'forex' && (
        <section className="space-y-8">
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">
                Module D — Currency &amp; Foreign Exchange (ECB Reference Rates)
              </h2>
              <p className="text-xs text-slate-500">
                Indicative reference foreign exchange rates sourced via Frankfurter (European Central Bank).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {fxList.map((item) => (
                <TerminalCard key={item.key} metric={item} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">
                Module E — Sovereign Fixed Income &amp; Yield Curve
              </h2>
              <p className="text-xs text-slate-500">
                Government bond benchmark yields and sovereign spreads.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bondList.map((item) => (
                <TerminalCard key={item.key} metric={item} />
              ))}
            </div>

            <div className="rounded-xl border border-white/10 bg-[#121624] p-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                Sovereign Spread Analysis (India 10Y vs. US 10Y)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-white/5">
                  <p className="text-xs text-slate-400">India 10Y Benchmark</p>
                  <p className="text-xl font-bold font-mono text-white mt-1">6.84%</p>
                  <p className="text-[10px] text-slate-500">CCIL / FIMMDA</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <p className="text-xs text-slate-400">US 10Y Treasury</p>
                  <p className="text-xl font-bold font-mono text-white mt-1">4.28%</p>
                  <p className="text-[10px] text-slate-500">US Treasury</p>
                </div>
                <div className="p-3 rounded-lg bg-teal-500/10 border border-teal-500/20">
                  <p className="text-xs text-teal-400">Yield Differential</p>
                  <p className="text-xl font-bold font-mono text-teal-400 mt-1">+256 bps</p>
                  <p className="text-[10px] text-slate-400">Sovereign Risk Premium</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* COMMODITIES TAB */}
      {activeTab === 'commodities' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">
              Module F — Energy &amp; Precious Metals Benchmarks
            </h2>
            <p className="text-xs text-slate-500">
              Benchmark reference quotes for crude oil, gold, and silver.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {commodities.map((item) => (
              <TerminalCard key={item.key} metric={item} />
            ))}
          </div>
        </section>
      )}

      {/* SECTOR INTELLIGENCE TAB */}
      {activeTab === 'sectors' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">
                Module G &amp; H — Sector Intelligence &amp; Company Fundamentals
              </h2>
              <p className="text-xs text-slate-500">
                Quarter-keyed operational metrics, unit economics, market shares, and competitive rankings.
              </p>
            </div>
            <Link href="/tracker" className="text-xs text-teal-400 hover:text-teal-300 font-semibold inline-flex items-center gap-1">
              Comprehensive Tracker Matrix &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sectors.map((sec) => (
              <div
                key={sec.slug}
                className="rounded-2xl border border-white/10 bg-[#121624] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{sec.icon}</span>
                      <div>
                        <h3 className="text-base font-bold text-white">{sec.name}</h3>
                        <p className="text-xs text-slate-400">{sec.consensus}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                      {sec.tempLabel} ({sec.temperature}°)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{sec.headline}</p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5">
                    {sec.keyMetrics.map((m, idx) => (
                      <div key={idx} className="text-center p-2 rounded-lg bg-white/3">
                        <p className="text-[10px] text-slate-400 truncate">{m.label}</p>
                        <p className="text-sm font-bold font-mono text-white mt-0.5">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">Quarterly Verified Dataset</span>
                  <Link
                    href={`/tracker/${sec.slug}`}
                    className="text-teal-400 hover:text-teal-300 font-semibold inline-flex items-center gap-1"
                  >
                    Deep Dive Analytics <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROVENANCE TAB (Module J) */}
      {activeTab === 'provenance' && (
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">
                Module J — Complete Data Quality &amp; Provenance Matrix
              </h2>
              <p className="text-xs text-slate-500">
                Full transparency on data frequency, primary source attribution, observation timestamp, and delay classifications.
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search indicators or sources..."
                className="w-full pl-9 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121624] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 bg-white/3 text-[11px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-5 py-3.5">Indicator Key</th>
                    <th className="px-5 py-3.5">Display Label</th>
                    <th className="px-5 py-3.5">Latest Value</th>
                    <th className="px-5 py-3.5">Observed Date</th>
                    <th className="px-5 py-3.5">Cadence</th>
                    <th className="px-5 py-3.5">Freshness Status</th>
                    <th className="px-5 py-3.5">Source &amp; License</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300 font-mono">
                  {filteredMetrics.map((m) => {
                    const badge = FRESHNESS_BADGES[m.freshness.status] ?? FRESHNESS_BADGES['daily-reference'];
                    return (
                      <tr key={m.key} className="hover:bg-white/5 transition-colors font-sans">
                        <td className="px-5 py-3.5 font-mono text-[11px] text-teal-400/90">{m.key}</td>
                        <td className="px-5 py-3.5 font-semibold text-white">{m.label}</td>
                        <td className="px-5 py-3.5 font-mono text-white font-bold">
                          {typeof m.value === 'number'
                            ? m.value > 1000000
                              ? `$${(m.value / 1e12).toFixed(2)}T`
                              : m.value.toLocaleString(undefined, { maximumFractionDigits: 2 })
                            : m.value}{' '}
                          <span className="text-[10px] text-slate-400 font-normal">{m.unit}</span>
                        </td>
                        <td className="px-5 py-3.5 font-mono text-slate-400 text-xs">
                          {new Date(m.observedAt).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td className="px-5 py-3.5 text-xs text-slate-400">
                          {m.frequency}
                          {m.delayMinutes ? ` (+${m.delayMinutes}m)` : ''}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg} ${badge.color} ${badge.border}`}>
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-slate-400">
                          <a
                            href={m.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-teal-400 underline decoration-slate-600 transition-colors"
                          >
                            {m.source}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function TerminalCard({ metric }: { metric: MetricRecord }) {
  const badge = FRESHNESS_BADGES[metric.freshness.status] ?? FRESHNESS_BADGES['daily-reference'];

  return (
    <div className="group rounded-xl border border-white/10 bg-[#121624] p-4 flex flex-col justify-between hover:border-teal-500/40 hover:bg-[#151b2c] transition-all">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider truncate mr-2">
            {metric.label}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${badge.bg} ${badge.color} ${badge.border}`}>
            {badge.label}
          </span>
        </div>

        <div className="flex items-baseline gap-1.5 my-2">
          <span className="text-2xl font-extrabold text-white font-mono">
            {metric.value > 1000000000
              ? `$${(metric.value / 1e12).toFixed(2)}T`
              : metric.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
          <span className="text-xs font-semibold text-slate-400">{metric.unit}</span>
        </div>

        <p className="text-[11px] text-slate-500 font-mono">
          Observed: {new Date(metric.observedAt).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
        <span className="truncate">{metric.source}</span>
        <span className="text-slate-400 font-mono">{metric.freshness.ageDays}d ago</span>
      </div>
    </div>
  );
}

