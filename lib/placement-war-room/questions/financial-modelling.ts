import type { WarRoomQuestion } from '../types';

const rubric = (dims: Array<{ name: string; weight: number; description: string }>) => dims;

export const FINANCIAL_MODELLING_QUESTIONS: WarRoomQuestion[] = [
  {
    id: 'fm-001', slug: 'three-statement-model',
    subject: 'Financial Modelling & Excel', subtopic: 'Model Structure',
    targetRoles: ['FINANCIAL_MODELLING','INVESTMENT_BANKING','CORPORATE_FINANCE','FP_AND_A'],
    questionType: 'EXCEL', difficulty: 'MEDIUM',
    question: 'Describe three-statement model structure in Excel. How ensure BS balances?',
    hint: 'Separate assumptions/calculations/outputs. Corkscrew schedules. Balance check cell.',
    expectedAnswer: 'Three-statement model: (1) Assumptions sheet (growth, margins, tax, capex, WC%). (2) IS projections. (3) BS projections. (4) CF statement. (5) Supporting schedules: PP&E corkscrew (Beg+Capex−Depr=Ending), Debt schedule (Beg+Drawdowns−Repayments=Ending), Interest calc. BS must balance: Assets = Liabilities + Equity. Include balance check cell = Assets − (Liabilities+Equity) = 0. Use iterative calculation for interest on debt circular references.',
    explanation: 'Statements link through: NI → RE (BS) and top of CFO; Depreciation → add-back in CFO, reduces PP&E (BS); CapEx → reduces cash (CFI), adds to PP&E (BS); Debt changes → affect CFF and interest (IS). Structure: inputs (blue), calculations (black), cross-sheet links (green).',
    commonMistakes: ['Circular refs without iterative calc','No balance check','Mixing assumptions with calculations','Hardcoding values'],
    followUpQuestions: ['Handle circular references in interest?','What is corkscrew schedule?','How audit a financial model?'],
    rubric: rubric([{name:'Technical Accuracy',weight:0.4,description:'Correct structure + linkages'},{name:'Conceptual Understanding',weight:0.3,description:'Understands mechanics'},{name:'Clarity',weight:0.3,description:'Excel best practices'}]),
    formulas: ['PP&E End = Beg + Capex − Depr','Debt End = Beg + Drawdowns − Repayments','Balance Check = Assets − (Liabilities + Equity) = 0'],
    calculationSteps: [], prerequisites: ['Excel basics','Three statements'],
    suggestedPrepTimeSeconds: 240, source: 'Verified — modelling best practices',
    isVerified: true, isAiGenerated: false,
  },
  {
    id: 'fm-002', slug: 'vlookup-vs-index-match',
    subject: 'Financial Modelling & Excel', subtopic: 'Excel Functions',
    targetRoles: ['FINANCIAL_MODELLING','CORPORATE_FINANCE','FP_AND_A'],
    questionType: 'EXCEL', difficulty: 'EASY',
    question: 'Difference between VLOOKUP and INDEX-MATCH? When use XLOOKUP?',
    hint: 'VLOOKUP only left-to-right. INDEX-MATCH any direction. XLOOKUP is modern replacement.',
    expectedAnswer: 'VLOOKUP searches vertically, returns columns to right of lookup, breaks if columns inserted. INDEX-MATCH = INDEX (value at position) + MATCH (find position) — looks any direction, flexible, doesn\'t break on column insert. XLOOKUP (Office 365) replaces both, looks left/right, handles exact/approx match natively, custom not-found message, no column index counting.',
    explanation: 'INDEX-MATCH preferred in financial modelling because models often need lookup where return column is left of lookup column. XLOOKUP simplifies further. Always use exact match (FALSE/0) in VLOOKUP unless approximate needed.',
    commonMistakes: ['VLOOKUP approximate match (TRUE) by mistake','Hardcoding column index','Not handling #N/A errors'],
    followUpQuestions: ['Handle errors in lookups?','Advantage of Excel Tables with structured refs?','When use SUMIFS instead of lookups?'],
    rubric: rubric([{name:'Technical Accuracy',weight:0.4,description:'Correct comparison'},{name:'Conceptual Understanding',weight:0.3,description:'Practical implications'},{name:'Clarity',weight:0.3,description:'Clear explanation'}]),
    formulas: ['=VLOOKUP(lookup,table,col,FALSE)','=INDEX(return_range,MATCH(lookup,lookup_range,0))','=XLOOKUP(lookup,lookup_array,return_array,[if_not_found])'],
    calculationSteps: [], prerequisites: ['Excel functions basics'],
    suggestedPrepTimeSeconds: 90, source: 'Verified — Excel proficiency',
    isVerified: true, isAiGenerated: false,
  },
];