import { describe, expect, it } from 'vitest';
import { escapeMdxTextSyntax } from '@/lib/markdown-content';

describe('escapeMdxTextSyntax', () => {
  it('keeps ordinary comparisons, braces, and placeholders safe for MDX', () => {
    const content = escapeMdxTextSyntax('Keep values < 6, preserve {formula}, and show <param> or <SUM(Revenue)>.');
    expect(content).toContain('&lt; 6');
    expect(content).toContain('&#123;formula&#125;');
    expect(content).toContain('&lt;param>');
    expect(content).toContain('&lt;SUM(Revenue)>');
  });

  it('preserves inline and fenced code plus intentional semantic HTML', () => {
    const content = escapeMdxTextSyntax('Inline `score < 6` stays code.\n\n```text\nif score < 6: print({score})\n```\n\n<details><summary>Show</summary>Body</details>');
    expect(content).toContain('`score < 6`');
    expect(content).toContain('if score < 6: print({score})');
    expect(content).toContain('<details><summary>Show</summary>Body</details>');
  });
});
