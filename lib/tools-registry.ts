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
    gated: false,
    desc: 'FCFF discounted cash flow with a fully reconciling projection, equity bridge and diagnostics. Core model free; scenario comparison, sensitivity grid, exit-multiple cross-check and CSV export with Pro.',
    includes: ['Reconciling 3–10y projection', 'Bear/Base/Bull scenarios (Pro)', 'WACC × growth sensitivity grid (Pro)', 'Exit-multiple cross-check (Pro)', 'CSV workbook export (Pro)'],
    slug: 'dcf-valuation-model'
  },
  {
    id: 2,
    icon: '🚀',
    title: 'Startup 3-Statement Financial Model',
    category: 'Financial Model',
    tool: 'Interactive',
    difficulty: 'Intermediate',
    gated: true,
    desc: 'Linked 5-year P&L, balance sheet and cash-flow model that balances every year. Vintage depreciation, DSO/DIO/DPO working capital, optional debt repayment, and a one-click handoff of drivers into the DCF valuation.',
    includes: ['P&L · Balance Sheet · Cash Flow — always balances', 'Vintage depreciation schedule', 'DSO / DIO / DPO working capital', 'Scheduled debt repayment', 'Send drivers to DCF'],
    slug: '3-statement-model'
  },
  {
    id: 3,
    icon: '🗺️',
    title: 'Market Sizing Framework (TAM/SAM/SOM)',
    category: 'Market Analysis',
    tool: 'Interactive',
    difficulty: 'Beginner',
    gated: false,
    desc: 'Build top-down TAM/SAM/SOM and a bottom-up revenue plan side by side, with a convergence check that flags when the two stories do not agree. Assumptions are validated, never silently clamped.',
    includes: ['Top-down TAM → SAM → SOM (₹)', 'Bottom-up plan cross-check', 'Convergence diagnostics', '5-year growth projection', 'Autosave + share links'],
    slug: 'market-sizing-framework'
  },
  {
    id: 4,
    icon: '⚡',
    title: 'Q-Commerce Unit Economics Model',
    category: 'Sector Model',
    tool: 'Interactive',
    difficulty: 'Advanced',
    gated: true,
    desc: 'Dark-store P&L with CM1/CM2 waterfall and a break-even that honestly includes returns loss and marketing per order (the two lines most models quietly drop).',
    includes: ['Dark store P&L (CM1 → CM2 → store EBITDA)', 'Per-order contribution waterfall', 'Honest break-even orders/day', 'Order-volume scenarios'],
    slug: 'q-commerce-model'
  },
  {
    id: 5,
    icon: '🏛️',
    title: "Porter's Five Forces Template",
    category: 'Strategy',
    tool: 'Interactive',
    difficulty: 'Beginner',
    gated: false,
    desc: 'Score the five forces with sector templates, evidence notes and a radar view. The scorer warns when averaging hides one brutal force — Porter’s point that the strongest force caps profitability.',
    includes: ['India sector templates', 'Force ratings + evidence notes', 'Attractiveness banding', 'Dominant-force warning', 'Autosaves your analysis'],
    slug: 'porters-five-forces'
  },
  {
    id: 6,
    icon: '📐',
    title: 'Comparable Company Analysis (CCA)',
    category: 'Valuation',
    tool: 'Interactive',
    difficulty: 'Intermediate',
    gated: true,
    desc: 'Trading-multiples valuation with statistically correct medians, explicit handling of loss-making peers, DLOM applied to equity only (the correct treatment), and an EV/EBITDA football-field range.',
    includes: ['Peer EV/Rev & EV/EBITDA table', 'True median + mean/min/max', 'DLOM on equity value', 'Football-field valuation range'],
    slug: 'cca-valuation'
  },
  {
    id: 7,
    icon: '💻',
    title: 'SaaS LTV/CAC & Cohort Analysis',
    category: 'SaaS & Tech',
    tool: 'Interactive',
    difficulty: 'Advanced',
    gated: true,
    desc: 'SaaS unit economics done honestly: closed-form LTV, simple AND churn-adjusted payback, optional discounted LTV — and 0% churn reported as infinite, not secretly floored.',
    includes: ['LTV : CAC ratio', 'Churn-adjusted payback month', 'Optional NPV (discounted) LTV', '36-month cohort curve incl. month-0 margin'],
    slug: 'saas-ltv-cac-model'
  },
  {
    id: 8,
    icon: '🤖',
    title: 'Enterprise AI ROI Calculator',
    category: 'AI Strategy',
    tool: 'Interactive',
    difficulty: 'Intermediate',
    gated: false,
    desc: 'AI deployment ROI with the two correctives vendors leave out: an adoption ramp and a savings-realisation factor, because an automated hour is not automatically a saved rupee.',
    includes: ['Labour cost-displacement model', 'Adoption ramp (months)', 'Savings-realisation factor', 'Payback month + 36-month curves'],
    slug: 'ai-agent-roi-calculator'
  },
  {
    id: 11,
    icon: '🧠',
    title: 'Autonomous Workforce Restructuring Simulator',
    category: 'AI Strategy',
    tool: 'Interactive',
    difficulty: 'Advanced',
    gated: true,
    desc: 'Department-replacement economics: severance + integration capex vs agent run-rate, with partial replacement support and savings valued at BOTH the current and projected multiples — so the re-rating assumption is explicit, not smuggled.',
    includes: ['Partial or full replacement scenarios', 'Severance + capex restructuring cost', 'Value at current vs projected multiple', '5-year cumulative cost crossover'],
    slug: 'autonomous-workforce'
  },
  {
    id: 9,
    icon: '🪙',
    title: 'Web3 Tokenomics & Vesting Model',
    category: 'Web3',
    tool: 'Interactive',
    difficulty: 'Advanced',
    gated: true,
    desc: '48-month unlock simulator with configurable TGE unlock and community vesting (previously hard-coded), loud warnings when allocations do not sum to 100%, and an explicit constant-price disclosure on market-cap figures.',
    includes: ['Cliff + linear vesting schedules', 'Configurable TGE unlock %', 'Circulating-supply & float tracking', 'FDV vs float diagnostics'],
    slug: 'crypto-tokenomics-model'
  },
  {
    id: 10,
    icon: '🎯',
    title: 'B2B Enterprise Marketing ROI & Pipeline',
    category: 'Growth & Marketing',
    tool: 'Interactive',
    difficulty: 'Advanced',
    gated: true,
    desc: 'Lead → SQL → Closed-won funnel economics. CAC is reported as not-meaningful when nothing closes (never $0), and ROI can be run on margin-adjusted contract lifetime value instead of flattering gross ACV.',
    includes: ['Full-funnel conversion economics', 'Blended CAC + payback', 'Gross-margin & contract-life adjusted ROI', 'LTV : CAC'],
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
    desc: 'WACC build-up: CAPM with Hamada unlever/relever beta or private-company build-up, spread-based cost of debt, three weight modes, a correctly relevered leverage sweep — and one-click handoff into the DCF model.',
    includes: ['CAPM · peer βU relevering · build-up', 'Rf + spread cost of debt', 'D/E · market-value · target weights', 'Relevered D/E sensitivity', 'Send WACC to DCF'],
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
    desc: 'Every TVM pattern in one place: present/future value, full loan amortisation schedules, and Gordon growing perpetuities — with honest guard rails for invalid rates and tenures.',
    includes: ['EMI + full amortisation schedule', 'PV / FV compounding', 'Growing perpetuity (terminal value)', 'Annuity factors'],
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
    desc: 'Markowitz two-asset engine: sweep weights, watch the diversification free lunch appear as ρ drops below 1, and locate both the minimum-variance and maximum-Sharpe (tangency) portfolios.',
    includes: ['E[Rp] & σp live math', 'Minimum-variance portfolio', 'Tangency (max-Sharpe) portfolio', 'Weight-sweep frontier', 'Validated correlations'],
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
    desc: 'AOA network engine with true topological scheduling (correct even when node numbers are not in precedence order), cycle detection, and PERT probability of hitting a target date.',
    includes: ['Topological forward & backward passes', 'Total float + critical path', 'Cycle detection', 'P(finish ≤ target date)'],
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
    desc: 'One P&L + one balance sheet in: liquidity, profitability, leverage, efficiency ratios and the DuPont decomposition of ROE — with consistency checks that catch impossible statements before you analyse them.',
    includes: ['Current/quick/cash', 'Margins · ROE · ROCE', 'Coverage & debt ratios', 'Statement consistency warnings', 'DuPont 3-factor ROE'],
    slug: 'ratio-analyzer'
  },
];

export const getTool = (slug: string) => TOOLS.find((t) => t.slug === slug);
