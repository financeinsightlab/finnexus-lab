# 🎯 DT9 · The Business-Combination Gateway — Deferred Tax Born Inside Goodwill

> Here's the plot twist that makes M&A accounting sing: when you BUY a company, Ind AS 103 re-measures everything it owns to fair value in the consolidated books — plants, land, licences, customer lists — but the tax base stays exactly where the seller left it. A factory the seller depreciated to ₹100L gets inked at ₹140L fair value on your balance sheet while the tax department still sees ₹100L. That ₹40L step-up is a taxable temporary difference, born at the combination, NOT touching profit — so the initial-recognition exemption explicitly does NOT apply (business combinations are carved out of the IRE). The DTL ₹10L makes its debut INSIDE the goodwill equation: net assets fall, goodwill rises by exactly ₹10L. Deferred tax that increases goodwill at acquisition — the gateway drug to the consolidation course, and today's module.

---

## 🎯 Objectives

- Read the acquisition bridge: book (target) vs fair value (consolidated) vs tax base (frozen)
- Book the step-up DTL correctly: why the IRE is carved out for business combinations
- Run the goodwill feedback: DTL ₹10L → goodwill +₹10L (python-verified equation)
- Handle the bargain-purchase variant and acquisition-date DTAs of the target
- Recognize this module as the gateway pass into Ind AS 110 territory (v54)

## 📘 Concepts

### 9.1 The bridge — three numbers for every asset

On acquisition date, every identifiable asset and liability stands with three numbers: the TARGET's old book value (irrelevant to you post-close), the FAIR VALUE that Ind AS 103 inks into consolidated books, and the TAX BASE the statute keeps on the old owner's register (a share deal doesn't rewrite the target's tax file). Factory: old book ₹95L, fair value ₹140L, tax base ₹100L (the seller's depreciated WDV). Consolidated carrying vs tax base → TD ₹40L taxable → **DTL ₹10L** at 25%. IRE? Inapplicable — the exemption's own text excludes business combinations; the standard deliberately sends these born shadows to the goodwill equation instead of banishing them.

### 9.2 The goodwill feedback (python-verified)

Ind AS 103's master equation: **goodwill = consideration transferred (+ NCI and previously-held interest at FV) − fair value of NET identifiable assets acquired** — and "net" means net of the deferred taxes recognized on the step-ups. Simple canon: consideration ₹400L; identifiable assets at FV ₹340L (factory 140 + other 200) and liabilities nil; before the DTL, net assets ₹340L → goodwill ₹60L. Now book the step-up DTL ₹10L against the factory's uplift: net identifiable assets become 340 − 10 = ₹330L → **goodwill = 400 − 330 = ₹70L**. The shadow raised goodwill by ₹10L — one-to-one, rupee-perfect, python-verified. Board translation: the buyer inherits the extra future tax the revalued factory will attract and pays for it in goodwill today. (DT3's carve-out protects only goodwill's OWN initial DTL, not shadows on identifiable assets — the two are separate safeties.)

### 9.3 The bargain corner and the target's own DTAs

Bargain purchase (consideration BELOW net identifiable assets): step-up DTLs still book the same way — they SHRINK the pre-DTL gain: identifiable net ₹340, DTL 10 → net ₹330; consideration ₹310 → **gain ₹20L, not ₹30L** (the DTL just ate ₹10L of the bargain). Flip side, the sweeter one: the TARGET may carry unrecognized DTAs (its own loss carryforwards the gate kept off its books). On acquisition, the parent's view of utilization probability improves (group profits stand behind the losses) → previously unrecognized DTAs get recognized AT acquisition — reducing goodwill (a ₹10L loss-DTA recognized lowers net assets upward and goodwill by ₹10L) or, if discovered later within the measurement period, adjusting goodwill; after that window, recognized through P&L. M&A diligence file, one line: "find every unrecognized DTA in the data room — it is purchase-price arithmetic wearing a cloak."

### 9.4 Post-acquisition unwind — the shadow's annuity (python-verified)

The factory DTL ₹10L is no museum piece: consolidated books now depreciate the stepped ₹140L against tax's ₹100L schedule, so ₹40L of TD unwinds over the remaining useful life (say 4 years): release **₹2.5L per year** of deferred tax income for four years, DTL walking 10 → 7.5 → 5.0 → 2.5 → zero, exactly the DT4 homecoming wearing an acquisition costume. Analysts love this line: for years after a big tax-free-basis acquisition, acquire-and-hold companies show a deferred tax INCOME stream with no fresh cash cost — a quiet earnings tailwind documented in the tax note, scripted at acquisition day. You will meet its full cousin machinery at scale in the consolidation course.

### 9.5 Gateway skills you just acquired

Reading acquisition notes = reading three tables together: the fair-value allocation table (PPA), the contingent consideration roll, and the deferred tax note's acquisition-date columns. The questions trained here: which step-ups got shadows, what goodwill got fed, which unrecognized DTAs got activated by group logic, how big is the unwind annuity. These EXACT questions reappear in Ind AS 110's consolidation eliminations — DT9 is the gateway because consolidation is just this bridge, run on every group company, every year, forever.

## 🧪 LAB — The Acquisition Bridge (10 min)

Meridian acquires 100% of ForgeTech for **₹400L** (share deal). At acquisition date: plant fair value ₹140L (tax base ₹100L); other net identifiable assets at FV ₹200L (book = tax base, no gaps); ForgeTech carried ₹28L of unused losses with NO DTA recognized (gate failed solo); group profits make utilization probable now (rate 25%).

1. Compute the step-up DTL on the plant.
2. Net identifiable assets post-shadow, before losses.
3. DTA on ForgeTech's losses recognized at acquisition — amount and goodwill effect.
4. Final goodwill number.
5. The unwind: plant's remaining life is 4 years — annual deferred tax effect from this step-up.

**Why this matters:** this five-step bridge is the opening schedule of every real PPA working paper; if you can run it, M&A notes stop being fog.

**🔑 Lab answers:**
1. 140 − 100 = 40 × 25% = **DTL ₹10L**. 2. Pre-loss net = 140 + 200 − 10 = **₹330L**. 3. 28 × 25% = **DTA ₹7L recognized** (group-backed probability) — raises net identifiable assets to ₹337L, goodwill shrinks ₹7L. 4. Goodwill = 400 − 337 = **₹63L**. 5. Release 40 ÷ 4 × 25% = **₹2.5L/year of deferred tax income**, the DTL stepping 10 → 7.5 → 5.0 → 2.5 → nil across four years.

## 💪 Exercises

1. "The step-up DTL costs the buyer nothing since it never touches P&L at acquisition." Destroy this in two lines using the equation.
2. Why does the IRE not apply to business combinations? Answer in terms of where the double-entry lands.
3. A bargain-buy shows consideration ₹310L, pre-DTL net assets ₹340L, DTL ₹10L. Compute the reported gain and name what ate the difference.
4. In diligence you spot ₹60L of unrecognized target losses. List the two questions that determine whether the parent's books can wear their DTA.

### ✅ Selected answers

1. It costs REAL money wearing goodwill's mask: the ₹10L rises goodwill one-to-one (400 − 330 = 70 vs 400 − 340 = 60), and it also scripts future annual depreciation gaps — the buyer carries both the goodwill inflation and the unwind calendar.
2. Because the other side of the entry has a legal home — the goodwill equation: net identifiable assets absorb the shadow and goodwill compensates. For stand-alone purchases no such home exists (it would recurse the asset's own cost), hence the exemption's carve-out boundaries drawn exactly here.
3. Gain = 310 − 330 = **₹20L** (not ₹30L): the step-up DTL ate ₹10L of pre-DTL bargain-value. The whimper in the note: "gain on bargain purchase ₹20L" is POST-shadow value by construction.
4. Un-utilization evidence (are group taxable profits probable against them — the DT3 gate) and jurisdictions/sections validity (do the losses survive change of ownership under their statutes), plus expiry windows — the answers decide between ₹15L of DTA inside the goodwill equation and zero.

## ❓ Quiz

**Q1.** The plant step-up (FV ₹140L, tax base ₹100L) at acquisition:
(a) IRE applies — nothing booked
(b) DTL ₹10L recognized — business combinations are carved OUT of the initial-recognition exemption; the shadow is booked inside the goodwill equation, raising goodwill one-to-one: 400 − (340 − 10) = ₹70L instead of ₹60L; the buyer pre-pays the inherited tax in the purchase arithmetic
(c) DTA ₹10L against goodwill
(d) expense ₹10L immediately

**Q2.** Recognizing the target's dormant loss DTAs at acquisition (₹28L losses → ₹7L):
(a) is forbidden after the deal closes
(b) raises net identifiable assets by ₹7L and SHRINKS goodwill one-to-one (63 vs 70 in the lab chain) whenever group profits make utilization probable — the data-room exercise every M&A diligence runs; within the measurement window it adjusts goodwill, after it it flows through P&L
(c) increases the bargain gain
(d) creates a permanent difference

**Q3.** The step-up DTL's four-year unwind means the acquirer's consolidated tax note shows:
(a) an unusual new current-tax cost
(b) ₹2.5L per year of DEFERRED TAX INCOME as the ₹10L walks 10 → 7.5 → 5.0 → 2.5 → 0 — the DT4 homecoming in acquisition costume; a scripted post-deal tailwind analysts should read as acquisition arithmetic, not operating skill
(c) goodwill shrinking yearly
(d) fresh DTL every year

### ✅ Answers

1. **(b)** — carve-out carved where the goodwill equation can absorb the shadow: DTL ₹10L, goodwill +₹10L.
2. **(b)** — dormant DTAs activated by group probability: net assets +₹7L, goodwill −₹7L.
3. **(b)** — the unwind annuity: four years of scripted deferred income.

## ✅ Mastery checklist

- [ ] I can draw the three-number bridge for any acquired asset
- [ ] I can run goodwill with the step-up DTL: 400 − 330 = 70, then with DTA: 63
- [ ] I can explain the IRE carve-out for business combinations
- [ ] I can handle bargain purchases and dormant-DTA activation
- [ ] I can read the four-year unwind annuity in a post-deal tax note

---

**Next:** **DT10 · India Deep Dive** — the desi operating manual: the 25.168% rate anatomy, 115BAA and the regime fork, WDV blocks in the wild, Section 43B's payment gate, MAT's 15-year fuse revisited at scale, and the Ind AS-transition deferred-tax layer sitting in opening reserves of nearly every Indian balance sheet you will ever open.
