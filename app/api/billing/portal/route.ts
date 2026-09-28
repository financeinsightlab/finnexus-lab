// app/api/billing/portal/route.ts — Stripe Billing Portal session (Pillar A3)
//
// POST → { url } to the Stripe-hosted portal where a customer can update card,
// download invoices, switch plan or cancel. Self-serve, so support load drops.

import { NextResponse } from 'next/server';
import { authorizeApi } from '@/lib/auth-guards';
import { logger } from '@/lib/logger';
import { billingConfig } from '@/lib/billing';
import { getBillingProfile } from '@/lib/billing-store';
import { createBillingPortalSession, StripeError } from '@/lib/stripe';

export const runtime = 'nodejs';

export async function POST() {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    const config = billingConfig();
    if (!config.configured) {
        return NextResponse.json(
            { error: 'Billing is not configured yet.', missing: config.missing },
            { status: 503 },
        );
    }

    const profile = await getBillingProfile(auth.user.id);
    if (!profile?.stripeCustomerId) {
        // No customer record yet → never subscribed. Send them to pricing.
        return NextResponse.json(
            { error: 'No billing account yet.', redirect: '/pricing' },
            { status: 404 },
        );
    }

    try {
        const session = await createBillingPortalSession({
            customerId: profile.stripeCustomerId,
            returnUrl: `${config.appUrl}/account`,
            configurationId: config.portalConfigurationId,
        });
        if (!session.url) {
            return NextResponse.json({ error: 'Stripe did not return a portal URL' }, { status: 502 });
        }
        return NextResponse.json({ url: session.url });
    } catch (error) {
        if (error instanceof StripeError) {
            return NextResponse.json({ error: error.message }, { status: error.status });
        }
        logger.error('Billing portal session failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
