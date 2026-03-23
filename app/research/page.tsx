// FILE: app/research/page.tsx
import { getAllResearch } from '@/lib/content';
import ResearchClient from '../../components/research/ResearchClient';

export default function ResearchPage() {
  const allPosts = getAllResearch();
  return <ResearchClient posts={allPosts} />;
}