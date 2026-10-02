import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { prisma } from '@/lib/prisma';
import { resolveLearningCourse } from '@/lib/learning-courses';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const startSchema = z.object({
  courseSlug: z.string().min(1).max(120),
  lessonSlug: z.string().min(1).max(160),
});

function minimumSeconds(minutes?: number) {
  return Math.min(300, Math.max(60, Math.round((minutes ?? 5) * 60 * 0.2)));
}

export async function POST(request: Request) {
  const auth = await authorizeApi();
  if (!auth.ok) return auth.response;
  const parsed = await parseJsonBody(request, startSchema);
  if (!parsed.ok) return parsed.response;
  const { courseSlug, lessonSlug } = parsed.data;

  try {
    const course = await resolveLearningCourse(courseSlug);
    const lesson = course?.lessons.find((item) => item.slug === lessonSlug);
    if (!course || !lesson) return NextResponse.json({ error: 'Published lesson not found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });

    const current = await prisma.lessonProgress.findUnique({
      where: { userId_courseSlug_lessonSlug: { userId: auth.user.id, courseSlug, lessonSlug } },
      select: { completed: true, startedAt: true },
    });
    if (current?.completed) return NextResponse.json({ completed: true, requiredSeconds: minimumSeconds(lesson.minutes) }, { headers: { 'Cache-Control': 'private, no-store' } });

    const startedAt = new Date();
    await prisma.$transaction([
      prisma.lessonProgress.upsert({
        where: { userId_courseSlug_lessonSlug: { userId: auth.user.id, courseSlug, lessonSlug } },
        create: { userId: auth.user.id, courseSlug, lessonSlug, startedAt },
        update: { startedAt },
      }),
      prisma.enrollment.upsert({
        where: { userId_courseSlug: { userId: auth.user.id, courseSlug } },
        create: { userId: auth.user.id, courseSlug, trackSlug: course.trackSlug, status: 'ACTIVE', lastActivityAt: startedAt },
        update: { lastActivityAt: startedAt },
      }),
    ]);
    return NextResponse.json({ completed: false, startedAt: startedAt.toISOString(), requiredSeconds: minimumSeconds(lesson.minutes) }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    logger.warn('Learning session could not be started', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Learning progress is temporarily unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
