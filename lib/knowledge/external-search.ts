// lib/knowledge/external-search.ts — Configurable External Web Intelligence
//
// Grounding source for questions requiring current external or broader market facts.

import 'server-only';
import type { GroundedCitation } from './types';

export interface ExternalSearchResult {
  evidencePassages: Array<{
    index: number;
    title: string;
    url: string;
    snippet: string;
    sourceType: 'EXTERNAL_URL';
  }>;
  query: string;
  sourceCount: number;
}

export class ExternalKnowledgeSearch {
  async search(query: string, limit: number = 3): Promise<ExternalSearchResult> {
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      return { evidencePassages: [], query: '', sourceCount: 0 };
    }

    // Configurable external search endpoint (SerpAPI, Tavily, Google Custom Search, or mockable provider)
    const customEndpoint = process.env.EXTERNAL_SEARCH_ENDPOINT;
    const searchApiKey = process.env.EXTERNAL_SEARCH_API_KEY;

    if (customEndpoint && searchApiKey) {
      try {
        const res = await fetch(customEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${searchApiKey}`,
          },
          body: JSON.stringify({ query: cleanQuery, num: limit }),
          signal: AbortSignal.timeout(8000),
        });

        if (res.ok) {
          const data = (await res.json()) as { results?: Array<{ title: string; url: string; content?: string }> };
          if (Array.isArray(data.results)) {
            const passages = data.results.slice(0, limit).map((r, i) => ({
              index: i + 1,
              title: r.title || 'External Source',
              url: r.url || 'https://external.source',
              snippet: (r.content || '').slice(0, 300),
              sourceType: 'EXTERNAL_URL' as const,
            }));
            return { evidencePassages: passages, query: cleanQuery, sourceCount: passages.length };
          }
        }
      } catch (err) {
        console.warn('[ExternalSearch] Search endpoint failed, falling back:', err);
      }
    }

    // Grounded fallback for broad financial queries when external search is not explicitly wired
    return {
      evidencePassages: [],
      query: cleanQuery,
      sourceCount: 0,
    };
  }
}

export const externalKnowledgeSearch = new ExternalKnowledgeSearch();

