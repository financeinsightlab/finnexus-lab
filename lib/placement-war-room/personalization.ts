// lib/placement-war-room/personalization.ts — Learner profile and personalization logic
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import type { WarRoomLearnerProfile, WarRoomSignalType, WarRoomRole } from './types';

export async function getOrCreateLearnerProfile(userId: string): Promise<WarRoomLearnerProfile> {
  try {
    const profile = await prisma.candidateProfile.findUnique({
      where: { userId },
      include: { user: true },
    });

    if (!profile) {
      return createDefaultProfile(userId);
    }

    const topicPerformances = await prisma.topicPerformance.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });

    const strongTopics = topicPerformances.filter((t) => t.strongest).map((t) => `${t.subject} > ${t.subtopic}`);
    const weakTopics = topicPerformances.filter((t) => t.weakest).map((t) => `${t.subject} > ${t.subtopic}`);
    const needsRevision = topicPerformances.filter((t) => t.needsRevision).map((t) => `${t.subject} > ${t.subtopic}`);

    const skillEstimates: Record<string, number> = {};
    topicPerformances.forEach((t) => {
      skillEstimates[`${t.subject} > ${t.subtopic}`] = t.avgScore / 10;
    });

    return {
      userId,
      skillEstimates,
      strongTopics,
      weakTopics,
      unresolvedMisconceptions: needsRevision,
      recentProgress: [],
      preferredExplanationStyle: profile.explanationStyle ?? 'DETAILED',
      nextRecommendedTopics: weakTopics.slice(0, 5),
      targetRole: (profile.targetRole as WarRoomRole) ?? null,
      targetInterviewDate: profile.interviewDate ?? null,
      updatedAt: profile.updatedAt,
    };
  } catch (error) {
    logger.warn('Failed to load learner profile, using defaults', { userId, error: (error as Error).message });
    return createDefaultProfile(userId);
  }
}

function createDefaultProfile(userId: string): WarRoomLearnerProfile {
  return {
    userId,
    skillEstimates: {},
    strongTopics: [],
    weakTopics: [],
    unresolvedMisconceptions: [],
    recentProgress: [],
    preferredExplanationStyle: 'DETAILED',
    nextRecommendedTopics: [],
    targetRole: null,
    targetInterviewDate: null,
    updatedAt: new Date(),
  };
}

export async function recordLearningSignal(
  userId: string,
  signalType: WarRoomSignalType,
  data: {
    subject?: string;
    subtopic?: string;
    questionId?: string;
    score?: number;
    feedback?: string;
    metadata?: Record<string, unknown>;
  }
): Promise<void> {
  try {
    await prisma.learningSignal.create({
      data: {
        userId,
        signalType,
        subject: data.subject ?? null,
        subtopic: data.subtopic ?? null,
        questionId: data.questionId ?? null,
        score: data.score ?? null,
        feedback: data.feedback ?? null,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      },
    });

    // Update topic performance if this was a question attempt
    if (signalType === 'QUESTION_ATTEMPT' || signalType === 'ANSWER_EVALUATED') {
      if (data.subject && data.subtopic) {
        await upsertTopicPerformance(userId, data.subject, data.subtopic, data.score ?? 0);
      }
    }
  } catch (error) {
    logger.error('Failed to record learning signal', { userId, signalType, error: (error as Error).message });
  }
}

async function upsertTopicPerformance(userId: string, subject: string, subtopic: string, score: number): Promise<void> {
  try {
    const existing = await prisma.topicPerformance.findFirst({
      where: { userId, subject, subtopic },
    });

    if (existing) {
      const attempts = existing.questionsAttempted + 1;
      const correct = existing.correctAnswers + (score >= 7 ? 1 : 0);
      const avgScore = ((existing.avgScore * existing.questionsAttempted) + score) / attempts;

      await prisma.topicPerformance.update({
        where: { id: existing.id },
        data: {
          questionsAttempted: attempts,
          correctAnswers: correct,
          avgScore,
          strongest: avgScore >= 8,
          weakest: avgScore < 4,
          needsRevision: avgScore < 5,
          lastPracticed: new Date(),
          updatedAt: new Date(),
        },
      });
    } else {
      await prisma.topicPerformance.create({
        data: {
          userId,
          subject,
          subtopic,
          questionsAttempted: 1,
          correctAnswers: score >= 7 ? 1 : 0,
          avgScore: score,
          strongest: score >= 8,
          weakest: score < 4,
          needsRevision: score < 5,
          lastPracticed: new Date(),
        },
      });
    }
  } catch (error) {
    logger.warn('Failed to upsert topic performance', { userId, subject, subtopic, error: (error as Error).message });
  }
}

export async function getNextRecommendedTopics(userId: string): Promise<string[]> {
  try {
    const weak = await prisma.topicPerformance.findMany({
      where: { userId, needsRevision: true },
      orderBy: { avgScore: 'asc' },
      take: 5,
    });
    return weak.map((t) => `${t.subject} > ${t.subtopic}`);
  } catch {
    return [];
  }
}

export function buildLearnerContext(profile: WarRoomLearnerProfile): {
  weakTopics: string[];
  strongTopics: string[];
  previousMistakes: string[];
  completedTopics: string[];
  interviewDate?: string;
  dailyPrepTime?: number;
} {
  return {
    weakTopics: profile.weakTopics,
    strongTopics: profile.strongTopics,
    previousMistakes: profile.unresolvedMisconceptions,
    completedTopics: profile.strongTopics,
    interviewDate: profile.targetInterviewDate?.toISOString(),
  };
}