import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { resolvePlan } from '@/lib/entitlements';
import {
  QUESTION_BANK,
  gradeAnswer,
  type InterviewAnswer,
  type InterviewQuestion,
} from '@/lib/interview-engine';

export async function POST(req: Request) {
  try {
    const session = await auth();
    const plan = resolvePlan(session?.user as Parameters<typeof resolvePlan>[0]);
    const isPaid = plan === 'PRO' || plan === 'ELITE' || plan === 'ENTERPRISE';

    const body = await req.json();
    const { questionId, userAnswer, timeSpentSeconds } = body;

    if (!questionId || typeof userAnswer !== 'string') {
      return NextResponse.json(
        { error: 'Missing questionId or userAnswer' },
        { status: 400 }
      );
    }

    const question = QUESTION_BANK.find((q) => q.id === questionId);
    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    const answerPayload: InterviewAnswer = {
      questionId,
      userAnswer,
      timeSpentSeconds: Number(timeSpentSeconds) || 0,
    };

    const graded = await gradeAnswer(question, answerPayload);

    return NextResponse.json({
      success: true,
      graded,
      isPaid,
      userPlan: plan,
    });
  } catch (error) {
    console.error('Error grading interview answer:', error);
    return NextResponse.json(
      { error: 'Internal server error while grading answer' },
      { status: 500 }
    );
  }
}
