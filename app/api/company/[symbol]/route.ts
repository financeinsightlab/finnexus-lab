// app/api/company/[symbol]/route.ts
// Returns live company intelligence data: profile, financials, health score, AI analysis.
// Free tier: profile + health score + 3-year revenue chart
// PRO: full financials + AI analysis + peer comparison
// ELITE: + DCF model + sensitivity table

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { resolvePlan } from '@/lib/entitlements';
import {
  calculateHealthScore,
  generateAIAnalysis,
  generateDCFData,
  buildMockReport,
  type CompanyProfile,
  type CompanyFinancials,
  type CompanyValuation,
  type CompanyPeer,
} from '@/lib/company-intelligence';

export const runtime = 'nodejs';
export const revalidate = 1800; // 30-minute cache

// ─── Screener.in data fetcher ─────────────────────────────────────────────────

async function fetchScreenerCompany(symbol: string): Promise<{
  profile: CompanyProfile;
  financials: CompanyFinancials[];
  valuation: CompanyValuation;
  peers: CompanyPeer[];
} | null> {
  try {
    // Screener.in company page — structured data in script tags
    const url = `https://www.screener.in/company/${symbol.toUpperCase()}/`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-IN,en;q=0.9',
      },
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) return null;
    const html = await res.text();

    // Extract JSON-LD structured data
    const jsonLdMatch = html.match(/<script[^>]+type="application\/json"[^>]*>([\s\S]*?)<\/script>/);
    
    // Parse key financial tables from Screener HTML
    const nameMatch = html.match(/<h1[^>]*class="[^"]*company-name[^"]*"[^>]*>([^<]+)/);
    const sectorMatch = html.match(/Sector[^:]*:[^<]*<a[^>]*>([^<]+)/);
    const mcapMatch = html.match(/Market\s+Cap[^₹]*₹\s*([\d,\.]+)/);
    const peMatch = html.match(/Stock P\/E[^0-9]*([\d\.]+)/);
    const pbMatch = html.match(/Price to Book[^0-9]*([\d\.]+)/);
    const dividendMatch = html.match(/Dividend Yield[^0-9]*([\d\.]+)/);
    const roeMatch = html.match(/Return on equity[^0-9]*([\d\.]+)/);
    const roaMatch = html.match(/Return on assets[^0-9]*([\d\.]+)/);
    const debtMatch = html.match(/Debt\s+to\s+equity[^0-9]*([\d\.]+)/);
    const currentRatioMatch = html.match(/Current ratio[^0-9]*([\d\.]+)/);
    const priceMatch = html.match(/"currentPrice"\s*:\s*([\d\.]+)/) ??
                      html.match(/<span[^>]+class="[^"]*current-price[^"]*"[^>]*>([\d,.]+)/);
    const weekHighMatch = html.match(/52 Week High[^0-9]*([\d,\.]+)/);
    const weekLowMatch = html.match(/52 Week Low[^0-9]*([\d,\.]+)/);

    const parseNum = (m: RegExpMatchArray | null): number | null =>
      m ? parseFloat(m[1].replace(/,/g, '')) : null;

    const profile: CompanyProfile = {
      symbol: symbol.toUpperCase(),
      name: nameMatch?.[1]?.trim() ?? `${symbol.toUpperCase()} Ltd`,
      sector: sectorMatch?.[1]?.trim() ?? 'Unknown',
      industry: sectorMatch?.[1]?.trim() ?? 'Unknown',
      exchange: 'NSE',
      description: `${nameMatch?.[1]?.trim() ?? symbol} is a listed Indian company. Data sourced from public filings.`,
      founded: null,
      employees: null,
      website: null,
      ceo: null,
      isin: null,
      currentPrice: parseNum(priceMatch),
      priceChange: null,
      priceChangeAbs: null,
      week52High: parseNum(weekHighMatch),
      week52Low: parseNum(weekLowMatch),
      avgVolume: null,
      promoterHolding: null,
      fiiHolding: null,
      diiHolding: null,
      publicHolding: null,
    };

    // Parse holding pattern
    const promoterMatch = html.match(/Promoter Holding[^0-9]*([\d\.]+)/);
    const fiiMatch = html.match(/FII Holding[^0-9]*([\d\.]+)/);
    const diiMatch = html.match(/DII Holding[^0-9]*([\d\.]+)/);
    if (promoterMatch) profile.promoterHolding = parseNum(promoterMatch);
    if (fiiMatch) profile.fiiHolding = parseNum(fiiMatch);
    if (diiMatch) profile.diiHolding = parseNum(diiMatch);

    // Parse revenue and profit from income table
    const revenueMatches = [...html.matchAll(/Net Sales[^₹\d]*([\d,]+)/g)];
    const patMatches = [...html.matchAll(/Net Profit[^₹\d]*([\d,]+)/g)];

    const financials: CompanyFinancials[] = [];
    for (let i = 0; i < Math.min(3, revenueMatches.length); i++) {
      financials.push({
        revenue: parseFloat(revenueMatches[i]?.[1]?.replace(/,/g, '') ?? '0') || null,
        pat: parseFloat(patMatches[i]?.[1]?.replace(/,/g, '') ?? '0') || null,
        ebitda: null,
        totalDebt: null,
        cashAndEquivalents: null,
        totalAssets: null,
        equity: null,
        revenueGrowthYoy: i > 0 && financials[i - 1]?.revenue
          ? ((parseFloat(revenueMatches[i]?.[1]?.replace(/,/g, '') ?? '0') - (financials[i - 1]?.revenue ?? 0)) / (financials[i - 1]?.revenue ?? 1)) * 100
          : null,
        patGrowthYoy: null,
        ebitdaMargin: null,
        netMargin: financials.length > 0 && financials[0]?.revenue
          ? (parseFloat(patMatches[i]?.[1]?.replace(/,/g, '') ?? '0') / (financials[0]?.revenue ?? 1)) * 100
          : null,
        roe: parseNum(roeMatch),
        roa: parseNum(roaMatch),
        debtToEquity: parseNum(debtMatch),
        currentRatio: parseNum(currentRatioMatch),
        interestCoverageRatio: null,
        year: `${2024 - i}`,
      });
    }

    const valuation: CompanyValuation = {
      marketCap: parseNum(mcapMatch),
      enterpriseValue: null,
      peRatio: parseNum(peMatch),
      pbRatio: parseNum(pbMatch),
      evEbitda: null,
      evRevenue: null,
      dividendYield: parseNum(dividendMatch),
      eps: null,
    };

    return { profile, financials, valuation, peers: [] };
  } catch {
    return null;
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ symbol: string }> },
) {
  const { symbol } = await params;

  if (!symbol || symbol.length > 20 || !/^[A-Za-z0-9&-]+$/.test(symbol)) {
    return NextResponse.json({ error: 'Invalid symbol' }, { status: 400 });
  }

  // Determine user plan
  const session = await auth();
  const plan = resolvePlan(session?.user as Parameters<typeof resolvePlan>[0]);
  const isPro = plan === 'PRO' || plan === 'ELITE' || plan === 'ENTERPRISE';
  const isElite = plan === 'ELITE' || plan === 'ENTERPRISE';

  // Try live data first
  let data = await fetchScreenerCompany(symbol);

  if (!data) {
    // Fall back to mock data structure
    const mock = buildMockReport(symbol);
    data = {
      profile: mock.profile,
      financials: mock.financials,
      valuation: mock.valuation,
      peers: mock.peers,
    };
  }

  const latestFinancials = data.financials[0] ?? null;
  const healthScore = calculateHealthScore(latestFinancials, data.valuation);

  // AI analysis: PRO+ only
  let aiAnalysis = null;
  if (isPro) {
    aiAnalysis = await generateAIAnalysis(
      data.profile,
      latestFinancials,
      data.valuation,
      healthScore,
    ).catch(() => null);
  }

  // DCF model: ELITE+ only
  let dcfData = null;
  if (isElite) {
    dcfData = generateDCFData(latestFinancials, data.valuation, data.profile);
  }

  const response = {
    profile: data.profile,
    // Free: only latest year | PRO: all 3 years
    financials: isPro ? data.financials : data.financials.slice(0, 1),
    latestFinancials,
    valuation: data.valuation,
    // Free: no peers | PRO: peers
    peers: isPro ? data.peers : [],
    healthScore,
    aiAnalysis,
    dcfData,
    userPlan: plan,
    fetchedAt: new Date().toISOString(),
  };

  return NextResponse.json(response, {
    headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' },
  });
}
