import { NextResponse } from 'next/server';
import { authorizeApi } from '@/lib/auth-guards';
import { prisma } from '@/lib/prisma';
import { normalizePlan, resolvePlan } from '@/lib/entitlements';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    const profile = await prisma.user.findUnique({
        where: { id: auth.user.id },
        select: {
            role: true,
            subscriptionPlan: true,
            subscriptionStatus: true,
            subscriptionExpiresAt: true,
        },
    });
    if (!profile) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const resolvedPlan = resolvePlan(profile);
    const storedPlan = normalizePlan(profile.subscriptionPlan);
    const expired = Boolean(
        profile.subscriptionExpiresAt && profile.subscriptionExpiresAt.getTime() <= Date.now(),
    );
    const status = expired ? 'INACTIVE' : profile.subscriptionStatus;
    const renewalPlan = storedPlan === 'PRO' || storedPlan === 'ELITE' ? storedPlan.toLowerCase() : null;

    return NextResponse.json(
        {
            provider: 'MANUAL_UPI',
            plan: profile.subscriptionPlan,
            status,
            resolvedPlan,
            expiresAt: profile.subscriptionExpiresAt?.toISOString() ?? null,
            renewalHref: renewalPlan ? `/checkout/${renewalPlan}` : '/pricing',
            renewalRequiresApproval: true,
        },
        { headers: { 'Cache-Control': 'private, no-store, max-age=0' } },
    );
}
