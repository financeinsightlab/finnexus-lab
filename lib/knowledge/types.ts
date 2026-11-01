// lib/knowledge/types.ts — Central Knowledge Engine Types

export type KnowledgeSourceType =
  | 'WEBSITE'
  | 'ADMIN_UPLOAD'
  | 'EXTERNAL_URL'
  | 'MANUAL_ENTRY'
  | 'LIVE_APP_DATA';

export interface KnowledgeChunkRecord {
  id: string;
  documentId: string;
  chunkIndex: number;
  title: string;
  content: string;
  tokenCount?: number | null;
  metadata?: Record<string, unknown> | null;
  score?: number;
}

export interface RetrievalQuery {
  question: string;
  category?: string;
  limit?: number;
  minScore?: number;
  preferRecent?: boolean;
}

export interface GroundedCitation {
  index: number;
  title: string;
  url: string;
  snippet: string;
  sourceType: KnowledgeSourceType;
  score: number;
}

export interface LiveMarketDataSnippet {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
  source: string;
}

