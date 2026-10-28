# Design System — Kunwar Analytics (as-built reference)

This documents the system that already exists in `app/globals.css` + Tailwind
theme tokens, so new surfaces (dashboard, nav, search) stay consistent without
inventing parallel styling. **Rule: never hard-code a hex colour in a component;
use the tokens below so light/dark both work.** (Known exceptions: a few
hard-coded "cinema" hero sections, e.g. PGDM/tracker — don't copy that pattern.)

## Typography

| Role | Token / class | Use |
|---|---|---|
| UI / body | `--font-inter` (Inter) | Everything interactive: nav, dashboard, forms, tables |
| Editorial | `--font-serif` (Source Serif 4) via `.section-label` etc. | Long-form research/insight prose only |
| Data / code | `--font-mono` (IBM Plex Mono) | Numbers in tables, kbd hints, metric values |

Scale in product UI: `text-xs` meta/labels (uppercase, `tracking-widest` for
section eyebrow labels), `text-sm` body, `text-[15px]` card titles,
`text-lg` page H1 in workspace surfaces, larger only on marketing heroes.

## Colour tokens (HSL channels, `app/globals.css` `:root` / `.dark`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--brand` / `--primary` | 180 79% 24% | 180 74% 49% / 39% | Primary actions, active states, links (`text-brand`, `bg-primary`) |
| `--brand-muted` | 180 38% 93% | 180 40% 19% | Active-nav pill bg, chips (`.tag-teal`) |
| `--background` | 42 36% 98% | 220 34% 10% | Page bg |
| `--surface` / `--surface-raised` / `--surface-muted` / `--surface-overlay` | white / white / 210 30% 96% / white | 13% / 16% / 18% / 14% | Cards → raised panels → muted wells → dialogs/menus |
| `--content-primary/secondary/muted/disabled` | 222 39% 11% → 215 12% 48% | inverted ramp | Text hierarchy (`text-content-*`) |
| `--border-subtle` / `--border` / `--border-strong` | 92% / 86% / 70% | — | Hairlines → card borders → emphasis |
| `--border-focus` | = brand | = brand | Focus rings; also `focus-visible:outline-teal-400` in dialogs |

Semantic status colours are used sparingly via Tailwind ramps with token
borders (emerald = active/free-positive, amber = gated/Pro) — always paired
with text, never colour alone.

## Layout & spacing

- Containers: `.wrap` (site max width) and `.content-page` (wide responsive
  container); workspace pages cap at `max-w-[1280px]` with `px-4 sm:px-6 lg:px-8`.
- Rhythm: 4px base; cards `rounded-2xl border border-border bg-surface`,
  inner padding `p-4`/`p-5`, section gaps `gap-4`/`gap-6`, page sections `mb-8`.
- Breakpoints: Tailwind defaults — nav collapses below `lg`, dashboard
  sidebar hidden below `md` (mobile uses the Navbar drawer), grids go
  1 → `sm:grid-cols-2` → `md:grid-cols-3` / `lg:grid-cols-12` (8+4 split).

## Components (canonical implementations)

| Pattern | Canonical source | Notes |
|---|---|---|
| Primary / secondary buttons | `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-ghost`, `.btn-destructive` (globals.css ~L763) | In Tailwind-heavy surfaces the equivalent is `bg-primary text-primary-foreground hover:bg-primary-hover rounded-xl` (primary) and `border border-border bg-surface hover:bg-accent` (secondary). Touch targets ≥ 40px. |
| Nav (desktop/mobile/sidebar/footer) | `lib/navigation.ts` → `Navbar`, `DashboardSidebar`, `Footer` | One data source. Active = `bg-brand-muted text-brand` + `aria-current="page"` (Navbar/Sidebar only). |
| Breadcrumbs | `components/ui/Breadcrumbs.tsx` | `nav > ol`, `aria-current` on last; pair with `breadcrumbSchema()` JSON-LD in same order. Dark hard-coded heroes keep inline crumbs with identical semantics. |
| Search dialog | `components/layout/GlobalSearch.tsx` | The single ⌘K surface. `bg-surface-overlay`, grouped results, ↑↓/↵/esc, quick actions from `QUICK_ACTIONS`. |
| Cards / sections | Dashboard pattern: header row (`px-5 py-4 border-b`, `text-sm font-bold`) + body | Eyebrow labels: `text-[10px] font-bold uppercase tracking-widest text-content-muted`. Chips: `rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase`. |
| Forms | `rounded-xl border border-border bg-surface-muted … focus:border-brand focus:ring-2 focus:ring-brand/20` | Visible label or `aria-label` always; errors in `text-error`. |
| Filters | Tools hub (`ToolsHubClient`) & StudyClient chip rows | Chips with counts, `aria-pressed`-style active state, always a reset. |
| Tables / data | Tracker + ledger pages | Mono numerals, subtle row dividers (`divide-border`), `text-xs` headers uppercase. Charts only where they encode real data (progress bars = `h-2 rounded-full bg-brand` on muted track). |
| Dialogs / drawers | `useModalAccessibility` + `viewport-dialog-panel` | Focus trap, initial focus, esc to close, restore focus, safe-area padding, `data-lenis-prevent` scroll regions (`.ui-scroll-region`). |

## States (required for every new surface)

- **Loading:** quiet text/skeleton in `text-content-muted` ("Searching…",
  `animate-pulse` ellipsis) — no spinners with brand animation.
- **Empty:** one sentence stating what would appear + the next real action
  (e.g. dashboard saved-articles empty state with Browse buttons).
- **Error / unavailable:** say so inline ("Badges are temporarily
  unavailable.", "Search is temporarily unavailable. Please try again.") —
  optional data must degrade, never 500 the page.
- **Gated:** `Pro` chip (amber) vs `Free` chip (emerald) + entitlement check
  via `lib/entitlements.ts` — never imply a gated feature is free.
- **Focus:** every interactive element needs a visible `focus-visible` style;
  keyboard order follows visual order; skip-link (`.skip-link`) is global.

## Motion

Restrained by policy: 150–300ms colour/opacity transitions, sidebar width
animation, dropdown `anim-fade`. No decorative 3D/gradient animation in
product surfaces (`.btn-3d` exists for legacy marketing CTAs — don't use it
in dashboards/tools). Respect `prefers-reduced-motion` (globals.css ~L493).
