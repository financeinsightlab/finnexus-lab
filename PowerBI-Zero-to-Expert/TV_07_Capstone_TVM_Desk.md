# 🎯 TV7 · CAPSTONE — The TVM Desk

> Six modules, one desk. Tonight a family's entire financial life lands on your table: one salary, four goals, one loan, and two glossy pitches that need defusing. You have ten minutes and every formula from TV1–TV6. The desk doesn't grade on effort — it grades on whether every rupee gets the right address, the right rate, and the right dose.

---

## 🎯 Objectives

- Run the full TVM Desk protocol on a complete household case
- Integrate FV/PV, annuities, EMI, NPV, EAR, and real rates in one plan
- Defuse two real-world pitches with arithmetic, not attitude
- Pass the TVM interview forge

---

## 📘 Concepts

### 7.1 The Desk protocol — six moves, in order

1. **ASSEMBLE** the timeline: every goal's target date and today's-₹ cost on one line
2. **INFLATE** targets with goal-specific inflation (education ≠ CPI)
3. **RATE** each goal by horizon (short → debt rates, long → equity rates)
4. **DOSE** each goal: FV / annuity-FV factor; total the month
5. **DEFUSE** any products/pitches with EAR, flat→reducing, and Rule-of-72 forensics
6. **STRESS & DEFEND**: rate −2pp, salary pause, step-up escalator — prove the plan survives

### 7.2 The desk file — Aarav & Meera Sharma

**Facts:** Aarav 32, Meera 31; salary ₹1.5L/mo net (grows ~10%/yr); daughter Anaya, 3. Existing: ₹8L car-loan offer pending (9%, 5y, EMI ₹16,607 — or dealer's "7.5% flat"), emergency fund ✓, no investments yet, FD-loyal parents ("markets are gambling").

**Goals:**
| Goal | Today's cost | Horizon | Rate | Inflated target |
|---|---|---|---|---|
| House down payment | ₹25L at hand-over | 6y | 9% hybrid | ₹25L (fixed-price deal) |
| Anaya's college | ₹20L | 9y | 11% | 20 × 1.06⁹ = **₹33.8L** |
| Retirement (Aarav at 60) | ₹1Cr lifestyle | 28y | 12% | ₹4.27Cr canon (TV2) |
| Car decision | ₹8L | now | — | loan vs cash vs flat |

**Products pitched this week:** (a) "Guaranteed Double Plan": ₹5L/yr × 8y premium, "money doubles in 12 years"; (b) dealer's "7.5% flat, sir" on the car.

### 7.3 The market-side bonuses (already your reflexes)

- FD-loyalty defusal: 6.9% FD after-tax real = **−1.05%** at 30% slab and 6% inflation (TV5 canon) — "safe" is a slow leak
- Gordon mirror for any stock tip: implied g or implied r must confess
- Bond sanity: 9% YTM against 8% coupons → below par — FI's seesaw is TVM's table manners
- The escalator: every long goal prefers a stepped dose over a heroic flat one

### 7.4 What the desk is really testing

Not formulas — **address discipline**. The house money at 6y can't take equity's 12% ride (sequence risk), the retirement money at 28y can't afford FD's −1% real crawl, and the flat-7.5% car pitch can't survive its own 1.8× reflection. Every rupee has exactly one honest seat; the desk's whole job is ushering.

---

## 🧪 LAB — Run the Sharma File End-to-End (10 min)

**Do this:**
1. **Dose all three goals.** House: factor(9%/12, 72) = 95.0. College: factor(11%/12, 108) = 183.3. Retirement: factor(1%, 336) = 2,731. Also give the retirement step-up start (ratio 2.405).
2. **Fit the month.** Salary ₹1.5L. Try (a) flat doses + car EMI; (b) stepped retirement + car EMI. Which version breathes, and what would you trim first if it didn't?
3. **Car verdict.** 9% reducing (EMI ₹16,607, interest ₹1.96L) vs dealer "7.5% flat" (find monthly and true APR) vs paying cash from the house fund. Rank, with the one number that settles it.
4. **Defuse the Double Plan.** Premiums total ₹40L; "doubles in 12 years." Rule-of-72 verdict? Compare to a ₹33.33k/mo SIP at 11% for 8 years' maturity value (factor ≈ 158).
5. **Stress & defend.** Retirement return comes in at 10% not 12% (factor 28y@10%/12 ≈ 1,630 vs 2,731). What happens to the flat dose, and why does the step-up version absorb it better? Close with the full plan summary (5 lines max) a client could photograph.

**Why this matters:** This is wealth management's actual deliverable — the entire course in one page. If the Sharma file leaves your desk coherent, funded, defused, and stress-tested, TVM has done its job: you now price time for a living, starting with your own family.

**🔑 Lab answers:**
1. House: 25L/95.0 = **₹26,300/mo**; college: 33.8L/183.3 = **₹18,450/mo**; retirement flat: 426.9L/2,731 = **₹15,630/mo**; stepped start: 15,630/2.405 = **₹6,500/mo** (+10%/yr).
2. (a) Flat total = 26.3 + 18.45 + 15.63 + EMI 16.6 = **₹77.0k = 51% of salary** — too tight beside living costs; (b) stepped = 26.3 + 18.45 + 6.5 + 16.6 = **₹67.9k = 45%** — breathes. First trim if needed: the *house*, not retirement — extend to 7y (dose ₹21.5k) because delay is survivable there, while the retirement exponent is compounding right now and punishes every skipped year 2.8× (TV6 canon).
3. Dealer flat: payment = (8 + 8 × 7.5% × 5) / 60 months = **₹11L / 60 = ₹18,333/mo**; effective APR via the 1.8× rule ≈ **13.5% reducing**. Paying cash raids the 6y house goal (whose 9% hybrid return fund then restarts from zero). Ranking by the settling number — **total interest cost**: 9% reducing = **₹1.96L** ✓ cheapest *funded* path; flat-7.5% ≈ 13.5% → interest ≈ ₹2.9L ≈ worst; cash = ₹0 interest but amputates a goal. **Take the 9% reducing loan; decline the flat; keep cash for the house corpus.**
4. Doubling in 12y → implied rate = 72/12 = **6% guaranteed** — before tax, i.e., **below** inflation: a 12-year promise to lose purchasing power politely. SIP alternative: 33.33k × 158 = **₹52.7L vs the plan's ₹80L-maturity claim? Recompute honest:** the claim is premiums 40L "doubling" to ~₹80L in 12y — but premiums are paid over 8y, so date-weighted the true IRR of the plan ≈ **5.5–6% (XIRR it)** vs the SIP at 11% delivering ~₹52.7L by year 8 *and* continuing. Verdict sentence for the client: *"6% guaranteed minus 6% inflation is 0% real guaranteed — you'd be locking your family's money in an airport lounge for 12 years."*
5. At 10%: flat dose = 426.9/1,630 = **₹26,190/mo (vs ₹15,630 — +68%)**. The step-up absorbs it better because salary grows ~10% anyway: starting ₹6,500 stepping 10% tracks *income*, so the escalator simply runs 4-5 more years at the top end rather than demanding a flat-number shock today. **PLAN (5 lines):** ① House ₹25L/6y: ₹26,300/mo in hybrid funds. ② College ₹33.8L/9y: ₹18,450/mo in equity-hybrid. ③ Retirement ₹4.27Cr/28y: ₹6,500/mo stepping +10%/yr forever. ④ Car: 9% reducing EMI ₹16,607; reject the 7.5% flat (=13.5%). ⑤ Reject Double Plan (6% < inflation); monthly SIP total ₹51.3k + EMI ₹16.6k = 45% of salary, reviewed every Diwali.

---

## 💪 Exercises

1. **Address audit.** The Sharmas are offered 12.5% "guaranteed NBFC FD" for the house fund. Apply the address discipline: which passes 2-3 do you check, and what's the verdict?
2. **Inflation betrayal.** Anaya's college inflates at 8% not 6%: recompute the 9y target (20L × 1.08⁹ = ₹40L) and the new dose. What's the lesson in one line?
3. **Escalator algebra.** Prove to a skeptic why starting ₹6,500 @ +10%/yr ≈ ₹15,630 flat: what does the 2.405 ratio physically represent?
4. **Pitch autopsy.** A WhatsApp "trading pool" promises 4%/month. Two computations to defuse it (EAR; 72-rule doubling), plus the BF4 name for what it is.
5. **Salary pause stress.** Aarav takes a 6-month sabbatical in year 3. Which SIP pauses, which must not, and why (use the exponent logic)?

### ✅ Selected answers

1. Address discipline: house money has a **6-year hard date** — check (2) the NBFC's ALM/credit quality (IN2's DHFL lesson: 12.5% "FD" = the yield is the risk premium announcing itself) and (3) deposit-insurance limit ₹5L DICGC vs the ₹25L corpus. Verdict: **decline**; goals with dates don't chase 3.5pp of extra yield into credit risk — the corpus's job is to *exist*, not to perform.
2. Target = 20 × 1.999 = **₹40L**; dose = 40/183.3 = **₹21,820/mo** (+₹3,370). Lesson: **goal inflation, not CPI, writes your future bills** — education/healthcare run 8-10% in India; plan with the goal's own number or arrive 18% short.
3. The ratio represents the *physical fact* that later, larger installments still get 15-25 years of compounding: the stepped stream's big years land early enough to compound, so ₹6,500 growing at 10%/yr accumulates the same ₹4.27Cr as a flat ₹15,630. It's the fuel law (time > dose) wearing a salary slip.
4. 4%/month → EAR = 1.04¹² − 1 = **60.1%/yr**; 72-rule: doubles every **18 months** sustained — a rate no legal strategy survives (BF4: this is the *too-good-to-be-true* signature; the pool is either a Ponzi on a timer or leverage with no disclosed ruin date).
5. Pause the **house SIP first** (its corpus is addressable — the down payment can slide 6 months with the builder's agreement or a smaller ticket); **never pause retirement** — skipping 6 months in year 3 isn't 6 months of money, it's 25 years of compounding on those units; and college pauses second-choice-last because its date is the least movable (Anaya will turn 18 on schedule whether or not the sabbatical happened). Protect the goals whose clocks tick loudest.

---

## ❓ Quiz

**Q1.** The Sharma month that breathes (including the car EMI) totals:
(a) ₹77k flat-dose version only
(b) ₹67.9k — house ₹26.3k + college ₹18.45k + stepped retirement ₹6.5k + EMI ₹16.6k = 45% of salary
(c) ₹40k — retire later, skip college
(d) ₹1.5L — everything, instantly

**Q2.** The dealer's "7.5% flat" on the ₹8L / 5y car loan actually costs about:
(a) 7.5% — it's printed on the brochure
(b) 13.5% reducing — flat × ~1.8: you pay interest on the original principal while returning it monthly (₹18,333/mo, ~₹2.9L total interest vs ₹1.96L at honest 9%)
(c) 9% — same as the bank quote
(d) 15% exactly, by RBI formula

**Q3.** The "Guaranteed Double Plan" (money doubles in 12 years) should be defused because 72/12 = 6% implies:
(a) A credible equity-equivalent return
(b) A return **below inflation** — a 12-year guarantee to stand still in purchasing power, taxable on maturity; the address discipline says long goals need growth assets, not polite erosion
(c) Fraud, always
(d) A great house-fund vehicle

### ✅ Answers

1. **(b)** — the step-up does the heavy lifting later when the salary is bigger, letting today breathe. Flat-dosing everything (option a) crowds out living costs and invites abandonment; the escalator is the plan that survives contact with reality — the best plan is the one that's still running in year 9.
2. **(b)** — ₹18,333/mo × 60 = ₹11L repaid on ₹8L borrowed, i.e., ~₹2.9L interest vs ₹1.96L at true 9% reducing. Flat quotes are legal because they're technically true (interest = 7.5% × principal × years) and commercially fatal (nobody pays on the original principal happily once they've met the 1.8× mirror).
3. **(b)** — 6% taxable ≈ 4.2% post-tax against 6% inflation = **negative real**, guaranteed. Not fraud (option c overshoots — it's an honest, legal, bad deal); and not the house fund either (option d) — the house fund's 6-year money earns ~9% hybrid without a 12-year lock. The desk's verdict: polite math, declined politely.

---

## ✅ Mastery checklist

- [ ] I run the six-move desk protocol: Assemble → Inflate → Rate → Dose → Defuse → Stress
- [ ] I dosed the Sharma file: ₹26,300 + ₹18,450 + ₹6,500-stepped + ₹16,607 EMI
- [ ] I declined the flat-7.5% (=13.5%) and defended the 9% reducing with total-interest arithmetic
- [ ] I defused the Double Plan (6% < inflation) and a 4%/month pool (60% EAR, 18-month doubling)
- [ ] I stressed to 10% and survived with the escalator instead of panic

**🎓 INTERVIEW FORGE — Time Value of Money:**

1. *"Why is the first EMI mostly interest?"* → (monthly interest on outstanding: ₹22,500/₹4,492 split; front-loading math)
2. *"NPV says yes, IRR says no — who wins?"* → (NPV always; IRR carries reinvestment fiction + scale blindness; incremental IRR/MIRR as patches)
3. *"A dealer offers 10% flat. Translate."* → (≈17.27% reducing; flat × ~1.8; total-interest settling number)
4. *"Convince my uncle his FD is risky."* → (6.9% → 4.83% post-tax → −1.05% real; safety is purchasing power, not zero volatility)
5. *"Two savers, same corpus target, one starts at 32 one at 40 — quantified?"* → (₹15,630 vs ₹43,160/mo; the 3.6× step-up variant ₹6,500; time is the exponent)

---

🏆 **COURSE COMPLETE — ⏳ Time Value of Money.** You walked in thinking ₹13L-later vs ₹8L-now was a riddle; you leave pricing time itself — bonds, EMIs, projects, goals, and every glossy pitch India can print. The exponent is now your employee.

**Next course: 💎 Wealth Management** — the assembly course: goals + risk profiles + asset allocation + tax + estate into one client's lifelong plan. TVM built the engine; wealth management builds the car around the family.
