"use client"

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Edit2, Trash2, FolderTree, AlertCircle, X, Save } from 'lucide-react'
import {
  createStudyCategory,
  updateStudyCategory,
  deleteStudyCategory,
} from '@/actions/study-actions'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  color: string | null
  order: number
  createdAt: string
  _count: { materials: number }
}

interface Props {
  categories: Category[]
}

const ICON_OPTIONS = ['📚', '📊', '🔬', '💰', '📈', '🧮', '🏦', '📋', '🎓', '💡', '🗂️', '⚙️']
const COLOR_OPTIONS = ['#0D6E6E', '#92620A', '#1A2B3C', '#7C3AED', '#DC2626', '#059669', '#2563EB', '#EA580C']

export default function CategoriesClient({ categories }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Form state
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('📚')
  const [color, setColor] = useState('#0D6E6E')
  const [order, setOrder] = useState('0')

  const resetForm = () => {
    setName('')
    setDescription('')
    setIcon('📚')
    setColor('#0D6E6E')
    setOrder('0')
    setEditingId(null)
    setShowForm(false)
    setError(null)
  }

  const startEdit = (cat: Category) => {
    setEditingId(cat.id)
    setName(cat.name)
    setDescription(cat.description || '')
    setIcon(cat.icon || '📚')
    setColor(cat.color || '#0D6E6E')
    setOrder(cat.order.toString())
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData()
    formData.set('name', name)
    formData.set('description', description)
    formData.set('icon', icon)
    formData.set('color', color)
    formData.set('order', order)
    if (editingId) formData.set('id', editingId)

    startTransition(async () => {
      try {
        if (editingId) {
          await updateStudyCategory(formData)
        } else {
          await createStudyCategory(formData)
        }
        resetForm()
        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      }
    })
  }

  const handleDelete = (cat: Category) => {
    setError(null)
    if (cat._count.materials > 0) {
      setError(`Cannot delete "${cat.name}" — it has ${cat._count.materials} material(s). Move or delete them first.`)
      return
    }
    if (!confirm(`Delete category "${cat.name}"? This cannot be undone.`)) return

    const formData = new FormData()
    formData.set('id', cat.id)

    startTransition(async () => {
      try {
        await deleteStudyCategory(formData)
        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      }
    })
  }

  const inputClass =
    'w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0D6E6E]/50 transition-colors'
  const labelClass = 'block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2'

  return (
    <div className="max-w-4xl">
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/study"
            className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Study Categories</h1>
            <p className="text-slate-400 text-sm mt-1">
              {categories.length} categor{categories.length === 1 ? 'y' : 'ies'} • Organize your study materials
            </p>
          </div>
        </div>
        {!showForm && (
          <button
            onClick={() => {
              resetForm()
              setShowForm(true)
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0B5A5A] transition-all text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            New Category
          </button>
        )}
      </div>

      {/* ─── Error ─── */}
      {error && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError(null)} className="text-red-400/70 hover:text-red-400">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ─── Form ─── */}
      {showForm && (
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">
              {editingId ? 'Edit Category' : 'New Category'}
            </h2>
            <button onClick={resetForm} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="name">Name *</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Finance"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="order">Display Order</label>
                <input
                  id="order"
                  type="number"
                  min="0"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="0"
                  className={inputClass}
                />
                <p className="text-xs text-slate-500 mt-1.5">Lower numbers appear first</p>
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="description">Description</label>
              <textarea
                id="description"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What this category covers..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Icon</label>
              <div className="flex flex-wrap gap-2">
                {ICON_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setIcon(emoji)}
                    className={`w-11 h-11 flex items-center justify-center rounded-xl text-xl transition-all ${
                      icon === emoji
                        ? 'bg-[#0D6E6E]/20 border-2 border-[#0D6E6E]'
                        : 'bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06]'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Color</label>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-9 h-9 rounded-xl transition-all ${
                      color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0B0D13] scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c }}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0B5A5A] transition-all text-sm font-medium disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isPending ? 'Saving...' : editingId ? 'Update Category' : 'Create Category'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ─── Categories List ─── */}
      {categories.length === 0 && !showForm ? (
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-12 text-center">
          <FolderTree className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 font-medium">No categories yet</p>
          <p className="text-slate-600 text-sm mt-1 mb-4">
            Create categories to organize your study materials by topic.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0B5A5A] transition-all text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Create First Category
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 flex items-center gap-4 hover:bg-white/[0.03] transition-colors"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ backgroundColor: `${cat.color || '#0D6E6E'}20`, border: `1px solid ${cat.color || '#0D6E6E'}40` }}
              >
                {cat.icon || '📁'}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{cat.name}</h3>
                  <span className="text-[10px] text-slate-500 bg-white/[0.05] px-2 py-0.5 rounded-md">
                    /{cat.slug}
                  </span>
                </div>
                {cat.description && (
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{cat.description}</p>
                )}
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[10px] text-slate-500">
                    {cat._count.materials} material{cat._count.materials !== 1 ? 's' : ''}
                  </span>
                  <span className="text-[10px] text-slate-600">•</span>
                  <span className="text-[10px] text-slate-500">Order: {cat.order}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => startEdit(cat)}
                  className="p-2 text-slate-400 hover:text-teal-400 hover:bg-white/[0.05] rounded-lg transition-all"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cat)}
                  disabled={isPending}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-white/[0.05] rounded-lg transition-all disabled:opacity-50"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
