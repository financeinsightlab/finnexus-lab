'use client'

import { useState, useCallback, useRef } from 'react'
import { Block, BlockType, createBlock, BLOCK_REGISTRY } from '@/lib/blocks/registry'
import BlockSidebar from './BlockSidebar'
import BlockCanvas from './BlockCanvas'
import BlockSettingsPanel from './BlockSettingsPanel'
import { Monitor, Tablet, Smartphone, LayoutTemplate, Eye, PanelLeftClose, PanelLeftOpen } from 'lucide-react'

interface BlockEditorProps {
  initialBlocks?: Block[]
  onChange: (blocks: Block[]) => void
}

type PreviewMode = 'desktop' | 'tablet' | 'mobile'

export default function BlockEditor({ initialBlocks = [], onChange }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop')
  const [showTemplates, setShowTemplates] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dragOverIndex = useRef<number | null>(null)

  const selectedBlock = blocks.find(b => b.id === selectedBlockId) || null

  const updateBlocks = useCallback((updated: Block[]) => {
    // Re-assign order indices
    const reordered = updated.map((b, i) => ({ ...b, order: i }))
    setBlocks(reordered)
    onChange(reordered)
  }, [onChange])

  // Add a new block of a given type at the end or after selectedBlock
  const addBlock = useCallback((type: BlockType) => {
    const newBlock = createBlock(type)
    let insertAt = blocks.length

    if (selectedBlockId) {
      const idx = blocks.findIndex(b => b.id === selectedBlockId)
      if (idx >= 0) insertAt = idx + 1
    }

    const updated = [
      ...blocks.slice(0, insertAt),
      newBlock,
      ...blocks.slice(insertAt)
    ]
    updateBlocks(updated)
    setSelectedBlockId(newBlock.id)
  }, [blocks, selectedBlockId, updateBlocks])

  // Update specific block's data
  const updateBlock = useCallback((id: string, data: Partial<Block['data']>, attributes?: Partial<Block['attributes']>) => {
    const updated = blocks.map(b =>
      b.id === id
        ? {
            ...b,
            data: { ...b.data, ...data },
            attributes: { ...(b.attributes || {}), ...(attributes || {}) }
          }
        : b
    )
    updateBlocks(updated)
  }, [blocks, updateBlocks])

  // Delete a block
  const deleteBlock = useCallback((id: string) => {
    const updated = blocks.filter(b => b.id !== id)
    updateBlocks(updated)
    if (selectedBlockId === id) setSelectedBlockId(null)
  }, [blocks, selectedBlockId, updateBlocks])

  // Move block up/down
  const moveBlock = useCallback((id: string, direction: 'up' | 'down') => {
    const idx = blocks.findIndex(b => b.id === id)
    if (idx < 0) return
    if (direction === 'up' && idx === 0) return
    if (direction === 'down' && idx === blocks.length - 1) return

    const updated = [...blocks]
    const swap = direction === 'up' ? idx - 1 : idx + 1
    ;[updated[idx], updated[swap]] = [updated[swap], updated[idx]]
    updateBlocks(updated)
  }, [blocks, updateBlocks])

  // Duplicate a block
  const duplicateBlock = useCallback((id: string) => {
    const idx = blocks.findIndex(b => b.id === id)
    if (idx < 0) return
    const original = blocks[idx]
    const dup: Block = {
      ...original,
      id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    }
    const updated = [
      ...blocks.slice(0, idx + 1),
      dup,
      ...blocks.slice(idx + 1)
    ]
    updateBlocks(updated)
    setSelectedBlockId(dup.id)
  }, [blocks, updateBlocks])

  // Handle drag-reorder from canvas
  const onDragReorder = useCallback((fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return
    const updated = [...blocks]
    const [moved] = updated.splice(fromIndex, 1)
    updated.splice(toIndex, 0, moved)
    updateBlocks(updated)
  }, [blocks, updateBlocks])

  const previewWidths: Record<PreviewMode, string> = {
    desktop: 'w-full',
    tablet: 'w-full max-w-[768px] mx-auto border border-border rounded-2xl bg-surface shadow-2xl',
    mobile: 'w-full max-w-[375px] mx-auto border-[8px] border-[#1A1F2E] rounded-[3rem] bg-surface shadow-2xl overflow-y-auto aspect-[9/19]',
  }

  return (
    <div className="relative flex h-full min-w-0 bg-surface-muted overflow-hidden">
      {/* Left: Block Palette Sidebar */}
      {sidebarOpen && (
        <>
          <button
            type="button"
            aria-label="Close block library"
            className="xl:hidden absolute inset-0 z-20 bg-background/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 z-30 w-[min(16rem,calc(100vw-2rem))] xl:relative xl:inset-auto xl:z-auto xl:w-64">
            <BlockSidebar
              onAddBlock={addBlock}
              onShowTemplates={() => setShowTemplates(true)}
            />
          </div>
        </>
      )}

      {/* Center: Canvas */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Canvas toolbar */}
        <div className="h-12 flex items-center justify-between gap-2 px-2 sm:px-4 bg-surface border-b border-border shrink-0">
          <div className="flex items-center gap-1 sm:gap-2 text-content-muted">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-1.5 hover:text-content-primary transition-colors bg-surface-muted rounded-lg"
              title="Toggle Block Library"
            >
              {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
            </button>
            <div className="w-px h-6 bg-border-subtle mx-1"></div>
            <div className="flex items-center gap-1 bg-surface-muted p-1 rounded-xl">
            {([
              { mode: 'desktop', icon: Monitor },
              { mode: 'tablet', icon: Tablet },
              { mode: 'mobile', icon: Smartphone },
            ] as const).map(({ mode, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setPreviewMode(mode)}
                className={`p-2 rounded-lg transition-all ${
                  previewMode === mode
                    ? 'bg-primary text-primary-foreground shadow'
                    : 'text-content-muted hover:text-content-primary'
                }`}
                title={mode}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs font-bold text-content-muted uppercase tracking-widest">
            <Eye className="w-4 h-4" />
            {blocks.length} Block{blocks.length !== 1 ? 's' : ''}
          </div>
          <button
            onClick={() => setShowTemplates(true)}
            className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-accent-violet-muted text-accent-violet hover:bg-accent-violet hover:text-content-inverse transition-all text-xs font-bold"
          >
            <LayoutTemplate className="w-4 h-4" />
            <span className="hidden sm:inline">Templates</span>
          </button>
        </div>

        {/* Scrollable Canvas Area */}
        <div className="flex-1 min-w-0 overflow-y-auto bg-surface p-3 sm:p-6">
          <div className={`transition-all duration-300 ${previewWidths[previewMode]}`}>
            <BlockCanvas
              blocks={blocks}
              selectedBlockId={selectedBlockId}
              onSelectBlock={setSelectedBlockId}
              onDeleteBlock={deleteBlock}
              onDuplicateBlock={duplicateBlock}
              onMoveBlock={moveBlock}
              onDragReorder={onDragReorder}
              onAddBlock={addBlock}
            />
          </div>
        </div>
      </div>

      {/* Right: Settings Panel */}
      {selectedBlock && (
        <>
          <button
            type="button"
            aria-label="Close block settings"
            className="xl:hidden absolute inset-0 z-30 bg-background/40"
            onClick={() => setSelectedBlockId(null)}
          />
          <div className="absolute inset-y-0 right-0 z-40 w-[min(18rem,calc(100vw-2rem))] xl:relative xl:inset-auto xl:z-auto xl:w-72">
            <BlockSettingsPanel
              block={selectedBlock}
              onUpdate={(data, attrs) => updateBlock(selectedBlock.id, data, attrs)}
              onDelete={() => deleteBlock(selectedBlock.id)}
              onClose={() => setSelectedBlockId(null)}
            />
          </div>
        </>
      )}
    </div>
  )
}
