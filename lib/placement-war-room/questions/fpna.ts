import type { WarRoomQuestion } from '../types';

const rubric = (dims: Array<{ name: string; weight: number; description: string }>) => dims;

export const FPNA_QUESTIONS: WarRoomQuestion[] = [
  {
    id: 'fpna-001', slug: 'variance-analysis',
    subject: 'FP&A', subtopic: 'Variance Analysis',
    targetRoles: ['FP_AND_A','CORPORATE_FINANCE','COMMERCIAL_BANKING'],
    questionType: 'TECHNICAL', difficulty: 'MEDIUM',
    question: 'What is variance analysis in FP&A? How analyze ₹10cr revenue variance vs budget?',
    hint: 'Revenue variance = volume effect + price effect. Break into controllable/uncontrollable.',
    expectedAnswer: 'Variance analysis compares actual vs budget/forecast to understand performance drivers. Revenue variance = (Actual Vol − Budget Vol) × Budget Price + (Actual Price − Budget Price) × Actual Volume. ₹10cr adverse variance could be lower volume (demand, competition) or lower pricing (discounts, mix shift). FP&A analyzes each driver, identifies root causes, recommends actions.',
    explanation: 'Variance analysis is core FP&A tool for performance management. Separates volume and price effects, identifies controllable vs uncontrollable factors, provides actionable insights. Regular analysis helps course-correct during year.',
    commonMistakes: ['Not separating volume and price','Focusing only on total variance','Not distinguishing controllable vs uncontrollable'],
    followUpQuestions: ['What is flexible budgeting?','Handle favourable variance?','What is rolling forecast?'],
    rubric: rubric([{name:'Technical Accuracy',weight:0.4,description:'Correct variance framework'},{name:'Conceptual Understanding',weight:0.3,description:'Understands FP&A role'},{name:'Clarity',weight:0.3,description:'Clear explanation with example'}]),
    formulas: ['Revenue Variance = (Actual Vol − Budget Vol) × Budget Price + (Actual Price − Budget Price) × Actual Vol'],
    calculationSteps: [], prerequisites: ['Budgeting basics','Income statement'],
    suggestedPrepTimeSeconds: 180, source: 'Verified — FP&A methodology',
    isVerified: true, isAiGenerated: false,
  },
];