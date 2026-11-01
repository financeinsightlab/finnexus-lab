// lib/placement-war-room/study-plan.ts — Personalized study plan generation
import { placementWarRoomAiJson, buildSystemPrompt, buildStudyPlanPrompt } from './ai-client';
import type { WarRoomStudyPlan, WarRoomStudyTask } from './types';

export async function generateStudyPlan(
  targetRole: string,
  diagnosticResult: {
    overallScore: number;
    strongTopics: string[];
    weakTopics: string[];
    knowledgeGaps: string[];
  },
  learnerProfile: {
    dailyPrepTime?: number;
    interviewDate?: string;
    preferredExplanationStyle?: string;
    improvementTopics?: string[];
  },
  totalDays: number = 30
): Promise<WarRoomStudyPlan> {
  try {
    const result = await placementWarRoomAiJson<{
      totalDays: number;
      dailyTasks: Array<{
        day: number;
        title: string;
        description: string;
        category: string;
        minutes: number;
        topic: string;
        difficulty: string;
      }>;
    }>(
      [
        { role: 'system', content: buildSystemPrompt('coach') },
        { role: 'user', content: buildStudyPlanPrompt(targetRole, diagnosticResult, learnerProfile, totalDays) },
      ],
      { maxTokens: 2000, temperature: 0.3 }
    );

    const tasks: WarRoomStudyTask[] = result.dailyTasks.map((t, i) => ({
      id: `task-${i + 1}`,
      day: t.day,
      title: t.title,
      description: t.description,
      category: t.category,
      minutes: t.minutes,
      completed: false,
      topic: t.topic,
      difficulty: t.difficulty as any,
    }));

    return {
      id: `plan-${Date.now()}`,
      userId: '', // set by caller
      targetRole: targetRole as any,
      interviewDate: learnerProfile.interviewDate ? new Date(learnerProfile.interviewDate) : undefined,
      totalDays: result.totalDays,
      currentDay: 1,
      status: 'ACTIVE',
      dailyTasks: tasks,
    };
  } catch (error) {
    console.error('Study plan generation failed, using fallback:', error);
    return buildFallbackStudyPlan(targetRole, diagnosticResult, totalDays);
  }
}

function buildFallbackStudyPlan(
  targetRole: string,
  diagnosticResult: { overallScore: number; strongTopics: string[]; weakTopics: string[]; knowledgeGaps: string[] },
  totalDays: number
): WarRoomStudyPlan {
  const defaultTopics = ['Three-Statement Modeling', 'DCF Valuation & WACC', 'Ratio Analysis', 'Ind AS Accounting', 'Credit & DSCR Analysis'];
  const topicsPool = diagnosticResult.weakTopics.length > 0 ? diagnosticResult.weakTopics : defaultTopics;
  const tasks: WarRoomStudyTask[] = [];

  for (let day = 1; day <= totalDays; day++) {
    const topicIndex = (day - 1) % topicsPool.length;
    const topic = topicsPool[topicIndex] || 'General Review';
    const difficulty = day <= Math.ceil(totalDays / 3) ? 'EASY' : day <= Math.ceil(2 * totalDays / 3) ? 'MEDIUM' : 'HARD';

    tasks.push({
      id: `task-${day}`,
      day,
      title: `${targetRole} - ${topic} Practice`,
      description: `Practice ${topic} questions and review key concepts. Focus on ${difficulty.toLowerCase()} difficulty problems.`,
      category: 'Finance',
      minutes: 45,
      completed: false,
      topic,
      difficulty,
    });
  }

  return {
    id: `plan-fallback-${Date.now()}`,
    userId: '',
    targetRole: targetRole as any,
    totalDays,
    currentDay: 1,
    status: 'ACTIVE',
    dailyTasks: tasks,
  };
}