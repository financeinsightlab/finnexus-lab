import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';

const savedTypeSchema = z.enum(['insight', 'research']);

const savedQuerySchema = z.object({
  slug: z.string().min(1),
  type: savedTypeSchema,
});

const savedBodySchema = z.object({
  slug: z.string().min(1),
  type: savedTypeSchema,
});

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ saved: false }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const parsed = savedQuerySchema.safeParse({
    slug: searchParams.get('slug'),
    type: searchParams.get('type'),
  });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Missing or invalid slug/type' }, { status: 400 });
  }

  try {
    const savedArticle = await prisma.savedArticle.findUnique({
      where: {
        userId_slug_type: {
          userId: session.user.id,
          slug: parsed.data.slug,
          type: parsed.data.type,
        },
      },
    });

    return NextResponse.json({ saved: !!savedArticle });
  } catch (error) {
    logger.error('Error checking saved article', {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parsed = await parseJsonBody(request, savedBodySchema);
  if (!parsed.ok) return parsed.response;
  const { slug, type } = parsed.data;

  try {
    const savedArticle = await prisma.savedArticle.create({
      data: { userId: session.user.id, slug, type },
    });

    return NextResponse.json({ success: true, savedArticle });
  } catch (error) {
    logger.error('Error saving article', {
      error: error instanceof Error ? error.message : String(error),
    });
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ success: true }); // Already saved
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parsed = await parseJsonBody(request, savedBodySchema);
  if (!parsed.ok) return parsed.response;
  const { slug, type } = parsed.data;

  try {
    await prisma.savedArticle.delete({
      where: {
        userId_slug_type: {
          userId: session.user.id,
          slug,
          type,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Error removing saved article', {
      error: error instanceof Error ? error.message : String(error),
    });
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ success: true }); // Already removed
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
