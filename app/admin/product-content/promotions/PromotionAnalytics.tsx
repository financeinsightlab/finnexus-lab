'use client';

import { useMemo, useState } from 'react';
import { PAGE_TYPE_META, SLOT_META, isPageType, isPromotionSlot } from '@/lib/promotions/catalog';
import { EmptyState, inputClass, smallButtonClass, Spinner } from '../ui';
import type { MetricRow, PromotionReportResponse } from './types';

const RANGES = [7, 30, 90] as const;

function MetricTable({ title, rows, firstColumn, labelFor, limit = 15 }: { title: string; rows: MetricRow[]; firstColumn: string; labelFor?: (row: MetricRow) => string; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? rows : rows.slice(0, limit);
  return (
    <section className="rounded-2xl border border-border bg-card p-4" aria-label={title}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        {rows.length > limit && <button type="button" onClick={() => setExpanded((value) => !value)} className={smallButtonClass}>{expanded ? 'Show less' : `Show all ${rows.length}`}</button>}
      </div>
      {rows.length === 0 ? (
        <p className="mt-3 text-xs text-muted-foreground">No events in this period.</p>
      ) : (
        <table className="mt-3 w-full text-left text-xs">
          <thead className="text-[10px] uppercase tracking-wider text-muted-foreground"><tr><th className="py-1 pr-2 font-semibold">{firstColumn}</th><th className="py-1 pr-2 text-right font-semibold">Impr.</th><th className="py-1 pr-2 text-right font-semibold">Clicks</th><th className="py-1 text-right font-semibold">CTR</th></tr></thead>
          <tbody className="divide-y divide-border">
            {visible.map((row) => (
              <tr key={row.key}>
                <td className="max-w-[260px] truncate py-1.5 pr-2 text-foreground" title={row.label}>{labelFor ? labelFor(row) : row.label}</td>
                <td className="py-1.5 pr-2 text-right font-mono">{row.impressions.toLocaleString()}</td>
                <td className="py-1.5 pr-2 text-right font-mono">{row.clicks.toLocaleString()}</td>
                <td className="py-1.5 text-right font-mono">{row.ctr}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

/**
 * Analytics by promotion, campaign, page, slot, device, page type and day.
 * Conversions are shown as "Not configured" — never inferred or faked.
 */
export default function PromotionAnalytics({ report, loading, days, onDaysChange, onRefresh }: { report: PromotionReportResponse | null; loading: boolean; days: number; onDaysChange: (days: number) => void; onRefresh: () => void }) {
  const [promotionFilter, setPromotionFilter] = useState('');
  const byPromotion = useMemo(() => {
    const needle = promotionFilter.trim().toLowerCase();
    const rows = report?.byPromotion ?? [];
    return needle ? rows.filter((row) => [row.title, row.brandName, row.campaignId ?? ''].some((value) => value.toLowerCase().includes(needle))) : rows;
  }, [report, promotionFilter]);

  const maxDay = Math.max(1, ...(report?.byDay ?? []).map((row) => row.impressions));

  return (
    <div className="space-y-4" data-testid="promotion-analytics">
      <div className="flex flex-wrap items-center gap-2">
        <div role="radiogroup" aria-label="Date range" className="inline-flex rounded-lg border border-border p-0.5 text-xs font-semibold">
          {RANGES.map((value) => <button key={value} type="button" role="radio" aria-checked={days === value} onClick={() => onDaysChange(value)} className={`rounded-md px-3 py-1 ${days === value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>Last {value} days</button>)}
        </div>
        <button type="button" onClick={onRefresh} className={smallButtonClass}>Refresh</button>
        {loading && <Spinner label="Loading analytics…" />}
        {report && <span className="text-xs text-muted-foreground">Since {new Date(report.since).toLocaleDateString()} · server time</span>}
      </div>

      {!report && !loading && <EmptyState>Analytics are unavailable right now.</EmptyState>}

      {report && (
        <>
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-border bg-card p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Impressions</p><p className="mt-1 text-2xl font-extrabold text-foreground">{report.totals.impressions.toLocaleString()}</p></div>
            <div className="rounded-2xl border border-border bg-card p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Clicks</p><p className="mt-1 text-2xl font-extrabold text-foreground">{report.totals.clicks.toLocaleString()}</p></div>
            <div className="rounded-2xl border border-border bg-card p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">CTR</p><p className="mt-1 text-2xl font-extrabold text-foreground">{report.totals.ctr}%</p></div>
            <div className="rounded-2xl border border-dashed border-border bg-card p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Conversions</p><p className="mt-1 text-lg font-bold text-muted-foreground">Not configured</p><p className="text-[11px] text-muted-foreground">Requires a partner postback or pixel; nothing is estimated.</p></div>
          </div>

          {/* Daily bars */}
          <section className="rounded-2xl border border-border bg-card p-4" aria-label="Impressions by day">
            <h3 className="text-sm font-bold text-foreground">By day</h3>
            {report.byDay.length === 0 ? <p className="mt-3 text-xs text-muted-foreground">No events in this period.</p> : (
              <div className="mt-3 flex h-28 items-end gap-1 overflow-x-auto">
                {report.byDay.slice().sort((a, b) => a.key.localeCompare(b.key)).map((row) => (
                  <div key={row.key} className="flex min-w-[14px] flex-1 flex-col items-center justify-end gap-1" title={`${row.label}: ${row.impressions} impressions, ${row.clicks} clicks (${row.ctr}% CTR)`}>
                    <div className="w-full rounded-t bg-primary/70" style={{ height: `${Math.max(2, Math.round((row.impressions / maxDay) * 88))}px` }} />
                    <span className="text-[9px] text-muted-foreground">{row.key.slice(5)}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-border bg-card p-4" aria-label="By promotion">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-foreground">By promotion</h3>
              <input type="search" value={promotionFilter} onChange={(event) => setPromotionFilter(event.target.value)} placeholder="Filter…" className={`${inputClass} mt-0 h-9 min-h-0 max-w-[200px]`} aria-label="Filter promotions" />
            </div>
            {byPromotion.length === 0 ? <p className="mt-3 text-xs text-muted-foreground">No promotions match.</p> : (
              <table className="mt-3 w-full text-left text-xs">
                <thead className="text-[10px] uppercase tracking-wider text-muted-foreground"><tr><th className="py-1 pr-2 font-semibold">Promotion</th><th className="py-1 pr-2 font-semibold">Campaign</th><th className="py-1 pr-2 font-semibold">Status</th><th className="py-1 pr-2 text-right font-semibold">Impr.</th><th className="py-1 pr-2 text-right font-semibold">Clicks</th><th className="py-1 text-right font-semibold">CTR</th></tr></thead>
                <tbody className="divide-y divide-border">
                  {byPromotion.map((row) => (
                    <tr key={row.id}>
                      <td className="max-w-[260px] py-1.5 pr-2"><span className="block truncate font-semibold text-foreground" title={row.title}>{row.title}</span><span className="block truncate text-muted-foreground">{row.brandName}</span></td>
                      <td className="py-1.5 pr-2 text-muted-foreground">{row.campaignId ?? '—'}</td>
                      <td className="py-1.5 pr-2">{row.active ? 'Active' : 'Inactive'}</td>
                      <td className="py-1.5 pr-2 text-right font-mono">{row.impressions.toLocaleString()}</td>
                      <td className="py-1.5 pr-2 text-right font-mono">{row.clicks.toLocaleString()}</td>
                      <td className="py-1.5 text-right font-mono">{row.ctr}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <div className="grid gap-4 xl:grid-cols-2">
            <MetricTable title="By campaign" rows={report.byCampaign} firstColumn="Campaign" />
            <MetricTable title="By slot" rows={report.bySlot} firstColumn="Slot" labelFor={(row) => (isPromotionSlot(row.key) ? `${SLOT_META[row.key].label} (${row.key})` : row.label)} />
            <MetricTable title="By page" rows={report.byPage} firstColumn="Page" />
            <MetricTable title="By page type" rows={report.byPageType} firstColumn="Page type" labelFor={(row) => (isPageType(row.key) ? PAGE_TYPE_META[row.key].label : row.label)} />
            <MetricTable title="By device" rows={report.byDevice} firstColumn="Device" />
          </div>
          <p className="text-[11px] text-muted-foreground">{report.note}</p>
        </>
      )}
    </div>
  );
}
