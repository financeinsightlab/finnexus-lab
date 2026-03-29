"use client"

import { useState, useEffect } from "react"
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
  Search,
  Globe,
  Share2,
  BarChart,
  Eye,
  Type,
  Hash,
  X,
  Plus
} from "lucide-react"
import Link from "next/link"
import React from "react"

type ActiveTab = "general" | "seo" | "social" | "advanced"

export default function EditorClient() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<ActiveTab>("general")
  const [previewMode, setPreviewMode] = useState(false)

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
  
  // Taxonomy
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const handleSave = async (isPublishing: boolean) => {
    setLoading(true)
    try {
      const data: PostFormData = {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        type,
        published: isPublishing,
        featuredImage: featuredImage || null,
        seoTitle: seoTitle || null,
        metaDescription: metaDescription || null,
        focusKeywords: focusKeywords || null,
        ogTitle: ogTitle || null,
        ogImage: ogImage || null,
        tags
      }
      
      await createPost(data)
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

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0B0D13]">
      {/* Elementor-Style Floating Header */}
      <header className="h-16 flex items-center justify-between px-6 bg-[#1A1F2E]/80 backdrop-blur-xl border-b border-white/5 z-[60] shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/admin/cms" className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all text-slate-400">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex flex-col">
            <input 
              type="text" 
              placeholder="Post Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent text-sm font-bold text-white placeholder:text-slate-600 focus:outline-none w-[200px] md:w-[350px]"
            />
            <span className="text-[10px] text-[#0D6E6E] font-bold uppercase tracking-widest mt-0.5">Drafting Elite Report</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setPreviewMode(!previewMode)}
            className={`p-2.5 rounded-xl transition-all ${previewMode ? 'bg-[#0D6E6E] text-white shadow-[0_0_15px_rgba(13,110,110,0.5)]' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            title="Toggle Visual Preview"
          >
            <Eye className="w-5 h-5" />
          </button>
          
          <div className="hidden sm:flex items-center gap-2">
            <button 
              onClick={() => handleSave(false)}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:text-white bg-white/5 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-emerald-500" />
              Save
            </button>
            <button 
              onClick={() => handleSave(true)}
              disabled={loading}
              className="btn-primary flex items-center gap-2 font-bold px-6 py-2.5 disabled:opacity-50"
            >
              <Send className="w-4 h-4 rotate-12" />
              {loading ? "Publishing..." : "Publish Elite"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* PANEL 1: SETTINGS SELECTOR (LEFT SLIM) */}
        <aside className="w-16 bg-[#0B0D13] border-r border-white/5 flex flex-col items-center py-6 gap-6 shrink-0 z-50">
          <button onClick={() => setActiveTab("general")} className={`p-3 rounded-2xl transition-all ${activeTab === "general" ? "bg-[#0D6E6E] text-white shadow-lg shadow-[#0D6E6E]/20" : "text-slate-600 hover:text-slate-300 hover:bg-white/5"}`} title="General Config">
            <Settings className="w-5 h-5" />
          </button>
          <button onClick={() => setActiveTab("seo")} className={`p-3 rounded-2xl transition-all ${activeTab === "seo" ? "bg-[#0D6E6E] text-white shadow-lg shadow-[#0D6E6E]/20" : "text-slate-600 hover:text-slate-300 hover:bg-white/5"}`} title="SEO Optimization">
            <Globe className="w-5 h-5" />
          </button>
          <button onClick={() => setActiveTab("social")} className={`p-3 rounded-2xl transition-all ${activeTab === "social" ? "bg-[#0D6E6E] text-white shadow-lg shadow-[#0D6E6E]/20" : "text-slate-600 hover:text-slate-300 hover:bg-white/5"}`} title="Social Sharing">
            <Share2 className="w-5 h-5" />
          </button>
          <button onClick={() => setActiveTab("advanced")} className={`p-3 rounded-2xl transition-all ${activeTab === "advanced" ? "bg-[#0D6E6E] text-white shadow-lg shadow-[#0D6E6E]/20" : "text-slate-600 hover:text-slate-300 hover:bg-white/5"}`} title="Advanced Ops">
            <BarChart className="w-5 h-5" />
          </button>
        </aside>

        {/* PANEL 2: SETTINGS CONTENT (EXPANDED LEFT) */}
        <aside className="w-80 bg-[#1A1F2E] border-r border-[#2D3748] p-8 overflow-y-auto no-scrollbar hidden xl:block shrink-0">
          <div className="space-y-8 anim-fade">
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <h3 className="section-label mb-6 text-[#0D6E6E]">General Controls</h3>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Category Classification</label>
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value as ArticleType)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl text-xs font-bold p-3 text-white outline-none focus:border-[#0D6E6E]/50"
                  >
                    <option value="RESEARCH">Research Report</option>
                    <option value="INSIGHT">Insight Article</option>
                    <option value="CASE_STUDY">Case Study</option>
                    <option value="MEDIA">Speaking & Media</option>
                  </select>
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
                   <input 
                     type="text" 
                     value={featuredImage}
                     onChange={(e) => setFeaturedImage(e.target.value)}
                     placeholder="Image URL..."
                     className="w-full bg-white/5 border border-white/10 rounded-xl text-[10px] p-3 text-slate-400 outline-none focus:border-[#0D6E6E]/50"
                   />
                   {featuredImage && <div className="mt-3 rounded-xl overflow-hidden border border-white/10"><img src={featuredImage} alt="Preview" className="w-full h-32 object-cover" /></div>}
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
                    <button onClick={addTag} className="p-2.5 bg-[#0D6E6E]/20 text-[#0D6E6E] rounded-xl hover:bg-[#0D6E6E] hover:text-white transition-all">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-wider group transition-all hover:border-[#0D6E6E]/30">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="text-slate-600 hover:text-red-400"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN VISUAL CANVAS / EDITOR SURFACE */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-[#0F1117] relative scroll-smooth no-scrollbar">
          <div className="max-w-4xl mx-auto w-full px-6 md:px-12 py-16 space-y-12">
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
            
            <div className="space-y-6">
                <label className="section-label text-slate-700">Primary Document Body</label>
                <Editor content={content} onChange={setContent} />
            </div>
          </div>
          
          {/* Visual Preview Overlay (Elementor Style) */}
          {previewMode && (
            <div className="absolute inset-0 bg-[#0F1117] z-[100] overflow-y-auto p-12 anim-fade">
               <div className="max-w-4xl mx-auto space-y-12">
                 <button onClick={() => setPreviewMode(false)} className="fixed top-6 right-12 z-[110] bg-white text-black px-6 py-2 rounded-full font-bold shadow-2xl hover:scale-105 transition-all">Close Preview</button>
                 <div className="space-y-4">
                   <div className="h-px w-20 bg-[#0D6E6E]" />
                   <h1 className="text-6xl font-extrabold text-white tracking-tight leading-[1.1]">{title || "Untitled Elite Report"}</h1>
                   <p className="text-2xl text-slate-500 font-serif leading-relaxed italic border-l-4 border-[#0D6E6E] pl-6 py-2">{excerpt || "Awaiting abstract draft..."}</p>
                 </div>
                 <div className="prose prose-invert prose-2xl max-w-none font-serif text-slate-300" dangerouslySetInnerHTML={{ __html: content }} />
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
