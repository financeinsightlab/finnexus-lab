import { format, parseISO } from 'date-fns';
import { canAccess, type EntitledUser } from './entitlements';

export function formatDate(dateStr: string | Date | number | null | undefined): string {
  if (!dateStr) return '';
  try {
    const d = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr);
    if (isNaN(d.getTime())) return String(dateStr);
    return format(d, 'MMM dd, yyyy');
  } catch {
    return typeof dateStr === 'object' && dateStr instanceof Date ? dateStr.toLocaleDateString() : String(dateStr);
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, maxLen = 160): string {
  return text.length > maxLen ? text.slice(0, maxLen) + '...' : text;
}

export const SECTORS = [
  'All',
  'Quick Commerce',
  'Fintech',
  'EV',
  'Food Delivery',
  'SaaS',
  'Healthcare',
  'Consumer',
  'D2C',
] as const;

export type Sector = typeof SECTORS[number];

export const CATEGORY_VARIANT: Record<string, 'teal' | 'navy' | 'gold' | 'green'> = {
  'Strategy Note': 'teal',
  'Sector Analysis': 'navy',
  'Company Note': 'gold',
  'Market Update': 'green',
};

/**
 * Check if a user has premium subscription access.
 *
 * Delegates to the single entitlement engine so the (previously hard-coded and
 * stale) plan list cannot drift. A user is premium when their effective plan is
 * at least PRO — staff always qualify, paid plans require an active/trialing
 * subscription.
 */
export function hasPremiumAccess(user: EntitledUser): boolean {
  return canAccess(user, 'PRO');
}

/**
 * Check if a user needs to upgrade (shows subscription prompts)
 */
export function needsUpgrade(user: EntitledUser): boolean {
  return !hasPremiumAccess(user);
}