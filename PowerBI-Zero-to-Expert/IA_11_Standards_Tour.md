# 🎯 IA11 · The Standards Tour — Provisions, Intangibles, Impairment, Borrowing Costs, Related Parties, Events After

> Not every standard needs its own module — but six of them need a permanent desk in your head because they fire every single year: Ind AS 37 (provisions), 38 (intangibles), 36 (impairment), 23 (borrowing costs), 24 (related parties), and 10 (events after the reporting period). This is the speed-tour: each standard's one core discipline, its canonical trap, and a number you can defend. In IA12's Tribunal you will judge cases that thread all of them together.

---

## 🎯 Objectives

- Apply the provision trident (present obligation + probable outflow + reliable estimate) and its famous exclusions
- Run the research-vs-development capitalization gate of Ind AS 38 with the six PIRATE criteria
- Operate the Ind AS 36 impairment sequence: CGU, recoverable amount, allocation order, reversal rules
- Capitalize borrowing costs on qualifying assets including the general-pool capitalization rate
- Classify events after the reporting period into adjusting vs non-adjusting with the dividend canon

## 📘 Concepts

### 11.1 Ind AS 37 — provisions, the measurement of honest worry

A **provision** requires all three legs: a **present obligation** (legal OR constructive — established patterns that create valid expectations) from a past event, a **probable** outflow of resources, and a **reliable estimate**. Amount = **best estimate** (expected value for populations, most-likely for single obligations), discounted when the time value is material. Daily-operational canon: a retailer sells 10,000 units at ₹45 each that cost ₹52 to deliver under a binding contract — the contract is **onerous**: unavoidable costs exceed benefits → provision for **₹7 per unit × 10,000 = ₹70,000 — ₹0.7L** (verify: (52−45)×10,000 ✓). The brick-wall exclusions interviewers love: **no provisions for future operating losses** (no present obligation), **no general "rainy day" provisions** (that's earnings management), restructuring provisions only with a **detailed formal plan AND a valid expectation raised by announcement/commencement** (a board resolution alone is a plan, not a provision), and provisions never net against expected disposals of related assets. A **contingent liability** (possible, or unmeasurable) gets disclosed, not recognized — the two boxes must never swap.

### 11.2 Ind AS 38 — intangibles, the capitalization gate

Identifiability + control + future benefits define an intangible; recognition then splits by origin. **Purchased** intangibles capitalize at cost. **Internally generated**: **research phase is ALWAYS expensed**; **development phase capitalizes only when ALL six PIRATE criteria hold** — **P**robable future economic benefits; **I**ntention to complete and use/sell; **R**esources adequate to finish; **A**bility to use or sell; **T**echnical feasibility of completion; **E**xpenditure reliably measurable. Miss one, expense the phase — and once expensed as research, it cannot worm back into cost later. Blanket exclusions: **internally generated goodwill, brands, mastheads, publishing titles, customer lists — NEVER assets** (the IA2 lab's ₹premium brand dies right here). Post-recognition: finite life amortizes over useful life (residual usually zero); **indefinite life never amortizes but is impairment-tested annually**. Software, patents, licenses ride the PIRATE gate daily; the trap is treating "we spent a lot" as "it's capitalizable" — spend is irrelevant, criteria are everything.

### 11.3 Ind AS 36 — impairment, the discipline of recoverable amount

Trigger: indicators (external — market falls, tech shifts, rate rises; internal — obsolescence, worse performance than budget) → test the asset or its **CGU** (cash-generating unit: smallest identifiable group generating independent cash inflows); **goodwill, indefinite-life intangibles, and intangibles not yet available for use test ANNUALLY regardless**. Measure **recoverable amount = HIGHER of fair value less costs of disposal (FVLCD) and value in use (VIU)**, VIU being management-cash-flows discounted at a pre-tax market rate. Impairment = carrying − recoverable, allocated in a strict order: **goodwill first → other assets pro-rata to carrying amounts, no asset below its own FVLCD/VIU floor (or zero)**. **Canon case (python-verified):** CGU carrying ₹100cr (goodwill 10, PPE 60, intangibles 30), recoverable ₹70cr → impairment ₹30cr: goodwill −₹10cr (to nil), remaining ₹20cr pro-rata on 60/30 → **PPE −₹13.3cr, intangibles −₹6.7cr**. Reversals: allowed for non-goodwill assets when estimates improve (capped at pre-impairment carrying); **goodwill impairment NEVER reverses** — sold your optimism, keep the scar.

### 11.4 Ind AS 23 — borrowing costs on qualifying assets

Borrowing costs (interest via EIR, exchange differences as interest adjustment, ancillary charges) that are directly attributable to acquiring/constructing a **qualifying asset** — one that necessarily takes a substantial period to get ready (factories, real-estate projects, large plants; inventory made in bulk/short cycles explicitly excluded by practice) — are **capitalized into the asset's cost**, not expensed. Specific borrowings: actual interest less temporary-investment income on idle funds. General pool: apply a **capitalization rate = weighted average cost of borrowings outstanding during the period**. **Canon (python-verified):** two general loans ₹40L @ 9% and ₹60L @ 10% → capitalization rate = (40×9% + 60×10%)/100 = **9.6%**; ₹30L of general-pool spend outstanding 6 months → capitalize 30 × 9.6% × 6/12 = **₹1.44L**. Start capitalization when expenditures + borrowing costs + activities begin; **suspend during extended interruptions**; **stop when substantially all activities ready the asset** (not when the ribbon is cut).

### 11.5 Ind AS 24 & 10 — related parties, and events after the period

**Ind AS 24 (related parties)** names the family: control/joint-control/significant-influence relationships, **key management personnel (KMP)** and their close family, post-employment plans of the entity. Disclosure is the compliance: relationships (whether or not transactions occurred — for parents/subsidiaries), transactions with amounts and terms, **outstanding balances with commitments**, and KMP compensation split (short-term, post-employment, other long-term, termination, share-based). The standard does not forbid related-party transactions — it forces them to happen in public (arm's-length assertions included only if substantiable).

**Ind AS 10 (events after the reporting period)** runs the date gauntlet: events between period-end and the board's authorization for issue. **Adjusting events** — evidence of conditions that EXISTED at the reporting date (court case settling for a liability you provisioned, customer bankruptcy revealing receivable rot, fraud/error discovered) → adjust the statements. **Non-adjusting events** — conditions that arose AFTER (dividends declared, major acquisitions, fire destroying a plant, big post-year-end FX moves) → do NOT adjust; disclose nature + financial effect if material. **Canon: dividends declared after year-end are NEVER a liability at year-end** — the obligation did not exist at the reporting date (this is the single most-tested line of the standard). Going concern exception: if post-period events prove the entity is NOT a going concern, the whole basis changes — adjust everything, the one case where non-adjusting rules yield to substance.

## 🧪 LAB — The Tour Desk (10 min)

Work all six stations on Meridian Metals' year:

1. Station 37: lawsuit — counsel says 60% likely to pay ₹4cr, payable in 18 months (discount 7.2% ≈ factor 0.883): recognize/disclose?
2. Station 38: ₹2.4cr spent — ₹0.9cr research (algorithm exploration), ₹1.5cr development (all six PIRATE met from day 1). Capitalize how much?
3. Station 36: packaging CGU carries ₹60cr (goodwill 8, plant 40, brand license 12); demand collapsed; recoverable ₹44cr. Allocate the hit.
4. Station 23: general pool is the 40L@9% + 60L@10% canon; ₹45L average spend on the new plant all year. Capitalized interest?
5. Station 24: COO's spouse's firm supplied ₹3cr of logistics. What precisely goes in the note?
6. Station 10: on 12 April (before authorization), fire destroys a ₹30cr warehouse insured for ₹24cr; and the board declares a ₹5cr dividend on 20 May. Adjust what?

**Why this matters:** six stations is exactly how one audit file reviews a year-end — cycling the standards at speed without confusing their fences is the professional skill.

**🔑 Lab answers:**
1. Provision recognized (all three legs, measurable, material discounting): 4.0 × 0.883 = **₹3.53cr** with unwinding as finance cost.
2. Capitalize **₹1.5cr** (development, gate passed); the ₹0.9cr research is expensed — permanently.
3. Impairment ₹16cr: goodwill first −₹8cr → then ₹8cr pro-rata on 40/12 → plant −₹6.15cr, license −₹1.85cr (40:12 ratio ⇒ 8×40/52=6.15, 8×12/52=1.85 ✓).
4. 45 × 9.6% = **₹4.32L** (full-year average spend).
5. Nature of relationship (KMP's close family entity), transactions ₹3cr + terms, outstanding balances + commitments, and KMP-compensation table separate from this disclosure.
6. Fire = **non-adjusting** (condition arose after year-end) — disclose nature + ₹6cr uninsured loss estimate; dividend = **non-adjusting, disclosed** — no liability at year-end, ever.

## 💪 Exercises

1. "Conservative CFO" wants a ₹5cr general provision "for possible future recessions." Dismantle with the trident.
2. Why is internally generated goodwill banned from the balance sheet while purchased goodwill gets in with a tie-break?
3. Goodwill sits inside a CGU at ₹8cr carrying; recoverable exceeds carrying by ₹2cr this year after a ₹5cr goodwill impairment last year. Reverse how much?
4. Capitalization must stop when the asset is "substantially ready" — a plant is mechanically complete but managers dislike the paint. Interest status?
5. A customer went bankrupt on 3 April; year-end 31 March; evidence shows distress since February. Adjust or disclose?

### ✅ Selected answers

1. No present obligation (future losses come from future events), no past obligating event — the trident fails two legs. General provisions are banned precisely because they are earnings reservoirs in disguise; "conservatism" is not a recognition criterion.
2. Purchased goodwill is measured in a market transaction (residual of price over net FV — a third-party priced it); internally generated goodwill cannot be reliably measured or separated from the cost of generating it — recognition without reliable measurement is impossible, so the door stays shut.
3. **Zero** — goodwill impairment never reverses under Ind AS 36; recoveries float the OTHER assets within the CGU caps, but goodwill's scar is permanent. This asymmetry is deliberate: goodwill re-inflation was the classic reversal game.
4. **Stop capitalizing** — the test is substantial readiness for intended use, not cosmetic completion; paint preference is not an activity in progress, so borrowing costs resume their P&L journey.
5. **Adjusting** — the bankruptcy is evidence of a condition (the receivable's impairment) existing at the reporting date; the event merely confirmed it. Book the ECL/provision effect; the date of death of the customer is not the trigger, the date of the rot is.

## ❓ Quiz

**Q1.** The provision trident requires all three of:
(a) risk, materiality, auditor sign-off
(b) present obligation from a past event, probable outflow, and a reliable estimate — miss one and you disclose, you do not recognize
(c) a lawsuit, a lawyer, and a court date
(d) board approval, probability, and insurance exhaustion

**Q2.** Development-phase spend capitalizes under Ind AS 38 when:
(a) the amount is material
(b) all six PIRATE criteria (probable benefits, intention, resources, ability, technical feasibility, measurable expenditure) hold — expense research always
(c) research is complete
(d) the CFO certifies the budget

**Q3.** GigaPack's CGU impairment (carrying 100: goodwill 10, PPE 60, intangibles 30; recoverable 70) allocates as:
(a) equal ₹10cr to each asset
(b) goodwill −₹10cr first, then the remaining ₹20cr pro-rata: PPE −₹13.3cr, intangibles −₹6.7cr
(c) goodwill untouched, all to PPE
(d) reverse-order: intangibles first

### ✅ Answers

1. **(b)** — the trident decides recognize-vs-disclose; rainy-day provisions are earnings management in costume.
2. **(b)** — the gate is criteria-based, not spend-based; and internally generated goodwill/brands never clear it.
3. **(b)** — allocation order: goodwill dies first, pro-rata follows, floors respected, and goodwill never comes back.

## ✅ Mastery checklist

- [ ] I can run the trident and the onerous-contract calculation (₹0.7L canon)
- [ ] I can name the PIRATE six and the never-capitalize list
- [ ] I can execute a CGU impairment with allocation order and reversal rules
- [ ] I can compute a general-pool capitalization rate (9.6% canon) and the start/suspend/stop rules
- [ ] I can sort any post-year-end event adjusting vs non-adjusting with the dividend canon

**Next:** IA12 is judgment day — **CAPSTONE: The Standards Tribunal**. Five live files threading every module, an OCI-or-P&L sorting drill, an equity reconciliation built under pressure, and the interview forge. Bring everything.
