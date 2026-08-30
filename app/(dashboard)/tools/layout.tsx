import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Financial & Analytics Calculators — Free Interactive Tools' },
  description: '16 free interactive calculators: DCF valuation, WACC, ratio analysis, time-value, portfolio risk, critical path, market sizing and more — no signup needed.',
  alternates: { canonical: '/tools' },
  openGraph: {
      images: ['/og/default.png'],
    title: 'Financial & Analytics Calculators — Kunwar Analytics',
    description:
      '16 free interactive calculators: DCF, WACC, ratios, time-value, portfolio risk, CPM and more.',
    url: 'https://kunwaranalytics.in/tools',
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
