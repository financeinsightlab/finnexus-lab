# 🎯 DV1 · Derivatives 101 — The Four Families & Why They Exist
> A derivative is a contract whose value *derives* from something else — wheat, the Nifty, an interest rate, a currency. Farmers invented them to sleep through harvests; Wall Street supersized them; SEBI watches India's F&O casino where 9-of-10 retail players lose. DV1 gives you the honest map: four families (forwards, futures, options, swaps), two legit purposes (hedging, price discovery), one dangerous costume (leverage-free-entry speculation), and ShopKart's live exposure list that this whole course will hedge.

## 🎯 Objectives
- Define derivative, underlying, notional, expiry, settlement — the five words that run every desk.
- Distinguish the four families by ONE property each: obligation vs right, custom vs exchange.
- Explain hedging vs speculation vs arbitrage, and why the same contract serves all three differently.
- Inventory ShopKart's real exposures (wheat, silver gifting, OD rate, receivable days) as the course's running hedge book.
- Respect the fire: leverage, daily MTM, and the SEBI 9-in-10 retail warning (BF2 callback).

## 📘 Concepts

### 1.1 The five desk words
**Underlying** (what the contract rides: wheat, Nifty 25,000, USDINR 83.5) · **Notional** (the size the contract references — 500 quintals of wheat is a ₹13L notional, you never pay ₹13L to hedge it) · **Expiry** (contract death date — last Thursday of month on NSE) · **Settlement** (cash: difference pays; physical: goods actually move — agri commodities often physical, index always cash). Derivative = all four, riding the fifth.

### 1.2 The four families — one property each
| Family | The one property | ShopKart-flavored use |
|---|---|---|
| **Forward** | Custom + obligation (OTC handshake) | Lock 500q wheat at ₹2,650/q with a miller for October |
| **Futures** | Exchange-traded forward: standardized + daily MTM + CCP guarantee | Same wheat hedge, but transparent, liquid, margin-backed |
| **Option** | A RIGHT, not an obligation — buyer pays premium for one-sided insurance | Investor floor at ₹28 on ShopKart-proxy shares: risk capped, upside kept |
| **Swap** | Exchange of CASH FLOW SERIES (rates, currencies) | Swap floating OD (MIBOR+3%) into fixed 11% for the expansion loan |

**Obligation vs right** is the soul-level split: forwards/futures/swaps bind both sides (symmetric outcomes); options sell asymmetry for a premium — the buyer's max loss is the ticket price, which is exactly why options were invented.

### 1.3 Three users, one arena
- **Hedger:** has the exposure ALREADY, uses derivatives to kill it (ShopKart's wheat bill −₹1L saved in DV3's worked canon).
- **Speculator:** has NO underlying, buys risk for profit — needs an edge, gets leverage + MTM discipline instead; SEBI's receipts: ~89–91% of retail F&O accounts lose money (avg loss ≈ ₹1.1L at the study window).
- **Arbitrageur:** eats mispricings between related markets (near-riskless, tiny, fast) — their grinding is WHY futures prices track fair value: the market's unpaid janitors.
Same screen, three professions. The desk asks one question before any trade: **which of the three am I being paid to be right now?**

### 1.4 Leverage & MTM — the physics of fast ruin
Margins let you control ₹18.75L of Nifty with ₹1.87L (10×); a 1% index day moves 10% of your posted margin. **Daily mark-to-market** settles losses every evening — no "hold till it comes back"; the account debits TODAY at 3:30. That is the machinery behind the 9-in-10 statistic: not stupidity (BF2), but leverage × noise × daily forced settlement × System-1 steering (BF1).

### 1.5 ShopKart's exposure inventory (the course's hedge book)
1. **Festival wheat/atta input:** 500 quintals needed in October — price was ₹2,600/q in July and climbing.
2. **Silver gifting packs:** 25 kg procured for Diwali corporate gifting — volatile precious metal.
3. **Interest rate:** ₹28L floating-rate expansion exposure — MIBOR bites both ways.
4. **Receivables/FX-lite:** a first B2B export enquiry (rice snack packs to Dubai) — small USDINR window.
By DV8 this book is fully hedged, margined, and stress-tested — every concept earns its keep on THIS list.

## 🧪 LAB — The family album (10 min)
1. Classify by the one property: OTC custom wheat deal · NSE Nifty contract · insurance-like ₹28 price floor · exchanging floating-for-fixed payments.
2. Compute: Nifty futures notional at 25,000 with lot 75? Initial margin at 10%?
3. "I don't speculate, I only hedge" — a wheat miller SHORTS wheat futures. Who's the hedger's mirror, and is the speculator a parasite? Two honest lines.
4. MTM drill: you buy 1 Nifty lot at 25,000; closes 24,800 next day. Cash debited (lot 75)? What % of your 10% margin is gone?
5. Which of the three users is an arbitrage fund at expiry when futures ≠ spot+fair carry? One line on its invisible social function.

**Why this matters:** item 4 is the drill that kills the 'F&O is like delivery but faster' misconception permanently — margins move daily, careers move accordingly.

**🔑 Lab answers:** (1) forward / future / option / swap (2) 25,000 × 75 = **₹18.75L notional**; margin = 10% = **₹1.875L** (3) mirror = the counterparty taking price risk for expected payoff; parasite-no, liquidity-yes: without risk-bearers, the miller's hedge has nobody on the other side — insurance needs insurers (4) −200 × 75 = **−₹15,000 debited tonight**; against your ₹1.875L margin that's **8% gone in a single −0.8% day** — the index moved 0.8%, your account moved 8%: leverage's multiplication table, certified (5) the expiry-day convergence trader; janitor of fair pricing: their forced alignment keeps futures honest for every hedger who'll never know their name.

## 💪 Exercises
1. Underlying/notional/expiry/settlement in your own words, with one ShopKart-flavored use per word.
2. Obligation-vs-right table from memory: who can lose more than the premium in each family, and why the asymmetry changed finance history.
3. The farmer's 200-year story (2,600₹/q → Devon's-your-price at harvest): retell with forwards as the innovation, and name the three modern frictions forwards still suffer (counterparty, liquidity, standardization).
4. Speculate-responsibly memo: friend wants to 'practice F&O with ₹50k saved from salary.' Write the 4-line risk-brief you'd WhatsApp (numbers from BF+today: 9-in-10, ₹1.1L, −0.8% day = −8% margin).
5. Exposure inventory for YOUR house (or household business): list 3 underlyings you already carry silently, and the family you'd rent to kill each.
6. Why do exchanges demand daily MTM instead of letting losses ride to expiry? Answer as a clearing-corporation risk officer in 3 lines (chain-of-default logic).
7. Notional myth-bust: 'swap notional ₹50L means ₹50L at risk.' Correct it with the interest-rate swap example (what actually changes pockets?).

### ✅ Selected answers
1. Underlying: what price you ride (wheat ₹2,600/q); notional: the size referenced (500q = ₹13L of wheat, traded with lakhs of margin instead); expiry: the contract's death certificate (last NSE Thursday); settlement: cash-diff vs goods-deliver (index = always cash).
2. Forwards/futures/swaps: BOTH sides face obligation — losses unbounded in theory, symmetric. Options: buyer's loss capped at premium; the SELLER earns the premium for standing under unbounded loss — insurance monetized; that's why exchanges demand bigger margins from writers, and why 'selling naked options' is the F&O obituary column's leading cause.
3. Farmer sells forward in June at ₹2,600 — destroys both drought-panic and glut-joy; frictions: counterparty may vanish at settlement, exiting early means begging the same counterparty, and every contract is a snowflake (grade/date/place all custom). Futures fixed all three with standardization + CCP + margining.
4. 'Receipts first: 9-of-10 retail F&O accounts lose (avg ~₹1.1L at the study window); a −0.8% index day deletes 8% of posted margin; leverage multiplies noise-paying System-1 trades; so F&O = school where tuition is mandatory and graduation is optional. If you must 'practice', use a ₹5k sleeve + journal + 48h cooling (BF5) — and expect an invoice, not an income.'
5. Samples: rent-linked-to-footfall (rate-ish exposure → fixed-vs-floating mindset); gold/silver gifting budget (metal futures or staggered buying); salary in INR with family abroad (FX forwards via bank); fuel/commute sensitivity (no retail contract — budget-band hedge, honest answer: not everything can be derivatived).
6. 'Losses that ride quietly compound into one giant defaultable promise at expiry; daily MTM converts credit risk into a sequence of small, survivable settlements; the chain (trader→broker→CCP) holds because nobody carries a season of someone else's weather.'
7. Notional is the REFERENCE size; what actually moves is the difference-in-rates flows: on ₹50L swapped fixed-11-vs-MIBOR+3, a 1% MIBOR divergence = ~₹50k/yr flows — the ₹50L principal never travels, and quoting it as 'exposure' is the classic media-fire-alarm illiteracy.

## ❓ Quiz
1. The defining split between option families and the other three is:
   - (a) options are cheaper
   - (b) options sell a RIGHT (capped loss = premium) while forwards/futures/swaps impose OBLIGATION on both sides — asymmetry is the product, premium is its price, and this single property is why options exist
   - (c) options are safer for sellers
2. Nifty at 25,000, lot 75, margin 10%: the notional controlled per lot is:
   - (a) ₹1.87L
   - (b) ₹18.75L — with ₹1.875L posted; a −0.8% index day debits ₹15,000 = 8% of that margin tonight; leverage is the reason MTM discipline exists and why 9-in-10 statistics grow
   - (c) ₹750
3. A clearing corporation demands daily mark-to-market primarily to:
   - (a) increase fees
   - (b) stop losses compounding silently into one expiry-day default bomb — credit risk becomes small daily survivable settlements; the trader→broker→CCP chain holds only if nobody carries a season of someone else's weather
   - (c) reward day traders

### ✅ Answers
1. **(b)** — (c) is backwards: sellers carry the unbounded side for the premium.
2. **(b)** — (a) is the margin, not the notional; (c) is pocket money, not a position.
3. **(b)** — risk plumbing beats risk prayer; fees are a side dish.

## ✅ Mastery checklist
- [ ] Five desk words deployed in one sentence about ShopKart's wheat hedge
- [ ] Four families sorted by obligation-vs-right and custom-vs-exchange without the table
- [ ] Hedger/speculator/arbitrageur roles + 'which profession am I in this trade' reflex
- [ ] Leverage-math reflex: any % move × 1/margin-fraction computed in 5 seconds
- [ ] ShopKart exposure book recited (wheat 500q, silver 25kg, OD rate, small FX window)
- [ ] MTM justification delivered like a CCP risk officer (chain-of-default three lines)

**Next:** **DV2 · Forwards & Futures Mechanics** — the cost-of-carry pricing law F = S(1+r)^T, contango vs backwardation, basis dance to zero at expiry, margin waterfalls, and why your wheat forward's price was never a mystery! ⚙️
