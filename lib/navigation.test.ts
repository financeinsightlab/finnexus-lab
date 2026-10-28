import { describe, expect, it } from 'vitest';
import { NAV_CLUSTERS, NAV_LINKS, QUICK_ACTIONS, isNavActive } from '@/lib/navigation';

describe('navigation model', () => {
    it('has five hubs with unique ids and landing hrefs', () => {
        expect(NAV_CLUSTERS).toHaveLength(5);
        expect(new Set(NAV_CLUSTERS.map((c) => c.id)).size).toBe(5);
        for (const cluster of NAV_CLUSTERS) {
            expect(cluster.href.startsWith('/')).toBe(true);
            expect(cluster.items.length).toBeGreaterThan(0);
        }
    });

    it('has no duplicate item labels within a hub and all hrefs are internal paths', () => {
        for (const cluster of NAV_CLUSTERS) {
            const labels = cluster.items.map((i) => i.label);
            expect(new Set(labels).size).toBe(labels.length);
            for (const item of cluster.items) {
                expect(item.href.startsWith('/')).toBe(true);
                expect(item.label.trim()).not.toBe('');
            }
        }
    });

    it('keeps account and ask out of hub items (user menu / search own those intents)', () => {
        const hrefs = NAV_LINKS.map((i) => i.href);
        expect(hrefs).not.toContain('/account');
        expect(hrefs).not.toContain('/ask');
        // Both remain reachable via search quick actions.
        expect(QUICK_ACTIONS.map((i) => i.href)).toContain('/ask');
    });

    it('differentiates the predictions board from the scored ledger', () => {
        const hrefs = NAV_LINKS.map((i) => i.href);
        expect(hrefs).toContain('/predictions');
        expect(hrefs).toContain('/predictions/ledger');
    });

    it('quick actions are unique and internal', () => {
        const hrefs = QUICK_ACTIONS.map((i) => i.href);
        expect(new Set(hrefs).size).toBe(hrefs.length);
        for (const href of hrefs) expect(href.startsWith('/')).toBe(true);
    });
});

describe('isNavActive', () => {
    it('matches exact and nested paths only', () => {
        expect(isNavActive('/tools', '/tools')).toBe(true);
        expect(isNavActive('/tools/dcf-valuation-model', '/tools')).toBe(true);
        expect(isNavActive('/toolshed', '/tools')).toBe(false);
        expect(isNavActive('/research', '/tools')).toBe(false);
    });

    it('treats root as exact-only and tolerates nullish pathnames', () => {
        expect(isNavActive('/', '/')).toBe(true);
        expect(isNavActive('/tools', '/')).toBe(false);
        expect(isNavActive(null, '/tools')).toBe(false);
        expect(isNavActive(undefined, '/tools')).toBe(false);
    });
});
