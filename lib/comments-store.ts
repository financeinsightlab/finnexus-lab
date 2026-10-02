// lib/comments-store.ts — Comments 2.0 (Pillar D)
//
// Threaded comments with @mentions, emoji reactions and moderation status.
// The mention parser is pure so it can be unit tested; persistence is thin.

import { prisma } from '@/lib/prisma';

export interface ThreadedComment {
    id: string;
    content: string;
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
    options: { dropOrphans?: boolean } = {},
): ThreadedComment[] {
    const nodes = new Map<string, ThreadedComment>();
    for (const c of flat) nodes.set(c.id, { ...c, replies: [] });

    const roots: ThreadedComment[] = [];
    for (const node of nodes.values()) {
        if (node.parentId && nodes.has(node.parentId)) {
            nodes.get(node.parentId)!.replies.push(node);
        } else if (!node.parentId || !options.dropOrphans) {
            roots.push(node);
        }
    }
    return roots;
}

export async function listComments(
    where: { postId?: string; predictionId?: string },
    options: { moderationView?: boolean } = {},
): Promise<ThreadedComment[]> {
    const rows = await prisma.comment.findMany({
        // Anonymous/public responses expose only visible comments. Staff can
        // explicitly request the complete moderation state through the API.
        where: options.moderationView ? where : { ...where, status: 'VISIBLE' },
        orderBy: { createdAt: 'asc' },
        include: {
            author: {
                select: {
                    name: true,
                    image: true,
                    profile: { select: { isPublic: true } },
                },
            },
            reactions: { select: { emoji: true } },
        },
    });

    const flat = rows.map((row): Omit<ThreadedComment, 'replies'> => {
        const counts = new Map<string, number>();
        for (const r of row.reactions) counts.set(r.emoji, (counts.get(r.emoji) ?? 0) + 1);
        return {
            id: row.id,
            content: row.content,
            authorName: !options.moderationView && row.author.profile?.isPublic !== true
                ? 'Private member'
                : row.author.name,
            authorImage: !options.moderationView && row.author.profile?.isPublic !== true
                ? null
                : row.author.image,
            parentId: row.parentId,
            status: row.status,
            reactions: Array.from(counts, ([emoji, count]) => ({ emoji, count })),
            createdAt: row.createdAt.toISOString(),
            editedAt: row.editedAt ? row.editedAt.toISOString() : null,
        };
    });

    return buildThreads(flat, { dropOrphans: !options.moderationView });
}

export interface CreateCommentInput {
    content: string;
    authorId: string;
    postId?: string;
    predictionId?: string;
    parentId?: string;
}

export class CommentWriteError extends Error {
    constructor(readonly code: 'INVALID_TARGET' | 'TARGET_NOT_FOUND' | 'INVALID_PARENT' | 'DUPLICATE_COMMENT') {
        super(code);
        this.name = 'CommentWriteError';
    }
}

export async function createComment(input: CreateCommentInput) {
    if (Boolean(input.postId) === Boolean(input.predictionId)) {
        throw new CommentWriteError('INVALID_TARGET');
    }

    if (input.postId) {
        const post = await prisma.post.findUnique({ where: { id: input.postId }, select: { published: true } });
        if (!post?.published) throw new CommentWriteError('TARGET_NOT_FOUND');
    }
    if (input.predictionId) {
        const prediction = await prisma.prediction.findUnique({ where: { id: input.predictionId }, select: { id: true } });
        if (!prediction) throw new CommentWriteError('TARGET_NOT_FOUND');
    }

    if (input.parentId) {
        const parent = await prisma.comment.findUnique({
            where: { id: input.parentId },
            select: { postId: true, predictionId: true, status: true },
        });
        if (
            !parent ||
            parent.status !== 'VISIBLE' ||
            parent.postId !== (input.postId ?? null) ||
            parent.predictionId !== (input.predictionId ?? null)
        ) {
            throw new CommentWriteError('INVALID_PARENT');
        }
    }

    const duplicate = await prisma.comment.findFirst({
        where: {
            authorId: input.authorId,
            content: input.content,
            createdAt: { gte: new Date(Date.now() - 5 * 60 * 1000) },
        },
        select: { id: true },
    });
    if (duplicate) throw new CommentWriteError('DUPLICATE_COMMENT');

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

export class CommentReactionError extends Error {
    constructor() {
        super('COMMENT_UNAVAILABLE');
        this.name = 'CommentReactionError';
    }
}

/** Toggle a reaction; only comments visible to the public can be reacted to. */
export async function toggleReaction(commentId: string, userId: string, emoji: string) {
    const comment = await prisma.comment.findUnique({
        where: { id: commentId },
        select: { status: true },
    });
    if (!comment || comment.status !== 'VISIBLE') throw new CommentReactionError();

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
