'use client';

import { useState, type FormEvent } from 'react';
import { DEVICES, PROMOTION_SLOTS, SLOT_META } from '@/lib/promotions/catalog';
import { api, Chip, Field, inputClass, primaryButtonClass, smallButtonClass, Spinner } from '../ui';
import type { DebugResponse, DebugSlotResult } from './types';

/**
 * Live targeting debugger: URL + slot (+ device, theme, time, tags) → every
 * promotion with eligible / ineligible and the decisive reason, plus the final
 * ranked order the engine would render.
 */
export default function TargetingDebugger({ onEditPromotion }: { onEditPromotion?: (id: string) => void }) {
  const [path, setPath] = useState('/');
  const [slot, setSlot] = useState<string>('');
  const [device, setDevice] = useState<string>('');
  const [theme, setTheme] = useState<string>('');
  const [at, setAt] = useState('');
  const [tags, setTags] = useState('');
  const [data, setData] = useState<DebugResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showIneligible, setShowIneligible] = useState(true);

  const run = async (event?: FormEvent) => {
    event?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      // Accept full URLs as well as paths.
      let pathname = path.trim() || '/';
      try {
        if (/^https?:\/\//i.test(pathname)) pathname = new URL(pathname).pathname;
      } catch {
        /* keep raw */
      }
      params.set('path', pathname);
      if (slot) params.set('slot', slot);
      if (device) params.set('device', device);
      if (theme) params.set('theme', theme);
      if (at) params.set('at', new Date(at).toISOString());
      if (tags.trim()) params.set('tags', tags);
      setData(await api<DebugResponse>(`/api/admin/content/promotions/debug?${params.toString()}`));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Debugger unavailable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4" data-testid="targeting-debugger">
      <form onSubmit={(event) => void run(event)} className="grid gap-3 rounded-2xl border border-border bg-card p-4 md:grid-cols-6">
        <div className="md:col-span-3">
          <Field label="Page URL or path" htmlFor="debug-path"><input id="debug-path" value={path} onChange={(event) => setPath(event.target.value)} placeholder="/research/ai-search" className={`${inputClass} font-mono`} /></Field>
        </div>
        <Field label="Slot" htmlFor="debug-slot">
          <select id="debug-slot" value={slot} onChange={(event) => setSlot(event.target.value)} className={inputClass}>
            <option value="">All slots on this page</option>
            {PROMOTION_SLOTS.map((key) => <option key={key} value={key}>{SLOT_META[key].label}</option>)}
          </select>
        </Field>
        <Field label="Device" htmlFor="debug-device">
          <select id="debug-device" value={device} onChange={(event) => setDevice(event.target.value)} className={inputClass}>
            <option value="">Any</option>
            {DEVICES.map((key) => <option key={key} value={key}>{key}</option>)}
          </select>
        </Field>
        <Field label="Theme" htmlFor="debug-theme">
          <select id="debug-theme" value={theme} onChange={(event) => setTheme(event.target.value)} className={inputClass}>
            <option value="">Any</option>
            <option value="light">light</option>
            <option value="dark">dark</option>
          </select>
        </Field>
        <div className="md:col-span-2">
          <Field label="Evaluate at (optional)" htmlFor="debug-at" hint="Check schedules in the future or past."><input id="debug-at" type="datetime-local" value={at} onChange={(event) => setAt(event.target.value)} className={inputClass} /></Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Page tags (optional)" htmlFor="debug-tags" hint="Comma-separated; simulates the page's tags/category."><input id="debug-tags" value={tags} onChange={(event) => setTags(event.target.value)} placeholder="valuation, fintech" className={inputClass} /></Field>
        </div>
        <div className="flex items-end gap-2 md:col-span-2">
          <button type="submit" disabled={loading} className={primaryButtonClass}>{loading ? 'Evaluating…' : 'Evaluate'}</button>
          <label className="flex items-center gap-1.5 text-xs text-muted-foreground"><input type="checkbox" checked={showIneligible} onChange={(event) => setShowIneligible(event.target.checked)} className="h-3.5 w-3.5 accent-primary" /> show ineligible</label>
        </div>
      </form>

      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
      {loading && !data && <Spinner label="Evaluating promotions…" />}

      {data && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-muted/30 p-3 text-xs">
            <span className="font-mono text-foreground">{data.page.pathname}</span>
            <Chip tone="primary">{data.page.pageTypeLabel}{data.page.isHub ? ' · hub' : ' · detail'}</Chip>
            {data.page.contentKey && <Chip title="Content ID">{data.page.contentKey}</Chip>}
            {data.page.blocked && <Chip tone="danger">promotions never render here</Chip>}
            {!data.page.blocked && !data.page.globalEligible && <Chip tone="warning">Global targeting does not reach this page</Chip>}
            {data.page.tags.length > 0 && <span className="text-muted-foreground">tags: {data.page.tags.join(', ')}</span>}
            <span className="ml-auto text-muted-foreground">{data.totalPromotions} promotions evaluated · {new Date(data.input.at).toLocaleString()}{data.input.device ? ` · ${data.input.device}` : ''}{data.input.theme ? ` · ${data.input.theme}` : ''}</span>
          </div>
          <p className="text-xs text-muted-foreground">Slots rendered on this page: {data.page.renderedSlots.length ? data.page.renderedSlots.map((key) => SLOT_META[key as keyof typeof SLOT_META]?.label ?? key).join(', ') : 'none'}.</p>
          {data.slots.length === 0 && <p className="text-sm text-muted-foreground">No promotion slot exists on this page.</p>}
          {data.slots.map((result) => <SlotResult key={result.slot} result={result} showIneligible={showIneligible} onEditPromotion={onEditPromotion} />)}
        </div>
      )}
    </div>
  );
}

function SlotResult({ result, showIneligible, onEditPromotion }: { result: DebugSlotResult; showIneligible: boolean; onEditPromotion?: (id: string) => void }) {
  const eligible = result.evaluations.filter((evaluation) => evaluation.eligible);
  const ineligible = result.evaluations.filter((evaluation) => !evaluation.eligible);
  const rankById = new Map(result.ranked.map((entry) => [entry.id, entry]));
  return (
    <section className="rounded-2xl border border-border bg-card p-4" aria-labelledby={`debug-slot-${result.slot}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 id={`debug-slot-${result.slot}`} className="text-sm font-bold text-foreground">{result.label} <code className="ml-1 rounded bg-muted px-1 py-0.5 text-[10px] font-normal text-muted-foreground">{result.slot}</code></h3>
        <p className="text-xs text-muted-foreground">
          {result.rendered ? <>{eligible.length} eligible · renders up to {result.limit} · <span className="font-semibold text-foreground">{result.winners.length ? `winner${result.winners.length > 1 ? 's' : ''}: ${result.winners.length}` : 'slot collapses (empty)'}</span></> : <Chip tone="warning">this slot does not exist on this page type</Chip>}
        </p>
      </div>
      {eligible.length > 0 && (
        <ol className="mt-3 space-y-1.5">
          {eligible
            .slice()
            .sort((a, b) => (rankById.get(a.promotionId)?.position ?? 999) - (rankById.get(b.promotionId)?.position ?? 999))
            .map((evaluation) => {
              const rank = rankById.get(evaluation.promotionId);
              const winner = result.winners.includes(evaluation.promotionId);
              return (
                <li key={evaluation.promotionId} className={`flex flex-wrap items-start gap-2 rounded-xl border p-2.5 text-xs ${winner ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-border'}`}>
                  <span className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 font-mono text-[11px] font-bold ${winner ? 'bg-emerald-600 text-white' : 'bg-muted text-muted-foreground'}`}>#{rank?.position ?? '–'}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground">{evaluation.promotion.title} <span className="font-normal text-muted-foreground">· {evaluation.promotion.brandName}</span></p>
                    <p className="text-muted-foreground">{evaluation.reasons.join(' · ')}</p>
                    <p className="mt-0.5 flex flex-wrap gap-1">
                      {winner ? <Chip tone="success">renders</Chip> : <Chip>eligible, outranked</Chip>}
                      {evaluation.tierLabel && <Chip tone="primary">{evaluation.tierLabel}</Chip>}
                      <Chip>priority {evaluation.promotion.priority}</Chip>
                      <Chip>{evaluation.promotion.rotationMode.toLowerCase()}{rank && rank.weight > 1 ? ` ×${rank.weight}` : ''}</Chip>
                      {evaluation.derivedFromLegacy && <Chip tone="warning">legacy rules</Chip>}
                    </p>
                  </div>
                  {onEditPromotion && <button type="button" onClick={() => onEditPromotion(evaluation.promotionId)} className={smallButtonClass}>Edit</button>}
                </li>
              );
            })}
        </ol>
      )}
      {showIneligible && ineligible.length > 0 && (
        <details className="mt-3" open={eligible.length === 0}>
          <summary className="cursor-pointer text-xs font-semibold text-muted-foreground">{ineligible.length} ineligible</summary>
          <ul className="mt-2 space-y-1">
            {ineligible.map((evaluation) => (
              <li key={evaluation.promotionId} className="flex flex-wrap items-start gap-2 rounded-lg border border-border/60 px-2.5 py-1.5 text-xs">
                <div className="min-w-0 flex-1">
                  <p className="text-foreground">{evaluation.promotion.title} <span className="text-muted-foreground">· {evaluation.promotion.brandName}{evaluation.promotion.active ? '' : ' · inactive'}</span></p>
                  <p className="text-muted-foreground">{evaluation.reasons[0]}</p>
                </div>
                {onEditPromotion && <button type="button" onClick={() => onEditPromotion(evaluation.promotionId)} className={smallButtonClass}>Edit</button>}
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
