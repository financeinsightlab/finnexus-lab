# 🎯 CB4 · Appraisal Under Uncertainty & Real Options

> Every capex model is one point estimate wearing a 50-page costume. Professionals ask: *which assumption kills it, and what escapes exist if reality misbehaves?* Sensitivity, scenarios, breakevens — then the quiet upgrade most decks skip entirely: projects carry embedded options (abandon, expand, delay), and options have value. The DV course's machinery, wearing a hard hat.

---

## 🎯 Objectives

- Build one-variable sensitivity grids and name the swing driver of any model
- Run 3-state scenarios (base/downside/upside) with probabilities and expected NPV
- Compute NPV breakevens (the value of the key driver at NPV = 0)
- Price the three real options — abandon, expand, delay — with decision trees
- Connect option value to the hurdle-gaming defense from CB3

---

## 📘 Concepts

### 4.1 Sensitivity — one table, one swing driver

Vary one input ±10-20%, hold the rest, watch NPV swing. Cold-chain lab inheritance (CB2): NPV −0.11 at savings ₹2.2L; **+₹0.35L at ₹2.35L** — savings ±7% flips the sign → savings IS the swing driver (try the same ± on NWC/recovery/salvage: barely a twitch). The grid converts a 50-page model into a 5-row truth table and one sentence: *"this project lives or dies on measured spoilage savings — everything else is décor."* Protocol: sensitivity on the top 3 assumptions always; anything that flips NPV inside ±10% gets red-flagged as **evidence-required** (meter before machinery).

### 4.2 Scenarios — the world has more than two settings

States with probabilities, not fantasies. Cold-chain 3-state: **Base (50%):** savings 2.2 → NPV −0.11; **Down (35%):** savings 1.9 → OCF = (1.9 − 1.333) × 0.7483 + 1.333 = 1.757 → NPV = 1.757 × 4.1114 + 0.73 − 9.0 = −1.05; **Up (15%):** savings 2.6 → OCF = (2.6 − 1.333) × 0.7483 + 1.333 = 2.281 → NPV = 2.281 × 4.1114 + 0.73 − 9.0 = +1.11. **E[NPV] = 0.5×(−0.11) + 0.35×(−1.05) + 0.15×(1.11) = −0.055 − 0.368 + 0.167 = −₹0.26L** → deeper reject: base-case breakeven-ish, expected negative, and 85% of probability mass underwater. The scenario table's real output isn't the number — it's the sentence: **"this is a coin-flip project whose coin is loaded −₹26k against us."**

### 4.3 NPV breakeven — the question boards actually ask

Not "what's the NPV?" but **"what must the driver be for NPV = 0?"** Cold-chain: solve OCF × 4.1114 + 0.73 − 9.0 = 0 → OCF = 2.011 → savings s.t. (s − 1.333) × 0.7483 + 1.333 = 2.011 → s = **₹2.24L** (vs proposed 2.2 — the project needs only +₹4k/yr improvement: *micro-breakeven* — which is CB2's flip at 2.35 confirmed in mirror). Breakevens reframe appraisal into operations-language: procurement hears "your spoilage measurement must prove ≥ ₹2.24L/yr net" far more clearly than "NPV −0.11." **Translate every borderline project into its breakeven decree** — the desk's most persuasive output.

### 4.4 Real options — the hidden call options in brick and mortar

Static NPV assumes you launch and endure; reality lets you *react*. Three embedded calls, priced with decision trees (the DV binomial's cousin):

1. **Abandon (the put):** Dark store: −₹40L; year-1 resolves 50/50: good → PV continues ₹90L / bad → PV ₹20L. Static NPV = 0.5×90 + 0.5×20 − 40 = **+15**. But management can **sell fixtures for ₹35L in the bad state** — with abandon: 0.5×90 + 0.5×35 − 40 = **+22.5 → option value ₹7.5L of pure flexibility.** Never forced to play out bad scenarios to the bitter end: the put is real, and ignoring it systematically UNDER-values projects with salvageable assets.
2. **Expand (the call):** pilot first (₹5L pilot → if demand proves ≥X, scale for ₹25L into an NPV ₹35L venture; else walk): staged capital converts a ₹30L blind bet into a ₹5L option premium + ₹25L exercised call. Quick-commerce, EV lines, new geographies — pilot architecture is options thinking with a procurement process.
3. **Delay (the timing call):** the land deal: build now → NPV +₹10L; wait 1y for regulation clarity → NPV +₹13L in 80% of worlds, and you can STILL build in the bad 20% → value at least 0.8×13 + 0.2×10 = **+₹12.4L > +10: option to wait beat immediate NPV by ₹2.4L.** "Do nothing yet" has a price tag too (competitors, window costs) — options thinking prices BOTH directions.

### 4.5 The law of flexibility — and its honesty check

Option value ↑ with **volatility** (more variance, more upside extraction — the vega lesson retold in bricks), **staged structure**, and **recoverable assets**. It collapses with all-or-nothing construction and zero salvage. Honesty check (CB3's strategic-essential card redeemed properly): real options VALUE the strategy when staged and real — a manager who names the option (abandon at ₹35L, expand at demand-gate X) and binds it in the sanction memo gets credit POINTS; one who merely waves "strategic importance" gets the CB3 cage. **Flexibility belongs in the model with a price on it, not in the mood of the room.**

---

## 🧪 LAB — Stage the CloudKitchen Platform (10 min)

**Setup:** ShopKart considers a ₹60L cloud-kitchen build (margins tight, demand ambiguous). Structures on the table:
- **A — All-in now:** −60; demand resolves end-year-1: High (40%) → PV inflows ₹110L; Base (40%) → ₹55L; Low (20%) → ₹15L. Abandon at year-1 sells kitchen assets for ₹28L (usable in Base/Low? only in Low you bail).
- **B — Pilot:** −₹8L pilot kitchen first; year-1 demand resolution same probabilities; then option to scale for −₹52L into the same ₹110L High/₹55L Base outcomes (in Low you never scale).

**Do this:**
1. Structure A with NO abandon: NPV. With abandon (Low state sells at ₹28L): NPV. Option value?
2. Structure B: decide when you scale (never in Low); NPV of the staged plan (scale builds cash flows by year-2 — approximate both scaling pathways' PV inflows as measured AT the scaling date). Decision?
3. Name the option(s) purchased by the ₹8L pilot premium, and the break-even logic for choosing B over A-with-abandon.
4. Sensitivity decree: write the one breakeven translation — what demand probability (High share) makes A-no-abandon zero-NPV? (Blend Base/Low 50-50 within the non-high states.)
5. The promoter, fond of structure A, calls the pilot "indecision with extra steps." Two-sentence reply.

**Why this matters:** This is modern capex: cloud kitchens, quick-commerce slots, EV lines — high-variance, demand-ambiguous, salvageable-asset worlds where bundled NPV misprices and staged options price right. The lab turns the academy's full DV toolkit (binomials, vega intuition) into procurement policy.

**🔑 Lab answers:**
1. A no-abandon: 0.4×110 + 0.4×55 + 0.2×15 − 60 = 44 + 22 + 3 − 60 = **+₹9L** (positive). With abandon at Low: 44 + 22 + 0.2×28 − 60 = **+₹11.6L → abandon-put = ₹2.6L**.
2. B: cost 8 + expected scale-outlay & inflows *only when demand isn't Low*: High: 0.4 × (110 − 52) = 0.4×58 = 23.2; Base: 0.4 × (55 − 52) = 1.2; Low: 0.2 × 0 = 0 → **NPV = 24.4 − 8 = +₹16.4L.** **Decision: B beats A-with-abandon (16.4 > 11.6) by ₹4.8L** — the pilot is a better option than the salvage clause.
3. The pilot buys **two calls** — expand-into-High and expand-into-Base (still +3 net) — and a **free walk-away in Low** (the put's twin: never pay ₹52L into a ₹15L world). Break-even logic: the structure change pays for itself whenever the avoided Low-state damage exceeds the premium. Here the avoided damage is already inside the NPVs — B beats A-no-abandon by ₹7.4L (0.2 probability × the ₹37L Low-hole: −45 vs −8) and A-with-abandon by ₹4.8L (the salvaged version only escapes to −32). The pilot dominates at any premium that keeps pilot + scaling commitments below the bundled bet in the bad world.
4. A no-abandon zero: p×110 + (1−p)×0.5×(55+15) = 60 → p×110 + (1−p)×35 = 60 → 110p + 35 − 35p = 60 → 75p = 25 → **p = 33.3%** — the board decree: *"structura A is zero-NPV exactly when High-demand odds equal one-in-three; the pilot exists because we refuse to guess whether it's 40 or 25."*
5. *"Indecision is free; pretending certainty costs ₹60L minus a coin toss. The pilot buys information for ₹8L that the market will sell us for ₹60L otherwise — it's not extra steps, it's cheaper truth."*

---

## 💪 Exercises

1. **Grid.** Project: NPV +₹5L at driver values (sales 100, margin 20%, life 5y). Recompute NPV ±10% on each: which red-flags as evidence-required if only one assumption can flip the sign?
2. **E[NPV].** States: Good (30%) NPV +40; Base (50%) −2; Bad (20%) −25. Compute E[NPV] and the one-line verdict.
3. **Breakeven decree.** NPV = −3 at price-driver x = 80; sensitivity shows NPV +1 per +2 units of x. The decree?
4. **Option ID.** Classify: (a) land bank held idle for rezoning; (b) 200-store target with a 10-store pilot and demand gates; (c) a plant lease with a buy-out-at-market clause in year 3.
5. **Flexibility law.** Why is option value highest when the underlying is MOST volatile — and why does that make sponsors suddenly love variance they feared in Module TV4?

### ✅ Selected answers

1. Suppose sensitivity gives: sales ±10% → NPV +9/−1; margin ±10% → +6/−3; life ±1y → +7/−4. **Sales is the swing driver** (−10% flips sign: +5 → −1) → sales evidence (contracts, LOIs, anchor-tenant letters) is required BEFORE sanction; margin and life move but don't kill → monitor, don't gate. The grid's entire job: find the assumption deserving a measurement budget.
2. E[NPV] = 0.3×40 + 0.5×(−2) + 0.2×(−25) = 12 − 1 − 5 = **+₹6L** — positive expectation, BUT: 70% of the probability mass is at-or-below −2 with a −25 tail: verdict *"fund only with a downside structure — abandon clause, staged tranche, or insurance overlay; naked, this is a +6 average with a broken left leg."*
3. Decree: **"NPV zeroes at x = 86: sanction only if price/coverage evidence supports ≥ 86, with a hard re-review at the first data print below 84."** Boards don't debate NPV — they sign decrees; translate every model into one before the meeting.
4. (a) **delay option** (timing call on the zoning uncertainty); (b) **expand call + abandon put** in series (pilot-gated staging); (c) **abandon put** (market-price exit = salvage floor). Option-sighting is a discipline: every capex proposal should state its embedded options on page one, priced or explicitly "assessed nil."
5. Because the option only pays the *upside* half of variance — volatility enlarges the good states you capture while the walk-away caps the bad ones at the strike (vega logic, DV2-DV8: more σ, fatter right tail you already own; the left tail is somebody else's problem under the contract). Sponsors fear variance under bundled-obligation structures and should ADORE it once staging converts the downside into a contract clause: same uncertainty, different contract, different value. That's the whole craft in one sentence.

---

## ❓ Quiz

**Q1.** A sensitivity grid shows NPV flipping sign only when sales drop 10% (other drivers inert). The desk output is:
(a) Reject — project is risky
(b) Evidence-required red-flag on sales: sanction contingent on contracts/LOIs proving the base, because ONE assumption carries the verdict
(c) Approve — only one risk driver
(d) Raise the hurdle 2%

**Q2.** The dark-store abandonment option (₹35L salvage in the bad state vs ₹20L continue) adds value because:
(a) salvage is free money
(b) it converts bounded patience into a priced put: 0.5×(35−20) = ₹7.5L of flexibility that static NPV never counted
(c) it raises the hurdle
(d) it offends no one

**Q3.** Pilot-first structure B outperformed all-in A-with-abandon (₹16.4L vs ₹11.6L) because:
(a) pilots are trendy
(b) the ₹8L premium purchased information about demand before ₹52L committed — buying truth cheaper than the market sells it
(c) structure A had no IRR
(d) Low state disappears under B

### ✅ Answers

1. **(b)** — the grid's purpose is triage: it finds the assumption that deserves measurement budget. Rejecting on "risk" alone throws away margin-rich projects with measurable drivers; approving without evidence outsources the company's money to the sponsor's forecast smile.
2. **(b)** — a put with strike ₹35L against continuing at ₹20L: the put pays only in the bad state, exactly where static NPV bleeds. Salvage clauses, staged exits, equipment with secondary markets — every one is quiet optionality the bundled model treats as footnotes and the options lens reprices as value.
3. **(b)** — resolution of uncertainty is an asset class: High/Base/Low became a decision menu instead of a destiny. The pilot is the capex version of buying a look at the cards; the promoter framing ("indecision") mistakes information-gathering for weakness — the spreadsheet disagrees by ₹4.8L.

---

## ✅ Mastery checklist

- [ ] I produce one-variable grids on the top-3 assumptions and name the swing driver
- [ ] I run 3-state E[NPV] and report the downside mass, not just the mean
- [ ] I translate borderline models into breakeven decrees boards can sign
- [ ] I price abandon/expand/delay with decision trees (₹7.5L dark-store put canon)
- [ ] I treat "strategic" as a priced options line, never an unsourced mood

**Next:** CB5 solves the special problems — **EAA for unequal lives, capital rationing with PI vs bundles, replacement economics, and lease-vs-buy** — the question-set where even good NPV thinkers quietly fumble.
