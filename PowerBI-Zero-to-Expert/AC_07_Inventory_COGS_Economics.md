# 🎯 AC7 · Inventory & COGS Economics — The Shelf That Thinks
> Stock on a shelf is cash that took a nap — and what it *dreams* (FIFO vs Weighted Average) changes reported profit. We learn inventory's identities (Opening + Purchases − COGS = Closing), the valuation families India permits, NRV honesty cuts, shrinkage confessions, and the velocity metrics — days, turns, GMROI — that tell a merchant whether shelves are earning or just busy.

## 🎯 Objectives
- Drive the **stock-flow identity** and find any corner of it under audit conditions.
- Value inventory under **FIFO and Weighted Average** (Ind AS 2 / AS 2: LIFO is banned in India) and quantify the P&L + balance-sheet divergence.
- Apply **Cost vs NRV, whichever is lower** — prudence's sharpest knife — with clean markdown entries.
- Read shrinkage: system vs physical gaps, normal vs abnormal, where it hides in margins.
- Score inventory productivity: **days, turnover, GMROI** — and pair them into one verdict.

## 📘 Concepts

### 7.1 The identity, again — but as a forensics tripod
```text
Opening Stock + Purchases − COGS = Closing Stock
ShopKart FY25: 41.7 + 205.0 − 198.8 = 44.2 ✓ (every corner recoverable from 3)
```
Tripod logic: auditors verify each corner by a different road — purchases from GSTR-ledgers, closing stock from physical counts, COGS from the register — and the identity must close. One fake corner, two honest ones ⇒ the lie is cornered. That is why inventory honesty matters mathematically, not just morally.

### 7.2 Valuation families — what did that unit cost, exactly?
Identical physical flow, different accounting flow. Demo basket (the retail mechanic's favorite):

```text
Buys: 100 @ ₹70 · 100 @ ₹73 · 120 @ ₹76   (total ₹23,420, 320 units)
Sell: 200 units
FIFO  COGS = 100×70 + 100×73 = ₹14,300  → closing 120 @ 76 = ₹9,120
WAC   avg = 23,420/320 = ₹73.1875 → COGS = ₹14,637.50 → closing ₹8,782.50
P&L divergence this period: ₹337.50 of pretax profit — nothing physical moved!
```

- **FIFO**: oldest costs leave first → closing stock shows *recent* (current) prices → healthy BS, and in inflation, *lower COGS → higher profit* → higher tax. Retail default (perishables demand it physically anyway).
- **Weighted Average**: smooths price swings; COGS parked mid-track; ideal for fungible stuff (grains, fuel).
- **LIFO**: newest costs leave first (inflation ⇒ high COGS, low profit, low tax, ancient values on BS). **BANNED by Ind AS 2 / AS 2 in India** (and IFRS) — but examiners love asking *why*: it reports yesterday's economy on tomorrow's BS.
- Specific identification (jewelry, custom machines): cost of THAT unit, used when units are distinguishable.

Perpetual vs periodic: under perpetual (barcode) inventory updates every scan; periodic recomputes only at counts — WAC behaves differently between them (moving-average vs period-average), a favorite distinction question.

### 7.3 NRV — prudence's knife
**Cost or Net Realizable Value, whichever is lower.** Fashion item: cost ₹950, season-end price ₹900, selling costs ₹30 ⇒ NRV ₹870 ⇒ markdown Dr Loss on inventory write-down 80 / Cr Stock 80 — per item class, not one global pot. The knife is asymmetric: mark down at ₹870 on signal, never mark UP until sold (profits on sale, losses on sight). Retailer reality: season-clearances are NRV premonitions made of racks.

### 7.4 Shrinkage — the quiet 1%
System stock ₹44.2L; annual physical count says ₹43.1L ⇒ **gap ₹1.1L (≈0.55% of COGS)** — sleeves-off shrink (pilferage, billing errors, spoilage, vendor fraud). Treatment: Dr Shrinkage expense/COGS 1.1 / Cr Stock 1.1. Management reads: <0.5% of sales is healthy retail; 1%+ = CCTV/process beating; 2%+ = someone got comfortable. The margin angle: an unexplained GM slide with clean buy-prices is *usually* a shrinkage confession.

### 7.5 Velocity metrics — days, turns, GMROI
```text
Inventory days = Closing stock / COGS × 365 = 44.2/198.8 × 365 = 81 days
Turnover      = COGS / Average stock = 198.8/42.95 = 4.63×/yr
GMROI         = Gross profit / Average stock = 81.2/42.95 = ₹1.89 per inventory-rupee
```
Judgments: 81 days of stock at 29% margin — the shelf nap is LONG (deep assortment vs fresh turns — grocery peers run 20–35 days of staples; premium apparel passes 100 happily). GMROI 1.89 > 1 means the nap pays rent, but the strategy room asks: can we swing 65 days with the same fill-rate and free ₹8.9L of cash? (Compute: at 65 days, stock = 198.8×65/365 = ₹35.4L ⇒ release 44.2 − 35.4 = **₹8.8L** — working capital found at home.)

### 7.6 Reading inventory like a forensic detective
- Stock days rising while revenue flatlines ⇒ warehouses of optimism.
- COGS identity trips: purchases up 40%, revenue up 5% — stock grows → is it strategy (new store) or stuffing (old store)?
- NRV markdowns clustered every March ⇒ the quarter quota machine confessed annually.

## 🧪 LAB — Aisle audit (10 min)
1. Identity: opening ₹22L, closing ₹18L, COGS ₹96L — purchases?
2. Value the mini-basket under FIFO and show closing value: buys 50@₹100, 50@₹110, sells 60.
3. NRV cut: winter hoodie cost ₹800, expected sale ₹750, sell-cost ₹60. Markdown per unit? Entry sides?
4. Turns & days: COGS ₹300L, avg stock ₹50L. And GMROI if gross profit ₹90L.
5. Cash release: COGS ₹250L, stock falls from 100 days to 70 days — how much inventory cash returns?

**Why this matters:** five minutes, five year-end-close staples — valuation method slips are the #1 repeat-finding in SME audits.

**🔑 Lab answers:** (1) P = 96 + 18 − 22 = **₹92L** (2) FIFO COGS = 50×100 + 10×110 = ₹6,100 ⇒ closing 40 @ 110 = **₹4,400** (3) NRV = 750 − 60 = ₹690 ⇒ markdown **₹110/unit**; Dr Loss/COGS 110 / Cr Stock 110 (4) turns = 6×; days = 50/300 × 365 = **60.8 days**; GMROI = 1.8 (5) stock: 250×100/365 = 68.49 → 250×70/365 = 47.95 ⇒ **₹20.5L released** (≈ ₹20.54L — a delivery van and change from thin air).

## 💪 Exercises
1. From the 7.2 basket, compute the two closings if the first-period sale consumed only 90 units.
2. Inflation chaos: prices rose 70→73→76. Which method reports the HIGHER closing stock and LOWER tax now — and one sentence on which economy favors FIFO truthfully?
3. India&LIFO: in three tight lines, defend the ban to an international student (BS staleness, tax timing, comparability).
4. Perpetual-periodic: same basket under periodic WAC vs moving-average WAC for interleaved sales — state in two lines why the numbers can legitimately differ.
5. Shrinkage autopsy: system ₹80L, count ₹78.4L, COGS ₹400L, sales ₹560L. Shrinkage %? Verdict vs the 0.5%/1%/2% ladder + one process proposal.
6. Days & fill-rate debate: a buyer wants 95-day stock for perfect availability; the CFO's answer uses GMROI and cash. Draft her two remaining questions (fill-rate evidence, demand variability) and the compromise metric.
7. The suspicious quarter: Q4 purchases ₹120L, COGS ₹80L, closing ₹60L (opening ₹20L). Identity check — does it close? If diverter — write the one-line suspicion.

### ✅ Selected answers
1. FIFO: sales consume oldest cost first ⇒ COGS = 90×70 = **₹6,300** ⇒ closing = 23,420 − 6,300 = **₹17,120**; cross-check by composition: 10@70 + 100@73 + 120@76 = 700 + 7,300 + 9,120 = **₹17,120** ✓ both routes agree. WAC: pool rate = 23,420/320 = ₹73.1875 ⇒ COGS = 90×73.1875 = **₹6,586.88** ⇒ closing = 230×73.1875 = **₹16,833.12** ✓. Note the signature: FIFO's closing runs ₹286.88 higher because its COGS stayed at the old, cheaper layer — the inflated-profits-with-inflation effect, unit-size edition.
2. FIFO: closing at recent high prices ⇒ fatter BS and COGS at old lows ⇒ **higher profit now, higher tax now**; in falling-price spells FIFO flips the story (bled profits through high-cost stock liquidation) — the method's "truth" tracks physically-earliest-out, which for perishables is literally the truth.
3. BS: LIFO's closing stock carries decade-old prices (India's baselines become fossils) ⇒ comparability dies; tax: inflation converts it into a deferral machine the exchequer tires of; worldwide: IFRS culls what it can't audit cleanly — Ind AS 2 follows. Three lines, ban defended.
4. Periodic WAC uses one period-average for ALL issues; moving-average reprices the pool after EVERY purchase — interleaved sales between purchases legitimately see different rates; same stock, two lawful answers — hence policy consistency in every comparative statement.
5. Gap ₹1.6L ⇒ 0.4% of COGS (0.29% of sales) ⇒ healthy band; proposal anyway: cycle-count high-value SKUs weekly (A-class ABC) — cheap detection keeps the healthy band from drifting.
6. Questions: (a) is today's OOS (out-of-stock) rate really cured at 95 vs 81 days — show the two-week pilot curve; (b) which SKUs drive the extra days — new assortment or slow movers, with demand σ? Compromise: A-class at 70 days, C-class cut to 40 — GMROI composite target 2.1 within 2 quarters.
7. Identity: 20 + 120 − 80 = 60 ✓ closes perfectly — and that's the lesson: the identity ALWAYS closes; COGS ₹80L during a ₹120L purchase quarter means ₹40L of stock stacked up; one-liner: "FY-end stocking boosts gross profit timing and next-year's markdown begging bowl — unless Q1 sales evidence says the buy was conviction, not cosmetics."

## ❓ Quiz
1. ShopKart FY25's closing stock (Opening 41.7 + Purchases 205.0 − COGS 198.8):
   - (a) ₹236.8L
   - (b) ₹44.2L — the tripod identity; auditors corner any fake corner because the other two are checked by independent roads (count + registers)
   - (c) ₹41.7L
2. In our rising-price basket (70→73→76), FIFO versus WAC reports:
   - (a) identical profit
   - (b) HIGHER pretax profit under FIFO (₹337.50 here) — oldest cheapest costs hit COGS first, leaving the recent pricey stock on a healthy BS; the price: more tax today (India's LIFO ban makes this the only choice in-country)
   - (c) lower stock value under FIFO
3. NRV markdown on the ₹800-cost hoodie (expected sale ₹750, ₹60 selling cost):
   - (a) ₹50
   - (b) ₹110 — NRV = 750 − 60 = 690, and prudence cuts at the lower of cost vs NRV, per class, never reversing upward until sold
   - (c) ₹140

### ✅ Answers
1. **(b)** — three-corner recover mastery is the auditor reflex this course hammers.
2. **(b)** — valuation ≠ physics: identical boxes, different accounts. Policy choice → earnings texture.
3. **(b)** — (a) forgot selling costs; (c) treated NRV as the price tag unnetted.

## ✅ Mastery checklist
- [ ] The tripod identity — any corner from any three — at calculation speed
- [ ] FIFO vs WAC divergence computed and its tax/profit story told both ways
- [ ] NRV markdowns executed per class — loss on sight, profit on sale
- [ ] Shrinkage gaps priced, %-laddered, and proposed controls
- [ ] Days / turns / GMROI in one breath, cash-release math from day-shifts
- [ ] Q4 stocking suspicion checklist ready (identity closes anyway!)

**Next:** **AC8 · Fixed Assets, Depreciation & Capex** — capitalize-vs-expense battle lines, SLM vs WDV duels, Schedule II lives, impairment audits, disposals with profit/loss — and the question that kills 90% of interviews: "Is depreciation a source of funds?" Machines, finally! 🚚
