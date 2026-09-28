import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
    billingConfig,
    CHECKOUT_PLANS,
    isBillingConfigured,
    isCheckoutPlan,
    mapStripeSubscriptionStatus,
    parseStripeSignature,
    planForPriceId,
    planFromSubscription,
    priceIdForPlan,
    signStripePayload,
    toCheckoutPlan,
    verifyStripeSignature,
} from './billing';
import { flattenParams } from './stripe';

const BILLING_ENV = [
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_PRICE_PRO',
    'STRIPE_PRICE_ELITE',
    'STRIPE_PRICE_TEAM',
    'STRIPE_PORTAL_CONFIGURATION_ID',
    'NEXT_PUBLIC_APP_URL',
    'AUTH_URL',
] as const;

describe('billing config', () => {
    let saved: Record<string, string | undefined>;

    beforeEach(() => {
        saved = {};
        for (const key of BILLING_ENV) {
            saved[key] = process.env[key];
            delete process.env[key];
        }
    });

    afterEach(() => {
        for (const key of BILLING_ENV) {
            if (saved[key] === undefined) delete process.env[key];
            else process.env[key] = saved[key];
        }
    });

    it('is inert until a secret key and webhook secret are present', () => {
        expect(isBillingConfigured()).toBe(false);
        expect(billingConfig().configured).toBe(false);

        process.env.STRIPE_SECRET_KEY = 'sk_test_123';
        expect(isBillingConfigured()).toBe(false); // still need the webhook secret

        process.env.STRIPE_WEBHOOK_SECRET = 'whsec_123';
        expect(isBillingConfigured()).toBe(true);
    });

    it('lists every missing variable so the operator knows exactly what to add', () => {
        const config = billingConfig();
        expect(config.missing).toContain('STRIPE_SECRET_KEY');
        expect(config.missing).toContain('STRIPE_WEBHOOK_SECRET');
        for (const plan of CHECKOUT_PLANS) {
            expect(config.missing).toContain(`STRIPE_PRICE_${plan}`);
        }
    });

    it('resolves price ids and the app url from env', () => {
        process.env.STRIPE_SECRET_KEY = 'sk_test_123';
        process.env.STRIPE_WEBHOOK_SECRET = 'whsec_123';
        process.env.STRIPE_PRICE_PRO = 'price_pro';
        process.env.STRIPE_PRICE_ELITE = 'price_elite';
        process.env.NEXT_PUBLIC_APP_URL = 'https://app.example.com/';

        const config = billingConfig();
        expect(config.prices.PRO).toBe('price_pro');
        expect(config.prices.ELITE).toBe('price_elite');
        expect(config.prices.TEAM).toBeUndefined();
        // Trailing slash is normalised away so redirect URLs never double up.
        expect(config.appUrl).toBe('https://app.example.com');
        expect(priceIdForPlan('PRO')).toBe('price_pro');
    });

    it('falls back to AUTH_URL then localhost for the app url', () => {
        process.env.AUTH_URL = 'http://localhost:4321';
        expect(billingConfig().appUrl).toBe('http://localhost:4321');
        delete process.env.AUTH_URL;
        expect(billingConfig().appUrl).toBe('http://localhost:3000');
    });
});

describe('plan validation', () => {
    it('accepts the purchasable plans case-insensitively', () => {
        expect(isCheckoutPlan('PRO')).toBe(true);
        expect(isCheckoutPlan('elite')).toBe(true);
        expect(toCheckoutPlan('Team')).toBe('TEAM');
    });

    it('rejects FREE, ENTERPRISE and junk', () => {
        expect(isCheckoutPlan('FREE')).toBe(false);
        expect(isCheckoutPlan('ENTERPRISE')).toBe(false);
        expect(isCheckoutPlan('')).toBe(false);
        expect(isCheckoutPlan(42)).toBe(false);
        expect(toCheckoutPlan('nope')).toBeNull();
    });
});

describe('mapStripeSubscriptionStatus', () => {
    it('maps live statuses onto our enum', () => {
        expect(mapStripeSubscriptionStatus('active')).toBe('ACTIVE');
        expect(mapStripeSubscriptionStatus('trialing')).toBe('TRIALING');
        expect(mapStripeSubscriptionStatus('past_due')).toBe('PAST_DUE');
        expect(mapStripeSubscriptionStatus('unpaid')).toBe('PAST_DUE');
        expect(mapStripeSubscriptionStatus('canceled')).toBe('CANCELED');
        expect(mapStripeSubscriptionStatus('incomplete_expired')).toBe('CANCELED');
    });

    it('degrades unknown / mid-flight statuses to INACTIVE (a safe downgrade)', () => {
        expect(mapStripeSubscriptionStatus('incomplete')).toBe('INACTIVE');
        expect(mapStripeSubscriptionStatus('paused')).toBe('INACTIVE');
        expect(mapStripeSubscriptionStatus(null)).toBe('INACTIVE');
        expect(mapStripeSubscriptionStatus(undefined)).toBe('INACTIVE');
        expect(mapStripeSubscriptionStatus('')).toBe('INACTIVE');
    });
});

describe('planFromSubscription', () => {
    const original = process.env.STRIPE_PRICE_ELITE;
    beforeEach(() => {
        process.env.STRIPE_PRICE_ELITE = 'price_elite';
    });
    afterEach(() => {
        if (original === undefined) delete process.env.STRIPE_PRICE_ELITE;
        else process.env.STRIPE_PRICE_ELITE = original;
    });

    it('prefers metadata.plan', () => {
        expect(planFromSubscription({ metadata: { plan: 'pro' } })).toBe('PRO');
    });

    it('falls back to the price id', () => {
        expect(
            planFromSubscription({ items: { data: [{ price: { id: 'price_elite' } }] } }),
        ).toBe('ELITE');
        expect(planForPriceId('price_elite')).toBe('ELITE');
    });

    it('returns null when it cannot identify the plan', () => {
        expect(planFromSubscription({})).toBeNull();
        expect(planForPriceId('price_unknown')).toBeNull();
        expect(planForPriceId(null)).toBeNull();
    });
});

describe('stripe webhook signature verification', () => {
    const secret = 'whsec_test_secret';
    const payload = JSON.stringify({ id: 'evt_1', type: 'checkout.session.completed' });

    it('accepts a correctly signed payload', () => {
        const header = signStripePayload(payload, secret);
        expect(verifyStripeSignature(payload, header, secret)).toBe(true);
    });

    it('rejects a tampered payload', () => {
        const header = signStripePayload(payload, secret);
        expect(verifyStripeSignature(`${payload} `, header, secret)).toBe(false);
    });

    it('rejects a signature made with a different secret', () => {
        const header = signStripePayload(payload, 'whsec_other');
        expect(verifyStripeSignature(payload, header, secret)).toBe(false);
    });

    it('rejects stale timestamps beyond the tolerance (replay protection)', () => {
        const longAgo = Math.floor(Date.now() / 1000) - 10_000;
        const header = signStripePayload(payload, secret, longAgo);
        expect(verifyStripeSignature(payload, header, secret)).toBe(false);
        // ...but passes when the tolerance is widened.
        expect(verifyStripeSignature(payload, header, secret, 20_000)).toBe(true);
    });

    it('fails closed when the secret or header is missing', () => {
        expect(verifyStripeSignature(payload, null, secret)).toBe(false);
        expect(verifyStripeSignature(payload, signStripePayload(payload, secret), null)).toBe(false);
        expect(verifyStripeSignature(payload, 'not-a-signature', secret)).toBe(false);
    });

    it('parses the signature header into timestamp + v1 signatures', () => {
        const header = signStripePayload(payload, secret, 1_700_000_000);
        const parsed = parseStripeSignature(header);
        expect(parsed?.timestamp).toBe(1_700_000_000);
        expect(parsed?.signatures).toHaveLength(1);
        expect(parseStripeSignature(null)).toBeNull();
        expect(parseStripeSignature('garbage')).toBeNull();
    });
});

describe('flattenParams (Stripe form encoding)', () => {
    it('encodes nested objects and arrays with bracket notation', () => {
        const encoded = new URLSearchParams(
            flattenParams({
                mode: 'subscription',
                line_items: [{ price: 'price_pro', quantity: 1 }],
                metadata: { userId: 'u1', plan: 'PRO' },
                allow_promotion_codes: true,
            }),
        );
        expect(encoded.get('mode')).toBe('subscription');
        expect(encoded.get('line_items[0][price]')).toBe('price_pro');
        expect(encoded.get('line_items[0][quantity]')).toBe('1');
        expect(encoded.get('metadata[userId]')).toBe('u1');
        expect(encoded.get('allow_promotion_codes')).toBe('true');
    });

    it('drops null / undefined values instead of stringifying them', () => {
        const encoded = new URLSearchParams(
            flattenParams({ a: 'kept', b: null, c: undefined, d: [null, 'x'] }),
        );
        expect(encoded.get('a')).toBe('kept');
        expect(encoded.has('b')).toBe(false);
        expect(encoded.has('c')).toBe(false);
        expect(encoded.get('d[0]')).toBe('x');
    });
});
