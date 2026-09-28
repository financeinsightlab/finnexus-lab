// app/api/comments/[id]/reactions/route.ts — toggle an emoji reaction (Pillar D)

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { toggleReaction } from '@/lib/comments-store';

export const runtime = 'nodejs';

const reactionSchema = z.object({
    emoji: z.string().trim().min(1).max(8),
});

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    const parsed = await parseJsonBody(request, reactionSchema);
    if (!parsed.ok) return parsed.response;

    const { id } = await params;

    try {
        const result = await toggleReaction(id, auth.user.id, parsed.data.emoji);
        return NextResponse.json(result);
    } catch (error) {
        logger.error('Error toggling reaction', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
