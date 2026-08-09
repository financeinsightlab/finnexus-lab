"use client"

import { useState, useMemo } from 'react'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import StudyCard from './StudyCard'
import CoursesSection from './CoursesSection'

interface StudyMaterial {
  id: string
  title: string
  slug: string
  description: string
  type: string
  difficulty: string
  duration: number | null
  viewCount: number
  coverImage: string | null
  tags: string[]
  featured: boolean
  publishedAt: string | null
  category: { id: string; name: string; slug: string; icon: string | null; color: string | null }
  author: { id: string; name: string | null }
}

interface StudyCategory {
  id: string
  name: string
  slug: string
  icon: string | null
  color: string | null
  _count: { materials: number }
}

interface StudyClientProps {
  materials: StudyMaterial[]
  categories: StudyCategory[]
}

const TYPES = [
  { value: 'ARTICLE', label: 'Articles' },
  { value: 'VIDEO', label: 'Videos' },
  { value: 'PDF', label: 'PDFs' },
  { value: 'COURSE', label: 'Courses' },
  { value: 'NOTE', label: 'Notes' },
]

const DIFFICULTIES = [
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' },
]

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'featured', label: 'Featured' },
]

export default function StudyClient({ materials, categories }: StudyClientProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeType, setActiveType] = useState<string>('all')
  const [activeDifficulty, setActiveDifficulty] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('newest')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = [...materials]

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((m) => m.category.id === activeCategory)
    }

    // Type filter
    if (activeType !== 'all') {
      result = result.filter((m) => m.type === activeType)
    }

    // Difficulty filter
    if (activeDifficulty !== 'all') {
      result = result.filter((m) => m.difficulty === activeDifficulty)
    }

    // Sort
    if (sortBy === 'popular') {
      result.sort((a, b) => b.viewCount - a.viewCount)
    } else if (sortBy === 'featured') {
      result.sort((a, b) => {
        // Featured first, then by date
        const aFeatured = a.featured ? 1 : 0
        const bFeatured = b.featured ? 1 : 0
        if (aFeatured !== bFeatured) return bFeatured - aFeatured
        return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
      })
    } else {
      result.sort(
        (a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
      )
    }

    return result
  }, [materials, search, activeCategory, activeType, activeDifficulty, sortBy])

  const hasActiveFilters =
    activeCategory !== 'all' || activeType !== 'all' || activeDifficulty !== 'all' || search.trim()

  const clearFilters = () => {
    setSearch('')
    setActiveCategory('all')
    setActiveType('all')
    setActiveDifficulty('all')
    setSortBy('newest')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0D13]">
      {/* ─── Header ─── */}
      <section className="relative overflow-hidden bg-brand-navy border-b border-white/5 py-14">
        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
              Learning Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-3">
              📖 Study Material
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Free resources on finance, business analytics, and research methodology.
              Learn at your own pace with articles, videos, courses, and downloadable notes.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search study materials..."
              className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ─── Featured Courses — 3D Cards ─── */}
      <CoursesSection />

      {/* ─── Category Filter Chips ─── */}
      <section className="bg-[#0f1522] border-b border-white/5 py-4 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </button>

            {/* Category chips */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  activeCategory === 'all'
                    ? 'bg-teal-500/20 text-teal-400 border-teal-500/30'
                    : 'bg-transparent text-slate-400 border-white/10 hover:bg-white/5'
                }`}
              >
                All ({materials.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    activeCategory === cat.id
                      ? 'bg-teal-500/20 text-teal-400 border-teal-500/30'
                      : 'bg-transparent text-slate-400 border-white/10 hover:bg-white/5'
                  }`}
                >
                  {cat.icon} {cat.name} ({cat._count.materials})
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <div className="ml-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-300 focus:outline-none focus:border-teal-500/50"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#1A1F2E]">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Expandable filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-6">
              {/* Type filter */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Type</p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setActiveType('all')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                      activeType === 'all' ? 'bg-purple-500/20 text-purple-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  {TYPES.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setActiveType(t.value)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                        activeType === t.value ? 'bg-purple-500/20 text-purple-400' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty filter */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Difficulty</p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setActiveDifficulty('all')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                      activeDifficulty === 'all' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  {DIFFICULTIES.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setActiveDifficulty(d.value)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                        activeDifficulty === d.value ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active filter indicator */}
          {hasActiveFilters && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[11px] text-slate-500">
                Showing {filtered.length} of {materials.length} materials
              </span>
              <button
                onClick={clearFilters}
                className="text-[11px] text-teal-400 hover:text-teal-300 font-bold"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── Materials Grid ─── */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg font-medium text-slate-400">
              {hasActiveFilters
                ? 'No materials match your filters.'
                : 'No study materials published yet. Check back soon!'}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-teal-500/20 text-teal-400 rounded-lg text-sm font-bold hover:bg-teal-500/30 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((material) => (
              <StudyCard key={material.id} material={material} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
