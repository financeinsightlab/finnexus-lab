# 🎯 DP5 · The Revaluation Model — Fair Value on the Face, OCI in the Middle

> The cost model shows history; the revaluation model shows today — at a price. Ind AS 16 para 29/31 lets you choose, PER CLASS of assets: carry at cost-less-depreciation, or at a revalued amount — fair value at the revaluation date, less subsequent depreciation and impairment. Switch families and you switch consequences: profits get quieter (gains bypass P&L, riding into OCI), equity gets a revaluation-surplus pocket with strict doorkeepers, and the income tax department sends a deferred-tax invoice on value it never taxed. This module runs the upward ₹10L stair, the downward ₹6L drop (P&L first when no surplus exists), and the class-wide rule that bans cherry-picking.

---

## 🎯 Objectives

- State the two measurement models and the per-CLASS election rule
- Journal an upward revaluation: gain → OCI → revaluation surplus in equity, net of deferred tax (₹10L → ₹7.5L net + ₹2.5L DTL)
- Journal downward moves: P&L first, surplus-drain only to the extent the SAME asset has surplus
- Apply the regularity rule: revalue often enough that carrying material-difference never grows stale
- Explain why revaluation profit is structurally different from earned profit — and why analysts strip it

## 📘 Concepts

### 5.1 Two models, one choice per class — no portfolio picking

After recognition, an item of PPE is carried under either the **cost model** (cost less accumulated depreciation and impairment — the DP1–DP4 world) or, if its fair value can be measured reliably, the **revaluation model** (fair value at the revaluation date, less SUBSEQUENT accumulated depreciation and impairment — para 31). The election is made for an entire CLASS of PPE — land, land-and-buildings, plant and machinery — not asset-within-class. Choose to revalue your Kundli plant's land and every land parcel in the class comes along: the standard read your mind and banned the shopping-cart.

Regularity: revaluations must happen with enough frequency that carrying amount does not differ MATERIALLY from fair value at the reporting date — volatile classes annually, sleepy ones every 3–5 years. Independent valuers are customary, engagement terms disclosable, and manipulation pressure famous (DP11's valuer-shopping radar).

### 5.2 The upward stair — ₹10L to OCI, not to profit (python-verified)

A class of machinery: carrying amount **₹40L**, valuer's fair value **₹50L**. The ₹10L increase is credited to **other comprehensive income** and accumulated in equity under **revaluation surplus** — NOT to P&L. The exception corridor: if this same asset previously suffered a revaluation DECREASE charged to P&L, the increase now goes to P&L to the extent it reverses that earlier charge — the standard repays its debts through the same door it charged them.

Then the tax shadow: revaluing creates a taxable temporary difference (book base 50 against tax base 40; the depreciation-heavy complexities live in the deferred-tax course) → **deferred tax liability ₹2.5L** at the course's 25% teaching rate, charged against OCI, so the surplus in equity stands NET: **₹7.5L**. Headline: the balance sheet rises ₹10L gross, deferred tax takes ₹2.5L of the seat, equity's surplus pocket holds ₹7.5L — and profit's tally for the year: not one rupee.

### 5.3 The downward drop — P&L first

Symmetry with a trapdoor. Carrying ₹40L, valuer says **₹34L**: the ₹6L decrease is recognized **in profit or loss** — screamingly visible — EXCEPT to the extent a credit balance exists in revaluation surplus in respect of THAT SAME asset, in which case the decrease debits that surplus first (in OCI), P&L taking only the overflow. Sequence (python-verified): if the same asset was earlier revalued up from 40 to 50 (surplus ₹10L) and now falls to **₹44L**, the ₹6L decrease drains surplus → **surplus left ₹4L, P&L untouched**. Falls further, below the surplus cushion? The spill hits earnings.

This asymmetry does quiet, honest macro work: companies cannot credit wins to profit and hide losses in equity — the standard forces LOSSES into P&L first and wins into OCI first (subject to the reversal corridors both ways). Analysts remember it as the "masochistic bias" of revaluations: engineered to abuse-profit-proof.

### 5.4 The two book-closing techniques (para 35)

At revaluation date, handle accumulated depreciation either (a) **gross method** — restate gross carrying amount proportionately and recompute accumulated depreciation so carrying equals revalued amount (the method-of-choice when an index restates cost), or (b) **elimination method** — eliminate accumulated depreciation against the gross carrying amount and restate the net to fair value (customary for buildings). Same destination: the slate resets so the revalued amount IS the new base, and deferred-tax consequences follow whichever road you take.

### 5.5 Why analysts strip revaluation — profit vs prettiness

Revaluation surpluses fatten equity without earning power; return-on-equity denominators swell; depreciation from tomorrow's model gets dearer (DP6: ₹10L/yr vs ₹8L/yr on the canon). Nothing about cash changed. Pick your reading ritual: strip the surplus for earning-power metrics, READ it for asset-backing metrics (covered land banks do support credit), and always, ALWAYS read the valuation-note details — who valued, what technique, how long ago, and whether the same class somewhere else quietly stayed at cost. DP6 keeps the household running: transfers, disposals, and the art of never letting surplus leak back through P&L.

## 🧪 LAB — The Stair and the Drop (10 min)

A class "land and buildings" sits at carrying ₹120L; independent valuer marks it ₹150L. Tax 25% teaching rate.

1. Journal the revaluation (assets, OCI/surplus, DTL).
2. Next year, before any depreciation, the same property falls to ₹140L fair value. Where does the ₹10L go?
3. Following year it falls again, to ₹128L. Where does THIS ₹12L go — split it.
4. Had the class never been revalued and fell straight to ₹128L from the ₹120L cost-based carrying, where would the movement go? (Trick — think about what a cost-model book does with a fall: which standard handles it?)
5. One sentence to your CFO about why the equity bump cannot fund a special dividend on prudence grounds.

**Why this matters:** revaluation journals are where beautiful balance sheets quietly hoard unexplored tax and P&L tripwires; reading the stair both directions is the analyst's habit.

**🔑 Lab answers:**
1. Dr PPE 30 → Cr OCI/revaluation surplus ₹30L gross; recognize DTL ₹7.5L (30 × 25%) charged to OCI → surplus stands net **₹22.5L**. 2. Entirely against the surplus in OCI: surplus 22.5 − (10 net of tax effects, teaching rate kept simple) drains; P&L untouched. 3. First the remaining surplus (≈ ₹15L standing before this fall, so ₹12L fits inside the same-asset cushion) → still OCI, P&L zero; had the fall exceeded the cushion, only the overflow would hit P&L. 4. A cost-model book does NOT "revalue down" — it applies Ind AS 36 IMPAIRMENT (₹8L through P&L if recoverable triggers confirm, DP9); the two models answer falls through different doors. 5. The surplus is unrealized, tax-shadowed, and reversible next market sneeze — prudence says dividends from EARNED profit, not from a valuer's Tuesday.

## 💪 Exercises

1. Journal the machinery canon: 40 → 50, tax 25%. Show the gross and the net.
2. The same class has another machine (never revalued) fall 6 in value. Does its fall drain the first machine's surplus? Rule?
3. Why does election-by-CLASS matter to a group that owns 40 plots of land? One paragraph.
4. A listed company revalued plant every year for 3 years, always upward, always with a different valuer. List two radar questions.

### ✅ Selected answers

1. Dr Machinery ₹10L; Cr OCI–revaluation surplus ₹10L gross. Dr OCI ₹2.5L; Cr deferred tax liability ₹2.5L. Equity surplus net **₹7.5L**. Profit untouched.
2. No — decreases debit surplus only "in respect of that same asset"; machine two's ₹6L drop goes straight to P&L, screaming. (Some jurisdictions read the cushion at class level; the canon-file rule you memorize is same-asset-strict — defensible everywhere.)
3. Class-election means forty plots ride together: no revaluing the five with gains and cost-holding the thirty quiet ones. The group must either carry the valuation cost for all forty annually-by-policy or stay at cost — the anti-cherry rule is the standard's integrity spine.
4. Frequency without volatility trigger smells like surplus-engineering; valuer rotation each year smells like shopping; read the engagement letters, the technique changes, and whether certain plants stayed cost-model while peers climbed.

## ❓ Quiz

**Q1.** An upward revaluation of ₹10L (never-before-revalued asset, 25% tax teaching rate):
(a) increases profit by ₹10L
(b) is credited to OCI and accumulates in a revaluation surplus in equity — net ₹7.5L after recognizing a ₹2.5L deferred tax liability against OCI — with P&L receiving exactly ₹0 (P&L touches such gains only when reversing that asset's earlier P&L-charged decrease)
(c) increases revenue, disclosed in segment note
(d) is deferred until the asset is sold

**Q2.** Same asset later falls ₹6L in fair value with ₹10L gross surplus standing:
(a) P&L takes the ₹6L immediately
(b) the decrease debits the existing surplus (through OCI) in respect of that same asset → surplus left ₹4L, P&L untouched; only a fall EXCEEDING the surviving cushion spills into profit
(c) deferred tax is also reversed through P&L
(d) the cost model must be adopted now

**Q3.** The class-election rule exists primarily to:
(a) save valuation fees
(b) block cherry-picking — revalue your prime land and every parcel in the class follows, so management cannot surf only the winning assets into OCI while parking the losers at cost
(c) align with Companies Act Schedule II
(d) keep auditors employed

### ✅ Answers

1. **(b)** — OCI plus net-of-tax surplus; profit untouched: the upward stair bypasses earnings.
2. **(b)** — same-asset cushion absorbs the drop first; only overflow bleeds into P&L.
3. **(b)** — the anti-shopping-cart rule; a class rises or stays, together.

## ✅ Mastery checklist

- [ ] I can state both measurement models and the per-class election
- [ ] I can journal 40 → 50 with the ₹2.5L DTL and net ₹7.5L surplus
- [ ] I can trace a ₹6L fall through the surplus cushion and name the P&L overflow condition
- [ ] I know the reversal corridors (up-after-down → P&L; down-after-up → surplus first)
- [ ] I can argue why analysts strip revaluation profit for earning-power reads

---

**Next:** **DP6 · Living with Revaluation** — the household chores: depreciating the revalued base (₹10L/yr vs ₹8L/yr), the silent ₹2L/yr transfer from surplus to retained earnings, disposals of revalued assets (gain ₹2L P&L, surplus → RE, never recycled), deemed cost at first-time adoption, and valuer-shopping radar.
