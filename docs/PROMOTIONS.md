# Promotions / affiliate delivery engine

The promotion system decides **which partner promotion renders in which named
slot on which page**. It is CMS‑driven (admin panel → Postgres via Prisma),
evaluated on the server, cached per deployment, and safe for ISR / serverless.

```
lib/promotions/
  catalog.ts     pure vocabulary: page types, slots, rotation/device/theme modes, legacy maps
  targeting.ts   pure logic: normalizePath, resolvePageContext, evaluatePromotion, selectPromotions
  href.ts        tracking URL builder (UTM merge without double-appending)
  display.ts     client-safe helpers: creative pick, device/theme CSS classes, frequency cap
  engine.ts      server: cached active-promotion loader + getEligiblePromotions()/getPromotionsForSlot()
  page-registry.ts  list of every public page (used by the admin page selector & preview)
  admin.ts       zod schemas, savePromotion(), listAdminPromotions(), buildPromotionReport()
components/promotions/
  PromotionSlot.tsx         <PromotionSlot slot="CONTENT_BOTTOM" path="/research/x" tags={[...]} />
  PromotionSidebar.tsx      SIDEBAR_PRIMARY widget (research / insight detail pages)
  PromotionRailLayout.tsx   COURSE_SIDEBAR rail (course, lecture, lesson, study pages)
  PromotionCard.tsx         the creative (impression beacon, frequency cap, light/dark creative)
  PromotionLink.tsx         rel="sponsored nofollow noopener noreferrer" outbound link
  FloatingRightPromotion.tsx  SIDEBAR floating card (client, uses /api/promotions/active)
  beacon.ts                 impression/click beacon (sendBeacon → /api/promotions/event)
```

## Data model (additive migration `20261003090000_promotion_targeting`)

| Table | Purpose |
| --- | --- |
| `Promotion` | existing table. New nullable/defaulted columns: `tabletVisible`, `themeMode` (`BOTH\|LIGHT\|DARK`), `rotationMode` (`PRIORITY\|ROTATE\|WEIGHTED\|RANDOM`), `frequencyCap` (null = unlimited). Legacy columns `placement`, `targetPages`, `targetContentTypes` are kept and refreshed as human‑readable summaries. |
| `PromotionTarget` | many‑to‑many targeting rules: `mode` `INCLUDE\|EXCLUDE`, `targetType` `GLOBAL\|PATH\|PAGE_TYPE\|CONTENT\|TAG`, `targetValue`, `includeDescendants`. |
| `PromotionPlacement` | one row per slot the promotion may render in (`slot`, `weight` 1–10). |
| `PromotionEvent` | existing analytics table + `slot`, `device`, `pageType`. |

The migration backfills `PromotionTarget` / `PromotionPlacement` for every
existing promotion using exactly the same derivation as
`legacyTargetsFromPromotion()` / `legacyPlacementsFromPromotion()` in
`catalog.ts`, so old records keep working (`derivedFromLegacy` is shown in the
admin UI until they are re‑saved). Apply with `prisma migrate deploy`
(production) — never `migrate reset` / `db push --force-reset`.

## Page context

`resolvePageContext(pathname)` → `{ pathname, pageType, isHub, contentKey, tags }`.

* `normalizePath()` adds the leading slash, strips query/hash, decodes, removes
  the trailing slash, collapses duplicate slashes and lower‑cases the path.
* `/research` is a **hub** (`isHub: true`); `/research/ai-search` is a detail
  page with `contentKey = RESEARCH:ai-search`.
* Blocked page types (never receive promotions): `ADMIN`, `AUTH` (`/auth`,
  `/api`), `ACCOUNT`, `CHECKOUT`. `DASHBOARD`, `STATUS`, `DATA_FRESHNESS` and
  `LEGAL` are `globalEligible: false` — GLOBAL rules skip them; only an explicit
  page‑type / path rule reaches them.

## Slots

Frontend components request a named slot; the catalogue (`SLOT_META`) says
which page types render it, whether it is detail‑only and how many promotions
it holds (`maxPerPage`). `slotRendersOn()` gates evaluation, so a promotion
assigned to `COURSE_SIDEBAR` can never appear on a research page.

| Slot | Where it is rendered |
| --- | --- |
| `HOME_HERO`, `HOME_SECTION` | homepage |
| `CONTENT_TOP`, `CONTENT_BOTTOM` | every content hub + detail page (`CONTENT_BOTTOM` also on `/pricing`, `/radar`) |
| `CONTENT_MIDDLE` | research / insight / case‑study / data‑lab / course / study **detail** pages |
| `SIDEBAR_PRIMARY` | research + insight detail sidebar (max 2) |
| `COURSE_SIDEBAR` | PGDM course, lecture, lesson, cheatsheet and study‑course rail |
| `CALCULATOR_RESULT` | under the calculator on `/tools/[slug]` |
| `TOOL_SECTION` | `/tools` hub between header and grid |
| `FINANCE_TERM_RELATED` | related resources of a finance term |
| `CTA_SECTION` | homepage, pricing, services CTA areas |
| `DASHBOARD` | signed‑in dashboard (explicit targeting only) |
| `FOOTER` | above the global footer on content pages, home, pricing, services, about, contact |
| `SIDEBAR` | floating dismissible card (client side, `/api/promotions/active`) |

Empty slots return `null`, so layouts collapse cleanly.

## Targeting precedence (`evaluatePromotion`)

1. page blocked → ineligible
2. `active = false` → ineligible
3. schedule (`startsAt` / `endsAt`, server time) → ineligible
4. slot not assigned, or slot not rendered on this page type → ineligible
5. **any EXCLUDE rule matches → ineligible** (exclusion always wins)
6. best INCLUDE tier: `1` exact `PATH` · `2` `CONTENT` key · `3` `PATH` with
   descendants · `4` `PAGE_TYPE` / `TAG` · `5` `GLOBAL` (and `/` + descendants)
7. device (`mobileVisible` / `tabletVisible` / `desktopVisible`) and theme

Ordering of eligible candidates: tier ↑ → priority ↓ → rotation → `createdAt`
→ `id`. Rotation (`ROTATE`, `WEIGHTED`, `RANDOM`) is **deterministic**: the seed
is `floor(now / 5 min)` hashed with `pathname|slot`, so cached/ISR HTML and
serverless instances agree and nothing lives in process memory.

GLOBAL is never implied — an admin must select "Global" explicitly, and the
editor refuses to save a promotion without at least one INCLUDE rule and one
placement.

## Delivery & caching

* `getActivePromotions()` = `unstable_cache(fetchActivePromotions, …, { revalidate: 120, tags: ['public-promotions'] })`
  wrapped in React `cache()` → **one DB query per deployment per 2 minutes**,
  deduplicated per request. Every slot on a page reuses it (no N+1, no API
  storms). Admin writes call `revalidateTag('public-promotions', { expire: 0 })`
  plus `revalidatePath` on the key hubs; scheduled start/stop takes effect
  within the 2‑minute window.
* Device and theme targeting is applied with static CSS wrappers
  (`data-promotion-device-wrapper`, `data-promotion-theme-wrapper`), so the same
  cached HTML is correct for every visitor — no UA sniffing, no per‑user cache.
* Frequency caps use a first‑party `localStorage` counter (24 h window). No
  cookies, no fingerprinting.
* `/api/promotions/active?path=…` (SIDEBAR) is served with
  `Cache-Control: public, max-age=0, s-maxage=120, stale-while-revalidate=600`.
* Impressions are sent once per card when ≥ 20 % visible (IntersectionObserver)
  via `navigator.sendBeacon` to `/api/promotions/event`; clicks on the CTA send
  `CLICK`. Admin previews never send events.
* Tracking URLs: `getPromotionHref()` prefers `trackingUrl` → `affiliateUrl` →
  `destinationUrl` and only appends UTM keys that are **missing**.

## Admin (`/admin/product-content?tab=promotions`)

Campaign table (brand, status, targets, placements, priority, schedule,
impressions/clicks/CTR), editor with grouped searchable page‑target selector
(search, select‑all‑matching, clear, counts), placement selector, targeting
preview ("will appear on / will NOT appear on"), live targeting debugger
(URL + slot → eligible/ineligible with reasons), creative preview
(light/dark × desktop/mobile × placement, no impressions), bulk
activate/deactivate/duplicate/assign, analytics by promotion, campaign, page,
slot, device, page type and day. Conversions show **Not configured**.

APIs (all `ADMIN_ROLES` via `authorizeApi`, zod‑validated):
`GET/POST/DELETE /api/admin/content/promotions`, `/pages`, `/preview`,
`/debug`, `/bulk`, `/report`, `/crawl`.

## SEO / compliance

Outbound promotion links are `rel="sponsored nofollow noopener noreferrer"` with
a visible disclosure label. No `noindex` is added, no sitemap changes, no new
landing pages; promotions never render on admin, auth, account or checkout
routes.

## Testing

`npx vitest run` covers normalisation, page context, tier precedence,
exclusions, descendants, multi‑promotion slots, priority, schedule, active flag,
device/theme, deterministic rotation, frequency caps, href building and the
legacy adapter (`lib/promotions/targeting.test.ts`, `lib/crawl-promotion-url.test.ts`).
