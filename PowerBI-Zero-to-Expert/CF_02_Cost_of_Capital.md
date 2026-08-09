# 🎯 CF2 · Cost of Capital — WACC From Zero
> Every decision in this course bows to one number: the **hurdle rate**. Invest below it and you burn value with a smiling P&L; measure it wrong and every NPV, EVA, and DCF downstream inherits the rot. CF2 builds ShopKart's WACC = **12.6%** from raw bolts — G-sec, beta, CAPM, the tax shield — then teaches the bluff-checks that expose fake WACCs in consultant decks.

## 🎯 Objectives
- Assemble cost of equity via **CAPM**: risk-free + beta × equity-risk-premium — and defend each input.
- Price cost of debt from the statements (interest ÷ average debt) and apply the **tax shield**.
- Fuse with weights into **WACC**, choosing book vs market weights like a professional.
- Use WACC where it belongs: hurdle, DCF discount, EVA benchmark — and nowhere it doesn't.
- Run the four bluff-checks that destroy sloppy decks (single-WACC-for-all-projects is the classic felony).

## 📘 Concepts

### 2.1 Why a supplier's credit is not your cost of capital
Cost of capital is an **opportunity rate**: what funders demand for *this risk, elsewhere*. Equity is dearest (last on the AC9 staircase, no fixed claim) — ShopKart's Ke ≈ 13.6%; debt cheaper (12.1% gross, 9.1% after its tax shield); trade credit deceptively dearest when the 2/10-net-30 discount is forfeited (37.2% annualized, AC6!). **Cheap-looking sources can be the most expensive; the staircase decides the price tag.**

### 2.2 CAPM — the equity invoice
`Ke = rf + β × ERP = 7.0% + 1.1 × 6.0% = 13.6%`
- **rf (7.0%):** 10-year Government of India security yield — the 'no-cash-risk' anchor; never a T-bill (maturity mismatch), never a fixed-deposit rate (bank credit inside).
- **β (1.1):** sensitivity to the market's swings. β > 1 amplifies (discretionary retail), β < 1 dampens (utilties), β = 0 ignores the market dance entirely. Regression slope of stock-vs-index returns; unlever/relever across comparables for precision (Course 9 territory, flagged).
- **ERP (6%):** the extra India-priced compensation for holding stocks over G-secs historically. Decks that quietly import a US ERP (~4.5%) or a heroic 9% are dressing the answer in the input.
Sanity lever: raising beta 1.1 → 1.3 lifts Ke to 14.8% — risk made arithmetic.

### 2.3 The tax shield — debt's only free lunch
Interest is deductible; dividends aren't. ShopKart: interest ₹2.3L on average debt ₹19L ⇒ **Kd = 12.1%** gross. At the 25.17% rate: after-tax Kd = 12.1 × (1 − 0.2517) = **9.1%**. The shield is REAL cash saved (interest expense cut taxable profit in AC3) — but it exists only while the firm has profits to shield against; a loss-making startup's shield is a coupon it can't redeem yet (deferred, not deleted).

### 2.4 Weights & the official WACC
Capital structure from the BS (ShopKart is private ⇒ book weights are honest here): D = 19, E = 63.4, total 82.4 ⇒ wD = 23.1%, wE = 76.9%.
`WACC = 0.769 × 13.6% + 0.231 × 9.1% = 10.46% + 2.10% = 12.6%`
**Golden rules:** listed firm ⇒ market-cap weights (book equity is nostalgia); use *target* structure for a multi-year DCF if leverage is gliding; never average 'industry WACC' for a firm with its own debt story.

### 2.5 The four bluff-checks (deck autopsy toolkit)
1. **Single WACC for every project?** A property arm and a payments arm inside one conglomerate carry different betas — one hurdle misprices both (risk-adjusted/divisional hurdles or GL).
2. **rf from a savings account / FD?** — bank credit risk snuck into the 'risk-free' leg.
3. **Tax shield applied to a perpetually loss-making firm?** — shield claimed before profits exist.
4. **WACC drifting yearly with share price noise in a stable firm?** — market weights fine, but refresh discipline: annual, not weekly-mood.

## 🧪 LAB — Hurdle forge (10 min)
1. Ke at beta 0.9 and beta 1.3 (rf 7%, ERP 6%)?
2. A rival borrows at 10% gross, tax 25.17%: after-tax Kd?
3. Build WACC: Ke 14%, after-tax Kd 8%, D:E = 30:70.
4. Hurdle screen at WACC 12.6%: Project A 15%, B 12.6%, C 11%. Verdicts + the rounding honesty on B.
5. Bluff-catch: a deck discounts a 20-year lease obligation at the *borrowing rate 9.1%* while growth projects get 12.6%. Steal or sense?

**Why this matters:** questions 1–3 are warm-up fare at treasury internships; 4–5 are where analysts separate from slide-polishers.

**🔑 Lab answers:** (1) 7% + 0.9×6% = **12.4%**; 7% + 1.3×6% = **14.8%** — one beta tenth = 60bp (2) 10 × 0.7483 = **7.48%** (3) 0.7×14 + 0.3×8 = **12.2%** (4) A ACCEPT (+2.4pp spread); B is exactly AT hurdle ⇒ NPV ≈ 0 ⇒ accept only with strategic evidence (option value), never on vibes; C REJECT (−1.6pp — EVA negative however handsome the gross margin) (5) SENSE: matching rate-to-risk — lease cash flows are debt-like obligations (discount debt-like), growth is equity-risky (discount risk-adjusted); the bluff is when someone discounts *equity-risky* cash at the 9.1% to inflate values.

## 💪 Exercises
1. Full ShopKart WACC build from raw canon (2.3 interest, 19 debt, 63.4 equity, beta 1.1, rf 7%, ERP 6%, tax 25.17%) — assemble without peeking at 2.4.
2. Ke sensitivity grid: beta {0.8, 1.0, 1.2} × ERP {5%, 6%, 7%} — nine cells, then mark the cell a bearish analyst would pick and why.
3. TechStart (no profits, Ke 22%, still borrows at 14%): compute its WACC properly and show why copying the 25.17% shield overstates its debt-cheapness.
4. Weight-choice viva: listed FMCG trades at 30× book; its deck used book weights. Direction of the WACC error and the fix, in two lines?
5. Divisional hurdle memo: ShopKart's online grocery line is riskier (β 1.35). Compute its Ke and the divisional WACC (same 23:77 D:E), then kill a 13% online project that the blended 12.6% hurdle would have wrongly accepted.
6. Why is forfeiting the 2/10-net-30 discount (37.2% annualized) *above* WACC yet sometimes taken? Assemble the treasury answer (liquidity vs rate) in 3 lines.
7. "WACC 12.6% means investors demand 12.6% yearly returns." Correct this common misquote into the precise version a CFO would sign.

### ✅ Selected answers
1. Ke 13.6%, Kd-after-tax 9.1%, weights 76.9/23.1 ⇒ **WACC ≈ 12.6%** ✓ — the canon hurdle.
2. Grid rows (β): 0.8 → 11.8/12.8/13.8; 1.0 → 12.0/13.0/14.0; 1.2 → 12.2/13.2/14.2. Bear picks β1.2 × ERP7% = 14.2%: higher hurdle, lower DCF, caution embedded in the input — declare it, don't smuggle it.
3. WACC with shield ≈ 0: use D weight × 14% (suspended shield) + E × 22% → at 30:70 = 19.6%; granting the shield gives 18.3% — a fake 130bp discount on loss years where no tax exists to reduce.
4. Book weights overweight cheap debt ⇒ WACC *understated* ⇒ too many projects'pass' — fix: market-cap weights, refresh annually.
5. Ke-division = 7 + 1.35×6 = **15.1%**; divisional WACC = 0.77×15.1 + 0.23×9.1 = **13.7%**; the 13% project dies there (spread −0.7pp) though it would have cruised past 12.6% — this is exactly how conglomerates rot quietly.
6. Liquidity hoarding in a genuine cash crisis beats rate-optimization; a one-quarter OD-crunch can make 37.2% the *cheapest available* option; the sin is taking it *habitually* while holding 12% headroom — policy, not panic.
7. "12.6% is the *risk-matched opportunity rate* on the blended capital — what an equally risky alternative promises TODAY; nobody demands it yearly, some years pay more, some less, and the market never signed anything."

## ❓ Quiz
1. ShopKart's CAPM build (rf 7%, β 1.1, ERP 6%) prices equity at:
   - (a) 12.1%
   - (b) 13.6% — risk-free anchor plus beta-titled market premium; equity stands last on AC9's staircase and invoices accordingly
   - (c) 9.1%
2. After-tax cost of ShopKart's debt (12.1% gross, 25.17% tax):
   - (a) 12.1% — deduction is a myth
   - (b) ≈ 9.1% — interest cuts taxable profit, so the exchequer co-pays a quarter of every EMI; the shield is real only where profits exist to shield
   - (c) 15.2%
3. The canon WACC (76.9% equity @13.6%, 23.1% debt @9.1%):
   - (a) 10.5%
   - (b) ≈ 12.6% — the hurdle every NPV, EVA and DCF ahead will bow to; a 130bp error here rewrites crores of valuation downstream
   - (c) 14.8%

### ✅ Answers
1. **(b)** — 7 + 6.6; option (a) is debt, option (c) is debt-after-shield — three rungs, three prices.
2. **(b)** — shield = rate × tax; memorize it as 'the government co-signs a quarter of the coupon'.
3. **(b)** — weighted by how the firm is actually funded; (a) reversed the weights, (c) used the beta-1.3 shadow.

## ✅ Mastery checklist
- [ ] CAPM narrated input-by-input with commentary (G-sec not FD; beta tenth = 60bp; ERP is an input, an opinion)
- [ ] Kd pulled from statements (interest ÷ average debt) and shielded correctly — shield suspended for loss-makers
- [ ] WACC assembled; book-vs-market weight rule recited; divisional-hurdle logic explained
- [ ] Four bluff-checks applied to any deck in under two minutes
- [ ] Hurdle screen verdicts spoken with spread language (+/- pp), not adjectives
- [ ] "WACC is an opportunity rate, not a yearly demand memo" — misquote corrected cold

**Next:** **CF3 · Capital Structure — Debt's Bargain & the Pecking Order** — MM's pizza logic, the VL = VU + tD bargain, distress costs, why ShopKart's RE→loan→never-equity path was textbook, and the promoter-pledging spirals that sink Indian midcaps! 🏗️
