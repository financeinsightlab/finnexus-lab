// lib/community-store.ts — profiles, follows, notifications & gamification
// (Pillar D2/D3/D4)
//
// The badge-points maths is pure; profile/follow/notification persistence is a
// thin wrapper over the matching tables.

import { prisma } from '@/lib/prisma';

// ─── Gamification (pure) ──────────────────────────────────────────────────────

export interface BadgeRule {
    slug: string;
    points: number;
}

export interface BadgeCandidate {
    slug: string;
    name: string;
    icon: string;
}

/** Reward table — thresholds map to badge slugs. Pure & testable. */
export const BADGE_CATALOG = {
    'first-steps': { name: 'First Steps', icon: '🌱', points: 10, threshold: 1 },
    'commenter': { name: 'Conversation Starter', icon: '💬', points: 25, threshold: 5 },
    'predictor': { name: 'Forecaster', icon: '🔮', points: 50, threshold: 3 },
    'learner': { name: 'Committed Learner', icon: '📚', points: 75, threshold: 10 },
    'streak-7': { name: 'Week Streak', icon: '🔥', points: 100, threshold: 7 },
} as const;

export type BadgeSlug = keyof typeof BADGE_CATALOG;

export interface GamificationStats {
    comments: number;
    predictions: number;
    lessonsCompleted: number;
    streakDays: number;
}

/** Badge slugs the user has qualified for, given their stats. */
export function earnedBadges(stats: GamificationStats): BadgeSlug[] {
    const map: Record<BadgeSlug, number> = {
        'first-steps': stats.comments + stats.predictions + stats.lessonsCompleted,
        'commenter': stats.comments,
        'predictor': stats.predictions,
        'learner': stats.lessonsCompleted,
        'streak-7': stats.streakDays,
    };
    return (Object.keys(BADGE_CATALOG) as BadgeSlug[]).filter(
        (slug) => map[slug] >= BADGE_CATALOG[slug].threshold,
    );
}

/** Total gamification points from the badges a user has earned. */
export function pointsFor(slugs: readonly BadgeSlug[]): number {
    return slugs.reduce((sum, slug) => sum + BADGE_CATALOG[slug].points, 0);
}

/** Award any newly-qualified badges and return the awarded slugs + points. */
export async function evaluateBadges(userId: string, stats: GamificationStats) {
    const slugs = earnedBadges(stats);
    const badges = await prisma.badge.findMany({ where: { slug: { in: slugs } } });
    const owned = await prisma.userBadge.findMany({ where: { userId }, select: { badgeId: true } });
    const ownedIds = new Set(owned.map((b) => b.badgeId));

    const toAward = badges.filter((b) => !ownedIds.has(b.id));
    if (toAward.length > 0) {
        await prisma.userBadge.createMany({ data: toAward.map((b) => ({ userId, badgeId: b.id })) });
    }
    return { awarded: toAward.map((b) => b.slug), points: pointsFor(slugs) };
}

// ─── Profiles ────────────────────────────────────────────────────────────────

export interface ProfileInput {
    headline?: string;
    bio?: string;
    location?: string;
    website?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    isPublic?: boolean;
}

export async function upsertProfile(userId: string, input: ProfileInput) {
    return prisma.profile.upsert({
        where: { userId },
        create: { userId, ...input },
        update: { ...input },
    });
}

export async function getPublicProfile(userId: string) {
    return prisma.profile.findFirst({
        where: { userId, isPublic: true },
        include: { user: { select: { id: true, name: true, image: true, role: true, createdAt: true } } },
    });
}

// ─── Follows ─────────────────────────────────────────────────────────────────

export async function follow(followerId: string, followingId: string) {
    if (followerId === followingId) throw new Error('Cannot follow yourself');
    const created = await prisma.follow.upsert({
        where: { followerId_followingId: { followerId, followingId } },
        create: { followerId, followingId },
        update: {},
    });
    const pref = await prisma.notificationPreference.findUnique({ where: { userId: followingId } });
    if (!pref || pref.follows) {
        await prisma.notification.create({
            data: { userId: followingId, type: 'follow', title: 'You have a new follower' },
        });
    }
    return created;
}

export async function unfollow(followerId: string, followingId: string) {
    await prisma.follow.deleteMany({ where: { followerId, followingId } });
}

export async function followCounts(userId: string) {
    const [following, followers] = await Promise.all([
        prisma.follow.count({ where: { followerId: userId } }),
        prisma.follow.count({ where: { followingId: userId } }),
    ]);
    return { following, followers };
}

// ─── Notifications ───────────────────────────────────────────────────────────

export async function listNotifications(userId: string, limit = 30) {
    return prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit,
    });
}

export async function unreadCount(userId: string) {
    return prisma.notification.count({ where: { userId, read: false } });
}

export async function markNotificationsRead(userId: string, ids?: string[]) {
    return prisma.notification.updateMany({
        where: { userId, read: false, ...(ids && ids.length > 0 ? { id: { in: ids } } : {}) },
        data: { read: true },
    });
}

export async function getNotificationPreferences(userId: string) {
    return prisma.notificationPreference.upsert({
        where: { userId },
        create: { userId },
        update: {},
    });
}

export async function updateNotificationPreferences(
    userId: string,
    input: Partial<{ emailDigest: boolean; productUpdates: boolean; comments: boolean; follows: boolean; marketing: boolean }>,
) {
    return prisma.notificationPreference.upsert({
        where: { userId },
        create: { userId, ...input },
        update: { ...input },
    });
}
