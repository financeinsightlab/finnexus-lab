# 🎯 CS10 · The Foreign Subsidiary — Translation & the CTA Machine

> The creature crosses a border and immediately faces a two-currency problem with teeth: your US child keeps its books in dollars, your group reports in rupees, and the exchange rate refuses to stand still. Ind AS 21's translation protocol is the only sane answer ever devised: translate the foreign operation's ASSETS AND LIABILITIES at the CLOSING rate, its INCOME AND EXPENSES at transaction-date rates (average rate as the practical proxy), and let the stubborn, inevitable difference — created because one part moves with one date's rate while equity moves with others — pile into a parking bay inside OCI called the CTA (cumulative translation adjustment). It sits there quietly, often for decades, until the day the foreign child leaves the family — when the whole pile RECYCLES into P&L at once. The ₹1.25cr canon that clarifies the machine, and the IA8 handshake, in today's module.

---

## 🎯 Objectives

- Fix the functional currency first — the primary environment doctrine
- Run the translation protocol: closing-rate balance sheet, average-rate P&L, CTA plug to OCI
- Compute the ₹1.25cr CTA canon line by line
- Distinguish translation of the foreign OPERATION from translation of TRANSACTIONS (that hits P&L)
- Recycle the CTA on disposal of the foreign child — partial and full
- Place net-investment hedge discipline (the shield for the CTA)

## 📘 Concepts

### 10.1 Functional currency — whose economy do you breathe?

Before any translation: each entity's FUNCTIONAL currency = the currency of the primary economic environment it operates in (pricing currency of sales/labour/materials, financing currency, retained currency). Meridian India breathes ₹; MeridianUSA breathes $ — even if MeridianUSA's invoices occasionally print ₹ for a big Indian contract, the dominant environment decides, with judgment documents filed. Get this wrong and every downstream number breaks; the functional-currency memo is the first page of any foreign-consolidation file. (Hyperinflation children get the IAS 29 restatement-first protocol — IA8's sequence, throttle fully closed here.)

### 10.2 The translation protocol — two rates and a plug

Presentation from $ books to ₹ creature: **assets and liabilities at the CLOSING rate** on reporting day; **income and expenses at transaction-date rates** (the year's AVERAGE rate as the licensed practical proxy); equity items at historical rates when formed. The two-clock design creates a leftover writ-large — net assets walked from an old ₹-equivalent to a new one while the year's earnings walked at a third rate — and Ind AS 21 parks that leftover in OCI as the CTA. Translation is a PRESENTATION exercise: the child's underlying $ statements never change, no profit is manufactured or lost in the act; the CTA is a measurement-residue bay, not a P&L event. YET.

### 10.3 The ₹1.25cr canon — one year's CTA born (python-verified)

MeridianUSA, constant country-$ net assets $12m opening; year's profit $1m; rates: opening ₹82, close ₹83, average 82.5:

- Opening net assets: 12 × 82 = **₹984m**
- Add year's profit at average: 1 × 82.5 = **₹82.5m** → naive close: **₹1,066.5m**
- Closing-rate net assets: 13 × 83 = **₹1,079m**
- **CTA = 1,079 − 1,066.5 = ₹12.5m = ₹1.25cr**, parked in OCI for the year (owners' share; NCI takes its attribution of the CTA too — foreign-translation residues share like profits).

Note its composition: re-opening-rate drift (₹1 × 12m) plus average-vs-closing on the profit (₹0.5m equivalent) — either way the plug lands unambiguous, verifiable, and parked.

### 10.4 Translation of TRANSACTIONS — the OTHER machine (don't mix them)

A parent-company ₹-book receiving/paying $ invoices: TRANSACTION translation runs its own doctrine — record at spot on transaction date, re-measure MONETARY items at each close through **P&L** (IA8's machine: payable loss ₹3.5L canon lives there), non-monetary at historic-cost stay frozen. Never confuse the two: transaction translation = P&L-live, entity-level; operation translation = OCI-parked, presentation-level. "Did the CTA move because we lost money?" The answer is no — it moved because the RELATIVE PRESENTATION of two honest ledgers drifted; the transaction P&L is where money actually stings.

### 10.5 Recycling day — the CTA comes home at disposal

Lose control / dispose of the foreign child: the accumulated CTA for that operation recycles from OCI to P&L at once as part of the ceremony gain/loss (CS8's step three — "OCI monsters' payday" remembered: the ₹12cr CTA line in the CS8 lab). Partial doors matter: selling PART of a foreign SUBSIDIARY while keeping control re-attributes a proportionate CTA slice to NCI WITHOUT recycling (family trade); losing control triggers full recycle; selling down an associate %-share recycles that share. Net-investment hedges: FX borrowings designated as hedges of the foreign net investment — gains/losses park in the same CTA bay until disposal, neutralizing the reciprocal exposure, IFRS 9's hedge discipline applying (documented, effectiveness-tested, undesignated on disposal day when the CTA rolls over into the creature's loud number).

## 🧪 LAB — The Two Machines (10 min)

MeridianUSA year-2: net assets $15m opening; year's profit $2m; declared NO dividends; rates: open ₹83, close ₹84.5, average ₹83.6. ALSO: Meridian India carries a US$1m intercompany payable to its US wing (₹8.3cr when it arose at ₹83.00), still unpaid at the ₹84.50 close.

1. Closing-rate net assets of the US wing.
2. Naive close (open + profit at average).
3. The year's CTA, in ₹cr.
4. The Indian parent's payable: re-measurement—where does the FX hit report and at what size?
5. Suppose Meridian sells the whole US wing at year-end: what happens to BOTH CTA slices (this year + the stored ₹1.25cr)?

**Why this matters:** two machines run in every MNC file; crossing them is the classic analyst foul.

**🔑 Lab answers:**
1. (15 + 2) × 84.5 = 17 × 84.5 = **₹1,436.5m = ₹143.65cr**. 2. Opening: 15 × 83 = ₹1,245m; profit: 2 × 83.6 = ₹167.2m → **₹1,412.2m = ₹141.22cr**. 3. CTA = 143.65 − 141.22 = **₹2.43cr** to OCI this year (python-verifiable: 1436.5 − 1412.2 = 24.3m). 4. TRANSACTION translation: the monetary payable re-measures at the closing rate — 1m × (84.5 − 83.0) = **₹15L FX LOSS through P&L** (IA8 doctrine: monetary items at close, P&L-lived), the payable swelling from ₹8.3cr to ₹8.45cr. 5. Full disposal → **ALL accumulated CTA on that operation recycles to P&L** within the disposal gain/loss ceremony (₹1.25cr + ₹2.43cr + every prior year's bay, owners' share); NCI's share of CTA was never inside the bay's owners' portion.

## 💪 Exercises

1. Why does transaction translation hit P&L while operation translation parks? One paragraph on the two measurement aims.
2. At ₹86 close the next year, CTA for the same US wing comes out NEGATIVE. Write the one-line intuition.
3. Design the net-investment hedge in one sentence for the ₹143.65cr exposure.
4. Meridian sells 25% of the US wing but keeps control. Fate of the CTA?

### ✅ Selected answers

1. Transaction translation re-measures a live monetary claim in YOUR OWN currency — your rupees genuinely at risk, hence P&L; operation translation merely PRESENTS an already-true set of foreign books in a new denomination — no wealth crosses, so the residue parks in OCI until the day the membership ends (then recycling makes the lifetime result visible).
2. Intuition: the CTA flips sign whenever the rupee STRENGTHENS against the dollar between valuation dates — closing-rate net assets then undershoot the naive-close walk, and the difference uploads as a NEGATIVE movement inside the OCI bay. The bay fills in both directions; its sign tracks the anchor-versus-closing drift, never the child's health.
3. Draw a $-funding instrument whose value moves OPPOSITE to the net-asset translation exposure (a dollar borrowing of matching size) and designate it as a hedge of the net investment — its FX changes park in the same CTA bay, cancelling the exposure until disposal.
4. No recycling — the CTA slice attributable gets re-attributed pro-rata between owners and NCI inside equity (the family-trade door, CS5's plateau logic in currencies); recycling fires only when control dies, not when slices move within it.

## ❓ Quiz

**Q1.** Foreign-operation translation protocol:
(a) everything at average rate
(b) assets & liabilities at CLOSING rate, income & expenses at transaction/average rates, equity items at historical when formed — the residual difference between these two-rate walks is not profit or loss anywhere; it parks in OCI inside the CTA bay, silently, for as long as the child remains family
(c) everything at closing rate
(d) old rates throughout

**Q2.** The ₹1.25cr CTA canon (12×82 + 1×82.5 vs 13×83):
(a) CTA ₹0 — rates don't matter
(b) naive close ₹1,066.5m against closing-rate ₹1,079m → CTA ₹12.5m = ₹1.25cr to OCI — the measurement-residue of translating one honest dollar ledger into rupees at two different dates' rates; NCI claims its attribution slice too, just like profit
(c) CTA ₹95m
(d) P&L loss ₹12.5m

**Q3.** Selling the US child outright (control lost):
(a) CTA stays in OCI forever
(b) the entire accumulated CTA for THAT operation recycles into P&L inside the ceremony gain/loss — the bay empties its lifetime residue in one day (CS8's step-three payday), while partial family sales that keep control merely re-attribute slices to NCI without any recycle at all
(c) CTA shifts to NCI fully
(d) recycle only 60%

### ✅ Answers

1. **(b)** — two rates by design, the residue parked: CTA in OCI until the family tie breaks.
2. **(b)** — ₹1.25cr: the plug between the naive walk and the closing-rate truth.
3. **(b)** — disposal recycles the whole bay; family slices re-attribute, nothing recycles.

## ✅ Mastery checklist

- [ ] I can fix functional currency with a memo-grade argument
- [ ] I can run the two-rate translation protocol by hand
- [ ] I can compute CTA (the ₹1.25cr and ₹2.43cr shapes) blindfolded
- [ ] I never cross the two machines: transactions → P&L, operations → OCI
- [ ] I can recycle on disposal and re-attribute on family slides
- [ ] I can design a net-investment hedge in one line

---

**Next:** **CS11 · Group Cash Flows & the Analyst's Read** — the consolidated cash-flow engine (associates' dividends in investing, minority flows in financing, the working-capital blanket that hides sub-level stress), the ratio lenses that goodwill distorts, material-NCI disclosures, and the five-minute group-note drill that ends the course's reading syllabus.
