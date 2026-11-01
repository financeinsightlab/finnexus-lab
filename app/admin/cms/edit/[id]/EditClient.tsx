"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Editor from "@/components/admin/Editor"
import { updatePost, PostFormData } from "@/actions/cms-actions"
import { ArticleType, Post } from "@prisma/client"
import { useRouter } from "next/navigation"
import {
  Save,
  Send,
  Settings,
  Layout,
  Image as ImageIcon,
  ChevronLeft,
  Globe,
  Share2,
  BarChart,
  Eye,
  Type,
  X,
  Plus,
  Sparkles,
  Blocks,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react"
import Link from "next/link"
import React from "react"
import { contentTemplates, applyTemplate } from "@/lib/templates"
import { Block, markdownToBlocks } from "@/lib/blocks/registry"
import ContentRenderer from "@/components/ContentRenderer"
import { useDialogAccessibility } from '@/components/ui/useDialogAccessibility'

const BlockEditor = dynamic(() => import('@/components/admin/block-editor/BlockEditor'), { ssr: false })

type ActiveTab = "general" | "seo" | "social" | "advanced"

export default function EditClient({ post }: { post: Post & { author: { name: string | null } } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<ActiveTab>("general")
  const [sidebarOpen, setSidebarOpen] = useState(false) // default closed for more space!
  const [previewMode, setPreviewMode] = useState(false)

  // Content mode: markdown (Tiptap) or blocks (Visual Builder)
  const [contentType, setContentType] = useState<'MARKDOWN' | 'BLOCKS'>((post as any).contentType || 'BLOCKS')
  const [blocks, setBlocks] = useState<Block[]>(() => {
    try {
      const bc = (post as any).blockContent
      if (bc && Array.isArray(bc)) return bc as Block[]
      if (bc && typeof bc === 'object' && 'blocks' in bc && Array.isArray((bc as any).blocks)) return (bc as any).blocks as Block[]
      if (post.content) return markdownToBlocks(post.content)
    } catch {}
    return []
  })

  // Core Data
  const [title, setTitle] = useState(post.title || "")
  const [slug, setSlug] = useState(post.slug || "")
  const [excerpt, setExcerpt] = useState(post.excerpt || "")
  const [content, setContent] = useState(post.content || "")
  const [type, setType] = useState<ArticleType>(post.type || "RESEARCH")
  const [featuredImage, setFeaturedImage] = useState(post.featuredImage || "")
  
  // CMS Elite Metadata (SEO)
  const [seoTitle, setSeoTitle] = useState(post.seoTitle || "")
  const [metaDescription, setMetaDescription] = useState(post.metaDescription || "")
  const [focusKeywords, setFocusKeywords] = useState(post.focusKeywords || "")
  
  // CMS Elite Metadata (Social)
  const [ogTitle, setOgTitle] = useState(post.ogTitle || "")
  const [ogImage, setOgImage] = useState(post.ogImage || "")
  
  // Enhanced Metadata
  const [difficulty, setDifficulty] = useState<any>(post.difficulty || "INTERMEDIATE")
  const [targetAudience, setTargetAudience] = useState<string[]>(post.targetAudience?.length ? post.targetAudience : ["Executives", "Analysts"])
  const [newAudience, setNewAudience] = useState("")
  const [contentStatus, setContentStatus] = useState<any>(post.contentStatus || "DRAFT")
  const [estimatedReadingTime, setEstimatedReadingTime] = useState<number>(post.estimatedReadingTime || 5)
  
  // Taxonomy
  const [tags, setTags] = useState<string[]>(post.tags || [])
  const [newTag, setNewTag] = useState("")

  // Template System
  const [showTemplates, setShowTemplates] = useState(false)
  
  // Media Library
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  const mediaLibraryDialogRef = useDialogAccessibility(showMediaLibrary, () => setShowMediaLibrary(false))
  const templateDialogRef = useDialogAccessibility(showTemplates, () => setShowTemplates(false))

  useEffect(() => {
    if (!sidebarOpen) return
    const closeSettingsOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !showMediaLibrary && !showTemplates) setSidebarOpen(false)
    }
    document.addEventListener('keydown', closeSettingsOnEscape)
    return () => document.removeEventListener('keydown', closeSettingsOnEscape)
  }, [sidebarOpen, showMediaLibrary, showTemplates])
  const [mediaSearch, setMediaSearch] = useState("")
  
  // Scheduling
  const [schedulePublish, setSchedulePublish] = useState(false)
  const [publishDate, setPublishDate] = useState(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  })
  const [publishTime, setPublishTime] = useState("09:00")

  // Convert markdown content to blocks when switching to block editor
  const handleSwitchToBlocks = () => {
    setContentType('BLOCKS')
    // If blocks are empty but we have markdown content, convert it
    if (blocks.length === 0 && content.trim()) {
      const convertedBlocks = markdownToBlocks(content)
      if (convertedBlocks.length > 0) {
        setBlocks(convertedBlocks)
      }
    }
  }

  const handleSave = async (isPublishing: boolean) => {
    setLoading(true)
    try {
      // Calculate scheduled publish date if scheduling is enabled
      let scheduledPublishAt: Date | null = null
      if (schedulePublish && isPublishing && publishDate && publishTime) {
        const [year, month, day] = publishDate.split('-').map(Number)
        const [hours, minutes] = publishTime.split(':').map(Number)
        scheduledPublishAt = new Date(year, month - 1, day, hours, minutes)
        
        // Validate that scheduled date is in the future
        if (scheduledPublishAt <= new Date()) {
          alert("Scheduled publish date must be in the future. Please adjust the date/time.")
          setLoading(false)
          return
        }
      }

      // When in blocks mode, also save blocks to the API
      if (contentType === 'BLOCKS' && blocks.length > 0) {
        await fetch('/api/blocks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId: post.id, blocks })
        })
      }

      const data: PostFormData = {
        title,
        slug,
        excerpt: excerpt || null,
        content: contentType === 'BLOCKS' ? '' : content,
        type,
        published: isPublishing,
        featuredImage: featuredImage || null,
        seoTitle: seoTitle || null,
        metaDescription: metaDescription || null,
        focusKeywords: focusKeywords || null,
        ogTitle: ogTitle || null,
        ogImage: ogImage || null,
        tags,
        difficulty,
        targetAudience,
        contentStatus: isPublishing ? "PUBLISHED" : contentStatus,
        estimatedReadingTime,
        scheduledPublishAt: schedulePublish && isPublishing ? scheduledPublishAt : null,
        contentType,
        blockContent: contentType === 'BLOCKS' ? blocks as any : null,
      }
      
      await updatePost(post.id, data)
      router.push("/admin/cms")
      router.refresh()
    } catch (error) {
      console.error("Failed to save post:", error)
      alert("Error saving post. Ensure database schema is updated.")
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = () => {
    const s = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    setSlug(s)
  }

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const addAudience = () => {
    if (newAudience && !targetAudience.includes(newAudience)) {
      setTargetAudience([...targetAudience, newAudience])
      setNewAudience("")
    }
  }

  const removeAudience = (audience: string) => {
    setTargetAudience(targetAudience.filter(a => a !== audience))
  }

  // Analytics calculation functions
  const calculateWordCount = (text: string) => {
    if (!text.trim()) return 0
    return text.trim().split(/\s+/).length
  }

  const calculateReadabilityScore = (text: string) => {
    if (!text.trim()) return 0
    
    const words = text.trim().split(/\s+/).length
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length
    const syllables = text.toLowerCase().replace(/[^a-z]/g, '').split('').filter(c => 'aeiou'.includes(c)).length
    
    if (words === 0 || sentences === 0) return 0
    
    // Simple Flesch-Kincaid approximation
    const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
    return Math.max(0, Math.min(100, Math.round(score)))
  }

  const calculateSEOScore = () => {
    let score = 50 // Base score
    
    // Title length check
    if (title.length >= 50 && title.length <= 60) score += 15
    else if (title.length > 0) score += 5
    
    // Meta description check
    if (metaDescription.length >= 120 && metaDescription.length <= 160) score += 15
    else if (metaDescription.length > 0) score += 5
    
    // Content length check
    const wordCount = calculateWordCount(content)
    if (wordCount >= 800) score += 15
    else if (wordCount >= 300) score += 10
    else if (wordCount > 0) score += 5
    
    // Featured image check
    if (featuredImage) score += 10
    
    // Tags check
    if (tags.length >= 3) score += 5
    
    return Math.min(100, score)
  }

  const getReadabilityLevel = (score: number) => {
    if (score >= 80) return { label: "Very Easy", color: "text-emerald-400" }
    if (score >= 60) return { label: "Easy", color: "text-green-400" }
    if (score >= 50) return { label: "Standard", color: "text-blue-400" }
    if (score >= 30) return { label: "Difficult", color: "text-orange-400" }
    return { label: "Very Difficult", color: "text-red-400" }
  }

  const getSEOScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400"
    if (score >= 60) return "text-green-400"
    if (score >= 40) return "text-yellow-400"
    return "text-red-400"
  }

  const handleApplyTemplate = (templateId: string) => {
    const template = contentTemplates.find(t => t.id === templateId)
    if (!template) return
    
    const applied = applyTemplate(template)
    setTitle(applied.title)
    setExcerpt(applied.excerpt)
    setContent(applied.content)
    setType(applied.type)
    if (applied.featuredImage) setFeaturedImage(applied.featuredImage)
    setDifficulty(applied.difficulty)
    setTargetAudience(applied.targetAudience)
    setEstimatedReadingTime(applied.estimatedReadingTime)
    setTags(applied.tags)
    
    // Generate slug from title
    const slug = applied.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    setSlug(slug)
    
    setShowTemplates(false)
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)] min-h-0 overflow-hidden bg-surface-muted">
      {/* Elementor-Style Floating Header */}
      <header className="h-16 flex items-center justify-between gap-2 px-2 sm:px-6 bg-surface/80 backdrop-blur-xl border-b border-border-subtle z-[60] shrink-0">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Link href="/admin/cms" className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center rounded-xl bg-surface-muted hover:bg-accent transition-all text-content-secondary">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex flex-col">
            <input 
              type="text" 
              placeholder="Post Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent text-sm font-bold text-content-primary placeholder:text-content-muted focus:outline-none w-[76px] sm:w-[200px] md:w-[350px]"
            />
            <span className="hidden sm:block text-[10px] text-brand font-bold uppercase tracking-widest mt-0.5">Editing Elite Report</span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          <button
            onClick={() => setShowTemplates(true)}
            className="p-1.5 sm:p-2.5 rounded-xl transition-all bg-accent-violet-muted text-accent-violet hover:bg-accent-violet hover:text-content-inverse"
            title="Use Template"
          >
            <Sparkles className="w-5 h-5" />
          </button>

          {/* Content Type Switcher */}
          <div className="flex items-center bg-surface-muted border border-border rounded-xl p-0.5 sm:p-1 gap-0.5 sm:gap-1">
            <button
              onClick={() => setContentType('MARKDOWN')}
              className={`flex items-center gap-1 px-1.5 sm:gap-1.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${contentType === 'MARKDOWN' ? 'bg-accent text-content-primary' : 'text-content-muted hover:text-content-secondary'}`}
              title="Classic Markdown / Rich Text editor"
            >
              <Type className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Markdown</span>
            </button>
            <button
              onClick={handleSwitchToBlocks}
              className={`flex items-center gap-1 px-1.5 sm:gap-1.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${contentType === 'BLOCKS' ? 'bg-primary text-primary-foreground shadow' : 'text-content-muted hover:text-content-secondary'}`}
              title="Visual Block Builder"
            >
              <Blocks className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Block Editor</span>
            </button>
          </div>
          
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`p-1.5 sm:p-2.5 rounded-xl transition-all ${previewMode ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(13,110,110,0.5)]' : 'bg-surface-muted text-content-secondary hover:text-content-primary'}`}
            title="Toggle Visual Preview"
          >
            <Eye className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => handleSave(false)}
              disabled={loading}
              aria-label="Save draft" title="Save draft" className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-5 py-2.5 rounded-xl text-sm font-bold text-content-secondary hover:text-content-primary bg-surface-muted transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-emerald-500" />
              <span className="hidden lg:inline">Save</span>
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={loading}
              aria-label={loading ? "Publishing" : "Publish"} title={loading ? "Publishing" : "Publish"} className="btn-primary flex items-center gap-1 sm:gap-2 font-bold px-1.5 sm:px-6 py-2.5 disabled:opacity-50"
            >
              <Send className="w-4 h-4 rotate-12" />
              <span className="hidden lg:inline">{loading ? "Publishing..." : "Publish Elite"}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative flex-1 flex overflow-hidden">
        {/* PANEL 1: SETTINGS SELECTOR (LEFT SLIM) */}
        <aside className="w-16 bg-surface-muted border-r border-border-subtle flex flex-col items-center py-6 gap-6 shrink-0 z-50">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-expanded={sidebarOpen} aria-controls="cms-settings-panel" aria-label={sidebarOpen ? "Close content settings" : "Open content settings"} className="p-3 text-content-muted hover:text-content-primary transition-all bg-surface-muted rounded-2xl mb-4">
            {sidebarOpen ? <PanelLeftClose className="w-5 h-5"/> : <PanelLeftOpen className="w-5 h-5"/>}
          </button>
          <button onClick={() => { setActiveTab("general"); setSidebarOpen(true); }} className={`p-3 rounded-2xl transition-all ${activeTab === "general" && sidebarOpen ? "bg-primary text-primary-foreground shadow-lg shadow-[#0D6E6E]/20" : "text-content-muted hover:text-content-secondary hover:bg-surface-muted"}`} title="General Config">
            <Settings className="w-5 h-5" />
          </button>
          <button onClick={() => { setActiveTab("seo"); setSidebarOpen(true); }} className={`p-3 rounded-2xl transition-all ${activeTab === "seo" && sidebarOpen ? "bg-primary text-primary-foreground shadow-lg shadow-[#0D6E6E]/20" : "text-content-muted hover:text-content-secondary hover:bg-surface-muted"}`} title="SEO Optimization">
            <Globe className="w-5 h-5" />
          </button>
          <button onClick={() => { setActiveTab("social"); setSidebarOpen(true); }} className={`p-3 rounded-2xl transition-all ${activeTab === "social" && sidebarOpen ? "bg-primary text-primary-foreground shadow-lg shadow-[#0D6E6E]/20" : "text-content-muted hover:text-content-secondary hover:bg-surface-muted"}`} title="Social Sharing">
            <Share2 className="w-5 h-5" />
          </button>
          <button onClick={() => { setActiveTab("advanced"); setSidebarOpen(true); }} className={`p-3 rounded-2xl transition-all ${activeTab === "advanced" && sidebarOpen ? "bg-primary text-primary-foreground shadow-lg shadow-[#0D6E6E]/20" : "text-content-muted hover:text-content-secondary hover:bg-surface-muted"}`} title="Advanced Ops">
            <BarChart className="w-5 h-5" />
          </button>
        </aside>

        {/* PANEL 2: SETTINGS CONTENT (EXPANDED LEFT) */}
        {sidebarOpen && (
          <>
          <button type="button" aria-label="Close settings panel" className="xl:hidden absolute inset-0 z-40 bg-background/40" onClick={() => setSidebarOpen(false)} />
          <aside id="cms-settings-panel" aria-label="Content settings" className="absolute inset-y-0 left-16 z-50 w-[min(20rem,calc(100vw-4rem))] bg-surface border-r border-border p-5 sm:p-8 overflow-y-auto no-scrollbar shrink-0 transition-all duration-300 xl:relative xl:inset-auto xl:left-auto xl:z-auto xl:w-80">
            <button onClick={() => setSidebarOpen(false)} aria-label="Close content settings" className="absolute top-4 right-4 p-2 bg-surface-muted text-content-secondary hover:text-content-primary rounded-lg">
              <X className="w-4 h-4"/>
            </button>
            <div className="space-y-8 anim-fade mt-4">
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <h3 className="section-label mb-6 text-brand">General Controls</h3>
                  <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Category Classification</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as ArticleType)}
                    className="w-full bg-surface-muted border border-border rounded-2xl text-xs font-bold p-3 text-content-primary outline-none focus:border-brand/50"
                    title="Content Type"
                  >
                    <option value="RESEARCH">Research Report</option>
                    <option value="INSIGHT">Insight Article</option>
                    <option value="CASE_STUDY">Case Study</option>
                    <option value="MEDIA">Speaking & Media</option>
                    <option value="OTHER">Other Content</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Difficulty Level</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT")}
                    className="w-full bg-surface-muted border border-border rounded-2xl text-xs font-bold p-3 text-content-primary outline-none focus:border-brand/50"
                    title="Difficulty Level"
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                    <option value="EXPERT">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Content Status</label>
                  <select
                    value={contentStatus}
                    onChange={(e) => setContentStatus(e.target.value as "DRAFT" | "REVIEW" | "APPROVED" | "PUBLISHED")}
                    className="w-full bg-surface-muted border border-border rounded-2xl text-xs font-bold p-3 text-content-primary outline-none focus:border-brand/50"
                    title="Content Status"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="REVIEW">In Review</option>
                    <option value="APPROVED">Approved</option>
                    <option value="PUBLISHED">Published</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Estimated Reading Time (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={estimatedReadingTime}
                    onChange={(e) => setEstimatedReadingTime(parseInt(e.target.value) || 5)}
                    className="w-full bg-surface-muted border border-border rounded-2xl text-xs font-bold p-3 text-content-primary outline-none focus:border-brand/50"
                    placeholder="5"
                  />
                </div>

                <div>
                   <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">URL Identity (Slug)</label>
                   <div className="flex gap-2">
                     <input 
                       type="text" 
                       value={slug}
                       onChange={(e) => setSlug(e.target.value)}
                       placeholder="report-slug"
                       className="flex-1 bg-surface-muted border border-border rounded-xl text-xs font-mono p-3 text-emerald-400 outline-none focus:border-brand/50"
                     />
                     <button onClick={generateSlug} className="p-3 bg-surface-muted hover:bg-accent rounded-xl transition-all" title="Generate">
                       <Layout className="w-3.5 h-3.5 text-content-secondary" />
                     </button>
                   </div>
                </div>

                <div>
                   <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Primary Visual Media</label>
                   <div className="flex gap-2 mb-2">
                     <input
                       type="text"
                       value={featuredImage}
                       onChange={(e) => setFeaturedImage(e.target.value)}
                       placeholder="Image URL or search..."
                       className="flex-1 bg-surface-muted border border-border rounded-xl text-[10px] p-3 text-content-secondary outline-none focus:border-brand/50"
                     />
                     <button
                       onClick={() => setShowMediaLibrary(true)}
                       className="p-3 bg-brand/20 text-brand rounded-xl hover:bg-primary-hover hover:text-primary-foreground transition-all"
                       title="Open Media Library"
                     >
                       <ImageIcon className="w-4 h-4" />
                     </button>
                   </div>
                   {featuredImage && <div className="mt-3 rounded-xl overflow-hidden border border-border"><img src={featuredImage} alt="Preview" className="w-full h-32 object-cover" /></div>}
                   <p className="text-[10px] text-content-muted mt-2">Paste a URL or use the media library to select an image</p>
                 </div>
              </div>
            )}

            {activeTab === "seo" && (
              <div className="space-y-6">
                <h3 className="section-label mb-6 text-emerald-400">Search Engine Mastery</h3>
                
                <div>
                  <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">SEO Authority Title</label>
                  <input 
                    type="text" 
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Custom Browser Title..."
                    className="w-full bg-surface-muted border border-border rounded-xl text-xs p-3 text-content-primary outline-none focus:border-brand/50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2 flex justify-between">
                    Meta Description <span>{metaDescription.length}/160</span>
                  </label>
                  <textarea 
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Brief abstract for Google..."
                    className="w-full h-32 bg-surface-muted border border-border rounded-xl text-xs p-3 text-content-secondary outline-none focus:border-brand/50 resize-none"
                  />
                  <div className="flex gap-1 mt-1">
                    <div className={`h-1 flex-1 rounded-full ${metaDescription.length > 160 ? 'bg-red-500' : metaDescription.length > 120 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Focus Keywords (Methodology)</label>
                  <input 
                    type="text" 
                    value={focusKeywords}
                    onChange={(e) => setFocusKeywords(e.target.value)}
                    placeholder="E.g., fintech, india, strategy"
                    className="w-full bg-surface-muted border border-border rounded-xl text-xs p-3 text-content-primary outline-none focus:border-brand/50 font-mono"
                  />
                </div>
              </div>
            )}

            {activeTab === "social" && (
              <div className="space-y-6">
                <h3 className="section-label mb-6 text-blue-400">Social Architecture</h3>
                <div>
                  <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Open Graph Title</label>
                  <input 
                    type="text" 
                    value={ogTitle}
                    onChange={(e) => setOgTitle(e.target.value)}
                    placeholder="Title for LinkedIn/X..."
                    className="w-full bg-surface-muted border border-border rounded-xl text-xs p-3 text-content-primary outline-none focus:border-brand/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Primary Social Asset</label>
                  <input 
                    type="text" 
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    placeholder="Custom Social Image URL..."
                    className="w-full bg-surface-muted border border-border rounded-xl text-[10px] p-3 text-content-secondary outline-none focus:border-brand/50"
                  />
                </div>
              </div>
            )}

            {activeTab === "advanced" && (
              <div className="space-y-6">
                <h3 className="section-label mb-6 text-purple-400">Taxonomy & Systems</h3>
                
                <div>
                  <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Document Tags</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      placeholder="Add insight tag..."
                      className="flex-1 bg-surface-muted border border-border rounded-xl text-xs p-2.5 text-content-primary outline-none focus:border-brand/50"
                    />
                    <button
                      onClick={addTag}
                      className="p-2.5 bg-brand/20 text-brand rounded-xl hover:bg-primary-hover hover:text-primary-foreground transition-all"
                      title="Add Tag"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-surface-muted border border-border-subtle rounded-lg text-[10px] font-bold text-content-secondary uppercase tracking-wider group transition-all hover:border-brand/30">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-content-muted hover:text-error"
                          title={`Remove ${tag} tag`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Target Audience</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newAudience}
                      onChange={(e) => setNewAudience(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addAudience()}
                      placeholder="Add target audience..."
                      className="flex-1 bg-surface-muted border border-border rounded-xl text-xs p-2.5 text-content-primary outline-none focus:border-brand/50"
                    />
                    <button
                      onClick={addAudience}
                      className="p-2.5 bg-accent-violet-muted text-accent-violet rounded-xl hover:bg-accent-violet hover:text-content-inverse transition-all"
                      title="Add Audience"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {targetAudience.map(audience => (
                      <span key={audience} className="flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-[10px] font-bold text-purple-400 uppercase tracking-wider group transition-all hover:border-purple-500/40">
                        {audience}
                        <button
                          onClick={() => removeAudience(audience)}
                          className="text-purple-600 hover:text-error"
                          title={`Remove ${audience} audience`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Content Scheduling</label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="schedulePublish"
                        checked={schedulePublish}
                        onChange={(e) => setSchedulePublish(e.target.checked)}
                        className="w-4 h-4 rounded bg-surface-muted border-border text-brand focus:ring-brand"
                      />
                      <label htmlFor="schedulePublish" className="text-sm font-bold text-content-secondary">
                        Schedule for future publishing
                      </label>
                    </div>
                    
                    {schedulePublish && (
                      <div className="space-y-4 pl-7 border-l border-border">
                        <div>
                          <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Publish Date</label>
                          <input
                            type="date"
                            value={publishDate}
                            onChange={(e) => setPublishDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-surface-muted border border-border rounded-xl text-xs p-3 text-content-primary outline-none focus:border-brand/50"
                            title="Select publish date"
                            placeholder="Select date"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Publish Time (24-hour)</label>
                          <input
                            type="time"
                            value={publishTime}
                            onChange={(e) => setPublishTime(e.target.value)}
                            className="w-full bg-surface-muted border border-border rounded-xl text-xs p-3 text-content-primary outline-none focus:border-brand/50"
                            title="Select publish time in 24-hour format"
                            placeholder="HH:MM"
                          />
                        </div>
                        
                        <div className="bg-brand/10 border border-brand/20 rounded-xl p-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-content-secondary">Scheduled for:</span>
                            <span className="font-bold text-content-primary">
                              {new Date(`${publishDate}T${publishTime}`).toLocaleString('en-US', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <p className="text-[10px] text-content-muted mt-2">
                            Content will be automatically published at the scheduled time.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Content Analytics & Performance</label>
                  <div className="bg-surface-muted border border-border rounded-xl p-4 space-y-4">
                    {/* Word Count & Readability */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-content-secondary">Word Count</span>
                          <span className="text-sm font-bold text-content-primary">{calculateWordCount(content)}</span>
                        </div>
                        <div className="h-1.5 bg-surface-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${Math.min(100, calculateWordCount(content) / 20)}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-content-muted">
                          {calculateWordCount(content) >= 800 ? "Excellent length" :
                           calculateWordCount(content) >= 300 ? "Good length" :
                           "Consider adding more content"}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-content-secondary">Readability</span>
                          <span className={`text-sm font-bold ${getReadabilityLevel(calculateReadabilityScore(content)).color}`}>
                            {getReadabilityLevel(calculateReadabilityScore(content)).label}
                          </span>
                        </div>
                        <div className="h-1.5 bg-surface-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${calculateReadabilityScore(content)}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-content-muted">
                          Score: {calculateReadabilityScore(content)}/100
                        </p>
                      </div>
                    </div>
                    
                    {/* SEO Score */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-content-secondary">SEO Optimization</span>
                        <span className={`text-sm font-bold ${getSEOScoreColor(calculateSEOScore())}`}>
                          {calculateSEOScore()}/100
                        </span>
                      </div>
                      <div className="h-2 bg-surface-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                          style={{ width: `${calculateSEOScore()}%` }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {title.length >= 50 && title.length <= 60 && (
                          <span className="px-2 py-0.5 bg-success-muted text-success text-[10px] font-bold rounded">Title ✓</span>
                        )}
                        {metaDescription.length >= 120 && metaDescription.length <= 160 && (
                          <span className="px-2 py-0.5 bg-success-muted text-success text-[10px] font-bold rounded">Description ✓</span>
                        )}
                        {featuredImage && (
                          <span className="px-2 py-0.5 bg-success-muted text-success text-[10px] font-bold rounded">Image ✓</span>
                        )}
                        {calculateWordCount(content) >= 300 && (
                          <span className="px-2 py-0.5 bg-success-muted text-success text-[10px] font-bold rounded">Length ✓</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
                      <div className="text-center">
                        <div className="text-lg font-bold text-content-primary">{targetAudience.length}</div>
                        <div className="text-[10px] text-content-muted uppercase tracking-wider">Audience Groups</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-emerald-400">{estimatedReadingTime}</div>
                        <div className="text-[10px] text-content-muted uppercase tracking-wider">Min Read</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">{tags.length}</div>
                        <div className="text-[10px] text-content-muted uppercase tracking-wider">Tags</div>
                      </div>
                    </div>
                    
                    {schedulePublish && (
                      <div className="pt-3 border-t border-border">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-content-secondary">Scheduled Publish</span>
                          <span className="text-sm font-bold text-amber-400">
                            {new Date(`${publishDate}T${publishTime}`).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-[10px] text-content-muted mt-1">
                          Content will auto-publish at scheduled time
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
     
            {/* Media Library Modal */}
            {showMediaLibrary && (
              <div
                className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-center justify-center p-2 sm:p-6 anim-fade"
                role="presentation"
                onMouseDown={(event) => { if (event.target === event.currentTarget) setShowMediaLibrary(false) }}
              >
                <div ref={mediaLibraryDialogRef} className="bg-surface border border-border rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[96vh] sm:max-h-[90vh] overflow-hidden flex flex-col" role="dialog" aria-modal="true" aria-labelledby="cms-media-library-title" tabIndex={-1}>
                  <div className="p-4 sm:p-8 border-b border-border-subtle flex items-center justify-between">
                    <div>
                      <h2 id="cms-media-library-title" className="text-lg sm:text-2xl font-bold text-content-primary">Media Library</h2>
                      <p className="text-content-muted mt-2">Select or search for images to use in your content</p>
                    </div>
                    <button
                      onClick={() => setShowMediaLibrary(false)}
                      className="p-3 rounded-xl bg-surface-muted hover:bg-accent text-content-secondary hover:text-content-primary transition-all"
                      title="Close"
                      aria-label="Close media library"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="p-4 sm:p-8 border-b border-border-subtle">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={mediaSearch}
                          onChange={(e) => setMediaSearch(e.target.value)}
                          placeholder="Search for images (e.g., business, data, technology)..."
                          className="w-full bg-surface-muted border border-border rounded-xl p-3 text-content-primary outline-none focus:border-brand/50"
                        />
                      </div>
                      <button className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary-hover transition-all">
                        Upload
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-4 mt-4">
                      <button className="px-4 py-2 bg-surface-muted rounded-lg text-sm text-content-secondary hover:text-content-primary transition-all">All Images</button>
                      <button className="px-4 py-2 bg-surface-muted rounded-lg text-sm text-content-secondary hover:text-content-primary transition-all">Unsplash</button>
                      <button className="px-4 py-2 bg-surface-muted rounded-lg text-sm text-content-secondary hover:text-content-primary transition-all">Uploads</button>
                      <button className="px-4 py-2 bg-surface-muted rounded-lg text-sm text-content-secondary hover:text-content-primary transition-all">Recent</button>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-8 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[
                      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                      "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                      "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                      "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                      "https://images.unsplash.com/photo-1556761175-4d6c8eafc3d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                      "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    ].map((url, index) => (
                      <button
                        type="button"
                        key={index}
                        aria-label={`Select image ${index + 1}`}
                        className="group relative w-full cursor-pointer rounded-xl overflow-hidden border border-border hover:border-brand transition-all text-left"
                        onClick={() => {
                          setFeaturedImage(url)
                          setShowMediaLibrary(false)
                        }}
                      >
                        <img src={url} alt={`Media ${index + 1}`} className="w-full h-32 object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="!text-white font-bold text-sm">Select Image</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="p-4 sm:p-8 border-t border-border-subtle bg-surface-muted">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <p className="text-xs sm:text-sm text-content-muted">
                        Images from Unsplash. Attribution not required but appreciated.
                      </p>
                      <button
                        onClick={() => {
                          setFeaturedImage("")
                          setShowMediaLibrary(false)
                        }}
                        className="px-4 py-2 text-sm text-content-secondary hover:text-content-primary transition-all"
                      >
                        Clear Selection
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          </aside>
          </>
        )}

        {/* MAIN VISUAL CANVAS / EDITOR SURFACE */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-surface relative scroll-smooth no-scrollbar">
          <div className="max-w-4xl mx-auto w-full px-3 sm:px-6 md:px-12 py-8 md:py-16 space-y-8 md:space-y-12">
            {/* Contextual Top-Bar Tip */}
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
              <span className="text-[9px] font-bold text-content-muted uppercase tracking-[0.2em] flex items-center gap-2">
                <Type className="w-3 h-3" /> Rich Text Engine (Pro)
              </span>
              <span className="text-[9px] font-bold text-content-muted uppercase tracking-[0.2em]">Typographic Perfection Active</span>
            </div>

            <div className="space-y-4">
               <label className="section-label text-content-primary">Expert Summary (Excerpt)</label>
               <textarea 
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Draft your lead abstract here for maximum corporate impact..."
                  className="w-full bg-transparent border-none text-2xl font-medium text-content-secondary placeholder:text-content-muted focus:outline-none resize-none h-auto min-h-[100px]"
                  rows={2}
               />
            </div>
            
            <div className="space-y-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <label className="section-label text-content-primary">Primary Document Body</label>
                  <span className="text-[10px] font-bold text-content-muted uppercase tracking-widest">{contentType} MODE</span>
                </div>
                
                {contentType === 'BLOCKS' ? (
                  <div className="flex-1 rounded-2xl overflow-hidden border border-border min-h-[600px] shadow-2xl relative">
                    <BlockEditor initialBlocks={blocks} onChange={setBlocks} />
                  </div>
                ) : (
                  <div className="min-h-[500px]">
                    <Editor content={content} onChange={setContent} />
                  </div>
                )}
            </div>
          </div>
          
          {/* Visual Preview Overlay (Elementor Style) */}
          {previewMode && (
            <div className="absolute inset-0 bg-surface z-[100] overflow-y-auto p-4 sm:p-12 anim-fade">
               <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
                 <button onClick={() => setPreviewMode(false)} className="fixed top-4 right-4 sm:top-6 sm:right-12 z-[110] bg-primary text-primary-foreground px-4 sm:px-6 py-2 rounded-full font-bold shadow-2xl hover:scale-105 transition-all">Close Preview</button>
                 <div className="space-y-4">
                   <div className="h-px w-20 bg-primary" />
                   <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-content-primary tracking-tight leading-[1.1]">{title || "Untitled Elite Report"}</h1>
                   <p className="text-lg sm:text-2xl text-content-muted font-serif leading-relaxed italic border-l-4 border-brand pl-4 sm:pl-6 py-2">{excerpt || "Awaiting abstract draft..."}</p>
                 </div>
                 <div className="mt-12 bg-surface p-4 sm:p-8 rounded-3xl border border-border-subtle">
                   <ContentRenderer content={content} contentType={contentType} blocks={blocks} />
                 </div>
               </div>
            </div>
          )}
        </main>
      </div>

      {/* Template Selection Modal */}
      {showTemplates && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-center justify-center p-2 sm:p-6 anim-fade"
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setShowTemplates(false) }}
        >
          <div ref={templateDialogRef} className="bg-surface border border-border rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[96vh] sm:max-h-[90vh] overflow-hidden flex flex-col" role="dialog" aria-modal="true" aria-labelledby="cms-templates-title" tabIndex={-1}>
            <div className="p-4 sm:p-8 border-b border-border-subtle flex items-center justify-between">
              <div>
                <h2 id="cms-templates-title" className="text-lg sm:text-2xl font-bold text-content-primary">Content Templates</h2>
                <p className="text-content-muted mt-2">Jumpstart your content with professionally designed templates</p>
              </div>
              <button
                onClick={() => setShowTemplates(false)}
                className="p-3 rounded-xl bg-surface-muted hover:bg-accent text-content-secondary hover:text-content-primary transition-all"
                title="Close"
                aria-label="Close templates"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 sm:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {contentTemplates.map(template => (
                <button
                  type="button"
                  key={template.id}
                  aria-label={`Use ${template.name} template`}
                  className="w-full bg-surface-muted border border-border rounded-2xl p-4 sm:p-6 hover:border-brand/30 hover:bg-accent transition-all group cursor-pointer text-left"
                  onClick={() => handleApplyTemplate(template.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{template.icon}</span>
                        <h3 className="text-lg font-bold text-content-primary">{template.name}</h3>
                      </div>
                      <p className="text-sm text-content-secondary">{template.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-brand/20 text-brand text-xs font-bold rounded-full uppercase tracking-wider">
                      {template.type}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-content-muted">Difficulty</span>
                      <span className={`font-bold ${
                        template.difficulty === 'BEGINNER' ? 'text-emerald-400' :
                        template.difficulty === 'INTERMEDIATE' ? 'text-blue-400' :
                        template.difficulty === 'ADVANCED' ? 'text-orange-400' : 'text-red-400'
                      }`}>
                        {template.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-content-muted">Reading Time</span>
                      <span className="font-bold text-content-primary">{template.estimatedReadingTime} min</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-content-muted">Target Audience</span>
                      <span className="font-bold text-purple-400">{template.targetAudience.length} groups</span>
                    </div>
                    
                    <div className="pt-4 border-t border-border-subtle">
                      <div className="flex flex-wrap gap-2">
                        {template.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-surface-muted rounded-lg text-[10px] font-bold text-content-secondary uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <span className="mt-6 flex w-full items-center justify-center py-3 bg-primary text-primary-foreground font-bold rounded-xl transition-all group-hover:bg-primary-hover">
                    Use This Template
                  </span>
                </button>
              ))}
            </div>
            
            <div className="p-4 sm:p-8 border-t border-border-subtle bg-surface-muted">
              <p className="text-sm text-content-muted text-center">
                Templates provide structure and best practices. You can customize all content after selection.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
