import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { markdownToBlocks, Block } from '@/lib/blocks/registry'

export interface StoredPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  type: string
  published: boolean
  featuredImage: string | null
  authorId: string
  author: { id: string; name: string; email: string; role: string }
  seoTitle: string | null
  metaDescription: string | null
  focusKeywords: string | null
  ogImage: string | null
  ogTitle: string | null
  tags: string[]
  sector?: string | null
  category?: string | null
  pageCount?: number | null
  difficulty: string
  targetAudience: string[]
  contentStatus: string
  estimatedReadingTime: number
  scheduledPublishAt: Date | null
  viewCount: number
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  blockContent: { blocks: Block[] }
  contentType: string
}

let initialized = false
let postsStore: StoredPost[] = []

const DEFAULT_ADMIN = {
  id: 'user-admin-01',
  name: 'Kunwar Analytics Research Desk',
  email: 'research@kunwaranalytics.in',
  role: 'ADMIN',
}

export function initCMSStore(): StoredPost[] {
  if (initialized && postsStore.length > 0) return postsStore

  const contentRoot = path.join(process.cwd(), 'content')
  const researchDir = path.join(contentRoot, 'research')
  const insightsDir = path.join(contentRoot, 'insights')
  const caseStudiesDir = path.join(contentRoot, 'case-studies')

  const loaded: StoredPost[] = []

  const loadFromDir = (dir: string, type: string) => {
    if (!fs.existsSync(dir)) return
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))

    for (const file of files) {
      try {
        const filePath = path.join(dir, file)
        const raw = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(raw)
        const slug = (typeof data.slug === 'string' ? data.slug : file.replace('.mdx', ''))
        const title = (typeof data.title === 'string' ? data.title : slug)
        const summary = (typeof data.summary === 'string' ? data.summary : data.thesis || data.outcome || '')
        const coverImage = (typeof data.coverImage === 'string' ? data.coverImage : null)
        const tags = Array.isArray(data.tags) ? data.tags.filter(t => typeof t === 'string') : []
        const dateStr = typeof data.date === 'string' ? data.date : '2026-06-01'
        const pubDate = new Date(dateStr)
        const blocks = markdownToBlocks(content)

        const sector = (typeof data.sector === 'string' ? data.sector : (tags[0] || 'Strategic Research'))
        const category = (typeof data.category === 'string' ? data.category : (typeof data.sector === 'string' ? data.sector : (tags[0] || 'Sector Analysis')))
        const pageCount = (typeof data.pageCount === 'number' ? data.pageCount : Math.max(30, Math.ceil(content.split(/\s+/).length / 150)))

        loaded.push({
          id: `post-${slug}`,
          title,
          slug,
          excerpt: summary,
          content,
          type,
          published: true,
          featuredImage: coverImage,
          authorId: DEFAULT_ADMIN.id,
          author: DEFAULT_ADMIN,
          seoTitle: `${title} | Kunwar Analytics`,
          metaDescription: summary,
          focusKeywords: tags.join(', '),
          ogImage: coverImage,
          ogTitle: title,
          tags,
          sector,
          category,
          pageCount,
          difficulty: 'ADVANCED',
          targetAudience: ['Institutional Investors', 'Asset Managers', 'Analysts', 'CXOs'],
          contentStatus: 'PUBLISHED',
          estimatedReadingTime: Math.max(5, Math.ceil(content.split(/\s+/).length / 200)),
          scheduledPublishAt: null,
          viewCount: Math.floor(Math.random() * 1500) + 240,
          publishedAt: pubDate,
          createdAt: pubDate,
          updatedAt: pubDate,
          blockContent: { blocks },
          contentType: 'BLOCKS',
        })
      } catch (err) {
        console.error(`Error loading CMS post from ${file}:`, err)
      }
    }
  }

  loadFromDir(researchDir, 'RESEARCH')
  loadFromDir(insightsDir, 'INSIGHT')
  loadFromDir(caseStudiesDir, 'CASE_STUDY')

  postsStore = loaded
  initialized = true
  return postsStore
}

export function getCMSPosts(): StoredPost[] {
  if (!initialized || postsStore.length === 0) {
    return initCMSStore()
  }
  return postsStore
}

export function getCMSPostBySlug(slug: string): StoredPost | null {
  const posts = getCMSPosts()
  return posts.find(p => p.slug === slug) || null
}

export function getCMSPostById(id: string): StoredPost | null {
  const posts = getCMSPosts()
  return posts.find(p => p.id === id) || null
}

export function createCMSPost(data: Partial<StoredPost>): StoredPost {
  const posts = getCMSPosts()
  const now = new Date()
  const slug = data.slug || `post-${Date.now()}`
  const content = data.content || ''
  const blocks = data.blockContent?.blocks || markdownToBlocks(content)

  const newPost: StoredPost = {
    id: data.id || `post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: data.title || 'Untitled Post',
    slug,
    excerpt: data.excerpt || '',
    content,
    type: data.type || 'RESEARCH',
    published: data.published ?? true,
    featuredImage: data.featuredImage || null,
    authorId: data.authorId || DEFAULT_ADMIN.id,
    author: DEFAULT_ADMIN,
    seoTitle: data.seoTitle || data.title || null,
    metaDescription: data.metaDescription || data.excerpt || null,
    focusKeywords: data.focusKeywords || '',
    ogImage: data.ogImage || data.featuredImage || null,
    ogTitle: data.ogTitle || data.title || null,
    tags: Array.isArray(data.tags) ? data.tags : [],
    difficulty: data.difficulty || 'INTERMEDIATE',
    targetAudience: data.targetAudience || ['General'],
    contentStatus: data.contentStatus || 'PUBLISHED',
    estimatedReadingTime: data.estimatedReadingTime || 10,
    scheduledPublishAt: data.scheduledPublishAt || null,
    viewCount: data.viewCount || 0,
    publishedAt: data.publishedAt || now,
    createdAt: data.createdAt || now,
    updatedAt: now,
    blockContent: { blocks },
    contentType: data.contentType || 'BLOCKS',
  }

  posts.unshift(newPost)
  return newPost
}

export function updateCMSPost(id: string, data: Partial<StoredPost>): StoredPost | null {
  const posts = getCMSPosts()
  const idx = posts.findIndex(p => p.id === id || p.slug === id)
  if (idx === -1) return null

  const current = posts[idx]
  const content = data.content !== undefined ? data.content : current.content
  const blocks = data.blockContent?.blocks || (data.content ? markdownToBlocks(content) : current.blockContent?.blocks)

  const updated: StoredPost = {
    ...current,
    ...data,
    updatedAt: new Date(),
    blockContent: { blocks: blocks || [] },
  }

  posts[idx] = updated
  return updated
}

export function deleteCMSPost(id: string): boolean {
  const posts = getCMSPosts()
  const idx = posts.findIndex(p => p.id === id || p.slug === id)
  if (idx === -1) return false
  posts.splice(idx, 1)
  return true
}
