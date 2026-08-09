# 🎯 LS9 · Subleases & Sweeteners — Russian Dolls, Negative Carry, and the COVID Escape Hatch

> Lease your office, then lease one floor onward to a startup: congratulations, you're now BOTH a lessee and a lessor in the same square metres — an intermediate lessor. Ind AS 116's elegant twist: your sublease classification is judged against your **right-of-use asset**, not against the building. Hand over most of the ROU's value and you've effectively sold your ROU for a receivable — sometimes booking a day-one LOSS you never saw coming. Meanwhile the rent-free months, fit-out contributions and pandemic waivers each get their own lane. This module is the dollhouse, top to basement.

---

## 🎯 Objectives

- Apply the intermediate-lessor rule: classify the sublease by reference to the **ROU**, never the underlying asset
- Run the finance-sublease full cycle: derecognize the ROU, book net investment, keep the head liability (**₹1.96L day-one-loss canon**)
- Run the operating sublease: keep the ROU, dep continues, sub-rent straight-lines as income
- Account lease incentives on both sides (lessee: ROU reduction; lessor: income smoothing)
- Deploy the COVID-19 rent-concession practical expedient with its exact India timelines

## 📘 Concepts

### 9.1 The dollhouse — one floor, two roles

When the original lessee (the "intermediate lessor") subleases the asset, the two contracts stay legally and accounting-wise separate files:

- **Head lease** — unchanged: liability keeps accreting at its own rate, ROU keeps depreciating. Nothing about subletting re-opens the head lease.
- **Sublease** — the intermediate lessor runs LESSOR accounting on it, with one twist: **classification is assessed against the ROU asset** (which is all the intermediate lessor actually owns), not against the building/vehicle itself. Does the sublease hand over substantially all the ROU's remaining value? Then finance. Otherwise operating.

Two consequences worth pinning to the wall: (a) a long sublease over most of the remaining term is a finance sublease by construction — even if the head lease (measured against the building's life) would read as "operating-flavored" economically; (b) if the HEAD lease was short-term-exempted, the sublease is automatically operating — there's no ROU on the books to sell.

### 9.2 Finance sublease — selling your ROU for a receivable

Mechanics on the effective date: **derecognize the ROU** handed over, recognize a **net investment in the sublease** (PV of sublease receipts, using the sublease's implicit rate or the head lease's discount rate), and book any difference to P&L immediately. The HEAD LEASE LIABILITY STAYS — your debt to the landlord was never the subtenant's problem. Ongoing: interest income on the net investment, interest expense on the head liability, and the spread is your carry.

**The full canon (python-verified):** UrbanNest's head lease: 5 years, ₹10L/yr, 9% (LS4's file). End of Year 1, it subleases 100% of the space for the remaining 4 years at ₹9L/yr (strategy pivot; soft market). At that date: head liability ₹32.40L (LS5's table), ROU remaining = 38.90 × 4/5 = **₹31.12L**.

| Item | Math | Number |
|---|---|---|
| Sublease PV (4 × ₹9L, 9%) | 9 × 3.2397 | **₹29.16L — finance sublease** (PV ≈ 94% of ROU; term 4 of 4 remaining years) |
| Derecognized ROU | | ₹31.12L |
| Day-one P&L | 29.16 − 31.12 | **LOSS ₹1.96L** |
| Head liability | untouched | ₹32.40L stays on book |
| Year-2 carry | income 29.16 × 9% = ₹2.62L vs head interest 32.40 × 9% = ₹2.92L | **negative carry ≈ −₹0.29L/yr**, bleeding gently |

The lesson ancient treasury teams recite: subletting your ENTIRE space at LOWER rent is not a wash — it's an immediate crystallized loss (the ROU you killed was worth more than the stream you bought), plus a negative interest carry that itemizes your mistake annually on the face of the P&L. The standard reports strategy like an X-ray.

### 9.3 Operating sublease — landlord lite

Sublease short/small relative to the ROU (say 30% of space for 2 years of a 5-year head lease): classification stays operating → the ROU SURVIVES and keeps depreciating, sublease receipts land as income straight-line over the sublease term, and the head lease runs untouched. Watch the margin mechanics: you'll show depreciation expense (head side) against lease income (sub side) — a grossed-up presentation of what economically is one net rental margin, and analysts WILL net it. Also: a sublease is a classic impairment TRIGGER for the head ROU in the vacant remainder — Ind AS 36 reads subletting math as "this asset earns less than we paid for it" (LS5's door-(c) neighborhood).

### 9.4 Incentives — sweeteners on every side

- **Lessor → lessee (head or sub):** incentives RECEIVED reduce the lessee's ROU at commencement (LS4's ₹0.50L slice) and are factored out of the liability's payment stream at inception. For the OPERATING lessor, incentives granted are part of aggregate consideration — smoothed straight-line as a reduction of rental income (LS8's ₹9.5L ritual: the rent-free quarter bent cash, never income). For finance lessors, incentives net inside the net investment.
- **Fit-out contributions and key money:** same physics — identify the payer and the direction, then reduce the payer-side income/consideration stream symmetrically. The party RECEIVING cash prepays its future obligations; the balance sheet, not the P&L, holds the timing.

### 9.5 The COVID-19 expedient — the one true escape hatch

When pandemic lockdowns triggered a global wave of rent renegotiations, the IASB (May 2020) and MCA (notified **24 July 2020**, covering lease payments originally due on/before **30 June 2021**, then extended in 2021 to payments due on/before **30 June 2022**) offered a narrow expedient: an eligible **lessee may elect NOT to assess COVID rent concessions as lease modifications** — instead, account as if they were variable payments: the waived/forgiven amounts drop straight into P&L (typically as negative variable lease expense / other income) when the trigger hits, with the liability relieved correspondingly. No revised discount rate, no ROU surgery.

Eligibility was welded shut with all three: (1) concession is a direct COVID consequence; (2) revised consideration is **substantially the same as or less than** pre-concession consideration; (3) no substantive change to other terms (plus the payment-window condition). Applied per lease, disclosed clearly (amounts recognized, elections made). The window is closed now — but the expedient remains the template: sometimes the standard-setter looks at a remeasurement tsunami and simply says "expense and move on".

## 🧪 LAB — UrbanNest Sublets (10 min)

1. Canon file: head lease end-Y1 (liability ₹32.40L; ROU ₹31.12L). Sublease 100% of space, 4 years, ₹9L/yr, 9%. Classify, then run full day-one mechanics incl. P&L.
2. Same head file, alternate: sublease 30% of the space for 2 years at market. Classification path and the two artifacts' fates?
3. Year-2 P&L for the finance-sublease canon: name both interest lines and the net carry.
4. A landlord waives ₹6L of UrbanNest's rent for the lockdown quarter (all expedient conditions met; UrbanNest elects). Entries and disclosures?
5. UrbanNest receives ₹2L upfront from its subtenant as a "welcome contribution" on an OPERATING sublease. Where does it go?

**Why this matters:** subleases are where property strategy meets accounting mechanics head-on — the difference between "operating sublease, grossed-up margins" and "finance sublease, crystallized loss" is decided by the ROU-ratio test, and the P&L consequences are immediate, not theoretical.

**🔑 Lab answers:**
1. Sublease hands over the ENTIRE remaining term at PV ₹29.16L ≈ 94% of the ROU → **finance sublease**. Day one: Cr ROU ₹31.12L · Dr Net investment ₹29.16L · **Dr Loss ₹1.96L**. Head liability ₹32.40L untouched on the far side of the balance sheet.
2. 30% of space, 40% of term → substantially-all-of-ROU test fails → **operating sublease**: ROU survives (keeps depreciating), sub-rent income straight-lines over the 2 years, head lease churns on untouched — and flag the vacant-space story to the Ind AS 36 radar.
3. Interest **income ₹2.62L** (net investment) against interest **expense ₹2.92L** (head liability) → **net carry −₹0.29L in Year 2**, narrowing as both balances amortize. Subletting cheaper than you leased = a visible annual reminder.
4. Elect under the expedient: **no modification assessment** — waive's ₹6L hits P&L as a negative variable lease payment (other income/offset to rent expense) in the lockdown quarter, liability relieved by ₹6L; disclose the election and the amount. Conditions ticked: direct COVID consequence, consideration not increased, no other substantive changes, within the payment window.
5. On an operating sublease, the ₹2L received is consideration the INTERMEDIATE LESSOR received — recognized as income straight-line over the sublease term (incentive in reverse): balance sheet defers, P&L smooths. (Had URBANNEST paid a sweetener, same smoothing against its sublease income.)

## 💪 Exercises

1. Why does the standard classify the sublease against the ROU rather than against the underlying asset? What mischief would the other rule invite?
2. Construct the one-line proof that a 4-year/4-year-remaining sublease at 94%-of-value PV is finance even when the head lease spanned only a tenth of the building's life.
3. Trace BOTH P&L paths for Year 2 in the alternate universe where UrbanNest's sublease was operating (30% space): expense side, income side, and the analyst's net view.
4. A concession arrives accompanied by a two-year term EXTENSION. Is the expedient available? Rule with citation logic.
5. Where exactly did the ₹1.96L day-one loss come from — which two economic facts collided?

### ✅ Selected answers

1. The intermediate lessor owns only the ROU — its entire sellable right is the residual slice of use. Classifying against the BUILDING would let a company sublease 95% of its 5-year office and claim "operating" because 5 years is small against a 50-year building — economically selling the ROU while reporting rent margins. The ROU-reference rule prices the dollhouse against what you actually own.
2. Sublease term = 100% of remaining head term AND sublease PV = ₹29.16L ≈ 94% of ROU value → substantially all the ROU's risks/rewards transferred = finance — the building's remaining life is irrelevant because the intermediate lessor never owned a claim on it.
3. Operating-sublease Year 2: depreciation on the head ROU ₹7.78L (expense) + pro-rata sublease income (say ₹3.6L on the market-priced 30% slice) straight-lined as income + head interest ₹2.92L. Analyst's net: true margin is (income − depreciation-share − interest-share), but statements present it GROSS under two line families — reconcile before comparing with an unlevered property incumbent.
4. Not available — the expedient's third weld is "no substantive change to other terms and conditions of the lease". An extension is a substantive change; the package is a MODIFICATION (route through LS6's doors — likely Door 3, revised rate, ROU swallows), no P&L shortcut. The expedient only ever covered naked price mercy inside the pandemic window.
5. Two facts: you had paid (PV-wise) ₹31.12L of ROU for that space's remaining use; the market would only pay you ₹29.16L for it. Derecognition forces the meeting: asset off the books at carrying, receivable on at market — the ₹1.96L gap is the crystallized mark-to-market of your soft-market subletting decision, arriving the day you sign, not drip-fed.

## ❓ Quiz

**Q1.** UrbanNest (intermediate lessor) subleases 100% of its space for the full remaining 4 years at PV ₹29.16L against a ₹31.12L ROU. Day one produces:
(a) nothing — subleases are off balance sheet
(b) derecognized ROU ₹31.12L, net investment ₹29.16L, and an immediate ₹1.96L LOSS — the sublease is classified against the ROU (finance), while the head liability ₹32.40L marches on untouched
(c) deferred gain ₹1.96L
(d) the head lease liability reduced to ₹29.16L

**Q2.** Year-2 P&L under the finance-sublease canon shows:
(a) rent expense ₹9L, income ₹10L
(b) interest income ₹2.62L (9% on the net investment) and interest expense ₹2.92L (9% on the surviving head liability) — a negative carry of ₹0.29L that itemizes the cheap subletting every year
(c) a single net rental margin line
(d) depreciation ₹7.78L and sublease income ₹9L

**Q3.** A COVID-era lockdown rent waiver (all expedient conditions met; elected) is accounted:
(a) modification, revised discount rate, ROU absorbs
(b) NOT as a modification — the waived ₹6L drops straight to P&L as a negative variable lease payment in the trigger quarter, liability relieved, election and amount disclosed; no revised rate, no ROU surgery
(c) other comprehensive income over the term
(d) straight reduction of the head-lease term

### ✅ Answers

1. **(b)** — ROU-reference classification makes this a sale of the ROU at market: receivable in, loss crystallized, head debt unmoved.
2. **(b)** — two interest engines running against each other; the negative spread is the annual scar.
3. **(b)** — the expedient: variable-payment treatment for qualifying pandemic mercy, elected and disclosed.

## ✅ Mastery checklist

- [ ] I can classify a sublease against the ROU and explain why (not the building)
- [ ] I can run the finance-sublease canon: ₹29.16L NI, ₹31.12L off, ₹1.96L loss, ₹32.40L head stays
- [ ] I can compute the negative carry (₹2.62L vs ₹2.92L) and narrate what it reports
- [ ] I can run the operating sublease lane: survive ROU, SL income, impairment radar
- [ ] I can recall the expedient's three welds and India's dates (24-Jul-2020 / 30-Jun-2021 / 30-Jun-2022)

**Next:** LS10 reads the aftermath — disclosures, maturity-analysis bridges (₹50L → ₹38.90L with ₹11.10L imputed), the ratio cascade (EBITDA +10, EBIT +2.22, ICR 8.0x → 4.97x, Debt/EBITDA 1.67x → 2.22x) and the covenant clauses India renegotiated in 2019.
