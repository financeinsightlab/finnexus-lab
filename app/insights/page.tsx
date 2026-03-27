// FILE: app/insights/page.tsx
import type { Metadata } from 'next';
import { getAllInsights } from '@/lib/content';
import InsightsClient from '../../components/insights/InsightsClient';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Timely market analysis, strategic commentary, and data-driven perspectives on Indian business sectors.',
};

export default function InsightsPage() {
  const allPosts = getAllInsights();
  return <InsightsClient posts={allPosts} />;
}