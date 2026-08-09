# 🎯 DV6 · Option Pricing & The Greeks — Parity, Binomial & the Five Dials
> Why is a 25,000 call ₹180 and not ₹500 or ₹12? DV6 builds the answer from pure no-arbitrage logic: put-call parity welds calls, puts, and stock into one identity; the one-step binomial prices an option from a replicating portfolio (₹13.64, exact); Black-Scholes generalizes it into five inputs; and the Greeks turn BSM from a pricing formula into a dial board desks steer by. Formula-light, machinery-deep — exactly how interviews like it.

## 🎯 Objectives
- Wield **put-call parity** (C − P = S − PV(K)) as both price-checker and put-builder (the ₹2.91 put).
- Price a one-step **binomial** option via risk-neutral replication (₹13.64) — and explain WHY it's arbitrage, not opinion.
- Map **Black-Scholes' five inputs** (S, K, T, σ, r) with σ (volatility) as the only unobservable — and IV as the market's scream-meter.
- Turn the Greeks (delta, gamma, theta, vega, rho) into desk dials: hedge, convexity, decay, event-bill, rates-tap.
- Run the IV-crush forecast quantitatively (vega × IV drop) instead of discovering it at expiry.

## 📘 Concepts

### 6.1 Put-call parity — the identity that audits quotes
```text
C − P = S − PV(K)     [European, no dividends]
S=100, K=100, T=1y, r=10% → PV(K) = 90.91
Given C = 12 ⇒ P = 12 − 100 + 90.91 = **₹2.91**
Meaning: at-the-money, the CALL must cost more than the PUT when rates are positive —
the call rides the forward (spot + carry), the put rides its mirror. Parity says so. Audit says obey.
```
Parity violations in liquid markets = free money printout (or a settlement friction you haven't priced). Desk reflex: any strike-quote family gets parity-checked before any directional work.

### 6.2 The one-step binomial — pricing by cloning
```text
S=100, up→120 (u=1.2), down→80 (d=0.8), r=10%, call K=100
Risk-neutral prob p = (1.1 − 0.8) / (1.2 − 0.8) = 0.75
Call payoffs: 20 (up) / 0 (down) ⇒ C = (0.75 × 20 + 0) / 1.1 = **₹13.64**
Clone-check (put): payoffs 0 / 20 ⇒ P = (0.25 × 20)/1.1 = ₹4.55
Parity flourish: C − P = 13.64 − 4.55 = 9.09 = 100 − 90.91 ✓✓ the weld holds by construction
```
**The revelation:** option value never needed anyone's probability forecast of the stock — only the RANGE and the arbitrage-free weld. Real-world p (bullish vs bearish sentiment) cancels out; that's the cleverest trick in modern finance, and every pricing engine downstream is this tree grown tall (thousands of steps = Black-Scholes' junglegym).

### 6.3 Black-Scholes' five dials — and the one that's invisible
| Input | Role | Desk note |
|---|---|---|
| S, K | today's anchor vs promised price | observable — the only honest two |
| T | time to expiry | known; decay rides it |
| r | rates | known-ish; sleepy dial |
| **σ volatility** | the future's wobble | **UNOBSERVABLE** — the entire debate |

Feed historical σ; the market feeds its own, backwards: **implied volatility = the σ that makes BSM output the quoted premium.** IV 35% = the market pricing ±35%/yr-equivalent wobble into the ticket. Hence: options are priced in VOL, not rupees — pros compare IV to realized vol history, then to event calendars; the premium you pay is usually 60% vol-bet wearing a direction-costume.

### 6.4 The Greeks — steering dials
- **Delta (0.0–1.0 calls, 0–−1 puts):** premium's slide-per-₹1 of spot + the hedge count. ATM ≈ 0.5; deep ITM → 1; OTM lottery → 0.1. Desk use: 1 lot futures hedge ≈ how many 0.4-delta calls? (75 × 1.0 / (0.4 × 75) = 2.5 lots.)
- **Gamma:** delta's accelerator — how fast delta itself moves. Long ATM options = +gamma (your hedge auto-adjusts in your favor on moves); short them = −gamma (the thing that bankrupts calm-premium writers during gaps).
- **Theta:** the nightly clock-bill. ATM decays fastest near expiry (DV5's horseshoe); weekends are premium donations to writers.
- **Vega:** ₹ per 1.00 vol-point. Buy straddle at IV 34 → straddle at IV 17 post-event: vega bill explains funerals better than direction ever will (compute: vega 12 ⇒ ΔIV −17 ⇒ −204 pts ≈ −₹15,300 on lot 75 — check this BEFORE event tickets).
- **Rho:** the rates-tap; matters at long-dated options, sleeps elsewhere.

### 6.5 The honest limits
BSM assumes lognormal moves, constant vol, no jumps — reality offers fat tails, vol-smiles (OTM puts priced richer — the 1987 bankruptcy of the smile's absence), and gap-opens. Professionals treat BSM as a *consistent quoting language*, not physics: vol surfaces across strikes/maturities describe the market's real fear map. When someone says '{{ model price }}:', translate to 'the market's current weather report' — tradable, superseded, never scripture.

## 🧪 LAB — The dial bench (10 min)
1. Parity drill: S=₹500, K=500, T=6M, r=8% (PV(K)=481) , C=₹28: fair P? If market quotes P at ₹24, what's the synthetic-arb instinct?
2. Binomial re-price: S=200, u=1.25 (250), d=0.8 (160), r=10%, K=200 call: p and C?
3. Greek call-out: delta 0.6 option, spot +₹8, gamma lifts delta to ~0.68 mid-path: approximate premium gain and name the curvature that beat the linear estimate.
4. Vega-bill: straddle vega 11, you bought at IV 32, event closes at IV 18: bill per ATM straddle (lot 75)? Direction added +1.5% — net verdict?
5. Quote-audit: same-board puts at two strikes violate parity against calls+spot by ₹40/lot — your two-step desk action?

**Why this matters:** item 3 teaches convexity with numbers (the rare free lunch longs enjoy); item 4 converts IV-crush from folklore into a signed cheque.

**🔑 Lab answers:** (1) P = 28 − 500 + 481 = **₹9** fair; quote 24 is RICH put-meat ⇒ write the put + buy call + buy... classic conversion: sell rich put, buy call, short synthetic forward via spot — pocket ₹15 × lot with expiry-risk only; first course of action: verify borrow/short-settlement frictions before dreaming (2) p = (1.10 − 0.8)/(1.25 − 0.8) = 0.667; payoffs 50/0 ⇒ C = 0.667 × 50 / 1.1 = **₹30.3** (3) linear delta estimate: 0.6 × 8 = ₹4.8; convex truth with avg delta ≈ 0.64 × 8 ≈ **₹5.1–5.3** — GAMMA's gift to the long: as spot runs, your exposure grows INTO the move (the only kind of leverage that behaves politely) (4) bill = 11 × (32−18) = **154 pts ⇒ −₹11,550/lot**; direction helps ~+4,400 on opening-delta terms, but post-event the position no longer sits ATM and the wings shrink the recovery: net ≈ **−₹7,300 funeral** — IV-crush arrives via vega exactly as priced (5) (i) parity recompute against executable prints (last-trade ≠ mid); (ii) if genuine: execute the conversion/reversal sized to the friction — either the desk pockets ₹40 × N or discovers why the market left it (settlement risk hidden in the fine print).

## 💪 Exercises
1. Parity chain: derive the put parity identity from scratch (portfolio language): show that call + cash(PV K) must replicate put + stock forever — else which arb eats the difference?
2. Binomial two-flavor: same tree as in-class (100→120/80) but price the K=90 **call** (payoffs: max(120−90,0)=30 up / max(80−90,0)=0 down). C? Then the K=90 **put** (0 up / 10 down), and verify parity exactly.
3. Delta-hedge ticket: short 10 lots of a 0.35-delta call (lot 75): how many underlying units must the book hold to be locally delta-neutral, and what does 'locally' warn?
4. Theta-caddy: ATM call premium ₹300 at 30d; expected decay guidance: 14d→? (≈ ₹200), 3d→? (≈ ₹90), expiry AM→? (≈ ₹25): quantify decay-per-day acceleration and the writer's calendar-smile sentence.
5. IV triage board: ATM IV today 22% vs 6-month realized 19% vs next-Budget week; verdict on straddle 25,000 priced ₹340 as cheap/expensive — with the two data requests attached.
6. Model-humility memo: colleague proposes trading strictly 'BSM-fair' − model-discount of 12% on all OTM puts as 'systematic value.' Rebut in 3 lines (smile history, tail pricing, vs whose expense the discount is).
7. Dial-owner quiz: assign each risk event to its Greek(s): weekend gap · budget speech morning · slow grind rally on short call position · rate-hike leak on 12-month options.

### ✅ Selected answers
1. Portfolio A: C + PV(K) cash; portfolio B: P + S. At expiry if S>K: A pays (S−K)+K = S, B pays 0+S = S; if S<K: A pays 0+K = K, B pays (K−S)+S = K. Identical payoffs ⇒ identical prices NOW, else: buy cheap portfolio, short dear one = conversion/reversal desk-printing until alignment. Parity isn't a relation; it's a no-arb CONTINUITY OF IDENTITY.
2. Call: C = (0.75 × 30 + 0.25 × 0)/1.1 = 22.5/1.1 = **₹20.45**. Put: P = (0.75 × 0 + 0.25 × 10)/1.1 = 2.5/1.1 = **₹2.27**. Parity audit: C − P = **18.18**; S − PV(K) = 100 − 90/1.1 = 100 − 81.82 = **18.18 ✓ EXACT.** Unforgettable lesson: on any arbitrage-free tree, parity holds to the paisa — if your numbers ever violate it, don't blame the universe (or the tree's discreteness): recheck your payoffs. Replication forgives no arithmetic sins, at K=90 or anywhere else.
3. Short calls delta = −10 × 75 × 0.35 = −262.5 ⇒ HOLD +262.5 underlying units for local neutrality; 'locally' warns: delta shifts with spot+time+vol (gamma+theta+vega wake up hourly) — delta-neutral is a snapshot, not a Sabbatical; rebalance bands and gap-gap-risk funding belong in the same ticket.
4. Decay/day: 30d→14d: 100/16d ≈ 6.3/day; 14d→3d: 110/11d = 10/day; 3d→0: ≈ 65/day → ~10× acceleration into expiry; writer's smile: 'the last week is where premium-sellers harvest and premium-buyers fund the barbeque — theta's compound interest works for whoever owns the calendar.'
5. Data requests: last-4 Budget straddles' IV-into-event vs realized-move; the IV term-structure slope (event week vs rest). Verdict template: if typical realized Budget move ≈ 1.8% (450 pts) and straddle costs 340 with IV only modestly above realized history — borderline FAIR-to-lean-cheap; else expensive; IV 22 vs 19 realized is mild-event pricing — would size small with BE-doors open, flat if the IV-history page says scream-priced.
6. Rebut: (i) OTM puts carry the crash-insurance smile since 1987 — 'discounts' there are the market's tail-tax, not mispricing; (ii) BSM-with-constant-vol is exactly the model the smile exists to mock; (iii) whose expense pays your 12%? Tail-days recover the seller's year's premium in hours — sell tails only with insurer-grade reserves (DV4's covenant) or walk.
7. Weekend gap → gamma (+ theta weekend-burn on longs); budget speech morning → vega (+ gamma during the print); slow rally on SHORT call → delta−gamma bleed (the writer's treadmill); rate-hike leak → rho (yawn-worthy elsewhere, mattering on LEAPS-class maturities).

## ❓ Quiz
1. Put-call parity says, with S=100, K=100, r=10%, T=1y, C=₹12, the fair put is:
   - (a) ₹12.00
   - (b) ₹2.91 — C − P = S − PV(K): 12 − P = 100 − 90.91 ⇒ P = 2.91; at-the-money calls legitimately cost MORE than puts when rates are positive — the weld, not the mood, sets the family prices
   - (c) ₹9.09
2. The one-step binomial prices the K=100 call at ₹13.64 WITHOUT needing the real probability of an up-move because:
   - (a) probability is illegal
   - (b) the replicating clone (stock + bond) has identical payoffs by construction — arbitrage forces the prices to match, so only the RANGE and rates matter; sentiment cancels, which is the deepest insight in modern pricing (grow the tree tall and BSM blooms)
   - (c) gamma removes it
3. Your straddle loses ₹11,550/lot despite the event landing 'as expected' chiefly because:
   - (a) theta was quiet
   - (b) vega collected the bill: IV 32→18 = 14 vol-points × vega 11 = 154 pts of scheduled evaporation — the event's uncertainty WAS the asset you were holding, and it expired at the announcement, not at expiry-date; price implied-vs-realized history before renting explosions
   - (c) delta betrayed you

### ✅ Answers
1. **(b)** — (a) assumes a symmetric world rates don't permit; (c) forgot the call's ₹12.
2. **(b)** — replication is the courtroom; probability forecasts are spectators.
3. **(b)** — the Greeks don't betray; invoices just arrive at the named hour.

## ✅ Mastery checklist
- [ ] Parity derived in portfolio language + conversion/reversal sketched for a violating quote
- [ ] One-step binomial: p, C, P computed + parity flourish verified (the 13.64/4.55/9.09 canon)
- [ ] Five BSM inputs named with the single unobservable (σ) and the IV definition quoted cold
- [ ] All five Greeks mapped to desk actions (delta-hedge count, gamma treadmill, theta horseshoe, vega-bill, rho nap)
- [ ] IV-crush quantified before any event ticket (vol-pts × vega × lot, signed in advance)
- [ ] Model-humility paragraph deliverable (smile, tails, 'quoting language ≠ scripture')

**Next:** **DV7 · Swaps & Risk Machinery** — ShopKart swaps its vanishing-floating OD rate into fixed (receipts: MIBOR +2pp = ₹1L offset), currency forwards at 83.92, the CDS glance, why notional ≠ exposure, and the CCP novation chain that keeps the arena standing! 🔄
