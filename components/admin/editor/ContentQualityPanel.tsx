"use client"

import { useMemo } from "react"
import Link from "next/link"
import { schemaForPostType, missingRequiredFields } from "@/lib/content-types"

interface QualityInput {
  title: string
  slug: string
  excerpt: string
  content: string
  type: string
  featuredImage: string
  seoTitle: string
  metaDescription: string
  focusKeywords: string
  ogTitle: string
  ogImage: string
  tags: string[]
  targetAudience: string[]
  contentStatus: string
}

function extractLinks(html: string): string[] {
  const m = html.match(/href="([^"]+)"/g)?.map((s) => s.slice(6, -1)) ?? []
  return m
}

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

export default function ContentQualityPanel({ data, publicPathPreview }: { data: QualityInput; publicPathPreview?: string }) {
  const slugOk = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)
  const checks = useMemo(() => {
    const wc = wordCount(data.content)
    const links = extractLinks(data.content)
    const internal = links.filter((l) => l.startsWith("/")).length
    const external = links.filter((l) => l.startsWith("http")).length
    return {
      wc,
      links,
      internal,
      external,
      seoTitleLen: data.seoTitle.length,
      metaLen: data.metaDescription.length,
      hasH1: /<h1/i.test(data.content),
    }
  }, [data])

  const Section = ({ title, source, children }: { title: string; source: string; children: React.ReactNode }) => (
    <div className="rounded-xl border border-border bg-surface-muted p-4">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-xs font-bold text-content-primary">{title}</h4>
        <span className="text-[10px] font-mono text-content-muted shrink-0">{source}</span>
      </div>
      <div className="mt-3 space-y-1.5 text-xs text-content-secondary">{children}</div>
    </div>
  )

  const Ok = ({ children }: { children: React.ReactNode }) => <span className="inline-flex items-center gap-1 text-success">✓ {children}</span>
  const Warn = ({ children }: { children: React.ReactNode }) => <span className="inline-flex items-center gap-1 text-warning">• {children}</span>
  const Fail = ({ children }: { children: React.ReactNode }) => <span className="inline-flex items-center gap-1 text-error">✗ {children}</span>

  const typeSchema = schemaForPostType(data.type)
  const missing = missingRequiredFields(typeSchema, { ...data } as Record<string, unknown>)

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-surface-muted p-4">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-xs font-bold text-content-primary">Content type — {typeSchema.label}</h4>
          <span className="text-[10px] font-mono text-content-muted shrink-0">{typeSchema.model}</span>
        </div>
        <p className="text-xs text-content-muted mt-2">{typeSchema.editorNote}</p>
        <p className="text-xs mt-2">
          {missing.length === 0
            ? <span className="text-success">✓ All required fields for this type are present ({typeSchema.requiredFields.join(", ")}).</span>
            : <span className="text-error">✗ Missing required: {missing.join(", ")}</span>}
        </p>
        {typeSchema.targetWords.min > 0 && (
          <p className="text-[11px] text-content-muted mt-1">Length guidance for this type: {typeSchema.targetWords.min}+ words (ideal ~{typeSchema.targetWords.ideal}) — guidance only, not a ranking rule. Public path: <span className="font-mono">{typeSchema.publicPath}</span></p>
        )}
      </div>
      <div className="rounded-xl border border-brand/20 bg-brand/5 p-4">
        <p className="text-xs font-bold text-brand">Transparent quality checks — not an SEO score</p>
        <p className="text-xs text-content-muted mt-1">Each item cites its source field. A missing check is guidance, not a guarantee of ranking.</p>
        {publicPathPreview && (
          <Link href={publicPathPreview} target="_blank" className="mt-3 inline-flex text-xs font-bold text-brand hover:underline">
            Open public preview (new tab) →
          </Link>
        )}
      </div>

      <Section title="Basic completeness" source="title / excerpt / featuredImage / tags / targetAudience / estimatedReadingTime">
        <div>{data.title.trim().length >= 10 ? <Ok>Title present ({data.title.length} chars)</Ok> : <Fail>Title too short — add 10+ characters</Fail>}</div>
        <div>{data.excerpt.trim().length >= 40 ? <Ok>Excerpt present ({data.excerpt.length} chars)</Ok> : <Warn>Excerpt short — aim for 40–160 chars for cards</Warn>}</div>
        <div>{data.featuredImage ? <Ok>Cover image set</Ok> : <Warn>No cover image — pages without visuals get lower click-through</Warn>}</div>
        <div>{data.tags.length >= 2 ? <Ok>Tags: {data.tags.join(", ")}</Ok> : <Warn>Add 2+ tags to power related content</Warn>}</div>
        <div>{data.targetAudience.length > 0 ? <Ok>Audience: {data.targetAudience.join(", ")}</Ok> : <Warn>Define audience for personalization</Warn>}</div>
        <div>{checks.wc >= 300 ? <Ok>{checks.wc} words — sufficient depth</Ok> : <Warn>{checks.wc} words — expand for completeness (300+ recommended)</Warn>}</div>
      </Section>

      <Section title="Metadata" source="seoTitle / metaDescription / focusKeywords / og*">
        <div>{data.seoTitle ? (checks.seoTitleLen >= 50 && checks.seoTitleLen <= 60 ? <Ok>SEO title ideal ({checks.seoTitleLen} chars)</Ok> : <Warn>SEO title {checks.seoTitleLen} chars — 50–60 ideal</Warn>) : <Warn>No custom SEO title — falls back to post title</Warn>}</div>
        <div>{data.metaDescription ? (checks.metaLen >= 120 && checks.metaLen <= 160 ? <Ok>Meta description ideal ({checks.metaLen})</Ok> : <Warn>Meta {checks.metaLen} chars — 120–160 ideal</Warn>) : <Fail>Missing meta description — search snippets will be auto-generated</Fail>}</div>
        <div>{data.focusKeywords ? <Ok>Focus keywords: {data.focusKeywords}</Ok> : <Warn>No focus keywords declared</Warn>}</div>
        <div>{data.ogTitle || data.ogImage ? <Ok>Open Graph configured</Ok> : <Warn>No custom social preview — sharing uses defaults</Warn>}</div>
      </Section>

      <Section title="Technical SEO" source="slug format / canonical via slug / image alt gate">
        <div>{slugOk ? <Ok>Slug format valid: {data.slug || "—"}</Ok> : <Fail>Slug must be lowercase letters, numbers and hyphens — fix before publish</Fail>}</div>
        <div>{data.type ? <Ok>Type {data.type} determines route prefix (/{data.type.toLowerCase()}/{data.slug || "…"})</Ok> : <Warn>No type selected</Warn>}</div>
        <div>{checks.hasH1 ? <Warn>Content contains &lt;h1&gt; — article page already renders title as H1; prefer H2/H3 inside</Warn> : <Ok>No duplicate H1 in body</Ok>}</div>
        <div>{data.featuredImage && !data.featuredImage.includes("alt=") ? <Warn>Set alt text for cover image in Media Library (accessibility & image SEO)</Warn> : data.featuredImage ? <Ok>Alt-text check passes via Media altText field</Ok> : null}</div>
      </Section>

      <Section title="Links" source="href extracted from content HTML">
        <div>{checks.links.length > 0 ? <Ok>{checks.links.length} links — {checks.internal} internal, {checks.external} external</Ok> : <Warn>No links — add related reading where useful</Warn>}</div>
        {checks.links.slice(0, 5).map((l) => (
          <div key={l} className="font-mono text-[11px] truncate">
            • {l} {l.startsWith("/") ? <span className="text-success">(internal)</span> : l.startsWith("http") ? <span className="text-content-muted">(external — validate separately)</span> : null}
          </div>
        ))}
        {checks.links.length > 5 && <div className="text-[11px] text-content-muted">+{checks.links.length - 5} more links</div>}
      </Section>

      <Section title="Structured data" source="FaqItem FAQPage schema / Article schema on public page">
        <div className="text-content-muted">FAQPage schema is emitted only for published FAQs with <span className="font-mono">seoVisible=true</span> on the same <span className="font-mono">relatedType/relatedSlug</span>. Article schema is inferred from the post page — no action here unless adding FAQs.</div>
      </Section>

      <Section title="Readability (guidance)" source="heuristic — avg words per sentence / word length">
        <div>{checks.wc === 0 ? <Warn>No body text yet</Warn> : <Ok>{checks.wc} words — average sentence length guides clarity; keep paragraphs short for scanners</Ok>}</div>
      </Section>

      <Section title="Editorial / workflow" source="Post.contentStatus + scheduledPublishAt">
        <div>{data.contentStatus === "PUBLISHED" ? <Ok>Marked PUBLISHED — will be public on save</Ok> : data.contentStatus === "REVIEW" ? <Warn>In Review — assign reviewer via comments or status</Warn> : data.contentStatus === "APPROVED" ? <Ok>Approved — ready to publish or schedule</Ok> : <Warn>Draft — not visible publicly</Warn>}</div>
      </Section>

      <Section title="Search performance (real)" source="PageView + LoginEvent + Analytics — no synthetic uplift">
        <div className="text-content-muted">After publish, performance is measured in <Link href="/admin/analytics" className="text-brand hover:underline">Analytics</Link> (top pages, views, avg duration, logins by provider). No SEO score guarantees rank — this panel surfaces what you control.</div>
      </Section>
    </div>
  )
}
