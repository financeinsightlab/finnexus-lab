// lib/entitlements.ts — plan/entitlement model (single source of truth)
//
// This module draws the line the dashboard previously blurred:
//
//   • UserRole            → PERMISSIONS (what you may operate: admin access)
//   • subscriptionPlan    → ENTITLEMENTS (what content you can consume)
//
// Plans are intentionally kept as string literals (the DB stores an optional
// `subscriptionPlan` String) so ops can add plans without a migration. UserRole
// stays the Prisma enum (MEMBER | VIEWER | ADMIN | ANALYST).

import type { SubscriptionStatus, UserRole } from '@prisma/client';

export const PLAN_IDS = ['FREE', 'PRO', 'ELITE', 'TEAM', 'ENTERPRISE'] as const;
export type PlanId = (typeof PLAN_IDS)[number];

export interface PlanDefinition {
    id: PlanId;
    name: string;
    /** Short marketing blurb used on the dashboard + pricing page. */
    tagline: string;
    /** Feature bullets unlocked by the plan. */
    benefits: readonly string[];
    /** True when the plan is a paid tier (i.e. not FREE). */
    paid: boolean;
}

export const PLAN_CATALOG: Record<PlanId, PlanDefinition> = {
    FREE: {
        id: 'FREE',
        name: 'Free',
        tagline: 'Access to public research and insights.',
        benefits: ['Public research & insights', 'Community access', 'Open financial tools'],
        paid: false,
    },
    PRO: {
        id: 'PRO',
        name: 'Pro',
        tagline: 'One calendar month of manually approved access to content marked Pro.',
        benefits: [
            'Free public research and insights',
            'Access to Pro-gated calculators',
            'Access to Pro-gated sector tracker sections',
        ],
        paid: true,
    },
    ELITE: {
        id: 'ELITE',
        name: 'Elite',
        tagline: 'Current Elite access uses the same content gates as Pro.',
        benefits: [
            'Everything in Free',
            'Access to currently Pro-gated content',
            'No separate Elite-only features or priority service are currently offered',
        ],
        paid: true,
    },
    TEAM: {
        id: 'TEAM',
        name: 'Team',
        tagline: 'Team access requires a separate scope and availability review.',
        benefits: ['Contact-led scope discussion', 'No self-service seats or team analytics are currently offered'],
        paid: true,
    },
    ENTERPRISE: {
        id: 'ENTERPRISE',
        name: 'Enterprise',
        tagline: 'Enterprise requirements are considered individually.',
        benefits: ['Contact for current availability', 'No published SSO, API, or service-level commitments'],
        paid: true,
    },
};

/** Commercial display data for a plan (used by the public pricing page). */
export interface PlanPricing {
    /** Display price, e.g. "₹999". */
    price: string;
    /** Billing period shown next to the price, e.g. "/month". */
    period: string;
    /** One-line marketing description. */
    description: string;
    /** Primary call-to-action label. */
    cta: string;
    /** Where the CTA sends the visitor (checkout / contact / signup). */
    href: string;
}

export const PLAN_PRICING: Record<PlanId, PlanPricing> = {
    FREE: {
        price: '₹0',
        period: '/month',
        description: 'Perfect for getting started with financial intelligence',
        cta: 'Get Started Free',
        href: '/auth/signin',
    },
    PRO: {
        price: '₹999',
        period: '/month',
        description: 'Manual UPI payment; access starts after administrator approval and lasts one calendar month.',
        cta: 'Start Pro',
        href: '/checkout/pro',
    },
    ELITE: {
        price: '₹1,999',
        period: '/month',
        description: 'One calendar month after manual approval; current content access is the same as Pro.',
        cta: 'Review Elite details',
        href: '/checkout/elite',
    },
    TEAM: {
        price: 'Not listed',
        period: '',
        description: 'Team availability, features, and terms require a separate review.',
        cta: 'Enquire about Team',
        href: '/contact?service=Enterprise%20%2F%20Team%20Plan',
    },
    ENTERPRISE: {
        price: 'Not listed',
        period: '',
        description: 'Scope and availability must be confirmed before any engagement.',
        cta: 'Make an enquiry',
        href: '/enterprise',
    },
};

export function getPlanPricing(plan: PlanId): PlanPricing {
    return PLAN_PRICING[plan];
}

/** Shape of the entitlement-relevant subset of a user. */
export interface EntitledUser {
    role?: UserRole | null;
    subscriptionStatus?: SubscriptionStatus | null;
    subscriptionPlan?: string | null;
    /** Null/undefined preserves legacy or administrator-managed grants. */
    subscriptionExpiresAt?: Date | null;
}

/** Normalise an arbitrary stored plan string to a known {@link PlanId}. */
export function normalizePlan(plan: string | null | undefined): PlanId {
    if (!plan) return 'FREE';
    const upper = plan.toUpperCase();
    return (PLAN_IDS as readonly string[]).includes(upper) ? (upper as PlanId) : 'FREE';
}

/**
 * The effective plan a user is entitled to.
 *
 * Staff (ADMIN/ANALYST) always resolve to ENTERPRISE — they need full access
 * regardless of billing state. Everyone else only has their paid plan while
 * ACTIVE (or TRIALING), and before any recorded expiry; otherwise they are FREE.
 */
export function resolvePlan(user: EntitledUser | null | undefined): PlanId {
    if (!user) return 'FREE';
    if (user.role === 'ADMIN' || user.role === 'ANALYST') return 'ENTERPRISE';

    const plan = normalizePlan(user.subscriptionPlan);
    if (!PLAN_CATALOG[plan].paid) return 'FREE';

    const active = user.subscriptionStatus === 'ACTIVE' || user.subscriptionStatus === 'TRIALING';
    const unexpired = !user.subscriptionExpiresAt || user.subscriptionExpiresAt.getTime() > Date.now();
    return active && unexpired ? plan : 'FREE';
}

export function getPlanDefinition(plan: PlanId): PlanDefinition {
    return PLAN_CATALOG[plan];
}

/** Human label for a plan (e.g. for the dashboard badge). */
export function planLabel(user: EntitledUser | null | undefined): string {
    return PLAN_CATALOG[resolvePlan(user)].name;
}

/** Feature bullets for the current user's plan. */
export function planBenefits(user: EntitledUser | null | undefined): readonly string[] {
    return PLAN_CATALOG[resolvePlan(user)].benefits;
}

/** True when the user is on the free tier (i.e. should see an upsell). */
export function isFreeUser(user: EntitledUser | null | undefined): boolean {
    return resolvePlan(user) === 'FREE';
}

/**
 * Resource-level entitlement gate.
 *
 * `minimumPlan` is the plan required to consume a piece of content. This is the
 * function pages and API routes should call rather than reading raw roles.
 */
export function canAccess(
    user: EntitledUser | null | undefined,
    minimumPlan: PlanId = 'FREE',
): boolean {
    const rank = (plan: PlanId): number => PLAN_IDS.indexOf(plan);
    return rank(resolvePlan(user)) >= rank(minimumPlan);
}
