// ─── Content table of contents ────────────────────────────────────────────────
// Derives heading anchors from the same block tree the renderer consumes, so
// "Contents" sidebars stay in sync with CMS content without extra queries or
// client-side DOM scraping. Pure + dependency-free.

import type { Block } from './blocks/registry'

export interface ContentHeading {
  id: string
  text: string
  level: 1 | 2 | 3 | 4
}

/** URL-safe, stable id for a heading. Mirrors what the block renderer emits. */
export function slugifyHeading(text: string, used?: Set<string>): string {
  const base =
    text
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 80) || 'section'

  if (!used) return base
  if (!used.has(base)) {
    used.add(base)
    return base
  }
  let n = 2
  while (used.has(`${base}-${n}`)) n++
  const unique = `${base}-${n}`
  used.add(unique)
  return unique
}

function stripInlineMarkup(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Collect headings (levels 1-4) from a block tree, in display order.
 * `maxLevel` lets callers keep the sidebar short (defaults to h2/h3).
 */
export function extractHeadings(blocks: Block[] | undefined | null, maxLevel: 3): ContentHeading[] {
  if (!Array.isArray(blocks) || blocks.length === 0) return []

  const used = new Set<string>()
  const headings: ContentHeading[] = []

  const visit = (list: Block[]) => {
    const ordered = list.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    for (const block of ordered) {
      if (!block) continue
      if (block.type === 'heading') {
        const text = stripInlineMarkup(String(block.data?.text ?? ''))
        const level = (Number(block.data?.level) || 2) as 1 | 2 | 3 | 4
        const id = slugifyHeading(text, used)
        if (text && level <= maxLevel) headings.push({ id, text, level })
        continue
      }
      const nested = block.data?.columns
      if (block.type === 'columns' && Array.isArray(nested)) {
        for (const column of nested) if (Array.isArray(column)) visit(column)
      }
    }
  }

  visit(blocks)
  return headings
}
