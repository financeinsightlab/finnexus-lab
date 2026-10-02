import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authorizeApi, STAFF_ROLES } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { revalidateProductContent } from '@/lib/product-content-admin';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const stringList = z.array(z.string().trim().min(1).max(100)).max(40).default([]);
const termSchema = z.object({
  id: z.string().min(1).max(64).optional(),
  slug: z.string().min(2).max(120).regex(slugPattern),
  term: z.string().trim().min(1).max(160),
  simpleMeaning: z.string().trim().min(10).max(6000),
  example: z.string().trim().min(5).max(6000),
  interviewAnswer: z.string().trim().min(5).max(6000),
  formula: z.string().trim().max(2000).nullable().optional(),
  category: z.string().trim().min(1).max(80),
  subCategory: z.string().trim().max(80).nullable().optional(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).default('BEGINNER'),
  keywords: stringList,
  synonyms: stringList,
  relatedTermSlugs: z.array(z.string().trim().regex(slugPattern)).max(12).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  seoVisible: z.boolean().default(true),
  displayOrder: z.number().int().min(0).max(10000).default(0),
});

export async function GET() {
  const auth = await authorizeApi(STAFF_ROLES);
  if (!auth.ok) return auth.response;
  try {
    const terms = await prisma.financeTerm.findMany({
      orderBy: [{ category: 'asc' }, { displayOrder: 'asc' }, { term: 'asc' }],
      take: 500,
    });
    return NextResponse.json({ terms }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    logger.error('Admin finance term list failed', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Finance terms unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}

export async function POST(request: Request) {
  const auth = await authorizeApi(STAFF_ROLES);
  if (!auth.ok) return auth.response;
  const parsed = await parseJsonBody(request, termSchema);
  if (!parsed.ok) return parsed.response;
  const { id, ...data } = parsed.data;
  const searchText = [data.term, data.simpleMeaning, data.example, data.interviewAnswer, data.category, data.subCategory ?? '', ...(data.keywords ?? []), ...(data.synonyms ?? [])].join(' ').slice(0, 20000);
  const payload = {
    ...data,
    subCategory: data.subCategory?.trim() || null,
    formula: data.formula?.trim() || null,
    searchText,
  };
  const { subCategory, ...payloadWithoutSubCategory } = payload;
  try {
    let term: any;
    try {
      term = id
        ? await prisma.financeTerm.update({ where: { id }, data: payload })
        : await prisma.financeTerm.create({ data: payload });
    } catch (saveErr) {
      const msg = saveErr instanceof Error ? saveErr.message : String(saveErr);
      if (msg.includes('subCategory') || msg.includes('Unknown argument')) {
        term = id
          ? await prisma.financeTerm.update({ where: { id }, data: payloadWithoutSubCategory })
          : await prisma.financeTerm.create({ data: payloadWithoutSubCategory });
        if (subCategory !== undefined) {
          try {
            await prisma.$executeRawUnsafe(
              `UPDATE "FinanceTerm" SET "subCategory" = $1 WHERE "id" = $2`,
              subCategory,
              term.id,
            );
            term.subCategory = subCategory;
          } catch {
            // non-fatal
          }
        }
      } else {
        throw saveErr;
      }
    }

    try {
      revalidateProductContent({ type: 'FINANCE_TERM', sourceSlug: term.slug });
    } catch {
      // non-fatal
    }
    return NextResponse.json({ term }, { status: id ? 200 : 201, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    logger.warn('Admin finance term save failed', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Term could not be saved. Check that the slug is unique.' }, { status: 409 });
  }
}

export async function DELETE(request: Request) {
  const auth = await authorizeApi(STAFF_ROLES);
  if (!auth.ok) return auth.response;
  const parsed = await parseJsonBody(request, z.object({ id: z.string().min(1).max(64) }));
  if (!parsed.ok) return parsed.response;
  try {
    const term = await prisma.financeTerm.update({ where: { id: parsed.data.id }, data: { published: false } });
    revalidateProductContent({ type: 'FINANCE_TERM', sourceSlug: term.slug });
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Finance term was not found' }, { status: 404 });
  }
}
