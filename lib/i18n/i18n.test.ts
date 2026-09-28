import { describe, expect, it } from 'vitest';
import {
    DEFAULT_LOCALE,
    LOCALES,
    currencyForLocale,
    isLocale,
    normalizeLocale,
} from '@/lib/i18n/config';
import { formatCurrency, formatDate, formatNumber, formatPercent } from '@/lib/i18n/format';
import { createTranslator, translate } from '@/lib/i18n/translate';
import { getMessages, messages } from '@/lib/i18n/messages';

describe('locale config', () => {
    it('supports en-IN and en-US with en-IN as the default', () => {
        expect(LOCALES).toEqual(['en-IN', 'en-US']);
        expect(DEFAULT_LOCALE).toBe('en-IN');
    });

    it('validates and normalises locale strings', () => {
        expect(isLocale('en-IN')).toBe(true);
        expect(isLocale('fr-FR')).toBe(false);
        expect(normalizeLocale('en-US')).toBe('en-US');
        expect(normalizeLocale('fr')).toBe(DEFAULT_LOCALE);
        expect(normalizeLocale(null)).toBe(DEFAULT_LOCALE);
    });

    it('maps locales to display currencies', () => {
        expect(currencyForLocale('en-IN')).toBe('INR');
        expect(currencyForLocale('en-US')).toBe('USD');
    });
});

describe('message catalogues', () => {
    it('define the same key set in every locale', () => {
        const base = Object.keys(messages['en-IN']).sort();
        for (const locale of LOCALES) {
            expect(Object.keys(messages[locale]).sort()).toEqual(base);
        }
    });

    it('exposes a catalogue for every locale', () => {
        for (const locale of LOCALES) {
            expect(Object.keys(getMessages(locale)).length).toBeGreaterThan(0);
        }
    });
});

describe('translate', () => {
    it('returns the string for a known key', () => {
        expect(translate('en-IN', 'common.search')).toBe('Search');
    });

    it('interpolates named variables', () => {
        expect(translate('en-IN', 'dashboard.streak', { count: 7 })).toBe('7-day streak');
        expect(translate('en-IN', 'dashboard.welcome', { name: 'Asha' })).toBe('Welcome back, Asha');
    });

    it('leaves unknown tokens untouched', () => {
        expect(translate('en-IN', 'dashboard.streak', {})).toBe('{count}-day streak');
    });

    it('falls back to the raw key for missing entries', () => {
        expect(translate('en-IN', 'does.not.exist')).toBe('does.not.exist');
    });

    it('supports namespaced translators', () => {
        const t = createTranslator('en-IN', 'dashboard');
        expect(t('continueLearning')).toBe('Continue learning');
        // Fully-qualified keys still resolve.
        expect(t('common.search')).toBe('Search');
    });
});

describe('formatters', () => {
    it('formats numbers per locale (Indian grouping)', () => {
        // en-IN groups the first three digits then in pairs: 12,34,567.
        expect(formatNumber(1234567, 'en-IN')).toBe('12,34,567');
        expect(formatNumber(1234567, 'en-US')).toBe('1,234,567');
    });

    it('formats currency using the locale default', () => {
        const inr = formatCurrency(1000, 'en-IN');
        expect(inr).toMatch(/₹|INR/);
        const usd = formatCurrency(1000, 'en-US');
        expect(usd).toMatch(/\$|USD/);
    });

    it('honours an explicit currency override', () => {
        expect(formatCurrency(1000, 'en-IN', 'USD')).toMatch(/\$|USD/);
    });

    it('formats percentages from a fraction', () => {
        expect(formatPercent(0.42, 'en-US')).toMatch(/42/);
    });

    it('formats dates and returns empty for invalid input', () => {
        expect(formatDate('2026-02-01T00:00:00.000Z', 'en-US')).toMatch(/2026/);
        expect(formatDate(null, 'en-IN')).toBe('');
        expect(formatDate('not-a-date', 'en-IN')).toBe('');
    });
});
