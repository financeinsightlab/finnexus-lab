import { describe, expect, it } from "vitest"
import { CONTENT_TYPES, getContentType, missingRequiredFields, schemaForPostType } from "./content-types"

describe("content-types schemas (PART F)", () => {
  it("covers all eight requested content types without forcing one model", () => {
    expect(CONTENT_TYPES.map((t) => t.id)).toEqual([
      "RESEARCH",
      "INSIGHT",
      "CASE_STUDY",
      "PRODUCT_PAGE",
      "TOOL_DOC",
      "FINANCE_TERM",
      "COURSE",
      "LANDING_PAGE",
    ])
    const models = new Set(CONTENT_TYPES.map((t) => t.model))
    expect(models.size).toBeGreaterThan(4)
  })

  it("maps Post types and falls back safely", () => {
    expect(schemaForPostType("RESEARCH").id).toBe("RESEARCH")
    expect(schemaForPostType("case_study").id).toBe("CASE_STUDY")
    expect(schemaForPostType("MEDIA").id).toBe("INSIGHT")
    expect(getContentType(null)).toBeNull()
  })

  it("flags only genuinely missing required fields", () => {
    const research = getContentType("RESEARCH")!
    expect(
      missingRequiredFields(research, {
        title: "T",
        slug: "t",
        excerpt: "e",
        content: "c",
        featuredImage: "",
        tags: [],
        metaDescription: "m",
      }),
    ).toEqual(["featuredImage", "tags"])
  })
})
