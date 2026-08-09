# 🎯 DP11 · Disclosures & the Ratio Radar — Reading the Fixed-Asset Schedule Like an Auditor

> Every PP&E doctrine in this course leaves an exhaust trail in the annual report — and Ind AS 16 para 73 tells you exactly where to sniff: the movement schedule (gross block, accumulated depreciation, net block, reconciled line by line), the lives and methods table, the revaluation note, the pledges and commitments line. Then the analyst's three-hole radar: asset turnover for productivity, average age for fleet freshness, capex-to-depreciation for growth or decay. Finally, the manipulation signatures — the six ways this schedule lies when cornered. Read this module and no asset note anywhere will ever scare you again. All numbers python-verified.

---

## 🎯 Objectives

- Reconcile the canonical movement schedule: gross 200 + 45 − 30 = 215; accumulated dep 120 + 30 − 12 = 138
- Recite the para 73 disclosure roll-call and the Schedule III extras Indian companies add
- Run the three radar ratios: turnover 3.0x, average age 4.0 years, capex/dep 1.5
- Spot the six manipulation signatures: life-stretch, residual games, opex-to-capex, valuer shopping, CWIP parking, zombie components
- Read the revaluation and CWIP notes with developed suspicion

## 📘 Concepts

### 11.1 The movement schedule — the two-column reconciliation (python-verified)

The PP&E note's spine for each class: opening gross block **₹200cr** + additions ₹45cr − disposals at cost ₹30cr (+ revaluation adjustments + FX translation for foreign ops) = closing gross **₹215cr**. Parallel stream: opening accumulated depreciation **₹120cr** + charge for the year ₹30cr − disposals' accumulated depreciation ₹12cr (± impairment, revaluation resets) = closing **₹138cr**. Net block: 215 − 138 = **₹77cr** closing, versus opening 200 − 120 = ₹80cr — a net DECLINE despite ₹45cr of spends: this book says "we are ageing" before any ratio is computed. Every auditor's first tick: does the depreciation charge in this note equal the P&L depreciation line? (It must, or pass through a disclosed revaluation/PFI nuance.) Does disposal cost minus disposal accumulated-depreciation equal the derecognized carrying amount that produced the disposal gain? Do the maths, every column, every year — the schedule is arithmetic with a story, never prose.

### 11.2 The para 73 + Schedule III roll-call — what must be told

- Measurement bases (cost/revaluation) and depreciation methods per class.
- Useful lives or rates used; reconciliation movements (additions, disposals, acquisitions through business combinations, revaluations, impairments booked AND reversed, FX).
- Gross carrying amount and accumulated depreciation (with impairment) opening and closing.
- Existence and amounts of RESTRICTIONS on title, and PPE PLEDGED as security (the borrowed-against flag).
- Contractual CAPITAL COMMITMENTS (the future capex IOU — read this against the capex/dep ratio).
- Revaluation extras: effective date, whether an independent valuer was involved, methods and significant assumptions, and the carrying amount that WOULD have stood under the cost model (the honesty counterfactual).
- Indian overlay: Schedule III demands the same movement format, PLUS the CWIP age schedule (capital-work-in-progress by project-ageing buckets), PLUS title-deed confirmations — unique desi radar zones.

### 11.3 The three-hole radar (python-verified)

- **Asset turnover** = revenue ÷ average net block — stylized canon with a flat ₹100cr base: 300 ÷ 100 = **3.0x** sector-relative productivity read (falling turnover on rising block = capacity ahead of demand, or the shelter of a cost problem); in the lab's live schedule the average base is ₹78.5cr, so the same ₹300cr reads ≈3.8x.
- **Average age of the fleet** ≈ accumulated depreciation ÷ annual depreciation = 120 ÷ 30 = **4.0 years** — a consistent climber flags under-investment awaiting a capex cliff.
- **Capex cover** = additions ÷ depreciation = 45 ÷ 30 = **1.5** — sustained above ~1.2 reads expansion; near 1.0 maintenance plateaus; persistent below 0.8 reads harvest/sweat mode, tomorrow's reliability headlines being drafted today.

Run the trio TOGETHER (one number, any direction, has an innocent story; the triangulated read converges): low cover + rising age + soft turnover = the sweating fleet signature.

### 11.4 The six manipulation signatures — the radar's hit list

1. **The life-stretch miracle**: in a tight year, useful lives lengthen "on review," depreciation falls, margin "improves" — prospective, legal, disclosed in small print (DP4's change-in-estimate door deliberately left unlocked). Ask: where's the technical evaluation, and why now?
2. **Residual games**: residuals lifted to shrink depreciable base (DP4 exercise canon — ₹5L charge replacing ₹6.75L); scrap-quote test dissolves most claims.
3. **Opex-to-capex**: operating spends re-labelled capital work (WorldCom's line-cost family portrait; DP7's fraud axis). Tells: capex spiking while capacity and peers stay flat; vague "internal development" lines.
4. **Valuer shopping / revaluation surfing**: annual upward revaluations, new valuer each year, only the appreciating classes revalued (DP5/DP6 radar upheld by class-election anti-cherry rule in honest books).
5. **CWIP parking**: projects held "not ready" for years so no depreciation ever runs (capitalization finish line — capable, not commissioned — droops unseen); the CWIP ageing schedule is the smoking-gun table.
6. **Zombie components**: replacements capitalized without derecognizing the old slice (DP7's ₹1.6L); the block inflates invisibly until a writedown day.

### 11.5 Review ritual — the analyst's five-minute PP&E drill

1. Reconcile total depreciation charge across notes, P&L, and cash-flow addback. 2. Compute the three radar ratios over five years; flag turning points. 3. Sweep the movement table for revaluation and disposal patterns (frequency, size, valuer). 4. Read commitments + CWIP ageing jointly: big IOUs + stale projects = distress choreography. 5. Read pledged/restriction lines against debt covenants. Six minutes, six months of edge.

## 🧪 LAB — The Note Autopsy (10 min)

From Riverline Auto's year file: opening gross block ₹200cr; additions ₹45cr; disposals at cost ₹30cr (which had ₹12cr accumulated depreciation); year charge ₹30cr; revenue ₹300cr — opening net block you compute yourself first.

1. Closing gross block. 2. Closing accumulated depreciation. 3. Closing net block and the one-line story it tells. 4. The three radar ratios. 5. The audit reconciliation: the disposed assets sold for ₹25cr — what disposal result should P&L show, and which two schedule entries prove its inputs?

**Why this matters:** this is the five-minute drill, timed — repetition here converts "I know the theory" into "the note has no secrets."

**🔑 Lab answers:**
1. 200 + 45 − 30 = **₹215cr**. 2. 120 + 30 − 12 = **₹138cr**. 3. 215 − 138 = **₹77cr** vs opening 80 → the fleet SHRANK net despite spends: ageing signature before ratios. 4. Turnover 300 ÷ average net block (80 + 77) ÷ 2 = 300 ÷ 78.5 ≈ **3.8x** (up against the §11.3 stylized 3.0x canon, which assumed a flat ₹100cr base); average age 120 ÷ 30 = **4.0 years**; capex cover 45 ÷ 30 = **1.5**. 5. Derecognized carrying = 30 − 12 = ₹18cr; sold for ₹25cr → **gain ₹7cr** to P&L in other income (DP8 doctrine); schedule's disposal-cost and disposal-accumulated lines are the two provenance cells.

## 💪 Exercises

1. Capex cover 0.6 for three years, average age climbing 4 → 6.5, turnover flat. Sector-normal or trouble? Two lines.
2. A company's depreciation charge drops 30% year-on-year with flat gross block, and a note says lives were "stretched on technical review." Name the move and the evidence you would demand.
3. CWIP shows the same ₹40cr project "under implementation" for four years, interest capitalized growing. Which signatures might be playing — and which single question collapses them?
4. The pledged-PPE line triples while debt stays flat. What story could the lender schedule be telling?

### ✅ Selected answers

1. The sweating fleet: capex chronically below depreciation + rising age = the company is harvesting the asset base; trouble unless an announced harvest strategy exists — tomorrow's capex cliff and reliability risk compound quietly.
2. The life-stretch miracle (signature 1): demand the technical evaluation, the comparative table of old vs new lives per class, the P&L effect disclosure (Ind AS 8), and whether peers in identical assets moved too.
3. CWIP parking (5) possibly plus interest-over-capitalization (DP9's cessation doctrine): the collapsing question — "which month did the project become capable of operating as intended?" Everything honest flows from that date.
4. New security given without new borrowing often signals covenant remediation or refinancing distress — the pledge line leading the debt line is an early-warning paragraph, cross-check the borrowings note and any restructuring disclosures.

## ❓ Quiz

**Q1.** The canonical schedule reconciliation:
(a) gross closes at 215, accumulated depreciation at 138
(b) gross 200 + 45 additions − 30 disposals = ₹215cr; accumulated dep 120 + 30 charge − 12 disposals = ₹138cr; net ₹77cr vs opening ₹80cr — the note announces an ageing fleet before any ratio runs, and each column must tie to P&L and disposal gains exactly
(c) gross closes at 200, acc dep at 120
(d) net block cannot decline with additions present

**Q2.** The radar trio on the canon (revenue ₹300cr, net-block-canon ₹100cr base, additions ₹45cr, charge ₹30cr, acc-dep ₹120cr):
(a) turnover 0.33x, age 0.25yrs, cover 0.67
(b) asset turnover 3.0x, average age 4.0 years, capex cover 1.5 — read TOGETHER: falling turnover + rising age + cover under ~0.8 triangulates the sweating fleet; above ~1.2 sustained reads expansion
(c) turnover 3x, age 4, cover 0.67
(d) ratios do not apply to PP&E

**Q3.** "Same project sits in CWIP four years, capitalized interest growing" most likely signals:
(a) careful project management
(b) CWIP parking — keeping the asset 'not ready' beyond its capable-of-operating date so that no depreciation ever starts (with interest possibly capitalized past the Ind AS 23 cessation line): the CWIP ageing schedule plus one finish-line question collapses the alibi
(c) statutory requirement for large projects
(d) land banking, which is standard

### ✅ Answers

1. **(b)** — every column is arithmetic with a story; the net decline is the story.
2. **(b)** — the triangulated read: 3.0x / 4.0 / 1.5 — and the trio's joint grammar.
3. **(b)** — parking keeps the clock off; the finish line is capable-of-operating, not inauguration.

## ✅ Mastery checklist

- [ ] I can reconcile any movement schedule column-tight
- [ ] I can recite para 73 + the Schedule III additions (CWIP ageing, title deeds)
- [ ] I can compute and triangulate 3.0x / 4.0 / 1.5-style ratios
- [ ] I can name all six manipulation signatures with their tells
- [ ] I run the five-minute PP&E drill in order, every time

---

**Next:** **DP12 · CAPSTONE: The Clock Audit** — six exhibits, one mis-assembled fixed-asset file, every doctrine of the course summoned, and the ₹11.4L overstatement memo that must survive a partner's cross-examination and the ten-question interview forge.
