# 🎯 IC5 · The Overhead Cathedral — Normal Capacity, Joint Products, and Who Eats the Loss

> Direct material and labour are honest. Overheads are where factories learn politics: which costs ride the units, at what rate, in good years and idle ones. Ind AS 2's answers are two sentences deep and career long: variable production overheads absorb on **actual** production; fixed production overheads absorb on **normal** capacity. Then the cathedral expands: joint products sharing one cost pool, by-products clipped at NRV, normal losses built into good units' cost, abnormal losses marched to P&L. Build it once, floor by floor.

---

## 🎯 Objectives

- Absorb variable OH on actual output and fixed OH on normal capacity — the ₹200/₹160 rate machine
- Define normal capacity (the average achievable over periods/seasons, allowing for planned maintenance) and why assertions about it are audit bait
- Split joint costs by relative sales value at split-off (₹46L → ₹32.2L/₹13.8L canon); clip by-products at NRV first
- Book normal vs abnormal losses: inside good-unit cost vs period expense
- Keep service overheads and cost pools honest (causation, consistency, no double-dipping)

## 📘 Concepts

### 5.1 The two-rate machine

**Variable production overheads** (power, line consumables, piece-rate supervision): absorb to each unit on the **actual** production level — these costs really do scale with output, so the unit carries what it caused.

**Fixed production overheads** (factory rent, plant depreciation, salaried supervisors): absorb on **normal capacity** — the production expected to be achieved **on average over a number of periods or seasons under normal circumstances, with allowance for planned maintenance**. Consequences (all python-verified, IC2's plant):

- Fixed OH ₹24L, normal 12,000 units → **rate ₹200/unit, locked**.
- Slow year, 10,000 made: absorb **₹20.0L**; **₹4.0L unabsorbed → expense in the year**. Idle machines bill the PERIOD, not the pallets — otherwise a demand slump would manufacture expensive inventory and smuggle the slump into LATER P&Ls.
- Banner year, 15,000 made: recompute down — 24L/15,000 = **₹160/unit** — absorbing exactly ₹24.0L. **You may never capitalize more fixed cost than incurred**; the recomputation cap is absolute.

CA interviewers love probing "what's YOUR normal": it's an average-through-cycles judgment (not nameplate capacity, not this year's actual, not the union-approved number) and changing it isn't a policy change — it's an estimate to defend with maintenance calendars, seasonal history and demand curves.

### 5.2 Joint products — one pool, two heirs

Some processes birth multiple significant products from one cost pool (refinery fractions, dairy's cream-and-skim, sawmill's grades). Joint costs up to the **split-off point** are allocated on a **rational, consistent basis** — headline method: **relative sales value at split-off** (or physical measures where sales values don't exist).

**Canon (python-verified):** UrbanNest Dairy's joint run: joint costs ₹50L produce products A and B; first, clip the by-product (₹4L NRV of whey — see 5.3): the pool shrinks to **₹46L**. Sales values at split-off: A ₹70L, B ₹30L → allocate: **A carries ₹32.2L (70%), B ₹13.8L (30%)**. If A's line makes 10,000 units, its per-unit cost = 32.2L ÷ 10,000 = **₹322/unit**. Rational + consistent is the audit criterion — a basis chosen to fatten one product's margins is a policy smell, not an allocation.

### 5.3 By-products — clipped at NRV, first

By-products (immaterial-value co-outputs: whey, slag, sawdust) do NOT absorb joint cost dignities. Standard treatment: measure the by-product at **net realizable value and DEDUCT from the pool** before allocating to the mains (recognized as its sale closes — typically as other income or a cost offset). That's why the canon pool was ₹50L − ₹4L = ₹46L: the whey pays rent on the joint costs before A and B divide the house.

### 5.4 Normal loss vs abnormal loss — the two exits

**Normal losses** (inherent process waste — evaporation, trim, an agreed 4% yield erosion): their cost is BORNE BY THE GOOD UNITS (built into unit cost — no separate number, just fatter cost per good unit). The good output quietly inherits what the process always loses.

**Abnormal losses** (beyond-normal spoilage — power-trip batch, contamination, operator bonfire): **period expense, full and immediate**. The doctrine mirrors storage's: necessary-to-production can ride inventory; accidents and idleness cannot (IC10's steel canon will price both exits in tonnes: ₹50,000/t, abnormal loss ₹50L expelled).

### 5.5 Service-overhead discipline

Only **production** overheads enter conversion cost; admin and selling stay behind IC2's wall. Within production, pools must be causal: factory canteen, plant security, maintenance — in; corporate IT, group marketing — out. Consistency per policy manual, and no double-dipping: a rupee absorbed into units can't also sit in the period's expense (reconciliations between cost sheets and financial books are where absorption frauds get lonely).

## 🧪 LAB — UrbanNest Dairy & Plant Two (10 min)

1. Plant: fixed OH ₹24L, normal 12,000 units. Year-1 actual 10,000; Year-2 actual 15,000. Rates, absorbed, expensed — both years.
2. Joint run: pool ₹50L, whey by-product NRV ₹4L, A worth ₹70L and B ₹30L at split-off. Allocate; then A's unit cost if A makes 10,000 units.
3. The plant manager proposes declaring normal capacity at 9,000 "because we've never made 12,000". Rate and absorbed this year (10,000 units)? Legit or audit bait?
4. A batch of 1,000 units spoils from a power-trip (beyond any normal 2% line): cost embedded ₹141/unit (IC2). Where does ₹1,41,000 go?
5. Factory canteen ₹6L, plant depreciation ₹10L, group marketing ₹8L, maintenance ₹4L: split into absorbable / wall.

**Why this matters:** absorption rates are the least-visible margin lever in any manufacturer: a two-rupee rate change across a million units is a P&L event nobody contracted. Normal-capacity assertions and joint splits are the two audit battlegrounds; this drill is their DNA.

**🔑 Lab answers:**
1. Year 1: rate **₹200**; absorbed **₹20.0L**; **₹4.0L expensed**. Year 2: rate recomputes to **₹160**; absorbed exactly **₹24.0L**; expensed ₹0 — lock on normal, cap on actual.
2. Pool after whey clip: **₹46L**; A **₹32.2L**, B **₹13.8L** (70/30 sales value); A's unit cost = 32.2L ÷ 10,000 = **₹322/unit** (python-verified).
3. Rate at asserted normal 9,000: 24L/9,000 = **₹266.7/unit** → absorbed 10,000 × 266.7 = **₹26.67L > actual ₹24L** — REJECTED twice over: the recomputation cap forbids absorbing more than incurred (24L max), and the assertion itself (normal below demonstrated actual) is precisely the audit bait: a low "normal" manufactures bloated absorbed costs and hides idle capacity inside inventory.
4. ₹1,41,000 (1,000 × ₹141) walks straight to **P&L as an abnormal loss** — power-trip spoilage is beyond the normal line; building it into good units' cost would make surviving inventory carry the accident's corpse.
5. Absorbable: canteen ₹6L + plant depreciation ₹10L + maintenance ₹4L = **₹20L production OH**. Wall: group marketing ₹8L → P&L (selling).

## 💪 Exercises

1. Why is "normal capacity" an estimate rather than a policy — and what disclosure consequences follow?
2. Physical-measure vs sales-value joint allocation: when does the physical basis survive, and what does it do to one product's margin?
3. Prove the recomputation cap is anti-fraud, not anti-factory: construct the abuse it blocks.
4. Why do by-products clip at NRV rather than sharing the pool?
5. Idle-capacity cost: where does an expense-fearing CFO try to hide it, and what line does the standard draw?

### ✅ Selected answers

1. It's a throughput JUDGMENT (average over cycles, maintenance-adjusted), not a measurement RULE choice — so changes flow as estimate changes: prospective, no restatement, but requiring evidence and auditor comfort. That makes "what's normal" re-arguable annually — exactly why the assertion is battleground and why consistency of METHOD in deriving it matters even though it's an estimate.
2. Sales-value allocation survives when outputs have realizable prices at split-off — it prices joint cost in proportion to revenue power, keeping margins structurally similar across heirs. Physical measures (tonnes, litres) survive only when sales values don't exist or outputs are mere weight; a heavy-but-cheap heir then carries cost like the rich heir — its margins collapse cosmetically while the light premium coasts.
3. Without a cap: run the plant at 15,000 in a 12,000-normal year but keep the ₹200 rate → absorbed ₹30L against ₹24L incurred — ₹6L of fixed cost MANUFACTURED onto the balance sheet from nothing, waiting to boost later-year profit as the shelf unwinds. The cap (recompute when actual > normal) makes exceeding actual-impossible — the fraud door is welded.
4. By-products aren't why the run happened; dignifying them with joint-cost shares would (a) bury their trivial economics in allocation theatre and (b) trim the mains' costs arbitrarily. Clip at NRV and deduct: the mains carry the pool net of the by-product's cash contribution — causation respected on both sides.
5. Into "inventory" via a deflated normal-capacity assertion (rate bloat) or via capitalizing idle-period fixed costs directly. The standard's line: unabsorbed overheads from idle capacity are PERIOD costs, expensed now — the shelf carries production economics, never machine-emptiness.

## ❓ Quiz

**Q1.** Fixed OH ₹24L, normal 12,000, actual 10,000 then 15,000 across two years:
(a) ₹240/unit year 1; ₹160/unit year 2 absorbs ₹24L
(b) ₹200/unit locked on normal → Year 1 absorbs ₹20.0L with ₹4.0L unabsorbed EXPENSED; Year 2 recomputes to ₹160/unit absorbing exactly ₹24.0L — idle-capacity costs belong to the period, and the cap means no year may capitalize cost that was never incurred
(c) ₹24L absorbed both years at ₹200
(d) ₹4L capitalized into Year-1 inventory

**Q2.** Joint pool ₹50L, by-product NRV ₹4L, A ₹70L vs B ₹30L at split-off:
(a) A ₹25L, B ₹25L — split equals
(b) clip the ₹4L by-product at NRV first → pool ₹46L allocated on relative sales value: A ₹32.2L, B ₹13.8L — by-products pay rent on joint costs at NRV before the heirs divide by revenue power
(c) A ₹35L, B ₹15L
(d) A ₹46L, B ₹0 — winner takes pool

**Q3.** A beyond-normal 4% spoilage batch costing ₹1,41,000 is:
(a) absorbed into good units like normal loss
(b) expensed immediately as an abnormal loss — only inherent, expected process erosion (normal loss) rides inside good-unit cost; accidents and beyond-line spoilage are period costs, mirroring idle-capacity doctrine
(c) added to the by-product
(d) capitalized as machinery cost

### ✅ Answers

1. **(b)** — normal locks the rate, actual caps the absorption; the period pays for emptiness.
2. **(b)** — by-product clipped at NRV, mains split ₹46L by sales value 70/30.
3. **(b)** — abnormal is expelled at period cost; normal loss hides inside good units by design.

## ✅ Mastery checklist

- [ ] I can run the two-rate machine both years (₹200/₹160; ₹20.0L+₹4.0L; ₹24.0L)
- [ ] I can defend a normal-capacity assertion with maintenance calendars and cycles
- [ ] I can allocate the pool: whey clip ₹4L → A ₹32.2L / B ₹13.8L
- [ ] I can route normal vs abnormal loss in one breath each
- [ ] I can split a service-overhead list at the causation wall

**Next:** IC6 assembles the beast — the cost sheet end-to-end: RM consumed → prime cost → works cost → cost of production → COGS (the ₹400 chain), the retail method's margin-law shortcut, and standard costs that approximate actual.
