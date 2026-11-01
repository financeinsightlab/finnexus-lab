import type { Metadata } from 'next';
import CompanySearchClient from './CompanySearchClient';
import ToolsSubNav from '@/components/hub-navigation/ToolsSubNav';

export const metadata: Metadata = {
  title: 'India Company Intelligence Hub | Kunwar Analytics',
  description: 'Search any NSE/BSE listed company. Get AI-powered financial analysis, health scores, DCF models, and peer comparisons. The Bloomberg Terminal for Indian investors — at ₹999/month.',
  alternates: { canonical: '/company' },
  openGraph: {
    title: 'India Company Intelligence Hub — Kunwar Analytics',
    description: 'AI-powered financial analysis for every NSE/BSE listed company. Health scores, investment thesis, DCF models, peer comparisons.',
    url: 'https://kunwaranalytics.in/company',
    type: 'website',
  },
};

export default function CompanySearchPage() {
  return (
    <>
      <ToolsSubNav
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Company Intelligence', href: '/company' },
        ]}
        title="India Company Intelligence Platform"
        subtitle="Search any NSE/BSE listed firm for institutional health scores, DCF sensitivity, and AI thesis generation."
        badge="COMPANY INTELLIGENCE"
      />
      <CompanySearchClient />
    </>
  );
}
