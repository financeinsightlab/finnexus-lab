# 🎯 INT3 · Frequencies, Fractions & the Rule of 72
> Same nominal rate, different paychecks. "10% p.a. compounded **half-yearly**" is really 5% twice — **×1.1025** — and the gap between that and annual compounding is where examiners (and banks) live. We master frequency gears, the **hybrid tail** (rate changes mid-stream), the **72 club** of doubling pairs, and **depreciation** — compounding in reverse.

## 🎯 Objectives
- Convert any frequency quote: half-yearly means **rate ÷ 2, periods × 2**; quarterly means **rate ÷ 4, periods × 4** — the gear law.
- Compute maturity values across frequencies and rank them (more rests ⇒ more money, with diminishing gains).
- Handle **hybrid tails**: different rates for different stretches → multiply the chain of factors.
- Snap doubling questions with the **Rule of 72** (rate × years = 72) and recall the classic pairs.
- Run **depreciation** as CI with a negative rate: ×(1 − r) per year, never flat subtraction.

## 📘 Concepts

### 3.1 The gear shift — frequency is a real rate
A "10% p.a. compounded half-yearly" FD splits each year into two rests at 10%/2 = **5% per rest**:

```text
₹10,000 × 1.05 × 1.05 = ₹11,025      (vs ₹11,000 annual, vs ₹11,000 SI)
The frequency bonus: ₹25 — interest on the first serving's ₹500.
```

Quarterly gears down further: 2.5% × 4 rests → ₹10,000 × 1.025⁴ = **₹11,038.13**. The drill never changes shape: **rate ÷ frequency, periods × frequency**, then multiply the ladder.

### 3.2 The frequency ladder — and its ceiling
Nominal 10%, ₹1 invested one year:

| Rests | Per-rest rate | Year factor | Effective yield |
|---|---|---|---|
| Annual | 10% | 1.100000 | 10.000% |
| Half-yearly | 5% | 1.102500 | 10.250% |
| Quarterly | 2.5% | 1.103813 | 10.381% |
| Monthly | 0.8333% | 1.104713 | 10.471% |
| Daily | 0.02740% | ≈1.105156 | ≈10.516% |
| Continuous | → 0 | e^0.1 = 1.105171 | 10.517% |

Two lessons: (1) more rests always pay more, because interest starts earning interest *sooner*; (2) the gains **shrink** — from annual to half-yearly you gain 25 bps, from daily to continuous you gain 0.1 bps. Frequency is real, but it is **not** infinite ammunition. Banks advertising "monthly rests!" are selling you single-digit basis points as confetti.

### 3.3 Hybrid tails — when the road changes speed
ShopKart's ₹1,00,000 FD ran 10% CI for 2 years; the bank then **revised the rate to 5%** for year 3 (section 80C tenure renegotiation, life happens). Multiply the chain:

```text
1,00,000 × 1.21 × 1.05 = ₹1,27,050
```

Each stretch gets **its own factor**; the factors simply multiply. Same law covers engine swaps (2 years CI then 1 year SI: ×1.21 then + P₂×R/100), mid-year deposits, and step-up rates ("8% first year, 10% thereafter"). One rule: **never average the rates — always chain the factors.**

### 3.4 The 72 club — doubling on sight
Money at r% CI doubles in ≈ **72 / r** years (the ln2 ≈ 0.693 constant, rounded for divisibility). The classic pairs to recite:

```text
6% ↔ 12 y · 8% ↔ 9 y · 9% ↔ 8 y · 10% ↔ 7.2 y · 12% ↔ 6 y · 18% ↔ 4 y · 24% ↔ 3 y
```

Forward and backward: "doubles in 6 y ⇒ 12%"; "18% ⇒ doubles by the 4-year review." At 10% the 7.2-year pair explains our ladder: 1.61051^1.44… eh — trust the club: rule-of-72 numbers are for **speed**, and they're good within a few percent at bank rates. Precision lives in the ladder; decisions live in the club.

### 3.5 Depreciation — the mirror engine
ShopKart's delivery van: ₹2,00,000, losing 10% of its **current** value yearly (reducing balance, the RTO-resale reality):

```text
₹2,00,000 × 0.9 × 0.9 × 0.9 = 2,00,000 × 0.729 = ₹1,45,800
```

Depreciation = CI with a **negative rate**: multiply by (1 − r), n times. The amateur melts flat — "10% of ORIGINAL per year = ₹20,000 × 3 = ₹60,000 off ⇒ ₹1,40,000" — and under-prices the van by ₹5,800 on the resale app. Population decay, machine value, phone resale — same engine, same mirror. (Growth versions — population +5%/yr — are plain CI with plus signs.)

### 3.6 Real-life fine print radar
- FD ads: "7.1% p.a. **quarterly compounding**" — real money, INT6 turns it into ₹26.82L on ShopKart's ₹25L.
- Loans: "monthly rests" — your EMI fights a smaller enemy each month; same math, opposite jersey.
- Chit funds / "cumulating" schemes: demand the per-rest rate and the rests per year, or walk.

## 🧪 LAB — Gearbox shift (10 min)
1. ₹2,00,000 @ 10% p.a. half-yearly, 1 y → maturity?
2. Same ₹2,00,000 quarterly, 1 y → maturity? Which gear won and by how much (vs annual ₹2,20,000)?
3. Hybrid: ₹50,000 @ 12% CI 2 y, then 10% for year 3 → amount. (Chain, don't average!)
4. 72 club: ShopKart's retained earnings grow 9% — how long to double? And what rate doubles the safety fund in 8 years?
5. Machinery ₹5,00,000 depreciating 20%/yr reducing balance → book value after 2 y?

**Why this matters:** gears, chains and mirrors — three moves that convert 90% of "advanced" CI questions into two multiplications.

**🔑 Lab answers:** (1) 2,00,000 × 1.1025 = **₹2,20,500** (2) ×1.10381 = **₹2,20,762.6**; quarterly beats annual by ₹762.6, half-yearly by ₹500 (3) 50,000 × 1.2544 × 1.1 = 50,000 × 1.37984 = **₹68,992** (4) 72/9 = **8 years**; 72/8 = **9%** (5) 5,00,000 × 0.8² = **₹3,20,000**.

## 💪 Exercises
1. ₹1,00,000 @ 8% p.a. half-yearly, 1 year → maturity and the frequency bonus vs annual.
2. Order these by payout (no full computation): annual 10.4% · half-yearly 10.2% · quarterly 10.1%. Justify in two lines via effective yields.
3. Hybrid chain: ₹80,000 @ 10% CI for 2 y, rate revised DOWN to 4% for year 3 → amount.
4. Hybrid chain II: ₹1,00,000, CI 10% for 1 y, then SI 10% for 1 y → amount. Why is this less than ×1.21?
5. 72-club fill-ins: doubles in 24 y ⇒ ____%; 7% ⇒ ____y (approx); triples ⇒ use ____ (hint: 114).
6. Second-hand iPhone ₹60,000 losing 25%/yr reducing balance — value after 2 y. Flat-melt victim said ₹30,000; who's right?
7. Which is worth more at 12% for 2 years: half-yearly compounding or annual compounding + a ₹500 kicker? Compute both (P = ₹1,00,000).

### ✅ Selected answers
1. 1,00,000 × 1.04² = **₹1,08,160**; bonus = 160 − 0 = ₹160? No — annual pays ₹1,08,000, so the **frequency bonus = ₹160** (interest on the ₹4,000 mid-year serving).
2. Half-yearly 10.2% → effective = 5.1%²-rested: 10.460; quarterly 10.1% → 2.525%/rest: ≈ 10.487; **quarterly 10.1% > half-yearly 10.2% > annual 10.4%?** check annual = 10.400 ⇒ order: **quarterly (10.487) > half (10.460) > annual (10.400)** — gears can out-earn headline rate differences; always convert to effective.
3. 80,000 × 1.21 × 1.04 = **₹1,00,672**.
4. 1,00,000 × 1.1 = 1,10,000; SI year: 1,10,000 × 10/100 = 11,000 → **₹1,21,000**… same as ×1.21! Coincidence? No: at year 2 the SI-on-new-base (1,10,000×0.1) equals CI's increment (11,000). The divergence starts year 3 — engines agree exactly once. Sneaky, and worth knowing before an exam builds a "they're equal" trap.
5. 72/24 = **3%**; 72/7 ≈ **10.3 y**; tripling constant **114** (114/r years).
6. 60,000 × 0.75² = 60,000 × 0.5625 = **₹33,750** — mirror engine wins; flat-melt under-prices by ₹3,750.
7. Half-yearly: ×1.1236 = **₹1,12,360**. Annual + kicker: ×1.2544 + 500 = **₹1,25,940**. Kicker annihilates — small cash bonuses beat basis points surprisingly often; do the chain, not the vibe.

## ❓ Quiz
1. ₹10,000 at 10% p.a. compounded HALF-YEARLY for 1 year grows to:
   - (a) ₹11,000
   - (b) ₹11,025 — two rests at 5%; frequency splitting adds the second serving's ₹25
   - (c) ₹11,050
2. Rule of 72: money doubles in 6 years. The rate:
   - (a) 6%
   - (b) 12% — 72/6; the club pairs always multiply to 72 (12×6, 8×9, 24×3)
   - (c) 7.2%
3. A ₹2,00,000 delivery van depreciates 10% a year (reducing balance). Value after 3 years:
   - (a) ₹1,40,000
   - (b) ₹1,45,800 — ×0.9³ = ×0.729; depreciation is CI with a negative rate, never flat subtraction
   - (c) ₹1,34,000

### ✅ Answers
1. **(b)** — option (a) is annual-or-SI thinking; the gear shift is worth ₹25 on 10k and lakhs on ShopKart-scale money.
2. **(b)** — rate × years = 72, recite the pairs till they're reflexes.
3. **(b)** — option (a) melted ₹20,000 × 3 flat; reducing balance protects you on the resale app.

## ✅ Mastery checklist
- [ ] rate ÷ frequency, periods × frequency — I gear-shift without hesitation
- [ ] I compare offers by **effective yield**, not headline percent
- [ ] Hybrid tails: I chain factors (×1.21 × 1.05 = ₹1,27,050 canon) and never average rates
- [ ] The 72 club pairs (6·12, 8·9, 12·6, 24·3) answer me before my coffee does
- [ ] Depreciation = ×(1 − r)ⁿ mirror engine; flat-melt slander bounces off
- [ ] I know frequency gains shrink — confetti, not ammunition

**Next:** **INT4 · Installments & the Time Classics** — discounting ₹8,820×2 into a ₹16,400 principal, roll-forward audits, SI k-fold laws (R·T = 100(k−1)) and CI multiplier chains. Exam classics, executed cold! ⏳
