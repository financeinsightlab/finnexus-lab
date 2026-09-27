// lib/search-utils.ts — pure, dependency-free search primitives.
//
// Kept separate from `lib/search.ts` (which transitively imports Prisma-backed
// modules) so the scoring logic can be unit-tested in isolation.

/** Split a query into normalised tokens. */
export function tokenize(query: string): string[] {
    return query
        .toLowerCase()
        .split(/\s+/)
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
}

/**
 * Score an item against the query tokens. Title hits dominate, then tags, then
 * description. Returns 0 when no token matches (i.e. filter it out).
 */
export function score(tokens: string[], title: string, description: string, tags: string[]): number {
    const t = title.toLowerCase();
    const d = description.toLowerCase();
    const tagBlob = tags.join(' ').toLowerCase();

    let total = 0;
    for (const token of tokens) {
        if (t.includes(token)) total += 5;
        if (tagBlob.includes(token)) total += 3;
        if (d.includes(token)) total += 1;
    }
    return total;
}
