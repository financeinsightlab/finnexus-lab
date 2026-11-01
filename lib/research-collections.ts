// lib/research-collections.ts — Shared Research Collections & Taxonomy (Client & Server Safe)
import type { ResearchPost } from '@/types';

export type ReviewClassification =
  | 'Editorially Reviewed'
  | 'Quantitative Model Verified'
  | 'Expert Reviewed'
  | 'Published Without External Review';

export interface UnifiedResearchReport extends ResearchPost {
  source: 'mdx' | 'cms' | 'hybrid';
  collectionSlug: string;
  collectionTitle: string;
  wordCount: number;
  estimatedPages: number;
  reviewStatus: ReviewClassification;
  updatedAt?: string;
  excerpt: string;
  isPublished: boolean;
}

export const RESEARCH_COLLECTIONS: Record<string, { title: string; description: string; icon: string }> = {
  'macro-economy': {
    title: 'Indian Economy & Macroeconomics',
    description: 'Monetary policy, RBI liquidity frameworks, sovereign bond yields, and balance of payments.',
    icon: '🏛️',
  },
  'banking-bfsi': {
    title: 'Banking & Financial Services',
    description: 'NIM dynamics, asset quality cycles, retail credit expansion, and regulatory capital buffers.',
    icon: '🏦',
  },
  'fintech-payments': {
    title: 'Fintech & Digital Payments',
    description: 'UPI rails, digital lending FLDG guidelines, payment aggregators, and credit card unit economics.',
    icon: '💳',
  },
  'quick-commerce': {
    title: 'Quick Commerce & Consumer Internet',
    description: 'Dark store geometry, micro-fulfillment efficiency, SKU velocity, and delivery rider economics.',
    icon: '⚡',
  },
  'tech-ai': {
    title: 'Technology & Artificial Intelligence',
    description: 'Enterprise generative AI deployment, data center power constraints, and GPU compute clusters.',
    icon: '🤖',
  },
  'semiconductors': {
    title: 'Semiconductors & Deep Tech',
    description: 'Fab economics, OSAT packaging, ATMP capex, and semiconductor mission supply chain resilience.',
    icon: '🔬',
  },
  'energy-climate': {
    title: 'Energy & Sustainability',
    description: 'Green hydrogen levelized costs, electrolyzer parity, utility-scale solar, and grid battery storage.',
    icon: '⚡',
  },
  'infrastructure': {
    title: 'Infrastructure & Real Estate',
    description: 'Data center parks, high-speed logistics corridors, highway monetization, and REIT valuations.',
    icon: '🏗️',
  },
  'private-markets': {
    title: 'Private Equity & Private Credit',
    description: 'Performing direct lending, structured promoter debt, buyout multiples, and mezzanine yields.',
    icon: '📈',
  },
  'mobility-ev': {
    title: 'Automotive & Mobility',
    description: 'EV 2W/3W penetration, battery cell chemistries (LFP vs NMC), and commercial fleet TCO parity.',
    icon: '🚗',
  },
  'defence-aerospace': {
    title: 'Defence & Aerospace',
    description: 'DAP indigenisation lists, defence export targets, and DPSU order book revenue visibility.',
    icon: '🛡️',
  },
};

/** Map sector names to standard collection slugs */
export function mapSectorToCollection(sector: string): string {
  const lower = sector.toLowerCase();
  if (lower.includes('quick commerce') || lower.includes('e-commerce') || lower.includes('consumer')) return 'quick-commerce';
  if (lower.includes('semiconductor') || lower.includes('deep tech')) return 'semiconductors';
  if (lower.includes('defence') || lower.includes('aerospace')) return 'defence-aerospace';
  if (lower.includes('data center') || lower.includes('ai') || lower.includes('artificial intelligence') || lower.includes('technology')) return 'tech-ai';
  if (lower.includes('energy') || lower.includes('hydrogen') || lower.includes('renewable')) return 'energy-climate';
  if (lower.includes('credit') || lower.includes('private equity') || (lower.includes('lending') && lower.includes('private'))) return 'private-markets';
  if (lower.includes('fintech') || lower.includes('payment') || lower.includes('banking') || lower.includes('bfsi')) return 'fintech-payments';
  if (lower.includes('mobility') || lower.includes('ev') || lower.includes('electric') || lower.includes('battery')) return 'mobility-ev';
  if (lower.includes('macro') || lower.includes('liquidity') || lower.includes('rate') || lower.includes('economy')) return 'macro-economy';
  if (lower.includes('infrastructure') || lower.includes('real estate')) return 'infrastructure';
  return 'macro-economy';
}

