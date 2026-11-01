// lib/placement-war-room/types.ts — Core types for Placement Day War Room

export type WarRoomRole =
  | 'INVESTMENT_BANKING'
  | 'EQUITY_RESEARCH'
  | 'PRIVATE_EQUITY'
  | 'CORPORATE_FINANCE'
  | 'FP_AND_A'
  | 'CREDIT_ANALYSIS'
  | 'COMMERCIAL_BANKING'
  | 'RISK_ANALYSIS'
  | 'FINANCIAL_MODELLING'
  | 'MANAGEMENT_CONSULTING'
  | 'BUSINESS_DATA_ANALYTICS'
  | 'OTHER';

export type WarRoomQuestionType =
  | 'CONCEPTUAL'
  | 'TECHNICAL'
  | 'NUMERICAL'
  | 'EXCEL'
  | 'FINANCIAL_STATEMENTS'
  | 'VALUATION'
  | 'CASE_STUDY'
  | 'BEHAVIORAL'
  | 'HR'
  | 'RESUME_BASED'
  | 'FOLLOW_UP'
  | 'TIME_CONSTRAINED';

export type WarRoomDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type WarRoomInterviewType = 'TECHNICAL' | 'BEHAVIORAL' | 'MIXED';

export type WarRoomSessionStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';

export type WarRoomSignalType =
  | 'QUESTION_ATTEMPT'
  | 'ANSWER_EVALUATED'
  | 'FEEDBACK_GIVEN'
  | 'TOPIC_REVISED'
  | 'DIFFICULTY_CHANGED'
  | 'SESSION_COMPLETED';

export interface WarRoomQuestion {
  id: string;
  slug: string;
  subject: string;
  subtopic: string;
  targetRoles: WarRoomRole[];
  questionType: WarRoomQuestionType;
  difficulty: WarRoomDifficulty;
  question: string;
  hint?: string;
  expectedAnswer?: string;
  explanation?: string;
  commonMistakes: string[];
  followUpQuestions: string[];
  rubric: WarRoomRubricDimension[];
  formulas: string[];
  calculationSteps: string[];
  prerequisites: string[];
  suggestedPrepTimeSeconds: number;
  source?: string;
  isVerified: boolean;
  isAiGenerated: boolean;
}

export interface WarRoomRubricDimension {
  name: string;
  weight: number; // 0-1, sums to 1 across dimensions
  description: string;
}

export interface WarRoomAnswerEvaluation {
  questionId: string;
  score: number; // 0-10
  rubricScores: Record<string, number>;
  feedback: string;
  betterAnswer: string;
  missedPoints: string[];
  strengths: string[];
  explanation: string;
  nextAction: string;
  followUpQuestion?: string;
  evaluationType?: 'AI' | 'RULE_BASED';
  grade?: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'POOR';
}

export interface WarRoomCandidateProfile {
  id: string;
  userId: string;
  qualification?: string;
  specialisation?: string;
  academicLevel?: string;
  targetRole?: WarRoomRole;
  targetCompany?: string;
  interviewDate?: Date;
  experience?: string;
  internships?: string[];
  skills?: string[];
  proficiency?: Record<string, 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>;
  preferredDifficulty?: WarRoomDifficulty;
  dailyPrepTime?: number;
  explanationStyle?: 'DETAILED' | 'CONCISE' | 'EXAMPLE_HEAVY' | 'VISUAL';
  preferredLanguage?: string;
  improvementTopics?: string[];
  onboardingComplete: boolean;
  onboardedAt?: Date;
}

export interface WarRoomLearnerProfile {
  userId: string;
  skillEstimates: Record<string, number>; // subject -> 0-1
  strongTopics: string[];
  weakTopics: string[];
  unresolvedMisconceptions: string[];
  recentProgress: string[];
  preferredExplanationStyle: string;
  nextRecommendedTopics: string[];
  targetRole: WarRoomRole | null;
  targetInterviewDate: Date | null;
  updatedAt: Date;
}

export interface WarRoomDiagnosticResult {
  attemptId: string;
  overallScore: number; // 0-100
  subjectScores: Record<string, number>;
  strongTopics: string[];
  weakTopics: string[];
  knowledgeGaps: string[];
  commonErrors: string[];
  recommendedTopics: string[];
}

export interface WarRoomStudyPlan {
  id: string;
  userId: string;
  targetRole: WarRoomRole;
  interviewDate?: Date;
  totalDays: number;
  currentDay: number;
  status: string;
  dailyTasks: WarRoomStudyTask[];
}

export interface WarRoomStudyTask {
  id: string;
  day: number;
  title: string;
  description: string;
  category: string;
  minutes: number;
  completed: boolean;
  topic?: string;
  difficulty?: WarRoomDifficulty;
}

export interface WarRoomSessionReport {
  sessionId: string;
  overallScore: number;
  categoryScores: Record<string, number>;
  strongestAnswers: Array<{ questionId: string; score: number; subject: string }>;
  weakestAnswers: Array<{ questionId: string; score: number; subject: string }>;
  knowledgeGaps: string[];
  technicalErrors: string[];
  communicationFeedback: string;
  modelAnswers: Array<{ questionId: string; question: string; answer: string }>;
  priorityRevision: string[];
  recommendedNextSession: string;
  previousComparison?: {
    previousScore: number | null;
    improvement: number | null;
  };
}

export interface WarRoomEntitlement {
  hasAccess: boolean;
  plan: string;
  passStatus?: 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'REJECTED';
  passExpiresAt?: Date;
  remainingInterviews?: number;
}
