import { describe, expect, it } from 'vitest';
import {
    PLAN_CATALOG,
    PLAN_IDS,
    canAccess,
    getPlanPricing,
    isFreeUser,
    normalizePlan,
    planBenefits,
    planLabel,
    resolvePlan,
} from './entitlements';

describe('normalizePlan', () => {
    it('falls back to FREE for empty / unknown values', () => {
        expect(normalizePlan(null)).toBe('FREE');
        expect(normalizePlan(undefined)).toBe('FREE');
        expect(normalizePlan('')).toBe('FREE');
        expect(normalizePlan('bogus')).toBe('FREE');
    });

    it('is case-insensitive for known plans', () => {
        expect(normalizePlan('pro')).toBe('PRO');
        expect(normalizePlan('Elite')).toBe('ELITE');
    });
});

describe('resolvePlan', () => {
    it('grants staff full access regardless of billing', () => {
        expect(resolvePlan({ role: 'ADMIN' })).toBe('ENTERPRISE');
        expect(resolvePlan({ role: 'ANALYST' })).toBe('ENTERPRISE');
    });

    it('honours a paid plan only while the subscription is active', () => {
        expect(resolvePlan({ role: 'MEMBER', subscriptionPlan: 'PRO', subscriptionStatus: 'ACTIVE' })).toBe('PRO');
        expect(
            resolvePlan({ role: 'MEMBER', subscriptionPlan: 'PRO', subscriptionStatus: 'TRIALING' }),
        ).toBe('PRO');
    });

    it('downgrades to FREE when a paid subscription is not active', () => {
        expect(
            resolvePlan({ role: 'MEMBER', subscriptionPlan: 'PRO', subscriptionStatus: 'CANCELED' }),
        ).toBe('FREE');
        expect(resolvePlan({ role: 'MEMBER', subscriptionPlan: 'ELITE', subscriptionStatus: null })).toBe(
            'FREE',
        );
    });

    it('returns FREE for anonymous users', () => {
        expect(resolvePlan(null)).toBe('FREE');
        expect(resolvePlan(undefined)).toBe('FREE');
    });
});

describe('canAccess', () => {
    const free = { role: 'MEMBER' as const, subscriptionPlan: null, subscriptionStatus: null };
    const pro = { role: 'MEMBER' as const, subscriptionPlan: 'PRO', subscriptionStatus: 'ACTIVE' as const };

    it('compares plan rank', () => {
        expect(canAccess(free, 'FREE')).toBe(true);
        expect(canAccess(free, 'PRO')).toBe(false);
        expect(canAccess(pro, 'PRO')).toBe(true);
        expect(canAccess(pro, 'FREE')).toBe(true);
        expect(canAccess(pro, 'ELITE')).toBe(false);
    });

    it('lets staff reach the top tier', () => {
        expect(canAccess({ role: 'ADMIN' }, 'ENTERPRISE')).toBe(true);
        expect(canAccess({ role: 'ANALYST' }, 'ELITE')).toBe(true);
    });
});

describe('plan helpers', () => {
    it('exposes a definition and pricing for every plan id', () => {
        for (const id of PLAN_IDS) {
            expect(PLAN_CATALOG[id]).toBeDefined();
            expect(getPlanPricing(id).price).toBeTruthy();
            expect(getPlanPricing(id).href).toBeTruthy();
        }
    });

    it('labels free users and reports free-tier status', () => {
        expect(planLabel(null)).toBe('Free');
        expect(isFreeUser(null)).toBe(true);
        expect(isFreeUser({ role: 'ADMIN' })).toBe(false);
        expect(planBenefits({ role: 'ADMIN' })).toEqual(PLAN_CATALOG.ENTERPRISE.benefits);
    });
});
