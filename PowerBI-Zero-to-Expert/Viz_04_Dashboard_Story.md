# DV4 · Dashboards & Stories: Hierarchy, Interaction & the Narrative Arc

> *Charts answer questions; dashboards answer "how are we?" on sight; stories answer "so what do we do?" Most dashboards die of neglect because they were built as chart-storages, not decision-machines. This module fixes the machine.*

## 🎯 Objectives
Purpose classification (strategic/analytical/operational) · visual hierarchy & scanning patterns · the KPI→trend→breakdown→detail spine · interaction design that respects humans · the data-story arc (context→conflict→resolution) · audience calibration · the anti-pattern museum.

---

## 📘 4.1 Purpose before pixels — the 3 dashboard species

| Species | Audience / cadence | Design consequences |
|---|---|---|
| **Strategic** (scoreboard) | Exec/board, monthly-quarterly | Few KPIs vs targets, trends, 10-second read; no filters vs VERY few; divergence colors; big numbers beat dense grids |
| **Analytical** (workbench) | Analysts, daily/weekly | Dense, filter-rich, drill-able; linked views; anomalies surfaced; accuracy & uncertainty honored over glitter |
| **Operational** (cockpit) | Ops teams, real-time/daily | Alerts-first (exceptions queue), red-zone emphasis, fresh-refresh stamps, actions one click away |

The same "ShopKart dashboard" fails all three if unclassified: dense for execs = unread; unfilterable for analysts = toy; un-alarming for ops = wallpaper. Write at the top of every build doc: **audience, decision, frequency**.

## 📘 4.2 Hierarchy & scanning — where eyes actually go

- **F-pattern** (text-heavy pages) and **Z-pattern** (dashboards): eyes start top-left → scan right → return → descend. Hence: top-left = the ONE number that matters most (North Star KPI), top row = KPI strip, left column = filter rail or primary dimension nav.
- Size, color, position = attention currency. ONE hero (largest) per screen: the trend or map the meeting watches. Supporting views smaller, grid-aligned, LOTS of whitespace between groups (Gestalt proximity).
- The 12-column mental grid: align every card to shared columns; equal gutters; NOTHING touches frame edges (padding law); ragged layouts read as "junior" instantly, even to viewers who can't name why.

## 📘 4.3 The spine: KPI → trend → breakdown → detail

The universal finance page anatomy (your T5 & M6 builds confirm):

```
┌─ Title: insight sentence · subtitle: scope/refresh ─┐
│ KPI row: Revenue | Orders | AOV | Margin  (vs plan) │
├──────────────┬──────────────────────────────────────┤
│ Hero trend   │ Ranked breakdown (Region / Category) │
├──────────────┴──────────────────────────────────────┤
│ Context strip: heatmap (Region×Month) | bullet row  │
└─ Filter rail (left) · footnotes/method (bottom) ────┘
```

- KPI cards carry **value + Δ vs target/period + tiny sparkline** (number alone = naked; context alone = useless).
- Breakdowns answer the trend's "WHO did it"; context strip passes anomaly duty (heatmap does seasonal exceptions heroically, DV2).
- Detail tables exist BEHIND interaction (progressive disclosure) — never as permanent co-inhabitants of 100 widgets.

## 📘 4.4 Interaction design — respect the click

Every interactive element must answer: **what does it affect?** Rules:
- Scope: declare filter reach (page/selection/these-visuals) — hidden cross-filter surprises are the #1 credibility killer (clicking West shouldn't silently change the totals row you just quoted).
- Defaults matter: the page must tell a COMPLETE story before ANY click (filters enhance, never rescue emptiness).
- ≤8 controls per page; grouped logically ("Time" together); apply buttons for heavy queries; visible "active filters" chips count notices.
- Drill paths designed & labeled ("Region → City"); breadcrumbs on deep levels; one obvious RESET.
- Linked HIGHLIGHT > auto FILTER when context is the point; hover-tooltips carry the small print; mobile: stack vertically, ≥44px tap targets, kill hover-dependency.

## 📘 4.5 The narrative arc — meetings aren't demos

**Context → Complication → Resolution** (Duarte + every good case interview):

1. **Context** (agreement first): "FY25 target ₹2.5Cr; we track monthly."
2. **Complication** (the tension): "Q2 missed −8%, all of it in North Electronics." (This is where your waterfall + heatmap earn their ink.)
3. **Resolution** (the proposal): "Fix: regional promo calendar + inventory… projected recovery 6 weeks — here's the expected band." (St5 forecast interval, DV5 fan chart!)

Rules of the arc: ONE story per deck/section; charts appear in arc order (not build order); every visual gets a so-what sentence; end on decisions, not "any questions?" sprawl. Numbers → tension → proposal. The dashboard is your evidence locker; the STORY is the meeting.

## 📘 4.6 Audience calibration — same data, three voices

- **Executive**: 3 numbers, one message, 2 minutes; precise + conservative (intervals), zero jargon; they ask "are we okay?"
- **Manager**: drivers + exceptions + actions; week-level grain; "what moved and who fixes it?"
- **Analyst**: everything, drill-down, exportable; "let me verify and subdivide."
Literacy check: show ONE chart type to your actual user before deploying the fancy variant (boxplots to a sales VP? test first; slope to bar+whiskers if it fails).

## 📘 4.7 The anti-pattern museum 🏛️

Tours exhibit: 18-chart "wall of everything"; corporate rainbow template with brand-liveried axes; mystery filter panels; auto-scrolling dashboards hiding the failing KPI; vanity metrics (impressions!) with no target; pie charts at quarter grain; decimal-drowned tables beside 3-D donuts; the "monthly manual rebuild" process. Each has a cure — you've now got all of them.

---

## 🧪 LAB DV4 — Structure & story surgery (65 min)

1. Classify 3 dashboards you know (work/school/online gallery) into the 3 species — one design consequence each that betrays the species.
2. Wireframe the ShopKart BOARD pack (one page + appendix list): apply §4.3 spine exactly; justify KPI choice & order with audience-decision logic (write it in the doc header!).
3. Redesign the interaction contract for that pack: 6 controls max, declared scopes, default state, reset placement, active-filter notice, drill path labels.
4. Take your worst old dashboard; run the museum audit (every anti-pattern found listed + cure), then A/B sketch: old vs your fixed version (paper is fine).
5. Build the 3-act STORY version of FY25 performance: pick exactly one chart per act (context/complication/resolution), write the one-line narration under each; rehearse aloud in 90 seconds.
6. Literacy test: ask one non-analyst friend/family to read your boxplot from DV2 lab — note the friction; produce the friendlier twin and journal what was lost/gained (honesty box: analysts ALWAYS pay a clarity/depth trade).

## 💪 Exercises
1. Why MUST the default (no-click) state tell a complete story? (think: who sees screenshots/forwards?)
2. North Star KPI can change quarterly — argue for AND against pinning it forever.
3. "Apply" buttons on filter rails: when essential vs when annoying?
4. A linked-highlight scope declaration: phrase it in the 8 words a user can read.
5. Story arc with no complication = ? Name the failure mode (it's in the museum).

### ✅ Selected answers
- Ex 1: dashboards travel as screenshots into decks/WhatsApps — an empty "select filters!" canvas becomes your permanent public face; defaults are the packaging, filters refill the shelf.
- Ex 5: the wall-of-everything / chronology-without-tension — data dumps impress no one; facts without conflict aren't a STORY, they're a spreadsheet.

## ❓ Quiz
1. Match species → dominant design driver: strategic / analytical / operational?
2. Where does the North Star KPI sit geometrically and why?
3. The three acts of the data story arc?
4. One rule for filters' scope / defaults / count each?

### ✅ Answers
1. Strategic→instant signal (few, big, vs-target); Analytical→exploration density+linked views; Operational→exception alerts + freshness.
2. Top-left — Z-pattern's first fixation; attention is spent before it's earned.
3. Context → Complication → Resolution (evidence-backed; charts in arc order, ending on decisions).
4. Scope declared explicitly; default state complete and narrative; ≤8 grouped controls with a visible reset and active-filter notice.

## ✅ Mastery checklist
- [ ] Purpose doc (audience×decision×cadence) precedes every build
- [ ] Spine layout + hierarchy applied to a real pack
- [ ] Interaction contract written & respected
- [ ] 3-act story rehearsed out loud 🎤

**Next: DV5 — truth, lies & advanced patterns: manipulation museum, uncertainty viz, and the expert's ethics. 🕵️**
