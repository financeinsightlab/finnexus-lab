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
  icon: string // lucide icon name
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
    type: 'quote',
    label: 'Blockquote',
    description: 'Highlighted quote or pull quote',
    icon: 'Quote',
    category: 'text',
    defaultData: { quote: 'Enter your quote here...', attribution: '' }
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
    type: 'columns',
    label: 'Columns',
    description: '2 or 3 column side-by-side layout',
    icon: 'Columns',
    category: 'layout',
    defaultData: { 
      columnCount: 2,
      columns: [
        [{ id: 'col-l-1', type: 'paragraph', data: { html: '<p>Left column content...</p>' }, order: 0 }],
        [{ id: 'col-r-1', type: 'paragraph', data: { html: '<p>Right column content...</p>' }, order: 0 }]
      ]
    }
  },
  {
    type: 'callout',
    label: 'Callout Box',
    description: 'Info, Warning, Success, or Danger callout',
    icon: 'AlertTriangle',
    category: 'layout',
    defaultData: { variant: 'info', title: 'Key Insight', content: 'Add your callout content here...', icon: '💡' }
  },
  {
    type: 'list',
    label: 'List',
    description: 'Bullet, numbered, or checklist',
    icon: 'List',
    category: 'text',
    defaultData: { items: ['First item', 'Second item', 'Third item'], listStyle: 'bullet' }
  },
  {
    type: 'embed',
    label: 'Embed',
    description: 'YouTube video or Tweet embed',
    icon: 'Play',
    category: 'media',
    defaultData: { url: '', embedType: 'youtube' }
  },
  {
    type: 'button',
    label: 'Button',
    description: 'Call-to-action button',
    icon: 'MousePointer',
    category: 'interactive',
    defaultData: { label: 'Read More', href: '#', buttonStyle: 'primary' }
  },
  {
    type: 'spacer',
    label: 'Spacer',
    description: 'Vertical spacing block',
    icon: 'ArrowUpDown',
    category: 'layout',
    defaultData: { height: 48 }
  },
  {
    type: 'table',
    label: 'Table',
    description: 'Data table with rows and columns',
    icon: 'Layout', // using Layout as table icon fallback or choose another
    category: 'text',
    defaultData: { 
      hasHeaderRow: true, 
      tableData: [
        ['Header 1', 'Header 2'],
        ['Row 1, Cell 1', 'Row 1, Cell 2'],
        ['Row 2, Cell 1', 'Row 2, Cell 2'],
      ]
    }
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
  { id: 'text', label: 'Text', icon: 'Type' },
  { id: 'media', label: 'Media', icon: 'Image' },
  { id: 'layout', label: 'Layout', icon: 'Layout' },
  { id: 'interactive', label: 'Interactive', icon: 'Zap' },
] as const

/**
 * Convert markdown or HTML text to an array of blocks
 * Basic parsing: headings, paragraphs, lists, images, etc.
 */
export function markdownToBlocks(content: string): Block[] {
  if (!content.trim()) return []
  
  // Check if content looks like HTML (contains tags)
  const isHtml = /<[a-z][\s\S]*>/i.test(content)
  
  if (isHtml) {
    return htmlToBlocks(content)
  } else {
    return markdownTextToBlocks(content)
  }
}

/**
 * Convert HTML content to blocks
 */
function htmlToBlocks(html: string): Block[] {
  const blocks: Block[] = []
  
  // Very basic HTML parsing - in a real app you'd use a proper parser
  // This is a simplified version that extracts common elements
  
  // Extract headings
  const headingRegex = /<h([1-4])[^>]*>(.*?)<\/h\1>/gi
  let match
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]) as 1 | 2 | 3 | 4
    const text = match[2].replace(/<[^>]*>/g, '').trim()
    if (text) {
      blocks.push(createBlock('heading', { text, level }))
    }
  }
  
  // Extract paragraphs (simplified - just take the whole content as one paragraph)
  // For now, we'll create a single paragraph block with the HTML
  // This preserves formatting but loses structure
  const hasHeadings = blocks.length > 0
  const remainingHtml = html.replace(/<h[1-4][^>]*>.*?<\/h[1-4]>/gi, '').trim()
  
  if (remainingHtml) {
    // Check if it's just whitespace
    if (remainingHtml.replace(/<\/?[^>]+(>|$)/g, '').trim()) {
      blocks.push(createBlock('paragraph', { html: remainingHtml }))
    }
  } else if (!hasHeadings) {
    // No headings found, use entire HTML as paragraph
    blocks.push(createBlock('paragraph', { html }))
  }
  
  // Assign order indices
  return blocks.map((block, index) => ({
    ...block,
    order: index
  }))
}

/**
 * Convert markdown text to blocks (original implementation)
 */
function markdownTextToBlocks(markdown: string): Block[] {
  if (!markdown.trim()) return []
  
  const lines = markdown.split('\n')
  const blocks: Block[] = []
  let currentParagraph: string[] = []
  
  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join('\n').trim()
      if (text) {
        blocks.push(createBlock('paragraph', {
          html: `<p>${text.replace(/\n/g, '<br/>')}</p>`
        }))
      }
      currentParagraph = []
    }
  }
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd()
    
    // Empty line - paragraph break
    if (!line) {
      flushParagraph()
      continue
    }
    
    // Heading: # Heading
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/)
    if (headingMatch) {
      flushParagraph()
      const level = headingMatch[1].length as 1 | 2 | 3 | 4
      const text = headingMatch[2]
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
    
    // Blockquote: > quote
    if (line.startsWith('> ')) {
      flushParagraph()
      const quote = line.substring(2)
      blocks.push(createBlock('quote', { quote }))
      continue
    }
    
    // Horizontal rule: --- or ***
    if (/^---$|^\*\*\*$/.test(line)) {
      flushParagraph()
      blocks.push(createBlock('divider', {}))
      continue
    }
    
    // List item: - item or * item or 1. item
    if (/^\s*[-*+]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      flushParagraph()
      // For simplicity, we'll collect list items and create a list block
      // This is a simplified implementation - in reality you'd need to handle nested lists
      const items: string[] = []
      while (i < lines.length && (/^\s*[-*+]\s+/.test(lines[i]) || /^\s*\d+\.\s+/.test(lines[i]))) {
        const item = lines[i].replace(/^\s*[-*+]\s+/, '').replace(/^\s*\d+\.\s+/, '')
        items.push(item)
        i++
      }
      i-- // adjust index
      blocks.push(createBlock('list', {
        items,
        listStyle: /^\s*\d+\.\s+/.test(line) ? 'numbered' : 'bullet'
      }))
      continue
    }
    
    // Regular text line
    currentParagraph.push(line)
  }
  
  flushParagraph()
  
  // Assign order indices
  return blocks.map((block, index) => ({
    ...block,
    order: index
  }))
}
