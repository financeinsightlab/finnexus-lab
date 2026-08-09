# 🎯 DP9 · Three Neighbour Standards — Impairment, Grants, and Borrowing Costs

> Ind AS 16 never works alone. Every asset on the slow clock is flanked by three standard-neighbours that decide its bad days, its subsidized days, and its construction days: **Ind AS 36** (impairment — the brake when the future shrinks), **Ind AS 20** (government grants — free money with accounting manners), and **Ind AS 23** (borrowing costs — interest that legally climbs inside the asset while it is being built). You met impairment doctrine in the IA course (the CGU canon); this module turns it into a full numeric autopsy — the ₹100L machine that takes a ₹20L hit and later gets only a ₹15L-capped reversal — then runs the grant two-door choice that always nets to ₹9.6L, and the ₹30L interest year that splits into ₹20L capitalized and ₹4L expensed.

---

## 🎯 Objectives

- Distinguish depreciation (a schedule) from impairment (an event) — and run both tests in order
- Compute impairment loss and a capped reversal on the ₹100L canon
- Recognize a government grant: reasonable assurance + conditions; run both presentation doors to the same ₹9.6L net
- Run Ind AS 23: qualifying assets, capitalization window, suspension for extended halts, the ₹20L/₹4L split
- Explain why "schedule vs event vs subsidy vs interest" clarifies every PPE question seen in interviews

## 📘 Concepts

### 9.1 Impairment — the event brake (canon numbers python-verified)

Depreciation is the scheduled drip you choose; impairment is the event that chooses you. Ind AS 36: at each reporting date, look for INDICATORS (external: market collapse, rate spikes, tech obsolescence; internal: physical damage, idle capacity, restructuring) — indicator present → estimate **recoverable amount = higher of fair value less costs of disposal and value in use**. carrying above it → write down through P&L (revalued assets: treated as a revaluation decrease, DP5's corridor).

The full autopsy on one machine, cost ₹100L, life 5 years, straight-line, residual nil:

- End year 1: carrying = 100 − 20 = **₹80L**. Indicator hits; recoverable estimates: FVLCD ₹58L, VIU ₹60L → recoverable **₹60L** (higher of the two). Impairment loss **₹20L** to P&L. New carrying ₹60L; depreciation re-bases automatically: 60 ÷ 4 remaining = **₹15L/yr**.
- End year 2: carrying = 60 − 15 = **₹45L**. The market recovers; recoverable now **₹90L**. Reverse the impairment — but the standard chains the euphoria: reversal raises carrying only to what it WOULD HAVE BEEN had no impairment occurred: 100 − 2 × 20 = **₹60L ceiling**. Reversal = 60 − 45 = **₹15L** (NOT 90 − 45 = 45). The ₹15L goes through P&L for cost-model assets.

Doctrine in one breath: impairment makes depreciation's estimate honest about TODAY; the reversal ceiling stops improvident clock-resetting from ever manufacturing profit out of a market sneeze.

### 9.2 Government grants — two doors, same corridor (python-verified)

A state capital-subsidy grant of **₹12L** arrives against the ₹60L machine (5-year life). Ind AS 20 first demands its twin lock: **reasonable assurance** you will comply with conditions AND the grant will be received — then presentation offers two legal doors:

- **Door A — deduction from carrying amount**: asset booked net at ₹48L → depreciation **₹9.6L/yr**.
- **Door B — deferred income**: asset stays ₹60L (depreciation ₹12L/yr); the ₹12L grant sits as deferred income released systematically **₹2.4L/yr** to P&L → net P&L charge **₹9.6L/yr**.

Same ₹9.6L net, different face: A shows a smaller gross block (grant invisible within), B shows the asset and the grant BOTH grossed (more disclosure-friendly, more audit-friendly — selection disclosed as policy). Non-monetary grants (free land) travel either at fair value or nominal; conditions breached → refund provisions. No third door exists for planting the whole ₹12L inside one year's "other income" — the subsidy must follow the asset's consumption pattern.

### 9.3 Borrowing costs — interest inside the asset (python-verified)

Build a ₹5cr testing tower over the year with a ₹3cr specific construction loan at 10% = **₹30L/yr interest**. Ind AS 23: borrowing costs directly attributable to acquiring/constructing a QUALIFYING ASSET (necessarily takes substantial time to ready — the cask-sleep cousins from IC2) are capitalized as part of its cost. Mechanics:

- Capitalize ACTUAL specific-borrowing cost incurred in the period MINUS investment income on temporary deployment of the funds: construction funds earned **₹6L**.
- **Suspension doctrine**: capitalization stops during extended delays in active development — a 2-month permit dispute halts work (not a routine monsoon — an EXTENDED halt): those months' interest (30 × 2 ÷ 12 = ₹5L, minus the ₹1L income there = **₹4L**) goes to P&L; capitalization resumes with activity.
- Capitalized amount: eligible ten months' interest 30 × 10 ÷ 12 = ₹25L minus ₹5L income on that window = **₹20L into the tower**; **₹4L expensed**.

General-borrowings pools use a capitalization RATE (weighted average) applied to spends — one step heavier maths, same architecture. Commencement needs all three: expenditures incurred, borrowing costs incurred, activities underway. Cessation: when the asset is substantially ready for intended use — DP2's finish line, here wearing a hard hat.

### 9.4 Interview orbit — one asset, four standards

The single table that wins synthesis rounds: the **schedule** (Ind AS 16 / DP4) spreads cost you chose; the **event** (Ind AS 36) corrects carrying to the best-evidence future; the **subsidy** (Ind AS 20) matches support to consumption; the **builder's interest** (Ind AS 23) rides inside only while construction genuinely progresses. Fail to separate them in an answer and every number you give wobbles; keep them in four boxes and every PP&E case on Earth becomes arithmetic.

## 🧪 LAB — The Three Doors (10 min)

Aravali Castings' year file:

1. Line 3 (carrying ₹80L after year-1 depreciation): demand collapse indicator → FVLCD ₹58L, VIU ₹60L. Compute and book.
2. Year 2 for Line 3: recovery — recoverable rises to ₹90L (carrying now ₹45L). Reversal?
3. State grant ₹12L against Line 1's ₹60L machine, 5-year life: show Door A and Door B year-1 P&L nets.
4. Tower loan ₹3cr at 10%, year-long build, ₹6L interest income on idle draws; permit halt 2 months mid-year. Split the ₹30L.
5. Which of the above four is "an event" and which are "schedules/policies"? One line each.

**Why this matters:** these four computations are the working-paper set auditors rebuild on EVERY plant audit; this lab is that paper, miniatured.

**🔑 Lab answers:**
1. Recoverable = higher(58, 60) = ₹60L; impairment **₹20L P&L**; carrying ₹60L; dep re-bases to ₹15L/yr. 2. Ceiling = no-impair carrying 100 − 40 = ₹60L; reversal = 60 − 45 = **₹15L P&L** — not ₹45L. 3. Door A: dep (60 − 12) ÷ 5 = **₹9.6L**. Door B: dep 12 − release 2.4 = **₹9.6L net**. Same corridor. 4. Capitalize 30 × 10 ÷ 12 − 5 = **₹20L**; expense the halt-window net **₹4L** (5 − 1). 5. Impairment = event (indicator-triggered); grant presentation = policy within a schedule; borrowing cost = schedule of construction economics; all three disciplined by doctrines, none optional.

## 💪 Exercises

1. Distinguish "useful life review" (DP4) from impairment in two sentences that a CFO cannot argue with.
2. A promoter wants the ₹12L grant taken to P&L in year one "to show the support." Give the matching-principle answer.
3. The tower build pauses 3 weeks for the annual monsoon. Capitalization suspended?
4. Revalued asset suffers an indicator and fails the impairment test. Where does the write-down land first?

### ✅ Selected answers

1. A life review re-times FUTURE depreciation for consumption still expected — an estimate refinement; impairment declares the carrying amount itself unrecoverable TODAY and writes it down through P&L. One is the schedule being repointed; the other is the schedule being ended early by the future shrinking.
2. Grants attach to the asset's service pattern: the ₹12L enters P&L across five years (via lower depreciation or deferred release, both netting ₹9.6L); a year-one booking would divorce support from consumption — Doors A and B exist precisely so timing follows the machine, not the moment.
3. No — brief interruptions necessary to the process (weather the build always expected) keep capitalization running; suspension is for EXTENDED halts in active development, like the 2-month permit freeze in the canon.
4. For a revalued asset, impairment is treated as a revaluation DECREASE — debiting any existing surplus for that asset first (OCI), with the overflow to P&L (DP5's corridor wearing a hard hat).

## ❓ Quiz

**Q1.** End of year 1 for the ₹100L canon (carrying ₹80L), FVLCD ₹58L, VIU ₹60L:
(a) no entry — depreciation already covers decline
(b) impairment loss ₹20L to P&L — recoverable is the HIGHER of FVLCD and VIU (₹60L), carrying falls to ₹60L, and depreciation re-bases to ₹15L/yr automatically; indicator-triggered, an event beside the schedule
(c) write down to ₹58L, the prudential floor
(d) reverse ₹20L to OCI

**Q2.** Year 2: recoverable bounces to ₹90L against carrying ₹45L:
(a) reverse ₹45L immediately
(b) reverse only to the no-impairment ceiling — what carrying would have been (100 − 2 × 20 = ₹60L) → reversal ₹15L through P&L; capped so a market sneeze can never manufacture profit beyond the frozen schedule
(c) reverse ₹30L, matching recovery speed
(d) no reversals of PPE impairment are ever permitted

**Q3.** The tower's ₹30L interest year with a 2-month permit halt and ₹6L interest income:
(a) capitalize all ₹30L
(b) capitalize ten months' interest ₹25L minus ₹5L income = ₹20L; the extended-halt window's net ₹4L expensed — suspension doctrine: general activity delays capitalize, extended permit fights do not, and commencement needs expenditures plus borrowing plus activity all alive
(c) expense all ₹30L to be safe
(d) capitalize ₹24L, evenly ignoring the halt

### ✅ Answers

1. **(b)** — higher-of sets recoverable at ₹60L; ₹20L through P&L; the clock re-bases.
2. **(b)** — capped reversal doctrine: ₹15L only, to the ₹60L would-have-been line.
3. **(b)** — ₹20L in the tower, ₹4L through P&L: extended halts suspend the ride.

## ✅ Mastery checklist

- [ ] I can articulate depreciation-as-schedule vs impairment-as-event
- [ ] I can run the full ₹100L → ₹20L hit → ₹15L capped reversal autopsy
- [ ] I can run both Ind AS 20 doors to the same ₹9.6L net
- [ ] I can split a borrowing year with suspension (₹20L / ₹4L) cold
- [ ] I know when a revalued asset's impairment raids surplus first

---

**Next:** **DP10 · Industry Plays** — the doctrines at scale: a ₹900cr airliner as four assets (₹52.8cr/yr), a ₹280cr power plant as four (₹18cr/yr), a ₹12cr building split so land never depreciates (₹40L/yr), and the laptop-fleet policy that materiality lets you keep trivial.
