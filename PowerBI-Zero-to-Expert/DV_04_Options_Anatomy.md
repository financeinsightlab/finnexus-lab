# 🎯 DV4 · Options Anatomy — Calls, Puts & the Capped-Loss Knife
> An option is the only derivative that lets you have the upside and skip the downside — for a fee. That fee (the premium) is the entire industry's revenue, and your protection. DV4 dissects the two blades: calls (right to BUY) and puts (right to SELL), the capped-buyer/unbounded-writer asymmetry, payoff diagrams drawn from memory, moneyness maps, and intrinsic-vs-time value — the anatomy every strategy in DV5 is stitched from.

## 🎯 Objectives
- Define call/put, strike, premium, expiry, lot — and speak buyer vs writer fluently.
- Draw all four naked payoff curves (long call, short call, long put, short put) with breakevens marked.
- Map moneyness: ITM / ATM / OTM — and price intrinsic vs time value on any quote.
- Explain American vs European exercise (NSE stock options American-flavored history, index = European).
- Answer the retail question that kills more accounts than any other: "why did my winning-direction option still lose?" (time value + premium already paid).

## 📘 Concepts

### 4.1 The two blades and their four hands
- **Call:** right to BUY at strike K by expiry. Long call = bullish knife with capped loss. Short call = writer collecting premium, promising to deliver at K — obligation.
- **Put:** right to SELL at K. Long put = bearish/insurance blade. Short put = writer obligated to buy at K.
**The asymmetry knife (memorize as a table):** buyers of options cap loss at premium paid; writers carry unbounded loss potential for capping income. Writers don't 'sell options'; they sell insurance and must reserve like insurers — margins sized accordingly, careers sized accordingly.

### 4.2 Payoffs, drawn cold (Nifty 25,000, lot 75)
```text
LONG 25,000 CALL @ ₹180:  BE = 25,180 · expiry 25,400 → payoff 400 ⇒ P&L (400−180)×75 = +₹16,500
                          expiry ≤ 25,000 → −₹13,500 (premium, −100%, capped)
SHORT that CALL:          mirror: +₹13,500 max (premium kept) vs −₹16,500 at 25,400 and worse beyond
LONG 25,000 PUT @ ₹150:   BE = 24,850 · expiry 24,600 → (400−150)×75 = +₹18,750
SHORT that PUT:           collects ₹11,250, bleeds below 24,850 unbounded-ish (to 0×lot)
```
**Draw-them rule:** identify max-loss (premium for longs, unlimited-above/below for shorts), breakeven (K ± premium), slope (±1 beyond K). Quadrant-by-quadrant, no exceptions.

### 4.3 Moneyness map + value decomposition
Spot 25,000: call 24,800 = ITM (₹200 intrinsic + time), 25,000 = ATM (pure time), 25,200 = OTM (pure probability). Puts mirror (24,800 put = OTM). **Premium = intrinsic + time value;** time value peaks at ATM (maximum uncertainty) and bleeds to ZERO at expiry — which is why DV6's theta exists and why 'cheap OTM lotteries' decay towards their probable funeral.

### 4.4 American vs European + exercise mechanics
American: exercise ANY day (flexibility premium — US stocks, most commodity); European: only at expiry (NSE index options). Indian single-stock options were American since inception (exercise physically settled since 2019 — delivery risk assignable!), index options European. Practical: exercise = settlement against the counterparty chain; assignment lottery picks the writer. Most traders never exercise — they close positions; exercise mechanics matter when you're the writer (assigned = delivering/buying goods or shares, invoice included).

### 4.5 The premium paradox — right direction, dead option
Classic funeral: buy 25,000C @180 two weeks out; index rallies… to 25,120 (+0.5%!) close to expiry; premium melts 180 → 60; direction 'won', account lost. Why: you didn't buy the move — you bought the move BEYOND the priced-in move, before the clock ran out. Time value is a prepaid ticket that vaporizes nightly (theta). **Rule: budget the breakeven, not the direction: BE = K + premium; below it even being right is taxable tuition.**

## 🧪 LAB — The anatomy bench (10 min)
1. Long 24,500P @ ₹95, lot 50. BE? Expiry 24,300 and 24,700: P&L per lot each?
2. Decompose the ₹260 premium of a 25,000C with spot at 25,180.
3. Moneyness map: spot 25,000 — label: 24,500C, 24,500P, 25,500C, 25,500P.
4. Writer's war-story: sold 25,500C @ ₹40 (lot 75) 'safe income'; expiry printed 25,640. Receipts?
5. Paradox autopsy: friend bought an event-week OTM call, direction right (+0.4%), option −55%. Diagnose in two lines with the BE-governor included.

**Why this matters:** bench drills 2–5 are the exact conversations F&O desks and family WhatsApps repeat every expiry week.

**🔑 Lab answers:** (1) BE = 24,500 − 95 = **24,405**; at 24,300: (200−95)×50 = **+₹5,250**; at 24,700: premium dead = **−₹4,750 (capped)** (2) intrinsic = 25,180 − 25,000 = **₹180**; time value = 260 − 180 = **₹80** of clock-probability juice (3) 24,500C ITM; 24,500P OTM; 25,500C OTM; 25,500P ITM (4) index beyond BE (25,540): payoff (25,640−25,500)×75 = ₹10,500 vs premium kept 40×75 = 3,000 ⇒ **net −₹7,500** 'safe income' — writers eat the tail they sold (5) 'you bought 25,180+ of reality with an expiry-timer running; move arrived but sub-breakeven on melted clock — BE-governor: calculate BE BEFORE buying, size for move-beyond-priced-move, or spread the premium away (DV5).'

## 💪 Exercises
1. Payoff quartet: draw long/short 25,000C @180 AND long/short 25,000P @150 on one axes set; mark BEs, max loss/gain zones, and slopes; label where each hand prays to end at expiry.
2. Put-to-work: ShopKart-proxy shares held 1,000 @ ₹30 cost; buy 28P @ ₹1.2×1,000. Worst-case per share, floor guarantee, and the 'insurance receipt' two-liner if shares rally to ₹36.
3. Moneyness mechanics: spot ₹30 stock; strike 27 put quoted ₹0.8 — intrinsic? time value? what exactly does the ₹0.8 buy?
4. American vs European scenario: deep ITM 20,000P with spot at 18,500 two weeks pre-expiry — why might an American holder exercise early (hint: cash today earns interest) and why is it still usually sub-optimal for calls on non-dividend stocks?
5. Assignment night: you're short 2 lots 25,200C physically settled STOCK options, expiry 25,460. What lands on your plate Monday? (quantities, cashflows, total money moved)
6. Time-value horseshoe: same strike ATM premiums at 30d (₹300), 14d (₹200), 3d (₹90), expiry-day-morning (₹25)? Sketch the decay curve shape and its lesson for event-week buyers.
7. The writer's covenant: write the four margin-worthy warnings a broker should flash before enabling option-selling (unbounded loss, gap risk, assignment, liquidity mirage) — one line each, trader-vocabulary.

### ✅ Selected answers
1. Long C: loss −13.5k flat till 25,000, +1 slope from BE 25,180; short C: +13.5k cap flat till 25,000, −1 slope beyond. Long P: −11.25k flat till 25,000 (expiry ≥ K), +1 slope below BE 24,850; short P: +11.25k cap flat, −1 slope below 24,850. Expiry prayers: longs want far-beyond; shorts want pin-or-beyond-other-side; the axes don't lie even when CNBC does.
2. Worst-case per share = (30−28) + 1.2 = **₹3.2** capped — floor 28 guaranteed minus premium; rally to 36: put dies (−1.2), shares +6 ⇒ net +4.8/share: 'paid ₹1.2 to sacrifice no thunder and cap the flood — receipts: insurance is the only product you should pray to waste.'
3. 27P with spot 30 = OTM ⇒ intrinsic **₹0**; the whole ₹0.8 is time value = probability ticket of sub-27 by expiry; exactly what OTM 'cheapness' means: you're not buying value, you're renting chance.
4. Puts: early exercise converts intrinsic to cash NOW (interest + freed risk) — American deep-ITM puts rationally exercise sometimes; calls on non-dividend stocks: exercise forfeits remaining time value (always ≥ 0 pre-expiry) — selling the call beats exercising it, every calendar proof in the binomial textbooks says so.
5. Assigned: you must DELIVER 2 lots × lot-size shares at 25,200 to assigned holders; needing purchase at ~25,460 ⇒ effective loss ≈ (260 − premium kept) × shares; delivery shares land in your obligations Monday-AM with full cash-debit; writers of stock options who slept on expiry learned physical settlement's full name.
6. Curve: convex ACCELERATING — last week eats value fastest (300→200 halves the time but takes only a third of value; 3d→0 eats the rest): theta is a snowball-off-a-cliff. Event-week buyers fund the cliff; event-week writers own the cliff-edge property. Pick sides with clocks visible.
7. Warnings: 'loss can exceed margin — gap openings bypass stops'; 'expiry ITM means ASSIGNMENT — shares or goods, not apologies'; 'your cushion is premium-capped, your wound is unbounded — reserve accordingly'; 'liquidity you saw on entry may vanish exactly on your worst day (mirage)'. Four lines, every one an obituary somebody wrote.

## ❓ Quiz
1. Buying the 25,000 call at ₹180 (lot 75) sets your maximum loss at:
   - (a) unlimited below BE
   - (b) ₹13,500 — the premium, capped, whatever the crash below; that's what the ticket bought: asymmetry — but BE 25,180 means being 'right' below that level still invoices tuition (time value already paid and melting)
   - (c) ₹18.75L notional
2. A spot-25,000 board quoting 24,800C at ₹260 decomposes as:
   - (a) ₹260 time value
   - (b) ₹200 intrinsic + ₹60 time value — ITM carries real deliverable worth plus clock-juice; ATM options hold ~pure time value (max uncertainty peak), OTM are pure probability tickets decaying toward their probable funeral
   - (c) ₹200 time + ₹60 intrinsic
3. Writing (selling) naked options is structurally dangerous because:
   - (a) premium is too small
   - (b) income is capped at premium while losses run unbounded (call) or towards strike×lot (put) — you are the INSURER: one gap event against an under-reserved writer is how the F&O obituary column gets its weekly material
   - (c) buyers always win

### ✅ Answers
1. **(b)** — (c) confused notional with risk; (a) belongs on the writer's side of the fence.
2. **(b)** — decomposition is instantaneous: spot−K, remainder is the clock. (a)/（c) swapped anatomy.
3. **(b)** — sell insurance only with insurer-grade reserves; otherwise read item 2 of DV1 again.

## ✅ Mastery checklist
- [ ] Four naked payoffs drawn in < 90 seconds, BEs and cap-zones labeled correctly
- [ ] Decomposition reflex: any premium split intrinsic-vs-time on sight
- [ ] Moneyness map called on any strike board without hesitation (C/P mirrored)
- [ ] BE-governor installed: 'direction is not P&L; move-beyond-priced-move is' — quoted cold
- [ ] American-vs-European exercise economics + assignment-day mechanics narrated soberly
- [ ] Writer's four warnings recited in trader vocabulary (margins, assignment, tail, mirage)

**Next:** **DV5 · Option Strategies** — protective puts insure the ShopKart-proxy holding, covered calls rent out your shares, bull spreads cap cost AND cap risk (₹6,750 → ₹23,250 max), straddles for event-weeks that must explode either way — the lego set complete with every receipt! 🧩
