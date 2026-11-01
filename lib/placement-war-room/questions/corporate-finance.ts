import type { WarRoomQuestion } from '../types';

const rubric = (dims: Array<{ name: string; weight: number; description: string }>) => dims;

export const CORPORATE_FINANCE_QUESTIONS: WarRoomQuestion[] = [
  {
    id: 'cf-001', slug: 'wacc-indian-company',
    subject: 'Corporate Finance', subtopic: 'WACC',
    targetRoles: ['INVESTMENT_BANKING','EQUITY_RESEARCH','CORPORATE_FINANCE','FP_AND_A','FINANCIAL_MODELLING'],
    questionType: 'TECHNICAL', difficulty: 'MEDIUM',
    question: 'What is WACC, and how to calculate for an Indian company using 10Y G-Sec as risk-free rate?',
    hint: 'WACC = Ke×(E/V) + Kd×(D/V)×(1−t). Use Indian 10Y G-Sec (~7%) as Rf, India ERP (~5-5.5%).',
    expectedAnswer: 'WACC = Ke×(E/V) + Kd×(D/V)×(1−t). Ke = Rf + β×ERP (+CRP for India). Use 10Y G-Sec (~7%) as Rf, Indian ERP (~5-5.5%), beta from Indian comparables, add CRP if relevant. Kd = pre-tax cost of debt (bond yield or credit spread over G-Sec). Tax = 25% or applicable. Use market value weights.',
    explanation: 'WACC is average rate to finance assets. For India: Rf = 10Y G-Sec (not US Treasuries), ERP reflects Indian market risk (~5-5.5% per Damodaran), add CRP for Indian ops if using global beta, Kd reflects Indian borrowing rates (8-11%), tax rate 25% or 22% (Section 115BAA).',
    commonMistakes: ['Using US Treasury as Rf','Book value instead of market value weights','Forgetting tax shield on debt','Not adding India ERP'],
    followUpQuestions: ['When is WACC inappropriate?','How does leverage affect WACC?','Typical WACC range for Indian companies?'],
    rubric: rubric([{name:'Technical Accuracy',weight:0.4,description:'Correct WACC formula + India inputs'},{name:'Conceptual Understanding',weight:0.3,description:'Understands each component'},{name:'Clarity',weight:0.3,description:'Well-structured'}]),
    formulas: ['WACC = Ke×(E/V) + Kd×(D/V)×(1−t)','Ke = Rf + β×ERP (+CRP)'],
    calculationSteps: [], prerequisites: ['CAPM','Cost of debt','Capital structure'],
    suggestedPrepTimeSeconds: 180, source: 'Verified — corporate finance with India context',
    isVerified: true, isAiGenerated: false,
  },
  {
    id: 'cf-002', slug: 'npv-irr-project',
    subject: 'Corporate Finance', subtopic: 'Capital Budgeting',
    targetRoles: ['CORPORATE_FINANCE','FP_AND_A','CREDIT_ANALYSIS','COMMERCIAL_BANKING'],
    questionType: 'NUMERICAL', difficulty: 'MEDIUM',
    question: 'Project needs ₹50 lakh initial investment, generates ₹15 lakh/year for 5 years. Discount rate 10%. Calculate NPV and IRR. Accept?',
    hint: 'NPV = Σ CF_t/(1+r)^t − Initial. IRR is rate where NPV=0.',
    expectedAnswer: 'NPV = −50 + 15/1.10 + 15/1.10² + 15/1.10³ + 15/1.10⁴ + 15/1.10⁵ = −50 + 13.64+12.40+11.27+10.25+9.32 = ₹6.88 lakh. IRR ≈ 13.5%. NPV>0 and IRR>10%, so accept.',
    explanation: 'NPV measures value added in today\'s rupees. Positive NPV = earns more than cost of capital. IRR = break-even discount rate. Decision: accept if NPV>0 or IRR>hurdle rate. For mutually exclusive projects, use NPV not IRR.',
    commonMistakes: ['Not discounting all CFs','Using IRR for mutually exclusive','Not comparing IRR to hurdle'],
    followUpQuestions: ['Limitations of IRR?','When do NPV and IRR conflict?','Payback period for this project?'],
    rubric: rubric([{name:'Calculation Accuracy',weight:0.5,description:'Correct NPV and IRR'},{name:'Conceptual Understanding',weight:0.3,description:'Explains decision rule'},{name:'Clarity',weight:0.2,description:'Clear steps'}]),
    formulas: ['NPV = Σ CF_t/(1+r)^t − Initial','IRR: NPV = 0'],
    calculationSteps: ['Y1: 15/1.10=13.64','Y2: 15/1.21=12.40','Y3: 15/1.331=11.27','Y4: 15/1.4641=10.25','Y5: 15/1.61051=9.32','Sum=56.88','NPV=56.88−50=6.88 lakh'],
    prerequisites: ['TVM','Discounting'],
    suggestedPrepTimeSeconds: 300, source: 'Verified — numerical problem',
    isVerified: true, isAiGenerated: false,
  },
];