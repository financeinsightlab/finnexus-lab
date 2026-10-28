'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle,
  Lock, Zap, BarChart2, Target, ChevronRight, ExternalLink,
  ArrowUpRight, ArrowDownRight, Info, Shield, Activity
} from 'lucide-react';
import type {
  CompanyIntelligenceReport,
  HealthScore,
  AIAnalysis,
  CompanyFinancials,
  DCFData,
} from '@/lib/company-intelligence';

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  label, value, unit = '', sub, trend, highlight = false,
}: {
  label: string; value: string | number | null; unit?: string;
  sub?: string; trend?: 'up' | 'down' | 'neutral'; highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-4 ${highlight ? 'border-cinema-cyan/30 bg-cinema-cyan/5' : 'border-white/10 bg-white/5'}`}>
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <div className="flex items-end gap-1">
        <span className={`text-2xl font-bold ${highlight ? 'text-cinema-cyan' : 'text-white'}`}>
          {value ?? '—'}
        </span>
        {unit && <span className="text-sm text-gray-500 mb-0.5">{unit}</span>}
        {trend === 'up' && <ArrowUpRight size={16} className="text-green-400 mb-1 ml-1" />}
        {trend === 'down' && <ArrowDownRight size={16} className="text-red-400 mb-1 ml-1" />}
      </div>
      {sub && <p className="text-xs text-gray-600 mt-0.5">{sub}</p>}
    </div>
  );
}

// ─── Health Score Ring ────────────────────────────────────────────────────────

function HealthRing({ score }: { score: number }) {
  const size = 120;
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? '#22d3ee' : score >= 50 ? '#f59e0b' : '#ef4444';
  const label = score >= 75 ? 'Excellent' : score >= 60 ? 'Good' : score >= 45 ? 'Average' : 'Weak';

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#1f2937" strokeWidth="10" />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={color} strokeWidth="10"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-white">{score}</span>
          <span className="text-xs text-gray-500">/100</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-semibold" style={{ color }}>{label}</span>
    </div>
  );
}

// ─── Score Bar ────────────────────────────────────────────────────────────────

function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = value >= 70 ? 'bg-green-500' : value >= 50 ? 'bg-amber-400' : 'bg-red-500';
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{label}</span>
        <span className="font-semibold text-white">{value}</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

// ─── Verdict Badge ────────────────────────────────────────────────────────────

function VerdictBadge({ verdict }: { verdict: AIAnalysis['analystVerdict'] }) {
  const config = {
    STRONG_BUY: { label: 'Strong Buy', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' },
    BUY: { label: 'Buy', color: 'text-green-400 bg-green-400/10 border-green-400/30' },
    HOLD: { label: 'Hold', color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' },
    WATCH: { label: 'Watch', color: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
    SELL: { label: 'Sell', color: 'text-orange-400 bg-orange-400/10 border-orange-400/30' },
    STRONG_SELL: { label: 'Strong Sell', color: 'text-red-400 bg-red-400/10 border-red-400/30' },
  };
  const { label, color } = config[verdict];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-bold ${color}`}>
      <Activity size={12} />
      {label}
    </span>
  );
}

// ─── Pro Paywall CTA ──────────────────────────────────────────────────────────

function ProPaywall({ feature, plan = 'PRO' }: { feature: string; plan?: 'PRO' | 'ELITE' }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-900/10" />
      <div className="relative z-10">
        <Lock size={32} className="text-amber-400 mx-auto mb-4" />
        <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">{plan} Feature</p>
        <h3 className="text-xl font-bold text-white mb-2">Unlock {feature}</h3>
        <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
          {plan === 'ELITE'
            ? 'Upgrade to ELITE for DCF models, sensitivity tables, and full portfolio tracking.'
            : 'Upgrade to PRO for AI analysis, peer comparisons, 3-year financials, and more.'}
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href={`/checkout/${plan.toLowerCase()}`}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl transition-colors"
          >
            Upgrade to {plan} — {plan === 'PRO' ? '₹999' : '₹1,999'}/mo
          </Link>
          <Link href="/pricing" className="px-5 py-2.5 border border-white/20 text-gray-300 text-sm rounded-xl hover:bg-white/5 transition-colors">
            Compare plans
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── DCF Sensitivity Table ────────────────────────────────────────────────────

function SensitivityTable({ dcf }: { dcf: DCFData }) {
  const baseWacc = dcf.wacc;
  const baseGrowth = dcf.terminalGrowthRate;

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-white/5">
            <th className="p-3 text-left text-gray-500 font-medium">WACC ↓ / Growth →</th>
            {dcf.sensitivityTable.growthRange.map((g) => (
              <th key={g} className={`p-3 text-center font-semibold ${g === baseGrowth ? 'text-cinema-cyan' : 'text-gray-400'}`}>
                {g}%
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dcf.sensitivityTable.waccRange.map((w, wi) => (
            <tr key={w} className="border-t border-white/5">
              <td className={`p-3 font-semibold ${w === baseWacc ? 'text-cinema-cyan' : 'text-gray-400'}`}>{w}%</td>
              {dcf.sensitivityTable.values[wi]?.map((val, gi) => {
                const isBase = w === baseWacc && dcf.sensitivityTable.growthRange[gi] === baseGrowth;
                return (
                  <td key={gi} className={`p-3 text-center ${isBase ? 'bg-cinema-cyan/10 text-cinema-cyan font-bold rounded' : 'text-gray-300'}`}>
                    ₹{(val / 100).toFixed(0)}Cr
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="p-3 text-xs text-gray-600">Enterprise Value in Crores INR. Base case highlighted in blue.</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CompanyIntelligenceClient({ report }: { report: CompanyIntelligenceReport }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'ai' | 'dcf'>('overview');
  const { profile, latestFinancials: fin, valuation, healthScore, aiAnalysis, dcfData, userPlan } = report;

  const isPro = userPlan === 'PRO' || userPlan === 'ELITE' || userPlan === 'ENTERPRISE';
  const isElite = userPlan === 'ELITE' || userPlan === 'ENTERPRISE';

  const formatCr = (n: number | null) => n ? `₹${n.toLocaleString('en-IN')} Cr` : '—';
  const formatPct = (n: number | null) => n ? `${n.toFixed(1)}%` : '—';
  const formatX = (n: number | null) => n ? `${n.toFixed(1)}x` : '—';

  return (
    <div className="min-h-screen bg-cinema-ink">
      {/* Header */}
      <div className="border-b border-white/10 bg-cinema-black/60 backdrop-blur-sm sticky top-16 z-30">
        <div className="wrap py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Company Identity */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-lg font-black text-white shrink-0">
                {profile.symbol.slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-black text-white">{profile.name}</h1>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-cinema-cyan">{profile.symbol}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">{profile.exchange}</span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{profile.sector} · {profile.industry}</p>
              </div>
            </div>

            {/* Price + Change */}
            <div className="text-right">
              {profile.currentPrice ? (
                <>
                  <div className="text-3xl font-black text-white">₹{profile.currentPrice.toLocaleString('en-IN')}</div>
                  {profile.priceChange !== null && (
                    <div className={`text-sm font-semibold ${profile.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {profile.priceChange >= 0 ? '▲' : '▼'} {Math.abs(profile.priceChange).toFixed(2)}%
                    </div>
                  )}
                </>
              ) : (
                <div className="text-gray-500 text-sm">Price data unavailable</div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'financials', label: 'Financials' },
              { id: 'ai', label: '🤖 AI Analysis', locked: !isPro },
              { id: 'dcf', label: '📐 DCF Model', locked: !isElite },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-all flex items-center gap-1.5
                  ${activeTab === tab.id ? 'bg-cinema-cyan/20 text-cinema-cyan' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}
                  ${tab.locked ? 'opacity-60' : ''}`}
              >
                {tab.label}
                {tab.locked && <Lock size={11} className="text-amber-400" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="wrap py-8">

        {/* ── OVERVIEW TAB ─────────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left: Health + Badges */}
            <div className="space-y-6">
              {/* Health Score Card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Financial Health</h2>
                <div className="flex flex-col items-center mb-6">
                  <HealthRing score={healthScore.overall} />
                </div>
                <div className="space-y-3">
                  <ScoreBar label="Profitability" value={healthScore.profitability} />
                  <ScoreBar label="Leverage" value={healthScore.leverage} />
                  <ScoreBar label="Growth" value={healthScore.growth} />
                  <ScoreBar label="Efficiency" value={healthScore.efficiency} />
                  <ScoreBar label="Valuation" value={healthScore.valuation} />
                </div>
              </div>

              {/* Badges */}
              {healthScore.badges.length > 0 && (
                <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-sm font-semibold text-green-400">Strengths</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {healthScore.badges.map((b) => (
                      <span key={b} className="text-xs px-2.5 py-1 bg-green-500/10 border border-green-500/20 text-green-300 rounded-full">{b}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Red Flags */}
              {healthScore.redFlags.length > 0 && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={16} className="text-red-400" />
                    <span className="text-sm font-semibold text-red-400">Watch Items</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {healthScore.redFlags.map((r) => (
                      <span key={r} className="text-xs px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full">{r}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Key Metrics */}
            <div className="lg:col-span-2 space-y-6">
              {/* Valuation */}
              <div>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Valuation</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <StatCard label="Market Cap" value={valuation.marketCap ? `₹${(valuation.marketCap / 100).toFixed(0)}K Cr` : null} highlight />
                  <StatCard label="P/E Ratio" value={formatX(valuation.peRatio)} />
                  <StatCard label="P/B Ratio" value={formatX(valuation.pbRatio)} />
                  <StatCard label="EV/EBITDA" value={formatX(valuation.evEbitda)} />
                  <StatCard label="Div. Yield" value={formatPct(valuation.dividendYield)} />
                  <StatCard label="EPS" value={valuation.eps ? `₹${valuation.eps.toFixed(1)}` : null} />
                </div>
              </div>

              {/* Price Info */}
              {(profile.week52High || profile.week52Low) && (
                <div>
                  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Price Range</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <StatCard label="52W High" value={profile.week52High ? `₹${profile.week52High.toLocaleString('en-IN')}` : null} trend="up" />
                    <StatCard label="52W Low" value={profile.week52Low ? `₹${profile.week52Low.toLocaleString('en-IN')}` : null} trend="down" />
                  </div>
                </div>
              )}

              {/* Key Financials (latest year) */}
              {fin && (
                <div>
                  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Financials ({fin.year})</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <StatCard label="Revenue" value={formatCr(fin.revenue)} highlight />
                    <StatCard label="PAT" value={formatCr(fin.pat)} trend={fin.pat && fin.pat > 0 ? 'up' : 'down'} />
                    <StatCard label="EBITDA" value={formatCr(fin.ebitda)} />
                    <StatCard label="Net Margin" value={formatPct(fin.netMargin)} />
                    <StatCard label="ROE" value={formatPct(fin.roe)} />
                    <StatCard label="D/E Ratio" value={formatX(fin.debtToEquity)} />
                  </div>
                </div>
              )}

              {/* Promoter Holding */}
              {profile.promoterHolding !== null && (
                <div>
                  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Shareholding Pattern</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <StatCard label="Promoter" value={formatPct(profile.promoterHolding)} />
                    <StatCard label="FII" value={formatPct(profile.fiiHolding)} />
                    <StatCard label="DII" value={formatPct(profile.diiHolding)} />
                    <StatCard label="Public" value={formatPct(profile.publicHolding)} />
                  </div>
                </div>
              )}

              {/* Upgrade CTA if not PRO */}
              {!isPro && (
                <div className="rounded-2xl border border-cinema-cyan/20 bg-cinema-cyan/5 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap size={16} className="text-cinema-cyan" />
                      <span className="text-sm font-bold text-cinema-cyan">Upgrade to PRO</span>
                    </div>
                    <p className="text-xs text-gray-400">Get AI investment thesis, 3-year trend analysis, peer comparisons, and full financial breakdowns.</p>
                  </div>
                  <Link
                    href="/checkout/pro"
                    className="shrink-0 px-4 py-2.5 bg-cinema-cyan text-black text-sm font-bold rounded-xl hover:bg-cinema-cyan/90 transition-colors whitespace-nowrap"
                  >
                    Upgrade — ₹999/mo
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── FINANCIALS TAB ───────────────────────────────────────────────── */}
        {activeTab === 'financials' && (
          <div className="space-y-6">
            {isPro ? (
              <>
                <h2 className="text-lg font-bold text-white">3-Year Financial Summary</h2>
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-white/5 text-xs text-gray-500 uppercase tracking-wider">
                        <th className="p-4 text-left">Metric</th>
                        {report.financials.map((f) => (
                          <th key={f.year} className="p-4 text-right">{f.year}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { label: 'Revenue (₹ Cr)', key: 'revenue' as const },
                        { label: 'PAT (₹ Cr)', key: 'pat' as const },
                        { label: 'EBITDA (₹ Cr)', key: 'ebitda' as const },
                        { label: 'Net Margin (%)', key: 'netMargin' as const },
                        { label: 'EBITDA Margin (%)', key: 'ebitdaMargin' as const },
                        { label: 'ROE (%)', key: 'roe' as const },
                        { label: 'ROA (%)', key: 'roa' as const },
                        { label: 'Debt/Equity (x)', key: 'debtToEquity' as const },
                        { label: 'Revenue Growth (%)', key: 'revenueGrowthYoy' as const },
                      ].map(({ label, key }) => (
                        <tr key={key} className="hover:bg-white/3 transition-colors">
                          <td className="p-4 text-gray-300 font-medium">{label}</td>
                          {report.financials.map((f) => (
                            <td key={f.year} className="p-4 text-right text-white">
                              {f[key] !== null ? Number(f[key]).toFixed(1) : '—'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Peer Comparison */}
                {report.peers.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold text-white mb-4">Peer Comparison</h2>
                    <div className="overflow-x-auto rounded-2xl border border-white/10">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-white/5 text-xs text-gray-500 uppercase tracking-wider">
                            <th className="p-4 text-left">Company</th>
                            <th className="p-4 text-right">Market Cap</th>
                            <th className="p-4 text-right">P/E</th>
                            <th className="p-4 text-right">Rev Growth</th>
                            <th className="p-4 text-right">Net Margin</th>
                            <th className="p-4 text-right">ROE</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {report.peers.map((peer) => (
                            <tr key={peer.symbol} className="hover:bg-white/3">
                              <td className="p-4">
                                <Link href={`/company/${peer.symbol}`} className="text-cinema-cyan hover:underline font-semibold">
                                  {peer.symbol}
                                </Link>
                                <span className="text-gray-500 text-xs ml-2">{peer.name}</span>
                              </td>
                              <td className="p-4 text-right text-white">{peer.marketCap ? `₹${(peer.marketCap/100).toFixed(0)}K Cr` : '—'}</td>
                              <td className="p-4 text-right text-white">{peer.peRatio ? `${peer.peRatio.toFixed(1)}x` : '—'}</td>
                              <td className="p-4 text-right text-white">{peer.revenueGrowth ? `${peer.revenueGrowth.toFixed(1)}%` : '—'}</td>
                              <td className="p-4 text-right text-white">{peer.netMargin ? `${peer.netMargin.toFixed(1)}%` : '—'}</td>
                              <td className="p-4 text-right text-white">{peer.roe ? `${peer.roe.toFixed(1)}%` : '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <ProPaywall feature="Full 3-Year Financials & Peer Comparison" plan="PRO" />
            )}
          </div>
        )}

        {/* ── AI ANALYSIS TAB ──────────────────────────────────────────────── */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            {isPro && aiAnalysis ? (
              <>
                {/* Verdict */}
                <div className="flex items-center gap-4">
                  <VerdictBadge verdict={aiAnalysis.analystVerdict} />
                  <span className="text-xs text-gray-500">
                    AI analysis · Generated {new Date(aiAnalysis.generatedAt).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Summary */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Summary</h3>
                  <p className="text-gray-200 leading-relaxed">{aiAnalysis.summary}</p>
                </div>

                {/* Bull & Bear */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={16} className="text-green-400" />
                      <span className="text-sm font-bold text-green-400">Bull Case</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{aiAnalysis.bullCase}</p>
                  </div>
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingDown size={16} className="text-red-400" />
                      <span className="text-sm font-bold text-red-400">Bear Case</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{aiAnalysis.bearCase}</p>
                  </div>
                </div>

                {/* Investment Thesis */}
                <div className="rounded-2xl border border-cinema-cyan/20 bg-cinema-cyan/5 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target size={16} className="text-cinema-cyan" />
                    <span className="text-sm font-bold text-cinema-cyan">Investment Thesis</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed">{aiAnalysis.investmentThesis}</p>
                </div>

                {/* Risks & Opportunities */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h3 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                      <Shield size={14} /> Key Risks
                    </h3>
                    <ul className="space-y-2">
                      {aiAnalysis.keyRisks.map((r) => (
                        <li key={r} className="text-sm text-gray-300 flex gap-2">
                          <span className="text-red-400 mt-0.5 shrink-0">•</span>{r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h3 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                      <TrendingUp size={14} /> Opportunities
                    </h3>
                    <ul className="space-y-2">
                      {aiAnalysis.keyOpportunities.map((o) => (
                        <li key={o} className="text-sm text-gray-300 flex gap-2">
                          <span className="text-green-400 mt-0.5 shrink-0">•</span>{o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="text-xs text-gray-600 text-center">
                  ⚠️ AI analysis is generated from public financial data and is for educational purposes only. Not investment advice.
                </p>
              </>
            ) : (
              <ProPaywall feature="AI Investment Analysis" plan="PRO" />
            )}
          </div>
        )}

        {/* ── DCF MODEL TAB ────────────────────────────────────────────────── */}
        {activeTab === 'dcf' && (
          <div className="space-y-6">
            {isElite && dcfData ? (
              <>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-white">Auto DCF Model</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300">ELITE</span>
                </div>

                {/* DCF Assumptions */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">Revenue Growth Assumptions (5Y)</h3>
                    <div className="space-y-2">
                      {dcfData.revenueGrowthAssumptions.map((g, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-8">Y{i + 1}</span>
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full">
                            <div className="h-full bg-cinema-cyan rounded-full" style={{ width: `${Math.min(g * 2, 100)}%` }} />
                          </div>
                          <span className="text-sm text-white font-mono w-12 text-right">{g.toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">Key Parameters</h3>
                    <div className="space-y-2">
                      {[
                        { label: 'WACC (India-adjusted)', value: `${dcfData.wacc}%` },
                        { label: 'Terminal Growth Rate', value: `${dcfData.terminalGrowthRate}%` },
                        { label: 'Risk-Free Rate (10Y G-Sec)', value: '7.0%' },
                        { label: 'Equity Risk Premium', value: '5.5%' },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between text-sm">
                          <span className="text-gray-400">{label}</span>
                          <span className="text-white font-mono">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Intrinsic Value */}
                {dcfData.intrinsicValue !== null && (
                  <div className="rounded-2xl border border-cinema-cyan/30 bg-cinema-cyan/5 p-6 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">AI-Estimated Intrinsic Value</p>
                    <p className="text-4xl font-black text-cinema-cyan">₹{dcfData.intrinsicValue.toFixed(0)}</p>
                    {dcfData.marginOfSafety !== null && (
                      <p className="text-sm text-gray-400 mt-1">
                        Margin of Safety: <span className={dcfData.marginOfSafety > 0 ? 'text-green-400' : 'text-red-400'}>
                          {dcfData.marginOfSafety > 0 ? '+' : ''}{dcfData.marginOfSafety}%
                        </span>
                      </p>
                    )}
                  </div>
                )}

                {/* Sensitivity Table */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">
                    Enterprise Value Sensitivity (WACC × Terminal Growth)
                  </h3>
                  <SensitivityTable dcf={dcfData} />
                </div>

                <p className="text-xs text-gray-600 text-center">
                  ⚠️ DCF models are based on AI-generated assumptions from public data. Not investment advice. Always cross-check with a financial advisor.
                </p>
              </>
            ) : (
              <ProPaywall feature="Auto DCF Model + Sensitivity Analysis" plan="ELITE" />
            )}
          </div>
        )}
      </div>

      {/* Back to search */}
      <div className="wrap py-8 border-t border-white/10">
        <Link href="/company" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cinema-cyan transition-colors">
          ← Back to Company Search
        </Link>
      </div>
    </div>
  );
}
