'use client';

import { PAGE_TYPE_META, PROMOTION_SLOTS, SLOT_META, isPageType, type PromotionSlot } from '@/lib/promotions/catalog';
import { setPlacementWeight, togglePlacement } from './draft';
import type { PlacementRuleDraft } from './types';

function slotPageTypesLabel(slot: PromotionSlot): string {
  const meta = SLOT_META[slot];
  if (meta.pageTypes === 'ALL_PUBLIC') return 'Every public page (client-side floating card)';
  const labels = meta.pageTypes.map((key) => (isPageType(key) ? PAGE_TYPE_META[key].label : key));
  const prefix = meta.detailOnly ? 'Detail pages: ' : '';
  return prefix + (labels.length > 6 ? `${labels.slice(0, 6).join(', ')} +${labels.length - 6} more` : labels.join(', '));
}

/**
 * Placement (slot) picker. Only slots that real frontend components request are
 * listed (lib/promotions/catalog.ts → SLOT_META); each shows where it renders.
 */
export default function PlacementSelector({
  placements,
  onChange,
  showWeights,
  idPrefix = 'promo-placements',
}: {
  placements: PlacementRuleDraft[];
  onChange: (placements: PlacementRuleDraft[]) => void;
  /** Weighted rotation uses per-placement weights. */
  showWeights: boolean;
  idPrefix?: string;
}) {
  return (
    <div className="space-y-2" data-testid="placement-selector">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">{placements.length} of {PROMOTION_SLOTS.length} slots selected. A promotion only renders in slots that exist on the targeted pages.</p>
        <div className="flex gap-1">
          <button type="button" onClick={() => onChange(PROMOTION_SLOTS.map((slot) => placements.find((rule) => rule.slot === slot) ?? { slot, weight: 1 }))} className="rounded px-1.5 py-0.5 text-[11px] font-semibold text-primary hover:bg-primary/10">Select all</button>
          <button type="button" onClick={() => onChange([])} disabled={placements.length === 0} className="rounded px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground hover:bg-muted disabled:opacity-40">Clear</button>
        </div>
      </div>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {PROMOTION_SLOTS.map((slot) => {
          const meta = SLOT_META[slot];
          const rule = placements.find((entry) => entry.slot === slot);
          const checked = Boolean(rule);
          return (
            <li key={slot} className={`rounded-xl border p-2.5 transition-colors ${checked ? 'border-primary bg-primary/5' : 'border-border bg-background'}`}>
              <label htmlFor={`${idPrefix}-${slot}`} className="flex cursor-pointer items-start gap-2.5">
                <input id={`${idPrefix}-${slot}`} type="checkbox" checked={checked} onChange={() => onChange(togglePlacement(placements, slot))} className="mt-0.5 h-4 w-4 accent-primary" />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span className="text-sm font-semibold text-foreground">{meta.label}</span>
                    <code className="rounded bg-muted px-1 py-0.5 text-[10px] text-muted-foreground">{slot}</code>
                    {meta.maxPerPage > 1 && <span className="text-[10px] text-muted-foreground">up to {meta.maxPerPage} per page</span>}
                  </span>
                  <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">{meta.description}</span>
                  <span className="mt-0.5 block text-[11px] text-muted-foreground/80">Renders on: {slotPageTypesLabel(slot)}</span>
                </span>
              </label>
              {checked && showWeights && rule && (
                <div className="mt-2 flex items-center gap-2 pl-6 text-xs text-muted-foreground">
                  <label htmlFor={`${idPrefix}-${slot}-weight`}>Weight</label>
                  <input id={`${idPrefix}-${slot}-weight`} type="number" min={1} max={10} value={rule.weight} onChange={(event) => onChange(setPlacementWeight(placements, slot, Number(event.target.value)))} className="h-8 w-16 rounded-lg border border-border bg-background px-2 text-sm text-foreground" />
                  <span>(1–10, higher leads more often)</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
