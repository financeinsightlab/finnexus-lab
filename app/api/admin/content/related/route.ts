import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authorizeApi, STAFF_ROLES } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { revalidateProductContent } from '@/lib/product-content-admin';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const tokenPattern = /^[A-Z0-9_]+$/;
const slugPattern = /^[a-zA-Z0-9][a-zA-Z0-9/_-]*$/;
const relatedSchema = z.object({
  id: z.string().min(1).max(64).optional(),
  sourceType: z.string().trim().toUpperCase().min(2).max(40).regex(tokenPattern),
  sourceSlug: z.string().trim().min(1).max(160).regex(slugPattern),
  targetType: z.string().trim().toUpperCase().min(2).max(40).regex(tokenPattern),
  targetSlug: z.string().trim().min(1).max(160).regex(slugPattern),
  anchorText: z.string().trim().max(180).nullable().optional(),
  linkKind: z.enum(['RELATED', 'CTA']).default('RELATED'),
  displayOrder: z.number().int().min(0).max(10000).default(0),
  published: z.boolean().default(false),
}).superRefine((value, context) => {
  if (value.sourceType === value.targetType && value.sourceSlug === value.targetSlug) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['targetSlug'], message: 'A page cannot link to itself.' });
  }
});

export async function GET(request: Request) {
  const auth = await authorizeApi(STAFF_ROLES);
  if (!auth.ok) return auth.response;
  const params = new URL(request.url).searchParams;
  const sourceType = params.get('sourceType')?.trim().toUpperCase();
  const sourceSlug = params.get('sourceSlug')?.trim();
  try {
    const relations = await prisma.relatedContent.findMany({
      where: {
        ...(sourceType ? { sourceType } : {}),
        ...(sourceSlug ? { sourceSlug } : {}),
      },
      orderBy: [{ sourceType: 'asc' }, { sourceSlug: 'asc' }, { linkKind: 'asc' }, { displayOrder: 'asc' }],
      take: 500,
    });
    return NextResponse.json({ relations }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    logger.error('Related content list failed', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Related content unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}

export async function POST(request: Request) {
  const auth = await authorizeApi(STAFF_ROLES);
  if (!auth.ok) return auth.response;
  const parsed = await parseJsonBody(request, relatedSchema);
  if (!parsed.ok) return parsed.response;
  const { id, ...input } = parsed.data;
  try {
    const relation = id
      ? await prisma.relatedContent.update({ where: { id }, data: { ...input, anchorText: input.anchorText?.trim() || null } })
      : await prisma.relatedContent.create({ data: { ...input, anchorText: input.anchorText?.trim() || null } });
    revalidateProductContent({
      type: 'RELATED',
      sourceType: relation.sourceType,
      sourceSlug: relation.sourceSlug,
      targetType: relation.targetType,
      targetSlug: relation.targetSlug,
    });
    return NextResponse.json({ relation }, { status: id ? 200 : 201, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    logger.warn('Related content save failed', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Related content could not be saved. Check for a duplicate source and target.' }, { status: 409, headers: { 'Cache-Control': 'no-store' } });
  }
}

export async function DELETE(request: Request) {
  const auth = await authorizeApi(STAFF_ROLES);
  if (!auth.ok) return auth.response;
  const parsed = await parseJsonBody(request, z.object({ id: z.string().min(1).max(64) }));
  if (!parsed.ok) return parsed.response;
  try {
    const relation = await prisma.relatedContent.update({ where: { id: parsed.data.id }, data: { published: false } });
    revalidateProductContent({
      type: 'RELATED',
      sourceType: relation.sourceType,
      sourceSlug: relation.sourceSlug,
      targetType: relation.targetType,
      targetSlug: relation.targetSlug,
    });
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Related content was not found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
  }
}
