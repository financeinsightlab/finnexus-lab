# 🎯 FI7 · Bond Portfolio Engineering — Ladders, Barbells & the Immunization Lock
> Single bonds are instruments; portfolios are MACHINES. FI7 builds the three chassis the pros actually run — the ladder (cash flows arriving on schedule whatever rates do), the barbell/bullet (positioning shape for a curve view), and immunization (locking a liability so rate moves cancel themselves). Canon build: ₹10L across five 1–5y rungs; and the grand lock: ₹40L of college money due in 6 years matched with ModD-6 assets so a rate shock wounds nothing. This is where fixed income stops being prediction and becomes architecture.

## 🎯 Objectives
- Construct a ₹10L 5-rung ladder — rungs, rolling rule, income profile, and ModD (~2.5–2.9) — and explain its all-season logic.
- Choose between ladder, barbell, and bullet structures for a stated rate view (or stated ignorance).
- Run immunization: match asset ModD to liability horizon so price risk and reinvestment risk cancel.
- Engineer portfolio ModD as a weighted dial — and pre-compute the NAV print for ±1% before taking the position.
- Structure blend sovereign + credit sleeves with position limits (5% single name) so FI6’s default arithmetic stays survivable.

## 📘 Concepts

### 7.1 The ladder — humility’s best mechanical friend
Split ₹10L into five ₹2L rungs at 1/2/3/4/5y maturities (G-Secs, SDLs, target-maturity rungs, or quality NCDs). Every year one rung matures; you redeploy at the NEW 5y point. The machine: near-term cash arrives rain-or-shine, reinvestment averages every rate season (no single RBI year anchors your decade), and portfolio ModD parks around the ladder’s middle (~2.5–2.9) — the see-saw moves you, gently, never decisively. Ladders don’t predict rates; they make prediction unnecessary — which is why retirees, treasuries, and banks’ ALM desks all run some form of them.

### 7.2 Barbell vs bullet — when you DO have a view
- **Bullet:** all cash around one maturity (e.g., all 5y) — maximum conviction on one curve point; best when a liability lands there or you expect that segment to outperform.
- **Barbell:** short (1y) + long (10y) sleeves, nothing in the middle — keeps dry powder AND duration; thrives if the curve flattens (long rallies, short gives reinvestment).
- **Ladder:** the anti-view — spreads chips across all points, harvesting roll-down everywhere, owning no prediction.
Rule from the FI4 ECG: steep curve favours bullets-at-value and roll-down; flat/uncertain favours ladders; conviction-flattening favours barbells. Structure IS the opinion — pick one, and the market can read your mind off your maturity map.

### 7.3 Immunization — the rate-cancel machine
Liabilities have durations too. Match asset ModD to liability horizon and the two risks cancel: rates UP → asset price falls BUT reinvestment of coupons/maturities earns more (and the liability’s present cost shrinks the same way); rates DOWN → mirror. Canon lock: college bill **₹40L due in exactly 6 years**. Buy a sleeve with ModD ≈ 6 (e.g., a 6y target-maturity gilt fund). Then: rates +1% → assets mark −6% tonight, but the remaining cash redeploys richer and, more importantly, the LIABILITY’s funding need in today’s rupees also marked down — the funded ratio holds ≈ steady through the shock. Maintenance: re-balance yearly because asset duration decays faster than liability duration (duration drifts; the lock needs an annual key turn). This is how pension desks and insurance ALM sleep — and how a parent guarantees a fee without a prediction.

### 7.4 The ModD dial — portfolio sensitivity as a choice
Portfolio ModD is the holding-weighted average: 50% × 2 + 30% × 5 + 20% × 7 = **4.7** — the dial you actually own, whatever the labels say. Desk rule: (1) DECIDE the dial from horizon and tolerance FIRST (e.g., parking money ≤ 1, goal money ≈ liability distance, play money = your conviction), (2) THEN fill sleeves to hit it, (3) pre-compute tonight’s print: ModD 4.7 × ±1% = **±4.7% ± convexity padding** — write it on the ticket before you buy, so a rate day can never surprise a decision you already made. Funds do this via blended factsheet duration; you can see an entire debt fund’s mind by its disclosed ModD and average maturity.

### 7.5 Blending sleeves — sovereign spine, credit muscle
Professional retail architecture: G-Sec/SDL/target-maturity sleeve as the SPINE (core duration, no default question) + an NCD/credit sleeve as MUSCLE (FI6’s fear-rent), with position limits that keep arithmetic survivable: single corporate name ≤ 5% of portfolio → a 60%-LGD event costs ≤ 3% of book — a bad year, not a funeral. Liquid/overnight sleeve as the BUFFER (redemptions, rungs, opportunities) — duration ~0 rebuts rate weather entirely. Three sleeves, three jobs, one dial: residency for the spine, analysis-priced risk for the muscle, patience for the buffer.

## 🧪 LAB — The build bay (10 min)
1. Ladder print: your ₹10L 5-rung G-Sec ladder, rung ModDs 0.95/1.85/2.7/3.5/4.3 — portfolio ModD? Print for +50bp?
2. Bullet vs ladder: RBI cycle genuinely uncertain, your horizon 5y flat — which chassis and which three reasons?
3. Immunization check: the ₹40L college lock (ModD ≈ 6). Rates fall −1%: trace BOTH sides (asset mark, reinvestment of remaining flows) and state the funded-status outcome.
4. Dial problem: spine ₹6L (ModD 4.0), muscle ₹3L AA/AAA NCD sleeve (ModD 3.2, spread ≈ +150bp), buffer ₹1L liquid (0.08). Portfolio ModD and the tonight-print for +75bp parallel?
5. Survival limit audit: muscle holds 6 names equally. One defaults, LGD 60%: book-level loss? Conform to the ≤5% rule? And the spread income that pays for it at +150bp on the muscle?

**Why this matters:** item 3 is the calculation that turns market panic into a shrug for goal money; items 4–5 are the two lines every risk committee wants pre-computed.

**🔑 Lab answers:** (1) average of equally-weighted rungs: (0.95+1.85+2.70+3.50+4.30)/5 = **2.66**; +50bp → ≈ **−1.33% ≈ −₹13,300** — the ladder’s whole weather report, gentle by design (2) **ladder**: horizon exactly 5y, cycle unknowable, so own no view: rungs re-fire at every future rate, roll-down earned at every curve point, regret mathematically minimized in every scenario (3) asset marks **+6%**; coupons/money-to-redeploy now earn LESS (reinvestment drag) — the two offset by construction, so funded status ≈ unchanged; the lock held because duration, not hope, was matched (4) (6×4.0 + 3×3.2 + 1×0.08)/10 = (24 + 9.6 + 0.08)/10 = **3.368 ≈ 3.37**; +75bp → ≈ **−2.53%** MTM — written before the trade, survived after it (5) 3L/6 = ₹50,000 per name × 60% = **₹30,000 = 0.30% of the ₹10L book** — comfortably inside the 5% single-name rule; muscle spread ≈ 3L × 1.5% = **₹4,500/yr**, so one default consumes ≈ 6.7 years of sleeve rent — survivable, sized, and priced: the architecture did its job.

## 💪 Exercises
1. Ladder architect: ₹20L household debt portfolio, 4-year max horizon allowed, sovereign-only: specify rungs, instruments, rolling rule, expected ModD band, and the worst-print disclaimer for +1%.
2. Chassis triage: assign ladder/barbell/bullet AND the 3-line reason for: (a) pension desk matching yearly payouts, (b) macro fund expecting 10y–2y flattening, (c) ₹30L wedding fund due month 36, (d) young saver with no view and 7y horizon.
3. Immunization run-book: niece’s engineering fees ₹8L due 5 years: sleeve choice, acceptable ModD band, the annual re-key rule, and the failure mode if the family “temporarily” moves it to an equity fund for returns.
4. Dial surgery: book is 40% gilt fund (6.8) + 40% credit fund (3.1) + 20% liquid (0.08). Compute ModD; client demands ≤ 3.5 without selling the credit sleeve — prescribe allocations.
5. Spread-survival math: muscle 25% of book at +180bp, 8 names equal; worst year = 2 defaults at 60% LGD. Book-level loss, years of sleeve rent consumed, and the sizing lesson vs FI6’s 25-year single-name lesson.
6. Roll-down enhancement: steep curve season (FI4) — draft the 1-page memo adding a 5y→4y roll-down gilt sleeve on top of a ladder: carry math, slide math, break-even parallel shift (use ModD 4 and 20bp slide) and the disclaimer.
7. Interview forge: “Should a 60-year-old own only FDs?” — answer in 6 numbered lines as a wealth CIO: inflation, ladder logic, MTM honesty, DICGC limits, taxation, and the single condition where pure-FD is right.

### ✅ Selected answers
2. (a) **bullet series/immunization ladder** — each payout year gets matched duration; prediction-free by law. (b) **barbell** — long 10y rallies on the flatten while the 1y sleeve reloads; the structure IS the flattening bet. (c) **bullet at ~3y** (or a 3y target-maturity) — liability distance dictates; ladder would strand rungs past the wedding. (d) **ladder into 5–7y** or a cheap target-maturity fund — no view → own structure, not forecasts; youth’s risk budget belongs in equity sleeves, not in gilts heroics.
4. ModD = 0.4×6.8 + 0.4×3.1 + 0.2×0.08 = 2.72 + 1.24 + 0.016 = **3.976 ≈ 3.98** — over budget. Prescription (credit sleeve untouched at 40%): solve 0.4×3.1 + x×6.8 + (0.6−x)×0.08 ≤ 3.5 → x ≈ ≤ 32% gilt fund → **~32/40/28 (gilt/credit/liquid)** — the dial moves via the LONG sleeve, never via labels.
5. Two defaults: 2 × (25%÷8) × 60% = **3.75% of the book** — a bad quarter, not a crisis; sleeve rent 0.25 × 1.8% = 0.45%/yr → ≈ 8.3 years of muscle income consumed, vs FI6’s 25 years under a 100% single-name. Lesson: diversification doesn’t raise yield — it compresses the LEFT TAIL until analysis and spreads can out-earn it.
7. 1) Inflation is the silent senior creditor — 7% nominal minus 7% inflation is a zero-real decade. 2) A G-Sec/target-maturity ladder supplies the income WITHOUT that surrender, at matched duration. 3) MTM marks weather, not default; with rungs maturing yearly, weather cancels. 4) DICGC protects only ₹5L per bank — above it, FDs are unsecured bank credit. 5) Interest is slab-taxed either way (post-2023 debt funds the same) — so taxation no longer rescues the FD case. 6) Pure-FD is right ONLY when horizon < 1y or volatility tolerance is truly zero — a medical fact about the client, not a virtue of the product.

## ❓ Quiz
1. Your 5-rung ladder shows ModD 2.66. A parallel +50bp prints about:
   (a) −2.66%
   (b) −1.33% — half the shift × the book’s dial; the ladder’s design promise is exactly this: weather exists, disasters don’t, because no single rate season anchors the whole story
   (c) −0.66%
2. Immunizing a ₹40L 6-year liability works because:
   (a) gilt funds guarantee returns
   (b) matching asset ModD (~6) to liability distance makes price risk and reinvestment risk trade punches — rates up wounds the mark but enriches redeployment while the liability’s present cost shrinks in step; the lock is mechanical, re-keyed yearly as durations drift
   (c) the liability is nominal
3. A 60/40 spine-muscle book with spine ModD 4.0 and muscle 3.2 runs a dial of:
   (a) 2.4
   (b) 3.68 — 0.6×4.0 + 0.4×3.2: the weighted dial is the one number a committee asks for, pre-computed on every ticket before the trade, so +1% prints (−3.68%) were agreed to before they occurred
   (c) 7.2

### ✅ Answers
1. **(b)** — 2.66 × 0.5% = 1.33%; (a) forgot the shift size, (c) halved twice.
2. **(b)** — guarantees live in duration-matching, not in words printed on factsheets.
3. **(b)** — dials average; (c) added them, which only makes sense on a quiz, never a desk.

## ✅ Mastery checklist
- [ ] I can specc a ladder — rungs, rolling rule, ModD, print disclaimer — for any corpus.
- [ ] I choose ladder/barbell/bullet from horizon and view, in writing, before positions.
- [ ] I can immunize a dated liability and name the annual re-key rule.
- [ ] I compute the book’s ModD dial and its ±1% print pre-trade, every time.
- [ ] My credit muscle obeys the ≤5% single-name survival limit with rent math attached.

**Next:** FI8 · CAPSTONE — The Bond Desk: ₹50L client book, full allocation, YTM and ModD audit, a +1% rate shock and a live credit default, handled — plus the interview forge.
