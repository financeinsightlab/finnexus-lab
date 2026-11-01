// lib/placement-war-room/evaluation.ts — Canonical Answer Evaluation Service
//
// Single source of truth for all finance interview, diagnostic, and simulator evaluations.
// Uses server-side Hugging Face AI (mistralai/Mistral-7B-Instruct-v0.3) with deterministic,
// rubric-based fallbacks that NEVER award scores based on answer length.

import { placementWarRoomAiJson, buildSystemPrompt, buildEvaluationPrompt } from './ai-client';
import type { WarRoomQuestion, WarRoomAnswerEvaluation } from './types';
import type { InterviewQuestion, GradedAnswer } from '@/lib/interview-engine';

export interface EvaluationOptions {
  role?: string;
  companyContext?: string;
  timeSpentSeconds?: number;
  expectedNumericResult?: number;
}

export interface NumericValidationResult {
  isValid: boolean;
  expectedValue?: number;
  userValue?: number;
  tolerance?: number;
  error?: string;
}

const INDIA_REGULATORY_KEYWORDS = [
  'ind as', 'rbi', 'sebi', 'lodr', '10y g-sec', 'g-sec', 'repo', 'mca', 'ibc', 'nclt',
  'pat', 'crore', 'lakh', 'fy', 'amfi', 'gst', 'mat', 'dta', 'dtl',
  'dscr', 'mclr', 'crr', 'slr', 'companies act', 'car', 'gnpa', 'nnpa'
];

/**
 * Universal evaluation adapter that accepts any question schema
 * (WarRoomQuestion, InterviewQuestion, or UnifiedQuestion).
 */
export async function evaluateAnswer(
  question: WarRoomQuestion | InterviewQuestion | any,
  userAnswer: string,
  optionsOrNumeric?: EvaluationOptions | number
): Promise<WarRoomAnswerEvaluation> {
  const options: EvaluationOptions =
    typeof optionsOrNumeric === 'number'
      ? { expectedNumericResult: optionsOrNumeric }
      : optionsOrNumeric ?? {};

  const trimmed = (userAnswer ?? '').trim();
  const qId = question.id || question.slug || 'unknown-question';
  const qText = question.question || '';
  const qSubject = question.subject || (Array.isArray(question.tags) && question.tags[0]) || 'Finance';
  const qSubtopic = question.subtopic || (Array.isArray(question.tags) && question.tags[1]) || 'Core';
  const qDifficulty = question.difficulty || 'MEDIUM';

  const expectedKeyPoints: string[] = Array.isArray(question.keyPoints) && question.keyPoints.length > 0
    ? question.keyPoints
    : question.expectedAnswer
    ? [question.expectedAnswer]
    : [];

  const commonMistakes: string[] = Array.isArray(question.commonMistakes) ? question.commonMistakes : [];

  const rubric = Array.isArray(question.rubric) && question.rubric.length > 0
    ? question.rubric.map((r: any) => ({ name: r.name, weight: r.weight, description: r.description }))
    : [
        { name: 'Technical Accuracy & Mechanics', weight: 0.35, description: 'Correct formulas, mechanics, and financial statement linkages' },
        { name: 'Conceptual Depth', weight: 0.25, description: 'Underlying intuition and drivers beyond surface buzzwords' },
        { name: 'Financial Reasoning', weight: 0.20, description: 'Logical structure and quantified financial impacts' },
        { name: 'Indian Regulatory Context', weight: 0.10, description: 'Application of Ind AS, SEBI, or RBI standards where relevant' },
        { name: 'Clarity & Delivery', weight: 0.10, description: 'Professional, articulate finance interview delivery' },
      ];

  // 1. Guard against empty or trivial responses
  if (trimmed.length < 5) {
    return {
      questionId: qId,
      score: 1.0,
      grade: 'POOR',
      evaluationType: 'RULE_BASED',
      rubricScores: {
        'Technical Accuracy & Mechanics': 1.0,
        'Conceptual Depth': 1.0,
        'Financial Reasoning': 1.0,
        'Clarity & Delivery': 1.0,
      },
      feedback: 'Answer was too brief to evaluate. Finance interviewers look for structured explanations with specific mechanics, formulas, or numbers.',
      betterAnswer: expectedKeyPoints.length > 0 ? expectedKeyPoints.join('. ') + '.' : (question.expectedAnswer || 'Provide a complete structured answer.'),
      missedPoints: expectedKeyPoints.slice(0, 3),
      strengths: [],
      explanation: question.explanation || 'Review the core financial mechanisms and practice structured delivery.',
      nextAction: 'Review the key points and attempt a full explanation.',
    };
  }

  // 2. Attempt AI Evaluation via server-side Hugging Face router
  const hfKey = process.env.HUGGINGFACE_API_KEY;
  if (hfKey && hfKey.length > 10) {
    try {
      const prompt = buildEvaluationPrompt(
        qText,
        qSubject,
        qSubtopic,
        qDifficulty,
        trimmed,
        rubric,
        question.expectedAnswer || expectedKeyPoints.join('. '),
        options.expectedNumericResult
      );

      const aiResult = await placementWarRoomAiJson<{
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

      if (aiResult && typeof aiResult.score === 'number' && !isNaN(aiResult.score)) {
        const score = Math.min(10, Math.max(0, Math.round(aiResult.score * 10) / 10));
        const grade: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'POOR' =
          score >= 8.0 ? 'EXCELLENT' : score >= 6.0 ? 'GOOD' : score >= 4.0 ? 'AVERAGE' : 'POOR';

        return {
          questionId: qId,
          score,
          grade,
          evaluationType: 'AI',
          rubricScores: aiResult.rubricScores ?? {},
          feedback: aiResult.feedback ?? 'Clear structured response.',
          betterAnswer: aiResult.betterAnswer ?? (question.expectedAnswer || expectedKeyPoints.join('. ')),
          missedPoints: Array.isArray(aiResult.missedPoints) ? aiResult.missedPoints : [],
          strengths: Array.isArray(aiResult.strengths) ? aiResult.strengths : ['Addressed the question prompt directly'],
          explanation: aiResult.explanation ?? (question.explanation || ''),
          nextAction: aiResult.nextAction ?? 'Review the concept and test with a follow-up question.',
          followUpQuestion: aiResult.followUpQuestion,
        };
      }
    } catch (error) {
      // AI unavailable or timed out; fall through to deterministic rubric evaluation
      console.warn('Placement AI evaluation timed out or failed; falling back to deterministic rubric:', (error as Error).message);
    }
  }

  // 3. Deterministic Rubric-Based Evaluation (Strictly NO score for answer length)
  return buildDeterministicRubricEvaluation(question, trimmed, expectedKeyPoints, commonMistakes, rubric, options);
}

/**
 * Pure deterministic rubric evaluation.
 * Evaluates semantic concept hits and formula references.
 * Explicitly does NOT award scores for answer length or word count.
 */
function buildDeterministicRubricEvaluation(
  question: any,
  userAnswer: string,
  keyPoints: string[],
  commonMistakes: string[],
  rubric: Array<{ name: string; weight: number; description: string }>,
  options: EvaluationOptions
): WarRoomAnswerEvaluation {
  const ansLower = userAnswer.toLowerCase();
  const coveredPoints: string[] = [];
  const missedPoints: string[] = [];

  // A. Check Key Points Coverage
  for (const point of keyPoints) {
    const pointKeywords = point
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3 && !['with', 'from', 'that', 'this', 'have', 'been', 'which', 'their', 'there'].includes(w));

    let hitCount = 0;
    for (const kw of pointKeywords) {
      if (ansLower.includes(kw)) hitCount++;
    }

    const coverageRatio = pointKeywords.length > 0 ? hitCount / pointKeywords.length : 0;
    if (coverageRatio >= 0.30 || hitCount >= 2) {
      coveredPoints.push(point);
    } else {
      missedPoints.push(point);
    }
  }

  // B. Check Common Mistakes Avoidance
  const detectedMistakes: string[] = [];
  for (const mistake of commonMistakes) {
    const mWords = mistake.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
    if (mWords.some((w) => w.includes('forget') || w.includes('miss') || w.includes('confus') || w.includes('ignor'))) {
      const conceptWords = mWords.filter((w) => !['forgetting', 'missing', 'confusing', 'ignoring', 'not'].includes(w));
      if (conceptWords.length > 0 && !conceptWords.some((cw) => ansLower.includes(cw))) {
        detectedMistakes.push(mistake);
      }
    }
  }

  // C. Check Indian Regulatory Nuance
  const indiaHits = INDIA_REGULATORY_KEYWORDS.filter((kw) => ansLower.includes(kw));

  // D. Pure Concept-Based Technical Scoring (0 to 10)
  const coverageRatio = keyPoints.length > 0
    ? coveredPoints.length / keyPoints.length
    : 0.5;

  let technicalScore = Math.round(coverageRatio * 10 * 10) / 10;
  let regulatoryBonus = indiaHits.length >= 2 ? 1.0 : indiaHits.length === 1 ? 0.5 : 0;
  let mistakePenalty = detectedMistakes.length * 0.7;

  let rawScore = Math.max(1.5, Math.min(9.5, technicalScore + regulatoryBonus - mistakePenalty));
  const finalScore = Math.round(rawScore * 10) / 10;

  const grade: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'POOR' =
    finalScore >= 8.0 ? 'EXCELLENT' : finalScore >= 6.0 ? 'GOOD' : finalScore >= 4.0 ? 'AVERAGE' : 'POOR';

  // E. Strengths Generation
  const strengths: string[] = [];
  if (coveredPoints.length > 0) {
    strengths.push(`Addressed core concept: ${coveredPoints[0].slice(0, 75)}`);
  }
  if (coveredPoints.length > 1) {
    strengths.push(`Demonstrated knowledge of: ${coveredPoints[1].slice(0, 75)}`);
  }
  if (indiaHits.length > 0) {
    strengths.push(`Applied Indian market context (${indiaHits.slice(0, 2).join(', ').toUpperCase()})`);
  }
  if (strengths.length === 0) {
    strengths.push('Addressed the main question topic');
  }

  // F. Transparent Rule-Based Feedback Notice
  let feedback = `Rule-based evaluation (AI grading service temporarily unavailable): Scored against canonical key points. `;
  if (grade === 'EXCELLENT') {
    feedback += `Strong conceptual alignment covering ${coveredPoints.length} of ${keyPoints.length || 1} core criteria.`;
  } else if (grade === 'GOOD') {
    feedback += `Solid baseline covering key mechanics. Emphasize exact formula drivers and edge cases for top-bracket scoring.`;
  } else if (grade === 'AVERAGE') {
    feedback += `Partial coverage. Missing foundational components required for front-office interviews.`;
  } else {
    feedback += `Several critical concepts were missed. Review the model answer and practice structured breakdown.`;
  }

  if (detectedMistakes.length > 0) {
    feedback += ` Note: ${detectedMistakes[0]}.`;
  }

  const modelAnswer = keyPoints.length > 0
    ? keyPoints.join('. ') + '.'
    : (question.expectedAnswer || 'Provide a structured explanation walking through financial drivers step-by-step.');

  const qId = question.id || question.slug || 'unknown-question';

  return {
    questionId: qId,
    score: finalScore,
    grade,
    evaluationType: 'RULE_BASED',
    rubricScores: {
      'Technical Accuracy & Mechanics': technicalScore,
      'Regulatory & Practical Context': Math.min(10, 5 + regulatoryBonus * 3),
    },
    feedback,
    betterAnswer: modelAnswer,
    missedPoints: missedPoints.slice(0, 3),
    strengths,
    explanation: question.explanation || 'Refer to canonical accounting and valuation standards.',
    nextAction: 'Review the model answer and verify understanding of the key linkages.',
    followUpQuestion: Array.isArray(question.followUpQuestions) && question.followUpQuestions.length > 0
      ? question.followUpQuestions[0]
      : undefined,
  };
}

/**
 * Validates a numerical user input against expected value within tolerance.
 */
export function validateNumericalAnswer(
  userAnswer: string,
  expectedValue: number,
  tolerance: number = 0.02
): NumericValidationResult {
  const cleaned = userAnswer.replace(/[₹$,%]/g, '').trim();
  const match = cleaned.match(/-?\d+(?:\.\d+)?/);
  if (!match) {
    return { isValid: false, expectedValue, error: 'No numerical value detected in answer.' };
  }
  const userValue = parseFloat(match[0]);
  if (isNaN(userValue)) {
    return { isValid: false, expectedValue, error: 'Invalid number format.' };
  }

  const diff = Math.abs(userValue - expectedValue);
  const allowedError = tolerance * Math.max(1, Math.abs(expectedValue));
  const isValid = diff <= allowedError;

  return {
    isValid,
    expectedValue,
    userValue,
    tolerance,
    error: isValid ? undefined : `Expected approximately ${expectedValue}, received ${userValue}`,
  };
}

/**
 * Backward compatibility alias for evaluateFinanceAnswer from financial-evaluator.ts
 */
export const evaluateAnswerWithRubric = evaluateAnswer;

export async function evaluateFinanceAnswer(
  question: any,
  userAnswer: string,
  options: EvaluationOptions = {}
): Promise<GradedAnswer> {
  const result = await evaluateAnswer(question, userAnswer, options);
  return {
    questionId: result.questionId,
    score: result.score,
    grade: result.grade || (result.score >= 8 ? 'EXCELLENT' : result.score >= 6 ? 'GOOD' : result.score >= 4 ? 'AVERAGE' : 'POOR'),
    feedback: result.feedback,
    betterAnswer: result.betterAnswer,
    missedPoints: result.missedPoints,
    strengths: result.strengths,
  };
}
