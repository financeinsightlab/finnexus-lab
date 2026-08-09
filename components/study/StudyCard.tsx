// components/study/StudyCard.tsx

import Link from 'next/link'
import { BookOpen, Clock, Eye, FileText, Video, File, GraduationCap, StickyNote } from 'lucide-react'
import TiltCard from '@/components/ui/TiltCard'

interface StudyCardProps {
  material: {
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
}

const TYPE_ICONS: Record<string, React.ReactNode> = {
  ARTICLE: <FileText className="w-4 h-4" />,
  VIDEO: <Video className="w-4 h-4" />,
  PDF: <File className="w-4 h-4" />,
  COURSE: <GraduationCap className="w-4 h-4" />,
  NOTE: <StickyNote className="w-4 h-4" />,
}

const DIFFICULTY_STYLES: Record<string, string> = {
  BEGINNER: 'bg-green-500/10 text-green-400 border-green-500/20',
  INTERMEDIATE: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  ADVANCED: 'bg-red-500/10 text-red-400 border-red-500/20',
}

export default function StudyCard({ material }: StudyCardProps) {
  const categoryColor = material.category.color || '#0D6E6E'

  return (
    <TiltCard maxTilt={6} className="h-full rounded-2xl">
    <Link
      href={`/study/${material.slug}`}
      className={`group bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-[#2D3748] rounded-2xl overflow-hidden hover:border-[#0D6E6E]/50 transition-all duration-300 flex flex-col h-full depth-2 hover:depth-3 ${material.featured ? 'shimmer-border' : ''}`}
    >
      {/* Cover Image or Placeholder */}
      {material.coverImage ? (
        <div className="relative h-40 overflow-hidden bg-gray-100 dark:bg-[#0f1522]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={material.coverImage}
            alt={material.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="relative h-40 flex items-center justify-center bg-gradient-to-br from-[#1a1f2e] to-brand-teal/20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <BookOpen className="w-12 h-12 text-brand-teal/30 z-10" />
          <span className="absolute top-3 left-3 text-2xl z-10 opacity-60">{material.category.icon || '📚'}</span>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category + Type badges */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
            style={{ color: categoryColor, backgroundColor: `${categoryColor}15` }}
          >
            {material.category.name}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            {TYPE_ICONS[material.type] || <FileText className="w-4 h-4" />}
            {material.type}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-[#0D6E6E] transition-colors">
          {material.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-slate-400 line-clamp-2 mb-4 flex-1">
          {material.description}
        </p>

        {/* Tags */}
        {material.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {material.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-slate-500 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-0.5 rounded-md border ${DIFFICULTY_STYLES[material.difficulty] || DIFFICULTY_STYLES.BEGINNER}`}>
              {material.difficulty}
            </span>
            {material.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {material.duration}m
              </span>
            )}
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {material.viewCount}
            </span>
          </div>
          {material.author.name && (
            <span className="truncate max-w-[100px]">{material.author.name}</span>
          )}
        </div>
      </div>
    </Link>
    </TiltCard>
  )
}
