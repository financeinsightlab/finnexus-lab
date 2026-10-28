// lib/company-intelligence.ts
// India Company Intelligence — fetches live NSE/BSE data and generates AI analysis.
// Data sources: NSE India unofficial API (public), BSE India (public endpoints).
// AI: Hugging Face Mistral-7B (already configured in lib/hf-provider.ts).

export interface CompanyFinancials {
  revenue: number | null;       // in Crores INR
  pat: number | null;           // Profit After Tax, Crores
  ebitda: number | null;
  totalDebt: number | null;
  cashAndEquivalents: number | null;
  totalAssets: number | null;
  equity: number | null;
  revenueGrowthYoy: number | null; // percentage
  patGrowthYoy: number | null;
  ebitdaMargin: number | null;
  netMargin: number | null;
  roe: number | null;
  roa: number | null;
  debtToEquity: number | null;
  currentRatio: number | null;
  interestCoverageRatio: number | null;
  year: string;
}

export interface CompanyValuation {
  marketCap: number | null;    // Crores
  enterpriseValue: number | null;
  peRatio: number | null;
  pbRatio: number | null;
  evEbitda: number | null;
  evRevenue: number | null;
  dividendYield: number | null;
  eps: number | null;
}

export interface CompanyProfile {
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  exchange: 'NSE' | 'BSE' | 'BOTH';
  description: string;
  founded: string | null;
  employees: string | null;
  website: string | null;
  ceo: string | null;
  isin: string | null;
  currentPrice: number | null;
  priceChange: number | null;   // percentage
  priceChangeAbs: number | null;
  week52High: number | null;
  week52Low: number | null;
  avgVolume: string | null;
  promoterHolding: number | null;
  fiiHolding: number | null;
  diiHolding: number | null;
  publicHolding: number | null;
}

export interface CompanyPeer {
  symbol: string;
  name: string;
  marketCap: number | null;
  peRatio: number | null;
  revenueGrowth: number | null;
  netMargin: number | null;
  roe: number | null;
}

export interface HealthScore {
  overall: number;          // 0–100
  profitability: number;
  leverage: number;
  growth: number;
  efficiency: number;
  valuation: number;
  badges: string[];         // e.g. ['Debt-Free', 'High ROE', 'Strong Cash Flow']
  redFlags: string[];       // e.g. ['Revenue Declining', 'High Promoter Pledge']
}

export interface AIAnalysis {
  summary: string;
  bullCase: string;
  bearCase: string;
  keyRisks: string[];
  keyOpportunities: string[];
  investmentThesis: string;
  analystVerdict: 'STRONG_BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG_SELL' | 'WATCH';
  targetPriceRange: { low: number; high: number } | null;
  generatedAt: string;
}

export interface CompanyIntelligenceReport {
  profile: CompanyProfile;
  financials: CompanyFinancials[];     // Last 3 years
  latestFinancials: CompanyFinancials | null;
  valuation: CompanyValuation;
  peers: CompanyPeer[];
  healthScore: HealthScore;
  aiAnalysis: AIAnalysis | null;       // null for free tier
  dcfData: DCFData | null;             // null for free tier
  userPlan?: string;
  fetchedAt: string;
}

export interface DCFData {
  revenueGrowthAssumptions: number[];  // 5 years, %
  ebitdaMarginAssumptions: number[];
  wacc: number;
  terminalGrowthRate: number;
  intrinsicValue: number | null;       // Per share
  marginOfSafety: number | null;       // %
  sensitivityTable: SensitivityTable;
}

export interface SensitivityTable {
  waccRange: number[];
  growthRange: number[];
  values: number[][];   // [wacc_i][growth_j] = intrinsic value
}

// ─── NSE/BSE Data Fetcher ─────────────────────────────────────────────────────

const NSE_BASE = 'https://www.nseindia.com';
const BSE_BASE = 'https://api.bseindia.com/BseIndiaAPI/api';

const NSE_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Referer': 'https://www.nseindia.com/',
  'Connection': 'keep-alive',
};

async function fetchNSE(path: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    // NSE requires a cookie from the homepage first
    const cookieRes = await fetch(NSE_BASE, {
      headers: NSE_HEADERS,
      signal: controller.signal,
    });
    const cookies = cookieRes.headers.get('set-cookie') ?? '';

    const res = await fetch(`${NSE_BASE}${path}`, {
      headers: { ...NSE_HEADERS, Cookie: cookies },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`NSE API ${path} returned ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

// ─── Screener.in scraper (public company pages) ───────────────────────────────

async function fetchScreenerData(symbol: string): Promise<Record<string, unknown> | null> {
  try {
    const url = `https://www.screener.in/api/company/${symbol.toUpperCase()}/`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; KunwarAnalytics/1.0)',
        'Accept': 'application/json',
        'Referer': 'https://www.screener.in/',
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return await res.json() as Record<string, unknown>;
  } catch {
    return null;
  }
}

// ─── Financial Health Score Calculator ────────────────────────────────────────

export function calculateHealthScore(
  financials: CompanyFinancials | null,
  valuation: CompanyValuation,
): HealthScore {
  if (!financials) {
    return { overall: 0, profitability: 0, leverage: 0, growth: 0, efficiency: 0, valuation: 0, badges: [], redFlags: ['Insufficient financial data'] };
  }

  const badges: string[] = [];
  const redFlags: string[] = [];

  // Profitability (0–100)
  let profitability = 50;
  if (financials.netMargin !== null) {
    if (financials.netMargin > 20) { profitability = 90; badges.push('High Net Margin'); }
    else if (financials.netMargin > 10) profitability = 75;
    else if (financials.netMargin > 5) profitability = 60;
    else if (financials.netMargin < 0) { profitability = 10; redFlags.push('Operating at a loss'); }
  }
  if (financials.roe !== null && financials.roe > 20) badges.push('High ROE');
  if (financials.roe !== null && financials.roe < 5) redFlags.push('Poor Return on Equity');

  // Leverage (0–100, higher = better = lower debt)
  let leverage = 50;
  if (financials.debtToEquity !== null) {
    if (financials.debtToEquity === 0) { leverage = 100; badges.push('Debt-Free'); }
    else if (financials.debtToEquity < 0.3) { leverage = 85; badges.push('Low Debt'); }
    else if (financials.debtToEquity < 0.7) leverage = 70;
    else if (financials.debtToEquity > 2) { leverage = 20; redFlags.push('High Leverage'); }
    else if (financials.debtToEquity > 1) leverage = 35;
  }
  if (financials.interestCoverageRatio !== null && financials.interestCoverageRatio < 1.5) {
    redFlags.push('Weak Interest Coverage');
  }

  // Growth (0–100)
  let growth = 50;
  if (financials.revenueGrowthYoy !== null) {
    if (financials.revenueGrowthYoy > 20) { growth = 90; badges.push('High Revenue Growth'); }
    else if (financials.revenueGrowthYoy > 10) growth = 75;
    else if (financials.revenueGrowthYoy > 0) growth = 55;
    else { growth = 20; redFlags.push('Revenue Declining'); }
  }

  // Efficiency (0–100)
  let efficiency = 50;
  if (financials.roa !== null) {
    if (financials.roa > 15) { efficiency = 90; badges.push('Highly Efficient'); }
    else if (financials.roa > 8) efficiency = 70;
    else if (financials.roa > 3) efficiency = 55;
    else efficiency = 30;
  }
  if (financials.cashAndEquivalents !== null && financials.totalDebt !== null) {
    if (financials.cashAndEquivalents > financials.totalDebt) badges.push('Net Cash Positive');
  }

  // Valuation (0–100, higher = better = cheaper)
  let valuationScore = 50;
  if (valuation.peRatio !== null) {
    if (valuation.peRatio < 15) { valuationScore = 85; badges.push('Attractively Valued'); }
    else if (valuation.peRatio < 25) valuationScore = 65;
    else if (valuation.peRatio < 40) valuationScore = 50;
    else { valuationScore = 30; redFlags.push('Premium Valuation'); }
  }

  const overall = Math.round(
    (profitability * 0.25) +
    (leverage * 0.2) +
    (growth * 0.25) +
    (efficiency * 0.15) +
    (valuationScore * 0.15)
  );

  return { overall, profitability, leverage, growth, efficiency, valuation: valuationScore, badges, redFlags };
}

// ─── AI Analysis Generator ─────────────────────────────────────────────────────

export async function generateAIAnalysis(
  profile: CompanyProfile,
  financials: CompanyFinancials | null,
  valuation: CompanyValuation,
  healthScore: HealthScore,
): Promise<AIAnalysis> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;

  const prompt = buildAnalysisPrompt(profile, financials, valuation, healthScore);

  if (!apiKey) {
    // Return a structured placeholder when HF is not configured
    return buildFallbackAnalysis(profile, financials, healthScore);
  }

  try {
    const res = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        messages: [
          { role: 'system', content: 'You are an expert Indian equity analyst. Provide structured, data-driven analysis. Always output valid JSON only.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 800,
        temperature: 0.3,
        stream: false,
      }),
      signal: AbortSignal.timeout(25000),
    });

    if (!res.ok) return buildFallbackAnalysis(profile, financials, healthScore);

    const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content?.trim() ?? '';

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return buildFallbackAnalysis(profile, financials, healthScore);

    const parsed = JSON.parse(jsonMatch[0]) as Partial<AIAnalysis>;
    return {
      summary: parsed.summary ?? `${profile.name} is a ${profile.sector} company listed on ${profile.exchange}.`,
      bullCase: parsed.bullCase ?? 'Strong sector position and improving financials.',
      bearCase: parsed.bearCase ?? 'Competitive pressures and macro headwinds remain key risks.',
      keyRisks: parsed.keyRisks ?? ['Market competition', 'Regulatory changes', 'Currency risk'],
      keyOpportunities: parsed.keyOpportunities ?? ['Market expansion', 'Product innovation', 'Export growth'],
      investmentThesis: parsed.investmentThesis ?? 'Evaluate based on sector outlook and valuation comfort.',
      analystVerdict: parsed.analystVerdict ?? 'HOLD',
      targetPriceRange: parsed.targetPriceRange ?? null,
      generatedAt: new Date().toISOString(),
    };
  } catch {
    return buildFallbackAnalysis(profile, financials, healthScore);
  }
}

function buildAnalysisPrompt(
  profile: CompanyProfile,
  financials: CompanyFinancials | null,
  valuation: CompanyValuation,
  healthScore: HealthScore,
): string {
  return `Analyze this Indian company and return ONLY a JSON object:

Company: ${profile.name} (${profile.symbol})
Sector: ${profile.sector} | Industry: ${profile.industry}
Exchange: ${profile.exchange}

Financial Snapshot:
- Revenue: ₹${financials?.revenue ?? 'N/A'} Cr | PAT: ₹${financials?.pat ?? 'N/A'} Cr
- Revenue Growth YoY: ${financials?.revenueGrowthYoy ?? 'N/A'}%
- Net Margin: ${financials?.netMargin ?? 'N/A'}% | EBITDA Margin: ${financials?.ebitdaMargin ?? 'N/A'}%
- ROE: ${financials?.roe ?? 'N/A'}% | Debt/Equity: ${financials?.debtToEquity ?? 'N/A'}
- Market Cap: ₹${valuation.marketCap ?? 'N/A'} Cr | PE: ${valuation.peRatio ?? 'N/A'}x

Health Score: ${healthScore.overall}/100
Badges: ${healthScore.badges.join(', ') || 'None'}
Red Flags: ${healthScore.redFlags.join(', ') || 'None'}

Return this JSON structure:
{
  "summary": "2-3 sentence company overview",
  "bullCase": "2-3 sentence bull case",
  "bearCase": "2-3 sentence bear case",
  "keyRisks": ["risk1", "risk2", "risk3"],
  "keyOpportunities": ["opp1", "opp2", "opp3"],
  "investmentThesis": "2-3 sentence investment thesis",
  "analystVerdict": "BUY|HOLD|SELL|STRONG_BUY|STRONG_SELL|WATCH",
  "targetPriceRange": {"low": number, "high": number} or null
}`;
}

function buildFallbackAnalysis(
  profile: CompanyProfile,
  financials: CompanyFinancials | null,
  healthScore: HealthScore,
): AIAnalysis {
  const verdict: AIAnalysis['analystVerdict'] =
    healthScore.overall >= 75 ? 'BUY' :
    healthScore.overall >= 55 ? 'HOLD' :
    healthScore.overall >= 35 ? 'WATCH' : 'SELL';

  return {
    summary: `${profile.name} operates in the ${profile.sector} sector, listed on ${profile.exchange}. With a health score of ${healthScore.overall}/100, the company shows ${healthScore.overall >= 60 ? 'solid' : 'mixed'} fundamentals.`,
    bullCase: healthScore.badges.length > 0
      ? `Key strengths include: ${healthScore.badges.slice(0, 3).join(', ')}. The company is well-positioned in the ${profile.industry} industry.`
      : `The company operates in a high-growth Indian ${profile.sector} sector with significant runway for expansion.`,
    bearCase: healthScore.redFlags.length > 0
      ? `Investors should note: ${healthScore.redFlags.slice(0, 3).join(', ')}. These factors require careful monitoring.`
      : 'Market competition and macro headwinds remain watch items for this sector.',
    keyRisks: [
      'Competitive pressure in the sector',
      'Regulatory changes by SEBI/RBI',
      'Commodity/currency exposure',
    ],
    keyOpportunities: [
      `India's growing ${profile.sector} market`,
      'Digital transformation tailwinds',
      'Export market expansion',
    ],
    investmentThesis: financials
      ? `With revenue of ₹${financials.revenue ?? 'N/A'} Cr and a health score of ${healthScore.overall}/100, ${profile.name} ${healthScore.overall >= 65 ? 'presents a reasonable investment case' : 'requires improvement in fundamentals'} at current valuations.`
      : `${profile.name} should be evaluated based on upcoming quarterly results and sector outlook.`,
    analystVerdict: verdict,
    targetPriceRange: null,
    generatedAt: new Date().toISOString(),
  };
}

// ─── DCF Model Generator ────────────────────────────────────────────────────────

export function generateDCFData(
  financials: CompanyFinancials | null,
  valuation: CompanyValuation,
  profile: CompanyProfile,
): DCFData {
  // India-specific WACC: Risk-free rate ~7% (10yr G-Sec) + ERP ~5.5% + beta-adjusted
  const baseWacc = 12; // 12% base WACC for Indian equities
  const terminalGrowth = 5; // India nominal GDP growth assumption

  // Revenue growth assumptions based on historical growth and sector
  const historicalGrowth = financials?.revenueGrowthYoy ?? 10;
  const growthAssumptions = [
    Math.min(historicalGrowth * 0.9, 35),   // Y1
    Math.min(historicalGrowth * 0.8, 30),   // Y2
    Math.min(historicalGrowth * 0.7, 25),   // Y3
    Math.min(historicalGrowth * 0.6, 20),   // Y4
    Math.min(historicalGrowth * 0.5, 15),   // Y5 — fading growth
  ].map(g => Math.max(g, 3)); // Floor at 3%

  const ebitdaMarginAssumptions = [
    financials?.ebitdaMargin ?? 15,
    (financials?.ebitdaMargin ?? 15) + 0.5,
    (financials?.ebitdaMargin ?? 15) + 1,
    (financials?.ebitdaMargin ?? 15) + 1.5,
    (financials?.ebitdaMargin ?? 15) + 2,
  ].map(m => Math.min(Math.max(m, 5), 60));

  // Simple DCF: Project FCF → terminal value → discount back
  const baseRevenue = financials?.revenue ?? 1000;
  let projectedRevenue = baseRevenue;
  let fcfSum = 0;

  for (let i = 0; i < 5; i++) {
    projectedRevenue *= (1 + growthAssumptions[i] / 100);
    const ebitda = projectedRevenue * (ebitdaMarginAssumptions[i] / 100);
    const fcf = ebitda * 0.65; // Simplified: 35% taxes + capex
    fcfSum += fcf / Math.pow(1 + baseWacc / 100, i + 1);
  }

  const terminalValue = (projectedRevenue * (ebitdaMarginAssumptions[4] / 100) * 0.65) *
    (1 + terminalGrowth / 100) / ((baseWacc / 100) - (terminalGrowth / 100));
  const pvTerminal = terminalValue / Math.pow(1 + baseWacc / 100, 5);

  const enterpriseValue = fcfSum + pvTerminal;
  const equityValue = enterpriseValue - (financials?.totalDebt ?? 0) + (financials?.cashAndEquivalents ?? 0);

  // Per-share intrinsic value (approximate — need shares outstanding which we don't always have)
  const intrinsicValue = valuation.marketCap && valuation.eps
    ? (equityValue / (valuation.marketCap / (valuation.currentPrice ?? 1))) 
    : null;

  const currentPrice = null; // Will be set from profile
  const marginOfSafety = intrinsicValue && valuation.peRatio
    ? Math.round(((intrinsicValue - (valuation.eps! * valuation.peRatio!)) / intrinsicValue) * 100)
    : null;

  // Sensitivity table: WACC × Terminal Growth
  const waccRange = [10, 11, 12, 13, 14];
  const growthRange = [3, 4, 5, 6, 7];
  const values: number[][] = waccRange.map(w =>
    growthRange.map(g => {
      const tv = (projectedRevenue * (ebitdaMarginAssumptions[4] / 100) * 0.65) *
        (1 + g / 100) / ((w / 100) - (g / 100));
      return Math.round((fcfSum + tv / Math.pow(1 + w / 100, 5)) / 100) * 100; // in Crores
    })
  );

  return {
    revenueGrowthAssumptions: growthAssumptions,
    ebitdaMarginAssumptions,
    wacc: baseWacc,
    terminalGrowthRate: terminalGrowth,
    intrinsicValue,
    marginOfSafety,
    sensitivityTable: { waccRange, growthRange, values },
  };
}

// ─── Mock Data (fallback when live API unavailable) ───────────────────────────

export function buildMockReport(symbol: string): CompanyIntelligenceReport {
  const upperSymbol = symbol.toUpperCase();
  
  const mockProfiles: Record<string, Partial<CompanyProfile>> = {
    'RELIANCE': { name: 'Reliance Industries Ltd', sector: 'Conglomerate', industry: 'Oil & Gas / Retail / Telecom', description: 'India\'s largest private sector company with businesses spanning energy, petrochemicals, retail, and digital services.' },
    'TCS': { name: 'Tata Consultancy Services', sector: 'Technology', industry: 'IT Services', description: 'India\'s largest IT company and a leading global provider of technology and consulting services.' },
    'HDFC': { name: 'HDFC Bank Ltd', sector: 'Banking', industry: 'Private Sector Banking', description: 'India\'s largest private sector bank by assets, serving over 60 million customers.' },
    'INFY': { name: 'Infosys Ltd', sector: 'Technology', industry: 'IT Services', description: 'Global leader in technology services and consulting, with expertise in digital transformation.' },
  };

  const base = mockProfiles[upperSymbol] ?? {
    name: `${upperSymbol} Ltd`,
    sector: 'Diversified',
    industry: 'Diversified',
    description: `${upperSymbol} is a listed Indian company. Live financial data will be populated once NSE/BSE API connection is established.`,
  };

  const profile: CompanyProfile = {
    symbol: upperSymbol,
    name: base.name ?? `${upperSymbol} Ltd`,
    sector: base.sector ?? 'Diversified',
    industry: base.industry ?? 'Diversified',
    exchange: 'NSE',
    description: base.description ?? `${upperSymbol} is a listed Indian company. Live financial data will be populated once NSE/BSE API connection is established.`,
    ceo: null,
    founded: null,
    employees: null,
    website: null,
    isin: null,
    currentPrice: null,
    priceChange: null,
    priceChangeAbs: null,
    week52High: null,
    week52Low: null,
    avgVolume: null,
    promoterHolding: null,
    fiiHolding: null,
    diiHolding: null,
    publicHolding: null,
  };

  const financials: CompanyFinancials = {
    revenue: null, pat: null, ebitda: null, totalDebt: null,
    cashAndEquivalents: null, totalAssets: null, equity: null,
    revenueGrowthYoy: null, patGrowthYoy: null, ebitdaMargin: null,
    netMargin: null, roe: null, roa: null, debtToEquity: null,
    currentRatio: null, interestCoverageRatio: null, year: '2024',
  };

  const valuation: CompanyValuation = {
    marketCap: null, enterpriseValue: null, peRatio: null,
    pbRatio: null, evEbitda: null, evRevenue: null,
    dividendYield: null, eps: null,
  };

  const healthScore = calculateHealthScore(null, valuation);

  return {
    profile,
    financials: [financials],
    latestFinancials: financials,
    valuation,
    peers: [],
    healthScore,
    aiAnalysis: null,
    dcfData: null,
    fetchedAt: new Date().toISOString(),
  };
}

// Export a type alias for the price field on valuation
declare module './company-intelligence' {
  interface CompanyValuation {
    currentPrice?: number | null;
  }
}
