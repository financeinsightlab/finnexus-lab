import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authorizeApi, STAFF_ROLES } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { revalidateProductContent } from '@/lib/product-content-admin';
import { getCourse } from '@/lib/pgdm/learning-adapter';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
type Context = { params: Promise<{ courseSlug: string }> };
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const lessonSchema = z.object({
  id: z.string().min(1).max(64).optional(),
  slug: z.string().min(2).max(160).regex(slugPattern),
  title: z.string().trim().min(2).max(200),
  summary: z.string().trim().max(1000).nullable().optional(),
  content: z.string().trim().min(10).max(50000),
  durationMinutes: z.number().int().min(1).max(600).nullable().optional(),
  displayOrder: z.number().int().min(0).max(10000).default(0),
  published: z.boolean().default(false),
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
    const lessons = await prisma.courseLesson.findMany({ where: { courseSlug }, orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }] });
    return NextResponse.json({ lessons }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    logger.error('Admin course lessons could not be loaded', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Course lessons unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}

export async function POST(request: Request, context: Context) {
  const auth = await authorizeApi(STAFF_ROLES);
  if (!auth.ok) return auth.response;
  const { courseSlug } = await context.params;
  const parsed = await parseJsonBody(request, lessonSchema);
  if (!parsed.ok) return parsed.response;
  try {
    if (!(await assertCourseExists(courseSlug))) return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    const { id, ...payload } = parsed.data;
    if (id) {
      const existing = await prisma.courseLesson.findFirst({ where: { id, courseSlug } });
      if (!existing) return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
      if (existing.slug !== payload.slug) return NextResponse.json({ error: 'Lesson slugs are permanent so existing course links keep working.' }, { status: 400 });
      const lesson = await prisma.courseLesson.update({
        where: { id },
        data: { ...payload, summary: payload.summary?.trim() || null, durationMinutes: payload.durationMinutes ?? null },
      });
      revalidateProductContent({ type: 'COURSE', sourceSlug: courseSlug });
      return NextResponse.json({ lesson }, { headers: { 'Cache-Control': 'no-store' } });
    }
    const lesson = await prisma.courseLesson.create({
      data: { ...payload, courseSlug, summary: payload.summary?.trim() || null, durationMinutes: payload.durationMinutes ?? null },
    });
    revalidateProductContent({ type: 'COURSE', sourceSlug: courseSlug });
    return NextResponse.json({ lesson }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    logger.warn('Admin course lesson could not be saved', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Lesson could not be saved. Check that its slug is unique within this course.' }, { status: 409 });
  }
}

export async function DELETE(request: Request, context: Context) {
  const auth = await authorizeApi(STAFF_ROLES);
  if (!auth.ok) return auth.response;
  const { courseSlug } = await context.params;
  const parsed = await parseJsonBody(request, z.object({ id: z.string().min(1).max(64) }));
  if (!parsed.ok) return parsed.response;
  try {
    await prisma.courseLesson.updateMany({ where: { id: parsed.data.id, courseSlug }, data: { published: false } });
    revalidateProductContent({ type: 'COURSE', sourceSlug: courseSlug });
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Lesson could not be unpublished' }, { status: 404 });
  }
}
