# 🎯 IN2 3 · Indices & the Money Flows — The Scoreboard and Who Moves It
> “NIFTY up 300 points” is the most quoted and least understood sentence in Indian finance. IN2 3 decodes the scoreboard: how a free-float index is actually computed (and what the divisor does), why SENSEX’s 1979 base of 100 makes long comparisons coherent, what rebalancing days do to the stocks entering and exiting, and the four money tribes — FII, DII, mutual fund SIPs, and direct retail — whose daily buy/sell prints narrate every session. End state: you read the 6 PM flow data like a weather report, not a horoscope.

## 🎯 Objectives
- Explain free-float market-cap methodology: index = Σ(free-float cap)/divisor, and why points ≠ rupees.
- Trace both flagships: NIFTY 50 (base 1,000 @ 3 Nov 1995) and SENSEX (base 100 @ 1979; near-800× by the mid-2020s story).
- Predict rebalancing mechanics: inclusions rally into the event, deletions sag — and what index funds mechanically do at the cutoff.
- Parse the daily flow table (FII/DII cash figures, MF SIP book) and know which tribe you can front-run and which you must never fight.
- Connect SIP flows (₹25,000+ Cr/month era) to market structure: the domestic bid that changed India’s correlation with global risk-off.

## 📘 Concepts

### 3.1 What the number actually is
A modern Indian index is **free-float market-cap weighted**: index value = Σ (price × free-float shares) ÷ **divisor**. Free-float = shares actually tradable (excludes promoter/government locked stakes) — so a giant with 80% promoter holding moves the index less than its size suggests. The DIVISOR is the continuity machine: stock splits, bonus issues, rights, dividends (price — NIFTY is a price index; the TRI version adds dividends back), and rebalancing would break the series, so the divisor absorbs every mechanical change — the index only moves when PRICES move. Consequence everyone forgets: **points are units of memory, not money** — “up 300” means nothing alone; +1.2% is the sentence.

### 3.2 The two flagships — and the long memory
**NIFTY 50** (NSE): 50 largecaps, base **1,000 on 3 Nov 1995** — the hedging/derivatives universe’s spine. **SENSEX** (BSE): 30 largecaps, base **100 in 1978-79** — with the mid-2020s quote around 80,000 marking ~800× over ~46 years ≈ **~15.5% CAGR before dividends** (TRI adds ~1pp) — the single best billboard for Indian equity compounding. Sector/benchmark family beyond: BANKNIFTY (the F&O arena’s loudest index), NIFTY Next 50, midcap/smallcap 150/250, and the smart-beta shelf (equal-weight, quality, momentum). Rule: when someone quotes “the market”, demand WHICH index and WHICH version (price vs TRI) — ₹-truths hide in the version gap.

### 3.3 Rebalancing — money in lockstep
Twice yearly, index committees swap members (criteria: float-cap rank, liquidity, F&O eligibility for NIFTY). Days before the cutoff, index funds MUST buy inclusions and sell deletions in exact weights — predictable, mechanical flows making inclusion-week micro-rallies and deletion-sags a semi-crowded trade (the edge now thins: the whole street calendar-watches). For YOU the lesson is structural: passive money doesn’t opine — it OBEYS rules — which is both its low-cost magic (IN2 6) and its rebalancing-day footprint.

### 3.4 The four money tribes — the 6 PM scoreboard
- **FII/FPI:** foreign institutional money — historically the price-setter at the margin; global risk-off = sell India first (EM basket), leverage everywhere, moody but deep.
- **DII:** domestic institutions — LIC, insurers, provident funds, mutual funds acting institutionally; steadier hands, SIP-fed.
- **MF retail (SIP):** the new tidal force — monthly systematic inflows crossed **₹25,000 Cr/month** during 2024-25 — a bid that arrives whether the monsoon does or not; it has visibly dampened India’s old FII-outflow crash-and-burn script (2020s evidence vs 2008/2013).
- **Direct retail:** 15+ crore demat accounts era — noisy, momentum-prone, dominant in smallcaps where institutions fear to swim.
Pro practice: read flows as CONTEXT (who is forced, who is free, who is mechanical), never as a solo signal — FII selling matched by DII buying tells you the ownership baton passing, not the market dying.

### 3.5 Reading the tape without worshipping it
One honest decimal system: (1) flows are NET numbers — ₹2,000 Cr sold on ₹30,000 Cr churned is a breeze, not a hurricane; (2) SIP money is STICKY (dates, auto-debits, 5y+ horizons) while FII money is RENTED (global mandates) — weight their signal-value accordingly; (3) extreme prints matter at EXTREMES (record outflows near panic lows often mark capitulation, not information); (4) never trade TOMORROW on a data published TONIGHT — the desk’s use for flows is calibration of regime (risk-on/domestic-bid/global-exit), not prophecy of Tuesdays.

## 🧪 LAB — Scoreboard floor (10 min)
1. Divisor drill: a 3-stock toy index (float-caps 100, 200, 300) has divisor 6 → index 100. Tomorrow a 2-for-1 split doubles shares of stock B while its price halves. Recompute float-caps, fix the NEW divisor so the index stays 100, and state the doctrine in one line.
2. Weight machine: mega cap A (promoter 75%) vs smaller B (promoter 20%) — same total cap. Which moves the index more per 1% price move and why?
3. Rebalance trade debrief: stock X enters NIFTY next Monday; index funds = ~3% of its float mechanically. Write the inclusion-week pattern and the TWO ways retail trades it badly.
4. Flow night: FII −₹3,100 Cr cash, DII +₹2,850 Cr, SIP book steady, NIFTY +0.4%. Write the four-line regime read a desk would log.
5. Points-vs-% rehab: headlines: “SENSEX crashes 1,100 points!” closing 79,000 → %? And the corresponding “NIFTY up 300 points!” at 23,900 → %? Award each headline a drama grade.

**Why this matters:** item 1 is literally how MSCI/NSE indices stay continuous; items 4–5 are the daily hygiene that keeps you from donating panic-premium to faster readers.

**🔑 Lab answers:** (1) post-split caps: 100 + 200 + 300 = **600, unchanged** — the price halves while shares double, so free-float cap self-cancels ⇒ divisor stays **6** — the doctrine: splits self-neutralize in market-cap math; the divisor moves only where cap math doesn’t self-cancel (composition swaps, bonus/rights) (2) **B**: index watches FREE-FLOAT cap — B floats 80% vs A’s 25%; the promoter’s locked shares cannot trade, so they cannot vote on the index; float is the franchise (3) pattern: volume builds into cutoff, mechanical buying lands at Friday close, post-inclusion the artificial bid vanishes (often a give-back week); retail errors — chasing the inclusion pop AFTER the cutoff (buying the forced bid’s exit liquidity), and shorting deletions into the exact day passive selling ends (4) regime: foreign de-risking fully absorbed by the domestic bid; price green says the baton passed without accident; log as “FII distribution / DII accumulation — correlation to global cues LOW this week”; tomorrow’s risk: if BOTH sell, no absorber remains — that is the only flow-night that earns a red flag (5) SENSEX 79,000 − 1,100 = **−1.37%** (a brisk Tuesday, not a crash); NIFTY 23,900 + 300 = **+1.26%** (a good day, not a festival); drama grades: both headlines fail the % test — convert points to percent BEFORE the limbic system reacts.

## 💪 Exercises
1. Toy-index engineering: extend the lab’s toy to 4 stocks with float caps 100/200/300/400 (divisor set to render index 100). Run: a +5% day on the 400-cap only, then a replacement of the 100-cap by a new 150-cap (fix divisor), and narrate each number.
2. SENSEX billboard audit: 100 (1979) → ~80,000 (mid-2020s): compute the CAGR, then redo INCLUDING ~1.2% dividend reinvestment, and write the two lines this billboard says about patience vs trading.
3. Free-float detective: find-style exercise — two identical-size companies, one PSU (govt 63%), one widely-held fintech: estimate each one’s index voice-share ratio, and conclude why PSU sectors historically under-weight their size.
4. Rebalance calendar: build the inclusion/deletion playbook (dates, flows, expected micro-moves, risks) for an equal-money bet with strict sizing — and the honesty paragraph on why this edge decays as it gets crowded.
5. Tribe portrait docs: write the 4-line identity card of each tribe — funding source, horizon, behavioral flaw, and the one report where you watch it.
6. Capitulation signsheet: list four tape+flow signatures of panic bottoms (record FII selling, DII record buying, VIX spike, smallcap collapse) — then the one contrarian action and its RULE (why contrarians still size small).
7. TRI sermon: investor says “NIFTY did 12% CAGR, my equity fund did 13.5% — alpha!” Compare against NIFTY TRI instead, recompute the gap, and write the corrected verdict sentence.

### ✅ Selected answers
2. 100 → 80,000 over ~46 years: CAGR = (800)^(1/46) − 1 ≈ **15.5%** price-only; with dividends reinvested ≈ **16.5%+**. Billboard lines: patient INDEX-holding alone turned ₹1L into ₹8Cr territory across two generations of scares; the same 46 years buried thousands of stock-pickers and almost every trader — the market’s generosity is collected by those who stop fighting the tape.
5. FII: global mandates, quarter-to-quarter horizon, flaw — India is a line in an EM basket (sold on global risk-off regardless of Indian merit); watch NSDL/exchange daily cash + derivative positioning. DII: premiums/pensions, multi-year horizon, flaw — herding into the same index heavyweights; watch monthly AMFI + institution cash prints. MF-SIP retail: salary-linked, 5y+ effective horizon, flaw — stoppage spikes at drawdowns; watch monthly SIP inflow/stoppage data. Direct retail: own savings, days-to-months horizon, flaw — leverage + smallcap romance; watch broker/client-cash data and smallcap breadth.
7. NIFTY TRI ≈ 13.2% vs fund 13.5% → the “alpha” shrinks to ~0.3pp BEFORE fees/impact were fully counted — verdict sentence: “Your fund matched the index while charging for beating it; the benchmark to beat was always TRI, and the price-index quotation was the whole trick of your argument.”

## ❓ Quiz
1. When a NIFTY stock does a 2:1 split, the index divisor:
   (a) doubles immediately
   (b) is untouched — price halves, shares double, free-float cap is self-neutral; the divisor absorbs only composition changes and non-neutral actions (bonus/rights, rebalancing) so the series moves ONLY on real price moves
   (c) halves immediately
2. The single deepest change in India’s crash-resilience since the 2010s is:
   (a) more FIIs
   (b) the SIP bid — ₹25,000+ Cr/month of sticky, date-driven domestic buying that absorbs FII exits and dampens the old global-risk-off smash; rented foreign money no longer sets the floor alone
   (c) faster exchanges
3. Passive index funds add the new NIFTY inclusion:
   (a) when they judge it cheap
   (b) at the cutoff, in exact index weights — no opinion, pure obedience; that mechanical bid creates the inclusion-week pop and the post-cutoff give-back, and it is why “cheapness” is a word passive never uses
   (c) gradually over months

### ✅ Answers
1. **(b)** — market-cap math self-cancels; divisors move only when cap doesn’t.
2. **(b)** — stickiness beats depth at panic o’clock; everything else is plumbing.
3. **(b)** — rules, not views; that is both the cost advantage and the footprint.

## ✅ Mastery checklist
- [ ] I can build/repair an index: float caps, divisor doctrine, replacement surgery.
- [ ] I quote moves in %, never in naked points.
- [ ] I know both flagships’ bases and the ~15.5% price-CAGR billboard.
- [ ] I can map rebalancing flows and the two retail mistakes around them.
- [ ] I read the four tribes’ flows as regime weather, sticky vs rented graded.

**Next:** IN2 4 · IPOs & Listings — DRHP detective work, book-building, the QIB/NII/retail quota map, anchor lock-ins, and why listing pops are a different asset class than long-term IPO returns.
