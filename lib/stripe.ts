// lib/stripe.ts — minimal, dependency-free Stripe REST client
//
// We deliberately avoid the `stripe` npm package: everything the billing
// pillars need (Checkout Sessions, Billing Portal Sessions, Subscription
// retrieval) is a handful of form-encoded POSTs / GETs. Keeping it here means
// zero install, zero bundle weight, and full control over timeouts/errors.
//
// All calls are no-ops until `STRIPE_SECRET_KEY` is set (see lib/billing.ts).
// Docs: https://docs.stripe.com/api

import { logger } from '@/lib/logger';

const STRIPE_API_BASE = 'https://api.stripe.com/v1';

/** Subset of a Stripe object we rely on — kept loose on purpose. */
export interface StripeObject {
    id: string;
    object: string;
    [key: string]: unknown;
}

export interface StripeSubscription extends StripeObject {
    status: string;
    customer: string;
    metadata: Record<string, string> | null;
    items?: {
        data?: Array<{ price?: { id?: string | null } | null }>;
    } | null;
}

export class StripeError extends Error {
    readonly status: number;
    readonly type: string | null;
    constructor(message: string, status: number, type: string | null = null) {
        super(message);
        this.name = 'StripeError';
        this.status = status;
        this.type = type;
    }
}

function secretKey(): string | null {
    const key = process.env.STRIPE_SECRET_KEY;
    return key && key.trim().length > 0 ? key.trim() : null;
}

export function stripeConfigured(): boolean {
    return secretKey() !== null;
}

/**
 * Flatten a nested params object into Stripe's bracket form-encoding
 * (`metadata[plan]=PRO`, `line_items[0][price]=price_…`). Returns an array of
 * key/value tuples so repeated keys survive the URLSearchParams round-trip.
 */
export function flattenParams(
    input: Record<string, unknown>,
    prefix = '',
): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [key, value] of Object.entries(input)) {
        if (value === undefined || value === null) continue;
        const encodedKey = prefix ? `${prefix}[${key}]` : key;
        if (Array.isArray(value)) {
            // Drop null/undefined entries *and re-index* so the output stays
            // contiguous (`[0]`, `[1]`, …) — Stripe rejects sparse arrays.
            const items = value.filter((item) => item !== undefined && item !== null);
            items.forEach((item, index) => {
                if (typeof item === 'object') {
                    out.push(...flattenParams(item as Record<string, unknown>, `${encodedKey}[${index}]`));
                } else {
                    out.push([`${encodedKey}[${index}]`, String(item)]);
                }
            });
        } else if (typeof value === 'object') {
            out.push(...flattenParams(value as Record<string, unknown>, encodedKey));
        } else {
            out.push([encodedKey, String(value)]);
        }
    }
    return out;
}

interface RequestOptions {
    method?: 'GET' | 'POST' | 'DELETE';
    body?: Record<string, unknown>;
    idempotencyKey?: string;
}

/**
 * Thin wrapper over the Stripe REST API. Throws {@link StripeError} on failure
 * (including when the key is absent) so callers can translate to HTTP.
 */
export async function stripeRequest<T extends StripeObject = StripeObject>(
    path: string,
    { method = 'POST', body, idempotencyKey }: RequestOptions = {},
): Promise<T> {
    const key = secretKey();
    if (!key) {
        throw new StripeError('Stripe is not configured (missing STRIPE_SECRET_KEY)', 503, 'config_error');
    }

    const url = `${STRIPE_API_BASE}${path}`;
    const headers: Record<string, string> = {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey;

    const encoded = body ? new URLSearchParams(flattenParams(body)).toString() : undefined;
    // GET/DELETE carry no body; append params to the query string instead.
    const finalUrl =
        encoded && method !== 'POST' ? `${url}?${encoded}` : url;

    let response: Response;
    try {
        response = await fetch(finalUrl, {
            method,
            headers,
            body: method === 'POST' ? encoded : undefined,
            // Never let a hung Stripe call wedge a route handler.
            signal: AbortSignal.timeout(15_000),
        });
    } catch (error) {
        logger.error('Stripe request failed (network)', {
            path,
            error: error instanceof Error ? error.message : String(error),
        });
        throw new StripeError('Unable to reach Stripe', 502, 'network_error');
    }

    const text = await response.text();
    let json: unknown = null;
    try {
        json = text ? JSON.parse(text) : null;
    } catch {
        json = null;
    }

    if (!response.ok) {
        const err = (json as { error?: { message?: string; type?: string } } | null)?.error;
        logger.warn('Stripe API error', { path, status: response.status, type: err?.type });
        throw new StripeError(err?.message ?? `Stripe request failed (${response.status})`, response.status, err?.type ?? null);
    }

    return json as T;
}

// ─── High-level helpers used by the routes ───────────────────────────────────

export interface CreateCheckoutSessionInput {
    priceId: string;
    quantity?: number;
    customerId?: string | null;
    customerEmail?: string | null;
    clientReferenceId?: string | null;
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string>;
    trialPeriodDays?: number;
    allowPromotionCodes?: boolean;
}

/** Create a subscription-mode Checkout Session and return it (has `url`). */
export async function createCheckoutSession(
    input: CreateCheckoutSessionInput,
): Promise<StripeObject & { url?: string | null }> {
    const body: Record<string, unknown> = {
        mode: 'subscription',
        'line_items': [{ price: input.priceId, quantity: input.quantity ?? 1 }],
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
    };
    if (input.customerId) body.customer = input.customerId;
    else if (input.customerEmail) body.customer_email = input.customerEmail;
    if (input.clientReferenceId) body.client_reference_id = input.clientReferenceId;
    if (input.metadata && Object.keys(input.metadata).length > 0) body.metadata = input.metadata;
    if (input.trialPeriodDays && input.trialPeriodDays > 0) {
        body.subscription_data = { trial_period_days: input.trialPeriodDays };
    }
    if (input.allowPromotionCodes) body.allow_promotion_codes = true;

    return stripeRequest('/checkout/sessions', {
        method: 'POST',
        body,
        idempotencyKey: input.clientReferenceId
            ? `checkout:${input.clientReferenceId}:${input.priceId}`
            : undefined,
    });
}

export interface CreatePortalSessionInput {
    customerId: string;
    returnUrl: string;
    configurationId?: string | null;
}

/** Create a Billing Portal session so customers can self-serve their plan. */
export async function createBillingPortalSession(
    input: CreatePortalSessionInput,
): Promise<StripeObject & { url?: string | null }> {
    const body: Record<string, unknown> = {
        customer: input.customerId,
        return_url: input.returnUrl,
    };
    if (input.configurationId) body.configuration_id = input.configurationId;
    return stripeRequest('/billing_portal/sessions', { method: 'POST', body });
}

/** Retrieve a subscription (used to reconcile after `checkout.session.completed`). */
export async function retrieveSubscription(id: string): Promise<StripeSubscription> {
    return stripeRequest<StripeSubscription>(`/subscriptions/${id}`, { method: 'GET' });
}

export interface CreateCustomerInput {
    email?: string | null;
    name?: string | null;
    metadata?: Record<string, string>;
}

/** Create a Stripe Customer (used when we have no `stripeCustomerId` yet). */
export async function createCustomer(input: CreateCustomerInput): Promise<StripeObject> {
    const body: Record<string, unknown> = {};
    if (input.email) body.email = input.email;
    if (input.name) body.name = input.name;
    if (input.metadata) body.metadata = input.metadata;
    return stripeRequest('/customers', { method: 'POST', body });
}
