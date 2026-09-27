import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authorizeApi, isAdmin, STAFF_ROLES } from '@/lib/auth-guards';
import { parseJsonBody, toInputJson } from '@/lib/validation';
import { logger } from '@/lib/logger';

const createTemplateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).nullish(),
  type: z.string().min(1).max(100).optional(),
  category: z.string().min(1).max(100).optional(),
  data: z.unknown(),
  isPublic: z.boolean().optional(),
});

// GET /api/blocks/templates?category=hero
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const category = searchParams.get('category');

    const templates = await prisma.blockTemplate.findMany({
      where: {
        isPublic: true,
        ...(category ? { category } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, templates });
  } catch (e) {
    logger.error('GET /api/blocks/templates failed', {
      error: e instanceof Error ? e.message : String(e),
    });
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/blocks/templates — Save a new template
export async function POST(request: NextRequest) {
  try {
    const authz = await authorizeApi(STAFF_ROLES);
    if (!authz.ok) return authz.response;

    const parsed = await parseJsonBody(request, createTemplateSchema);
    if (!parsed.ok) return parsed.response;

    const { name, description, type, category, data, isPublic } = parsed.data;

    const template = await prisma.blockTemplate.create({
      data: {
        name,
        description: description ?? null,
        type: type || 'section',
        category: category || 'custom',
        data: toInputJson(data),
        isPublic: isPublic ?? true,
        createdBy: authz.user.id,
      },
    });

    return NextResponse.json({ success: true, template });
  } catch (e) {
    logger.error('POST /api/blocks/templates failed', {
      error: e instanceof Error ? e.message : String(e),
    });
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE /api/blocks/templates?id=xxx
export async function DELETE(request: NextRequest) {
  try {
    const authz = await authorizeApi(STAFF_ROLES);
    if (!authz.ok) return authz.response;

    const id = request.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const template = await prisma.blockTemplate.findUnique({ where: { id } });
    if (!template) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const isOwner = template.createdBy === authz.user.id;
    if (!isOwner && !isAdmin(authz.user)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.blockTemplate.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (e) {
    logger.error('DELETE /api/blocks/templates failed', {
      error: e instanceof Error ? e.message : String(e),
    });
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
