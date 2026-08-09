# 🎯 IC8 · The E-Commerce Swamp — Trucks at Midnight, Missing Boxes, and Other People's Shelves

> The cost sheet tells you what inventory cost. The swamp tells you WHAT you own — the hardest audit sentence in retail. Goods rolling down a highway at 11:59pm on 31 March, a rack of your stock inside someone else's store, boxes the floor swears were never there, returns piling by the gate: every one of them is a boundary question — whose shelf, which date, what condition. Ind AS 2 answers with title terms, physical counts, and the discipline called cut-off. This module is swamp training with ShopKart's barcode scanners on.

---

## 🎯 Objectives

- Apply transit-title doctrine: FOB shipping point vs FOB destination (₹25L canon) and CIF/water variants
- Measure shrinkage: book ₹100L vs floor ₹97L — the ₹3L that walks straight to P&L
- Run consignment stock both directions — consignor's shelf, consignee's receipt
- Account for customer returns and graded/reworked stock at recoverable value
- Master cut-off: the last-GRN/last-dispatch tests auditors run every 31 March

## 📘 Concepts

### 8.1 Whose truck is it anyway — title terms at midnight

Inventory belongs to whoever holds TITLE — and Incoterms write the title hand-off into the contract:

- **FOB shipping point (origin)**: title passes when the goods are LOADED at the seller's dock → the goods in the truck at 00:00 on 1 April are the BUYER's inventory, wherever the truck is.
- **FOB destination**: title passes on DELIVERY at the buyer's dock → same truck, same midnight — the goods are still the SELLER's inventory.

**Canon (python-verified):** ShopKart buys electronics ₹25L, dispatched by the vendor 28-March, received 3-April. FOB shipping point: **ShopKart's 31-March balance sheet includes ₹25L "goods in transit"** (and the matching payable). FOB destination: the vendor's shelf carries it; ShopKart records nothing until April. Same truck, opposite balance sheets — one contract clause decides, which is why 31-March auditors read Incoterms before odometers. (CIF bills of lading, ex-works, delivered-duty-paid — all the same doctrine applied: locate the title pass, then locate the goods.)

### 8.2 Shrinkage — the shelf's silent tax

Book records say ₹100L; the floor shows ₹97L. The ₹3L gap — theft, damage, expiry, mis-scans, vendor shorts — is **shrinkage**, and it's expensed as identified (written down against inventory immediately; classified typically within cost of sales). Discipline: perpetual-inventory records + cycle counts (A-items monthly, B quarterly, C annually — the ABC cadence) so gaps surface as ₹50 questions, not ₹3L climaxes; year-end wall-to-wall physical verification with auditor attendance anchors the close. Watch the accounting echo: expected shrinkage inside standards is a costing parameter; ABNORMAL missing-stock events go straight to P&L with a story attached. ShopKart canon: **book ₹100L, floor ₹97L → record inventory ₹97L, expense ₹3L** — the books always surrender to physics.

### 8.3 Consignment — your stock, their store

Consignment goods sit at the consignee's premises but remain the **consignor's inventory** until sold to the end customer (title never passed to the storekeeper-agent; revenue waits for the true sale — RR9's consignment doctrine, mirrored here on the asset side). ShopKart's rack inside a franchisee's mall store: ₹12L of stock, on SHOPKART's 31-March balance sheet, unequivocally. The consignee records NO inventory (only a memo of goods held), and any consignee-held returns/reserves mirror the principal's positions. The audit move: confirm balances with consignees, and inspect whether "consignment" labels aren't shielding channel-stuffing (goods dumped at year-end to book sales — the fingerprint from RR9: finished-goods down, receivables up, returns up later).

### 8.4 Returns mountain — second life, second value

Customer returns re-enter the building as second-class citizens: restock on condition assessment at **recoverable value** — often deep-discount NRV or scrap value for boxed-fresh vs damaged classifications. Returns expected but not yet received ride as the refund liability / return-asset pair of Ind AS 115 (RR8's machinery): the recovery asset measures what you expect to RE-SELL — and then the NRV brake tests it like any shelf citizen. Graded-and-reworked stock: rework costs add to its cost ONLY to the extent bringback-to-saleable condition (present-location/condition doctrine) — never beyond its NRV ceiling.

### 8.5 Cut-off — December's church discipline

Cut-off is matching's clock: every transaction belongs to a period, and the gates are the LAST goods-received note and the LAST dispatch. The classic exam-crimes: purchase recorded with goods not received (FOB-destination load on the way — POP: purchases AND inventory inflated); sale recorded with goods not shipped (revenue early, inventory still physically present but "sold" on paper); returns accepted but not logged. The auditor's tools: examine the GRN/dispatch numbers bracketing midnight, match invoice dates to logistic events, read the Incoterms. Done right, cut-off is boring; done wrong, it's the engine room of every inventory fraud on record.

## 🧪 LAB — ShopKart's Midnight Shift (10 min)

1. ₹25L vendor shipment, FOB shipping point, out 28-Mar, in 3-Apr: whose shelf, which entries; same facts FOB destination?
2. Cycle count: book ₹100L, floor ₹97L. Journal the gap; where does it sit in the P&L; what cadence design kills repeat climaxes?
3. Consignment: ₹12L at a franchisee's store, ₹2L sold by them in March. Whose books show what on 31-Mar?
4. Returns mountain: 1,000 returned units, 600 boxed-fresh (NRV ₹300), 400 damaged (scrap ₹20). Original cost ₹350 each. Re-inventory values, total write-down recognized.
5. Cut-off crime reconstruction: invoice ₹15L dated 30-Mar, goods received 2-Apr, FOB destination. What's wrong with booking the March purchase, and what DON'T you book?

**Why this matters:** "what we own at midnight" is the balance sheet's most physical fact and its most-argued one; transit, consignment, returns and shrinkage are where honest retailers bleed and dishonest ones bloom.

**🔑 Lab answers:**
1. FOB shipping point: **ShopKart's inventory ₹25L as goods-in-transit** + payable ₹25L on 31-Mar (title passed at vendor dock). FOB destination: still the VENDOR's shelf at midnight — ShopKart books neither inventory nor payable until 3-Apr receipt. Same truck; the clause is the law.
2. Dr Inventory shrinkage expense ₹3L / Cr Inventory ₹3L → expense typically within cost of sales; design: ABC cadence (A monthly/B quarterly/C annual cycle counts) + perpetual records + surprise recounts — climaxes become questions when counts are constant.
3. ShopKart (consignor): inventory shows **₹10L** at the franchisee (12 − 2 sold) + recognizes March revenue/COGS on the ₹2L actually sold onward. Franchisee: NO inventory for the rack; commission/agency fee income only, plus a memo of stock held.
4. Re-inventory: 600 × ₹300 = **₹1,80,000** + 400 × ₹20 = **₹8,000** → total **₹1,88,000** against original-cost carrying 1,000 × ₹350 = ₹3,50,000 → recognize write-down **₹1,62,000** this period (condition-graded NRV, item-level discipline from IC4).
5. Wrong to book: title passes on DELIVERY (FOB destination) — goods weren't ShopKart's at midnight. Book NEITHER the purchase NOR the inventory; the invoice sits as an April event, and vendors' statement cut-off testing catches the mismatch. (Audit mode: GRN list bracketing midnight + Incoterm column is the whole case.)

## 💪 Exercises

1. Why do auditors attend physical counts personally, and what procedures make a count evidence rather than theatre?
2. FOB shipping point vs destination: which side of the year-end tends to shift MORE inventory between parties, and why does that attract manipulation?
3. A manager nets expected shrinkage INTO inventory cost "like normal loss". Accept or reject with doctrine.
4. Consignment vs outright sale to a stocking distributor: two contract-language tells, and the RR mirror on revenue.
5. Returns asset vs refund liability — where these two ride and why they mustn't be netted silently.

### ✅ Selected answers

1. Because the count is the only moment the ledger meets physics: auditors observe (are counts following instructions?), test (count a sample themselves, trace both ways — floor-to-sheet for completeness, sheet-to-floor for existence), and freeze cut-off (record last GRN/dispatch numbers). Theatre is counting until numbers fit; evidence is two-direction tests with cut-off gates locked while you count.
2. Shipping-point ON RECEIPTS side (inbound loads become buyer's inventory at vendor dock — a buyer wanting fatter inventory/current ratios inflates inbound FOB-origin loads at year-end; a seller wanting to slim stock ships FOB-origin on the last day of March). Either side of midnight the terms can assign a truck a spirit; given the ₹1-law, timing the title IS timing profit — which is precisely why it attracts manipulation and why cut-off audits read Incoterms first.
3. Reject as phrased — but split the hair: EXPECTED/normal process losses (evaporation, standard yield erosion) legitimately ride good units' cost (IC5 doctrine). Store SHRINKAGE (theft/damage/mis-scan) isn't a production attribute — it's a distribution failure: it doesn't make remaining stock "more costy", it makes vanished stock EXPENSE. Expected estimates belong in standards/pricing, recoveries adjust expense — but the shelf never carries the cost of boxes that aren't on it.
4. Tells: who bears price/markdown risk (consignment: consignor; sale: distributor), and return rights (full-return-to-launch date = consignment-flavoured). RR mirror: consignment recognizes revenue only on end-customer sale; a "sale" with engineered return rights may fail transfer-of-control, staying your inventory and your revenue later — the two standards trip the same wire from opposite poles.
5. The returns-asset side (expected recoverable goods at recoverable value, with NRV brake riding) and the refund liability (expected payouts/credits) report GROSS on the balance sheet — netting would erase both the obligation and the recovery; analysts size return economics from the pair, so the pair must stay visible, reconciled, and disclosed with the returns policy.

## ❓ Quiz

**Q1.** ₹25L shipment, FOB shipping point, dispatched 28-Mar, received 3-Apr. On ShopKart's 31-March books:
(a) nothing until receipt
(b) ₹25L goods-in-transit inventory plus the ₹25L payable — title passed at the vendor's dock, so the truck at midnight is ShopKart's shelf; flip the clause to FOB destination and the same truck stays the vendor's inventory until 3-Apr
(c) ₹25L expense immediately
(d) a receivable from the vendor

**Q2.** Book ₹100L, floor count ₹97L:
(a) reduce purchases ₹3L
(b) write inventory to ₹97L with a ₹3L shrinkage expense in the period (cost of sales lane) — the ledger always surrenders to physics; ABC-cadence cycle counts turn climaxes into questions
(c) capitalize the loss into remaining units
(d) defer until vendor reconciliation completes

**Q3.** ₹12L consignment rack at a franchisee, ₹2L sold to end-customers in March:
(a) franchisee carries ₹10L inventory
(b) ShopKart (consignor) carries ₹10L consignment inventory and recognizes only the ₹2L truly sold onward; the franchisee holds a memo and agency fee, never the stock — until the end sale, the shelf belongs to the principal
(c) ShopKart books ₹12L revenue in March
(d) the stock writes off at the franchisee's door

### ✅ Answers

1. **(b)** — title rides the Incoterm: shipped-so-received by the buyer; the clause decides the shelf.
2. **(b)** — shrinkage is a period loss, never a cost of surviving boxes.
3. **(b)** — consignment stock is the principal's until the end sale; agents record fees, not inventory.

## ✅ Mastery checklist

- [ ] I can place the ₹25L truck correctly under both FOB clauses, entries included
- [ ] I can journal the ₹3L shrinkage and design the count cadence that prevents it
- [ ] I can run consignment stock on both sides of the franchisee relationship
- [ ] I can re-inventory a returns mountain at graded NRV (₹1.88L, write-down ₹1.62L)
- [ ] I can reconstruct a cut-off crime and name the three documents that crack it

**Next:** IC9 builds the radar — NRV reversals revisited, the disclosure inventory analysts weaponize (write-downs, reversals, pledges), and the manipulation hall of fame: overproduction shelter (₹4.8L canon), inventory museums, formula surfing, and the dodged ₹5L write-down that costs a CFO their career.
