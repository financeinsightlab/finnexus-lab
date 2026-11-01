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
    const { targetRole, experienceLevel, durationMinutes, interviewType, difficulty, targetCompany, topicsEmphasised } = body;

    if (!targetRole || !durationMinutes || !interviewType || !difficulty) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Limit interview length to control AI costs
    const maxQuestions = Math.min(Math.ceil(durationMinutes / 5), 15);
    const questions = getQuestionsForRole(targetRole as WarRoomRole, maxQuestions);

    const session = await prisma.interviewSession.create({
      data: {
        userId: user.id,
        targetRole,
        experienceLevel: experienceLevel ?? 'FRESHER',
        durationMinutes,
        interviewType,
        difficulty,
        targetCompany: targetCompany ?? null,
        topicsEmphasised: topicsEmphasised ? JSON.stringify(topicsEmphasised) : null,
        status: 'IN_PROGRESS',
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      questions: questions.map((q) => ({
        id: q.id,
        slug: q.slug,
        question: q.question,
        subject: q.subject,
        subtopic: q.subtopic,
        difficulty: q.difficulty,
        questionType: q.questionType,
        hint: q.hint,
        suggestedPrepTimeSeconds: q.suggestedPrepTimeSeconds,
      })),
    });
  } catch (error) {
    console.error('Interview POST error:', error);
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
    const sessionId = searchParams.get('sessionId');

    if (sessionId) {
      const session = await prisma.interviewSession.findUnique({
        where: { id: sessionId },
        include: { answers: true },
      });
      if (!session || session.userId !== user.id) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      return NextResponse.json({ session });
    }

    const sessions = await prisma.interviewSession.findMany({
      where: { userId: user.id },
      orderBy: { startedAt: 'desc' },
      take: 20,
      include: {
        _count: { select: { answers: true } },
      },
    });
    return NextResponse.json({ sessions });
  } catch (error) {
    console.error('Interview GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}