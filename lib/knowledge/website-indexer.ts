// lib/knowledge/website-indexer.ts — Automated Website Knowledge Indexer
//
// Ingests approved platform pages, tools, PGDM curriculum, and research reports into
// the database KnowledgeDocument and KnowledgeChunk tables.

import 'server-only';
import { prisma } from '@/lib/prisma';
import { chunkDocument } from './chunker';
import { TOOLS } from '@/lib/tools-registry';
import { SUBJECTS } from '@/lib/pgdm/curriculum';
import { RESEARCH_COLLECTIONS } from '@/lib/research-collections';

interface IndexableItem {
  title: string;
  url: string;
  category: string;
  content: string;
  sourceType?: 'WEBSITE' | 'ADMIN_UPLOAD' | 'EXTERNAL_URL';
}

export class WebsiteKnowledgeIndexer {
  /**
   * Collects all approved static & dynamic content from the repository.
   */
  getApprovedSiteCatalog(): IndexableItem[] {
    const items: IndexableItem[] = [
      {
        title: 'Kunwar Analytics — Global Financial Market Terminal & Research Platform',
        url: '/',
        category: 'general',
        content: `Kunwar Analytics is an institutional-grade financial intelligence, research, and learning platform.
It combines global market depth, Indian equity analysis, interactive financial models, algorithmic screeners, and professional financial education.
Platform features include: Markets Terminal, Company Intelligence, Placement Day War Room 2.0, Research Hub, Tools & Calculators Lab, and PGDM Curriculum.
Domain: https://kunwaranalytics.in.`,
      },
      {
        title: 'Placement Day War Room 2.0 — AI Finance Placement Operating System',
        url: '/placement-day-war-room',
        category: 'placement',
        content: `Placement Day War Room 2.0 is an AI-powered operating system for finance placement preparation.
It covers 6 intensive interview rounds: HR Screening, Technical Finance (DCF, LBO, 3-Statement Modeling, WACC), Financial Modeling & Valuation, Behavioral & Leadership, Macro & Market Awareness, and Partner / MD Case Round.
Features: 500+ Indian finance interview question bank, real-time rubric-based AI scoring, career coach workstation, and interactive finance simulation labs.`,
      },
      {
        title: 'Company Intelligence — Institutional Equity & Fundamental Analysis',
        url: '/company-intelligence',
        category: 'company-intelligence',
        content: `Company Intelligence provides automated fundamental analysis of Indian listed companies.
Includes: DuPont Analysis (3-stage and 5-stage ROE decomposition), Altman Z-score bankruptcy risk rating, Beneish M-score earnings manipulation detection, DCF intrinsic valuation models, peer comparison, and structured analyst intelligence reports.`,
      },
      {
        title: 'Markets Terminal — Global & Indian Equity, Debt and Macro Terminal',
        url: '/markets',
        category: 'markets',
        content: `Markets Terminal provides comprehensive multi-asset coverage across Indian (Nifty 50, Sensex, Bank Nifty, Midcap 100) and Global markets (S&P 500, Nasdaq 100, FTSE, Nikkei).
Features include real-time ticker bar, interactive candlestick charting with technical indicators (RSI, MACD, Bollinger Bands), sectoral heatmaps, FII/DII institutional flows, Indian 10Y G-Sec yield, and corporate earnings calendar.`,
      },
    ];

    // Ingest Tools & Calculators
    for (const tool of TOOLS) {
      items.push({
        title: `${tool.title} — Financial Calculator & Analytical Tool`,
        url: `/tools/${tool.slug}`,
        category: 'tools',
        content: `Tool Name: ${tool.title} (${tool.slug}).
Category: ${tool.category}. Difficulty: ${tool.difficulty}.
Description: ${tool.desc}
Features Included: ${tool.includes.join('; ')}.`,
      });
    }

    // Ingest PGDM Curriculum Modules
    for (const sub of SUBJECTS) {
      items.push({
        title: `${sub.name} — Institutional Curriculum (${sub.code})`,
        url: `/learn#${sub.slug}`,
        category: 'pgdm',
        content: `Module: ${sub.name} (Code: ${sub.code}, Track: ${sub.track}).
Description: ${sub.description || 'Institutional PGDM finance and analytics course.'}.`,
      });
    }

    // Ingest Research Collections & Reports
    for (const [slug, col] of Object.entries(RESEARCH_COLLECTIONS)) {
      items.push({
        title: `${col.title} — Research Hub Collection`,
        url: `/research#${slug}`,
        category: 'research',
        content: `Research Series: ${col.title}.
Description: ${col.description}.
Topic: ${slug}.`,
      });
    }

    return items;
  }

  /**
   * Indexes or updates all catalog items in PostgreSQL
   */
  async indexAllWebsiteContent(): Promise<{ totalIndexed: number; totalChunks: number }> {
    const catalog = this.getApprovedSiteCatalog();
    let totalChunks = 0;

    for (const item of catalog) {
      // Upsert KnowledgeDocument
      const existingDoc = await prisma.knowledgeDocument.findFirst({
        where: { sourceUrl: item.url },
      });

      let docId: string;

      if (existingDoc) {
        docId = existingDoc.id;
        await prisma.knowledgeDocument.update({
          where: { id: docId },
          data: {
            title: item.title,
            category: item.category,
            content: item.content,
            status: 'INDEXED',
            lastIndexedAt: new Date(),
          },
        });
        // Clear previous chunks to re-chunk cleanly
        await prisma.knowledgeChunk.deleteMany({
          where: { documentId: docId },
        });
      } else {
        const created = await prisma.knowledgeDocument.create({
          data: {
            title: item.title,
            sourceUrl: item.url,
            sourceType: item.sourceType || 'WEBSITE',
            category: item.category,
            content: item.content,
            status: 'INDEXED',
            lastIndexedAt: new Date(),
          },
        });
        docId = created.id;
      }

      // Generate Chunks
      const chunks = chunkDocument(item.title, item.content, { maxChunkLength: 700 });
      for (const ch of chunks) {
        await prisma.knowledgeChunk.create({
          data: {
            documentId: docId,
            chunkIndex: ch.chunkIndex,
            title: ch.title,
            content: ch.content,
            tokenCount: ch.approxTokenCount,
          },
        });
        totalChunks++;
      }
    }

    return { totalIndexed: catalog.length, totalChunks };
  }
}

export const websiteKnowledgeIndexer = new WebsiteKnowledgeIndexer();
