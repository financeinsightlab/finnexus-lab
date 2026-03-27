import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ saved: false }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const type = searchParams.get('type');

  if (!slug || !type) {
    return NextResponse.json({ error: 'Missing slug or type' }, { status: 400 });
  }

  try {
    const savedArticle = await prisma.savedArticle.findUnique({
      where: {
        userId_slug_type: {
          userId: session.user.id,
          slug,
          type,
        },
      },
    });

    return NextResponse.json({ saved: !!savedArticle });
  } catch (error) {
    console.error('Error checking saved article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug, type } = await request.json();

    if (!slug || !type) {
      return NextResponse.json({ error: 'Missing slug or type' }, { status: 400 });
    }

    const savedArticle = await prisma.savedArticle.create({
      data: {
        userId: session.user.id,
        slug,
        type,
      },
    });

    return NextResponse.json({ success: true, savedArticle });
  } catch (error: any) {
    console.error('Error saving article:', error);
    if (error.code === 'P2002') {
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

  try {
    const { slug, type } = await request.json();

    if (!slug || !type) {
      return NextResponse.json({ error: 'Missing slug or type' }, { status: 400 });
    }

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
  } catch (error: any) {
    console.error('Error removing saved article:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ success: true }); // Already removed
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
