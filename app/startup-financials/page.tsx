import type { Metadata } from 'next';
import { auth } from '@/auth';
import { resolvePlan } from '@/lib/entitlements';
import {
  calculateStartupModel,
  ARCHETYPE_CONFIG,
  type StartupInputs,
} from '@/lib/startup-financials-engine';
import StartupFinancialsClient from './StartupFinancialsClient';

export const metadata: Metadata = {
  title: 'Startup Financial Intelligence Suite | VC Financial Models | Kunwar Analytics',
  description:
    'Build VC-ready 3-statement financial models, runway projections, and unit economics in 10 minutes. Tailored for Indian startups with GST, TDS, and Ind AS benchmarks.',
  alternates: { canonical: '/startup-financials' },
  openGraph: {
    title: 'Startup Financial Intelligence Suite — Kunwar Analytics',
    description:
      'Generate institutional 3-year startup models, runway analysis, and VC pitch readiness scores. Built for Indian founders raising funding.',
    url: 'https://kunwaranalytics.in/startup-financials',
    type: 'website',
  },
};

export default async function StartupFinancialsPage() {
  const session = await auth().catch(() => null);
  const plan = resolvePlan(session?.user as Parameters<typeof resolvePlan>[0]);
  const isPaid = plan === 'PRO' || plan === 'ELITE' || plan === 'ENTERPRISE';

  // Default initial inputs: B2B SaaS
  const defaultInputs: StartupInputs = {
    companyName: 'NovaMetrics India',
    archetype: 'B2B_SAAS',
    stage: 'SEED',
    currency: 'INR',
    currentMonthlyRevenue: ARCHETYPE_CONFIG.B2B_SAAS.defaultInputs.currentMonthlyRevenue ?? 15,
    monthlyGrowthRate: ARCHETYPE_CONFIG.B2B_SAAS.defaultInputs.monthlyGrowthRate ?? 8,
    grossMarginPct: ARCHETYPE_CONFIG.B2B_SAAS.defaultInputs.grossMarginPct ?? 80,
    customerAcquisitionCost: ARCHETYPE_CONFIG.B2B_SAAS.defaultInputs.customerAcquisitionCost ?? 45000,
    averageOrderValue: ARCHETYPE_CONFIG.B2B_SAAS.defaultInputs.averageOrderValue ?? 120000,
    monthlyChurnPct: ARCHETYPE_CONFIG.B2B_SAAS.defaultInputs.monthlyChurnPct ?? 1.5,
    currentCashInBank: ARCHETYPE_CONFIG.B2B_SAAS.defaultInputs.currentCashInBank ?? 150,
    currentMonthlyBurn: ARCHETYPE_CONFIG.B2B_SAAS.defaultInputs.currentMonthlyBurn ?? 18,
    currentHeadcount: ARCHETYPE_CONFIG.B2B_SAAS.defaultInputs.currentHeadcount ?? 14,
    targetFundraiseAmount: ARCHETYPE_CONFIG.B2B_SAAS.defaultInputs.targetFundraiseAmount ?? 800,
    targetValuation: ARCHETYPE_CONFIG.B2B_SAAS.defaultInputs.targetValuation ?? 3500,
    esopPoolPct: ARCHETYPE_CONFIG.B2B_SAAS.defaultInputs.esopPoolPct ?? 10,
  };

  const initialModel = calculateStartupModel(defaultInputs);

  return (
    <StartupFinancialsClient
      initialModel={initialModel}
      userPlan={plan}
      isPaid={isPaid}
    />
  );
}
