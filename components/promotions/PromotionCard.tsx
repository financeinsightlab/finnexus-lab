'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronUp, Flame, Minus } from 'lucide-react';
import PromotionLink from '@/components/promotions/PromotionLink';
import { sendPromotionEvent } from '@/components/promotions/beacon';
import {
  deviceVisibilityClass,
  isFrequencyCapped,
  pickCreative,
  recordFrequencyView,
  themeVisibilityClass,
} from '@/lib/promotions/display';

export type PromotionCardData = {
  id: string;
  slot?: string | null;
  brandName: string;
  title: string;
  shortDescription: string;
  logoUrl: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  lightCreativeUrl: string | null;
  darkCreativeUrl: string | null;
  ctaText: string;
  disclosureType: string;
  disclosureText: string;
  href: string;
  mobileVisible: boolean;
  tabletVisible?: boolean | null;
  desktopVisible: boolean;
  themeMode?: string | null;
  frequencyCap?: number | null;
};

const CTA_CLASS =
  'promo-cta-glow relative overflow-hidden group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400';

function Shimmer() {
  return (
    <span
      aria-hidden="true"
      className="promo-cta-shimmer pointer-events-none absolute inset-0 -top-2 -bottom-2 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
    />
  );
}

/**
 * Promotion card used by every server-rendered slot.
 *
 * - Device/theme targeting is applied with CSS wrappers (no UA sniffing), so
 *   the same cached HTML is correct for every visitor.
 * - Impressions are recorded once the card is 20 % visible; preview mode never
 *   sends beacons and ignores device/theme visibility so admins can inspect it.
 * - Frequency caps are enforced with first-party localStorage counters.
 * - Broken creatives fall back to the text layout instead of a broken image.
 */
export default function PromotionCard({
  promotion,
  path,
  variant = 'inline',
  preview = false,
  className = '',
}: {
  promotion: PromotionCardData;
  path: string;
  /** inline = full-width card; sidebar = compact widget */
  variant?: 'inline' | 'sidebar';
  /** Admin preview: no tracking, no frequency capping, no visibility classes. */
  preview?: boolean;
  className?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tracked = useRef(false);
  const [entered, setEntered] = useState(preview);
  const [minimized, setMinimized] = useState(false);
  const [capped, setCapped] = useState(false);
  const [mediaFailed, setMediaFailed] = useState(false);
  const slot = promotion.slot ?? null;

  // Frequency cap (first-party, per browser, 24 h window).
  useEffect(() => {
    if (preview) return;
    setCapped(isFrequencyCapped(promotion.id, promotion.frequencyCap));
  }, [preview, promotion.id, promotion.frequencyCap]);

  // Impression tracking + entrance animation.
  useEffect(() => {
    const element = root.current;
    if (!element || capped) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setEntered(true);
        if (tracked.current || preview) return;
        tracked.current = true;
        sendPromotionEvent({ promotionId: promotion.id, eventType: 'IMPRESSION', path, slot });
        if (promotion.frequencyCap) recordFrequencyView(promotion.id);
      },
      { threshold: 0.2 },
    );
    io.observe(element);
    return () => io.disconnect();
  }, [capped, path, preview, promotion.frequencyCap, promotion.id, slot]);

  // Auto-play/pause video on visibility.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.5 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [mediaFailed, minimized]);

  const deviceClass = deviceVisibilityClass(promotion);
  if (deviceClass === null && !preview) return null;
  if (capped) return null;

  const themeClass = themeVisibilityClass(promotion.themeMode);
  const disclosure = promotion.disclosureText.trim() || promotion.disclosureType || 'Sponsored';
  const creative = mediaFailed ? { video: null, light: null, dark: null } : pickCreative(promotion);
  const hasMedia = !!(creative.video || creative.light);
  const animClass = entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0';
  const dataAttributes = {
    'data-promotion-id': promotion.id,
    'data-promotion-slot': slot ?? undefined,
    'data-promotion-preview': preview ? 'true' : undefined,
  };

  const media = creative.video ? (
    <video
      ref={videoRef}
      src={creative.video}
      muted
      loop
      playsInline
      preload="none"
      onError={() => setMediaFailed(true)}
      className="h-full w-full object-cover"
    />
  ) : creative.light ? (
    creative.dark && creative.dark !== creative.light ? (
      <>
        <img src={creative.light} alt={`${promotion.brandName} creative`} loading="lazy" decoding="async" onError={() => setMediaFailed(true)} className="promo-crawl h-full w-full object-cover dark:hidden" />
        <img src={creative.dark} alt={`${promotion.brandName} creative`} loading="lazy" decoding="async" onError={() => setMediaFailed(true)} className="promo-crawl hidden h-full w-full object-cover dark:block" />
      </>
    ) : (
      <img src={creative.light} alt={`${promotion.brandName} creative`} loading="lazy" decoding="async" onError={() => setMediaFailed(true)} className="promo-crawl h-full w-full object-cover" />
    )
  ) : null;

  const logo = promotion.logoUrl ? (
    <img src={promotion.logoUrl} alt={`${promotion.brandName} logo`} loading="lazy" decoding="async" className="h-14 w-14 rounded-xl object-contain" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
  ) : null;

  const minimizeButton = (
    <button
      type="button"
      onClick={() => setMinimized(true)}
      title="Minimize card"
      aria-label="Minimize promotion"
      className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-lg border border-border/80 bg-background/90 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-muted hover:text-foreground"
    >
      <Minus className="h-3.5 w-3.5" />
    </button>
  );

  let body: React.ReactNode;
  if (minimized) {
    body = (
      <aside ref={root} className={`promotion-card-minimized w-full ${animClass} transition-all duration-300`} aria-label={`Sponsored content from ${promotion.brandName}`} {...dataAttributes}>
        <div
          onClick={() => setMinimized(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setMinimized(false);
            }
          }}
          title="Click to expand partner promotion"
          className="group flex cursor-pointer flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-teal-500/40 bg-card/95 px-4 py-2 shadow-md backdrop-blur-md transition-all hover:border-teal-400 hover:shadow-lg dark:border-teal-400/30"
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <Flame className="h-4 w-4 shrink-0 text-amber-400" />
            <span className="truncate text-xs font-black tracking-tight text-foreground">{promotion.brandName}</span>
            <span className="rounded-md bg-teal-500/15 px-2 py-0.5 text-[9px] font-bold text-teal-600 dark:text-teal-400">{disclosure}</span>
            <span className="hidden max-w-md truncate text-xs text-muted-foreground md:inline">— {promotion.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`${CTA_CLASS} px-3 py-1 text-xs`}>
              <span>{promotion.ctaText}</span>
              <span aria-hidden="true">→</span>
            </span>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setMinimized(false);
              }}
              title="Expand promotion"
              aria-label="Expand promotion"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </aside>
    );
  } else if (variant === 'sidebar') {
    body = (
      <aside ref={root} className={`promotion-sidebar-card ${animClass} transition-all duration-500 ease-out`} aria-label={`Sponsored content from ${promotion.brandName}`} {...dataAttributes}>
        <div className="relative overflow-hidden rounded-2xl border-2 border-teal-500/30 bg-card shadow-lg transition-all hover:border-teal-500/60">
          <div className="pointer-events-none absolute left-2.5 right-2.5 top-2.5 z-10 flex items-center justify-between">
            <span className="pointer-events-auto rounded-full border border-teal-500/30 bg-background/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-600 backdrop-blur-sm dark:text-teal-400">
              {disclosure}
            </span>
            {minimizeButton}
          </div>
          {media && <div className="relative aspect-video w-full overflow-hidden bg-muted">{media}</div>}
          <div className="space-y-3 p-4">
            <div className="flex items-start gap-2">
              {!hasMedia && promotion.logoUrl && (
                <img src={promotion.logoUrl} alt={`${promotion.brandName} logo`} loading="lazy" decoding="async" className="h-8 w-8 shrink-0 rounded-lg object-contain" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">{promotion.brandName}</p>
                <p className="mt-0.5 text-sm font-bold leading-snug text-foreground">{promotion.title}</p>
              </div>
            </div>
            <p className="line-clamp-3 text-xs leading-5 text-muted-foreground">{promotion.shortDescription}</p>
            <PromotionLink promotionId={promotion.id} path={path} slot={slot} href={promotion.href} preview={preview} className={`${CTA_CLASS} flex w-full px-4 py-2.5 text-xs`}>
              <Shimmer />
              <Flame className="h-3 w-3 text-amber-300" />
              <span className="relative z-10">{promotion.ctaText}</span>
              <span aria-hidden="true" className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
            </PromotionLink>
          </div>
        </div>
      </aside>
    );
  } else {
    const cta = (
      <PromotionLink promotionId={promotion.id} path={path} slot={slot} href={promotion.href} preview={preview} className={`${CTA_CLASS} min-h-11 px-6 py-2.5 text-sm`}>
        <Shimmer />
        <Flame className="h-4 w-4 text-amber-300" />
        <span className="relative z-10">{promotion.ctaText}</span>
        <span aria-hidden="true" className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
      </PromotionLink>
    );
    body = (
      <aside ref={root} className={`promotion-card w-full ${animClass} transition-all duration-500 ease-out`} aria-label={`Sponsored content from ${promotion.brandName}`} {...dataAttributes}>
        <div className="group relative overflow-hidden rounded-2xl border-2 border-teal-500/30 bg-card shadow-sm transition-all hover:border-teal-500/50 hover:shadow-lg">
          <div className="pointer-events-none absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
            <span className="pointer-events-auto rounded-full border border-teal-500/30 bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-600 backdrop-blur-sm dark:text-teal-400">
              {disclosure} · {promotion.brandName}
            </span>
            {minimizeButton}
          </div>
          {media ? (
            <div className="grid md:grid-cols-[minmax(280px,0.5fr)_minmax(0,1fr)]">
              <div className="relative aspect-[16/9] overflow-hidden bg-muted md:aspect-auto md:min-h-48">{media}</div>
              <div className="flex flex-col justify-center gap-4 p-6 pt-12 md:pt-6">
                <div>
                  <h2 className="text-xl font-extrabold text-foreground">{promotion.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{promotion.shortDescription}</p>
                </div>
                <div className="self-start">{cta}</div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 p-6 pt-14 sm:flex-row sm:items-center sm:pt-6">
              {logo && <div className="shrink-0">{logo}</div>}
              <div className="min-w-0 flex-1 sm:pt-6">
                <h2 className="text-lg font-bold text-foreground">{promotion.title}</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{promotion.shortDescription}</p>
              </div>
              <div className="shrink-0">{cta}</div>
            </div>
          )}
        </div>
      </aside>
    );
  }

  if (preview) return <div className={className}>{body}</div>;
  return (
    <div className={`${deviceClass ?? ''} ${className}`.trim() || undefined} data-promotion-device-wrapper="">
      <div className={themeClass || undefined} data-promotion-theme-wrapper="">
        {body}
      </div>
    </div>
  );
}
