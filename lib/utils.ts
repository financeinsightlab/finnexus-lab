import { format, parseISO } from 'date-fns';

export function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'MMM dd, yyyy');
  } catch {
    return dateStr;
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