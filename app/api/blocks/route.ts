import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authorizeApi, STAFF_ROLES } from '@/lib/auth-guards';
import { parseJsonBody, toInputJson } from '@/lib/validation';
import { logger } from '@/lib/logger';

const blockSchema = z
  .object({
    id: z.string().min(1),
    type: z.string().min(1),
    data: z.unknown(),
    attributes: z.unknown().optional(),
    order: z.number().int(),
  })
  .passthrough();

const saveBlocksSchema = z
  .object({
    postId: z.string().min(1).optional(),
    pageId: z.string().min(1).optional(),
    blocks: z.array(blockSchema),
  })
  .refine((value) => Boolean(value.postId) || Boolean(value.pageId), {
    message: 'postId or pageId required',
    path: ['postId'],
  });

// GET /api/blocks?postId=xxx or ?pageId=xxx
export async function GET(request: NextRequest) {
  try {
    const authz = await authorizeApi(STAFF_ROLES);
    if (!authz.ok) return authz.response;

    const { searchParams } = request.nextUrl;
    const postId = searchParams.get('postId');
    const pageId = searchParams.get('pageId');

    if (!postId && !pageId) {
      return NextResponse.json({ error: 'postId or pageId required' }, { status: 400 });
    }

    const blocks = await prisma.contentBlock.findMany({
      where: postId ? { postId } : { pageId: pageId as string },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ success: true, blocks });
  } catch (e) {
    logger.error('GET /api/blocks failed', {
      error: e instanceof Error ? e.message : String(e),
    });
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/blocks — Save all blocks for a post/page (full replace)
export async function POST(request: NextRequest) {
  try {
    const authz = await authorizeApi(STAFF_ROLES);
    if (!authz.ok) return authz.response;

    const parsed = await parseJsonBody(request, saveBlocksSchema);
    if (!parsed.ok) return parsed.response;

    const { postId, pageId, blocks } = parsed.data;

    // Delete existing blocks for this post/page
    if (postId) {
      await prisma.contentBlock.deleteMany({ where: { postId } });
    } else if (pageId) {
      await prisma.contentBlock.deleteMany({ where: { pageId } });
    }

    // Create new blocks (flatten — nested columns stored inside data JSON)
    const created = await Promise.all(
      blocks.map((block) =>
        prisma.contentBlock.create({
          data: {
            id: block.id,
            type: block.type,
            data: toInputJson(block.data),
            attributes: block.attributes === undefined ? undefined : toInputJson(block.attributes),
            order: block.order,
            parentId: null,
            postId: postId || null,
            pageId: pageId || null,
          },
        }),
      ),
    );

    return NextResponse.json({ success: true, count: created.length });
  } catch (e) {
    logger.error('POST /api/blocks failed', {
      error: e instanceof Error ? e.message : String(e),
    });
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
