// ─── Block Server-Side Renderer ───────────────────────────────────────────────
// Converts a block tree (JSON) into high-fidelity consulting-grade HTML for public pages.

import { Block, MetricItem } from './registry'
import katex from 'katex'

function escapeHtml(str: string): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
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
      renderedMath = `<span class="font-mono text-emerald-300">${escapeHtml(rawEq)}</span>`
    }

    return `
      <div class="my-5 px-5 py-4 rounded-2xl bg-[#090E18] border border-cinema-cyan/30 shadow-xl overflow-x-auto text-center">
        <div class="inline-flex items-center gap-1.5 mb-2 px-2 py-0.5 rounded-full bg-cinema-cyan/10 border border-cinema-cyan/25 text-[10px] font-mono font-bold text-cinema-cyan uppercase tracking-wider">
          <span class="w-1.5 h-1.5 rounded-full bg-cinema-cyan animate-pulse"></span>
          Mathematical Model
        </div>
        <div class="text-white text-base md:text-lg py-1 overflow-x-auto flex justify-center">
          ${renderedMath}
        </div>
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
      renderedInline = `<code class="px-1.5 py-0.5 rounded bg-white/10 text-emerald-300 font-mono text-xs">${escapeHtml(rawEq)}</code>`
    }
    return `${prefix}<span class="inline-math text-cinema-cyan">${renderedInline}</span>`
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
      const isLast = idx === stages.length - 1
      const stagePills = stage.items
        .map(
          (item) => `
          <div class="px-3.5 py-2.5 rounded-xl bg-[#0E1628] border border-white/10 hover:border-cinema-cyan/40 transition-all text-xs text-gray-200 flex items-center gap-2.5 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-cinema-cyan shrink-0"></span>
            <span class="font-medium">${formatMathFormulas(escapeHtml(item))}</span>
          </div>
        `
        )
        .join('')

      return `
        <div class="relative">
          <div class="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#0B1220] via-[#0E182A] to-[#0B1220] border border-white/10 shadow-lg hover:border-cinema-cyan/40 transition-all">
            <div class="flex items-center gap-3 mb-3.5">
              <span class="px-2.5 py-1 rounded-lg bg-cinema-cyan/15 text-cinema-cyan text-[11px] font-mono font-extrabold tracking-wider uppercase border border-cinema-cyan/30">
                PHASE ${String(idx + 1).padStart(2, '0')}
              </span>
              <h4 class="text-sm md:text-base font-bold text-white tracking-tight">${escapeHtml(stage.title)}</h4>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              ${stagePills}
            </div>
          </div>
          ${
            !isLast
              ? `
            <div class="flex justify-center my-2.5">
              <div class="w-8 h-8 rounded-full bg-[#0E1528] border border-cinema-cyan/40 flex items-center justify-center text-cinema-cyan shadow-md">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </div>
            </div>
          `
              : ''
          }
        </div>
      `
    })
    .join('')

  return `
    <div class="my-10 rounded-3xl border border-cinema-cyan/40 bg-[#070B14] p-6 md:p-8 shadow-2xl overflow-hidden">
      <div class="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
        <div class="flex items-center gap-2.5">
          <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
          <h3 class="text-xs md:text-sm font-bold font-mono uppercase tracking-wider text-cinema-cyan">${escapeHtml(title)}</h3>
        </div>
        <span class="px-2.5 py-1 rounded-full text-[10px] font-mono text-cinema-cyan bg-cinema-cyan/10 border border-cinema-cyan/20">
          ${stages.length} Architecture Stages
        </span>
      </div>
      <div class="space-y-1">
        ${stageCards}
      </div>
    </div>
  `
}

/**
 * Render structured consulting table
 */
function renderConsultingTable(title: string, headers: string[], data: string[][]): string {
  const thead = `
    <thead class="sticky top-0 z-10">
      <tr>
        ${headers
          .map(
            (h) => `
          <th class="px-4 py-3.5 text-left font-bold text-xs uppercase tracking-wider text-cinema-cyan border-b border-white/15 bg-[#0E1628] whitespace-nowrap">
            ${formatMathFormulas(escapeHtml(h))}
          </th>
        `
          )
          .join('')}
      </tr>
    </thead>
  `

  const tbody = data
    .map((row, rowIdx) => {
      const isEven = rowIdx % 2 === 0
      const rowBg = isEven ? 'bg-transparent' : 'bg-white/[0.02]'
      const cells = row
        .map((cell, cellIdx) => {
          const isFirst = cellIdx === 0
          const cellCls = isFirst ? 'font-semibold text-white' : 'text-gray-300 font-mono text-xs'

          // Format severity tags
          const cellLower = cell.toLowerCase().trim()
          if (cellLower === 'high' || cellLower.includes('high severity') || cellLower === 'danger') {
            return `<td class="px-4 py-3 border-b border-white/5 whitespace-nowrap"><span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">HIGH</span></td>`
          }
          if (cellLower === 'med' || cellLower === 'medium' || cellLower.includes('medium severity')) {
            return `<td class="px-4 py-3 border-b border-white/5 whitespace-nowrap"><span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">MEDIUM</span></td>`
          }
          if (cellLower === 'low' || cellLower.includes('low severity')) {
            return `<td class="px-4 py-3 border-b border-white/5 whitespace-nowrap"><span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">LOW</span></td>`
          }

          return `<td class="px-4 py-3 border-b border-white/5 ${cellCls} whitespace-nowrap">${formatMathFormulas(escapeHtml(cell))}</td>`
        })
        .join('')

      return `<tr class="${rowBg} hover:bg-cinema-cyan/10 transition-colors">${cells}</tr>`
    })
    .join('')

  return `
    <div class="my-8 rounded-2xl border border-white/10 bg-[#0A101D] shadow-xl overflow-hidden">
      ${
        title
          ? `
        <div class="px-5 py-3 bg-[#0E1528] border-b border-white/10 flex items-center justify-between">
          <span class="text-xs font-mono font-bold text-cinema-cyan uppercase tracking-wider">${escapeHtml(title)}</span>
          <span class="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">Data Matrix</span>
        </div>
      `
          : ''
      }
      <div class="overflow-x-auto">
        <table class="w-full text-xs md:text-sm text-left border-collapse">
          ${thead}
          <tbody class="divide-y divide-white/5">${tbody}</tbody>
        </table>
      </div>
    </div>
  `
}

function renderBlock(block: Block): string {
  const style = getAttrStyle(block)
  const styleAttr = style ? ` style="${style}"` : ''
  const { data } = block

  switch (block.type) {
    case 'heading': {
      const level = data.level || 2
      const rawText = data.text || ''
      const text = escapeHtml(rawText)

      // Section badges: "1. Executive Summary" -> "SECTION 01: Executive Summary"
      const numMatch = rawText.match(/^(\d+)\.\s+(.+)$/)
      if (numMatch && level === 2) {
        const num = numMatch[1]
        const title = escapeHtml(numMatch[2])
        return `
          <div class="mt-14 mb-6 pt-6 border-t border-white/10">
            <div class="flex items-center gap-3">
              <span class="px-3 py-1 bg-cinema-cyan/15 text-cinema-cyan font-mono font-extrabold text-xs md:text-sm rounded-lg border border-cinema-cyan/30 shrink-0">
                SECTION ${num.padStart(2, '0')}
              </span>
              <h2${styleAttr} class="text-xl md:text-2xl font-extrabold text-white tracking-tight">${title}</h2>
            </div>
          </div>
        `
      }

      const fontClasses: Record<number, string> = {
        1: 'text-2xl md:text-4xl font-extrabold text-white mt-12 mb-6 tracking-tight border-b border-white/10 pb-4',
        2: 'text-xl md:text-2xl font-bold text-white mt-12 mb-4 tracking-tight flex items-center gap-2.5 before:content-[""] before:w-1.5 before:h-6 before:bg-[#0D6E6E] before:rounded-full',
        3: 'text-lg md:text-xl font-semibold text-cinema-cyan mt-8 mb-3 flex items-center gap-2',
        4: 'text-base font-semibold text-gray-200 mt-6 mb-2',
      }
      const cls = fontClasses[level] || fontClasses[2]
      return `<h${level}${styleAttr} class="${cls}">${text}</h${level}>`
    }

    case 'paragraph': {
      const formatted = formatMathFormulas(data.html || '')
      return `<div${styleAttr} class="text-sm md:text-base text-gray-300 leading-relaxed my-4">${formatted}</div>`
    }

    case 'image': {
      const alignClass = {
        left: 'ml-0 mr-auto max-w-lg',
        center: 'mx-auto max-w-2xl',
        right: 'ml-auto mr-0 max-w-lg',
        full: 'w-full',
      }[data.alignment || 'center']
      const img = `<img src="${escapeHtml(data.src || '')}" alt="${escapeHtml(data.alt || '')}" class="block-image rounded-2xl border border-white/15 shadow-2xl ${alignClass} object-cover" loading="lazy" />`
      const cap = data.caption ? `<figcaption class="text-center text-xs text-gray-400 mt-3 font-mono">▲ ${escapeHtml(data.caption)}</figcaption>` : ''
      return `<figure${styleAttr} class="block-figure my-8 overflow-hidden">${img}${cap}</figure>`
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

      // Render Code Window
      const title = parsed.title || data.titleText || 'System Pipeline'
      return `
        <div${styleAttr} class="my-8 rounded-2xl border border-white/10 bg-[#080D1A] overflow-hidden shadow-2xl">
          <div class="px-5 py-3 bg-[#0E1528] border-b border-white/10 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span class="ml-2 text-xs font-mono font-bold text-cinema-cyan uppercase tracking-wider">${escapeHtml(title)}</span>
            </div>
            <span class="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">Architecture Blueprint</span>
          </div>
          <div class="p-5 overflow-x-auto bg-[#070C18]">
            <pre class="font-mono text-xs md:text-sm text-emerald-300 leading-relaxed bg-transparent border-none p-0 m-0 whitespace-pre"><code>${escapeHtml(parsed.code)}</code></pre>
          </div>
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
          const trendColor = item.trend === 'up' ? 'text-emerald-400' : item.trend === 'down' ? 'text-rose-400' : 'text-cinema-cyan'
          const trendBg = item.trend === 'up' ? 'bg-emerald-500/10 border-emerald-500/20' : item.trend === 'down' ? 'bg-rose-500/10 border-rose-500/20' : 'bg-cinema-cyan/10 border-cinema-cyan/20'
          return `
            <div class="bg-gradient-to-b from-[#121B2E] to-[#0A101D] border border-white/10 hover:border-cinema-cyan/40 transition-all rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <span class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">${escapeHtml(item.label)}</span>
              <div class="text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight">${escapeHtml(item.value)}</div>
              ${item.change ? `<div class="mt-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono border ${trendBg} ${trendColor} self-start">${trendIcon} ${escapeHtml(item.change)}</div>` : ''}
            </div>
          `
        })
        .join('')

      return `
        <div${styleAttr} class="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${cards}
        </div>
      `
    }

    case 'callout': {
      const variantStyles: Record<string, { border: string; bg: string; text: string; icon: string; titleColor: string }> = {
        info: { border: 'border-cyan-500/40', bg: 'bg-cyan-950/30', text: 'text-cyan-100', icon: '💡', titleColor: 'text-cyan-300' },
        warning: { border: 'border-amber-500/40', bg: 'bg-amber-950/30', text: 'text-amber-100', icon: '⚠️', titleColor: 'text-amber-300' },
        success: { border: 'border-emerald-500/40', bg: 'bg-emerald-950/30', text: 'text-emerald-100', icon: '✅', titleColor: 'text-emerald-300' },
        danger: { border: 'border-rose-500/40', bg: 'bg-rose-950/30', text: 'text-rose-100', icon: '🛑', titleColor: 'text-rose-300' },
      }
      const cfg = variantStyles[data.variant || 'info'] || variantStyles.info
      return `
        <div${styleAttr} class="my-6 rounded-2xl border ${cfg.border} ${cfg.bg} p-6 shadow-xl backdrop-blur-sm">
          <div class="flex items-start gap-4">
            <span class="text-2xl shrink-0 p-2 rounded-xl bg-white/5 border border-white/10">${data.icon || cfg.icon}</span>
            <div class="flex-1 min-w-0">
              ${data.title ? `<p class="font-bold text-xs uppercase tracking-wider ${cfg.titleColor} mb-2 flex items-center gap-2"><span>${escapeHtml(data.title)}</span></p>` : ''}
              <div class="text-xs md:text-sm leading-relaxed ${cfg.text}">${formatMathFormulas(escapeHtml(data.content || ''))}</div>
            </div>
          </div>
        </div>
      `
    }

    case 'quote': {
      return `
        <blockquote${styleAttr} class="my-8 relative border-l-4 border-cinema-cyan bg-gradient-to-r from-cinema-cyan/10 via-white/5 to-transparent rounded-r-2xl p-6 md:p-8 italic text-gray-200 text-base md:text-lg shadow-xl">
          <div class="text-3xl text-cinema-cyan font-serif leading-none mb-2">“</div>
          <p class="leading-relaxed relative z-10">${escapeHtml(data.quote || '')}</p>
          ${data.attribution ? `<cite class="block mt-4 text-xs md:text-sm text-cinema-cyan font-bold not-italic font-mono uppercase tracking-wider">— ${escapeHtml(data.attribution)}</cite>` : ''}
        </blockquote>
      `
    }

    case 'divider': {
      return `<hr${styleAttr} class="border-none h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12" />`
    }

    case 'columns': {
      const cols = data.columns || []
      const colClass = cols.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
      const innerCols = cols
        .map((colBlocks) => `<div class="space-y-4">${renderBlocks(colBlocks)}</div>`)
        .join('')
      return `<div${styleAttr} class="grid grid-cols-1 ${colClass} gap-6 my-8">${innerCols}</div>`
    }

    case 'list': {
      const items = (data.items || [])
        .map((item, idx) => {
          const itemFormatted = formatMathFormulas(item)
          if (data.listStyle === 'numbered') {
            return `
            <li class="flex items-start gap-3 leading-relaxed">
              <span class="px-2 py-0.5 rounded-md bg-cinema-cyan/15 text-cinema-cyan font-mono text-xs font-bold border border-cinema-cyan/30 shrink-0 mt-0.5">${String(idx + 1).padStart(2, '0')}</span>
              <div class="flex-1">${itemFormatted}</div>
            </li>
          `
          }
          return `<li class="leading-relaxed">${itemFormatted}</li>`
        })
        .join('')

      if (data.listStyle === 'numbered') {
        return `<ul${styleAttr} class="my-6 space-y-3.5 text-sm md:text-base text-gray-300 list-none p-0">${items}</ul>`
      }

      const ls =
        data.listStyle === 'check'
          ? 'list-none space-y-2.5 [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:before:content-["✓"] [&_li]:before:text-emerald-400 [&_li]:before:font-bold'
          : 'list-disc list-outside pl-6 space-y-2 text-gray-300'
      return `<ul${styleAttr} class="my-6 text-sm md:text-base text-gray-300 ${ls}">${items}</ul>`
    }

    case 'embed': {
      const url = data.url || ''
      if (data.embedType === 'youtube') {
        const ytMatch = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
        const vid = ytMatch ? ytMatch[1] : ''
        if (!vid) return `<div class="text-gray-500 text-xs">Invalid YouTube URL</div>`
        return `<div${styleAttr} class="my-8 aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <iframe src="https://www.youtube.com/embed/${vid}" class="w-full h-full" frameborder="0" allowfullscreen loading="lazy"></iframe>
        </div>`
      }
      return `<a${styleAttr} href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="block my-6 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-cinema-cyan hover:bg-white/10 transition-all font-mono text-xs">${escapeHtml(url)}</a>`
    }

    case 'button': {
      const btnStyles: Record<string, string> = {
        primary: 'bg-[#0D6E6E] text-white hover:bg-[#0F9E9E] shadow-[0_0_20px_rgba(13,110,110,0.4)]',
        outline: 'bg-transparent border-2 border-[#0D6E6E] text-cinema-cyan hover:bg-[#0D6E6E] hover:text-white',
        ghost: 'bg-white/5 text-white hover:bg-white/10',
      }
      const cls = btnStyles[data.buttonStyle || 'primary']
      return `
        <div${styleAttr} class="my-8 flex justify-center">
          <a href="${escapeHtml(data.href || '#')}" class="inline-flex items-center px-8 py-3.5 rounded-xl font-bold text-xs md:text-sm uppercase tracking-wider transition-all ${cls}">
            ${escapeHtml(data.label || 'Read Full Model')} →
          </a>
        </div>
      `
    }

    case 'spacer': {
      const height = data.height || 32
      return `<div${styleAttr} style="height: ${height}px"></div>`
    }

    default:
      return `<!-- unknown block type: ${(block as Block).type} -->`
  }
}

export function renderBlocks(blocks: Block[]): string {
  return blocks
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(renderBlock)
    .join('\n')
}
