// app/api/checkout/route.ts — create a Stripe Checkout Session (Pillar A1)
//
// POST { plan: 'PRO' | 'ELITE' | 'TEAM', interval?: 'month'|'year' }
//   → { url } to redirect the browser to Stripe Checkout.
//
// Fully env-gated: without Stripe keys this returns 503 with the *exact* list
// of variables to set, and the UI degrades to the contact/signup fallback.

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';
import {
    billingConfig,
    CHECKOUT_PLANS,
    priceIdForPlan,
    type CheckoutPlan,
} from '@/lib/billing';
import { attachStripeCustomer, getBillingProfile } from '@/lib/billing-store';
import { createCheckoutSession, createCustomer, StripeError } from '@/lib/stripe';

export const runtime = 'nodejs';

const bodySchema = z.object({
    plan: z.enum(CHECKOUT_PLANS),
    /** Only monthly is wired today; kept explicit for the annual upsell. */
    quantity: z.number().int().min(1).max(500).optional(),
});

/** GET — lets the pricing UI show whether checkout is live (no secrets leaked). */
export async function GET() {
    const config = billingConfig();
    return NextResponse.json({
        configured: config.configured,
        // Never expose the secret itself — only which vars are still missing.
        missing: config.missing,
        plans: CHECKOUT_PLANS.filter((plan) => Boolean(config.prices[plan])),
    });
}

export async function POST(request: Request) {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;
    const user = auth.user;

    const parsed = await parseJsonBody(request, bodySchema);
    if (!parsed.ok) return parsed.response;
    const plan = parsed.data.plan as CheckoutPlan;

    const config = billingConfig();
    if (!config.configured) {
        return NextResponse.json(
            {
                error: 'Billing is not configured yet.',
                missing: config.missing,
                hint: 'Add the Stripe test-mode keys to enable checkout, or contact us for manual onboarding.',
            },
            { status: 503 },
        );
    }

    const priceId = priceIdForPlan(plan);
    if (!priceId) {
        return NextResponse.json(
            {
                error: `No Stripe price is configured for the ${plan} plan.`,
                missing: [`STRIPE_PRICE_${plan}`],
            },
            { status: 503 },
        );
    }

    try {
        // Reuse the stored Stripe customer, creating one on first purchase.
        const profile = await getBillingProfile(user.id);
        let customerId = profile?.stripeCustomerId ?? null;
        if (!customerId) {
            const customer = await createCustomer({
                email: user.email ?? null,
                name: user.name ?? null,
                metadata: { userId: user.id },
            });
            customerId = customer.id;
            await attachStripeCustomer(user.id, customerId);
        }

        const session = await createCheckoutSession({
            priceId,
            quantity: parsed.data.quantity ?? 1,
            customerId,
            customerEmail: user.email ?? null,
            clientReferenceId: user.id,
            metadata: { userId: user.id, plan },
            allowPromotionCodes: true,
            successUrl: `${config.appUrl}/account?checkout=success`,
            cancelUrl: `${config.appUrl}/pricing?checkout=cancelled`,
        });

        if (!session.url) {
            logger.error('Stripe Checkout session created without a url', { userId: user.id, plan });
            return NextResponse.json({ error: 'Stripe did not return a checkout URL' }, { status: 502 });
        }

        logger.info('Checkout session created', { userId: user.id, plan });
        return NextResponse.json({ url: session.url, id: session.id });
    } catch (error) {
        if (error instanceof StripeError) {
            return NextResponse.json({ error: error.message }, { status: error.status });
        }
        logger.error('Checkout session failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
