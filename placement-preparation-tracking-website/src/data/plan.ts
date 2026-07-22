// 60-Day Placement Prep Plan for PGDM Finance (Major) + Business Analytics (Minor)
// Goal: 15 LPA+ job | Weak areas: Finance depth, English Communication
// Built by your Mentor 🎯

export type Task = {
  id: string;
  title: string;
  detail: string;
  category: Category;
  minutes: number;
  resource?: string;
};

export type DayPlan = {
  day: number;
  week: number;
  phase: string;
  focus: string;
  tasks: Task[];
};

export type Category =
  | "Finance"
  | "Analytics"
  | "English"
  | "Aptitude"
  | "HR/Resume"
  | "Future Skills"
  | "Mock/Revision";

export const CATEGORY_META: Record<Category, { color: string; bg: string; icon: string; ring: string }> = {
  Finance:       { color: "text-emerald-700", bg: "bg-emerald-100", icon: "💰", ring: "ring-emerald-300" },
  Analytics:     { color: "text-indigo-700",  bg: "bg-indigo-100",  icon: "📊", ring: "ring-indigo-300" },
  English:       { color: "text-rose-700",    bg: "bg-rose-100",    icon: "🗣️", ring: "ring-rose-300" },
  Aptitude:      { color: "text-amber-700",   bg: "bg-amber-100",   icon: "🧮", ring: "ring-amber-300" },
  "HR/Resume":   { color: "text-sky-700",     bg: "bg-sky-100",     icon: "👔", ring: "ring-sky-300" },
  "Future Skills": { color: "text-fuchsia-700", bg: "bg-fuchsia-100", icon: "🤖", ring: "ring-fuchsia-300" },
  "Mock/Revision":{ color: "text-purple-700", bg: "bg-purple-100",  icon: "🎯", ring: "ring-purple-300" },
};

// Helper to build a task
const t = (id: string, title: string, detail: string, category: Category, minutes: number, resource?: string): Task =>
  ({ id, title, detail, category, minutes, resource });

// ============== PHASE 1: FOUNDATION (Day 1-20) ==============
// Build basics in Finance + English daily + Aptitude warmup
// ============== PHASE 2: DEPTH + ANALYTICS (Day 21-40) ==============
// Advanced Finance + Excel/SQL/Power BI + GD practice
// ============== PHASE 3: MOCK + POLISH (Day 41-60) ==============
// Mock interviews, current affairs, resume polish, HR

const financeTopics = [
  ["Time Value of Money", "PV, FV, Annuity, Perpetuity. Solve 10 numericals.", "ZerodhaVarsity Module 1"],
  ["Financial Statements Basics", "Balance Sheet, P&L, Cash Flow — understand each line item.", "YouTube: CA Rachana Ranade"],
  ["Ratio Analysis", "Liquidity, Profitability, Solvency, Efficiency ratios with formulas.", "Investopedia Ratio guide"],
  ["Equity Markets", "Primary vs Secondary, BSE/NSE, indices, market participants.", "Zerodha Varsity Module 1"],
  ["IPO Process", "Book building, ASBA, lock-in, anchor investors, red herring prospectus.", "SEBI website"],
  ["Mutual Funds", "Types, NAV, expense ratio, SIP vs lumpsum, ELSS.", "AMFI India"],
  ["Derivatives - Futures", "Concept, margin, mark-to-market, hedging vs speculation.", "Zerodha Varsity Module 4"],
  ["Derivatives - Options", "Call, Put, ITM/OTM/ATM, Greeks intro, payoff diagrams.", "Zerodha Varsity Module 5"],
  ["Bond Valuation", "YTM, Coupon, Duration, Convexity. Practice 5 problems.", "CFA L1 Fixed Income"],
  ["DCF Valuation", "Free Cash Flow, WACC, Terminal Value — build mini model in Excel.", "Aswath Damodaran YT"],
  ["Relative Valuation", "P/E, EV/EBITDA, P/B — when to use which.", "Damodaran lectures"],
  ["Capital Budgeting", "NPV, IRR, Payback, MIRR. Solve 5 problems.", "ICAI study material"],
  ["Working Capital Mgmt", "Cash conversion cycle, inventory, receivables.", "CFI free course"],
  ["Cost of Capital", "WACC computation, CAPM, beta levering/unlevering.", "Damodaran"],
  ["Mergers & Acquisitions", "Synergy, accretion/dilution, types of M&A, recent India deals.", "Mint M&A section"],
  ["Investment Banking 101", "Front/Middle/Back office, deal lifecycle, pitch books.", "Mergers & Inquisitions blog"],
  ["Equity Research", "Sector analysis, company analysis, target price methodology.", "Motilal Oswal reports"],
  ["Wealth Management & PMS", "AUM, fee structure, AIF vs PMS vs MF, HNI segment.", "SEBI PMS guide"],
  ["Risk Management", "VaR, Beta, Sharpe, Sortino, Treynor ratios.", "CFA L1 Portfolio Mgmt"],
  ["Indian Banking & NBFC", "RBI structure, repo/reverse repo, CRR/SLR, NBFC vs Bank.", "RBI website"],
  ["Fundamental Analysis", "Top-down vs bottom-up, EIC framework, qualitative + quantitative.", "Zerodha Varsity Module 3"],
  ["Technical Analysis", "Candlesticks, support/resistance, RSI, MACD, moving averages.", "Zerodha Varsity Module 2"],
  ["Macroeconomics for Finance", "GDP, Inflation, Repo, Fiscal vs Monetary policy.", "Mint, ET Markets"],
  ["Behavioral Finance", "Biases, herd mentality, loss aversion, anchoring.", "Thinking Fast & Slow summary"],
];

const analyticsTopics = [
  ["Excel - Lookups", "VLOOKUP, HLOOKUP, INDEX-MATCH, XLOOKUP. Practice on dummy dataset.", "ExcelJet"],
  ["Excel - Pivot Tables", "Build pivots, slicers, calculated fields. Make 1 dashboard.", "Leila Gharani YT"],
  ["Excel - Financial Functions", "PMT, IPMT, PPMT, NPV, IRR, XIRR, XNPV.", "Corporate Finance Institute"],
  ["Excel - Data Cleaning", "Text functions, TRIM, Power Query basics.", "ExcelJet"],
  ["SQL - SELECT & WHERE", "Basic queries, filtering, ORDER BY, LIMIT.", "Mode SQL Tutorial"],
  ["SQL - JOINS", "INNER, LEFT, RIGHT, FULL OUTER. Practice on SQLZoo.", "SQLZoo"],
  ["SQL - GROUP BY & Aggregates", "COUNT, SUM, AVG, HAVING vs WHERE.", "HackerRank SQL"],
  ["SQL - Subqueries & CTEs", "Nested queries, WITH clause, window functions intro.", "Mode SQL"],
  ["SQL - Window Functions", "ROW_NUMBER, RANK, LAG, LEAD, partitions.", "LeetCode SQL"],
  ["Power BI Basics", "Import data, build first dashboard with charts + slicers.", "Microsoft Learn"],
  ["Power BI DAX", "CALCULATE, FILTER, SUMX. Build 3 measures.", "SQLBI"],
  ["Tableau Basics", "Connect data, build a sales dashboard.", "Tableau Public"],
  ["Statistics Refresher", "Mean, Median, Mode, SD, Variance, Normal distribution.", "Khan Academy Stats"],
  ["Hypothesis Testing", "Null/Alt hypothesis, p-value, t-test, z-test (concept).", "StatQuest YT"],
  ["Regression Basics", "Linear regression, R², interpretation (no coding needed).", "StatQuest YT"],
  ["Python for Analytics", "Pandas basics — read_csv, filter, groupby. Just intro.", "Kaggle Learn"],
  ["Case Study - Sales", "Analyze a sales dataset end-to-end in Excel.", "Kaggle datasets"],
  ["Case Study - Banking", "Loan default analysis using a Kaggle dataset.", "Kaggle"],
  ["Storytelling with Data", "How to present insights — 1 page summary practice.", "Cole Knaflic blog"],
  ["Build Portfolio Project", "Create 1 GitHub/Drive project: 'Stock Returns Analysis'.", "Self"],
];

const englishTopics = [
  ["Read aloud 1 article", "Read a Mint/ET article aloud for 10 mins. Record yourself.", "LiveMint"],
  ["Learn 10 new words", "Use them in sentences. Maintain a vocab notebook.", "Word of the Day app"],
  ["Self-introduction practice", "Record a 2-min intro. Re-record till smooth. Aim for clarity.", "Mirror + phone"],
  ["Watch English news 15 min", "BBC / CNBC TV18 with subtitles. Note 5 new phrases.", "YouTube"],
  ["Speak on 1 topic for 2 min", "JAM session — pick random topic, speak without stopping.", "Random topic generator"],
  ["Read finance news aloud", "ET Markets headline + 1 article. Summarize in 5 lines verbally.", "ET Markets"],
  ["Group Discussion topic prep", "Read 2 sides of 1 trending topic. Note 5 points each side.", "ET Editorial"],
  ["Email writing practice", "Write 1 formal email (apology / request / follow-up).", "Self"],
  ["Listen to TED Talk", "10-15 min TED. Note structure, transitions, body language.", "TED.com"],
  ["Shadow a podcast", "Repeat after a podcast speaker for 10 min — pronunciation.", "Spotify - Finshots Daily"],
  ["Grammar drill", "20 questions on tenses / articles / prepositions.", "Wren & Martin / app"],
  ["Mock self-intro to mentor", "Send voice note of intro to a friend/mentor for feedback.", "WhatsApp"],
];

const aptitudeTopics = [
  ["Percentages & Profit/Loss", "20 questions. Time yourself — under 60 sec each.", "IndiaBix"],
  ["Time, Speed, Distance", "15 questions. Note shortcuts.", "IndiaBix"],
  ["Ratio & Proportion", "15 questions.", "IndiaBix"],
  ["Time & Work", "15 questions. Learn LCM method.", "IndiaBix"],
  ["Permutation & Combination", "10 questions. Understand vs vs nCr.", "IndiaBix"],
  ["Probability", "10 questions.", "IndiaBix"],
  ["Data Interpretation - Tables", "2 DI sets (10 Qs total). Build speed.", "IndiaBix"],
  ["Data Interpretation - Pie/Bar", "2 DI sets. Aim 8 min per set.", "IndiaBix"],
  ["Logical Reasoning - Seating", "10 questions. Use diagrams.", "IndiaBix"],
  ["Logical Reasoning - Blood Relations", "10 questions.", "IndiaBix"],
  ["Syllogisms", "15 questions. Use Venn diagrams.", "IndiaBix"],
  ["Number Series", "15 questions.", "IndiaBix"],
];

const hrTopics = [
  ["Build Resume v1", "1-page, finance + analytics focused. Use Harvard template.", "OverLeaf Harvard CV"],
  ["Tell me about yourself", "Write + memorize 90-sec answer. Record video.", "Self"],
  ["Why Finance?", "Prepare 60-sec genuine answer with personal story.", "Self"],
  ["Why this company?", "Research top 5 recruiters of your college. Prepare 1 per company.", "LinkedIn + Company site"],
  ["Strengths & Weaknesses", "2 strengths + 1 weakness with improvement story. Practice aloud.", "Self"],
  ["Where do you see yourself in 5 years?", "Career roadmap answer aligned with finance/analytics.", "Self"],
  ["Why should we hire you?", "3-point pitch. Practice in mirror.", "Self"],
  ["Behavioral - STAR method", "Prepare 5 STAR stories (leadership, conflict, failure, success, teamwork).", "Self"],
  ["Update LinkedIn", "Headline, About, Experience, Skills. Add finance keywords.", "LinkedIn"],
  ["Mock HR interview", "30-min mock with friend / mentor. Get feedback.", "Friend"],
  ["Current Affairs - 1 week", "Read last 7 days of business news summary.", "Finshots / Inshorts"],
  ["Salary negotiation basics", "Learn how to discuss CTC, components, bonds.", "Glassdoor blog"],
];

const futureSkillTopics = [
  ["AI for Finance Analysts", "Use ChatGPT/Claude to summarize annual reports, create interview notes, and test your assumptions.", "ChatGPT free tier + annual reports"],
  ["Prompt Engineering for Research", "Write 5 reusable prompts for stock analysis, company research, and interview preparation.", "OpenAI / Claude free"],
  ["Python Finance Automation", "Use pandas/yfinance to download stock data, calculate returns, volatility, and moving averages.", "Google Colab + yfinance"],
  ["Credit Risk Scorecard Basics", "Learn logistic regression intuition, default probability, ROC-AUC, confusion matrix.", "Kaggle loan default datasets"],
  ["Power BI Advanced DAX", "Create measures for YoY growth, YTD, rolling average, and variance vs target.", "Microsoft Learn"],
  ["SQL Window Functions for BFSI", "Practice LAG, LEAD, RANK, ROW_NUMBER for transaction and customer analytics.", "HackerRank SQL"],
  ["AI Resume & LinkedIn Optimization", "Use AI to tailor your resume to one finance/analytics job description without lying.", "LinkedIn + ChatGPT"],
  ["Annual Report AI Assistant", "Plan a mini RAG project: ask questions from one company's annual report PDF.", "Google Colab + free LLM tools"],
  ["ESG & Climate Finance Analytics", "Learn ESG scores, carbon risk, green bonds, and SEBI BRSR basics.", "SEBI BRSR reports"],
  ["Alternative Data in Equity Research", "Explore web traffic, app downloads, Google Trends, and reviews as investment signals.", "Google Trends + app stores"],
  ["GitHub Portfolio Packaging", "Upload 1 project with README, screenshots, dataset source, and business insights.", "GitHub free"],
  ["Finance Storytelling with Dashboards", "Turn raw analysis into a 5-slide investment or credit story recruiters can understand.", "PowerPoint / Canva"],
];

// Build the 60-day plan
function buildPlan(): DayPlan[] {
  const plan: DayPlan[] = [];

  for (let day = 1; day <= 60; day++) {
    const week = Math.ceil(day / 7);
    let phase = "Phase 1: Foundation 🌱";
    let focus = "Build Basics";

    if (day > 20 && day <= 40) {
      phase = "Phase 2: Depth & Analytics 🚀";
      focus = "Advanced Concepts";
    } else if (day > 40) {
      phase = "Phase 3: Mock & Polish 🏆";
      focus = "Interview Ready";
    }

    const tasks: Task[] = [];

    // Daily English (every day — your weak area, top priority)
    const engIdx = (day - 1) % englishTopics.length;
    const [eTitle, eDetail, eRes] = englishTopics[engIdx];
    tasks.push(t(`d${day}-eng`, eTitle, eDetail, "English", 30, eRes));

    // Daily Finance core (every day)
    if (day <= 24) {
      const [fTitle, fDetail, fRes] = financeTopics[day - 1];
      tasks.push(t(`d${day}-fin`, fTitle, fDetail, "Finance", 90, fRes));
    } else if (day <= 48) {
      // Revision + advanced application
      const [fTitle, fDetail, fRes] = financeTopics[(day - 25) % financeTopics.length];
      tasks.push(t(`d${day}-fin`, `Revise + Apply: ${fTitle}`, `Re-read notes + solve 5 real interview Qs on: ${fDetail}`, "Finance", 75, fRes));
    } else {
      tasks.push(t(`d${day}-fin`, `Finance Quick Revision Day`, `Flashcards of 1 module. Speak the concept aloud as if teaching.`, "Finance", 60, "Self notes"));
    }

    // Analytics (alternating days in phase 1, daily in phase 2)
    if (day <= 20 && day % 2 === 0) {
      const aIdx = Math.floor((day - 1) / 2) % analyticsTopics.length;
      const [aTitle, aDetail, aRes] = analyticsTopics[aIdx];
      tasks.push(t(`d${day}-ana`, aTitle, aDetail, "Analytics", 60, aRes));
    } else if (day > 20 && day <= 45) {
      const aIdx = (day - 11) % analyticsTopics.length;
      const [aTitle, aDetail, aRes] = analyticsTopics[aIdx];
      tasks.push(t(`d${day}-ana`, aTitle, aDetail, "Analytics", 75, aRes));
    } else if (day > 45 && day % 3 === 0) {
      tasks.push(t(`d${day}-ana`, "Analytics Tool Revision", "Practice 5 SQL queries + 1 Excel dashboard rebuild.", "Analytics", 45, "HackerRank"));
    }

    // Aptitude (every other day, daily in phase 3)
    if (day <= 40 && day % 2 === 1) {
      const apIdx = Math.floor((day - 1) / 2) % aptitudeTopics.length;
      const [apTitle, apDetail, apRes] = aptitudeTopics[apIdx];
      tasks.push(t(`d${day}-apt`, apTitle, apDetail, "Aptitude", 45, apRes));
    } else if (day > 40) {
      const apIdx = (day - 41) % aptitudeTopics.length;
      const [apTitle, apDetail, apRes] = aptitudeTopics[apIdx];
      tasks.push(t(`d${day}-apt`, `Speed Drill: ${apTitle}`, `${apDetail} | Target: solve in 70% of usual time.`, "Aptitude", 30, apRes));
    }

    // HR / Resume (weekly in phase 1, more in phase 3)
    if (day === 1 || day === 7 || day === 14 || day === 21) {
      const hrIdx = Math.min(day === 1 ? 0 : day === 7 ? 1 : day === 14 ? 8 : 2, hrTopics.length - 1);
      const [hTitle, hDetail, hRes] = hrTopics[hrIdx];
      tasks.push(t(`d${day}-hr`, hTitle, hDetail, "HR/Resume", 60, hRes));
    } else if (day > 28 && day % 3 === 0) {
      const hrIdx = (day - 28) % hrTopics.length;
      const [hTitle, hDetail, hRes] = hrTopics[hrIdx];
      tasks.push(t(`d${day}-hr`, hTitle, hDetail, "HR/Resume", 45, hRes));
    }

    // Future skills: small but high-value differentiator for recruiters
    if (day >= 5 && day % 4 === 1) {
      const fsIdx = Math.floor((day - 5) / 4) % futureSkillTopics.length;
      const [fsTitle, fsDetail, fsRes] = futureSkillTopics[fsIdx];
      tasks.push(t(`d${day}-future`, fsTitle, fsDetail, "Future Skills", 45, fsRes));
    }

    // Mock / GD / Revision (every Sunday — day 7,14,21...)
    if (day % 7 === 0) {
      tasks.push(t(`d${day}-mock`, `Week ${week} Mock Test`, `Take 1 full mock: 20 Apt + 10 Finance MCQ + 1 GD topic discussion. Score yourself.`, "Mock/Revision", 90, "Pariksha.co / IndiaBix"));
      tasks.push(t(`d${day}-rev`, `Week ${week} Revision`, `Make 1 flashcard sheet of everything learned this week.`, "Mock/Revision", 45, "Notion / Paper"));
    }

    // Phase 3 extras
    if (day > 50) {
      tasks.push(t(`d${day}-mock2`, "Mock Interview Round", "30-min interview with peer/mentor: 5 HR + 5 Finance + 1 Case.", "Mock/Revision", 45, "Friend"));
    }

    plan.push({ day, week, phase, focus, tasks });
  }

  return plan;
}

export const PLAN: DayPlan[] = buildPlan();

export const TOTAL_TASKS = PLAN.reduce((s, d) => s + d.tasks.length, 0);
