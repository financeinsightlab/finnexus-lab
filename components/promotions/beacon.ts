// components/promotions/beacon.ts — first-party, non-personal event beacons.
//
// Only the promotion id, event type, page path, slot and device class are sent.
// No identifiers, cookies or fingerprints are involved.

import { deviceFromWidth } from '@/lib/promotions/display';

export type PromotionEventType = 'IMPRESSION' | 'CLICK';

export interface PromotionBeacon {
  promotionId: string;
  eventType: PromotionEventType;
  path: string;
  slot?: string | null;
}

export function currentDevice(): 'mobile' | 'tablet' | 'desktop' | null {
  if (typeof window === 'undefined') return null;
  return deviceFromWidth(window.innerWidth);
}

export function sendPromotionEvent(event: PromotionBeacon): void {
  if (typeof window === 'undefined') return;
  const payload = JSON.stringify({ ...event, slot: event.slot ?? undefined, device: currentDevice() ?? undefined });
  try {
    if (typeof navigator.sendBeacon === 'function') {
      const ok = navigator.sendBeacon('/api/promotions/event', new Blob([payload], { type: 'application/json' }));
      if (ok) return;
    }
    void fetch('/api/promotions/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    // Analytics must never break the page.
  }
}
