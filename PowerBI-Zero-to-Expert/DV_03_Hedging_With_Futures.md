# 🎯 DV3 · Hedging with Futures — The Festival Wheat Desk
> This is the module derivatives were invented for. ShopKart needs 500 quintals of wheat in October; July's ₹2,600/quintal is climbing with every monsoon headline. DV3 executes the full hedge — long futures, MTM ledger, basis risk priced honestly — and banks **₹1.0L saved**. Then the professional layer: long vs short decision trees, hedge ratios, cross-hedges, rolling hedges, and the CFO smell test that separates insurance from gambling in a costume.

## 🎯 Objectives
- Run a complete long hedge end-to-end: lock, MTM, lift, effective price — with the ₹1L-saved canon.
- Price **basis risk** honestly (hedge doesn't delete risk; it shrinks it to basis size).
- Choose long vs short hedge from the exposure direction (input fear vs output fear).
- Compute hedge ratios (1:1 default, ρ·σs/σf refined) and contract counts.
- Extend: cross-hedges (surrogate contracts), rolling hedges (stacked expiries), the spec-vs-hedge audit.

## 📘 Concepts

### 3.1 The ShopKart wheat hedge — receipts edition
```text
JULY:   need 500q wheat in October · spot ₹2,600/q · Oct futures ₹2,650/q
        ACTION: LONG 10 futures contracts (50q each) @ 2,650 → exposure locked
OCTOBER reads:
        spot ₹2,850/q → buy wheat 500 × 2,850 = ₹14.25L (ouch, +₹1.25L vs July)
        futures ₹2,850 → SELL hedge: gain (2,850−2,650) × 500 = +₹1.00L
EFFECTIVE purchase price = 14.25L − 1.00L = ₹13.25L = 2,650/q EXACTLY the locked rate ✓
Unhedged world: ₹14.25L · Hedged world: ₹13.25L · **Saved: ₹1.0L of festive margin**
```
The fine print that interviews hunt: hedged price = *futures entry*, not July spot — you locked the carry invoice too (DV2). If October had CRASHED to ₹2,400 (your CFO crows, twitter mocks 'useless hedge'): spot win ₹1.0L, futures loss ₹1.0L, net still ₹2,650/q. **A hedge is not a bet you win; it's a weather you stop having.**

### 3.2 Basis risk — the honest remainder
Perfect hedge = futures moves 1:1 with YOUR specific grade/location spot. Reality: ShopKart buys Delhi-mandi wheat; the contract prices Indore-delivery wheat → basis wiggles. Effective price = futures entry + *final basis*. Basis at lift: spot 2,850 − futures 2,850 = 0 (clean); if spot were 2,870 vs futures 2,850: paid 2,870 − 200 gain = effective 2,670 — ₹20/q of basis sting still beats ₹250 of naked weather. **Hedging trades big direction-risk for small basis-risk; quoting anything cleaner on CNBC is a costume.**

### 3.3 Long vs short — the direction tree
- Direction fear: **input price UP** (wheat, fuel, silver for gifting) → **LONG** futures.
- Direction fear: **output price DOWN** (harvest to sell, inventory to liquidate, receivable currency) → **SHORT** futures.
- Memory anchor: you go LONG what you must BUY, SHORT what you must SELL; the futures books the mirror of your commercial fear. Write the fear sentence first, contract side second — reversed order births speculators.

### 3.4 Hedge ratio — not always one-to-one
```text
h* = ρ × (σs / σf)      contracts = h* × exposure size / contract size
Silver gifting: ρ(spot,futures) = 0.9, σs = 12%, σf = 10% → h* = 1.08
Exposure 25 kg → futures contracts = 1.08 × 25 / contract 30kg? → ~0.9 → 1 contract (rounding honesty!)
```
1:1 works when contract = your commodity; h*<1 when futures are jumpier than your spot (over-hedging quietly becomes speculation); h*>1 when your spot swings wilder. Rounding rule: hedge the WHOLES, absorb the fraction — a 0.9-contract trim is not worth a bespoke side-bet.

### 3.5 Hedges evolution — cross, roll, audit
- **Cross-hedge:** no futures on your exact input (besan-grade chana)? Hedge with correlated chana-dal or soya complex + smaller ratio; effectiveness = correlation's honesty — test history before sizing.
- **Rolling hedge:** exposure timeline exceeds available contracts (12-month flour supply)? hedge stacked expiries and roll forward quarterly — each roll re-prices basis; track roll-cost as a line item, not a surprise.
- **Spec-vs-hedge smell test (CFO version):** every derivative position must answer: (1) which commercial line does this offset? (2) what's the max MTM pain path and who funds it? (3) who sleepwalks if this 'hedge' gains ₹2L? — if gain-excitement > loss-relief, it's speculation in a hedge costume; BF5's journal now audits derivatives too.

## 🧪 LAB — Desk tickets (10 min)
1. Side & size: tomato-pulp maker fears September tomato crash on his 80-ton output? Contract side and why (2 lines).
2. Effective price recompute: hedge entered long at 3,100; lift-day spot 3,350, futures 3,340. Effective per-unit?
3. Ratio math: exposure 200 MT pulses, ρ 0.8, σs 9%, σf 12%: h* and contract count at 10 MT/lot?
4. MTM path: long 4 lots × 50q @ 2,650; closes 2,610 → 2,640 → 2,630. Ledger the three nights.
5. CFO ticket: desk shows +₹3L 'hedge profit' on crude. Write the one-line interrogation that decides whether to celebrate or investigate.

**Why this matters:** tickets 2–4 repeat on real desks every single evening; ticket 5 has ended careless bonus seasons.

**🔑 Lab answers:** (1) SHORT 80t tomato futures — output-fear = price-DOWN fear = sell forward what you must sell later (tree: fear sentence first) (2) gain = 3,340−3,100 = +240; effective = 3,350 − 240 = **3,110** — entry 3,100 + 10 basis-slop, still insurance-grade (3) h* = 0.8 × 9/12 = **0.60**; contracts = 0.6 × 200/10 = **12 lots** (4) −40×200=−8,000; +30×200=+6,000 → bal −2,000; −10×200=−2,000 → **net −₹4,000 parked cash** — hedge MTM bleeds while commercial side silently gains; both columns must ride in the same memo (5) 'map each contract to the physical exposure line-item with quantities and dates — hedges never announce themselves as P&L orphans; if the offsetting purchase isn't on the same page, we hosted a trader, not a hedger.'

## 💪 Exercises
1. Full silver-gifting hedge replay: 25 kg, spot ₹90,000/kg July, Nov futures ₹92,250; November spot ₹95,000, futures ₹95,100. Effective cost, savings vs unhedged, basis sting?
2. Crash-side redemption: rerun the wheat hedge with October spot ₹2,380 (futures converge 2,380): effective price, CFO tweet-defense in 2 lines ('why we paid 2,650-equivalent when mandi quoted 2,380').
3. Ratio clinic: your groundnut oil spot swings σs 15% vs its best-fit futures σf 12%, correlation 0.85; exposure 40 MT, lot 5 MT. h*, contracts, and the one-line over-hedge warning.
4. Cross-hedge design: no futures for your organic jaggery input; shortlist two surrogate contracts and the 3-step validation before sizing (correlation window, seasonality check, basis-history floor).
5. Rolling costs: 9 months of flour cover needed; only 3-month contracts liquid. Sketch the roll calendar (3 rolls) with the roll-cost line that CFOs must budget.
6. Spec-vs-hedge audit memo: desk grew 20 extra lots 'because the hedge was working.' Write the three questions (fear sentence, MTM pain funding, gain-vs-relief audit) and the verdict rule.
7. Effective-price table builder: locked 2,650; fill effective price for lift-bases of +30/+15/0/−15/−30 and state which sign favors the LONG hedger (and why it's not a strategy).

### ✅ Selected answers
1. Futures gain = 95,100−92,250 = +2,850/kg ×25 = **₹71,250**; spot paid 95,000 → effective 92,150/kg (entry 92,250 − 100 favorable basis flip); unhedged pain = 5,000/kg = ₹1.25L vs hedged sting 2,150/kg ≈ ₹53.7k → **saved ≈ ₹71.3k after a ₹100 basis gift** — basis can flatter; never budget the flattery.
2. Futures loss = (2,650 − 2,380) × 500 = **₹1.35L**; spot buying = 2,380 × 500 = ₹11.9L ⇒ effective = 11.9 + 1.35 = **₹13.25L = ₹2,650/q — identical to the up-case, to the rupee.** That's the quiet miracle: with full convergence, effective price = entry in EVERY direction; weather deleted, not outguessed. CFO defense: 'we don't regret insurance after a safe season; the desk removed weather from the festive P&L — audit the worst case we pre-signed (₹13.25L), not the hindsight mandi quote.'
3. h* = 0.85 × 15/12 = **1.0625**; contracts = 1.0625 × 40/5 = **8.5 → 8 lots** + written fraction policy; over-hedge warning: 9 lots turns your hedge into a 0.5-lot short punt — the surplus lots have no commercial mother.
4. Surrogates: sugar futures + gur-linked agri baskets/NCDEX agri index; validation: (i) 24-month monthly-return correlation ≥ 0.85 stable across seasons; (ii) basis history floor: worst 5% basis move priced into the CFO memo; (iii) seasonality overlay — festive jaggery spikes vs surrogate's own calendar — sign-off only when all three pass.
5. Rolls: hedge now 3M($→Oct), roll in Oct to Jan, Jan to Apr: each roll = sell near, buy far at prevailing spread; roll-cost = Σ (far−near) spreads ≈ carry rent; budget it monthly as 'hedge-carry' line, or the CFO meets it as a festival surprise.
6. Questions: (a) which purchase/sale line do the extra 20 lots OFFSET? (b) MTM worst-path on 20 orphan lots × daily σ — pre-funded where, approved by whom? (c) gains-booked vs exposures-hedged reconciliation this month? Verdict rule: any lot without a commercial mother on the same page = trading book with compliance consequences — cap it, journal it, own it, or close it.
7. Bases +30/＋１５/0/−15/−30 → effective = entry + final basis: 2,680 / 2,665 / 2,650 / 2,635 / 2,620. Favorable = negative basis (spot cheaper than futures at lift) — a wind-fall, not a design; hedge effectiveness is judged on direction-kill, the basis is weather noise with your name only on the memo.

## ❓ Quiz
1. ShopKart's wheat hedge (long 500q at ₹2,650, October spot ₹2,850) ends with effective cost:
   - (a) ₹2,600/q — July spot
   - (b) ₹2,650/q — the futures ENTRY (₹1.0L gain offsets the ₹1.25L spot rise: 14.25L − 1.00L = 13.25L); you lock the carry invoice, not time-travel to July; the festival margin survives exactly as budgeted
   - (c) ₹2,850/q — hedging was useless
2. Hedging replaces direction risk with:
   - (a) zero risk
   - (b) basis risk — spot-minus-futures wiggle at lift (grade, location, timing); small, survivable, honest weather vs the ₹250/q naked thunderstorm it replaced; 'perfect hedge' claims are sales decks, not risk memos
   - (c) opportunity risk only
3. A desk shows +₹3L 'hedge profit' on crude futures. The CFO's first move:
   - (a) bonus the desk
   - (b) demand the mapping: every contract to its commercial exposure line with quantities and dates — hedge gains without a commercial mother are trading profits in a costume; excitement exceeding loss-relief is speculation, BF5 journal now audits it too
   - (c) double the program

### ✅ Answers
1. **(b)** — (a) rents a time machine; (c) missed the offsetting ledger entirely.
2. **(b)** — insurance has a deductible called basis; the honest quote includes it.
3. **(b)** — hedge books never orphan P&L; celebrate symmetry, investigate orphans.

## ✅ Mastery checklist
- [ ] Long hedge executed solo: lock → MTM ledger → lift → effective price (₹13.25L canon reproduced)
- [ ] Crash-side redemption recited without apology ('insurance after a safe season')
- [ ] Fear-sentence-first side selection (long inputs, short outputs) on 5 new exposures
- [ ] h* computed + rounding policy written (over-hedge = secret speculation named)
- [ ] Cross/roll hedge designs sketched with validation and roll-cost budget lines
- [ ] Spec-vs-hedge audit memo deliverable (3 questions + verdict rule) to any CFO

**Next:** **DV4 · Options Anatomy** — calls & puts from zero, buyers vs writers (the capped-vs-unbounded knife), payoffs drawn cold, moneyness maps, intrinsic vs time value, and why the premium is the only number that ever lies politely! 🎯
