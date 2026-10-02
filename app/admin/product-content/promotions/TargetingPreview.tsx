'use client';

import { useEffect, useRef, useState } from 'react';
import { PAGE_TYPE_META, SLOT_META, isPageType, isPromotionSlot } from '@/lib/promotions/catalog';
import { api, Chip, Spinner } from '../ui';
import type { PlacementRuleDraft, TargetRuleDraft, TargetingPreviewResponse } from './types';

/**
 * "Will appear on / will NOT appear on" — evaluates the draft rules against the
 * registry of real pages through the same matcher the engine uses.
 */
export default function TargetingPreview({ targets, placements }: { targets: TargetRuleDraft[]; placements: PlacementRuleDraft[] }) {
  const [data, setData] = useState<TargetingPreviewResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<'matched' | 'unmatched'>('matched');
  const requestId = useRef(0);
  const signature = JSON.stringify({ targets, placements });

  useEffect(() => {
    const id = ++requestId.current;
    const handle = window.setTimeout(() => {
      setLoading(true);
      api<TargetingPreviewResponse>('/api/admin/content/promotions/preview', { method: 'POST', body: signature })
        .then((response) => {
          if (id !== requestId.current) return;
          setData(response);
          setError(null);
        })
        .catch((err: unknown) => {
          if (id === requestId.current) setError(err instanceof Error ? err.message : 'Preview unavailable');
        })
        .finally(() => {
          if (id === requestId.current) setLoading(false);
        });
    }, 350);
    return () => window.clearTimeout(handle);
  }, [signature]);

  const typeLabel = (key: string) => (isPageType(key) ? PAGE_TYPE_META[key].label : key);

  return (
    <div className="rounded-xl border border-border bg-background p-3" data-testid="targeting-preview">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Targeting preview</p>
        {loading ? <Spinner label="Evaluating…" /> : data ? <p className="text-xs text-muted-foreground">Appears on <span className="font-bold text-foreground">{data.matchedTotal.toLocaleString()}</span> of {data.totalPages.toLocaleString()} known pages</p> : null}
      </div>
      {error && <p className="mt-2 text-xs text-destructive" role="alert">{error}</p>}
      {data?.warnings.length ? (
        <ul className="mt-2 space-y-1">
          {data.warnings.map((warning) => <li key={warning} className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 text-xs text-amber-800 dark:text-amber-200">⚠ {warning}</li>)}
        </ul>
      ) : null}
      {data && (
        <>
          <div role="tablist" className="mt-3 inline-flex rounded-lg border border-border p-0.5 text-xs font-semibold">
            <button type="button" role="tab" aria-selected={tab === 'matched'} onClick={() => setTab('matched')} className={`rounded-md px-3 py-1 ${tab === 'matched' ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'text-muted-foreground'}`}>Will appear on ({data.matchedTotal})</button>
            <button type="button" role="tab" aria-selected={tab === 'unmatched'} onClick={() => setTab('unmatched')} className={`rounded-md px-3 py-1 ${tab === 'unmatched' ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}>Will NOT appear on (sample)</button>
          </div>
          <div className="mt-2 max-h-72 overflow-y-auto rounded-lg border border-border">
            {tab === 'matched' ? (
              data.matched.length === 0 ? (
                <p className="px-3 py-4 text-center text-xs text-muted-foreground">No page matches the current rules.</p>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-muted text-[10px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-2 py-1.5 font-semibold">Page</th><th className="px-2 py-1.5 font-semibold">Why</th><th className="px-2 py-1.5 font-semibold">Slots on page</th></tr></thead>
                  <tbody className="divide-y divide-border">
                    {data.matched.map((page) => (
                      <tr key={page.path} className="align-top">
                        <td className="px-2 py-1.5"><span className="block font-mono text-[11px] text-foreground">{page.path}</span><span className="block text-[11px] text-muted-foreground">{page.title} · {typeLabel(page.pageType)}</span></td>
                        <td className="px-2 py-1.5 text-muted-foreground">{page.reason}</td>
                        <td className="px-2 py-1.5">
                          {page.slots.length === 0 ? <Chip tone="warning">none of the chosen slots</Chip> : <span className="flex flex-wrap gap-1">{page.slots.map((slot) => <Chip key={slot} tone="success" title={isPromotionSlot(slot) ? SLOT_META[slot].label : slot}>{slot}</Chip>)}</span>}
                        </td>
                      </tr>
                    ))}
                    {data.matchedTotal > data.matched.length && <tr><td colSpan={3} className="px-2 py-2 text-center text-[11px] text-muted-foreground">…and {data.matchedTotal - data.matched.length} more</td></tr>}
                  </tbody>
                </table>
              )
            ) : data.unmatched.length === 0 ? (
              <p className="px-3 py-4 text-center text-xs text-muted-foreground">Every known page matches.</p>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="sticky top-0 bg-muted text-[10px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-2 py-1.5 font-semibold">Page</th><th className="px-2 py-1.5 font-semibold">Why not</th></tr></thead>
                <tbody className="divide-y divide-border">
                  {data.unmatched.map((page) => (
                    <tr key={page.path} className="align-top">
                      <td className="px-2 py-1.5"><span className="block font-mono text-[11px] text-foreground">{page.path}</span><span className="block text-[11px] text-muted-foreground">{page.title} · {typeLabel(page.pageType)}</span></td>
                      <td className="px-2 py-1.5 text-muted-foreground">{page.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
