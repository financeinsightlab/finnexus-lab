// Tool registry — single source of truth for the Tools hub + calculator routes
export interface Tool {
  id: number;
  icon: string;
  title: string;
  category: string;
  tool: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  gated: boolean;
  desc: string;
  includes: string[];
  slug: string;
}

export const TOOLS: Tool[] = [
  {
    id: 1,
    icon: '📊',
    title: 'DCF Valuation Model — Comprehensive',
    category: 'Valuation',
    tool: 'Excel',
    difficulty: 'Intermediate',
    gated: true,
    desc: 'Full DCF model with 3 scenarios, sensitivity analysis, and WACC calculator.',
    includes: ['Revenue projections (5-year)', 'WACC calculator', 'Sensitivity tables', '3 scenarios'],
    slug: 'dcf-valuation-model'
  },
  {
    id: 2,
    icon: '🚀',
    title: 'Startup 3-Statement Financial Model',
    category: 'Financial Model',
    tool: 'Excel',
    difficulty: 'Intermediate',
    gated: true,
    desc: 'Complete financial model for early-stage companies.',
    includes: ['P&L · Balance Sheet · Cash Flow', 'Headcount planner', 'Runway calculator', 'Unit economics'],
    slug: '3-statement-model'
  },
  {
    id: 3,
    icon: '🗺️',
    title: 'Market Sizing Framework (TAM/SAM/SOM)',
    category: 'Market Analysis',
    tool: 'Excel + PDF',
    difficulty: 'Beginner',
    gated: false,
    desc: 'Templates for market size estimation and analysis.',
    includes: ['Top-down template', 'Bottom-up template', 'India market data', 'Worked examples'],
    slug: 'market-sizing-framework'
  },
  {
    id: 4,
    icon: '⚡',
    title: 'Q-Commerce Unit Economics Model',
    category: 'Sector Model',
    tool: 'Excel',
    difficulty: 'Advanced',
    gated: true,
    desc: 'Detailed unit economics for quick commerce businesses.',
    includes: ['Dark store P&L', 'Order volume scenarios', 'CM% waterfall chart', 'Breakeven calculator'],
    slug: 'q-commerce-model'
  },
  {
    id: 5,
    icon: '🏛️',
    title: "Porter's Five Forces Template",
    category: 'Strategy',
    tool: 'PowerPoint',
    difficulty: 'Beginner',
    gated: false,
    desc: 'Strategic analysis framework for competitive positioning.',
    includes: ['5-Forces visual template', 'Rating framework', 'India sector examples', 'Strategy notes'],
    slug: 'porters-five-forces'
  },
  {
    id: 6,
    icon: '📐',
    title: 'Comparable Company Analysis (CCA)',
    category: 'Valuation',
    tool: 'Excel',
    difficulty: 'Intermediate',
    gated: true,
    desc: 'Peer company comparison and valuation multiples.',
    includes: ['Peer comp table', 'Multiple normalisation', 'Sector medians', 'Visual benchmarks'],
    slug: 'cca-valuation'
  },
  {
    id: 7,
    icon: '💻',
    title: 'SaaS LTV/CAC & Cohort Analysis',
    category: 'SaaS & Tech',
    tool: 'Excel',
    difficulty: 'Advanced',
    gated: true,
    desc: 'Comprehensive SaaS unit economics with cohort retention mapping.',
    includes: ['LTV:CAC ratio calculator', 'Subscription cohort heatmap', 'Churn velocity model', 'Payback period'],
    slug: 'saas-ltv-cac-model'
  },
  {
    id: 8,
    icon: '🤖',
    title: 'Enterprise AI ROI Calculator',
    category: 'AI Strategy',
    tool: 'Excel',
    difficulty: 'Intermediate',
    gated: false,
    desc: 'Framework to calculate the ROI of deploying AI agents vs human capital.',
    includes: ['Cost-displacement model', 'Productivity multiplier', 'Implementation Capex amortisation', 'Breakeven timeline'],
    slug: 'ai-agent-roi-calculator'
  },
  {
    id: 11,
    icon: '🧠',
    title: 'Autonomous Workforce Restructuring Simulator',
    category: 'AI Strategy',
    tool: 'Web App',
    difficulty: 'Advanced',
    gated: true,
    desc: 'Next-generation financial model simulating the EBITDA and valuation impact of replacing human departments with autonomous agent swarms.',
    includes: ['Swarm Arbitrage calculation', 'Valuation re-rating engine', 'Restructuring cost logic', 'Live margin mapping'],
    slug: 'autonomous-workforce'
  },
  {
    id: 9,
    icon: '🪙',
    title: 'Web3 Tokenomics & Vesting Model',
    category: 'Web3',
    tool: 'Excel',
    difficulty: 'Advanced',
    gated: true,
    desc: 'Token distribution, vesting schedule modeling, and circulating supply forecasting.',
    includes: ['Vesting cliff schedules', 'Inflation rate modeling', 'FDV vs Market Cap tracker', 'Allocation pie charts'],
    slug: 'crypto-tokenomics-model'
  },
  {
    id: 10,
    icon: '🎯',
    title: 'B2B Enterprise Marketing ROI & Pipeline',
    category: 'Growth & Marketing',
    tool: 'Excel',
    difficulty: 'Advanced',
    gated: true,
    desc: 'Full-funnel attribution and ROI tracking for enterprise B2B sales cycles.',
    includes: ['Lead-to-Close pipeline tracker', 'CAC by acquisition channel', 'Marketing spend ROI calculator', 'Sales quota modelling'],
    slug: 'b2b-enterprise-marketing-roi'
  },
  {
    id: 12,
    icon: '⚖️',
    title: 'WACC Calculator — CAPM Build-Up',
    category: 'PGDM Finance Lab',
    tool: 'Interactive',
    difficulty: 'Beginner',
    gated: false,
    desc: 'Full WACC build: CAPM cost of equity, after-tax cost of debt, market-value weights, with D/E sensitivity.',
    includes: ['CAPM: Rf + β×MRP', 'Tax-adjusted debt cost', 'E/V · D/V weights', 'D/E sensitivity grid'],
    slug: 'wacc-calculator'
  },
  {
    id: 13,
    icon: '⏳',
    title: 'Time-Value Machine — PV · FV · EMI · Perpetuities',
    category: 'PGDM Finance Lab',
    tool: 'Interactive',
    difficulty: 'Beginner',
    gated: false,
    desc: 'Every TVM pattern in one place: present/future value, loan EMI schedules, and Gordon growing perpetuities.',
    includes: ['EMI + interest split', 'PV / FV compounding', 'Growing perpetuity (terminal value)', 'Annuity factors'],
    slug: 'time-value-machine'
  },
  {
    id: 14,
    icon: '🧺',
    title: 'Portfolio Risk & Return Lab — Two-Asset Frontier',
    category: 'PGDM Finance Lab',
    tool: 'Interactive',
    difficulty: 'Intermediate',
    gated: false,
    desc: 'Markowitz two-asset engine: sweep weights, watch the diversification free lunch appear as ρ drops below 1.',
    includes: ['E[Rp] & σp live math', 'Correlation slider', 'Weight sweep frontier', 'Diversification saving metric'],
    slug: 'portfolio-risk-lab'
  },
  {
    id: 15,
    icon: '🕸️',
    title: 'Critical Path Simulator — CPM/PERT Networks',
    category: 'PGDM Lab',
    tool: 'Interactive',
    difficulty: 'Intermediate',
    gated: false,
    desc: 'AOA network engine: edit activity durations and watch ES/EF/LS/LF, floats and the critical path recompute.',
    includes: ['Forward & backward pass', 'Total float per activity', 'Critical path highlight', 'Live duration editing'],
    slug: 'critical-path-simulator'
  },
  {
    id: 16,
    icon: '📐',
    title: 'Ratio Analyzer — 18 Ratios + DuPont',
    category: 'PGDM Finance Lab',
    tool: 'Interactive',
    difficulty: 'Beginner',
    gated: false,
    desc: 'One P&L + one balance sheet in: liquidity, profitability, leverage, efficiency ratios and the DuPont decomposition of ROE, live.',
    includes: ['Current/quick/cash', 'Margins · ROE · ROCE', 'Coverage & debt ratios', 'Cash conversion cycle', 'DuPont 3-factor ROE'],
    slug: 'ratio-analyzer'
  },
];

export const getTool = (slug: string) => TOOLS.find((t) => t.slug === slug);
