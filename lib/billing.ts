// lib/billing.ts — Stripe billing domain (pure, testable core; fully env-gated)
//
// Design goals (Pillar A1/A3):
//   * No third-party SDK — the whole integration is a thin `fetch` client, so
//     there is nothing to install and nothing to pay for.
//   * The entire surface is *inert* until `STRIPE_SECRET_KEY` is present. Every
//     helper here is a pure function so the mapping rules (Stripe status ->
//     our `SubscriptionStatus`, price id -> plan, webhook signature) are unit
//     tested without any network or database.
//
// Env required to go live (free Stripe *test mode* keys are enough):
//   STRIPE_SECRET_KEY        sk_test_…
//   STRIPE_WEBHOOK_SECRET    whsec_…   (from `stripe listen` or the dashboard)
//   STRIPE_PRICE_PRO         price_…   (recurring monthly price for Pro)
//   STRIPE_PRICE_ELITE       price_…   (recurring monthly price for Elite)
//   STRIPE_PRICE_TEAM        price_…   (recurring monthly price for Team seats)
// Optional:
//   STRIPE_PORTAL_CONFIGURATION_ID  bpconf_…  (custom billing-portal branding)
//   NEXT_PUBLIC_APP_URL / AUTH_URL  base URL used for success/cancel redirects

import { createHmac, timingSafeEqual } from 'crypto';

/** Plans that can actually be purchased through Stripe Checkout. */
export const CHECKOUT_PLANS = ['PRO', 'ELITE', 'TEAM'] as const;
export type CheckoutPlan = (typeof CHECKOUT_PLANS)[number];

/** Local mirror of the Prisma `SubscriptionStatus` enum (string-compatible). */
export type BillingStatus = 'ACTIVE' | 'INACTIVE' | 'PAST_DUE' | 'CANCELED' | 'TRIALING';

/** Env var that holds the Stripe price id for each purchasable plan. */
const PRICE_ENV: Record<CheckoutPlan, string> = {
    PRO: 'STRIPE_PRICE_PRO',
    ELITE: 'STRIPE_PRICE_ELITE',
    TEAM: 'STRIPE_PRICE_TEAM',
};

/** Vars that must all be present for Checkout to work end-to-end. */
const REQUIRED_ENV = ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'] as const;

export interface BillingConfig {
    /** True only when *every* required var is present. */
    configured: boolean;
    secretKey: string | null;
    webhookSecret: string | null;
    prices: Partial<Record<CheckoutPlan, string>>;
    portalConfigurationId: string | null;
    /** Absolute base URL (no trailing slash) for redirect targets. */
    appUrl: string;
    /** Human-readable list of the vars that are still missing. */
    missing: string[];
}

function readEnv(name: string): string | null {
    const value = process.env[name];
    return value && value.trim().length > 0 ? value.trim() : null;
}

/** Snapshots the current billing configuration from the process env. */
export function billingConfig(): BillingConfig {
    const secretKey = readEnv('STRIPE_SECRET_KEY');
    const webhookSecret = readEnv('STRIPE_WEBHOOK_SECRET');
    const portalConfigurationId = readEnv('STRIPE_PORTAL_CONFIGURATION_ID');

    const prices: Partial<Record<CheckoutPlan, string>> = {};
    const missing: string[] = [];
    for (const varName of REQUIRED_ENV) {
        if (!readEnv(varName)) missing.push(varName);
    }
    for (const plan of CHECKOUT_PLANS) {
        const value = readEnv(PRICE_ENV[plan]);
        if (value) {
            prices[plan] = value;
        } else {
            prices[plan] = undefined;
            // A price id is required per plan, but we surface it per-plan rather
            // than blocking the whole integration, so Pro can ship before Team.
            missing.push(PRICE_ENV[plan]);
        }
    }

    const appUrl = (
        readEnv('NEXT_PUBLIC_APP_URL') ??
        readEnv('AUTH_URL') ??
        'http://localhost:3000'
    ).replace(/\/+$/, '');

    return {
        configured: Boolean(secretKey && webhookSecret),
        secretKey,
        webhookSecret,
        prices,
        portalConfigurationId,
        appUrl,
        missing,
    };
}

/** True when Checkout/portal/webhooks can be exercised right now. */
export function isBillingConfigured(): boolean {
    return billingConfig().configured;
}

/** Case-insensitive validation of a plan slug coming from the URL or body. */
export function isCheckoutPlan(value: unknown): value is CheckoutPlan {
    return (
        typeof value === 'string' &&
        (CHECKOUT_PLANS as readonly string[]).includes(value.toUpperCase())
    );
}

/** Normalise any plan-ish string to a {@link CheckoutPlan}, else null. */
export function toCheckoutPlan(value: unknown): CheckoutPlan | null {
    if (!isCheckoutPlan(value)) return null;
    return value.toUpperCase() as CheckoutPlan;
}

/** The Stripe price id configured for `plan`, or null when unset. */
export function priceIdForPlan(plan: CheckoutPlan): string | null {
    return billingConfig().prices[plan] ?? null;
}

/** Reverse lookup: which plan does this Stripe price id belong to? */
export function planForPriceId(priceId: string | null | undefined): CheckoutPlan | null {
    if (!priceId) return null;
    const { prices } = billingConfig();
    for (const plan of CHECKOUT_PLANS) {
        if (prices[plan] === priceId) return plan;
    }
    return null;
}

/**
 * Map a Stripe subscription lifecycle status onto our enum.
 * Anything unknown (or mid-flight like `incomplete`) degrades to `INACTIVE`,
 * which `resolvePlan` treats as a downgrade to FREE — the safe default.
 */
export function mapStripeSubscriptionStatus(status: string | null | undefined): BillingStatus {
    switch ((status ?? '').toLowerCase()) {
        case 'active':
            return 'ACTIVE';
        case 'trialing':
            return 'TRIALING';
        case 'past_due':
        case 'unpaid':
            return 'PAST_DUE';
        case 'canceled':
        case 'incomplete_expired':
            return 'CANCELED';
        case 'paused':
        case 'incomplete':
        default:
            return 'INACTIVE';
    }
}

/** Extract the plan for a subscription object: metadata wins, then price id. */
export function planFromSubscription(subscription: {
    metadata?: Record<string, string> | null;
    items?: { data?: Array<{ price?: { id?: string | null } | null }> } | null;
}): CheckoutPlan | null {
    const fromMetadata = toCheckoutPlan(subscription.metadata?.plan);
    if (fromMetadata) return fromMetadata;
    const priceId = subscription.items?.data?.[0]?.price?.id ?? null;
    return planForPriceId(priceId);
}

// ─── Webhook signature verification (the standard Stripe scheme) ──────────────

export interface ParsedSignature {
    timestamp: number;
    signatures: string[];
}

/** Parse a `Stripe-Signature` header (`t=…,v1=…,v1=…`). */
export function parseStripeSignature(header: string | null): ParsedSignature | null {
    if (!header) return null;
    let timestamp = 0;
    const signatures: string[] = [];
    for (const part of header.split(',')) {
        const [key, value] = part.split('=');
        if (!key || !value) continue;
        const k = key.trim();
        if (k === 't') timestamp = Number(value.trim());
        else if (k === 'v1') signatures.push(value.trim());
    }
    if (!Number.isFinite(timestamp) || signatures.length === 0) return null;
    return { timestamp, signatures };
}

/**
 * Verify a signed webhook payload. Returns true only when a `v1` signature
 * matches `HMAC-SHA256(secret, "<t>.<payload>")` in constant time *and* the
 * timestamp is within `toleranceSec` of `nowSec` (replay protection).
 */
export function verifyStripeSignature(
    payload: string,
    header: string | null,
    secret: string | null | undefined,
    toleranceSec = 300,
    nowSec = Math.floor(Date.now() / 1000),
): boolean {
    if (!secret) return false;
    const parsed = parseStripeSignature(header);
    if (!parsed) return false;
    if (toleranceSec > 0 && Math.abs(nowSec - parsed.timestamp) > toleranceSec) {
        return false;
    }

    const expected = createHmac('sha256', secret)
        .update(`${parsed.timestamp}.${payload}`, 'utf8')
        .digest('hex');
    const expectedBuf = Buffer.from(expected, 'utf8');

    for (const candidate of parsed.signatures) {
        const candidateBuf = Buffer.from(candidate, 'utf8');
        if (candidateBuf.length !== expectedBuf.length) continue;
        if (timingSafeEqual(candidateBuf, expectedBuf)) return true;
    }
    return false;
}

/** Convenience: compute a valid signature (used by tests and local tooling). */
export function signStripePayload(
    payload: string,
    secret: string,
    timestamp: number = Math.floor(Date.now() / 1000),
): string {
    const signature = createHmac('sha256', secret)
        .update(`${timestamp}.${payload}`, 'utf8')
        .digest('hex');
    return `t=${timestamp},v1=${signature}`;
}
