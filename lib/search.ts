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
import { logger } from '@/lib/logger';
import { score, tokenize } from '@/lib/search-utils';

export type SearchKind =
    | 'research'
    | 'insight'
    | 'data-lab'
    | 'case-study'
    | 'podcast'
    | 'pgdm-subject'
    | 'pgdm-lecture'
    | 'tool'
    | 'study';

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
    tool: 'Tools',
    study: 'Study Material',
};

/** Build a searchable item, dropping it when it does not match the query. */
function makeItem(
    base: Omit<SearchItem, 'score'>,
    tokens: string[],
): SearchItem | null {
    const s = score(tokens, base.title, base.description, base.tags);
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

    const [staticItems, studyItems] = await Promise.all([
        Promise.resolve(collectStatic(tokens)),
        collectStudy(tokens, query, perKind),
    ]);

    const allItems = [...staticItems, ...studyItems];

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
        'research',
        'insight',
        'case-study',
        'data-lab',
        'pgdm-subject',
        'pgdm-lecture',
        'study',
        'tool',
        'podcast',
    ];
    groups.sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind));

    return { query, total, groups };
}
