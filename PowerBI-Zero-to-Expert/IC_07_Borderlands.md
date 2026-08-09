# 🎯 IC7 · The Borderlands — Harvest Fields, Commodity Desks, and Land Parcels

> Inventory accounting is calm inside the fence. At the borders it gets biological (apples don't have purchase invoices), it gets speculative (barley bought to resell next week), and it gets concrete (a developer's land is somebody else's 100-year asset). This module patrols three borders: **Ind AS 41's living world** and the harvest-day handshake, **commodity broker-traders** living full-time at NRV, and **real estate** — where the identical plot flips between inventory, PP&E and investment property based on one question: what is it FOR?

---

## 🎯 Objectives

- Walk the Ind AS 41 → Ind AS 2 handshake: biological assets, harvest, deemed cost (₹8.0L canon)
- Measure commodity broker-traders at NRV−costs-to-sell with P&L rides — and who else gets partial NRV escapes
- Classify land and buildings across three standards by INTENTION (developer stock vs factory vs investment property)
- Account for agricultural produce processing (post-harvest conversion at Ind AS 2 rules)
- Read real examples: orchards, dairy, tea, and RERA-era developer shelves

## 📘 Concepts

### 7.1 The living world and the harvest handshake

While it grows, it's NOT Ind AS 2: a standing crop, a tea bush's flush, a dairy herd, timber on its feet — these are **biological assets** measured under **Ind AS 41 at fair value less costs to sell**, with changes riding through P&L as the biology itself gains value (the orchard appreciates while nobody sells anything). The standard flips exactly once: **at the point of harvest**. Agricultural produce AT harvest is measured at FVLCTS — and that number becomes the **deemed cost at which Ind AS 2 inventory begins**.

**Canon (python-verified):** UrbanNest Orchards harvests 10 tonnes of apples; harvest-date fair value less costs to sell ₹80,000/tonne → inventory opens at **₹8.0L**. From the next morning: ordinary Ind AS 2 citizenship — cold-store costs during maturation/grading for sale, conversion costs into juice, FIFO/WAC on dispatch, and the lower-of-NRV brake if the apple market sours. Later sale at ₹95,000/tonne with ₹5,000 selling costs → NRV ₹90,000/tonne > cost — no write-down; profit recognized at sale through the normal revenue rules. Two standards, one fruit: 41 grows it, 2 sells it.

### 7.2 The broker-trader escape pod — full-NRV citizens

**Commodity broker-traders** (dealing grain, metals, energy — buying to profit from price movement, not to consume or retail) MEASURE their inventories at **fair value (NRV) less costs to sell with changes recognized in P&L** — permanently, not as an emergency brake. Ordinary businesses see cost-based shelves; a trader's ledger IS the price curve itself, so cost conventions would hide what the business does. A second, narrower relaxation: **producers** of agricultural/forest/mineral products may measure at NRV at certain production stages where industry practice is well-established (tea factories' made-tea norms in some markets, for instance). Everyone else: cost rules, plus the IC4 brake.

### 7.3 Land — the chameleon asset

The same plot lives under three different standards depending on intention:

- **Developer holding land/plots for sale in ordinary course** → **inventory** (Ind AS 2): cost = acquisition + development/conversion costs (approvals, leveling, infra allocation) + qualifying borrowing costs while development runs (Ind AS 23 again — land parcels can take substantial readying time); measured lower of cost and NRV — and plot-wise testing, since one phase can sour while another soars.
- **Owner-occupied factory/office land** → PP&E under Ind AS 16 (depreciated per component rules — buildings yes, land usually no).
- **Held for rentals/capital appreciation** → investment property under Ind AS 40 (cost model with fair-value disclosure, or FV model under policy).

Intention is the class — and intention must be documentary (board approvals, business plans, RERA filings): a tired developer claiming "investment property" on plots it actively sells is running an NRV-dodge reclassification, the classic tired trick IC9's radar tracks.

### 7.4 RERA-era wrinkles and revenue crossings

Under RERA and Ind AS 115 (RR11's lesson): the developer's unsold flats stay inventory; SOLD flats exit through revenue recognition — mostly at a point in time under RERA (control transfers on possession/registration), so inventory-MODEL matters all the way to the handover day: cost stacks (land allocation, construction progress, borrowing costs during development) define what ONE flat costs when it finally leaves the shelf. Cancellation accounting must re-inventory honestly at recoverable cost (with the penalty economics logged separately) — reclassing forfeited stock back at old cost when market moved is its own little fraud family.

### 7.5 Processing borders — tea, juice, milk

Post-harvest processing (withering tea, pressing juice, pasteurizing) is conversion territory — Ind AS 2: the harvest deemed cost is the "materials" input, factory costs allocate per IC5's cathedral (withering rooms' fixed OH on normal capacity), and blended/batched outputs take formulas (usually WAC — tea lots are eminently fungible per grade). The two standards don't fight; they hand off at the cut, like wrestlers tagging.

## 🧪 LAB — Three Border Patrols (10 min)

1. Orchard canon: 10t @ ₹80k FVLCTS at harvest → opening inventory? Later: expected sale ₹95k, costs ₹5k → NRV, write-down verdict.
2. The same orchard's UNHARVESTED December fruit (estimated FVLCTS ₹3.0L) — which standard holds it on 31-Mar, and at what value?
3. Commodity desk: 100t barley at ₹20,000/t cost; year-end NRV−CTS ₹22,000/t. UrbanNest Commodities is a broker-trader; UrbanNest Foods, a miller, holds identical barley. Two carrying values?
4. Developer file: plot cost ₹10cr, development spend ₹2cr, qualifying interest ₹1cr; NRV for the phase now ₹12.5cr. Carrying value and the write-down, plot-phase level.
5. A "developer" reclassifies its slow plots as investment property to dodge NRV testing. What's the documentary test, and who bears burden?

**Why this matters:** borders are where classification = measurement. The same physical thing (apple, barley, acre) carries three different numbers depending on whose hands hold it — and the answer to "what's it for" is the most audited sentence in the file.

**🔑 Lab answers:**
1. Opening inventory **₹8.0L** (deemed cost). NRV = 95 − 5 = **₹90k/tonne > 80k cost → no write-down**; profit waits for the sale.
2. **Ind AS 41** — fruit on the tree at reporting date is a biological asset/agricultural produce pre-harvest: measure at **FVLCTS ₹3.0L**, with the change running through P&L; Ind AS 2 citizenship only begins at the cut.
3. Broker-trader: 100t × ₹22,000 = **₹22.0L**, with the ₹2L gain recognized in P&L THIS period (full-NRV citizen). Miller: lower of cost and NRV — cost ₹20.0L stands (NRV above cost leaves the shelf at cost); the same barley tells two truths because the two businesses are different verbs.
4. Cost stack = 10 + 2 + 1 = **₹13cr**; NRV ₹12.5cr → write down **₹0.5cr** (plot/phase-level testing; no averaging with hot phases). Note the qualifying interest legitimately joined the stack during development — Ind AS 23 at the border again.
5. Burden on the entity: prove changed INTENTION with evidence — board resolutions, business plans, rental-marketing initiation, lease-up actions, changed cash-flow design (hold-for-rent/appreciation). Merely rebranding plots that salesmen still flog is a classification dodge: RERA listings, broker mandates and sales-track records will testify louder than the memo.

## 💪 Exercises

1. Why does Ind AS 41 measure the orchard at fair value pre-harvest while Ind AS 2 refuses fair value for the crate of picked apples?
2. When does a tea factory's made-tea use the producer-NRV relaxation, and what evidence makes that stick?
3. Design the plot-wise NRV test for a 5-phase township where phase 3 is orphaned by a cancelled highway.
4. A cancelled flat gets re-inventoried at its ORIGINAL cost though the resale market softened 15%. What's the correct treatment sequence?
5. Why is harvest deemed cost (rather than actual biological cost) the base for Ind AS 2 — what problem does deemed cost solve?

### ✅ Selected answers

1. Pre-harvest, there's no transaction-measurable "cost" — the tree's steady conversion of sun and time into value is exactly what historical cost can't see; FVLCTS tracks the biology earning its way. Post-harvest, the fruit enters the ORDINARY selling chain where cost discipline (consistency, formula, NRV brake) best serves the matching game; the fair-value baton is handed over as deemed cost at the most measurable moment — the cut.
2. Only where measuring at NRV at that stage is well-established industry practice — documented market prices for made-tea grades sufficient to make the measure reliable. Stickiness comes from auction evidence and industry-norm documentation; without deep, referenceable market quotes, cost rules.
3. Test each phase/plot cluster separately — item-by-item doctrine from IC4 applies to land shelves too: phase 3's plots measure against the revised NRV (cancellation-adjusted demand), phases 1–2 stand at cost; no averaging a dead phase's markdown against a hot phase's premium. Disclosure then carries the judgment narrative (basis, assumptions, sensitivity).
4. Sequence: derecognize on sale-cancellation the contract side honestly (RR doctrine); re-inventory the unit at the lower of its carried cost and NRV at re-stocking date — if resale values moved −15%, the lower-of brake likely claws value down; forfeiture/penalty economics ride as their own income items, never blended into the unit's cost blank cheque.
5. Actual historical cost of biological transformation is largely unknowable (how much of last monsoon does this apple own?) — deemed cost at harvest yields a reliable, market-anchored STARTING line for cost-based accounting, keeps comparability, and prevents agriculture profit from getting smeared across two standards' books. It converts nature's accounting into accounting's accounting.

## ❓ Quiz

**Q1.** 10t of apples, ₹80k/t FVLCTS at harvest; later expected sale ₹95k/t, costs ₹5k/t:
(a) inventory ₹0 until sold; gain recognized daily
(b) inventory opens at deemed cost ₹8.0L at harvest; later NRV ₹90k/t exceeds cost so no write-down — Ind AS 41 grows it at fair value, Ind AS 2 sells it at cost discipline from the cut onward
(c) inventory ₹9.0L at selling price
(d) inventory stays under Ind AS 41 until sold

**Q2.** Identical 100t barley: broker-trader (NRV ₹22k) vs miller (cost ₹20k) at year-end:
(a) both at ₹20.0L, inventory is cost-based by law
(b) trader: ₹22.0L with ₹2L P&L gain (broker-traders measure at NRV−CTS with changes in P&L — their business IS the curve); miller: ₹20.0L at cost since NRV beats cost — same physical stock, two honest numbers, because the activities differ
(c) both at ₹22.0L to be comparable
(d) trader ₹20.0L, miller ₹22.0L

**Q3.** A developer holds a plot phase costing ₹13cr (land 10 + development 2 + qualifying interest 1); phase NRV ₹12.5cr:
(a) keep ₹13cr — land never writes down
(b) carry at ₹12.5cr: the phase is INVENTORY (held for sale in ordinary course), tested plot-wise at lower of cost and NRV; the ₹1cr interest legitimately joined cost during development but cannot protect the shelf from the market's verdict — a ₹0.5cr write-down reports now
(c) reclassify to investment property
(d) write off ₹13cr fully

### ✅ Answers

1. **(b)** — harvest is the handshake: fair value grows the asset, deemed cost starts the shelf.
2. **(b)** — purpose decides measurement: curve-trading floats at NRV, milling anchors at cost.
3. **(b)** — developer stock is inventory; lower-of rules and plot-level testing apply, interest-inclusive stack and all.

## ✅ Mastery checklist

- [ ] I can run the 41→42 handshake: ₹8.0L deemed cost, NRV ₹90k, no write-down
- [ ] I can split broker-trader vs producer vs miller measurement cold
- [ ] I can classify a plot three ways with the intention evidence for each
- [ ] I can price a developer stack (₹13cr) and apply the phase-wise brake (−₹0.5cr)
- [ ] I can sequence a cancellation re-inventory honestly

**Next:** IC8 enters the e-commerce swamp — whose inventory is in the truck (FOB shipping vs destination, ₹25L canon), shrinkage and cycle counts (book ₹100L vs floor ₹97L), consignment racks, customer returns, and the cut-off traps that make December the most dangerous month of the year.
