# 🎯 CS9 · Associates & Joint Ventures — The Equity Method's One-Line Consolidation

> Between "full consolidation" (control) and "just an investment" (financial asset) lives the middle kingdom: ASSOCIATES — entities over which you hold significant influence (the 20% presumption) but not control — and JOINT VENTURES — arrangements you control only jointly with partners. These don't become organs of the creature; they get a single elegant line instead: **the equity method**, where your investment line breathes with the investee's fortunes: cost ₹30cr + your share of profit ₹6cr − dividends received ₹2cr = carrying ₹34cr. One line, one income line ("share of profit of associates"), infinite depth beneath: fair-value layers at acquisition, uniform-policy alignment, only-YOUR-share eliminations, losses that stop at zero, and impairment of the whole stake as a single asset. The middle kingdom's engine, today's module.

---

## 🎯 Objectives

- Classify the middle kingdom: associate (significant influence) vs JV (joint control) vs joint operation
- Run the equity method walk: ₹30cr + ₹6cr − ₹2cr = ₹34cr with its two statement lines
- Apply the investor-share-only eliminations: ₹5cr × 30% = ₹1.5cr
- Stack the fair-value layer mechanics (PPA-style) inside equity method
- Stop losses at zero — and know when obligations force further recognition
- Test the equity-method investment for impairment as ONE asset

## 📘 Concepts

### 9.1 The kingdom's two species — influence vs joint control

An **associate** exists wherever the investor holds significant influence — power to PARTICIPATE (not direct) in financial/operating policy decisions, presumed at ≥20% voting rights unless clearly rebutted (board seat, policy participation, material intercompany flows, management interchange all evidence influence at 19% too — the presumption is a threshold, not a prison). A **joint venture** requires JOINT CONTROL: contractually shared power where decisions on relevant activities need UNANIMOUS consent of the sharing parties — and the arrangement must be structured so parties have rights to the vehicle's NET ASSETS (a separate vehicle with net-asset stakes = JV). Where parties hold rights to individual ASSETS and obligations for liabilities instead — a **joint operation** — the middle kingdom's odd cousin accounts proportionately (your share of every line, no equity method). Different treaties, different accounting.

### 9.2 The one-line engine — the walk (python-verified)

Associate at 30%: invest at cost **₹30cr**. Year 1: associate earns ₹20cr profit → your share **₹6cr** recognized in your consolidated P&L as "share of profit of associates," investment rises to ₹36cr. Associate pays dividends ₹6.67cr → your receipt ₹2cr — not income in YOUR creature view (the creature already banked the profit share); dividends reduce the investment's carrying: ₹36 − 2 = **₹34cr**. The line breathes. Your P&L carries exactly one associate line; your balance sheet carries exactly one associate line; the walk cost + share − dividends = carrying anchors every schedule.

### 9.3 The fittings — fair value layers, policies, direction-limited UPP

Equity method runs PPA inside itself: acquisition-date fair-value layers on the associate's assets (plant FV above its book → your share of EXTRA depreciation nets against your profit share each year — the same DT9/CS12 engine, one layer thinner). Uniform policies: associate's books restated to your policy basis before sharing (CS3's doctrine, shared one line deep). And the eliminations: intra-trades with associates erase only YOUR SHARE of the unrealized profit — sale to associate with ₹5cr margin still in its stock: adjust **30% × 5 = ₹1.5cr** (python-verified) against investment/profit share — not the 100% subsidiary erasure; the associate is outside the creature's skin, so only your slice of the motion is internal (associate→you upstream likewise ₹-share only). Note the discipline variation: downstream hits investment; upstream hits profit-share calculation conveniently documented in the associate schedule.

### 9.4 Losses that stop at zero — the floor with a caveat

Share of associate losses: recognized until the equity-method carrying hits **ZERO** — then STOP. Resume recognizing profits only after your share of profits equals the shares of unrecognized losses (the deficit must fill before the line breathes again). Caveat with teeth: where the investor has LEGAL or constructive obligations (guarantees, committed fundings) or made payments on the associate's behalf, recognize further losses as a LIABILITY to that extent — the floor protects silent partners, not guarantors. (DT8's group-loss DTAs interlocks: a child's losses raise deferred-tax questions only inside the parent's gate discipline, separate schedule.)

### 9.5 Impairment — the stake as one single asset

The equity-method investment is tested for impairment as ONE single asset under Ind AS 36 (indicators first — associate's market collapse, sector shift); no split of the embedded goodwill (there IS goodwill inside: cost above your share of net FV — riding invisibly within the one line). Recovery → reversal ALLOWED (the never-reverse wall applies only to standalone recognized goodwill; the embedded slice inside an equity-method line reverses like any other asset). Disclosure for material associates: summarized financial information (100% basis: assets, liabilities, revenues, profit) — letting readers do their own share-math.

### 9.6 Exit ramps — when the middle kingdom ends

Escape hatches: associate becomes subsidiary (cross the control line → CS8's remeasurement ritual fires — ₹60cr to ₹150cr deemed-disposal canon lives there); associate becomes held-for-sale (Ind AS 105 pauses equity method on the held slice); investor becomes an investment entity (FVTPL door); associate dies by liquidation. Every ramp is a transition with its own journal discipline — the middle kingdom never simply evaporates.

## 🧪 LAB — The Middle Kingdom File (10 min)

Meridian holds 30% of AllyCo since 1 April: cost ₹30cr. AllyCo year: profit ₹20cr (after Meridian-policy restatement); plant FV layer at the associate's acquisition adds your-share extra depreciation ₹0.6cr; AllyCo paid dividends totalling ₹6.67cr (Meridian's receipt ₹2cr). Meridian sold AllyCo components with ₹5cr margin; the lot sits half-sold at year-end (half still in AllyCo's stock).

1. Profit share before layers and eliminations.
2. Net the FV-layer overload.
3. UPP elimination: how much, where, and why not 100%?
4. Year-end investment carrying.
5. Next year AllyCo loses ₹40cr in Q1 (your share ₹12cr): apply the floor rule to the resulting carrying amount and name the caveat.

**Why this matters:** the associate schedule is a mini-consolidation; equity method mastery is the difference between reading and reciting group notes.

**🔑 Lab answers:**
1. 30% × 20 = **₹6cr**. 2. Share of extra layer dep −₹0.6cr → adjusted associate profit share **₹5.4cr**. 3. Only YOUR share of the embedded margin: half-stock margin ₹2.5cr × 30% = **₹0.75cr** eliminated against the investment line (NOT the full ₹5cr or ₹2.5cr — associate lines erase at stakeholder-slice granularity only). 4. Carrying = 30 + 5.4 − 0.75 (UPP applies down-line) − 2.0 = **₹32.65cr**. 5. Share of loss ₹12cr vs carrying ₹32.65cr → recognize fully; carrying lands **₹20.65cr**. The floor rule engages only when losses would drive the stake below zero — recognize down to ZERO, memo-park the overflow, resume profit-share after refills; guarantees or constructive obligations force a liability beyond it. (Here the ₹12cr fit inside ₹32.65cr, so full recognition stands clean.)

## 💪 Exercises

1. Why don't 100% of associated-interco UPPs eliminate? One dense sentence.
2. An associate's market cap collapsed 60% this year; your carrying stands well above your side-value. What fires, and what CAN reverse later?
3. AllyCo pays a bumper ₹10cr dividend (your share ₹3cr). P&L effect in YOUR consolidated statements?
4. Classify: three partners share decisions unanimously on RelevantCo, with rights to individual production lines and obligations for the plant's loans. JV or JO — and the accounting consequence?

### ✅ Selected answers

1. Because the associate lies OUTSIDE the creature's skin — only your 30% slice of the internal motion is yours-to-undo; the other 70% genuinely involved outsiders' economics, and erasing it would fabricate a creature-boundary the law never drew (subsidiaries erase 100% because the whole child is inside the skin).
2. An Ind AS 36 impairment test on the ENTIRE equity-method stake as one asset (embedded goodwill invisible inside): write the line down if recoverable is short; unlike standalone goodwill, reversals ARE permitted when the associate recovers — the never-reverse wall does not patrol inside this one line.
3. ZERO P&L effect — dividends are returns OF capital under equity method, not income: the ₹3cr reduces the investment's carrying (the creature recognized earnings when AllyCo made them, line "share of profit," dividends just convert the claim to cash).
4. **Joint operation** — rights to specific assets + obligations for specific liabilities (not net-asset stakes): account PROPORTIONATELY (your share of each asset/liability/income/expense line), no equity method, no single line; the unanimous-consent detail makes it joint control, and the rights-structure makes it JO rather than JV.

## ❓ Quiz

**Q1.** The equity-method canon (30%, cost ₹30cr, profit share ₹6cr, dividend ₹2cr):
(a) carrying ₹30cr flat, income ₹2cr
(b) investment breathes: 30 + 6 − 2 = carrying ₹34cr, with the P&L holding exactly one associate line — share of profit ₹6cr — while dividends reduce carrying instead of touching income; cost plus share minus returns, the one-line consolidation's entire gearbox
(c) carrying ₹36cr, no dividend impact
(d) nothing until sold

**Q2.** Your 30% associate bought your goods with ₹5cr margin, all in its stock:
(a) eliminate 100% like a subsidiary
(b) eliminate only YOUR share — 30% × 5 = ₹1.5cr — against the investment line: associate territory sits outside the creature's skin, so merely your slice of the internal motion is internal; the subsidiary-style full erasure would invent a boundary outsiders never signed
(c) eliminate nothing — arms-length
(d) expense the margin

**Q3.** Associate losses beyond your stake (carrying down to ₹0):
(a) always recognize forever
(b) STOP at zero unless legal/constructive obligations or guarantees force a liability for the excess — memo-share the overflow losses, resume profit-share only after they refill; the floor protects silent partners, never guarantors
(c) impair to negative
(d) consolidate immediately

### ✅ Answers

1. **(b)** — the breathing line: carrying 34, income only the ₹6cr share; dividends shrink the claim.
2. **(b)** — stakeholder granularity: ₹1.5cr eliminated, never the full ₹5cr.
3. **(b)** — zero-floor with guarantee teeth; losses memo-park beyond it.

## ✅ Mastery checklist

- [ ] I can classify associates vs JV vs JO by rights-structure
- [ ] I can run the cost + share − dividends walk cold
- [ ] I can apply investor-share-only UPP matters
- [ ] I can stack FV layers inside the share
- [ ] I can run the zero floor with its guarantee teeth
- [ ] I know impairment treats the stake as one asset with reversal allowed

---

**Next:** **CS10 · The Foreign Subsidiary — Translation & the CTA** — when the creature spans currencies: functional currency doctrine, closing-rate assets and average-rate incomes, and the translation difference that parks in OCI as a cumulative adjustment (₹1.25cr canon) — which then RECYCLES to P&L the day the foreign child leaves the family.
