// app/study/[slug]/page.tsx — Individual Study Material page

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getStudyMaterialBySlug, getRelatedStudyMaterials, incrementStudyMaterialView } from '@/lib/study'
import { ArrowLeft, Clock, Eye, ExternalLink, BookOpen } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const material = await getStudyMaterialBySlug(slug)

  if (!material || !material.published) {
    return {
      title: 'Study Material Not Found | Kunwar Analytics',
    }
  }

  const url = `https://kunwaranalytics.in/study/${material.slug}`

  return {
    title: `${material.title} | Study Material | Kunwar Analytics`,
    description: material.description,
    alternates: { canonical: url },
    openGraph: {
      title: material.title,
      description: material.description,
      type: 'article',
      url,
      publishedTime: material.publishedAt?.toISOString(),
      authors: material.author.name ? [material.author.name] : undefined,
      tags: material.tags,
      images: material.coverImage ? [{ url: material.coverImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: material.title,
      description: material.description,
      images: material.coverImage ? [material.coverImage] : undefined,
    },
  }
}

export default async function StudyMaterialPage({ params }: PageProps) {
  const { slug } = await params
  const material = await getStudyMaterialBySlug(slug)

  if (!material || !material.published) {
    notFound()
  }

  // Increment view count (fire and forget)
  incrementStudyMaterialView(material.id).catch(() => {})

  // Get related materials
  const related = await getRelatedStudyMaterials(material.slug, material.categoryId, 4)

  // JSON-LD structured data for SEO
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': material.type === 'COURSE' ? 'Course' : 'Article',
    headline: material.title,
    description: material.description,
    author: {
      '@type': 'Person',
      name: material.author.name || 'Kunwar Analytics',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kunwar Analytics',
      url: 'https://kunwaranalytics.in',
    },
    datePublished: material.publishedAt?.toISOString(),
    dateModified: material.updatedAt.toISOString(),
    keywords: material.tags.join(', '),
    articleSection: material.category.name,
    url: `https://kunwaranalytics.in/study/${material.slug}`,
    ...(material.coverImage ? { image: material.coverImage } : {}),
  }

  const crumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://kunwaranalytics.in' },
    { name: 'Study', url: 'https://kunwaranalytics.in/study' },
    { name: material.category.name, url: `https://kunwaranalytics.in/study?category=${material.category.slug}` },
    { name: material.title, url: `https://kunwaranalytics.in/study/${material.slug}` },
  ])

  const categoryColor = material.category.color || '#0D6E6E'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0D13]">
      {/* JSON-LD structured data for SEO + GEO */}
      <JsonLd data={articleJsonLd} />
      <JsonLd data={crumbs} />

      {/* ─── Hero Header ─── */}
      <section className="relative overflow-hidden bg-brand-navy border-b border-white/5 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/study"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Study Material
          </Link>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <Link href="/" className="hover:text-teal-400">Home</Link>
            <span>/</span>
            <Link href="/study" className="hover:text-teal-400">Study</Link>
            <span>/</span>
            <Link href={`/study?category=${material.category.slug}`} className="hover:text-teal-400">
              {material.category.name}
            </Link>
          </nav>

          {/* Category badge */}
          <span
            className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md mb-4"
            style={{ color: categoryColor, backgroundColor: `${categoryColor}15` }}
          >
            {material.category.icon} {material.category.name}
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {material.title}
          </h1>

          <p className="text-lg text-slate-400 mb-6 leading-relaxed">
            {material.description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            {material.author.name && (
              <span>By <span className="text-teal-400 font-medium">{material.author.name}</span></span>
            )}
            {material.publishedAt && (
              <span>{new Date(material.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            )}
            {material.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {material.duration} min read
              </span>
            )}
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {material.viewCount} views
            </span>
            <span className="px-2 py-0.5 rounded-md border border-white/10 text-[11px] font-bold">
              {material.difficulty}
            </span>
          </div>

          {/* Tags */}
          {material.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {material.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* External resource link */}
          {material.resourceUrl && (
            <a
              href={material.resourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-teal-500 text-white rounded-xl font-bold text-sm hover:bg-teal-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Access Resource
            </a>
          )}
        </div>
      </section>

      {/* ─── Content ─── */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {material.content ? (
            <MDXRemote source={material.content} />
          ) : (
            <p className="text-center italic text-gray-500">Content not available.</p>
          )}
        </div>
      </article>

      {/* ─── Related Materials ─── */}
      {related.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 py-12 border-t border-gray-200 dark:border-white/5">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#0D6E6E]" />
            Related Study Materials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((m) => (
              <Link
                key={m.id}
                href={`/study/${m.slug}`}
                className="group bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-[#2D3748] rounded-2xl p-5 hover:border-[#0D6E6E]/50 transition-all"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-500">
                  {m.category.icon} {m.category.name}
                </span>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mt-2 mb-2 line-clamp-2 group-hover:text-[#0D6E6E] transition-colors">
                  {m.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 line-clamp-2">
                  {m.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
