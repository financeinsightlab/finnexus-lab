# 🎯 IC6 · The Cost Sheet — From Raw Material to COGS in One Ruled Chain

> The bridge you learned in IC1 — opening + purchases − closing — has a factory-sized twin. Between raw material and COGS sit three more doors: materials consumed, prime cost, works cost, cost of production — each adjusting for a different stage of inventory (raw, WIP, finished). The cost sheet is that chain, and the ₹400 canon runs it end-to-end without losing a paisa. Master this, and "gross margin" stops being a ratio you accept and becomes machinery you can rebuild.

---

## 🎯 Objectives

- Assemble the full cost sheet: RM consumed → prime → works → cost of production → COGS (**₹400 chain canon**)
- Distinguish COGS from "cost of sales" (selling/distribution excluded)
- Use the **retail method** legitimately: margin-law shortcut for high-volume, fast-turnover retail
- Use **standard costs** as an Ind AS 2-allowed technique — variance discipline and review
- Read gross-margin movements backwards into which cost-sheet floor moved

## 📘 Concepts

### 6.1 The chain — five stations, no skipping

The ₹400 canon (every link python-verified), UrbanNest Manufacturing year:

| Station | Mechanics | ₹L |
|---|---|---|
| Raw materials consumed | 40 (opening RM) + 260 (purchases) − 60 (closing RM) | **240** |
| **Prime cost** | + direct labour 80 | **320** |
| **Works / factory cost** | + variable OH 30 + fixed OH absorbed 50 | **400** |
| **Cost of production** | + opening WIP 20 − closing WIP 30 | **390** |
| **COGS** | + opening finished goods 50 − closing finished goods 40 | **400** |

Read the chain like a customs corridor: materials become prime with labour, prime becomes works with overheads (absorbed per IC5's normal-capacity machine), works becomes production-cost after the WIP swing, and production-cost becomes COGS after the finished-goods swing. Every adjustment is an INVENTORY number — raw, WIP, finished — so the shelf controls the expense at three separate borders, not just one. (Audit consequence: factories have THREE cut-off gates to police, and WIP is the one people look at last.)

### 6.2 COGS vs cost of sales — one clause apart

Cost of sales = COGS + selling/distribution-type costs (if your presentation includes them). Ind AS 2's COGS stops at the goods' departure — sales freight, commissions, marketing sit below, in their own lines (IC2's wall, fourth brick). When reading a P&L: "cost of materials consumed", "purchases of stock-in-trade", "changes in inventories" (the Schedule III lines) ARE the chain, just presented in a different wardrobe — map one onto the other once and every Indian P&L becomes transparent.

### 6.3 The retail method — margin law for the fast shelf

A trader with thousands of SKUs turning quickly can't weigh every unit: Ind AS 2 permits the **retail method** — measure closing inventory at SELLING prices and convert to cost via the **gross-margin percentage** (with markdowns pierced: subtract them so the margin law isn't flattered by dead stock at full ticket).

**Canon (python-verified):** ShopKart's grocery aisle: opening inventory at cost ₹20L, purchases ₹60L, sales ₹100L, standard gross margin 30% → COGS = 100 × (1 − 0.30) = **₹70L** → closing inventory at cost = 20 + 60 − 70 = **₹10L**. Guardrails: the margin must be the REALIZED margin pattern (markdowns push margin down; ignoring them overstates closing stock), and per-department percentages where mix differs. It is an approximation with seatbelts, not a magic wand.

### 6.4 Standard costs — legitimate if leash-trained

**Standard costs** may be used for convenience if results approximate actual: standards set from engineered BOMs and normal efficiency, reviewed regularly (and revised on significant change), with variances analyzed and treated consistently — price variances to the period's purchases/COGS in the main, significant efficiency/volume variances analyzed, and at year-end inventory is restated toward ACTUAL cost if standards drift materially. The leash: if your standard cost ₹140 and actuals run ₹141, the ₹1 variance can't quietly die in the standard; it lands in the P&L or is prorated — the shelf must approximate truth, not policy.

### 6.5 Margin forensics — reading the chain backwards

Gross margin fell 240bps. Which floor moved? Materials price (RM consumed line), labour (prime), absorption (works — normal-capacity assertion or utilization), or WIP/FG swings (cut-off or stage-management). Each station has its own suspects, and IC9 turns this into a full manipulation radar: margins don't "fall"; they are MOVED through one of five doors, and the cost sheet names every door.

## 🧪 LAB — Build the ₹400 Chain (10 min)

1. Assemble the full sheet from: RM open 40, purchases 260, RM close 60, DL 80, VOH 30, FOH absorbed 50, WIP open 20, WIP close 30, FG open 50, FG close 40. Name each station's value.
2. The WIP closing had been counted as 10 instead of 30. New COGS — and which direction did profit move?
3. Retail method: ShopKart aisle: opening ₹20L, purchases ₹60L, sales ₹100L, margin 30% → closing at cost? What if unrecorded markdowns meant the realized margin was 25%?
4. Standard-cost desk: standard ₹140/unit, actual ₹141, 50,000 units through COGS. Total variance, and the honest way it must NOT be treated.
5. Margin forensics drill: GP% slid from 52.0% to 49.2% with sales flat. List the three cost-sheet floors you'd interrogate first, in order, with one evidence item each.

**Why this matters:** the chain is how reported gross profit gets built in every Indian manufacturer Month-12 close; if you can't rebuild it from raw figures you can't audit it, explain it, or defend it in an interview beyond paragraph depth.

**🔑 Lab answers:**
1. RM consumed **240** → prime **320** → works **400** → cost of production **390** → COGS **400** (all ₹L; each link verified: 40+260−60; +80; +30+50; +20−30; +50−40).
2. WIP close 10: cost of production = 400 + 20 − 10 = **410** → COGS = 410 + 50 − 40 = **₹420L**. COGS rose ₹20L — LESS inventory parked mid-chain means MORE expense now: the WIP swing moved profit down ₹20L. Stations aren't scenery — they're valves.
3. Closing at cost = **₹10L** ✓. At realized 25%: COGS = 100 × 0.75 = 75 → closing = 20 + 60 − 75 = **₹5L**. Ignoring real markdowns leaves ₹5L of dead stock priced at ticket-margins — the classic retail-method own-goal; markdown calendars are the seatbelt.
4. Variance = 50,000 × ₹1 = **₹50,000**, adverse. It must NOT be silently extinguished inside the standard — book it to the period's COGS (or prorate between closing stock and COGS if material), and review the standard: a ₹140 standard perpetually missing by ₹1 is a lie told slowly.
5. (1) **Materials** — RM-consumed trend vs purchase-price indices and vendor invoices (evidence: weighted landed price per key input); (2) **Absorption** — the FOH rate and this year's utilization vs the normal-capacity assertion (evidence: absorbed vs incurred reconciliation); (3) **WIP/FG swings** — the closing-count changes vs production schedule (evidence: cut-off GRN/dispatch tests). Margin never "falls"; it moves through named doors.

## 💪 Exercises

1. Why does the WIP station exist separately from the FG station — what different fraud and error profiles live at each?
2. Map Schedule III's P&L lines ("cost of materials consumed", "changes in inventories") onto the cost sheet stations.
3. When does the retail method become illegitimate even if arithmetic-perfect? Two conditions.
4. Standard-cost review discipline: what triggers a standard revision, and who should own it?
5. A controller books the ₹50,000 adverse variance by increasing closing stock value. Rule on it.

### ✅ Selected answers

1. WIP is the factory's fog — quantities, completion %, and scrap all estimated; it's the least observable inventory class and the easiest valve for shifting cost between periods (overstate closing WIP, and cost of production ~ profit rises). FG is physical and sale-ready — errors live in cut-off (sales recorded vs goods shipped) and NRV (dead stock overvalued). Different fog, different flashlights: WIP gets production-schedule cross-checks; FG gets dispatch cut-off and markdown tests.
2. "Cost of materials consumed" IS station one (opening + purchases − closing, direct material only). "Purchases of stock-in-trade" is the trader's version feeding its own bridge. "Changes in inventories of FG/WIP" = the two swing adjustments (WIP and FG stations) collapsed into one presentation line — and Employee/OH expense lines separately feed prime/works in the cost-sheet view. One entity, two wardrobes.
3. When margin percentages are stale (realized margins moved with markdowns/promotions while the applied percentage didn't) — closing stock inflates at ticket margin; and when applied to slow/obsolescence-prone stock whose NRV is below the margin-derived "cost" — the method approximates COST only; the lower-of-NRV brake (IC4) still rides over it. Rail-ticket arithmetic can't answer a rotten shelf.
4. Triggers: raw-price regime changes, BOM redesigns, process/labour-rate settlements, efficiency-program completions — any of which makes the standard materially unlike actual. Ownership: split — engineering/production own assumed consumption, finance/FP&A own prices and rates, both sign annually; unilateral finance-owned standards become sandbagging machines (soft standards manufacture favorable variances by design).
5. Rejected — adverse variance is COST INCURRED beyond standard; parking it on the balance sheet converts a period loss into shelf value with no goods to show — an asset from thin air. Treatments allowed: charge to the period's COGS, or (only when material and logically allocable) prorate between closing inventory and COGS — the shelf may bear variance only as far as REAL goods bear real cost.

## ❓ Quiz

**Q1.** The canon chain RM 240 → DL 80 → VOH 30 + FOH 50 → WIP 20/30 → FG 50/40 produces:
(a) COGS ₹390L
(b) prime 320 → works 400 → cost of production 390 (WIP swing) → COGS ₹400L (FG swing) — four inventory-bordered valves, each altering WHICH period pays; overstate any closing stage and that station's expense deflates today's cost line
(c) prime cost ₹400L
(d) cost of production ₹420L

**Q2.** The retail method is legitimate only when:
(a) margins are always 30%
(b) selling prices convert through the REALIZED margin pattern — markdowns pierced in — reviewed per department; it approximates cost, and the lower-of-NRV brake still tests the resulting stock independently
(c) auditors pre-sign the percentage
(d) SKUs are few and slow-moving

**Q3.** Standard ₹140 vs actual ₹141 for 50,000 units sold:
(a) ignore, standards smooth
(b) the ₹50,000 adverse variance books to the period's COGS (or is prorated between closing stock and COGS if material), and the standard itself gets reviewed — year-end inventory must approximate ACTUAL cost, and a standard missing every month is a policy lie in instalments
(c) credits add to closing stock
(d) debit a reserve

### ✅ Answers

1. **(b)** — five stations, two swings; each closing-stage valve moves expense between periods.
2. **(b)** — realized margins, markdowns pierced, NRV brake still riding.
3. **(b)** — variance is real cost: expense it or prorate it, and re-aim the standard.

## ✅ Mastery checklist

- [ ] I can rebuild the ₹400 chain with both swings from raw figures
- [ ] I can move a ₹20L WIP-count error through the corridor and name the profit shift
- [ ] I can run the retail method (₹10L at 30%) and expose the markdown own-goal (₹5L)
- [ ] I can rule on variance treatment and standard-review ownership
- [ ] I can trace a 240bps slide to the first three floors with evidence per floor

**Next:** IC7 crosses the borders — Ind AS 41's living inventory (₹8.0L harvest deemed-cost canon), commodity broker-traders' full-NRV existence, real-estate developers' land-parcel inventory, and the RERA-era consequences of when land is PP&E, investment property, or pure shelf stock.
