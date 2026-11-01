import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-guards';
import { prisma } from '@/lib/prisma';
import { evaluateAnswer, validateNumericalAnswer } from '@/lib/placement-war-room/evaluation';
import { getQuestionBySlug } from '@/lib/placement-war-room/question-bank';
import { recordLearningSignal } from '@/lib/placement-war-room/personalization';
import { consumeRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limit: max 60 answer submissions per hour per user
    const rateLimit = await consumeRateLimit('placement-war-room:grade', user.id, { limit: 60, windowSeconds: 3600 });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', retryAfterSeconds: rateLimit.retryAfterSeconds },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { sessionId, questionSlug, userAnswer, timeSpentSeconds, expectedNumericResult } = body;

    if (!sessionId || !questionSlug || typeof userAnswer !== 'string') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const session = await prisma.interviewSession.findUnique({
      where: { id: sessionId },
    });
    if (!session || session.userId !== user.id) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const question = getQuestionBySlug(questionSlug);
    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    // Validate numerical answers independently if expected result provided
    let numericValidation;
    if (expectedNumericResult !== undefined) {
      numericValidation = validateNumericalAnswer(userAnswer, expectedNumericResult);
    }

    // Evaluate answer using AI
    const evaluation = await evaluateAnswer(question, userAnswer, expectedNumericResult);

    // Save the answer
    const answer = await prisma.interviewAnswer.create({
      data: {
        sessionId,
        questionId: question.id,
        questionText: question.question,
        questionType: question.questionType,
        subject: question.subject,
        subtopic: question.subtopic,
        difficulty: question.difficulty,
        userAnswer,
        aiScore: evaluation.score,
        rubricScores: evaluation.rubricScores ? JSON.stringify(evaluation.rubricScores) : null,
        feedback: evaluation.feedback,
        betterAnswer: evaluation.betterAnswer,
        missedPoints: evaluation.missedPoints ? JSON.stringify(evaluation.missedPoints) : null,
        strengths: evaluation.strengths ? JSON.stringify(evaluation.strengths) : null,
        explanation: evaluation.explanation,
        nextAction: evaluation.nextAction,
        followUpQuestion: evaluation.followUpQuestion ?? null,
        timeSpentSeconds: timeSpentSeconds ?? 0,
      },
    });

    // Record learning signal
    await recordLearningSignal(user.id, 'ANSWER_EVALUATED', {
      subject: question.subject,
      subtopic: question.subtopic,
      questionId: question.id,
      score: evaluation.score,
      metadata: { numericValidation, timeSpentSeconds },
    });

    return NextResponse.json({
      success: true,
      answerId: answer.id,
      evaluation,
      numericValidation,
    });
  } catch (error) {
    console.error('Grade error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}