# 🎯 LS2 · The Definition Gauntlet — Identified Asset, Control, Exemptions

> Everything in Ind AS 116 hangs off one gate: **is this contract (or this piece of it) a lease?** Get the gate wrong and an office becomes a service, a data-centre rack becomes a liability, and a laptop fleet becomes the dumbest capitalization project of the year. The gate has three locks — an identified asset, the right to substantially all its economic benefits, and the right to direct its use — plus two escape hatches for small beer. This module is lock-picking training with Indian-flavored exhibits.

---

## 🎯 Objectives

- Apply the three-part lease definition: identified asset → substantially all benefits → right to direct use
- Test "identified asset": explicit/implicit specification, physical distinctness, the capacity-portion knife
- Disarm the substitution trap: when a supplier's swap right is substantive (and when it's a decoy)
- Run the two exemptions — short-term ≤12 months and low-value (~US$5,000 when new) — without tripping the anti-abuse catches
- Separate in-substance fixed payments from genuinely variable ones

## 📘 Concepts

### 2.1 The gate: three locks, all must click

A contract is (or contains) a lease if it conveys **the right to control the use of an identified ASSET for a period of time in exchange for consideration**. Period of time can be a calendar span OR an amount of use (thousand machine-hours). Three locks, and a "no" at any lock means NO LEASE — the whole thing is a service, expensed as incurred:

1. **Identified asset** — a specific asset the contract rides on (2.2–2.3).
2. **Right to obtain substantially all economic benefits** from using it — the output, the by-products, the idle-capacity rents.
3. **Right to DIRECT the use** — YOU decide how and for what purpose it runs: when an aircraft flies, what a machine produces, which cargo a truck carries.

If the supplier controls how/what — you bought outcomes, not an asset. Classic contrast: chartering a specific aircraft with YOUR crew choosing routes = lease; buying seats on someone else's scheduled flight = service, even though the same aluminium does the work.

### 2.2 Identified asset — specify it or it doesn't exist

An asset is identified when it's **explicitly specified** (serial no. AX-221, "the office on the 7th floor of Tower B") or **implicitly specified** (only one asset can fulfil the contract: a dedicated rail siding, a built-to-purpose cold storage). Then comes the knife: **physically distinct**. A whole asset is distinct. A CAPACITY PORTION is distinct only if it represents **substantially all** the capacity:

- **"Space for my server, slot 14, rack C, Pune data centre"** → physically distinct. Identified. Lease candidate.
- **"40% of the capacity of fibre cable Mumbai–Goa"** → NOT physically distinct (40% of a glass strand is nobody's floor plan). Got substantially all capacity instead (say 95% of the lit fibre) → distinct enough.
- **"Guaranteed space for 20 tonnes in my warehouse, wherever it fits"** → NOT identified: the goods float across the warehouse; no specific cubic metres are yours.

### 2.3 Substitution rights — the supplier's escape valve

Even a perfectly specific asset fails the gate if the supplier's substitution right is **substantive**. Two conditions, BOTH required:

1. **Practical ability** to substitute throughout the period — the supplier owns/can source alternatives and the customer can't fence them off; and
2. **Economic benefit** from substituting — swapping saves money (one truck fleet serving many contracts, maintenance optimization).

Decoys that do NOT count: substitution only on/after a specific date, only on an event, only for **repairs and maintenance** (swapping a broken excavator mid-lease is upkeep, not freedom). And the burden sits with the CUSTOMER-only-if-obvious: if you can't readily tell whether substitution is substantive, presume it ISN'T (the standard protects users from having to audit the supplier's fleet economics).

Data centres are the poster trap. "Rack R-41, servers your choice, we may move your workload anywhere in the hall for cooling efficiency with 40 identical racks" → practical ability ✓, economic benefit ✓ → **no identified asset → all service**. Versus "cage C-7, exclusively yours, biometric access, no relocation clause" → identified asset; walk onward to locks 2 and 3.

### 2.4 Directing use — and the predetermined-machine wrinkle

You direct use when you decide the how/what (output mix, schedule, route, operating hours). Wrinkle: sometimes those decisions are **predetermined by design** — a solar plant engineered to do exactly one thing. Then the right to direct use lives in whoever **operates** it (or designed it, if you designed the purpose). Protective rights (safety covenants, mileage caps, maintenance standards the lessor enforces) do NOT hand direction to the lessor — they protect the lessor's asset, they don't run it.

### 2.5 The two exemptions — small beer, big traps

A lessee MAY elect to expense both of these straight-line, no ROU, no liability:

- **Short-term lease**: lease term **≤ 12 months** — and "term" already includes extension periods you're reasonably certain to exercise and excludes termination-period illusions. An 11-month serviced office with a market-rate renewal option you haven't committed to → exempt (renewal not reasonably certain at inception). The same office signed 11-months-then-renewed-forever-in-practice → the reasonably-certain tail drags it over 12 months and the exemption dies. Election is by class of asset.
- **Low-value asset**: underlying asset is low value **WHEN NEW**, on an absolute scale (IASB calibration ≈ **US$5,000** — call it ≈ ₹4L): laptops, tablets, small furniture, telephones. Anti-abuse catches: (a) the test is the asset's value new, not the rent, and not its battered resale price; (b) if you **sublease** the asset, the head lease can't claim the exemption — otherwise every intermediary would launder big assets through tiny labels; (c) election is lease-by-lease, and the asset must not be highly dependent on, or highly interrelated with, other assets (a ₹3.8L server blade that's an organ of a ₹40L SAN array follows the array's threshold, not its own sticker).

### 2.6 In-substance fixed payments — the fake variables

Payments that LOOK variable but are unavoidable are fixed in substance: "₹10L/year, or 1% of sales, whichever is HIGHER" (the ₹10L floor is in-substance fixed), "pay nothing if the machine runs, ₹5L if it stops" (you pay either way). Only genuinely variable payments that depend on future activity (pure % of sales, per-unit usage) escape capitalization — and they go to P&L as incurred (LS11's turnover rents). Drawing this line honestly in the contract paper is where a CFO can still legitimately shape the balance sheet.

## 🧪 LAB — Four Contracts, One Gate (10 min)

1. **RackServe**: UrbanNest contracts "capacity for its servers in rack C-14, Pune DC, exclusive cage, badge access, no relocation without consent", 3 years. Lease?
2. **FlexCloud**: supplier guarantees UrbanNest "the equivalent of 50 server-units of compute, located wherever in our five data centres we find optimal, interchangeable hardware". Lease?
3. **LapFleet**: 120 laptops, 3-year contract, ₹18L/year total; laptops retail new at ₹45,000 each. Lease? Exempt-able?
4. **PopUpCellar**: an 11-month basement lease for festive-season storage, renewal at then-market rates (UrbanNest has never renewed a short unit in 6 years). Lease? Exempt-able?

**Why this matters:** these four shapes — cage, cloud, laptop fleet, pop-up — are 90% of the lease-vs-service tickets a real finance team closes monthly. The gate is muscle memory.

**🔑 Lab answers:**
1. **Contains a lease** — identified asset (specific physically distinct cage, no substantive substitution), benefits + direction with UrbanNest. Measure per LS4.
2. **No lease — all service.** Substantive substitution (practical ability across five centres + economic benefit from load-balancing) and no physically distinct portion; expense as incurred.
3. Contains leases (identified serial-numbered laptops, UrbanNest directs use) — but **low-value exemption applies**: each laptop ₹45k new, absolute-scale low-value, elected lease-by-lease → expense ₹18L/yr straight-line; no ROU, no liability. (Watch it: exemption dies if the fleet is subleased.)
4. Contains a lease with an **11-month term** (renewal not reasonably certain given track record and market-rate repricing) → **short-term exemption applies** → expense as incurred. If UrbanNest later renews repeatedly, reassess — the paper says 11 months, the pattern may not.

## 💪 Exercises

1. Why do BOTH conditions (practical ability AND economic benefit) have to hold for substitution to kill a lease? Construct a case with only one present.
2. "We lease 30% of the capacity of an oil pipeline." Identified asset? What single fact could flip your answer?
3. UrbanNest subleases its spare laptops to a franchisee. What breaks, and why did the standard-setters weld that break in?
4. A lessor requires the lessee to keep the excavator within the state and service it every 500 hours. Do these rights hand direction of use to the lessor?
5. Design one contract clause that converts a fixed payment into a genuinely variable one, and one that backfires into in-substance fixed.

### ✅ Selected answers

1. Ability without benefit is theory (a spare excavator the supplier would LOSE money deploying sits unused; its "right" is ceremonial). Benefit without ability is also theory (profitable to swap but the asset is welded into your plant — can't). Only both together give the supplier real freedom over YOUR asset during YOUR period, which is what "no identified asset" means. One-condition cases: swap-right-only-on-breakdown (ability during maintenance events, no continuous ability) → not substantive; a 40-rack hall where swapping saves the supplier ₹2/year (ability yes, benefit trivial) → not substantive.
2. No — a capacity portion of a pipeline is not physically distinct — UNLESS the 30% is, in substance, substantially all the capacity (e.g., the other 70% is permanently committed/mothballed and your 30% rides the full usable flow with exclusive operational rights). The knife is "substantially all", and documentation of capacity commitments decides it.
3. The **low-value exemption dies for the head lease** — only the sublessor's own position can use low-value-style analysis, and the head-lease asset must come onto the balance sheet. Welded in because otherwise an intermediary could lease ₹4L-value-labelled assets in bulk (say, stacked into huge fleets), claim the exemption, and re-lease the economic substance to keep an empire off balance sheet.
4. No — those are **protective rights**: they ring-fence the lessor's asset and resale value, they don't decide how/for what purpose the machine digs. Direction stays with the party running the operation — the lessee.
5. Genuine variable: "3% of store sales, paid quarterly, no minimum" — future-activity-linked, escapes capitalization, hits P&L as incurred. Backfire: "3% of sales with a ₹12L annual minimum" — the floor is unavoidable → ₹12L is in-substance fixed and gets capitalized; only the excess over the floor stays variable. Contracts engineer the balance sheet at the clause level.

## ❓ Quiz

**Q1.** A contract guarantees UrbanNest "50 server-units of compute anywhere across the supplier's five interchangeable data centres". It is:
(a) a lease of 50 identified servers
(b) a service — no identified asset: substitution is substantive (practical ability across centres plus economic benefit from load-balancing) and no capacity portion is physically distinct, so all three locks never even get tested
(c) a lease because the servers physically exist somewhere
(d) a finance lease from day one

**Q2.** The low-value exemption correctly applies to:
(a) any asset whose RENT is small
(b) assets low value when new on an absolute ~US$5,000 scale — laptops, tablets, small furniture — elected lease-by-lease, and NOT available where the asset is subleased or is an interdependent organ of a bigger asset
(c) any asset below ₹4L resale value today
(d) the head lease of laptops subleased onward to franchisees

**Q3.** "Rent = 1% of sales, minimum ₹10L/year." Under Ind AS 116 the ₹10L floor is:
(a) variable consideration, expensed as sales occur
(b) an in-substance fixed payment — unavoidable, so it enters the lease liability at day one; only the excess of 1%-of-sales over the floor remains genuinely variable and hits P&L as incurred
(c) disclosed but never measured
(d) a contingent asset

### ✅ Answers

1. **(b)** — substantive substitution and no physically distinct portion = no identified asset = service.
2. **(b)** — absolute-scale low value, assessed when new, with the sublease and interdependence catches welded in.
3. **(b)** — floors are fixed in substance; caps and floors in clauses decide what gets capitalized.

## ✅ Mastery checklist

- [ ] I can run the three locks in order and name where each exhibit fails
- [ ] I can apply the physically-distinct / substantially-all-capacity knife
- [ ] I can test substitution for practical ability AND economic benefit, and wave off repair-only swaps
- [ ] I can elect both exemptions and cite their anti-abuse catches (term tail, sublease kill, value-when-new)
- [ ] I can spot an in-substance fixed payment hiding in a variable costume

**Next:** LS3 splits the bundled contract — leases travel with maintenance, security and drivers attached; learn the allocation machinery (relative standalone prices), the lessee practical expedient that merges everything into one big lease, and why lessors never got that shortcut.
