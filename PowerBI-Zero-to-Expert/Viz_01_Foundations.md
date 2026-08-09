# DV1 · Foundations of Visual Thinking: The Science Under Every Chart

> *Before Excel vs Power BI vs Tableau vs Python — there is PERCEPTION. Charts work because your brain's visual system is a parallel supercomputer. This module installs the mental model: marks, channels, and the accuracy ladder that decides whether a viewer reads your truth or invents their own.*

## 🎯 Objectives
Why viz beats tables (Anscombe!) · grammar of graphics: marks & channels · the encoding-accuracy ladder · pre-attentive attributes · the task→chart chooser · the one-message law + 5-second test.

---

## 📘 1.1 Why visualize at all — the Anscombe slap

Four datasets: identical mean, sd, correlation, regression line (St1's trap-reprise). Plot them: one is a clean line, one a curve, one a line + one wild outlier, one all-vertical + one outlier. **Summary stats blind; eyes see.** Finance version every meeting: a month-end table of 200 numbers vs one trend line of revenue — the table hides the dip; the line shouts it.

Rule zero: **visualize FIRST, then compute** — never accept naked numbers (St1 portrait + plot = same ritual).

## 📘 1.2 The grammar: data → marks → channels

Every chart is built from two vocabularies:

| Marks (things) | Channels (how they vary) |
|---|---|
| **Point** (dots) | Position (x, y) on a common scale |
| **Line** (paths) | Length / height |
| **Bar** (lengths) | Angle / slope |
| **Area** | Color hue (which category) |

The magic question for any design decision: *"which channel carries my most important message?"* Put it on the strongest channel (next section). Everything else is decoration or context — demote it (grey it, hide it).

## 📘 1.3 The accuracy ladder — Cleveland & McGill's gift

Ranking how PRECISELY humans decode each channel:

```
MOST accurate  ─  Position on a common scale   (dot plots, aligned bars)
                  Length                        (bars)
                  Slope / angle
                  Area
                  Color intensity / shade
                  Color HUE (fine for "which group", terrible for "how much")
LEAST accurate ─  Volume / 3-D depth
```

Consequences that become instinct: **bars + position trump pie angles** (why pies die in module 2, with receipts); bubbles sized by area get misread (we see radius!); 3-D is a precision funeral. When two messages fight for channels, the most important number wins position/length; the rest get color/shape as CLASSIFIERS, not quantities.

## 📘 1.4 Pre-attentive attributes — the 200-millisecond superpower

Your viewer notices — instantly, before thinking — a red dot among grey dots, one fat bar among thin, one tilted line among straight. These **pre-attentive signals** (hue, intensity, size, orientation, shape, enclosure) are your attention steering wheel:

```
All bars grey except the WORST variance account in orange → eyes land there
in 200 ms. That's design doing the analyst's job.
```

Law of scarcity: they only work used SPARINGLY. Highlight everything = highlight nothing. ONE pop per view; make everything else earn its ink (module 3 budgets this rigorously).

## 📘 1.5 The task → chart chooser — answer the question first

Start from the QUESTION, not the data:

| Task ("I want the viewer to…") | First choice | Runner-up |
|---|---|---|
| **Compare / rank** categories | Sorted bar | Dot plot, table-with-bars |
| **Trend** over time | Line | Column (few points), area (one series) |
| **Distribution** of values | Histogram | Boxplot (comparing groups!), strip |
| **Relationship** of 2 numerics | Scatter (+trend) | Bubble (3rd var, cautiously) |
| **Part-to-whole** | Stacked bar / waterfall | Donut (≤5 slices), treemap |
| **Actual vs target** | Bullet | Bar + reference line, KPI card |
| **Composition on a map** | Choropleth (RATES) | Symbol map (counts) |
| **Flow** between stages | Sankey | Funnel (with honesty warnings, DV5) |
| **Single number w/ context** | KPI card + sparkline | Gauge (rarely!) |

Misfires you now never commit: line charts over CATegorical x (fake continuity), pie charts of 12 slices (angle-overload), bar charts with truncated axes (length = lie).

## 📘 1.6 The one-message law & the 5-second test

Each chart answers ONE question, titled as a full sentence: not "Revenue by Region" but **"South leads revenue — 34% of FY25"**. The 5-second test: show the chart to a colleague for 5 seconds, hide it, ask the message. Wrong answer = redesign, don't defend. A chart that needs a narrator failed (unless the narrator IS the meeting — even then, annotate!).

Compose messages in hierarchy: every supporting chart answers a sub-question of the page's one question (DV4's story spine).

---

## 🧪 LAB DV1 — Channels, tests, choosers (45 min)

1. Take this data: Region revenue South 991k, North 743k, East 512k, West 388k. Sketch (paper!) it as: (a) pie, (b) unsorted bars, (c) sorted bars with leader highlighted. Which passes a 5-second test and why (channels used)?
2. ShopKart: list 6 business questions (e.g., "which category grew fastest?", "do discounts lift volume?") and fill the task→chart column for each — then double-check the channel ladder for your strongest message.
3. Watch-and-learn: open any 3 dashboards you built in T5/M6; for EACH chart, name its primary channel; demote anything competing.
4. Anscombe homework: load any pair x/y of your GL accounts; compute r; PLOT them. Report in one line how the plot changed your reading vs the number.
5. Pre-attentive experiment: a table of 25 region-month variances; highlight the single worst with color vs highlighting twelve with color. Which felt designed?

## 💪 Exercises
1. A bubble chart's third variable — what distortion do viewers introduce (radius vs area eye-math) and the one-line fix?
2. Why is color hue "inaccurate" for magnitude but perfect for identity? Give one exception where hue BOTH identifies and orders.
3. "One message per chart" — what's the legitimate EXCEPTION (paired rich views like dashboards of linked small multiples), and why doesn't it really break the law?
4. Position-on-common-scale superiority: why do stacked bars break it for middle segments?
5. Translate: "Market share by competitor" — task, first-choice chart, channel ladder check, and a full-sentence title template.

### ✅ Selected answers
- Ex 1: size encodes AREA, but eyes compare radii; fix: sqrt scaling + note it, or use a scatter + facet instead.
- Ex 4: middle segments lose a shared baseline (each floats) — position accuracy collapses except for the bottom series; that's why stacked never exceeds 3–4 series and the KEY series goes at the base.

## ❓ Quiz
1. Highest channel on the accuracy ladder and its common chart forms?
2. Anscombe's quartet teaches which permanent workflow rule?
3. Pre-attentive attributes work only when…?
4. A line chart over categorical x commits which sin?

### ✅ Answers
1. Position on a common scale — dot plots, bars from a shared baseline; demote everything else to context.
2. Stats can match while data diverges wildly → visualize FIRST, compute after, never accept naked summaries.
3. …used SPARINGLY (one pop per view); five highlighted items = none highlighted.
4. Inventing continuity/trend between unordered categories — use bars for categorical x, lines only for true continuous axes (time, amounts).

## ✅ Mastery checklist
- [ ] Grammar vocabulary runs on instinct (marks × channels)
- [ ] Chooser matrix applied to 6 real ShopKart questions
- [ ] Ladder + 5-second test + one-message law pass on old work
- [ ] Pre-attentive highlight used ONCE per view

**Next: DV2 — the 12 chart types decoded: use, avoids, and when each one lies. 📊**
