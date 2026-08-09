# 🎯 IA8 · The Effects of Foreign Exchange — Ind AS 21's Translation Physics

> A company that buys in euros, sells in dollars, and reports in rupees lives in three currencies at once — and Ind AS 21 is the physics of how those currencies collide inside the statements. The whole standard hangs on two decisions: what currency do you actually LIVE in (functional) and which items move with the closing rate (monetary) versus freeze at history (non-monetary). Get those right and FCTR, OCI, and hyperinflation all fall into place.

---

## 🎯 Objectives

- Define and determine functional currency, and distinguish it from presentation currency
- Translate foreign-currency transactions: initial recognition, and the monetary/non-monetary split at the reporting date
- Route exchange differences correctly: P&L by default, OCI only where the standard says so
- Translate a foreign operation into the parent's presentation currency and place FCTR in the right OCI bucket
- Sketch IAS 29 hyperinflation restatement at a working level

## 📘 Concepts

### 8.1 Functional vs presentation currency

**Functional currency** = the currency of the primary economic environment in which the entity operates — the one that mainly drives its sales prices, input costs, and financing. Determination is judgment: primary indicators (the currency that influences selling prices; the currency of the country whose competitive forces and regulations determine prices; the currency that mainly influences labor and material costs), then secondary (financing currency, currency of retained receipts). A captive IT-services unit billing its US parent in dollars is functionally **USD-first** even though it sits in Noida. **Presentation currency** = the currency the statements are printed in — a free, cosmetic choice on top of functional reality (presentation can differ from functional; most Indian companies present in INR regardless).

### 8.2 Transactions — record, then sort by monetary-ness

Initial recognition: every foreign-currency transaction converts at the **spot rate on the transaction date** (average rates for a period are acceptable if they don't swing wildly). At each subsequent reporting date, the standard's great fork:

| Item | Rate at reporting date | Difference goes to |
|---|---|---|
| **Monetary** (cash, receivables, payables, loans — units of currency to be received/paid) | **Closing rate** | **P&L** (exchange difference) |
| **Non-monetary at cost** (PPE, inventory, intangibles, prepayments) | **Historical rate — frozen at transaction date** | no retranslation, ever |
| **Non-monetary at fair value** | rate on the FV measurement date | follows the FV gain's destination (P&L or OCI) |

**Canon case (python-verified):** Meridian Machines imports a CNC machine for €100,000 when EUR/INR = 88 → asset recognized at **₹88.0L**, supplier credit €100,000. At year end the rate is 91.5. The **machine stays at ₹88.0L** — non-monetary at cost is frozen history; the euro payable retranslates: 100,000 × (91.5 − 88) = **₹3.5L exchange loss to P&L**, payable carried at ₹91.5L. The asset doesn't care about FX; the promise to pay in FX bleeds with the rate. That asymmetry — frozen assets, living liabilities — is why unhedged import-heavy balance sheets swing with the rupee. Practical hedging note: when a qualifying hedge exists, hedge-accounting rules (not raw spot physics) govern where differences land.

### 8.3 Where differences belong — the routing table

Default: exchange differences on monetary items → **P&L in the period they arise** (both realized and unrealized — marking payables at each reporting date is unrealized-but-booked). Two defined detours: (1) differences on a monetary item that is part of the **net investment in a foreign operation** (long-term intercompany loan that is, in substance, permanent capital) → OCI until disposal; (2) FCTR from translating foreign operations (next section) → OCI. And the famous legacy carve-out: old Indian GAAP's paragraph 46/46A option (capitalize long-term monetary FX differences to asset cost) still survives for companies grandfathered under it — Ind AS-pure companies do NOT have it, so read older annual reports with two rulebooks in hand.

### 8.4 Foreign operations — translating the subsidiary

When a foreign operation's statements marry into the group: **assets and liabilities (including goodwill and FV acquisition adjustments — treated as assets of the operation)** translate at the **closing rate**; **income and expenses** at transaction-date rates (the **average rate** serves in practice); and ALL resulting exchange differences accumulate in OCI as the **FCTR** (foreign currency translation reserve) — Bucket B from IA3. On disposal of the operation, the accumulated FCTR **recycles to P&L** — it's one of the only OCI items with that passport; partial disposals recycle proportionately. Mechanics intuition: the net-investment is a long asset held abroad — its rupee value breathes with FX, and the standard parks that breathing in OCI so quarterly profit isn't hostage to translation of a business you still own.

### 8.5 IAS 29 — hyperinflation restatement

When the functional currency is hyperinflationary (cumulative 3-year inflation around/exceeding 100% is the classic indicator): restate the financials into measuring units current at the reporting date using a **general price index** — non-monetary items, equity, and ALL P&L lines (restated from origination) get indexed; monetary items are already in current units, and their erosion appears as the **net monetary position gain/loss in P&L**. Only then translate into the parent's presentation currency (all at closing rate, no FCTR noise stack). You rarely live this in India, but any group touching Argentina/Turkey-style economies needs the mechanic cold: restate first, translate second.

## 🧪 LAB — The Translation Desk (10 min)

AeroParts Ltd (functional INR, presentation INR) facts for FY 2025-26: (i) exported goods invoiced $400,000 at 83.2; year-end rate 85.6 — 60% collected, 40% outstanding; (ii) imported a machine €100,000 at 88.0 (the canon); payable unpaid, year-end 91.5; (iii) US subsidiary: net assets $5.0M (closing 85.6; opening rate 83.0), full-year profit $0.8M (average rate 84.5); opening FCTR ₹12cr credit; (iv) holds €50,000 cash.

1. Exchange difference on the receivables — where and how much in aggregate?
2. The machine and its payable at year-end: carrying amounts and P&L hit.
3. This year's fresh FCTR to OCI — compute in ₹cr.
4. If the parent sells the entire US sub next year, what happens to the FCTR pile?

**Why this matters:** exporters' receivables, importers' payables, and group FCTR are the three FX questions that come up in every analyst call and every consolidation interview.

**🔑 Lab answers:**
1. Receivable outstanding = $160,000 × (85.6 − 83.2) = **₹3.84L gain → P&L**. (Collected 60% locked its rate at collection dates; only outstanding balances retranslate.)
2. Machine: **₹88.0L — frozen** (non-monetary at cost). Payable: **₹91.5L**; **₹3.5L exchange loss → P&L**.
3. Fresh FCTR for the year = closing-vs-historic spread on the two net-asset layers: opening net assets $4.2M × (85.6 − 83.0) = ₹10.92M, plus this year's profit $0.8M × (85.6 − 84.5) = ₹0.88M → **₹11.8M = ₹1.18cr GAIN credited to OCI** (accumulated FCTR now ₹13.18cr). Cross-check: closing BS 5.0M × 85.6 = ₹42.80cr = opening 4.2M × 83.0 (₹34.86cr) + profit 0.8M × 84.5 (₹6.76cr) + FCTR ₹1.18cr ✓.
4. The ENTIRE accumulated FCTR on that operation (opening ₹12cr plus all increments) **recycles from OCI to P&L** on disposal — Bucket B's passport stamped.

## 💪 Exercises

1. A captive KPO bills its US parent $20/hr, pays costs in INR. Functional currency? Argue both primary indicators.
2. Why does the standard freeze the machine but beat the payable, philosophically?
3. Your CFO wants year-end unpaid export receivables left at invoice rates "because realized gains matter more." Educate in three lines.
4. Group sells 60% of its foreign subsidiary. What happens to 60% of the FCTR?
5. Sequence the IAS 29 workflow for a Turkish sub in five steps.

### ✅ Selected answers

1. Sales-price indicator → USD (billings, pricing power, market in USD); cost indicator → INR (labor, rent). When primary indicators conflict, judgment weights the financing/retention signals — USD-favoring here (cash receipts in USD, parent-set billing). Conclusion: functional **USD**, presentation INR (allowed).
2. The machine embodies economic capacity already purchased — its service potential doesn't change because a currency moved; restating it would inject FX noise into asset value. The payable is a promise denominated in a foreign unit — its true settlement amount DOES move. Monetary promises live at closing rates; owned capacity stays at its history. Frozen assets, living liabilities.
3. Unrealized exchange differences on monetary items are booked through P&L each reporting date — that is not conservatism, it is measurement: the rupee you will actually receive changed. Invoice-rate parking overstates assets whenever the rupee moved in your favor's opposite direction.
4. 60% of that operation's accumulated FCTR reclassifies from OCI to P&L proportionately with the partial disposal; the remaining 40% stays in OCI until further disposal — attribution follows ownership percentages with NCI carrying its slice.
5. (1) Identify hyperinflation via indicators (~100% cumulative 3-year inflation); (2) restate non-monetary BS items, equity, and every P&L line by the general price index from origination; (3) compute the net monetary position gain/loss into P&L; (4) express everything in year-end current units; (5) translate the restated statements to the group's presentation currency at closing rate.

## ❓ Quiz

**Q1.** The euro-payable on Meridian's machine at year-end (100,000 booked at 88, year-end 91.5) produces:
(a) a ₹3.5L increase in the machine's cost
(b) a ₹3.5L exchange LOSS in P&L and a payable of ₹91.5L — monetary items retranslate to closing rate; the machine, non-monetary at cost, is frozen at ₹88.0L
(c) no entry until paid
(d) a ₹3.5L OCI hit

**Q2.** Translating a US subsidiary for consolidation:
(a) everything at average rate
(b) assets/liabilities at closing rate and income/expenses at average, with ALL resulting differences to OCI as FCTR — recycled to P&L on disposal
(c) everything at closing, differences to P&L
(d) non-monetary at history, monetary at closing

**Q3.** Restating under hyperinflation (IAS 29), the gain/loss on the net monetary position lands:
(a) in OCI with FCTR
(b) in P&L — restatement by general price index first, translation to group currency after
(c) in equity directly
(d) never — hyperinflation kills profit

### ✅ Answers

1. **(b)** — frozen assets, living liabilities: the asymmetry that moves import-heavy P&Ls.
2. **(b)** — closing for the BS, average for the flows, OCI for the difference, recycling on exit.
3. **(b)** — monetary erosion is a P&L fact; index first, then translate at closing.

## ✅ Mastery checklist

- [ ] I can argue a functional-currency conclusion with primary and secondary indicators
- [ ] I can run the monetary/non-monetary fork on any transaction and route the difference
- [ ] I can compute receivable/payable exchange differences to the rupee
- [ ] I can build FCTR for a foreign operation and state its disposal treatment
- [ ] I can sequence the hyperinflation workflow without mixing it with FCTR

**Next:** IA9 prices people — Ind AS 19 defined-benefit math (projected unit credit, the OCI-only remeasurement law) and Ind AS 102 share-based payments: grant-date fair value for equity, remeasure-forever for cash.
