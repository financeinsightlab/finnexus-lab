'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Volume2, VolumeX, ExternalLink, Sparkles, Flame, Minus, ChevronUp, X, Globe } from 'lucide-react';
import type { PromotionCardData } from '@/components/promotions/PromotionCard';

export default function FloatingRightPromotion() {
  const pathname = usePathname();
  const [promo, setPromo] = useState<PromotionCardData | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [minimized, setMinimized] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return true;
      return sessionStorage.getItem('promo_minimized') === 'true';
    }
    return false;
  });
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const impressionRecorded = useRef(false);

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin') || pathname.startsWith('/auth')) {
      setVisible(false);
      return;
    }

    let isMounted = true;
    async function loadPromotion() {
      try {
        const res = await fetch(`/api/promotions/active?path=${encodeURIComponent(pathname)}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!isMounted) return;

        if (data?.promotion?.id) {
          try {
            if (sessionStorage.getItem(`promo_dismissed_${data.promotion.id}`) === 'true') {
              setDismissed(true);
              return;
            }
          } catch {}

          setPromo(data.promotion);
          setDismissed(false);
          setVisible(true);
        } else {
          setVisible(false);
        }
      } catch {
        // silent fail
      }
    }

    loadPromotion();
    return () => {
      isMounted = false;
    };
  }, [pathname]);

  // Record impression once visible
  useEffect(() => {
    if (visible && promo && !dismissed && !impressionRecorded.current) {
      impressionRecorded.current = true;
      const payload = JSON.stringify({
        promotionId: promo.id,
        eventType: 'IMPRESSION',
        path: pathname,
      });

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
  }, [visible, promo, dismissed, pathname]);

  const handleCtaClick = () => {
    if (!promo) return;
    const payload = JSON.stringify({
      promotionId: promo.id,
      eventType: 'CLICK',
      path: pathname,
    });

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
  };

  const handleToggleMinimize = (val: boolean) => {
    setMinimized(val);
    try {
      sessionStorage.setItem('promo_minimized', String(val));
    } catch {}
  };

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
    try {
      if (promo) {
        sessionStorage.setItem(`promo_dismissed_${promo.id}`, 'true');
      }
    } catch {}
  };

  if (!promo || dismissed) return null;

  const hasVideo = !!promo.videoUrl;
  const hasImage = !hasVideo && (promo.imageUrl || promo.lightCreativeUrl || promo.darkCreativeUrl);
  const imageSource = promo.imageUrl || promo.lightCreativeUrl || promo.darkCreativeUrl;
  const disclosure = promo.disclosureText || 'Featured Partner · Sponsored';

  const promoDomain = (() => {
    try {
      return new URL(promo.href || 'https://partner.com').hostname.replace(/^www\./, '');
    } catch {
      return 'partner.com';
    }
  })();

  return (
    <>
      <style>{`
        @keyframes promo-cta-glow {
          0%, 100% {
            box-shadow: 0 0 16px rgba(13, 148, 136, 0.45), 0 0 32px rgba(6, 182, 212, 0.25);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 26px rgba(13, 148, 136, 0.8), 0 0 52px rgba(6, 182, 212, 0.5);
            transform: scale(1.025);
          }
        }
        @keyframes promo-shimmer-sweep {
          0% {
            transform: translateX(-150%) skewX(-20deg);
          }
          35%, 100% {
            transform: translateX(250%) skewX(-20deg);
          }
        }
        @keyframes webpage-crawl {
          0%, 15% {
            transform: translateY(0%);
          }
          48%, 68% {
            transform: translateY(-38%);
          }
          92%, 100% {
            transform: translateY(0%);
          }
        }
        .animate-cta-continuous {
          animation: promo-cta-glow 2.4s ease-in-out infinite;
        }
        .animate-cta-shimmer {
          animation: promo-shimmer-sweep 2.8s ease-in-out infinite;
        }
        .animate-webpage-crawl {
          animation: webpage-crawl 14s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      <aside
        aria-label="Partner promotion showcase"
        className={`fixed bottom-[96px] right-4 sm:right-6 z-[160] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible
            ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
            : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* ── 1. MINIMIZED STATE: Sleek non-blocking bottom corner capsule pill ── */}
        {minimized ? (
          <div
            onClick={() => handleToggleMinimize(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggleMinimize(false);
              }
            }}
            title="Expand partner showcase"
            className="animate-cta-continuous group flex items-center gap-2.5 rounded-full border-2 border-teal-500/50 bg-card/95 py-2 px-3.5 shadow-2xl backdrop-blur-xl dark:border-teal-400/40 dark:bg-surface-overlay/95 transition-all hover:scale-105 hover:border-teal-400 cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Flame className="h-3.5 w-3.5 text-amber-400 animate-bounce" />
            {promo.logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={promo.logoUrl} alt="" className="h-4 w-4 rounded object-contain shrink-0" />
            )}
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-black tracking-tight text-foreground truncate max-w-[140px]">
                {promo.brandName}
              </p>
              <span className="rounded-md bg-teal-500/15 px-1.5 py-0.5 text-[9px] font-bold text-teal-600 dark:text-teal-400">
                Partner
              </span>
            </div>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 group-hover:bg-brand group-hover:text-primary-foreground transition-colors ml-0.5">
              <ChevronUp className="h-3 w-3" />
            </span>
          </div>
        ) : (
          /* ── 2. EXPANDED FULL CARD: Top-tier Glassmorphic Browser Showcase ── */
          <div className="w-[calc(100vw-2rem)] max-w-[330px] sm:max-w-[340px] relative overflow-hidden rounded-3xl border-2 border-teal-500/40 bg-card/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_30px_rgba(13,148,136,0.2)] backdrop-blur-2xl dark:border-teal-400/35 dark:bg-surface-overlay/95 transition-all hover:border-teal-500/70">
            {/* Subtle Ambient Pulse behind card */}
            <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-teal-500/20 blur-3xl animate-pulse" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-cyan-500/15 blur-3xl" />

            {/* Top Bar: Sponsored Badge, Live Indicator & Controls */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-border/50">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full border border-teal-500/30 bg-teal-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  <Sparkles className="h-2.5 w-2.5 text-teal-500 animate-spin [animation-duration:8s]" />
                  {disclosure}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mr-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Active
                </span>
                {/* Minimize to dock button */}
                <button
                  type="button"
                  onClick={() => handleToggleMinimize(true)}
                  aria-label="Minimize promotion"
                  title="Minimize to floating pill"
                  className="flex h-6 w-6 items-center justify-center rounded-lg border border-border/70 bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                {/* Dismiss button */}
                <button
                  type="button"
                  onClick={handleDismiss}
                  aria-label="Close promotion"
                  title="Close for this session"
                  className="flex h-6 w-6 items-center justify-center rounded-lg border border-border/70 bg-background/80 text-muted-foreground hover:bg-red-500/10 hover:text-error hover:border-red-500/30 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* ── Media Viewport: Simulated Live Browser Mockup with Silky Web Crawl ── */}
            {hasVideo ? (
              <div className="relative my-2.5 aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-inner ring-1 ring-border/50">
                <video
                  ref={videoRef}
                  src={promo.videoUrl!}
                  autoPlay
                  muted={muted}
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = !muted;
                      setMuted(!muted);
                    }
                  }}
                  aria-label={muted ? 'Unmute video' : 'Mute video'}
                  className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
                >
                  {muted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                </button>
              </div>
            ) : hasImage ? (
              <div className="my-2.5 overflow-hidden rounded-2xl border border-white/10 dark:border-teal-500/25 bg-brand-navy shadow-md group/preview">
                {/* Browser Window Mockup Chrome Header */}
                <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-2.5 py-1 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rose-500/80 inline-block" />
                    <span className="h-2 w-2 rounded-full bg-amber-500/80 inline-block" />
                    <span className="h-2 w-2 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-1 rounded bg-black/40 px-2 py-0.5 text-[9px] font-mono text-slate-300 max-w-[170px] truncate">
                    <span className="text-emerald-400 text-[10px]">🔒</span>
                    <span className="truncate">{promoDomain}</span>
                  </div>
                  <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-teal-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-ping" />
                    Live
                  </span>
                </div>

                {/* Viewport Frame with Slow Smooth Web Crawl Animation */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSource!}
                    alt={`${promo.brandName} live website`}
                    loading="lazy"
                    className="w-full object-cover object-top animate-webpage-crawl group-hover/preview:[animation-play-state:paused]"
                  />
                  {/* Subtle bottom fade to blend with card */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                </div>
              </div>
            ) : null}

            {/* Brand Header & Headline */}
            <div className="space-y-1 pt-0.5">
              <div className="flex items-center gap-1.5">
                {promo.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={promo.logoUrl}
                    alt={`${promo.brandName} logo`}
                    className="h-4 w-4 rounded object-contain shrink-0"
                  />
                ) : (
                  <Globe className="h-3.5 w-3.5 text-teal-500 shrink-0" />
                )}
                <p className="text-[11px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 truncate">
                  {promo.brandName}
                </p>
              </div>

              <h4 className="text-xs sm:text-sm font-extrabold leading-snug text-foreground">
                {promo.title}
              </h4>

              <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                {promo.shortDescription}
              </p>
            </div>

            {/* High-conversion Continuous Magnetic Animated CTA Button */}
            <div className="mt-3 pt-0.5">
              <a
                href={promo.href}
                onClick={handleCtaClick}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="animate-cta-continuous relative overflow-hidden group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-700 via-emerald-700 to-cyan-700 px-4 py-2.5 text-xs font-black text-white shadow-xl transition-all hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                {/* Continuous Light Sweep Sheen */}
                <span
                  aria-hidden="true"
                  className="animate-cta-shimmer pointer-events-none absolute inset-0 -top-2 -bottom-2 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />

                <Flame className="h-3.5 w-3.5 text-amber-300 animate-bounce [animation-duration:1.5s]" />
                <span className="relative z-10 tracking-wide uppercase text-[11px] font-black">{promo.ctaText}</span>
                <ExternalLink className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

