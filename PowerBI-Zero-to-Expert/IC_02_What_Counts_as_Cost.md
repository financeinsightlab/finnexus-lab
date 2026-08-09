# 🎯 IC2 · What Counts as Cost — The Three Buckets and the Exclusion Wall

> "What did it cost?" is the most dangerous casual question in accounting. The purchase manager says ₹100. The factory head says ₹126. The warehouse adds ₹3. Sales wants its commission in. Ind AS 2 answers with a formula, not a feeling: cost of inventories = **costs of purchase + costs of conversion + other costs incurred in bringing them to their present location and condition**. Everything else — no matter how genuine, no matter how invoiced — hits P&L as incurred. This module learns the buckets, recites the exclusion wall, and prices the famous ₹141/unit canon piece by piece.

---

## 🎯 Objectives

- Fill the three buckets: purchase costs, conversion costs, "present location and condition" costs
- Recite the exclusion wall: abnormal waste, storage, admin, selling — and the interest rule with its Ind AS 23 exception
- Run the ₹141/unit purchase-invoice autopsy canon
- Absorb fixed production overheads on **normal capacity** (the doctrine IC5 deep-dives)
- Handle discounts, duties, and recoverable taxes without polluting the cost line

## 📘 Concepts

### 2.1 Bucket one — costs of purchase

Purchase price + import duties + non-recoverable taxes + transport + handling + other DIRECTLY attributable costs, MINUS trade discounts, rebates and similar items. The autopsy lines that trip people:

- **Trade discounts / rebates** — net them OFF the price, always (early-payment settlement discounts: net if in-substance price reductions; treat per policy consistently).
- **Recoverable GST/VAT** — NEVER a cost: it flows through input tax credit; including it inflates both inventory and COGS with money the taxman refunds. Non-creditable duties and cess — genuine cost, into the bucket.
- **Freight-in / inward handling / octroi-era charges** — in the bucket (it's "bringing to present location").
- **Currency swings on foreign purchases**: the inventory converts at transaction-date rate (Ind AS 21); exchange differences on the PAYABLE go to P&L — not inventory cost (contrast the old AS-11 para-46A capitalisation India's past once allowed).

### 2.2 Bucket two — costs of conversion

Direct labour you can trace + a **systematic allocation of production overheads**:

- **Variable production overheads** — absorbed on the ACTUAL level of production (power, consumables, line supervision that scales with output).
- **Fixed production overheads** — absorbed on **NORMAL CAPACITY**. The rule that saves accounting from factory-manager weather reports: in slow years each unit does NOT inherit extra fixed cost just because machines idled; unabsorbed overheads go straight to P&L as period costs. In banner years (actual > normal), the rate is RECOMPUTED DOWNWARD so the total absorbed never exceeds actual incurred — you may not capitalize more fixed cost than exists.

**Canon (python-verified):** fixed production OH ₹24L, normal capacity 12,000 units → absorption rate **₹200/unit**, permanently. A 10,000-unit year absorbs 10,000 × 200 = **₹20.0L**, and **₹4.0L unabsorbed expensed**. A 15,000-unit year recomputes: 24L/15,000 = **₹160/unit**, absorbing exactly ₹24.0L — the cap. (IC9 shows the profit games this door polices; IC5 puts the whole overhead cathedral up.)

### 2.3 Bucket three — other costs to "present location and condition"

Only costs genuinely incurred TO BRING the inventory where it is, as it is: custom-design costs for a specific order, pre-production tooling for a contracted batch, certain costs of BY-PRODUCT processing. The test is causation, not proximity: same-building, vague "support" — out; specifically enabling the inventory to become saleable — in.

### 2.4 The exclusion wall — four famous "forgets"

These costs are EXCLUDED — expensed when incurred, full stop:

1. **Abnormal waste** (materials, labour, other production costs): spoiled batches beyond normal loss — P&L. Normal loss (standard 4% yield erosion — IC10's steel canon) — IN good units' cost; abnormal beyond it — OUT.
2. **Storage costs** — unless NECESSARY to the production process before a further stage (maturing inventory — whisky, cheese — stores as part of production: in; simply parking finished goods: out).
3. **Administrative overheads** that don't contribute to bringing inventory to its present location/condition (the CFO's office floor, HR, most "corporate allocations").
4. **Selling and distribution costs** — freight OUT, sales commissions, warehousing for dispatches: out, out, out.

### 2.5 The interest rule — and the whisky exception

Finance costs: excluded — borrowing money to hold stock is a treasury fact, not an inventory attribute. EXCEPTION: **Ind AS 23 qualifying assets** — inventories that necessarily take a SUBSTANTIAL time to get ready for sale (maturing spirits, certain aerospace WIP) CAPITALIZE borrowing costs during the production runway.

**Canon (python-verified):** UrbanNest Spirits begins a single-malt line; maturation loan ₹10cr at 10% — during the 3-year cask sleep, **₹1.0cr of interest per year capitalizes into inventory** (₹3.0cr across maturation). The day the spirit is ready-for-sale, capitalization stops; interest thereafter is P&L again. (For contrast: a retailer's stock-funded OD interest of ₹2L on fast-moving goods — expensed instantly; no qualifying runway, no asset theatre.)

### 2.6 The ₹141 canon — the invoice autopsy

UrbanNest buys a component batch (5,000 units). Autopsy per unit (all python-verified):

| Line | ₹/unit | Verdict |
|---|---|---|
| List price | 100 | in |
| Trade discount 5% | −5 | net off purchase cost |
| IGST (recoverable) | excl | never a cost |
| Freight-in | +6 | in (present location) |
| Direct labour | +12 | conversion |
| Variable OH | +8 | conversion (actual base) |
| Fixed OH @ normal capacity | +20 | conversion (normal-cap rate) |
| Abnormal breakage this batch | +2 | **OUT** → P&L |
| Finished-goods storage | +3 | **OUT** → P&L |
| Allocated corporate admin | +4 | **OUT** → P&L |

**Inventory cost = 100 − 5 + 6 + 12 + 8 + 20 = ₹141/unit** — the number that goes on the balance sheet; the ₹9 of exclusions stack straight into the year's P&L regardless of where they were invoiced.

## 🧪 LAB — UrbanNest Components Pvt Desk (10 min)

1. Run the full ₹141 autopsy from the table above; then recompute with the trade discount rising to 8% — cost?
2. The plant made 10,000 units this year against a 12,000 normal capacity; fixed production OH ₹24L. Absorption rate, absorbed, expensed — and the one-sentence doctrine.
3. Same plant, next year: 15,000 units. Rate, absorbed, expensed?
4. A 3PL warehouse bill arrives: (a) ₹5L for holding finished goods pre-sale; (b) ₹2L for climate-controlled cask rooms during the maturation stage. Sort them.
5. The board proposes capitalizing ₹30L of corporate-office rent "because inventory exists due to the company". Verdict with the causation test.

**Why this matters:** every inventory audit's hour one is invoice autopsy and overhead-rate review. Getting ₹141 right is beginner; knowing WHY ₹9 got expelled is employable.

**🔑 Lab answers:**
1. ₹141/unit ✓ (100 − 5 + 6 + 12 + 8 + 20). Discount to 8%: 100 − 8 + 6 + 12 + 8 + 20 = **₹138/unit** — discounts sculpt cost before a single overhead dreams of joining.
2. Rate ₹200 (24L/12,000 normal); absorbed 10,000 × 200 = **₹20.0L**; **₹4.0L unabsorbed expensed** — units don't inherit extra cost just because the plant idled; the idle-capacity cost belongs to the PERIOD, not the pallets.
3. Rate recomputes to ₹160 (24L/15,000); absorbed exactly **₹24.0L**; unabsorbed ₹0 — the recomputation cap forbids capitalizing cost that doesn't exist.
4. (a) **Storage expense** — finished goods parked pre-sale is the classic exclusion. (b) **In cost** — storage NECESSARY to production before a further stage (the maturation IS the production), so the cask-room bill walks into the whisky inventory's door.
5. **Excluded** — administrative overheads only enter if they truly contribute to present location and condition; corporate rent fails causation ("the company exists" would capitalize the universe). Straight to P&L.

## 💪 Exercises

1. Why shouldn't a slow year allow unit costs to rise via fixed-OH absorption? Who is the standard protecting, and from what?
2. A recoverable-GST line got included in cost "materially small". Two balance-sheet & two P&L distortions — name them.
3. Design the exact test phrase for "necessary storage" using whisky vs finished-goods parking.
4. Freight-in vs freight-out: one sentence separating their accounting fates and the doctrine behind it.
5. The finance head wants to capitalize OD interest on fast-moving FMCG stock. Rule with the Ind AS 23 door.

### ✅ Selected answers

1. Products shouldn't carry the cost of empty machines — otherwise a demand slump manufactures "more expensive" inventory, which then postpones the idle cost into LATER P&L via COGS; it also makes slow-year margins look better on the shelf and worse never. The standard protects CURRENT-period truth (period costs show up in the period the capacity idled) and cross-year comparability — from factory managers' weather.
2. Balance sheet: inventory overstated (asset carrying a refundable tax) and input-tax-credit asset understated. P&L: COGS overstated later when the stock sells; input-credit income/claim mis-booked — four lines from one "small" line item, blooming at sale-time like a postponed alarm.
3. "Is this storage a step the inventory MUST pass through to reach saleable condition?" Whisky cask rooms — yes (storage is transformation; without it the product legally and commercially isn't the product). Finished-goods warehouse — no (the product is already itself; the parking serves selling logistics, not production). Necessity is the passport.
4. Freight-in brings inventory TO present location/condition → capitalizes (bucket one); freight-out takes already-saleable goods TO CUSTOMERS → selling cost, expensed (the exclusion wall's fourth brick). Same truck, opposite fates — direction decides.
5. Denied — qualifying-asset status needs a substantial READYING runway: whisky maturing 3 years qualifies (capitalize ₹1.0cr/yr on the ₹10cr canon); FMCG cartons turning in 40 days are ready for sale at birth, so OD interest on their funding is P&L period cost. Inventory can't carry interest it didn't wait for.

## ❓ Quiz

**Q1.** The ₹141/unit canon comprises:
(a) list price + all taxes + admin allocation
(b) list 100 − trade discount 5 + freight-in 6 + DL 12 + VOH 8 + FOH-at-normal 20 — excluding recoverable IGST, abnormal breakage ₹2, finished-goods storage ₹3 and corporate admin ₹4, which march straight to P&L as period costs
(c) everything invoiced by the factory plus selling freight
(d) purchase price only, 95

**Q2.** Fixed production OH ₹24L, normal capacity 12,000 units, actual 10,000:
(a) absorb ₹24L, ₹240/unit
(b) rate locked at ₹200/unit on NORMAL capacity → ₹20.0L absorbed into inventory and ₹4.0L UNABSORBED expensed in the year — idle capacity belongs to the period, not to the units that showed up; over-production years recompute the rate down so absorbed never exceeds ₹24L actual
(c) absorb ₹20L, expense nothing
(d) absorb ₹24L at ₹200/unit

**Q3.** During 3-year maturation, the ₹10cr spirits loan's 10% interest:
(a) expenses immediately, always
(b) capitalizes into inventory ₹1.0cr/year as an Ind AS 23 qualifying asset — the cask sleep is substantial readying runway; capitalization stops the day the spirit is ready for sale
(c) capitalizes only if auditors agree
(d) capitalizes into property, not inventory

### ✅ Answers

1. **(b)** — three buckets minus the wall: ₹141; the ₹9 of exclusions never touch the shelf.
2. **(b)** — normal capacity sets the rate; unabsorbed is period expense; recomputation caps absorbed at actual.
3. **(b)** — qualifying-asset doctrine: interest rides the inventory until ready-for-sale day.

## ✅ Mastery checklist

- [ ] I can recite the three buckets and run the ₹141 autopsy without the table
- [ ] I can apply normal capacity both directions (₹200/₹160, ₹4.0L expensed)
- [ ] I can recite the exclusion wall's four bricks with one-line reasons
- [ ] I can judge the Ind AS 23 qualifying-asset door (₹1.0cr whisky canon)
- [ ] I can spot a recoverable-tax contamination in two seconds

**Next:** IC3 picks WHICH costs leave the shelf first — FIFO vs weighted average under identical rising prices (₹8,000 vs ₹9,000 COGS, margins 46.7% vs 40.0%), why LIFO was executed by the IASB and never existed under Ind AS, and specific identification for the non-fungible.
