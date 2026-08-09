# 🎯 DV5 · Option Strategies — Insurance, Rent, Spreads & Event Wings
> Naked options are blades; strategies are surgical kits. DV5 assembles the four bread-and-butter builds professionals run daily: **protective put** (insure a holding), **covered call** (rent your shares for premium), **bull/bear spreads** (cap cost, cap risk, sharpen the bet), and **straddle/strangle** (buying the event, not the direction). Every build ships with full receipts: cost, breakeven, max pain, max gain, and the persona it suits.

## 🎯 Objectives
- Build a protective put on a ₹30/share holding: floor at 28−1.2, upside intact, worst-case ₹3.2.
- Run covered-call economics honestly (rent income vs capped thunder) — and the tax/lot frictions.
- Construct bull/bear spreads from the four-option board; compute cost/reward/wings from first principles.
- Price straddles/strangles: total premium, dual breakevens, and the IV-crush event trap.
- Select strategy by VIEW (direction × magnitude × time), not by YouTube thumbnail: the 2×2 chooser.

## 📘 Concepts

### 5.1 Protective put — the castle drawbridge
Long 1,000 shares at ₹30 + long 28P @ ₹1.2: worst-case per share = (30 − 28) + 1.2 = **₹3.2 = 10.7% floor**, unlimited upside kept minus premium. Cost of insurance 4% of notional/year-quarter — expensive during calm, miraculous during storms. Verdict line: **protection is a budget line, not a trading opinion** — CFOs pre-sign it for concentrations (founder equity in own company is THE canonical case), retail discovers it obituary-late.

### 5.2 Covered call — renting out your own roof
Hold 1,000 shares ₹30, write 33C @ ₹1.5: premium ₹1,500 lands tonight. Outcomes: stock ≤ 33 at expiry ⇒ keep shares + rent (annualized rent juices a sleepy holding 1–2%/quarter); stock 36 ⇒ called away at 33: +3 capital + 1.5 rent = **+₹4.5/share capped**: the thunder beyond 33 belongs to the buyer. Failure mode duos: writing calls on genuine momentum stories (cap your own winners, BF3's bank-it reflex monetized!) and writing far-OTM calls for dust (₹0.2 premium vs a ₹5 tail risk — picking coins before steamrollers).

### 5.3 Spreads — pay for one wing, sell the other
```text
BULL CALL SPREAD (Nifty 25,000): buy 25,000C @180, sell 25,400C @90
Cost = (180−90) × 75 = ₹6,750 · Max payoff (above 25,400) = 400×75 = ₹30,000
Max profit = (400−90) × 75 = ₹23,250 · BE = 25,000 + 90 = 25,090 · Risk/reward ≈ 1 : 3.4
```
The trade sells away the far tail it didn't believe in to fund the nearer one it did — **defined risk both directions**: CFO-approved straitjacket. Bear-put mirror: buy 25,000P @150, sell 24,600P @70 → cost 80, max gain 320−80=240×75. Wings exist to be priced: never leg-in half a spread 'to see' — half-spreads are naked positions in denial.

### 5.4 Straddle/strangle — renting the explosion, not the direction
ATM straddle 25,000: C 180 + P 150 = **₹330 × 75 = ₹24,750 cost**; BEs 24,670 / 25,330 — need ±1.32% by expiry just to break even. Strangle (25,400C @90 + 24,600P @70) = 160: cheaper, wider doors (24,440/25,560). The honest use case: pre-decided events with binary outcomes (court verdicts, budget surprises) where ANY resolution moves big. **IV-CRUSH trap (the funeral standard):** buy pre-event when implied volatility is priced at a scream (say IV 38%), event lands, spot moves +1.8%… and premiums HALVE as IV collapses to 18% — you were right on news, wrong on Vega (DV6), and the straddle melts anyway. Strategy selection must include the vol-bill, not just the direction-view.

### 5.5 The 2×2 chooser — view × vol first
- Direction STRONG + vol CRUSH-cheated (event passed): spreads (defined risk, funded wings).
- Direction STRONG + cheap vol: naked-but-sized longs BE-governed (DV4 bench rules).
- Direction UNCLEAR + event binary: straddle/strangle — only when IV is buying BELOW its event history; else sell nothing and watch (flat is a position).
- Holding + calm market: covered-call rent discipline on capped conviction scaling; Holding + storm risk: protective-put budgeting.

## 🧪 LAB — The kit bench (10 min)
1. Full receipt build: buy 24,800C @120, sell 25,200C @55 (lot 75): cost, BE, max profit, max loss?
2. Protective math: 500 shares at ₹48, put 45 @ ₹1.1: floor value, total floor cost, % cushion?
3. Covered-call verdict: stock at ₹30, sleepy sideways expected a quarter: write 31C @ 0.9 or 33C @ 0.4? Receipts both, verdict with persona.
4. Straddle triage: event Sunday, straddle quotes 340 (lot 75): required % move to breakeven? Call it tradable/funeral with the IV-history question attached.
5. Chooser drill: 'sure of a rally post-results but IV already screaming' — which build from 5.5 and why (2 lines)?

**Why this matters:** receipts are the difference between strategy and astrology; items 1–3 are the desk's daily build tickets.

**🔑 Lab answers:** (1) cost (120−55)×75 = **₹4,875**; BE = 24,800+65 = **24,865**; max profit = (400−65)×75 = **₹25,125** above 25,200; max loss = premium ₹4,875 (2) floor = 45 − 1.1 = **₹43.9/share**; cushion = worst-case loss 48 → 43.9 = ₹4.1 = **−8.5% from the ₹48 entry**; insurance bill = 1.1/48 = 2.3% — sleep-price quoted (3) 31C@0.9: rent locked, cap close (called at 31+0.9 = 31.9 effective) — fits RENTAL persona harvesting sleepy tape; 33C@0.4: keeps thunder till 33.4, thin rent — fits believer-in-pause persona; sideways base-case prefers fatter rent, momentum-respecting prefers wider wings (4) 340/25,000 = need ±1.36% by expiry; funeral unless IV today sit BELOW prior-event realized moves — ask 'what did options charge last verdict and what did spot actually do?' before paying the scream (5) bull call spread — IV-scream is symmetrical: the sold-call wing monetizes the same inflated vol you're forced to buy; capped thunder is the honest price of attending an expensive party.

## 💪 Exercises
1. Build all four receipts for the bear put ladder: buy 25,000P @150, sell 24,600P @70 — cost/BE/max profit/max loss, plus the margin question (defined-risk ⇒ margin behavior vs naked short?).
2. Collar intro: hold shares ₹30 + buy 28P @1.2 + write 33C @1.5 — net protection cost, collar ceiling/floor, and why founders sleep inside collars. Compute worst-case per share.
3. Rent-ledger: 3 consecutive months writing 10%-OTM calls averaging ₹1.1 on sleepy ₹30 shares; annualized yield enhancement if never assigned vs single-assignment month reality — two-column honesty.
4. Strangle vs straddle duel: same event board (C 90 P 70 strangle 24,600/25,400 vs straddle 330) — receipts table: cost % of underlying, break-even distances, which one forgives a small move less?
5. IV-crush postmortem: event straddle bought IV 34%, spot +2.1% after, straddle reprices IV 15%: approximate the premium fate given theta+vega dominate the day, and the 2-line lesson with the IV-history habit.
6. Founder playbook: concentration ₹2.4L-representing own-co equity-adjacent position… design the year-1 protection program (protective put ladder vs collar zero-cost) and write the board's one-line justification.
7. Chooser sprint: assign builds to six views: 'definitely up big, vol cheap' / 'up mildly, vol screaming' / 'unknown but huge event, vol under-history' / 'unknown, vol screaming' / 'holding sleepy large-cap 2 quarters' / 'storm risk on concentrated holding'.

### ✅ Selected answers
1. Cost = (150−70)×75 = **₹6,000**; BE = 25,000 − 80 = **24,920**; max profit = (400−80)×75 = **₹24,000** at/below 24,600; max loss = ₹6,000; defined-both-directions ⇒ exchanges charge spread margins FRACTIONS of naked-writer margins — wings are visible in the margin file too.
2. Net cost = 1.2 − 1.5 = **−₹0.3 (the puts are cheaper than the calls rent)** ⇒ collar PAID you ₹0.3/share upfront; floor = 28, ceiling = 33 ⇒ worst-case = 30−28−0.3 = **₹1.7/share (−5.7%)** vs best-case +3.3: founders sleep inside collars because zero-cost insurance that caps 30→28 downside is the exact medicine for 90%-of-net-worth-in-one-ticker syndrome.
3. Never-assigned ledger: +1.1 × 12 ≈ +44% notional-yield fantasy — the honest column says expect assignment-months: one 20% rally assigns shares away at +10% +1.1 rent, ceding the thunder; annualized realistic enhancement = 8–15% with periodic caps, NOT 44%; rent ledgers that never count thunder losses are marketing decks.
4. Table: strangle cost ₹160×75 = ₹12,000 (0.64% notional), doors 24,440/25,560 ±1.76/2.24%; straddle ₹24,750 (1.32%), doors ±1.32% — the strangle forgives LESS on small moves (wider no-profit zone) but costs half; choice = your magnitude-view honestly priced: puny expected move => neither — flat is the position most backtests worship.
5. Estimate: IV halving at event-worn ATM strikes evaporates ~30–50% of the premium mechanically; textbook lesson: premium drops DESPITE spot +2.1%; lessons: 'price the vol side of the ticket before the spot side' and 'pull last 4 events' implied-vs-realized page before paying event-week screams' — the crush is scheduled, only its victims are surprised.
6. Program: quarterly-roll zero-cost collars (floor ≤ −8%, ceiling ≥ +12% — keep participation meaningful), sized to 100% of the concentrated block, funded by the call wing — board line: 'concentration insured at no cash cost; ceiling accepted as insurance premium; sleep restored, covenant-grade.'
7. Naked sized long calls / bull call spread / straddle-if-cheap / FLAT / covered calls on ladder / protective puts (or collar if cost-phobic) — the chooser is never wrong, only views are.

## ❓ Quiz
1. The bull call spread (buy 25,000C @180, sell 25,400C @90, lot 75) hands you:
   - (a) unlimited upside, max loss ₹26,250
   - (b) cost ₹6,750, max profit ₹23,250, BE 25,090, risk/reward ≈ 1:3.4 — you sold the tail you didn't believe to fund the move you did; defined risk on BOTH directions makes it the desk's favorite straitjacket (and margin files agree)
   - (c) free insurance
2. A covered call faithfully rented out does NOT:
   - (a) earn premium tonight
   - (b) protect against crashes — the ₹1.5 rent cushions ₹1.5 of a ₹9 fall; it's a sleepy-tape yield tool that caps your thunder (called away at 33 while it prints 36); the crash-bodyguard in this kit is the protective put, a different instrument for a different promise
   - (c) cap the rally
3. Buying an event straddle at IV 38% usually dies even when the event lands because:
   - (a) events are rigged
   - (b) IV crush: the scream was priced into the premium; post-event uncertainty collapses, vega evicts the loft, and a +1.8% spot move under a halved IV is a losing ticket — price implied-vs-realized history BEFORE paying for explosions
   - (c) straddles can't profit

### ✅ Answers
1. **(b)** — (a) is the fantasy version casinos also sell; wings cap both.
2. **(b)** — rent is not armor; armor is priced separately and behaves like insurance should.
3. **(b)** — the bill for uncertainty arrives BEFORE the answer; the answer then refunds nothing.

## ✅ Mastery checklist
- [ ] Protective put receipts built on any holding: floor, cushion %, insurance % narrated
- [ ] Covered-call honesty table (rent vs thunder-cedes) — assignment months included
- [ ] Any 2-strike spread decomposed to cost/BE/max-profit/max-loss in 60 seconds
- [ ] Straddle/strangle door math (premium → dual BE → required move) without a app
- [ ] IV-crush reflex: implied-vs-realized history checked before any event ticket
- [ ] 2×2 chooser recited with FLAT proudly in the menu

**Next:** **DV6 · Option Pricing & The Greeks** — put-call parity's ₹2.91 put puzzle, the one-step binomial that prices a call at ₹13.64 from pure arbitrage logic, BSM's five dials, and delta/gamma/vega/theta/rho as desk dials you'll actually turn! 🧮
