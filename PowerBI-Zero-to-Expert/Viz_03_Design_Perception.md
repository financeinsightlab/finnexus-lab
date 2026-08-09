# DV3 · Design & Perception: Color, Type & the Ink Economy

> *Two analysts, same data, same chart type — one output looks like a bank statement from 1998, the other like an Apple keynote. The difference is a DESIGN SYSTEM: palette, typography, whitespace, and ruthless ink economy. Build yours today and every chart you ever make inherits it.*

## 🎯 Objectives
The 3 palette families (and the finance diverging rule) · colorblind-safe design (8% of men!) · colors-as-identities (brand consistency) · typography & Indian money formatting (lakh/crore) · Tufte's data-ink ratio · titles that state findings · annotation as storytelling · axis honesty & dashboard contrast.

---

## 📘 3.1 The three palette families — never mix their jobs

| Family | Use | Wrong use |
|---|---|---|
| **Sequential** (one hue, light→dark) | Ordered magnitudes 0→max (heatmaps, choropleths, intensity) | Categories (implies false order) |
| **Diverging** (two hues off a neutral mid) | Deviations around a MEANINGFUL midpoint (variance vs 0, achievement vs 100%) | Plain magnitude (fake midpoint) |
| **Categorical** (distinct hues) | Named groups (Region, Segment) | Magnitude (rainbow gradients!) |

**Finance's signature move**: variance & achievement charts are DIVERGING by nature — unfavorable↔favorable around zero/100%. Pick blue (favorable) ↔ orange (unfavorable): visible to ALL common color-blindness (the classic red↔green distinction vanishes for ~8% of men, DV0 moment). Encode sign redundantly with ▲/▼ markers — color + shape = universal.

## 📘 3.2 Color = identity: lock your cast

Assign each entity ONE color across EVERYWHERE: South = gold, North = teal, East = violet, West = grey… in every chart, every page, every tool, forever. Viewers learn your legend ONCE and never re-read it (consistency = reduced cognitive tax — the whole point of design). Store the map in a design-token comment (hex codes!) in your tool's theme/features (PBI theme JSON, Tableau preferences.tps, CSS variables in our academy app itself, matplotlib rc). Brand-align with company palette when corporate.

Reserve the ACCENT hue (your warm punch — amber/red-orange) for ONE job: the thing the viewer must find in 200ms (DV1's pre-attentive pop). Nuke all other warm colors to muted/grey supporting cast.

## 📘 3.3 Feeling generous rainbows & gradients-of-shame

Rainbow scales inject FALSE boundaries (viewers see bands in continuous data), destroy order (is violet > green?), and murder colorblind users. Replace with sequential single-hue or perceptual workhorses (viridis/CMRmap-equivalents shipped with every tool). Diverging palette midpoint must MEAN something (0 variance, 100% target) — otherwise it's decoration pretending to be analysis.

## 📘 3.4 Typography & the ₹ formatting desk

- ONE typeface (two max), weights create hierarchy: title bold, axis labels regular, footnotes small — never ALL-CAPS body text, never pure centered alignment of paragraphs.
- **Tabular numerals** (monospaced digits) for tables/axis — columns compare when digits align.
- Units live in AXIS TITLE or subtitle ("₹ lakh"), not beside every label ("₹1,250,000.00" — the .00 funeral).
- **Indian number scale discipline**: pick lakh/crore per context and STAY: trend ₹20,83,169 → "₹20.8L"; annual revenue → "₹2.5 Cr". Mixed units in one page = silent comparison tax. Thousands separators: international or Indian (1,00,000) style — pick one per audience (Indian board decks: Indian grouping reads instantly).
- Decimals: consistency over precision — 0 or 1 decimals for charts, exact figures live in table footnotes (accountants fetch exacts from the pack, not from a picture).

## 📘 3.5 Tufte's data-ink ratio — the ink economy

**Data-ink ratio = ink spent on data ÷ total ink.** Audit and DELETE: chart borders, heavy gridlines (or mute to faint grey — gridlines are scaffolding, not data), background stripes, shadows, 3-D extrusions, needless axis on BOTH sides, legends when direct labels possible (label AT THE LINE END — zero lookup cost), redundant decorations ("Revenue" appearing 4 times per chart: title, axis, legend, tooltip).

Keep-ink adds info: axis, tick marks, reference lines for targets (label them "FY25 Target ₹25Cr"), event annotations ("Diwali season"), the one accent highlight.

Result of proper diet: whitespace groups related items, markers surface, the eye lands exactly where the analyst intended. Gestalt proximity > boxes: group by SPACING, not by drawing rectangles around sections.

## 📘 3.6 Titles = findings, labels = honesty

- Title: the INSIGHT in a sentence — **"FY25 revenue +21%; South drove half the growth"**. Not a caption — a CLAIM, checkable by the viewer against the picture.
- Subtitle: method/scope notes ("monthly, net of discounts; Budget per Feb plan").
- Footer: source + refresh stamp ("Source: Finance_GL.csv · refreshed 23-Jul-2026") — audit trail by default.
- Axis labels: plain words + units; rotate LAST resort (horizontal bar exists precisely for long names, DV2!).

## 📘 3.7 Axis honesty & the annotation layer

- Bars: zero floor, locked (DV2). Lines: may zoom; announce crops via subtitle when magnitude matters ("axis begins at ₹17L").
- Dual-axis: only same-family units with clear dual coloring, or explicitly framed different units (T2's warning — sync is a liar's tool).
- Reference layers: target lines, quartile bands (T4 bullets), control limits (DV5 SPC) — every such layer carries its own label, never a mystery line.
- Annotation counts: ≤3 per chart (the story beats). If everything's annotated, the chart is answering five questions (DV1: split it).

## 📘 3.8 Contrast & the dark-dashboard trap

- Text contrast ≥ 4.5:1 against background; large text ≥ 3:1 (WCAG AA). Thin light-grey text on white = illegible; neon on near-black = vibration torture.
- Dark dashboards: look sexy in screenshots, punish in glare/boardrooms/projectors, inflate saturation problems, and print horribly. Default LIGHT for finance packs; dashboards on walls may go dark, carefully (muted accents, higher text weights).
- Grayscale test: convert to pure greyscale — can you still read every series? If no, your colors carry CRITICAL information with no backup encoding (shapes/dashes/patterns fix it — and print survives).

---

## 🧪 LAB DV3 — The design-system build (60 min)

1. Write your DESIGN TOKENS list: accent (hex), 3 sequential steps, diverging pair + midpoint, 4 categorical hues (Region map locked), text/background greys. Save as a snippet you'll reuse (CSV of tokens!).
2. Rebuild the FY25 variance pack chart with diverging blue/orange + ▲/▼ markers and a 0-midpoint; A/B against the old red/green opposite intuition: colorblind-simulate both (any online simulator) and report what colorblind actually sees in red/green.
3. Take one old "busy" chart (yours or any web BI), apply the ink diet (delete 7 items min., direct-label series end, mute gridlines, strip border), and count data-ink before/after.
4. Rewrite 6 chart titles as full-sentence findings (with numbers); add subtitle-method + source-footers.
5. Number formatting pass on one dashboard: all ₹ → lakh consistently, 1 decimal max, axis-title units; count label characters removed.
6. Grayscale your favorite two charts (phone camera filter is fine), and list every series that became indistinguishable — then add the backup encoding that fixes each.

## 💪 Exercises
1. Which palette family for (a) sales intensity map, (b) YoY% by account, (c) delivery partner names? One-line justifications.
2. Why is direct end-label superior to a legend (name the perception mechanism it eliminates)?
3. "Our brand color is red — variance unfavorable is red too" — the identity collision and YOUR resolution (2 options).
4. Dark mode finance deck: enumerate 3 concrete risks + 2 legitimate cases.
5. Tufte once praised a chart erasing the entire y-axis (with data labels) — when is the axis itself redundant?

### ✅ Selected answers
- Ex 3: palette sovereignty: brand red ≠ data red. Options: (a) diverging blue/orange, (b) if brand red must stay as accent, then unfavorable uses a distinct warm-pink WITH ▼ marker; never let brand semantics and data semantics share hue.
- Ex 2: eliminates the decode-and-return loop (eye ping-pong) — working memory holds the series while reading.

## ❓ Quiz
1. Diverging palettes demand WHAT at the midpoint?
2. The two accessibility moves beyond color alone?
3. Data-ink ratio — numerator, denominator, one deletion example?
4. Indian-scale formatting consistency rule for one page?

### ✅ Answers
1. A MEANINGFUL center (0 variance, 100% target, no-change) — otherwise it's fake drama decoration.
2. Redundant encoding (marker/label/dash + color) and colorblind-safe pair choices (blue/orange not red/green); plus contrast & grayscale survival.
3. Data ink ÷ total ink; deletions: borders, heavy grids, legends→end labels, 3-D/shadows, duplicate axis sides.
4. ONE scale per page (all lakh or all crore) with units in axis titles — mixed-unit pages silently tax every comparison.

## ✅ Mastery checklist
- [ ] Design tokens saved & reused across two tools
- [ ] Diverging variance chart accessibility-verified
- [ ] Ink diet + insight titles + ₹ discipline applied
- [ ] Grayscale & contrast checks passed on favorites

**Next: DV4 — dashboards & stories: hierarchy, interaction, and the narrative arc that moves executives. 🖥️**
