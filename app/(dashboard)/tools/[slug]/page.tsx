import { notFound } from 'next/navigation';
import Image from 'next/image';
import { auth } from '@/auth';
import { hasPremiumAccess } from '@/lib/utils';

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
  
  const isPremiumUser = hasPremiumAccess(session?.user || {});

  // Select Hero Image
  let heroImg = '/card-valuation-3d.png';
  if (['crypto-tokenomics-model'].includes(slug)) heroImg = '/card-web3-3d.png';
  if (['saas-ltv-cac-model', 'ai-agent-roi-calculator', 'b2b-enterprise-marketing-roi', 'q-commerce-model'].includes(slug)) heroImg = '/card-saas-3d.png';

  let Component;
  if (slug === 'saas-ltv-cac-model') Component = <SaaSCalc slug={slug} isPremiumUser={isPremiumUser} />;
  else if (slug === 'ai-agent-roi-calculator') Component = <AiRoiCalc slug={slug} isPremiumUser={isPremiumUser} />;
  else if (slug === 'b2b-enterprise-marketing-roi') Component = <B2BMarketingCalc slug={slug} isPremiumUser={isPremiumUser} />;
  else if (slug === 'dcf-valuation-model') Component = <DcfCalc slug={slug} isPremiumUser={isPremiumUser} />;
  else if (slug === 'crypto-tokenomics-model') Component = <CryptoTokenomicsCalc slug={slug} isPremiumUser={isPremiumUser} />;
  else if (slug === 'cca-valuation') Component = <CcaValuationCalc slug={slug} isPremiumUser={isPremiumUser} />;
  else if (slug === '3-statement-model') Component = <ThreeStatementCalc slug={slug} isPremiumUser={isPremiumUser} />;
  else if (slug === 'q-commerce-model') Component = <QCommerceCalc slug={slug} isPremiumUser={isPremiumUser} />;
  else if (slug === 'market-sizing-framework') Component = <MarketSizingCalc slug={slug} isPremiumUser={isPremiumUser} />;
  else if (slug === 'porters-five-forces') Component = <PortersFiveForcesCalc slug={slug} isPremiumUser={isPremiumUser} />;
  else notFound();

  return (
    <div className="w-full flex flex-col min-h-screen relative bg-[#faf9f6] dark:bg-[#0a1120]">
       {/* 3D Hero Banner */}
       <div className="relative w-full h-48 md:h-64 border-b border-gray-200 dark:border-slate-800/50 overflow-hidden">
          <Image src={heroImg} alt={slug} fill className="object-cover opacity-90 dark:opacity-70 dark:mix-blend-lighten mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] dark:from-[#0a1120] to-transparent" />
       </div>
       
       {/* Calculator Component */}
       <div className="-mt-16 z-10 relative">
          {Component}
       </div>
    </div>
  );
}
