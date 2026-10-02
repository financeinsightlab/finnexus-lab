// app/api/comments/route.ts — Comments 2.0 (Pillar D)
//
// GET  ?postId=… | ?predictionId=…  → threaded comments (public)
// POST { content, postId?, predictionId?, parentId? } → create (auth)

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi, STAFF_ROLES } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { consumeRateLimit } from '@/lib/rate-limit';
import { CommentWriteError, createComment, listComments } from '@/lib/comments-store';

export const runtime = 'nodejs';

const createSchema = z
    .object({
        content: z
            .string()
            .trim()
            .min(1)
            .max(4000)
            .refine((content) => (content.match(/(?:https?:\/\/|www\.)/gi) ?? []).length <= 3, {
                message: 'Comments may include at most three links.',
            }),
        postId: z.string().min(1).optional(),
        predictionId: z.string().min(1).optional(),
        parentId: z.string().min(1).optional(),
    })
    .refine((value) => Boolean(value.postId) !== Boolean(value.predictionId), {
        message: 'Provide exactly one of postId or predictionId',
    });

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId') ?? undefined;
    const predictionId = searchParams.get('predictionId') ?? undefined;
    const moderationView = searchParams.get('moderation') === 'true';

    if (Boolean(postId) === Boolean(predictionId)) {
        return NextResponse.json({ error: 'Provide exactly one of postId or predictionId' }, { status: 400 });
    }
    if (moderationView) {
        const auth = await authorizeApi(STAFF_ROLES);
        if (!auth.ok) return auth.response;
    }

    try {
        const comments = await listComments({ postId, predictionId }, { moderationView });
        return NextResponse.json(
            { comments },
            { headers: { 'Cache-Control': 'private, no-store, max-age=0' } },
        );
    } catch (error) {
        logger.error('Error listing comments', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    try {
        const rateLimit = await consumeRateLimit('comment-create', auth.user.id, {
            limit: 10,
            windowSeconds: 60 * 60,
        });
        if (!rateLimit.allowed) {
            return NextResponse.json(
                { error: 'Comment limit reached. Please try again later.' },
                { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } },
            );
        }
    } catch (error) {
        logger.error('Comment rate-limit check failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Comments are temporarily unavailable' }, { status: 503 });
    }

    const parsed = await parseJsonBody(request, createSchema);
    if (!parsed.ok) return parsed.response;

    try {
        const comment = await createComment({ ...parsed.data, authorId: auth.user.id });
        return NextResponse.json({ comment }, { status: 201 });
    } catch (error) {
        if (error instanceof CommentWriteError) {
            const status = error.code === 'DUPLICATE_COMMENT' ? 409 : error.code === 'TARGET_NOT_FOUND' ? 404 : 400;
            const message = error.code === 'DUPLICATE_COMMENT'
                ? 'You recently posted the same comment.'
                : error.code === 'TARGET_NOT_FOUND'
                    ? 'Comment target not found.'
                    : error.code === 'INVALID_PARENT'
                        ? 'Reply target is unavailable.'
                        : 'Provide exactly one valid comment target.';
            return NextResponse.json({ error: message }, { status });
        }
        logger.error('Error creating comment', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
