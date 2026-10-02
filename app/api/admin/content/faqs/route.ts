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
const faqSchema = z.object({
  id: z.string().min(1).max(64).optional(),
  slug: z.string().min(2).max(120).regex(slugPattern),
  question: z.string().trim().min(5).max(240),
  answer: z.string().trim().min(10).max(6000),
  category: z.string().trim().max(80).nullable().optional(),
  relatedType: z.string().trim().toUpperCase().min(2).max(40).regex(/^[A-Z0-9_]+$/),
  relatedSlug: z.string().trim().min(1).max(160).regex(/^[a-zA-Z0-9][a-zA-Z0-9/_-]*$/),
  displayOrder: z.number().int().min(0).max(10000).default(0),
  published: z.boolean().default(false),
  seoVisible: z.boolean().default(true),
});

export async function GET(request: Request) {
  const auth = await authorizeApi(STAFF_ROLES);
  if (!auth.ok) return auth.response;
  const url = new URL(request.url);
  const relatedType = url.searchParams.get('relatedType')?.trim().toUpperCase();
  const relatedSlug = url.searchParams.get('relatedSlug')?.trim();
  try {
    const faqs = await prisma.faqItem.findMany({
      where: {
        ...(relatedType ? { relatedType } : {}),
        ...(relatedSlug ? { relatedSlug } : {}),
      },
      orderBy: [{ relatedType: 'asc' }, { relatedSlug: 'asc' }, { displayOrder: 'asc' }],
      take: 500,
    });
    return NextResponse.json({ faqs }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    logger.error('Admin FAQ list failed', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'FAQ content unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}

export async function POST(request: Request) {
  const auth = await authorizeApi(STAFF_ROLES);
  if (!auth.ok) return auth.response;
  const parsed = await parseJsonBody(request, faqSchema);
  if (!parsed.ok) return parsed.response;
  const { id, ...data } = parsed.data;
  try {
    const faq = id
      ? await prisma.faqItem.update({ where: { id }, data: { ...data, category: data.category?.trim() || null } })
      : await prisma.faqItem.create({ data: { ...data, category: data.category?.trim() || null } });
    revalidateProductContent({ type: 'FAQ', sourceType: faq.relatedType, sourceSlug: faq.relatedSlug });
    return NextResponse.json({ faq }, { status: id ? 200 : 201, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    logger.warn('Admin FAQ save failed', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'FAQ could not be saved. Check the slug is unique in this context.' }, { status: 409 });
  }
}

export async function DELETE(request: Request) {
  const auth = await authorizeApi(STAFF_ROLES);
  if (!auth.ok) return auth.response;
  const parsed = await parseJsonBody(request, z.object({ id: z.string().min(1).max(64) }));
  if (!parsed.ok) return parsed.response;
  try {
    const faq = await prisma.faqItem.update({ where: { id: parsed.data.id }, data: { published: false } });
    revalidateProductContent({ type: 'FAQ', sourceType: faq.relatedType, sourceSlug: faq.relatedSlug });
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'FAQ was not found' }, { status: 404 });
  }
}
