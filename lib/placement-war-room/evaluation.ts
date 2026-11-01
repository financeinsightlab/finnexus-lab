// lib/placement-war-room/evaluation.ts — Answer evaluation using existing AI integration
import { placementWarRoomAiJson, buildSystemPrompt, buildEvaluationPrompt } from './ai-client';
import type { WarRoomQuestion, WarRoomAnswerEvaluation } from './types';

export interface NumericValidationResult {
  isValid: boolean;
  expectedValue?: number;
  userValue?: number;
  tolerance?: number;
  error?: string;
}

export async function evaluateAnswer(
  question: WarRoomQuestion,
  userAnswer: string,
  expectedNumericResult?: number
): Promise<WarRoomAnswerEvaluation> {
  const rubric = question.rubric.map((r) => ({
    name: r.name,
    weight: r.weight,
    description: r.description,
  }));

  const prompt = buildEvaluationPrompt(
    question.question,
    question.subject,
    question.subtopic,
    question.difficulty,
    userAnswer,
    rubric,
    question.expectedAnswer,
    expectedNumericResult
  );

  try {
    const result = await placementWarRoomAiJson<{
      score: number;
      rubricScores: Record<string, number>;
      feedback: string;
      betterAnswer: string;
      missedPoints: string[];
      strengths: string[];
      explanation: string;
      nextAction: string;
      followUpQuestion?: string;
    }>(
      [
        { role: 'system', content: buildSystemPrompt('evaluator') },
        { role: 'user', content: prompt },
      ],
      { maxTokens: 800, temperature: 0.2 }
    );

    return {
      questionId: question.id,
      score: Math.min(10, Math.max(0, result.score ?? 5)),
      rubricScores: result.rubricScores ?? {},
      feedback: result.feedback ?? 'Review the key points and try again.',
      betterAnswer: result.betterAnswer ?? question.expectedAnswer ?? '',
      missedPoints: result.missedPoints ?? [],
      strengths: result.strengths ?? [],
      explanation: result.explanation ?? '',
      nextAction: result.nextAction ?? 'Review the concept and practice again.',
      followUpQuestion: result.followUpQuestion,
    };
  } catch (error) {
    console.error('AI evaluation failed, using fallback:', error);
    return buildFallbackEvaluation(question, userAnswer);
  }
}

function buildFallbackEvaluation(question: WarRoomQuestion, userAnswer: string): WarRoomAnswerEvaluation {
  const answerLower = userAnswer.toLowerCase();
  const words = answerLower.split(/\s+/).filter(Boolean);
  
  // Concept keywords from expected answer and explanation
  const targetText = `${question.expectedAnswer || ''} ${question.explanation || ''} ${question.formulas.join(' ')}`.toLowerCase();
  const targetKeywords = targetText
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 4 && !['which', 'their', 'there', 'about', 'these', 'could', 'would'].includes(w));
  
  const uniqueKeywords = [...new Set(targetKeywords)];
  let hits = 0;
  for (const kw of uniqueKeywords) {
    if (answerLower.includes(kw)) hits++;
  }

  const coverageRatio = uniqueKeywords.length > 0 ? hits / Math.min(uniqueKeywords.length, 15) : 0.5;
  const wordScore = words.length >= 60 ? 3 : words.length >= 30 ? 2 : 1;
  const baseScore = Math.round(coverageRatio * 7) + wordScore;
  const score = Math.min(9.5, Math.max(2.5, baseScore));

  const missedPoints = question.commonMistakes.slice(0, 2);
  const strengths: string[] = [];
  if (hits >= 3) strengths.push('Identified core financial mechanisms correctly');
  if (words.length >= 40) strengths.push('Structured explanation with adequate detail');
  if (strengths.length === 0) strengths.push('Addressed the question prompt directly');

  return {
    questionId: question.id,
    score,
    rubricScores: { 'Technical Accuracy': score, 'Clarity & Structure': Math.min(10, score + 0.5) },
    feedback: score >= 7.5
      ? 'Excellent technical coverage. Your explanation demonstrates clear command of the underlying financial mechanics.'
      : score >= 5.5
      ? 'Good solid answer. To refine further, be more explicit about financial statement roll-forwards and quantify impacts.'
      : 'Basic foundation demonstrated. Review the expected answer to address missed formula derivations and linkages.',
    betterAnswer: question.expectedAnswer || question.explanation || 'Explain step-by-step using balance sheet and cash flow roll-forwards.',
    missedPoints,
    strengths,
    explanation: question.explanation || 'Refer to standard accounting and valuation mechanics.',
    nextAction: 'Review the model answer and verify understanding of the key linkages.',
  };
}

export function validateNumericalAnswer(
  userAnswer: string,
  expectedValue: number,
  tolerance: number = 0.01
): NumericValidationResult {
  const userValue = parseFloat(userAnswer.replace(/[₹,,%]/g, ''));
  if (isNaN(userValue)) {
    return { isValid: false, expectedValue, error: 'No valid number found in answer' };
  }
  const diff = Math.abs(userValue - expectedValue);
  const isValid = diff <= tolerance * Math.max(1, Math.abs(expectedValue));
  return {
    isValid,
    expectedValue,
    userValue,
    tolerance,
    error: isValid ? undefined : `Expected approximately ${expectedValue}, got ${userValue}`,
  };
}