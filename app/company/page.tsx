import type { Metadata } from 'next';
import CompanySearchClient from './CompanySearchClient';

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
  return <CompanySearchClient />;
}
