import type { Metadata } from 'next';
import Link from 'next/link';
import {
    buildCalibration,
    sectorBreakdown,
    toJsonLdDataset,
    type LedgerPrediction,
} from '@/lib/calibration';
import { getPublicPredictionLedger } from '@/lib/predictions';
import JsonLd from '@/components/seo/JsonLd';
import LedgerFilters from './LedgerFilters';
import { filterLedger, parseLedgerFilters } from './ledger-utils';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import { logger } from '@/lib/logger';
import { captureError } from '@/lib/observability';

export const metadata: Metadata = {
    title: 'Public Prediction Ledger | Kunwar Analytics',
    description:
        'A timestamped, verifiable public track record of financial forecasts made by Kunwar Analytics analysts. Weighted accuracy, hit rate, and win streaks published openly.',
    alternates: { canonical: '/predictions/ledger' },
};

// The ledger is a living trust asset — always read the latest resolutions.
export const revalidate = 300;

interface PredictionLedgerErrorProps {
  error: Error;
  message?: string;
}

function PredictionLedgerError({ error, message }: PredictionLedgerErrorProps) {
  captureError(error, {
    source: 'predictions.ledger.page',
    level: 'error',
  });

  return (
    <div className="min-h-screen bg-surface-muted text-slate-200">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Dataset', name: 'Kunwar Analytics Public Prediction Ledger' }} />

      <header className="relative overflow-hidden border-b border-white/5 bg-surface-raised py-14">
        <div className="relative z-10 mx-auto max-w-[1400px] px-6">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
            <Link href="/predictions" className="hover:text-brand-hover">
              Predictions
            </Link>
            <span aria-hidden>/</span>
            <span className="text-slate-200">Ledger</span>
          </nav>
          <div className="text-center mb-10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
              Intelligence Tracking
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-3">
              📋 Public Prediction Ledger
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every prediction tracked. Every outcome published. Full accountability.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-400">
          <h2 className="text-lg font-semibold text-slate-200 mb-2">
            Ledger temporarily unavailable
          </h2>
          <p className="text-sm mb-4">{message ?? 'We could not load the prediction ledger right now.'}</p>
          <p className="text-xs text-slate-500 mb-6">
            If you are an administrator, please check the system logs for details.
          </p>
          <a
            href="/predictions/ledger"
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-navy px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-hover transition-all"
          >
            <span>Refresh</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>

      <PromotionSlot slot="CONTENT_BOTTOM" path="/predictions/ledger" />
      <PromotionSlot slot="FOOTER" path="/predictions/ledger" />
    </div>
  );
}

const STATUS_STYLES: Record<string, { label: string; className: string; dot: string }> = {
    CONFIRMED: { label: 'Confirmed', className: 'text-green-400 border-green-500/20 bg-green-500/10', dot: '🟢' },
    INCORRECT: { label: 'Incorrect', className: 'text-red-400 border-red-500/20 bg-red-500/10', dot: '🔴' },
    PARTIAL: { label: 'Partial', className: 'text-amber-400 border-amber-500/20 bg-amber-500/10', dot: '🟡' },
    PENDING: { label: 'Pending', className: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/10', dot: '⏳' },
};

function formatDate(value: Date | string | null | undefined): string {
    if (!value) return '—';
    const d = new Date(value);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

interface PageProps {
    searchParams: Promise<{ sector?: string; status?: string; window?: string }>;
}

export default async function PredictionLedgerPage({ searchParams }: PageProps) {
    const resolved = await searchParams;
    const filters = parseLedgerFilters(resolved);

    let all: LedgerPrediction[] = [];
    try {
        all = (await getPublicPredictionLedger()) as LedgerPrediction[];
    } catch (error) {
        logger.error('Prediction ledger: failed to load predictions', {
            error: error instanceof Error ? error.message : String(error),
        });
        return (
            <PredictionLedgerError
                error={error instanceof Error ? error : new Error(String(error))}
                message="Unable to load the prediction ledger from the database. Please try again shortly."
            />
        );
    }

    const stats = buildCalibration(all);
    const sectors = [...new Set(all.map((prediction) => prediction.sector || 'General'))].filter(Boolean).sort();
    const rows = filterLedger(all, filters).sort((a, b) => {
        const da = a.resolveDate ? new Date(a.resolveDate).getTime() : 0;
        const db = b.resolveDate ? new Date(b.resolveDate).getTime() : 0;
        return (isNaN(db) ? 0 : db) - (isNaN(da) ? 0 : da);
    });
    const breakdown = sectorBreakdown(all);
    const jsonLd = toJsonLdDataset(all, stats);

    const headline = [
        { label: 'Weighted Accuracy', value: `${stats.weightedAccuracy}%`, sub: `${stats.resolved} resolved` },
        { label: 'Hit Rate', value: stats.hitRate === null ? '—' : `${stats.hitRate}%`, sub: `${stats.confirmed}/${stats.resolved} confirmed` },
        { label: 'Longest Streak', value: `${stats.longestStreak}`, sub: `current ${stats.currentStreak}` },
        { label: 'Open Predictions', value: `${stats.pending}`, sub: `${stats.overdue} overdue` },
    ];

    return (
        <div className="min-h-screen bg-surface-muted text-slate-200">
            <JsonLd data={jsonLd} />

            <header className="relative overflow-hidden border-b border-white/5 bg-surface-raised py-14">
                <div className="relative z-10 mx-auto max-w-[1400px] px-6">
                    <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
                        <Link href="/predictions" className="hover:text-brand-hover">
                            Predictions
                        </Link>
                        <span aria-hidden>/</span>
                        <span className="text-slate-200">Ledger</span>
                    </nav>

                    <span className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-teal-400">
                        Public Track Record
                    </span>
                    <h1 className="mb-3 mt-4 text-4xl font-extrabold text-white md:text-5xl">
                        📒 Prediction Ledger
                    </h1>
                    <p className="max-w-3xl text-lg text-slate-400">
                        Every call is timestamped and resolved in public. Weighted accuracy gives partial credit for
                        partial outcomes; hit rate is the share marked confirmed. No Brier score is published because
                        forecast probabilities are not stored. As of {formatDate(stats.asOf)}.
                    </p>

                    <div className="mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
                        {headline.map((metric) => (
                            <div
                                key={metric.label}
                                className="rounded-2xl border border-white/5 bg-white/5 p-5 text-center backdrop-blur-sm"
                            >
                                <div className="text-2xl font-extrabold text-white">{metric.value}</div>
                                <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-teal-400">
                                    {metric.label}
                                </div>
                                <div className="mt-1 text-xs text-slate-500">{metric.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-[1400px] px-6 py-12">
                <LedgerFilters filters={filters} sectors={sectors} rows={rows} />

                {/* Per-sector calibration */}
                <section className="mt-10">
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                        Calibration by sector
                    </h2>
                    {breakdown.length === 0 ? (
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-slate-400 text-sm">
                            No sector records found in the ledger yet.
                        </div>
                    ) : (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {breakdown.map((row) => (
                                <div
                                    key={row.sector}
                                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-white">{row.sector}</span>
                                        <span className="text-xs text-slate-400">{row.total} calls</span>
                                    </div>
                                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400"
                                            style={{ width: `${row.weightedAccuracy ?? 0}%` }}
                                        />
                                    </div>
                                    <div className="mt-2 text-xs text-slate-400">
                                        {row.weightedAccuracy === null
                                            ? 'Not yet resolved'
                                            : `${row.weightedAccuracy}% weighted accuracy · ${row.resolved} resolved`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Resolution history */}
                <section className="mt-12">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                            Resolution history
                        </h2>
                        <span className="text-xs text-slate-500">
                            {rows.length} of {all.length} predictions
                        </span>
                    </div>

                    {rows.length === 0 ? (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
                            {all.length === 0 ? 'No predictions recorded in the ledger yet.' : 'No predictions match the current filters.'}
                        </div>
                    ) : (
                        <div className="horizontal-scroll-region rounded-2xl border border-white/10" role="region" aria-label="Prediction resolution history table" tabIndex={0} data-lenis-prevent>
                            <table className="w-full min-w-[640px] text-left text-sm">
                                <thead className="bg-white/5 text-[11px] uppercase tracking-widest text-slate-400">
                                    <tr>
                                        <th className="px-4 py-3">Claim</th>
                                        <th className="px-4 py-3">Sector</th>
                                        <th className="px-4 py-3">Resolve by</th>
                                        <th className="px-4 py-3">Verdict</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((prediction) => {
                                        const style = STATUS_STYLES[prediction.status] ?? STATUS_STYLES.PENDING;
                                        return (
                                            <tr
                                                key={prediction.slug}
                                                id={prediction.slug}
                                                className="border-t border-white/5 align-top"
                                            >
                                                <td className="px-4 py-4">
                                                    <Link
                                                        href={`/predictions/${prediction.slug}`}
                                                        className="font-medium text-slate-100 hover:text-brand-hover"
                                                    >
                                                        {prediction.claim}
                                                    </Link>
                                                    {prediction.resolutionNote && (
                                                        <p className="mt-1 text-xs text-slate-500">
                                                            {prediction.resolutionNote}
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-slate-400">
                                                    {prediction.sector}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-slate-400">
                                                    {formatDate(prediction.resolveDate)}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${style.className}`}
                                                    >
                                                        <span aria-hidden>{style.dot}</span>
                                                        {style.label}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                <p className="mt-10 text-xs text-slate-500">
                    Method: weighted accuracy = mean(outcome) × 100, where CONFIRMED → 1, PARTIAL → 0.5,
                    INCORRECT → 0 and PENDING is unscored. Hit rate = CONFIRMED ÷ resolved × 100, so partial
                    outcomes remain in the denominator. Streaks count consecutive confirmed outcomes by resolve date.
                    Forecast probabilities are not stored, so no Brier score is calculated. This dataset is available
                    to machines at <span className="font-mono text-slate-400">/predictions/ledger</span> via schema.org JSON-LD.
                </p>
            </main>
            <PromotionSlot slot="CONTENT_BOTTOM" path="/predictions/ledger" />
            <PromotionSlot slot="FOOTER" path="/predictions/ledger" />
        </div>
    );
}
