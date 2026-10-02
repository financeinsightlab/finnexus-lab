import { NextResponse } from 'next/server';
import { authorizeApi } from '@/lib/auth-guards';
import { prisma } from '@/lib/prisma';
import { resolveLearningCourse } from '@/lib/learning-courses';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Context = { params: Promise<{ courseSlug: string }> };

export async function GET(_request: Request, context: Context) {
  const auth = await authorizeApi();
  if (!auth.ok) return auth.response;
  const { courseSlug } = await context.params;
  try {
    const course = await resolveLearningCourse(courseSlug);
    if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
    const assessment = await prisma.courseAssessment.findFirst({
      where: { courseSlug, published: true },
      select: {
        id: true,
        courseSlug: true,
        title: true,
        instructions: true,
        passPercentage: true,
        maxAttempts: true,
        questions: {
          where: { published: true },
          orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
          select: { id: true, prompt: true, options: true, marks: true, displayOrder: true },
        },
      },
    });
    if (!assessment || assessment.questions.length === 0) return NextResponse.json({ assessment: null }, { headers: { 'Cache-Control': 'private, no-store' } });

    const [completed, attempts, attemptCount, passedAttempt, certificate] = await Promise.all([
      prisma.lessonProgress.findMany({
        where: { userId: auth.user.id, courseSlug, completed: true, lessonSlug: { in: course.lessons.map((lesson) => lesson.slug) } },
        select: { lessonSlug: true },
      }),
      prisma.courseAssessmentAttempt.findMany({
        where: { assessmentId: assessment.id, userId: auth.user.id },
        orderBy: { submittedAt: 'desc' },
        take: 20,
        select: { id: true, attemptNumber: true, score: true, maxScore: true, percentage: true, passed: true, submittedAt: true },
      }),
      prisma.courseAssessmentAttempt.count({ where: { assessmentId: assessment.id, userId: auth.user.id } }),
      prisma.courseAssessmentAttempt.findFirst({ where: { assessmentId: assessment.id, userId: auth.user.id, passed: true }, select: { id: true } }),
      prisma.courseCertificate.findUnique({
        where: { userId_courseSlug: { userId: auth.user.id, courseSlug } },
        select: { certificateId: true, status: true, issuedAt: true },
      }),
    ]);
    const left = assessment.maxAttempts === null ? null : Math.max(0, assessment.maxAttempts - attemptCount);
    return NextResponse.json({
      assessment: {
        id: assessment.id,
        title: assessment.title,
        instructions: assessment.instructions,
        passPercentage: assessment.passPercentage,
        maxAttempts: assessment.maxAttempts,
        questions: assessment.questions.map((question) => ({
          id: question.id,
          prompt: question.prompt,
          options: Array.isArray(question.options) ? question.options : [],
          marks: question.marks,
        })),
      },
      completion: { totalLessons: course.lessons.length, completedLessons: completed.length, eligible: course.lessons.length > 0 && completed.length === course.lessons.length },
      attempts,
      attemptsRemaining: left,
      alreadyPassed: Boolean(passedAttempt),
      certificate,
    }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    logger.warn('Course assessment could not be loaded', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Assessment unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
