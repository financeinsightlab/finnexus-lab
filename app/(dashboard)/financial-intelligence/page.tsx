import type { Metadata } from 'next';
import Link from 'next/link';
import { getLatestMetrics, getFreshnessSummary, type MetricRecord } from '@/lib/financial-data';
import { getHeatMapData, getTrackerBySlug } from '@/lib/trackerData';
import { logger } from '@/lib/logger';
import { captureError } from '@/lib/observability';
import JsonLd from '@/components/seo/JsonLd';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import FinancialIntelligenceClient from './FinancialIntelligenceClient';

export const metadata: Metadata = {
  title: 'Financial Intelligence Dashboard | Kunwar Analytics',
  description:
    'Institutional-grade financial intelligence terminal featuring Indian macroeconomic indicators, RBI monetary policy rates, sovereign yields, ECB reference FX, commodity benchmarks, and sector intelligence.',
  alternates: { canonical: 'https://kunwaranalytics.in/financial-intelligence' },
};

export const dynamic = 'force-dynamic';

interface DashboardErrorProps {
  error: Error;
  message?: string;
}

function DashboardError({ error, message }: DashboardErrorProps) {
  captureError(error, {
    source: 'financial-intelligence.page',
    level: 'error',
  });

  return (
    <div className="min-h-screen bg-[#0B0D13] text-content-primary py-20 px-6">
      <div className="max-w-xl mx-auto rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <span className="text-4xl block mb-3">📡</span>
        <h2 className="text-lg font-bold text-white mb-2">
          Financial Intelligence Terminal Temporarily Unavailable
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          {message ?? 'We could not connect to the financial data pipeline. Please try refreshing.'}
        </p>
        <a
          href="/financial-intelligence"
          className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-teal-500 transition-all"
        >
          <span>Refresh Terminal</span>
          <span>&rarr;</span>
        </a>
      </div>
    </div>
  );
}

export default async function FinancialIntelligenceDashboard() {
  let metrics: MetricRecord[] = [];
  let freshness: Awaited<ReturnType<typeof getFreshnessSummary>>;

  try {
    [metrics, freshness] = await Promise.all([
      getLatestMetrics({ limit: 100 }),
      getFreshnessSummary(),
    ]);
  } catch (error) {
    logger.error('Financial Intelligence Dashboard: failed to load data', {
      error: error instanceof Error ? error.message : String(error),
    });
    return (
      <DashboardError
        error={error instanceof Error ? error : new Error(String(error))}
        message="Unable to load financial indicators from the database. Please try again shortly."
      />
    );
  }

  // Load sector data from verified tracker data
  const heatMap = getHeatMapData();
  const sectorSummaries = heatMap.map((h) => {
    const detail = getTrackerBySlug(h.slug);
    const q1 = detail?.quarters ? (detail.quarters['Q1-2026'] || Object.values(detail.quarters)[0]) : null;
    return {
      slug: h.slug,
      name: h.name,
      shortName: detail?.shortName || h.name,
      icon: h.icon || detail?.icon || '📊',
      temperature: h.temperature,
      tempLabel: h.temperature >= 75 ? 'Hot' : h.temperature >= 50 ? 'Warm' : 'Cool',
      consensus: q1?.consensus || 'Stable',
      headline: q1?.headline || detail?.tagline || 'Sector performance overview',
      keyMetrics: q1?.keyMetrics || [],
    };
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Kunwar Analytics Financial Intelligence Dashboard',
    description:
      'Institutional financial intelligence terminal with Indian macroeconomic indicators, RBI monetary policy benchmark rates, sovereign yields, ECB reference FX, and sector operational snapshots.',
    url: 'https://kunwaranalytics.in/financial-intelligence',
    provider: {
      '@type': 'Organization',
      name: 'Kunwar Analytics',
      url: 'https://kunwaranalytics.in',
    },
    dataset: metrics.map((m) => ({
      '@type': 'PropertyValue',
      name: m.label,
      value: m.value,
      unitText: m.unit,
      dateModified: m.observedAt,
    })),
  };

  return (
    <div className="min-h-screen bg-[#0B0D13] text-content-primary">
      <JsonLd data={jsonLd} />

      {/* Top Banner */}
      <PromotionSlot slot="CONTENT_TOP" path="/financial-intelligence" />

      {/* Institutional Terminal Header */}
      <header className="border-b border-white/10 bg-[#0E121D] py-8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400 font-mono text-xs font-bold border border-teal-500/30">
                  KA
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-teal-400">
                  Kunwar Intelligence Terminal &middot; Institutional Intelligence
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Financial Intelligence Platform
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Verified Indian macro indicators, RBI monetary policy benchmarks, sovereign yields, ECB foreign exchange rates, and sector performance matrix.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/predictions"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <span>⚖️ Predictions Board</span>
              </Link>
              <Link
                href="/data-freshness"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-teal-400 bg-teal-500/10 border border-teal-500/30 hover:bg-teal-500/20 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Data Freshness SLA</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Terminal Client */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <FinancialIntelligenceClient
          metrics={metrics}
          freshnessSummary={{
            total: freshness.total,
            fresh: freshness.fresh,
            aging: freshness.aging,
            stale: freshness.stale,
            lastSuccessfulIngestion: freshness.lastSuccessfulIngestion ? freshness.lastSuccessfulIngestion.toISOString() : null,
            latestObservation: freshness.latestObservation ? freshness.latestObservation.toISOString() : null,
          }}
          sectors={sectorSummaries}
        />
      </main>

      <PromotionSlot slot="CONTENT_BOTTOM" path="/financial-intelligence" />
      <PromotionSlot slot="FOOTER" path="/financial-intelligence" />
    </div>
  );
}
