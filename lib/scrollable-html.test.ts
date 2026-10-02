import { describe, expect, it } from 'vitest';
import { wrapUncontainedTables } from './scrollable-html';

const wrapper = '<div class="horizontal-scroll-region my-6 max-w-full"';

describe('wrapUncontainedTables', () => {
  it('adds one keyboard-focusable scroll region around each standalone table', () => {
    const html = '<p>Before</p><table><tbody><tr><td>A</td></tr></tbody></table><p>After</p>';
    const result = wrapUncontainedTables(html);

    expect(result).toContain(`${wrapper} role="region"`);
    expect(result.match(/horizontal-scroll-region/g)).toHaveLength(1);
    expect(result).toContain('<table><tbody><tr><td>A</td></tr></tbody></table></div>');
    expect(result.endsWith('<p>After</p>')).toBe(true);
  });

  it('does not nest a wrapper inside a shared horizontal scroll region', () => {
    const html = '<div class="horizontal-scroll-region" tabindex="0"><table><tbody></tbody></table></div>';

    expect(wrapUncontainedTables(html)).toBe(html);
  });

  it('recognizes an existing horizontal overflow container', () => {
    const html = '<section class="overflow-x-auto"><table></table></section>';

    expect(wrapUncontainedTables(html)).toBe(html);
  });

  it('wraps standalone tables but ignores table-like text in comments and raw-text elements', () => {
    const html = '<!-- <table></table> --><script>const markup = "<table>";</script><table></table>';
    const result = wrapUncontainedTables(html);

    expect(result.match(/horizontal-scroll-region/g)).toHaveLength(1);
    expect(result).toContain('<!-- <table></table> --><script>const markup = "<table>";</script>');
  });

  it('preserves multiple tables and their surrounding markup', () => {
    const html = '<table id="one"></table><div><table id="two"></table></div>';
    const result = wrapUncontainedTables(html);

    expect(result.match(/horizontal-scroll-region/g)).toHaveLength(2);
    expect(result).toContain('</table></div><div><div class="horizontal-scroll-region');
    expect(result).toMatch(/id="two"><\/table><\/div><\/div>/);
  });
});
