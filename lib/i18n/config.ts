// lib/i18n/config.ts — locale configuration (Pillar F2)
//
// Kept dependency-free and free/open-source. Mirrors the `next-intl` model
// (locale segment + message catalogues) so a future swap is mechanical, but
// applies the locale client-side via a cookie to avoid restructuring every
// route under `app/[locale]/…` (which would break existing static generation).

export const LOCALES = ['en-IN', 'en-US'] as const;

export type Locale = (typeof LOCALES)[number];

/** India English is the product's primary market, so it is the default. */
export const DEFAULT_LOCALE: Locale = 'en-IN';

export const LOCALE_COOKIE = 'ka_locale';

/** One year, in seconds. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLocale(value: unknown): value is Locale {
    return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** Narrow an arbitrary string to a supported locale, falling back to default. */
export function normalizeLocale(value: string | null | undefined): Locale {
    return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** BCP-47 tag handed to `Intl` for number/date formatting. */
export function intlTagForLocale(locale: Locale): string {
    return locale;
}

/** Default display currency: INR for India, USD for the US. */
export function currencyForLocale(locale: Locale): string {
    return locale === 'en-US' ? 'USD' : 'INR';
}

/** Human-readable labels for the switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
    'en-IN': 'English (India)',
    'en-US': 'English (US)',
};

export const LOCALE_FLAGS: Record<Locale, string> = {
    'en-IN': '🇮🇳',
    'en-US': '🇺🇸',
};
