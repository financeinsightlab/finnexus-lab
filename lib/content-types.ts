// lib/content-types.ts — reusable content-type schemas (PART F)
//
// Single source of truth for "what does this kind of content need?"
// It deliberately does NOT force every type into one DB table:
// - Research / Insight / Case Study / Media / Other live in `Post` (ArticleType)
// - Courses & study materials live in `StudyMaterial` (+ file-backed PGDM)
// - Landing pages live in `Page` (PageStatus)
// - Finance terms live in `FinanceTerm`; FAQs in `FaqItem` (relatedType context)
// - Product pages / tool documentation are code routes (/tools/*, /services,
//   /enterprise, /pricing) enriched by FaqItem + RelatedContent, not CMS posts.
//
// Editors and quality checks read `requiredFields` / `recommendedFields`
// from here so guidance stays consistent without schema churn. No DB change.

export type ContentTypeId =
  | "RESEARCH"
  | "INSIGHT"
  | "CASE_STUDY"
  | "PRODUCT_PAGE"
  | "TOOL_DOC"
  | "FINANCE_TERM"
  | "COURSE"
  | "LANDING_PAGE"

export interface ContentTypeSchema {
  id: ContentTypeId
  label: string
  /** Where the canonical record lives today. */
  model: string
  /** Public route pattern, or admin surface when there is no public slug route. */
  publicPath: string
  adminPath: string
  /** Fields that must be present before publish is sensible. */
  requiredFields: string[]
  /** Fields that materially improve discovery / trust when present. */
  recommendedFields: string[]
  /** How the shared editor maps onto this type. */
  editorNote: string
  /** Target body length guidance (words); not a ranking guarantee. */
  targetWords: { min: number; ideal: number }
}

export const CONTENT_TYPES: ContentTypeSchema[] = [
  {
    id: "RESEARCH",
    label: "Research report",
    model: "Post (type=RESEARCH)",
    publicPath: "/research/[slug]",
    adminPath: "/admin/cms/new",
    requiredFields: ["title", "slug", "excerpt", "content", "featuredImage", "tags", "metaDescription"],
    recommendedFields: ["seoTitle", "focusKeywords", "targetAudience", "estimatedReadingTime"],
    editorNote: "Full CMS editor (markdown or blocks) + SEO/social tabs. Freshness SLA 90d warn / 180d breach.",
    targetWords: { min: 800, ideal: 1800 },
  },
  {
    id: "INSIGHT",
    label: "Insight",
    model: "Post (type=INSIGHT)",
    publicPath: "/insights/[slug]",
    adminPath: "/admin/cms/new",
    requiredFields: ["title", "slug", "excerpt", "content", "tags", "metaDescription"],
    recommendedFields: ["featuredImage", "seoTitle", "targetAudience"],
    editorNote: "Same CMS editor as Research. Freshness SLA 30d warn / 60d breach — date-sensitive, review often.",
    targetWords: { min: 400, ideal: 900 },
  },
  {
    id: "CASE_STUDY",
    label: "Case study",
    model: "Post (type=CASE_STUDY)",
    publicPath: "/case-studies/[slug]",
    adminPath: "/admin/cms/new",
    requiredFields: ["title", "slug", "excerpt", "content", "featuredImage", "tags", "metaDescription"],
    recommendedFields: ["seoTitle", "focusKeywords", "targetAudience"],
    editorNote: "Same CMS editor. Use blocks (metrics/quote/table) for evidence. SLA 365d warn / 730d breach.",
    targetWords: { min: 600, ideal: 1400 },
  },
  {
    id: "PRODUCT_PAGE",
    label: "Product page",
    model: "Code route + FaqItem/RelatedContent (no Post row)",
    publicPath: "/services, /enterprise, /pricing, /tools/*",
    adminPath: "/admin/product-content",
    requiredFields: ["headline (in code)", "FAQ question+answer (FaqItem)", "related links (RelatedContent)"],
    recommendedFields: ["FAQ seoVisible (only when Q&A is visible on page)", "displayOrder"],
    editorNote: "Do not create a duplicate Post for a product page. Manage FAQs/related links in Product Content; copy lives in code.",
    targetWords: { min: 0, ideal: 0 },
  },
  {
    id: "TOOL_DOC",
    label: "Tool documentation",
    model: "Code route (/tools/*) + FaqItem(relatedType=TOOL) + FinanceTerm",
    publicPath: "/tools/[tool]",
    adminPath: "/admin/product-content",
    requiredFields: ["tool name (in code)", "FAQ question+answer", "worked example inputs (in code)"],
    recommendedFields: ["finance terms for jargon", "related content links"],
    editorNote: "Calculator logic stays in code. Docs = FAQs + glossary + related links via Product Content. No new CMS table.",
    targetWords: { min: 0, ideal: 0 },
  },
  {
    id: "FINANCE_TERM",
    label: "Finance term",
    model: "FinanceTerm",
    publicPath: "/finance-terms/[slug]",
    adminPath: "/admin/product-content",
    requiredFields: ["slug", "term", "simpleMeaning", "example", "interviewAnswer", "category"],
    recommendedFields: ["formula", "keywords", "synonyms", "relatedTermSlugs", "featured"],
    editorNote: "Structured glossary editor in Product Content (not the article editor). DefinedTerm schema only when published+seoVisible.",
    targetWords: { min: 40, ideal: 120 },
  },
  {
    id: "COURSE",
    label: "Course / study material",
    model: "StudyMaterial (+ CourseLesson/CourseAssessment) · PGDM file-backed curriculum",
    publicPath: "/study/[slug], /pgdm/*",
    adminPath: "/admin/study",
    requiredFields: ["title", "slug", "description", "content", "categoryId", "difficulty"],
    recommendedFields: ["coverImage", "duration", "learningOutcomes", "prerequisites", "tags", "featured"],
    editorNote: "Study admin (/admin/study) for DB materials; PGDM subjects remain file-backed and are selected, not duplicated, in Product Content.",
    targetWords: { min: 300, ideal: 1200 },
  },
  {
    id: "LANDING_PAGE",
    label: "Landing page",
    model: "Page (PageStatus DRAFT/REVIEW/PUBLISHED/ARCHIVED)",
    publicPath: "/[slug] (Page blocks, where routed)",
    adminPath: "/admin/settings (homepage) · Page model via blocks API",
    requiredFields: ["title", "slug", "content (blocks)", "status"],
    recommendedFields: ["seoTitle", "metaDescription", "featuredImage"],
    editorNote: "Homepage composition is managed in Settings (FeaturedContent/HomePageItem). Standalone Page blocks reuse the same block renderer; no separate landing-page builder added.",
    targetWords: { min: 150, ideal: 600 },
  },
]

const BY_ID = new Map(CONTENT_TYPES.map((t) => [t.id, t] as const))

export function getContentType(id: string | null | undefined): ContentTypeSchema | null {
  if (!id) return null
  return BY_ID.get(id.toUpperCase() as ContentTypeId) ?? null
}

/** Post ArticleType → content-type schema (MEDIA/OTHER fall back to Insight guidance). */
export function schemaForPostType(postType: string | null | undefined): ContentTypeSchema {
  const key = (postType || "RESEARCH").toUpperCase()
  if (key === "RESEARCH" || key === "INSIGHT" || key === "CASE_STUDY") {
    return BY_ID.get(key as ContentTypeId)!
  }
  // MEDIA / OTHER are still Posts; reuse Insight thresholds but keep honest label.
  return BY_ID.get("INSIGHT")!
}

/** Field-presence check used by the quality panel. Values: strings/arrays/numbers. */
export function missingRequiredFields(
  schema: ContentTypeSchema,
  values: Record<string, unknown>,
): string[] {
  return schema.requiredFields.filter((field) => {
    // Compound labels like "FAQ question+answer (FaqItem)" are documentation-only.
    if (field.includes("(") || field.includes("/") || field.includes(" ")) return false
    const v = values[field]
    if (Array.isArray(v)) return v.length === 0
    if (typeof v === "string") return v.trim().length === 0
    return v === null || v === undefined || v === ""
  })
}
