# 🎯 PM1 · Diversification — The Only Free Lunch in Markets
> Two assets, each risky. Put them together and the COMBINATION can carry less risk than either alone — not through magic, but because they don't fall on the same days. Harry Markowitz mathematized this in 1952 and called diversification the only free lunch in markets: return per unit of risk, improved for free, forever, for anyone who measures correlation honestly. PM1 proves it with the course canon (60/40 of σ 15% + σ 25% at ρ 0.3 → portfolio σ 15.33% vs the naïve 19%), tours correlation's moods (and its dirty secret: correlations sprint to 1 in panics), and builds the layers every real portfolio wears.

## 🎯 Objectives
- State the free-lunch mechanism: portfolio σ falls below weighted-average σ whenever ρ < 1 — and quantify it with the two-asset formula.
- Run the canon: A (σ 15%, 60%) + B (σ 25%, 40%), ρ 0.3 → σₚ 15.33% vs 19% naive; ρ −0.2 → σₚ 12.04%.
- Decompose risk: idiosyncratic (diversifiable, UNPAID) vs systematic (market-wide, PAID) — why ~15-20 names kill the free-risk.
- Handle correlation's dark corners: estimation windows, crisis co-movement, and diversification that evaporates exactly when needed.
- Architect layers: asset-class, geography, factor, and time diversification — with Indian-market instruments for each.

## 📘 Concepts

### 1.1 The mechanism — prove it, don't believe it
Portfolio variance: **σₚ² = w₁²σ₁² + w₂²σ₂² + 2w₁w₂ρ₁₂σ₁σ₂**. The last term is where the lunch is served: if ρ < 1, the cross-term under-fills the (w₁σ₁ + w₂σ₂)² package, so σₚ < weighted average σ. Canon: A = index fund (σ 15%, 60%), B = midcap sleeve (σ 25%, 40%), ρ 0.3: σₚ² = 0.36×0.0225 + 0.16×0.0625 + 2×0.24×0.3×0.0375 = 0.0081 + 0.0100 + 0.0054 = **0.0235 → σₚ 15.33%** — versus the naïve 0.6×15 + 0.4×25 = **19%**. Same assets, less risk, zero cost: *free*. Push ρ to −0.2 (gold-class behavior in equity storms): σₚ² = 0.0181 − 0.0036 = 0.0145 → **σₚ 12.04%** — the portfolio becomes SAFER than its SAFEST ingredient. That sentence is the entire intellectual core of portfolio management.

### 1.2 Two kinds of risk — one paycheck
Total risk splits: **idiosyncratic** (company-specific: one firm's fraud, one plant fire) — the market pays NOTHING for holding it, because anyone can diversify it away; **systematic** (recession, rates, war — hits everything) — the market pays a premium for bearing it. As you add names (1 → 5 → 15-20), idiosyncratic risk collapses toward zero (the famous falling curve: 1 stock ~40% portfolio σ for single-name risk, 15-20 uncorrelated names ≈ near-market floor) — and what remains is systematic, the risk worth its premium. Consequences that mint careers: (a) holding 3 stocks = running unpaid risk in a costume (your broker's "diversified" claim with 4 IT names is 1 bet); (b) the ONLY justified reason to concentrate is an information edge (FA7-grade) — and even then BF6's caps (≤5% single name) exist because edges hallucinate.

### 1.3 Correlation — measure it, then distrust it politely
Correlation ρ ∈ [−1, +1] from return series over a window: it is a HISTORICAL estimate with an expiration date. Indian-context anchors (5-10y monthly): equity-debt ρ ≈ 0.0-0.2, equity-gold ρ ≈ −0.1-0.1 (gold's gift: it zigs on inflation/fear while equity zags), largecap-midcap ρ ≈ 0.85-0.9 (barely two assets at all), India-US equity ρ ≈ 0.4-0.6 and FALLING with the SIP bid era. The dark corner: **correlations sprint to ~1 during panics** (2008, March 2020 — everything liquid gets sold together) — the lunch shrinks exactly at the hunger-peak; layers DESIGNED for crises (gold, long-duration govvies, cash-buffer) are the ones whose correlations hold their manners. Desk rule: estimate ρ on 3-year rolling windows, never trust a single year's print, and stress-test every "diversifier" against the two panic tapes.

### 1.4 Layers of diversification — the honest hierarchy
1. **Within-asset:** 20+ names or one index fund (₹0.1-0.3% TER buys instant 50-500 names — the cheapest lunch in India).
2. **Across assets:** equity + debt + gold + cash — the correlation mosaic (PM4 builds the frontier on it).
3. **Across geography:** US/developed sleeve (10-20% class) — hedges India-specific + currency (INR depreciation rewards USD assets: EC6's lesson paying you back).
4. **Across time:** SIP/staggered deployment — diversifies the ENTRY PRICE every month (IN2 6's engine: time-diversification is the only kind a salaried investor can mass-produce).
5. **Across strategies/factors:** value/momentum/quality tilts — same asset class, different return rivers.
Each layer costs a little return-concentration; the trade is correct by default — concentration is a bet you must justify, diversification is the default you must depart from consciously.

### 1.5 Where diversification lies — three honest asterisks
- **Over-diversification (diworsification):** beyond the risk floor, adding 50 more stocks changes nothing but complexity — and adding correlated funds (3 flexicaps holding the same 20 names) manufactures the ILLUSION of layers: same ρ 0.95 assets in different bottles. Read overlapping holdings; 2 well-chosen funds can own the market; 8 own it expensively.
- **Concentration's champions:** Buffett-style concentration out-respects Markowitz ONLY with an edge + tenure + no forced selling: the free lunch is for the 95% who cannot prove an edge — and BF6 says you cannot prove it before a decade of journaled decisions.
- **The panic-correlation tax:** crisis co-movement means the TRUE safety assets are few (govvies, gold, cash) — the "alternatives" brochure (crypto, REITs marketed as uncorrelated, structured products) must prove manners in 2008/2020 tapes before joining the table.

## 🧪 LAB — Lunch counter (10 min)
1. Rebuild the canon: σₚ for 60/40, σ 15/25, ρ 0.5 this time. Compare against naïve 19% — how much lunch survives a higher correlation?
2. Find the ρ where the lunch dies: with the same weights/volatilities, ρ = 1 gives σₚ? (Work it — don't quote it.)
3. Risk decomposition: portfolio of 4 infra stocks, same sector, margins linked to one government scheme: which risk dominates and what does the market pay for it? Two-line verdict.
4. Layer audit: friend owns 6 equity funds + 2 ULIPs: name the violated layer logic and the 3-step repair (overlap check, consolidation, asset-class gap).
5. Panic rehearsal: book is 70 equity / 20 gold / 10 govvies; equity-gold ρ jumps 0→0.6 in a crash scenario while govvies hold manners at −0.2: which slice does the actual protecting, and what size should it carry (FI8 buffer doctrine)?

**Why this matters:** item 2 is the exam-board definition of the free lunch's boundary; item 5 is the stress-test every portfolio deserves before March 2020's anniversary returns unannounced.

**🔑 Lab answers:** (1) σₚ² = 0.0081 + 0.01 + 2×0.24×0.5×0.0375 = 0.0181 + 0.009 = 0.0271 → **σₚ = 16.46%** vs naïve 19% — lunch shrinks from a 3.67pp discount to 2.54pp but does NOT die: any ρ<1 still feeds you (2) ρ=1: σₚ = w₁σ₁ + w₂σ₂ exactly (the cross-term fills the square) → σₚ = 0.6×15 + 0.4×25 = **19%** — lunch DOA; the boundary case is literal: perfect co-movement = one asset in two costumes (3) systematic/sector-concentration dominates — four names sharing one scheme share ONE risk: market pays nothing for it (diversifiable with a click); verdict: unpaid risk in a group discount — either earn the edge honestly with caps, or buy the index's floor (4) violations: layer-1 illusion (6 funds, ρ~0.95 = one expensive market), ULIPs mixing insurance with investment taxably and opaquely; repair: overlap audit → consolidate to 2 funds (index + one active), exit ULIPs at surrender math, and ADD the missing asset classes (debt, gold) — real layers instead of bottled clones (5) the **govvies slice (and the buffer's cash)** does the protecting when gold follows equities down: carry it at crisis-size (10-20%, horizon-matched ModD — FI7) sized so a 2020-tape is an event, not an eviction: pre-signed, as all survival gear is.

## 💪 Exercises
1. σₚ table: weights 50/50, σ 20/30, compute σₚ at ρ = 0.8, 0.3, 0, −0.5: the four-row table and the one-line lesson.
2. Optimal mix hunt: using σ 15/25, ρ 0.2, try 60/40 vs 50/50 vs 40/60: which weight minimizes σₚ (calc each) — and is min-σ the right objective? (Two-line philosophy answer.)
3. N-stock curve: sketch idiosyncratic collapse from 1 to 30 names (use σ_idio ∝ σ/√n where legal): portfolio σ at n = 1, 5, 15, 30 given single-stock σ 40%, market σ 15%.
4. Overlap autopsy: take two real flexicap funds you know: name their top-5 holdings, compute a rough overlap %, and conclude whether owning BOTH adds a layer or a bill.
5. Geography layer math: USD-INR depreciates 3%/yr while US equity returns 10%: the INR-investor's total return? And which risk did the sleeve quietly hedge (EC6 weld)?
6. Diworsification audit: list your (idealized) 12 holdings; label each with its TRUE twin (ρ>0.9 partner) and mark the cuts that lose nothing but fees and fog.
7. Interview forge: "Why not put everything in your single best idea if diversification is a compromise?" — 6 numbered panels-grade lines (edge proof, Kelly logic, forced-selling risk, ρ surprises, career risk, and the honest exception).

### ✅ Selected answers
1. ρ = 0.8: σₚ² = 0.25×0.04 + 0.25×0.09 + 2×0.25×0.8×0.06 = 0.01 + 0.0225 + 0.024 = 0.0565 → **23.8%**; ρ = 0.3: 0.01+0.0225+0.009 = 0.0415 → **20.4%**; ρ = 0: 0.0325 → **18.0%**; ρ = −0.5: 0.0175 → **13.2%**. Lesson: the lunch grows as ρ falls, and below zero the portfolio outlives BOTH parents' risk — correlation, not return-picking, is the portfolio engineer's raw material.
3. σₚ ≈ √(σ_m² + σ_idio²/n): n=1 → √(0.0225 + 0.16) ≈ **42.7%**; n=5 → √(0.0225 + 0.032) ≈ **23.3%**; n=15 → √(0.0225+0.0107) ≈ **18.2%**; n=30 → √(0.0225+0.0053) ≈ **16.7%** — diminishing by 15th name; past that you are collecting names, and the residual ~15-16% IS the systematic ticket the market pays for.
7. 1) An edge must be PROVEN (journals, a decade), asserted by nobody honest before evidence. 2) Kelly math: even a real edge sizes at fractions — full-Kelly all-ins are how edges meet variance's left tail. 3) Forced-selling risk: one margin call/need turns your best idea into someone else's bargain at YOUR bottom. 4) ρ surprises: the idea's correlations to your job, house, country's cycle stack silently. 5) Career risk: concentration losses are remembered, diversified gains compound quietly. 6) The honest exception: capital you can zero without life-damage + proven edge + time — call it the venture sleeve and cap it like BF6 says; everything else eats the free lunch gratefully.

## ❓ Quiz
1. 60/40, σ 15/25, ρ 0.3: the portfolio σ is:
   (a) 19.0%
   (b) 15.33% — the cross-term under-fills the package whenever ρ<1; the 3.67pp discount is the free lunch that costs nothing, and ρ=1 is the honest boundary check (exactly 19%)
   (c) 12.04%
2. Risk the market pays you NOTHING for is:
   (a) systematic
   (b) idiosyncratic — one firm's fraud is diversifiable with a click, so no premium can survive; ~15-20 names kill it, holding 3-4 stocks is unpaid risk wearing a strategy costume
   (c) duration risk
3. The diversification layer the SIP mass-produces is:
   (a) geography
   (b) time — entry-price diversification every month, the only layer a salaried investor manufactures at scale; pair it with asset-class layers and the lunch is served on a date schedule
   (c) factor

### ✅ Answers
1. **(b)** — (c) is the NEGATIVE-correlation version; the formula rewards accuracy, not optimism.
2. **(b)** — paychecks attach to what cannot be clicked away.
3. **(b)** — INR-cost-averaging IS diversification; the calendar is the broker that never charges.

## ✅ Mastery checklist
- [ ] I can compute σₚ for any two-asset mix and locate the lunch precisely.
- [ ] I know the ρ=1 boundary and the ρ<0 miracle, both proved.
- [ ] I split risk into paid (systematic) vs unpaid (idiosyncratic) on demand.
- [ ] I audit layers honestly: assets, geography, factors, time — no bottled clones.
- [ ] I stress-test my diversifiers against panic tapes before trusting them.

**Next:** PM2 · Risk & Return Foundations — arithmetic vs geometric truth, volatility as the toll, and the Sharpe ratio's debut.
