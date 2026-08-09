# 💼 PB7 · FINANCE: Probability of Money + Capstone — Risk & Rupees

> Every probability law you own is already invoicing someone. Insurance premiums are expected value plus a loading. Loan approvals are expected-loss arithmetic (EAD × PD × LGD). Fraud screens live or die by base rates — PB4's 18/67 is literally running on a vendor book near you. And every "at least one client closes" is the complement law paying salaries. This finale prices risk in rupees and closes with the **ShopKart Risk & Rupees Deck**: one capstone where a scooter promo, a loan book, a fraud screen, and a rainy weekend all report to your fraction engine. Count first, invoice later, bro.

---

## 🎯 Objectives

- Compute **expected value (EV)** = Σ (outcome × probability) and price with it (premiums, promos).
- Run **expected-loss** credit math: EL = EAD × PD × (1 − recovery), and the approve/reject line.
- Scale **Bayes screening** to a vendor book (flagged-guilty rate and review workflow).
- Handle **conversion streaks** and **rain-day revenue** with independence + complements.
- Deliver the capstone **Risk & Rupees Deck** with a CFO-ready memo.

---

## 📘 Concepts

### 7.1 Expected value: the pricing engine

```
EV = sum over outcomes of (value x probability)
```

**Insurance loading:** a ₹50,000 loss with 1% annual chance costs EV = 50,000 × 0.01 = **₹500**; the insurer quoting ₹750 is charging a **50% loading** (expenses + margin). Now you can negotiate with a number instead of a feeling.

**Promo pricing:** ShopKart's scooter grand prize (₹80,000) hitches a ride on 1-in-2,00,000 scratch cards: EV = 80,000/2,00,000 = **₹0.40 per card**. Print 20 crore cards → the scooter line-item is still ₹80,000 in expectation. Marketing's dream, priced at forty paise a card.

### 7.2 Expected loss: the credit line that approves itself

```
EL per loan = EAD x PD x (1 - recovery)
            = 1,00,000 x 0.02 x 0.60 = Rs 1,200
```

Fee/interest income per loan = ₹3,000 → **approve** (margin ₹1,800 over expected loss). Across a 100-loan book: EL ₹1.2L vs fee income ₹3L. The entire NBFC business model is this one row with better suits. Reject-line: if PD were 4%, EL = ₹2,400 — still approvable; at 5.5%, EL ₹3,300 > fee → decline or reprice. One formula, three verdicts.

### 7.3 Fraud screening at book scale (Bayes, productionized)

PB4's math on the real vendor file: base fraud 2%, catch 90%, false-alarm 5% → flagged-guilty ≈ **27%**. Operational translation: a flag is a *review ticket*, not a conviction — route flagged vendors to manual audit (17-cases-per-1000 real catches riding on 49 false alarms per 1,000). Policy line: **never auto-blacklist on the screen alone**; the base rate guarantees you'd mostly punish innocents.

### 7.4 Streaks & independence: conversion math done right

Five independent client pitches, 20% close each: P(at least one) = 1 − 0.8⁵ = 1 − 0.32768 = **0.67232 ≈ 67.2%**. NEVER add (5 × 20% = 100%) — addition is for exclusive events on ONE trial (PB2); across trials you multiply the misses and complement. The freshers' siren song, silenced forever.

**Trader's fallacy memo:** three straight loss days with an independent 30% daily loss chance = 0.3³ = 2.7% — unlucky, not "a broken model". Streak narratives are the Gambler's Fallacy with a Bloomberg terminal. Don't rebuild the strategy over 2.7%.

### 7.5 Rain-day revenue (risk-adjusted planning)

Delhi July: assume 40% rain chance per weekend day, independent. Normal day revenue ₹4L; rainy day ₹2.8L.

```
P(no rain both days) = 0.6^2 = 0.36      -> EV rev: 0.36 x 8.0L  = 2.880L
P(exactly one) = 2 x 0.4 x 0.6 = 0.48    -> EV rev: 0.48 x 6.8L  = 3.264L
P(rain both) = 0.4^2 = 0.16              -> EV rev: 0.16 x 5.6L  = 0.896L
Expected weekend revenue = Rs 7.04L   (the three tiles sum to 1.00 ✔)
```

Staffing, stock, and AC-load decisions ride on ₹7.04L, not on "hopefully it won't rain".

---

## 🧪 LAB — Money reps (12 min)

EV multiplies values by chances. EL multiplies exposure by defaults. Complement streaks.

1. Insurance check: ₹2,00,000 gadget cover, 0.5% theft risk. Fair EV premium vs the quoted ₹1,500?
2. Credit rerun: PD rises to 5.5% (recovery still 40%, EAD ₹1L, fee ₹3,000). Verdict?
3. Fraud book of 2,000 vendors (same 2%/90%/5% screen): expected true catches and false alarms?
4. Conversion: 6 independent meetings, 15% close each. P(at least one)?
5. Rain rerun: rain chance drops to 30%. Expected weekend revenue (recompute all three tiles)?

**Solutions (hide till done):** 1) EV = **₹1,000**; ₹1,500 quote = 50% loading — negotiable, and now you know by how much · 2) EL = 1,00,000 × 0.055 × 0.60 = **₹3,300 > ₹3,000 → DECLINE/REPRICE**; the same book flipped verdict at 5.5% · 3) fraud 40 → 36 caught; clean 1,960 × 5% = 98 false alarms; flagged 134, guilty-rate still 36/134 ≈ **26.9%** (scale changes counts, not the law) · 4) 1 − 0.85⁶ = 1 − 0.3772 = **0.6228 ≈ 62.3%** · 5) 0.49 × 8L = 3.920; 0.42 × 6.8L = 2.856; 0.09 × 5.6L = 0.504 → **₹7.28L** (drier July is worth ₹24K of expected weekend revenue).

---

## 💪 Exercises

1. ShopKart's "₹500-off" coupon hits 1-in-40 shoppers. EV cost per shopper? Budget for 2,00,000 Diwali shoppers?
2. A ₹3L micro-loan at PD 3%, recovery 25%, fee income ₹12,000. Approve?
3. Write the two-sentence policy that explains why flagged vendors go to REVIEW, not blacklisting (use 18/67 and false-alarm arithmetic).
4. 8 independent store visits, 10% conversion each — P(at least one conversion)? Then the WRONG answer a fresher would give.
5. Weekend planning: rain 50% per day, same revenues. Expected weekend revenue and the one-line staffing call.

### ✅ Selected answers

1. EV = 500/40 = **₹12.50 per shopper**; budget = 2,00,000 × 12.50 = **₹25,00,000 (₹25L)** — expected cost, plan it, sleep well.
2. EL = 3,00,000 × 0.03 × 0.75 = **₹6,750 < ₹12,000 → APPROVE** (₹5,250 expected margin).
3. At a 2% base rate the screen flags 67 per 1,000 with only 18 guilty (≈27%), so flags are review tickets, not convictions — manual audit separates the 18 from the 49 before any vendor is touched.
4. 1 − 0.9⁸ = 1 − 0.4305 = **0.5695 ≈ 57.0%**; the fresher's siren: 8 × 10% = "80%" — addition across trials hallucinates certainty that reality never owes you.
5. Tiles: 0.25 × 8L + 0.50 × 6.8L + 0.25 × 5.6L = 2.00 + 3.40 + 1.40 = **₹6.80L**; below the 0%-rain baseline of ₹8L by ₹1.2L → lean weekend roster, prep rain-day endcap push (PC6's bundle playbook).

---

## 🎓 CAPSTONE — The ShopKart Risk & Rupees Deck

Rakesh wants ONE deck for the quarterly risk review: promo exposure, credit line, fraud screen, sales pipeline, monsoon plan — all priced, all defensible. Build this table cold; then every row is a module you own.

| # | Risk item | Engine | Verdict |
|---|---|---|---|
| 1 | Scooter grand prize (₹80,000, 1-in-2,00,000) | EV = prize × p | **₹0.40/card** — promo stays self-funding |
| 2 | Cashback coupon (₹500-off, 1-in-40) | EV | **₹12.50/shopper** · ₹25L Diwali budget |
| 3 | Loan approve line (EAD ₹1L, PD 2%, rec 40%) | EL = EAD·PD·(1−rec) | **EL ₹1,200 < ₹3,000 fee → APPROVE** |
| 4 | Same loan at PD 5.5% | EL | **₹3,300 > ₹3,000 → DECLINE/REPRICE** |
| 5 | Vendor fraud screen (2%/90%/5%) | Bayes by 1,000s | **27% flagged-guilty → flags go to review, never auto-blacklist** |
| 6 | 5 pitches @ 20% independent | complement | **67.2% at-least-one-close** — never add to 100% |
| 7 | 3 straight trading loss days @ 30% | independence | **2.7% chance — variance, not sabotage; hold the strategy** |
| 8 | July weekend (rain 40%/day, ₹4L/₹2.8L) | EV tiling | **₹7.04L expected** — roster to the number, not the forecast-chat |
| 9 | Coupon-guess attacker (217.68-crore code space, PP7 canon) | base-rate note | **0.0046% hit-rate per attempt** — the space IS the moat |

**CFO memo (the three lines that matter):**
- **Everything above is priced, not vibes.** Promos cost ₹0.40/card and ₹12.50/shopper in expectation; both fit the festive budget with headroom. EV turns marketing into procurement.
- **The fraud screen is a triage tool, not a judge.** At a 2% base rate, most flags are innocent (≈27% precision) — route to manual review and let counts, not accusations, do the work.
- **Independence is doing heavy lifting everywhere.** Pipelines at 67.2%, losses at 2.7%, monsoon at ₹7.04L — all valid ONLY while trials stay independent. The day stores share one supply-chain failure, these multiply together very differently (correlation is where 2008 happened, kids).

**Mastery bar:** rebuild all 9 rows cold, name the law behind each, and defend the "review, don't blacklist" policy in front of the ops head.

---

## ❓ Quiz

**Q1.** Scooter grand prize (₹80,000) rides on 1-in-2,00,000 scratch cards. Expected cost per card:
- (a) ₹80
- (b) **₹0.40 — EV = 80,000/2,00,000; the promo is insurable and budgetable at forty paise a card; EV turns marketing into procurement**
- (c) ₹4
- (d) ₹800

**Q2.** Loan book: ₹1,00,000 exposure, 2% default, 40% recovery. Expected loss per loan — and the verdict at a ₹3,000 fee:
- (a) ₹2,000 — reject
- (b) **₹1,200 — EAD × PD × (1 − recovery) = 1,00,000 × 0.02 × 0.60; fee ₹3,000 clears it with ₹1,800 margin → APPROVE; at PD 5.5% the same row flips to DECLINE**
- (c) ₹600 — approve
- (d) ₹20,000 — reject

**Q3.** Five independent pitches, 20% close each. P(at least one close):
- (a) 20%
- (b) **≈ 67.2% — 1 − 0.8⁵ = 1 − 0.32768; adding 5 × 20% = 100% is the freshers' siren: multiplication handles the misses, the complement cashes the win**
- (c) 100%
- (d) 32%

### ✅ Answers

1. **(b)** — expected value: every price in this module is a value × chance.
2. **(b)** — EL is the approve/reject line; the whole NBFC model is this row in a suit.
3. **(b)** — complement law + independence. The two most employable moves in applied probability, in one line.

---

## ✅ Mastery checklist — PB7 & FULL COURSE

- [ ] EV priced: scooter ₹0.40, coupon ₹12.50, insurance loading 50% spotted
- [ ] EL row driven end-to-end: approve at 2%, decline at 5.5%, portfolio ₹1.2L vs ₹3L
- [ ] Bayes-at-scale defended: 27% precision → review queue, not blacklist
- [ ] Streak math clean: 67.2% pipeline, 2.7% loss-streak, no siren-additions
- [ ] Rain revenue tiled: ₹7.04L with the 1.00 sanity sum
- [ ] Risk & Rupees Deck rebuildable cold — 9 rows, laws named, memo memorized
- [ ] Course spine recited: favorable/total → OR with refunds → AND with starvation → conditions shrink universes → count both floors → complement "at least one" → price it in rupees

---

**🎉🎉 PROBABILITY COMPLETE, BRO!** From a coin flip to a priced loan book — you now think in outcomes, universes and expected rupees. **Aptitude course #8 banked**, sitting proudly beside Averages, Blood Relations, DI, Percentages, LR Puzzles, Number Series and P&C.

**Next up in the track:** ⚖️ **Ratio & Proportion** — the multiplier grammar underneath half the quant syllabus (and every margin you'll ever negotiate). Say the word and it's yours!
