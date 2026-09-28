// lib/recent-activity.ts — "New since your last visit" pure helpers (Pillar F4)
//
// Freshness is derived from content `date` / `publishedAt` / `createdAt` fields
// and compared against a stored "last seen" timestamp. Everything here is pure
// so it can be unit-tested without a database or the filesystem.

export type FreshKind = 'Research' | 'Insight' | 'Study' | 'Data Lab' | 'Case Study' | 'Podcast';

export interface FreshContentItem {
    /** Stable, kind-prefixed id — safe to use as a React key. */
    id: string;
    title: string;
    href: string;
    kind: FreshKind;
    /** ISO-8601 timestamp used for ordering and the "new" comparison. */
    date: string;
    /** Optional secondary label (sector, category, type). */
    meta?: string;
}

export interface FreshContentResult {
    items: FreshContentItem[];
    /** Number of fresh items per kind. */
    counts: Partial<Record<FreshKind, number>>;
    /** ISO timestamp of the most recent fresh item, or null when nothing is new. */
    latest: string | null;
    /** Total fresh items found (before `limit` is applied). */
    total: number;
}

export interface CollectOptions {
    /** Maximum items to return. Defaults to 8. */
    limit?: number;
}

function toTime(value: string | Date | null | undefined): number | null {
    if (value === null || value === undefined) return null;
    const parsed = value instanceof Date ? value : new Date(value);
    const time = parsed.getTime();
    return Number.isFinite(time) ? time : null;
}

/** Normalise any supported date representation to epoch milliseconds. */
export function contentTimestamp(
    value: string | Date | null | undefined,
): number | null {
    return toTime(value);
}

/**
 * Whether `date` is strictly newer than `since`.
 *
 * When `since` is null/undefined (a first visit) every dated item counts as new.
 * Items with an unparseable date are never considered new.
 */
export function isNewSince(
    date: string | Date | null | undefined,
    since: string | Date | null | undefined,
): boolean {
    const itemTime = toTime(date);
    if (itemTime === null) return false;
    const sinceTime = toTime(since);
    return sinceTime === null ? true : itemTime > sinceTime;
}

/**
 * Flatten the supplied content groups, keep only items newer than `since`,
 * order them newest-first and summarise the result.
 */
export function collectFreshContent(
    groups: readonly (readonly FreshContentItem[])[],
    since: string | Date | null | undefined,
    options: CollectOptions = {},
): FreshContentResult {
    const sinceTime = toTime(since);
    const limit = options.limit ?? 8;

    const dated = groups
        .flat()
        .map((item) => ({ item, time: toTime(item.date) }))
        .filter((entry): entry is { item: FreshContentItem; time: number } => entry.time !== null);

    const fresh = sinceTime === null ? dated : dated.filter((entry) => entry.time > sinceTime);
    fresh.sort((a, b) => b.time - a.time);

    const counts: Partial<Record<FreshKind, number>> = {};
    for (const { item } of fresh) {
        counts[item.kind] = (counts[item.kind] ?? 0) + 1;
    }

    const top = fresh[0];
    return {
        items: fresh.slice(0, limit).map((entry) => entry.item),
        counts,
        latest: top ? new Date(top.time).toISOString() : null,
        total: fresh.length,
    };
}

// ─── Domain mappers ───────────────────────────────────────────────────────────

export function researchToItem(post: {
    slug: string;
    title: string;
    date: string;
    sector?: string;
}): FreshContentItem {
    return {
        id: `research:${post.slug}`,
        title: post.title,
        href: `/research/${post.slug}`,
        kind: 'Research',
        date: post.date,
        meta: post.sector,
    };
}

export function insightToItem(post: {
    slug: string;
    title: string;
    date: string;
    category?: string;
}): FreshContentItem {
    return {
        id: `insight:${post.slug}`,
        title: post.title,
        href: `/insights/${post.slug}`,
        kind: 'Insight',
        date: post.date,
        meta: post.category,
    };
}

export function studyToItem(material: {
    slug: string;
    title: string;
    publishedAt?: string | Date | null;
    createdAt?: string | Date | null;
    type?: string;
}): FreshContentItem {
    const when = material.publishedAt ?? material.createdAt ?? null;
    const iso = when instanceof Date ? when.toISOString() : when ?? '';
    return {
        id: `study:${material.slug}`,
        title: material.title,
        href: `/study/${material.slug}`,
        kind: 'Study',
        date: iso,
        meta: material.type,
    };
}
