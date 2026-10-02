// lib/promotions/href.ts — build the outbound promotion link safely.
//
// Precedence: trackingUrl → affiliateUrl → destinationUrl. UTM parameters from
// the campaign are appended ONLY when the link does not already define the key,
// so partner links that carry their own attribution are never corrupted and
// nothing is double-appended. Non-http(s) links fall back to the destination.

const UTM_KEY_PATTERN = /^[a-zA-Z0-9_.-]{1,64}$/;
const MAX_UTM_VALUE_LENGTH = 200;

export interface PromotionLinkFields {
  destinationUrl: string;
  affiliateUrl?: string | null;
  trackingUrl?: string | null;
  utmParameters?: unknown;
}

/** Validate a UTM object coming from JSON: only string/number values with safe keys survive. */
export function sanitizeUtmParameters(input: unknown): Record<string, string> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {};
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (!UTM_KEY_PATTERN.test(key)) continue;
    if (typeof value !== 'string' && typeof value !== 'number') continue;
    const text = String(value).trim().slice(0, MAX_UTM_VALUE_LENGTH);
    if (!text) continue;
    result[key] = text;
  }
  return result;
}

export function isHttpUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function getPromotionHref(promotion: PromotionLinkFields): string {
  const target = promotion.trackingUrl?.trim() || promotion.affiliateUrl?.trim() || promotion.destinationUrl;
  const fallback = isHttpUrl(promotion.destinationUrl) ? promotion.destinationUrl : '#';
  if (!isHttpUrl(target)) return fallback;
  try {
    const url = new URL(target);
    const utm = sanitizeUtmParameters(promotion.utmParameters);
    for (const [key, value] of Object.entries(utm)) {
      if (!url.searchParams.has(key)) url.searchParams.append(key, value);
    }
    return url.toString();
  } catch {
    return fallback;
  }
}

/** Hostname shown next to a promotion (never exposes query parameters). */
export function promotionDomain(href: string): string | null {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}
