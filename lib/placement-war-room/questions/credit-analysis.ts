import type { WarRoomQuestion } from '../types';

const rubric = (dims: Array<{ name: string; weight: number; description: string }>) => dims;

export const CREDIT_ANALYSIS_QUESTIONS: WarRoomQuestion[] = [
  {
    id: 'credit-001', slug: 'gnpa-nnpa-bank',
    subject: 'Credit Analysis', subtopic: 'Bank Credit Quality',
    targetRoles: ['CREDIT_ANALYSIS','COMMERCIAL_BANKING','EQUITY_RESEARCH'],
    questionType: 'TECHNICAL', difficulty: 'MEDIUM',
    question: 'What are GNPA and NNPA? How to analyze credit quality of an Indian bank?',
    hint: 'GNPA = Gross NPA/Total Advances. NNPA = (GNPA−Provisions)/Total Advances. PCR = Provisions/GNPA.',
    expectedAnswer: 'GNPA = Gross NPAs / Total Advances. NNPA = (Gross NPAs − Provisions) / Total Advances. PCR = Provisions / GNPA. Key metrics: GNPA ratio (PSU banks 10-15% historically, private 2-4%), NNPA, PCR, slippage ratio (fresh NPA additions/standard advances), credit cost (annual provisions/average advances), RBI AQR impact.',
    explanation: 'NPAs = loans overdue 90+ days. GNPA = total bad loan book. NNPA = net impact after provisions. PCR = provisioning coverage — higher = better coverage. Slippage = flow of new bad loans. RBI AQR (2015-16) forced transparent NPA recognition.',
    commonMistakes: ['Not distinguishing GNPA from NNPA','Ignoring PCR (most important)','Not mentioning RBI norms'],
    followUpQuestions: ['What is PCA framework?','How does CASA affect profitability?','5 Cs of credit analysis?'],
    rubric: rubric([{name:'Technical Accuracy',weight:0.4,description:'Correct GNPA/NNPA/PCR'},{name:'Conceptual Understanding',weight:0.3,description:'Bank credit quality metrics'},{name:'Clarity',weight:0.3,description:'India context'}]),
    formulas: ['GNPA = Gross NPAs / Total Advances','NNPA = (Gross NPAs − Provisions) / Total Advances','PCR = Provisions / GNPA'],
    calculationSteps: [], prerequisites: ['Banking basics','NPA concept'],
    suggestedPrepTimeSeconds: 180, source: 'Verified — India banking credit question',
    isVerified: true, isAiGenerated: false,
  },
  {
    id: 'credit-002', slug: 'dscr-interest-coverage',
    subject: 'Credit Analysis', subtopic: 'Debt Servicing',
    targetRoles: ['CREDIT_ANALYSIS','COMMERCIAL_BANKING','CORPORATE_FINANCE'],
    questionType: 'NUMERICAL', difficulty: 'MEDIUM',
    question: 'Company has EBIT ₹20cr, interest ₹4cr, principal repayment ₹5cr/year. Tax 25%. Calculate DSCR and Interest Coverage. Can it service debt?',
    hint: 'DSCR = (EBIT−Tax+D&A)/(Interest+Principal). Interest Coverage = EBIT/Interest.',
    expectedAnswer: 'Interest Coverage = EBIT/Interest = 20/4 = 5.0x. EAT = (20−4)×(1−0.25) = 12cr. DSCR = (12+4)/(4+5) = 16/9 ≈ 1.78x. Both above thresholds (IC>3x, DSCR>1.2x), so can service debt, though DSCR has limited headroom.',
    explanation: 'DSCR measures cash available for all debt obligations (interest + principal). Interest Coverage measures interest payment ability. Indian banks: DSCR >1.25x, IC >3x typical minimums. DSCR <1 means cannot cover all debt from operating earnings.',
    commonMistakes: ['Using EBITDA instead of cash flow','Not including principal in DSCR','Forgetting tax impact'],
    followUpQuestions: ['What DSCR triggers covenant breach?','How does seasonality affect DSCR?','Other metrics to check?'],
    rubric: rubric([{name:'Calculation Accuracy',weight:0.5,description:'Correct DSCR and IC'},{name:'Conceptual Understanding',weight:0.3,description:'Understands debt service'},{name:'Clarity',weight:0.2,description:'Clear steps'}]),
    formulas: ['Interest Coverage = EBIT / Interest','DSCR = (PAT + Interest + D&A) / (Interest + Principal)'],
    calculationSteps: ['IC = 20/4 = 5.0x','EAT = (20−4)×0.75 = 12cr','DSCR = (12+4)/(4+5) = 1.78x'],
    prerequisites: ['EBIT','Tax calculation','Debt service'],
    suggestedPrepTimeSeconds: 240, source: 'Verified — credit analysis numerical',
    isVerified: true, isAiGenerated: false,
  },
];