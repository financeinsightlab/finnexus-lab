# 🎯 LS6 · Modifications — The Three Doors of Mid-Lease Renegotiation

> Leases get renegotiated constantly: two more floors, one floor less, new rent, new term, a purchase option bolted on. Ind AS 116 refuses to let these slide in as footnotes — every modification walks to exactly one of three doors: (1) it's really a NEW lease flanking the old one, (2) it's a shrinking — partially kill the ROU and liability and book the difference as gain/loss TODAY, or (3) it's a repricing — remeasure at a fresh discount rate and bury the difference inside the ROU. Door choice is everything: the same negotiation produces a P&L event through one door and a silent balance-sheet reshuffle through another.

---

## 🎯 Objectives

- Define a modification (scope or consideration change outside original terms) vs a remeasurement (LS5's doors)
- Run Door 1: separate lease — the two-condition test (added asset right + commensurate price)
- Run Door 2: decrease in scope — partial derecognition with today-recognized gain/loss (**+₹0.79L canon**)
- Run Door 3: everything else — remeasure at the REVISED rate, adjust ROU, no P&L (**+₹7.02L canon**)
- Sequence compound renegotiations and know when the revised discount rate (always, for non-separate mods)

## 📘 Concepts

### 6.1 Modification vs remeasurement — which shelf is this event on?

**Remeasurement** (LS5): the contract stands exactly as written; the world moved — CPI reset the cash, an option flipped to reasonably certain, an RVG expectation changed. The paper didn't change; your estimates did.

**Modification**: the paper changed — scope of underlying assets (more space, less space, another machine) or consideration (renegotiated rent) in a way the ORIGINAL terms didn't contemplate. If the lease always said "rent re-prices to market every 3 years by formula", that re-pricing is in the original terms → remeasurement territory; a negotiated rent cut outside any clause → modification. One question sorts most cases instantly: **did the contract already provide for this?**

### 6.2 Door 1 — the separate lease (the clean door)

A modification is accounted for as a **separate lease** — old lease untouched — when BOTH hold:

1. It **adds the right to use one or more underlying assets** (two extra floors, a second crane), AND
2. The consideration increases by an amount **commensurate with the standalone price** for that added scope (adjusted for the contract's context).

**Door-1 canon (python-verified):** UrbanNest adds 2 floors at the market rate of ₹4.5L/yr for the 3 remaining years, IBR for the new slice 10%: new, separate liability = 4.5 × annuity(10%,3) = 4.5 × 2.4869 = **₹11.19L**, with its own ROU. The existing 5-floor lease churns on untouched. Rationale: genuinely new asset at genuinely market price = genuinely new deal. If the landlord slips a sweetheart ₹1L/yr rate for the two floors BECAUSE you surrendered something else — both conditions fail; walk to Doors 2/3.

### 6.3 Door 2 — decrease in scope: partial derecognition, P&L today

Scope shrinks (fewer floors, shorter term — **shortening the term IS a scope decrease**): proportionately derecognize the ROU and the liability for the surrendered share, and recognize the DIFFERENCE in profit or loss immediately; then remeasure the remaining liability at a REVISED discount rate for the revised flows, adjusting ROU.

**The whole canon (python-verified, in the LS4 universe):** 5 floors, ₹10L/yr total (₹2L per floor), 5 years, 9%. End of Y2: liability ₹25.31L, ROU ₹23.34L (₹38.90L − 2 × ₹7.78L SL). UrbanNest surrenders 2 of 5 floors (40% of space):

| Step | Mechanics | Number |
|---|---|---|
| 1. Partial derecognition | 40% of liability off: ₹10.13L · 40% of ROU off: ₹9.34L | **Gain to P&L = 10.13 − 9.34 = ₹0.79L** |
| 2. Remeasure the kept 60% | remaining flows = 3 floors × ₹2L = ₹6L/yr, 3 years, revised IBR 10% → 6 × 2.4869 = **₹14.92L**; post-derecognition liability was ₹15.19L | **ROU adjusts −₹0.27L** |
| 3. Final positions | liability **₹14.92L** · ROU **₹13.74L** (23.34 − 9.34 − 0.27) | go-forward depreciation 13.74/3 = ₹4.58L/yr |

That ₹0.79L is real P&L: termination-day gain. Why does derecognizing 40% of each produce a gain at all? Because the liability amortizes slower than the SL-depreciated ROU early on (interest fattened it) — the debt you're forgiven outweighs the asset you surrender. (Signs flip later in a lease's life; run the math, don't memorize a direction.)

### 6.4 Door 3 — the plain reprice: revised rate, ROU swallows it

Modification NOT separate and NOT a scope decrease — classic case: renegotiated rent, same space, same term. Remeasure the liability at the **REVISED discount rate at the effective date** (today's IBR for the REMAINING term), and adjust the ROU. **No gain/loss.** Why? You traded identical scope for a different price — that's neither a disposal nor an acquisition; it's the same deal re-cut, so the ROU (the thing whose price you re-cut) absorbs the shock and amortizes it out.

**Canon (python-verified):** instead of surrendering floors, UrbanNest renegotiates Y3–Y5 rent ₹10L → ₹13L (landlord funds your ₹7L fit-out — the sweetheart). Revised IBR 10%: 13 × 2.4869 = **₹32.33L** vs carrying ₹25.31L → **+₹7.02L to liability and ROU**, depreciated over the 3 remaining years. The rent hike never detonates in today's P&L — it drips in through fatter depreciation and interest, exactly where belt-tighteners forget to look.

Alert: ZERO ROU floor — if a scope decrease's post-remeasurement adjustment would push ROU below zero, the excess goes to P&L. And every non-separate modification (Doors 2 AND 3) carries the revised-rate guest — no exceptions; "rate follows shape" graduates to "rate follows negotiation".

### 6.5 Compound jobs & ordering

Surrender space AND extend term AND re-cut rent in one signature? Sequence: (1) partial derecognition for the scope decrease (gain/loss now); (2) remeasure surviving flows — new term, new rent — at the revised rate (ROU adjusts). One effective date, one revised IBR, two mechanical steps, one clean ledger. And the lessor's side stays segregated (LS8's doors: lessor mods route through ITS classification model — never let the lessee's door-logic leak into lessor files).

## 🧪 LAB — Renegotiation Friday (10 min)

1. Three envelopes hit your desk at end-Y2 (canon lease: 5 floors, ₹10L/yr, 5y, 9%, carrying liab ₹25.31L / ROU ₹23.34L). Sort each by door: (A) add 2 floors at market ₹4.5L/yr for 3 years; (B) surrender 2 floors, landlord accepts walk-away; (C) re-cut Y3–Y5 rent to ₹13L (fit-out funded).
2. Run (A) fully: liability, ROU, treatment of the old lease.
3. Run (B) fully: gain/loss, final liability, final ROU, go-forward annual depreciation.
4. Run (C) fully: new liability, adjustment, P&L today.
5. The landlord in (B) also shortens the REMAINING term of the 3 kept floors from 3 years to 2. Which step of your (B) engine absorbs that — and does it create a second P&L event today?

**Why this matters:** renegotiations cluster at quarter-ends and restructurings; the doors decide whether a CFO's "portfolio optimization" lands as a quiet reshuffle or a reported gain — that choice isn't the accountant's mood, it's the standard's.

**🔑 Lab answers:**
1. (A) → **Door 1** (added asset right + commensurate standalone price); (B) → **Door 2** (scope decrease); (C) → **Door 3** (reprice, same scope).
2. Separate lease: new liability 4.5 × 2.4869 = **₹11.19L**, own ROU ₹11.19L, depreciated over 3 years; the 5-floor lease is untouched — two files, two schedules.
3. Derecognize 40%: off comes liability ₹10.13L and ROU ₹9.34L → **gain ₹0.79L to P&L**. Remeasure kept flows (₹6L/yr, 3y, 10%): liability = 6 × 2.4869 = **₹14.92L**; ROU adjust −₹0.27L → final ROU **₹13.74L**; go-forward dep ₹13.74L/3 = **₹4.58L/yr**.
4. 13 × 2.4869 = **₹32.33L**; **+₹7.02L** to ROU (Dr ROU / Cr liability ₹7.02L); **P&L today: nil** — the hike waits inside the ROU, which rises to 23.34 + 7.02 = **₹30.36L** and depreciates **₹10.12L/yr** over the 3 remaining years.
5. The shortened term folds into step 2's remeasurement — surviving flows re-cut for 2 years at the same revised 10%: 6 × annuity(10%,2) = 6 × 1.7355 = ₹10.41L, ROU adjusts accordingly. **No second P&L event** — a term change for the KEPT scope is Door-3-shaped (adjust ROU); only the surrendered slice earned today's gain.

## 💪 Exercises

1. Why does Door 1 require BOTH the asset-add AND the commensurate-price test? Describe the abuse each condition alone would permit.
2. In Door 2, why might the derecognition difference be a LOSS late in a lease? Reason from the two schedules' shapes.
3. Door 3 buries the reprice in the ROU "with no P&L". Is the P&L genuinely untouched? Quantify with the canon over Y3–Y5.
4. A landlord gives a straight ₹5L cash rent rebate outside any clause, scope untouched. Room it: door, mechanics, P&L.
5. Why does EVERY non-separate modification use a revised discount rate when LS5's door-(a) remeasurement didn't?

### ✅ Selected answers

1. Asset-add alone: re-cut an existing lease upward while hiding sweetheart pricing of the added slice inside the "modification" (ratios move via ROU, never via P&L discipline). Price-commensurateness alone: landlord could pump consideration for an identical scope and call it "new lease", dodging remeasurement of the old. Together they certify a genuinely new market deal flanking the old one — which is the only profile that deserves a fresh file.
2. The gain springs from a race between two amortization curves. Early on, interest accretion keeps the liability FAT while SL depreciation has already thinned the ROU — the forgiven debt outweighs the surrendered asset → gain (our canon's ratio at end-Y2: 25.31 vs 23.34). A LOSS emerges whenever the ROU runs LIGHTER relative to the liability — faster depreciation patterns (short dep life vs long term, accelerated methods) or back-loaded payment schedules that keep the liability plump while the asset melts. Direction is an output of the two schedules; compute the ratio, never memorize a sign.
3. P&L is postponed, not spared: Door 3's +₹7.02L inflates the ROU to ₹30.36L → depreciation ₹10.12L/yr × 3 = ₹30.36L vs the pre-mod ₹23.34L — the extra ₹7.02L lands in P&L across Y3–Y5 (as depreciation) plus a bumped interest line on the ₹32.33L liability. "No P&L today" ≠ "no P&L ever".
4. Not a scope change, not a separate lease → **Door 3**: consideration changed; remeasure the liability (cash flows now ₹5L lower) at a revised rate; the ROU absorbs. (COVID-19-era caveat — LS9: qualifying pandemic concessions could skip remeasurement entirely and take the ₹5L straight as income under the expedient. Outside the expedient, the ROU eats rebates too.)
5. A modification re-cuts the DEAL — its price and possibly scope — so the market cost of that new deal must be priced as of now: the revised rate is the honest price tag of the renegotiation. LS5's door (a) merely re-counted cash under the SAME deal (index moved, terms intact) — the obligation's risk-and-tenor profile is unchanged, so its original rate survives.

## ❓ Quiz

**Q1.** End-Y2, UrbanNest surrenders 2 of 5 floors (carrying: liability ₹25.31L, ROU ₹23.34L). P&L today shows:
(a) nothing — modifications never touch P&L
(b) a GAIN of ₹0.79L — derecognize 40% of each artifact (₹10.13L liability vs ₹9.34L ROU); the forgiven debt outweighs the surrendered asset because interest had fattened the liability's young balance
(c) a loss of ₹0.79L
(d) a gain of ₹1.56L

**Q2.** Same space, same term, rent renegotiated ₹10L → ₹13L for Y3–Y5 (revised IBR 10%):
(a) expense ₹7.02L immediately
(b) remeasure at the REVISED rate — ₹32.33L vs ₹25.31L carrying; +₹7.02L into the ROU with nil P&L today; the reprice then bleeds in through ₹10.12L/yr depreciation and a fatter interest line
(c) open a separate lease
(d) restate prior years

**Q3.** Adding 2 floors at the market ₹4.5L/yr for the remaining 3 years is:
(a) a Door-2 partial derecognition
(b) a SEPARATE lease — added right to use new assets at commensurate standalone price; own liability ₹11.19L at the current 10% rate, own depreciation schedule, old lease untouched
(c) plan evidence for restating the old lease
(d) a variable payment event

### ✅ Answers

1. **(b)** — partial derecognition compares forgiven debt with surrendered asset; young leases usually hand back a gain.
2. **(b)** — Door 3 repricing: revised rate, ROU absorbs, P&L pays later through dep and interest.
3. **(b)** — both separate-lease conditions met; run a clean parallel file.

## ✅ Mastery checklist

- [ ] I can separate modifications from remeasurements with the "did the paper provide for this?" test
- [ ] I can run Door 1 and price the parallel lease (₹11.19L)
- [ ] I can run Door 2 end-to-end: ₹0.79L gain, liability ₹14.92L, ROU ₹13.74L, dep ₹4.58L
- [ ] I can run Door 3: ₹32.33L, +₹7.02L, ₹10.12L/yr, nil P&L today
- [ ] I can explain WHY the revised rate polices both non-separate doors

**Next:** LS7 walks the oldest trick in the financing book into the new regime — sale-and-leaseback: the Ind AS 115 true-sale gate, the proportion-of-rights gain rule (₹19.50cr on the canon), above/below-market price mechanics, and how IndiGo built a fleet strategy on this exact transaction.
