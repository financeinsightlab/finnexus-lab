# 🎯 DT4 · The Depreciation Gap — The DTL That Climbs to ₹5.0L and Walks Itself Home

> The single most common deferred tax item on Earth is born from one innocent fact: the tax department lets you write off machines FASTER than your books do. Book runs its careful ₹20L-a-year straight line; tax law sprints ₹25L and even more front-loaded blocks. The gap is a taxable temporary difference — tax already enjoyed the deduction, so future years owe it back — and it stacks on your balance sheet as a deferred tax liability that CLIMBS year after year, peaks, and then (this is the part nobody tells beginners) walks itself all the way back down to zero. This module runs that entire life-cycle on one ₹100L machine — the full DTL biography, ₹1.25L at a time to the ₹5.0L summit, then the year-five homecoming — plus the desi reality of India's WDV depreciation blocks and the half-year rule.

---

## 🎯 Objectives

- Build the full five-year DTL life-cycle: carrying vs tax base, year by year (python-verified)
- Prove the homecoming: cumulative DTL charges sum to zero across the asset's life
- Read a DTL movement schedule from the annual report like a birth-to-death biography
- Overlay India's reality: WDV blocks (15% P&M, 10% building, 40% computers, 25% intangibles) and the 180-day half rule (19.5 vs 17.25 canon)
- Explain why a growing-company's DTL keeps climbing even as individual assets deplete — the fleet effect

## 📘 Concepts

### 4.1 The canon asset — book ₹20L/yr, tax ₹25L/yr

Machine: cost **₹100L**. Books: straight-line 5 years, ₹20L/yr, residual nil. Tax: statute allows a straight sprint of 4 years, ₹25L/yr. Follow both columns (ALL numbers python-verified):

| Year | Book dep | Tax dep | Carrying (CA) | Tax base (TB) | TD = CA − TB | DTL balance | Year charge |
|---|---|---|---|---|---|---|---|
| 1 | 20 | 25 | 80 | 75 | 5 | 1.25 | +1.25 |
| 2 | 20 | 25 | 60 | 50 | 10 | 2.50 | +1.25 |
| 3 | 20 | 25 | 40 | 25 | 15 | 3.75 | +1.25 |
| 4 | 20 | 25 | 20 | 0 | 20 | **5.00** | +1.25 |
| 5 | 20 | 0 | 0 | 0 | **0** | **0.00** | **−5.00 (release)** |

The climb: four identical ₹1.25L charges — each year tax deducts ₹5L more than book, the shadow books 25% of the sprint. The summit: end of year 4, the machine has zero tax base left while books still carry ₹20L — cumulative gap ₹20L → **DTL ₹5.0L**. The homecoming: year 5, book still charges its ₹20L and tax gives NOTHING (the base is spent) → the gap closes to zero and the whole ₹5.0L releases through P&L as deferred tax income. **The DTL climbed ₹1.25L a year for four years, then came all the way home in the fifth.** Sum of every charge: +1.25 × 4 − 5.00 = **₹0.00** — exactly what DT1's invariance law demands: timing sums to nothing, always.

### 4.2 Why the summit matters more than the charge

The biography teaches two boardroom truths. First, the DTL is a born-and-dying provision with a date of birth and a date of death — each vintage-year asset contributes its own climb-and-release, and you can date every rupee on the shadow ledger. Second, the company-level snowball: in a growing firm, new machines are born every year and their fresh climbs outweigh the homecomings of old vintages — the aggregate DTL keeps rising even though every individual asset's shadow washes to zero. That's why "DTL keeps ballooning" is usually a growth fingerprint, not a red flag; and why a CAPEX STOP makes a decade of shadows come home at once (deferred income flooding P&L the year the factory goes quiet — analysts, read THAT one correctly).

### 4.3 The Indian overlay — WDV blocks and the 180-day rule

Indian tax depreciation doesn't do straight lines at all: it runs **written-down-value blocks**. Canonical rates: plant & machinery (general) **15%**, buildings **10%**, computers & software **40%**, intangibles (patents, licences and the like) **25%** — all on the WDV of the block, with the pool treatment meaning individual assets never really "finish." The half-year rule: an asset put to use for fewer than 180 days in its purchase year earns only HALF rate for that year (python-verified): block ₹100L @15% + additions ₹30L — fully-used year: 15 + 4.5 = **₹19.5L**; same additions used only 4 months: 15 + 2.25 = **₹17.25L** — a ₹2.25L timing delta purely from the commissioning calendar. Caveats the DT2 lens keeps: book componentization (DP3!) splits one machine into five lives; the TAX BLOCK doesn't care — five components still swim in one WDV pool, so the book-tax gap lives at REGISTRY detail level, not at summary. Also: tax's WDV front-loading (40% computers) vs book's 3-year SL spins the longest-lived shadows in the fleet.

### 4.4 Reading the shadow ledger in the wild

The deferred-tax note's deportation-by-nature table (machinery gaps, provisions, losses) IS this module at company scale. Radars: (a) machinery DTL rising smoothly — growth, healthy; (b) machinery DTL flat while capex booms — someone forgot the shadow (a finding); (c) big swing year — the capex stop or a rate change (DT11); (d) provisions DTA growing — the DT5 family at work. Final doctrine sentence: the depreciation gap is never about more tax or less tax — it is about WHICH YEAR files the return on which slice, and the shadow ledger makes the calendar visible today.

## 🧪 LAB — The Biography (10 min)

New asset: testing rig ₹60L. Books: SL 3 years, ₹20L/yr. Tax: WDV-style sprint — 50% year 1, 30% year 2, 20% year 3 (₹30L, ₹18L, ₹12L).

1. Compute CA and TB at each year-end, years 1–3.
2. TD and DTL balance at each year-end.
3. Year-by-year deferred charge/(release).
4. Sum the three years of charges — what do you expect, and do you get it?
5. The rig is delivered 20 January and commissioned in March (used 2 months in its first tax year). One line on what Indian WDV would do to its first-year deduction vs a 200-day commissioning.

**Why this matters:** once you can write the biography of one asset, the company-level note is just many biographies stacked; auditors sample single assets exactly this way.

**🔑 Lab answers:**
1. CA: 40/20/0. TB: 60−30=30; then 30−18=12; then 0. 2. TD: 40−30=**10** → DTL ₹2.5L; 20−12=**8** → DTL ₹2.0L; **0** → DTL nil. 3. Charges: +2.5 / −0.5 / −2.0. 4. Expect zero — get +2.5 −0.5 −2.0 = **₹0.00**, the invariance law on schedule. 5. Under the 180-day rule the commissioning year gets HALF-rate only — front-load shrinks, the gap (and its DTL climb) starts gentler; dep gaps are born on the commissioning calendar as much as in the rates.

## 💪 Exercises

1. A board member panics at a rising machinery DTL for five consecutive years while capex tripled. Two-line calming memo with the fleet logic.
2. In the canon table, what does the tax base's year-5 zero vs book's year-5 zero tell you about WHERE the ₹5.0L went?
3. Computer block: ₹40L tax WDV at 40% vs book SL over 3 years (₹40L stock of machines). Compute year-1 gap and DTL (25%).
4. "Deferred tax on depreciation changes the amount of tax a company pays over the asset's life." True or false? Prove with one number from the canon.

### ✅ Selected answers

1. Each year's new cohort starts its own climb while old vintages release; with capex tripling, births outrun homecomings and the shadow ledger balloons mechanically. It is the arithmetic of growth, not of tax risk — the reversal calendar is visible and benign.
2. Both reach zero TOGETHER — the year-5 release isn't an event so much as the last slice of two schedules finally agreeing; the ₹5.0L went home through P&L exactly as the invariance law promised, landing entirely in the release year.
3. Tax y1: 40 × 40% = ₹16L; book: 40 ÷ 3 = ₹13.33L → gap ₹2.67L → **DTL ₹0.67L** (rounding to policy convention; canon-tight: 2.67 × 25% = 0.6675).
4. FALSE — total deductions over five years identical (₹100L both columns); proof from the canon: charges +1.25 +1.25 +1.25 +1.25 −5.00 = **₹0.00**. Only the CALENDAR moves, never the sum.

## ❓ Quiz

**Q1.** The canon machine's DTL across years 1–5 runs:
(a) 1.25 rising forever — liabilities never reverse
(b) 1.25, 2.50, 3.75, 5.00, then home to 0.00 — four ₹1.25L climbs while tax outpaces book, the ₹5.0L summit when the tax base hits zero, and full release in year 5 as books catch the spent base; lifetime sum exactly ₹0, matching the invariance law
(c) 5.00 flat every year
(d) −1.25 (releases) every year

**Q2.** A growing company's machinery DTL keeps rising because:
(a) someone is hiding tax
(b) new cohorts' fresh climbs outweigh old vintages' homecomings — each asset individually washes to zero, but the fleet of birth-and-death schedules nets upward while capex expands; a capex STOP reverses the snowball as deferred income floods home
(c) the depreciation rate changed
(d) tax always exceeds book forever

**Q3.** India's WDV reality (the desi overlay):
(a) tax runs straight-line exactly like books
(b) tax runs WDV blocks — 15% plant, 10% building, 40% computers, 25% intangibles — pooled, front-loaded, with a HALF-rATE first year for assets used under 180 days (₹19.5L vs ₹17.25L on the canon block), and no component-level interest: the five book components of a crane all swim in one pool, so gap tracking lives at registry level
(c) intangibles depreciate at 40% WDV
(d) the half-year rule doubles first-year deduction

### ✅ Answers

1. **(b)** — climb, summit, homecoming: 1.25 → 5.0 → 0.0, lifetime zero.
2. **(b)** — the fleet snowball: births vs homecomings; a capex stop brings the shadows home.
3. **(b)** — blocks, pooling, front-loads, and the 180-day half rule: the registry-level reality.

## ✅ Mastery checklist

- [ ] I can write the 5-row canon table (CA/TB/TD/DTL/charge) from memory
- [ ] I can prove lifetime sum of charges = ₹0
- [ ] I can explain the fleet snowball and the capex-stop flood
- [ ] I can quote the four Indian WDV headline rates and the 180-day rule with the 19.5/17.25 canon
- [ ] I can read a movement note as stacked asset biographies

---

**Next:** **DT5 · Provisions & the Timing Map** — the other great deferred zoo: warranty ₹8L → DTA ₹2L, ECL ₹12L vs ₹4L → DTA ₹2L, 43B pay-to-deduct ₹16L → ₹4L, NRV ₹6L → ₹1.5L — and the one-line timing compass that sorts all of them.
