import { randomUUID } from 'node:crypto';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { prisma } from '@/lib/prisma';
import { resolveLearningCourse } from '@/lib/learning-courses';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Context = { params: Promise<{ assessmentId: string }> };
const submissionSchema = z.object({
  answers: z.array(z.object({ questionId: z.string().min(1).max(64), selectedOption: z.number().int().min(0).max(5) })).min(1).max(100),
});

class SubmissionError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export async function POST(request: Request, context: Context) {
  const auth = await authorizeApi();
  if (!auth.ok) return auth.response;
  const { assessmentId } = await context.params;
  const parsed = await parseJsonBody(request, submissionSchema);
  if (!parsed.ok) return parsed.response;
  if (new Set(parsed.data.answers.map((answer) => answer.questionId)).size !== parsed.data.answers.length) {
    return NextResponse.json({ error: 'Each test question can only have one answer.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const assessment = await prisma.courseAssessment.findUnique({ where: { id: assessmentId }, select: { courseSlug: true } });
    if (!assessment) return NextResponse.json({ error: 'Assessment not found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
    const course = await resolveLearningCourse(assessment.courseSlug);
    if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });

    const result = await prisma.$transaction(async (tx) => {
      const active = await tx.courseAssessment.findFirst({
        where: { id: assessmentId, published: true },
        include: { questions: { where: { published: true }, orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }] } },
      });
      if (!active || active.questions.length === 0) throw new SubmissionError(404, 'This final test is not available.');
      const lessonSlugs = course.lessons.map((lesson) => lesson.slug);
      if (lessonSlugs.length === 0) throw new SubmissionError(409, 'This course has no published completion lessons.');
      const completedLessons = await tx.lessonProgress.findMany({
        where: { userId: auth.user.id, courseSlug: course.slug, completed: true, lessonSlug: { in: lessonSlugs } },
        select: { lessonSlug: true },
      });
      if (completedLessons.length !== lessonSlugs.length) {
        throw new SubmissionError(409, 'Complete every published course lesson before taking the final test.');
      }

      const attempts = await tx.courseAssessmentAttempt.findMany({
        where: { assessmentId, userId: auth.user.id },
        orderBy: { attemptNumber: 'desc' },
        select: { attemptNumber: true, passed: true },
      });
      if (attempts.some((attempt) => attempt.passed)) throw new SubmissionError(409, 'You have already passed this final test.');
      if (active.maxAttempts !== null && attempts.length >= active.maxAttempts) {
        throw new SubmissionError(409, 'The maximum number of attempts has been reached.');
      }

      const answerMap = new Map(parsed.data.answers.map((answer) => [answer.questionId, answer.selectedOption]));
      if (answerMap.size !== active.questions.length || active.questions.some((question) => !answerMap.has(question.id))) {
        throw new SubmissionError(400, 'Answer every current test question before submitting.');
      }
      const questionIds = new Set(active.questions.map((question) => question.id));
      if ([...answerMap.keys()].some((id) => !questionIds.has(id))) throw new SubmissionError(400, 'The submission contains an unknown question. Reload the test and try again.');

      const maxScore = active.questions.reduce((sum, question) => sum + question.marks, 0);
      const score = active.questions.reduce((sum, question) => sum + (answerMap.get(question.id) === question.correctOption ? question.marks : 0), 0);
      const percentage = Math.round((score / maxScore) * 100);
      const passed = percentage >= active.passPercentage;
      const attemptNumber = (attempts[0]?.attemptNumber ?? 0) + 1;
      const attempt = await tx.courseAssessmentAttempt.create({
        data: { assessmentId, userId: auth.user.id, attemptNumber, score, maxScore, percentage, passed },
        select: { id: true, attemptNumber: true, score: true, maxScore: true, percentage: true, passed: true, submittedAt: true },
      });

      let certificate: { certificateId: string; status: string } | null = null;
      if (passed) {
        await tx.enrollment.upsert({
          where: { userId_courseSlug: { userId: auth.user.id, courseSlug: course.slug } },
          create: { userId: auth.user.id, courseSlug: course.slug, trackSlug: course.trackSlug, status: 'COMPLETED', completedAt: new Date() },
          update: { status: 'COMPLETED', completedAt: new Date(), lastActivityAt: new Date() },
        });
        const existingCertificate = await tx.courseCertificate.findUnique({
          where: { userId_courseSlug: { userId: auth.user.id, courseSlug: course.slug } },
          select: { certificateId: true, status: true },
        });
        if (existingCertificate) {
          certificate = existingCertificate.status === 'ACTIVE'
            ? existingCertificate
            : await tx.courseCertificate.update({
                where: { userId_courseSlug: { userId: auth.user.id, courseSlug: course.slug } },
                data: { status: 'ACTIVE', completedAt: new Date(), issuedAt: new Date() },
                select: { certificateId: true, status: true },
              });
        } else {
          const user = await tx.user.findUnique({ where: { id: auth.user.id }, select: { name: true } });
          certificate = await tx.courseCertificate.create({
            data: {
              certificateId: randomUUID(),
              userId: auth.user.id,
              courseSlug: course.slug,
              studentName: user?.name?.trim() || 'Learner',
              courseTitle: course.title,
              completedAt: new Date(),
            },
            select: { certificateId: true, status: true },
          });
        }
      }
      const review = active.questions.map((question) => ({
        questionId: question.id,
        prompt: question.prompt,
        selectedOption: answerMap.get(question.id)!,
        correctOption: question.correctOption,
        options: Array.isArray(question.options) ? question.options : [],
        isCorrect: answerMap.get(question.id) === question.correctOption,
        explanation: question.explanation,
      }));
      return { attempt, passed, passPercentage: active.passPercentage, review, certificate };
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });

    return NextResponse.json(result, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    if (error instanceof SubmissionError) {
      return NextResponse.json({ error: error.message }, { status: error.status, headers: { 'Cache-Control': 'no-store' } });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && (error.code === 'P2002' || error.code === 'P2034')) {
      return NextResponse.json({ error: 'Another attempt was submitted at the same time. Reload and check your latest result before retrying.' }, { status: 409, headers: { 'Cache-Control': 'private, no-store' } });
    }
    logger.warn('Final assessment submission failed', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Final test could not be submitted right now.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
