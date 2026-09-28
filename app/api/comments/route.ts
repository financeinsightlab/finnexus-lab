// app/api/comments/route.ts — Comments 2.0 (Pillar D)
//
// GET  ?postId=… | ?predictionId=…  → threaded comments (public)
// POST { content, postId?, predictionId?, parentId? } → create (auth)

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { createComment, listComments } from '@/lib/comments-store';

export const runtime = 'nodejs';

const createSchema = z
    .object({
        content: z.string().trim().min(1).max(4000),
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

    if (!postId && !predictionId) {
        return NextResponse.json({ error: 'Provide postId or predictionId' }, { status: 400 });
    }

    try {
        const comments = await listComments({ postId, predictionId });
        return NextResponse.json({ comments });
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

    const parsed = await parseJsonBody(request, createSchema);
    if (!parsed.ok) return parsed.response;

    try {
        const comment = await createComment({ ...parsed.data, authorId: auth.user.id });
        return NextResponse.json({ comment }, { status: 201 });
    } catch (error) {
        logger.error('Error creating comment', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
