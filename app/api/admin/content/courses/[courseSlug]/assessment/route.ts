import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authorizeApi, STAFF_ROLES } from '@/lib/auth-guards';
import { parseJsonBody, toInputJson } from '@/lib/validation';
import { revalidateProductContent } from '@/lib/product-content-admin';
import { getCourse } from '@/lib/pgdm/learning-adapter';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
type Context = { params: Promise<{ courseSlug: string }> };

const questionSchema = z.object({
  id: z.string().min(1).max(64).optional(),
  prompt: z.string().trim().min(5).max(2000),
  options: z.array(z.string().trim().min(1).max(500)).min(2).max(6),
  correctOption: z.number().int().min(0).max(5),
  explanation: z.string().trim().min(3).max(3000),
  marks: z.number().int().min(1).max(100).default(1),
  displayOrder: z.number().int().min(0).max(10000).default(0),
  published: z.boolean().default(true),
}).superRefine((question, ctx) => {
  if (question.correctOption >= question.options.length) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['correctOption'], message: 'Correct option must refer to an available answer.' });
  }
});

const assessmentSchema = z.object({
  title: z.string().trim().min(3).max(200),
  instructions: z.string().trim().max(3000).nullable().optional(),
  passPercentage: z.number().int().min(50).max(100).default(70),
  maxAttempts: z.number().int().min(1).max(50).nullable().optional(),
  published: z.boolean().default(false),
  questions: z.array(questionSchema).max(100).default([]),
}).superRefine((assessment, ctx) => {
  if (assessment.published && assessment.questions.filter((question) => question.published).length < 1) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['questions'], message: 'A published test needs at least one published question.' });
  }
});

async function assertCourseExists(courseSlug: string) {
  if (getCourse(courseSlug)) return true;
  const material = await prisma.studyMaterial.findUnique({ where: { slug: courseSlug }, select: { type: true } });
  return material?.type === 'COURSE';
}

export async function GET(_request: Request, context: Context) {
  const auth = await authorizeApi(STAFF_ROLES);
  if (!auth.ok) return auth.response;
  const { courseSlug } = await context.params;
  try {
    if (!(await assertCourseExists(courseSlug))) return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    const assessment = await prisma.courseAssessment.findUnique({
      where: { courseSlug },
      include: { questions: { orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }] } },
    });
    return NextResponse.json({ assessment }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    logger.error('Admin course assessment could not be loaded', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Course assessment unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}

export async function POST(request: Request, context: Context) {
  const auth = await authorizeApi(STAFF_ROLES);
  if (!auth.ok) return auth.response;
  const { courseSlug } = await context.params;
  const parsed = await parseJsonBody(request, assessmentSchema);
  if (!parsed.ok) return parsed.response;
  const questions = parsed.data.questions ?? [];
  try {
    if (!(await assertCourseExists(courseSlug))) return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    const assessment = await prisma.$transaction(async (tx) => {
      const saved = await tx.courseAssessment.upsert({
        where: { courseSlug },
        create: {
          courseSlug,
          title: parsed.data.title,
          instructions: parsed.data.instructions?.trim() || null,
          passPercentage: parsed.data.passPercentage,
          maxAttempts: parsed.data.maxAttempts ?? null,
          published: parsed.data.published,
        },
        update: {
          title: parsed.data.title,
          instructions: parsed.data.instructions?.trim() || null,
          passPercentage: parsed.data.passPercentage,
          maxAttempts: parsed.data.maxAttempts ?? null,
          published: parsed.data.published,
        },
      });

      const submittedIds: string[] = [];
      for (const question of questions) {
        const { id, options, ...fields } = question;
        if (id) {
          const owned = await tx.courseAssessmentQuestion.findFirst({ where: { id, assessmentId: saved.id }, select: { id: true } });
          if (!owned) throw new Error('QUESTION_NOT_FOUND');
          submittedIds.push(id);
          await tx.courseAssessmentQuestion.update({
            where: { id },
            data: { ...fields, options: toInputJson(options) as Prisma.InputJsonValue },
          });
        } else {
          const created = await tx.courseAssessmentQuestion.create({
            data: { ...fields, assessmentId: saved.id, options: toInputJson(options) as Prisma.InputJsonValue },
            select: { id: true },
          });
          submittedIds.push(created.id);
        }
      }
      await tx.courseAssessmentQuestion.updateMany({
        where: { assessmentId: saved.id, ...(submittedIds.length ? { id: { notIn: submittedIds } } : {}) },
        data: { published: false },
      });
      return tx.courseAssessment.findUnique({
        where: { id: saved.id },
        include: { questions: { orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }] } },
      });
    });
    revalidateProductContent({ type: 'COURSE', sourceSlug: courseSlug });
    return NextResponse.json({ assessment }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof Error && error.message === 'QUESTION_NOT_FOUND') {
      return NextResponse.json({ error: 'A question ID did not belong to this assessment.' }, { status: 400 });
    }
    logger.warn('Admin course assessment could not be saved', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Course assessment could not be saved' }, { status: 409 });
  }
}
