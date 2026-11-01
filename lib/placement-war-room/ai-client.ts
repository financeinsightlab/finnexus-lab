// lib/placement-war-room/ai-client.ts — Reusable AI client for Placement Day War Room
//
// Reuses the existing Hugging Face Inference Providers integration
// (mistralai/Mistral-7B-Instruct-v0.3 via router.huggingface.co) already
// configured in lib/hf-provider.ts and lib/interview-engine.ts. No new
// provider, no new API key, no mock responses.

const HF_API_URL = 'https://router.huggingface.co/v1/chat/completions';
const HF_MODEL = 'mistralai/Mistral-7B-Instruct-v0.3';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletionResponse {
  choices?: Array<{
    message?: { content?: string | null };
  }>;
}

function getApiKey(): string {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) {
    throw new Error('HUGGINGFACE_API_KEY is not configured');
  }
  return apiKey;
}

function extractJsonFromResponse(content: string): unknown {
  const trimmed = content.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const jsonMatch = trimmed.match(/\{[^{]*(?:\{[^{]*\}[^{]*)*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        // fall through
      }
    }
    const codeBlockMatch = trimmed.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    if (codeBlockMatch) {
      try {
        return JSON.parse(codeBlockMatch[1]);
      } catch {
        // fall through
      }
    }
    throw new Error('No valid JSON found in AI response');
  }
}

export async function placementWarRoomAiChat(
  messages: ChatMessage[],
  options: { maxTokens?: number; temperature?: number; signal?: AbortSignal } = {}
): Promise<string> {
  const { maxTokens = 1000, temperature = 0.3, signal } = options;
  const apiKey = getApiKey();

  const response = await fetch(HF_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: HF_MODEL,
      messages,
      max_tokens: maxTokens,
      temperature,
      stream: false,
    }),
    signal: signal ?? AbortSignal.timeout(30000),
  });

  if (!response.ok) {
    throw new Error(`Hugging Face chat completion failed with HTTP ${response.status}`);
  }

  const data = (await response.json()) as ChatCompletionResponse;
  const answer = data.choices?.[0]?.message?.content?.trim();
  if (!answer) {
    throw new Error('Hugging Face returned an empty chat completion');
  }
  return answer;
}

export async function placementWarRoomAiJson<T = unknown>(
  messages: ChatMessage[],
  options: { maxTokens?: number; temperature?: number; signal?: AbortSignal } = {}
): Promise<T> {
  const response = await placementWarRoomAiChat(messages, options);
  return extractJsonFromResponse(response) as T;
}

export function buildSystemPrompt(role: 'interviewer' | 'evaluator' | 'coach' | 'question-generator'): string {
  const base = 'You are an expert finance placement coach and interviewer at KunwarAnalytics. Help students prepare for finance interviews. Be precise, encouraging, and focused on genuine learning. Always distinguish verified facts from general preparation advice. Never invent company financial results, interview processes, or hiring policies.';
  const roleSpecifics: Record<string, string> = {
    interviewer: 'Conduct realistic interview sessions. Ask one question at a time. Adapt difficulty based on candidate responses.',
    evaluator: 'Evaluate answers objectively using the provided rubric. Score each dimension independently. Never present AI scores as a prediction of hiring outcomes.',
    coach: 'Provide personalised study recommendations based on profile, diagnostic results, and learning history. Prioritise weak and high-relevance topics.',
    'question-generator': 'Generate high-quality finance interview questions. For numerical questions, ensure verifiable answers. Include subject, subtopic, difficulty, and target role metadata.',
  };
  return `${base}\n\n${roleSpecifics[role]}`;
}

export function buildEvaluationPrompt(
  question: string,
  subject: string,
  subtopic: string,
  difficulty: string,
  userAnswer: string,
  rubric: Array<{ name: string; weight: number; description: string }>,
  expectedAnswer?: string,
  calculationExpected?: number
): string {
  const rubricText = rubric.map((r) => `- ${r.name} (weight ${(r.weight * 100).toFixed(0)}%): ${r.description}`).join('\n');
  const calcNote = calculationExpected !== undefined ? `\nExpected numerical result: ${calculationExpected}. Verify calculations independently.` : '';
  return `Evaluate this finance interview answer. Question: "${question}" Subject: ${subject} › ${subtopic} Difficulty: ${difficulty}

Expected Answer: ${expectedAnswer ?? 'No reference answer provided.'}

Rubric:
${rubricText}

Candidate's Answer: "${userAnswer}"
${calcNote}

Return ONLY valid JSON: {"score":0-10,"rubricScores":{"<dimension>":0-10},"feedback":"2-3 sentences","betterAnswer":"stronger answer","missedPoints":["point1"],"strengths":["strength1"],"explanation":"concept explanation","nextAction":"one action","followUpQuestion":"follow-up"}

Score based on explicit rubric criteria. Do not present this score as a prediction of hiring outcomes.`;
}

export function buildQuestionGenerationPrompt(
  targetRole: string,
  subject: string,
  subtopic: string,
  difficulty: string,
  questionType: string,
  learnerContext: { weakTopics?: string[]; strongTopics?: string[]; previousMistakes?: string[]; completedTopics?: string[]; interviewDate?: string; dailyPrepTime?: number },
  count: number = 1
): string {
  return `Generate ${count} finance interview question(s) for a ${targetRole} candidate. Subject: ${subject} › ${subtopic} Difficulty: ${difficulty} Type: ${questionType}

Learner Context: Weak: ${learnerContext.weakTopics?.join(', ') ?? 'none'} Strong: ${learnerContext.strongTopics?.join(', ') ?? 'none'} Mistakes: ${learnerContext.previousMistakes?.join(', ') ?? 'none'} Completed: ${learnerContext.completedTopics?.join(', ') ?? 'none'} Interview: ${learnerContext.interviewDate ?? 'not specified'} Prep time: ${learnerContext.dailyPrepTime ?? 'not specified'} min

For NUMERICAL: ensure verifiable answer with expected result and calculation steps. For CASE STUDY: realistic but clearly hypothetical scenario. For BEHAVIORAL/HR: target specific competencies.

Return ONLY valid JSON array per question: {"slug":"unique-slug","subject":"${subject}","subtopic":"${subtopic}","targetRoles":["${targetRole}"],"questionType":"${questionType}","difficulty":"${difficulty}","question":"full question text","hint":"optional hint","expectedAnswer":"model answer","explanation":"detailed reasoning","commonMistakes":["mistake1"],"followUpQuestions":["follow-up 1"],"rubric":[{"name":"Technical Accuracy","weight":0.4,"description":"..."}],"formulas":["formula1"],"calculationSteps":["step1"],"prerequisites":["topic1"],"suggestedPrepTimeSeconds":300,"source":"AI-generated — verify","isAiGenerated":true}

Label hypothetical data clearly. Do not invent real company results or interview processes.`;
}

export function buildStudyPlanPrompt(
  targetRole: string,
  diagnosticResult: { overallScore: number; strongTopics: string[]; weakTopics: string[]; knowledgeGaps: string[] },
  learnerProfile: { dailyPrepTime?: number; interviewDate?: string; preferredExplanationStyle?: string; improvementTopics?: string[] },
  totalDays: number
): string {
  return `Generate a ${totalDays}-day study plan for a ${targetRole} placement candidate.

Diagnostic: Score ${diagnosticResult.overallScore}/100 Strong: ${diagnosticResult.strongTopics.join(', ') ?? 'none'} Weak: ${diagnosticResult.weakTopics.join(', ') ?? 'none'} Gaps: ${diagnosticResult.knowledgeGaps.join(', ') ?? 'none'}

Profile: Prep time ${learnerProfile.dailyPrepTime ?? 60} min/day Interview: ${learnerProfile.interviewDate ?? 'not specified'} Style: ${learnerProfile.preferredExplanationStyle ?? 'detailed'} Improvement: ${learnerProfile.improvementTopics?.join(', ') ?? 'none'}

Requirements: Prioritise weak and high-relevance topics. Manageable daily tasks. Adapt as interview date approaches. Allow task completion tracking. Recommend revisions based on performance. Avoid repeating mastered material. Provide clear next action. Do not promise job placement.

Return ONLY valid JSON: {"totalDays":${totalDays},"dailyTasks":[{"day":1,"title":"Task title","description":"Detailed description","category":"Finance|Analytics|HR/Resume|Aptitude|Mock/Revision","minutes":45,"topic":"Topic name","difficulty":"EASY|MEDIUM|HARD"}]}`;
}