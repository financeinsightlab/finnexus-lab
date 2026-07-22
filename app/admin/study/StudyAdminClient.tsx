"use client"

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Search, Edit, Trash2, Eye, EyeOff, Star, FolderTree } from 'lucide-react'
import { deleteStudyMaterial } from '@/actions/study-actions'

interface Material {
  id: string
  title: string
  slug: string
  description: string
  type: string
  difficulty: string
  published: boolean
  featured: boolean
  viewCount: number
  createdAt: string
  category: { id: string; name: string; slug: string; icon: string | null }
  author: { id: string; name: string | null }
}

interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
  _count: { materials: number }
}

interface Props {
  materials: Material[]
  categories: Category[]
  total: number
  search: string
  activeCategory: string
  activeStatus: string
}

const TYPE_LABELS: Record<string, string> = {
  ARTICLE: 'Article',
  VIDEO: 'Video',
  PDF: 'PDF',
  COURSE: 'Course',
  NOTE: 'Note',
}

export default function StudyAdminClient({
  materials,
  categories,
  total,
  search,
  activeCategory,
  activeStatus,
}: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [searchInput, setSearchInput] = useState(search)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchInput) params.set("search", searchInput)
    if (activeCategory) params.set("category", activeCategory)
    if (activeStatus) params.set("status", activeStatus)
    router.push(`/admin/study?${params.toString()}`)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this study material? This cannot be undone.")) return
    setDeleteId(id)
    const formData = new FormData()
    formData.append("id", id)
    startTransition(async () => {
      await deleteStudyMaterial(formData)
      setDeleteId(null)
    })
  }

  return (
    <div>
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Study Material</h1>
          <p className="text-slate-400 text-sm mt-1">
            {total} total materials • Manage learning resources
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/study/categories"
            className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] text-slate-300 rounded-xl hover:bg-white/[0.06] transition-all text-sm font-medium"
          >
            <FolderTree className="w-4 h-4" />
            Categories
          </Link>
          <Link
            href="/admin/study/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0B5A5A] transition-all text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            New Material
          </Link>
        </div>
      </div>

      {/* ─── Stats ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", value: total, color: "text-white" },
          { label: "Published", value: materials.filter((m) => m.published).length, color: "text-green-400" },
          { label: "Drafts", value: materials.filter((m) => !m.published).length, color: "text-amber-400" },
          { label: "Featured", value: materials.filter((m) => m.featured).length, color: "text-teal-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
            <p className="text-2xl font-bold {stat.color}">{stat.value}</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ─── Filters ─── */}
      <div className="flex flex-wrap gap-3 mb-6">
        <form onSubmit={handleSearch} className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search materials..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0D6E6E]/50"
          />
        </form>

        <select
          value={activeCategory}
          onChange={(e) => {
            const params = new URLSearchParams()
            if (search) params.set("search", search)
            if (e.target.value) params.set("category", e.target.value)
            if (activeStatus) params.set("status", activeStatus)
            router.push(`/admin/study?${params.toString()}`)
          }}
          className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-[#0D6E6E]/50"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id} className="bg-[#1A1F2E]">
              {cat.icon} {cat.name} ({cat._count.materials})
            </option>
          ))}
        </select>

        <select
          value={activeStatus}
          onChange={(e) => {
            const params = new URLSearchParams()
            if (search) params.set("search", search)
            if (activeCategory) params.set("category", activeCategory)
            if (e.target.value) params.set("status", e.target.value)
            router.push(`/admin/study?${params.toString()}`)
          }}
          className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-[#0D6E6E]/50"
        >
          <option value="">All Status</option>
          <option value="published" className="bg-[#1A1F2E]">Published</option>
          <option value="draft" className="bg-[#1A1F2E]">Draft</option>
        </select>
      </div>

      {/* ─── Materials Table ─── */}
      <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.05]">
              <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">Title</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">Type</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">Views</th>
              <th className="px-4 py-3 text-right text-[10px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center">
                  <p className="text-slate-400 font-medium">No materials found</p>
                  <p className="text-slate-600 text-sm mt-1">Create your first study material to get started</p>
                </td>
              </tr>
            ) : (
              materials.map((material) => (
                <tr key={material.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/study/edit/${material.id}`} className="hover:text-[#0D6E6E] transition-colors">
                      <p className="text-sm font-medium text-white">{material.title}</p>
                      <p className="text-xs text-slate-500 line-clamp-1">{material.description}</p>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-slate-400">
                      {material.category.icon} {material.category.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-slate-400">{TYPE_LABELS[material.type] || material.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {material.published ? (
                        <span className="flex items-center gap-1 text-xs text-green-400">
                          <Eye className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-amber-400">
                          <EyeOff className="w-3 h-3" /> Draft
                        </span>
                      )}
                      {material.featured && (
                        <Star className="w-3 h-3 text-teal-400 fill-teal-400" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-slate-400">{material.viewCount}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/study/${material.slug}`}
                        target="_blank"
                        className="p-1.5 text-slate-400 hover:text-teal-400 transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/study/edit/${material.id}`}
                        className="p-1.5 text-slate-400 hover:text-teal-400 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(material.id)}
                        disabled={isPending && deleteId === material.id}
                        className="p-1.5 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
