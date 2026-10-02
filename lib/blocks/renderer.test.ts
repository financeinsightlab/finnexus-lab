import { describe, expect, it } from 'vitest'
import { renderBlocks } from './renderer'
import { markdownToBlocks, type Block } from './registry'
import { extractHeadings, slugifyHeading } from '@/lib/content-toc'

/**
 * These tests guard the CMS presentation contract: content authors write
 * content, the global renderer decides layout. They simulate a future CMS
 * entry containing every common element (paragraphs, headings, lists, table,
 * image, blockquote, callout, link, code) and assert the output:
 *   • uses the global `cms-*` classes (typography/spacing/theme),
 *   • marks wide blocks (`table`, figures, code, diagrams, metrics) so they
 *     break out of the reading measure automatically,
 *   • never hard-codes dark-only colours or fixed widths.
 */

const FUTURE_CMS_MARKDOWN = `# Quarterly Sector Review

Short intro paragraph.

This is a deliberately long paragraph that simulates editorial copy written by an analyst in the CMS. It keeps going for several sentences so the renderer is exercised with realistic prose volume, including inline math like $E = mc^2$, an inline link to [a related report](/research/example), a **bold claim**, and an \`inline code\` fragment.

## Market structure

- First bullet
- Second bullet

### Segment detail

1. Numbered step one
2. Numbered step two

| Segment | Revenue | Risk |
| --- | --- | --- |
| Q-commerce | 1200 | High |
| Retail | 800 | Medium |

![Cover chart](/images/cover.png "Figure 1 — market sizing")

> **Key takeaway:** margin pressure is concentrated in the last mile.

> Direct quote from the category operator.

\`\`\`
raw pipeline diagram
  stage A -> stage B
\`\`\`
`

describe('markdown → CMS renderer', () => {
  const html = renderBlocks(markdownToBlocks(FUTURE_CMS_MARKDOWN))

  it('renders semantic, theme-aware markup for every element', () => {
    expect(html).toContain('<h1')
    expect(html).toContain('<h2')
    expect(html).toContain('<h3')
    expect(html).toContain('<ul')
    expect(html).toContain('<ol') // numbered list handled by the list block
    expect(html).toContain('<table>')
    expect(html).toContain('<img')
    expect(html).toContain('cms-callout cms-callout--info')
    expect(html).toContain('<blockquote')
    expect(html).toContain('cms-quote')
    expect(html).toContain('href="/research/example"')
  })

  it('wraps tables in a horizontal scroll container so mobile has no page overflow', () => {
    expect(html).toContain('cms-table-scroll')
    expect(html).toMatch(/<div class="cms-table-scroll[^"]*content-wide"[^>]*>\s*<table>/)
  })

  it('lets wide blocks break out of the prose measure automatically', () => {
    expect(html).toMatch(/cms-table-scroll[^"]*\bcontent-wide\b/)
    expect(html).toMatch(/cms-wide\b/)
  })

  it('never hard-codes dark-only styling or fixed pixel widths', () => {
    expect(html).not.toMatch(/#[0-9a-fA-F]{6}/) // no hex colours (author attrs are inline styles only if the editor set them)
    expect(html).not.toMatch(/max-w-\d/)
    expect(html).not.toMatch(/text-gray-\d{3}|text-white|bg-cinema/)
  })

  it('gives headings stable anchors for a contents sidebar', () => {
    const headings = extractHeadings(markdownToBlocks(FUTURE_CMS_MARKDOWN), 3)
    expect(headings.map((h) => h.id)).toEqual([
      'quarterly-sector-review',
      'market-structure',
      'segment-detail',
    ])
    expect(html).toContain(`id="${headings[0].id}"`)
  })

  it('keeps math readable with KaTeX output', () => {
    expect(html).toContain('katex')
  })
})

describe('block-level rendering', () => {
  const blocks: Block[] = [
    {
      id: 'b1',
      type: 'callout',
      order: 0,
      data: { variant: 'warning', title: 'Careful', content: 'Check the assumption.' },
    },
    {
      id: 'b2',
      type: 'metrics',
      order: 1,
      data: { metrics: [{ label: 'GMV', value: '₹1,200 Cr', change: '+18%', trend: 'up' }] },
    },
    {
      id: 'b3',
      type: 'image',
      order: 2,
      data: { src: '/img/a.png', alt: 'A', alignment: 'full', caption: 'Wide figure' },
    },
    {
      id: 'b4',
      type: 'list',
      order: 3,
      data: { items: ['alpha', 'beta'], listStyle: 'numbered' },
    },
  ]

  const html = renderBlocks(blocks)

  it('renders callouts, metrics, wide figures and numbered lists with global classes', () => {
    expect(html).toContain('cms-callout cms-callout--warning')
    expect(html).toContain('cms-metrics')
    expect(html).toContain('cms-metric__change--up')
    expect(html).toContain('cms-figure--wide')
    expect(html).toContain('cms-list__index')
  })

  it('renders nothing for empty block trees (no author content = no markup)', () => {
    expect(renderBlocks([])).toBe('')
  })
})

describe('slugifyHeading', () => {
  it('produces url-safe unique ids', () => {
    const used = new Set<string>()
    expect(slugifyHeading('Executive Summary', used)).toBe('executive-summary')
    expect(slugifyHeading('Executive Summary', used)).toBe('executive-summary-2')
    expect(slugifyHeading('₹ and — punctuation!', used)).toBe('and-punctuation')
  })

  it('falls back to a stable id when the heading has no usable characters', () => {
    expect(slugifyHeading('...')).toBe('section')
  })
})
