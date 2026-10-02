// Server-timed lesson progress. A completion can only be recorded after the
// learner opens a valid published lesson and waits through its minimum dwell time.

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { resolveLearningCourse } from '@/lib/learning-courses';
import { recordLessonProgress } from '@/lib/learning-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const querySchema = z.object({
  courseSlug: z.string().min(1).max(120),
  lessonSlug: z.string().min(1).max(160),
});
const progressSchema = querySchema.extend({ completed: z.literal(true) });

function minimumSeconds(minutes?: number) {
  return Math.min(300, Math.max(60, Math.round((minutes ?? 5) * 60 * 0.2)));
}

export async function GET(request: Request) {
  const auth = await authorizeApi();
  if (!auth.ok) return auth.response;
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({ courseSlug: url.searchParams.get('courseSlug'), lessonSlug: url.searchParams.get('lessonSlug') });
  if (!parsed.success) return NextResponse.json({ error: 'Invalid course or lesson' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  try {
    const progress = await prisma.lessonProgress.findUnique({
      where: { userId_courseSlug_lessonSlug: { userId: auth.user.id, ...parsed.data } },
      select: { completed: true, completedAt: true, startedAt: true },
    });
    return NextResponse.json({ progress }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    logger.warn('Lesson progress could not be loaded', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Progress unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}

export async function POST(request: Request) {
  const auth = await authorizeApi();
  if (!auth.ok) return auth.response;
  const parsed = await parseJsonBody(request, progressSchema);
  if (!parsed.ok) return parsed.response;
  const { courseSlug, lessonSlug } = parsed.data;

  try {
    const course = await resolveLearningCourse(courseSlug);
    const lesson = course?.lessons.find((item) => item.slug === lessonSlug);
    if (!course || !lesson) return NextResponse.json({ error: 'Published lesson not found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });

    const existing = await prisma.lessonProgress.findUnique({
      where: { userId_courseSlug_lessonSlug: { userId: auth.user.id, courseSlug, lessonSlug } },
      select: { completed: true, startedAt: true },
    });
    if (existing?.completed) return NextResponse.json({ completed: true }, { headers: { 'Cache-Control': 'private, no-store' } });
    const requiredSeconds = minimumSeconds(lesson.minutes);
    if (!existing?.startedAt) return NextResponse.json({ error: 'Open this lesson before marking it complete.' }, { status: 409, headers: { 'Cache-Control': 'no-store' } });
    const secondsSpent = Math.floor((Date.now() - existing.startedAt.getTime()) / 1000);
    if (secondsSpent < requiredSeconds) {
      return NextResponse.json({ error: `Wait at least ${requiredSeconds} seconds after opening this lesson before marking it complete.`, remainingSeconds: requiredSeconds - secondsSpent }, { status: 409, headers: { 'Cache-Control': 'private, no-store' } });
    }

    await recordLessonProgress(auth.user.id, courseSlug, lessonSlug, { completed: true, secondsSpent });
    return NextResponse.json({ completed: true, secondsSpent }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    logger.error('Error recording lesson progress', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Learning progress is temporarily unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
