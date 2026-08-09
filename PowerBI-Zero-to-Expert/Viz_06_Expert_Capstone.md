# DV6 · Expert Practice & Capstone: Workflow, the Critique Rubric & 10 Golden Rules

> *Tools change yearly; process endures. This closing module installs the expert's production line — brief → sketch → prototype → critique → polish → QA — hands you the critique rubric pros use, distills the 10 golden rules, then puts you through the boss fight: the ShopKart board-pack capstone review.*

## 🎯 Objectives
The 6-step production workflow · the 10× rubric (score any viz 1–5 × 10 dimensions) · the golden rules poster · tool-choice matrix mastery (Excel/PBI/Tableau/Python) · governance & versioning discipline · capstone: critique + redesign + hero chart + defense memo.

---

## 📘 6.1 The production line — six stations

```
BRIEF → SKETCH → PROTOTYPE → CRITIQUE → POLISH → QA → (govern/version)
```

1. **Brief** (30 min that saves days): audience × decision × cadence (DV4); the 1–3 questions, the required messages (draft the insight-titles BEFORE touching data!), constraints (one page? phone? print?), deadline & owner.
2. **Sketch** (paper/whiteboard, 3 concepts in 10 min each): blocking layout first (boxes not charts), THEN chart choices per block; paper forgives — BI tools punish (every drag feels precious).
3. **Prototype** (fast, ugly, real data): wiring works? numbers correct? interactions scoped? Ugly is allowed — WRONG is not (recon numbers against Py6/S5 packs!). Demo prototype EARLY to the decision-maker: late feedback = rebuilds.
4. **Critique** (the rubric, §6.2): self-score + one peer score; EVERY 1–2 rating gets a concrete fix action; iterate once minimum.
5. **Polish**: design tokens (DV3), insight titles, annotations, alignment/grid, formats, footers, accessibility pass.
6. **QA battery** (DV5 §5.5): squint, 5-second, greyscale, projector, print, alt-text, refresh-stamp, scope-declaration, and — the finance extra — **tie-out**: every headline number reconciles to source totals (the checklist moment finance audiences live for).

## 📘 6.2 The critique rubric — score it before they roast it

Rate 1–5 each (evidence required; "feels nice" isn't evidence):

| # | Dimension | The 5/5 answer |
|---|---|---|
| 1 | Message clarity | One insight sentence survives a 5-second test |
| 2 | Encoding accuracy | Channels match the ladder's strength for the key message |
| 3 | Chart-type fit | Type matches task & data type (no line-over-categories) |
| 4 | Axis honesty | Zero floors for bars, crops/log declared, no dual-sync theater |
| 5 | Color discipline | Tokens respected, diverging midpoints meaningful, colorblind-safe & redundantly encoded |
| 6 | Typography & units | Insight titles, units elevated, consistent ₹ scale, decimals capped |
| 7 | Ink economy | Junk deleted, gridline-muted, direct labels, whitespace grouping |
| 8 | Uncertainty & context | Intervals/n/denominators present where estimates drive decisions |
| 9 | Interaction & scope | Defaults narrative-complete, scopes declared, reset obvious |
| 10 | Accessibility | Contrast AA, alt-text, grayscale/print survival, tap targets |

Ship threshold: total ≥42/50, no single dimension <3. Postmortem ritual per shipped piece: one line, "what would I do differently?"

## 📘 6.3 The 10 golden rules — the poster over your desk

1. **Question first.** Chart type comes from the task, never the toolbar.
2. **One message per chart**, titled as a claim with a number in it.
3. **Strongest channel** carries the key message (position/length).
4. **Zero floors for length.** Crops/log axes only when declared.
5. **Sparingly highlight** — one pop per view, grey is a feature.
6. **Color = identity.** Tokens locked; diverging midpoints meaningful; never rely on hue alone.
7. **Denominators & n visible** — percent + level, always paired.
8. **Uncertainty shown** when estimates decide (bands, whiskers, footnotes).
9. **Defaults tell the story** — interaction deepens, doesn't rescue.
10. **Reconcile before reveal** — headline numbers tie to source (finance oath).

## 📘 6.4 Tool matrix — mastery means choosing, not marrying

| Tool | Best at | Watch for |
|---|---|---|
| **Excel** | Speed where data already lives; small tables + clean charts, board-deck screenshots | Manual rebuilds (refresh fragility), version sprawl |
| **Power BI** | Enterprise distribution, security/RLS, refresh pipelines, cost | Pixel-craft ceiling, busy canvas defaults |
| **Tableau** | Expressive craft, novel layouts, set/parameter actions | License cost, skill ramp |
| **Python (matplotlib/plotly)** | Reproducible bespoke viz, quant/uncertainty graphics, pipelines | Interactivity needs plotly/dash; no governance out-of-box |

Principle (Py6's senior ethos): pick per problem — meeting format, sharing needs, refresh reality, audience tooling. "I do everything in X" is a confession, not a flex.

## 📘 6.5 Governance & versioning — the boring armor

- Named templates + approved palettes per org; style tokens shared in ONE place (changes propagate).
- Version dashboard files (`shopkart_board_v3_2026-07.pbix`…), changelogs, owner line in footer.
- Data disclaimers: source, grain, refresh stamp, KNOWN caveats ("discount field is line-level plan, not transaction coupon").
- Certified data sources > ad-hoc extracts; recon tie-out file living beside the pack (Py6's output/ folder pattern).
- Deprecation duty: kill stale dashboards publicly — ghost reports with old numbers are worse than no reports.

## 📘 6.6 THE CAPSTONE — the ShopKart board pack review 🏆

**Brief (your assignment):** ShopKart's board meets monthly: needs ONE pack covering (1) FY performance vs target, (2) revenue drivers & regional health, (3) finance pack (P&L + variance), (4) forward outlook. You're handed a legacy "dashboard" (described): 18 visuals, rainbow pies, dual-axis revenue/orders theater, truncated variance bars, no targets, filters unlabeled, decimals like noise, white-on-yellow titles, refresh date "unknown".

Deliverables (do ALL, in order):
1. **Critique memo**: score the described dashboard on the §6.2 rubric (evidence per score), list top-5 defects by decision-risk.
2. **Redesign plan**: species classification, spine wireframe (ASCII/paper), chart-choice table (task→type→channel), interaction contract, story arc titles (the 3 acts).
3. **Hero chart build**: ONE centerpiece done properly in your chosen tool (waterfall Budget→Actual recommended): tokens, insight title, method subtitle, source footer, accessibility pass; accompany with its alt-text.
4. **Defense memo (1 page)**: before/after rationale per change; tie-out note proving each headline number; QA battery results (honest fails included!).
5. **Portfolio pack**: export images/PDF + README with rubric self-scores; publish where appropriate (T1/T5 skills; sanitized/public data only!).

Scoring: self + one peer/mentor using the same rubric; threshold 42/50.

---

## 🧪 LAB DV6 — Process drills (60 min, beyond the capstone)

1. Run the full brief for a fictional "weekly category war-room" — exactly 300 words, Wednesday 9 AM, category managers: questions/messages/constraints/KPI card list.
2. Sketch challenge: same board pack, THREE paper layouts in 10 minutes; photograph; mark the winner with WHY.
3. Take one OWNED old chart through ALL 6 stations; document each station with 1 screenshot/note (the "process album" — portfolio evidence).
4. Rubric practice: score TWO famous web dashboards (public galleries) with full rubric tables; find one 2-rated dimension each & propose fixes.
5. Postmortem letter to yourself: across this academy, what design habit was your worst? 3 corrective moves + deadlines.

## 💪 Exercises
1. Why are insight titles drafted at BRIEF (before data)?What truth does it force?
2. Versioning dashboards vs versioning code: same god, different altar — list 3 transferred doctrines.
3. When is a "ugly prototype" TRUSTED by execs? (Why demo early despite ugliness?)
4. Governance: a colleague's ghost dashboard quotes 2024 targets in Aug 2026 — write the deprecation protocol in 4 steps.
5. Which rubric dimension is most often traded AWAY under deadline pressure — and what's your own guardrail?

### ✅ Selected answers
- Ex 1: titles-first commits the ANALYSIS to answerable claims (and stops fishing expeditions); if data later disproves, the honesty wedge shows — titles become questions AGAIN.
- Ex 3: because correctness is verified by tie-out, not skin: execs trust numbers that reconcile; polish is schedule risk, wrong numbers are bankruptcy. Prototype = math meeting, polish = design meeting — never merged.

## ❓ Quiz
1. List the 6 stations in order?
2. Rubric ship threshold + one hard rule?
3. Golden rules: state #6 and #10 verbatim-ish?
4. Tool-matrix decision inputs (4)?

### ✅ Answers
1. Brief → Sketch → Prototype → Critique → Polish → QA (govern/version as the wrapper).
2. ≥42/50 total AND no single dimension <3 (juniors: thresholds negotiated UP, never down).
3. #6 "Color = identity — tokens locked, meaningful midpoints, never hue-alone." #10 "Reconcile before reveal — headline numbers tie to source."
4. Meeting format, sharing/security needs, refresh reality, audience tooling/access (cost & skill follow after).

## ✅ Mastery checklist
- [ ] Full 6-station execute documented on a real piece
- [ ] Rubric used on self + peers, fixes shipped
- [ ] Golden rules poster printed/pinned 🖨️
- [ ] Capstone: memo + plan + hero chart + defense submitted!

**🏆 DATA VISUALIZATION TRACK COMPLETE.** You think in questions, encode on the ladder, design with tokens, narrate in arcs, and audit with rubrics — in ANY tool. This is the layer that turns analysts into *advisors*. Academy's message: numbers are yours; make them impossible to ignore. 🎨📈
