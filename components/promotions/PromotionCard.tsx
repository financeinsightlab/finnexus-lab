'use client';

import { useEffect, useRef, useState } from 'react';
import PromotionLink from '@/components/promotions/PromotionLink';
import { Flame, Minus, ChevronUp } from 'lucide-react';

export type PromotionCardData = {
  id: string;
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
  desktopVisible: boolean;
};

/** Determines if a URL is a hosted video (mp4, webm, ogg) */
function isVideoUrl(url: string | null): url is string {
  if (!url) return false;
  try {
    const u = new URL(url);
    return /\.(mp4|webm|ogg)(\?.*)?$/i.test(u.pathname);
  } catch {
    return false;
  }
}

export default function PromotionCard({
  promotion,
  path,
  variant = 'inline',
}: {
  promotion: PromotionCardData;
  path: string;
  /** inline = full-width card; sidebar = compact sticky widget */
  variant?: 'inline' | 'sidebar';
}) {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tracked = useRef(false);
  const [entered, setEntered] = useState(false);
  const [minimized, setMinimized] = useState(false);

  // Intersection Observer for impression tracking + entrance animation
  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setEntered(true);
          if (!tracked.current) {
            tracked.current = true;
            const payload = JSON.stringify({ promotionId: promotion.id, eventType: 'IMPRESSION', path });
            if (navigator.sendBeacon) {
              navigator.sendBeacon('/api/promotions/event', new Blob([payload], { type: 'application/json' }));
            } else {
              fetch('/api/promotions/event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: payload,
                keepalive: true,
              }).catch(() => undefined);
            }
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(element);
    return () => io.disconnect();
  }, [path, promotion.id]);

  // Auto-play/pause video on visibility
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
  }, []);

  if (!promotion.mobileVisible && !promotion.desktopVisible) return null;

  const visibilityClass = !promotion.mobileVisible
    ? 'hidden md:block'
    : !promotion.desktopVisible
      ? 'md:hidden'
      : '';

  const disclosure = promotion.disclosureText.trim() || promotion.disclosureType || 'Sponsored';

  // Determine media type
  const videoSrc =
    isVideoUrl(promotion.videoUrl) ? promotion.videoUrl
    : isVideoUrl(promotion.imageUrl) ? promotion.imageUrl
    : null;

  const imageSrc = !videoSrc
    ? (promotion.lightCreativeUrl || promotion.imageUrl || promotion.logoUrl)
    : null;
  const imageSrcDark = !videoSrc ? (promotion.darkCreativeUrl || imageSrc) : null;
  const hasMedia = !!(videoSrc || imageSrc);

  // Animation classes
  const animClass = entered
    ? 'translate-y-0 opacity-100'
    : 'translate-y-4 opacity-0';

  return (
    <>
      <style>{`
        @keyframes card-cta-glow {
          0%, 100% {
            box-shadow: 0 0 14px rgba(13, 148, 136, 0.4), 0 0 28px rgba(6, 182, 212, 0.2);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 22px rgba(13, 148, 136, 0.75), 0 0 44px rgba(6, 182, 212, 0.4);
            transform: scale(1.02);
          }
        }
        @keyframes card-cta-shimmer {
          0% {
            transform: translateX(-150%) skewX(-20deg);
          }
          30%, 100% {
            transform: translateX(250%) skewX(-20deg);
          }
        }
        @keyframes promo-crawl-slow {
          0%, 15% {
            transform: translateY(0%);
          }
          48%, 68% {
            transform: translateY(-35%);
          }
          92%, 100% {
            transform: translateY(0%);
          }
        }
        .animate-card-cta-glow {
          animation: card-cta-glow 2.5s ease-in-out infinite;
        }
        .animate-card-cta-shimmer {
          animation: card-cta-shimmer 3s ease-in-out infinite;
        }
        .animate-slow-crawl {
          animation: promo-crawl-slow 14s ease-in-out infinite;
          transform-origin: center top;
          will-change: transform;
        }
      `}</style>

      {minimized ? (
        <aside
          ref={root}
          className={`promotion-card-minimized mx-auto w-full max-w-5xl px-4 py-2 sm:px-6 ${visibilityClass} ${animClass} transition-all duration-300`}
          aria-label={`${disclosure} promotion`}
          data-promotion-id={promotion.id}
        >
          <div
            onClick={() => setMinimized(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setMinimized(false);
              }
            }}
            title="Click to expand partner promotion"
            className="group flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-teal-500/40 bg-card/95 py-2 px-4 shadow-md backdrop-blur-md dark:border-teal-400/30 hover:border-teal-400 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <Flame className="h-4 w-4 text-amber-400 animate-bounce" />
              {promotion.logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={promotion.logoUrl} alt="" className="h-5 w-5 rounded object-contain" />
              )}
              <span className="text-xs font-black tracking-tight text-foreground">
                {promotion.brandName}
              </span>
              <span className="rounded-md bg-teal-500/15 px-2 py-0.5 text-[9px] font-bold text-teal-600 dark:text-teal-400">
                {disclosure}
              </span>
              <span className="hidden md:inline text-xs text-muted-foreground truncate max-w-md">
                — {promotion.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="animate-card-cta-glow inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 px-3 py-1 text-xs font-bold text-white shadow-sm">
                <span>{promotion.ctaText}</span>
                <span aria-hidden="true">→</span>
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMinimized(false);
                }}
                title="Expand promotion"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </aside>
      ) : variant === 'sidebar' ? (
        <aside
          ref={root}
          className={`promotion-sidebar-card ${visibilityClass} ${animClass} transition-all duration-500 ease-out`}
          aria-label={`${disclosure} promotion`}
          data-promotion-id={promotion.id}
        >
          <div className="relative overflow-hidden rounded-2xl border-2 border-teal-500/30 bg-card shadow-lg hover:border-teal-500/60 transition-all">
            {/* Disclosure badge + Minimize button */}
            <div className="absolute left-2.5 top-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
              <span className="rounded-full border border-teal-500/30 bg-background/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 backdrop-blur-sm pointer-events-auto">
                {disclosure}
              </span>
              <button
                type="button"
                onClick={() => setMinimized(true)}
                title="Minimize card"
                aria-label="Minimize promotion"
                className="pointer-events-auto flex h-6 w-6 items-center justify-center rounded-lg border border-border/80 bg-background/90 text-muted-foreground hover:bg-muted hover:text-foreground backdrop-blur-sm transition-colors shadow-sm"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Media */}
            {videoSrc && (
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <video
                  ref={videoRef}
                  src={videoSrc}
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            {!videoSrc && imageSrc && (
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                {imageSrcDark && imageSrcDark !== imageSrc ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageSrc}
                      alt={`${promotion.brandName} promotion`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover dark:hidden animate-slow-crawl"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageSrcDark}
                      alt={`${promotion.brandName} promotion`}
                      loading="lazy"
                      decoding="async"
                      className="hidden h-full w-full object-cover dark:block animate-slow-crawl"
                    />
                  </>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={imageSrc}
                    alt={`${promotion.brandName} promotion`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover animate-slow-crawl"
                  />
                )}
              </div>
            )}

            {/* Text body */}
            <div className="space-y-3 p-4">
              <div className="flex items-start gap-2">
                {promotion.logoUrl && !hasMedia && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={promotion.logoUrl}
                    alt={`${promotion.brandName} logo`}
                    loading="lazy"
                    decoding="async"
                    className="h-8 w-8 shrink-0 rounded-lg object-contain"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                    {promotion.brandName}
                  </p>
                  <p className="mt-0.5 text-sm font-bold leading-snug text-foreground">
                    {promotion.title}
                  </p>
                </div>
              </div>
              <p className="line-clamp-3 text-xs leading-5 text-muted-foreground">
                {promotion.shortDescription}
              </p>
              <PromotionLink
                promotionId={promotion.id}
                path={path}
                href={promotion.href}
                className="animate-card-cta-glow relative overflow-hidden group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 via-teal-700 to-cyan-700 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <span
                  aria-hidden="true"
                  className="animate-card-cta-shimmer pointer-events-none absolute inset-0 -top-2 -bottom-2 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
                <Flame className="h-3 w-3 text-amber-300 animate-bounce" />
                <span className="relative z-10">{promotion.ctaText}</span>
                <span aria-hidden="true" className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
              </PromotionLink>
            </div>
          </div>
        </aside>
      ) : (
        /* Inline (full-width between-content) card */
        <aside
          ref={root}
          className={`promotion-card mx-auto w-full max-w-5xl px-4 py-4 sm:px-6 ${visibilityClass} ${animClass} transition-all duration-500 ease-out`}
          aria-label={`${disclosure} promotion`}
          data-promotion-id={promotion.id}
        >
          <div className="group relative overflow-hidden rounded-2xl border-2 border-teal-500/30 bg-card shadow-sm hover:border-teal-500/50 hover:shadow-lg transition-all">
            {/* Disclosure + Minimize button */}
            <div className="absolute left-4 top-4 right-4 z-10 flex items-center justify-between pointer-events-none">
              <span className="rounded-full border border-teal-500/30 bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 backdrop-blur-sm pointer-events-auto">
                {disclosure} · {promotion.brandName}
              </span>
              <button
                type="button"
                onClick={() => setMinimized(true)}
                title="Minimize card"
                aria-label="Minimize promotion"
                className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-lg border border-border/80 bg-background/90 text-muted-foreground hover:bg-muted hover:text-foreground backdrop-blur-sm transition-colors shadow-sm"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
            </div>

            {videoSrc ? (
              // ── Video promotion ──
              <div className="grid md:grid-cols-[minmax(280px,0.55fr)_minmax(0,1fr)]">
                <div className="relative overflow-hidden bg-black">
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="h-full min-h-48 w-full object-cover md:max-h-64"
                  />
                </div>
                <div className="flex flex-col justify-center gap-4 p-6 pt-10 md:pt-6">
                  <div>
                    <h2 className="text-xl font-extrabold text-foreground">{promotion.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {promotion.shortDescription}
                    </p>
                  </div>
                  <PromotionLink
                    promotionId={promotion.id}
                    path={path}
                    href={promotion.href}
                    className="animate-card-cta-glow relative overflow-hidden self-start inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 via-teal-700 to-cyan-700 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                  >
                    <span
                      aria-hidden="true"
                      className="animate-card-cta-shimmer pointer-events-none absolute inset-0 -top-2 -bottom-2 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                    <Flame className="h-4 w-4 text-amber-300 animate-bounce" />
                    <span className="relative z-10">{promotion.ctaText}</span>
                    <span aria-hidden="true" className="relative z-10 transition-transform group-hover:translate-1">→</span>
                  </PromotionLink>
                </div>
              </div>
            ) : imageSrc ? (
              // ── Image promotion ──
              <div className="grid md:grid-cols-[minmax(280px,0.5fr)_minmax(0,1fr)]">
                <div className="relative min-h-48 overflow-hidden bg-muted">
                  {imageSrcDark && imageSrcDark !== imageSrc ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageSrc!}
                        alt={`${promotion.brandName} creative`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover dark:hidden animate-slow-crawl"
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageSrcDark}
                        alt={`${promotion.brandName} creative`}
                        loading="lazy"
                        decoding="async"
                        className="hidden h-full w-full object-cover dark:block animate-slow-crawl"
                      />
                    </>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={imageSrc!}
                      alt={`${promotion.brandName} creative`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover animate-slow-crawl"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center gap-4 p-6 pt-10 md:pt-6">
                  <div>
                    <h2 className="text-xl font-extrabold text-foreground">{promotion.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {promotion.shortDescription}
                    </p>
                  </div>
                  <PromotionLink
                    promotionId={promotion.id}
                    path={path}
                    href={promotion.href}
                    className="animate-card-cta-glow relative overflow-hidden self-start inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 via-teal-700 to-cyan-700 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                  >
                    <span
                      aria-hidden="true"
                      className="animate-card-cta-shimmer pointer-events-none absolute inset-0 -top-2 -bottom-2 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                    <Flame className="h-4 w-4 text-amber-300 animate-bounce" />
                    <span className="relative z-10">{promotion.ctaText}</span>
                    <span aria-hidden="true" className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                  </PromotionLink>
                </div>
              </div>
            ) : (
              // ── Text-only promotion ──
              <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
                {promotion.logoUrl && (
                  <div className="shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={promotion.logoUrl}
                      alt={`${promotion.brandName} logo`}
                      loading="lazy"
                      decoding="async"
                      className="h-14 w-14 rounded-xl object-contain"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-bold text-foreground">{promotion.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {promotion.shortDescription}
                  </p>
                </div>
                <div className="shrink-0">
                  <PromotionLink
                    promotionId={promotion.id}
                    path={path}
                    href={promotion.href}
                    className="animate-card-cta-glow relative overflow-hidden inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 via-teal-700 to-cyan-700 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                  >
                    <span
                      aria-hidden="true"
                      className="animate-card-cta-shimmer pointer-events-none absolute inset-0 -top-2 -bottom-2 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                    <Flame className="h-4 w-4 text-amber-300 animate-bounce" />
                    <span className="relative z-10">{promotion.ctaText}</span>
                  </PromotionLink>
                </div>
              </div>
            )}
          </div>
        </aside>
      )}
    </>
  );
}
