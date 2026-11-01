// lib/knowledge/retrieval.ts — Hybrid Knowledge Retrieval Engine
//
// Combines:
// 1. Database-backed grounded chunk retrieval
// 2. Page context prioritisation (e.g. user is on a specific calculator or research paper)
// 3. Live market data connector
// 4. External web search for broader queries

import 'server-only';
import { prisma } from '@/lib/prisma';
import { liveDataConnectors } from './live-connectors';
import { externalKnowledgeSearch } from './external-search';
import { websiteKnowledgeIndexer } from './website-indexer';
import type { GroundedCitation, KnowledgeSourceType } from './types';

export interface RetrievedPassage {
  index: number;
  title: string;
  url: string;
  snippet: string;
  sourceType: KnowledgeSourceType;
  score: number;
}

export interface RetrievalResponse {
  passages: RetrievedPassage[];
  liveMarketContext?: string;
  usedExternalSearch: boolean;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

export class KnowledgeRetrievalEngine {
  async retrieve(
    query: string,
    options: {
      category?: string;
      limit?: number;
      pageUrl?: string;
      pageContextTitle?: string;
    } = {}
  ): Promise<RetrievalResponse> {
    const limit = options.limit ?? 6;
    const queryTokens = tokenize(query);

    // 1. Check live market connector
    let liveMarketContext: string | undefined;
    if (liveDataConnectors.isLiveMarketQuery(query)) {
      const snippets = await liveDataConnectors.getLatestMarketObservations();
      liveMarketContext = liveDataConnectors.buildLiveMarketContext(snippets);
    }

    // 2. Fetch candidate chunks from DB
    let chunksWithDocs = await prisma.knowledgeChunk.findMany({
      take: 80,
      include: {
        document: {
          select: {
            title: true,
            sourceUrl: true,
            sourceType: true,
            category: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // If DB is empty, run instant seed from site catalog
    if (chunksWithDocs.length === 0) {
      await websiteKnowledgeIndexer.indexAllWebsiteContent();
      chunksWithDocs = await prisma.knowledgeChunk.findMany({
        take: 80,
        include: {
          document: {
            select: {
              title: true,
              sourceUrl: true,
              sourceType: true,
              category: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    // 3. Score candidates
    const scoredChunks: Array<{
      chunk: typeof chunksWithDocs[0];
      score: number;
    }> = [];

    for (const item of chunksWithDocs) {
      let score = 0;
      const titleLower = (item.title + ' ' + item.document.title).toLowerCase();
      const contentLower = item.content.toLowerCase();

      // Page context boost
      if (options.pageUrl && item.document.sourceUrl && item.document.sourceUrl.includes(options.pageUrl)) {
        score += 15.0;
      }
      if (options.pageContextTitle && titleLower.includes(options.pageContextTitle.toLowerCase())) {
        score += 10.0;
      }

      // Keyword match scoring
      for (const token of queryTokens) {
        if (titleLower.includes(token)) {
          score += 4.0;
        }
        if (contentLower.includes(token)) {
          score += 1.5;
        }
      }

      // Category matching
      if (options.category && item.document.category === options.category) {
        score += 2.0;
      }

      if (score > 0) {
        scoredChunks.push({ chunk: item, score });
      }
    }

    // Sort descending by score
    scoredChunks.sort((a, b) => b.score - a.score);

    // Dedup by URL & title to ensure diversity
    const seenUrls = new Set<string>();
    const passages: RetrievedPassage[] = [];
    let idx = 1;

    for (const item of scoredChunks.slice(0, limit)) {
      const url = item.chunk.document.sourceUrl || `/knowledge/${item.chunk.documentId}`;
      if (!seenUrls.has(url) || passages.length < 3) {
        seenUrls.add(url);
        passages.push({
          index: idx++,
          title: item.chunk.title || item.chunk.document.title,
          url,
          snippet: item.chunk.content.slice(0, 320),
          sourceType: (item.chunk.document.sourceType as KnowledgeSourceType) || 'WEBSITE',
          score: item.score,
        });
      }
    }

    // 4. Fallback to external search if insufficient internal passages found
    let usedExternal = false;
    if (passages.length < 2) {
      const externalResult = await externalKnowledgeSearch.search(query, 3);
      if (externalResult.evidencePassages.length > 0) {
        usedExternal = true;
        for (const ext of externalResult.evidencePassages) {
          passages.push({
            index: idx++,
            title: ext.title,
            url: ext.url,
            snippet: ext.snippet,
            sourceType: 'EXTERNAL_URL',
            score: 0.8,
          });
        }
      }
    }

    return {
      passages: passages.slice(0, limit),
      liveMarketContext,
      usedExternalSearch: usedExternal,
    };
  }
}

export const knowledgeRetrieval = new KnowledgeRetrievalEngine();

