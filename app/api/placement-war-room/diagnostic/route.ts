import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-guards';
import { prisma } from '@/lib/prisma';
import { getQuestionsForRole } from '@/lib/placement-war-room/question-bank';
import type { WarRoomRole } from '@/lib/placement-war-room/types';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { targetRole, questionCount = 10 } = body;

    if (!targetRole) {
      return NextResponse.json({ error: 'targetRole is required' }, { status: 400 });
    }

    const questions = getQuestionsForRole(targetRole as WarRoomRole, questionCount);

    const attempt = await prisma.diagnosticAttempt.create({
      data: {
        userId: user.id,
        targetRole,
        totalQuestions: questions.length,
        answeredCount: 0,
      },
    });

    return NextResponse.json({
      attemptId: attempt.id,
      questions: questions.map((q) => ({
        id: q.id,
        slug: q.slug,
        question: q.question,
        subject: q.subject,
        subtopic: q.subtopic,
        difficulty: q.difficulty,
        questionType: q.questionType,
        suggestedPrepTimeSeconds: q.suggestedPrepTimeSeconds,
      })),
    });
  } catch (error) {
    console.error('Diagnostic POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const attemptId = searchParams.get('attemptId');

    if (attemptId) {
      const attempt = await prisma.diagnosticAttempt.findUnique({
        where: { id: attemptId },
        include: { answers: true },
      });
      if (!attempt || attempt.userId !== user.id) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      return NextResponse.json({ attempt });
    }

    const attempts = await prisma.diagnosticAttempt.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return NextResponse.json({ attempts });
  } catch (error) {
    console.error('Diagnostic GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}