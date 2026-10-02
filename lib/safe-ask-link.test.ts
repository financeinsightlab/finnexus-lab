import { describe, expect, it } from 'vitest';
import { safeAskHref } from '@/components/ask/safe-ask-link';

describe('safeAskHref', () => {
    it('accepts same-site paths and canonical HTTPS URLs', () => {
        expect(safeAskHref('/research/example?source=ask')).toBe('/research/example?source=ask');
        expect(safeAskHref('https://kunwaranalytics.in/tools')).toBe('/tools');
    });

    it('rejects external hosts and dangerous schemes', () => {
        expect(safeAskHref('https://example.com')).toBeNull();
        expect(safeAskHref('//example.com')).toBeNull();
        expect(safeAskHref('javascript:alert(1)')).toBeNull();
        expect(safeAskHref('data:text/html,hi')).toBeNull();
    });
});
