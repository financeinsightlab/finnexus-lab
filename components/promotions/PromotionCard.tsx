'use client';

import { useEffect, useRef } from 'react';
import PromotionLink from '@/components/promotions/PromotionLink';

export type PromotionCardData = {
  id: string;
  brandName: string;
  title: string;
  shortDescription: string;
  logoUrl: string | null;
  imageUrl: string | null;
  lightCreativeUrl: string | null;
  darkCreativeUrl: string | null;
  ctaText: string;
  disclosureType: string;
  disclosureText: string;
  href: string;
  mobileVisible: boolean;
  desktopVisible: boolean;
};

export default function PromotionCard({ promotion, path }: { promotion: PromotionCardData; path: string }) {
  const root = useRef<HTMLElement>(null);
  const tracked = useRef(false);

  useEffect(() => {
    const element = root.current;
    if (!element || tracked.current) return;
    const record = () => {
      if (tracked.current) return;
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
    };
    if (typeof IntersectionObserver === 'undefined') {
      record();
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.2)) {
        record();
        observer.disconnect();
      }
    }, { threshold: [0.2] });
    observer.observe(element);
    return () => observer.disconnect();
  }, [path, promotion.id]);

  if (!promotion.mobileVisible && !promotion.desktopVisible) return null;
  const visibility = !promotion.mobileVisible ? 'hidden md:block' : !promotion.desktopVisible ? 'md:hidden' : '';
  const disclosure = promotion.disclosureText.trim() || promotion.disclosureType || 'Sponsored';

  return (
    <aside
      ref={root}
      className={`promotion-card mx-auto w-full max-w-5xl px-4 py-4 sm:px-6 ${visibility}`}
      aria-label={`${disclosure} promotion`}
      data-promotion-id={promotion.id}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            {disclosure}
          </span>
          <span className="text-xs text-muted-foreground">Partner: {promotion.brandName}</span>
        </div>
        <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(160px,260px)] md:items-center">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-foreground">{promotion.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{promotion.shortDescription}</p>
            <PromotionLink
              promotionId={promotion.id}
              path={path}
              href={promotion.href}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {promotion.ctaText}
            </PromotionLink>
          </div>
          {(promotion.imageUrl || promotion.logoUrl || promotion.lightCreativeUrl || promotion.darkCreativeUrl) && (
            <div className="order-first flex min-h-24 items-center justify-center overflow-hidden rounded-xl bg-muted p-2 md:order-none">
              {promotion.lightCreativeUrl || promotion.darkCreativeUrl ? (
                <>
                  {promotion.lightCreativeUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={promotion.lightCreativeUrl} alt={`${promotion.brandName} promotion`} loading="lazy" decoding="async" className="max-h-36 w-full object-contain dark:hidden" />
                  )}
                  {promotion.darkCreativeUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={promotion.darkCreativeUrl} alt={`${promotion.brandName} promotion`} loading="lazy" decoding="async" className="hidden max-h-36 w-full object-contain dark:block" />
                  )}
                </>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={promotion.imageUrl || promotion.logoUrl || ''} alt={`${promotion.brandName} logo`} loading="lazy" decoding="async" className="max-h-36 w-full object-contain" />
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
