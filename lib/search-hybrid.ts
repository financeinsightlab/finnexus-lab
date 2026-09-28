// lib/search-hybrid.ts — hybrid (lexical + optional vector) ranking core
//
// Pillar B2. The site already has a keyword facade in `lib/search.ts`. This
// module adds a *hybrid* scorer that:
//
//   1. weights fields (title > tags > description) so a title hit outranks a
//      body hit, and
//   2. optionally blends in a vector similarity score when an embedding
//      provider is configured.
//
// Everything here is pure and dependency-light so it can run on the server, in
// a route handler, or in a unit test — and so the search stays fully functional
// (lexical only) when no embedding provider is available. That keeps the feature
// 100% free by default: vectors are an upgrade, never a requirement.

import { tokenize } from '@/lib/search-utils';

export interface WeightedField {
    value: string;
    /** Relative importance. Title hits should clearly beat body hits. */
    weight: number;
}

const DEFAULT_FIELD_WEIGHT = 1;
const TAG_BOOST = 2.5;
const TITLE_BOOST = 4;

/** Convenience builder for the common title/description/tags triple. */
export function contentFields(
    title: string,
    description: string | null | undefined,
    tags: readonly string[] = [],
): WeightedField[] {
    return [
        { value: title ?? '', weight: TITLE_BOOST },
        { value: (tags ?? []).join(' '), weight: TAG_BOOST },
        { value: description ?? '', weight: DEFAULT_FIELD_WEIGHT },
    ];
}

/**
 * Sum of per-token, per-field matches. Each token contributes at most once per
 * field; longer tokens (more specific) score a little higher than short ones.
 */
export function hybridScore(tokens: readonly string[], fields: readonly WeightedField[]): number {
    if (tokens.length === 0) return 0;

    let total = 0;
    for (const field of fields) {
        const haystack = field.value.toLowerCase();
        if (!haystack) continue;
        for (const token of tokens) {
            if (token.length === 0) continue;
            if (haystack.includes(token)) {
                // Specificity bonus: a 8-char token is worth more than a 3-char one.
                const specificity = 1 + Math.min(token.length, 12) / 24;
                total += field.weight * specificity;
            }
        }
    }
    return Math.round(total * 1000) / 1000;
}

/** Cosine similarity for two equal-length vectors; 0 when either is empty. */
export function cosineSimilarity(a: readonly number[], b: readonly number[]): number {
    const length = Math.min(a.length, b.length);
    if (length === 0) return 0;

    let dot = 0;
    let magA = 0;
    let magB = 0;
    for (let i = 0; i < length; i += 1) {
        dot += a[i] * b[i];
        magA += a[i] * a[i];
        magB += b[i] * b[i];
    }
    if (magA === 0 || magB === 0) return 0;
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/**
 * Blend a lexical score with a vector similarity. `alpha` is the vector weight
 * in [0, 1]; both inputs are expected on comparable (0–1-ish) scales. When no
 * vector is supplied the lexical score is returned unchanged.
 */
export function blendScores(lexical: number, vector: number | null, alpha = 0.5): number {
    if (vector === null || Number.isNaN(vector)) return lexical;
    const clamped = Math.max(0, Math.min(1, alpha));
    return Math.round((clamped * vector + (1 - clamped) * lexical) * 1000) / 1000;
}

export interface Ranked<T> {
    item: T;
    score: number;
}

/**
 * Rank arbitrary items by their weighted fields. `vectors`, when provided, is a
 * map from item key → embedding; missing keys simply fall back to lexical-only.
 */
export function rankHybrid<T>(
    items: readonly T[],
    query: string,
    toFields: (item: T) => WeightedField[],
    options: {
        keyOf?: (item: T) => string;
        vectors?: Map<string, number[]>;
        queryVector?: number[] | null;
        alpha?: number;
        minScore?: number;
    } = {},
): Ranked<T>[] {
    const tokens = tokenize(query);
    if (tokens.length === 0) return [];

    const { keyOf, vectors, queryVector, alpha = 0.5, minScore = 0 } = options;

    const ranked = items.map((item) => {
        const lexical = hybridScore(tokens, toFields(item));
        let vector: number | null = null;
        if (vectors && queryVector && keyOf) {
            const candidate = vectors.get(keyOf(item));
            if (candidate) vector = cosineSimilarity(queryVector, candidate);
        }
        return { item, score: blendScores(lexical, vector, alpha) };
    });

    return ranked
        .filter((entry) => entry.score > minScore)
        .sort((a, b) => b.score - a.score);
}
