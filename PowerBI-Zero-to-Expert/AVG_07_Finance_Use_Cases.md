# 💰 AV7 · FINANCE: Averages in the Money World + The Report-Card Capstone

> Final module — the finance special, per our tradition. Here's the career twist: business runs on averages that are **weighted, moving, and frequently MISUSED**. Marketing tweets "average salary ₹12 LPA". Fund ads trumpet "average 15% returns". Your GL whispers the truth. This module turns your exam skills into analyst superpowers — and ends with the ShopKart Average Report Card capstone. 🏅

---

## 🎯 Objectives

- Compute **moving averages** and connect them to the Time Series course's smoothing logic.
- Expose the **"average salary" marketing lie** with weighted-average honesty (CTC tales!).
- Master the **CAGR vs arithmetic-average trap** — the #1 investor ambush in India.
- Calculate **portfolio weighted average returns** in one line.
- Deliver the capstone: the **ShopKart Average Report Card** (weekly sales case study).

---

## 📘 Concepts

### 7.1 Moving averages: the average that RELOCATES every period

Fixed average over all data = calm but blind. A **moving average** (MA) averages the last *k* periods ONLY, sliding forward each period — the shopkeeper's and trader's trend-tool:

ShopKart Delhi store — daily sales (₹ thousand), 6 weeks:

| Week | W1 | W2 | W3 | W4 | W5 | W6 |
|---|---|---|---|---|---|---|
| Sales | 52 | 48 | 56 | 62 | 58 | 54 |

**3-week moving average (SMA-3):**
```
Window 1 (W1–W3): (52+48+56)/3 = 52.0
Window 2 (W2–W4): (48+56+62)/3 ≈ 55.3
Window 3 (W3–W5): (56+62+58)/3 ≈ 58.7
Window 4 (W4–W6): (62+58+54)/3 ≈ 58.0
```
Reading: the rising curve (52 → 55 → 59 → 58) = the underlying trend minus weekly noise. Sudden dip W4→W5 (62→58) gets smoothed into a gentler still-rising picture. **This is literally Module TS-2's smoothing from the Time Series course** — same math, finance name. Stock-market "50-day moving average" = exactly this on prices.

Rule for choosing k: **bigger k = smoother, slower to react**; smaller k = responsive, jumpy. Retail demons: 7-day for daily ops, 4-week/12-week for management reviews.

### 7.2 The "average salary ₹12 LPA" marketing lie (weighted-average police)

Recruiter post: *"Our analysts average ₹12 LPA!"* Reality ledger:
```
30 freshers × ₹4 LPA + 5 leads × ₹20 LPA
weighted avg = (120 + 100)/35 ≈ ₹6.3 LPA  ← YOUR realistic bracket
```
- A fresh candidate's **median-ish** reality ≈ what most employees actually get — the freshers' ₹4 LPA, not the "average" ₹12 (that number is the simple mean of two group means: (4+20)/2 = 12 — the exact Trap-1 illegal move from AV6!)
- **Your interview line** when hearing such numbers: *"How does that average break by level?"* — weighted-average thinking, hired-worthy on the spot (IC course crossover gold 🎯).

Same logic for "average revenue per store" (big outlets mask small ones), "average order value" (festival weeks mask normal weeks), "average hike %" (top performers mask the median). When someone quotes you an average in business, your trained reflex is: **weighted by what?**

### 7.3 ☠️ The CAGR vs arithmetic-average trap (investor ambush #1)

A mutual-fund ad: *"Average returns 15% per year!"* — underlying two years: **+60% then −30%**.

```
Arithmetic average = (60 − 30)/2 = +15% per year  ← the ad
Actual journey (₹100): 100 → 160 → 112   ✔️ Reality check!
CAGR = √(112/100) − 1 ≈ 5.8% per year  ← your ACTUAL growth
```
Why the lie works: gains and losses don't cancel in multiplicative money-land. −50% needs **+100%** to recover, not +50%.

**The law for life:** money multiplies; never average % changes on money with + signs — use CAGR (geometric logic). Arithmetic averages of returns are *always* optimistic. Whenever an ad says "average return", translate mentally: "≈ inflated; show me CAGR."

### 7.4 Portfolio weighted average return (one-line analyst skill)

Your investments don't share equal weights, so portfolio return is a weighted average:

```
60% in FD at 8% + 40% in equity fund at 14%
Portfolio return = 0.6×8 + 0.4×14 = 4.8 + 5.6 = 10.4%  ✔️
```
Same engine for: blended interest on multiple loans, average EMI rate across cards, ShopKart's blended margin across categories (grocery 8% × 60% share + electronics 15% × 40% = 10.8% blended margin). Weighting by what? — always the exposure share.

### 7.5 🏆 CAPSTONE — The ShopKart Average Report Card

**Scenario:** You are the analyst for Delhi's Karol Bagh store. The 6-week data is in §7.1's table (₹ thousand: 52, 48, 56, 62, 58, 54). The regional manager wants a performance note with targets.

**Your 6 required outputs:**
1. **6-week overall average** (engine check: deviations sum to zero).
2. **SMA-3 series** — as a trend sentence ("after early noise, the store is trending…").
3. **Best/worst deviation days**: W4 +? above average, W2 −? — and business hypotheses (festival? rain?).
4. **The week-7 TARGET**: sales needed in week 7 so that the **7-week average hits ₹60k**: compute via engine: needed = 7×60 − (52+48+56+62+58+54).
5. **Finance-champ twist:** The GM asks, "if I add ₹2k promo-sales for EVERY week retrospectively, the 7-week avg improves by…?" (golden property — 1 second!)
6. **Capstone summary (spoken!):** read your report card aloud FL5-chai-style in 60 seconds: "Average ~55; trend rising; promo can move us only if volume comes; target week 7: 90k." Deliver numbers with PR5's falling-landing discipline.

---

## 🧪 LAB — run the capstone (25 min)

Compute outputs 1–5 on paper (engine + shortcuts only), then record output 6 on your phone. Self-score: results correct (5/5 required), trend sentence legal, week-7 target exact, golden-property answer instant, and the 60-second cadence clean (no "umm", numbers at 120 wpm, landing falling).

---

## 💪 Exercises

1. From §7.1, compute SMA-4 for the available windows and describe what the bigger-k did to the W4 spike vs SMA-3.
2. A second recruiter shows: 20 juniors at ₹3.6 LPA and 10 leads at ₹18 LPA and claims "avg ₹9.8". Compute truth and craft your one-line interview question back (weighted-police style).
3. An investment went +40% then −20% then +10% over 3 years. Show ₹100's journey and compute both the arithmetic ad-number and the true CAGR. Comment on the gap.
4. ShopKart blended margin: dark stores margin 6% (70% of sales) + premium outlet margin 14% (30%). Blended margin?

### ✅ Selected answers

**LAB key:** 1) Overall = 330/6 = **₹55k** 2) as trend: "rising into week 5, easing in week 6 but above early weeks" 3) W4: +7 (festival week?); W2: −7 (mid-month slump) — any sound business hypothesis accepted 4) needed = 420 − 330 = **₹90k** (steep but that's the math's verdict!) 5) +₹2k → **average rises exactly ₹2k → 57** (property: every value +k).
**Exercises:** 1) SMA-4: (52+48+56+62)/4=54.5; (48+56+62+58)/4=56; (56+62+58+54)/4=57.5 — W4 spike damped harder vs SMA-3's 58.7 peak; bigger k = smoother/slower. 2) Truth = (72+180)/30 = **8.4 LPA**; line: *"Of the ₹9.8 'average', how much weight comes from the 10 leads? What do the 20 juniors actually average?"* 3) Journey: 100 → 140 → 112 → 123.2; ad = (40−20+10)/3 = **+10%**; CAGR = (123.2/100)^(1/3) − 1 ≈ **7.2%** — the ad flatters by ~2.8%/yr. 4) 0.7×6 + 0.3×14 = 4.2 + 4.2 = **8.4%** blended margin.

---

## ❓ Quiz

1. "Average salary ₹12 LPA" lied because the advertiser used the average of…
2. +60% then −30% advertises "15% average" — the real CAGR because money…
3. Bigger k in a moving average makes it…

### ✅ Answers

1. **Two group means as if their sizes were equal** ((4+20)/2) — the Trap-1 illegal move. Truth needs weighting by headcount (≈₹6.3 LPA). In interviews ask: "how does that average break by level?"
2. **Multiplies, not adds**: ₹100 → 160 → 112; CAGR ≈ 5.8%, not 15%. Losses are heavier than equal-sized gains (−50% needs +100% to heal). Translate "average return" ads instantly into "inflated — show CAGR".
3. **Smoother but slower to respond** — noise gets absorbed, real turns show up later (7-day for ops, 12-week for reviews; same trade-off as TS course smoothing).

---

## ✅ Mastery checklist — AV7 + whole course

- [ ] SMA computed + k-meaning explained (my own words)
- [ ] weighted-police reflex installed ("weighted by what?")
- [ ] CAGR vs arithmetic ad-trap: I can demo the ₹100 journey to a friend
- [ ] Portfolio blended returns/margins in one line
- [ ] CAPSTONE: report card all 6 outputs, 60-sec spoken summary delivered
- [ ] Full-course: engine (AV3) + shortcuts (AV4) + classics (AV5) + traps (AV6) work as ONE reflex system

🎉 **Averages: COMPLETE — the foundation stone of your Aptitude umbrella is set.** Percentages queue up next (ratio + profit/loss all lean on what you now own). Keep one engine habit daily, and averages will never cost you a mark again — in exams, in interviews, in salaries 💪

**Next:** 🔥 **Percentages** (course #2 of the 🧮 Aptitude umbrella) — say the word and we build it to the same no.1 standard: as many modules as the topic demands, finance capstone included.
