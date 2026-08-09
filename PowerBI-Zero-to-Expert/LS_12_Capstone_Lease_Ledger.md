# 🎯 LS12 · CAPSTONE: The Lease Ledger — Six Files, One Closing Day, Everything You Know

> It's 31-March closing day at UrbanNest Stores Ltd, and six contract files just landed on your desk. One belongs on the balance sheet twice. Two are legally "leases" that must never touch it. One isn't a lease at all. One is a sale that keeps its building-and-most-of-its-gain. One is a renegotiation begging for a P&L gain. Every module of this course — the gate, the split, the five buckets, the table, the doors, the SLB machinery, the sublease dollhouse, the ratio cascade — runs tonight, on the clock. Close the ledger, write the memo, then enter the Forge.

---

## 🎯 Objectives

- Classify and measure six mixed contract files end-to-end without a rulebook
- Conduct the canon conductor table — every number of this course in one grid
- Produce the closing-day EBITDA bridge and a covenant memo a CFO will sign
- Survive the Interview Forge: ten questions, model answers, no hesitations

## 📘 Concepts

### 12.1 The six files

**File 1 — Flagship head office, Mumbai.**
5-year lease, ₹10L/yr in arrears, IBR 9%, no options, no RVG. Broker commission ₹1.00L paid; landlord gave a ₹0.50L move-in incentive; make-good (restoration) estimate ₹4.00L payable at end-Y5, discounted at 9%.

**File 2 — Laptop fleet.**
120 laptops (₹45,000 each, new), 3-year contract, ₹18L/yr total. UrbanNest does NOT sublease them to anyone.

**File 3 — Festive pop-up cellar.**
Serviced basement storage, 11 months, ₹3L/month, renewal strictly at then-market rates; UrbanNest has never renewed a short unit in six years.

**File 4 — "FlexCloud" hosting.**
Contract guarantees "the equivalent of 50 server-units of compute, located wherever across the supplier's five interchangeable data centres we find optimal". ₹1.5cr/yr.

**File 5 — Warehouse sale-and-leaseback, Pune.**
UrbanNest sells its owned warehouse (fair value ₹100cr, carrying ₹70cr) to an investor for ₹100cr (cleanly at market) and leases it back; PV of leaseback payments ₹35cr. Ind AS 115 control passes.

**File 6 — Floor surrender, Bengaluru office.**
End of Year 2 of a 5-floor, 5-year, ₹10L/yr, 9% lease (LS4 universe: carrying liability ₹25.31L, ROU ₹23.34L). Landlord accepts surrender of 2 floors (40%), remaining 3 floors continue at ₹6L/yr for 3 years; revised IBR 10%.

### 12.2 The canon conductor table — full files, ruled lines

Work every file down the same assembly line: **gate → splits & exemptions → measure → subsequent.** All numbers python-verified; this is the table to reproduce blind in interviews.

| File | Verdict | Day-one / key measurement | P&L shape |
|---|---|---|---|
| 1 — Head office | LEASE | Liability 10 × 3.8897 = **₹38.90L**; ROU = 38.90 + 1.00 + 2.60 − 0.50 = **₹42.00L** | Year-1 charge: dep ₹8.40L (42.00/5) + interest ₹3.50L = **₹11.90L**; EBITDA +₹10L vs old rent |
| 2 — Laptops | Lease but **low-value EXEMPT** (₹45k/asset, new) | Nothing capitalized | **₹18L/yr expensed**, straight |
| 3 — Pop-up cellar | Lease but **short-term EXEMPT** (≤12m; renewal not reasonably certain) | Nothing capitalized | **₹33L total expensed** (3 × 11) as incurred |
| 4 — FlexCloud | **NOT a lease** — no identified asset (substantive substitution) | Nothing capitalized | **₹1.5cr/yr expensed** as service |
| 5 — SLB | True sale + leaseback | ROU = 70 × 35% = **₹24.5cr**; lease liability ₹35cr; derecognize ₹45.5cr of warehouse | **Gain ₹19.5cr** today (₹30cr × 65% rights transferred); ₹10.5cr hidden gain exits via dep |
| 6 — Floor surrender | Modification — **Door 2**, scope decrease | Derecognize 40%: liab −₹10.13L, ROU −₹9.34L; remeasure kept floors ₹6L/yr @10% 3y = **₹14.92L** | **Gain +₹0.79L** today; ROU adj −₹0.27L → final ROU **₹13.74L**, dep ₹4.58L/yr |

Sanity footings: File 1's lifetime interest foots ₹11.10L (bridge: ₹50L gross − ₹38.90L). File 6's step-2 remeasurement is a ₹0.27L liability-DOWN adjustment (Dr liability / Cr ROU), taking the post-derecognition liability ₹15.19L → ₹14.92L. Files 2–4 together expense ₹201L this year with ZERO balance-sheet footprint — exemptions and services are where EBITDA-shaped companies still live.

### 12.3 The closing-day EBITDA bridge

Old-world view (everything expensed): rent/hosting outflows inside operating expenses ≈ File 1 ₹10L + File 2 ₹18L + File 3 ₹33L + File 4 ₹150L = **₹211L**.

New-world (Ind AS 116) P&L, Year 1:

| Line | Amount | Lane |
|---|---|---|
| Service/exempt expenses (Files 2+3+4) | ₹201.00L | inside EBITDA (unchanged) |
| File 1 depreciation | ₹8.40L | below EBITDA |
| File 1 interest | ₹3.50L | below EBIT |
| File 6 modification gain | +₹0.79L | other income (one-off) |
| File 5 SLB gain | +₹19.50cr | disclosed prominently |

**EBITDA change vs old world: +₹10L** (only File 1's rent leaves operating expenses — Files 2–4 were never rent under 116 anyway). **PBT change (File 1): −₹1.90L** (₹11.90L charge vs old ₹10L rent — the commission/restoration dressing makes this file slightly heavier than the naked ₹1.28L canon). Then the one-offs (+₹0.79L; +₹19.50cr) sit ABOVE whatever the covenants count — read your facility's definition of "gains" before you celebrate (LS10 discipline).

### 12.4 The covenant memo (the deliverable)

> **To: CFO, UrbanNest Stores Ltd · From: Group Reporting · Re: Ind AS 116 adoption effects — facility compliance**
>
> 1. Adoption adds **₹42.00L ROU / ₹38.90L lease liability** (File 1) at transition; no cash effect.
> 2. Year-1 ratio mechanics per ₹10L-rent store: EBITDA +₹10L; Debt/EBITDA 1.67x → **2.22x**; interest cover 8.00x → **4.97x** (LS10 cascade, per-store numbers scale linearly).
> 3. Files 2–4 expense ₹201L/yr with no balance-sheet effect; our exemption elections (laptops, pop-up) are documented by class and the short-term commitment note carries the pop-up profile.
> 4. Recommend the **frozen-GAAP covenant clause** (FY19 Ind AS 17 basis) at the next facility amendment; alternately a 116-carve-out with dual-basis reporting. Neither changes reported numbers; both prevent re-badge mechanics from consuming headroom the bank never agreed to donate.
> 5. The warehouse SLB recognizes **₹19.5cr gain** (rights transferred only); if facility EBITDA captures "gains on asset sales", flag before reporting — ₹10.5cr of the economic gain is structurally locked in the ROU and never reaches any P&L line.

### 12.5 The financial-statement tour

Balance sheet: ROU ₹42.00L (File 1) + ₹13.74L (File 6, post-mod) + ₹24.5cr (File 5) under non-current assets; lease liabilities split current/non-current (File 1 current slice = next-12-month principal ≈ 10 − 3.50 = ₹6.50L). P&L: the 12.3 bridge. Cash flow: principal repayments in financing; interest per policy; exempt/variable outflows stay operating. Notes: dep-by-class, interest, three exemption lanes, sublease income (nil), ROU additions, SLB gain, maturity bridge (₹50L − ₹11.10L → ₹38.90L for File 1), pop-up's short-term commitments, and the RVG/options narrative (nil — say so).

## 🧪 LAB — Close the Ledger Yourself (10 min)

Cover 12.2–12.3 and answer from the files alone:

1. File 1: liability, ROU, Year-1 charge, lifetime interest.
2. Files 2 & 3: which exemption, which anti-abuse catch would kill each if the facts shifted, and Year-1 expense.
3. File 4: why does "the servers exist somewhere" NOT save the lease analysis?
4. File 5: the journal (cash, ROU, warehouse, liability, gain).
5. File 6: the gain, the final liability, final ROU, go-forward depreciation — and which door of the modification taxonomy you walked through.

**Why this matters:** this is the actual close: six envelopes, one assembly line, and a memo the CFO signs. Everything else in this course was rehearsal.

**🔑 Lab answers:**
1. **₹38.90L; ₹42.00L; ₹11.90L; ₹11.10L.**
2. File 2 low-value (killed by subleasing the fleet or by interdependence with a bigger system); File 3 short-term (killed by a reasonably-certain renewal tail pushing term >12m). Expenses ₹18L/yr and ₹3L/month.
3. Identification needs PHYSICAL DISTINCTNESS + no substantive substitution: interchangeable servers across five centres, supplier-directed placement = no identified asset → all service, ₹1.5cr/yr expensed.
4. Dr Cash ₹100cr · Dr ROU ₹24.5cr · Cr Warehouse ₹70cr · Cr Lease liability ₹35cr · Cr Gain ₹19.5cr.
5. Gain **+₹0.79L** (derecognize 10.13 vs 9.34); liability **₹14.92L** (6 × 2.4869 @10%); ROU **₹13.74L** (23.34 − 9.34 − 0.27); dep **₹4.58L/yr**; **Door 2** (scope decrease) with the step-2 revised-rate remeasurement.

## 💪 Exercises

1. File 2's laptops get subleased to a franchisee next year. What dies tonight, and what must be on next year's balance sheet?
2. A landlord offers File 3's cellar as "11 months, auto-renewing unless 30 days' notice, market rate". Re-open the file's verdict.
3. Rebuild File 5 with a ₹110cr sticker (PV of contractual payments ₹45cr): financial liability, lease liability, ROU, gain.
4. File 6's landlord ALSO extends the 3 kept floors by a year in the same signature. Which computation absorbs the extension, and does tonight's gain change?
5. Draft the treasury line for the facility agent explaining tonight's Debt/EBITDA move — using only File 1 numbers.

### ✅ Selected answers

1. The **low-value exemption dies** — its anti-abuse catch bars the exemption for assets subleased onward. Next year: the fleet comes ON balance sheet (liability = PV of remaining rentals at the then-current IBR, matching ROU), and the franchisee-facing sublease runs through LS9's ROU-reference classification. The exemption was a privilege of not-intermediating.
2. Auto-renewal-unless-notice changes everything: the term now includes renewal periods UrbanNest is reasonably certain to sit through — and an indefinite rolling arrangement is NOT ≤12 months. Short-term exemption collapses → capitalize: liability = PV of the expected rental horizon (with a documented term judgment), ROU to match. The paper's 11-month label no longer shields the economics.
3. Reset to FV first: the ₹10cr above-fair slice is **additional financing** → financial liability ₹10cr; of the ₹45cr payment-PV, ₹10cr rides financing, **₹35cr rides the lease**; ROU stays **₹24.5cr**; recognized gain stays **₹19.5cr** (priced off ₹100cr, always) — the sticker bought debt, not profit.
4. The extension is absorbed by step 2's remeasurement: kept-scope flows now run ₹6L/yr × 4 years at the same revised-event 10% → 6 × annuity(10%,4) = 6 × 3.1699 = ₹19.02L liability, ROU adjusts to match (post-derecognition ₹15.19L → ₹19.02L: Dr ROU ₹3.83L). Tonight's **gain is unchanged at ₹0.79L** — scope-decrease P&L was settled at step 1; term changes for the KEPT slice never re-open it.
5. *"Debt/EBITDA moves 1.67x → 2.22x per ₹10L-rent store on adoption: the ₹38.90L lease liability joins debt while rent's exit adds ₹10L to EBITDA — pure Ind AS 116 re-badge mechanics, zero cash, zero operating change — we'd propose a frozen-GAAP covenant clause so the ratio you priced stays the ratio we report."*

## ❓ Quiz

**Q1.** Across the six files, tonight's balance sheet gains (roughly):
(a) nothing — leases are all expensed now
(b) ROU ₹42.00L + ₹13.74L + ₹24.5cr and liabilities ₹38.90L + ₹14.92L + ₹35cr, while Files 2–4 (₹201L/yr) stay entirely off balance sheet — exemptions and the service verdict are where the light books live
(c) ₹211L of liabilities for every envelope
(d) ₹35cr less liability after the SLB

**Q2.** File 1's Year-1 effect on reported results is:
(a) EBITDA flat, PAT flat
(b) EBITDA +₹10L (rent leaves operating lines) and PBT −₹1.90L (dep ₹8.40L + interest ₹3.50L = ₹11.90L against the old ₹10L rent) — the dressed ROU makes this file heavier than the naked canon, which is why the bridge runs File by File
(c) EBITDA +₹11.90L, PAT +₹1.90L
(d) EBITDA −₹10L because interest rose

**Q3.** UrbanNest's Year-1 one-off gains from Files 5 and 6 are:
(a) ₹19.5cr and ₹0.79L, both booked without machinery
(b) ₹19.5cr (SLB: ₹30cr × 65% rights transferred — the other ₹10.5cr locked inside the ₹24.5cr ROU) and ₹0.79L (Door-2 partial derecognition: forgiven liability ₹10.13L vs surrendered ROU ₹9.34L) — every rupee traceable to a proportion-of-rights or schedules-race computation
(c) ₹30cr and ₹1.56L
(d) zero — 116 bans gains on lease events

### ✅ Answers

1. **(b)** — six files, three destinations: full capitalization, exempt expense, service expense.
2. **(b)** — re-badge lifts EBITDA; dressed-ROU depreciation plus interest nicks PBT.
3. **(b)** — both gains are computed, constrained and traceable; the standard prints the working.

## 🎤 The Interview Forge — ten questions, model answers

1. **"Why do we capitalize rent now?"** Because a lease hands you control of an asset for its term — that right is an asset, the payment promise is debt, and paper language ("rent") no longer decides where they live. Ind AS 116 (1-Apr-2019) put both on the face: AirSutra's ₹240cr footnote became ₹166.0cr × 2 on the balance sheet.
2. **"Identify the lease: '50 server-units of compute anywhere in our five data centres'."** No identified asset — substitution is substantive (ability across centres + economic benefit) and no physically distinct portion. Service, expensed as incurred. Flip it with a dedicated cage and no relocation clause.
3. **"₹10L/yr, 5 years, 9% — liability?"** ₹38.90L (annuity factor 3.8897). Add ₹1L commission, ₹2.60L restoration PV, minus ₹0.50L incentive: ROU ₹42.00L. Year 1: dep ₹8.40L + interest ₹3.50L; lifetime interest foots ₹11.10L against ₹50L gross.
4. **"Inflation resets the rent upward mid-term — walk me through it."** Index-door: remeasure at the UNCHANGED rate (amount moved, shape didn't): ₹10.6L × 2.5313 = ₹26.83L vs ₹25.31L carrying → +₹1.52L to liability and ROU, no day-one P&L.
5. **"The landlord renegotiates — same space, higher rent. What hits P&L today?"** Nothing. Door 3: remeasure at the REVISED rate, ROU swallows the delta (+₹7.02L on the canon), and it bleeds in through depreciation + interest over the remaining term.
6. **"We surrendered 40% of our floors. Gain or loss?"** Compute, don't guess: derecognize 40% of each artifact — liability ₹10.13L vs ROU ₹9.34L → gain ₹0.79L, because interest had kept the young liability fatter than the SL-depreciating ROU. Then remeasure the kept scope at the revised rate.
7. **"Sale-and-leaseback — can we book the full ₹30cr?"** Never. Gate 1: prove Ind AS 115 control passed. Gate 2: gain ONLY on rights transferred — 65% here → ₹19.5cr; the retained 35% hides ₹10.5cr inside the ₹24.5cr ROU. Price above FV? The excess is a loan, not gain.
8. **"We sublet the whole office below our own rent. Entries?"** ROU-reference test says finance sublease: kill the ROU ₹31.12L, book net investment ₹29.16L, eat ₹1.96L today; head liability ₹32.40L stays. Then watch the negative carry: income ₹2.62L vs expense ₹2.92L a year — the P&L reporting your strategy annually.
9. **"Covenant headroom post-116?"** Per ₹10L-rent store: Debt/EBITDA 1.67x → 2.22x, cover 8.00x → 4.97x, EBITDA +₹10L. Negotiate frozen-GAAP or 116-carve-out clauses; never let a standards change donate or confiscate headroom.
10. **"What survived from the old world?"** Lessors (finance/operating doors intact), short-term ≤12m and low-value ≈US$5k exemptions elected and disclosed, and sales-linked variable rent still expensed as incurred (mall canon: ₹31.12L capitalized, ₹12L expensed).

## ✅ Mastery checklist

- [ ] I closed all six files down the assembly line: gate → exemptions/splits → measure → subsequent
- [ ] I can conduct the canon conductor table from memory (38.90 / 42.00 / 18L / 33L / 150L / 24.5cr / 19.5cr / 0.79L / 14.92L / 13.74L)
- [ ] I survived the forge with numbers attached to every claim
- [ ] I can bridge EBITDA (+₹10L) and PBT (−₹1.90L) from File 1 alone
- [ ] I can write a covenant memo a CFO would sign

---

🏆 **COURSE COMPLETE — Leases (Ind AS 116)!** The other balance-sheet revolution is yours: the identified-asset gate and its substitution traps, the lease-vs-service splits priced at ₹21.43L/₹8.57L, the five-bucket liability and the dressed ₹42.00L ROU, the accretion table and its ₹11.28L front-load, all three remeasurement doors with their rate logic, the three modification doors with today's ₹0.79L gain, sale-and-leaseback proportion-of-rights (₹24.5cr / ₹19.5cr), the lessor's surviving two doors (₹84.29L at 9.00%, ₹9.5L smoothed), the sublease dollhouse and its ₹1.96L warning, and the full disclosure-ratio-covenant cascade (4.97x, 2.22x). **Next course: 🧾 Inventory & COGS Accounting (Ind AS 2) — v51** — where the balance sheet's other great judgment box lives: cost formulas, NRV haircuts, overhead absorption, and why profit evaporates inside warehouses.
