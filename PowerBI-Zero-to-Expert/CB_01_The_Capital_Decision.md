# 🎯 CB1 · The Capital Decision — Where Strategy Meets the Exchequer

> Every factory, dark store, and platform rewrite begins as a slide deck and ends as a bank transfer. Capital budgeting is the discipline that stands between them: should THIS rupee become a machine? This final course of the Finance Core builds the board's toolkit — Module 1 frames the decision, the incremental-flow law, and the four killers of capex proposals.

---

## 🎯 Objectives

- Distinguish capex from opex and map the capital funnel (idea → screen → appraisal → sanction → audit)
- Enforce the incremental-cash-flow law: only flows that change, after tax, counted when they move
- Kill the four proposal poisons: sunk costs, allocated overhead, opportunity cost blindness, side-effect denial
- Deploy the decision-rule map (NPV / IRR / payback / PI from TV4) and know each one's jurisdiction
- Anchor on ShopKart's ₹22.5L program (CF6/FA7 canon) as the running case

---

## 📘 Concepts

### 1.1 The decision's architecture — big, lumpy, and (mostly) irreversible

Opex pays this month's salaries; **capex buys multi-year capacity** — ₹22.5L for ShopKart's 2 dark stores + cold chain + POS rebuild (CF6 canon). Three properties make capital decisions worth a whole course: **scale** (bets measured in multiples of annual profit — ShopKart's PAT ₹13.25L vs the ₹22.5L program), **time** (years of consequences, the TVM exponent), and **stickiness** (a bad hire exits in weeks; a bad plant haunts the balance sheet for a decade — RT3's lazy-asset tell). The funnel disciplines it: idea → screen (strategy fit + payback vet) → **appraisal** (this course: incremental flows → hurdle → NPV/IRR) → sanction (committee) → **post-audit** (CB6's most-skipped step). Every stage exists because stage-skipping is how ₹22.5L becomes ₹40L of "strategic necessity."

### 1.2 The incremental-flow law — the entire subject in one sentence

**Count only after-tax cash flows that CHANGE because of the project, when they move.** Four corollaries, each a proposal-killer in reverse:

1. **Sunk costs are dead** — the ₹4L already spent on the feasibility study is gone whether or not the store opens; it belongs in the minutes, not the model. Managers cry "we can't waste the study!" — the study bought *information*, and the information now says stop. Honoring sunk costs is how throwing good money after bad gets rebranded as "commitment."
2. **Allocated overhead is not incremental** — allocating ₹3L/yr of HQ rent "to" the new store doesn't change HQ's rent bill one rupee; only NEW overhead (the store's own manager, its own utilities) counts. Allocation is useful for product-profitability review (FA course); it's poison in capex models.
3. **Opportunity costs are real costs** — using a company-owned godown for the dark store costs *zero cash* and ₹1.8L/yr of foregone rent; the model must charge it. The resource can be sold/rented; "free" is just unpriced (EC1's opportunity cost in a hard hat).
4. **Side effects cut both ways** — cannibalization (new store pulls 15% of an old store's margin: incremental contribution = new margin − cannibalized margin) and halo (the POS rebuild cuts shrinkage chain-wide, not only at the new site: count it).

### 1.3 The decision-rule map — jurisdiction by question

TV4's court reconvenes with cases it actually rules: **NPV** crowns (rupee value created at the hurdle — the only rule fluent in wealth); **IRR** narrates (the % story for the board — with scale/multiple-root traps leashed); **payback/discounted payback** vets survival (exposure window vs technology life; rejection filter, never the king); **Profitability Index** (PI = PV inflows / outlay) rations capital under budgets (CB5). Corporate practice mirrors exactly this pecking order — NPV supreme at sophisticated boards, IRR ubiquitous in presentations, payback beloved by risk-scarce promoters. Your desk rule: **no proposal travels with fewer than two rules computed and one sensitivity attached.**

### 1.4 The ShopKart program — the spine for seven modules

CF6/FA7 gave us the canon: capex ₹22.5L; sales growth plan +30% (Δ₹84L); working-capital growth tax ₹17.0L (RT3 canon — CCC 74d); EBIT margin 7.14%; WACC ~12% (CB3 builds it: Ke 13.5% × 0.70 + after-tax Kd 8.98% × 0.30 = **12.14%**). Is the program NPV-positive? That's the running lab across the course: you'll model its operating flows (CB2), price its hurdle (CB3), stress it (CB4), handle its dark-store option (CB4 real options), ration it against rival projects (CB5), and post-audit it (CB6) before the CB7 committee convenes. Same company, entire craft — the academy closes where it began, one level deeper.

---

## 🧪 LAB — First Pass at the ShopKart Program (10 min)

**Setup:** ShopKart's expansion proposal (sponsor deck, year 0): capex ₹22.5L; claims "incremental EBIT +₹6L/yr from year 1, for 6 years"; hurdle 12%. Attached footnotes: feasibility study cost ₹4L (already spent); new stores will use the owned godown (market rent ₹1.8L/yr); expect 15% margin pull from the flagship store (flagship contribution ₹12L/yr); allocated HQ overhead ₹3L/yr; incremental site staff & utilities ₹2.1L/yr.

**Do this:**
1. Rebuild the TRUE incremental EBIT per year: strip poisons, install the real ones (tax at 25.17%).
2. Quick NPV at 12% over 6 years (annuity factor 4.1114) using after-tax incremental operating cash flow ≈ incremental EBIT × (1 − t) (ignore depreciation for this first pass). Verdict?
3. Re-add the sponsor's unadjusted claim (+₹6L/yr) — how much worse does the honest number make the project look? Who lost the difference?
4. The CFO proposes counting the ₹4L study "since the project wouldn't exist without it." Write the one-sentence rejection.
5. Which of the four poisons appears TWICE in this deck? Name both instances.

**Why this matters:** This is screen #1 at every real capital committee: does the sponsor's deck survive the incremental-flow law? Half of corporate capex proposals die right here — not on finance sophistication, but on honesty adjustments anyone can compute, if anyone bothers. You're now the one who bothers.

**🔑 Lab answers:**
1. Sponsor EBIT +6.0; minus opportunity cost (godown rent) −1.8; minus cannibalization 15% × 12 = −1.8; minus true new overhead −2.1 (already in the +6? — the deck buried it, so deduct); allocated HQ overhead ₹3L **excluded**; study ₹4L **excluded**. True incremental pre-tax flow = 6.0 − 1.8 − 1.8 − 2.1 = **+₹0.3L/yr**; after tax = 0.3 × 0.7483 = **+₹0.22L/yr**.
2. NPV = 0.22 × 4.1114 − 22.5 + ignored-depreciation shields = **−₹21.6L → REJECT as sponsor-sold.** (CB2's full model with depreciation tax shields and working capital recovery will rescue some value — but the deck as submitted is dead on arrival.)
3. The honesty gap: +₹6L claimed vs **+₹0.3L** true pre-tax flow — the deck overstated by 20×, for an NPV swing of (6 − 0.3) × 0.7483 × 4.1114 ≈ **₹17.5L of phantom value**. Who loses it? Shareholders — in year-2 meetings where "the stores underperform despite following projections," which is corporate for "we budgeted our own lie."
4. *"The ₹4L bought the model we're holding — its information value is already inside this very rejection; spending ₹22.5L more won't refund it."*
5. **Side effects appears twice** — cannibalization (₹1.8L margin pull) denying the negative kind, AND the godown (opportunity-cost blindness, cousin of the same accounting framing: the deck treats internal resources and internal effects as invisible). Also overhead appears twice in flavor (₹3L allocated wrongly included, ₹2.1L real wrongly buried) — clean decks separate *billed* overhead from *caused* overhead.

---

## 💪 Exercises

1. **Poison ID.** Match each to its poison: (a) "We've already spent ₹12L on the prototype — we must proceed"; (b) model carries 8% of group admin salary pool; (c) warehouse used for project but currently earns ₹60k/mo on lease; (d) new product line will steal ₹20L revenue from our old line — ignored.
2. **Funnel design.** Your 200-employee company has zero capex discipline. Write the 4-gate process (one line per gate) that an MD can actually run.
3. **Rule jurisdiction.** Each answer belongs to NPV, IRR, payback, or PI: (a) "creates ₹8.1L of value at our hurdle"; (b) "returns 18% — beats our 12%"; (c) "money back in 2.9 years, inside the machine's 5-year life"; (d) "per rupee of scarce capital, project B wins 1.24 vs 1.18."
4. **Screen.** Proposal: "New flagship café — ₹45L, brand-building value immeasurable, EBIT +₹2L/yr for 8 years." Hurdle 12%, tax 25.17%. Run the honest first pass and verdict.
5. **Godown twist.** What if the godown currently earns NO rent and the best alternative is letting it sit? Recompute lab flow item for that world and state the rule it illustrates.

### ✅ Selected answers

1. (a) sunk cost; (b) allocated overhead; (c) opportunity cost (charge ₹7.2L/yr); (d) side effect / cannibalization — ignored side effects are the friendliest-looking poison in decks.
2. **Gate 1:** strategy fit + two-line description (₹0). **Gate 2:** screening pack — payback + scale check (does the bet exceed 1× PAT? flag for board). **Gate 3:** full appraisal — incremental flows, hurdle, NPV+IRR+sensitivity (this course). **Gate 4:** post-audit at month 12 — actuals vs model, sponsor signs the variance report. Discipline isn't fewer projects; it's fewer surprises.
3. (a) NPV; (b) IRR; (c) payback; (d) PI (capital rationing's ruler — CB5).
4. After-tax flow = 2 × 0.7483 = ₹1.50L/yr; factor (12%, 8y) = 4.9676 → PV = 7.45L − 45 = **NPV −₹37.5L → REJECT.** "Brand-building" must appear as quantified side effects (halo sales elsewhere, measurable) or remain a story; ₹37.5L of immeasurable is expensive poetry.
5. With zero best-alternative rent, the godown's opportunity cost = **₹0** — charge nothing; the rule: **opportunity cost = the value of the BEST FORGONE ALTERNATIVE**, not any conceivable one. The same asset is a ₹1.8L/yr charge in one world and free in another — context prices resources, ledgers only record them.

---

## ❓ Quiz

**Q1.** The incremental-flow law counts only:
(a) all accounting profits the project books
(b) after-tax CASH flows that change because of the project, when they move — sunk, allocated, and alternative-blind items excluded
(c) every rupee spent on the project including studies
(d) projected revenues, gross

**Q2.** The sponsor's deck showed +₹6L/yr; the honest flow was +₹0.3L/yr. The phantom NPV created was about:
(a) ₹1L
(b) ₹17.5L of phantom value — (5.7 × 0.7483 × 4.1114): honesty adjustments are not conservatism, they are the difference between a project and a donation
(c) ₹4L — the study cost
(d) zero — depreciation fixes it

**Q3.** Which statement about the decision-rule map is correct?
(a) Payback crowns all decisions
(b) NPV is the only rule fluent in rupee wealth; IRR narrates in %, payback vets survival, PI rations scarce budgets — jurisdiction by question
(c) IRR alone suffices
(d) PI replaces NPV everywhere

### ✅ Answers

1. **(b)** — the four corollaries (sunk dead, allocation out, opportunity costs priced, side effects counted both ways) are all just applications of one test: does this flow *move* if we say yes? If it doesn't move, it doesn't belong in the model — no matter how emotionally attached the sponsor is.
2. **(b)** — decks don't lie at the NPV line first; they lie in the flow lines, quietly, via opportunity-cost blindness and cannibalization denial. CB1's craft is catching ₹17.5L of phantom while it's still a slide, not a store.
3. **(b)** — the map exists because each rule answers a *different* question and fails differently: NPV maximizes wealth, IRR trips on scale/sign-patterns, payback is profit-blind past the cutoff, and PI mis-sorts indivisible bundles (CB5). Fluent analysts switch rules by jurisdiction; fluent committees ask for two minimum.

---

## ✅ Mastery checklist

- [ ] I separate capex from opex and can run the 5-stage funnel
- [ ] I enforce the incremental-flow law: changed, after-tax, when-it-moves
- [ ] I kill all four poisons in sponsor decks by reflex
- [ ] I map decision rules to questions: NPV crowns, IRR narrates, payback vets, PI rations
- [ ] I hold the ShopKart program canon: ₹22.5L capex, +30% plan, WC tax ₹17.0L, hurdle ~12%

**Next:** CB2 builds the model itself — **estimating project cash flows**: initial outlay + NWC, the depreciation tax shield, terminal recovery, and the full ShopKart machine worked line-by-line.
