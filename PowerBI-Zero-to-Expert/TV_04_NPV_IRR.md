# 🎯 TV4 · NPV & IRR — The Two Judges of Every Project

> Should ShopKart buy the ₹10L machine? Should the board approve the plant? Should you do the MBA? Every capital decision on earth is the same question: a pile of cash out, a stream of cash in, and a price on time. NPV and IRR are the two judges who answer it — this module teaches you to seat them, hear them, and overrule them when they disagree.

---

## 🎯 Objectives

- Compute NPV = sum of PV(flows) − investment and apply the accept-if-positive rule
- Compute IRR as the discount rate that zeroes NPV; connect it to the rate-pivot instinct
- Read the NPV profile and handle multiple-IRR and scale-blindness traps
- Use MIRR and discounted payback as the honest assistants
- Bridge to XIRR: Netflix-subscription-of-the-mind for irregular personal cash flows

---

## 📘 Concepts

### 4.1 NPV — the judge that speaks rupees

**NPV = Σ CFₜ/(1+r)ᵗ − Investment.** The machine canon: buy ₹10L, saves ₹3L/yr for 5y, hurdle 12%: NPV = 3 × annuity(12%, 5) − 10 = 3 × 3.6048 − 10 = 10.81 − 10 = **+₹0.81L** → accept: the project pays its 12% rent on time AND tips ₹81k on top. One-line law: **positive NPV = the project beats your hurdle; accept. Negative = it pays less than time costs; walk away.** Zero = the project exactly earns the hurdle — shareholders are indifferent, which is precisely the definition of a fair price. NPV's deep strength: it speaks in *rupees of value created*, so it is directly comparable across projects of any size, shape, or timing — the only judge with that passport.

### 4.2 IRR — the judge that speaks percent

**IRR = the rate r that makes NPV = 0.** Same machine: solve 3 × annuity(r, 5) = 10 → **IRR = 15.24%**. Since 15.24% > 12% hurdle, accept — same verdict, spoken in percent. IRR's seduction: "the project returns 15.2%" feels like a fact about the world. Its hidden assumption: **interim cash flows get reinvested at the IRR itself** (15.24%!) — usually fantasy. Boards love IRR; CFOs respect NPV. Professionals quote **both**: IRR for the story, NPV for the truth. When they agree, life is easy. When they fight (next section), the NPV wins.

### 4.3 When the judges fight — trap season

**Trap 1 — scale blindness.** Project A: −₹10L, +₹16L in 1y → IRR 60%, NPV@12% = 16/1.12 − 10 = **+₹4.29L**. Project B: −₹50L, +₹68L in 1y → IRR 36%, NPV = 68/1.12 − 50 = **+₹10.71L**. IRR crowns A; NPV crowns B. If you can only fund one, **B creates 2.5× the rupees** — you can't spend percentages at the grocery store, you spend rupees. The fix: **incremental IRR** — analyze going A→B (extra ₹40L for extra ₹52L = 30% > 12% ✓): upgrade confirmed. Incremental IRR is IRR cured of its blind spot.

**Trap 2 — multiple IRRs.** Projects with sign-flipping flows (investment → profits → big closure cost, like a mine with environmental liabilities) can produce **two or zero IRRs** — the equation has as many roots as sign changes. NPV has exactly one answer at a given hurdle. **Any pattern where cash flips sign more than once: dismiss IRR from the courtroom.**

**Trap 3 — reinvestment fiction (the MIRR patch).** IRR's 15.24% reinvestment fantasy vs reality where you reinvest at ~12% and borrow at ~10%: **MIRR = (FV of inflows @ reinvestment rate / PV of outflows @ finance rate)^(1/n) − 1** = (19.06/10)^(1/5) − 1 = **13.77%** — between the two judges and honest about both rates.

### 4.4 Payback — the parole officer

**Simple payback** = 10/3 = **3.33 years**; **discounted payback** (using PV'd flows): cumulative PV crosses ₹10L at **4.52 years**. Payback measures *survival* (how long is my money exposed?), never *profit* — a project can pay back in year 1 and burn money thereafter, or pay back in year 4.5 and create ₹0.81L of NPV (ours does). Use it as a **risk screen** (reject paybacks beyond the technology's life) sitting beside NPV, never instead of it. The trio: NPV crowns, IRR narrates, payback vets.

### 4.5 XIRR — IRR for real humans

Your SIP doesn't flow annually — it drips ₹10k on random dates, then you redeem in chunks. **XIRR = IRR with actual calendar dates** (Excel's XIRR function; every mutual-fund app displays it). Date-weighting matters: a ₹24L-contributed, ₹98.93L corpus (TV2 canon) built over 20y reads as ~12% XIRR, and that's the number to compare against Nifty's XIRR — *your* personal hurdle. Portfolio truth-telling rule: **compare XIRRs (date-weighted), never absolute gains** — ₹10L profit means nothing until dates name its rate. This is why TVM isn't a corporate topic wearing a tie; it's the scoring system for every rupee you'll ever move.

---

## 🧪 LAB — Seat the Court: Machine, MBA, and Miracle (10 min)

**Setup:** (1) The ShopKart machine: −₹10L, +₹3L/yr × 5y, hurdle 12%. (2) An MBA: cost ₹28L (fees + foregone earnings compressed), raises income by ₹9L/yr for 10y, personal hurdle 12%. (3) "Miracle Infra": −₹100L, +₹230L in year 1, −₹131L closure cost in year 2 (signs: − + −), hurdle 10%.

**Do this:**
1. Machine: state NPV, IRR, MIRR (reinvest 12%), discounted payback. Verdict and one-line justification.
2. Compute the MBA's NPV and IRR. Now stress it: raise only ₹7L/yr. Where does the verdict flip?
3. Miracle Infra: compute NPV at 10%. Then compute NPV at 5% and at 25%. Notice something broken? Name the trap and the dismissal order.
4. Rank all three projects by NPV-at-hurdle. If forced to pick one, which creates most value per rupee of risk taken?
5. Your colleague: "We should fund whatever has the highest IRR." Write the two-sentence policy correction.

**Why this matters:** This is capital budgeting compressed to an evening — the same three species (honest annuity, lumpy human capital, sign-flipping monster) appear as machines, careers, acquisitions, and dams. Learn to seat this court and every future "should we?" question has a procedure, not a panic.

**🔑 Lab answers:**
1. NPV = **+₹0.81L**; IRR = **15.24%**; MIRR = **13.77%**; discounted payback = **4.52y**. Verdict: **accept** — clears the 12% hurdle on every honest measure, with payback inside the machine's 5-year life.
2. NPV = 9 × annuity(12%,10) − 28 = 9 × 5.6502 − 28 = 50.85 − 28 = **+₹22.85L**; IRR solves 9 × ann(r,10) = 28 → ann = 3.111 → **IRR ≈ 28%**. At ₹7L: NPV = 7 × 5.6502 − 28 = **+₹11.55L** — still strongly positive; it flips negative only below Δincome ≈ 28/5.6502 = **₹4.96L/yr** (≈ the breakeven raise). Human capital compounds too — and usually beats machines.
3. NPV@10% = −100 + 230/1.10 − 131/1.21 = −100 + 209.1 − 108.3 = **+₹0.83L**. NPV@5% = **+₹0.23L**, NPV@25% = **+₹0.16L** — all positive. But probe the edges: NPV@2% = −100 + 225.49 − 125.91 = **−₹0.42L** and NPV@30% = −100 + 176.92 − 77.51 = **−₹0.59L** — the sign flips TWICE: positive only between the two IRRs ≈ 3.8% and 26.2%. The same project is "good" at 10% and "bad" at both 2% and 30%, so no single IRR can describe it. **Trap: multiple IRRs (two sign changes). Dismissal order: IRR is excused; NPV at the hurdle rules — accept marginally at 10%, but demand sensitivity on the closure-cost estimate.**
4. NPVs: MBA **+₹22.85L** > miracle **+₹0.83L** > machine **+₹0.81L** — though miracle edges the machine on raw NPV, it is sign-flip fragile while the machine is a clean annuity. Value-per-risk ranking: MBA first (human capital, huge cushion), machine second (clean, modest), miracle last (NPV hostage to which discount rate you breathe).
5. *"IRR measures the slope of one project's story and ignores its size, its sign-pattern, and what reinvestment actually pays — 60% of nothing is nothing. Policy: we fund by NPV at the hurdle, using IRR only to narrate, incremental IRR to compare mutually exclusive options, and XIRR to score real-world dated flows."*

---

## 💪 Exercises

1. **Compute.** Project: −₹25L, +₹8L/yr × 4y, hurdle 11%. NPV, verdict, IRR range (annuity factor target)?
2. **Accept/reject reflex.** Fill: NPV > 0 → ___; IRR < hurdle → ___; NPV = 0 → ___.
3. **Trap ID.** Each belongs to which trap? (a) open-pit mine with restoration cost; (b) choosing the 60%-IRR ₹10L project over the 36%-IRR ₹50L project; (c) quoting 15.24% as if interim flows truly earn 15.24%.
4. **Incremental discipline.** Using §4.3's A/B: prove the upgrade A→B is justified incrementally and compute the incremental NPV gain vs adding it to A.
5. **XIRR reading.** You invested ₹5L: ₹2L three years ago, ₹3L one year ago; today worth ₹6.1L. Your friend invested ₹5L five years ago, now ₹7L. Whisper who actually did better and what number settles it.

### ✅ Selected answers

1. NPV = 8 × annuity(11%,4) − 25 = 8 × 3.1024 − 25 = 24.82 − 25 = **−₹0.18L → REJECT** (it just misses the hurdle). IRR: 8 × ann = 25 → ann = 3.125 → **IRR ≈ 10.8%** — just under 11%. The consistent miss (both judges slightly negative) is a clean borderline reject: ask for a price cut of ≥₹18k or a 5th year of savings.
2. NPV > 0 → **accept (it beats the hurdle and tips value)**; IRR < hurdle → **reject (story's rate below cost of time)**; NPV = 0 → **indifferent — the hurdle is exactly earned; decide on strategic factors, not valuation**.
3. (a) multiple IRRs (sign flip: − + −); (b) scale blindness; (c) reinvestment fiction — patched by MIRR.
4. Increment A→B: −40, +52 → incremental IRR = 52/40 − 1 = **30% > 12%** ✓; incremental NPV = 52/1.12 − 40 = **+₹6.43L** (= B's 10.71 − A's 4.29 ✓). Both lenses agree: **take B** — the extra ₹40L works harder than the hurdle.
5. Settle with **XIRR** (dates speak): yours ≈ — flows: −2 (3y), −3 (1y), +6.1 now → solve 2(1+x)³ + 3(1+x) = 6.1 → try 14%: 2×1.4815 + 3×1.14 = 2.963 + 3.42 = 6.38 >6.1; try 12%: 2×1.4049+3.36=2.810+3.36=6.17; try 11%: 2×1.3676+3.33=2.735+3.33=6.07 ≈ **11.3% XIRR**. Friend: 5×(1+x)⁵ = 7 → x = **6.96%**. **You beat your friend** — your money worked 1.6× faster. Absolute gains lied; dates told the truth.

---

## ❓ Quiz

**Q1.** The ShopKart machine (−₹10L; +₹3L/yr × 5y; hurdle 12%) has NPV and IRR of:
(a) NPV −₹0.81L, IRR 10% — reject
(b) NPV +₹0.81L, IRR 15.24% — accept: it pays its 12% rent on time and tips ₹81k besides
(c) NPV +₹5L, IRR 30%
(d) NPV 0, IRR 12%

**Q2.** Project A (IRR 60%, NPV ₹4.29L) vs Project B (IRR 36%, NPV ₹10.71L); you can fund only one. The professional choice and reason:
(a) A — highest IRR always wins
(b) B — it creates 2.5× the rupees of value; percentages can't be spent, and incremental IRR (30%) confirms the upgrade beats the hurdle
(c) A — smaller projects are safer
(d) Reject both — the judges disagree, so something is wrong

**Q3.** An infra project with cash signs − + − shows NPV positive at 10% but NEGATIVE at both 2% and 30%. The correct response is:
(a) Quote the higher IRR — it's more impressive
(b) Dismiss IRR (two sign changes → multiple roots) and rule with NPV at the hurdle plus sensitivity analysis
(c) Average the two IRRs
(d) Lower the hurdle until IRR works

### ✅ Answers

1. **(b)** — 3 × 3.6048 = 10.81 − 10 = +0.81; IRR solves annuity = 3.333 → 15.24%. Both judges say accept, MIRR (13.77%) and discounted payback (4.52 < 5y) concur. When the whole bench agrees, decide fast.
2. **(b)** — NPV is the only judge fluent in rupees, and rupees are what shareholders eat. The incremental IRR arithmetic (extra ₹40L earning 30%) removes even the style objection: B's extra capital works harder than the hurdle. Choosing A maximizes IRR as a ratio; choosing B maximizes NPV as wealth — and only one of those pays dividends.
3. **(b)** — Descartes' rule, boardroom edition: every sign flip can add a root, and each root has equal "claim" to being THE IRR — so none has any. NPV is unique at a given hurdle; pair it with sensitivity (how much error in closure-cost estimates kills it?) and you have a decision instead of a riddle.

---

## ✅ Mastery checklist

- [ ] I compute NPV by hand with annuity factors and rule accept/reject correctly
- [ ] I find IRR by solving the annuity factor and read it strictly against the hurdle
- [ ] I spot all three traps in the wild: scale blindness, multiple IRRs, reinvestment fiction
- [ ] I patch IRR with incremental IRR and MIRR instead of abandoning analysis
- [ ] I compare personal investments by XIRR (dates), never absolute rupees

**Next:** TV5 polices the quoting games — **Rates & Frequencies**: nominal vs effective, why 12% monthly is 12.68%, continuous compounding, real vs nominal returns, and the credit-card number (51.1%) they hope you never compute.
