// lib/promotions/display.ts — client-safe presentation helpers.
//
// Device and theme visibility are resolved with CSS (Tailwind breakpoints and
// the `.dark` class from next-themes) instead of user-agent sniffing, so the
// decision is correct for static/cached HTML and needs no personalisation.

import type { Device, ThemeMode } from './catalog';

export interface DeviceFlags {
  mobileVisible: boolean;
  tabletVisible?: boolean | null;
  desktopVisible: boolean;
}

/**
 * Tailwind classes that show the element only on the enabled devices.
 * Breakpoints: mobile < 768px, tablet 768–1023px, desktop ≥ 1024px.
 * Returns null when the promotion is hidden on every device.
 */
export function deviceVisibilityClass(flags: DeviceFlags): string | null {
  const mobile = flags.mobileVisible;
  const tablet = flags.tabletVisible ?? true;
  const desktop = flags.desktopVisible;
  if (mobile && tablet && desktop) return '';
  if (!mobile && !tablet && !desktop) return null;
  if (mobile && !tablet && !desktop) return 'md:hidden';
  if (!mobile && tablet && !desktop) return 'hidden md:block lg:hidden';
  if (!mobile && !tablet && desktop) return 'hidden lg:block';
  if (mobile && tablet && !desktop) return 'lg:hidden';
  if (mobile && !tablet && desktop) return 'md:max-lg:hidden';
  return 'hidden md:block';
}

/** Tailwind classes that show the element only in the configured theme. */
export function themeVisibilityClass(themeMode: string | null | undefined): string {
  const mode = (themeMode ?? 'ALL').toUpperCase() as ThemeMode;
  if (mode === 'LIGHT') return 'dark:hidden';
  if (mode === 'DARK') return 'hidden dark:block';
  return '';
}

export function deviceFromWidth(width: number): Device {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function isDeviceEnabled(flags: DeviceFlags, device: Device): boolean {
  if (device === 'mobile') return flags.mobileVisible;
  if (device === 'tablet') return flags.tabletVisible ?? true;
  return flags.desktopVisible;
}

export function isThemeEnabled(themeMode: string | null | undefined, theme: 'light' | 'dark'): boolean {
  const mode = (themeMode ?? 'ALL').toUpperCase();
  return mode === 'ALL' || mode.toLowerCase() === theme;
}

export interface CreativeFields {
  imageUrl: string | null;
  lightCreativeUrl: string | null;
  darkCreativeUrl: string | null;
  logoUrl: string | null;
  videoUrl: string | null;
}

function isVideoUrl(url: string | null): url is string {
  if (!url) return false;
  try {
    return /\.(mp4|webm|ogg)(\?.*)?$/i.test(new URL(url).pathname);
  } catch {
    return false;
  }
}

/**
 * Resolve the media a card should render.
 * light → lightCreative ?? image ?? logo; dark → darkCreative ?? light.
 * A missing dark creative therefore never produces a broken image.
 */
export function pickCreative(fields: CreativeFields): { video: string | null; light: string | null; dark: string | null } {
  const video = isVideoUrl(fields.videoUrl) ? fields.videoUrl : isVideoUrl(fields.imageUrl) ? fields.imageUrl : null;
  if (video) return { video, light: null, dark: null };
  const light = fields.lightCreativeUrl || fields.imageUrl || fields.logoUrl || null;
  const dark = fields.darkCreativeUrl || light;
  return { video: null, light, dark };
}

// ─── First-party frequency capping (no cookies, no server state) ─────────────

const CAP_STORAGE_PREFIX = 'ka_promo_views_';
const CAP_WINDOW_MS = 24 * 60 * 60 * 1000;

function readCapRecord(promotionId: string): { count: number; since: number } | null {
  try {
    const raw = window.localStorage.getItem(`${CAP_STORAGE_PREFIX}${promotionId}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { count?: number; since?: number };
    if (typeof parsed.count !== 'number' || typeof parsed.since !== 'number') return null;
    if (Date.now() - parsed.since > CAP_WINDOW_MS) return null;
    return { count: parsed.count, since: parsed.since };
  } catch {
    return null;
  }
}

/** True when the visitor has already seen this promotion `cap` times in the last 24h. */
export function isFrequencyCapped(promotionId: string, cap: number | null | undefined): boolean {
  if (!cap || cap <= 0 || typeof window === 'undefined') return false;
  const record = readCapRecord(promotionId);
  return !!record && record.count >= cap;
}

/** Record one viewable impression towards the visitor's 24h cap. */
export function recordFrequencyView(promotionId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const record = readCapRecord(promotionId);
    const next = record ? { count: record.count + 1, since: record.since } : { count: 1, since: Date.now() };
    window.localStorage.setItem(`${CAP_STORAGE_PREFIX}${promotionId}`, JSON.stringify(next));
  } catch {
    // Storage may be unavailable (private mode); capping simply degrades.
  }
}
