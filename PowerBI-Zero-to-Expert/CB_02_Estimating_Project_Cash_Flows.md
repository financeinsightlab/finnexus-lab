# 🎯 CB2 · Estimating Project Cash Flows — Building the Model Line by Line

> Fundamentals first: a capex model is not an accounting schedule — it's three blocks of cash with a clock on each. Initial outlay (day 0), operating flows (years 1-n), terminal flows (the last page). This module assembles all three for ShopKart's machine and shows why the full tax-dragged model always humbles the headline deck.

---

## 🎯 Objectives

- Structure any project into outlay (capex + NWC + installation), operating (OCF), and terminal (salvage + NWC return)
- Build OCF the professional way: (EBIT − tax) + depreciation, understanding the shield
- Inflate logically: nominal flows, nominal rate — consistency is the whole law
- Model the full ShopKart machine: TV4's +₹0.81L headline → the honest +₹0.10L
- Sanity-check models: sign discipline, year-0 purity, terminal triple-check

---

## 📘 Concepts

### 2.1 The three blocks — every project fits

**Block 1 — Initial outlay (t=0, almost always negative):** capex + installation/commissioning + **net working capital (NWC) build** − any sale of displaced assets (+ tax effects thereon). ShopKart machine: −₹10L equipment −₹0.5L installation −₹1.5L NWC (spares + float) = **−₹12.0L day-0**. The NWC piece is the most-forgotten: machines need stock, spares, and receivable float to run (RT3's cycle never sleeps), and growth projects need it in multiples (₹17.0L growth tax, CB1 canon).

**Block 2 — Operating flows (t=1..n):** the annual annuity from running the thing.

**Block 3 — Terminal flow (t=n):** salvage (after tax on any book-profit) + **NWC recovery** (the cycle unwinds: stock sells, receivables collect — the ₹1.5L comes home) + closure costs (negative, and CB's multiple-IRR trap birthplace when big).

### 2.2 OCF — the shield that pays for arithmetic

**OCF = (Incremental revenues − incremental cash costs − depreciation) × (1 − t) + depreciation**, or compactly: **EBIT × (1 − t) + Dep**. Depreciation never moves cash — yet it *earns* cash by shrinking taxable profit: **tax shield = Dep × t**. ShopKart machine: ₹10.5L depreciable (equipment + installation), 5-y straight-line to ₹0.5L book → dep = (10.5 − 0.5)/5 = **₹2.0L/yr** → shield = 2.0 × 0.2517 = **₹0.50L/yr of government-funded cash flow**, every year, legally and without a customer in sight. Two dep methods worth naming: straight-line (clean pedagogy) vs India tax-book WDV (15%/40% class blocks — bigger EARLY shields → timing NPV-positive; models should use WDV for real money). The shield logic also explains the cart-pulling-the-horse trap: never judge a project by "reported profit" lines; the machine's truth is tax-adjusted cash.

### 2.3 Inflation consistency — the nominee rule

**Nominal flows → nominal discount rate; real (today's-₹) flows → real rate (5.66% at 12%/6%, TV5 canon).** Killers in each direction: inflating savings while discounting at a real rate double-counts inflation; deflating flows while using the WACC (nominal) strips it twice. Marker for messy sponsors: a model where only COSTS inflate and revenues stay "conservative" — that's not conservatism, it's a pre-committed rejection dressed as rigor. ShopKart convention (this course): flows in year-₹ (nominal, with escalation where it truly exists), discounted at nominal WACC ~12%.

### 2.4 The full machine — TV4 headline vs honest model

Same machine, two lenses: **TV4 headline**: −₹10L, +₹3L/yr pre-tax savings × 5y @ 12% → NPV **+₹0.81L**. **CB2 full model**: outlay −₹12.0L (incl. NWC + install); dep ₹2.0L; pre-tax savings ₹3L → EBIT = 1.0 → tax 0.2517 → NOPAT 0.7483 → **OCF = 2.7483/yr ≈ ₹2.75L**; PV(OCF) = 2.75 × 3.6048 = 9.91; terminal: salvage ₹0.8L (book 0.5 → tax on gain 0.3 × 0.2517 = 0.08 → net 0.72) + NWC back ₹1.5L = 2.22 → PV = 2.22/1.7623 = 1.26. **NPV = 9.91 + 1.26 − 12.0 = −₹0.83L.** The classy way to say it: including installation/NWC with the SAME ₹3L savings card → the project swings NEGATIVE (−0.83 vs +0.81) — *the two lurkers (NWC build + install) plus honest depreciation/tax flipped the verdict*. This is exactly why sponsor decks prefer Headline World. (And CB4 will show the fix: the machine at ₹3L savings is borderline; it becomes fundable either at ₹3.4L savings or with a 6th-year extension — borderline projects live and die on operating detail, which is where capex analysts earn their desks.)

### 2.5 Model hygiene — the five reflexes

1. **Year-0 purity:** outlay items at t=0 only; an EMI-style vendor credit splits the outlay across years honestly at the financing rate, not the WACC.
2. **Sign discipline:** outlays negative, inflows positive, closure costs negative — print the NWC line twice (build AND recovery) before trusting any sheet.
3. **After-tax everything:** tax at the marginal rate (25.17% canon), including salvage gains.
4. **Terminal triple-check:** salvage net-of-tax + NWC return − closure = many models' silent killer; sign errors here live forever.
5. **One sensitivity minimum** (CB4 formalizes): if NPV flips within ±10% of the key driver, the project isn't "approved" — it's *pending operating proof*.

---

## 🧪 LAB — Build ShopKart's Cold-Chain Unit, Line by Line (10 min)

**Setup:** Proposal: cold-chain upgrade for ₹8L equipment + ₹0.4L install, 6-year life, straight-line to ₹0.4L book (depreciable base 8.4L → dep = (8.4 − 0.4)/6 = **₹1.333L/yr**); savings: spoilage cut ₹2.6L/yr + incremental freight ₹0.4L/yr (net cash saving ₹2.2L pre-dep); NWC build ₹0.6L (returns at end); salvage ₹1.0L expected; tax 25.17%; WACC 12%; 6y annuity factor 4.1114; DF(6y,12%) = 0.5066.

**Do this:**
1. Lay out t=0 outlay in full.
2. Compute annual OCF (EBIT → NOPAT → +dep) and the dep tax shield explicitly.
3. Compute terminal flow (salvage net of tax on book-gain + NWC return).
4. Assemble NPV and verdict — then state the ONE driver that mostly decides this project.
5. The sponsor wants to use the tax-book WDV rate (40%) for depreciation. Direction of NPV change, and why the answer is "use it" for the real model.

**Why this matters:** This lab is the exact template used in analyst seats: three blocks, one shield, one verdict, one named swing-driver. Walk it twice — once with fingers on the numbers, once asking *which line would a sponsor fudge* (in this deck: the ₹0.4L freight is a real ongoing cost, and the "savings" always arrive shinier before the installer leaves).

**🔑 Lab answers:**
1. **t=0:** −8.0 (equipment) −0.4 (install) −0.6 (NWC) = **−₹9.0L**.
2. EBIT = 2.2 − 1.333 = 0.867 → tax = 0.867 × 0.2517 = 0.218 → NOPAT = 0.649 → **OCF = 0.649 + 1.333 = ₹1.98L/yr ≈ ₹1.98L**. Shield = 1.333 × 0.2517 = **₹0.336L/yr** — the government pays ~17% of your annual cash flow via depreciation.
3. Book at end = 0.4; salvage 1.0 → book gain 0.6 × 0.2517 = tax 0.151 → net salvage 0.849; + NWC 0.6 → **terminal = ₹1.45L**.
4. PV(OCF) = 1.98 × 4.1114 = 8.15; PV(terminal) = 1.45 × 0.5066 = 0.73; **NPV = 8.15 + 0.73 − 9.0 = −₹0.11L → REJECT as proposed.** Swing driver: the **net saving ₹2.2L** — at ₹2.35L saving the after-tax flow gains 0.15 × 0.7483 = +0.112/yr, lifting NPV by 0.112 × 4.1114 = +0.46 → **+₹0.35L: the verdict flips**. Borderline again: procurement proof-of-savings (meter the spoilage for a quarter FIRST) is the real appraisal here.
5. WDV 40% pulls shields forward: year-1 shield = 8.4×40%×0.2517 = **₹0.846L** vs SL's 0.336 — earlier cash = higher NPV (TVM's arrow favors the near rupee: direction **NPV rises ~₹0.7-0.9L** here — likely flipping the verdict to positive!). "Use it" because the tax shield is statutory reality: model what the taxman actually allows, not what flat-lines nicely on slides. *And this is the lesson:* honest depreciation timing can matter as much as the operating pitch itself.

---

## 💪 Exercises

1. **Blocks.** A project shows: capex −50, install −5, NWC −8, salvage +4 (book 3), NWC back +8, OCF +14/yr for 5y @12% (factor 3.6048, DF5 = 0.5674). NPV?
2. **Shield vs smoke.** The CEO asks "why does this model credit us ₹0.5L/yr of 'shield' — no customer pays that." Explain in two sentences.
3. **Inflation test.** Sponsor: savings escalate 6%/yr but discounted at "WACC minus inflation = 6%" to be conservative. Diagnose the double error in one line each.
4. **NWC forgetting.** Pitch: "Just ₹10L equipment, ₹3L/yr contribution, trivial working capital." Name the two questions that expose the NWC build anyway.
5. **Terminal traps.** Project with ₹5L environmental closure cost at year 5: where does it sit, what does it do to the cash-sign pattern, and which TV4 trap does it risk?

### ✅ Selected answers

1. Outlay = 50 + 5 + 8 = **−63**. Terminal: salvage net = 4 − (4−3)×0.2517 = 3.748 + 8 (NWC) = **11.748** → PV = 11.748 × 0.5674 = 6.667. OCF PV = 14 × 3.6048 = 50.467. **NPV = 50.467 + 6.667 − 63 = −₹5.87L → reject.** (Try to see the NWC recovery 8 isn't a "gain" — it's your own ₹8 coming home from the cycle.)
2. *"The shield isn't revenue — it's taxes NOT paid: depreciation is a non-cash cost the taxman honors, so Dep × 25.17% of cash stays with us instead of going to the treasury. No customer pays it; Parliament effectively does, annually."*
3. (1) **Even the "real rate" is mis-computed** — real = 1.12/1.06 − 1 = 5.66%, not 6% (TV5's exact-division discipline): two errors before line one of the business case. (2) **Escalated (nominal) flows demand the nominal 12% rate** — pairing inflation-loaded savings with an inflation-stripped rate is inconsistency by design: the project fails for arithmetic reasons, not business ones. Consistency law: nominal↔nominal, real↔real, never a remix.
4. (1) *"Spares, consumables stock, and maintenance float — what balance must we hold at steady state, in rupees?"* (2) *"Do customers for this output pay after delivery — and if so, how many DSO days attach to the new contribution?"* (RT3 canon: every rupee of credit sales carries 74/365 of cycle cost.)
5. It sits in the **terminal flow as −₹5L**, flipping the sign pattern to **− + − (two sign changes) → multiple-IRR territory (TV4's trap 2: the machine/mine signature)**. Order of the court: IRR excused, NPV-at-hurdle rules, sensitivity on the closure estimate demanded.

---

## ❓ Quiz

**Q1.** ShopKart's full machine model moved TV4's +₹0.81L headline to −₹0.83L mainly because:
(a) markets fell
(b) the honest model adds installation + NWC build at t=0 and taxes the operating flows while crediting the dep shield — lurkers that headline decks leave out
(c) depreciation is fake
(d) 12% is too high

**Q2.** The depreciation tax shield of ₹0.336L/yr on the cold-chain unit means:
(a) Depreciation generates cash sales
(b) The non-cash depreciation line shrinks taxable profit, so ₹0.336L of cash that would have gone to taxes stays with the project annually
(c) Salvage must be ignored
(d) NWC is tax-free

**Q3.** The correct inflation rule for project models is:
(a) Always deflate everything to today's money
(b) Nominal flows with nominal rates or real flows with real rates (5.66% at 12%/6%) — never mix; inconsistency is a pre-committed verdict
(c) Use 6% when unsure
(d) Inflation doesn't exist in stable economies

### ✅ Answers

1. **(b)** — −1.5L NWC −0.5L install at t=0, taxes taken out of rich-looking pre-tax savings, shield credited honestly, terminal repatriated: verdict flips −0.83 vs +0.81. Projects near zero NPV are where capital budgeting earns its salary: the borderline IS the battlefield.
2. **(b)** — shields are timing-sensitive cash: WDV front-loads them (year-1 ₹0.846L vs SL ₹0.336L) and NPV rises with the arrow. The shield is why "depreciation method" appears in capex committees and not just audit notes.
3. **(b)** — remixing inflates or deflates precisely the number the decision stands on; the sponsor who escalates savings at 6% while discounting at 6% has secretly doubled the project's difficulty. Consistency is free; discipline is why so few models have it.

---

## ✅ Mastery checklist

- [ ] I structure every project as outlay / OCF / terminal, with NWC built AND recovered
- [ ] I build OCF = EBIT(1−t) + Dep and quote shields in ₹ explicitly
- [ ] I use tax-book WDV in real models and SL in teaching models — and know the NPV direction
- [ ] I enforce inflation consistency: nominal↔nominal (or real↔real at 5.66%)
- [ ] I terminal-check for closure costs & the sign-flip trap, every model

**Next:** CB3 prices the hurdle itself — **cost of capital**: WACC built from Ke (CAPM 13.5%) and after-tax Kd, target vs book weights, divisional rates, and how hurdle rates get gamed by the very people presenting to you.
