// lib/publish.ts — unified publish pipeline (Pillar G4)
//
// One code path for every content mutation: record a PublishEvent, revalidate
// the affected routes, and let the sitemap pick up the change. The path-mapping
// is pure and unit-tested; persistence is a thin wrapper.

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export type PublishEntity = 'post' | 'page' | 'study';
export type PublishAction = 'created' | 'updated' | 'published' | 'unpublished' | 'deleted';

export interface PublishInput {
    entityType: PublishEntity;
    entityId: string;
    slug?: string | null;
    action: PublishAction;
}

/** Routes that must be revalidated for a given entity change. */
export function pathsToRevalidate(entityType: PublishEntity, slug?: string | null): string[] {
    switch (entityType) {
        case 'post':
            return ['/', '/research', '/insights', '/sitemap.xml', ...(slug ? [`/research/${slug}`, `/insights/${slug}`] : [])];
        case 'page':
            return ['/sitemap.xml', ...(slug ? [`/${slug}`, `/pages/${slug}`] : [])];
        case 'study':
            return ['/study', '/admin/study', '/sitemap.xml', ...(slug ? [`/study/${slug}`] : [])];
        default:
            return ['/sitemap.xml'];
    }
}

/** Revalidate every route touched by an event. Returns the paths applied. */
export function revalidateForEvent(input: PublishInput): string[] {
    const paths = pathsToRevalidate(input.entityType, input.slug);
    for (const path of paths) {
        try {
            revalidatePath(path);
        } catch {
            // revalidatePath throws outside a request scope (e.g. in tests) — ignore.
        }
    }
    return paths;
}

/**
 * Record the event and revalidate. Call this from every content action so the
 * audit trail and cache invalidation stay in lockstep.
 */
export async function publish(input: PublishInput) {
    const paths = revalidateForEvent(input);
    try {
        await prisma.publishEvent.create({
            data: {
                entityType: input.entityType,
                entityId: input.entityId,
                slug: input.slug ?? null,
                action: input.action,
                revalidated: true,
            },
        });
    } catch {
        // The audit write must never block a publish — the revalidation already ran.
    }
    return { paths, count: paths.length };
}

export async function recentPublishEvents(limit = 30) {
    return prisma.publishEvent.findMany({ orderBy: { createdAt: 'desc' }, take: limit });
}
