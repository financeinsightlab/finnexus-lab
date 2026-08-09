# 🎯 IC3 · Cost Formulas — FIFO vs Weighted Average, and LIFO's Funeral

> One shelf, three prices, one sale: which cost leaves? Identical units bought at ₹50, ₹60 and ₹70 are fungible — accounting must ASSIGN an exit price to each departing unit, and that assignment is the entire game. Ind AS 2 (like IFRS's IAS 2) allows two formulas for interchangeable items — **FIFO** and **weighted average** — and a third rule for non-interchangeable ones: **specific identification**. LIFO? Executed globally (IASB, 2003–2005 revisions), never even invited under Ind AS. This module prices the same warehouse three ways, shows you the ₹1,000-margin canyon between formulas, and explains why the tax authorities of the world formed a firing squad.

---

## 🎯 Objectives

- Assign exit costs under FIFO and weighted average; run the 8000/9000/10000 canon
- Explain the LIFO ban: tax-shield mechanics, balance-sheet decay, and matching dishonesty
- Use specific identification properly — and the one place it's banned (fungible goods)
- Apply formula consistency: same nature/use → same formula; changes = Ind AS 8 disclosures
- Read formula choice into margin, working capital and inventory days analytics

## 📘 Concepts

### 3.1 The canon warehouse — three buys, one sale

UrbanNest's tile division: buys (all python-verified to the paisa):

| Lot | Units | ₹/unit | Total |
|---|---|---|---|
| 1 | 100 | 50 | 5,000 |
| 2 | 100 | 60 | 6,000 |
| 3 | 100 | 70 | 7,000 |

Then sells **150 units @ ₹100**. Same physical shelf, same sale — but the formula decides which costs "left":

| Formula | COGS | Closing | GP on ₹15,000 revenue | Margin |
|---|---|---|---|---|
| **FIFO** (oldest leaves first) | 100×50 + 50×60 = **₹8,000** | **₹10,000** | **₹7,000** | **46.7%** |
| **Weighted average** (₹60/unit) | 150×60 = **₹9,000** | **₹9,000** | **₹6,000** | **40.0%** |
| **LIFO** (banned ghost) | 100×70 + 50×60 = **₹10,000** | ₹8,000 | ₹5,000 | 33.3% |

Totals always foot: COGS + closing = ₹18,000 in every universe. The formula is a TIME-TRAVEL rule — which past price visits today's P&L — not a valuation rule. Under rising prices: FIFO shows the fattest profit AND the most current closing stock (the shelf wears today's ₹60–₹70 costs); LIFO shows the thinnest profit and a closing stock priced in 1987; WAC splits the difference like a sleepwalker.

### 3.2 FIFO — the physical-flow pilgrim

First-in, first-out assumes the oldest costs exit first — usually TRUE physically (grocers rotate milk; nobody ships the back of the shelf). Consequences under inflation: COGS embeds stale (lower) costs → fatter margins now; closing inventory is fresh (recent prices) → the balance sheet stays honest. Under deflation the mirror flips: FIFO punishes current margins with yesterday's premium costs. Perpetual or periodic record-keeping both produce FIFO-compatible answers with discipline — and India's listed population (traders and manufacturers alike) splits across FIFO and WAC by genetics: process/mass industries lean WAC, traders lean FIFO.

### 3.3 Weighted average — the smoothie

Each unit exits at the running average cost of everything on the shelf. Two flavors: **periodic** (average computed at period end — "weighted") vs **perpetual** (average recomputed after every receipt — "moving average"; Ind AS 2 permits sensible approximations). WAC freezes margin lotteries: no lot can be cherry-picked into or out of COGS, and unit costs glide smoothly with price levels. Price: margins under inflation sit between FIFO's feast and LIFO's famine (₹6,000 GP, 40.0% in our canon); closing stock is a blur of all vintages — defensible, less current than FIFO's.

### 3.4 LIFO's funeral — why the world pulled the plug

LIFO (last-in, first-out) shipped the NEWEST costs to COGS — brilliant for taxes: under inflation COGS is fattest (₹10,000), taxable profit thinnest (₹5,000). Three bullets killed it:

1. **Physical lying** — almost no real shelf ships newest first; the formula described a flow that existed only in ledgers.
2. **Balance-sheet decay** — closing stock froze at ancient prices (decades-old ₹8,000 shelves), making working-capital ratios farcical.
3. **Earnings management** — LIFO "dipping" (liquidating old cheap layers in a bad year to manufacture margin) made profit a menu choice.

The IASB killed LIFO in the 2003/2005 IAS 2 improvements; India's Ind AS 2 (and AS 2 before it) never permitted it. US GAAP still permits LIFO under its tax nexus (the one big surviving divergence — remember it when comparing an Indian auto-parts maker with a US peer: their COGS languages differ by design).

### 3.5 Specific identification — and where it's FORBIDDEN

For items that are NOT ordinarily interchangeable — custom machines, a diamond solitaire with a certificate, a bespoke yacht hull — cost follows the SPECIFIC unit: you know exactly what THAT one cost, and that exact cost leaves when it sells. Sacred rule: specific identification is **banned for fungible goods** (otherwise management would hand-pick the pricey lots into COGS when profits needed shaving — formula choice would become a per-transaction mood). So: unique/jewel/projects → specific ID; sacks, sheets, screws, soaps → FIFO or WAC, chosen by policy per class of similar nature and use.

### 3.6 Policy discipline — formula changes are rare and loud

Same formula for all inventories of similar nature and use; different formulas only across genuinely different classes (raw timber vs antique violins is fine; two interchangeable soap SKUs is not). Changing a formula is an **Ind AS 8 accounting-policy change** — retrospective restatement, disclosure of reasons and effects — designed to hurt. This slowness is intentional: the formula is a constitution, not a quarterly dial.

## 🧪 LAB — One Shelf, Three Universes (10 min)

1. Recreate the canon table (FIFO COGS/closing/GP; WAC ditto; LIFO ghost) from the lots: 100@50, 100@60, 100@70, sell 150@100.
2. Prices are FALLING now: lots 100@70, 100@60, 100@50 (same order, falling market), sell 150@100. FIFO COGS and GP — who wins the margin race this time?
3. ShopKart sells a ₹55k designer lamp (unique piece, tagged) plus 400 interchangeable mug units. Which formula governs each, and what would specific-ID-ing the mugs enable?
4. UrbanNest proposes switching tiles from WAC to FIFO in a rising-price year "for presentation reasons". Ind AS 8 consequences, two lines.
5. LIFO lover at the US JV meeting brags about lower taxes. Explain the three bullets that buried the formula everywhere IFRS land rules.

**Why this matters:** formula choice is one of the few accounting policies that mechanically moves BOTH margins and working capital — analysts re-cut margins formula-aware, and auditors test that the stated formula is the actual flow. You can't talk DIO or GM% without knowing which universe the numbers live in.

**🔑 Lab answers:**
1. FIFO: COGS ₹8,000 (oldest 100@50 + 50@60), closing ₹10,000, GP ₹7,000 (46.7%). WAC: ₹60 average → COGS ₹9,000, closing ₹9,000, GP ₹6,000 (40.0%). LIFO ghost: COGS ₹10,000, closing ₹8,000, GP ₹5,000 (33.3%). Totals foot to ₹18,000 everywhere (python-verified).
2. Falling prices: FIFO COGS = 100×70 + 50×60 = **₹10,000**, GP ₹5,000 — FIFO is now the LEAN profit formula (stale = expensive), WAC ₹9,000/GP ₹6,000, and the banned ghost is ironically flattering. Formula effects are price-direction mirrors: inflation makes FIFO rosy, deflation makes it grim — memorize the mirror, not a slogan.
3. Lamp: **specific identification** (non-interchangeable, its own cost trail). Mugs: FIFO or WAC per policy. Specific-ID-ing mugs would let management PICK which lots "sold" — profit-by-selection — which is exactly why the standard forbids it for fungibles.
4. It's an accounting-policy change → **retrospective restatement** of comparatives with full disclosure of the reason and quantified effects; auditors test motive ("presentation" = fatter current margins would be stated plainly) — and consistency expectations mean you're stuck with the new universe for the foreseeable future.
5. Physical dishonesty (no shelf ships newest first) · balance-sheet decay (closing stock in fossil prices) · earnings menus (LIFO-dipping: selling through to old cheap layers to book instant margin). Tax shield was the feature, not the bug — and outside the US the plug was pulled decades ago.

## 💪 Exercises

1. Why do FIFO closing-stock values track current replacement cost better than WAC's? Reason from layer mechanics.
2. Perpetual (moving-average) vs periodic (weighted-average) WAC: which resists mid-year gaming better and why?
3. A manager proposes specific-ID on interchangeable bolts "to be accurate". Refuse with the fungibility doctrine.
4. Under deflation, which formula shows fatter CURRENT margins — and what happens to closing stock quality under each?
5. Compare Indian vs US peer margins in one sentence, formula-aware.

### ✅ Selected answers

1. FIFO's shelf keeps the NEWEST layers (old ones were forced out through COGS), so closing stock is priced at recent vintages — close cousin to replacement cost. WAC's shelf is a smoothie of every vintage ever received, so it lags current prices up or down. In fast-inflating input markets the gap turns material — FIFO's inventory number means something current; WAC's needs a footnote imagination.
2. Moving-average (perpetual): each issue is costed at the average THAT DAY — a receipt timed just before a big issue can't be ignored and can't be gamed ex-post. Periodic WAC lets the period's purchases pool influence ALL that period's issues — purchasing patterns at period-end rewrite March's COGS in April. Perpetual disciplines the calendar; periodic obeys it.
3. Fungibility doctrine: bolts are interchangeable by design (any bolt serves any hole), so "which bolt sold" is a fiction with a motive — specific ID on fungibles lets profit be hand-assembled lot by lot. FIFO/WAC exist precisely to pre-commit the exit order so management can't curate it per sale.
4. Deflation: LIFO (banned) would be margin-fattest; of the LEGAL two, WAC is fatter than FIFO under falling prices (FIFO COGS carries yesterday's premium: ₍canon₎ 10,000 vs 9,000). Closing stock: FIFO holds the newest cheap layers (honest, lower); WAC holds an average smear (slightly richer). Note the comfort: in either legal universe, the balance sheet stays defensible — which is why the ban matters less than people think.
5. "US peer's COGS may ride LIFO layers — old cheap costs parked on its shelf and newest expensive costs pensioned to P&L — so its margins understate ours under inflation; recompute to a FIFO-consistent basis before the peer table means anything."

## ❓ Quiz

**Q1.** Lots 100@50, 100@60, 100@70; sell 150 @ ₹100. Under FIFO the statements show:
(a) COGS ₹9,000, closing ₹9,000
(b) COGS ₹8,000 (oldest layers exit: 100@50 + 50@60), closing ₹10,000 priced in fresh lots, GP ₹7,000 at a 46.7% margin — FIFO fattens current margins under rising prices and keeps the shelf current
(c) COGS ₹10,000, GP ₹5,000
(d) COGS ₹15,000, GP ₹0

**Q2.** LIFO's funeral was arranged because:
(a) it was too complex for software
(b) it lied physically (no shelf ships newest first), rotted the balance sheet (closing stock in fossil prices), and served profit menus (LIFO-dipping cheap layers on demand) — tax shield in the US, executed under IAS 2 and never permitted under Ind AS
(c) auditors disliked it
(d) WAC lobbied it out of existence

**Q3.** Specific identification is REJECTED for:
(a) a certified diamond solitaire
(b) interchangeable bolts — specific ID on fungible goods lets management hand-pick which cost layers "sold", turning profit into a curated selection; it is MANDATORY for genuinely non-interchangeable items like certified solitaires and custom hulls
(c) a custom-built machine
(d) a bespoke yacht hull

### ✅ Answers

1. **(b)** — oldest exits first under FIFO; the margin feast and the current-cost shelf both follow.
2. **(b)** — physical lie + fossil shelf + profit menus: three bullets, one funeral.
3. **(b)** — fungibles march in formula order; only true one-of-ones carry their own passports.

## ✅ Mastery checklist

- [ ] I can rebuild the 8000/9000/10000 canon with margins blindfolded
- [ ] I can flip every statement for FALLING prices (FIFO grim, WAC calmer)
- [ ] I can deliver LIFO's three-bullet eulogy from memory
- [ ] I can place specific ID correctly and police its fungibility fence
- [ ] I can name the Ind AS 8 cost of changing formulas

**Next:** IC4 pulls the emergency brake — lower of cost and NRV: the ₹500 vs ₹460 write-down canon, item-by-item discipline, the materials safe-harbor, and the reversal rules that let you climb back — capped, disclosed, and never beyond.
