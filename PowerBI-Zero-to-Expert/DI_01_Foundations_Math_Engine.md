# 🧭 DI1 · DI Foundations & The Math Engine

> Welcome to the crown jewel of the 🧮 Aptitude umbrella. Data Interpretation is the single biggest DI/quant-adjacent scoring block in CAT, IBPS, SBI-PO, SSC-CGL, and every campus placement test — usually one full section of 10–20 questions built from 4–5 sets. Here's the secret nobody tells beginners: **DI is not about charts. DI is about finding 3 numbers inside 400, fast.** The chart is decoration; the game is selection + calculation under time. This module builds the two engines every set runs on — the 4-Step Routine and the Percentage Math Engine — and from DI2 onward we attack every chart type with them loaded.

---

## 🎯 Objectives

- Explain what DI actually tests: **selection + calculation under time** (not chart artistry).
- Run the **4-Step DI Routine**: Target → Locate → Units → Compute.
- Own the **% math engine**: %-change, %-of, and the 10%-1% anchor method.
- Deploy the **fraction↔percent power table** for near-instant conversion.
- Apply the **approximation law**: round hard when options are far apart, carefully when close.
- Enforce the **one-unit rule** (lakh/thousand/crore mixing is the #1 DI killer).

---

## 📘 Concepts

### 1.1 What DI really tests (and why you already have superpowers)

A DI question never asks \"is this chart pretty?\" It asks: *\"In which quarter did Online sales cross 20% of the total?\"* — and the skill is identical every time: **ignore 396 data points, grab the 3 that matter, do one arithmetic step, pick the option.** Exam-setters hide that one step inside big tables and crores/lakhs. Your job is to be a sniper, not a tourist.

And you already own the heavy machinery: **Averages** (AV1 formula trio + AV4 weighted tricks) is half of DI's calculations. The other half — percentages and ratios — we install right here in 1.3. Your Business Analytics umbrella (Tableau, Data Viz, Time Series) even makes you fluent in what each chart *shows*; DI adds what nobody else teaches: **solving under a stopwatch.**

### 1.2 The 4-Step DI Routine (tattoo it on your rough sheet)

```
STEP 1 · TARGET  — read the QUESTION first, never the chart. What EXACTLY is wanted:
                   a value? a difference? a ratio? a %? a rank? an average?
STEP 2 · LOCATE  — find only the 2–4 numbers needed. Cover the rest of the set
                   with your hand if you must. Data you don't need is a DISTRACTION COST.
STEP 3 · UNITS   — are these ₹ thousands? lakhs? % of what? Mismatch kills silently.
STEP 4 · COMPUTE — one arithmetic step + a 2-second sanity check ("is the size plausible?")
```

**Anti-pattern (the tourist):** read the whole table top-to-bottom, \"get a feel\", then read the question with 400 numbers swirling in your head. **Tourists run out of time. Snipers finish sets.** Question-first, always.

### 1.3 The % Math Engine (DI's fuel — install once, use forever)

**Engine part A — the three percentage questions:**

| Type | Formula | ShopKart demo |
|---|---|---|
| %-change | **(new − old) ÷ old × 100** | FY24 ₹2.36 cr → FY25 ₹2.80 cr: 0.44/2.36 = **18.6% ≈ 18.5%** ✔ (matches the GL) |
| %-of (part/whole) | **part ÷ whole × 100** | Online 66L of total 280L → 66/280 = **23.57%** |
| \"A is what % of B\" | **A ÷ B × 100** | Rohini 42L vs Dwarka 38L → 42/38 = **110.5%** |

The denominator is ALWAYS the base (the 'of'-thing, the 'old' value, the 'B'). 90% of DI % errors are wrong-denominator errors — say the base aloud: *\"of WHAT?\"* before dividing.

**Engine part B — the 10%-1% anchor method (mental math superpower):**

```
10% of 47,250 = 4,725        (drop one zero / shift decimal one place)
 1% of 47,250 = 472.5        (shift two places)
 5% = half of 10% = 2,362.5
18% = 10% + 5% + 2% + 1% = 4,725 + 2,362.5 + 945 + 472.5 = 8,505 ✔
(GST on Fresh Farms invoice FF-221 = ₹8,505 → bill total ₹55,755)
```

Any whole percent builds from 10/5/1 blocks in ~5 seconds. No calculator, no column multiplication. This pays for the entire course by itself.

**Engine part C — the fraction↔percent power table:**

| Fraction | % | Fraction | % |
|---|---|---|---|
| 1/2 | 50% | 1/7 | ~14.3% |
| 1/3 | 33.33% | 1/8 | 12.5% |
| 1/4 | 25% | 1/9 | ~11.1% |
| 1/5 | 20% | 1/10 | 10% |
| 1/6 | ~16.7% | 1/12 | ~8.33% |

Recognize 66/280 ≈ 1/4+ → 23.6% instantly; 13/76 ≈ 1/6 → 17%. Memory is cheaper than division.

### 1.4 The approximation law (when to round, how hard)

- **Options far apart** (12%, 17%, 23%, 31%): round brutally — 66/280 → 66/300 = 22% → closest 23.6% ✔ saves 20 seconds.
- **Options tight** (18.5%, 18.6%, 18.7%): accurate division, no rounding until the end.
- **Golden rule:** round the INPUTS slightly, never round mid-calculation TWICE — rounding cascades eat close options. Round at the END once.

### 1.5 The one-unit rule (the silent assassin)

DI sets LOVE mixing units: table in **₹ thousands**, question in **₹ lakhs**, option in **₹ crores.** Before ANY arithmetic: **convert everything to the question's unit (usually lakh).**

- ₹47,250 (thousands table entry \"47.25\") = 0.4725 lakh. 
- 2.8 crore = 280 lakh (1 cr = 100 lakh — always).
- Write the conversion ONCE at the top of your rough sheet; then compute freely.

---

## 🧪 LAB — Engine installation drill (10 min, no charts yet)

ShopKart FY25 quarter totals (₹ lakh): **Q1 58 · Q2 65 · Q3 76 · Q4 81** (total ₹2.8 cr across 5 Delhi stores + the Online vertical — full table arrives in DI2).

Using ONLY the engines above:

1. Q2→Q3 % growth. (Anchor: 11/65 ≈ 1/6?)
2. Q3→Q4 % growth. (5/81 ≈ 1/16 = 6.25%)
3. Q3 as a % of the full year.
4. Convert: Karol Bagh FY25 = ₹54,00,000 → how many ₹ lakh? How many ₹ crore?
5. FF-221 revisited: ₹47,250 + 18% GST. Total invoice value = ?

**Answer key:** 1) 11/65 = **16.9%** (1/6 ≈ 16.7% — engine C catches it instantly). 2) 5/81 = **6.2%**. 3) 76/280 = 27.1% (76/280 ≈ 76/288 = 1/3.8…, exact: 27.14%). 4) **₹54 lakh = ₹0.54 crore.** 5) GST ₹8,505 → **₹55,755.** If all five were sub-60-seconds total, your engine is installed.

---

## 💪 Exercises

1. \"94 is what % of 280?\" — using the anchor method, no long division.
2. A price rises 12,000 → 13,560. % change via (new−old)/old — and which value is the base?
3. Options given: 21.1% / 23.6% / 26.8% / 31.2%. Approximate 66/280 fast. Pick.
4. A table column reads: 12.5, 13.0, 15.0 (₹ lakh). The question asks for the sum in ₹ THOUSANDS. What do you write first on paper?
5. 1/8 + 1/16 as percentages: 12.5% + 6.25% = ? When does this shortcut appear in DI? (Hint: pie charts.)

### ✅ Selected answers

1. 10% = 28 → 94 is between 3×10% (84 = 30%) and…: 94/280 = 33.57% (1/3 of 280 = 93.3 → ~33.3–33.6% ✔).
2. 1,560/12,000 = **13%**. Base = **12,000** (the OLD value) — denominator obedience is %-change law #1.
3. 66/280 ≈ 66/300 = 22% → nearest **23.6%** ✔ (options far apart → brutal rounding legal).
4. \"All in ₹ thousand: 12,500 + 13,000 + 15,000 = **₹40,500**\" — the ONE-UNIT line written BEFORE adding. This habit alone out-scores half the exam hall.
5. **18.75%.** Pie angles: 67.5° slices, and any \"12.5% of…\" question (1/8) — the table pays rent everywhere.

---

## ❓ Quiz

**Q1.** The correct FIRST step on opening any DI set is:
- (a) Read the entire table top to bottom
- (b) **Read the QUESTION first** — fix the target (value? ratio? %? rank?), then locate only the 2–4 numbers it needs
- (c) Admire the chart type
- (d) Add all totals immediately

**Q2.** GST of 18% on ₹47,250, by the anchor method:
- (a) ₹4,725
- (b) **₹8,505** — 10% (4,725) + 5% (2,362.5) + 3% (1,417.5); invoice total ₹55,755
- (c) ₹9,450
- (d) ₹8,000

**Q3.** In a %-change question, the denominator is always:
- (a) The larger number
- (b) **The BASE — the 'old' value / the 'of'-thing — say \"of WHAT?\" aloud before dividing**
- (c) The newer number
- (d) The average of both

### ✅ Answers

1. **(b)** — target-first sniping. The tourist reads 400 numbers and runs out of time; the sniper asks \"what exactly do they want?\" and touches 3 numbers. Routine order: Target → Locate → Units → Compute.
2. **(b)** — anchor blocks: 10% + 5% + 2% + 1%. 4,725 + 2,362.5 + 945 + 472.5 = **₹8,505** → total ₹55,755. Five seconds, zero column multiplication.
3. **(b)** — 90% of DI % errors are wrong-denominator errors. New−old over OLD. Part over WHOLE. A over B when 'a % of B'. The base owns the bottom.

---

## ✅ Mastery checklist — DI1

- [ ] 4-Step Routine written at the top of my rough sheet before every set
- [ ] %-change / %-of / A-of-B formulas stated with base-awareness
- [ ] 10%-1% anchor: any whole % of any number in ~5 s
- [ ] Fraction↔% table (1/2 → 1/12) recalled cold, both directions
- [ ] Approximation law: I check option spread BEFORE deciding precision
- [ ] One-unit line written before any multi-source arithmetic

---

**Next:** 📋 **DI2 · Tables Mastery** — the most-frequent DI format in banking SSC and almost every exam: dense tables, T-trace reading, the totals-first rule, missing-value reverse-engineering, and cross-tab questions — all drilled on the full ShopKart 6×4 FY25 store table (every row ties to our ₹2.8 cr GL story).
