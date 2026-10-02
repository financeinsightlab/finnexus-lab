// app/api/comments/[id]/reactions/route.ts — toggle an emoji reaction (Pillar D)

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { consumeRateLimit } from '@/lib/rate-limit';
import { CommentReactionError, toggleReaction } from '@/lib/comments-store';

export const runtime = 'nodejs';

const reactionSchema = z.object({
    emoji: z.enum(['👍', '🔥', '💡', '🎯', '🙌']),
});

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    try {
        const limit = await consumeRateLimit('comment-reaction', auth.user.id, {
            limit: 60,
            windowSeconds: 60 * 60,
        });
        if (!limit.allowed) {
            return NextResponse.json(
                { error: 'Reaction limit reached. Please try again later.' },
                { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
            );
        }
    } catch (error) {
        logger.error('Comment reaction rate-limit check failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Reactions are temporarily unavailable' }, { status: 503 });
    }

    const parsed = await parseJsonBody(request, reactionSchema);
    if (!parsed.ok) return parsed.response;

    const { id } = await params;

    try {
        const result = await toggleReaction(id, auth.user.id, parsed.data.emoji);
        return NextResponse.json(result);
    } catch (error) {
        if (error instanceof CommentReactionError) {
            return NextResponse.json({ error: 'Comment not found or not visible.' }, { status: 404 });
        }
        logger.error('Error toggling reaction', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
