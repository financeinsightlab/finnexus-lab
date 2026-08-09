# 🎯 LS10 · Disclosures, Ratios & the Covenant Shock — What the New Numbers Did to Old Agreements

> Ind AS 116 didn't just move numbers — it re-rates a company's entire ratio machinery: EBITDA inflates, interest cover thins, leverage swells, and every loan agreement written pre-2019 quietly breaks. The disclosure suite is where the standard shows its working: undiscounted cash bridges, expense splits by exemption lane, cash-outflow totals. This module reads those disclosures the way a lender, an analyst, and a forensic accountant each read them — and prices the covenant clauses India renegotiated through 2019–20.

---

## 🎯 Objectives

- Read the lessee disclosure inventory: expense lanes, cash outflows, ROU movements, short-term commitments
- Build the maturity-analysis bridge: ₹50L undiscounted → ₹38.90L liability, with ₹11.10L imputed
- Run the full ratio cascade on one store: EBITDA, EBIT, ICR (8.0x → 4.97x), Debt/EBITDA (1.67x → 2.22x)
- Explain the covenant counter-measures: frozen GAAP, Ind AS 116 carve-outs, EBITDA redefinitions
- Reconstruct analyst adjustments (EBITDAR, adjusted leverage) and when they now over/under-state

## 📘 Concepts

### 10.1 The disclosure inventory — showing the working

Ind AS 116 makes lessees tabulate, in the notes, the anatomy of what LS1–LS9 built:

- **Depreciation** charge for ROU assets, **by class** of underlying asset (offices ≠ aircraft ≠ vehicles — different risk, different disclosure line).
- **Interest expense** on lease liabilities.
- Expense lanes: **short-term lease expense**, **low-value lease expense** (excluding short-term low-value), **variable lease payments not in the liability**, **income from subleasing** ROU assets.
- **Total cash outflow** for leases (principal + interest + exempt/variable streams) — the reconciliation anchor.
- **Additions to ROU assets** during the period (new leases, mods, reassessments).
- Gains/losses from **sale-and-leaseback**.
- The carrying amount of ROU by class and, critically, a **maturity analysis of lease liabilities** (undiscounted, per Ind AS 107's liquidity discipline).
- Future cash commitments to which the lessee is potentially exposed: variable-payment structures, extension/termination options not in the term, RVGs, and **leases not yet commenced** but committed.
- For short-term leases expensed under the exemption: if the portfolio at year-end differs in character from the expensed profile — the **commitment** for those short-term leases is disclosed (stops the "everything is 11-month now" pantomime).

### 10.2 The maturity bridge — undiscounted to discounted

The maturity analysis tabulates UNDISCOUNTED cash by bucket; the balance sheet carries the DISCOUNTED liability; the note bridges them explicitly. UrbanNest's single store (5 × ₹10L):

| Maturity bucket | Undiscounted cash |
|---|---|
| < 1 year | ₹10.00L |
| 1–5 years | ₹40.00L |
| **Total contractual** | **₹50.00L** |
| Less: imputed (unaccrued) interest | **−₹11.10L** |
| **Carrying lease liability** | **₹38.90L** |

Every line python-verified against LS5's schedule (its total interest, ₹11.10L, foots the bridge exactly). This bridge is the fastest forensic tool in the chapter: a company whose imputed-interest slice is tiny against a huge contractual bucket is running either a very low IBR or a very short horizon — ask why. A fat slice with a stated "9% IBR" and short average terms? The IBR is fiction.

### 10.3 The ratio cascade — one store, four alarms

Re-run the LS5 P&L on UrbanNest's store (rent ₹10L → dep ₹7.78L + interest ₹3.50L) against a mini-company: baseline EBIT ₹40L, pre-existing interest ₹5L, debt ₹50L, EBITDA ₹30L. Post-116, Year 1 (all python-verified):

| Metric | Before 116 | After 116 | Direction |
|---|---|---|---|
| EBITDA | ₹30.00L | ₹40.00L | **+₹10L** (rent re-badge) |
| EBIT | ₹40.00L | ₹42.22L | **+₹2.22L** (10 out, 7.78 dep in) |
| Interest | ₹5.00L | ₹8.50L | +₹3.50L |
| PBT effect | — | **−₹1.28L** | front-loading bites |
| Debt | ₹50.00L | ₹88.90L | +₹38.90L |
| **Interest cover (EBIT/int)** | 40/5 = **8.00x** | 42.22/8.5 = **4.97x** | COVER THINS 38% |
| **Debt/EBITDA** | 50/30 = **1.67x** | 88.9/40 = **2.22x** | LEVERAGE JUMPS 33% |

Nothing about the store changed. The arithmetic re-rated the company. Multiply by 200 stores and an aircraft fleet — that's FY20 India Inc.

### 10.4 The covenant counter-measures

Loan agreements drafted under Ind AS 17 referenced ratios that Ind AS 116 then mechanically breached. Through 2019–20 the market standardized three patches (still worth reading for in any facility letter):

1. **Frozen GAAP** — covenant ratios computed under the accounting policies in force at signing (Ind AS 17 forever, for covenant purposes). The lender keeps the risk profile it priced; the statements evolve as they must.
2. **Carve-outs / "operating lease adjustments"** — covenant definitions explicitly EXCLUDE the effects of Ind AS 116: lease liabilities omitted from "Debt", pre-116 EBITDA treatment, often with an information covenant to report both versions.
3. **EBITDA redefinitions** — "EBITDA, before the effects of IFRS 16/Ind AS 116" (or rental add-backs capped): prevents the re-badge from relaxing debt-to-EBITDA headroom that lenders never agreed to donate.

Unrenegotiated? The cascade hits: cover thins (8.00x → 4.97x), leverage swells (1.67x → 2.22x) — technical defaults from pure accounting restatement, with waiver fees as the invoice. Banks, for their part, cared about a different angle: regulatory capital and exposure math now saw the "real" debt — some lenders privately admitted the new numbers were the honest ones they'd manually approximated for decades.

### 10.5 Analyst adjustments in the new world — and their reversals

Pre-2019: analysts capitalized operating leases themselves (rent × multiplier, or Maturity-discounted disclosures) to reach "adjusted debt" and EBITDAR (EBITDA + rent) for cross-company comparability. Post-116: the face of the balance sheet already carries lease debt — adding rent × 8 AGAIN double-counts. New-era adjustments: use the reported liability (tune only the IBR assumptions you distrust), compare EBITDA ONLY against EBITDA-defined-alike peers (exemption elections differ!), watch the PBT convergence over time (front-loading age-profiles differ), and never compare a 116 company with an IGAAP/AS-19 company on any operating ratio. Retail and aviation screens that sorted by EV/EBITDA in 2018 silently became sort-by-accounting-policy in 2020.

## 🧪 LAB — The Covenant Review Meeting (10 min)

1. Build the maturity bridge for the 5 × ₹10L store (buckets, imputed slice, carrying). Name the forensic use of the bridge.
2. Recompute ICR and Debt/EBITDA for the mini-company (EBIT 40, int 5, debt 50, EBITDA 30) after the store capitalizes. Show every step.
3. A facility letter says "Debt means all borrowings" — silent on leases, drafted 2017, never amended. UrbanNest capitalizes ₹116.7L of stores. Two-line legal-finance reading for the treasurer.
4. UrbanNest's EBITDA rose 33% post-adoption; sales flat. Write the one-sentence analyst note preventing a mis-upgrade.
5. Propose the covenant clause that leaves the bank exactly as protected as it was in 2018.

**Why this matters:** ratio re-rating isn't academic — it moves waivers, pricing grids, board approvals and bonus pools. Being the person in the room who can say "that's Ind AS 116 mechanics, not performance" — with numbers — is a career line.

**🔑 Lab answers:**
1. Buckets: <1y ₹10.00L; 1–5y ₹40.00L; total ₹50.00L − imputed ₹11.10L = **₹38.90L carrying**. Forensic use: cross-check stated IBR × horizon coherence (tiny imputed slice + fat buckets + claimed high IBR = something's off) and tie to LS5's schedule total interest, which must foot the imputed slice exactly (₹11.10L ✓ here).
2. ICR: new EBIT = 40 + 10 − 7.78 = **₹42.22L**; interest 5 + 3.50 = 8.50 → **4.97x** (was 8.00x). Debt/EBITDA: (50 + 38.90)/(30 + 10) = 88.90/40 = **2.22x** (was 1.67x). Both moves are re-badge mechanics: cover thins because lease interest joined the denominator's family; leverage jumps because lease debt joined the numerator while the EBITDA add-back lagged.
3. *"Literally read, lease liabilities are payment obligations but aren't 'borrowings' in the 2017 drafting sense — arguable either way, and banks will argue the ratio intent; safest path: open the waiver conversation NOW, offering frozen-GAAP covenant certificates going forward, before a technical breach prices itself."*
4. *"EBITDA +33% with flat sales and unchanged cash conversion = classification effect under Ind AS 116 (rent → dep+interest below the line); on EBIT, PAT and FCF the company is flat-to-slightly-worse (front-loaded interest). No upgrade — re-anchor multiples to EBIT/EV or FCF."*
5. **Frozen GAAP clause**: "Financial covenants shall be calculated in accordance with the accounting principles applied in the Borrower's audited FY19 statements" — lender keeps the exact risk profile it priced; borrower keeps statement flexibility. (Alternative accepted flavor: covenant-definition carve-out excluding Ind AS 116 effects, with dual-basis reporting.)

## 💪 Exercises

1. Why does Ind AS 116 demand the SHORT-TERM commitment disclosure — what pantomime is it shutting down?
2. Two peers: A elects short-term/low-value exemptions aggressively; B capitalizes everything. Which IDEAS (comparability ideas) die first, and what do you adjust before screening?
3. Explain why banks' credit teams secretly liked 116's liabilities even as their covenant desks scrambled.
4. A company's imputed-interest bridge slice is ₹0.4L against ₹40L of contractual cash with a claimed 9.5% IBR. Two hypotheses, one test for each.
5. Why does the PBT front-loading penalty fade in steady state and what does that do to long-run EPS trends post-adoption?

### ✅ Selected answers

1. The pantomime: chopping every multi-year arrangement into rolling 11-month contracts (or interposed shell lessors) to live inside the exemption and keep the balance sheet hairless. The disclosure forces the company to publish commitments on the short-term portfolio when its year-end character differs from the expensed profile — readers can size the hockey-stick risk that "short-term" leases renew into forever.
2. EBITDA and balance-sheet ratios die first: exemption lane usage shifts expense between rent (in EBITDA) and dep+interest (below it), and shifts debt optics too. Before screening: read each peer's exemption expense lanes and short-term commitments, then re-anchor on EBIT (which absorbs both treatments) and on PAT/FCF for valuation conclusions.
3. Credit teams approximate true leverage manually — they'd capitalized rent × 7–8 for decades and discounted the published balance sheet anyway; 116 delivered their estimate, audited, on the face of it, with a maturity bridge attached. The covenant scramble was a documentation cost, not a risk-discovery cost — most lenders were, privately, reading the honest numbers for the first time.
4. Hypothesis 1: the leases are ultra-short-horizon (mostly <1-year buckets) — test: read the maturity analysis; if most cash sits <1y, slim imputed interest is genuine. Hypothesis 2: the IBR claim is inflated vs the actual discount used — test: implied rate ≈ solve the bridge (contractual vs carrying × tenor); a solved ~0.5% with claimed 9.5% means the claim is fiction or buckets are mis-stated. The bridge exists precisely to power this audit.
5. Front-loading is accretion-decay per lease; a steady-state portfolio mixes old cheap years with new heavy ones, averaging the penalty to ~zero; growth re-tilts it up. Long-run: adoption-year EPS dips, subsequent years' EPS tailwind as the cohort matures — an analyst who models EPS mechanics from the lease note (cohort ages, additions) can see EPS "growth" that is pure amortization calendar.

## ❓ Quiz

**Q1.** The maturity-analysis bridge for 5 × ₹10L runs:
(a) ₹38.90L undiscounted reconciling to ₹50.00L on the balance sheet
(b) ₹50.00L undiscounted (<1y: ₹10L; 1–5y: ₹40L) − ₹11.10L imputed unaccrued interest = ₹38.90L carrying liability — the imputed slice foots exactly to the accretion schedule's lifetime interest
(c) ₹50.00L on the balance sheet, ₹38.90L in notes
(d) ₹11.10L contractual cash with ₹38.90L interest

**Q2.** Post-adoption, mini-company (EBIT 40, int 5, debt 50, EBITDA 30, one 10-rent store capitalized) shows:
(a) ICR 8.00x flat, Debt/EBITDA 1.67x flat
(b) ICR 4.97x (42.22/8.50) and Debt/EBITDA 2.22x (88.90/40) — interest cover thins 38% and leverage jumps 33% purely from re-badge mechanics: rent became dep+interest and lease debt joined the balance sheet
(c) ICR improves to 9.2x
(d) Debt/EBITDA improves to 1.25x because EBITDA rose

**Q3.** The clause that leaves a pre-2019 lender exactly as protected as priced is:
(a) a higher-margin grid clause
(b) a frozen-GAAP covenant clause — ratios computed under FY19 (Ind AS 17) policies going forward (or an equivalent Ind AS 116 carve-out with dual-basis reporting), so a standards change can't quietly donate or confiscate headroom
(c) an MAC clause citing Ind AS 116
(d) a waiver-fee escalator

### ✅ Answers

1. **(b)** — undiscounted buckets minus imputed interest equals the carrying liability; the slice must tie to the schedule's total interest.
2. **(b)** — both ratios re-rate mechanically; performance is unchanged, the arithmetic moved.
3. **(b)** — frozen GAAP (or the symmetric carve-out) keeps the risk model the bank actually priced.

## ✅ Mastery checklist

- [ ] I can recite the disclosure inventory (lanes, outflows, additions, SLB, commitments)
- [ ] I can build the ₹50L → −₹11.10L → ₹38.90L bridge and tie it to the schedule
- [ ] I can run the ratio cascade: ICR 8.00x→4.97x, Debt/EBITDA 1.67x→2.22x
- [ ] I can draft the frozen-GAAP / carve-out clause that neutralizes adoption
- [ ] I can update an analyst screen for the post-116 world (EBIT anchor, no double count)

**Next:** LS11 tours the battlefields — aviation's SLB fleets and redelivery provisions, malls running on turnover rent (fixed ₹8L capitalized, 3%-of-sales expensed), logistics' long horizons and indexation doors, offices inside REIT envelopes, and tower-fiber identification traps in telecom.
