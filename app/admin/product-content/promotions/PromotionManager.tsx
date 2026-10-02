'use client';

import { useCallback, useEffect, useState } from 'react';
import { api, NoticeBanner, type Notice } from '../ui';
import CampaignTable from './CampaignTable';
import { blankDraft, draftFromPromotion } from './draft';
import PromotionAnalytics from './PromotionAnalytics';
import PromotionEditor from './PromotionEditor';
import TargetingDebugger from './TargetingDebugger';
import type { AdminPromotion, PromotionDraft, PromotionReportResponse } from './types';

type View = 'campaigns' | 'editor' | 'debugger' | 'analytics';

const VIEWS: { id: View; title: string; description: string }[] = [
  { id: 'campaigns', title: 'Campaigns', description: 'List, status, bulk actions' },
  { id: 'editor', title: 'Editor', description: 'Create or edit a promotion' },
  { id: 'debugger', title: 'Targeting debugger', description: 'Why does page X show Y?' },
  { id: 'analytics', title: 'Analytics', description: 'Impressions, clicks, CTR' },
];

/**
 * Promotions tab of the product-content admin.
 *
 * Talks to the existing admin API (/api/admin/content/promotions/*) which is the
 * single source of truth; every change is validated server-side and goes live
 * immediately through the public-promotions cache tag.
 */
export default function PromotionManager() {
  const [view, setView] = useState<View>('campaigns');
  const [promotions, setPromotions] = useState<AdminPromotion[]>([]);
  const [report, setReport] = useState<PromotionReportResponse | null>(null);
  const [reportDays, setReportDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(true);
  const [notice, setNotice] = useState<Notice>(null);
  const [draft, setDraft] = useState<PromotionDraft>(blankDraft);

  const loadPromotions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api<{ promotions: AdminPromotion[] }>('/api/admin/content/promotions');
      setPromotions(data.promotions);
    } catch (error) {
      setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Promotions could not be loaded.' });
    } finally {
      setLoading(false);
    }
  }, []);

  const loadReport = useCallback(async (days: number) => {
    setReportLoading(true);
    try {
      setReport(await api<PromotionReportResponse>(`/api/admin/content/promotions/report?days=${days}`));
    } catch (error) {
      setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Promotion analytics could not be loaded.' });
    } finally {
      setReportLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPromotions();
  }, [loadPromotions]);

  useEffect(() => {
    void loadReport(reportDays);
  }, [loadReport, reportDays]);

  const mergePromotions = (updated: AdminPromotion[], removedIds: string[] = []) => {
    setPromotions((current) => {
      const byId = new Map(current.map((promotion) => [promotion.id, promotion]));
      for (const promotion of updated) byId.set(promotion.id, promotion);
      for (const id of removedIds) byId.delete(id);
      return [...byId.values()].sort((a, b) => Number(b.active) - Number(a.active) || b.priority - a.priority || b.createdAt.localeCompare(a.createdAt));
    });
  };

  const edit = (promotion: AdminPromotion) => {
    setDraft(draftFromPromotion(promotion));
    setNotice(promotion.derivedFromLegacy ? { kind: 'info', text: 'This promotion still uses legacy targeting columns. Its rules were translated below — review and save to store them explicitly.' } : null);
    setView('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const editById = (id: string) => {
    const promotion = promotions.find((entry) => entry.id === id);
    if (promotion) edit(promotion);
  };

  const onSaved = (promotion: AdminPromotion, warning?: string | null) => {
    mergePromotions([promotion]);
    setDraft(draftFromPromotion(promotion));
    setNotice(warning ? { kind: 'info', text: `Saved. ${warning}` } : { kind: 'success', text: `"${promotion.title}" saved. Live pages update immediately.` });
  };

  const onDelete = async (id: string, brandName: string) => {
    if (!window.confirm(`Permanently delete the promotion for "${brandName}"? This cannot be undone.`)) return;
    try {
      await api('/api/admin/content/promotions', { method: 'DELETE', body: JSON.stringify({ id, permanent: true }) });
      mergePromotions([], [id]);
      setDraft(blankDraft());
      setNotice({ kind: 'success', text: `Promotion for "${brandName}" was permanently deleted.` });
      setView('campaigns');
    } catch (error) {
      setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Promotion could not be deleted.' });
    }
  };

  const activeCount = promotions.filter((promotion) => promotion.active).length;
  const legacyCount = promotions.filter((promotion) => promotion.derivedFromLegacy).length;

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-foreground">Affiliate & sponsored promotions</h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
              Promotions render only in the named slots they are assigned to and only on the pages their rules match. Exclusions beat inclusions; exact pages beat page types; page types beat Global. Every card carries its disclosure and <code>rel=&quot;sponsored nofollow&quot;</code>.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-muted px-3 py-1 font-semibold text-muted-foreground">{promotions.length} promotions</span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-700 dark:text-emerald-300">{activeCount} active</span>
            {legacyCount > 0 && <span className="rounded-full bg-amber-500/10 px-3 py-1 font-semibold text-amber-700 dark:text-amber-300" title="Rules derived from legacy columns; open and save to make them explicit.">{legacyCount} with legacy rules</span>}
          </div>
        </div>
        <div className="mt-4"><NoticeBanner notice={notice} onDismiss={() => setNotice(null)} /></div>
      </section>

      <div role="tablist" aria-label="Promotion views" className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {VIEWS.map((entry) => (
          <button key={entry.id} type="button" role="tab" id={`promotion-view-${entry.id}`} aria-selected={view === entry.id} aria-controls={`promotion-panel-${entry.id}`} onClick={() => setView(entry.id)} className={`min-h-14 rounded-xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${view === entry.id ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-card text-muted-foreground hover:text-foreground'}`}>
            <span className="block text-sm font-bold">{entry.title}{entry.id === 'editor' && draft.id ? ' · editing' : ''}</span>
            <span className="mt-0.5 block text-xs">{entry.description}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`promotion-panel-${view}`} aria-labelledby={`promotion-view-${view}`} className="outline-none">
        {view === 'campaigns' && (
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-foreground">Campaigns</h3>
              <button type="button" onClick={() => { setDraft(blankDraft()); setNotice(null); setView('editor'); }} className="inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90">+ New promotion</button>
            </div>
            <CampaignTable promotions={promotions} report={report} loading={loading} onEdit={edit} onChanged={mergePromotions} setNotice={setNotice} />
          </section>
        )}
        {view === 'editor' && (
          <section className="rounded-2xl border border-border bg-card p-5">
            <PromotionEditor draft={draft} setDraft={setDraft} onSaved={onSaved} onDelete={onDelete} setNotice={setNotice} />
          </section>
        )}
        {view === 'debugger' && <TargetingDebugger onEditPromotion={editById} />}
        {view === 'analytics' && <PromotionAnalytics report={report} loading={reportLoading} days={reportDays} onDaysChange={setReportDays} onRefresh={() => void loadReport(reportDays)} />}
      </div>
    </div>
  );
}
