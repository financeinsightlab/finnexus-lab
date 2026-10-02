import { describe, expect, it } from 'vitest';
import {
    addCalendarMonth,
    isValidTransactionReference,
    manualUPIProvider,
    normalizeTransactionReference,
} from './manual-upi-provider';

describe('manualUPIProvider', () => {
    it('offers only monthly Pro and Elite UPI checkout with server-owned prices', () => {
        expect(manualUPIProvider.supports('PRO')).toBe(true);
        expect(manualUPIProvider.supports('ELITE')).toBe(true);
        expect(manualUPIProvider.supports('TEAM')).toBe(false);
        expect(manualUPIProvider.instructions('PRO')).toMatchObject({
            provider: 'MANUAL_UPI',
            amountMinor: 99_900,
            currency: 'INR',
            amountLabel: '₹999',
            periodLabel: '/month',
        });
        expect(manualUPIProvider.instructions('ELITE').amountMinor).toBe(199_900);
    });
});

describe('calendar-month entitlement expiry', () => {
    it('clamps month-end dates and preserves time of day', () => {
        expect(addCalendarMonth(new Date('2025-01-31T10:15:00.000Z')).toISOString())
            .toBe('2025-02-28T10:15:00.000Z');
        expect(addCalendarMonth(new Date('2024-01-31T10:15:00.000Z')).toISOString())
            .toBe('2024-02-29T10:15:00.000Z');
        expect(addCalendarMonth(new Date('2025-12-31T10:15:00.000Z')).toISOString())
            .toBe('2026-01-31T10:15:00.000Z');
        // 2025-01-30 19:30 UTC is Jan 31 at 01:00 in India.
        expect(addCalendarMonth(new Date('2025-01-30T19:30:00.000Z')).toISOString())
            .toBe('2025-02-27T19:30:00.000Z');
    });
});

describe('UPI transaction references', () => {
    it('normalizes whitespace and case', () => {
        expect(normalizeTransactionReference('  ab 12-34  ')).toBe('AB12-34');
    });

    it('accepts only 6–64 letters, numbers, or hyphens', () => {
        expect(isValidTransactionReference('123456789012')).toBe(true);
        expect(isValidTransactionReference('AB12-34')).toBe(true);
        expect(isValidTransactionReference('short')).toBe(false);
        expect(isValidTransactionReference('123456/789')).toBe(false);
        expect(isValidTransactionReference('A'.repeat(65))).toBe(false);
    });
});
