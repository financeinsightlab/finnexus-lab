'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import PromotionCard, { type PromotionCardData } from '@/components/promotions/PromotionCard';
import { SLOT_META, isPromotionSlot, type PromotionSlot } from '@/lib/promotions/catalog';
import { getPromotionHref } from '@/lib/promotions/href';
import type { PlacementRuleDraft, PromotionDraft } from './types';

type Theme = 'light' | 'dark';
type DeviceSize = 'mobile' | 'tablet' | 'desktop';

const DEVICE_WIDTHS: Record<DeviceSize, number | null> = { mobile: 375, tablet: 768, desktop: null };

/**
 * Same-origin iframe that reuses the page's stylesheets. Each frame has its own
 * <html> element, so light and dark can be forced independently of the admin's
 * theme, and the frame width drives the responsive breakpoints — a faithful
 * preview without a second rendering pipeline.
 */
function PreviewFrame({ theme, width, title, children }: { theme: Theme; width: number | null; title: string; children: ReactNode }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [height, setHeight] = useState(160);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    let observer: ResizeObserver | null = null;

    const setup = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      doc.open();
      doc.write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body></body></html>');
      doc.close();
      // Reuse every stylesheet the admin page already loaded (Tailwind + globals + fonts).
      document.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => doc.head.appendChild(node.cloneNode(true)));
      const base = doc.createElement('base');
      base.target = '_blank';
      doc.head.appendChild(base);
      const htmlClasses = document.documentElement.className.split(/\s+/).filter((token) => token && token !== 'dark' && token !== 'light');
      doc.documentElement.className = htmlClasses.join(' ');
      doc.body.className = `${document.body.className} !min-h-0 overflow-hidden`;
      doc.body.style.padding = '12px';
      doc.body.style.background = 'transparent';
      const root = doc.createElement('div');
      root.id = 'preview-root';
      doc.body.appendChild(root);
      observer = new ResizeObserver(() => setHeight(Math.max(96, Math.ceil(doc.body.scrollHeight))));
      observer.observe(doc.body);
      setMountNode(root);
    };

    if (iframe.contentDocument?.readyState === 'complete') setup();
    else iframe.addEventListener('load', setup, { once: true });
    return () => {
      observer?.disconnect();
      iframe.removeEventListener('load', setup);
    };
  }, []);

  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;
    doc.documentElement.classList.toggle('dark', theme === 'dark');
    doc.documentElement.style.colorScheme = theme;
    doc.body.style.background = theme === 'dark' ? '#0a1120' : '#faf9f6';
  }, [theme, mountNode]);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      aria-label={title}
      className="block rounded-xl border border-border bg-transparent"
      style={{ width: width ? `${width}px` : '100%', maxWidth: '100%', height: `${height}px` }}
    >
      {mountNode ? createPortal(children, mountNode) : null}
    </iframe>
  );
}

export function draftToCardData(draft: PromotionDraft, slot: PromotionSlot | null): PromotionCardData {
  let utmParameters: unknown = null;
  try {
    utmParameters = draft.utmText.trim() ? JSON.parse(draft.utmText) : null;
  } catch {
    utmParameters = null;
  }
  return {
    id: draft.id ?? 'preview',
    slot,
    brandName: draft.brandName || 'Partner brand',
    title: draft.title || 'Promotion headline',
    shortDescription: draft.shortDescription || 'Short description of the offer appears here.',
    logoUrl: draft.logoUrl.trim() || null,
    imageUrl: draft.imageUrl.trim() || null,
    videoUrl: draft.videoUrl.trim() || null,
    lightCreativeUrl: draft.lightCreativeUrl.trim() || null,
    darkCreativeUrl: draft.darkCreativeUrl.trim() || null,
    ctaText: draft.ctaText || 'Learn more',
    disclosureType: draft.disclosureType,
    disclosureText: draft.disclosureText,
    href: getPromotionHref({ destinationUrl: draft.destinationUrl || 'https://example.com', affiliateUrl: draft.affiliateUrl || null, trackingUrl: draft.trackingUrl || null, utmParameters }),
    mobileVisible: draft.mobileVisible,
    tabletVisible: draft.tabletVisible,
    desktopVisible: draft.desktopVisible,
    themeMode: draft.themeMode,
    frequencyCap: draft.frequencyCap,
  };
}

/**
 * Promotion preview: light + dark side by side, switchable device width and
 * placement. Rendered with `preview` so no impression or click is recorded.
 */
export default function PromotionPreview({ draft, placements }: { draft: PromotionDraft; placements: PlacementRuleDraft[] }) {
  const slots = placements.map((rule) => rule.slot).filter(isPromotionSlot);
  const [slot, setSlot] = useState<PromotionSlot | null>(slots[0] ?? null);
  const [device, setDevice] = useState<DeviceSize>('desktop');
  const [themes, setThemes] = useState<Theme[]>(['light', 'dark']);

  useEffect(() => {
    if (slot && slots.includes(slot)) return;
    setSlot(slots[0] ?? null);
  }, [slots, slot]);

  const card = useMemo(() => draftToCardData(draft, slot), [draft, slot]);
  const variant = slot && SLOT_META[slot].variant === 'sidebar' ? 'sidebar' : 'inline';
  const samplePath = slot ? samplePathForSlot(slot) : '/';
  const themeNote = draft.themeMode === 'LIGHT' ? 'Light-theme only: hidden for dark-mode visitors.' : draft.themeMode === 'DARK' ? 'Dark-theme only: hidden for light-mode visitors.' : null;
  const deviceNote = [!draft.mobileVisible && 'mobile', !draft.tabletVisible && 'tablet', !draft.desktopVisible && 'desktop'].filter(Boolean) as string[];

  return (
    <div className="space-y-3 rounded-xl border border-primary/30 bg-primary/5 p-3" data-testid="promotion-preview">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">Promotion preview <span className="font-normal normal-case text-muted-foreground">(not counted as an impression)</span></p>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <label className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Placement</span>
            <select value={slot ?? ''} onChange={(event) => setSlot(isPromotionSlot(event.target.value) ? event.target.value : null)} className="h-8 rounded-lg border border-border bg-background px-2 text-xs text-foreground" aria-label="Preview placement">
              {slots.length === 0 && <option value="">Choose a placement first</option>}
              {slots.map((key) => <option key={key} value={key}>{SLOT_META[key].label}</option>)}
            </select>
          </label>
          <div role="radiogroup" aria-label="Preview device" className="inline-flex rounded-lg border border-border p-0.5">
            {(['mobile', 'tablet', 'desktop'] as DeviceSize[]).map((value) => (
              <button key={value} type="button" role="radio" aria-checked={device === value} onClick={() => setDevice(value)} className={`rounded-md px-2 py-1 capitalize ${device === value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{value}</button>
            ))}
          </div>
          <div role="group" aria-label="Preview themes" className="inline-flex rounded-lg border border-border p-0.5">
            {(['light', 'dark'] as Theme[]).map((value) => (
              <button key={value} type="button" aria-pressed={themes.includes(value)} onClick={() => setThemes((current) => (current.includes(value) ? (current.length > 1 ? current.filter((entry) => entry !== value) : current) : [...current, value]))} className={`rounded-md px-2 py-1 capitalize ${themes.includes(value) ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}>{value}</button>
            ))}
          </div>
        </div>
      </div>
      {(themeNote || deviceNote.length > 0) && (
        <p className="text-[11px] text-muted-foreground">
          {themeNote} {deviceNote.length > 0 && `Hidden on ${deviceNote.join(' and ')} devices.`} The preview ignores these so you can still inspect the creative.
        </p>
      )}
      <div className={`grid gap-3 ${themes.length > 1 && device !== 'desktop' ? 'md:grid-cols-2' : ''}`}>
        {themes.map((theme) => (
          <div key={theme} className="min-w-0 overflow-x-auto">
            <p className="mb-1 text-[11px] font-semibold capitalize text-muted-foreground">{theme} · {device}{slot ? ` · ${SLOT_META[slot].label}` : ''}</p>
            <PreviewFrame theme={theme} width={DEVICE_WIDTHS[device]} title={`${theme} ${device} preview`}>
              <div className={variant === 'sidebar' ? 'mx-auto max-w-[300px]' : 'mx-auto w-full'}>
                <PromotionCard key={`${theme}-${device}-${slot ?? 'none'}`} promotion={card} path={samplePath} variant={variant} preview className="w-full" />
              </div>
            </PreviewFrame>
          </div>
        ))}
      </div>
    </div>
  );
}

function samplePathForSlot(slot: PromotionSlot): string {
  const meta = SLOT_META[slot];
  if (meta.pageTypes === 'ALL_PUBLIC') return '/';
  const first = meta.pageTypes[0];
  switch (first) {
    case 'HOME':
      return '/';
    case 'RESEARCH':
      return '/research/example-report';
    case 'INSIGHT':
      return '/insights/example-article';
    case 'TOOL':
      return '/tools';
    case 'CALCULATOR':
      return '/tools/dcf-valuation';
    case 'FINANCE_TERM':
      return '/finance-terms/example-term';
    case 'COURSE':
      return '/pgdm/example-subject';
    case 'STUDY':
      return '/study/example-course';
    case 'PRICING':
      return '/pricing';
    case 'DASHBOARD':
      return '/dashboard';
    default:
      return '/';
  }
}
