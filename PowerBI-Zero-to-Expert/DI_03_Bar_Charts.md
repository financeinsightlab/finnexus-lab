# 📊 DI3 · Bar Charts: Heights, Clustered, Stacked

> Bar charts are DI's friendliest faces — and its sneakiest. Reading a height takes one second; reading it **correctly** (right scale, right series, right base) is where the marks live. Today: vertical + horizontal + clustered + stacked bars, the gridline-interpolation skill, the non-zero-axis visual lie, and the absolute-vs-%-grower trap — all on ShopKart's FY25 quarters so your eyes and your totals from DI2 always agree.

---

## 🎯 Objectives

- Read bar heights via **gridline math** — including values between gridlines.
- Handle **clustered bars** (multiple series side-by-side) and **stacked bars** (parts of a whole).
- Spot the **non-zero / broken y-axis** exaggeration instantly.
- Answer the four classic bar-chart question types in exam time.
- Cross-verify chart readings with table truth (consistency reflex).

---

## 📘 Concepts

### 3.1 Anatomy + gridline reading (the 3-second height check)

Our ShopKart FY25 quarter totals as a simple bar set (₹ lakh): **Q1 58 · Q2 65 · Q3 76 · Q4 81.**

```
₹L
90 ┤
80 ┤                 ■■■
70 ┤            ■■■   81
60 ┤      ■■■   76
50 ┤  ■■■ 65
40 ┤  58
   └────────────────────
      Q1   Q2   Q3   Q4
```

**Gridline math:** axis jumps of 10 → a bar halfway between 70 and 80 ≈ 75 (fine for far-apart options), exact from the table = 76. **Always confirm: (a) units on the axis, (b) step size between gridlines, (c) does the axis start at ZERO?** Those three questions cost 3 seconds and save 3 marks.

### 3.2 Clustered bars = \"table turned sideways\"

Clustered (grouped) bars put multiple series side-by-side — e.g., per quarter, TWO bars: **KB vs Online** — Q1: 12 vs 12 · Q2: 13 vs 14 · Q3: 15 vs 18 · Q4: 14 vs 22.

Classic questions + one-line solves:
- \"In which quarter did Online first beat KB by ≥ ₹3L?\" → Q3 (18 − 15 = 3) ✔
- \"Online's Q4 is what % more than KB's Q4?\" → (22 − 14)/14 = **57.1%** — denominator = KB (the 'than'-thing).
- \"KB's worst quarter?\" → Q1 (12), though its FY total is 2nd best — quarter vs year again.

### 3.3 Stacked bars = parts of a whole

A stacked bar shows composition: imagine ONE bar per quarter with three stacked segments: Physical-stores total, Online, and… let's do Q3 76 = Physical 58 (15+13+11+10+9) + Online 18.

Reading stack questions:
- Segment value = **top edge − bottom edge** (not \"edge value\"): the #1 stack-reading slip.
- \"Online's share of Q3\" = 18/76 = **23.7%** (engine: % of whole).
- Stacked-to-100% bars (\"percentage stacks\") show SHARES only — absolute values die in them; if asked for ₹, the total must come from elsewhere. **Name the stack: absolute-stack or 100%-stack, before computing anything.**

### 3.4 The four classic bar questions (type → reflex)

| Question type | Reflex |
|---|---|
| \"Highest/lowest VALUE\" | Tallest bar. Eye + confirm on axis. |
| \"Highest ABSOLUTE increase\" | Compare top-edge JUMPS between neighbors, in units |
| \"Highest % increase\" | (jump ÷ FIRST bar) — small-base bars flip this! |
| \"Average of the series\" | Sum of heights ÷ n (AV1) — gridline estimates fine if options far |

**The flip, live demo:** quarters Q1 58, Q2 65, Q3 76, Q4 81: biggest ABS jump = Q2→Q3 (**+11**); biggest % jump = also Q2→Q3 (16.9%)… exam-setters prefer contrast, so watch: KB Q1→Q2 = +1 (8.3%) vs Online Q1→Q2 = +2 (**16.7%**) — and Dwarka Q1→Q2 = +1 (12.5%): **same +1 lakh, different %.** Absolute ties, % splits by base. Underline \"most\" (₹) vs \"fastest\" (%) — you drilled this in DI2; bars make it visual.

### 3.5 The non-zero axis visual lie (topper's X-ray)

A bar chart that starts its y-axis at 50 (instead of 0) makes Q4 (81) look ~3× taller than Q1 (58). In newspapers and ads this is manipulation (your Data Viz course calls it out); in exams it's pure arithmetic bait: **heights no longer proportional to values → never compare bar SIZES visually when axis ≠ 0; read the NUMBERS.** Broken-axis (//) is the same lie with an honest warning label — treat both as: numbers-only mode.

---

## 🧪 LAB — Bar drills on ShopKart quarters (10 min)

Chart: Q totals (58, 65, 76, 81) + clustered KB-vs-Online + stacked Q3 (physical 58 + online 18). Axis step 10, starts at 0.

1. Read Q3's height WITHOUT the table — gridline math only. Then confirm = 76.
2. Clustered: Online's % lead over KB in Q4. (57.1%? verify)
3. Stacked Q3: Online segment's share of the bar.
4. The axis is redrawn starting at 40. Q4 now looks how much taller than Q1 visually? Why is that a lie, arithmetically?
5. Fastest %-growth quarter pair, and the absolute champion pair. (Formula, then numbers)

**Answer key:** 1) halfway-ish 70–80 → ~76 ✔. 2) (22−14)/14 = **57.1%**. 3) 18/76 = **23.7%**. 4) Visible heights: (81−40) = 41 vs (58−40) = 18 → looks 2.3× — numbers say 81/58 = **1.40×** only. Visual inflated 64%. Numbers-only mode: ON. 5) % champ: Q2→Q3 = 16.9% · ABS champ: Q2→Q3 = +11 both same pair here — say BOTH values aloud to prove no trap exists THIS time; exams will vary it.

---

## 💪 Exercises

1. Axis runs 0–100, gridlines every 20. A bar tops one-third of the way between 60 and 80. Best estimate?
2. Stacked bar total = 65 (Q2): Physical segment = ___, Online segment = ___ (recall the table: 51 + 14 ✔).
3. In a 100%-stacked chart you can recover EXACT ₹ values if given…?
4. Horizontal bar chart: what stays identical vs vertical — name two things.
5. True/False: \"If two clustered bars look equal, the series are equal.\"

### ✅ Selected answers

1. ≈ 66.7 → \"about 67\" — then CHECK against table/options (far-apart options make this enough).
2. Physical 51, Online 14 ✔ — segments sum to total: 51 + 14 = 65 ✔ (always audit the stack!).
3. **The total** (any one true anchor value works: shares × total = values). Without a total, 100%-stacks answer SHARE questions only.
4. Reading rules + traps (axis awareness, units) — only the neck-turn changes.
5. **False** if the axis doesn't start at 0 or gridlines mislead the eye; equal-looking heights need number-confirmation. Eyes estimate; axes confess.

---

## ❓ Quiz

**Q1.** Two clustered bars: Rohini Q1 9 → Q4 12, Online Q3 18 → Q4 22. \"Fastest % growth\" vs \"highest absolute jump\":
- (a) Same answer always
- (b) **Can DIFFER — Online +4L is the absolute king, while Rohini +33.3% beats Online's +22.2%; % divides by the FIRST value, so small bases win % races**
- (c) Absolute jump is always smaller
- (d) % growth needs no base

**Q2.** A bar chart's y-axis starts at 40 instead of 0. Comparing Q4 to Q1 by EYE is now:
- (a) Fine — bars speak truth
- (b) **A LIE — visible heights (41 vs 18) say 2.3× while real values (81 vs 58) say 1.4×; enter numbers-only mode until the axis is audited**
- (c) Better — more zoom
- (d) Illegal everywhere

**Q3.** In a STACKED bar, a segment's value is read as:
- (a) Its top edge value
- (b) **Top edge − bottom edge** — the stack-reading slip that costs more marks than any formula
- (c) The bar's total
- (d) Its percentage label only

### ✅ Answers

1. **(b)** — the absolute-vs-% flip, now in bar form. Underline \"most\" (₹) vs \"fastest\" (%) before touching numbers; the exam draws the flips deliberately.
2. **(b)** — the non-zero-axis lie. 3-second audit: units? step? zero? Then numbers-only reading. Your Data Viz course's manipulation museum has this on the wall.
3. **(b)** — stack value = edge difference. Top-edge reading is the classic slip (reading Online's top at 76 and calling Online = 76; it's 76 − 58 = 18). Stack subtraction is a reflex: `value = top − bottom`.

---

## ✅ Mastery checklist — DI3

- [ ] Gridline 3-second audit (units · step · zero?) runs before any reading
- [ ] Clustered: series kept straight, 'than'-denominator respected
- [ ] Stacked: top−bottom subtraction reflex; absolute vs 100% stacks named first
- [ ] 4 classic bar question types matched to reflexes
- [ ] Non-zero-axis lie explained with the 2.3× vs 1.4× ShopKart demo
- [ ] Chart readings cross-verified with table truth (consistency reflex)

---

**Next:** 📈 **DI4 · Line Charts** — slopes = growth stories: reading steepness honestly, multi-line crossovers, YoY twin-lines, the double y-axis trap, and moving-average overlays (your Time Series knowledge becomes points here) — on ShopKart's 12-month Online sales line.
