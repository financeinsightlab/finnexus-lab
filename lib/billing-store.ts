// lib/billing-store.ts — persistence for the Stripe billing webhook (Pillar A1/A3)
//
// Keeps every Prisma write for the billing pillars in one place so the route
// handlers stay thin and the redirect behaviours (dunning, cancellation,
// trials) are auditable. All functions are safe to call before Stripe is
// configured — they simply never run.

import { SubscriptionStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import {
    mapStripeSubscriptionStatus as mapStatus,
    type BillingStatus,
    type CheckoutPlan,
} from '@/lib/billing';

/** Narrow, structural shape of the bits of the session/subscription we read. */
interface CheckoutSessionLike {
    customer?: string | { id?: string } | null;
    customer_email?: string | null;
    client_reference_id?: string | null;
    subscription?: string | { id?: string } | null;
    metadata?: Record<string, string> | null;
}

interface SubscriptionLike {
    id?: string | null;
    customer?: string | { id?: string } | null;
    status?: string | null;
    metadata?: Record<string, string> | null;
}

function asId(value: string | { id?: string } | null | undefined): string | null {
    if (!value) return null;
    return typeof value === 'string' ? value : value.id ?? null;
}

/** Map the pure `BillingStatus` onto the generated Prisma enum. */
function toPrismaStatus(status: BillingStatus): SubscriptionStatus {
    return SubscriptionStatus[status];
}

/** Resolve the local user id a Stripe customer belongs to (if any). */
export async function userIdForCustomer(customerId: string | null): Promise<string | null> {
    if (!customerId) return null;
    const user = await prisma.user.findUnique({
        where: { stripeCustomerId: customerId },
        select: { id: true },
    });
    return user?.id ?? null;
}

export interface ApplySubscriptionInput {
    userId: string;
    plan: CheckoutPlan;
    status: BillingStatus;
    customerId?: string | null;
    subscriptionId?: string | null;
}

/**
 * Single write-path for updating a user's entitlement-bearing billing columns.
 * Used by both `checkout.session.completed` and every `customer.subscription.*`
 * event, so the two can never disagree.
 */
export async function applySubscription(input: ApplySubscriptionInput): Promise<void> {
    const data: {
        subscriptionPlan: string;
        subscriptionStatus: SubscriptionStatus;
        stripeCustomerId?: string;
        stripeSubscriptionId?: string | null;
    } = {
        // Store the plan slug (`PRO`/`ELITE`/`TEAM`) — the same vocabulary
        // `normalizePlan` in lib/entitlements.ts already understands.
        subscriptionPlan: input.plan,
        subscriptionStatus: toPrismaStatus(input.status),
    };
    if (input.customerId) data.stripeCustomerId = input.customerId;
    if (input.subscriptionId !== undefined) data.stripeSubscriptionId = input.subscriptionId;

    await prisma.user.update({ where: { id: input.userId }, data });
    logger.info('Billing synced for user', {
        userId: input.userId,
        plan: input.plan,
        status: input.status,
    });
}

/**
 * Reconcile a completed Checkout Session. Prefers the plan captured in the
 * session metadata, falling back to the subscription object's metadata/price.
 */
export async function syncFromCheckoutSession(
    session: CheckoutSessionLike,
    subscription: SubscriptionLike | null,
): Promise<boolean> {
    const customerId = asId(session.customer);
    const userId =
        session.client_reference_id ?? (await userIdForCustomer(customerId));
    if (!userId) {
        logger.warn('Checkout session completed but no matching user', { customerId });
        return false;
    }

    const plan =
        (session.metadata?.plan as CheckoutPlan | undefined) ??
        (subscription?.metadata?.plan as CheckoutPlan | undefined);
    if (!plan) {
        logger.warn('Checkout session completed without a plan in metadata', { userId });
        return false;
    }

    const status: BillingStatus = subscription?.status
        ? mapStatus(subscription.status)
        : 'ACTIVE';

    await applySubscription({
        userId,
        plan,
        status,
        customerId,
        subscriptionId: asId(session.subscription) ?? subscription?.id ?? null,
    });
    return true;
}

/** Reconcile any subscription lifecycle event by customer (or user metadata). */
export async function syncFromSubscription(subscription: SubscriptionLike): Promise<boolean> {
    const customerId = asId(subscription.customer);
    const userId =
        subscription.metadata?.userId ?? (await userIdForCustomer(customerId));
    if (!userId) {
        logger.warn('Subscription event for unknown customer', { customerId });
        return false;
    }

    const plan = subscription.metadata?.plan as CheckoutPlan | undefined;
    if (!plan) {
        logger.warn('Subscription event without a plan in metadata', { userId });
        return false;
    }

    await applySubscription({
        userId,
        plan,
        status: mapStatus(subscription.status ?? 'inactive'),
        customerId,
        subscriptionId: subscription.id ?? null,
    });
    return true;
}

/** Persist the Stripe customer id the first time we create/attach one. */
export async function attachStripeCustomer(userId: string, customerId: string): Promise<void> {
    await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId },
    });
}

/** Read the billing columns for the account page / portal route. */
export async function getBillingProfile(userId: string) {
    return prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            stripeCustomerId: true,
            subscriptionPlan: true,
            subscriptionStatus: true,
        },
    });
}
