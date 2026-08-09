# 🎯 PM3 · CAPM & Beta — The Model Every Desk Actually Speaks
> Ask any analyst what return a stock "should" give and the answer secretly runs CAPM: risk-free rate plus beta times the market premium. Rf 7% + β 1.3 × market premium 5% = 13.5% required — the stock delivers 15%, so alpha +1.5%: two numbers, one sentence, a million Bloomberg terminals. PM3 explains beta (the systematic exposure dial), builds the Security Market Line, defines alpha HONESTLY (residual after β's work, not marketing's), and teaches the model's known diseases so you can prescribe it without worshipping it. After DCF (CF7) gave Ke a number, this module gives Ke a theory.

## 🎯 Objectives
- Compute beta as systematic sensitivity: β = ρᵢₘ σᵢ/σₘ — and read 0.8 / 1.0 / 1.3 / 1.8 cards fluently.
- Build the SML: E(Rᵢ) = Rf + βᵢ(Rm − Rf) — canon: 7 + 1.3×5 = 13.5% → price stocks as under/over the line.
- Split returns into β-work and alpha: alpha = actual − required = 15 − 13.5 = **+1.5%** — and say alpha only after the model is declared.
- Diagnose CAPM's diseases: single factor, backward-looking β, unstable regimes, Roll's critique — the honest asterisks.
- Connect Ke to WACC: CAPM as CF8's cost-of-equity engine (13.6% ShopKart era vs our 13.5% canon — same machine).

## 📘 Concepts

### 3.1 Beta — one regression, three interpretations
βᵢ = Cov(Rᵢ, Rₘ)/Var(Rₘ) = **ρᵢₘ × σᵢ/σₘ** — slope of stock-vs-market returns. Three readings: (1) **amplification:** β 1.3 ≈ the stock moves ~1.3× the market's move on systematic days; (2) **systematic share:** with R², how much of total risk is market-driven (idiosyncratic residue is the PM1-unpaid part, diversifiable); (3) **required-return dial:** the SML input. Reading cards: utilities/consumer staples 0.5-0.8 (defensive — fall less in storms), index itself = 1.0, private banks/consumer ~1.0-1.2, smallcaps/capex-cyclicals/real estate ~1.3-1.8 (rocket fuel both directions). Estimation hygiene: 2-5y weekly data standard; β DRIFTS as businesses change (a deleveraged cyclical's 2019 β ≠ 2025 β) — treat it as a weather report with a date, not a birth certificate.

### 3.2 The Security Market Line — the fair-wage line for risk
**E(Rᵢ) = Rf + βᵢ × (Rm − Rf).** Everything on the line earns a fair wage for its systematic risk; above the line = underpriced (returns more than required), below = overpriced. Canon: Rf 7%, market premium (Rm − Rf) 5%: β 0.5 → 9.5%, β 1.0 → 12.0%, **β 1.3 → 13.5%**, β 1.8 → 16.0%. The CML grandfather (for whole portfolios) prices total σ; the SML prices β for ANY asset — the distinction PM1 earned: only SYSTEMATIC risk draws a wage, so a wild stock with β 0.9 and σ 40% gets paid like 0.9 — its extra σ is unpaid idiosyncratic noise the market assumes you'll diversify. DCF weld: shop this E(Rᵢ) into CF8's WACC as Ke — WACC 12.6% at ShopKart began life as a CAPM sentence (Ke = 7 + 1.1 × 6 = 13.6% era) — same machine, different fuel numbers.

### 3.3 Alpha — the honest remainder
**α = actual return − required return** = 15% − 13.5% = **+1.5%** in the canon — the skill/luck leftover AFTER β's heavy machinery is paid. Alpha discipline, three laws: (1) alpha is RELATIVE TO THE MODEL — declare factors first (CAPM-only alpha shrinks once value/size/momentum factors are admitted; much "alpha" is just β wearing costumes); (2) alpha is zero-sum BEFORE costs — for every buyer's +1.5% some seller holds −1.5%, and fees take a cut from both (Sharpe's arithmetic of active management, IN2 6's fee-drag echo); (3) alpha decays with capacity and publication (PM2's capacity revenge) — if a formula prints reliably on CNBC, it stops printing. Treasure language: only call something alpha when it survives β-adjustment, factor-adjustment, costs, and a full cycle — the four tax collectors of skill-claims.

### 3.4 The model's diseases — prescribe, don't worship
- **Single factor:** markets price more than β (small size, value, momentum earn documented premia — Fama-French lives next door); CAPM's E(R) is a first approximation, not a court verdict.
- **Backward-looking β:** regressed on history, deployed on the future; regime shifts (deleveraging, business-model pivots) break continuity.
- **Roll's critique:** the true "market portfolio" (ALL assets incl. human capital, unlisted) is unobservable — we test the model against a proxy (NIFTY), so the test is of model+proxy jointly.
- **Positive-β paradox / low-vol anomaly:** low-β stocks historically beat high-β per unit risk (leverage-aversion story) — an embarrassment CAPM taught us to find, like good science does.
Prescription: use CAPM for Ke discipline (DCF), for quick SML sanity checks (is this stock priced above/below its risk-wage?), and for alpha-accounting language — with the asterisks read aloud every time.

### 3.5 Beta in portfolio practice — the desk's daily use
- **Portfolio β** = weighted average of constituents (no cross-terms — that's σ's drama): 60% β1.1 equity + 30% β0.3 debt-proxy + 10% β0 gold ≈ 0.75 — the book's total systematic lever, steerable WITHOUT selling (futures overlay: DV3's hedge machine reduces β fast).
- **Tactical beta calls:** expect storm → lower β (sell high-β names, add staples/short duration, index-futures hedge); expect clarity → raise β. The honest record: beta-timing is a FORECAST game — BF6's discipline asks whether your 10-year log shows beta calls beating dumb-allocation, and for most it doesn't.
- **Fund language:** "high-octane fund" = β 1.2 marketing; "low-vol fund" = β 0.7 strategy — decode ads into SML coordinates before paying TERs for slope you could buy free with an index and a dial.

## 🧪 LAB — SML desk (10 min)
1. Card build: regress-lite: stock σ 28%, σₘ 16%, ρ 0.7 → β? What required return at Rf 7%, premium 5%?
2. Line placement: stock T β 1.1 returns 14.5% actual; stock U β 1.4 returns 13.0%: place both vs the SML (required for each), declare under/over, and the alpha of each.
3. Type-fit: assign rough βs with reasons: (a) ITC-class staple/tobacco hybrid, (b) new-age profitless tech, (c) PSU bank in rates-up cycle, (d) gold ETF.
4. Portfolio β: book holds 50% index (1.0), 30% high-β smallcap fund (1.4), 20% govvie sleeve (~0.1): book β? Market falls 10% — estimate the book's systematic-day move (both-way caveat in one line).
5. Alpha tax audit: a PMS claims "+4% alpha vs NIFTY" net 2% fees: apply the four tax collectors (β-adjust: fund β 1.25; factor tilt: smallcap-heavy; costs: after-fee already; cycle: 2-year bull window): re-announce the claim honestly.

**Why this matters:** item 2 is the fastest professional stock-screen in existence; item 5 is the sentence that saves clients from paying 2% for indexed slope with lace on it.

**🔑 Lab answers:** (1) β = 0.7 × 28/16 = **1.225 ≈ 1.23**; required = 7 + 1.225×5 = **13.1%** (2) T: required = 7 + 1.1×5 = 12.5% → actual 14.5% → **+2.0% ABOVE the line (underpriced-print, α +2.0)**; U: required = 7 + 1.4×5 = 14.0% → actual 13.0% → **below the line (α −1.0)** — the line, not the leaderboard, grades (3) (a) 0.5-0.7 defensive cash-machine (b) 1.5-1.9 — sensitivity to risk-appetite itself, no profits to anchor (c) 1.1-1.3 — net-interest-margin lever to the cycle + PSU volatility overlay (d) ~0.0-0.2 vs equity (its β lives vs real rates/dollars, EC6) (4) β = 0.5×1.0 + 0.3×1.4 + 0.2×0.1 = **0.94** → market −10% day prices ≈ **−9.4% systematic** on the book BEFORE idiosyncratic noise and the govvies' manners (caveat: betas measured in calm tapes underestimate co-movement in crash tapes — PM1's panic lesson) (5) re-announced: gross 4% − β-work (1.25−1)×5 = 1.25% − smallcap-factor era premium (~1-2% in bull windows) − already net of the 2% fee luck-window... honest sentence: "≈ +0.5-1.5% residual over one bull cycle — interesting, unpurchasable as a claim until the bear chapter files its report; monitor for factor-adjusted survival, not the ribbon."

## 💪 Exercises
1. β from scratch-lite: given monthly returns pairs (stock, market) {(4,3),(−2,−1),(6,4),(0,1),(3,2)}: compute means, then slope by the rise/run intuition of Cov/Var (approximate), and compare with ρσᵢ/σₘ logic qualitatively.
2. SML chart duty: plot required returns for β = 0, 0.5, 1.0, 1.5, 2.0 at Rf 7%, premium 5%: the table + the story of the line's slope = price of risk.
3. Ke bridge: take ShopKart's CF canon Ke 13.6% (Rf 7, β 1.1, premium 6): rebuild it, then discuss how WACC 12.6% follows once debt folds in — the full sentence linking PM3 to CF8's ₹37.4 DCF verdict.
4. Factor costume audit: fund beats NIFTY 3pp for 5y holding 60% in smallcaps valued at a premium-window: write the factor-declared alpha statement and the investor question it answers honestly ("what am I actually buying?").
5. Tactical-β diary design: construct the log columns (date, market view, book β before→after, instrument used, outcome after 30/90 days, lesson) so BF6's discipline can grade beta-timing claims over a decade.
6. Low-vol anomaly note: 5 lines on why β 0.7 stocks beating β 1.5 stocks per-unit-risk embarrasses CAPM, the leverage-aversion story behind it, and the fund-family product it spawned.
7. Interview forge: "CAPM is wrong — why do you still use it?" — 6 numbered lines (wrong vs useful, Ke discipline needs SOME wage line, the proxy caveat named, factor models as upgrades, beta as language even when imperfect, and the one situation you'd abandon it entirely).

### ✅ Selected answers
1. Means: stock (4−2+6+0+3)/5 = **2.2%**, market (3−1+4+1+2)/5 = **1.8%**; deviations produce Cov ≈ (1.8×1.2)+(−4.2×−2.8)+(3.8×2.2)+(−2.2×−0.8)+(0.8×0.2) / (n−1) = (2.16+11.76+8.36+1.76+0.16)/4 ≈ **6.05**; Varₘ ≈ (1.44+7.84+4.84+0.64+0.04)/4 ≈ **3.7** → β ≈ 6.05/3.7 ≈ **1.63** — cyclical-tilted card confirmed, and the two formulas (Cov/Var ≡ ρσᵢ/σₘ) rhyme because they're the same slope wearing different algebra.
3. Ke = 7 + 1.1 × 6 = **13.6%** ✓ canon; fold in Kd after-tax ≈ 9.1% at weights 76.9/23.1 → WACC ≈ 12.6%; CF8's DCF then prices ShopKart at ₹194L EV → ₹37.4/share vs ₹30 market — PM3's wage line for equity is literally the discount engine's steering wheel; change β's assumption and the ₹37.4 verdict moves (sensitivity: Ke ±1% ≈ EV ∓12-15%): required returns are investment's rent, and CAPM is the rent office.
7. 1) "Wrong" means approximations fail at edges; "useful" means SOME wage line for systematic risk is non-negotiable for disciplined Ke. 2) Without a required-return concept, DCFs become astrology and WACC a vibe. 3) Roll warns we test model+proxy jointly — we quote NIFTY-β with the asterisk. 4) Upgrades exist: multi-factor models (size/value/momentum/quality) absorb much of the error. 5) Beta survives as LANGUAGE — desks communicate systematic exposure in one number no alternative compresses as well. 6) I'd abandon it where the proxy is meaningless: unlisted/illiquid assets, startups (venture distress rates, not SML — CF course's different church).

## ❓ Quiz
1. A stock's β = 1.3 with Rf 7% and market premium 5% requires:
   (a) 12.0%
   (b) 13.5% — 7 + 1.3×5: the SML's fair wage; deliver 15% and alpha is +1.5% AFTER the line's work is paid, not before
   (c) 13.0%
2. The single most honest sentence about fund "alpha" is:
   (a) alpha = returns above NIFTY
   (b) alpha exists only after β-work, factor tilts, costs and a full cycle have each taken their cut — most marketed alpha is beta (or smallcap slope) wearing a costume; the four tax collectors never sleep
   (c) alpha compounds forever
3. Portfolio β over a book is:
   (a) impossible without full covariance
   (b) the simple weighted average of constituent βs (no cross-terms) — the book's systematic lever, steerable with overlays or sleeve swaps; the cross-term drama belongs to σ, not β
   (c) always below 1

### ✅ Answers
1. **(b)** — the wage lines; (a) forgot the amplification, (c) rounded faithlessly.
2. **(b)** — declared factors or it didn't happen.
3. **(b)** — β averages; σ passports through the cross-term border.

## ✅ Mastery checklist
- [ ] I compute β from σs and ρ and read any β card fluently.
- [ ] I place stocks above/below the SML and declare α correctly.
- [ ] I enforce the four tax collectors on every alpha claim.
- [ ] I bridge Ke (CAPM) → WACC → DCF without missing a link.
- [ ] I know CAPM's diseases and prescribe it at the right dosage.

**Next:** PM4 · The Efficient Frontier & Asset Allocation — Markowitz's map, the tangency portfolio, and the allocation decision that drives ~90% of the journey.
