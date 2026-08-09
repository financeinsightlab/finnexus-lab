# 🎯 LS3 · Lease vs Service — Splitting the Bundled Contract

> Real contracts never arrive pure. The warehouse comes with security and HVAC; the truck comes with a driver; the office floor comes with housekeeping and common-area maintenance. Ind AS 116's command: find the lease components, find the service components, price each one, and capitalize ONLY the lease ones. Or — if you're a lessee feeling lazy and well-capitalized — elect the expedient and swallow the bundle whole. One choice, two balance sheets, and a learning: in lease accounting the components are where the game is played.

---

## 🎯 Objectives

- Identify lease vs non-lease components inside a single contract
- Allocate consideration on **relative standalone prices** (the ₹30L → ₹21.43L/₹8.57L canon)
- Elect (or wisely refuse) the lessee practical expedient — and price its balance-sheet cost (₹70.01L → ₹93.35L)
- Contrast lessor mechanics: mandatory separation, Ind AS 115 allocation discipline
- Handle classic bundle exhibits: CAM, maintenance, drivers, dedicated equipment + operation

## 📘 Concepts

### 3.1 Components — one contract, several promises

A single contract can contain: (a) the right to use an asset (**lease component**), and (b) other goods/services (**non-lease components** — maintenance, security, cleaning, insurance administration, operating crew). Ind AS 116 capitalizes (a) and expenses (b) as incurred. The separation question is asked per unit of account: each separate underlying asset is usually its own lease component (three floors = three lease components if each can benefit independently; a building as one unit of account = one).

Watch the borderline residents:

- **CAM (common-area maintenance)** — housekeeping, lobbies, lifts, security for shared areas: non-lease service, even though it's steeped in the same invoice.
- **The truck + driver**: the truck is the lease component (you direct the truck); the driver is a service (the driver's labor and the supplier's dispatch decisions aren't an asset of yours).
- **Land and building**: land is assessed as a separate lease component unless the accounting effect of splitting is immaterial — land's indefinite life changes depreciation behavior, so the split usually matters.
- **"Dedicated machine with operator services"**: if you direct the machine's how/what, machine = lease, operator = service.

### 3.2 The allocation engine — relative standalone prices

Split the total consideration across components in proportion to their **standalone prices** (what each would cost contracted separately — observable prices from yourself or other suppliers; estimate when unobservable, maximizing observable inputs, as Ind AS 115's SSP doctrine already taught us in RR5).

**Canon (python-verified):** UrbanNest signs a 5-year bundled deal, ₹30L/year all-in: equipment platform use + full maintenance. Standalone evidence: the platform leases alone at ₹25L/year; equivalent maintenance retails at ₹10L/year. Allocation of each ₹30L:

- Lease component: 30 × 25/35 = **₹21.43L** → this (and ONLY this) feeds the lease liability math of LS4
- Service component: 30 × 10/35 = **₹8.57L** → P&L as incurred

Miss the split and you capitalize maintenance — an ROU asset built partly out of sweeping and oil-changes. Auditors have seen it. Actually they've seen worse: insurance admin fees capitalized.

### 3.3 The lessee practical expedient — merge it all, at a price

A lessee MAY elect, **by class of underlying asset**, not to separate: treat each lease component and its sidecar services as ONE single lease component. Capitalize everything. Why would anyone inflate their own balance sheet? Because separating 400 store contracts into rent/CAM/security annually costs more analyst-hours than the ratio pain is worth, especially for contractually muddy bundles.

The price of laziness, priced (python-verified, 5y @ 9%):

| Election | Amount capitalized per year-stream | Liability / ROU at inception |
|---|---|---|
| Separate (lease-only ₹18L/yr of a ₹24L bundle) | ₹18L | 18 × 3.8897 = **₹70.01L** |
| Expedient (swallow whole ₹24L) | ₹24L | 24 × 3.8897 = **₹93.35L** |

That election just added **₹23.34L** of debt optics and a fatter D&A stream — services don't amortize, but swallowed ones do. Elect by class with eyes open: real estate bundles (where CAM is chunky) usually separate; vehicle fleets (where the service smear is thin) usually swallow.

### 3.4 The lessor's stricter road

No expedient sympathy for lessors: a lessor MUST separate, and allocates using **Ind AS 115's allocation machinery** (relative SSP, the same logic RR5 ran). Reason: the lessor's splitting changes REVENUE classification — and revenue is the most audited number in any statement. "Rent income" vs "service income" feed different margin narratives, covenants, and in REIT-land even distribution math. So: lessees may merge; lessors may not. Asymmetry by design.

### 3.5 Variable payments inside bundles

Variable payments linked to an index/rate are part of the lease component's measurement at the index level when initially measured. Variable payments tied to USAGE or PERFORMANCE (per-km charges, %-of-sales top-ups, per-occupant CAM true-ups) are allocated between components on the same relative-price basis when they relate to both — and then expensed as incurred either way (they never join the liability). A contract's variable tail never escapes the allocation logic; it just never gets capitalized.

## 🧪 LAB — UrbanNest's Split Week (10 min)

1. **WareHouse-A**: 5-year deal, ₹24L/yr all-in. Standalone: warehouse space ₹18L/yr, security+HVAC ₹6L/yr. Allocate the ₹24L. Then compute both expedient outcomes (5y, 9%, factor 3.8897).
2. **FleetLine**: 3-year truck contract, ₹12L/yr: truck ₹9L, driver ₹3L (observable separately). UrbanNest does NOT elect the expedient for trucks. What enters the liability base? What hits P&L and when?
3. **DataRack Cage C-7**: ₹1.5cr/yr, cage (identified, LS2 verdict) ₹1.2cr standalone, power/cooling service ₹0.3cr standalone. Allocate; UrbanNest elects separate for data-centre assets.
4. **Bundle-B**: ₹30L/yr all-in; standalone ₹25L platform + ₹10L maintenance. Run the canon allocation.
5. Ratio memo: UrbanNest's treasurer asks one line — why does the expedient election RAISE both sides of the balance sheet without borrowing a rupee more?

**Why this matters:** the split is where lease accounting gets operational — every month, accounts payable books invoices across these lines, and every quarter, the FP&A team explains a balance sheet whose size partly reflects an accounting-policy election. You must be able to defend the number either way.

**🔑 Lab answers:**
1. Allocate ₹24L: lease ₹18L, services ₹6L (the SSPs happen to sum exactly) → capitalized stream ₹18L → liability **₹70.01L** (18 × 3.8897). Expedient election: capitalize ₹24L → **₹93.35L**. Delta: ₹23.34L of balance sheet from an accounting-policy checkbox.
2. Liability base: **₹9L/yr** (truck only). The ₹3L driver is a **service, expensed as incurred** — the driver's hours flow through operating expenses, never through ROU or the liability.
3. Cage lease component **₹1.2cr/yr → capitalized**; power/cooling **₹0.3cr/yr expensed as incurred**. (And the monthly power true-up on actual usage? Variable, allocated, expensed — never in the liability.)
4. Lease **₹21.43L/yr** (30 × 25/35), service **₹8.57L/yr** (30 × 10/35) — ₹21.43L/yr feeds LS4's discounting.
5. Bro-to-treasurer: *"Same cash out the door, different accounting bucket: the expedient re-labels service payments as lease payments, and lease payments get present-valued onto both sides of the balance sheet — liabilities up, assets up, actual debt zero."*

## 💪 Exercises

1. Why does the standard give the expedient to lessees but deny it to lessors? Ground in WHOSE number each side is protecting.
2. A landlord invoices "rent ₹20L + CAM ₹5L" but market evidence shows the space alone rents at ₹22L and CAM at ₹3L. Reallocate. Which line drifted and why does it matter?
3. UrbanNest elects the expedient for its 200-truck fleet. Name one benefit and one cost, both quantifiable-ish.
4. CAM charges arrive as "actuals +15% admin, trued-up quarterly". Which rupees sit in the liability at inception?
5. Land + building lease, 9 years. Why does the land split usually survive materiality scrutiny?

### ✅ Selected answers

1. Lessee splitting changes only the SHAPE of the balance sheet and where expenses sit — policy judgment is tolerable there. Lessor splitting re-labels REVENUE streams (rent vs service income), and revenue is the most manipulated line in reporting history — so lessors get Ind AS 115's full allocation discipline and no merge button. Protect the revenue classification; forgive the expense classification.
2. Allocate on standalone evidence, not the invoice's labels: total ₹25L ÷ relative SSPs 22/25 and 3/25 → lease 25 × 22/25 = **₹22L**, service **₹3L**. The invoice overstated the service slice (and understated the lease slice) — if you'd capitalized per the invoice lines you'd have under-capitalized the lease by ₹2L/yr of stream. Labels are politics; relative standalone prices are physics.
3. Benefit: one allocation spreadsheet instead of hundreds of per-truck splits — real bookkeeping-hours saved every month. Cost: the service slice (drivers' marginal extras, maintenance riders) gets capitalized and amortized — liability, ROU, D&A and interest all rise for identical cash. Defensible when the service smear is thin; indefensible when services are chunky.
4. None of them. Actuals-based CAM with true-ups = variable payments linked to performance/usage → allocated across components and **expensed as incurred**; the liability at inception carries only payments fixed (or index-linked) at commencement.
5. Land is (near-)indefinite-lived and often a huge value slice; folding it into the building component changes depreciation life and the ROU base materially — usually enough to matter. Unless the split's effect is provably trivial, land stands as its own lease component with its own (typically longer/ownership-tested) treatment.

## ❓ Quiz

**Q1.** ₹30L/yr bundle; standalone prices ₹25L (platform) + ₹10L (maintenance); no expedient. The lease liability math runs on:
(a) ₹30L, all-in
(b) ₹21.43L — consideration allocates on RELATIVE standalone prices: 30 × 25/35 to the lease component; only that stream is capitalized, while ₹8.57L is expensed as incurred
(c) ₹10L, services first
(d) ₹25L, the platform's sticker price

**Q2.** UrbanNest elects the lessee practical expedient for a ₹24L/yr bundle (lease ₹18L + services ₹6L), 5 years at 9%:
(a) liability ₹70.01L, services still expensed
(b) liability ₹93.35L — the election merges services into the lease component, so ₹24L × 3.8897 lands on BOTH sides of the balance sheet; ₹23.34L more than the separate-treatment ₹70.01L, with zero extra borrowing
(c) liability ₹24L
(d) the election is prohibited for real estate

**Q3.** Which statement about lessors and bundles is right?
(a) lessors get the same merge-everything expedient as lessees
(b) lessors MUST separate lease and non-lease components and allocate under Ind AS 115's discipline — their split re-labels revenue lines, and revenue classification gets no expedients
(c) lessors always treat CAM as lease income
(d) lessors capitalize services into the net investment

### ✅ Answers

1. **(b)** — relative standalone prices carve the bundle; only the lease stream is capitalized.
2. **(b)** — the lessee expedient swallows services into lease accounting; balance sheet inflates symmetrically.
3. **(b)** — no merge for lessors: Ind AS 115 allocation protects rent-vs-service revenue classification.

## ✅ Mastery checklist

- [ ] I can spot lease vs non-lease components in a bundle (CAM, drivers, maintenance, operators)
- [ ] I can allocate on relative standalone prices and re-run the ₹30L → ₹21.43L/₹8.57L canon blindfolded
- [ ] I can price the expedient election (₹70.01L vs ₹93.35L) and defend it by asset class
- [ ] I can state why lessors never get the expedient
- [ ] I can route variable/actuals-based charges straight to P&L and say why

**Next:** LS4 opens the measurement toolbox — day-one lease liability: the exact five buckets of payments that get discounted, the incremental borrowing rate hunt, and the ROU build (liability + upfront payments + direct costs + restoration − incentives) with the ₹38.90L canon running through every exhibit.
