// app/api/learning/progress/route.ts — record lesson progress (Pillar E1)

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { recordLessonProgress } from '@/lib/learning-store';

export const runtime = 'nodejs';

const progressSchema = z.object({
    courseSlug: z.string().min(1).max(120),
    lessonSlug: z.string().min(1).max(160),
    completed: z.boolean().optional(),
    secondsSpent: z.number().int().min(0).max(86_400).optional(),
});

export async function POST(request: Request) {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    const parsed = await parseJsonBody(request, progressSchema);
    if (!parsed.ok) return parsed.response;

    const { courseSlug, lessonSlug, completed, secondsSpent } = parsed.data;

    try {
        const lesson = await recordLessonProgress(auth.user.id, courseSlug, lessonSlug, {
            completed,
            secondsSpent,
        });
        return NextResponse.json({ lesson });
    } catch (error) {
        logger.error('Error recording lesson progress', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
