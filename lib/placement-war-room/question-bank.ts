// lib/placement-war-room/question-bank.ts — Re-exports from subject-specific banks
export * from './questions/accounting';
export * from './questions/corporate-finance';
export * from './questions/valuation';
export * from './questions/credit-analysis';
export * from './questions/financial-modelling';
export * from './questions/behavioral';
export * from './questions/aptitude';
export * from './questions/case-studies';
export * from './questions/fpna';
export * from './questions/resume';
export { getQuestionsForSubject, getQuestionsForRole, getQuestionsByDifficulty, getVerifiedQuestionCount, getQuestionBySlug, getSubjects } from './questions/index';
export type { WarRoomQuestion, WarRoomQuestionType, WarRoomDifficulty, WarRoomRole } from './types';