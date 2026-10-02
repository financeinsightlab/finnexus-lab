import { describe, expect, it } from 'vitest';
import {
    answerFromSources,
    buildPassages,
    localExtractiveProvider,
    makeSnippet,
    splitSentences,
    type AnswerProvider,
    type PassageSource,
} from './retrieval-qa';

const sources: PassageSource[] = [
    {
        title: 'Inflation outlook',
        url: '/research/inflation-outlook',
        kind: 'research',
        description: 'Inflation is expected to cool as food prices normalise. Core inflation remains sticky.',
        score: 12,
    },
    {
        title: 'FX reserves',
        url: '/insights/fx-reserves',
        kind: 'insight',
        description: 'Reserves cover eleven months of imports.',
        score: 4,
    },
];

describe('splitSentences', () => {
    it('splits on sentence boundaries', () => {
        expect(splitSentences('One. Two! Three?')).toEqual(['One.', 'Two!', 'Three?']);
    });
});

describe('makeSnippet', () => {
    it('returns short text unchanged and truncates long text', () => {
        expect(makeSnippet('short', 'x')).toBe('short');
        const long = 'a'.repeat(400);
        const snippet = makeSnippet(long, 'a', 100);
        expect(snippet.length).toBeLessThanOrEqual(101);
        expect(snippet.endsWith('…')).toBe(true);
    });
});

describe('buildPassages', () => {
    it('numbers passages and attaches snippets', () => {
        const passages = buildPassages('inflation', sources);
        expect(passages[0].index).toBe(1);
        expect(passages[1].index).toBe(2);
        expect(passages[0].snippet).toContain('Inflation');
    });
});

describe('answerFromSources', () => {
    it('answers with inline citation markers from the local provider', async () => {
        const answer = await answerFromSources('inflation', sources);
        expect(answer.noAnswer).toBe(false);
        expect(answer.provider).toBe('local-extractive');
        expect(answer.answer).toMatch(/\[\d\]/);
        expect(answer.citations.length).toBe(2);
        expect(answer.citations[0].url).toBe('/research/inflation-outlook');
    });

    it('returns a no-answer message when there are no sources', async () => {
        const answer = await answerFromSources('unknown topic', []);
        expect(answer.noAnswer).toBe(true);
        expect(answer.citations).toEqual([]);
    });

    it('honours a custom provider when it cites a retrieved passage', async () => {
        const stub: AnswerProvider = {
            name: 'stub',
            async synthesize() {
                return 'A synthesized answer. [1]';
            },
        };
        const answer = await answerFromSources('inflation', sources, { provider: stub });
        expect(answer.provider).toBe('stub');
        expect(answer.answer).toBe('A synthesized answer. [1]');
    });

    it('rejects uncited or fabricated citation markers from a provider', async () => {
        const uncited: AnswerProvider = {
            name: 'uncited',
            async synthesize() { return 'A confident but unsupported claim.'; },
        };
        const fabricated: AnswerProvider = {
            name: 'fabricated',
            async synthesize() { return 'A claim [99].'; },
        };
        const [first, second] = await Promise.all([
            answerFromSources('inflation', sources, { provider: uncited }),
            answerFromSources('inflation', sources, { provider: fabricated }),
        ]);
        expect(first.noAnswer).toBe(true);
        expect(second.noAnswer).toBe(true);
    });
});

describe('localExtractiveProvider', () => {
    it('returns an empty string when nothing matches', async () => {
        const passages = buildPassages('zzz', sources);
        const text = await localExtractiveProvider.synthesize('zzz', passages);
        expect(text).toBe('');
    });
});
