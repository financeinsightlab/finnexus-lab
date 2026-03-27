# Contentful Setup Guide – FinNexus Lab

This document walks you through configuring your Contentful space so that
`lib/contentful.ts` can fetch content for the Research and Insights sections
of FinNexus Lab.

---

## Prerequisites

- A [Contentful](https://www.contentful.com) account (free tier is sufficient to start)
- A Contentful **Space** created for this project

---

## 1 — Obtain API Keys

1. Open your Contentful space → **Settings → API keys**
2. Click **Add API key** (or use the default example key)
3. Note down:
   - **Space ID**
   - **Content Delivery API – access token**
   - **Content Preview API – access token** (needed for draft previews)

Add these to your `.env.local`:

```env
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_delivery_access_token_here
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_access_token_here
```

> **Never commit `.env.local` to version control.**

---

## 2 — Create Content Types

Go to **Content model** in your Contentful space and create the following two
content types exactly as described. Field IDs (the camelCase identifiers) must
match, because `lib/contentful.ts` references them by name.

---

### Content Type 1 — `researchReport`

**Name:** Research Report  
**API Identifier (content type ID):** `researchReport`

| Field Label   | Field ID      | Contentful Type          | Required | Notes                                          |
|---------------|---------------|--------------------------|----------|------------------------------------------------|
| Title         | `title`       | Short text               | ✅       | Used as the article heading                    |
| Slug          | `slug`        | Short text               | ✅       | URL-safe identifier, e.g. `ai-in-fintech-2025` |
| Date          | `date`        | Date & time              | ✅       | Publication date; used for ordering            |
| Sector        | `sector`      | Short text               | ✅       | e.g. `FinTech`, `Banking`, `Crypto`            |
| Tags          | `tags`        | Short text, list         | —        | Enable "List" in field settings                |
| Summary       | `summary`     | Long text                | ✅       | Short abstract shown on listing pages          |
| Page Count    | `pageCount`   | Number (Integer)         | —        | Total pages in the PDF report                  |
| Author        | `author`      | Short text               | ✅       | e.g. `FinNexus Lab Research Team`             |
| Featured      | `featured`    | Boolean                  | —        | Set to `true` to pin on landing pages          |
| Cover Image   | `coverImage`  | Short text               | —        | URL to a cover/hero image (optional)           |
| Content       | `content`     | Rich text                | —        | Full body of the report                        |

**Slug validation:** In field settings for `slug`, add a **Unique** validation
and a **Pattern** validation: `^[a-z0-9]+(?:-[a-z0-9]+)*$`

---

### Content Type 2 — `insightArticle`

**Name:** Insight Article  
**API Identifier (content type ID):** `insightArticle`

| Field Label   | Field ID      | Contentful Type          | Required | Notes                                                |
|---------------|---------------|--------------------------|----------|------------------------------------------------------|
| Title         | `title`       | Short text               | ✅       |                                                      |
| Slug          | `slug`        | Short text               | ✅       | URL-safe identifier, e.g. `fed-rate-outlook-q4`      |
| Date          | `date`        | Date & time              | ✅       | Publication date; used for ordering                  |
| Category      | `category`    | Short text               | ✅       | e.g. `Market Update`, `Deep Dive`, `Interview`       |
| Reading Time  | `readingTime` | Number (Integer)         | —        | Estimated minutes to read                            |
| Thesis        | `thesis`      | Long text                | ✅       | One-paragraph thesis / key takeaway                  |
| Author        | `author`      | Short text               | ✅       |                                                      |
| Featured      | `featured`    | Boolean                  | —        | Pins the article on the Insights landing page        |
| Content       | `content`     | Rich text                | —        | Full article body                                    |

---

## 3 — Publish Sample Content

1. Go to **Content → Add entry → Research Report**
2. Fill in all required fields
3. Click **Publish** (not just Save – entries must be published to appear via
   the Delivery API)
4. Repeat for **Insight Article**

---

## 4 — Switch Pages to Use Contentful

In any page file that currently imports from `@/lib/content`, replace:

```ts
// Before (MDX files)
import { getAllResearch, getResearchBySlug } from '@/lib/content';
```

```ts
// After (Contentful CMS)
import { getAllResearchFromCMS, getResearchBySlugFromCMS } from '@/lib/contentful';
```

| Old function                  | New function                          |
|-------------------------------|---------------------------------------|
| `getAllResearch()`            | `getAllResearchFromCMS()`             |
| `getResearchBySlug(slug)`    | `getResearchBySlugFromCMS(slug)`     |
| `getAllInsights()`            | `getAllInsightsFromCMS()`            |
| `getInsightBySlug(slug)`     | `getInsightBySlugFromCMS(slug)`      |

All functions accept an optional `preview: boolean` parameter. Pass `true` in
draft-preview routes to use the Content Preview API.

---

## 5 — Rendering Rich Text in Pages

`lib/contentful.ts` exports the raw Contentful Rich Text document in the
`content` field. For full Rich Text rendering in a page component:

```tsx
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// Inside your page component:
const post = await getResearchBySlugFromCMS(params.slug);

// Render the Rich Text body:
<article>{post?.content && documentToReactComponents(post.content)}</article>
```

You can customise rendering with the `options` second argument of
`documentToReactComponents` – see the
[official docs](https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer).

---

## 6 — Webhooks (optional, for ISR cache invalidation)

If you use Next.js Incremental Static Regeneration (ISR):

1. Go to **Settings → Webhooks → Add Webhook**
2. URL: `https://your-domain.com/api/revalidate`
3. Trigger on: **Publish** and **Unpublish** for both content types
4. Implement a `/api/revalidate` route in your Next.js app that calls
   `revalidatePath('/research')`, `revalidatePath('/insights')`, etc.

---

## Troubleshooting

| Symptom | Likely Cause |
|---------|--------------|
| Empty results from API | Entries exist but are not **published** |
| `Unknown field` error | Field ID in Contentful doesn't match the name in `lib/contentful.ts` |
| Preview content not showing | `CONTENTFUL_PREVIEW_ACCESS_TOKEN` is wrong or empty |
| TypeScript errors on `content` field | Update the field type mapping in `lib/contentful.ts` |
