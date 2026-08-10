import { format, parseISO } from 'date-fns';

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
 * Check if a user has premium subscription access
 * A user is considered premium if:
 * 1. They are an ADMIN, or
 * 2. They have an ACTIVE subscription status AND a premium subscription plan
 */
export function hasPremiumAccess(user: {
  role?: string;
  subscriptionStatus?: string;
  subscriptionPlan?: string | null;
}): boolean {
  // Admin users always have premium access
  if (user.role === 'ADMIN') {
    return true;
  }

  // Check if subscription is active
  const isActive = user.subscriptionStatus === 'ACTIVE';
  
  // Check if they have a premium plan
  const premiumPlans = ['PRO', 'ELITE', 'TEAM', 'PROFESSIONAL', 'ENTERPRISE', 'API_ONLY'];
  const hasPremiumPlan = premiumPlans.includes(user.subscriptionPlan || '');
  
  return isActive && hasPremiumPlan;
}

/**
 * Check if a user needs to upgrade (shows subscription prompts)
 */
export function needsUpgrade(user: {
  role?: string;
  subscriptionStatus?: string;
  subscriptionPlan?: string | null;
}): boolean {
  return !hasPremiumAccess(user);
}