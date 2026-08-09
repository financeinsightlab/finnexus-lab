# DV2 · Chart Mastery: The 12 Types Decoded — Use, Avoid & When Each Lies

> *Every chart type is a tool with a safety manual. This module is the mechanic's course: for each core type — exactly when it's perfect, exactly when it deceives, and the professional variants seniors reach for. Tool-agnostic: identical in Excel, Power BI, Tableau, and matplotlib.*

## 🎯 Objectives
Bar family (sorted/grouped/stacked/100%) & the zero-baseline law · line & area honesty · pie/donut sins with receipts · scatter discipline · histogram vs bar · boxplot · heatmap · treemap · waterfall · bullet · maps · small multiples.

---

## 📘 2.1 Bars — the unbeatable comparison machine

**Sorted bar = the #1 finance chart.** Vertical (columns) for ≤~12 short labels / time-like order; horizontal for LONG names (AccountName breathes!) and >7 items. Three cousins:

- **Grouped**: compare series side-by-side (Actual vs Budget per month) — direct, but >3 series = spaghetti; limit 2–3.
- **Stacked**: part-to-whole AND totals in one; only the BOTTOM series stays comparable across columns (float problem, DV1); ≤3–4 series; key series at base.
- **100% stacked**: share, not amount; totals variance vanished (that's the price of "proportional insight").

🔒 **The zero-baseline law (length encodings)**: bars encode value as LENGTH from zero. Truncate a bar axis → ratios lie (₹95L vs ₹100L drawn as 5× difference). Bars must start at 0 (or you must visibly break & note it, newspaper-style). Lines break this law legally (§2.2), bars never.

## 📘 2.2 Lines — trends, honestly

- Lines for CONTINUOUS x (time, numeric) only; categorical x → bars or dots.
- Zoom (non-zero origin) is LEGAL for lines — slope, not length, carries the message — but annotate the floor ("axis starts at ₹17L") when context matters; crops that turn 2% wiggles into rollercoasters belong to tabloids (DV5's gallery awaits).
- **Banking to ~45°** (aspect ratio): too-flat hides movement, too-tall hallucinates drama.
- ≤4–5 series; beyond → small multiples (§2.11) or interactive highlighting.
- Markers ON when monthly/12 points (they're data!), OFF when 1,000 ticks of dense series.

## 📘 2.3 Areas — the total envelope

Single-series area = line + gravity: fine. **Stacked area** distorts almost everything off-baseline (same float problem as stacked bars, curvier); use for few series where the TOTAL story is the point (cash components), never for precise comparison. Percent-stacked area: rare, strong for share-over-time only.

## 📘 2.4 Pie & donut — the court is in session

Pies encode with ANGLE + AREA — bottom of the ladder. Reality check: comparing 27% vs 31% slices blindfolded by eye fails; bars ace it. Allowed: ≤5 slices, one donut per page, shares-of-one-whole, direct slice labels (no legend ping-pong), biggest slice at 12 o'clock. Forbidden: exploded 3-D pies (perspective cheats area), 12-slice pies, pie-vs-pie comparisons (use stacked bars!). The CFO who demands a pie gets a donut with a giant NET number in the hole — diplomacy with math inside. 🍩

## 📘 2.5 Scatter — the relationship lab (St4's home turf)

Two numerics, one dot per entity → correlation REVEALED instantly (correlation ≠ causation, St4's mantra on every slide bar). Pro moves: trend line + r² in subtitle; quadrant medians splitting "high disc/high qty" from "low/low" (annotate the quadrants — story gold); alpha transparency for overplotting; log scales when ranges span ×100 (SAY SO ON THE AXIS). Bubble = risky 3rd var; prefer color-classifier or facet.

## 📘 2.6 Histogram vs bar — the eternal interview question

**Bar = categories; histogram = continuous values cut into bins.** Histogram answers "what SHAPE" (St1's skew hunt): order values pile under ₹25k with a long right tail → median story confirmed visually. Bin width CHANGES the story (too fat = smooth lies, too thin = noise) — iterate 3 widths, show honest default. KDE smooth overlay optional, footnote bandwidth. Gaps between histogram bars = continuity signal; gaps not optional in data viz aesthetics here, they're MEANING.

## 📘 2.7 Boxplot — distribution comparison in one glance

Median line, IQR box, whiskers/fences (St1's IQR!), outliers as dots: 12 sub-categories worth of order-value boxes = skew + spread + outliers comparable instantly. Violin = density mirror when shape detail matters. When the audience can't read boxes, slope toward bars + error whiskers (know your reader, DV4).

## 📘 2.8 Heatmap — the matrix painter

Region × Month, color = achievement% — 48 numbers, one pattern burst (festive months glow). Rules: sequential scale for 0→max; diverging AROUND a meaningful midpoint (100% target! favorable↔unfavorable maps beautifully); annotate cells when the matrix is small; never rainbow scales (false boundaries, colorblind chaos — DV3 receipts).

## 📘 2.9 Treemap — fast composition, fuzzy comparison

Area rectangles per Category → SubCategory: instantly visible who dominates; precise comparison? No (area judgments, ladder §1.3). Use when "what occupies the whole?" is the question and rectangles ≥ readable; label directly; clickable drill is treemap's saving grace (interactive tools).

## 📘 2.10 Waterfall & bullet — finance's twin heroes

- **Waterfall** (M10/T6's bridge): Budget → +Volume → +Price → −Costs → Actual; columns start/stop visible, connectors, end columns emphasized, signed colors (up/down). The BEST "how did we get from A to B" ever invented.
- **Bullet** (Stephen Few's classic): bar (actual) + vertical marker (target) + shaded qualitative bands (poor/ok/good) — a gauge that respects ink. Actual-vs-target at a fraction of the ink; beats dials by being honest AND compact.

## 📘 2.11 Maps & small multiples

- **Choropleth** (filled regions) ONLY for RATES/ratios (achievement %, per-capita) — counts on filled maps = population proxy lies; symbol maps (bubbles at cities) for counts.
- Geographic role care (T2's Edit Locations), projection nods, and "is the map even needed?" (a sorted state bar often beats geography).
- **Small multiples (trellis/facet)**: same chart repeated per Region — kills overplotting, patterns pop per facet. The most underused senior move in all BI.

---

## 🧪 LAB DV2 — The ShopKart type gallery (60 min)

1. Ranked: horizontal sorted bars of SubCategory revenue with direct labels + leader accent. Then destroy it with a truncated axis and describe the lie (regain innocence).
2. Trio: Actual vs Budget per month as (a) grouped bars, (b) bullet chart band-wise, (c) bar + target reference line. Which wins for a monthly close pack? Defend in 2 lines.
3. The pie trial: 12 SubCategory shares as pie, donut (top-5+Other), and 100% bar. Judge each on "can viewer rank 3rd vs 4th?" — verdict chart?
4. Distribution pair: order-value histogram (3 bin widths!) vs sub-category boxplots; write the shape-sentence each screams.
5. Waterfall: FY25 Budget→Actual bridge by Type (income up, COGS/OpEx down-signed); connect, sign-color, emphasize ends.
6. Heatmap: Region × Month achievement% diverging at 100%; find the failure mode months in half a second. Bonus: small multiples of category trend per Region — was the 𝑎𝑛𝑠𝑤𝑒𝑟 DIFFERENT from the aggregated line?

## 💪 Exercises
1. Stacked bars: which series stays comparable across columns and why does your CFO-graph put Revenue at the base?
2. Aspect ratio: sketch-imagine the same revenue data at 45° banking vs ultra-wide — which one gets budget approved?
3. Why is a donut SLIGHTLY better than a pie (one geometry clue + one ink clue)?
4. Symbol vs choropleth: pick for "orders per city" and "achievement % per state" — one line each.
5. Treemap alternative for RANKABLE composition: name it and its channel.

### ✅ Selected answers
- Ex 1: only the bottom series has a shared baseline — position accuracy (DV1 ladder!) survives solely there; base = the headline number.
- Ex 3: donut loses the deceptive center-area (hollow = angle lies lose mass) and the hole is free ink for the KPI number.

## ❓ Quiz
1. The zero-baseline law applies to WHICH encoding (and which type may legally zoom, with what duty)?
2. Grouped vs 100% stacked bars — what does each preserve?
3. Histogram vs bar chart: the decisive test?
4. Choropleth honesty rule in one line?

### ✅ Answers
1. Length (bars, from zero; truncating = ratio fraud). Lines carry slope, so may zoom — with the crop disclosed when magnitude matters.
2. Grouped preserves per-series comparison; 100%-stacked preserves share and mashes totals; never confuse share charts with level charts.
3. Is x continuous (bin-able numbers) → histogram; x discrete categories → bars. The gap between bars is the tattletale of nominal x.
4. Fill regions with rates/ratios normalized, never raw counts (which just redraw the population map).

## ✅ Mastery checklist
- [ ] Full 12-type gallery in-tool with correct variants
- [ ] Zero-baseline, banking, bin-width, float discipline automatic
- [ ] Finance twins (waterfall + bullet) built clean
- [ ] "Spot the lie" on truncated-axis demo done

**Next: DV3 — color, typography, ink economy: the design system behind charts that FEEL premium. 🎨**
