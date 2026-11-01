import type { Metadata } from 'next';
import { auth } from '@/auth';
import { resolvePlan } from '@/lib/entitlements';
import PricingClient from '@/components/pricing/PricingClient';
import CompanySubNav from '@/components/hub-navigation/CompanySubNav';

export const metadata: Metadata = {
  title: 'Pricing & Plans | Kunwar Analytics',
  description:
    'Subscribe to Kunwar Analytics Pro & Elite. Get institutional-grade Indian company intelligence, AI financial modeling studio, and finance interview coaching at ₹999/month.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing & Plans — Kunwar Analytics',
    description:
      'India’s Bloomberg Terminal at ₹999/month. AI company intelligence, automated DCF modeling, and finance interview coaching.',
    url: 'https://kunwaranalytics.in/pricing',
    type: 'website',
  },
};

export default async function PricingPage() {
  const session = await auth().catch(() => null);
  const currentPlan = resolvePlan(session?.user as Parameters<typeof resolvePlan>[0]);

  return (
    <>
      <CompanySubNav
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Company', href: '/about' },
          { label: 'Pricing Plans', href: '/pricing' },
        ]}
        title="Institutional Plans & Pricing"
        subtitle="Transparent subscription tiers for individuals, analysts, and enterprise finance teams."
        badge="SUBSCRIPTION TIERS"
      />
      <PricingClient currentPlan={currentPlan} signedIn={Boolean(session?.user)} />
    </>
  );
}
