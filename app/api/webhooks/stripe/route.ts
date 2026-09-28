// app/api/webhooks/stripe/route.ts — Stripe event sink (Pillar A1/A3)
//
// Maps the subscription lifecycle onto our `subscriptionPlan` /
// `subscriptionStatus` columns so `resolvePlan` in lib/entitlements.ts always
// reflects reality — including PAST_DUE dunning and CANCELED churn.
//
// The route is *not* authenticated with a session: Stripe calls it
// server-to-server, so authenticity comes from the `Stripe-Signature` HMAC.
// We read the raw body text first (required for signature verification) and
// only then parse it as JSON.

import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { billingConfig, verifyStripeSignature } from '@/lib/billing';
import {
    syncFromCheckoutSession,
    syncFromSubscription,
} from '@/lib/billing-store';
import { retrieveSubscription } from '@/lib/stripe';

export const runtime = 'nodejs';

interface StripeEvent {
    id?: string;
    type?: string;
    data?: { object?: Record<string, unknown> };
}

const HANDLED_EVENTS = new Set([
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',
    'invoice.payment_failed',
    'invoice.payment_succeeded',
]);

export async function POST(request: Request) {
    const config = billingConfig();
    if (!config.configured) {
        // Nothing to verify against — tell Stripe we're not taking events yet.
        return NextResponse.json({ error: 'Billing is not configured' }, { status: 503 });
    }

    const payload = await request.text();
    const signature = request.headers.get('stripe-signature');
    if (!verifyStripeSignature(payload, signature, config.webhookSecret)) {
        logger.warn('Rejected Stripe webhook: invalid signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    let event: StripeEvent;
    try {
        event = JSON.parse(payload) as StripeEvent;
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const type = event.type ?? '';
    const object = event.data?.object ?? {};

    try {
        switch (type) {
            case 'checkout.session.completed': {
                const subscriptionId =
                    typeof object.subscription === 'string' ? object.subscription : null;
                const subscription = subscriptionId
                    ? await retrieveSubscription(subscriptionId).catch(() => null)
                    : null;
                await syncFromCheckoutSession(object, subscription);
                break;
            }
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
                await syncFromSubscription(object);
                break;
            case 'invoice.payment_failed':
            case 'invoice.payment_succeeded': {
                // Reconcile from the subscription so dunning + recovery reflect
                // Stripe's own status transition (past_due <-> active).
                const subscriptionId =
                    typeof object.subscription === 'string' ? object.subscription : null;
                if (subscriptionId) {
                    const subscription = await retrieveSubscription(subscriptionId).catch(() => null);
                    if (subscription) await syncFromSubscription(subscription);
                }
                break;
            }
            default:
                // Acknowledge unhandled event types so Stripe stops retrying.
                return NextResponse.json({ received: true, ignored: type });
        }
    } catch (error) {
        logger.error('Stripe webhook handler failed', {
            eventId: event.id,
            type,
            error: error instanceof Error ? error.message : String(error),
        });
        // 500 asks Stripe to retry — the failure is on our side, not the data.
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }

    return NextResponse.json({
        received: true,
        type,
        handled: HANDLED_EVENTS.has(type),
    });
}
