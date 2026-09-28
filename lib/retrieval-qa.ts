// lib/retrieval-qa.ts — "Ask Kunwar" retrieval + citation core
//
// Pillar B1. This is the *retrieval* half of a RAG assistant, kept provider
// agnostic and free by default:
//
//   • `buildPassages` turns search hits into numbered, citable passages.
//   • `localExtractiveProvider` answers by extracting the strongest sentences
//     from those passages — no LLM, no key, no cost.
//   • An external LLM can be plugged in by implementing `AnswerProvider`; the
//     caller supplies it, so this module never hard-depends on a vendor.
//
// The invariant that matters for trust: every answer carries citations back to
// the source pages on this site. If we can't cite it, we don't claim it.

export interface PassageSource {
    title: string;
    url: string;
    kind: string;
    description: string;
    score: number;
}

export interface Passage extends PassageSource {
    /** 1-based index used as the inline citation marker, e.g. [1]. */
    index: number;
    snippet: string;
}

export interface Citation {
    index: number;
    title: string;
    url: string;
    kind: string;
    snippet: string;
    score: number;
}

export interface Answer {
    question: string;
    answer: string;
    citations: Citation[];
    provider: string;
    /** True when no source was good enough to answer from. */
    noAnswer: boolean;
}

export interface AnswerProvider {
    name: string;
    synthesize(question: string, passages: readonly Passage[]): Promise<string>;
}

/** Sentence-splitting that survives abbreviations poorly but is dependency-free. */
export function splitSentences(text: string): string[] {
    return text
        .replace(/\s+/g, ' ')
        .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
        .map((sentence) => sentence.trim())
        .filter((sentence) => sentence.length > 0);
}

/** Collapse a description into a short, quote-safe snippet. */
export function makeSnippet(description: string, query: string, maxLength = 240): string {
    const clean = (description ?? '').replace(/\s+/g, ' ').trim();
    if (clean.length <= maxLength) return clean;

    const lower = clean.toLowerCase();
    const terms = query
        .toLowerCase()
        .split(/\s+/)
        .filter((token) => token.length > 2);

    let anchor = -1;
    for (const term of terms) {
        const at = lower.indexOf(term);
        if (at >= 0 && (anchor === -1 || at < anchor)) anchor = at;
    }

    if (anchor === -1) return `${clean.slice(0, maxLength).trimEnd()}…`;

    const start = Math.max(0, anchor - Math.floor(maxLength / 3));
    const end = Math.min(clean.length, start + maxLength);
    const prefix = start > 0 ? '…' : '';
    const suffix = end < clean.length ? '…' : '';
    return `${prefix}${clean.slice(start, end).trim()}${suffix}`;
}

/** Turn ranked search results into numbered passages with snippets. */
export function buildPassages(
    query: string,
    sources: readonly PassageSource[],
): Passage[] {
    return sources.map((source, i) => ({
        ...source,
        index: i + 1,
        snippet: makeSnippet(source.description, query),
    }));
}

/**
 * The default, zero-cost provider: extract the sentences from the top passages
 * that best match the query, prefix each with its citation marker.
 */
export const localExtractiveProvider: AnswerProvider = {
    name: 'local-extractive',
    async synthesize(question: string, passages: readonly Passage[]): Promise<string> {
        const terms = question
            .toLowerCase()
            .split(/\s+/)
            .filter((token) => token.length > 2);

        const scored: { text: string; index: number; hits: number }[] = [];
        for (const passage of passages.slice(0, 3)) {
            for (const sentence of splitSentences(passage.snippet)) {
                const lower = sentence.toLowerCase();
                const hits = terms.reduce((acc, term) => acc + (lower.includes(term) ? 1 : 0), 0);
                if (hits > 0) scored.push({ text: sentence, index: passage.index, hits });
            }
        }

        scored.sort((a, b) => b.hits - a.hits);
        const chosen = scored.slice(0, 3);
        if (chosen.length === 0) return '';

        return chosen.map((entry) => `${entry.text} [${entry.index}]`).join(' ');
    },
};

const NO_ANSWER_MESSAGE =
    'I could not find a source on Kunwar Analytics that answers that yet. Try different keywords, or browse the research library.';

/**
 * Answer a question from already-retrieved sources. Pure and synchronous apart
 * from the provider call, so it is easy to unit-test with a stub provider.
 */
export async function answerFromSources(
    question: string,
    sources: readonly PassageSource[],
    options: { provider?: AnswerProvider; minScore?: number } = {},
): Promise<Answer> {
    const provider = options.provider ?? localExtractiveProvider;
    const minScore = options.minScore ?? 0;

    const usable = sources.filter((source) => source.score > minScore);
    const passages = buildPassages(question, usable);
    const citations: Citation[] = passages.map((passage) => ({
        index: passage.index,
        title: passage.title,
        url: passage.url,
        kind: passage.kind,
        snippet: passage.snippet,
        score: passage.score,
    }));

    const answer = passages.length > 0 ? await provider.synthesize(question, passages) : '';

    if (!answer) {
        return {
            question,
            answer: NO_ANSWER_MESSAGE,
            citations,
            provider: provider.name,
            noAnswer: true,
        };
    }

    return { question, answer, citations, provider: provider.name, noAnswer: false };
}
