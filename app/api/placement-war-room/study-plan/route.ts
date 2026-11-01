import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-guards';
import { prisma } from '@/lib/prisma';
import { generateStudyPlan } from '@/lib/placement-war-room/study-plan';
import { recordLearningSignal } from '@/lib/placement-war-room/personalization';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { targetRole, diagnosticResult, dailyPrepTime, interviewDate, totalDays = 30 } = body;

    if (!targetRole) {
      return NextResponse.json({ error: 'targetRole is required' }, { status: 400 });
    }

    const plan = await generateStudyPlan(targetRole, diagnosticResult ?? {
      overallScore: 50,
      strongTopics: [],
      weakTopics: [],
      knowledgeGaps: [],
    }, {
      dailyPrepTime,
      interviewDate,
      preferredExplanationStyle: 'DETAILED',
    }, totalDays);

    const savedPlan = await prisma.studyPlan.create({
      data: {
        userId: user.id,
        targetRole,
        interviewDate: interviewDate ? new Date(interviewDate) : undefined,
        totalDays: plan.totalDays,
        currentDay: 1,
        status: 'ACTIVE',
        planData: JSON.stringify(plan.dailyTasks),
      },
    });

    await recordLearningSignal(user.id, 'SESSION_COMPLETED', {
      subject: 'StudyPlan',
      metadata: { targetRole, totalDays, planId: savedPlan.id },
    });

    return NextResponse.json({ plan: { ...plan, id: savedPlan.id } });
  } catch (error) {
    console.error('Study plan error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(req.url);
    const planId = searchParams.get('planId');

    if (user && planId) {
      const plan = await prisma.studyPlan.findUnique({
        where: { id: planId },
        include: { tasks: { orderBy: { day: 'asc' } } },
      });
      if (plan && plan.userId === user.id) {
        return NextResponse.json({ plan });
      }
    }

    if (user) {
      const plans = await prisma.studyPlan.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { _count: { select: { tasks: true } } },
      });
      if (plans.length > 0) {
        return NextResponse.json({ plans });
      }
    }

    // Return the curated 60-day roadmap
    const { PLAN } = await import('@/lib/placement-prep/plan');
    return NextResponse.json({
      plan: {
        totalDays: 60,
        currentDay: 1,
        status: 'ACTIVE',
        dailyTasks: PLAN,
      },
    });
  } catch (error) {
    console.error('Study plan GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}