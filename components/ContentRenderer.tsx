"use client"

import React from "react"

interface ContentRendererProps {
  content: string
}

const ContentRenderer = ({ content }: ContentRendererProps) => {
  return (
    <div 
      className="prose prose-invert max-w-none 
                 prose-h1:text-3xl prose-h1:font-extrabold prose-h1:text-white 
                 prose-h2:text-2xl prose-h2:font-bold prose-h2:text-white prose-h2:mt-12 
                 prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-lg
                 prose-a:text-teal-400 prose-a:font-semibold hover:prose-a:text-teal-300
                 prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:italic
                 prose-li:text-slate-300 prose-img:rounded-2xl prose-img:shadow-2xl"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default ContentRenderer
