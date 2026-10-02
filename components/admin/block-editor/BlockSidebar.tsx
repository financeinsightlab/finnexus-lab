'use client'

import { useState } from 'react'
import { BLOCK_REGISTRY, BLOCK_CATEGORIES, BlockType } from '@/lib/blocks/registry'
import {
  AlignLeft, Heading, Image, Quote, Minus, Columns, AlertTriangle,
  List, Play, MousePointer, ArrowUpDown, Type, Layout, Zap, Search, LayoutTemplate
} from 'lucide-react'

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  AlignLeft, Heading, Image, Quote, Minus, Columns, AlertTriangle,
  List, Play, MousePointer, ArrowUpDown, Type, Layout, Zap,
}

interface BlockSidebarProps {
  onAddBlock: (type: BlockType) => void
  onShowTemplates: () => void
}

export default function BlockSidebar({ onAddBlock, onShowTemplates }: BlockSidebarProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filtered = BLOCK_REGISTRY.filter(block => {
    const matchesSearch = block.label.toLowerCase().includes(search.toLowerCase()) ||
      block.description.toLowerCase().includes(search.toLowerCase())
    const matchesCat = activeCategory === 'all' || block.category === activeCategory
    return matchesSearch && matchesCat
  })

  return (
    <div className="w-64 bg-surface border-r border-border flex flex-col shrink-0 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <p className="text-[10px] font-extrabold text-brand uppercase tracking-[0.2em] mb-3">Block Library</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-content-muted" />
          <input
            type="text"
            placeholder="Search blocks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-surface-muted border border-border rounded-xl text-xs text-content-primary placeholder:text-content-muted outline-none focus:border-brand/50"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-3 pt-3 pb-0">
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
              activeCategory === 'all' ? 'bg-primary text-primary-foreground' : 'text-content-muted hover:text-content-primary hover:bg-accent'
            }`}
          >
            All
          </button>
          {BLOCK_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat.id ? 'bg-primary text-primary-foreground' : 'text-content-muted hover:text-content-primary hover:bg-accent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Block List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {filtered.map(block => {
          const Icon = ICON_MAP[block.icon] || AlignLeft
          return (
            <button
              key={block.type}
              onClick={() => onAddBlock(block.type)}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface-muted hover:bg-primary/10 hover:border-brand/30 border border-transparent transition-all text-left group"
              title={block.description}
            >
              <div className="w-8 h-8 rounded-lg bg-surface-muted border border-border flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-brand/30 transition-all">
                <Icon className="w-4 h-4 text-content-secondary group-hover:text-brand" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-content-secondary group-hover:text-content-primary transition-colors">{block.label}</p>
                <p className="text-[10px] text-content-muted group-hover:text-content-secondary transition-colors truncate">{block.description}</p>
              </div>
            </button>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-8 text-content-muted text-xs">
            No blocks match your search
          </div>
        )}
      </div>

      {/* Templates Button */}
      <div className="p-3 border-t border-border">
        <button
          onClick={onShowTemplates}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-accent-violet-muted text-accent-violet hover:bg-accent-violet hover:text-content-inverse transition-all text-xs font-bold border border-accent-violet/20 hover:border-accent-violet"
        >
          <LayoutTemplate className="w-4 h-4" />
          Browse Templates
        </button>
      </div>
    </div>
  )
}
