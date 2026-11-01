import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-guards';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'all'; // all | interviews | diagnostics | finance-lab

    const interviews = type === 'all' || type === 'interviews'
      ? await prisma.interviewSession.findMany({
          where: { userId: user.id },
          orderBy: { startedAt: 'desc' },
          take: 20,
          include: {
            _count: { select: { answers: true } },
            answers: { orderBy: { answeredAt: 'asc' }, take: 3 },
          },
        })
      : [];

    const diagnostics = type === 'all' || type === 'diagnostics'
      ? await prisma.diagnosticAttempt.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: { _count: { select: { answers: true } } },
        })
      : [];

    const financeLab = type === 'all' || type === 'finance-lab'
      ? await prisma.financeLabAttempt.findMany({
          where: { userId: user.id },
          orderBy: { completedAt: 'desc' },
          take: 10,
          include: { exercise: true },
        })
      : [];

    return NextResponse.json({
      interviews,
      diagnostics,
      financeLab,
    });
  } catch (error) {
    console.error('History error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}