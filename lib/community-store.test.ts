import { describe, expect, it } from 'vitest';
import {
    BADGE_CATALOG,
    earnedBadges,
    pointsFor,
    type BadgeSlug,
    type GamificationStats,
} from '@/lib/community-store';

function stats(overrides: Partial<GamificationStats> = {}): GamificationStats {
    return {
        comments: 0,
        predictions: 0,
        lessonsCompleted: 0,
        streakDays: 0,
        ...overrides,
    };
}

describe('BADGE_CATALOG', () => {
    it('exposes a positive point value for every badge', () => {
        for (const rule of Object.values(BADGE_CATALOG)) {
            expect(rule.points).toBeGreaterThan(0);
            expect(rule.threshold).toBeGreaterThanOrEqual(1);
            expect(rule.name.length).toBeGreaterThan(0);
            expect(rule.icon.length).toBeGreaterThan(0);
        }
    });
});

describe('earnedBadges', () => {
    it('awards nothing for a brand-new user', () => {
        expect(earnedBadges(stats())).toEqual([]);
    });

    it('awards first-steps after any single qualifying activity', () => {
        expect(earnedBadges(stats({ comments: 1 }))).toContain('first-steps');
        expect(earnedBadges(stats({ predictions: 1 }))).toContain('first-steps');
        expect(earnedBadges(stats({ lessonsCompleted: 1 }))).toContain('first-steps');
    });

    it('counts first-steps across all activity categories', () => {
        // No single category reaches 1 on its own except via the sum.
        const slugs = earnedBadges(stats({ comments: 0, predictions: 1, lessonsCompleted: 0 }));
        expect(slugs).toContain('first-steps');
    });

    it('respects each badge threshold independently', () => {
        // 5 comments qualifies `commenter` but not `predictor` (needs 3 predictions).
        const slugs = earnedBadges(stats({ comments: 5 }));
        expect(slugs).toContain('commenter');
        expect(slugs).not.toContain('predictor');
        expect(slugs).not.toContain('learner');
    });

    it('does not award commenter below its threshold', () => {
        expect(earnedBadges(stats({ comments: 4 }))).not.toContain('commenter');
        expect(earnedBadges(stats({ comments: 5 }))).toContain('commenter');
    });

    it('awards the streak badge only at seven days or more', () => {
        expect(earnedBadges(stats({ streakDays: 6 }))).not.toContain('streak-7');
        expect(earnedBadges(stats({ streakDays: 7 }))).toContain('streak-7');
    });

    it('awards every badge for a power user', () => {
        const slugs = earnedBadges(
            stats({ comments: 20, predictions: 10, lessonsCompleted: 40, streakDays: 30 }),
        );
        expect(slugs.sort()).toEqual((Object.keys(BADGE_CATALOG) as BadgeSlug[]).sort());
    });
});

describe('pointsFor', () => {
    it('returns zero for no badges', () => {
        expect(pointsFor([])).toBe(0);
    });

    it('sums the catalog points for the awarded badges', () => {
        const slugs: BadgeSlug[] = ['first-steps', 'commenter'];
        const expected = BADGE_CATALOG['first-steps'].points + BADGE_CATALOG['commenter'].points;
        expect(pointsFor(slugs)).toBe(expected);
    });

    it('increases monotonically as badges are added', () => {
        const one = pointsFor(['first-steps']);
        const two = pointsFor(['first-steps', 'predictor']);
        expect(two).toBeGreaterThan(one);
    });

    it('matches the cumulative points of every earned badge', () => {
        const slugs = earnedBadges(stats({ comments: 20, predictions: 10, lessonsCompleted: 40, streakDays: 30 }));
        const expected = slugs.reduce((sum, slug) => sum + BADGE_CATALOG[slug].points, 0);
        expect(pointsFor(slugs)).toBe(expected);
    });
});
