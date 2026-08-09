# 🎯 IC9 · The Manipulation Radar — Reversals, Disclosures, and the Overproduction Shelter

> Inventory is the P&L's favorite stage: it can hide cost (absorption games), hide decay (warehouses full of four-year-old stock at full price), and hide whole quarters of slack (formulas changed at exactly the right year). The antidote kit ships in two boxes — **reversal discipline** (the NRV brake's release handle, IC4) and a **disclosure inventory** that lets outsiders audit your shelf from the annual report alone. This module reads those disclosures the way an investigator reads them, then walks the manipulation hall of fame with the price tags attached.

---

## 🎯 Objectives

- Operate NRV reversal mechanics end-to-end (write-down → recover → cap → disclose)
- Read the Ind AS 2 disclosure inventory: classes, formulas, write-downs, reversals, pledges
- Deconstruct the overproduction shelter: produce-to-plan vs under-produce — the ₹9.6L swing canon
- Hunt the inventory museum and the dodged ₹5L write-down
- Profile formula surfing and rate-assertion bloat as policy-level games

## 📘 Concepts

### 9.1 Reversals, run like a grown-up

Every write-down opens a reversibility account (IC4's ₹40/unit floor): when NRV recovers, the reversal **restores up to the write-down taken** (₹35/unit was recovered in the canon when NRV reached ₹495 against cost ₹500; full ₹40 restore only if NRV returns to cost), credited against the period's inventory expense, with the circumstances disclosed. The discipline that separates reversals from revenue: they're corrections of a MEASUREMENT — they reduce cost lines, never populate income lines; and each period's write-downs AND reversals must be separately traceable in the notes. Auditors test reversal genuineness with the same evidence as the original write-down (post-year-end prices, orders, markdown calendars) — a reversal without market evidence is a write-down that was dodged until it could be timed.

### 9.2 The disclosure inventory — the detective's corkboard

Ind AS 2 requires, and analysts collect: (a) the accounting POLICIES adopted (cost formulas, measurement bases); (b) total inventories by CLASS (raw materials, WIP, finished goods, stores/spares, goods-in-transit — by your real operating classes); (c) inventories carried at fair value less costs to sell (the broker-trader minority); (d) the amount recognized as EXPENSE in the period (COGS line); (e) write-downs recognized in the period; (f) reversals recognized, with the trigger circumstances; (g) inventories **pledged as security** for liabilities (borrowed-against shelves — the working-capital financing line of every Indian midcap). Each item is a lever on a different question: classes tell you mod-mix risk; write-down patterns tell you markdown honesty; pledges tell you who really owns the shelf when things go badly.

### 9.3 The overproduction shelter — profit by piling pallets

The classic absorption-era game, updated for normal-capacity doctrine: producing ABOVE sales parks fixed OH in the closing pile; producing BELOW plan detonates unabsorbed expense NOW. Run both policies on UrbanNest Manufacturing (python-verified): price ₹700/unit, variable cost ₹400/unit, FOH ₹24L, normal capacity 10,000 units (rate ₹240/unit), sales 8,000:

| Policy | Produce | GP | Unabsorbed | Operating profit | FOH sleeping in closing pile |
|---|---|---|---|---|---|
| A — produce to plan | 10,000 | ₹4.8L | — | **+₹4.8L** | 2,000u × ₹240 = **₹4.8L** |
| B — under-produce | 6,000 | ₹4.8L | ₹9.6L | **−₹4.8L** | — |

Swing: **₹9.6L of reported operating profit** between two identical-economics scenarios — with revenue, prices, variable costs and FOH totals all equal. Doctrine's honesty: it doesn't ban the shelter (producing to plan is FINE), it just forces the alternative's cost into the open: unabsorbed-overhead lines of several lakhs are the printed smell of inventory-stacking decisions. Analysts: rising FG units + falling unit FOH-rate + utilization warnings = someone is warehousing their P&L.

### 9.4 The museum — and the dodged ₹5L

The second classic: obsolete stock kept at cost because writing down burns this year's bonus. **Canon:** UrbanNest's legacy gadget line: cost ₹6L of models that now fetch ₹1L (NRV) — the required write-down is **₹5L**, and every quarter it's dodged is ₹5L of invented profit. The museum's fauna records: stock ageing >180/365 days, no recent movement, spec superseded, expired shelf-life. The honest move hurts once; the dodge compounds — an 8-quarter-old museum usually exits as a "sudden exceptional charge" that, in any forensic retelling (EQ course, v55), was eight small crimes pretending to be one surprise.

### 9.5 Formula surfing and rate-assertion bloat

Policy-level games: switching FIFO↔WAC to suit price direction (Ind AS 8 retrospective restatement makes the switch public and humiliating — but immaterialized variants exist, like reclassifying SKUs between classes with different formulas: watch the policy note drift), and bloating overhead rate bases (asserting "normal capacity" low to inflate absorbed rates — IC5's audit bait, rate ₹266.7 at a fictional normal of 9,000). Both live at the edge of the policy note: disclosure reading is 20% of the radar; the other 80% is the physical story (units, utilizations, ageing) refusing to match the accounting story.

### 9.6 The red-flag cluster — print it

- FG units rising faster than sales — absorption shelter likely.
- DIO climbing while industry peers hold steady — museum under construction or demand dying unannounced.
- Write-downs consistently BELOW peers in a falling market — NRV optimism, reversal bait ahead.
- Gross margin resilient while input costs scream — absorption or formula assistance in progress.
- Unabsorbed-overhead lines ballooning — utilization truth finally printing (watch for the NEXT year overproduction "fix").
- Pledged inventory rising against stagnant borrowings — the shelf is the security; price the risk accordingly.

## 🧪 LAB — Radar Calibration Week (10 min)

1. The ₹495-recover canon: original write-down ₹40/unit (cost 500, NRV 460→495) on 200 units — reverse how much, where does it land, what note accompanies it?
2. Rebuild the shelter table (A vs B) from price ₹700, variable ₹400, FOH ₹24L, normal 10,000, sales 8,000 — and locate the ₹4.8L sleeping FOH.
3. Museum exposure: cost ₹6L obsolete, NRV ₹1L. Required charge; the profit effect of dodging it this quarter; the exceptionality lie that exits the fraud in year two.
4. Your analyst note flags: FG units +22% YoY, sales +3%, unit FOH absorbed rate −8%. One-sentence conclusion and one test you'd run.
5. Pledge check: inventories pledged ₹40cr against working-capital limits ₹25cr, limits fully drawn. Two questions for the CFO and a clause you now price into the risk view.

**Why this matters:** disclosures are admissions in slow motion — write-down lanes, reversal narratives, and pledge notes tell you the company's inventory behavior a year before the P&L admits it. The radar is pattern-matching these admissions to the physical story.

**🔑 Lab answers:**
1. Reverse **₹35/unit = ₹7,000**: credit the current period's inventory-expense line (write-down reversal / COGS reduction), disclose amount AND the circumstances that triggered it — cap at the original ₹40 floor; a hypothetical ₹520 NRV buys no bonus beyond cost ₹500.
2. A: produce 10,000 → absorbed ₹24.0L, GP ₹4.8L, op profit **+₹4.8L**, closing 2,000 × ₹240 = **₹4.8L FOH shelved**. B: produce 6,000 → absorbed ₹14.4L, ₹9.6L expensed now, op profit **−₹4.8L**. The ₹9.6L swing is the whole lesson — and GP doesn't even move; the game is played in the unabsorbed line below it.
3. Required write-down **₹5L** this period; dodging it = +₹5L invented profit (₹1-law: shelf error = profit error). The exit wound: later "exceptional write-off" headlines pretending the eight quarters never warned anyone — treat any museum's sudden cleansing as PRIOR manipulation until proven innocent.
4. *"Production outran sales and unit absorption eased — are we warehousing fixed cost to defend margin?"* Test: reconcile production, dispatch and FG-physical counts (units, not rupees) vs the absorbed-rate assertion and utilization disclosures.
5. (1) What exactly is pledged — which classes, at what values, at which locations (any in-transit/consignment stock arguably excluded)? (2) What happens to covenant/reporting of stock statements when drawdown pressure rises? Priced clause: inventory-backed funding makes reported inventory values a CREDIT event — the shelf is not just an asset, it's collateral whose measurement your lender re-reads monthly.

## 💪 Exercises

1. Why cap reversals at the original write-down rather than at cost itself? Isn't "up to cost" the same thing?
2. The shelter swing lives below GP. Which metric pairs expose it anyway? Two, with direction signals.
3. Draft the NRV evidence file for a fashion retailer's monsoon-end markdown test: four documents, one per evidence class.
4. A controller proposes smoothing write-downs: ₹5L museum spread over 8 quarters at ₹62,500. Rule on it.
5. Why do pledged-inventory disclosures matter more in India than most markets? Name the financing structure behind it.

### ✅ Selected answers

1. "Up to cost" IS the cap when the write-down took you below cost — the original write-down amount is exactly the distance you travelled. The refinement: when write-downs were partial-year or the stock partially sold, the remaining restore-cap is the per-unit write-down attached to units still on hand — track it item by item. Reversal may restore to cost ₹500, never beyond, and never more than what was removed from that item.
2. FG units vs sales units (production-vs-sales divergence: FG +22% vs sales +3% screams), and the absorbed-FOH-rate trend/utilization vs normal-capacity assertion (a rate drifting down while piles rise prices the game in rate-terms). Together they catch swings even when GP lines stay theatrically flat.
3. Post-year-end realized selling prices per SKU group (actual invoices); the markdown calendar applied at period end (authorized price lists); slow-movement/ageing reports (last-sold dates, stock cover); and the prior-year pattern of reversals (how accurate were past NRV calls). Each answers one question: what could it fetch, what did it fetch, how fast does it move, and how honest have we been.
4. Rejected — a write-down is an ESTIMATE of today's NRV, not a smoothing program: if the market says ₹1L now, the ₹5L charge belongs entirely to THIS period; spreading manufactures eight quarters of dishonest margins and an Ind AS 8/estimate-adjacent misstatement with minutes of delay as its only defence. The museum burns when it's discovered, not when it's convenient.
5. Working-capital finance in India runs largely on stock-and-book-debt hypothecation: monthly stock statements to banks, drawing-power computed off inventories. So the pledged shelf is dual-purpose — accounting asset AND credit collateral. Measurement games up-value the borrowing base; bank audits of stock statements are the other auditor nobody invited. Hence the radar treats pledges as a first-class signal, not boilerplate.

## ❓ Quiz

**Q1.** Write-down ₹40/unit taken; NRV recovers to ₹495 (cost ₹500). The period shows:
(a) ₹40/unit reversal into other income
(b) ₹35/unit reversal = ₹7,000 credited against current inventory expense, disclosed with its trigger circumstances, capped at the write-down taken — restoration refunds the floor removed, and never mints gains into income lines
(c) nothing until sale
(d) revaluation surplus ₹40/unit

**Q2.** Price ₹700, variable ₹400, FOH ₹24L, normal 10,000, sales 8,000: under-producing 6,000 vs producing 10,000 swings reported operating profit by:
(a) ₹0 — production is a balance-sheet detail
(b) ₹9.6L — identical GP ₹4.8L either way, but under-production detonates ₹9.6L unabsorbed overhead as period expense while produce-to-plan parks ₹4.8L of fixed OH inside the closing pile; the swing prints in the unabsorbed line where analysts read utilization truth
(c) ₹4.8L via GP differences
(d) ₹24L, the full FOH

**Q3.** The ₹6L-cost / ₹1L-NRV obsolete line requires:
(a) a ₹5L provision spread per judgement
(b) an immediate ₹5L write-down — obsolescence discovered is measured NOW; dodging it invents ₹5L of this-period profit one-for-one, and the "surprise exceptional charge" that exits years later is the museum's confession, not its discovery
(c) reclassification to stores
(d) disclosure only, no charge

### ✅ Answers

1. **(b)** — capped, expense-credited, disclosed; reversals are measurements corrected, not income minted.
2. **(b)** — the shelter lives below GP: unabsorbed lines and parked OH swing ₹9.6L between equal economics.
3. **(b)** — the museum burns when discovered; spread it and you become the eight quarters of dishonesty.

## ✅ Mastery checklist

- [ ] I can run write-down → reversal with caps, lanes and disclosure notes (₹40 → ₹35/₹7,000)
- [ ] I can recite the disclosure inventory and the question each item answers
- [ ] I can rebuild the ₹9.6L shelter swing and locate the ₹4.8L shelf-sleeper
- [ ] I can price a museum dodge (₹5L/₹1-law) and narrate its exceptional-charge exit
- [ ] I can cluster red flags into a 6-line radar from any annual report

**Next:** IC10 tours the verticals — FMCG's FEFO and free-sample wall, process industries' ₹50,000/t normal/abnormal split (steel canon ₹47.5cr/₹50L), pharma's expiry tunnels and batch ID, and jewellery's specific-identification-with-hedging world.
