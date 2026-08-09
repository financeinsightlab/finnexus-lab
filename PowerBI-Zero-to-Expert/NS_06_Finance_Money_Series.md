# 💼 NS6 · FINANCE: Money Series + The Detective Capstone

> Every rupee timeline is a number series wearing a suit. Compound interest? A geometric series (your NS2 GP with r = 1+rate). SIP wealth? A growing ladder of GPs. Monthly vendor prices drifting +2%/week? A stealthy ×1.02 chain that compounds to +180% a year while looking innocent week to week. Your pattern radar is now a **money detector**. This closing module points it at finance — and the capstone is the **ShopKart Series Detective Report**: four real money sequences from our running story, pattern-named, projected, audited.

---

## 🎯 Objectives

- Recognize **CI as a pure geometric series** and compute any future term instantly.
- Model **SIP investments** as series of accumulating terms (ladder logic).
- Read **EMI/declining-balance** rhythm (interest first, principal growing share).
- **Detect manipulation**: drift compounding, odd steps, \"smoothed\" numbers — the forensic eye.
- **CAPSTONE:** deliver the ShopKart Series Detective Report + 60-second brief.

---

## 📘 Concepts

### 6.1 CI = the GP you already own (NS2 handshake)

₹1,00,000 at 10% p.a., compounded yearly:
```
Year:   1        2         3          4           5
Value:  110000 · 121000 · 133100 · 146410 · 161051
        = ×1.1 chain (r = 1.1): the a·rⁿ⁻¹ formula with a = principal
```
Every NS2 skill ports directly: nth term = P(1+r)ⁿ · \"how many years to double?\" = solve 1.1ⁿ = 2 → n ≈ 7.3 (the Rule of 72: **72 ÷ rate ≈ doubling years** — at 8% → 9 years, at 12% → 6 years). The famous number series 1.1, 1.21, 1.331, 1.4641 you've known since PC3 — it was money all along.

### 6.2 SIP ladders (many GPs, one corpus)

SIP ₹5,000/month at ~12% p.a. (~1%/month): each ₹5,000 installment grows its OWN geometric tail — month-1's ₹5k compounds 12 times, month-2's 11 times… Corpus after 12 months ≈ 5000 × (1.01 + 1.01² + … + 1.01¹²) — a **GP sum** (geometric series sum: a(rⁿ−1)/(r−1)): ≈ 5000 × 12.68 = **₹63,400** on ₹60,000 invested. Exam-asked flavor: \"approximate corpus\" = invested × multiple-table (12% p.a. monthly SIP: 1-yr ≈ 12.68×, 3-yr ≈ 43.5×, 5-yr ≈ 81.7×). Ladder insight: SIPs aren't ONE series — they're n stacked GPs; totals add.

### 6.3 The EMI rhythm (declining-balance series)

₹3,00,000 2-wheeler loan @12% p.a. EMI ≈ ₹14,130/month, 24 months:
```
Month 1: interest 3,000 (3,00,000×1%) → principal repaid 11,130 → balance 2,88,870
Month 2: interest 2,889 → principal 11,241 → balance 2,77,629
        …interest-term SHRINKS, principal-share GROWS (two interleaved series!)
Month 24: interest ~140 → principal ~13,990 → balance 0 ✔
```
An EMI is a **twin series**: the interest sub-series decays steadily, the principal sub-series grows ~1%/month (×1.01 steps!) — NS3's braid in a bank statement. Bank-exam favorite: \"interest in the 1st EMI\" = outstanding × monthly rate — one multiply, free mark.

### 6.4 The forensic eye (detecting manipulation in money series)

Fresh Farms' weekly paneer rate, 12 weeks (₹/kg): 320, 326, 333, 340, 347, 354, 361, 369, 376, 384, 392, 400. Ratios hover ~1.019 — a **×1.019/week chain = +2% per week = compounding to (1.019)⁵² ≈ ×2.66/year** — \"small drift,\" 166% annualized! The radar catches it in 10 seconds; a sleepy buyer pays it for a year. Manipulator patterns to name:
- **Stealth drift:** tiny constant % steps (compound quietly) — vendor-price favorite.
- **Step-jump disguises:** flat-flat-flat-JUMP repeated (psychological: \"only sometimes!\") — telecom-bill classic.
- **Smoothed lies:** a data series TOO clean amid noisy neighbors (real sales wiggle; fabricated sales don't — your ShopKart line wiggled honestly: 52,48,56,62,58,54!).

### 6.5 CAPSTONE — The ShopKart Series Detective Report 🏆

**Four cases, full protocol on each (family → next term/ projection → verdict):**

1. **FY Revenue series:** FY24 236L → FY25 280L (+18.6%): project FY26 at constant-rate GP → 280 × 1.186 ≈ **₹332L (₹3.32 cr)** — caveat printed: ONE ratio is a conjecture, not a trend (two points = infinite families — NS5 trap #2 in finance clothes! Q1-FY26 actuals (68L → Q1-FY25 58L: +17.2%) corroborate the band ✔).
2. **Quarterly growth-rate series:** QoQ growth 11.7%, 16.9%, 6.6%, (Q4→Q1-FY26: −16%) — family verdict: **no series — seasonal**, NOT trendable → forward projections must use YoY same-quarter, never QoQ chains (Time Series course alliance).
3. **Fresh Farms price chain (6.4):** pattern-named = stealth drift ×1.019/week; year-cost projection ≈ ×2.66 → negotiation memo: cap escalations at CPI+1pt; re-tender clause at +15% cumulative.
4. **Owner's SIP ladder (6.2):** ₹5k/month × 12.68 = ₹63.4k year-1 corpus; commit: \"ladder grows itself; my job is not to break the chain.\"

**Report format (4 rows max + 60-second spoken brief):** Family / Next-term or projection / Action. The brief: \"Revenue holds an ~18% YoY band; quarterly wiggles are seasonality, not signal; Fresh Farms' '2% weekly' is 166% a year in a fake mustache — renegotiate or re-tender; my SIP chain compounds quietly at 12.68× year-1. Full memo filed.\" Record, replay, refine.

---

## 🧪 LAB — Money-machine reps (10 min)

1. CI: ₹2,00,000 @ 8% for 3 years → value? (1.08³ = 1.2597)
2. Rule of 72: doubling years at 9%? At 6%? (exact-ish multiple choice: 8/12 ✔?)
3. EMI opener: loan ₹5,00,000 @12% p.a. → FIRST month's interest ₹?
4. Forensic: rate series 210, 214, 219, 223, 228 — drift %? one-year blowup ≈?
5. SIP: ₹2,000/month, 12% p.a., 12 months → corpus range (×12.68)?

**Key:** 1) 2,00,000 × 1.2597 = **₹2,51,946** (×1.08 chain, 3 links). 2) 72/9 = **8 yrs**; 72/6 = **12 yrs** ✔. 3) 5,00,000 × 1% = **₹5,000** ✔ free mark. 4) ≈ +1.9–2.0%/week → ≈ ×(1.0195)⁵² ≈ **×2.7** — convict as stealth drift (same moustache as 6.4!). 5) ≈ **₹25,000–25,400** (₹24,000 invested — the ₹1.4k is the ladder's quiet interest).

---

## 💪 Exercises

1. Write the CI series for ₹50,000 @12% for years 1–4 (three decimals on factors: 1.12, 1.254, 1.405, 1.574).
2. Why is \"one YoY ratio\" still a conjecture (name the NS trap it mirrors)?
3. Flat-rate trap: loan-ad says \"9% FLAT for 3 years\" — effective annual cost ≈ 9% × ~1.75 ≈ ?% (name the reason it feels cheaper than it is: declining balance vs fixed interest base).
4. EMIs month-1 vs month-12 on ₹1L@12%/12m: interest halves-ish? compute both.
5. Draft the FF negotiation one-liner pairing 6.4's number (×2.66) with the re-tender trigger.

### ✅ Selected answers

1. 50,000 ×1.12 = **56,000**; ×1.254 = **62,720**; ×1.405 = **70,250**; ×1.574 = **78,680** (chain-check ✔).
2. **Trap 2-adjacent: two points admit infinite families** — one ratio is a hypothesis; the Q1-YoY 17.2% second point corroborates. Band > point, always.
3. ≈ **15.8–16%** effective — flat-rate charges interest on the ORIGINAL principal all through, even as you repay (the outstanding declines but the interest meter doesn't) — the "feels-cheap" illusion is the non-declining meter.
4. Month-1: **₹1,000** (1,00,000 × 1%); month-12: balance ≈ one final EMI ≈ ₹8,800 principal → interest ≈ **₹88** (8,800 × 1%) — the interest term decayed ~11× from start to finish ✔ the twin-series braid in action.
5. \"Rates compounded ×2.66 in a year — cap escalations at CPI+1% or this contract re-tenders at +15% cumulative; Net-30 continues (LR7's payment calendar honored).\" — numbers plus respect wins renewals.

---

## ❓ Quiz

**Q1.** ₹1,00,000 @ 10% p.a. for 5 years forms which series — and its year-5 value:
- (a) AP → 150,000
- (b) **GEOMETRIC (r = 1.1 exactly): ₹1,00,000 × 1.1⁵ = ₹1,61,051 — the a·rⁿ⁻¹ from NS2 wearing a suit; AP-thinking (15k/yr) undercounts the compounding**
- (c) Fibonacci → 233,000
- (d) n² family → 125,000

**Q2.** Fresh Farms' weekly prices rise a STEADY ~2%/week. The forensic verdict is:
- (a) Harmless drift
- (b) **STEALTH COMPOUNDING — (1.019)^52 ≈ ×2.66/year: 'small weekly steps' are a 166%-annualized hike in a fake mustache; your radar catches constant-ratio chains in 10 seconds**
- (c) Noise
- (d) AP behavior

**Q3.** On a ₹5,00,000 loan at 12% p.a. (monthly rest), the FIRST EMI's interest content is:
- (a) ₹4,000
- (b) **₹5,000 — outstanding × monthly rate = 5,00,000 × 1%; the interest sub-series then DECAYS while principal share GROWS (the EMI twin-braid), which is why early EMIs feel all-interest**
- (c) ₹10,000
- (d) ₹500

### ✅ Answers

1. **(b)** — CI is the purest GP in the wild. (1.1)⁵ = 1.61051, memorized since PC3 — and Rule-of-72 says doubling at 10% ≈ 7.3 years, which 1.61× at year-5 is perfectly paced toward.
2. **(b)** — constant-ratio drift compounds quietly. ×1.019/week → ~×2.66/year is the negotiation memo in one number; 'harmless' is how vendors prefer you think.
3. **(b)** — one multiply: 1% of outstanding. The braid then does its work: interest decays, principal grows, balance hits 0 exactly when the twin-series meet at the end.

---

## ✅ Mastery checklist — NS6 & FULL COURSE

- [ ] CI treated as literal GP: nth-term + Rule-of-72 reflexes live
- [ ] SIP ladder math (×12.68 yr-1 @12%) explained to a friend
- [ ] EMI twin-braid narrated (interest ↓, principal ↑) with numbers
- [ ] Stealth-drift detection: % step → annualized blowup in ≤15 s
- [ ] CAPSTONE: Detective Report 4 cases + 60-second brief recorded
- [ ] Full-course: 7-gate radar + wrong-term protocol survive contact with money

🎉 **Number Series: COMPLETE.** Patterns are no longer ink-squiggles: they're CPI hikes, SIP ladders, EMI braids, and vendor bluffs. Next in the 🧮 queue — **Ratio & Proportion** (the natural heir of NS2's ratios) or **Profit & Loss** (PC6's price-war sequel). Your call, bro.

**Next:** 🧮 **On demand** — sized-to-topic modules, FINANCE capstone guaranteed, ShopKart rolling forward.
