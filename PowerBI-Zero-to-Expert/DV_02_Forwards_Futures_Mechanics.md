# 🎯 DV2 · Forwards & Futures Mechanics — Pricing, Margins & the Basis Dance
> Why does October wheat cost ₹2,650 when July's is ₹2,600? Not prophecy — arithmetic. Futures prices are built from spot + cost of carry, and DV2 hands you the machine: the pricing law, the margin waterfall, the daily MTM ledger, and the basis that must march to zero at expiry. Master this and futures quotes stop being predictions and start being invoices you can audit.

## 🎯 Objectives
- Price any carry-market future: **F = S × (1 + r)^T** + storage − convenience/income.
- Read the margin waterfall: initial margin → MTM debits/credits → maintenance margin → margin call.
- Define **basis** (spot − futures), contango vs backwardation, and the expiry convergence law.
- Distinguish forwards from futures on counterparty, liquidity, and standardization frictions.
- Spot an arbitrage-free violation and sketch the cash-and-carry that eats it.

## 📘 Concepts

### 2.1 The pricing law — spot plus rent
```text
F = S(1+r)^T + storage − yield/convenience
Wheat: S = ₹2,600/q, r = 10%, T = 0.25y → 2,600 × 1.025 = ₹2,665
       − cold-storage subsidy/convenience net ₹15 → F ≈ ₹2,650 ✓ (matches the board quote)
Gold-10g widget: S = ₹20,000, T = 3M, r = 10% → F = 20,500; +storage 1% → ₹20,700
```
**Interpretation that wins interviews:** the futures premium is not the market's guess of October prices — it's the *carry invoice* (financing + storage − the benefit of having the goods now). Traders expecting ₹2,900 by October will bid futures ABOVE the invoice and arbitrageurs will sell futures + buy spot until the spread returns to fair carry — expectations get tamed by warehousing, not arguments.

### 2.2 The margin waterfall (lot-by-lot ledger)
```text
Buy 1 lot Nifty futures @ 25,000, lot 75 → notional ₹18.75L
Initial margin 10%  = ₹1.875L parked
Day1 close 24,950 → MTM −50 × 75 = −₹3,750 → margin balance 1.8375L
Day2 close 24,700 → MTM −250 × 75 = −₹18,750 → balance 1.65L
Maintenance 8% (₹1.5L): balance dips near it → TOP-UP call to initial level
```
**The discipline that separates survivors:** the margin is not a fee; it's a performance bond that expires at settlement but attacks daily. Positions are sized against the *maintenance-margin survival path*, never the initial debit.

### 2.3 Basis, contango, backwardation, convergence
- **Basis = spot − futures.** Wheat July: 2,600 − 2,650 = −50 (negative basis = **contango**: futures above spot — the normal state of carry markets, carrying the invoice).
- **Backwardation** (positive basis): futures BELOW spot — scarcity pays convenience now (festive tight supply, panic demand); it's the market renting immediate possession.
- **Convergence law:** as expiry approaches, carry shrinks → basis → 0; on expiry-day, futures price = spot price (else free delivery arbitrage). Every hedge in DV3 leans on this law's reliability — and every newbie who 'holds till it recovers' meets it.

### 2.4 Forward vs futures — the friction table
| Friction | Forward (OTC) | Future (exchange) |
|---|---|---|
| Counterparty | trust/bilateral risk | CCP guarantee via novation |
| Exit before expiry | negotiate with same party | one tap — liquid book |
| Terms | custom grade/date/place | standardized lots/expiry |
| Daily settlement | none (losses ride) | MTM + margining |
| Best for | bespoke corporate deals (our miller) | hedges needing flexibility/exit |

### 2.5 Cash-and-carry — the janitor's trade
If F deviates from fair carry: futures RICH (F ₹2,750 vs fair 2,650) ⇒ sell futures, borrow at r, buy spot, store, deliver at expiry → lock ₹100/q riskless-ish; futures CHEAP ⇒ reverse (short spot where possible). These trades compress mispricing to transaction costs — the invisible machinery that keeps DV3's hedge prices honest and proves *there are no free discrepancies in liquid carry markets.*

## 🧪 LAB — Pricing bench (10 min)
1. Price the 6-month future: S ₹1,000, r 8%, storage net 0.
2. Margins: buy 2 lots of a contract, notional ₹5L/lot, initial 12%. Day1 −1.5% on the underlying: debit and new balance?
3. Verdict: crude futures priced BELOW spot a fortnight before festival freight season. State of the curve + the two-word reason.
4. Convergence drill: basis at T−30d = −40, T−7d = −12, expiry-day quote should be ≈ ?
5. Arbitrage sketch: fair future ₹10,300; market quotes ₹10,600 at 1-month expiry, borrow rate available at 9%, storage ₹80. Detail the three legs and the locked spread.

**Why this matters:** items 1–2 are the universal desk warm-ups; item 5 proves you understand WHY prices behave rather than merely WHAT they did.

**🔑 Lab answers:** (1) 1,000 × 1.04 = **₹1,040** (2) notional ₹10L, initial ₹1.2L; move = −1.5% × 10L = **−₹15,000** ⇒ balance ₹1.05L; maintenance-watch begins (3) **backwardation** — convenience yield (freight scarcity NOW) outbids carry; spot is renting urgency (4) ≈ **0** by expiry-close — convergence is the law, any residual is delivery friction (5) legs: short futures 10,600 · borrow-buy spot at 10,300-fair (actual spot ~10,220+80 storage+financing ~77 ≈ fair) · store + deliver at expiry ⇒ lock ≈ ₹300 minus costs; do it at scale and the quote collapses back to invoice-honesty — you just did the janitor's job profitably.

## 💪 Exercises
1. Full pricing: silver ₹90,000/kg spot, r 10%, T 3M, storage negligible — fair F? Then the line if the dealer quotes you ₹92,500.
2. Margin waterfall for a 3-lot short at 5,000/unit, lot 100, initial 10%, path: 4,950 → 4,980 → 5,030 closes. Full ledger with balances (maintenance 8%).
3. Contango explain-like-CFO: two lines why a futures curve sloping UP is not 'bullish forecast' — and what question you ask instead.
4. Backwardation autopsy: onion futures below spot by 12%: list three candidate mechanisms (scarcity, storage impossible, festive demand) and the evidence that discriminates each.
5. Convergence gamble audit: a trader 'plays the last-week basis' expecting expiry-day futures > spot-then. When does that bet pay honestly and when is it a dressed-up cargo-loss?
6. Forward rescue: your miller counterparty ghosted a bespoke forward mid-season. Rebuild the three protections a proper forward should have carried (margin/collateral schedule, netting clause, delivery grade spec) from lessons of 2.4.
7. Basis math drill set: spot 2,700 futures 2,730 (T−20); spot 2,765 futures 2,772 (T−6); expiry spot likely if the curve is well-behaved? Compute both bases and predict the expiry-day relationship.

### ✅ Selected answers
1. F = 90,000 × 1.025 = **₹92,250 fair**; quote 92,500 ⇒ rich bump: ask whether their-storage/convenience justify ₹250; the honest dealer explains carry, the other kind explains 'sentiment' — sell futures/shop another dealer per the janitor's playbook.
2. Ledger: initial 10% of 15L = 1.5L. D1: price falls 5,000→4,950 — shorts gain: +50/unit × 300 units = **+₹15,000** ⇒ 1.65L. D2: 4,950→4,980 = −30 × 300 = −9,000 ⇒ 1.56L. D3: 4,980→5,030 = −50 × 300 = −15,000 ⇒ **1.41L < maintenance 1.2L? ✓ still above** — above 8% (1.2L), survives; one more adverse day = top-up call to ₹1.5L.
3. 'An upward slope usually prices storage+financing, not optimism; the bullish reading needs backwardation-with-scarcity evidence. Instead ask: is the slope EXACTLY fair carry (invoice), or steeper (expectations premium)?' Slopes are invoices until proven prophecies.
4. Discriminators: scarcity → spot ALSO spiking + imports arriving late; storage-impossibility → no quoted far-month carry at any price (onions rot — carry can't be warehoused, classic permanent backwardation candidate); festive demand → basis seasonality repeats in last-year data. Mechanisms leave different receipts; read all three.
5. Pays honestly when the remaining basis is still carry-rich: you're harvesting the last slope; becomes cargo-loss when you're really betting spot will RISE (directional bet wearing a convergence costume) — the hedge-book question: 'am I being paid carry, or am I long the commodity?' Answer decides whether MTM is rent or roulette.
6. Protections: (i) bilateral margining schedule mimicking MTM (weekly), collateral grade agreed; (ii) ISDA-style netting/default clauses so one default nets, not chains; (iii) ironclad delivery spec (grade, moisture %, elevator) — bespoke contracts die of handshakes that no spec sheet survived.
7. Bases: −30 then −7 — convergence marching; expiry expectation: futures ≈ spot ± delivery friction, basis → 0; the curve is behaving like a textbook until inventory shocks say otherwise.

## ❓ Quiz
1. October wheat at ₹2,650 vs July spot ₹2,600 (r 10%, T 0.25) mainly reflects:
   - (a) traders expecting drought
   - (b) the cost-of-carry invoice: 2,600 × 1.025 = ₹2,665, net of convenience ≈ ₹2,650 — futures price financing and storage, and arbitrage enforces it; expectations that fight the invoice get warehouse-slammed by janitors
   - (c) government fixing
2. Daily mark-to-market on a −250-point adverse close (25,000 contract, lot 75) debits:
   - (a) ₹250
   - (b) ₹18,750 tonight from your margin balance — MTM is not a monthly statement; positions must be sized for the maintenance-survival path, not the initial debit euphoria
   - (c) nothing until expiry
3. Basis = −50 (spot 2,600, futures 2,650) describes, by expiry:
   - (a) divergence to −100
   - (b) contango shrinking to ≈ 0 — carry amortizes daily, futures must converge into spot ± delivery friction; every hedge in DV3 leans on this law, and 'hold till recovery' meets the same law without mercy
   - (c) backwardation forming

### ✅ Answers
1. **(b)** — drought tales move the SLOPE gradient at best; the level is an invoice.
2. **(b)** — (c) is the forward's disease; the future cured it with nightly surgery.
3. **(b)** — convergence is law, not hope; prints like clockwork every expiry Thursday.

## ✅ Mastery checklist
- [ ] Any carry-market future priced in 10 seconds (spot, r, T, storage, convenience)
- [ ] Margin waterfall ledger built lot-by-lot with maintenance triggers flagged
- [ ] Basis sign language: contango/backwardation diagnoses + 3 discriminator questions each
- [ ] Convergence law stated + why hedges own it and gamblers meet it
- [ ] Forward-vs-future friction table reproduced + the bespoke-deal protection trio
- [ ] Arbitrage-free reflex: deviating quotes auto-trigger the cash-and-carry sketch

**Next:** **DV3 · Hedging with Futures** — the ShopKart festival wheat hedge executed fully (₹1L saved, receipts incl. basis risk), hedge ratios that don't suck, long vs short hedge decision tree, cross-hedges and rolling hedges, and the CFO's spec-or-hedge smell test! 🛡️
