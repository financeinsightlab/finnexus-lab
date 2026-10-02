'use client';

import { useMemo, useState } from 'react';
import { SLOT_META, isPromotionSlot } from '@/lib/promotions/catalog';
import { api, buttonClass, Chip, dangerButtonClass, EmptyState, formatDateTime, inputClass, primaryButtonClass, smallButtonClass, StatusBadge, type Notice } from '../ui';
import { ruleBadge, ruleKey } from './draft';
import PageTargetSelector from './PageTargetSelector';
import PlacementSelector from './PlacementSelector';
import type { AdminPromotion, PlacementRuleDraft, PromotionReportResponse, TargetRuleDraft } from './types';

type StatusFilter = 'all' | 'active' | 'inactive' | 'scheduled' | 'expired' | 'legacy';

function scheduleState(promotion: AdminPromotion, now: number): 'live' | 'scheduled' | 'expired' | 'inactive' {
  if (!promotion.active) return 'inactive';
  if (promotion.startsAt && new Date(promotion.startsAt).getTime() > now) return 'scheduled';
  if (promotion.endsAt && new Date(promotion.endsAt).getTime() < now) return 'expired';
  return 'live';
}

function scheduleLabel(promotion: AdminPromotion): string {
  if (!promotion.startsAt && !promotion.endsAt) return 'Always';
  return `${promotion.startsAt ? formatDateTime(promotion.startsAt) : '…'} → ${promotion.endsAt ? formatDateTime(promotion.endsAt) : '…'}`;
}

/**
 * Campaign list: brand, promotion, status, targets, placements, priority,
 * schedule and last-N-days metrics, with multi-select bulk operations.
 */
export default function CampaignTable({
  promotions,
  report,
  loading,
  onEdit,
  onChanged,
  setNotice,
}: {
  promotions: AdminPromotion[];
  report: PromotionReportResponse | null;
  loading: boolean;
  onEdit: (promotion: AdminPromotion) => void;
  onChanged: (updated: AdminPromotion[], removedIds?: string[]) => void;
  setNotice: (notice: Notice) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [busy, setBusy] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignMode, setAssignMode] = useState<'add' | 'replace'>('add');
  const [assignTargets, setAssignTargets] = useState<TargetRuleDraft[]>([]);
  const [assignPlacements, setAssignPlacements] = useState<PlacementRuleDraft[]>([]);
  const now = Date.now();

  const metrics = useMemo(() => new Map((report?.byPromotion ?? []).map((row) => [row.id, row])), [report]);

  const visible = useMemo(() => {
    const needle = filter.trim().toLowerCase();
    return promotions.filter((promotion) => {
      if (needle && ![promotion.brandName, promotion.title, promotion.campaignId ?? '', promotion.category, promotion.targetSummary].some((value) => value.toLowerCase().includes(needle))) return false;
      const state = scheduleState(promotion, now);
      if (status === 'active') return state === 'live';
      if (status === 'inactive') return state === 'inactive';
      if (status === 'scheduled') return state === 'scheduled';
      if (status === 'expired') return state === 'expired';
      if (status === 'legacy') return promotion.derivedFromLegacy;
      return true;
    });
  }, [promotions, filter, status, now]);

  const allVisibleSelected = visible.length > 0 && visible.every((promotion) => selected.has(promotion.id));
  const toggleAll = () => setSelected(allVisibleSelected ? new Set() : new Set(visible.map((promotion) => promotion.id)));
  const toggleOne = (id: string) => setSelected((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });

  const runBulk = async (body: Record<string, unknown>, successText: (count: number) => string) => {
    setBusy(true);
    setNotice(null);
    try {
      const result = await api<{ ok: boolean; affected: number; promotions: AdminPromotion[] }>('/api/admin/content/promotions/bulk', { method: 'POST', body: JSON.stringify(body) });
      onChanged(result.promotions);
      setNotice({ kind: 'success', text: successText(result.affected) });
      if (body.action === 'duplicate') setSelected(new Set());
    } catch (error) {
      setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Bulk operation failed.' });
    } finally {
      setBusy(false);
    }
  };

  const ids = [...selected];
  const toggleActive = async (promotion: AdminPromotion) => {
    await runBulk({ action: promotion.active ? 'deactivate' : 'activate', ids: [promotion.id] }, () => (promotion.active ? `"${promotion.title}" deactivated.` : `"${promotion.title}" activated.`));
  };
  const remove = async (promotion: AdminPromotion) => {
    if (!window.confirm(`Permanently delete "${promotion.title}" (${promotion.brandName})? Its analytics events are removed too. This cannot be undone.`)) return;
    setBusy(true);
    try {
      await api('/api/admin/content/promotions', { method: 'DELETE', body: JSON.stringify({ id: promotion.id, permanent: true }) });
      onChanged([], [promotion.id]);
      setSelected((current) => { const next = new Set(current); next.delete(promotion.id); return next; });
      setNotice({ kind: 'success', text: `"${promotion.title}" was permanently deleted.` });
    } catch (error) {
      setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Promotion could not be deleted.' });
    } finally {
      setBusy(false);
    }
  };
  const submitAssign = async () => {
    if (assignTargets.length === 0 && assignPlacements.length === 0) {
      setNotice({ kind: 'error', text: 'Choose pages and/or placements to assign.' });
      return;
    }
    await runBulk(
      { action: 'assign', ids, mode: assignMode, targets: assignTargets.length ? assignTargets : undefined, placements: assignPlacements.length ? assignPlacements : undefined },
      (count) => `${assignMode === 'add' ? 'Added' : 'Replaced'} rules on ${count} promotion${count === 1 ? '' : 's'}.`,
    );
    setAssignOpen(false);
    setAssignTargets([]);
    setAssignPlacements([]);
  };

  return (
    <div className="space-y-3" data-testid="campaign-table">
      <div className="flex flex-wrap items-center gap-2">
        <input type="search" value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="Filter by brand, title, campaign, category…" className={`${inputClass} mt-0 max-w-xs`} aria-label="Filter promotions" />
        <select value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)} className={`${inputClass} mt-0 w-auto`} aria-label="Status filter">
          <option value="all">All statuses</option>
          <option value="active">Live now</option>
          <option value="scheduled">Scheduled</option>
          <option value="expired">Expired</option>
          <option value="inactive">Inactive</option>
          <option value="legacy">Legacy rules (not yet re-saved)</option>
        </select>
        <span className="text-xs text-muted-foreground">{visible.length} of {promotions.length} promotions{report ? ` · metrics for last ${report.days} days` : ''}</span>
      </div>

      {/* Bulk bar */}
      <div className={`flex flex-wrap items-center gap-2 rounded-xl border p-2 text-xs ${ids.length ? 'border-primary/40 bg-primary/5' : 'border-border bg-muted/30'}`} aria-live="polite">
        <span className="font-semibold text-foreground">{ids.length} selected</span>
        <button type="button" disabled={!ids.length || busy} onClick={() => void runBulk({ action: 'activate', ids }, (count) => `${count} promotion${count === 1 ? '' : 's'} activated.`)} className={smallButtonClass}>Activate</button>
        <button type="button" disabled={!ids.length || busy} onClick={() => void runBulk({ action: 'deactivate', ids }, (count) => `${count} promotion${count === 1 ? '' : 's'} deactivated.`)} className={smallButtonClass}>Deactivate</button>
        <button type="button" disabled={!ids.length || busy} onClick={() => void runBulk({ action: 'duplicate', ids }, (count) => `${count} cop${count === 1 ? 'y' : 'ies'} created (inactive).`)} className={smallButtonClass}>Duplicate</button>
        <button type="button" disabled={!ids.length || busy} onClick={() => setAssignOpen((open) => !open)} aria-expanded={assignOpen} className={smallButtonClass}>Assign pages / placements…</button>
        {ids.length > 0 && <button type="button" onClick={() => setSelected(new Set())} className="ml-auto text-muted-foreground underline underline-offset-2">Clear selection</button>}
      </div>

      {assignOpen && ids.length > 0 && (
        <div className="space-y-3 rounded-xl border border-primary/40 bg-card p-3" role="dialog" aria-label="Bulk assign pages and placements">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-bold text-foreground">Bulk assign to {ids.length} promotion{ids.length === 1 ? '' : 's'}</p>
            <div role="radiogroup" aria-label="Assign mode" className="inline-flex rounded-lg border border-border p-0.5 text-xs font-semibold">
              {(['add', 'replace'] as const).map((mode) => <button key={mode} type="button" role="radio" aria-checked={assignMode === mode} onClick={() => setAssignMode(mode)} className={`rounded-md px-3 py-1 capitalize ${assignMode === mode ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>{mode === 'add' ? 'Add to existing' : 'Replace existing'}</button>)}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{assignMode === 'add' ? 'New rules are merged into each promotion. Leave a section empty to keep it unchanged.' : 'Chosen pages replace all page rules; chosen placements replace all placements. Empty sections are left unchanged.'}</p>
          <div className="grid gap-3 xl:grid-cols-2">
            <div className="rounded-xl border border-border p-3"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Pages</p><PageTargetSelector rules={assignTargets} onChange={setAssignTargets} idPrefix="bulk-targets" compact /></div>
            <div className="rounded-xl border border-border p-3"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Placements</p><PlacementSelector placements={assignPlacements} onChange={setAssignPlacements} showWeights={false} idPrefix="bulk-placements" /></div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={busy} onClick={() => void submitAssign()} className={primaryButtonClass}>{busy ? 'Applying…' : 'Apply to selected'}</button>
            <button type="button" onClick={() => setAssignOpen(false)} className={buttonClass}>Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="py-6 text-sm text-muted-foreground" role="status">Loading promotions…</p>
      ) : visible.length === 0 ? (
        <EmptyState>{promotions.length === 0 ? 'No promotions yet. Create the first one in the editor.' : 'No promotions match the current filter.'}</EmptyState>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[960px] text-left text-xs">
            <thead className="bg-muted text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-2 py-2"><input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} aria-label="Select all visible promotions" className="h-3.5 w-3.5 accent-primary" /></th>
                <th className="px-2 py-2 font-semibold">Brand / promotion</th>
                <th className="px-2 py-2 font-semibold">Status</th>
                <th className="px-2 py-2 font-semibold">Target pages</th>
                <th className="px-2 py-2 font-semibold">Placements</th>
                <th className="px-2 py-2 text-right font-semibold">Priority</th>
                <th className="px-2 py-2 font-semibold">Schedule</th>
                <th className="px-2 py-2 text-right font-semibold">Impr.</th>
                <th className="px-2 py-2 text-right font-semibold">Clicks</th>
                <th className="px-2 py-2 text-right font-semibold">CTR</th>
                <th className="px-2 py-2 font-semibold"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visible.map((promotion) => {
                const state = scheduleState(promotion, now);
                const metric = metrics.get(promotion.id);
                const targetRules = promotion.effectiveTargets;
                return (
                  <tr key={promotion.id} className={`align-top ${selected.has(promotion.id) ? 'bg-primary/5' : ''}`}>
                    <td className="px-2 py-2"><input type="checkbox" checked={selected.has(promotion.id)} onChange={() => toggleOne(promotion.id)} aria-label={`Select ${promotion.title}`} className="h-3.5 w-3.5 accent-primary" /></td>
                    <td className="max-w-[240px] px-2 py-2">
                      <p className="truncate font-semibold text-foreground" title={promotion.title}>{promotion.title}</p>
                      <p className="truncate text-muted-foreground">{promotion.brandName}{promotion.campaignId ? ` · ${promotion.campaignId}` : ''}</p>
                      <p className="mt-0.5 flex flex-wrap gap-1">
                        <Chip>{promotion.category}</Chip>
                        {promotion.videoUrl && <Chip tone="primary">video</Chip>}
                        {promotion.derivedFromLegacy && <Chip tone="warning" title="Rules are derived from the legacy placement/targetPages columns. Open and save to store explicit rules.">legacy rules</Chip>}
                        {promotion.themeMode !== 'ALL' && <Chip>{promotion.themeMode.toLowerCase()} theme</Chip>}
                        {(!promotion.mobileVisible || !promotion.tabletVisible || !promotion.desktopVisible) && <Chip>{[promotion.mobileVisible && 'mobile', promotion.tabletVisible && 'tablet', promotion.desktopVisible && 'desktop'].filter(Boolean).join('/')}</Chip>}
                      </p>
                    </td>
                    <td className="px-2 py-2">
                      <StatusBadge active={state === 'live'} label="Live" inactiveLabel={state === 'scheduled' ? 'Scheduled' : state === 'expired' ? 'Expired' : 'Inactive'} />
                    </td>
                    <td className="max-w-[260px] px-2 py-2">
                      <p className="text-foreground">{promotion.targetSummary}</p>
                      <p className="mt-0.5 flex flex-wrap gap-1">
                        {targetRules.slice(0, 4).map((rule) => { const badge = ruleBadge(rule); return <Chip key={ruleKey(rule)} tone={badge.tone} title={badge.text}>{badge.text}</Chip>; })}
                        {targetRules.length > 4 && <Chip>+{targetRules.length - 4} more</Chip>}
                      </p>
                    </td>
                    <td className="max-w-[200px] px-2 py-2">
                      <p className="flex flex-wrap gap-1">
                        {promotion.effectivePlacements.map((rule) => <Chip key={rule.slot} title={isPromotionSlot(rule.slot) ? SLOT_META[rule.slot].description : rule.slot}>{isPromotionSlot(rule.slot) ? SLOT_META[rule.slot].label : rule.slot}{promotion.rotationMode === 'WEIGHTED' ? ` ×${rule.weight}` : ''}</Chip>)}
                      </p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{promotion.rotationMode.toLowerCase()} rotation{promotion.frequencyCap ? ` · cap ${promotion.frequencyCap}/day` : ''}</p>
                    </td>
                    <td className="px-2 py-2 text-right font-mono text-foreground">{promotion.priority}</td>
                    <td className="px-2 py-2 text-muted-foreground">{scheduleLabel(promotion)}</td>
                    <td className="px-2 py-2 text-right font-mono text-foreground">{(metric?.impressions ?? 0).toLocaleString()}</td>
                    <td className="px-2 py-2 text-right font-mono text-foreground">{(metric?.clicks ?? 0).toLocaleString()}</td>
                    <td className="px-2 py-2 text-right font-mono text-foreground">{metric ? `${metric.ctr}%` : '0%'}</td>
                    <td className="px-2 py-2">
                      <div className="flex flex-col gap-1">
                        <button type="button" onClick={() => onEdit(promotion)} className={smallButtonClass}>Edit</button>
                        <button type="button" disabled={busy} onClick={() => void toggleActive(promotion)} className={smallButtonClass}>{promotion.active ? 'Deactivate' : 'Activate'}</button>
                        <button type="button" disabled={busy} onClick={() => void remove(promotion)} className={dangerButtonClass}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
