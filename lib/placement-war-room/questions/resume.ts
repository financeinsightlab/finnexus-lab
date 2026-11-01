import type { WarRoomQuestion } from '../types';

const rubric = (dims: Array<{ name: string; weight: number; description: string }>) => dims;

export const RESUME_QUESTIONS: WarRoomQuestion[] = [
  {
    id: 'resume-001', slug: 'resume-walkthrough',
    subject: 'Resume-Based Questions', subtopic: 'Experience Discussion',
    targetRoles: ['INVESTMENT_BANKING','EQUITY_RESEARCH','CORPORATE_FINANCE','CREDIT_ANALYSIS','COMMERCIAL_BANKING','FP_AND_A','FINANCIAL_MODELLING','MANAGEMENT_CONSULTING','BUSINESS_DATA_ANALYTICS'],
    questionType: 'RESUME_BASED', difficulty: 'MEDIUM',
    question: 'Walk me through your resume. Focus on experiences most relevant to this role.',
    hint: 'Highlight finance-relevant projects, internships, skills. Quantify achievements.',
    expectedAnswer: 'Structure: (1) Brief education. (2) Most relevant experience first (internships, projects). (3) Specific achievements with numbers (\"Built DCF model for Indian IT company,\" \"Analyzed 10 banking stocks,\" \"Created Excel dashboard with 50+ data points\"). (4) Skills (Excel, modelling, valuation). (5) Why this role connects.',
    explanation: 'Resume questions test whether you can articulate experience and connect to role. Interviewer verifies resume claims and understands involvement depth. Quantify achievements whenever possible.',
    commonMistakes: ['Reading resume without context','Not quantifying achievements','Including irrelevant experience','Not connecting to target role'],
    followUpQuestions: ['Tell me more about [specific project]','What was your role?','What tools did you use?'],
    rubric: rubric([{name:'Relevance',weight:0.4,description:'Connects experience to target role'},{name:'Specificity',weight:0.3,description:'Specific examples with metrics'},{name:'Communication Quality',weight:0.3,description:'Clear, structured narrative'}]),
    formulas: [], calculationSteps: [], prerequisites: [],
    suggestedPrepTimeSeconds: 120, source: 'Verified — resume-based question',
    isVerified: true, isAiGenerated: false,
  },
];