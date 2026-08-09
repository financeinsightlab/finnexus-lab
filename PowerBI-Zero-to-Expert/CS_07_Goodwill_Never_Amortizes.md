# 🎯 CS7 · Goodwill Never Amortizes — It Surrenders (All at Once, in Public)

> Of all the assets on a consolidated balance sheet, goodwill is the strangest roommate: it has no shelf life, no amortization schedule, no depreciation clock — it may sit at ₹152cr for twenty years, pristine. But the price of that immortality is an ANNUAL trial, mandatory, every single year regardless of mood: the impairment test under Ind AS 36. Goodwill gets allocated to the CGU groups that are supposed to benefit from the acquisition's synergies, the group carrying amount gets compared against what the operation can actually recover, and when reality comes up short, the loss eats GOODWILL FIRST — then other assets pro-rata — and, unlike almost every other impairment in accounting, goodwill impairment NEVER REVERSES. A bonus that survived amortization dies by surrender, once, permanently. This module runs the annual ritual with numbers.

---

## 🎯 Objectives

- State the no-amortization doctrine and the mandatory annual test that replaces it
- Allocate goodwill to CGU/CGU groups and reallocate when the group reshapes
- Run the ₹500cr vs ₹450cr canon: goodwill first (₹40cr), assets pro-rata (₹10cr), floors watched
- Apply the never-reverses iron rule — and its analytical consequences
- Handle the partial-goodwill gross-up convention inside the test
- Read the disclosure: key assumptions, headroom, sensitivity — where fragility hides

## 📘 Concepts

### 7.1 Immortal but on trial — the doctrinal trade

Goodwill's indefinite life killed amortization in the modern regime (no reliable pattern exists by which "synergy" expires — annual grinding would only fake precision). The trade: Ind AS 36 forces an ANNUAL impairment test of every CGU group holding goodwill, even with zero impairment indicators (other assets test only on indicators — IA11's CGU canon from this academy). Goodwill is the only asset in accounting that must prove itself on schedule, every year, without cause. The ritual burden is the price of indefinite life.

### 7.2 Allocation — goodwill joins a platoon, not an army

Goodwill born in a business combination gets allocated from day one to each of the acquirer's CGU groups EXPECTED TO BENEFIT from the deal's synergies — and only at the level where management actually monitors goodwill internally (not bigger than an operating segment). The ₹152cr from ForgeTech's acquisition might split ₹100cr to "Castings West" and ₹52cr to "Precision Tools" if those groups harvest the synergies. Restructure the business (merge divisions, sell a limb)? Reallocate on relative-value discipline with documentation. Doctrine note: you test at platoon level because goodwill never generates cash alone — only inside an operation's flows does its premium prove or deny itself.

### 7.3 The canon test — ₹500cr walks into the ₹450cr reality (python-verified)

The "Castings West" CGU group at test day: carrying total **₹500cr**, inside it goodwill **₹40cr**. Annual ritual computes recoverable amount (higher of value-in-use and fair-value-less-costs-of-disposal, per IA11 machinery): **₹450cr**. Shortfall ₹50cr → impairment allocation in the standard's standing order:

1. **Goodwill absorbs first: ₹40cr** — wiped ENTIRELY.
2. Remaining **₹10cr** spreads pro-rata over the CGU's other assets — tamed by the floors: no asset driven below the highest of its own FVLCD, its VIU-share, or zero (overflow redistributes to the others).

Consolidated journal: impairment loss ₹50cr through P&L; goodwill line goes to zero; the plant/equipment/intangibles absorb balance. Note how the acquisition's halo itself was the first casualty — the standard's poetry: when reality bites, the halo bleeds before the body.

### 7.4 The iron rule — never reversed

Subsequent-year miracle: "Castings West" recovers glory and recoverable amount rockets back above carrying. Other assets' impairments reverse upward (within their caps — DP9's ceiling doctrine), but never goodwill: **goodwill impairment is NEVER reversed, ever** (Ind AS 36's hard wall; IA11's canon table said it: first out, never back). New prosperity may grow NEW goodwill candidates, but acquired-goodwill write-offs are permanent. Governance consequence: boards fight impairment recognition tooth and nail — because once booked, it is tattooed. (The partial-goodwill gross-up: when NCI was measured proportionately, the test gross-ups carrying by the NOTIONAL unrecognized minority goodwill so the comparison is honest, then scales the computed loss down to the recognized share — convention per the standard, disclosed when material.)

### 7.5 Reading the ritual — the assumptions note is where fragility lives

Ind AS 36 demands the test's machinery disclosed: key assumptions (growth, margin, WACC), the VALUE-IN-USE horizon, headroom (recoverable minus carrying), and sensitivity where a reasonable change eats the headroom. Analyst protocol (FA7 from Finance Core taught the discipline): rank group CGUs by headroom, then read WACC/growth pairs for optimism sprawl (headroom eaten by a clock-rate change of 0.5%, terminal growth above economy growth, margin stretched five years beyond history). A group whose biggest goodwill plateaus show single-digit headroom TWO years running is narrating next year's surrender in advance.

## 🧪 LAB — The Annual Ritual (10 min)

PrecisionTools CGU group file at test day: carrying assets excl. goodwill ₹380cr; goodwill allocated ₹120cr (acquired 5 years back, proportionate NCI method); recoverable estimate comes in at ₹450cr; within the CGU, one specialized press (carrying ₹30cr) has its own FVLCD of ₹24cr.

1. Total carrying and the shortfall.
2. Allocation order run: how much to goodwill? How much left?
3. The press's floor: how far may IT be written down?
4. What may NOT happen when recoverable rebounds to ₹520cr next year?
5. The proportionate-method wrinkle: one sentence on what the test's carrying number required before comparison.

**Why this matters:** this is the largest single judgmental number published by most acquisitive groups every year; running it by hand is the only way to own it.

**🔑 Lab answers:**
1. Carrying = 380 + 120 = **₹500cr** vs recoverable 450 → **shortfall ₹50cr**. 2. **Goodwill absorbs first**: the ₹50cr shortfall fits INSIDE the ₹120cr plate, so goodwill takes the entire hit — priced at ₹50cr of the plate, ₹70cr survives; other assets untouched this year. 3. Floor test: no asset below its own FVLCD ₹24cr — the press may fall at most 30 − 24 = ₹6cr (overflow redistributes pro-rata when any floor binds). 4. **Goodwill impairment NEVER reverses** — the surrendered ₹50cr stays dead; other-asset impairments may reverse within caps, goodwill may not. 5. With proportionate NCI, the test grossed-up carrying by the NOTIONAL NCI goodwill (minority's unbooked halo), ran the comparison, then scaled the computed loss to the recognized share — the convention that keeps door-one tests honest (CS4's fork returning at test day).

## 💪 Exercises

1. "Goodwill amortizes over 10 years as a policy of prudence." Ind AS answer in one line.
2. Why must the ₹152cr split across TWO CGU groups rather than test as one lump? Doctrine sentence.
3. Compute: carrying ₹900cr (GW ₹200cr), recoverable ₹760cr → walk the allocation.
4. An acquirer moves a division between segments and reallocates goodwill by headcount. Two audit questions.

### ✅ Selected answers

1. Not under Ind AS — goodwill has indefinite life, carries NO amortization, and stands its mandatory annual Ind AS 36 trial instead; "prudence" isn't a basis for inventing a schedule the regime removed (it became impairment-only precisely because grind was fake precision).
2. Because goodwill earns nothing alone — its premium proves or denies itself only inside the cash flows of the operations that harvest the synergies (monitored-level discipline, capped at operating-segment size): lump-testing would let a weak unit hide inside a strong sibling's headroom.
3. Shortfall 900 − 760 = ₹140cr → goodwill absorbs ₹140cr of its ₹200cr plate (₹60cr plate survives); other assets untouched this year.
4. (a) Was the reallocation done on RELATIVE VALUE of the units moving (not headcount or revenue proxies), with the valuation file archived? (b) Did the restructure trigger an impairment test on the division being moved before/after reshaping — standard discipline demands testing around reorganizations where indicators now exist?

## ❓ Quiz

**Q1.** Goodwill's doctrinal trade under Ind AS:
(a) amortized 20 years, no tests
(b) never amortized — indefinite life — but tested for impairment ANNUALLY with or without indicators, because no expiry pattern exists and absence of schedule demands presence of proof; other assets test only on indicators, goodwill alone must prove itself on schedule every single year
(c) amortized 10 years with annual tests
(d) tested only when markets crash

**Q2.** The canon test (carrying ₹500cr incl. GW ₹40cr vs recoverable ₹450cr):
(a) impair all assets pro-rata
(b) impairment ₹50cr — allocated goodwill FIRST (₹40cr gone entire) then ₹10cr pro-rata to other assets with floors (no asset below its own FVLCD/VIU/zero), and once the halo bleeds it never regrows: goodwill impairment is never reversed, even if the CGU's fortune fully rebounds
(c) impair ₹50cr against goodwill only
(d) no impairment — use amortization

**Q3.** The assumptions note gets read first because:
(a) it has pretty tables
(b) headroom, WACC-growth pairs and sensitivity are where the next surrender pre-announces — a CGU whose headroom is eaten by a 0.5% rate clock change or by terminal growth above economy growth is narrating next year's impairment in this year's fine print; rank CGUs by headroom, then cross-examine the optimism
(c) auditors demand thick notes
(d) it reveals segment CEOs

### ✅ Answers

1. **(b)** — immortality traded for an annual public trial under Ind AS 36.
2. **(b)** — halo first, then pro-rata with floors; and the surrender is forever.
3. **(b)** — the fine print carries next year's impairment in draft; headroom ranking plus optimism cross-exam is the protocol.

## ✅ Mastery checklist

- [ ] I can state the no-amortization/mandatory-annual-test trade
- [ ] I can allocate goodwill to monitored CGU groups and reallocate on structure change
- [ ] I can run the standing-order allocation with floors
- [ ] I can explain the gross-up convention for proportionate NCI
- [ ] I can argue the never-reversed wall and its boardroom physics
- [ ] I can hunt fragility in the assumptions note

---

**Next:** **CS8 · Changes in Ownership — The Equity Doors and the Control Cliff** — the full spectrum: buying more (equity), selling less while keeping control (equity), the step-acquisition re-measurement when control is GAINED in stages, and the day control is LOST: derecognize the whole child, fair-value the retained stake, recycle the OCI — with the ₹140cr gain formula that decides what the disposal really earned.
