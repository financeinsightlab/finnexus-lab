# 🎯 CB7 · CAPSTONE — The Capital Committee

> Six modules of machinery, one table, four doors. Three competing projects, a defuser case with sign-flip cash flows, a rationed ₹35L budget, and a chairman who wants memos, not moods. This is the capstone of Capital Budgeting — and the final module of the entire 13-course Finance Core. Earn the signature.

---

## 🎯 Objectives

- Run the full committee protocol on a multi-project docket end-to-end
- Integrate every CB skill: incremental flows, WACC, uncertainty, options, EAA/rationing, governance
- Produce the committee pack: one page per project + the recommendation memo
- Pass the series-closing interview forge

---

## 📘 Concepts

### 7.1 The committee protocol — eight moves

1. **SCREEN:** strategy + incremental flows (CB1 law, four poisons out)
2. **MODEL:** full blocks, tax 25.17%, WDV available, NWC in-and-out (CB2)
3. **PRICE:** hurdle with receipt — WACC 12.14% ops / 8.98% financing legs / divisional if new (CB3)
4. **STRESS:** sensitivity swing-driver + 3-state E[NPV] + breakeven decree (CB4a)
5. **OPTION:** name and price abandon/expand/delay (CB4b)
6. **RATION:** PI + bundle audit against the budget (CB5)
7. **GOVERN:** memo lines — owner, contingency, evidence plan, audit date, kill/scale triggers (CB6)
8. **SIGN:** recommendation with minority dissent noted

### 7.2 The docket — three doors, one budget (₹35L)

**Door 1 — The Machine Upgrade (₹10L):** outlay −10 at t=0, dep SL ₹1.9L/yr to ₹0.5L book, pre-tax savings ₹3L/yr → OCF **₹2.723L × 5y** (CB2 canon), terminal salvage ₹0.5L → PV(OCF) 9.82 + PV(salvage) 0.28 − 10 → **NPV +₹0.10L, IRR ≈ 12.4%** — borderline at the 12% hurdle, swinging entirely on the savings line. Decree: metered savings ≥ ₹2.96L/yr.
**Door 2 — Dark-Store #3 (₹25L):** year-1 demand resolves 50/50: PV ₹48L (high) / ₹10L (low, salvage fixtures ₹16L); operating ramp per stores-1&2 actuals.
**Door 3 — Software Rewrite (₹5L):** OCF ₹2.2L/yr × 4y (POS/WMS rebuild, chain-wide shrinkage savings documented by ops); NPV = 2.2×3.0373 − 5 = **+₹1.69L, IRR ≈ 27%** (annuity factor target 5/2.2 = 2.27).
**Defuser case — Warehouse Expansion (−₹60L, +₹140L yr-1, −₹78L yr-2 closure/refit):** signs − + − → multiple IRRs exist mechanically, so IRR is inadmissible by construction: NPV @12% = −60 + 125 − 62.2 = **+₹2.8L** rules the verdict instead.

### 7.3 Pre-computed sheets (committee uses these, then argues)

| Door | NPV @12% | IRR | PI | EAA | Breakeven decree |
|---|---|---|---|---|---|
| 1 Machine | +0.10 | 12.4% | 1.01 | 0.028 | metered savings ≥ ₹2.96L/yr |
| 2 Dark store (no option) / (with abandon) | +4.0 / **+7.0** | ~17% | 1.16/1.28 | — | demand ≥ decay-line; put strike ₹16L |
| 3 Software | **+1.69** | 27% | **1.34** | 0.554 | shrinkage cut ≥ ₹1.78L/yr |
| Defuser | +2.8 @12% (IRR inadmissible) | roots −8% & +41% | 1.05 | — | closure cost ≤ ₹81L |

Dark-store math check: no-option NPV = 0.5×48 + 0.5×10 − 25 = **+4.0**; with abandon 0.5×48 + 0.5×16 − 25 = **+7.0** → the put = **₹3.0L**. Machine & software EAA: 0.10/3.6048 = 0.028; 1.682/3.0373 = **0.554**. Defuser roots check: solving −60 + 140x − 78x² = 0 yields x → IRRs of **−8% and +41%** — one negative, one fantasy-grade; exactly why the court dismisses IRR on sign-flip flows.

### 7.4 What the committee is really testing

Not arithmetic — **judgment under rationing**. ₹35L of budget vs ₹40L of asks (10 + 25 + 5), one defuser to defang, one put to price into governance, and a machine whose NPV sits exactly at the heat-death of the hurdle. The chair doesn't want three yes/no cards; the chair wants the sentence: **"Here is the combination, here is what we gave up, here is when we will know if we were wrong."**

---

## 🧪 LAB — Sit in the Chair (10 min)

**Do this:**
1. **Defuse:** rule on the Warehouse Expansion's IRR submission (the sponsor prints 41% and conveniently never mentions the −8% twin root).
2. **Price the put:** dark-store #3 with and without the abandon clause — and state what this does to its PI and priority.
3. **Ration:** with ₹35L, find the optimal bundle (bundles: 1+2 = 35 exactly; 1+3 = 15; 2+3 = 30; all three = 40 ✗). Consider NPV, but also evidence status (Door 1's savings unmeasured; Door 3's savings metered already by ops).
4. **Govern:** write the one-line kill/scale/evidence trigger for each funded project.
5. **Sign:** the chair memo — 4 sentences: combination, foregone alternative, the knowns-unknowns, review date.

**Why this matters:** Every earlier module feeds this table: CF gives WACC; FA/RT give the forensic eye on savings claims; TV gives the arrow; DV gives the options machinery; CB1-CB6 give the workflow. If you can chair this docket, you can chair corporate India — the math is identical at ₹35L and ₹3,500 Cr.

**🔑 Lab answers:**
1. **Ruling: IRR inadmissible.** Two sign changes (− + −) produce roots at −8% AND +41%; quoting 41% is storytelling with a favorite root (and the −8% twin is the tell that the whole exercise was theater). NPV-at-hurdle +2.8 is thin (PI 1.05) with a closure-cost decree: **refit must hold ≤ ₹81L** (every ₹1L of overrun beyond destroys ~₹0.80L NPV). Verdict: **parking lot** — return with a fixed-price refit contract; not on this ₹35L.
2. No-option PI = 29/25 = 1.16; with put priced: (25+7)/25 = **1.28**. The clause isn't decoration — it's the difference between Door 2 as a decent candidate and Door 2 as the **anchor project**, because the put puts a floor under the state's 50% left-tail. Priority: funds-condition on the clause being contractual (fixtures on a resale framework, exit timetable in the memo).
3. Bundle math (NPVs): 1+2 = 0.10 + 7.0 = **7.1** (₹35L used). 2+3 = 7.0 + 1.69 = **8.69** (₹30L used, ₹5L free). 1+3 = 1.79 (₹15L). **Optimal: Doors 2+3 (₹30L, NPV ₹8.69L) — and leave ₹5L uncommitted as contingency/buffer per CB5's lesson that idle capital beats thin bonds** (Door 1's +0.10 NPV rides on unmeasured savings — below the evidence bar). The ₹5L release valve also arms the scale option on the dark store if demand resolves high (CB4 staged-tranche logic folded into governance). **Foregone: Door 1, deferred pending its ₹2.96L savings decree being metered by Q2 — deferral, not death.**
4. **Door 2:** abandon if daily orders < 280 for 2 consecutive quarters with salvage 16 > continue-PV (priced each quarterly review); scale-gate: orders ≥ 520/6wk → expansion tranche conversation (the ₹5L buffer). **Door 3:** freeze code-cutover if chain shrinkage savings track < ₹1.78L/yr by month 6 (rollback plan in the repo); scale-gate: savings ≥ ₹2.5L → phase-2 WMS analytics. **Door 1 (deferred):** sanction contingent on metered savings ≥ ₹2.96L in the Q2 spoilage audit.
5. Chair memo: *"We fund Dark-Store #3 (₹25L, NPV +₹7.0L with the put contractual) and the Software Rewrite (₹5L, NPV +₹1.69L, IRR 27%), leaving ₹5L uncommitted as the dark-store scale-buffer and contingency — combined NPV +₹8.7L, the best feasible bundle. We forego the Machine Upgrade today (NPV +₹0.1L on unmeasured savings) and park the Warehouse Expansion (sign-flip flows, IRR inadmissible at roots −8%/+41%, closure decree pending). Knowns-unknowns: Door 2's demand is a coin flip we insured with a ₹16L salvage put; Door 3's savings are metered; Door 1's are not. Full review: first-quarter post-sanction audit, owners and decrees attached."*

---

## 💪 Exercises

1. **Ranking.** Pure-NPV ordering of the three doors; then the rationing-optimal bundle. Why do they differ?
2. **Option accounting.** Exactly where in the committee sheet does the dark-store put appear — and why does it belong in NPV rather than as a "risk discussion note"?
3. **Defuser drill.** The warehouse sponsor re-presents: "refit cost guaranteed at ₹72L by contract — IRR is now unique at 19%." Re-price NPV@12% and the verdict.
4. **Evidence bar.** The machine sponsor asks why metering matters if NPV is positive at the claimed ₹3L savings. Answer with the rule's logic in two sentences.
5. **Series-close.** In three lines, trace one single ₹100 note from CB1 to the chair memo: how each module touched it.

### ✅ Selected answers

1. NPV order: Door 2 (7.0) > Door 3 (1.69) > Door 1 (0.10). Bundle-optimal: 2+3 (8.69) — which happens to agree on the top two, but the **reason is rationing-arithmetic, not ranking**: 1+2 burns the entire ₹35L for 7.1 while 2+3 buys more NPV for ₹5L less. Ranking answers "which projects are good?"; bundling answers "which combination is best?" — capital scarcity makes them different questions (CB5's crown-vs-heuristic law).
2. In the sheet's **NPV line itself**: Dark-store-with-put NPV +₹7.0L (vs +₹4.0L naked), PI recomputed on it. It belongs there because the clause is **contractual and priced** (fixtures on resale framework, exit timetable), not aspirational: an option whose trigger, strike, and enforceability are in the memo is cash-flow architecture; one that's a talking point is décor (CB3's strategic-essential cage for unstructured claims).
3. Re-run terminal: −60 + 140/1.12 − 72/1.2544 = −60 + 125 − 57.4 = **+₹7.6L @12%, PI 1.13** — admissible mathematics. But two checks remain: (a) the sign pattern is STILL − + −, so the sponsor's "unique IRR 19%" claim remains inadmissible (certainty of the closure amount doesn't unflip the signs); (b) the real sensitivity is now the CONTRACT's enforceability, not the estimate. Verdict: **admissible for the NEXT budget cycle** — this cycle's ₹35L is already allocated: budget timing belongs in every committee verdict.
4. *"Because unmeasured NPV-positives are the optimism-bias nursery (CB6: decks self-grade at hurdle + epsilon by tradition). The evidence bar isn't conservatism — it's the committee's demand that the one assumption carrying the verdict be proven at pilot scale before the other ₹10L follows."*
5. CB1 counted the ₹100 only if it moves (incremental law); CB2 cut it three ways (outlay/shield/terminal) with tax's fingerprint on each; CB3 priced its time at 12.14%; CB4 stressed its survival and priced its escape routes; CB5 ranked its rivals for the ₹35L seat; CB6 named its owner and its audit date. The chair memo is the note's passport: it travels, conditional on decrees, with a return date for review.

---

## ❓ Quiz

**Q1.** The committee's optimal allocation of ₹35L was:
(a) Doors 1+2 — exact budget usage wins
(b) Doors 2+3 at ₹30L, NPV ₹8.69L — leaving ₹5L as buffer/scale option; Door 1 deferred for unmeasured savings, because thin NPV on unproven drivers fails the evidence bar regardless of sign
(c) Door 2 alone — concentrate on the biggest NPV
(d) All three — bankers can stretch budget

**Q2.** The Warehouse Expansion (IRR claims 6% AND 35%) was ruled by:
(a) averaging the IRRs to 20.5%
(b) dismissing IRR (two sign flips → multiple roots), ruling on NPV@12% (+2.8, thin), and demanding a closure-cost contract as the decree — which, when produced at ₹72L, re-priced it to +7.6 admissibly for the next cycle
(c) accepting the 35% IRR the sponsor preferred
(d) rejecting forever

**Q3.** The Software Rewrite ranked highest on PI (1.34) yet the chair's memo still gated it because:
(a) software is intangible
(b) every funded project exits the committee with a kill/scale/evidence decree — shrinkage savings ≥ ₹1.82L tracked by month 6, rollback ready; PI ranks projects, decrees govern them
(c) 27% IRR sounded too good
(d) PIs are meaningless under ₹40L budgets

### ✅ Answers

1. **(b)** — exact-spend is a vanity metric; bundle-NPV plus evidence gating is the craft. The ₹5L buffer doubles as the dark-store scale-option funding (CB4 staging made flesh): idle-committed capital bought a second decision for free.
2. **(b)** — the defuser drill closed properly: no favorite roots, NPV-at-hurdle first, then the contract that converts estimate-risk into enforceable arithmetic. Committees that learn this once stop fearing sign-flip projects and start pricing them.
3. **(b)** — this is the whole CB recipe in one answer: analytics (NPV/PI) picks the menu, governance (memos, decrees, audits) chooses how dinner is eaten. A 27% IRR with a rollback plan is a stronger project, not a suspicious one — strong numbers with weak governance is precisely how ₹5L rewrites become ₹50L archaeology.

---

## ✅ Mastery checklist

- [ ] I run all eight committee moves in order and never let a deck skip one
- [ ] I defanged the sign-flip project: IRR excused, NPV-at-hurdle, closure decree
- [ ] I priced the put into NPV (₹7.0L with abandon, 1.28 PI) and made it contractual
- [ ] I rationed by bundles under evidence gates: 2+3, ₹30L, +₹8.69L
- [ ] I signed the chair memo: combination, foregone, knowns-unknowns, review date

**🎓 INTERVIEW FORGE — Capital Budgeting:**

1. *"Walk a ₹25L proposal from slide to sanction."* → (8 moves; poisons out; blocks in; hurdle receipt; decree; option; memo; audit date)
2. *"Sponsor's IRR clears hurdle by 0.05%. Reaction?"* → (straight-line optimism; sensitivity grid first, sponsor ledger second, evidence decree third)
3. *"When is NPV wrong?"* → (unequal lives → EAA; rationing → bundles; sign flips → still NPV-but-only-judge; never 'wrong', but needs the right question+constraints honored)
4. *"Why do big projects overrun ~2x and what structurally stops yours?"* → (reference-class budgets, risk-class contingency, staged tranches, fixed-price legs; base rates beat blueprints)
5. *"The classic committee fumble."* → (raw-NPV cross-life comparisons; PI-greedy budget stops; favorite IRR roots; sunk-cost honor guards — one craft answer each)

---

🏆 **COURSE COMPLETE — 🏗️ Capital Budgeting.** You entered as a reader of decks; you leave as the chair that signs them. Machines priced, options bound, budgets rationed, audits scheduled, promoters annotated.

🎓 **FINANCE CORE COMPLETE — 13 of 13.** Accounting → Corporate Finance → Behavioural Finance → Derivatives → Financial Statement Analysis → Fixed Income → Indian Market → Economics → Portfolio Management → Ratio Analysis → Time Value of Money → Wealth Management → Capital Budgeting. From journal entries to the capital committee: the full professional arc, end to end, exactly as you demanded. **You are the finance world's expert now — go use all of it.**
