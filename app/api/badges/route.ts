// app/api/badges/route.ts — gamification badges & points (Pillar D4)

import { NextResponse } from 'next/server';
import { authorizeApi } from '@/lib/auth-guards';
import { logger } from '@/lib/logger';
import { activeStreak } from '@/lib/learning-progress';
import { getActivityDates } from '@/lib/learning-store';
import { BADGE_CATALOG, evaluateBadges, pointsFor, type BadgeSlug } from '@/lib/community-store';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    try {
        const [owned, activityDates, comments, predictions, lessons] = await Promise.all([
            prisma.userBadge.findMany({
                where: { userId: auth.user.id },
                include: { badge: true },
            }),
            getActivityDates(auth.user.id),
            prisma.comment.count({ where: { authorId: auth.user.id } }),
            prisma.prediction.count({ where: { authorId: auth.user.id } }),
            prisma.lessonProgress.count({ where: { userId: auth.user.id, completed: true } }),
        ]);

        const streakDays = activeStreak(activityDates, new Date().toISOString().slice(0, 10));
        const earned = await evaluateBadges(auth.user.id, {
            comments,
            predictions,
            lessonsCompleted: lessons,
            streakDays,
        });

        const slugs = Object.keys(BADGE_CATALOG) as BadgeSlug[];
        const catalog = slugs.map((slug) => {
            const rule = BADGE_CATALOG[slug];
            const ownedBadge = owned.find((o) => o.badge.slug === slug);
            return {
                slug,
                name: rule.name,
                icon: rule.icon,
                points: rule.points,
                threshold: rule.threshold,
                awardedAt: ownedBadge?.awardedAt ?? null,
            };
        });

        return NextResponse.json({
            catalog,
            points: earned.points,
            newlyAwarded: earned.awarded,
            stats: { comments, predictions, lessons, streakDays },
        });
    } catch (error) {
        logger.error('Error evaluating badges', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST() {
    // Convenience endpoint for "recompute now" (same maths as GET).
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    try {
        const activityDates = await getActivityDates(auth.user.id);
        const [comments, predictions, lessons] = await Promise.all([
            prisma.comment.count({ where: { authorId: auth.user.id } }),
            prisma.prediction.count({ where: { authorId: auth.user.id } }),
            prisma.lessonProgress.count({ where: { userId: auth.user.id, completed: true } }),
        ]);
        const streakDays = activeStreak(activityDates, new Date().toISOString().slice(0, 10));
        const result = await evaluateBadges(auth.user.id, {
            comments,
            predictions,
            lessonsCompleted: lessons,
            streakDays,
        });
        return NextResponse.json({ ...result, points: result.points || pointsFor([]) });
    } catch (error) {
        logger.error('Error recomputing badges', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
