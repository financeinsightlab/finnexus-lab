// lib/comments-store.ts — Comments 2.0 (Pillar D)
//
// Threaded comments with @mentions, emoji reactions and moderation status.
// The mention parser is pure so it can be unit tested; persistence is thin.

import { prisma } from '@/lib/prisma';

export interface ThreadedComment {
    id: string;
    content: string;
    authorId: string;
    authorName: string | null;
    authorImage: string | null;
    parentId: string | null;
    status: string;
    reactions: { emoji: string; count: number }[];
    replies: ThreadedComment[];
    createdAt: string;
    editedAt: string | null;
}

/** Extract unique @handle tokens (lower-cased) from comment text. */
export function parseMentions(text: string): string[] {
    const matches = text.matchAll(/(?:^|[^\w@])@([a-zA-Z0-9._-]{2,32})/g);
    const handles = new Set<string>();
    for (const m of matches) handles.add(m[1].toLowerCase());
    return Array.from(handles);
}

/** Build a nested tree from a flat comment list. O(n) with a parent map. */
export function buildThreads(
    flat: Omit<ThreadedComment, 'replies'>[],
): ThreadedComment[] {
    const nodes = new Map<string, ThreadedComment>();
    for (const c of flat) nodes.set(c.id, { ...c, replies: [] });

    const roots: ThreadedComment[] = [];
    for (const node of nodes.values()) {
        if (node.parentId && nodes.has(node.parentId)) {
            nodes.get(node.parentId)!.replies.push(node);
        } else {
            roots.push(node);
        }
    }
    return roots;
}

export async function listComments(where: { postId?: string; predictionId?: string }): Promise<ThreadedComment[]> {
    const rows = await prisma.comment.findMany({
        where: { ...where, status: { not: 'DELETED' } },
        orderBy: { createdAt: 'asc' },
        include: {
            author: { select: { name: true, image: true } },
            reactions: { select: { emoji: true } },
        },
    });

    const flat = rows.map((row): Omit<ThreadedComment, 'replies'> => {
        const counts = new Map<string, number>();
        for (const r of row.reactions) counts.set(r.emoji, (counts.get(r.emoji) ?? 0) + 1);
        return {
            id: row.id,
            content: row.content,
            authorId: row.authorId,
            authorName: row.author.name,
            authorImage: row.author.image,
            parentId: row.parentId,
            status: row.status,
            reactions: Array.from(counts, ([emoji, count]) => ({ emoji, count })),
            createdAt: row.createdAt.toISOString(),
            editedAt: row.editedAt ? row.editedAt.toISOString() : null,
        };
    });

    return buildThreads(flat);
}

export interface CreateCommentInput {
    content: string;
    authorId: string;
    postId?: string;
    predictionId?: string;
    parentId?: string;
}

export async function createComment(input: CreateCommentInput) {
    const handles = parseMentions(input.content);
    let mentionIds: string[] = [];
    if (handles.length > 0) {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { name: { in: handles, mode: 'insensitive' } },
                    { email: { in: handles, mode: 'insensitive' } },
                ],
            },
            select: { id: true, name: true },
        });
        mentionIds = users.map((u) => u.id).filter((id) => id !== input.authorId);
    }

    const comment = await prisma.comment.create({
        data: {
            content: input.content,
            authorId: input.authorId,
            postId: input.postId ?? null,
            predictionId: input.predictionId ?? null,
            parentId: input.parentId ?? null,
            mentions: mentionIds,
        },
    });

    if (mentionIds.length > 0) {
        await prisma.notification.createMany({
            data: mentionIds.map((userId) => ({
                userId,
                type: 'mention',
                title: 'You were mentioned',
                body: input.content.slice(0, 140),
                href: input.postId ? `/research` : '/predictions',
            })),
        });
    }

    return comment;
}

/** Toggle a reaction; returns whether the emoji is now active for the user. */
export async function toggleReaction(commentId: string, userId: string, emoji: string) {
    const existing = await prisma.commentReaction.findUnique({
        where: { commentId_userId_emoji: { commentId, userId, emoji } },
    });
    if (existing) {
        await prisma.commentReaction.delete({ where: { id: existing.id } });
        return { active: false };
    }
    await prisma.commentReaction.create({ data: { commentId, userId, emoji } });
    return { active: true };
}

export async function setCommentStatus(commentId: string, status: 'VISIBLE' | 'HIDDEN' | 'DELETED') {
    return prisma.comment.update({ where: { id: commentId }, data: { status } });
}
