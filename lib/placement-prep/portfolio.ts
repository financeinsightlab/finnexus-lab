export type PortfolioProject = {
  title: string;
  goal: string;
  tools: string[];
  deliverables: string[];
  recruiterValue: string;
  buildSteps: string[];
};

export const WEBSITE_AUDIT = {
  url: "kunwaranalytics.in",
  observedTitle: "FinNexus Lab — Financial Intelligence Platform",
  summary:
    "The site currently reads like a corporate financial intelligence platform instead of a student portfolio. It uses premium enterprise language, but it does not yet prove who you are, what projects you built, what skills you can use, or how a recruiter should contact you.",
  strengths: [
    "The finance + analytics positioning is relevant to your PGDM specialization.",
    "The tone feels premium and serious, which can work for finance roles.",
    "The design idea of financial intelligence is a good direction for a BFSI-focused portfolio.",
  ],
  risks: [
    "Claims like Fortune 500 clients, SEBI registered, RBI compliant, ISO 27001, and CIN are risky if they are not legally true and verifiable. A recruiter may see this as fake or over-claiming.",
    "It does not clearly say 'Sumit Singh - PGDM Finance + Business Analytics portfolio'. Your personal brand is missing.",
    "There are no case studies, GitHub links, dashboards, Excel files, PDFs, or proof of work.",
    "There is no clear resume download, LinkedIn link, email CTA, or hiring message.",
    "It looks like a company landing page, not a placement portfolio for a finance/analytics student.",
  ],
  priorityFixes: [
    "Reposition the hero: 'Sumit Singh | Finance + Business Analytics Portfolio' with one-line role target: Equity Research / Credit Risk / Financial Analyst.",
    "Remove or replace unverified compliance claims with honest proof: certifications, projects, dashboards, GitHub, LinkedIn, resume.",
    "Add 3 strong project case studies above the fold or immediately after hero.",
    "Add a 'Download Resume' button, LinkedIn button, and email contact button.",
    "Add a short 'About Me' section with your PGDM, finance major, analytics minor, and 15 LPA target roles.",
    "Add a 'What I can do' skills grid: DCF, ratio analysis, Excel, SQL, Power BI, Python basics, AI-assisted research.",
    "Add a blog/notes section for daily finance quotes, market notes, and project learnings.",
  ],
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    title: "Equity Research + DCF Valuation of HDFC Bank / TCS / Asian Paints",
    goal: "Build a real analyst-style stock pitch with DCF, peer multiples, risks, and target price.",
    tools: ["Excel", "Screener.in", "Annual Report", "PowerPoint", "AI-assisted summary"],
    deliverables: ["Excel DCF model", "1-page equity research note", "5-slide stock pitch deck", "Sensitivity table", "Website case study"],
    recruiterValue: "Best proof for equity research, FP&A, investment analyst, and finance analyst roles.",
    buildSteps: [
      "Choose one simple large-cap company and download 5 years of financials.",
      "Build revenue, margin, FCFF, WACC, terminal value, and sensitivity table in Excel.",
      "Compare P/E, P/B, EV/EBITDA with 5 peers.",
      "Write thesis, risks, valuation range, and final BUY/HOLD/SELL recommendation.",
      "Upload screenshots and final PDF to your website and GitHub/Drive.",
    ],
  },
  {
    title: "Credit Risk Dashboard for Loan Default Analysis",
    goal: "Analyze borrower default patterns and create a dashboard useful for banks/NBFC recruiters.",
    tools: ["Excel", "SQL", "Power BI", "Python optional", "Kaggle loan dataset"],
    deliverables: ["Power BI dashboard", "SQL queries", "Default risk insights", "Credit scorecard summary", "Project README"],
    recruiterValue: "Directly relevant for credit analyst, risk analyst, NBFC, bank, and BFSI analytics roles.",
    buildSteps: [
      "Download a loan default dataset from Kaggle.",
      "Clean borrower income, loan amount, DTI, grade, purpose, default flag, and dates.",
      "Write SQL queries for default rate by grade, income band, loan purpose, and tenure.",
      "Build Power BI visuals: KPI cards, default rate trends, high-risk segments, and filters.",
      "Write recommendations: whom to approve, whom to reject, and what data is missing.",
    ],
  },
  {
    title: "RBI + Banking NPA Tracker",
    goal: "Create a public macro-finance dashboard tracking repo rate, inflation, credit growth, and banking asset quality.",
    tools: ["Excel", "Power BI", "RBI data", "Annual reports", "Canva/PPT"],
    deliverables: ["Macro dashboard", "Bank comparison table", "NPA/ROA/NIM trend charts", "Monthly update note"],
    recruiterValue: "Shows current-affairs awareness plus finance analytics. Great for banking and risk roles.",
    buildSteps: [
      "Collect RBI repo rate, CPI, GDP growth, bank credit growth, and 10-year G-Sec yield.",
      "Collect HDFC Bank, ICICI Bank, SBI, Axis Bank ratios from annual reports/Screener.",
      "Build charts for NIM, GNPA, NNPA, CASA, ROA, and ROE.",
      "Add interpretation: which bank has best asset quality and why.",
      "Post a monthly update on your portfolio website and LinkedIn.",
    ],
  },
  {
    title: "Mutual Fund SIP vs Lumpsum Portfolio Analyzer",
    goal: "Compare SIP, lumpsum, and asset allocation outcomes using real NAV data.",
    tools: ["Excel", "Power Query", "Power BI", "AMFI/Moneycontrol NAV data"],
    deliverables: ["Excel model", "Power BI comparison dashboard", "Investor recommendation PDF"],
    recruiterValue: "Useful for wealth management, PMS, mutual fund, and financial planning roles.",
    buildSteps: [
      "Pick 5 funds: Nifty index, flexi-cap, mid-cap, liquid fund, gold ETF/fund.",
      "Pull monthly NAV data and simulate SIP vs lumpsum for 5 years.",
      "Calculate CAGR, volatility, drawdown, Sharpe, and final corpus.",
      "Create dashboard with filters for amount, period, fund, and asset mix.",
      "Write one investor-friendly conclusion: who should choose SIP vs lumpsum.",
    ],
  },
  {
    title: "Options Strategy Payoff Calculator",
    goal: "Build a practical tool to visualize payoff for call, put, covered call, protective put, and straddle.",
    tools: ["Excel", "Charts", "Basic options formulas", "NSE option chain"],
    deliverables: ["Excel calculator", "Payoff charts", "Risk-reward explanation", "Interview Q&A sheet"],
    recruiterValue: "Strong differentiator for derivatives, trading, risk, and capital markets roles.",
    buildSteps: [
      "Create inputs: spot price, strike, premium, quantity, expiry scenario range.",
      "Build payoff formulas for long call, long put, short call, short put.",
      "Add strategies: covered call, protective put, straddle, strangle.",
      "Create charts showing max profit, max loss, breakeven, and risk zone.",
      "Write 1-page explanation for non-technical recruiters.",
    ],
  },
  {
    title: "Annual Report AI Assistant",
    goal: "Create an AI-assisted workflow where a user can ask questions from an annual report PDF.",
    tools: ["NotebookLM", "Annual report PDF", "Google Colab optional", "AI prompting"],
    deliverables: ["Prompt library", "Q&A screenshots", "Verification checklist", "Case study page"],
    recruiterValue: "Futuristic and rare. Shows you understand GenAI use cases in finance research.",
    buildSteps: [
      "Upload one annual report into NotebookLM.",
      "Ask 15 questions: revenue drivers, risks, margins, debt, management tone, future outlook.",
      "Verify 5 answers manually from the PDF.",
      "Create a case study explaining how AI speeds research but needs human verification.",
      "Add this as your most futuristic project on the website.",
    ],
  },
];

export const FUTURE_SKILL_STACK = [
  {
    skill: "AI-assisted financial research",
    why: "Recruiters want analysts who can produce better research faster without blindly trusting AI.",
    proof: "Annual Report AI Assistant + prompt library + verification checklist",
  },
  {
    skill: "SQL for BFSI analytics",
    why: "Banks, NBFCs, fintech, and analytics teams store data in databases, not Excel sheets.",
    proof: "Credit risk dashboard with SQL query file",
  },
  {
    skill: "Power BI storytelling",
    why: "Managers hire analysts who can turn data into decisions, not just charts.",
    proof: "NPA tracker, loan default dashboard, and sales/finance dashboard",
  },
  {
    skill: "Python finance automation",
    why: "Python differentiates finance students from Excel-only candidates.",
    proof: "Stock returns, volatility, Sharpe, drawdown, and correlation notebook",
  },
  {
    skill: "Credit risk and scorecard basics",
    why: "Directly employable for banks, NBFCs, risk teams, and BFSI analytics roles.",
    proof: "Loan default analysis and borrower risk segmentation project",
  },
  {
    skill: "Project packaging on GitHub/website",
    why: "A well-packaged project proves communication, ownership, and readiness.",
    proof: "Project README, screenshots, files, and business recommendations",
  },
];