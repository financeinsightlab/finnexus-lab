import { describe, expect, it } from 'vitest';
import { buildThreads, parseMentions, type ThreadedComment } from '@/lib/comments-store';

const base = (over: Partial<Omit<ThreadedComment, 'replies'>> & { id: string }) => ({
    content: 'hi',
    authorId: 'u1',
    authorName: 'Ann',
    authorImage: null,
    parentId: null,
    status: 'VISIBLE',
    reactions: [],
    createdAt: '2026-09-28T00:00:00.000Z',
    editedAt: null,
    ...over,
});

describe('parseMentions', () => {
    it('extracts unique, lower-cased handles', () => {
        expect(parseMentions('Ping @Kunwar and @analyst, plus @Kunwar again')).toEqual(['kunwar', 'analyst']);
    });

    it('ignores email-like text and short tokens', () => {
        expect(parseMentions('mail me at a@b.com')).toEqual([]);
        expect(parseMentions('hi @a')).toEqual([]);
    });
});

describe('buildThreads', () => {
    it('nests replies under their parent', () => {
        const tree = buildThreads([
            base({ id: 'root' }),
            base({ id: 'child', parentId: 'root' }),
            base({ id: 'grand', parentId: 'child' }),
        ]);
        expect(tree).toHaveLength(1);
        expect(tree[0].replies[0].id).toBe('child');
        expect(tree[0].replies[0].replies[0].id).toBe('grand');
    });

    it('promotes orphaned replies to roots', () => {
        const tree = buildThreads([base({ id: 'orphan', parentId: 'missing' })]);
        expect(tree).toHaveLength(1);
        expect(tree[0].id).toBe('orphan');
    });
});
