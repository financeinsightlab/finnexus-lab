# 🎯 IC11 · The Wiring — Perpetual vs Periodic, ERP Reconciliations, and the Cut-Off Fortress

> Standards are philosophy; systems are plumbing. Whether your books KNOW what's on the shelf tonight (perpetual) or find out when someone counts (periodic) decides everything: where shrinkage hides, how standard costs drift, and how the 31-March count either confirms reality or discovers a corpse. This module wires the machinery: the two inventory SYSTEMS, ERP-standard-cost reconciliation, the physical-verification fortress with the auditor camped inside, and the GRN numbers that close the year.

---

## 🎯 Objectives

- Contrast perpetual vs periodic inventory systems — books vs physics, and where each leaks
- Run the ERP/standard-cost reconciliation: perpetual ledger vs GL vs physical floor (the three-body problem)
- Design the physical verification fortress: instructions, two-way tests, cut-off freezes, auditor attendance
- Operate cut-off mechanics with the last GRN / last dispatch numbers as the gates
- Choose system policies: count cadences, tolerance norms, count adjustments discipline

## 📘 Concepts

### 11.1 Two systems, two worldviews

**Perpetual inventory**: every receipt, issue and transfer posts to the ledger in real time — book quantities exist continuously; cycle counts CONFIRM them. COGS can be computed at any instant; shrinkage surfaces as book-vs-floor deltas at any count. **Periodic**: ledger tracks purchases only; quantities and COGS are derived at period end by counting the floor (COGS = opening + purchases − closing — the IC1 bridge AS the system). Leak profiles: perpetual leaks audit-trail integrity (bogus adjustments to make floors fit books); periodic leaks CONTINUOUS KNOWLEDGE (shrinkage parks inside "COGS" invisibly between counts — counted shrinkage vs hidden shrinkage is the actual policy choice). Modern ERP means most serious operators run perpetual records on FIFO/WAC formulas, with periodic-style physical verification as the audit fortress over it.

### 11.2 The three-body problem: perpetual ledger, GL, physical floor

A manufacturer's month-end close reconciles three clockworks that never tick together naturally:

1. **Perpetual inventory sub-ledger** (quantities × formula costs by SKU),
2. **General ledger** (inventory control accounts, purchases, payables — financial values),
3. **Physical floor** (the counted truth, tagged and frozen).

Differences have pedigrees: unposted GRNs (sub-ledger vs GL), cut-off slips (GL vs floor), price/standard drifts (formula value vs GL), count errors (floor vs both). A clean close proves: sub-ledger total = GL control = physical-count value, or itemizes the differences with owners and dates. The standard-cost echo (IC6's ₹140-vs-₹141 discipline) lives precisely here: standards post values fast; the reconciliation is what stops the ₹1 variance from dying quietly.

### 11.3 The physical-verification fortress

Count day, run like a military exercise:

- **Instructions issued** (who counts, what areas, freeze rules — no movements during counts, pre-numbered tags, second-count samples, obsolete/damaged flagging rules).
- **Two-way tests** (auditor's signature recipe): floor → sheet tests COMPLETENESS (things present but unrecorded); sheet → floor tests EXISTENCE (things recorded but absent — the Satyam-flavored direction).
- **Cut-off freeze**: record the LAST GRN number and LAST dispatch number at lockdown (before the count begins) — these two numbers are the period walls for both purchases and sales, and every auditor's working paper that year hangs off them.
- **Auditor attendance** at year-end counts for material inventory: observe instructions being followed, run independent test counts, freeze the cut-off numbers, inspect identification of obsolete/damaged stock. The roof: counts at OTHER dates are acceptable if the entity's controls are strong, with roll-forward/roll-back reconciliations documented — the fortress can stand on surveillance, but the paperwork must march.
- **Count adjustments**: differences posted with investigation trails, not blanket "count-to-book" plugs; repeated direction-biased adjustments are a red flag, not a reconciliation.

### 11.4 Cut-off mechanics — the numbers that close the year

Last-GRN/dispatch numbers define the walls; the Incoterms from IC8 define which loads cross them. The exam-crimes map 1:1 onto mechanisms: record a purchase pre-GRN (purchases AND inventory inflated), record a sale pre-dispatch (revenue early, COGS deferred to never), receive goods without invoice by midnight (an accrual must catch the inventory — GRNI: goods received, not invoiced — or payables and stock are both under-cooked), miss in-transit FOB-origin loads (IC8's ₹25L truck drives straight through an open gate). Cut-off testing = inspecting the numbered documents bracketing the walls: GRNs 38,441–38,475 and dispatches 22,104–22,155, say — every document in the bracket assigned to its side of midnight.

### 11.5 Policy wall — cadence and tolerance

Count cadence by class (A monthly / B quarterly / C annual is common sense made doctrine), tolerance norms for count adjustments (investigate anything directional; plug only immaterial noise within a pre-set band, disclosed), and adjustment authority SPLIT (counter ≠ adjuster ≠ approver) — the fortress's point isn't the count, it's making faking a count require a conspiracy of three.

## 🧪 LAB — The 31-March Lockdown (10 min)

1. At freeze: last GRN 38,441, last dispatch 22,104 (all numbers documented per policy). Vendor claims GRN 38,442 was "received 30-March" but the tag was cut 1-April morning. Which side of the wall, and what does that ₹12L do to the year?
2. Perpetual sub-ledger ₹100L; GL control ₹99.4L; floor count ₹97L. Decompose two independent gaps and prescribe the pedigree check for each.
3. Count observation: you recount a sample pallet — floor shows 480 units, sheet line says 520. Which direction test failed, and which fraud family does it belong to?
4. Standard ₹140/unit, perpetual year-end shows ₹141.2L against 1,008 physical units. Reconcile: what SHOULD unit cost be, and what's the honest close sequence?
5. Design the adjustment-authority split for ShopKart's 3 warehouses in one implementable sentence.

**Why this matters:** IC1–IC10's rules only work when systems tell the truth at midnight — the countdown mechanics ARE the control environment for every number this course produced.

**🔑 Lab answers:**
1. The GRN's TAG-SIDE evidence says April: tag cut 1-April, physical control transferred April — the ₹12L parks OUT of this year (no purchase, no inventory) unless documents prove 30-March custody. Last-GRN 38,441 is the wall: 38,442 belongs to next year, and vendor-claim-vs-tag reality is exactly why walls exist.
2. Gap one (sub-ledger ₹100L vs GL ₹99.4L): ₹0.6L unposted/price-timing — pull GRNI listings and JE-pending queues (GL keeps waiting for finance posts). Gap two (books vs floor ₹97L): ~₹2.4L shrinkage-family — physical-first investigation: recount targeted SKUs, then post shrinkage expense with the investigation memo (IC8's ₹3L-canon logic). Different pedigrees, different fixes — one number never diagnoses both.
3. Sheet→floor = EXISTENCE test failed: recorded 520, counted 480 — 40 ghost units; that's the phantom-inventory family (recorded-but-absent) — escalate: recount freeze, document review of recent adjustments hitting that SKU, and two-way extension before anyone calls it a "count error".
4. If 1,008 physical units genuinely exist, sub-ledger's ₹141.2L implies ₹140.08/unit — fine; the honest close sequence: floor count confirmed → variance to GL/variance to standard analyzed → the standard-cost variance (₹1-family per IC6/IC9) charged or prorated → control accounts forced equal to the evidence. Never "adjust the count" to protect a standard.
5. *"Warehouse teams count, finance posts adjustments only with a location-head + independent-FP&A dual sign-off, and internal audit samples every month — counter, adjuster and approver never the same hands, and no adjustment posts without a tagged investigation reference."*

## 💪 Exercises

1. Why does a periodic system hide shrinkage inside COGS, and what's the accounting-visible symptom?
2. Phantom-vs-unrecorded stock: which direction test hunts each, and why do both belong in any observation memo?
3. The GRNI accrual: what precisely does it fix at midnight, and what does missing it do to payables and inventory?
4. Roll-forward counts: count done 10-April for a 31-March year-end — what makes it acceptable, and what document chain carries the load?
5. "Adjustments within tolerance are plugs." Write the tolerance doctrine in two sentences.

### ✅ Selected answers

1. Periodic systems compute COGS as a RESIDUAL — opening + purchases − closing — so anything that vanished between counts (theft, damage, expiry) is mathematically indistinguishable from goods sold: it rides COGS disguised as sales-serving cost. Symptom: gross margin erosion with no visible shrinkage line — the warehouse is leaking, and the bridges calls it "business".
2. Sheet→floor hunts EXISTENCE (recorded-but-absent: phantoms, inflated counts, fictitious purchases — the classic fraud direction). Floor→sheet hunts COMPLETENESS (present-but-unrecorded: cut-off misses, stolen-then-replaced gaps, unbooked receipts — the quiet-error direction). Fraud lives in the first direction, sloppiness in the second; a memo documenting only one has observed half a fortress.
3. GRNI fixes the timing split between LOGISTICS and VENDOR BILLING: goods custodied by us at midnight ARE our inventory even un-invoiced → Dr inventory, Cr GRNI accrual. Missing it understates BOTH inventory and payables; next period, the invoice hits purchases without any stock arriving — margin distortion across two periods from one un-accrual.
4. Acceptable when control environment is strong and every movement between 31-March and 10-April is documented: the roll-back (count value minus post-year receipts plus post-year issues, SKU by SKU) reconstructs the year-end quantity, tied to GRN/dispatch registers; auditor re-performs the roll on samples. Weak controls, or undocumented movements = the roll-forward is theatre with paperwork.
5. Tolerance bands exist for MEASUREMENT NOISE (unit rounding, scale drift, genuine count diffs within a pre-set, disclosed threshold) — anything above the band, or directionally consistent even below it (always short, never long), requires investigation and a named cause. A tolerance used as a smoothing plug is how you discover your fortress counts to fit, not to find.

## ❓ Quiz

**Q1.** Periodic systems fundamentally differ from perpetual because:
(a) they're faster to compute
(b) COGS is derived as a residual (opening + purchases − closing) at count time, so shrinkage between counts hides inside "COGS" disguised as sales-serving cost; perpetual systems keep quantities live, and cycle counts CONFIRM them — the policy choice is really counted shrinkage vs invisible shrinkage
(c) they require no counts at all
(d) they're newer ERP technology

**Q2.** Floor 480 vs sheet 520 on a test pallet means:
(a) a completeness issue — recount later
(b) an existence failure: 40 recorded units are ghost stock (recorded-but-absent, the classic phantom family) — freeze, investigate recent adjustments on the SKU, extend two-way tests before anyone files it as count error
(c) expend ₹0 — immaterial by definition
(d) the floor count is wrong by law

**Q3.** GRN 38,442 tagged 1-April with vendor claiming 30-March receipt, wall = GRN 38,441:
(a) book this year — vendor says so
(b) park OUT of the year: tag-side control passed in April, so neither purchase nor inventory enters March; last-GRN walls exist precisely to stop claimed-custody from outbidding documented custody at midnight
(c) book half in each year
(d) expense it in March and stock it in April

### ✅ Answers

1. **(b)** — residual COGS hides shrinkage; live quantities expose it. Choose your visibility.
2. **(b)** — ghost direction is the fraud direction: freeze and investigate before reclassifying.
3. **(b)** — cut-off walls run on documents and custody, not on claims; 38,442 lives in April.

## ✅ Mastery checklist

- [ ] I can articulate periodic-vs-perpetual leak profiles in one breath each
- [ ] I can decompose sub-ledger vs GL vs floor gaps by pedigree (₹0.6L / ₹2.4L canon)
- [ ] I can run a count observation with two-way tests and name failures correctly
- [ ] I can operate last-GRN/dispatch walls and the GRNI accrual
- [ ] I can draft a tolerance-and-authority policy that needs a three-person conspiracy to fake

**Next:** IC12 — 🏆 CAPSTONE: **The Stockroom Trial**. Six shelf files land at closing: formula choice under rising prices, a normal-capacity assertion under attack, an NRV collapse and recovery, the midnight truck, the cost sheet to rebuild, and a museum that needs burning — then the Interview Forge, ten questions with model answers, until the whole shelf sings.
