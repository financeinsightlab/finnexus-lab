// ─── Block Server-Side Renderer ───────────────────────────────────────────────
// Converts a block tree (JSON) into semantic, theme-aware HTML for public pages.
//
// Presentation contract: this renderer never emits hard-coded widths or
// dark-only colours. Every block maps onto the global content system defined in
// app/globals.css (`cms-*` classes + `.prose-content` breakout), so:
//   • long-form prose keeps a comfortable reading measure,
//   • tables, figures, diagrams, metrics, code and embeds automatically use the
//     full width of the article column,
//   • light and dark themes both work without per-page styling,
//   • editors write content only — never layout.

import { Block, MetricItem } from './registry'
import { slugifyHeading } from '@/lib/content-toc'
import katex from 'katex'

function escapeHtml(str: string): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

interface RenderContext {
  headingIds: Set<string>
}

function getAttrStyle(block: Block): string {
  const a = block.attributes
  if (!a) return ''
  const styles: string[] = []
  if (a.backgroundColor) styles.push(`background-color: ${a.backgroundColor}`)
  if (a.textColor) styles.push(`color: ${a.textColor}`)
  if (a.padding) styles.push(`padding: ${a.padding}`)
  if (a.margin) styles.push(`margin: ${a.margin}`)
  if (a.textAlign) styles.push(`text-align: ${a.textAlign}`)
  return styles.join('; ')
}

function cleanMathInput(raw: string): string {
  return raw
    .replace(/₹/g, '\\text{₹}')
    .replace(/–/g, '-')
    .replace(/—/g, '-')
}

/**
 * Format mathematical LaTeX formulas with KaTeX
 */
function formatMathFormulas(html: string): string {
  if (!html) return ''

  // 1. Display math: $$ formula $$
  html = html.replace(/\$\$([\s\S]+?)\$\$/g, (_, eq) => {
    const rawEq = cleanMathInput(eq.trim())
    let renderedMath = ''
    try {
      renderedMath = katex.renderToString(rawEq, {
        displayMode: true,
        throwOnError: false,
        strict: false,
        output: 'htmlAndMathml',
      })
    } catch {
      renderedMath = `<code>${escapeHtml(rawEq)}</code>`
    }

    return `
      <div class="cms-math content-wide" role="region" aria-label="Scrollable mathematical formula" tabindex="0" data-lenis-prevent>
        <span class="cms-math__label">Mathematical model</span>
        <div class="katex-display">${renderedMath}</div>

      </div>
    `
  })

  // 2. Inline math: $ formula $
  html = html.replace(/(^|[^\$])\$([^\$\n]+?)\$(?!\$)/g, (_, prefix, eq) => {
    const rawEq = cleanMathInput(eq.trim())
    let renderedInline = ''
    try {
      renderedInline = katex.renderToString(rawEq, {
        displayMode: false,
        throwOnError: false,
        strict: false,
        output: 'htmlAndMathml',
      })
    } catch {
      renderedInline = `<code>${escapeHtml(rawEq)}</code>`
    }
    return `${prefix}<span class="inline-math">${renderedInline}</span>`
  })

  return html
}

interface ParsedDiagramStage {
  title: string
  items: string[]
}

/**
 * Universal diagram parser: converts any ASCII diagram into Visual Flow, Consulting Table, or Code Window
 */
function parseUniversalDiagram(raw: string):
  | { type: 'visual_flow'; title: string; stages: ParsedDiagramStage[] }
  | { type: 'ascii_table'; title: string; headers: string[]; data: string[][] }
  | { type: 'code'; title: string; code: string } {
  if (!raw) return { type: 'code', title: 'System Architecture', code: '' }

  const lines = raw.trim().split('\n')

  // Clean framing borders
  const cleanLines = lines
    .map((l) => l.trim())
    .filter((l) => l && !/^\+[-=+]+\+$/.test(l))

  // Check title in top lines
  let mainTitle = ''
  if (cleanLines.length > 0 && cleanLines[0].startsWith('|') && cleanLines[0].endsWith('|')) {
    const candidate = cleanLines[0].slice(1, -1).trim()
    if (candidate.length > 4 && !candidate.includes('|') && !candidate.includes('[')) {
      mainTitle = candidate
      cleanLines.shift()
    }
  }

  // 1. Table Detection: if lines have pipe-separated columns (>=2 columns on multiple lines) without flow arrows
  const tableRows: string[][] = []
  for (const l of cleanLines) {
    if (l.startsWith('|') && l.endsWith('|') && !l.includes('---')) {
      const cells = l
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim().replace(/\*\*([^*]+)\*\*/g, '$1'))
        .filter((c) => c.length > 0)
      if (cells.length >= 2) {
        tableRows.push(cells)
      }
    }
  }

  const hasBracketStages = cleanLines.some((l) => /\[([^\]]+)\]/.test(l))
  const hasFlowArrows = raw.includes('│') || raw.includes('▼') || raw.includes('->')

  // If it is purely a table without stage brackets/arrows:
  if (tableRows.length >= 2 && !hasBracketStages && !hasFlowArrows) {
    return { type: 'ascii_table', title: mainTitle, headers: tableRows[0], data: tableRows.slice(1) }
  }

  // 2. Stage Detection
  if (hasBracketStages || hasFlowArrows) {
    const stages: ParsedDiagramStage[] = []
    let cur: ParsedDiagramStage | null = null
    for (const l of cleanLines) {
      if (/^[│▼\s|><=+\-]+$/.test(l)) continue
      const allBrackets = Array.from(l.matchAll(/\[([^\]]+)\]/g)).map((m) => m[1].trim())
      if (allBrackets.length > 0) {
        if (cur) stages.push(cur)
        cur = {
          title: allBrackets.length > 1 ? allBrackets.join('  +  ') : allBrackets[0],
          items: allBrackets.length > 1 ? allBrackets : [],
        }
        continue
      }

      const boxContent = l.replace(/^[|\s]+|[|\s]+$/g, '').trim()
      if (boxContent && !boxContent.startsWith('+') && !boxContent.startsWith('===')) {
        if (!cur || cur.items.length > 0) {
          if (cur) stages.push(cur)
          cur = {
            title: boxContent.split('|')[0].trim(),
            items: boxContent.split('|').map((s) => s.trim()).filter(Boolean),
          }
        } else {
          cur.items.push(...boxContent.split('|').map((s) => s.trim()).filter(Boolean))
        }
      }
    }
    if (cur) stages.push(cur)
    if (stages.length >= 2) {
      return { type: 'visual_flow', title: mainTitle || 'System Architecture & Data Flow', stages }
    }
  }

  if (tableRows.length >= 2) {
    return { type: 'ascii_table', title: mainTitle, headers: tableRows[0], data: tableRows.slice(1) }
  }

  // 3. Code Snippet
  const codeContent = cleanLines
    .map((l) => l.replace(/^\|\s?/, '').replace(/\s?\|$/, '').replace(/^[+=|-]{4,}/, ''))
    .filter(Boolean)
    .join('\n')
  return { type: 'code', title: mainTitle || 'Technical Implementation Stack', code: codeContent }
}

/**
 * Render visual flowchart stages
 */
function renderVisualDiagram(title: string, stages: ParsedDiagramStage[]): string {
  const stageCards = stages
    .map((stage, idx) => {
      const stagePills = stage.items
        .map(
          (item) => `
          <div class="cms-stage__item">
            <span class="cms-stage__dot"></span>
            <span>${formatMathFormulas(escapeHtml(item))}</span>
          </div>
        `
        )
        .join('')

      return `
        <div class="cms-stage">
          <div class="cms-stage__head">
            <span class="cms-stage__index">Phase ${String(idx + 1).padStart(2, '0')}</span>
            <span class="cms-stage__title">${escapeHtml(stage.title)}</span>
          </div>
          <div class="cms-stage__items">${stagePills}</div>
        </div>
      `
    })
    .join('')

  return `
    <div class="cms-diagram cms-wide content-wide">
      <div class="cms-diagram__head">
        <span class="cms-diagram__title">${escapeHtml(title)}</span>
        <span class="cms-diagram__meta">${stages.length} stages</span>
      </div>
      <div class="cms-diagram__stages">${stageCards}</div>
    </div>
  `
}

/**
 * Render structured data table (CRM/consulting grade, responsive + scrollable)
 */
function renderConsultingTable(title: string, headers: string[], data: string[][]): string {
  const thead = `
    <thead>
      <tr>
        ${headers
          .map(
            (h) => `
          <th scope="col">${formatMathFormulas(escapeHtml(h))}</th>
        `
          )
          .join('')}
      </tr>
    </thead>
  `

  const tbody = data
    .map((row) => {
      const cells = row
        .map((cell, cellIdx) => {
          const isFirst = cellIdx === 0
          const cellCls = isFirst ? 'cms-cell--label' : 'cms-cell--value'

          // Format severity tags
          const cellLower = cell.toLowerCase().trim()
          if (cellLower === 'high' || cellLower.includes('high severity') || cellLower === 'danger') {
            return `<td class="${cellCls}"><span class="cms-badge cms-badge--high">High</span></td>`
          }
          if (cellLower === 'med' || cellLower === 'medium' || cellLower.includes('medium severity')) {
            return `<td class="${cellCls}"><span class="cms-badge cms-badge--medium">Medium</span></td>`
          }
          if (cellLower === 'low' || cellLower.includes('low severity')) {
            return `<td class="${cellCls}"><span class="cms-badge cms-badge--low">Low</span></td>`
          }

          return `<td class="${cellCls}">${formatMathFormulas(escapeHtml(cell))}</td>`
        })
        .join('')

      return `<tr>${cells}</tr>`
    })
    .join('')

  return `
    <div class="cms-table-scroll horizontal-scroll-region cms-wide content-wide" role="region" aria-label="Scrollable data table; use horizontal scrolling to view all columns" tabindex="0" data-lenis-prevent>
      <table>
        ${title ? `<caption class="cms-table-caption">${escapeHtml(title)}</caption>` : ''}
        ${thead}
        <tbody>${tbody}</tbody>
      </table>

    </div>
  `
}

function renderBlock(block: Block, ctx: RenderContext): string {
  const style = getAttrStyle(block)
  const styleAttr = style ? ` style="${style}"` : ''
  const attrFlag = style ? ' data-cms-attrs="true"' : ''
  const { data } = block

  switch (block.type) {
    case 'heading': {
      const level = Number(data.level) || 2
      const rawText = data.text || ''
      const text = escapeHtml(rawText)
      const id = slugifyHeading(rawText, ctx.headingIds)

      // Section badges: "1. Executive Summary" -> "Section 01: Executive Summary"
      const numMatch = rawText.match(/^(\d+)\.\s+(.+)$/)
      if (numMatch && level === 2) {
        const num = numMatch[1]
        const title = escapeHtml(numMatch[2])
        return `
          <div class="cms-section-badge cms-wide content-wide">
            <span class="cms-section-badge__pill">Section ${num.padStart(2, '0')}</span>
            <h2 id="${id}"${styleAttr}${attrFlag}>${title}</h2>
          </div>
        `
      }

      const safeLevel = level >= 1 && level <= 6 ? level : 2
      return `<h${safeLevel} id="${id}"${styleAttr}${attrFlag}>${text}</h${safeLevel}>`
    }

    case 'paragraph': {
      // Stored CMS/markdown paragraphs arrive wrapped in <p>…</p>; unwrap so the
      // rendered output stays a single, valid paragraph element.
      let raw = (data.html || '').trim()
      if (/^<p(\s[^>]*)?>[\s\S]*<\/p>$/i.test(raw)) {
        raw = raw.replace(/^<p(\s[^>]*)?>/i, '').replace(/<\/p>$/i, '')
      }
      // Legacy inline classes from older stored content (dark-only) are dropped —
      // `.cms-content a` now owns link styling in both themes.
      raw = raw.replace(/\s*class="[^"]*\b(?:text-cinema-cyan|underline|text-gray-\d{3}|text-white)\b[^"]*"/gi, '')
      const formatted = formatMathFormulas(raw)
      return `<p${styleAttr}${attrFlag}>${formatted}</p>`
    }

    case 'image': {
      const alignment = data.alignment || 'center'
      const figureCls = {
        left: 'cms-figure cms-figure--inset cms-figure--left',
        center: 'cms-figure cms-figure--center cms-wide content-wide',
        right: 'cms-figure cms-figure--inset cms-figure--right',
        full: 'cms-figure cms-figure--wide cms-wide content-wide',
      }[alignment] || 'cms-figure cms-figure--center cms-wide content-wide'

      const img = `<img class="cms-image" src="${escapeHtml(data.src || '')}" alt="${escapeHtml(data.alt || '')}" loading="lazy" decoding="async" />`
      const cap = data.caption ? `<figcaption>${escapeHtml(data.caption)}</figcaption>` : ''
      return `<figure${styleAttr}${attrFlag} class="${figureCls}">${img}${cap}</figure>`
    }

    case 'diagram': {
      const rawCode = data.code || ''
      const parsed = parseUniversalDiagram(rawCode)

      if (parsed.type === 'visual_flow') {
        return renderVisualDiagram(parsed.title, parsed.stages)
      }

      if (parsed.type === 'ascii_table') {
        return renderConsultingTable(parsed.title, parsed.headers, parsed.data)
      }

      const title = parsed.title || data.titleText || 'System Pipeline'
      return `
        <div${styleAttr}${attrFlag} class="cms-code-window cms-wide content-wide">
          <div class="cms-code-window__bar">
            <span class="cms-code-window__dots" aria-hidden="true">
              <span style="background:#F87171"></span>
              <span style="background:#FBBF24"></span>
              <span style="background:#34D399"></span>
            </span>
            <span class="cms-code-window__title">${escapeHtml(title)}</span>

          </div>
          <div class="cms-code-window__scroll" role="region" aria-label="Scrollable code sample" tabindex="0" data-lenis-prevent><pre><code>${escapeHtml(parsed.code)}</code></pre></div>
        </div>
      `
    }

    case 'table': {
      const rows = data.tableData || []
      if (rows.length < 2) return ''
      return renderConsultingTable('', rows[0], rows.slice(1))
    }

    case 'metrics': {
      const items = (data.metrics || []) as MetricItem[]
      const cards = items
        .map((item) => {
          const trendIcon = item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '●'
          const trendClass = item.trend === 'up' ? 'up' : item.trend === 'down' ? 'down' : 'neutral'
          return `
            <div class="cms-metric">
              <span class="cms-metric__label">${escapeHtml(item.label)}</span>
              <span class="cms-metric__value">${escapeHtml(item.value)}</span>
              ${item.change ? `<span class="cms-metric__change cms-metric__change--${trendClass}">${trendIcon} ${escapeHtml(item.change)}</span>` : ''}
            </div>
          `
        })
        .join('')

      return `
        <div${styleAttr}${attrFlag} class="cms-metrics cms-wide content-wide">
          ${cards}
        </div>
      `
    }

    case 'callout': {
      const variant = data.variant || 'info'
      const icons: Record<string, string> = { info: '💡', warning: '⚠️', success: '✅', danger: '🛑' }
      const icon = data.icon || icons[variant] || icons.info
      return `
        <aside${styleAttr}${attrFlag} class="cms-callout cms-callout--${variant} cms-wide content-wide" role="note">
          <span class="cms-callout__icon" aria-hidden="true">${escapeHtml(icon)}</span>
          <div class="cms-callout__body">
            ${data.title ? `<p class="cms-callout__title">${escapeHtml(data.title)}</p>` : ''}
            <div class="cms-callout__text">${formatMathFormulas(escapeHtml(data.content || ''))}</div>
          </div>
        </aside>
      `
    }

    case 'quote': {
      return `
        <blockquote${styleAttr}${attrFlag} class="cms-quote cms-wide content-wide">
          <p>${escapeHtml(data.quote || '')}</p>
          ${data.attribution ? `<cite class="cms-quote-attribution">${escapeHtml(data.attribution)}</cite>` : ''}
        </blockquote>
      `
    }

    case 'divider': {
      return `<hr${styleAttr} class="cms-divider" />`
    }

    case 'columns': {
      const cols = data.columns || []
      const colClass = cols.length === 3 ? 'cms-columns--3' : 'cms-columns--2'
      const innerCols = cols
        .map((colBlocks) => `<div>${renderBlocksInternal(colBlocks, ctx)}</div>`)
        .join('')
      return `<div${styleAttr}${attrFlag} class="cms-columns ${colClass} cms-wide content-wide">${innerCols}</div>`
    }

    case 'list': {
      const items = (data.items || [])
        .map((item, idx) => {
          const itemFormatted = formatMathFormulas(item)
          if (data.listStyle === 'numbered') {
            return `
            <li class="cms-list__item">
              <span class="cms-list__index" aria-hidden="true">${String(idx + 1).padStart(2, '0')}</span>
              <span>${itemFormatted}</span>
            </li>
          `
          }
          if (data.listStyle === 'check') {
            return `<li class="cms-list__item"><span class="cms-list__check" aria-hidden="true">✓</span><span>${itemFormatted}</span></li>`
          }
          return `<li>${itemFormatted}</li>`
        })
        .join('')

      if (data.listStyle === 'numbered') {
        // Ordered semantics for numbered lists; the visual index chip is decorative.
        return `<ol${styleAttr}${attrFlag} class="cms-list cms-list--numbered">${items}</ol>`
      }
      if (data.listStyle === 'check') {
        return `<ul${styleAttr}${attrFlag} class="cms-list cms-list--check">${items}</ul>`
      }
      return `<ul${styleAttr}${attrFlag} class="cms-list cms-list--bullet">${items}</ul>`
    }

    case 'embed': {
      const url = data.url || ''
      if (data.embedType === 'youtube') {
        const ytMatch = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
        const vid = ytMatch ? ytMatch[1] : ''
        if (!vid) return `<p class="cms-content__muted">Invalid YouTube URL</p>`
        return `<div${styleAttr}${attrFlag} class="cms-embed cms-wide content-wide">
          <iframe src="https://www.youtube.com/embed/${vid}" title="${escapeHtml(data.title || 'Embedded video')}" allowfullscreen loading="lazy"></iframe>
        </div>`
      }
      return `<a${styleAttr}${attrFlag} href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="cms-embed cms-embed--link cms-wide content-wide">${escapeHtml(url)}</a>`
    }

    case 'button': {
      const cls = {
        primary: 'cms-button--primary',
        outline: 'cms-button--outline',
        ghost: 'cms-button--ghost',
      }[data.buttonStyle || 'primary'] || 'cms-button--primary'
      return `
        <div${styleAttr}${attrFlag} class="cms-button-row content-wide">
          <a href="${escapeHtml(data.href || '#')}" class="cms-button ${cls}">
            ${escapeHtml(data.label || 'Read full model')} →
          </a>
        </div>
      `
    }

    case 'spacer': {
      const height = Number(data.height) || 32
      return `<div${styleAttr} style="height: ${height}px" aria-hidden="true"></div>`
    }

    default:
      return ''
  }
}

function renderBlocksInternal(blocks: Block[], ctx: RenderContext): string {
  return blocks
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((block) => renderBlock(block, ctx))
    .filter(Boolean)
    .join('\n')
}

/**
 * Render a CMS block tree to HTML.
 * Heading anchors are unique per render pass so a "Contents" sidebar can link
 * to them (see lib/content-toc.ts).
 */
export function renderBlocks(blocks: Block[]): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return ''
  return renderBlocksInternal(blocks, { headingIds: new Set<string>() })
}
