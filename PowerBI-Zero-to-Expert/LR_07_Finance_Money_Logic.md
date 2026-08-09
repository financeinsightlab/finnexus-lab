# 💼 LR7 · FINANCE: The Logic of Money Decisions + The Ops Capstone

> Every puzzle format you've mastered runs a business somewhere. Vendor payments are a SCHEDULING puzzle under cash limits. Credit committees vote by if-then LAWS. Shelf allocation is a MATCHING grid. Payroll priorities are ORDERING chains. ShopKart runs on these daily — and your capstone proves it: the **ShopKart Ops Puzzle Suite**, where you build the vendor-payment week, rule on Fresh Farms' credit request, and sign a real decision memo. This is the module where \"aptitude\" quietly becomes \"operations analyst.\"

---

## 🎯 Objectives

- Map puzzle formats onto finance: **scheduling → payments · if-then → credit rules · grids → allocations · chains → priorities**.
- Solve a **vendor-payment calendar** under daily cash-ceiling constraints.
- Run **committee logic** on a credit-line decision (LAWS 1–3 from LR5 on duty).
- Connect puzzle outcomes to working-capital numbers (payable-days metric).
- **CAPSTONE:** the ShopKart Ops Puzzle Suite — schedule + committee call + memo + 60-second brief.

---

## 📘 Concepts

### 7.1 The vendor-payment calendar (scheduling with cash ceilings)

ShopKart pays vendors weekly, ₹-disciplined. Six payments on Mon–Sat; daily cash ceiling **₹1.20 lakh** (opening float + daily collections ≈ ₹2.0L; payroll buffer locked). Bills due this week:

| Vendor | Bill | Terms note |
|---|---|---|
| Fresh Farms (FF-221) | ₹47,250 | Net-30 → must settle by Thursday |
| GrainHouse | ₹62,000 | 2% early-pay discount if settled ≤ Tuesday |
| DairyKing | ₹38,500 | any day ✔ |
| PackCo | ₹56,800 | 2% discount ≤ Wednesday |
| SpiceRoute | ₹21,400 | any day ✔ |
| CleanPro | ₹18,900 | must NOT share a day with another big (>₹50k) payment |

Constraints → the calendar battery (Mon..Sat):
1. FF-221 by Thursday (position ≤ 4).
2. GrainHouse ≤ Tuesday (position ≤ 2) — discount = **₹1,240 saved** (62,000 × 2%).
3. PackCo ≤ Wednesday — discount = **₹1,136 saved**.
4. CleanPro not with a >₹50k partner (i.e., not with GrainHouse or PackCo).
5. Daily total ≤ ₹120,000.
6. Spread big (>₹50k) payments to separate days (two bigs/day = 118.8k max is legal... but GrainHouse(62) + PackCo(56.8) = 118.8 ≤ 120 ✔ legal yet zero headroom — liquidity policy says keep ≥ ₹81.2k float; treat as banned).

**One valid schedule:**
```
Mon: GrainHouse 62,000 (discount banked ✔)
Tue: SpiceRoute 21,400 + DairyKing 38,500 = 59,900 ✔ ≤120k
Wed: PackCo 56,800 (discount banked ✔, ceiling ok)
Thu: FF-221 47,250 (Net-30 deadline ✔)
Fri: CleanPro 18,900 (alone ✔ no big partner)
Sat: (grace day — collections buffer; nothing scheduled)
```
Every rupee placed by POSITION locks + a numeric constraint — a payment-festival puzzle whose questions (\"on which day does float dip lowest?\", \"how much was saved in discounts?\" = ₹2,376) are solved by the frame, instantly.

### 7.2 The working-capital lens (why this puzzle is finance)

- **Payable days outstanding (DPO)** = average days to pay vendors. Stretching DPO (within terms!) is free credit: ShopKart holding ₹47,250 for 30 extra days at 12% p.a. working-capital cost ≈ 47,250 × 12% × 30/365 = **₹466 saved** — every puzzle-day has a price.
- But break Net-30 = vendor trust loss + possible 1.5%/month late fee (47,250 × 1.5% = **₹709/month**). The puzzle's \"FF by Thursday\" wasn't courtesy; it was ₹709.
- **Early-pay discounts vs float:** GrainHouse's 2%/week ≈ 2% × 52 = annualized ~104% — take it ALWAYS when cash allows (the discount column is a return-rate column in disguise — PC6 thinking!).

### 7.3 The credit committee (if-then laws, money edition)

Fresh Farms requests a bigger credit line (₹1.5L/month). The family's three laws (LAW conversion, LR5 7.3):

```
LAW 1 · If monthly purchases from a vendor exceed ₹60k, the vendor must
        offer ≥ Net-30 terms.                  excess → Net-30
LAW 2 · Either we raise FF's line OR GrainHouse's this quarter — not both
        (one cash expansion per quarter).      FF ⊕ GH
LAW 3 · Any vendor with 2+ late deliveries in a quarter gets NO raise
        (trust must compound uninterrupted).   2-lates → ¬raise
```

FF's file: purchases ₹72k/month ✔ (exceeds 60k — check LAW 1: FF already gives Net-30 ✔ satisfied) · GH also applied ✔ · FF had TWO late deliveries in June–July (monsoon) → **LAW 3 fires → FF: NO RAISE this quarter**, and LAW 2 then lets GH's expansion proceed. Committee ruling = chain-of-laws, deliverable in one sentence with **each fired law cited**. That's how real memos read.

### 7.4 CAPSTONE — The ShopKart Ops Puzzle Suite 🏆

**Deliverable pack (build all four):**
1. **The Payment Calendar** — rebuild 7.1's schedule from clues alone (no peeking), then answer: float-lowest day? total discounts banked? which single payment can slide a day for free?
2. **The Committee Ruling** — run FF vs GH on the three laws; one-sentence ruling citing fired laws; then write what changes the answer NEXT quarter (FF clean-delivery streak = LAW 3 quiet, LAW 2 re-armed).
3. **The Priority Chain** — month-end cash tight ₹1.1L: net-payroll 68k, FF-221 47.25k, electricity 9k, rent advance 30k — under law \"people before partners before premises\": order the outflows (payroll → FF-221 → electricity → rent partly ₹0?) and compute the shortfall memo (1.1L − (68+47.25+9)k = −14.25k → negotiate rent-split: 15k now / 15k next week — ordering chains + PC arithmetic = policy).
4. **The Memo + 60-sec brief** — 4 lines: \"This week's payments run under ceiling, banking ₹2,376 in discounts with FF-221 inside terms; FF's credit-raise is deferred one quarter under LAW 3 (two June-July lates), keeping GrainHouse's expansion open; month-end tightness is covered except a 15k rent-split already agreed. Risks: one >₹50k surprise bill forces re-chaining; buffer day Saturday is the relief valve.\" Record it. Play it back.

---

## 🧪 LAB — 12 min: run the suite alone

1. Rebuild the calendar (budgets re-checked against ₹120k ceiling per day).
2. Compute the DPO saving if FF-221 were stretched to day-45 instead (extra 15 days): ₹?
3. Committee: if FF had ZERO lates and GH had ONE, which vendor's raise survives LAW 2?
4. Priority-chain: re-run the month-end ordering with collection surprise +₹20k.

**Key:** 1) Verify: 62 / 59.9 / 56.8 / 47.25 / 18.9 / 0 — all ≤ 120 ✔; float dips lowest Thursday post-FF (cumulative outflow peak ≈ ₹2.46L vs collections). 2) 47,250 × 12% × 45/365 ≈ **₹699** — minus the ₹709 late-fee risk → **net NEGATIVE**: stretch pays only inside terms! 3) Only ONE raise may live (LAW 2); FF clean → FF eligible, GH has 1 late (LAW 3 needs 2+) → GH also eligible → LAW 2 forces a CHOICE by business case, not law (honest memo: laws filter, strategy picks). 4) 1.3L − 1.2425L ≈ +₹5.7k headroom → rent-split reduced to a polite 10k/20k plan. Numbers move, laws don't.

---

## 💪 Exercises

1. Convert to LAW form: \"No discount unless paid within 72 hours.\"
2. Daily ceiling ₹120k: which pairs among {62, 56.8, 47.25, 38.5, 21.4, 18.9}(₹'000) are legal?
3. Why is Net-30 clause in LAW 1 good for ShopKart (one line + the ₹-per-lakh number)?
4. Rent ₹30k split 15/15 across weeks — what's the cash-timing benefit called in working-capital language?
5. Write LAW 4 from the suite if Rakesh says: \"Any quarter with a negative audit note freezes all credit raises.\"

### ✅ Selected answers

1. Discount → paid ≤ 72h (equivalently: ¬early → ¬discount). Arrow direction cited, as always.
2. Legal pairs ≤ 120: 62+56.8 = 118.8 ✔(banned by policy, not ceiling — distinguish!), 62+47.25 ✗ (109.25 legal ✔), 62+38.5 ✔ … full pair-audit: honest work = listing only the ones the memo acts on.
3. Terms = free float: ₹1L held 30 days @12% ≈ **₹986 of avoided borrowing** — Net-30 is a silent 12% loan.
4. **Cash-flow smoothing** (staging payables against collections) — same ₹30k, friendlier calendar; DPO discipline in miniature.
5. **LAW 4:** audit-note → freeze-all-raises (house the rule, cite it when fired). Committees respect laws that are WRITTEN.

---

## ❓ Quiz

**Q1.** The payment calendar's GrainHouse-on-Monday move banks:
- (a) Vendor goodwill only
- (b) **₹1,240 — the 2% early-pay discount (62,000 × 2%), worth ~104% annualized; the discount column is secretly a returns column, and the puzzle frame tells you which day unlocks it**
- (c) ₹620
- (d) Nothing — terms are terms

**Q2.** Stretching FF-221 to day 45 saves ₹699 of borrowing cost. The committee should still refuse because:
- (a) Stretching is illegal
- (b) **The late-fee/trust cost (₹709/month + vendor-strain) EXCEEDS the float saving — DPO games pay only INSIDE contractual terms; the Net-30 deadline in the puzzle was a money constraint, not a courtesy**
- (c) FF is family
- (d) ₹699 is too small

**Q3.** Committee LAW 3 (2+ late deliveries → no raise) fired on FF in June. The correct next-quarter re-arm condition is:
- (a) Automatic — time heals
- (b) **A clean-delivery streak that UNLOCKS LAW 3's condition — laws cite conditions, so rulings cite them too: 'FF deferred this quarter, eligible next quarter conditional on zero lates,' with GrainHouse's raise proceeding under LAW 2 meanwhile**
- (c) FF gets nothing ever again
- (d) Fire the vendor

### ✅ Answers

1. **(b)** — calendar-locked discounts are arbitrage with a date of expiry. The frame (Mon ≤ deadline ✔ ceiling ✔) converts policy to ₹1,240 instantly.
2. **(b)** — the whole 7.2 lesson: float-savings vs late-cost, compute BOTH lines before 'optimizing.' ₹699 saving < ₹709 cost + trust. Case closed with arithmetic, not vibes.
3. **(b)** — condition-cited rulings are how real credit committees talk. LAW 3 defers, LAW 2 allocates, and the memo names each — exactly your capstone's one-sentence deliverable.

---

## ✅ Mastery checklist — LR7 & FULL COURSE

- [ ] Money frames built: calendar battery, ceiling checks, discount column
- [ ] DPO math: ₹-per-day float priced against late-fees honestly
- [ ] Committee laws converted, fired, and CITED in one-sentence rulings
- [ ] Priority chains + PC arithmetic = month-end policy memos
- [ ] CAPSTONE: suite complete — calendar, ruling, chain, memo, 60-s brief recorded
- [ ] Full-course: row/circle/floor/schedule/grid formats all rebuilt cold this week

🎉 **Logical Reasoning Puzzles: COMPLETE.** You now think in frames, chain with discipline, and cite laws like an ops analyst. Banking papers' biggest section is now a marks-harvesting ground. Queue stays hot: **Ratio & Proportion**, **Profit & Loss**, or reasoning cousins like **Seating-plus-Coding** — your call, bro.

**Next:** 🧮 **Next course on demand** — sized to the topic, FINANCE capstone guaranteed, ShopKart story rolling.
