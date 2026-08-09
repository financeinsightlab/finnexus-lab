# 🎯 IC12 · CAPSTONE: The Stockroom Trial — Six Shelf Files, One Closing Night

> Year-end. Six shelf files on your desk at UrbanNest, and every trick this course taught is inside one of them: a formula choice hiding ₹2,000 of margin, a "normal capacity" assertion built to bloat rates, an NRV collapse with a recovery tail, a truck crossing state lines at midnight, a cost sheet with a moved valve, and an inventory museum begging for a match. Close the stockroom, face the audit committee memo, then the Forge. The shelf owns the P&L — tonight you audit the owner.

---

## 🎯 Objectives

- Close six inventory files end-to-end: formulas, absorption, NRV, transit, cost sheet, obsolescence
- Conduct the canon conductor table — every number of this course in one grid
- Write the stockroom-effects memo an audit committee acts on
- Survive the Interview Forge: ten questions, model answers, zero hesitations

## 📘 Concepts

### 12.1 The six files

**File 1 — The tile division's formula choice.**
Lots in the year: 100@₹50, 100@₹60, 100@₹70; sold 150 units @ ₹100. Policy currently WAC; the CFO proposes switching to FIFO "for presentation".

**File 2 — Plant 2's "normal capacity" assertion.**
Fixed production OH ₹24L. Management asserts normal capacity 9,000 units ("we've never made 12,000"); demonstrated normal is 12,000; actual production this year 10,000; sales sold all 10,000 made.

**File 3 — The gadget line NRV collapse.**
Cost ₹500/unit, 200 units. At 31-Mar: expected price ₹480, selling costs ₹20. Quarter later: recovery — expected price ₹515, same selling costs.

**File 4 — The midnight truck.**
₹25L electronics shipment, dispatched by vendor 28-March, received 3-April. Contract says **FOB shipping point**.

**File 5 — The disturbed cost sheet.**
RM open 40 / purchases 260 / RM close 60 / DL 80 / VOH 30 / FOH absorbed 50 / WIP open 20 / WIP close 30 / FG open 50 / FG close 40 — and the junior counted closing WIP at 10 "to be prudent".

**File 6 — The museum.**
Legacy gadget line: cost ₹6L, current realizable ₹1L. No write-down booked all year "awaiting a bulk deal".

### 12.2 The canon conductor table

File by file, the rulings (every figure python-verified):

| File | Verdict | Numbers | P&L effect |
|---|---|---|---|
| 1 — Formula | Stay WAC unless reasons change; FIFO switch is Ind AS 8 retrospective | WAC: COGS **₹9,000**, closing ₹9,000, GP ₹6,000 (40.0%) · FIFO: COGS **₹8,000**, closing ₹10,000, GP ₹7,000 (46.7%) | +₹1,000 GP swing is pure formula, plus restatement theatre |
| 2 — Capacity | Assert 9,000 REJECTED → rate ₹200 on true 12,000 normal | Absorbed 10,000 × 200 = **₹20.0L**; **₹4.0L unabsorbed expensed** (asserted 9,000 would force ₹266.7/unit → ₹26.67L absorbed > ₹24L actual: impossible) | ₹4.0L honest expense; fraudulent rate dies |
| 3 — NRV | Write down then reverse, capped | NRV ₹460 → write-down **₹40/unit × 200 = ₹8,000**; recovery NRV ₹495 → reverse **₹35/unit = ₹7,000** against current inventory expense, disclosed | −₹8,000 then +₹7,000, notes narrate both |
| 4 — Truck | BUYER's shelf (FOB shipping point) | Inventory ₹25L in-transit + payable ₹25L at 31-Mar | Asset + liability, zero P&L; FOB destination would have been vendor's |
| 5 — Cost sheet | WIP close = ₹30L, not "prudent" ₹10L | RM 240 → prime 320 → works 400 → CoP **₹390L** → COGS **₹400L** (WIP-at-10 distorts: CoP 410, COGS 420 — "prudence" tax ₹20L) | valve error = ₹20L profit error |
| 6 — Museum | Write down NOW | Cost ₹6L vs NRV ₹1L → **write-down ₹5L** this period | −₹5L once; dodging = +₹5L invented profit per quarter (₹1-law) |

### 12.3 The closing-night margin bridge

Presentation for the closing files (Files 1–6 standing on the ₹500L revenue / ₹240L base COGS story of the trading division):

| Effect | Direction | ₹L |
|---|---|---|
| Stay WAC (File 1) | no change vs last policy | — |
| Unabsorbed FOH truth (File 2) | expense line, one-time in-period | −₹4.0L |
| NRV write-down (File 3, 31-Mar) | within COGS/inventory-expense | −₹8,000 |
| Transit stock (File 4) | balance-sheet only | — |
| WIP valve corrected (File 5) | prevents a ₹20L COGS overcharge | protector |
| Museum burnt (File 6) | inventory expense | −₹5.0L |

Net charge tonight: unabsorbed ₹4.0L + gadget write-down ₹0.08L + museum ₹5.0L = **₹9.08L** against the year, every rupee evidence-backed, with ₹7,000 of Q1 reversal already visible and equally evidenced. (Arithmetic policy: write-downs and unabsorbed overheads are charged as identified; "prudence" in counting is disclosed as error, never elected as conservatism.)

### 12.4 The audit-committee memo (the deliverable)

> **To: Audit Committee, UrbanNest · From: Group Reporting · Re: Year-end inventory determinations**
>
> 1. **Formula policy unchanged (WAC)** — a FIFO switch proposed for presentation has been declined; any future switch is an Ind AS 8 retrospective restatement with quantified impacts (File 1's swing: ₹1,000 GP direction on this lot alone).
> 2. **Plant 2 absorption corrected** — normal capacity held at demonstrated 12,000 (rate ₹200); ₹4.0L unabsorbed overheads expensed. The 9,000 assertion (rate ₹266.7, absorbed ₹26.67L > ₹24L incurred) was impossible and has been rejected; cost-accounting sign-off added to the plant's rate-assertion workflow.
> 3. **NRV positions honest** — gadget line written down ₹8,000 at 31-Mar on expected-price evidence; reversal of ₹7,000 anticipated with Q1 recovery, capped and disclosed. Museum line burnt: ₹5L write-down; ageing-review cadence now quarterly with write-down SLA of the discovery month.
> 4. **Cut-off intact** — in-transit FOB shipping-point loads of ₹25L included as inventory with matching payable; last-GRN/dispatch walls documented and tested.
> 5. **Controls** — count errors published (File 5's WIP valve); ERP sub-ledger/GL/floor reconciliation standing monthly; tolerance-and-authority policy: counters never post, posters never approve.

### 12.5 Where the numbers land

Balance sheet: inventory carries the WAC shelves, the corrected WIP (₹30L), in-transit ₹25L, post-write-down gadget lines (₹92,000 on the 200 units), minus museum ₹5L. P&L: COGS ₹400L chain, plus identified lines (unabsorbed ₹4.0L, write-down ₹8,000, museum ₹5L). Notes: formulas by class, write-down AND anticipated-reversal circumstances, pledged-inventory status, and the capacity-utilization narrative that explains the ₹4.0L line. Cash flow: unchanged everywhere (none of these moved cash) — a quiet reminder that inventory "profits" never pay suppliers.

## 🧪 LAB — Sanction the Trial (10 min)

Close the file yourself before reading 12.2:

1. File 1: both formulas' COGS/closing/GP — and the Ind AS 8 price of switching.
2. File 2: both "normal" assertions' rates; the one impossible number that rejects 9,000.
3. File 3: the full NRV saga with lanes (March, Q1) and the cap rule.
4. File 4: shelf verdict and entries; flip the clause and re-rule.
5. Files 5+6: rebuild the chain at WIP-close ₹30L, then at "prudent" ₹10L, and burn the museum with its ₹1-law citation.

**Why this matters:** this is what inventory truth-telling looks like under time pressure — formula discipline, capacity integrity, NRV evidence, title terms, cut-off walls, obsolescence courage. The audit committee doesn't want your paragraphs; it wants your rulings with the working attached.

**🔑 Lab answers:**
1. WAC: ₹60 average → COGS ₹9,000, closing ₹9,000, GP ₹6,000 (40.0%). FIFO: COGS ₹8,000, closing ₹10,000, GP ₹7,000 (46.7%). Switch cost: retrospective restatement + disclosed rationale + quantified effects — a public confession that the old numbers need repapering.
2. Asserted 9,000: rate ₹266.7 → absorbed 10,000 × 266.7 = **₹26.67L > actual FOH ₹24L** — the absorption cap breaches: impossible, rejected. True 12,000: rate ₹200 → absorbed ₹20.0L, unabsorbed ₹4.0L expensed. One inequality killed the assertion.
3. March: NRV ₹460 → write-down ₹40/unit = ₹8,000 expense. Q1: NRV ₹495 → reverse ₹35/unit = ₹7,000 credited against inventory expense, disclosed — cap = the write-down taken, absolute ceiling = cost ₹500.
4. FOB shipping point: include ₹25L in-transit + payable. FOB destination flip: vendor's shelf till 3-Apr; book nothing in March. Clause is law.
5. Correct chain: 240 → 320 → 400 → 390 → **COGS ₹400L**. "Prudent" WIP-10: 240 → 320 → 400 → 410 → **₹420L** — a ₹20L unforced error wearing a halo; conservative counting is disclosed error, not measurement. Museum: write-down ₹5L now; dodging invents ₹5L/quarter via the ₹1-law until the exceptional-charge exit writes the confession.

## 💪 Exercises

1. Why is the FIFO switch's restatement the true cost of the switch, not the ₹1,000 margin move?
2. Name the exact inequality that kills fake capacity assertions, and state why it's a cap rather than a guideline.
3. Track File 3's 200-unit shelf from 500 → 460 → 495 → (hypothesis) 525: write every journal-worthy step still allowed.
4. Reconstruct the one document bundle that would flip File 4 from include-exclude: which two papers, whose custody, which dates?
5. File 5's valve error vs File 6's museum: which is fraud and which is sloppiness — and after what evidence does that flip?

### ✅ Selected answers

1. The swing is one lot's margin theater; the restatement announces the PREVIOUS formula mis-served readers for every comparable year — auditors repaper, analysts re-cut, and every policy-choice motive gets questioned. You don't just move ₹1,000; you confess your older numbers were built in the other universe, with quantified deltas.
2. **Absorbed at asserted normal ≤ actual incurred.** Algebraically: 10,000 × (24L/9,000) = ₹26.67L > ₹24L — breach. It's a CAP because capitalizing more fixed cost than exists mints an asset from nothing; guidelines bend, physics doesn't.
3. 500 cost → write down to 460 (₹8,000 expense) → reverse to 495 (₹7,000 credit, disclosed, cap respected) → at 525 NRV: restore the last ₹5 of the ₹40 floor and stop at cost ₹500 — never beyond; journals exist for 460 and 495 steps only, the 525 step is the final ₹5 restore if evidence holds. Everything above cost is sale-talk, not measurement.
4. The BUNDLE: signed contract showing FOB-destination terms → and proof of non-delivery by midnight (transporter's GPS/route sheet or receiving-dock log). With those, the truck's contents are vendor property at midnight → exclude from both inventory and payable (the papers must both exist: clause alone doesn't flip if the dock beat the clock).
5. File 5 is sloppiness UNTIL the count was knowingly mis-tagged (intent evidence: instruction trails, repeated direction) — then it's the same fraud family as File 6's museum (₹1-law, now with mens rea). File 6 is already fraud-flavored: a quarter-long dodge with "awaiting bulk deal" cover is measured-by-effects manipulation; the bulk-deal evidence either materializes or the wall stands: NRV discovered = charged, no deferral clauses.

## ❓ Quiz

**Q1.** File 2's rulings on absorption:
(a) accept 9,000 — management knows its plant
(b) assert-9,000 rejected: 10,000 × ₹266.7 = ₹26.67L > ₹24L actual breaches the absorption cap, so normal stays at demonstrated 12,000 → rate ₹200, absorbed ₹20.0L, ₹4.0L unabsorbed expensed this year; capacity assertions are audit territory with an inequality, not management poetry
(c) ₹240/unit both ways
(d) absorb ₹24L and expense nothing

**Q2.** File 3's saga from March to Q1 touches P&L as:
(a) −₹8,000 then nothing until sale
(b) −₹8,000 write-down (NRV ₹460 vs cost ₹500 per unit × 200), then +₹7,000 reversal when NRV reaches ₹495 — capped at the ₹40/unit floor taken, credited against inventory expense, both disclosed with trigger evidence
(c) +₹7,000 only
(d) −₹80,000 asset write-off

**Q3.** Files 4–6 combined tonight require:
(a) exclude the truck, WIP ₹10L, keep the museum
(b) include the ₹25L truck as buyer's inventory (FOB shipping point) with the payable; WIP at ₹30L keeping the chain at COGS ₹400L (₹10L "prudence" is a ₹20L self-inflicted valve error); museum burnt ₹5L now — clause-based title, honest counts, discovered-NRV charged
(c) truck vendor-owned; COGS ₹420L; write down ₹6L
(d) only disclosure, no numbers change

### ✅ Answers

1. **(b)** — the cap kills the fake assertion; the period pays the honest ₹4.0L.
2. **(b)** — down ₹8,000, back up ₹7,000 with caps and notes; the last ₹5 waits for evidence.
3. **(b)** — title by clause, counts by tags, obsolescence by discovery date: rulings, not vibes.

## 🎤 The Interview Forge — ten questions, model answers

1. **"What's in inventory cost, briefly?"** Purchase (net of discounts, excl. recoverable taxes), conversion (direct labour + variable OH on actual + fixed OH on normal capacity — ₹200/unit on the 24L/12,000 canon), and present-location/condition costs; excluded: abnormal waste, non-production storage, admin, selling, and interest unless Ind AS 23 qualifying (₹1.0cr/yr into maturing whisky). Unit canon: ₹141.
2. **"FIFO vs WAC in an inflation year?"** FIFO COGS ₹8,000 / GP ₹7,000 (46.7%) vs WAC ₹9,000 / ₹6,000 (40.0%) on the lots canon; FIFO fattens margins and keeps the shelf current; formula switching is Ind AS 8 retrospective restatement. LIFO: banned — old-cheap-layer games and fossil balance sheets.
3. **"NRV mechanics?"** Lower of cost and NRV, item by item; write-down ₹40/unit = ₹8,000 to P&L; reversal up to the write-down (₹35/unit = ₹7,000 at NRV ₹495), credited against expense, disclosed; materials safe-harbor while finished goods clear cost.
4. **"Why normal capacity, not actual?"** Idle machines belong to the period, not the pallets: 10,000 units at ₹200 = ₹20.0L absorbed, ₹4.0L expensed; under-production detonates the ₹9.6L swing (op profit +4.8 vs −4.8 with identical sales economics); over-production recomputes the rate down — the cap forbids manufacturing cost.
5. **"Whose shelf is the truck?"** Title by Incoterm: FOB shipping point — buyer's ₹25L in-transit + payable at midnight; FOB destination — vendor's until the dock. The clause is law; last-GRN/dispatch walls are enforcement.
6. **"How does shrinkage land?"** Book ₹100L vs floor ₹97L: write to ₹97L, expense ₹3L in cost-of-sales lanes; perpetual records + ABC cycle counts turn climaxes into questions; directional tolerance bands priced into policy.
7. **"Joint and by-product mechanics?"** By-product clipped at NRV first (₹4L whey) → pool ₹46L allocated by relative sales value: A ₹32.2L, B ₹13.8L; A's unit ₹322 on 10,000 units.
8. **"Steel's loss doctrine?"** ₹48cr ÷ 9,600t = ₹50,000/t; good output ₹47.5cr inventory; abnormal 100t = ₹50L expelled; normal 400t hidden inside the rate; footings must tie (47.5 + 0.5 = 48.0).
9. **"The museum question?"** Obsolete ₹6L cost vs ₹1L NRV → ₹5L write-down at discovery, not smoothing; dodging invents ₹5L/quarter (₹1-law) until the exceptional-charge confession — treat aged un-moved stock as a charge awaiting evidence.
10. **"What do disclosures tell an analyst?"** Formulas and classes, write-downs and reversals with triggers, pledged inventories (the shelf-as-collateral signal), and unabsorbed-expense lines; read with DIO trends and peer write-down ratios — admissions in slow motion, collected a year early.

## ✅ Mastery checklist

- [ ] I closed all six files with workings attached, not paragraphs
- [ ] I can conduct the canon table: 9,000/8,000 · 200/266.7 · 8,000/7,000 · ₹25L · 390/400/420 · ₹5L
- [ ] I survived the forge: mechanics, numbers and doctrine per question
- [ ] I can draft the audit-committee memo with the capacity inequality front and centre
- [ ] I can flip every file's answer when its one clause changes

---

🏆 **COURSE COMPLETE — Inventory & COGS (Ind AS 2)!** The shelf is yours: the ₹1-law and the self-correcting bridge, the ₹141 three-bucket autopsy with its exclusion wall, FIFO vs WAC margins (46.7% vs 40.0%) and LIFO's funeral, the ₹460 brake and the capped ₹7,000 reversal, the ₹200/₹160 absorption machine with its overproduction shelter (₹9.6L swing), the ₹400 cost-sheet chain, harvest handshakes and broker-traders at NRV, midnight-truck title doctrine, shrinkage ₹3L, steel's ₹50,000/t losses, solitaires' passports, and the cut-off fortress. **Next course: 🏭 Depreciation & PP&E (Ind AS 16) — v52** — the asset side's other great clock: components, useful lives, revaluation, and why a ₹9,000 crane is really five separate assets pretending.
