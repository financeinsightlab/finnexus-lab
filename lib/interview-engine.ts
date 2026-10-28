// lib/interview-engine.ts
// India Finance Interview War Room — question bank, AI grading, and session logic.

export type InterviewRole =
  | 'INVESTMENT_BANKING'
  | 'EQUITY_RESEARCH'
  | 'PRIVATE_EQUITY'
  | 'CORPORATE_FINANCE'
  | 'BFSI_BANKING'
  | 'CONSULTING_FINANCE'
  | 'BIG4_TAS';

export type QuestionType = 'TECHNICAL' | 'BEHAVIORAL' | 'GUESSTIMATE' | 'CURRENT_AFFAIRS' | 'CASE';

export interface InterviewQuestion {
  id: string;
  type: QuestionType;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'KILLER';
  question: string;
  hint?: string;
  keyPoints: string[];           // What a good answer covers
  commonMistakes: string[];      // What weak answers miss
  indianContext?: string;        // India-specific angle (RBI, SEBI, Ind AS, etc.)
  role: InterviewRole[];         // Which roles ask this
  tags: string[];
}

export interface InterviewAnswer {
  questionId: string;
  userAnswer: string;
  timeSpentSeconds: number;
}

export interface GradedAnswer {
  questionId: string;
  score: number;          // 0–10
  grade: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'POOR';
  feedback: string;
  betterAnswer: string;
  missedPoints: string[];
  strengths: string[];
}

export interface InterviewSession {
  id: string;
  role: InterviewRole;
  questions: InterviewQuestion[];
  answers: InterviewAnswer[];
  gradedAnswers: GradedAnswer[];
  overallScore: number | null;
  startedAt: string;
  completedAt: string | null;
}

// ─── India-Specific Question Bank ─────────────────────────────────────────────

export const QUESTION_BANK: InterviewQuestion[] = [
  // ── TECHNICAL: DCF / VALUATION ──
  {
    id: 'dcf-001',
    type: 'TECHNICAL',
    difficulty: 'MEDIUM',
    question: 'Walk me through a DCF model. How would you calculate WACC for an Indian company?',
    hint: 'Remember to use Indian 10-year G-Sec yield as risk-free rate, not US Treasuries.',
    keyPoints: [
      'Project free cash flows for 5 years',
      'Calculate terminal value (Gordon Growth Model or Exit Multiple)',
      'Discount back at WACC',
      'WACC = Ke × (E/V) + Kd × (D/V) × (1-T)',
      'Risk-free rate: Indian 10Y G-Sec (~7%)',
      'ERP for India: ~5-5.5% (Damodaran)',
      'Beta: comparable Indian listed companies',
      'Add country risk premium for Indian context',
    ],
    commonMistakes: [
      'Using US Treasury yield as risk-free rate',
      'Not adding country risk premium',
      'Ignoring terminal value sensitivity',
      'Using book value instead of market value weights for WACC',
    ],
    indianContext: 'Indian WACC typically 12-15% vs 8-10% for US companies due to higher country risk premium and inflation expectations.',
    role: ['INVESTMENT_BANKING', 'EQUITY_RESEARCH', 'PRIVATE_EQUITY'],
    tags: ['DCF', 'WACC', 'Valuation', 'Core Finance'],
  },
  {
    id: 'dcf-002',
    type: 'TECHNICAL',
    difficulty: 'HARD',
    question: 'When would you NOT use a DCF model to value a company? Give examples of Indian companies.',
    hint: 'Think about early-stage companies, financial companies, and cyclical businesses.',
    keyPoints: [
      'Early-stage / pre-revenue startups (no historical cash flows)',
      'Financial companies (banks, NBFCs) — use P/BV or Gordon Growth Model instead',
      'Highly cyclical businesses (steel, cement, mining)',
      'Companies in financial distress',
      'Real estate — use NAV method instead',
      'For Indian NBFCs: use P/BV + ROE-based valuation',
    ],
    commonMistakes: [
      'Not knowing alternative valuation methods',
      'Not citing specific Indian examples',
      'Over-relying on DCF for banks',
    ],
    indianContext: 'HDFC Bank is valued on P/BV, not DCF. Cyclical companies like Tata Steel use EV/EBITDA through-cycle analysis.',
    role: ['INVESTMENT_BANKING', 'EQUITY_RESEARCH', 'PRIVATE_EQUITY', 'BIG4_TAS'],
    tags: ['Valuation', 'Methodology', 'Banks', 'India-specific'],
  },
  {
    id: 'acc-001',
    type: 'TECHNICAL',
    difficulty: 'MEDIUM',
    question: 'What is the difference between Ind AS and Indian GAAP (old IGAAP)? Name 3 key differences.',
    hint: 'Focus on revenue recognition, financial instruments, and lease accounting.',
    keyPoints: [
      'Ind AS 115 vs old AS 9: Revenue recognition — performance obligations vs earnings process',
      'Ind AS 109 (IFRS 9): Financial instruments at fair value; IGAAP used cost basis',
      'Ind AS 116: All leases on balance sheet (right-of-use asset + lease liability); IGAAP distinguished operating vs finance',
      'Ind AS 36: Impairment testing required; IGAAP was more lenient',
      'Mandatory for all listed companies + large unlisted since 2016',
    ],
    commonMistakes: [
      'Confusing Ind AS with US GAAP',
      'Not knowing specific standard numbers',
      'Not linking to practical impact on financial ratios',
    ],
    indianContext: 'SEBI mandated Ind AS adoption for listed companies from FY2017. Key for Indian bank audits and Big4/TAS interviews.',
    role: ['BIG4_TAS', 'CORPORATE_FINANCE', 'INVESTMENT_BANKING'],
    tags: ['Accounting', 'Ind AS', 'IFRS', 'India-specific'],
  },
  {
    id: 'sebi-001',
    type: 'TECHNICAL',
    difficulty: 'HARD',
    question: 'What is SEBI LODR? How does it affect listed Indian companies?',
    hint: 'LODR = Listing Obligations and Disclosure Requirements. Think about corporate governance.',
    keyPoints: [
      'SEBI (LODR) Regulations 2015 — replaces old listing agreement',
      'Board composition: 50% independent directors for listed cos',
      'Quarterly financial results within 45 days, annual within 60 days',
      'Related party transaction disclosures (RPT)',
      'Insider trading regulations under SEBI PIT 2015',
      'Mandatory CSR (Companies Act) vs SEBI ESG disclosures (BRSR)',
      'Recent: SEBI T+0 settlement, enhanced DRHP disclosures',
    ],
    commonMistakes: [
      'Confusing LODR with Companies Act provisions',
      'Not knowing specific timelines',
      'Missing recent SEBI amendments',
    ],
    indianContext: 'SEBI is India\'s market regulator. Recent Hindenburg-Adani case highlighted related party transaction scrutiny under LODR.',
    role: ['INVESTMENT_BANKING', 'EQUITY_RESEARCH', 'BIG4_TAS'],
    tags: ['SEBI', 'Regulation', 'Corporate Governance', 'India-specific'],
  },
  {
    id: 'ibc-001',
    type: 'TECHNICAL',
    difficulty: 'HARD',
    question: 'Explain the IBC (Insolvency and Bankruptcy Code) process in India. What happens to a company under CIRP?',
    hint: 'CIRP = Corporate Insolvency Resolution Process. Know the timeline.',
    keyPoints: [
      'IBC 2016 replaced SICA, BIFR, DRT for corporate insolvency',
      'Financial creditor or operational creditor can file application',
      'NCLT admits application → IRP appointed → moratorium begins',
      'CIRP: 180 days + 90 day extension (maximum 330 days)',
      'CoC (Committee of Creditors) formed — financial creditors only',
      'Resolution Plan submitted → 66% CoC vote needed → NCLT approval',
      'If no plan: Liquidation',
      'Famous cases: Essar Steel (Arcelor Mittal), Videocon, Reliance Capital',
    ],
    commonMistakes: [
      'Not knowing the 330-day timeline',
      'Confusing financial vs operational creditors',
      'Not mentioning the moratorium period',
    ],
    indianContext: 'India has resolved over ₹3 lakh crore of NPAs through IBC. Essar Steel case set precedent for secured creditor priority.',
    role: ['INVESTMENT_BANKING', 'BIG4_TAS', 'PRIVATE_EQUITY'],
    tags: ['IBC', 'Insolvency', 'NCLT', 'India-specific', 'Restructuring'],
  },
  {
    id: 'rbi-001',
    type: 'CURRENT_AFFAIRS',
    difficulty: 'MEDIUM',
    question: 'What is RBI\'s current monetary policy stance? How does the repo rate affect Indian banks?',
    hint: 'Know the current repo rate and recent MPC decisions.',
    keyPoints: [
      'RBI Monetary Policy Committee (MPC): 6 members, meets every 2 months',
      'Repo rate: Rate at which banks borrow from RBI',
      'CRR (Cash Reserve Ratio) and SLR (Statutory Liquidity Ratio)',
      'Higher repo rate → higher bank lending rates → slower credit growth',
      'MCLR (Marginal Cost of Fund-based Lending Rate) linked to repo',
      'External Benchmark Lending Rate (EBLR): Repo-linked for retail loans',
      'Impact on NIM (Net Interest Margin) for banks',
    ],
    commonMistakes: [
      'Not knowing current rate levels',
      'Confusing repo with reverse repo',
      'Not linking to bank profitability impact',
    ],
    indianContext: 'As of 2026, India maintains a growth-supportive stance post-pandemic normalization. SBI and HDFC Bank NIMs closely watched.',
    role: ['BFSI_BANKING', 'EQUITY_RESEARCH', 'CORPORATE_FINANCE'],
    tags: ['RBI', 'Monetary Policy', 'Banking', 'India-specific'],
  },
  {
    id: 'lbo-001',
    type: 'TECHNICAL',
    difficulty: 'HARD',
    question: 'Walk me through an LBO model. Can you do LBOs in India? What are the challenges?',
    hint: 'PE in India is growing, but LBOs face specific challenges.',
    keyPoints: [
      'LBO: Acquire company with significant debt, use target\'s cash flows to repay',
      'Key metrics: IRR, MOIC (Multiple on Invested Capital)',
      'Entry multiple, exit multiple, leverage ratio, interest coverage',
      'India LBO challenges: fewer promoter-owned businesses open to full acquisition',
      'Promoter family control limits hostile takeovers',
      'SEBI takeover code (25% trigger for open offer)',
      'Recent India LBOs: KKR-IndiGrid, Blackstone-Embassy REIT deals',
      'Growing PE landscape: Bain, Blackstone, KKR active in India',
    ],
    commonMistakes: [
      'Not knowing India-specific takeover regulations',
      'Applying US LBO framework without India context',
      'Missing SEBI open offer trigger threshold',
    ],
    indianContext: 'India PE deals growing but true LBOs rare. More common: growth equity, minority stakes. Control deals happen in distressed assets via IBC.',
    role: ['INVESTMENT_BANKING', 'PRIVATE_EQUITY'],
    tags: ['LBO', 'Private Equity', 'Takeover', 'India-specific'],
  },
  {
    id: 'guess-001',
    type: 'GUESSTIMATE',
    difficulty: 'MEDIUM',
    question: 'Estimate the market size of quick commerce in India. What is the TAM?',
    hint: 'Think bottom-up: monthly orders × average order value × addressable households.',
    keyPoints: [
      'Define: Quick commerce = delivery in 10-30 minutes (Blinkit, Zepto, Swiggy Instamart)',
      'Top-down: Indian grocery market ~₹60-70L Cr; organized = 10%; quick commerce = 2-3% of organized',
      'Bottom-up: ~60M urban households; 20% use quick commerce → 12M users',
      '2-3 orders/month × ₹500 AOV = ₹12,000-18,000 Cr GMV annually',
      'Show sensitivity: if 30% adoption → 2-3x larger',
      'Mention: Blinkit reported ₹12K Cr+ annualized GMV in 2024',
    ],
    commonMistakes: [
      'No structure (bottom-up vs top-down)',
      'No sanity check at the end',
      'Forgetting to define scope',
    ],
    indianContext: 'Blinkit, Zepto, Swiggy Instamart are key players. This is a live case — know actual company metrics.',
    role: ['CONSULTING_FINANCE', 'INVESTMENT_BANKING', 'EQUITY_RESEARCH'],
    tags: ['Guesstimate', 'Quick Commerce', 'Market Sizing', 'India-specific'],
  },
  {
    id: 'behav-001',
    type: 'BEHAVIORAL',
    difficulty: 'MEDIUM',
    question: 'Why finance after 3 years in IT/Engineering? How does your tech background add value?',
    hint: 'This is a storytelling question. Bridge your tech experience to finance value-add.',
    keyPoints: [
      'Acknowledge the transition honestly — don\'t be defensive',
      'Highlight transferable skills: data analysis, structured thinking, automation',
      'Give specific examples: built financial models using Python, automated reporting',
      'Show genuine finance interest: CFA/MBA taken, finance reading habit',
      'Connect tech to finance role: tech-enabled investment research, fintech analysis, FP&A automation',
      'Avoid saying "finance pays more"',
    ],
    commonMistakes: [
      'Generic answer without specific examples',
      'Being defensive about the career switch',
      'Saying money/salary motivated the switch',
    ],
    indianContext: 'Most Indian IIM students have IT/engineering backgrounds. Interviewers expect a well-rehearsed, genuine story. Know how your specific tech domain maps to target role.',
    role: ['INVESTMENT_BANKING', 'EQUITY_RESEARCH', 'PRIVATE_EQUITY', 'BFSI_BANKING', 'CONSULTING_FINANCE', 'BIG4_TAS', 'CORPORATE_FINANCE'],
    tags: ['Behavioral', 'Career Switch', 'IT-to-Finance', 'India-specific'],
  },
  {
    id: 'ma-001',
    type: 'TECHNICAL',
    difficulty: 'HARD',
    question: 'Walk me through a merger model. What synergies would you look for in a Tata-Mistry style corporate restructuring?',
    hint: 'Combine accretion/dilution analysis with Indian holding company discount concept.',
    keyPoints: [
      'Merger model: Combine income statements, adjust for synergies, test EPS accretion/dilution',
      'Purchase price allocation (PPA) under Ind AS 103',
      'Cost synergies: procurement, headcount, shared services',
      'Revenue synergies: cross-selling, market access',
      'Indian conglomerate discount: holding companies trade at 20-40% discount to sum-of-parts',
      'Tata Sons: listed subsidiaries TCS, Titan, Indian Hotels, Tata Steel',
      'Sum-of-Parts (SoTP) valuation for conglomerates',
    ],
    commonMistakes: [
      'Ignoring goodwill impairment risk',
      'Underestimating integration costs',
      'Not knowing Indian conglomerate structure',
    ],
    indianContext: 'Indian conglomerates (Tata, Reliance, Adani, Mahindra) often have complex holding structures. SoTP analysis is standard for these.',
    role: ['INVESTMENT_BANKING', 'BIG4_TAS'],
    tags: ['M&A', 'Merger Model', 'Synergies', 'India-specific', 'Conglomerate'],
  },
  {
    id: 'credit-001',
    type: 'TECHNICAL',
    difficulty: 'MEDIUM',
    question: 'What is GNPA and NNPA? How do you analyze credit quality of an Indian bank?',
    hint: 'GNPA = Gross NPA, NNPA = Net NPA. Key ratios for bank analysis.',
    keyPoints: [
      'NPA: Non-Performing Asset — loan overdue for more than 90 days',
      'GNPA Ratio = Gross NPAs / Total Advances',
      'NNPA = GNPA minus Provisions',
      'PCR (Provision Coverage Ratio) = Provisions / GNPA',
      'Credit Cost: Annual provisions / average advances',
      'GNPA for PSU banks historically 10-15%; private banks 2-4%',
      'RBI Asset Quality Review (AQR) 2015-16 forced NPA recognition',
      'Slippage ratio: fresh NPA additions / previous period standard advances',
    ],
    commonMistakes: [
      'Not distinguishing GNPA from NNPA',
      'Ignoring PCR (most important for bank quality)',
      'Not mentioning RBI NPA classification norms',
    ],
    indianContext: 'PSU bank NPAs peaked at ~12% in 2018 post-AQR. Private banks maintained lower NPAs. Microfinance sector had MFI NPA crisis in 2010 (AP crisis).',
    role: ['BFSI_BANKING', 'EQUITY_RESEARCH'],
    tags: ['Banking', 'NPA', 'Credit Analysis', 'India-specific', 'BFSI'],
  },
];

export const ROLE_LABELS: Record<InterviewRole, string> = {
  INVESTMENT_BANKING: 'Investment Banking',
  EQUITY_RESEARCH: 'Equity Research',
  PRIVATE_EQUITY: 'Private Equity',
  CORPORATE_FINANCE: 'Corporate Finance / FP&A',
  BFSI_BANKING: 'BFSI / Banking',
  CONSULTING_FINANCE: 'Finance Consulting / MBB',
  BIG4_TAS: 'Big 4 / TAS / Advisory',
};

export const ROLE_COMPANIES: Record<InterviewRole, string[]> = {
  INVESTMENT_BANKING: ['Goldman Sachs India', 'J.P. Morgan India', 'Avendus Capital', 'Kotak Investment Banking', 'ICICI Securities', 'JM Financial'],
  EQUITY_RESEARCH: ['Motilal Oswal', 'Jefferies India', 'Macquarie India', 'CLSA India', 'Ambit Capital'],
  PRIVATE_EQUITY: ['KKR India', 'Blackstone India', 'Warburg Pincus', 'General Atlantic', 'Bain Capital India'],
  CORPORATE_FINANCE: ['Tata Group CFO Office', 'Reliance FP&A', 'HUL Finance', 'Zomato / Swiggy Finance'],
  BFSI_BANKING: ['HDFC Bank', 'ICICI Bank', 'Kotak Mahindra Bank', 'Axis Bank', 'SBI', 'RBL Bank'],
  CONSULTING_FINANCE: ['McKinsey India', 'BCG India', 'Bain & Company India', 'Kearney', 'EY-Parthenon'],
  BIG4_TAS: ['Deloitte TAS India', 'EY TAS India', 'KPMG Deal Advisory', 'PwC Deals India'],
};

// ─── Get questions for a role ──────────────────────────────────────────────────

export function getQuestionsForRole(
  role: InterviewRole,
  count = 5,
  types?: QuestionType[],
): InterviewQuestion[] {
  let filtered = QUESTION_BANK.filter((q) => q.role.includes(role));
  if (types && types.length > 0) {
    filtered = filtered.filter((q) => types.includes(q.type));
  }
  // Shuffle and return
  return filtered.sort(() => Math.random() - 0.5).slice(0, count);
}

// ─── AI Grader ────────────────────────────────────────────────────────────────

export async function gradeAnswer(
  question: InterviewQuestion,
  answer: InterviewAnswer,
): Promise<GradedAnswer> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;

  const prompt = buildGradingPrompt(question, answer.userAnswer);

  if (!apiKey || answer.userAnswer.trim().length < 10) {
    return buildFallbackGrade(question, answer);
  }

  try {
    const res = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        messages: [
          { role: 'system', content: 'You are a senior investment banking interviewer at a top Indian IB. Grade answers objectively. Output ONLY valid JSON.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 600,
        temperature: 0.2,
        stream: false,
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) return buildFallbackGrade(question, answer);

    const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content?.trim() ?? '';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return buildFallbackGrade(question, answer);

    const parsed = JSON.parse(jsonMatch[0]) as Partial<GradedAnswer>;
    const score = Math.min(10, Math.max(0, parsed.score ?? 5));
    return {
      questionId: question.id,
      score,
      grade: score >= 8 ? 'EXCELLENT' : score >= 6 ? 'GOOD' : score >= 4 ? 'AVERAGE' : 'POOR',
      feedback: parsed.feedback ?? 'Review the key points and try again.',
      betterAnswer: parsed.betterAnswer ?? question.keyPoints.join('. '),
      missedPoints: parsed.missedPoints ?? [],
      strengths: parsed.strengths ?? [],
    };
  } catch {
    return buildFallbackGrade(question, answer);
  }
}

function buildGradingPrompt(question: InterviewQuestion, answer: string): string {
  return `Grade this finance interview answer. Return ONLY JSON.

Question: "${question.question}"
Difficulty: ${question.difficulty}
Context: ${question.indianContext ?? 'Indian finance interview'}

Key Points Expected:
${question.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}

Common Mistakes to Watch:
${question.commonMistakes.join(', ')}

Candidate's Answer: "${answer}"

Grade using this JSON:
{
  "score": 0-10,
  "feedback": "2-3 sentence constructive feedback",
  "betterAnswer": "Ideal answer in 3-4 sentences covering all key points",
  "missedPoints": ["point1", "point2"],
  "strengths": ["strength1", "strength2"]
}`;
}

function buildFallbackGrade(question: InterviewQuestion, answer: InterviewAnswer): GradedAnswer {
  // Simple keyword-based scoring
  const answerLower = answer.userAnswer.toLowerCase();
  let hits = 0;
  for (const point of question.keyPoints) {
    const keywords = point.toLowerCase().split(' ').filter(w => w.length > 4);
    if (keywords.some(kw => answerLower.includes(kw))) hits++;
  }
  const score = Math.min(10, Math.round((hits / question.keyPoints.length) * 10));

  return {
    questionId: question.id,
    score,
    grade: score >= 8 ? 'EXCELLENT' : score >= 6 ? 'GOOD' : score >= 4 ? 'AVERAGE' : 'POOR',
    feedback: score >= 7
      ? 'Good coverage of the key points. Consider adding India-specific context to strengthen the answer.'
      : 'Your answer missed some important concepts. Review the key points below and practice again.',
    betterAnswer: question.keyPoints.slice(0, 4).join('. ') + '.',
    missedPoints: question.keyPoints.slice(hits > 0 ? hits : 0, hits + 3),
    strengths: score >= 5 ? ['Attempted the core concept', 'Some relevant points covered'] : [],
  };
}
