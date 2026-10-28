import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { resolvePlan } from '@/lib/entitlements';
import {
  calculateHealthScore,
  generateAIAnalysis,
  generateDCFData,
  buildMockReport,
  type CompanyIntelligenceReport,
} from '@/lib/company-intelligence';
import CompanyIntelligenceClient from './CompanyIntelligenceClient';

interface Props {
  params: Promise<{ symbol: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params;
  const upper = symbol.toUpperCase();
  return {
    title: `${upper} — Company Intelligence | Kunwar Analytics`,
    description: `AI-powered financial analysis for ${upper}. Financial health score, investment thesis, DCF model, peer comparison. India's Bloomberg Terminal at ₹999/month.`,
    alternates: { canonical: `/company/${upper}` },
    openGraph: {
      title: `${upper} Company Intelligence — Kunwar Analytics`,
      description: `Instant AI analysis of ${upper}: health score, bull/bear case, DCF model, peer comparison.`,
      url: `https://kunwaranalytics.in/company/${upper}`,
    },
  };
}

async function fetchCompanyReport(symbol: string, isPro: boolean, isElite: boolean): Promise<CompanyIntelligenceReport | null> {
  try {
    // Try to fetch from our own API route (handles Screener scraping)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/company/${symbol}`, {
      next: { revalidate: 1800 },
    });

    if (res.ok) {
      return await res.json() as CompanyIntelligenceReport;
    }
  } catch {
    // Fall through to mock
  }

  // Build mock report as fallback
  return buildMockReport(symbol);
}

export default async function CompanyPage({ params }: Props) {
  const { symbol } = await params;

  // Validate symbol
  if (!symbol || symbol.length > 20 || !/^[A-Za-z0-9&-]+$/.test(symbol)) {
    notFound();
  }

  const upper = symbol.toUpperCase();

  // Get user plan
  const session = await auth();
  const plan = resolvePlan(session?.user as Parameters<typeof resolvePlan>[0]);
  const isPro = plan === 'PRO' || plan === 'ELITE' || plan === 'ENTERPRISE';
  const isElite = plan === 'ELITE' || plan === 'ENTERPRISE';

  // Build the report directly (server-side, no extra network hop)
  const mock = buildMockReport(upper);
  const latestFin = mock.financials[0] ?? null;
  const healthScore = calculateHealthScore(latestFin, mock.valuation);

  let aiAnalysis = null;
  if (isPro) {
    aiAnalysis = await generateAIAnalysis(mock.profile, latestFin, mock.valuation, healthScore).catch(() => null);
  }

  const dcfData = isElite ? generateDCFData(latestFin, mock.valuation, mock.profile) : null;

  const report: CompanyIntelligenceReport = {
    ...mock,
    healthScore,
    aiAnalysis,
    dcfData,
    userPlan: plan,
  };

  return <CompanyIntelligenceClient report={report} />;
}
