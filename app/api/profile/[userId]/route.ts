// app/api/profile/[userId]/route.ts — public profile view (Pillar D2/D4)

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-guards';
import { logger } from '@/lib/logger';
import { followCounts, getPublicProfile } from '@/lib/community-store';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ userId: string }> },
) {
    const { userId } = await params;

    try {
        const [profile, counts, badges, viewer] = await Promise.all([
            getPublicProfile(userId),
            followCounts(userId),
            prisma.userBadge.findMany({
                where: { userId },
                include: { badge: true },
                orderBy: { awardedAt: 'desc' },
            }),
            getCurrentUser(),
        ]);

        if (!profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }

        let isFollowing = false;
        if (viewer?.id && viewer.id !== userId) {
            const edge = await prisma.follow.findUnique({
                where: { followerId_followingId: { followerId: viewer.id, followingId: userId } },
                select: { id: true },
            });
            isFollowing = Boolean(edge);
        }

        return NextResponse.json({
            profile,
            counts,
            badges: badges.map((b) => ({ ...b.badge, awardedAt: b.awardedAt })),
            isFollowing,
        });
    } catch (error) {
        logger.error('Error loading public profile', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
