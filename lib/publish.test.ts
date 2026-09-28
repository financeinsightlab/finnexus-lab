import { describe, expect, it } from 'vitest';
import { pathsToRevalidate } from '@/lib/publish';

describe('pathsToRevalidate', () => {
    it('covers the index, listings, detail and sitemap for posts', () => {
        const paths = pathsToRevalidate('post', 'india-ev-2026');
        expect(paths).toContain('/research');
        expect(paths).toContain('/insights');
        expect(paths).toContain('/research/india-ev-2026');
        expect(paths).toContain('/sitemap.xml');
    });

    it('revalidates study listing and detail pages', () => {
        const paths = pathsToRevalidate('study', 'sql-101');
        expect(paths).toEqual(expect.arrayContaining(['/study', '/admin/study', '/study/sql-101']));
    });

    it('always includes the sitemap even without a slug', () => {
        expect(pathsToRevalidate('page', null)).toContain('/sitemap.xml');
    });
});
