// lib/i18n/format.ts — locale-aware number, currency and date formatting (Pillar F2)

import { currencyForLocale, intlTagForLocale, type Locale } from '@/lib/i18n/config';

export function formatNumber(
    value: number,
    locale: Locale,
    options: Intl.NumberFormatOptions = {},
): string {
    return new Intl.NumberFormat(intlTagForLocale(locale), options).format(value);
}

/**
 * Currency formatting. Defaults to the locale's display currency
 * (INR for en-IN, USD for en-US) but callers may override.
 */
export function formatCurrency(
    value: number,
    locale: Locale,
    currency?: string,
    options: Intl.NumberFormatOptions = {},
): string {
    return new Intl.NumberFormat(intlTagForLocale(locale), {
        style: 'currency',
        currency: currency ?? currencyForLocale(locale),
        maximumFractionDigits: 2,
        ...options,
    }).format(value);
}

/** Percent formatting; pass a fraction (0.42 → 42%). */
export function formatPercent(
    fraction: number,
    locale: Locale,
    options: Intl.NumberFormatOptions = {},
): string {
    return new Intl.NumberFormat(intlTagForLocale(locale), {
        style: 'percent',
        maximumFractionDigits: 1,
        ...options,
    }).format(fraction);
}

export function formatDate(
    value: string | number | Date | null | undefined,
    locale: Locale,
    options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' },
): string {
    if (value === null || value === undefined || value === '') return '';
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat(intlTagForLocale(locale), options).format(date);
}

/** Full timestamp used for "last updated" style labels. */
export function formatDateTime(
    value: string | number | Date | null | undefined,
    locale: Locale,
): string {
    return formatDate(value, locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
