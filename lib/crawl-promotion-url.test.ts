import { describe, it, expect, vi } from 'vitest';
import { crawlWebsiteUrl } from './crawl-promotion-url';
import { legacyTargetsFromPromotion, resolvePageContext, targetsMatchPage } from './promotions/targeting';

describe('crawlWebsiteUrl', () => {
  it('throws an error for an invalid URL', async () => {
    await expect(crawlWebsiteUrl('not-a-url:::')).rejects.toThrow();
  });

  it('correctly parses open graph and title metadata from mock html', async () => {
    const mockHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>SuperTool — Professional Finance AI</title>
          <meta property="og:title" content="SuperTool AI Platform" />
          <meta property="og:description" content="State of the art finance intelligence and modeling tools." />
          <meta property="og:image" content="https://supertool.com/og.png" />
          <meta property="og:site_name" content="SuperTool" />
          <link rel="icon" href="/favicon.png" />
        </head>
        <body><h1>Hello</h1></body>
      </html>
    `;

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(mockHtml, { status: 200, headers: { 'Content-Type': 'text/html' } }),
    );

    const result = await crawlWebsiteUrl('https://supertool.com');
    expect(result.brandName).toBe('SuperTool');
    expect(result.title).toBe('SuperTool AI Platform');
    expect(result.shortDescription).toBe('State of the art finance intelligence and modeling tools.');
    expect(result.imageUrl).toBe('https://supertool.com/og.png');
    expect(result.logoUrl).toBe('https://supertool.com/favicon.png');
    expect(result.category).toBe('Finance');
  });
});

describe('legacy targetPages adapter for promotions', () => {
  const matches = (targetPages: string[], path: string) =>
    targetsMatchPage(legacyTargetsFromPromotion({ placement: 'ALL', targetPages, targetContentTypes: [] }), resolvePageContext(path)) !== null;

  it('treats ALL / "all pages" / empty lists as explicit Global targeting of public pages', () => {
    expect(matches(['ALL'], '/')).toBe(true);
    expect(matches(['ALL'], '/research')).toBe(true);
    expect(matches(['ALL'], '/finance-terms')).toBe(true);
    expect(matches(['all pages'], '/insights/post-1')).toBe(true);
    expect(matches([], '/anywhere')).toBe(true);
    // Global never reaches private or blocked pages.
    expect(matches(['ALL'], '/dashboard')).toBe(false);
    expect(matches(['ALL'], '/admin/product-content')).toBe(false);
  });

  it('keeps legacy section entries as prefix matches (with descendants)', () => {
    expect(matches(['/research'], '/research')).toBe(true);
    expect(matches(['/research'], '/research/deep-dive')).toBe(true);
    expect(matches(['/research'], '/tools')).toBe(false);
    expect(matches(['/research'], '/research-notes')).toBe(false);
  });
});
