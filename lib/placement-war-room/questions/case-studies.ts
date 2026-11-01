import type { WarRoomQuestion } from '../types';

const rubric = (dims: Array<{ name: string; weight: number; description: string }>) => dims;

export const CASE_STUDIES_QUESTIONS: WarRoomQuestion[] = [
  {
    id: 'case-001', slug: 'indian-it-valuation-case',
    subject: 'Case Studies', subtopic: 'Company Valuation',
    targetRoles: ['EQUITY_RESEARCH','INVESTMENT_BANKING','FINANCIAL_MODELLING'],
    questionType: 'CASE_STUDY', difficulty: 'HARD',
    question: 'Value mid-sized Indian IT services company: ₹5,000cr revenue, 20% EBITDA margin, 15% growth. ₹500cr debt, ₹1,000cr cash. EV/EBITDA 12x. Equity value per share, 100cr shares?',
    hint: 'Step 1: EBITDA. Step 2: EV using multiple. Step 3: Bridge to equity. Step 4: Divide by shares.',
    expectedAnswer: 'EBITDA = 5,000×20% = ₹1,000cr. EV = 1,000×12 = ₹12,000cr. Equity Value = EV + Cash − Debt = 12,000+1,000−500 = ₹12,500cr. Per share = 12,500/100 = ₹125.',
    explanation: 'Combines valuation multiples with EV-to-equity bridge. EV/EBITDA appropriate for profitable mature companies. Bridge adjusts for non-operating items (cash, debt) to shareholder value. Label as hypothetical — actual multiples vary by market conditions.',
    commonMistakes: ['Forgetting to add cash/subtract debt','Using wrong multiple','Not dividing by shares','Using market cap instead of EV'],
    followUpQuestions: ['What if higher growth?','When P/E more appropriate than EV/EBITDA?','What risks not captured?'],
    rubric: rubric([{name:'Calculation Accuracy',weight:0.5,description:'Correct EV, equity, per-share'},{name:'Conceptual Understanding',weight:0.3,description:'Understands EV/equity bridge'},{name:'Clarity',weight:0.2,description:'Clear steps'}]),
    formulas: ['EBITDA = Revenue × Margin','EV = EBITDA × Multiple','Equity Value = EV + Cash − Debt','Per Share = Equity Value / Shares'],
    calculationSteps: ['EBITDA = 5000×0.20 = 1000cr','EV = 1000×12 = 12000cr','Equity Value = 12000+1000−500 = 12500cr','Per share = 12500/100 = ₹125'],
    prerequisites: ['EV vs Equity','Valuation multiples'],
    suggestedPrepTimeSeconds: 300, source: 'Verified — hypothetical case study',
    isVerified: true, isAiGenerated: false,
  },
];