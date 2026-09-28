// app/api/comments/[id]/status/route.ts — moderation (staff only) (Pillar D)

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { STAFF_ROLES, authorizeApi } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { setCommentStatus } from '@/lib/comments-store';

export const runtime = 'nodejs';

const statusSchema = z.object({
    status: z.enum(['VISIBLE', 'HIDDEN', 'DELETED']),
});

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const auth = await authorizeApi(STAFF_ROLES);
    if (!auth.ok) return auth.response;

    const parsed = await parseJsonBody(request, statusSchema);
    if (!parsed.ok) return parsed.response;

    const { id } = await params;

    try {
        const comment = await setCommentStatus(id, parsed.data.status);
        return NextResponse.json({ comment });
    } catch (error) {
        logger.error('Error updating comment status', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
