// Visual asset registry for all calculators & models in Kunwar Analytics.
// Provides deterministic, verified local visual mappings and rich art direction.

export interface CalculatorVisualMeta {
  slug: string;
  src: string;
  alt: string;
  category: string;
  accentColor: string;
  accentBg: string;
  badge: string;
  gradientFrom: string;
  gradientTo: string;
  highlights: string[];
}

export const FALLBACK_VISUAL: CalculatorVisualMeta = {
  slug: 'default',
  src: '/cards/card-default-fallback.svg',
  alt: 'Kunwar Analytics quantitative financial model and valuation workstation',
  category: 'Quantitative Finance',
  accentColor: '#0D9488',
  accentBg: 'rgba(13, 148, 136, 0.1)',
  badge: 'Interactive Model',
  gradientFrom: 'from-[#07131D]',
  gradientTo: 'to-[#0E2A3B]',
  highlights: ['Financial modeling', 'Sensitivity analysis', 'Deterministic solver']
};

export const CALCULATOR_VISUALS: Record<string, CalculatorVisualMeta> = {
  'dcf-valuation-model': {
    slug: 'dcf-valuation-model',
    src: '/card-dcf-model.png',
    alt: 'Discounted Cash Flow 5-year UFCF projection, terminal value Gordon growth bridge, and enterprise valuation waterfall',
    category: 'Valuation',
    accentColor: '#0D9488',
    accentBg: 'rgba(13, 148, 136, 0.1)',
    badge: 'Institutional Valuation',
    gradientFrom: 'from-[#0A1F26]',
    gradientTo: 'to-[#164E63]',
    highlights: ['5-Yr UFCF Projections', 'Gordon Terminal Growth', 'EV-to-Equity Bridge']
  },
  '3-statement-model': {
    slug: '3-statement-model',
    src: '/card-startup-model.png',
    alt: 'Dynamic 3-statement financial model linking P&L, balance sheet, and cash flow statement with zero imbalance',
    category: 'Financial Model',
    accentColor: '#2563EB',
    accentBg: 'rgba(37, 99, 235, 0.1)',
    badge: 'Core Financials',
    gradientFrom: 'from-[#0B1A30]',
    gradientTo: 'to-[#1E3A8A]',
    highlights: ['P&L · BS · Cash Flow', 'Zero Imbalance Engine', 'Net PP&E Roll-forward']
  },
  'market-sizing-framework': {
    slug: 'market-sizing-framework',
    src: '/card-market-sizing.png',
    alt: 'Concentric TAM, SAM, and SOM addressable market framework with top-down and bottom-up models',
    category: 'Market Analysis',
    accentColor: '#059669',
    accentBg: 'rgba(5, 150, 105, 0.1)',
    badge: 'Market Strategy',
    gradientFrom: 'from-[#062419]',
    gradientTo: 'to-[#065F46]',
    highlights: ['TAM / SAM / SOM Layers', 'Top-Down vs Bottom-Up', 'Convergence Diagnostics']
  },
  'q-commerce-model': {
    slug: 'q-commerce-model',
    src: '/card-quick-commerce.png',
    alt: 'Quick commerce dark store unit economics, delivery cost waterfall, and CM2 contribution margin',
    category: 'Sector Model',
    accentColor: '#EA580C',
    accentBg: 'rgba(234, 88, 12, 0.1)',
    badge: 'Unit Economics',
    gradientFrom: 'from-[#271206]',
    gradientTo: 'to-[#9A3412]',
    highlights: ['Dark Store Breakeven', 'CM1 vs CM2 Margin', 'Order Density Scenarios']
  },
  'porters-five-forces': {
    slug: 'porters-five-forces',
    src: '/cards/card-porters-five-forces.svg',
    alt: "Porter's 5 Forces competitive dynamics radar analyzing buyer power, supplier leverage, substitution, and threat of entrants",
    category: 'Strategy',
    accentColor: '#D97706',
    accentBg: 'rgba(217, 119, 6, 0.1)',
    badge: 'Competitive Analysis',
    gradientFrom: 'from-[#221704]',
    gradientTo: 'to-[#78350F]',
    highlights: ['5-Forces Radar Pentagon', 'Industry Intensity Score', 'Strategic Positioning']
  },
  'cca-valuation': {
    slug: 'cca-valuation',
    src: '/cards/card-cca-valuation.svg',
    alt: 'Comparable Company Analysis peer trading multiples (EV/EBITDA, P/E) with benchmark medians and DLOM adjustments',
    category: 'Valuation',
    accentColor: '#4F46E5',
    accentBg: 'rgba(79, 70, 229, 0.1)',
    badge: 'Relative Valuation',
    gradientFrom: 'from-[#0D102E]',
    gradientTo: 'to-[#312E81]',
    highlights: ['Peer Multiple Distribution', 'EV/EBITDA & P/E Medians', 'DLOM Equity Adjustment']
  },
  'saas-ltv-cac-model': {
    slug: 'saas-ltv-cac-model',
    src: '/card-saas-3d.png',
    alt: 'SaaS unit economics engine with LTV-to-CAC ratio, net churn velocity, and CAC payback timeline',
    category: 'SaaS & Tech',
    accentColor: '#0284C7',
    accentBg: 'rgba(2, 132, 199, 0.1)',
    badge: 'Subscription Metrics',
    gradientFrom: 'from-[#071E33]',
    gradientTo: 'to-[#0369A1]',
    highlights: ['LTV : CAC Magic Ratio', 'Cohort Churn Velocity', 'Gross Margin Amortization']
  },
  'ai-agent-roi-calculator': {
    slug: 'ai-agent-roi-calculator',
    src: '/cards/card-ai-agent-roi.svg',
    alt: 'Enterprise AI deployment ROI model comparing agent displacement economics, productivity gains, and amortized implementation CapEx',
    category: 'AI Strategy',
    accentColor: '#8B5CF6',
    accentBg: 'rgba(139, 92, 246, 0.1)',
    badge: 'AI Capital Allocation',
    gradientFrom: 'from-[#17092E]',
    gradientTo: 'to-[#581C87]',
    highlights: ['FTE Cost Displacement', 'LLM Inference OpEx', '3-Year NPV & Payback Mo']
  },
  'autonomous-workforce': {
    slug: 'autonomous-workforce',
    src: '/cards/card-autonomous-workforce.svg',
    alt: 'Autonomous workforce restructuring simulator mapping agent swarm arbitrage, payroll elimination, and valuation re-rating',
    category: 'AI Strategy',
    accentColor: '#06B6D4',
    accentBg: 'rgba(6, 182, 212, 0.1)',
    badge: 'Swarm Arbitrage',
    gradientFrom: 'from-[#051B29]',
    gradientTo: 'to-[#0E7490]',
    highlights: ['Swarm Arbitrage Topology', 'EBITDA Margin Expansion', 'Valuation Multiple Re-rating']
  },
  'crypto-tokenomics-model': {
    slug: 'crypto-tokenomics-model',
    src: '/card-web3-3d.png',
    alt: 'Token allocation distribution, 48-month vesting cliff schedule, and circulating supply vs FDV forecast',
    category: 'Web3',
    accentColor: '#F59E0B',
    accentBg: 'rgba(245, 158, 11, 0.1)',
    badge: 'Token Architecture',
    gradientFrom: 'from-[#261704]',
    gradientTo: 'to-[#B45309]',
    highlights: ['48-Month Vesting Schedule', 'Cliff vs Linear Release', 'Circulating vs FDV Matrix']
  },
  'b2b-enterprise-marketing-roi': {
    slug: 'b2b-enterprise-marketing-roi',
    src: '/cards/card-b2b-marketing-roi.svg',
    alt: 'B2B enterprise pipeline attribution engine measuring CAC by acquisition channel, pipeline velocity, and return on marketing spend',
    category: 'Growth & Marketing',
    accentColor: '#E11D48',
    accentBg: 'rgba(225, 29, 72, 0.1)',
    badge: 'GTM Attribution',
    gradientFrom: 'from-[#2A0614]',
    gradientTo: 'to-[#9F1239]',
    highlights: ['Full Funnel Attribution', 'Lead-to-Close Velocity', 'Channel CAC Payback']
  },
  'wacc-calculator': {
    slug: 'wacc-calculator',
    src: '/cards/card-wacc-calculator.svg',
    alt: 'Weighted Average Cost of Capital (WACC) build-up with CAPM Cost of Equity, after-tax Cost of Debt, and D/E sensitivity',
    category: 'Corporate Finance',
    accentColor: '#0D9488',
    accentBg: 'rgba(13, 148, 136, 0.1)',
    badge: 'Cost of Capital',
    gradientFrom: 'from-[#07131D]',
    gradientTo: 'to-[#0F766E]',
    highlights: ['CAPM: Rf + β×MRP', 'After-Tax Debt Cost', 'D/E Sensitivity Sweep']
  },
  'time-value-machine': {
    slug: 'time-value-machine',
    src: '/cards/card-time-value-machine.svg',
    alt: 'Time Value of Money simulator modeling exponential compounding, Gordon growing perpetuities, and reducing-balance loan EMI',
    category: 'Quantitative Finance',
    accentColor: '#10B981',
    accentBg: 'rgba(16, 185, 129, 0.1)',
    badge: 'Actuarial Precision',
    gradientFrom: 'from-[#05181C]',
    gradientTo: 'to-[#047857]',
    highlights: ['Reducing-Balance Loan EMI', 'PV/FV Compounding Reciprocity', 'Gordon Growing Perpetuity']
  },
  'portfolio-risk-lab': {
    slug: 'portfolio-risk-lab',
    src: '/cards/card-portfolio-risk-lab.svg',
    alt: 'Markowitz two-asset efficient frontier curve, covariance risk diversification, Minimum Variance Portfolio, and Sharpe ratio',
    category: 'Portfolio Analytics',
    accentColor: '#6366F1',
    accentBg: 'rgba(99, 102, 241, 0.1)',
    badge: 'Modern Portfolio Theory',
    gradientFrom: 'from-[#0C0F27]',
    gradientTo: 'to-[#4338CA]',
    highlights: ['Markowitz Efficient Frontier', 'Correlation Slider (ρ)', 'Minimum Variance Portfolio']
  },
  'critical-path-simulator': {
    slug: 'critical-path-simulator',
    src: '/cards/card-critical-path-simulator.svg',
    alt: 'CPM / PERT project network graph showing forward/backward passes, activity float, and critical path bottleneck identification',
    category: 'Operations Research',
    accentColor: '#F43F5E',
    accentBg: 'rgba(244, 63, 94, 0.1)',
    badge: 'Network Optimization',
    gradientFrom: 'from-[#240813]',
    gradientTo: 'to-[#BE123C]',
    highlights: ['Forward & Backward Passes', 'Total Float (LS - ES)', 'PERT 3-Point Duration & Var']
  },
  'ratio-analyzer': {
    slug: 'ratio-analyzer',
    src: '/cards/card-ratio-analyzer.svg',
    alt: '18 comprehensive financial ratios across liquidity, solvency, profitability, and 3-stage DuPont ROE decomposition',
    category: 'Financial Analysis',
    accentColor: '#3B82F6',
    accentBg: 'rgba(59, 130, 246, 0.1)',
    badge: '18 Ratios + DuPont',
    gradientFrom: 'from-[#0A1329]',
    gradientTo: 'to-[#1D4ED8]',
    highlights: ['18 Audited Financial Ratios', '3-Stage DuPont ROE Tree', '4 Sector Financial Presets']
  }
};

export function getCalculatorVisual(slug: string): CalculatorVisualMeta {
  return CALCULATOR_VISUALS[slug] || {
    ...FALLBACK_VISUAL,
    slug
  };
}
