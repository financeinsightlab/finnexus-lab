# 🎯 IC4 · NRV — Lower of Cost and Net Realizable Value, the Shelf's Emergency Brake

> Cost is history's opinion; NRV is the market's. When the shelf loses its marbles — prices collapse, models spoil, seasons die — Ind AS 2 stops pretending history matters and marks inventory DOWN to what it can actually fetch. Under cost the rule, under damage the brake: **inventories are measured at the lower of cost and net realizable value**. The twist most courses skip past: write-downs can come BACK (reversals, capped and disclosed). Learn the brake, the reversal, and why "lower of" is applied item by item, never to the whole warehouse as one blob.

---

## 🎯 Objectives

- Define NRV precisely: estimated selling price − costs to complete − costs to sell
- Apply lower of cost and NRV **item by item** (similar-group fallback) — never warehouse-wide
- Run the ₹500→₹460 write-down canon and the capped ₹35/unit reversal
- Apply the materials rule: no write-down if finished goods still sell at/above cost
- Distinguish NRV from fair value — and from broker-trader "NRV−CTS" measurement

## 📘 Concepts

### 4.1 The measurement law — two numbers, take the sad one

Inventories ride at the **lower of cost and NRV**. Cost you know (IC2's buckets + IC3's formula). **Net realizable value = the estimated selling price in the ordinary course of business, less the estimated costs of completion and the estimated costs necessary to make the sale.** Not liquidation panic prices — ordinary-course, arm's-length, evidence-based estimates (post-year-end selling prices are the best receipts you can hold; the balance sheet date's conditions get priced, not the date you finally finished the audit file).

**The ₹8,000 canon (python-verified):** UrbanNest's gadget line: cost ₹500/unit, estimated selling price now ₹480, selling costs ₹20 → **NRV = 480 − 20 = ₹460**. Carrying value becomes ₹460; the **₹40/unit write-down hits this year's P&L** as an expense (typically within cost of sales or a separate line, disclosed). 200 units on hand → **₹8,000 expense**, no consent requested, no provision theatre — the shelf simply shrinks.

### 4.2 Item by item — no averaging your sins away

Lower-of is applied to **each inventory item** (writing down the turkey line only), with one mercy: items of **similar nature and use** MAY be grouped (one garment in 40 sizes is one line; garments and electronics never). What is FORBIDDEN is the warehouse-wide net — letting one line's price spike cover another line's collapse. Why: offsetting unrealized GAINS against write-downs books unearned profit; the standard recognizes losses early and lets gains wait for sale (the conservative asymmetry, deliberately).

### 4.3 The materials safe-harbor — and work-in-progress logic

Raw materials aren't written below cost **if the finished products they'll become are expected to sell at or above cost**. Steel sheet bought at ₹200/kg whose price slid to ₹180: if the cabinets you weld from it still clear their costs, the sheet stays at ₹200 — the loss lives in a market, not in YOUR economics; where finished goods ARE expected below cost, materials write down too, and the best measure of their NRV is usually **replacement cost** (what re-buying the input would take today). WIP logic mirrors: its NRV deducts remaining completion costs (NRV = expected FG price − costs to complete − costs to sell), so half-built stock tests against what finishing it will require.

### 4.4 Reversals — the brake releases, capped

When NRV recovers (the gadget line repriced: expected price ₹515, costs ₹20 → NRV ₹495), the write-down REVERSES: carrying rises toward cost again, and **the reversal is capped at the write-down previously recognized** — you restore the floor you removed, you never gild it.

**Canon (python-verified):** the same 200 units, NRV now ₹495 vs cost ₹500: reverse **₹35/unit = ₹7,000**, booked as a REDUCTION of the period's inventory-expense line (reducing COGS/“inventory write-down expense reversed” in the notes — never as revenue). If NRV later overshoots cost (₹520), no further mark-up: cost ₹500 is the ceiling — lower-OF means appreciate never, recover yes.

### 4.5 NRV ≠ fair value, and the broker-trader detour

NRV is an **entity-specific** net backoff (your selling channels, your completion costs); fair value (Ind AS 113) is an exit price in an ORDERLY market between participants — broker commissions off, transport handled differently. The two routinely differ, and the standard chose NRV. Detour from IC1's fence: **commodity broker-traders** MEASURE inventory at NRV less costs to sell with changes straight in P&L (their business is the price curve itself) — a legitimate full-floated NRV existence, and the only one in the standard.

### 4.6 Evidence discipline

NRV is an estimate that auditors eat with receipts: post-year-end invoices, price lists, contract terms, markdown calendars, expiry tunnels (pharma: IC10). Purpose provisioned: inventory held against FIRM sales contracts tests against CONTRACT prices; excess beyond contract quantities tests against market. And every write-down/reversal must leave a disclosure trail (IC9 reads the notes like a detective board).

## 🧪 LAB — UrbanNest Gadget Desk (10 min)

1. Canon rerun: cost ₹500, price ₹480, costs ₹20 → NRV, write-down/unit, expense for 200 units, and the carrying value.
2. Next quarter: expected price ₹515 with the same ₹20 costs. Reversal amount and its P&L lane; why capped?
3. The warehouse also holds (a) 100 dresses (30 sizes, one SKU family) and (b) a mixed pallet of dresses + blenders. What's the widest legal grouping for lower-of testing each?
4. Steel sheet at ₹200/kg (market ₹180) destined for cabinets that clear ₹40/unit above cost. Write the sheet down?
5. Half-built mixer WIP: cost ₹300 so far, ₹80 to finish, expected sale ₹350, selling costs ₹30. NRV and verdict on the write-down.

**Why this matters:** NRV testing is the moment accounting admits goods die — fashions, perishables, price wars. Getting item-level discipline (and safe-harbor courage) right is the difference between honest shelves and inventory museums (IC9's villain origin story).

**🔑 Lab answers:**
1. NRV = **₹460**; write-down **₹40/unit → ₹8,000 expense**; carrying value 200 × 460 = **₹92,000**. The shelf says what the market says; history gets demoted.
2. NRV = **₹495** → reverse **₹35/unit = ₹7,000**, credited as reduction of current-period inventory expense/COGS, disclosed as a reversal — capped because restoration can only refund the floor you removed (original ₹40), never mint gains: lower-of is a one-way street with a rear gate.
3. (a) The dress line: one similar group — fine to test as a unit. (b) Dresses and blenders: NOT groupable — different nature and use; test each item/line separately, or one line's markdown gets laundered through the other's cushion.
4. **No** — materials safe-harbor: while the finished cabinets clear cost comfortably (₹40 headroom), the sheet holds cost; the market dip is a quote, not YOUR loss. If cabinets slide below cost, materials test too — usually at replacement cost as NRV proxy.
5. WIP NRV = 350 − 80 − 30 = **₹240** vs cost ₹300 → write down **₹60/unit now** — completion costs and selling costs both count; the half-built can't dodge the brake by being unfinished.

## 💪 Exercises

1. Why does the standard forbid warehouse-wide netting of lower-of testing? What profit crime does grouping generously commit?
2. Contract-stock versus excess stock: walk the two-lane NRV test for a line part-sold forward under firm contracts.
3. Why is replacement cost the usual NRV proxy for written-down materials, not selling price minus margin?
4. "NRV reversal through other income — it isn't revenue, but it feels like income." Route it correctly and cite the note it must appear in.
5. Argue (then demolish): "NRV at liquidation prices, since these gadgets would never sell at list today."

### ✅ Selected answers

1. Netting lets unrealized price GAINS on healthy lines cancel write-downs on dying ones — recognizing profits that haven't happened against losses that have. The standard's asymmetry is deliberate: losses early, gains when sold. Generous grouping (all electronics together, say) is the polite version of the same crime — a turkey's collapse hidden inside the category's average.
2. First, the quantities under firm sales contracts: NRV anchored to CONTRACT prices (that part of the shelf is pre-committed; market quotes are noise for it). Then, quantities beyond contracts: tested against general market prices (your true market exposure). Mixing the lanes over- or under-writes both.
3. Materials don't get sold — they get CONSUMED into products; their "realizable value" to you is the avoided cost of re-buying them, which is exactly today's replacement price. Selling-price-minus-margin would smuggle the finished product's margin (and your market position) into an input's carrying value.
4. Credits reduce expense: the reversal REDUCES the current period's inventory expense (the write-down line or COGS), and BOTH the write-down and its reversal must be disclosed in the notes. Revenue is for selling goods; income lines are for performance — this is a correction of a measurement, booked where the measurement lives, with the note explaining the circumstances that reversed.
5. NRV is ordinary-course net backoff — the price obtainable in the normal business through normal channels, estimated with care; fire-sale quotes measure a liquidation, not a business. Demolish with purpose: the standard wants the value REALIZABLE if you keep trading — post-year-end actual sales are the best evidence precisely because they're ordinary-course. Panic pricing belongs to a different standard's nightmare.

## ❓ Quiz

**Q1.** Cost ₹500, expected price ₹480, selling costs ₹20, 200 units. The shelf shows:
(a) ₹1,00,000 at cost
(b) ₹92,000 — NRV ₹460 (480 − 20) beats cost down; the ₹40/unit × 200 = ₹8,000 write-down expenses in this period, and if prices later recover to NRV ₹495 the reversal restores ₹35/unit (₹7,000), capped at the write-down taken and credited against current inventory expense
(c) ₹96,000 at replacement cost
(d) ₹500 per unit forever, per cost principle

**Q2.** Steel sheet at ₹200/kg (market ₹180) whose cabinets still clear cost is:
(a) written down ₹20/kg immediately
(b) held at ₹200 — materials aren't written below cost while the finished goods they become still sell at or above cost; only when cabinets sink below cost does the sheet test, normally at replacement cost as the NRV proxy
(c) written up to replacement
(d) reclassified as financial inventory

**Q3.** Lower-of-cost-and-NRV is applied to:
(a) total inventory, warehouse-wide
(b) each item — with grouping allowed only across items of similar nature and use — so one line's strength can't launder another's markdown; firm-contract quantities test at contract prices, the excess at market prices
(c) whichever method any group chooses quarterly
(d) classes only, never items

### ✅ Answers

1. **(b)** — the brake engages at ₹460, the reversal road is capped at the floor removed, both rides disclosed.
2. **(b)** — the materials safe-harbor: your economics, not the quote, decides; replacement cost only when the end-product fails.
3. **(b)** — item-by-item with similar-group mercy; netting warehouses is the polite fraud.

## ✅ Mastery checklist

- [ ] I can compute NRV (₹460) with completion and selling costs, no panic pricing
- [ ] I can run the ₹8,000 write-down and the ₹7,000 capped reversal with correct P&L lanes
- [ ] I can police item-by-item vs similar-group testing
- [ ] I can state the materials safe-harbor and its replacement-cost proxy
- [ ] I can split contract vs excess stock NRV lanes

**Next:** IC5 builds the overhead cathedral — variable OH on actual, fixed OH on normal capacity (the ₹200/₹160 rate machine), joint products split by sales value (₹46L → ₹32.2L/₹13.8L), by-products at NRV, and the normal-loss vs abnormal-loss doctrine that decides who eats the ₹50L.
