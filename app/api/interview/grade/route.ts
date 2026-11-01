import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { resolvePlan } from '@/lib/entitlements';
import {
  UNIFIED_QUESTION_BANK,
  getUnifiedQuestionById,
} from '@/lib/placement-war-room/unified-question-bank';
import { evaluateFinanceAnswer } from '@/lib/placement-war-room/financial-evaluator';
import { QUESTION_BANK } from '@/lib/interview-engine';

export async function POST(req: Request) {
  try {
    const session = await auth();
    const plan = resolvePlan(session?.user as Parameters<typeof resolvePlan>[0]);

    const body = await req.json();
    const { questionId, userAnswer, timeSpentSeconds, role } = body;

    if (!questionId || typeof userAnswer !== 'string') {
      return NextResponse.json(
        { error: 'Missing questionId or userAnswer' },
        { status: 400 }
      );
    }

    // Lookup in Unified Question Bank first, then fallback to base bank
    const question =
      getUnifiedQuestionById(questionId) ||
      UNIFIED_QUESTION_BANK.find((q) => q.id === questionId) ||
      QUESTION_BANK.find((q) => q.id === questionId);

    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    const graded = await evaluateFinanceAnswer(question, userAnswer, {
      role,
      timeSpentSeconds: Number(timeSpentSeconds) || 0,
    });

    return NextResponse.json({
      success: true,
      graded,
      isPaid: true, // No pricing restriction
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
