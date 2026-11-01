import type { WarRoomQuestion, WarRoomDifficulty, WarRoomRole } from '../types';

export * from './accounting';
export * from './corporate-finance';
export * from './valuation';
export * from './credit-analysis';
export * from './financial-modelling';
export * from './behavioral';
export * from './aptitude';
export * from './case-studies';
export * from './fpna';
export * from './resume';

import { ACCOUNTING_QUESTIONS } from './accounting';
import { CORPORATE_FINANCE_QUESTIONS } from './corporate-finance';
import { VALUATION_QUESTIONS } from './valuation';
import { CREDIT_ANALYSIS_QUESTIONS } from './credit-analysis';
import { FINANCIAL_MODELLING_QUESTIONS } from './financial-modelling';
import { BEHAVIORAL_QUESTIONS } from './behavioral';
import { APTITUDE_QUESTIONS } from './aptitude';
import { CASE_STUDIES_QUESTIONS } from './case-studies';
import { FPNA_QUESTIONS } from './fpna';
import { RESUME_QUESTIONS } from './resume';

const ALL_QUESTIONS: WarRoomQuestion[] = [
  ...ACCOUNTING_QUESTIONS,
  ...CORPORATE_FINANCE_QUESTIONS,
  ...VALUATION_QUESTIONS,
  ...CREDIT_ANALYSIS_QUESTIONS,
  ...FINANCIAL_MODELLING_QUESTIONS,
  ...BEHAVIORAL_QUESTIONS,
  ...APTITUDE_QUESTIONS,
  ...CASE_STUDIES_QUESTIONS,
  ...FPNA_QUESTIONS,
  ...RESUME_QUESTIONS,
];

export function getQuestionsForSubject(subject: string, count: number = 10): WarRoomQuestion[] {
  return ALL_QUESTIONS.filter((q) => q.subject === subject).sort(() => Math.random() - 0.5).slice(0, count);
}

export function getQuestionsForRole(role: WarRoomRole, count: number = 10): WarRoomQuestion[] {
  return ALL_QUESTIONS.filter((q) => q.targetRoles.includes(role)).sort(() => Math.random() - 0.5).slice(0, count);
}

export function getQuestionsByDifficulty(difficulty: WarRoomDifficulty, count: number = 10): WarRoomQuestion[] {
  return ALL_QUESTIONS.filter((q) => q.difficulty === difficulty).sort(() => Math.random() - 0.5).slice(0, count);
}

export function getVerifiedQuestionCount(): number {
  return ALL_QUESTIONS.filter((q) => q.isVerified).length;
}

export function getQuestionBySlug(slug: string): WarRoomQuestion | undefined {
  return ALL_QUESTIONS.find((q) => q.slug === slug);
}

export function getSubjects(): string[] {
  return [...new Set(ALL_QUESTIONS.map((q) => q.subject))];
}