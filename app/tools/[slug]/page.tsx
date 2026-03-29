import { notFound } from 'next/navigation';
import { auth } from '@/auth';

import SaaSCalc from '@/components/calculators/SaaSCalc';
import AiRoiCalc from '@/components/calculators/AiRoiCalc';
import B2BMarketingCalc from '@/components/calculators/B2BMarketingCalc';
import DcfCalc from '@/components/calculators/DcfCalc';
import CryptoTokenomicsCalc from '@/components/calculators/CryptoTokenomicsCalc';
import CcaValuationCalc from '@/components/calculators/CcaValuationCalc';
import ThreeStatementCalc from '@/components/calculators/ThreeStatementCalc';
import QCommerceCalc from '@/components/calculators/QCommerceCalc';
import MarketSizingCalc from '@/components/calculators/MarketSizingCalc';
import PortersFiveForcesCalc from '@/components/calculators/PortersFiveForcesCalc';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();
  
  const isPremiumUser = 
    session?.user?.role === 'ADMIN' || 
    ['PRO', 'ELITE', 'TEAM', 'PROFESSIONAL', 'ENTERPRISE', 'API_ONLY'].includes(session?.user?.subscriptionPlan || '');

  if (slug === 'saas-ltv-cac-model') return <SaaSCalc slug={slug} isPremiumUser={isPremiumUser} />;
  if (slug === 'ai-agent-roi-calculator') return <AiRoiCalc slug={slug} isPremiumUser={isPremiumUser} />;
  if (slug === 'b2b-enterprise-marketing-roi') return <B2BMarketingCalc slug={slug} isPremiumUser={isPremiumUser} />;
  if (slug === 'dcf-valuation-model') return <DcfCalc slug={slug} isPremiumUser={isPremiumUser} />;
  if (slug === 'crypto-tokenomics-model') return <CryptoTokenomicsCalc slug={slug} isPremiumUser={isPremiumUser} />;
  if (slug === 'cca-valuation') return <CcaValuationCalc slug={slug} isPremiumUser={isPremiumUser} />;
  if (slug === '3-statement-model') return <ThreeStatementCalc slug={slug} isPremiumUser={isPremiumUser} />;
  if (slug === 'q-commerce-model') return <QCommerceCalc slug={slug} isPremiumUser={isPremiumUser} />;
  if (slug === 'market-sizing-framework') return <MarketSizingCalc slug={slug} isPremiumUser={isPremiumUser} />;
  if (slug === 'porters-five-forces') return <PortersFiveForcesCalc slug={slug} isPremiumUser={isPremiumUser} />;

  // Unknown slug — 404
  notFound();
}
