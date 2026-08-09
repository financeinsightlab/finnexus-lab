# 🎯 TW6 · FINANCE: Festive Staffing Pack + Capstone
> Every man-day in India has a price and every delay a penalty clause. ShopKart's festive reset costs **120 man-days × ₹2,500 = ₹3,00,000**, the contract bites at **₹5,000/day of delay**, and the billing floor needs **14 billers** from one ratio line (560 bills ÷ 40 per biller). We price crew options against penalties, then ship the signed **Festive Staffing Pack**.

## 🎯 Objectives
- Price any crew plan: **labor = man-days × ₹2,500**; calendar = man-days ÷ crew; penalty attaches to overruns.
- Run **crew-vs-penalty optimization**: pick the headcount minimizing labor + penalty (the margin is the calendar).
- Staff throughput floors: bills/hour × billers × hours ≥ promised volume — rostering with shift math.
- Bridge to project language: man-week capacity plans, deadline trades, and the "crash-cost" premium.
- **Capstone:** build the 3-sheet Staffing Pack — reset crew plan, billing roster, and a signed COO recommendation.

## 📘 Concepts

### 6.1 The contract math — labor vs penalty
Festive shelf-reset: **120 man-days** of work, promised in **10 days**, ₹5,000/day late-penalty, ₹2,500/man-day.

```text
PLAN 8 STAFF:  calendar = 120/8 = 15 days → 5 days late
  labor 120 × 2,500 = ₹3,00,000  +  penalty 5 × 5,000 = ₹25,000 → ₹3,25,000
PLAN 12 STAFF: calendar = 120/12 = 10 days → on time
  labor ₹3,00,000 + ₹0 → ₹3,00,000   ← CHEAPER AND ON TIME ✓
PLAN 15 STAFF: 8 days — still ₹3,00,000 labor, zero penalty, but idle risk;
  two days early is not revenue. Verdict: the 12-staff plan owns the Pareto corner.
```

The invariant from TW1/TW5 — **labor cost is fixed at man-days × rate** — means optimization happens ONLY in the calendar: pay more bodies the same total, kill the penalty. The 8-staff "saving" was fictional from birth (T2's corporate edition).

### 6.2 Crash-cost framing — how PM textbooks say it
Crashing = buying days with extra crew. Here the first 5 days of crashing cost (15−10) days ⇒ +₹0 labor (−penalty ₹25,000 — negative cost!). Beyond 12 staff, days cost idle-risk, not rupees — so optimal crash = **up to the deadline, never past it**. The general lesson: when deadlines carry fees, the cheapest staff number is **man-days ÷ deadline-days**, rounded UP — 120/10 = 12 exactly (a mercy from the problem author; at 115 man-days we'd hire ceil(11.5) = 12 anyway and eat half a body-day of slack).

### 6.3 The billing floor — throughput staffing
Diwali peak: **560 bills/day** at the Karol Bagh store; one biller clears **40 bills/day** (≈ 5/hour over 8 hours):

```text
Billers needed = 560 / 40 = 14 ✓  (plus 1 floater for breaks → roster of 15 on floor)
Peak-hour audit: evening rush 6–10 PM carries 45% of bills ⇒ 252 bills/4 h = 63/h
  ⇒ billers on counter in rush = 63/5 = 12.6 → 13 counters live in the rush window
```

Throughput staffing is D = S × T in a crowded uniform: required capacity ⇒ headcount ⇒ counter hardware. Understaff and the queue itself becomes your penalty (basket abandonment ≈ real ₹: a 10-minute queue at Diwali converts worse than any ₹5,000 clause).

### 6.4 Rosters — calendar math on humans
The store runs 8 AM–10 PM (14 h) at Diwali; billers pull 8-h shifts. Careful with the two ledgers here: 14 SIMULTANEOUS counters is not '14 billers' — counter-hours for the day = 14 × 14 = **196 counter-hours**, so billers on payroll per day = 196/8 = **24.5 ⇒ 25 billers**, plus floaters. Simultaneity staffs the floor; counter-hours staff the payroll. The distinction that saves you: **billers-simultaneous (14)** vs **billers-employed-per-day (25)** — TW3's two-stopwatch disease in corporate form. Rosters are just man-hour tanks with labor laws as leak constraints (weekly-offs ⇒ ×7/6 more names: 25 × 7/6 = 29.2 ⇒ ≈ 30 on the rolls).

### 6.5 CAPSTONE BRIEF — the ShopKart Festive Staffing Pack
**Sheet 1 — Reset crew plan:** the 6.1 table (8/12/15 staff with labor, penalty, totals) + verdict: **12 staff, 10 days, ₹3,00,000** ✓ (save ₹25,000 vs the 8-plan fiction; 15-plan adds no value).
**Sheet 2 — Billing roster:** peak numbers (560/day, 14 simultaneous rush… 13 live counters at rush ⇒ staff 14 simultaneous), shift math: 196 counter-hours ⇒ 25 billers/day + 2 floaters ⇒ **27 names needed on rolls** (daily-presence basis); with weekly-off coverage at 6/7 duty each, ceiling(27 × 7/6) = **32 on the rolls**. Rookie roster (14 billers per day total) leaves 84 counter-hours unfilled ⇒ about **240 bills/day unprocessed ⇒ the queue-penalty you can't invoice but definitely pay**.
**Sheet 3 — COO recommendation (three signed lines):**
1. Contract the reset at 12 staff/10 days (₹3,00,000 all-in; penalty clause dies un-triggered).
2. Floor-staff to 14 simultaneous billers in rush via 25 daily hires + 2 floaters; queue abandonment is the silent penalty.
3. Institutionalize the crew-vs-penalty calculator (man-days ÷ deadline, ceil) for every festive contract — one cell, ₹25,000 saved per store per season.

## 🧪 LAB — The workforce desk (10 min)
1. Reset job 180 man-days, deadline 12 days, penalty ₹8,000/day. Price 12, 15, 18-staff plans (labor ₹2,500/md) and pick.
2. Warehouse floor: 840 parcels/day across a 12-h operation (70/hour average), one packer clears 15/hour. (a) Average-day simultaneous packers? (b) The 4–8 PM rush carries half the day's volume — packers live in the rush window?
3. Store open 12 h, needs 10 counters live throughout, billers on 8-h shifts ⇒ daily billers on payroll?
4. Crash-cost: job 96 man-days, deadline 8 days, rate ₹2,500. Contract offers staff at 6 (penalty ₹4,000/day late). Price 6-staff vs 12-staff vs 16-staff plans; find the corner.
5. Queue economics: rush understaffing costs ~8% of billed value to walk-outs; rush billing ₹6,00,000. Staffing the rush properly costs ₹4,000/day extra. Verdict in one line + the math.

**Why this matters:** Sheet 1 and Sheet 2 of the capstone ARE these five drills wearing shop lights. Own them and the pack is a formality.

**🔑 Lab answers:** (1) labor = 180 × 2,500 = ₹4,50,000 for every plan (the invariant); 12 staff: 15 d ⇒ 3 late ⇒ 4,50,000 + 3×8,000 = ₹4,74,000 · 15 staff: exactly 12 d ⇒ ₹4,50,000 ✓ corner · 18 staff: 10 d ⇒ ₹4,50,000 with 2 days of unused slack — 15 wins: deadline met, nothing wasted (2) (a) 70/15 = 4.67 ⇒ **5 packers** on average; (b) rush rate = 420/4 = 105/hour ⇒ 105/15 = **7 packers live in the rush** — staff for the 7, flex the 5 (3) 10 × 12 = 120 counter-hours ÷ 8 = **15 billers/day** (4) 6 staff: 16 d ⇒ 8 late ⇒ 96×2,500 + 32,000 = ₹2,72,000 · 12 staff: 8 d exact ⇒ ₹2,40,000 ✓ corner · 16 staff: 6 d ⇒ ₹2,40,000, finished 2 early — the corner is 12 (5) walk-out exposure = 0.08 × 6,00,000 = ₹48,000 >> ₹4,000 ⇒ staff the rush; queues bill you in invisible ink.

## 💪 Exercises
1. Job 200 man-days, deadline 16 days, ₹3,000/day penalty, ₹2,400/man-day. Price 10, 13, 16-staff plans; pick the corner and name the savings vs the lazy 10-plan.
2. A deadline compresses from 12 to 10 days on a 120 man-day job (₹2,500/md, no penalty). Crew change? Cost change? Explain in one line about the invariant.
3. Billing: 720 bills/day peak, biller 45/day ⇒ simultaneous? Counters open 10 h and bills arrive evenly ⇒ counter count if each live counter clears 4.5/h?
4. Roster bridge: store needs 12 simultaneous billers over a 14-h day, 8-h shifts ⇒ daily employed? With weekly-off coverage (×7/6) ⇒ roll strength? (Round up at each step.)
5. Crew-vs-penalty algebra: write the general corner rule (deadline D, work W man-days, rate r, penalty p) as one optimization line, and name the one assumption under which "12 staff at 120/10 = 12 exactly" becomes 13 in real life.
6. Two-store split: 120 man-days at KB (deadline 10) and 80 at LN (deadline 8), one shared crew pool, ₹2,500/md, penalties ₹5,000/day each. Total staff if both must finish on time? (Calendars may overlap — think simultaneous!)
7. The vendor offer: contractor quotes a FIXED ₹3,30,000 "all-inclusive" for the 120-man-day reset in 10 days. Our in-house math says ₹3,00,000. Negotiation line in one sentence (with his margin quantified)?

### ✅ Selected answers
1. 10 staff: 20 d ⇒ 4 late ⇒ 200×2,400 + 12,000 = ₹4,92,000 · 13 staff: 15.4 d ⇒ on time ⇒ ₹4,80,000 ✓ corner (ceil(200/16) = 13) · 16 staff: 12.5 d, ₹4,80,000, slack. Corner = 13, saving ₹12,000 and the deadline.
2. Crew 10 → 12 ⇒ labor unchanged at ₹3,00,000 — man-days is the invariant; only the calendar (and late-risk) repriced.
3. 720/45 = **16 billers**; even-arrival: 720/(10 h × 4.5/h) = 720/45 = 16 counters ✓ consistent.
4. 12 × 14 = 168 counter-hours ÷ 8 = **21 daily** ⇒ ×7/6 = 24.5 ⇒ **25 on rolls**.
5. Staff n integer minimizing n-independent labor + p·max(0, ceil(W/n) − D) ⇒ corner at smallest n with ceil(W/n) ≤ D, i.e., n = ceil(W/D). Assumption breaker: productivity < 1 on day-1 (ramp-up/shadowing), seniors supervising, or 10% absenteeism ⇒ staff 12 × 1.1 ⇒ ceil → **13**.
6. KB needs 12 simultaneously, LN needs 10 ⇒ if deadlines overlap: **22 staff simultaneously** (stagger if calendars permit: start LN 2 days early ⇒ shared 14-pool impossible at overlap… compute: with perfect staggering, peak pool = max needed at any moment; simultaneous deadlines ⇒ sum) — the lesson: pooled crews only amortize when calendars don't collide.
7. "Your quote bills us ₹30,000 over our in-house cost for labor we know is exactly 120 man-days — split the difference and take the project, or we staff it ourselves": vendor margin ask cut from 10% to ~5% — that's ₹15,000 found in one sentence, which is what capstone math is for.

## ❓ Quiz
1. Festive reset = 120 man-days, 10-day deadline, ₹5,000/day late-penalty, ₹2,500/man-day. The 8-staff plan (15 days) costs in total:
   - (a) ₹3,00,000
   - (b) ₹3,25,000 — labor is the invariant (120 × 2,500) but the calendar breaches: 5 days × 5,000; the fictional headcount 'saving' just got invoiced
   - (c) ₹3,12,500
2. The optimal plan for the same contract:
   - (a) 15 staff, 8 days — fastest is safest
   - (b) 12 staff, exactly 10 days — ceil(man-days ÷ deadline) = 12: same ₹3,00,000 labor, zero penalty, no idle slack; earliest deadline-on-time headcount owns the corner
   - (c) 10 staff with overtime — cheaper bodies
3. Diwali floor: 560 bills/day at 40 bills per biller means:
   - (a) 12 billers
   - (b) 14 simultaneous billers — one ratio line staffs the floor (560/40); rostering to payroll-day names (≈25 + floaters over two shifts) is the second, separate ledger
   - (c) 28 billers

### ✅ Answers
1. **(b)** — (a) read the labor line and ignored the penalty's meter; (c) halved the overrun.
2. **(b)** — crashing past the deadline buys slack, not savings; (c) changes the rate card, a fight for a different day.
3. **(b)** — simultaneous vs employed-per-day: the two stopwatches of staffing. 28 is the roster-ledger answer to a question nobody asked.

## ✅ Mastery checklist
- [ ] Labor = man-days × rate is my invariant; calendars and penalties are the only dials
- [ ] Corner rule installed: n = ceil(W/D), then price both sides of it to be sure
- [ ] Throughput staffing: volume ÷ per-capita ⇒ simultaneous heads; rush-hour audit separately
- [ ] Roster bridge: counter-hours ÷ shift-hours ⇒ daily employed ⇒ ×7/6 ⇒ roll strength
- [ ] Queue costs priced as invisible-ink penalties (walk-out % × billed value)
- [ ] I shipped the 3-sheet Festive Staffing Pack with three signed COO lines

🏆 **COURSE COMPLETE — Time & Work!** From 1/n flips to LCM tanks, wage ledgers, alternate-day calendars, signed pipes — and a festive staffing plan that saves ₹25,000 a store per season. Work, priced and delivered.

**Next:** the builder's queue points at **🔢 Number System** — divisibility symphonies, remainder theorems, cyclicity of last digits, and the HCF-LCM duet. The foundations of ALL competitive math — soon, right here! 🚀
