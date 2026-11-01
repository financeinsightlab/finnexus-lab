import type { WarRoomQuestion } from '../types';

const rubric = (dims: Array<{ name: string; weight: number; description: string }>) => dims;

export const APTITUDE_QUESTIONS: WarRoomQuestion[] = [
  {
    id: 'apt-001', slug: 'percentage-profit-loss',
    subject: 'Quantitative Aptitude', subtopic: 'Percentages & Profit/Loss',
    targetRoles: ['BUSINESS_DATA_ANALYTICS','COMMERCIAL_BANKING','CORPORATE_FINANCE','CREDIT_ANALYSIS'],
    questionType: 'NUMERICAL', difficulty: 'EASY',
    question: 'Company buys product for ₹800, sells for ₹1,000. Profit percentage? Total profit on 500 units?',
    hint: 'Profit % = (SP−CP)/CP × 100.',
    expectedAnswer: 'Profit per unit = 1,000−800 = ₹200. Profit % = 200/800×100 = 25%. Total profit = 200×500 = ₹1,00,000 (₹1 lakh).',
    explanation: 'Profit % calculated on cost price, not selling price. Fundamental for banking/analytics interviews. For multiple units, multiply per-unit profit by quantity.',
    commonMistakes: ['Profit % on SP not CP','Confusing profit with margin','Calculation errors on large numbers'],
    followUpQuestions: ['SP if profit margin 20% on cost?','10% discount on SP, new profit %?'],
    rubric: rubric([{name:'Calculation Accuracy',weight:0.6,description:'Correct profit % and total'},{name:'Conceptual Understanding',weight:0.2,description:'Understands profit % basis'},{name:'Clarity',weight:0.2,description:'Clear steps'}]),
    formulas: ['Profit % = (SP−CP)/CP × 100','Total Profit = Profit per unit × Quantity'],
    calculationSteps: ['Profit = 1000−800 = 200','Profit % = 200/800×100 = 25%','Total profit = 200×500 = ₹1,00,000'],
    prerequisites: ['Percentage basics'],
    suggestedPrepTimeSeconds: 120, source: 'Verified — aptitude problem',
    isVerified: true, isAiGenerated: false,
  },
  {
    id: 'apt-002', slug: 'tvm-simple',
    subject: 'Quantitative Aptitude', subtopic: 'Time Value of Money',
    targetRoles: ['INVESTMENT_BANKING','EQUITY_RESEARCH','CORPORATE_FINANCE','FP_AND_A','CREDIT_ANALYSIS','COMMERCIAL_BANKING'],
    questionType: 'NUMERICAL', difficulty: 'EASY',
    question: 'FV of ₹1,00,000 invested 3 years at 8% compound interest? PV of ₹1,00,000 received 5 years from now at 10% discount?',
    hint: 'FV = PV×(1+r)^n. PV = FV/(1+r)^n.',
    expectedAnswer: 'FV = 1,00,000×(1.08)^3 = 1,00,000×1.2597 = ₹1,25,971. PV = 1,00,000/(1.10)^5 = 1,00,000/1.61051 = ₹62,092.',
    explanation: 'TVM is foundation of all finance. Rupee today worth more than tomorrow because it can be invested. FV compounds forward, PV discounts back. Used in DCF, loans, investment decisions.',
    commonMistakes: ['Simple interest not compound','Wrong sign on discount rate','Exponent calculation errors'],
    followUpQuestions: ['Rule of 72? How long to double at 8%?','Annuity vs perpetuity difference?'],
    rubric: rubric([{name:'Calculation Accuracy',weight:0.5,description:'Correct FV and PV'},{name:'Conceptual Understanding',weight:0.3,description:'Understands TVM'},{name:'Clarity',weight:0.2,description:'Clear formula application'}]),
    formulas: ['FV = PV×(1+r)^n','PV = FV/(1+r)^n'],
    calculationSteps: ['FV = 100000×1.08³ = 125971','PV = 100000/1.10⁵ = 62092'],
    prerequisites: ['Percentage and exponent basics'],
    suggestedPrepTimeSeconds: 150, source: 'Verified — TVM numerical',
    isVerified: true, isAiGenerated: false,
  },
];