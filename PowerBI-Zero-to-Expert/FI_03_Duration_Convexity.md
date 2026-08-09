# 🎯 FI3 · Duration & Convexity — One Number Runs the See-Saw
> FI2 priced the see-saw cell by cell. FI3 hands you the desk’s shortcut: a single number — modified duration — that estimates any bond’s price move for any rate move, in your head, mid-meeting. Canon: the 8% 5-year bond carries Macaulay 4.312, modified 3.993, so +1% yields ≈ −3.99% price — and the residual error (₹961.10 actual vs ₹960.07 linear) is convexity’s small kindness, +0.11%, which we’ll price too. Welcome to the language every debt-fund factsheet and RBI commentary actually speaks.

## 🎯 Objectives
- Define Macaulay duration as the PV-weighted average waiting time to your money, and compute it for the canon bond.
- Convert Macaulay → modified duration and use ΔP/P ≈ −ModD × Δy across the ±0.5% and ±1% grid.
- Compute convexity (21.05) and add its correction term −ModD × Δy + ½ × C × Δy² — prediction ₹961.13 vs actual 961.10.
- Rank any two bonds’ rate sensitivity by the four drivers: maturity, coupon, yield level, frequency.
- Know where duration LIES (big moves, curve twists, callable/credit bonds) and which tool patches each lie.

## 📘 Concepts

### 3.1 Macaulay duration — when does the money REALLY arrive?
Weight each cash-flow date by that flow’s share of today’s price: **MacD = Σ t × PV(CF_t) / Price**. The canon bond at y = 8%: PVs 74.07, 68.59, 63.51, 58.80, 735.03 → time-weighted 74.07, 137.17, 190.52, 235.21, 3,675.17 → Σ = 4,312.1 → **MacD = 4.312 years**. Interpretation: although legal maturity is 5, your money’s centre of gravity sits at 4.312 — the bond “feels” rate moves like a 4.312-year single payment. That is why duration, not maturity, is the risk clock.

### 3.2 Modified duration — the price sensitivity dial
**ModD = MacD / (1 + y) = 4.312 / 1.08 = 3.993.** Now the desk law: **ΔP/P ≈ −ModD × Δy**.
- Yields +1% → −3.99% → ≈ ₹960.1 (actual ₹961.10 — off by a rupee)
- Yields −1% → +3.99% → ≈ ₹1,039.9 (actual ₹1,041.00)
- Yields +0.25% (one RBI step) → ≈ −1.0% — a full year-quarter of coupon, repriced in an afternoon.
Rule of the arena: **ModD ≈ the % you lose per +1% of yield**. Factsheet says duration 6.8? Your position bleeds ~6.8% if the curve parallel-shifts +1%. No calculator needed — that’s the whole point of the number.

### 3.3 Convexity — the curve’s correction, priced
Linear duration misses because the price curve bends. **Convexity C = Σ t(t+1) × PV(CF_t) / (P × (1+y)²) = 21.05** here, and the full machine: **ΔP/P ≈ −ModD × Δy + ½ × C × Δy²**.
- +1%: −3.993% + 0.105% = **−3.887% → ₹961.13 predicted vs 961.10 actual** — two paise from perfect.
- −1%: +3.993% + 0.105% = **+4.098% → ₹1,040.98 vs 1,041.00 actual**.
Convexity is ALWAYS additive for the holder — gains padded, losses trimmed — the quantified proof of FI2’s “secret kindness.” Battle reading: at small moves (±10–25bp) duration alone is fine; at ±100bp, refusing the convexity term is how desks misprice their own risk by a visible margin.

### 3.4 The four duration drivers
1. **Maturity ↑ → duration ↑** (money sits farther out; 10y gilts run ~6.7+ vs our 4.3).
2. **Coupon ↑ → duration ↓** (front-loaded cash pulls gravity forward; zero-coupon bonds score duration = maturity, the max).
3. **YTM ↑ → duration ↓** (high yields shrink far-flow weights).
4. **Frequency ↑ → duration ↓** slightly (semi-annual pays half-earlier).
Desk shortcut: “long, low-coupon, low-yield = twitchy.” An FD-like 1y paper barely flinches (ModD ~0.9); a 30y G-Sec swings like a small-cap (ModD 12+).

### 3.5 Where duration lies — and the patch
- **Big parallel jumps:** patched by convexity (above).
- **Non-parallel curves** (2y up, 10y flat): one ModD can’t see shape — use key-rate durations (a duration per curve node).
- **Callable/puttable bonds:** the issuer’s option truncates your cash flow when yields fall — effective duration COLLAPSES exactly when you’d want it; use option-adjusted duration.
- **Credit spreads:** corporate prices move on spread AND G-Sec yield — portfolio risk = rates duration + spread duration (FI6 splits them).
Duration is a brilliant first derivative with honest disclaimers; professionals quote it WITH its assumptions the way doctors quote dosages with the patient’s weight.

## 🧪 LAB — Sensitivity lab (10 min)
1. Compute ModD’s damage preview: factsheet bond fund, ModD 6.1, ₹10L invested. RBI +50bp cycle: approximate NAV hit? Including a ~1.8% half-year of accrual, the 6-month print?
2. Rebuild MacD’s numerator for the canon bond using the PVs in §3.1 and confirm 4.312.
3. Convexity correction at +2%: linear says −7.99% (₹920.1); add ½ × 21.05 × 0.02² and compare against the actual ₹924.18.
4. Ranking drill: order by ModD (no calc, drivers only): (a) 8% 5y, (b) 8% 10y, (c) 4% 5y, (d) 8% 1y. Then state the twitchiest portfolio: long/low-coupon or short/high-coupon?
5. Factsheet autopsy: a “low-risk” income fund shows ModD 7.2. Your client panicked at a −3.5% quarter. Was the fund mis-sold, mis-read, or honestly labelled? Write the 3-line answer.

**Why this matters:** item 1 is the calculation clients PAY advisors to do softly before markets do it loudly; item 5 is the sentence that keeps redemption letters from being written at the bottom.

**🔑 Lab answers:** (1) −6.1 × 0.5% = **−3.05% MTM ≈ −₹30,500**; with +1.8% accrual the print ≈ **−1.25% for 6 months** — a bill, not a bomb, IF the money’s horizon exceeds ~6 years (the duration) (2) (74.07×1 + 68.59×2 + 63.51×3 + 58.80×4 + 735.03×5) = 4,312.1 ÷ 1,000 = **4.312 ✓** (3) half-convexity adds 0.5 × 21.05 × 0.0004 = +0.42% → **−7.56% → ₹924.4 vs actual ₹924.18** — the curve correction earns its salary at big moves (4) **b > c > a > d**: maturity dominates, then coupon (4% front-loads less); the twitchy book is long-maturity, low-coupon — duration is gravity’s address (5) honestly labelled BUT mis-read: ModD 7.2 in a +50bp quarter guarantees ≈ −3.6% MTM; “low-risk” meant credit-clean, not rate-immune — the client needed a ModD ~1 fund for a 1-year horizon: match duration to horizon, not adjectives to feelings.

## 💪 Exercises
1. Zero-coupon special: a 5y zero at 8% yield — show MacD = 5.000 exactly and ModD = 4.63; then rank it vs the canon bond and explain the single structural reason.
2. Repair-the-lie gallery: for each scenario pick duration-alone, +convexity, key-rate durations, or option-adjusted: (a) +15bp shift, (b) +150bp cycle, (c) 2y up/10y down twist, (d) callable PSU bond rally.
3. Duration matching warm-up: child’s college bill ₹25L due in 6 years — which of these is the natural fund choice and why: ModD 1.1 liquid fund, ModD 5.8 corporate bond fund, ModD 8.9 gilt long fund?
4. Two-bond shootout: Bond A 5y 8% (ModD 3.99), Bond B 5y 4% (ModD 4.35). Both yield +60bp tonight: approximate % damage for each and name the driver that made B twitchier.
5. Portfolio duration: 60% canon bond (3.99) + 40% zero of exercise 1 (4.63): book ModD, and the NAV print if yields −75bp (convexity ignored then acknowledged).
6. The ₹1-crore question: your treasury holds ₹1Cr of ModD-7 gilts for a 2-year parking need. Quantify a realistic adverse year (+1%) and rewrite the mandate in one line using duration-horizon matching.
7. Interview forge: “Is high duration good or bad?” — answer in 5 numbered lines as a desk head would (context, horizon, view, funding, and the asymmetry rider).

### ✅ Selected answers
1. All PV weight sits at t=5 → MacD = (5 × PV)/PV = **5.000**; ModD = 5/1.08 = **4.63** — vs the coupon bond’s 3.99: same maturity, MORE twitch, because coupons brought cash gravity forward. Structural reason: **timing of cash, not the label of maturity.**
3. ModD 5.8 corporate bond fund: horizon ≈ duration, so rate shocks and pull-to-par roughly heal by the bill date; the 1.1 fund wastes return, the 8.9 fund is a bet on rates wearing a tuition costume. Rule: **match ModD to the liability’s distance; shorter horizon → shorter duration, no exceptions for “safe-looking” names.**
4. A: −3.99 × 0.6% ≈ **−2.4%**; B: −4.35 × 0.6% ≈ **−2.6%**. Driver: coupon size — B’s smaller coupons leave more weight in the year-5 bullet, pushing gravity outward.
6. +1% on ₹1Cr × ModD 7 = **−₹7L MTM** for money needed in 24 months — the parking lot was built on a racetrack. Mandate: *for 2-year money, cap portfolio ModD ≈ 2; yield beyond that is rented risk, not earned return.*
7. 1) Duration is a LEVER, not a virtue. 2) High ModD is good when you forecast falling yields AND carry horizon ≥ duration. 3) It’s bad when parking short money or when the curve can twist (key-rates). 4) With leveraged funding, high duration is a margin call with a date of arrival. 5) Remember the rider: convexity pays holders a small kindness on big moves — but kindness is not an underwriting standard.

## ❓ Quiz
1. The canon bond (MacD 4.312 at y 8%) carries modified duration:
   (a) 4.312
   (b) 3.993 — divided by (1 + y): the price-move dial, meaning +1% yields ≈ −3.99% price; Macaulay is the clock, modified is the damage meter
   (c) 4.634
2. With convexity 21.05, a +1% shift is predicted at −3.887% and the market prints −3.890%. The gap teaches:
   (a) duration failed
   (b) duration + convexity nails big moves within paise (₹961.13 predicted vs ₹961.10 actual) — duration is the straightedge, convexity the curve’s confessed bend, and skipping the bend is a choice, not a mystery
   (c) convexity failed
3. The twitchiest bond in any room is usually:
   (a) short maturity, fat coupon
   (b) long maturity, low coupon — cash gravity parked farthest out, so every rate step compounds against deeper money; zero-coupons are the extreme: duration EQUALS maturity, the maximum possible
   (c) the AAA one

### ✅ Answers
1. **(b)** — 4.312/1.08 = 3.993; (a) is the clock, (c) belongs to the zero-coupon.
2. **(b)** — two paise of model error on a 1% shock; that’s what a corrected first-principle model looks like.
3. **(b)** — gravity distance rules; credit rating changes DEFAULT risk, not rate physics.

## ✅ Mastery checklist
- [ ] I can compute MacD and ModD for a plain bond and state both interpretations (clock vs damage meter).
- [ ] I can preview any rate move with −ModD × Δy in my head.
- [ ] I can add the convexity term and explain why it always helps the holder.
- [ ] I can rank bonds by sensitivity using the four drivers without a calculator.
- [ ] I can name the three situations where duration lies and the patch for each.

**Next:** FI4 · The Yield Curve & the Central Bank — normal, flat, inverted: reading the economy’s ECG and the RBI machinery that draws its short end.
