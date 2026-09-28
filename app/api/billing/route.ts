// app/api/billing/route.ts — current billing state for the signed-in user
//
// GET → { plan, status, resolvedPlan, hasCustomer, configured, missing }
// Powers the account page's "Manage subscription" affordance and lets the UI
// hide the portal button until a Stripe customer actually exists.

import { NextResponse } from 'next/server';
import { authorizeApi } from '@/lib/auth-guards';
import { billingConfig } from '@/lib/billing';
import { getBillingProfile } from '@/lib/billing-store';
import { resolvePlan } from '@/lib/entitlements';

export const runtime = 'nodejs';

export async function GET() {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    const config = billingConfig();
    const profile = await getBillingProfile(auth.user.id);
    const resolvedPlan = resolvePlan({
        role: auth.user.role,
        subscriptionStatus: auth.user.subscriptionStatus,
        subscriptionPlan: auth.user.subscriptionPlan,
    });

    return NextResponse.json({
        configured: config.configured,
        missing: config.missing,
        plan: profile?.subscriptionPlan ?? null,
        status: profile?.subscriptionStatus ?? 'INACTIVE',
        resolvedPlan,
        hasCustomer: Boolean(profile?.stripeCustomerId),
    });
}
