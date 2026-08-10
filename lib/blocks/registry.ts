// ─── Block Type Registry ─────────────────────────────────────────────────────
// Central registry of all supported block types, their default data, 
// and metadata (icon, label, category).

export type BlockType = 
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'quote'
  | 'divider'
  | 'columns'
  | 'callout'
  | 'list'
  | 'embed'
  | 'button'
  | 'spacer'
  | 'table'
  | 'diagram'
  | 'metrics'

export interface MetricItem {
  value: string
  label: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: string
}

export interface BlockData {
  // heading
  text?: string
  level?: 1 | 2 | 3 | 4
  // paragraph
  html?: string
  // image
  src?: string
  alt?: string
  caption?: string
  alignment?: 'left' | 'center' | 'right' | 'full'
  // quote
  quote?: string
  attribution?: string
  // columns
  columns?: Block[][]
  columnCount?: 2 | 3
  // callout
  icon?: string
  variant?: 'info' | 'warning' | 'success' | 'danger'
  title?: string
  content?: string
  // list
  items?: string[]
  listStyle?: 'bullet' | 'numbered' | 'check'
  // embed
  url?: string
  embedType?: 'youtube' | 'twitter' | 'generic'
  // button
  label?: string
  href?: string
  buttonStyle?: 'primary' | 'outline' | 'ghost'
  // spacer
  height?: number
  // table
  tableData?: string[][]
  hasHeaderRow?: boolean
  // diagram / flow
  titleText?: string
  code?: string
  language?: string
  // metrics
  metrics?: MetricItem[]
}

export interface BlockAttributes {
  className?: string
  id?: string
  backgroundColor?: string
  textColor?: string
  padding?: string
  margin?: string
  borderRadius?: string
  textAlign?: 'left' | 'center' | 'right'
  fontWeight?: 'normal' | 'bold'
  fontSize?: string
}

export interface Block {
  id: string
  type: BlockType
  data: BlockData
  attributes?: BlockAttributes
  order: number
  children?: Block[]
}

export interface BlockMeta {
  type: BlockType
  label: string
  description: string
  icon: string
  category: 'text' | 'media' | 'layout' | 'interactive'
  defaultData: BlockData
}

// Registry of all block types with defaults
export const BLOCK_REGISTRY: BlockMeta[] = [
  {
    type: 'heading',
    label: 'Heading',
    description: 'Section heading (H1–H4)',
    icon: 'Heading',
    category: 'text',
    defaultData: { text: 'Section Heading', level: 2 }
  },
  {
    type: 'paragraph',
    label: 'Paragraph',
    description: 'Rich text paragraph block',
    icon: 'AlignLeft',
    category: 'text',
    defaultData: { html: '<p>Start writing your content here...</p>' }
  },
  {
    type: 'image',
    label: 'Image',
    description: 'Single image with optional caption',
    icon: 'Image',
    category: 'media',
    defaultData: { src: '', alt: '', caption: '', alignment: 'center' }
  },
  {
    type: 'table',
    label: 'Data Table',
    description: 'Structured financial and quantitative table',
    icon: 'Layout',
    category: 'text',
    defaultData: { 
      hasHeaderRow: true, 
      tableData: [
        ['Metric', 'FY24', 'FY25', 'FY26E'],
        ['Revenue (₹ Cr)', '₹1,200', '₹2,400', '₹4,800'],
        ['EBITDA Margin', '-12.5%', '+2.4%', '+11.3%'],
      ]
    }
  },
  {
    type: 'diagram',
    label: 'Flow Diagram / Architecture',
    description: 'System workflow, process flow or architecture diagram',
    icon: 'Activity',
    category: 'interactive',
    defaultData: {
      titleText: 'Process & System Architecture',
      code: `+-------------------------------------------------------------+\n|                   SYSTEM WORKFLOW PIPELINE                  |\n+-------------------------------------------------------------+\n| [Data Ingestion] ---> [Validation Engine] ---> [Execution]  |\n+-------------------------------------------------------------+`,
      language: 'text'
    }
  },
  {
    type: 'metrics',
    label: 'Key Metrics Grid',
    description: '3-4 key performance metric highlights',
    icon: 'BarChart2',
    category: 'interactive',
    defaultData: {
      metrics: [
        { label: 'EBITDA Margin', value: '+11.3%', change: '+890 bps YoY', trend: 'up' },
        { label: 'Avg Order Value', value: '₹585', change: '+14.7%', trend: 'up' },
        { label: 'Dark Store Density', value: '1 / 1.8 sq km', change: 'Tier-1 Hub', trend: 'neutral' },
      ]
    }
  },
  {
    type: 'callout',
    label: 'Callout Box',
    description: 'Info, Warning, Success, or Key Insight callout',
    icon: 'AlertTriangle',
    category: 'layout',
    defaultData: { variant: 'info', title: 'Executive Key Takeaway', content: 'Add your strategic insight here...', icon: '💡' }
  },
  {
    type: 'quote',
    label: 'Blockquote',
    description: 'Highlighted quote or analyst perspective',
    icon: 'Quote',
    category: 'text',
    defaultData: { quote: 'Enter your quote here...', attribution: 'Kunwar Analytics Research Desk' }
  },
  {
    type: 'list',
    label: 'List',
    description: 'Bullet, numbered, or checklist',
    icon: 'List',
    category: 'text',
    defaultData: { items: ['First analytical finding', 'Second strategic thesis', 'Third risk factor'], listStyle: 'bullet' }
  },
  {
    type: 'columns',
    label: 'Columns',
    description: '2 or 3 column side-by-side layout',
    icon: 'Columns',
    category: 'layout',
    defaultData: { 
      columnCount: 2,
      columns: [
        [{ id: 'col-l-1', type: 'paragraph', data: { html: '<p>Left column analysis...</p>' }, order: 0 }],
        [{ id: 'col-r-1', type: 'paragraph', data: { html: '<p>Right column analysis...</p>' }, order: 0 }]
      ]
    }
  },
  {
    type: 'divider',
    label: 'Divider',
    description: 'Horizontal rule separator',
    icon: 'Minus',
    category: 'layout',
    defaultData: {}
  },
  {
    type: 'button',
    label: 'CTA Button',
    description: 'Call-to-action button',
    icon: 'MousePointer',
    category: 'interactive',
    defaultData: { label: 'Explore Interactive Model', href: '#', buttonStyle: 'primary' }
  },
  {
    type: 'spacer',
    label: 'Spacer',
    description: 'Vertical spacing block',
    icon: 'ArrowUpDown',
    category: 'layout',
    defaultData: { height: 32 }
  }
]

export function getBlockMeta(type: BlockType): BlockMeta | undefined {
  return BLOCK_REGISTRY.find(b => b.type === type)
}

export function createBlock(type: BlockType, overrides: Partial<BlockData> = {}): Block {
  const meta = getBlockMeta(type)
  return {
    id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    data: { ...meta?.defaultData, ...overrides },
    order: 0
  }
}

export const BLOCK_CATEGORIES = [
  { id: 'text', label: 'Text & Data', icon: 'Type' },
  { id: 'media', label: 'Media & Visuals', icon: 'Image' },
  { id: 'layout', label: 'Layout & Structure', icon: 'Layout' },
  { id: 'interactive', label: 'Interactive & Diagrams', icon: 'Zap' },
] as const

/**
 * Convert markdown text to high-fidelity structured blocks
 */
export function markdownToBlocks(content: string): Block[] {
  if (!content.trim()) return []

  const lines = content.split('\n')
  const blocks: Block[] = []
  let currentParagraph: string[] = []

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join('\n').trim()
      if (text) {
        // Convert bold, italics and basic links
        const formatted = text
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
          .replace(/\*([^*]+)\*/g, '<em>$1</em>')
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cinema-cyan underline">$1</a>')
          .replace(/\n/g, '<br/>')

        blocks.push(createBlock('paragraph', {
          html: `<p>${formatted}</p>`
        }))
      }
      currentParagraph = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd()

    // Empty line - paragraph break
    if (!line.trim()) {
      flushParagraph()
      continue
    }

    // Code block / Diagram: ```...```
    if (line.trim().startsWith('```')) {
      flushParagraph()
      const lang = line.trim().slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      const fullCode = codeLines.join('\n')
      blocks.push(createBlock('diagram', {
        titleText: 'System Architecture & Data Flow',
        code: fullCode,
        language: lang || 'text'
      }))
      continue
    }

    // Markdown Table: | col1 | col2 |
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      flushParagraph()
      const tableRows: string[][] = []
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        const rowLine = lines[i].trim()
        // Skip separator row |---|---|
        if (!/^\|[\s\-:|]+\|$/.test(rowLine)) {
          const cells = rowLine
            .slice(1, -1)
            .split('|')
            .map(c => c.trim().replace(/\*\*([^*]+)\*\*/g, '$1'))
          tableRows.push(cells)
        }
        i++
      }
      i-- // adjust index
      if (tableRows.length > 0) {
        blocks.push(createBlock('table', {
          hasHeaderRow: true,
          tableData: tableRows
        }))
      }
      continue
    }

    // Heading: # Heading
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/)
    if (headingMatch) {
      flushParagraph()
      const level = headingMatch[1].length as 1 | 2 | 3 | 4
      const text = headingMatch[2].replace(/\*\*([^*]+)\*\*/g, '$1').trim()
      blocks.push(createBlock('heading', { text, level }))
      continue
    }

    // Image: ![alt](src "caption")
    const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)(?:\s+"([^"]+)")?\)/)
    if (imageMatch) {
      flushParagraph()
      const [, alt, src, caption] = imageMatch
      blocks.push(createBlock('image', { src, alt, caption }))
      continue
    }

    // Blockquote / Callout / Interview Excerpt: > quote
    if (line.startsWith('> ')) {
      flushParagraph()
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].substring(2).trim())
        i++
      }
      i-- // adjust index

      const fullQuote = quoteLines.join('\n')
      
      // Check if it's an interview or strategic pull-quote
      if (fullQuote.toLowerCase().includes('interview excerpt') || fullQuote.includes('“') || fullQuote.includes('*"')) {
        const parts = fullQuote.split('\n')
        let title = 'Strategic Industry Perspective'
        let quoteText = fullQuote
        if (parts[0].startsWith('**') && parts[0].endsWith('**')) {
          title = parts[0].replace(/\*\*/g, '')
          quoteText = parts.slice(1).join('\n').replace(/^[\*"]+|[\*"]+$/g, '').trim()
        }
        blocks.push(createBlock('quote', {
          quote: quoteText,
          attribution: title
        }))
        continue
      }

      // Check if it's a strategic callout
      if (
        fullQuote.toLowerCase().startsWith('**key') ||
        fullQuote.toLowerCase().startsWith('**note') ||
        fullQuote.toLowerCase().startsWith('**insight') ||
        fullQuote.toLowerCase().startsWith('**warning') ||
        fullQuote.toLowerCase().startsWith('**takeaway')
      ) {
        const isWarning = fullQuote.toLowerCase().startsWith('**warning') || fullQuote.toLowerCase().startsWith('**risk')
        const isSuccess = fullQuote.toLowerCase().startsWith('**recommendation') || fullQuote.toLowerCase().startsWith('**action')
        blocks.push(createBlock('callout', {
          variant: isWarning ? 'warning' : isSuccess ? 'success' : 'info',
          title: 'Strategic Takeaway',
          content: fullQuote.replace(/^\*\*[^*]+\*\*[:\-]?\s*/, ''),
          icon: isWarning ? '⚠️' : isSuccess ? '🎯' : '💡'
        }))
        continue
      }

      blocks.push(createBlock('quote', { quote: fullQuote }))
      continue
    }

    // Horizontal rule: --- or ***
    if (/^---$|^\*\*\*$/.test(line.trim())) {
      flushParagraph()
      blocks.push(createBlock('divider', {}))
      continue
    }

    // List items
    if (/^\s*[-*+]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      flushParagraph()
      const items: string[] = []
      const isNumbered = /^\s*\d+\.\s+/.test(line)
      while (i < lines.length && (/^\s*[-*+]\s+/.test(lines[i]) || /^\s*\d+\.\s+/.test(lines[i]))) {
        const itemText = lines[i].replace(/^\s*[-*+]\s+/, '').replace(/^\s*\d+\.\s+/, '').trim()
        items.push(itemText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'))
        i++
      }
      i--
      blocks.push(createBlock('list', {
        items,
        listStyle: isNumbered ? 'numbered' : 'bullet'
      }))
      continue
    }

    // Regular line in paragraph
    currentParagraph.push(line)
  }

  flushParagraph()

  return blocks.map((b, idx) => ({ ...b, order: idx }))
}
