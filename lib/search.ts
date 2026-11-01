// lib/search.ts — unified, server-side search facade
//
// Historically search was split three ways: Algolia (research), a static
// client-side filter, and `contains` queries in lib/study.ts. This module gives
// every content type ONE entry point so a single search box can cover the whole
// site. It is intentionally dependency-light and safe to call from a server
// component, route handler or server action.
//
// Algolia can stay as the public-facing instant-search UX; this facade is the
// canonical aggregator (and the API behind it) so nothing is invisible.

import {
    getAllResearch,
    getAllInsights,
    getAllDataLab,
    getAllCaseStudies,
    getAllPodcastEpisodes,
} from '@/lib/content';
import { SUBJECTS } from '@/lib/pgdm/curriculum';
import { TOOLS } from '@/lib/tools-registry';
import { getPublishedStudyMaterials } from '@/lib/study';
import { getFinanceTermIndex } from '@/lib/finance-terms';
import { logger } from '@/lib/logger';
import { tokenize } from '@/lib/search-utils';
import { contentFields, hybridScore } from '@/lib/search-hybrid';

export type SearchKind =
    | 'research'
    | 'insight'
    | 'data-lab'
    | 'case-study'
    | 'podcast'
    | 'pgdm-subject'
    | 'pgdm-lecture'
    | 'tool'
    | 'study'
    | 'finance-term'
    | 'market';

export interface SearchItem {
    kind: SearchKind;
    title: string;
    description: string;
    url: string;
    tags: string[];
    score: number;
}

export interface SearchGroup {
    kind: SearchKind;
    label: string;
    items: SearchItem[];
}

export interface SearchResult {
    query: string;
    total: number;
    groups: SearchGroup[];
}

const KIND_LABELS: Record<SearchKind, string> = {
    research: 'Research',
    insight: 'Insights',
    'data-lab': 'Data Lab',
    'case-study': 'Case Studies',
    podcast: 'Podcast',
    'pgdm-subject': 'PGDM Subjects',
    'pgdm-lecture': 'PGDM Lectures',
    tool: 'Tools & Models',
    study: 'Study Material',
    'finance-term': 'Finance Terms',
    market: 'Markets & Intelligence',
};

/**
 * Build a searchable item, dropping it when it does not match the query.
 *
 * Ranking uses the Pillar B2 hybrid scorer: field-weighted (title > tags >
 * body) with a specificity bonus, and a drop-in seam for vector scores. It is
 * lexical-only here, so search stays free and works with no embedding keys.
 */
function makeItem(
    base: Omit<SearchItem, 'score'>,
    tokens: string[],
): SearchItem | null {
    const s = hybridScore(tokens, contentFields(base.title, base.description, base.tags));
    return s > 0 ? { ...base, score: s } : null;
}

function collectStatic(tokens: string[]): SearchItem[] {
    const items: SearchItem[] = [];

    const push = (item: SearchItem | null) => {
        if (item) items.push(item);
    };

    for (const post of getAllResearch()) {
        push(
            makeItem(
                {
                    kind: 'research',
                    title: post.title,
                    description: post.summary ?? '',
                    url: `/research/${post.slug}`,
                    tags: [...(post.tags ?? []), post.sector].filter(Boolean) as string[],
                },
                tokens,
            ),
        );
    }

    for (const post of getAllInsights()) {
        push(
            makeItem(
                {
                    kind: 'insight',
                    title: post.title,
                    description: post.thesis ?? '',
                    url: `/insights/${post.slug}`,
                    tags: [...(post.tags ?? []), post.category].filter(Boolean) as string[],
                },
                tokens,
            ),
        );
    }

    for (const project of getAllDataLab()) {
        push(
            makeItem(
                {
                    kind: 'data-lab',
                    title: project.title,
                    description: project.businessQuestion ?? project.summary ?? '',
                    url: `/data-lab/${project.slug}`,
                    tags: [...(project.tools ?? []), project.sector].filter(Boolean) as string[],
                },
                tokens,
            ),
        );
    }

    for (const study of getAllCaseStudies()) {
        push(
            makeItem(
                {
                    kind: 'case-study',
                    title: study.title,
                    description: study.outcome ?? '',
                    url: `/case-studies/${study.slug}`,
                    tags: [
                        ...(study.tags ?? []),
                        study.clientType,
                        study.engagementType,
                        study.industry,
                    ].filter(Boolean) as string[],
                },
                tokens,
            ),
        );
    }

    for (const episode of getAllPodcastEpisodes()) {
        push(
            makeItem(
                {
                    kind: 'podcast',
                    title: episode.title,
                    description: episode.description ?? '',
                    url: `/podcast/${episode.slug}`,
                    tags: [episode.format, ...(episode.tags ?? [])].filter(Boolean) as string[],
                },
                tokens,
            ),
        );
    }

    for (const subject of SUBJECTS) {
        push(
            makeItem(
                {
                    kind: 'pgdm-subject',
                    title: subject.name,
                    description: subject.tagline ?? subject.description ?? '',
                    url: `/pgdm/${subject.slug}`,
                    tags: [subject.code, subject.track].filter(Boolean) as string[],
                },
                tokens,
            ),
        );

        for (const lecture of subject.lectures) {
            push(
                makeItem(
                    {
                        kind: 'pgdm-lecture',
                        title: `${subject.name} · ${lecture.title}`,
                        description: lecture.summary ?? '',
                        url: `/pgdm/${subject.slug}/${lecture.slug}`,
                        tags: [subject.code, subject.track].filter(Boolean) as string[],
                    },
                    tokens,
                ),
            );
        }
    }

    for (const tool of TOOLS) {
        push(
            makeItem(
                {
                    kind: 'tool',
                    title: tool.title,
                    description: tool.desc ?? '',
                    url: `/tools/${tool.slug}`,
                    tags: [tool.category, tool.tool, tool.difficulty].filter(Boolean) as string[],
                },
                tokens,
            ),
        );
    }

    const STATIC_MARKET_DESTINATIONS: Array<{ title: string; description: string; url: string; tags: string[] }> = [
        { title: 'Global Financial Market Terminal', description: 'Institutional multi-asset terminal covering indices, currencies, commodities, and yields', url: '/markets', tags: ['terminal', 'markets', 'indices', 'overview', 'global'] },
        { title: 'Indian Equities & Benchmarks', description: 'NIFTY 50, SENSEX, sectoral indices, market breadth, and top gainers/losers', url: '/markets/india', tags: ['india', 'nifty', 'sensex', 'nse', 'bse', 'equities'] },
        { title: 'Institutional Stock Screener', description: 'Screen equities across valuation, PE ratio, ROE, leverage, and margins', url: '/markets/stocks', tags: ['screener', 'stocks', 'filter', 'pe', 'valuation', 'ratios'] },
        { title: 'Visual Sector Heatmap', description: 'Market-cap weighted visual performance heatmap across Indian market sectors', url: '/markets/sector-heatmap', tags: ['heatmap', 'sectors', 'market-cap', 'performance', 'visual'] },
        { title: 'Forex & Currency Matrix', description: 'Global FX rates, USD/INR, EUR/INR, and cross-currency matrix', url: '/markets/forex', tags: ['forex', 'currency', 'usd-inr', 'exchange', 'fx'] },
        { title: 'Commodities & Energy Board', description: 'Gold, silver, Brent crude oil, natural gas, and precious metals prices', url: '/markets/commodities', tags: ['commodities', 'gold', 'silver', 'crude', 'oil', 'natural gas'] },
        { title: 'Sovereign Bonds & Yield Curves', description: 'Indian 10-Year G-Sec, US Treasury yields, and sovereign spread curve', url: '/markets/bonds', tags: ['bonds', 'yields', 'g-sec', 'treasury', 'fixed income'] },
        { title: 'Derivatives & Options Chain (F&O)', description: 'NIFTY options chain, Put-Call Ratio (PCR), Max Pain, and FII/DII flows', url: '/markets/derivatives', tags: ['derivatives', 'options', 'pcr', 'max pain', 'fii', 'dii', 'fno'] },
        { title: 'Public Prediction Ledger', description: 'Scored public prediction calls, hits/misses track record and Brier score', url: '/predictions/ledger', tags: ['predictions', 'ledger', 'track record', 'calls', 'brier'] },
        { title: 'Placement Day War Room 2.0', description: "India's #1 AI finance interview simulator, 6-round placement day and 10 lab workstations", url: '/placement-day-war-room', tags: ['placement', 'interview', 'war room', 'simulator', 'finance lab', 'dcf', 'wacc'] },
    ];

    for (const m of STATIC_MARKET_DESTINATIONS) {
        push(
            makeItem(
                {
                    kind: 'market',
                    title: m.title,
                    description: m.description,
                    url: m.url,
                    tags: m.tags,
                },
                tokens,
            ),
        );
    }

    return items;
}

async function collectStudy(tokens: string[], query: string, limit: number): Promise<SearchItem[]> {
    try {
        const materials = await getPublishedStudyMaterials({ search: query, limit });
        return materials
            .map((m) =>
                makeItem(
                    {
                        kind: 'study',
                        title: m.title,
                        description: m.description ?? '',
                        url: `/study/${m.slug}`,
                        tags: [...(m.tags ?? []), m.type, m.difficulty].filter(Boolean) as string[],
                    },
                    tokens,
                ),
            )
            .filter((item): item is SearchItem => item !== null);
    } catch (error) {
        // DB unreachable — search still works over static content.
        logger.warn('Study search skipped (DB unavailable)', {
            error: error instanceof Error ? error.message : String(error),
        });
        return [];
    }
}

async function collectFinanceTerms(tokens: string[], query: string, limit: number): Promise<SearchItem[]> {
    try {
        const { terms } = await getFinanceTermIndex({ query, pageSize: limit });
        return terms
            .map((term) => makeItem({
                kind: 'finance-term',
                title: term.term,
                description: term.simpleMeaning,
                url: `/finance-terms/${term.slug}`,
                tags: [term.category, term.difficulty, ...term.keywords, ...term.synonyms],
            }, tokens))
            .filter((item): item is SearchItem => item !== null);
    } catch (error) {
        logger.warn('Finance term search skipped (database or migration unavailable)', {
            error: error instanceof Error ? error.message : String(error),
        });
        return [];
    }
}

/**
 * Search every content type. Results are grouped by kind, each group sorted by
 * relevance and capped at `perKind`. Empty groups are omitted.
 */
export async function searchContent(
    rawQuery: string,
    options: { perKind?: number } = {},
): Promise<SearchResult> {
    const query = rawQuery.trim();
    const perKind = options.perKind ?? 8;
    const tokens = tokenize(query);

    if (tokens.length === 0) {
        return { query, total: 0, groups: [] };
    }

    const [staticItems, studyItems, financeTerms] = await Promise.all([
        Promise.resolve(collectStatic(tokens)),
        collectStudy(tokens, query, perKind),
        collectFinanceTerms(tokens, query, perKind),
    ]);

    const allItems = [...staticItems, ...studyItems, ...financeTerms];

    const byKind = new Map<SearchKind, SearchItem[]>();
    for (const item of allItems) {
        const bucket = byKind.get(item.kind);
        if (bucket) bucket.push(item);
        else byKind.set(item.kind, [item]);
    }

    const groups: SearchGroup[] = [];
    let total = 0;
    for (const [kind, items] of byKind) {
        const sorted = items.sort((a, b) => b.score - a.score).slice(0, perKind);
        total += sorted.length;
        groups.push({ kind, label: KIND_LABELS[kind], items: sorted });
    }

    // Stable, human-friendly ordering across groups.
    const order: SearchKind[] = [
        'market',
        'tool',
        'research',
        'insight',
        'case-study',
        'data-lab',
        'pgdm-subject',
        'pgdm-lecture',
        'study',
        'finance-term',
        'podcast',
    ];
    groups.sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind));

    return { query, total, groups };
}
