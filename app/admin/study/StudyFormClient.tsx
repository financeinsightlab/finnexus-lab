"use client"

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, AlertCircle } from 'lucide-react'
import { createStudyMaterial, updateStudyMaterial } from '@/actions/study-actions'

interface Category {
  id: string
  name: string
  icon: string | null
}

interface MaterialData {
  id: string
  title: string
  description: string
  content: string
  categoryId: string
  type: string
  difficulty: string
  tags: string[]
  coverImage: string | null
  resourceUrl: string | null
  duration: number | null
  published: boolean
  featured: boolean
}

interface Props {
  categories: Category[]
  material?: MaterialData | null
  mode: 'create' | 'edit'
}

const TYPES = [
  { value: 'ARTICLE', label: 'Article' },
  { value: 'VIDEO', label: 'Video' },
  { value: 'PDF', label: 'PDF Document' },
  { value: 'COURSE', label: 'Course' },
  { value: 'NOTE', label: 'Note' },
]

const DIFFICULTIES = [
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' },
]

export default function StudyFormClient({ categories, material, mode }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState(material?.title || '')
  const [description, setDescription] = useState(material?.description || '')
  const [content, setContent] = useState(material?.content || '')
  const [categoryId, setCategoryId] = useState(material?.categoryId || categories[0]?.id || '')
  const [type, setType] = useState(material?.type || 'ARTICLE')
  const [difficulty, setDifficulty] = useState(material?.difficulty || 'BEGINNER')
  const [tagsInput, setTagsInput] = useState(material?.tags?.join(', ') || '')
  const [coverImage, setCoverImage] = useState(material?.coverImage || '')
  const [resourceUrl, setResourceUrl] = useState(material?.resourceUrl || '')
  const [duration, setDuration] = useState(material?.duration?.toString() || '')
  const [published, setPublished] = useState(material?.published || false)
  const [featured, setFeatured] = useState(material?.featured || false)

  const buildFormData = (publishNow = false) => {
    const formData = new FormData()
    formData.set('title', title)
    formData.set('description', description)
    formData.set('content', content)
    formData.set('categoryId', categoryId)
    formData.set('type', type)
    formData.set('difficulty', difficulty)
    formData.set('tags', tagsInput)
    formData.set('coverImage', coverImage)
    formData.set('resourceUrl', resourceUrl)
    formData.set('duration', duration)
    formData.set('published', publishNow ? 'true' : published ? 'true' : 'false')
    formData.set('featured', featured ? 'true' : 'false')
    if (material?.id) formData.set('id', material.id)
    return formData
  }

  const handleSave = (publishNow = false) => {
    setError(null)
    const formData = buildFormData(publishNow)

    startTransition(async () => {
      try {
        if (mode === 'create') {
          await createStudyMaterial(formData)
        } else {
          await updateStudyMaterial(formData)
        }
        router.push('/admin/study')
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
            <h1 className="text-2xl font-bold text-white">
              {mode === 'create' ? 'New Study Material' : 'Edit Study Material'}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {mode === 'create' ? 'Create a new learning resource' : 'Update existing material'}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Error ─── */}
      {error && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {categories.length === 0 ? (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 text-center">
          <p className="text-amber-400 font-medium">No categories exist yet</p>
          <p className="text-slate-400 text-sm mt-1 mb-4">
            You need at least one category before creating study materials.
          </p>
          <Link
            href="/admin/study/categories"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0B5A5A] transition-all text-sm font-medium"
          >
            Create a Category
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* ─── Basic Info ─── */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Basic Information</h2>

            <div>
              <label className={labelClass} htmlFor="title">Title *</label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Introduction to Financial Modeling"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="description">Description *</label>
              <textarea
                id="description"
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short summary shown on cards and search results..."
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="categoryId">Category *</label>
                <select
                  id="categoryId"
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className={inputClass}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-[#1A1F2E]">
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="type">Type</label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className={inputClass}
                >
                  {TYPES.map((t) => (
                    <option key={t.value} value={t.value} className="bg-[#1A1F2E]">
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="difficulty">Difficulty</label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className={inputClass}
                >
                  {DIFFICULTIES.map((d) => (
                    <option key={d.value} value={d.value} className="bg-[#1A1F2E]">
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="duration">Duration (minutes)</label>
                <input
                  id="duration"
                  type="number"
                  min="0"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 45"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="tags">Tags (comma-separated)</label>
              <input
                id="tags"
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g. dcf, valuation, beginners"
                className={inputClass}
              />
              <p className="text-xs text-slate-500 mt-1.5">Separate tags with commas. Used for search and filtering.</p>
            </div>
          </div>

          {/* ─── Content ─── */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Content (Markdown / MDX)</h2>
            <div>
              <label className={labelClass} htmlFor="content">Body *</label>
              <textarea
                id="content"
                required
                rows={18}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`# Introduction\n\nWrite your study material content here using Markdown...\n\n## Key Concepts\n\n- Point one\n- Point two\n\n## Example\n\n\`\`\`python\n# code example\n\`\`\``}
                className={`${inputClass} font-mono text-xs leading-relaxed`}
              />
              <p className="text-xs text-slate-500 mt-1.5">
                Supports Markdown syntax: headings, lists, code blocks, links, images, blockquotes.
              </p>
            </div>
          </div>

          {/* ─── Media & Resources ─── */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Media & Resources</h2>

            <div>
              <label className={labelClass} htmlFor="coverImage">Cover Image URL</label>
              <input
                id="coverImage"
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
              <p className="text-xs text-slate-500 mt-1.5">Optional. Shown on the material card and detail page.</p>
            </div>

            <div>
              <label className={labelClass} htmlFor="resourceUrl">External Resource URL</label>
              <input
                id="resourceUrl"
                type="url"
                value={resourceUrl}
                onChange={(e) => setResourceUrl(e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
              <p className="text-xs text-slate-500 mt-1.5">Optional. Link to a PDF, video, or external resource.</p>
            </div>
          </div>

          {/* ─── Publishing ─── */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Publishing Options</h2>

            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#0D6E6E] focus:ring-[#0D6E6E]/50"
                />
                <div>
                  <span className="text-sm text-white font-medium">Featured material</span>
                  <span className="block text-xs text-slate-500">Show this in the featured section on the study page</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#0D6E6E] focus:ring-[#0D6E6E]/50"
                />
                <div>
                  <span className="text-sm text-white font-medium">Published</span>
                  <span className="block text-xs text-slate-500">Make this visible to the public</span>
                </div>
              </label>
            </div>
          </div>

          {/* ─── Actions ─── */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/admin/study"
              className="px-5 py-2.5 text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={isPending}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.05] border border-white/[0.08] text-white rounded-xl hover:bg-white/[0.08] transition-all text-sm font-medium disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isPending ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={isPending}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0B5A5A] transition-all text-sm font-medium disabled:opacity-50"
            >
              <Eye className="w-4 h-4" />
              {isPending ? 'Publishing...' : published ? 'Save & Publish' : 'Publish'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
