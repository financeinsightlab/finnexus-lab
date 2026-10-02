"use client"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import Editor from "@/components/admin/Editor"
import { createPost, PostFormData } from "@/actions/cms-actions"
import { ArticleType } from "@prisma/client"
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
import { Block } from "@/lib/blocks/registry"
import ContentRenderer from "@/components/ContentRenderer"
import { useModalAccessibility } from "@/components/ui/useModalAccessibility"

const BlockEditor = dynamic(() => import('@/components/admin/block-editor/BlockEditor'), { ssr: false })

type ActiveTab = "general" | "seo" | "social" | "advanced"

export default function EditorClient() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<ActiveTab>("general")
  const [sidebarOpen, setSidebarOpen] = useState(false) // default closed for more space!
  const [previewMode, setPreviewMode] = useState(false)

  // Content mode: markdown (Tiptap) or blocks (Visual Builder)
  const [contentType, setContentType] = useState<'MARKDOWN' | 'BLOCKS'>('MARKDOWN')
  const [blocks, setBlocks] = useState<Block[]>([])

  // Core Data
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [type, setType] = useState<ArticleType>("RESEARCH")
  const [featuredImage, setFeaturedImage] = useState("")
  
  // CMS Elite Metadata (SEO)
  const [seoTitle, setSeoTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [focusKeywords, setFocusKeywords] = useState("")
  
  // CMS Elite Metadata (Social)
  const [ogTitle, setOgTitle] = useState("")
  const [ogImage, setOgImage] = useState("")
  
  // Enhanced Metadata
  const [difficulty, setDifficulty] = useState<"BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT">("INTERMEDIATE")
  const [targetAudience, setTargetAudience] = useState<string[]>(["Executives", "Analysts"])
  const [newAudience, setNewAudience] = useState("")
  const [contentStatus, setContentStatus] = useState<"DRAFT" | "REVIEW" | "APPROVED" | "PUBLISHED">("DRAFT")
  const [estimatedReadingTime, setEstimatedReadingTime] = useState<number>(5)
  
  // Taxonomy
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  // Template System
  const [showTemplates, setShowTemplates] = useState(false)
  
  // Media Library
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  const [mediaSearch, setMediaSearch] = useState("")
  const mediaDialogRef = useRef<HTMLDivElement>(null)
  const mediaCloseButtonRef = useRef<HTMLButtonElement>(null)
  const templateDialogRef = useRef<HTMLDivElement>(null)
  const templateCloseButtonRef = useRef<HTMLButtonElement>(null)

  useModalAccessibility(showMediaLibrary, mediaDialogRef, () => setShowMediaLibrary(false), {
    initialFocusRef: mediaCloseButtonRef,
  })
  useModalAccessibility(showTemplates, templateDialogRef, () => setShowTemplates(false), {
    initialFocusRef: templateCloseButtonRef,
  })
  
  // Scheduling
  const [schedulePublish, setSchedulePublish] = useState(false)
  const [publishDate, setPublishDate] = useState(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  })
  const [publishTime, setPublishTime] = useState("09:00")

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
      
      const post = await createPost(data)
      
      if (contentType === 'BLOCKS' && blocks.length > 0) {
        await fetch('/api/blocks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId: post.id, blocks })
        })
      }
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
    <div className="h-full min-h-0 min-w-0 flex flex-col overflow-hidden bg-[#0B0D13]">
      {/* Elementor-Style Floating Header */}
      <header className="min-h-16 h-auto min-w-0 flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-[#1A1F2E]/80 backdrop-blur-xl border-b border-white/5 z-[60] shrink-0 sm:h-16 sm:flex-nowrap sm:gap-3 sm:px-6 sm:py-0">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
          <Link href="/admin/cms" className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all text-slate-400">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex min-w-0 flex-col">
            <input 
              type="text" 
              placeholder="Post Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="min-w-0 bg-transparent text-sm font-bold text-white placeholder:text-slate-600 focus:outline-none w-[min(34vw,350px)] sm:w-[350px]"
            />
            <span className="text-[10px] text-[#0D6E6E] font-bold uppercase tracking-widest mt-0.5">Drafting Elite Report</span>
          </div>
        </div>

        <div className="flex min-w-0 flex-wrap items-center justify-end gap-2 sm:flex-nowrap sm:gap-3">
          <button
            onClick={() => setShowTemplates(true)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white"
            aria-label="Use content template"
            title="Use Template"
          >
            <Sparkles className="w-5 h-5" />
          </button>
          
          <div className="flex items-center bg-black/30 border border-white/10 rounded-xl p-1 gap-1">
            <button
              onClick={() => setContentType('MARKDOWN')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${contentType === 'MARKDOWN' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              title="Classic Markdown / Rich Text editor"
              aria-label="Use Markdown editor"
            >
              <Type className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Markdown</span>
            </button>
            <button
              onClick={() => setContentType('BLOCKS')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${contentType === 'BLOCKS' ? 'bg-[#0D6E6E] text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
              title="Visual Block Builder"
              aria-label="Use block editor"
            >
              <Blocks className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Block Editor</span>
            </button>
          </div>
          
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`p-2.5 rounded-xl transition-all ${previewMode ? 'bg-[#0D6E6E] text-white shadow-[0_0_15px_rgba(13,110,110,0.5)]' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            title="Toggle Visual Preview"
            aria-label={previewMode ? "Close visual preview" : "Open visual preview"}
          >
            <Eye className="w-5 h-5" />
          </button>
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleSave(false)}
              disabled={loading}
              className="flex min-h-11 items-center gap-2 rounded-xl bg-white/5 px-3 text-sm font-bold text-slate-300 transition-all hover:text-white disabled:opacity-50 sm:px-5"
            >
              <Save className="w-4 h-4 text-emerald-500" />
              Save
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={loading}
              className="btn-primary flex min-h-11 items-center gap-2 px-3 font-bold disabled:opacity-50 sm:px-6"
            >
              <Send className="w-4 h-4 rotate-12" />
              {loading ? "Publishing..." : "Publish Elite"}
            </button>
          </div>
        </div>
      </header>

      <div className="relative flex min-h-0 min-w-0 flex-1 overflow-hidden">
        {/* PANEL 1: SETTINGS SELECTOR (LEFT SLIM) */}
        <aside className="ui-scroll-region min-h-0 max-h-full w-16 shrink-0 overflow-y-auto bg-[#0B0D13] border-r border-white/5 flex flex-col items-center py-6 gap-6 z-50" data-lenis-prevent aria-label="Editor settings tabs">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-3 text-slate-500 hover:text-white transition-all bg-white/5 rounded-2xl mb-4">
            {sidebarOpen ? <PanelLeftClose className="w-5 h-5"/> : <PanelLeftOpen className="w-5 h-5"/>}
          </button>
          <button onClick={() => { setActiveTab("general"); setSidebarOpen(true); }} className={`p-3 rounded-2xl transition-all ${activeTab === "general" && sidebarOpen ? "bg-[#0D6E6E] text-white shadow-lg shadow-[#0D6E6E]/20" : "text-slate-600 hover:text-slate-300 hover:bg-white/5"}`} title="General Config">
            <Settings className="w-5 h-5" />
          </button>
          <button onClick={() => { setActiveTab("seo"); setSidebarOpen(true); }} className={`p-3 rounded-2xl transition-all ${activeTab === "seo" && sidebarOpen ? "bg-[#0D6E6E] text-white shadow-lg shadow-[#0D6E6E]/20" : "text-slate-600 hover:text-slate-300 hover:bg-white/5"}`} title="SEO Optimization">
            <Globe className="w-5 h-5" />
          </button>
          <button onClick={() => { setActiveTab("social"); setSidebarOpen(true); }} className={`p-3 rounded-2xl transition-all ${activeTab === "social" && sidebarOpen ? "bg-[#0D6E6E] text-white shadow-lg shadow-[#0D6E6E]/20" : "text-slate-600 hover:text-slate-300 hover:bg-white/5"}`} title="Social Sharing">
            <Share2 className="w-5 h-5" />
          </button>
          <button onClick={() => { setActiveTab("advanced"); setSidebarOpen(true); }} className={`p-3 rounded-2xl transition-all ${activeTab === "advanced" && sidebarOpen ? "bg-[#0D6E6E] text-white shadow-lg shadow-[#0D6E6E]/20" : "text-slate-600 hover:text-slate-300 hover:bg-white/5"}`} title="Advanced Ops">
            <BarChart className="w-5 h-5" />
          </button>
        </aside>

        {/* PANEL 2: SETTINGS CONTENT (EXPANDED LEFT) */}
        {sidebarOpen && (
          <aside className="ui-scroll-region absolute inset-y-0 left-16 right-0 z-[55] min-h-0 min-w-0 w-auto max-w-none overflow-y-auto bg-[#1A1F2E] border-r border-[#2D3748] p-4 sm:p-8 transition-all duration-300 md:static md:z-auto md:w-80 md:max-w-[calc(100vw-4rem)] md:shrink-0" data-lenis-prevent>
            <div className="sticky top-0 z-10 -mx-4 flex justify-end border-b border-[#2D3748] bg-[#1A1F2E] px-4 py-2 sm:-mx-8 sm:px-8">
              <button type="button" onClick={() => setSidebarOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-lg bg-black/20 text-slate-400 hover:text-white" aria-label="Close editor settings">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-8 anim-fade mt-4">
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <h3 className="section-label mb-6 text-[#0D6E6E]">General Controls</h3>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Category Classification</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as ArticleType)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl text-xs font-bold p-3 text-white outline-none focus:border-[#0D6E6E]/50"
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
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Difficulty Level</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT")}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl text-xs font-bold p-3 text-white outline-none focus:border-[#0D6E6E]/50"
                    title="Difficulty Level"
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                    <option value="EXPERT">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Content Status</label>
                  <select
                    value={contentStatus}
                    onChange={(e) => setContentStatus(e.target.value as "DRAFT" | "REVIEW" | "APPROVED" | "PUBLISHED")}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl text-xs font-bold p-3 text-white outline-none focus:border-[#0D6E6E]/50"
                    title="Content Status"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="REVIEW">In Review</option>
                    <option value="APPROVED">Approved</option>
                    <option value="PUBLISHED">Published</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Estimated Reading Time (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={estimatedReadingTime}
                    onChange={(e) => setEstimatedReadingTime(parseInt(e.target.value) || 5)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl text-xs font-bold p-3 text-white outline-none focus:border-[#0D6E6E]/50"
                    placeholder="5"
                  />
                </div>

                <div>
                   <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">URL Identity (Slug)</label>
                   <div className="flex gap-2">
                     <input 
                       type="text" 
                       value={slug}
                       onChange={(e) => setSlug(e.target.value)}
                       placeholder="report-slug"
                       className="flex-1 bg-white/5 border border-white/10 rounded-xl text-xs font-mono p-3 text-emerald-400 outline-none focus:border-[#0D6E6E]/50"
                     />
                     <button onClick={generateSlug} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all" title="Generate">
                       <Layout className="w-3.5 h-3.5 text-slate-400" />
                     </button>
                   </div>
                </div>

                <div>
                   <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Primary Visual Media</label>
                   <div className="flex gap-2 mb-2">
                     <input
                       type="text"
                       value={featuredImage}
                       onChange={(e) => setFeaturedImage(e.target.value)}
                       placeholder="Image URL or search..."
                       className="flex-1 bg-white/5 border border-white/10 rounded-xl text-[10px] p-3 text-slate-400 outline-none focus:border-[#0D6E6E]/50"
                     />
                     <button
                       onClick={() => setShowMediaLibrary(true)}
                       className="p-3 bg-[#0D6E6E]/20 text-[#0D6E6E] rounded-xl hover:bg-[#0D6E6E] hover:text-white transition-all"
                       title="Open Media Library"
                     >
                       <ImageIcon className="w-4 h-4" />
                     </button>
                   </div>
                   {featuredImage && <div className="mt-3 rounded-xl overflow-hidden border border-white/10"><img src={featuredImage} alt="Preview" className="w-full h-32 object-cover" /></div>}
                   <p className="text-[10px] text-slate-600 mt-2">Paste a URL or use the media library to select an image</p>
                 </div>
              </div>
            )}

            {activeTab === "seo" && (
              <div className="space-y-6">
                <h3 className="section-label mb-6 text-emerald-400">Search Engine Mastery</h3>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">SEO Authority Title</label>
                  <input 
                    type="text" 
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Custom Browser Title..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl text-xs p-3 text-white outline-none focus:border-[#0D6E6E]/50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex justify-between">
                    Meta Description <span>{metaDescription.length}/160</span>
                  </label>
                  <textarea 
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Brief abstract for Google..."
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-xl text-xs p-3 text-slate-400 outline-none focus:border-[#0D6E6E]/50 resize-none"
                  />
                  <div className="flex gap-1 mt-1">
                    <div className={`h-1 flex-1 rounded-full ${metaDescription.length > 160 ? 'bg-red-500' : metaDescription.length > 120 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Focus Keywords (Methodology)</label>
                  <input 
                    type="text" 
                    value={focusKeywords}
                    onChange={(e) => setFocusKeywords(e.target.value)}
                    placeholder="E.g., fintech, india, strategy"
                    className="w-full bg-white/5 border border-white/10 rounded-xl text-xs p-3 text-white outline-none focus:border-[#0D6E6E]/50 font-mono"
                  />
                </div>
              </div>
            )}

            {activeTab === "social" && (
              <div className="space-y-6">
                <h3 className="section-label mb-6 text-blue-400">Social Architecture</h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Open Graph Title</label>
                  <input 
                    type="text" 
                    value={ogTitle}
                    onChange={(e) => setOgTitle(e.target.value)}
                    placeholder="Title for LinkedIn/X..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl text-xs p-3 text-white outline-none focus:border-[#0D6E6E]/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Primary Social Asset</label>
                  <input 
                    type="text" 
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    placeholder="Custom Social Image URL..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl text-[10px] p-3 text-slate-400 outline-none focus:border-[#0D6E6E]/50"
                  />
                </div>
              </div>
            )}

            {activeTab === "advanced" && (
              <div className="space-y-6">
                <h3 className="section-label mb-6 text-purple-400">Taxonomy & Systems</h3>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Document Tags</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      placeholder="Add insight tag..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl text-xs p-2.5 text-white outline-none focus:border-[#0D6E6E]/50"
                    />
                    <button
                      onClick={addTag}
                      className="p-2.5 bg-[#0D6E6E]/20 text-[#0D6E6E] rounded-xl hover:bg-[#0D6E6E] hover:text-white transition-all"
                      title="Add Tag"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-wider group transition-all hover:border-[#0D6E6E]/30">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-slate-600 hover:text-red-400"
                          title={`Remove ${tag} tag`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Target Audience</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newAudience}
                      onChange={(e) => setNewAudience(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addAudience()}
                      placeholder="Add target audience..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl text-xs p-2.5 text-white outline-none focus:border-[#0D6E6E]/50"
                    />
                    <button
                      onClick={addAudience}
                      className="p-2.5 bg-purple-500/20 text-purple-400 rounded-xl hover:bg-purple-500 hover:text-white transition-all"
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
                          className="text-purple-600 hover:text-red-400"
                          title={`Remove ${audience} audience`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Content Scheduling</label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="schedulePublish"
                        checked={schedulePublish}
                        onChange={(e) => setSchedulePublish(e.target.checked)}
                        className="w-4 h-4 rounded bg-white/5 border-white/10 text-[#0D6E6E] focus:ring-[#0D6E6E]"
                      />
                      <label htmlFor="schedulePublish" className="text-sm font-bold text-slate-300">
                        Schedule for future publishing
                      </label>
                    </div>
                    
                    {schedulePublish && (
                      <div className="space-y-4 pl-7 border-l border-white/10">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Publish Date</label>
                          <input
                            type="date"
                            value={publishDate}
                            onChange={(e) => setPublishDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-white/5 border border-white/10 rounded-xl text-xs p-3 text-white outline-none focus:border-[#0D6E6E]/50"
                            title="Select publish date"
                            placeholder="Select date"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Publish Time (24-hour)</label>
                          <input
                            type="time"
                            value={publishTime}
                            onChange={(e) => setPublishTime(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl text-xs p-3 text-white outline-none focus:border-[#0D6E6E]/50"
                            title="Select publish time in 24-hour format"
                            placeholder="HH:MM"
                          />
                        </div>
                        
                        <div className="bg-[#0D6E6E]/10 border border-[#0D6E6E]/20 rounded-xl p-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Scheduled for:</span>
                            <span className="font-bold text-white">
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
                          <p className="text-[10px] text-slate-500 mt-2">
                            Content will be automatically published at the scheduled time.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Content Analytics & Performance</label>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                    {/* Word Count & Readability */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">Word Count</span>
                          <span className="text-sm font-bold text-white">{calculateWordCount(content)}</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${Math.min(100, calculateWordCount(content) / 20)}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-500">
                          {calculateWordCount(content) >= 800 ? "Excellent length" :
                           calculateWordCount(content) >= 300 ? "Good length" :
                           "Consider adding more content"}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">Readability</span>
                          <span className={`text-sm font-bold ${getReadabilityLevel(calculateReadabilityScore(content)).color}`}>
                            {getReadabilityLevel(calculateReadabilityScore(content)).label}
                          </span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${calculateReadabilityScore(content)}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-500">
                          Score: {calculateReadabilityScore(content)}/100
                        </p>
                      </div>
                    </div>
                    
                    {/* SEO Score */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">SEO Optimization</span>
                        <span className={`text-sm font-bold ${getSEOScoreColor(calculateSEOScore())}`}>
                          {calculateSEOScore()}/100
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                          style={{ width: `${calculateSEOScore()}%` }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {title.length >= 50 && title.length <= 60 && (
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">Title ✓</span>
                        )}
                        {metaDescription.length >= 120 && metaDescription.length <= 160 && (
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">Description ✓</span>
                        )}
                        {featuredImage && (
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">Image ✓</span>
                        )}
                        {calculateWordCount(content) >= 300 && (
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">Length ✓</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{targetAudience.length}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Audience Groups</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-emerald-400">{estimatedReadingTime}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Min Read</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">{tags.length}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Tags</div>
                      </div>
                    </div>
                    
                    {schedulePublish && (
                      <div className="pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">Scheduled Publish</span>
                          <span className="text-sm font-bold text-amber-400">
                            {new Date(`${publishDate}T${publishTime}`).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1">
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
              <div className="safe-area-overlay fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-xl anim-fade" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowMediaLibrary(false) }}>
                <div ref={mediaDialogRef} className="viewport-dialog-panel ui-scroll-region flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-[#2D3748] bg-[#1A1F2E]" role="dialog" aria-modal="true" aria-labelledby="cms-media-dialog-title" tabIndex={-1} data-lenis-prevent onMouseDown={(event) => event.stopPropagation()}>
                  <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/5 p-4 sm:p-8">
                    <div className="min-w-0">
                      <h2 id="cms-media-dialog-title" className="text-xl font-bold text-white sm:text-2xl">Media Library</h2>
                      <p className="text-slate-500 mt-2">Select or search for images to use in your content</p>
                    </div>
                    <button
                      ref={mediaCloseButtonRef}
                      type="button"
                      onClick={() => setShowMediaLibrary(false)}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
                      aria-label="Close media library"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="shrink-0 border-b border-white/5 p-4 sm:p-8">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <div className="min-w-0 flex-1">
                        <input
                          type="text"
                          value={mediaSearch}
                          onChange={(e) => setMediaSearch(e.target.value)}
                          placeholder="Search for images (e.g., business, data, technology)..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#0D6E6E]/50"
                        />
                      </div>
                      <button className="min-h-11 shrink-0 rounded-xl bg-[#0D6E6E] px-4 py-3 font-bold text-white transition-all hover:bg-[#0F9E9E] sm:px-6">
                        Upload
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button className="min-h-11 px-4 py-2 bg-white/5 rounded-lg text-sm text-slate-400 hover:text-white transition-all">All Images</button>
                      <button className="min-h-11 px-4 py-2 bg-white/5 rounded-lg text-sm text-slate-400 hover:text-white transition-all">Unsplash</button>
                      <button className="min-h-11 px-4 py-2 bg-white/5 rounded-lg text-sm text-slate-400 hover:text-white transition-all">Uploads</button>
                      <button className="min-h-11 px-4 py-2 bg-white/5 rounded-lg text-sm text-slate-400 hover:text-white transition-all">Recent</button>
                    </div>
                  </div>
                  
                  <div className="ui-scroll-region min-h-0 flex-1 overflow-y-auto p-4 sm:p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4" data-lenis-prevent>
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
                        key={index}
                        type="button"
                        aria-label={`Select media image ${index + 1}`}
                        className="group relative w-full cursor-pointer overflow-hidden rounded-xl border border-white/10 text-left transition-all hover:border-[#0D6E6E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D6E6E]"
                        onClick={() => {
                          setFeaturedImage(url)
                          setShowMediaLibrary(false)
                        }}
                      >
                        <img src={url} alt={`Media ${index + 1}`} className="w-full h-32 object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white font-bold text-sm">Select Image</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="shrink-0 border-t border-white/5 bg-black/20 p-4 sm:p-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-slate-500">
                        Images from Unsplash. Attribution not required but appreciated.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setFeaturedImage("")
                          setShowMediaLibrary(false)
                        }}
                        className="min-h-11 self-end px-4 py-2 text-sm text-slate-400 transition-all hover:text-white"
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
        )}

        {/* MAIN VISUAL CANVAS / EDITOR SURFACE */}
        <main className="ui-scroll-region min-h-0 min-w-0 flex-1 flex flex-col overflow-y-auto bg-[#0F1117] relative scroll-smooth">
          <div className="content-page dark w-full py-16 space-y-12">
            {/* Contextual Top-Bar Tip */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <span className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
                <Type className="w-3 h-3" /> Rich Text Engine (Pro)
              </span>
              <span className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em]">Typographic Perfection Active</span>
            </div>

            <div className="space-y-4">
               <label className="section-label text-slate-700">Expert Summary (Excerpt)</label>
               <textarea 
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Draft your lead abstract here for maximum corporate impact..."
                  className="w-full bg-transparent border-none text-2xl font-medium text-slate-400 placeholder:text-slate-800 focus:outline-none resize-none h-auto min-h-[100px]"
                  rows={2}
               />
            </div>
            
            <div className="space-y-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <label className="section-label text-slate-700">Primary Document Body</label>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{contentType} MODE</span>
                </div>
                
                {contentType === 'BLOCKS' ? (
                  <div className="flex-1 rounded-2xl overflow-hidden border border-[#2D3748] min-h-[600px] shadow-2xl relative">
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
            <div className="absolute inset-0 z-[100] flex min-h-0 flex-col overflow-hidden bg-[#0F1117] anim-fade" role="region" aria-label="Article preview">
              <div className="sticky top-0 z-[110] flex shrink-0 justify-end border-b border-white/5 bg-[#0F1117]/95 p-3 backdrop-blur-xl sm:p-4">
                <button onClick={() => setPreviewMode(false)} className="min-h-11 rounded-full bg-white px-6 py-2 font-bold text-black shadow-2xl transition-all hover:scale-105">Close Preview</button>
              </div>
              <div className="ui-scroll-region min-h-0 flex-1 overflow-y-auto p-4 sm:p-12" data-lenis-prevent>
                <div className="content-page dark space-y-12">
                  <div className="space-y-4">
                    <div className="h-px w-20 bg-[#0D6E6E]" />
                    <h1 className="break-words [overflow-wrap:anywhere] text-6xl font-extrabold leading-[1.1] tracking-tight text-white">{title || "Untitled Elite Report"}</h1>
                    <p className="break-words text-2xl text-slate-500 font-serif leading-relaxed italic border-l-4 border-[#0D6E6E] pl-6 py-2">{excerpt || "Awaiting abstract draft..."}</p>
                  </div>
                  <div className="mt-12 rounded-3xl border border-white/5 bg-[#1A1F2E] p-4 sm:p-8">
                    <ContentRenderer content={content} contentType={contentType} blocks={blocks} />
                  </div>
                </div>
              </div>

            </div>
          )}
        </main>
      </div>

      {/* Template Selection Modal */}
      {showTemplates && (
        <div className="safe-area-overlay fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-xl anim-fade" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowTemplates(false) }}>
          <div ref={templateDialogRef} className="viewport-dialog-panel ui-scroll-region flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[#2D3748] bg-[#1A1F2E]" role="dialog" aria-modal="true" aria-labelledby="cms-template-dialog-title" tabIndex={-1} data-lenis-prevent onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/5 p-4 sm:p-8">
              <div className="min-w-0">
                <h2 id="cms-template-dialog-title" className="text-xl font-bold text-white sm:text-2xl">Content Templates</h2>
                <p className="text-slate-500 mt-2">Jumpstart your content with professionally designed templates</p>
              </div>
              <button
                ref={templateCloseButtonRef}
                type="button"
                onClick={() => setShowTemplates(false)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
                aria-label="Close content templates"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="ui-scroll-region min-h-0 flex-1 overflow-y-auto p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" data-lenis-prevent>
              {contentTemplates.map(template => (
                <div
                  key={template.id}
                  role="button"
                  tabIndex={0}
                  className="group w-full cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all hover:border-[#0D6E6E]/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D6E6E]"
                  onClick={() => handleApplyTemplate(template.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      handleApplyTemplate(template.id)
                    }
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{template.icon}</span>
                        <h3 className="text-lg font-bold text-white">{template.name}</h3>
                      </div>
                      <p className="text-sm text-slate-400">{template.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-[#0D6E6E]/20 text-[#0D6E6E] text-xs font-bold rounded-full uppercase tracking-wider">
                      {template.type}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Difficulty</span>
                      <span className={`font-bold ${
                        template.difficulty === 'BEGINNER' ? 'text-emerald-400' :
                        template.difficulty === 'INTERMEDIATE' ? 'text-blue-400' :
                        template.difficulty === 'ADVANCED' ? 'text-orange-400' : 'text-red-400'
                      }`}>
                        {template.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Reading Time</span>
                      <span className="font-bold text-white">{template.estimatedReadingTime} min</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Target Audience</span>
                      <span className="font-bold text-purple-400">{template.targetAudience.length} groups</span>
                    </div>
                    
                    <div className="pt-4 border-t border-white/5">
                      <div className="flex flex-wrap gap-2">
                        {template.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <span className="mt-6 flex min-h-11 w-full items-center justify-center rounded-xl bg-[#0D6E6E] py-3 font-bold text-white transition-all group-hover:bg-[#0F9E9E]">
                    Use This Template
                  </span>
                </div>
              ))}
            </div>
            
            <div className="shrink-0 border-t border-white/5 bg-black/20 p-4 sm:p-8">
              <p className="break-words text-center text-sm text-slate-500">
                Templates provide structure and best practices. You can customize all content after selection.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
