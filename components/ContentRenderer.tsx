"use client"

import React, { useMemo } from "react"
import { renderBlocks } from "@/lib/blocks/renderer"
import { markdownToBlocks, type Block } from "@/lib/blocks/registry"
import { wrapUncontainedTables } from "@/lib/scrollable-html"

interface ContentRendererProps {
  /** Raw CMS content: HTML, Markdown, or empty when `blocks` is used. */
  content: string
  /** "BLOCKS" | "MARKDOWN" — anything else with HTML content is passed through. */
  contentType?: string
  blocks?: unknown
  className?: string
}

function toBlockArray(blocks: unknown): Block[] {
  if (Array.isArray(blocks)) return blocks as Block[]
  if (blocks && typeof blocks === 'object' && Array.isArray((blocks as { blocks?: unknown }).blocks)) {
    return (blocks as { blocks: Block[] }).blocks
  }
  return []
}

/**
 * Client-side CMS renderer (editor previews + client-rendered content).
 *
 * All layout, typography, table, image and callout presentation comes from the
 * global content system (`cms-content` + `prose-content` in app/globals.css) so
 * newly published CMS content always matches the public pages — no per-article
 * CSS, no width classes written by authors.
 */
const ContentRenderer = ({ content, contentType, blocks, className = "" }: ContentRendererProps) => {
  const html = useMemo(() => {
    const blockArray = toBlockArray(blocks)

    try {
      if (contentType === "BLOCKS" && blockArray.length > 0) {
        return renderBlocks(blockArray)
      }
      // Markdown-authored content goes through the same block pipeline as the
      // public pages (previously it was injected raw and rendered as plain text).
      if (contentType === "MARKDOWN" && content) {
        return renderBlocks(markdownToBlocks(content))
      }
      if (blockArray.length > 0) {
        return renderBlocks(blockArray)
      }
      return content || ""
    } catch (error) {
      console.error("Failed to render CMS content", error)
      return content || ""
    }
  }, [content, contentType, blocks])

  // Author-authored HTML (rich-text editor) can contain tables the block
  // renderer never saw — give those a keyboard-scrollable region too.
  // Tables already inside a `.horizontal-scroll-region` are left alone.
  const safeHtml = useMemo(() => wrapUncontainedTables(html), [html])

  return (
    <div
      className={`cms-content prose-content article-body ${className}`.trim()}
      // Server-rendered / author-authored HTML from the CMS block engine.
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  )
}

export default ContentRenderer
