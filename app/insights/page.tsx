// FILE: app/insights/page.tsx
import { getAllInsights } from '@/lib/content';
import InsightsClient from '../../components/insights/InsightsClient';

export default function InsightsPage() {
  const allPosts = getAllInsights();
  return <InsightsClient posts={allPosts} />;
}