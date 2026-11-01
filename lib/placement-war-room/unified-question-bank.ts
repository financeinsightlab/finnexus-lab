// lib/placement-war-room/unified-question-bank.ts
// Single source of truth for all finance placement questions across FinNexus.
// Combines:
// 1. QUESTION_BANK from lib/interview-engine.ts (core technical, valuation, and behavioral)
// 2. ALL_MODULES Q&A from lib/placement-prep/materials.ts (207 high-yield placement questions)
// 3. Subject-specific questions from lib/placement-war-room/questions/* (accounting, valuation, etc.)

import {
  type InterviewQuestion,
  type InterviewRole,
  type QuestionType,
  QUESTION_BANK as BASE_INTERVIEW_BANK,
} from '@/lib/interview-engine';
import { ALL_MODULES } from '@/lib/placement-prep/materials';
import {
  ACCOUNTING_QUESTIONS,
  VALUATION_QUESTIONS,
  CORPORATE_FINANCE_QUESTIONS,
  CREDIT_ANALYSIS_QUESTIONS,
  FINANCIAL_MODELLING_QUESTIONS,
  BEHAVIORAL_QUESTIONS,
  APTITUDE_QUESTIONS,
  CASE_STUDIES_QUESTIONS,
  FPNA_QUESTIONS,
  RESUME_QUESTIONS,
} from './question-bank';
import type { WarRoomQuestion } from './types';

// Role mappings based on category and topic
function mapCategoryToRoles(category: string, title: string): InterviewRole[] {
  const t = title.toLowerCase();
  if (category === 'HR/Resume' || category === 'English') {
    return [
      'INVESTMENT_BANKING',
      'EQUITY_RESEARCH',
      'PRIVATE_EQUITY',
      'CORPORATE_FINANCE',
      'BFSI_BANKING',
      'CONSULTING_FINANCE',
      'BIG4_TAS',
    ];
  }
  if (category === 'Aptitude') {
    return [
      'INVESTMENT_BANKING',
      'EQUITY_RESEARCH',
      'CORPORATE_FINANCE',
      'BFSI_BANKING',
      'CONSULTING_FINANCE',
      'BIG4_TAS',
    ];
  }
  if (category === 'Analytics') {
    return ['EQUITY_RESEARCH', 'CORPORATE_FINANCE', 'CONSULTING_FINANCE', 'BIG4_TAS'];
  }
  // Finance Category
  if (t.includes('valuation') || t.includes('dcf') || t.includes('m&a')) {
    return ['INVESTMENT_BANKING', 'EQUITY_RESEARCH', 'PRIVATE_EQUITY', 'BIG4_TAS'];
  }
  if (t.includes('credit') || t.includes('banking') || t.includes('loan')) {
    return ['BFSI_BANKING', 'CORPORATE_FINANCE', 'BIG4_TAS'];
  }
  if (t.includes('equity') || t.includes('portfolio') || t.includes('stock')) {
    return ['EQUITY_RESEARCH', 'INVESTMENT_BANKING', 'PRIVATE_EQUITY'];
  }
  if (t.includes('working capital') || t.includes('ratio') || t.includes('statement')) {
    return ['CORPORATE_FINANCE', 'BFSI_BANKING', 'INVESTMENT_BANKING', 'BIG4_TAS'];
  }
  return [
    'INVESTMENT_BANKING',
    'EQUITY_RESEARCH',
    'CORPORATE_FINANCE',
    'BFSI_BANKING',
    'BIG4_TAS',
  ];
}

function mapCategoryToType(category: string, q: string): QuestionType {
  const qLower = q.toLowerCase();
  if (category === 'HR/Resume' || category === 'English') return 'BEHAVIORAL';
  if (category === 'Aptitude') return 'GUESSTIMATE';
  if (qLower.includes('case') || qLower.includes('how would you approach')) return 'CASE';
  if (qLower.includes('rbi') || qLower.includes('budget') || qLower.includes('market today') || qLower.includes('inflation')) return 'CURRENT_AFFAIRS';
  return 'TECHNICAL';
}

function extractKeyPoints(answer: string): string[] {
  // Split on periods, bullet points, or numbers
  const sentences = answer
    .split(/(?:(?:\d+\))|(?:\n•)|(?:\.\s+))/)
    .map((s) => s.trim().replace(/^[-•*]\s*/, ''))
    .filter((s) => s.length > 15 && s.length < 250);
  return sentences.slice(0, 4);
}

// Convert Materials QAs into InterviewQuestions
function convertMaterialsToQuestions(): InterviewQuestion[] {
  const converted: InterviewQuestion[] = [];
  let count = 0;

  for (const mod of ALL_MODULES) {
    for (const item of mod.items) {
      if (!item.qa || item.qa.length === 0) continue;

      for (let i = 0; i < item.qa.length; i++) {
        count++;
        const qa = item.qa[i];
        const cleanQ = qa.q.replace(/^(?:Q\d+[:.]|\d+[:.)])\s*/i, '').trim();
        const cleanA = qa.a.trim();
        const roles = mapCategoryToRoles(mod.category, mod.title);
        const qType = mapCategoryToType(mod.category, cleanQ);
        const keyPoints = extractKeyPoints(cleanA);

        converted.push({
          id: `mat-${mod.id}-${i + 1}`,
          type: qType,
          difficulty: i >= 3 ? 'HARD' : i >= 1 ? 'MEDIUM' : 'EASY',
          question: cleanQ,
          hint: keyPoints[0] ? `Focus on: ${keyPoints[0].slice(0, 80)}...` : undefined,
          keyPoints: keyPoints.length > 0 ? keyPoints : [cleanA.slice(0, 150)],
          commonMistakes: [
            'Giving vague generic answers without numbers',
            'Missing the India market or regulatory implications',
          ],
          indianContext: cleanA.includes('₹') || cleanA.includes('India') || cleanA.includes('RBI') || cleanA.includes('SEBI')
            ? 'India regulatory and market framework'
            : undefined,
          role: roles,
          tags: [mod.category.toLowerCase(), mod.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')],
        });
      }
    }
  }

  return converted;
}

// Convert WarRoomQuestion into InterviewQuestion
function convertWarRoomQuestion(wq: WarRoomQuestion): InterviewQuestion {
  return {
    id: wq.id,
    type: wq.questionType === 'BEHAVIORAL' || wq.questionType === 'HR'
      ? 'BEHAVIORAL'
      : wq.questionType === 'CASE_STUDY'
      ? 'CASE'
      : 'TECHNICAL',
    difficulty: wq.difficulty === 'HARD' ? 'HARD' : wq.difficulty === 'MEDIUM' ? 'MEDIUM' : 'EASY',
    question: wq.question,
    hint: wq.hint,
    keyPoints: wq.expectedAnswer ? extractKeyPoints(wq.expectedAnswer) : [],
    commonMistakes: wq.commonMistakes || [],
    indianContext: 'Indian corporate and regulatory standards (Ind AS / RBI / SEBI)',
    role: (wq.targetRoles || ['INVESTMENT_BANKING', 'CORPORATE_FINANCE']) as InterviewRole[],
    tags: [wq.subject.toLowerCase(), wq.subtopic.toLowerCase()],
  };
}

const placementQuestionsWarRoom: WarRoomQuestion[] = [
  ...ACCOUNTING_QUESTIONS,
  ...VALUATION_QUESTIONS,
  ...CORPORATE_FINANCE_QUESTIONS,
  ...CREDIT_ANALYSIS_QUESTIONS,
  ...FINANCIAL_MODELLING_QUESTIONS,
  ...BEHAVIORAL_QUESTIONS,
  ...APTITUDE_QUESTIONS,
  ...CASE_STUDIES_QUESTIONS,
  ...FPNA_QUESTIONS,
  ...RESUME_QUESTIONS,
];

const convertedWarRoomQuestions = placementQuestionsWarRoom.map(convertWarRoomQuestion);
const convertedMaterialsQuestions = convertMaterialsToQuestions();

// Master Unified Bank (Deduplicated by Question Text)
const seen = new Set<string>();
const allCandidates = [
  ...BASE_INTERVIEW_BANK,
  ...convertedWarRoomQuestions,
  ...convertedMaterialsQuestions,
];

export const UNIFIED_QUESTION_BANK: InterviewQuestion[] = [];
for (const q of allCandidates) {
  const norm = q.question.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!seen.has(norm) && norm.length > 10) {
    seen.add(norm);
    UNIFIED_QUESTION_BANK.push(q);
  }
}

export function getUnifiedQuestionsForRole(role: InterviewRole, count: number = 30): InterviewQuestion[] {
  return UNIFIED_QUESTION_BANK.filter((q) => q.role.includes(role)).slice(0, count);
}

export function getUnifiedQuestionsByType(type: QuestionType, count: number = 30): InterviewQuestion[] {
  return UNIFIED_QUESTION_BANK.filter((q) => q.type === type).slice(0, count);
}

export function getUnifiedQuestionById(id: string): InterviewQuestion | undefined {
  return UNIFIED_QUESTION_BANK.find((q) => q.id === id);
}

export function searchUnifiedQuestions(term: string): InterviewQuestion[] {
  const t = term.toLowerCase().trim();
  if (!t) return UNIFIED_QUESTION_BANK;
  return UNIFIED_QUESTION_BANK.filter(
    (q) =>
      q.question.toLowerCase().includes(t) ||
      q.tags.some((tag) => tag.includes(t)) ||
      (q.hint && q.hint.toLowerCase().includes(t))
  );
}
