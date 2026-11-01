// lib/placement-war-room/financial-evaluator.ts
// High-fidelity Financial AI Evaluator for Placement Day War Room
// Operates with zero downtime: incorporates deep semantic financial grading,
// Indian regulatory context analysis, rubric scoring, and optional LLM synthesis.

import type { InterviewQuestion, InterviewRole, GradedAnswer } from '@/lib/interview-engine';

export interface EvaluationOptions {
  role?: InterviewRole;
  timeSpentSeconds?: number;
  companyContext?: string;
}

const INDIA_REGULATORY_KEYWORDS = [
  'ind as', 'rbi', 'sebi', 'lodr', '10y g-sec', 'g-sec', 'repo', 'mca', 'ibc', 'nclt',
  'promoter', 'pat', 'crore', 'lakh', 'fy', 'amfi', 'irda', 'gst', 'mat', 'dta', 'dtl',
  'corporate tax rate', '25%', '22%', 'clean note policy', 'crr', 'slr', 'dscr', 'mclr'
];

export async function evaluateFinanceAnswer(
  question: InterviewQuestion,
  userAnswer: string,
  options: EvaluationOptions = {}
): Promise<GradedAnswer> {
  const trimmed = userAnswer.trim();

  // If answer is empty or too short
  if (trimmed.length < 5) {
    return {
      questionId: question.id,
      score: 1,
      grade: 'POOR',
      feedback: 'Answer was too brief. Finance interviewers look for structured explanations with specific mechanics, formulas, or numbers.',
      betterAnswer: question.keyPoints.length > 0 ? question.keyPoints.join('. ') + '.' : 'Provide a complete, structured financial explanation.',
      missedPoints: question.keyPoints.slice(0, 3),
      strengths: [],
    };
  }

  // 1. Try external LLM with short timeout if key exists
  const hfKey = process.env.HUGGINGFACE_API_KEY;
  if (hfKey && hfKey.length > 10) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const prompt = `You are a Senior Managing Director at Goldman Sachs / Kotak IB. Grade this candidate's finance interview answer strictly.
Question: "${question.question}"
Role: ${options.role || 'Investment Banking'}
Expected Key Points: ${question.keyPoints.join('; ')}
Common Mistakes: ${question.commonMistakes.join('; ')}
Candidate Answer: "${trimmed}"

Return ONLY valid JSON in this exact structure:
{
  "score": <0 to 10>,
  "grade": "<EXCELLENT|GOOD|AVERAGE|POOR>",
  "feedback": "<2-3 sentences of direct constructive feedback with Indian finance context>",
  "betterAnswer": "<Model answer in 3-4 sentences>",
  "missedPoints": ["<point1>", "<point2>"],
  "strengths": ["<strength1>", "<strength2>"]
}`;

      const res = await fetch('https://router.huggingface.co/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${hfKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'meta-llama/Llama-3.1-8B-Instruct',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 500,
          temperature: 0.2,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const raw = data.choices?.[0]?.message?.content?.trim() || '';
        const match = raw.match(/\{[\s\S]*\}/);
        if (match) {
          const parsed = JSON.parse(match[0]);
          if (typeof parsed.score === 'number') {
            const score = Math.min(10, Math.max(0, Math.round(parsed.score * 10) / 10));
            return {
              questionId: question.id,
              score,
              grade: score >= 8 ? 'EXCELLENT' : score >= 6 ? 'GOOD' : score >= 4 ? 'AVERAGE' : 'POOR',
              feedback: parsed.feedback || 'Good structured attempt.',
              betterAnswer: parsed.betterAnswer || question.keyPoints.join('. '),
              missedPoints: Array.isArray(parsed.missedPoints) ? parsed.missedPoints : [],
              strengths: Array.isArray(parsed.strengths) ? parsed.strengths : ['Relevant attempt made'],
            };
          }
        }
      }
    } catch {
      // Fall through to native evaluation engine
    }
  }

  // 2. High-Fidelity Native Finance Evaluation Engine
  return runNativeEvaluation(question, trimmed, options);
}

function runNativeEvaluation(
  question: InterviewQuestion,
  answer: string,
  options: EvaluationOptions
): GradedAnswer {
  const ansLower = answer.toLowerCase();
  const words = ansLower.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // A. Check Key Points Coverage
  const coveredPoints: string[] = [];
  const missedPoints: string[] = [];

  for (const point of question.keyPoints) {
    const pointKeywords = point
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3 && !['with', 'from', 'that', 'this', 'have', 'been', 'which'].includes(w));

    let hitCount = 0;
    for (const kw of pointKeywords) {
      if (ansLower.includes(kw)) hitCount++;
    }

    const coverageRatio = pointKeywords.length > 0 ? hitCount / pointKeywords.length : 0;
    if (coverageRatio >= 0.35 || hitCount >= 2) {
      coveredPoints.push(point);
    } else {
      missedPoints.push(point);
    }
  }

  // B. Check Common Mistakes Avoidance
  const detectedMistakes: string[] = [];
  for (const mistake of question.commonMistakes) {
    const mWords = mistake.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
    // If mistake mentions e.g. "forgetting depreciation" and answer doesn't mention depreciation
    if (mWords.some((w) => w.includes('forget') || w.includes('miss') || w.includes('confus'))) {
      const conceptWords = mWords.filter((w) => !['forgetting', 'missing', 'confusing', 'ignoring', 'not'].includes(w));
      if (conceptWords.length > 0 && !conceptWords.some((cw) => ansLower.includes(cw))) {
        detectedMistakes.push(mistake);
      }
    }
  }

  // C. Check Indian Regulatory Nuance
  const indiaHits = INDIA_REGULATORY_KEYWORDS.filter((kw) => ansLower.includes(kw));

  // D. Dimensional Scoring
  // 1. Technical Accuracy (0-10)
  const coverageRatio = question.keyPoints.length > 0
    ? coveredPoints.length / question.keyPoints.length
    : 0.6;
  let technicalScore = Math.min(10, Math.round(coverageRatio * 10 * 10) / 10);

  // 2. Depth & Structure (0-10)
  let depthScore = 4;
  if (wordCount >= 120) depthScore = 9;
  else if (wordCount >= 70) depthScore = 8;
  else if (wordCount >= 40) depthScore = 6.5;
  else if (wordCount >= 20) depthScore = 5;

  // Formatting bonus (bullet points, numbered lists, step-by-step)
  if (answer.includes('1.') || answer.includes('•') || answer.includes('First,') || answer.includes('Firstly,')) {
    depthScore = Math.min(10, depthScore + 1);
  }

  // 3. Indian Market / Regulatory Context (0-10)
  let indiaScore = 5;
  if (indiaHits.length >= 2) indiaScore = 9;
  else if (indiaHits.length === 1) indiaScore = 7.5;
  else if (question.indianContext) indiaScore = 4;

  // Calculate Weighted Overall Score
  let overall = (technicalScore * 0.5) + (depthScore * 0.3) + (indiaScore * 0.2);

  // Penalize for detected mistakes
  if (detectedMistakes.length > 0) {
    overall = Math.max(2, overall - (detectedMistakes.length * 0.8));
  }

  // Clamp to 1 - 9.8
  const score = Math.min(9.8, Math.max(1.5, Math.round(overall * 10) / 10));

  const grade: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'POOR' =
    score >= 8.2 ? 'EXCELLENT' : score >= 6.3 ? 'GOOD' : score >= 4.5 ? 'AVERAGE' : 'POOR';

  // E. Strengths Generation
  const strengths: string[] = [];
  if (coveredPoints.length > 0) {
    strengths.push(`Addressed core concept: ${coveredPoints[0].slice(0, 70)}`);
  }
  if (wordCount >= 50) {
    strengths.push('Demonstrated solid verbal depth and articulate reasoning');
  }
  if (indiaHits.length > 0) {
    strengths.push(`Applied Indian regulatory nuance (${indiaHits.slice(0, 2).join(', ').toUpperCase()})`);
  }
  if (strengths.length === 0) {
    strengths.push('Attempted the question prompt directly under interview conditions');
  }

  // F. Tailored Feedback
  let feedback = '';
  if (grade === 'EXCELLENT') {
    feedback = `Exceptional answer! You demonstrated precise technical mechanics and structured delivery worthy of a front-office ${options.role?.replace(/_/g, ' ') || 'IB'} round.`;
  } else if (grade === 'GOOD') {
    feedback = `Solid response with clear understanding. To upgrade to top-tier, emphasize exact Indian benchmarks (e.g., 10Y G-Sec yield, Ind AS disclosures) and eliminate any missed edge cases.`;
  } else if (grade === 'AVERAGE') {
    feedback = `Understandable baseline attempt, but finance interviewers will probe deeper. Focus on explicit statement mechanics, exact formula drivers, and avoid high-level generalizations.`;
  } else {
    feedback = `Your answer missed foundational technical components. Review the model answer and practice structuring your thoughts using the MECE framework before speaking.`;
  }

  if (detectedMistakes.length > 0) {
    feedback += ` Watch out: ${detectedMistakes[0]}.`;
  }

  const modelAnswer = question.keyPoints.length > 0
    ? question.keyPoints.join('. ') + '.'
    : 'Walk through the concept step-by-step, quantifying each driver with clear financial formulas.';

  return {
    questionId: question.id,
    score,
    grade,
    feedback,
    betterAnswer: modelAnswer,
    missedPoints: missedPoints.slice(0, 3),
    strengths,
  };
}
