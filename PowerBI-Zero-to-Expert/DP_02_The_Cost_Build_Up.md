# 🎯 DP2 · The Cost Build-Up — The ₹59L Machine the Vendor Calls ₹50L

> Every deprecation war you will ever fight starts with ONE number: the cost that gets recognized on day one. Inflate it and profit inflates today (smaller expense) but bleeds for a decade (bigger depreciation). Starve it and the reverse. Ind AS 16 para 15–17 says cost = purchase price (ignoring trade discounts) + non-refundable duties + directly attributable costs + the decommissioning provision estimate. This module builds the canonical cage line by line, mounts the exclusion wall (training, ceremonies, admin, abnormal waste, early losses), walks the 2022 amendment that threw testing proceeds OUT of the cost, and finishes with self-construction, asset swaps, and buying a machine on credit.

---

## 🎯 Objectives

- Build a day-one cost from first principles: price adjustments, duties, attributable costs
- Draw the exclusion wall — everything that LOOKS attached but must hit P&L
- Apply the 2022 amendment: test-run sale proceeds go to P&L, never reduce cost
- Capitalize the decommissioning provision (Ind AS 16.16(c) × Ind AS 37)
- Handle self-constructed assets, exchanges with commercial substance, and deferred-payment purchases
- Draw the capitalization finish line: ready-for-use, not actually-in-use

## 📘 Concepts

### 2.1 The cage — para 15–17's shopping list

Cost of an item of PPE = (a) its **purchase price**, including import duties and non-refundable purchase taxes, AFTER deducting trade discounts and rebates; plus (b) any **costs directly attributable** to bringing the asset to the location and condition necessary for it to be capable of operating as management intends; plus (c) the initial estimate of **dismantling, removal and site-restoration** obligations. The directly attributable roll call: employee costs from construction/acquisition, site preparation, initial delivery and handling, installation and assembly, professional fees, and costs of testing whether the asset works properly.

### 2.2 The ₹59L canon — line by line (python-verified)

A packaging press arrives at your Gurugram plant:

| Line | ₹L | In/Out | Why |
|---|---|---|---|
| List price | 50.0 | — | starting point only |
| Trade discount | −2.0 | OUT | price is the NET 48 — discounts never existed |
| Customs duty (non-creditable) | +4.0 | IN | non-refundable purchase tax |
| IGST on invoice | — | OUT | creditable → a tax receivable, not a cost of the press |
| Freight and handling to site | +1.0 | IN | directly attributable |
| Site preparation | +0.5 | IN | directly attributable |
| Installation and commissioning | +1.5 | IN | directly attributable |
| Testing costs (engineers, trial materials) | +2.0 | IN | functioning-properly test |
| Sale of test-run cartons | (0.5) | → P&L | **2022 amendment**: proceeds before intended use are REVENUE through P&L, never netted off cost |
| Decommissioning provision (present value) | +2.0 | IN | para 16(c): restore the leased shed at exit |
| **Capitalized cost** | **59.0** | — | the ₹50L machine, correctly caged |

Excluded and marched to P&L in the same month: operator **training ₹1L** (the asset works regardless of who can drive it), the **opening ceremony ₹0.5L**, **administrative overheads ₹2L**, **abnormal installation breakage ₹0.8L**, and the **first-quarter operating losses ₹3L** while demand ramps. The wall test is always the same: is the cost NEEDED to bring the asset to working location and condition — or is it needed to run the business?

### 2.3 The finish line — capable, not actually

Capitalization stops when the asset is **in the location and condition necessary for it to be capable of operating as management intended** — NOT when it actually starts earning. Costs incurred while the asset sits capable-but-idle, and initial operating losses, are period expense. Symmetrically, a building pressed into use before final snag-list fixes still starts depreciating once capable (DP4 picks up that thread). The line is engineering fact, not managerial mood — which is why it resists the classic "keep capitalization open, hide expenses in the asset" fraud (the WorldCom family portrait, DP11).

### 2.4 The provision that rides along — Ind AS 37's seat on the cage

When you install the press in a leased shed with a reinstatement clause, you owe the restoration TODAY (the obligating event is installing). Estimate ₹2L present value → included in cost with a matching provision. Each year then: the capitalized slice depreciates with the press, and the provision unwinds through **finance cost** (not depreciation, not opex — the discount melting is interest, ₹2L growing toward its ₹3L face by exit year). Revisions of the estimate adjust the asset's carrying amount (up or down, with floors), never P&L — a quiet rule with big audit teeth.

### 2.5 Self-constructed assets — same cage, mirror image

Build your own test rig: materials ₹8L + direct labour ₹4L + allocable production overheads ₹2L = **₹14L capitalized**. Abnormal waste cement ₹1L → P&L. Internal "profit" a department charges another → eliminated (you cannot make profit selling to yourself). Interest on construction borrowings → Ind AS 23's qualifying-asset machinery (DP9's stop: the ₹20L capitalized-interest canon).

### 2.6 Two acquisition edge-cases — swaps and credit

**Exchange with commercial substance:** you give an old lathe (carrying ₹20L) plus ₹30L cash for a CNC centre whose fair value is ₹55L. Consideration given = 20 + 30 = ₹50L worth against ₹55L fair value → new machine at **₹55L (fair value)** with a **₹5L gain in P&L** (python-verified). No commercial substance (a reshuffle of similar kit)? Carry the old book amount over — no gain manufactured.

**Deferred payment:** same press offered at ₹50L cash or ₹55L on two-year credit → capitalize **₹50L cash-price equivalent**; the ₹5L difference is interest expensed over the credit period. Normal-trade-credit price premiums are not asset cost; the machine does not become costlier because you borrowed.

## 🧪 LAB — Cage or P&L? (10 min)

For the ₹59L press project, sort each spend into **CAGE** or **P&L (period)**, with the rule cited:

1. Professional fees of the installation engineer ₹0.9L.
2. Two-year AMC signed at delivery ₹1.2L/yr.
3. ₹0.6L of concrete wasted when the crew misread the foundation drawing.
4. Security guard for the construction month ₹0.3L.
5. Interest on the general bank overdraft during installation ₹0.7L.
6. Cost of test-run cartons later sold for ₹0.5L: materials ₹0.2L.
7. Staff party for "first successful print" ₹0.2L.
8. Operator training by the vendor ₹1L.
9. PV of reinstatement obligation under the shed lease ₹2L.
10. Corporate cost allocation (HQ overhead) ₹2L.

**Why this matters:** every audit file on PPE opens with this exact schedule; the cage/wall split IS the audit.

**🔑 Lab answers:**
1. **CAGE** — professional fees directly attributable. 2. **P&L** — maintaining the asset after ready-for-use; AMC is the marriage, not the wedding. 3. **P&L** — abnormal waste; the standard bans parking incompetence inside assets. 4. **CAGE** — site preparation/construction-period costs attributable. 5. **P&L** — general overdraft interest fails Ind AS 23's specific/qualifying test (DP9 general-borrowing maths has its own doors). 6. **CAGE ₹0.2L; the ₹0.5L proceeds → P&L revenue** — the 2022 amendment refuses net-off. 7. **P&L** — celebration, not necessary condition. 8. **P&L** — training. 9. **CAGE** — para 16(c). 10. **P&L** — admin overheads stay home.

## 💪 Exercises

1. The controller wants to net the ₹0.5L test-run sales against the press cost "like we did in the old days." Write the two-line modern answer.
2. Vendor offers: ₹50L cash today, or ₹27L at each year-end for two years (total ₹54L). Capitalize what, expense what?
3. Your civil wing built its own canteen block: materials ₹30L, labour ₹12L, allocated plant overhead ₹3L, and ₹2L of cement spoiled in a storage flood. Cage the block.
4. A sister concern sells YOUR company its lathe (carrying ₹20L in her books) for ₹26L cash. What do you capitalize, and whose ₹6L vanishes at consolidation?

### ✅ Selected answers

1. Post-amendment Ind AS 16: proceeds from selling items produced while bringing the asset to intended condition are recognized in P&L (revenue) with matching cost — cost of the press is NOT reduced. Testing costs stay ₹2L; the ₹0.5L prints its own P&L line.
2. Capitalize the cash-price equivalent ₹50L; ₹4L is financing cost spread over the two years via effective interest. The machine is identical either way; only your funding choice differed.
3. Cage = 30 + 12 + 3 = **₹45L**; the ₹2L flood spoilage is abnormal waste → P&L.
4. Your books: lathe at ₹26L (cost = consideration you gave). Her books: a genuine ₹6L disposal gain. Group books on consolidation: the ₹6L intercompany profit is ELIMINATED and the lathe drops back to ₹20L — a group cannot make profit selling to itself (the consolidated-statements course carries that baton home).

## ❓ Quiz

**Q1.** The ₹59L canon includes:
(a) everything the factory paid anyone during the installation quarter
(b) net price 48 + duty 4 + freight 1 + site prep 0.5 + installation 1.5 + testing 2 + dismantling provision 2 — with IGST (creditable), training, ceremony, admin overheads, abnormal breakage and early operating losses marched straight to P&L
(c) list price 50 plus every tax on the invoice
(d) price plus financing interest for the next five years

**Q2.** Under the 2022 amendment, ₹0.5L from selling test-run cartons:
(a) reduces the cost of the press
(b) is recognized in P&L as revenue/income with matching production cost — proceeds before intended use no longer net against the asset, so the cost cage keeps the full ₹2L testing cost
(c) sits in a reserve until warranty expiry
(d) reduces testing cost but not installation cost

**Q3.** A ₹3L present-value reinstatement obligation on the leased shed at installation day:
(a) expense it when the lease ends
(b) adds to the press cost with a matching Ind AS 37 provision — the obligating event is installation; the slice then depreciates with the asset while the provision unwinds through finance cost
(c) ignore until year five
(d) add to repairs expense

### ✅ Answers

1. **(b)** — the cage is net-price-plus-attributable-plus-provision; the exclusion wall keeps the rest out.
2. **(b)** — amendment doctrine: proceeds meet P&L, the cage stays whole.
3. **(b)** — para 16(c) × Ind AS 37: day-one provision inside cost, discount unwinding in finance cost.

## ✅ Mastery checklist

- [ ] I can rebuild the ₹59L cage line by line and defend every inclusion
- [ ] I can state the exclusion wall (training, ceremony, admin, abnormal waste, early losses)
- [ ] I can explain the 2022 amendment on testing proceeds and why the old net-off died
- [ ] I can journal the decommissioning provision into cost and its finance-cost unwinding
- [ ] I know the capitalization finish line: capable of operating, not actually operating
- [ ] I can handle swaps (substance → fair value + gain) and deferred payment (cash-price equivalent)

---

**Next:** **DP3 · Five Machines Inside One** — the component approach: why a ₹90L overhead crane is really five assets with five clocks, the ₹1.3L under-depreciation trap of composite lives, and why nobody atomizes a ₹9,000 jib crane.
