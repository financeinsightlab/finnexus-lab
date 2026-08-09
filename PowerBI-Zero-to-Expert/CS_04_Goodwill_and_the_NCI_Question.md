# 🎯 CS4 · Goodwill & the NCI Question — The ₹160cr or ₹190cr Fork

> The acquisition equation from DT9/CS3 has one unresolved dial on its face: how do you measure the minority slice you did NOT buy? Buy 80% of a company — what is the 20% non-controlling interest worth at consolidation day? Ind AS 103 hands you TWO legal answers per transaction: the narrow one (proportionate share of the sub's net identifiable assets) and the fat one (FAIR VALUE of that slice — the "full goodwill" method). Same deal, same day, and goodwill is either ₹160cr or ₹190cr — a ₹30cr fork that then shadows every impairment test, every ROIC denominator, and every acquisition narrative for the life of the creature. This module runs the fork with numbers until the choice feels like a business decision, not a paragraph citation. All arithmetic python-verified.

---

## 🎯 Objectives

- Rebuild the full acquisition equation with NCI and previously-held interests
- Run both NCI measurement doors on one canon: ₹160cr vs ₹190cr
- Trace the fork's consequences: impairment allocation, ROIC, disclosure texture
- Price the fair-value door: market-price-minus-control-premium vs income techniques
- Argue the election as commerce: defensible, per-transaction, documented

## 📘 Concepts

### 4.1 The complete acquisition equation (recap with rails)

**Goodwill = consideration transferred + amount of NCI + fair value of previously-held interest (step acquisitions, CS6's stage story) − net identifiable assets acquired** (fair value, net of DT9 shadows). Every business combination in this course runs this one line; NCI measurement is the only door inside it with two signs.

### 4.2 Door one — proportionate share (the "partial goodwill" default)

NCI = NCI's proportionate share of net IDENTIFIABLE assets. Canon (python-verified): consideration ₹400cr for 80%; net identifiable assets ₹300cr → NCI = 20% × 300 = **₹60cr**; goodwill = 400 + 60 − 300 = **₹160cr**. Read what the ₹160cr is: goodwill attributable ONLY to the parent's 80% — the control premium and synergies you paid show up only on the slice you bought; the minority's 20% carries no halo at all.

### 4.3 Door two — fair value (the "full goodwill" method)

NCI measured at FAIR VALUE — say observable stake pricing puts the 20% at **₹90cr**. Goodwill = 400 + 90 − 300 = **₹190cr** (python-verified). Read what happened: paying ₹400cr for 80% implies the whole 100% trades near ₹500cr (400 ÷ 0.8), so a naively linear minority value would be ₹100cr. The assessed ₹90cr sits BELOW linear, precisely because a minority slice carries no control premium — control economics never divide evenly, and good valuers state that adjustment in writing. The ₹30cr delta over door one (190 − 160) is the share of the whole-pie goodwill that attaches to the minority's slice: door two carries the FULL estimate of the halo, parent-side and minority-side together, instead of the parent's ₹160cr slice alone.

### 4.4 Consequences that outlive the journal — why CFOs argue about this

| Dimension | Proportionate (160) | Fair value (190) |
|---|---|---|
| Goodwill carried | Parent-slice only | Whole-estimate |
| NCI equity | Lower (60) | Higher (90) |
| **Impairment later** | Entirely owners'-facing | Split between owners and NCI |
| ROIC denominator | Leaner | Heavier by ₹30cr forever |
| Disclosure texture | Simpler | Must defend NCI valuation |

The impairment line deserves slow reading (CS7 preview): goodwill impairment charges allocate between owners and NCI **on the same basis as profits** only under full-goodwill; under partial, the synthetic gross-up convention allocates the FULL test's loss but the books stay silent about un-recognized NCI goodwill (the standard's own complication — your notes disclose the difference honestly).

### 4.5 Pricing the fat door — where does ₹90cr come from?

Fair value of NCI per Ind AS 113's hierarchy: (a) quoted price of the sub's shares in an ACTIVE market — the king input — adjusted critically (a minority quoted stake ≠ the whole's proportionate value: control premia inflate the parent's effective price, so linear extrapolation OVERPRICES the slice: discount adjustment per facts); (b) recent minority-stake transactions; (c) income/market techniques (DCF on the sub, guideline multiples) with Level-3 sensitivity disclosure. Never casually accepted: a NCI fair value with no market evidence inside it is an auditor's favorite conversation.

### 4.6 The election as commerce — per-transaction, documented, forever

The choice is made PER business combination (not a group-wide policy), in the PPA documentation, with the valuation file archived. Election heuristic from the field: use FAIR VALUE where quoted evidence exists (listed subs) and future impairment allocation symmetry is desired; use PROPORTIONATE where goodwill-lean balance sheets matter and market evidence is thin. Decided once, lived with permanently: later equity changes (CS5) and eventual disposals (CS8) inherit whichever base the acquisition day chose.

## 🧪 LAB — The Fork Walk (10 min)

Meridian acquires 75% of SatelliteCo for ₹600cr. SatelliteCo's net identifiable assets at fair value: ₹640cr. SatelliteCo's listed price implies the 25% minority stake trades at ₹230cr based on a market-observed class-B quote (no control premium inside the small-trades evidence).

1. NCI and goodwill under the proportionate door.
2. NCI and goodwill under the fair-value door.
3. The delta — and one sentence on what it represents.
4. Three years later the CGU takes a goodwill impairment of ₹80cr — describe the attribution under both doors (CS7 spoiler, one line each).
5. One diligence question your valuer's report MUST answer for you to sign door two.

**Why this matters:** this computation is PPA table one; the file that holds it is the file equity reviewers open first.

**🔑 Lab answers:**
1. NCI = 25% × 640 = **₹160cr**; goodwill = 600 + 160 − 640 = **₹120cr**. 2. NCI = **₹230cr**; goodwill = 600 + 230 − 640 = **₹190cr**. 3. **₹70cr** — the NCI's share of the full-pie goodwill: one deal, two honest ways to account for the halo, the books carrying it either only on the parent's slice or all-in. 4. Partial: charge hits owners' equity entirely (with the synthetic gross-up convention behind the test disclosed); full: ₹80cr splits between owners' share and NCI by the profit-allocation basis (75/25 → 60/20), equity attribution varying visibly. 5. Where does the ₹230cr evidence come from and does it OVER-include control economics? — hierarchy level, control-premium treatment, and sensitivity must be in black and white before the election is locked.

## 💪 Exercises

1. Why might linear 100%-extrapolation overprice NCI fair value? One dense sentence on premiums.
2. ROIC debates: acquiring management prefers door one. Two likely motives, one honest and one cosmetic.
3. Rebuild the canon backwards: goodwill reported ₹190cr at NCI-FV election, net identifiable ₹300cr, consideration ₹400cr — infer the NCI fair value.
4. When may a company use proportionate on one acquisition and fair value on the next?

### ✅ Selected answers

1. Because the parent's price embeds the premium for CONTROL (synergies, veto-proof strategy, board command) which a minority slice does not possess — extrapolating it linearly ascribes control economics to shares that carry none, so the fair-value file must strip premium evidence down to the minority's actual returns.
2. Honest: market evidence is genuinely thin (Level-3 fantasy NCI would be worse than none). Cosmetic: a leaner goodwill block keeps ROIC denominators and future impairment shocks smaller on paper — the door-one habit smells like cosmetics when the same acquirer loves full-goodwill only on its favorite targets.
3. The equation inverts: 190 = 400 + NCI − 300 → NCI = **₹90cr** — every PPA is algebra-solvable backwards, which is exactly how diligence teams recompute your numbers.
4. Any time — the election is PER BUSINESS COMBINATION; document the basis for each, disclose both, and consistency applies only within each deal's life, not across the deal calendar.

## ❓ Quiz

**Q1.** The two doors on the canon (400 for 80%, NA 300):
(a) goodwill 160 both ways
(b) partial → NCI ₹60cr + goodwill ₹160cr; full → NCI ₹90cr + goodwill ₹190cr — a ₹30cr fork representing the NCI's share of the whole-pie goodwill, elected PER transaction in the PPA file and living with the creature forever after
(c) goodwill 60 in full method
(d) NCI zero under full-goodwill

**Q2.** Full-goodwill's impairment consequence:
(a) all impairment hits NCI
(b) impairment charges allocate between OWNERS and NCI on the profit-sharing basis — the ₹80cr hit splits 60/20 on a 75/25 creature — while the partial-goodwill world charges the whole visible hit to owners (with the gross-up convention disclosed), so the door chosen years earlier decides who absorbs today's bruise
(c) impairment is prohibited
(d) NCI exits the balance sheet on impairment

**Q3.** NCI at fair value is hardest to defend when:
(a) the sub is listed with liquid trades
(b) there's NO market evidence — Level-3 DCF fantasy stacked into a permanent balance-sheet block; defensible NCI fair value runs on hierarchy: quoted liquid prices (control-premium-adjusted), recent stake trades, then techniques with disclosed sensitivities — a valuer's report missing those answers is the file that returns unsigned
(c) goodwill is small
(d) NCI profit share is positive

### ✅ Answers

1. **(b)** — 160 vs 190: the fork in one equation, elected once per deal, lived with permanently.
2. **(b)** — full-goodwill splits the bruise by profit-share; partial concentrates it on owners.
3. **(b)** — the further the evidence from Level-1 liquid prices, the louder the audit file must speak.

## ✅ Mastery checklist

- [ ] I can run the acquisition equation with either NCI door
- [ ] I can recompute both canons: 160/60 and 190/90, and infer any fourth number backwards
- [ ] I can explain the impairment-attribution split each door creates
- [ ] I can judge NCI fair-value evidence by hierarchy
- [ ] I can brief the per-transaction election with commerce reasons

---

**Next:** **CS5 · After Acquisition: Attribution & the Equity Family** — the moving years: profit split between owners and NCI (losses too, NCI may go negative), consolidated equity movements, and the mysterious rule that buying MORE of your own child (80% → 90%) is an EQUITY family transaction — ₹5cr to reserves, zero to goodwill, zero to P&L.
