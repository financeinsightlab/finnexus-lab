import type { WarRoomQuestion } from '../types';

const rubric = (dims: Array<{ name: string; weight: number; description: string }>) => dims;

export const BEHAVIORAL_QUESTIONS: WarRoomQuestion[] = [
  {
    id: 'beh-001', slug: 'tell-me-about-yourself',
    subject: 'Behavioral & HR', subtopic: 'Introduction',
    targetRoles: ['INVESTMENT_BANKING','EQUITY_RESEARCH','CORPORATE_FINANCE','CREDIT_ANALYSIS','COMMERCIAL_BANKING','FP_AND_A','FINANCIAL_MODELLING','MANAGEMENT_CONSULTING','BUSINESS_DATA_ANALYTICS'],
    questionType: 'BEHAVIORAL', difficulty: 'EASY',
    question: 'Tell me about yourself.',
    hint: 'Present-Past-Future structure. Under 2 minutes. Finance-relevant experiences.',
    expectedAnswer: 'Present-Past-Future: (1) Present — who you are now (degree, role, skills). (2) Past — relevant experience (internships, projects, coursework) showing finance interest. (3) Future — why this role and company. Example: \"I\'m a final-year B.Com Finance student. I interned at [company] building DCF models and analyzing banking NPAs. I\'m passionate about equity research and want to start in investment banking because...\"',
    explanation: 'Sets interview tone. Interviewer wants background, communication skills, motivation. Avoid reciting resume — connect experiences to role. Be concise (90-120s), confident, finish connecting to why interviewing.',
    commonMistakes: ['Rambling without structure','Reciting resume verbatim','Not connecting to role','Too personal'],
    followUpQuestions: ['Why finance?','Why this company?','Strengths and weaknesses?'],
    rubric: rubric([{name:'Structure and Clarity',weight:0.4,description:'Present-Past-Future'},{name:'Relevance to Role',weight:0.3,description:'Connects experience to finance'},{name:'Communication Quality',weight:0.3,description:'Concise, confident, engaging'}]),
    formulas: [], calculationSteps: [], prerequisites: [],
    suggestedPrepTimeSeconds: 60, source: 'Verified — behavioral question',
    isVerified: true, isAiGenerated: false,
  },
  {
    id: 'beh-002', slug: 'why-finance',
    subject: 'Behavioral & HR', subtopic: 'Motivation',
    targetRoles: ['INVESTMENT_BANKING','EQUITY_RESEARCH','CORPORATE_FINANCE','CREDIT_ANALYSIS','COMMERCIAL_BANKING','FP_AND_A','FINANCIAL_MODELLING','MANAGEMENT_CONSULTING','BUSINESS_DATA_ANALYTICS'],
    questionType: 'BEHAVIORAL', difficulty: 'EASY',
    question: 'Why do you want to pursue a career in finance?',
    hint: 'Be specific about what attracts you to finance. Connect to experiences. Avoid \"I like money.\"',
    expectedAnswer: 'Combine personal motivation with specific finance interests. Example: \"I\'m drawn to finance because it sits at intersection of business strategy and quantitative analysis. During internship at [company], I built valuation models helping investment committee decisions. I enjoy analysing financial statements to understand a company\'s story and making data-driven recommendations. I want [target role] because it combines analytical rigour with business impact.\"',
    explanation: 'Interviewers want genuine interest and role understanding. Generic answers suggest not serious about career. Connect to specific experiences, skills, aspects of finance that excite you.',
    commonMistakes: ['Generic (\"I like money/numbers\")','Not connecting to experience','Not mentioning specific role','Sounds rehearsed'],
    followUpQuestions: ['Why this specific role?','What finance topics interest you?','Where in 5 years?'],
    rubric: rubric([{name:'Authenticity',weight:0.4,description:'Genuine, specific motivation'},{name:'Relevance to Role',weight:0.3,description:'Connects to target role'},{name:'Communication Quality',weight:0.3,description:'Clear, compelling narrative'}]),
    formulas: [], calculationSteps: [], prerequisites: [],
    suggestedPrepTimeSeconds: 60, source: 'Verified — behavioral question',
    isVerified: true, isAiGenerated: false,
  },
];