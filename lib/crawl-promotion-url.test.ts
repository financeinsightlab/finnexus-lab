import { describe, it, expect, vi } from 'vitest';
import { crawlWebsiteUrl } from './crawl-promotion-url';
import { matchesPath } from './promotions';

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

describe('matchesPath for promotions', () => {
  it('matches all pages when targetPages contains ALL or is empty', () => {
    expect(matchesPath(['ALL'], '/')).toBe(true);
    expect(matchesPath(['ALL'], '/research')).toBe(true);
    expect(matchesPath(['ALL'], '/finance-terms')).toBe(true);
    expect(matchesPath(['all pages'], '/insights/post-1')).toBe(true);
    expect(matchesPath([], '/anywhere')).toBe(true);
  });

  it('matches prefix sections correctly', () => {
    expect(matchesPath(['/research'], '/research')).toBe(true);
    expect(matchesPath(['/research'], '/research/deep-dive')).toBe(true);
    expect(matchesPath(['/research'], '/tools')).toBe(false);
  });
});
