'use client';

import { useState, type FormEvent } from 'react';
import { ROTATION_MODE_META, ROTATION_MODES, THEME_MODES, type RotationMode, type ThemeMode } from '@/lib/promotions/catalog';
import { getPromotionHref } from '@/lib/promotions/href';
import { api, buttonClass, dangerButtonClass, Field, inputClass, primaryButtonClass, textAreaClass, Toggle, type Notice } from '../ui';
import { blankDraft, cloneDraft, draftToPayload } from './draft';
import PageTargetSelector from './PageTargetSelector';
import PlacementSelector from './PlacementSelector';
import PromotionPreview from './PromotionPreview';
import TargetingPreview from './TargetingPreview';
import type { AdminPromotion, PromotionDraft } from './types';

interface CrawlMetadata {
  brandName: string;
  title: string;
  shortDescription: string;
  imageUrl: string | null;
  liveScreenshotUrl?: string;
  logoUrl: string | null;
  destinationUrl: string;
  suggestedCta: string;
  category: string;
  extractedImages?: string[];
}

const THEME_LABELS: Record<ThemeMode, string> = { ALL: 'Light & dark', LIGHT: 'Light theme only', DARK: 'Dark theme only' };

/**
 * Create / edit form. Targeting and placements are structured rules; the
 * crawler only fills creative fields and never touches targeting.
 */
export default function PromotionEditor({
  draft,
  setDraft,
  onSaved,
  onDelete,
  setNotice,
}: {
  draft: PromotionDraft;
  setDraft: (updater: PromotionDraft | ((current: PromotionDraft) => PromotionDraft)) => void;
  onSaved: (promotion: AdminPromotion, warning?: string | null) => void;
  onDelete: (id: string, brandName: string) => Promise<void>;
  setNotice: (notice: Notice) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [crawling, setCrawling] = useState(false);
  const [crawlUrlInput, setCrawlUrlInput] = useState('');
  const [crawledData, setCrawledData] = useState<{ liveScreenshotUrl?: string; extractedImages?: string[] } | null>(null);
  const [previewOpen, setPreviewOpen] = useState(true);

  const update = <K extends keyof PromotionDraft>(key: K, value: PromotionDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const setCreative = (url: string) => setDraft((current) => ({ ...current, imageUrl: url, lightCreativeUrl: url, darkCreativeUrl: current.darkCreativeUrl || url }));

  const handleCrawlWebsite = async (overrideUrl?: string) => {
    const targetUrl = (overrideUrl || crawlUrlInput || draft.destinationUrl || '').trim();
    if (!targetUrl) {
      setNotice({ kind: 'error', text: 'Enter the partner page URL to crawl first.' });
      return;
    }
    setCrawling(true);
    setNotice(null);
    try {
      const res = await api<{ ok: boolean; metadata: CrawlMetadata }>('/api/admin/content/promotions/crawl', { method: 'POST', body: JSON.stringify({ url: targetUrl }) });
      if (res.metadata) {
        const m = res.metadata;
        const chosenImage = m.imageUrl || m.liveScreenshotUrl || null;
        setCrawledData({ liveScreenshotUrl: m.liveScreenshotUrl, extractedImages: m.extractedImages || [] });
        setDraft((current) => ({
          ...current,
          brandName: m.brandName || current.brandName,
          title: m.title || current.title,
          shortDescription: m.shortDescription || current.shortDescription,
          imageUrl: chosenImage || current.imageUrl,
          lightCreativeUrl: chosenImage || current.lightCreativeUrl,
          darkCreativeUrl: current.darkCreativeUrl || chosenImage || '',
          logoUrl: m.logoUrl || current.logoUrl,
          destinationUrl: m.destinationUrl || current.destinationUrl,
          ctaText: m.suggestedCta || current.ctaText,
          category: m.category || current.category,
          // Targeting and placements are deliberately left untouched: choose them explicitly below.
        }));
        setCrawlUrlInput(m.destinationUrl);
        setNotice({ kind: 'success', text: `Extracted brand, headline, description and creative for ${m.brandName}. Now choose where it should appear.` });
      }
    } catch (err) {
      setNotice({ kind: 'error', text: err instanceof Error ? err.message : 'Could not crawl the website URL.' });
    } finally {
      setCrawling(false);
    }
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setNotice(null);
    try {
      const body = draftToPayload(draft);
      const { promotion, warning } = await api<{ promotion: AdminPromotion; warning?: string | null }>('/api/admin/content/promotions', { method: 'POST', body: JSON.stringify(body) });
      onSaved(promotion, warning);
      setCrawledData(null);
    } catch (error) {
      setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Promotion could not be saved.' });
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setDraft(blankDraft());
    setCrawledData(null);
    setCrawlUrlInput('');
    setNotice(null);
  };

  const resolvedHref = (() => {
    try {
      return getPromotionHref({ destinationUrl: draft.destinationUrl, affiliateUrl: draft.affiliateUrl || null, trackingUrl: draft.trackingUrl || null, utmParameters: draft.utmText.trim() ? JSON.parse(draft.utmText) : null });
    } catch {
      return null;
    }
  })();

  return (
    <form onSubmit={save} className="space-y-5" aria-labelledby="promotion-editor-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 id="promotion-editor-title" className="text-lg font-bold text-foreground">{draft.id ? 'Edit promotion' : 'Create promotion'}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{draft.id ? <>Editing <span className="font-mono text-xs">{draft.id}</span>. Changes go live immediately after saving.</> : 'Fill in the creative, then choose placements and pages explicitly. Nothing is Global unless you opt in.'}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {draft.id && <button type="button" onClick={() => { setDraft(cloneDraft(draft)); setNotice({ kind: 'info', text: 'Duplicated into the editor as a new, inactive promotion. Save to create it.' }); }} className={buttonClass}>Duplicate</button>}
          <button type="button" onClick={reset} className={buttonClass}>{draft.id ? 'New promotion' : 'Clear form'}</button>
        </div>
      </div>

      {/* ── 1. Crawler ── */}
      <section className="rounded-2xl border-2 border-dashed border-teal-500/50 bg-teal-500/5 p-4 dark:border-teal-400/40 dark:bg-teal-950/20">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-teal-700 dark:text-teal-300">1 · Auto-fill from the partner page</span>
          <span className="rounded-md bg-teal-500/10 px-2 py-0.5 text-[10px] font-bold text-teal-700 dark:text-teal-300">Creative only — targeting stays yours</span>
        </div>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">Paste the landing page URL. The crawler extracts the brand, headline, description, banner, logo and a CTA suggestion.</p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input type="url" placeholder="https://partner.example.com/landing" value={crawlUrlInput || draft.destinationUrl} onChange={(e) => { setCrawlUrlInput(e.target.value); update('destinationUrl', e.target.value); }} className={`${inputClass} mt-0`} aria-label="Partner page URL to crawl" />
          <button type="button" disabled={crawling} onClick={() => void handleCrawlWebsite()} className="shrink-0 rounded-xl bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 px-5 py-2.5 text-xs font-black text-white shadow-md transition-all hover:from-teal-600 hover:to-cyan-700 disabled:opacity-50">
            {crawling ? 'Crawling…' : 'Extract & auto-fill'}
          </button>
        </div>
      </section>

      {/* ── 2. Creative ── */}
      <section className="space-y-4 rounded-2xl border border-border p-4">
        <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">2 · Creative & links</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Brand / partner" htmlFor="promo-brand"><input id="promo-brand" required maxLength={120} value={draft.brandName} onChange={(e) => update('brandName', e.target.value)} placeholder="e.g. Acme Analytics" className={inputClass} /></Field>
          <Field label="Campaign ID (optional)" htmlFor="promo-campaign" hint="Groups several promotions in analytics."><input id="promo-campaign" maxLength={120} value={draft.campaignId} onChange={(e) => update('campaignId', e.target.value)} placeholder="e.g. ACME_Q4_2026" className={inputClass} /></Field>
        </div>
        <Field label="Headline" htmlFor="promo-title"><input id="promo-title" required minLength={3} maxLength={180} value={draft.title} onChange={(e) => update('title', e.target.value)} placeholder="e.g. Institutional financial modelling toolkit" className={inputClass} /></Field>
        <Field label="Short description" htmlFor="promo-description"><textarea id="promo-description" required minLength={10} maxLength={500} rows={3} value={draft.shortDescription} onChange={(e) => update('shortDescription', e.target.value)} placeholder="Two or three lines that explain the value for finance readers." className={textAreaClass} /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="CTA button text" htmlFor="promo-cta"><input id="promo-cta" required maxLength={60} value={draft.ctaText} onChange={(e) => update('ctaText', e.target.value)} placeholder="e.g. Start free trial" className={inputClass} /></Field>
          <Field label="Category" htmlFor="promo-category"><input id="promo-category" required maxLength={80} value={draft.category} onChange={(e) => update('category', e.target.value)} placeholder="e.g. SaaS / Education / Broker" className={inputClass} /></Field>
        </div>
        <Field label="Destination URL" htmlFor="promo-destination" hint="The landing page (http/https).">
          <div className="flex gap-2">
            <input id="promo-destination" type="url" required maxLength={2048} value={draft.destinationUrl} onChange={(e) => update('destinationUrl', e.target.value)} placeholder="https://partner.example.com/landing" className={inputClass} />
            <button type="button" disabled={crawling} onClick={() => void handleCrawlWebsite(draft.destinationUrl)} className="mt-1.5 shrink-0 rounded-xl border border-teal-500/40 bg-teal-500/10 px-3 py-2 text-xs font-bold text-teal-700 transition-colors hover:bg-teal-500/20 disabled:opacity-50 dark:text-teal-300">{crawling ? 'Crawling…' : 'Crawl'}</button>
          </div>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Affiliate URL (optional)" htmlFor="promo-affiliate" hint="Used instead of the destination when present."><input id="promo-affiliate" type="url" value={draft.affiliateUrl} onChange={(e) => update('affiliateUrl', e.target.value)} placeholder="https://partner.link/…" className={inputClass} /></Field>
          <Field label="Tracking URL (optional)" htmlFor="promo-tracking" hint="Highest precedence: tracking → affiliate → destination."><input id="promo-tracking" type="url" value={draft.trackingUrl} onChange={(e) => update('trackingUrl', e.target.value)} placeholder="https://click.track/…" className={inputClass} /></Field>
        </div>
        <Field label="UTM parameters (JSON object)" htmlFor="promo-utm" hint="Appended only when the link does not already carry the key — never double-appended.">
          <textarea id="promo-utm" rows={2} value={draft.utmText} onChange={(e) => update('utmText', e.target.value)} className={`${textAreaClass} min-h-16 font-mono text-xs`} spellCheck={false} />
        </Field>
        {resolvedHref && <p className="truncate text-[11px] text-muted-foreground">Visitors will be sent to: <span className="font-mono text-foreground" title={resolvedHref}>{resolvedHref}</span></p>}

        <div className="space-y-3 rounded-xl border border-border p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-foreground">Media</p>
              <p className="text-xs text-muted-foreground">Image or looping video. Add a dark-mode creative when the light one has a white background; the light creative is the fallback.</p>
            </div>
            {draft.destinationUrl && (
              <button type="button" onClick={() => { setCreative(`https://s0.wp.com/mshots/v1/${encodeURIComponent(draft.destinationUrl.trim())}?w=1280`); setNotice({ kind: 'info', text: 'Creative set to a live snapshot of the landing page.' }); }} className="rounded-lg border border-teal-500/40 bg-teal-500/10 px-3 py-1 text-xs font-bold text-teal-700 transition-colors hover:bg-teal-500/20 dark:text-teal-300">Use live page snapshot</button>
            )}
          </div>
          {crawledData?.extractedImages && crawledData.extractedImages.length > 0 && (
            <div className="space-y-1.5 rounded-lg bg-muted/40 p-2">
              <p className="text-[11px] font-semibold text-muted-foreground">Images found on the page (click to use):</p>
              <div className="flex flex-wrap gap-2">
                {crawledData.liveScreenshotUrl && <button type="button" onClick={() => setCreative(crawledData.liveScreenshotUrl!)} className="rounded-lg border border-teal-500/50 bg-teal-500/15 px-2.5 py-1 text-xs font-bold text-teal-700 hover:bg-teal-500/25 dark:text-teal-300">Live snapshot</button>}
                {crawledData.extractedImages.map((imgUrl, idx) => (
                  <button key={imgUrl} type="button" onClick={() => setCreative(imgUrl)} className="flex max-w-[140px] items-center gap-1 truncate rounded-lg border border-border bg-background px-2 py-1 text-[11px] text-foreground transition-colors hover:border-primary" title={imgUrl}>
                    <img src={imgUrl} alt="" className="h-4 w-4 shrink-0 rounded object-cover" />
                    <span className="truncate">Image {idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Image / banner URL" htmlFor="promo-image"><input id="promo-image" type="url" value={draft.imageUrl} onChange={(e) => update('imageUrl', e.target.value)} placeholder="https://…/banner.png" className={inputClass} /></Field>
            <Field label="Video URL (MP4 / WebM)" htmlFor="promo-video"><input id="promo-video" type="url" value={draft.videoUrl} onChange={(e) => update('videoUrl', e.target.value)} placeholder="https://…/creative.mp4" className={inputClass} /></Field>
            <Field label="Light-mode creative (optional)" htmlFor="promo-light"><input id="promo-light" type="url" value={draft.lightCreativeUrl} onChange={(e) => update('lightCreativeUrl', e.target.value)} placeholder="Defaults to the banner" className={inputClass} /></Field>
            <Field label="Dark-mode creative (optional)" htmlFor="promo-dark"><input id="promo-dark" type="url" value={draft.darkCreativeUrl} onChange={(e) => update('darkCreativeUrl', e.target.value)} placeholder="Defaults to the light creative" className={inputClass} /></Field>
            <Field label="Brand logo URL (optional)" htmlFor="promo-logo"><input id="promo-logo" type="url" value={draft.logoUrl} onChange={(e) => update('logoUrl', e.target.value)} placeholder="https://…/logo.png" className={inputClass} /></Field>
            <Field label="Disclosure label" htmlFor="promo-disclosure" hint="Always shown on the card; links carry rel=sponsored nofollow."><input id="promo-disclosure" required minLength={6} maxLength={120} value={draft.disclosureText} onChange={(e) => update('disclosureText', e.target.value)} className={inputClass} /></Field>
          </div>
        </div>
      </section>

      {/* ── 3. Placements ── */}
      <section className="space-y-3 rounded-2xl border border-border p-4">
        <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">3 · Placements (slots)</p>
        <PlacementSelector placements={draft.placements} onChange={(placements) => update('placements', placements)} showWeights={draft.rotationMode === 'WEIGHTED'} />
      </section>

      {/* ── 4. Targeting ── */}
      <section className="space-y-3 rounded-2xl border border-border p-4">
        <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">4 · Pages</p>
        <p className="text-xs leading-5 text-muted-foreground">Precedence when several promotions compete: exclusions always win → exact page → specific content → section/page type/tag → Global. Within a tier, higher priority wins and ties rotate.</p>
        <PageTargetSelector rules={draft.targets} onChange={(targets) => update('targets', targets)} />
        <TargetingPreview targets={draft.targets} placements={draft.placements} />
      </section>

      {/* ── 5. Delivery ── */}
      <section className="space-y-4 rounded-2xl border border-border p-4">
        <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">5 · Schedule, priority & audience</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Start (optional)" htmlFor="promo-start" hint="Server time; empty = immediately."><input id="promo-start" type="datetime-local" value={draft.startsAtLocal} onChange={(e) => update('startsAtLocal', e.target.value)} className={inputClass} /></Field>
          <Field label="End (optional)" htmlFor="promo-end" hint="Empty = no end date."><input id="promo-end" type="datetime-local" value={draft.endsAtLocal} onChange={(e) => update('endsAtLocal', e.target.value)} className={inputClass} /></Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Priority" htmlFor="promo-priority" hint="Higher shows first within the same match tier (−100…1000)."><input id="promo-priority" type="number" min={-100} max={1000} value={draft.priority} onChange={(e) => update('priority', Number(e.target.value))} className={inputClass} /></Field>
          <Field label="Rotation" htmlFor="promo-rotation" hint={ROTATION_MODE_META[draft.rotationMode].description}>
            <select id="promo-rotation" value={draft.rotationMode} onChange={(e) => update('rotationMode', e.target.value as RotationMode)} className={inputClass}>
              {ROTATION_MODES.map((mode) => <option key={mode} value={mode}>{ROTATION_MODE_META[mode].label}</option>)}
            </select>
          </Field>
          <Field label="Frequency cap" htmlFor="promo-cap" hint="Max views per visitor per 24 h (first-party, no cookies). Empty = unlimited.">
            <input id="promo-cap" type="number" min={1} max={100} value={draft.frequencyCap ?? ''} onChange={(e) => update('frequencyCap', e.target.value ? Number(e.target.value) : null)} placeholder="Unlimited" className={inputClass} />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-4">
          <Toggle id="promo-mobile" label="Mobile" checked={draft.mobileVisible} onChange={(value) => update('mobileVisible', value)} hint="< 768 px" />
          <Toggle id="promo-tablet" label="Tablet" checked={draft.tabletVisible} onChange={(value) => update('tabletVisible', value)} hint="768–1023 px" />
          <Toggle id="promo-desktop" label="Desktop" checked={draft.desktopVisible} onChange={(value) => update('desktopVisible', value)} hint="≥ 1024 px" />
          <Field label="Theme" htmlFor="promo-theme">
            <select id="promo-theme" value={draft.themeMode} onChange={(e) => update('themeMode', e.target.value as ThemeMode)} className={inputClass}>
              {THEME_MODES.map((mode) => <option key={mode} value={mode}>{THEME_LABELS[mode]}</option>)}
            </select>
          </Field>
        </div>
        <Toggle id="promo-active" label="Active" checked={draft.active} onChange={(value) => update('active', value)} hint="Inactive promotions never render, regardless of schedule or targeting." />
      </section>

      {/* ── 6. Preview ── */}
      <section className="space-y-2">
        <button type="button" onClick={() => setPreviewOpen((open) => !open)} aria-expanded={previewOpen} className="text-xs font-black uppercase tracking-wider text-muted-foreground hover:text-foreground">{previewOpen ? '▾' : '▸'} 6 · Preview</button>
        {previewOpen && <PromotionPreview draft={draft} placements={draft.placements} />}
      </section>

      <div className="sticky bottom-0 -mx-1 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card/95 p-3 backdrop-blur">
        <button type="submit" disabled={saving} className={primaryButtonClass}>{saving ? 'Saving…' : draft.id ? 'Save changes' : 'Create promotion'}</button>
        <button type="button" onClick={reset} className={buttonClass}>Cancel</button>
        <span className="text-xs text-muted-foreground">{draft.targets.filter((rule) => rule.mode === 'INCLUDE').length} include rule(s) · {draft.placements.length} placement(s)</span>
        {draft.id && <button type="button" onClick={() => void onDelete(draft.id!, draft.brandName)} className={`${dangerButtonClass} ml-auto`}>Delete permanently</button>}
      </div>
    </form>
  );
}
