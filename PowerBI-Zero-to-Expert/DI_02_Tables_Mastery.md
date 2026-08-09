# 📋 DI2 · Tables Mastery: The Examiner's Favorite Format

> Tables are the most common DI format in IBPS, SBI, SSC and TCS NQT — dense grids of 30–80 numbers where 3 matter. The good news: tables are also the **most mechanical** DI format. One reading technique (the T-trace), one preparation rule (totals-first), and one power move (missing-value reverse-engineering) cover ~80% of everything a table set ever asks. Today we master all three on ShopKart's complete FY25 store table — the same ₹2.8 crore story as your Finance GL, so every number you practice is the company's real math.

---

## 🎯 Objectives

- Read any dense table with the **T-trace** (header → stub → cell) without sliding a finger wrong.
- Apply the **totals-first rule**: compute row + column totals before question 1.
- Reverse-engineer **missing cells** from totals (the classic exam insert).
- Answer **cross-tab questions** (\"X's Feb as % of the column total\") in one division.
- Rank/difference whole rows fast, and know when absolute vs % rankings flip.

---

## 📘 Concepts

### 2.1 The ShopKart FY25 master table (memorize the SHAPE, not the numbers)

Quarterly sales, ₹ lakh, FY2025 (Apr 2024–Mar 2025):

| Store | Q1 | Q2 | Q3 | Q4 | **FY Total** |
|---|---|---|---|---|---|
| Karol Bagh (KB) | 12 | 13 | 15 | 14 | **54** |
| Lajpat Nagar (LN) | 10 | 11 | 13 | 12 | **46** |
| Rohini | 9 | 10 | 11 | 12 | **42** |
| Dwarka | 8 | 9 | 10 | 11 | **38** |
| Saket | 7 | 8 | 9 | 10 | **34** |
| Online (Priya's vertical) | 12 | 14 | 18 | 22 | **66** |
| **Quarter total** | **58** | **65** | **76** | **81** | **280 (= ₹2.8 cr ✔)** |

Every future module re-uses this table: DI3 draws its bars, DI5 bakes its pie, DI7 audits its margins. One dataset, five costumes — exactly what exam setters do with multi-set papers.

### 2.2 The T-trace reading method (zero slippage)

```
T-TRACE: (1) across the TOP header to the column you need
         (2) down the LEFT stub to the row you need
         (3) the CELL at the crossing — and READ THE UNITS before the digits
```

Thumb rules: put a finger on the header AND a finger on the stub until digits leave the page (fatigue slides rows at Q-40). Read **\"Karol Bagh, Q3, fifteen lakh\"** — label + label + value + unit — never just \"15\". Bare numbers are how lakh becomes thousand.

### 2.3 The totals-first rule (your 30 seconds that buy 5 minutes)

The moment a table opens (BEFORE question 1), write its skeleton on your sheet:

```
Rows: KB 54 · LN 46 · Roh 42 · Dwa 38 · Sak 34 · Onl 66
Cols: Q1 58 · Q2 65 · Q3 76 · Q4 81 · GRAND 280
```

Now every \"share of\", \"% of total\", \"compare-to-average\" question is one division on pre-computed numbers. Average store? 280 ÷ 6 = 46.67 (AV1 trio!). Online above average by 66 − 46.67 = 19.33L. **Totals-first converts 40-second questions into 10-second ones.**

### 2.4 Missing-value reverse-engineering (the exam's favorite insert)

Exam version: same table, but **Online-Q3 shows a dash (—)** and quarter total Q3 is given as 76.

```
Reverse rule: missing cell = its row/column TOTAL − sum of known siblings
Online-Q3 = 76 − (15 + 13 + 11 + 10 + 9) = 76 − 58 = 18 ✔
```

Double whammy variant: two blanks → use row total for one, column total for the other, cross-verify. If your two paths disagree, you misread a cell — recheck, never \"average it out.\"

### 2.5 Cross-tab questions (cell ÷ total, mind the denominator!)

- \"KB's Q3 as % of the quarter's total sales\" = 15 ÷ 76 = **19.7%** (column total — the quarter is the whole).
- \"KB's Q3 as % of KB's own year\" = 15 ÷ 54 = **27.8%** (row total — the store's year is the whole).

**Same cell, two answers — the 'whole' is defined by the question's grammar.** Ask: \"as a % OF WHAT?\" (DI1 rule). Underline the of-phrase in the question. This one underline is worth a mark per set.

### 2.6 Rank & compare: absolute vs % — where rankings FLIP

- \"Which store added the MOST ₹ from Q1 to Q4?\" → Online: +10L (12→22). Clear winner.
- \"Which grew fastest in %?\" → Online +83%?? — wait: Rohini 9→12 = +33.3%; Online 12→22 = +83.3%. Online wins both… boring example? Try KB vs Rohini Q1→Q3: KB 12→15 = +3L (+25%), Rohini 9→11 = +2L (+22.2%). **KB wins absolute (+3 > +2) AND % — no flip. Now Saket Q1→Q4: 7→10 = +3L (+42.9%) vs KB 12→14 = +2L (+16.7%) → FLIP!** Absolute winner = Saket+KB tie… absolute +3 (Saket) vs % winner Saket (42.9%). The examiner's delight: pick DIFFERENT correct answers for 'most' and 'fastest' using small bases (AV/BR disciples: a +1 on a base of 7 is 14.3%; the same +1 on 100 is 1%).
**Reflex:** underline \"MOST\" (₹-absolute) vs \"FASTEST/HIGHEST GROWTH\" (%) — different denominators, different winners.

---

## 🧪 LAB — Run the master table (12 min)

Table above, engines from DI1. No calculator.

1. Write the totals skeleton from memory onto paper. Verify against the table.
2. Quarter with the highest absolute total? Highest QoQ % jump? (58→65→76→81)
3. Online-Q3 goes missing (—). Recover it using Q3's total.
4. \"Saket's Q4 sales are what % of ALL stores' Q4?\" — one division.
5. \"Which store crossed a ₹40L year despite NOT being top-3 in any single quarter?\" (hunt carefully — totals-first makes it visible)
6. Rank stores by FY total. Then rank BY Q1→Q4 % growth. Does ANY store flip rank vs its total rank?

**Answer key:** 2) Q4 = 81 biggest; biggest % jump = Q2→Q3 (11/65 = **16.9%**; Q1→Q2 = 12.1%, Q3→Q4 = 6.2%). 3) 76 − 58 = **18** ✔. 4) 10/81 = **12.3%**. 5) **Rohini** — never a top-3 quarter finisher (9,10,11,12 vs KB/LN/Online), yet 42L for the year > Dwarka's 38. Slow-and-steady kirana energy ✔. 6) Totals rank: Online > KB > LN > Rohini > Dwarka > Saket. Q1→Q4 %: Online +83.3%, Rohini +33.3%, Saket +42.9%, Dwarka +37.5%, LN +20%, KB +16.7% → rank Online > Saket > Dwarka > Rohini > LN > KB. **Saket: last in totals, SECOND in growth** — the flip the exams are built on.

---

## 💪 Exercises

1. KB's Q2 as a % of KB's FY total. Which total is the denominator — row or column?
2. Fill: Dwarka FY total = ___, given quarters 8, 9, 10, 11.
3. \"Average quarterly sales per store in Q3\" — one division using the skeleton.
4. Two missing cells: LN-Q2 and Saket-Q3. LN FY = 46 (known), Saket FY = 34 (known), Q2 total 65, Q3 total 76. Solve and cross-verify.
5. True/False + why: \"The store with the highest Q1 sales must have the highest FY sales.\"

### ✅ Selected answers

1. 13 ÷ 54 = **24.1%** — ROW total: \"of KB's year\". Underline the of-phrase first!
2. **38** ✔ (8+9+10+11).
3. 76 ÷ 6 stores = **₹12.67L** (AV1: avg = sum ÷ n — engines never sleep).
4. LN-Q2 = 46 − (10+13+12) = **11** ✔; Saket-Q3 = 34 − (7+8+10) = **9** ✔. Column check: Q2 = 13+11+10+9+8+14 = 65 ✔; Q3 = 15+13+11+10+9+18 = 76 ✔. Two paths, one truth.
5. **False.** Online and KB tied at 12 in Q1 — but a slow Q1 with a blazing Q4 can still win the year (and a store strong out of the gate can fade). Only the FY TOTAL decides the year — one of DI's oldest \"opening-lead illusion\" traps.

---

## ❓ Quiz

**Q1.** A cell is blank in your table, but its column total and all sibling cells are known. The recovery rule:
- (a) Estimate from the graph
- (b) **Missing cell = TOTAL − sum of known siblings** — row total, column total, whichever is complete; verify on the second path when both exist
- (c) Use last quarter's value
- (d) Leave it — unsolvable

**Q2.** \"KB's Q3 as a % of the quarter's company total\" — the denominator is:
- (a) KB's FY total (54)
- (b) **The Q3 COLUMN total (76)** — because 'of the quarter's total' names the whole; cell ÷ column = 15 ÷ 76 = 19.7%
- (c) The grand total (280)
- (d) Q3's average store

**Q3.** The totals-first rule means spending your first 30 seconds on a table set by:
- (a) Reading question 1
- (b) **Writing the row-total and column-total skeleton on your rough sheet** — converting every later share-of-total question into one division
- (c) Drawing the table's bar chart
- (d) Checking the units line

### ✅ Answers

1. **(b)** — totals reverse-engineering. 76 − 58 = 18 recovered Online-Q3 in the LAB. Two blanks? Row-total one, column-total the other, and let the totals cross-verify each other.
2. **(b)** — the of-phrase OWNS the denominator: \"of the quarter's total\" → column total. Same cell divided by the row total (54) answers a DIFFERENT question (27.8%). Wrong denominator = the oldest DI wound.
3. **(b)** — skeleton first: KB 54 · LN 46 · Roh 42 · Dwa 38 · Sak 34 · Onl 66 · quarters 58/65/76/81 · grand 280. Every \"share of total\" then costs one division instead of one panic. (Note: even reading question-1-first from DI1 still holds — totals-first begins the moment you OPEN the data.)

---

## ✅ Mastery checklist — DI2

- [ ] T-trace: two fingers, label+label+value+unit, zero row-slides in 5 reads
- [ ] Totals skeleton auto-written for the ShopKart table from memory
- [ ] Missing cell recovered via total-minus-siblings, cross-verified
- [ ] Cross-tab: I underline the of-phrase and can state WHICH total owns the denominator
- [ ] Absolute-vs-% rank flip demonstrated on Saket vs KB without notes
- [ ] 10-second rule: any \"share of total\" on this table answered in ≤10 s

---

**Next:** 📊 **DI3 · Bar Charts** — clustered, stacked and horizontal bars: gridline math, reading between the lines, the non-zero-axis visual lie, and the \"highest bar vs fastest grower\" trap — drilled on the same ShopKart quarters so your eye and your arithmetic agree.
