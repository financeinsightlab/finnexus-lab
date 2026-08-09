# 🎯 IA3 · Presentation of Financial Statements — Ind AS 1's Stage Directions

> You can know every standard cold and still fail the reader if the stage is set wrong. Ind AS 1 owns the stage: what a "complete set" is, how balance-sheet lines sort themselves, what OCI is and which of it may come back to P&L, and the discipline rules (materiality, offsetting, comparatives) that stop presentation games. This module is short on math and long on courtroom-style rules — exactly how presentation actually gets audited.

---

## 🎯 Objectives

- List the components of a complete set of Ind AS financial statements
- Run the current/non-current classification test and know when liquidity presentation wins
- Sort OCI into the two buckets — never-recycled vs recycled-with-permission — with every major item placed
- Apply materiality, no-offsetting, and comparative-information discipline to presentation choices
- Explain the third-balance-sheet rule and why it quietly terrifies aggressive restaters

## 📘 Concepts

### 3.1 The complete set — six pieces, no substitutions

A complete set of Ind AS financial statements: (1) **balance sheet** at period end; (2) **statement of profit and loss** — Ind AS uses a SINGLE statement that carries profit down into **other comprehensive income** and total comprehensive income (the old 'two statements' habit is a US import); (3) **statement of changes in equity** (SOCIE); (4) **statement of cash flows** (under Ind AS 7); (5) **notes** — significant accounting policies and other explanatory information; (6) **comparative information** for the preceding period. In India the face formats march to **Schedule III of the Companies Act 2013** (Division II for Ind AS companies) — Ind AS 1 sets principles, Schedule III sets the wardrobe. Non-owner changes in equity = total comprehensive income; owner transactions (dividends, buybacks, fresh capital) live ONLY in SOCIE — never in the performance statement.

### 3.2 Current vs non-current — the 12-month gauntlet

Classify each asset/liability current when it satisfies ANY test: expected to be realized/settled in the **normal operating cycle**; held primarily for **trading**; expected to be realized/settled within **12 months** after the reporting date; or it is **cash/a cash equivalent** (for assets) — for liabilities, the nuclear test: **no right to defer settlement beyond 12 months**. Everything else is non-current. Three professional corollaries:

1. **Deferred tax assets and liabilities are ALWAYS non-current** — a deliberate consistency rule so they never flip with the operating cycle (coming in the Deferred Tax course).
2. Refinancing arranged AFTER year-end does not prettify a current loan — classification is judged on rights **at the reporting date**.
3. A liability becomes current the moment you **breach a covenant** and lose the unconditional right to defer past 12 months — unless the lender grants a waiver **by** the reporting date (waiver after year-end but before authorization is only disclosed!).

Alternative: entities whose working capital genuinely has no cycle (banks, NBFCs) may present in **order of liquidity** — more relevant, and Ind AS 1 permits it explicitly.

### 3.3 OCI — the two buckets (the module's crown jewel)

OCI exists so that volatile, unrealized, or actuarial noise does not vandalize the profit line. But the framework refuses to let items hide there forever, so Ind AS sorts OCI into:

| Bucket A — **NEVER reclassified to P&L** | Bucket B — reclassified (recycled) to P&L when the item resolves |
|---|---|
| Remeasurements of defined-benefit plans (IA9) | Exchange differences on translating foreign operations (IA8) |
| Fair-value changes of equity instruments designated FVOCI (IA6) | Effective portion of cash-flow hedges |
| Changes in own-credit risk on liabilities designated at FVTPL | Fair-value changes of DEBT instruments in FVOCI (recycle on sale; IA6) |
| Revaluation surplus movements stay in equity (transferred within equity, not via P&L) | Cost-of-hedging reserves per hedge accounting |

Memory hook: Bucket A is the "self-inflicted or personal" bucket (your actuarial promises, your chosen equity hills, your own credit) — once booked, the framework refuses to let you weaponize a later sale into profit. Bucket B is the "external market" bucket — the noise is real, and when the position closes, the accumulated difference joins P&L. Interviewers LOVE the two-bucket sort; expect it.

### 3.4 Materiality, aggregation, offsetting — the hygiene rules

- **Materiality**: present material items separately; do not aggregate unlike items into mush; and do not disaggregate trivia into noise. Judgment extends to notes — an accounting policy for something immaterial may be omitted entirely.
- **No offsetting**: assets and liabilities, income and expenses, are presented gross unless a standard specifically permits netting (deferred tax, IA11's course, is the famous permitted net; financial instruments net only with a legal right + intention). Offsetting games are the oldest presentation fraud — Ind AS 1 kills them by default.
- **Comparatives**: minimum one preceding period for every number, including notes. Change a presentation or classification? Reclassify comparatives too, unless impracticable (then disclose why and to what extent).

### 3.5 The third balance sheet — the restater's alarm

If an entity (a) applies an accounting policy **retrospectively**, (b) **restates** items retrospectively, or (c) **reclassifies** items, Ind AS 1 demands a **third balance sheet**: as at the beginning of the preceding period. Two years of BS plus the opening one — the restatement's first-order effects sit naked on the face of the statements, not buried in a note. This is the standard's quiet sword: you may restate, but you may not hide the restating. Supplementary: if a reclassification is immaterial to the opening BS, the third statement may be waived — say that out loud, as basis.

## 🧪 LAB — The Classification Desk (10 min)

SteelKrupa Ltd facts at 31-Mar-2026: (a) ₹40cr term loan due 2029, breached a covenant in February — lender silent so far; (b) DTA ₹12cr on carried-forward losses; (c) payable €2L due July 2026; (d) actuarial gain ₹3cr on gratuity; (e) cumulative FCTR gain ₹9cr on the US subsidiary; (f) equity stake in a startup designated FVOCI, now +₹5cr. For each: current/non-current AND/OR the OCI bucket it belongs to.

**Why this matters:** this single drill covers covenant discipline, the DTA canon, and both OCI buckets — the exact trifecta interviews run.

**🔑 Lab answers:**
1. (a) **Current** the moment the covenant broke — no unconditional right to defer past 12 months. A lender waiver must exist BY the reporting date to rescue non-current status.
2. (b) DTA: **always non-current** — cycle-independent by rule.
3. (c) **Current** — settles within 12 months.
4. (d) OCI **Bucket A (never recycled)** — DB remeasurements.
5. (e) OCI **Bucket B** — foreign operation translation; recycles to P&L on disposal (IA8).
6. (f) OCI **Bucket A** — FVOCI equity election is a one-way door; even the eventual sale bypasses P&L.

## 💪 Exercises

1. Your board wants to net ₹8cr of CGST input credit against ₹8cr of output liability to "save space." Rule on it under Ind AS 1.
2. Why does SOCIE exist separately — which two species of equity movement must never mix?
3. A company reclassifies packaging costs from "other expenses" to "cost of materials consumed" this year. Write the full compliance checklist for comparatives.
4. When is liquidity-order presentation permitted, and for whom is it the honest answer?
5. ChronoSteel took a term loan waiver on 3 April 2026 (year-end 31 March). Date of authorization: 15 May. Classify the loan and write the note.

### ✅ Selected answers

1. Rejected — netting is banned by default; input credit (an asset) and output liability are different claims against timing, and no standard permits this offset. Gross both, or get a specific standard's permission first.
2. Performance vs ownership. TCI (profit + OCI) is performance; dividends/capital/buybacks are owner transactions. Mixing them lets companies launder losses through equity or smuggle owner costs into performance — SOCIE draws the border.
3. Reclassify comparatives in the same way; disclose nature, amount, and reason of the reclassification; if material to the opening position, present the third BS as at 1 April of the comparative year; if impracticable, disclose that and to what extent.
4. When it presents more relevant and reliable information because the entity has no normal operating cycle — banks, NBFCs, and treasury-heavy entities are the canonical users.
5. The loan stays **current** at 31 March — the right to defer did not exist at the reporting date. The April waiver is a **non-adjusting event** (IA11): disclosed in notes, not applied to classification.

## ❓ Quiz

**Q1.** Deferred tax assets and liabilities present as:
(a) current if expected to reverse within 12 months
(b) always non-current — a deliberate classification canon so DT never flips with operating cycles
(c) netted against current tax
(d) split 50/50 by management estimate

**Q2.** Which OCI item may be recycled to P&L?
(a) remeasurements of defined-benefit plans
(b) foreign currency translation reserve of a subsidiary — Bucket B: it joins P&L when the operation is disposed
(c) FVOCI equity-instrument gains
(d) revaluation surplus on PPE

**Q3.** A retrospective restatement forces Ind AS 1 to demand:
(a) a fourth cash-flow statement
(b) a third balance sheet — as at the beginning of the preceding period, so restatement effects sit on the face of the statements
(c) an auditor's special certificate
(d) no extra statement, only a note

### ✅ Answers

1. **(b)** — always non-current; cycle-independent by design.
2. **(b)** — FCTR is the classic Bucket B item; the other three are permanent residents of Bucket A.
3. **(b)** — the third BS is the restater's alarm: restate you may, hide you may not.

## ✅ Mastery checklist

- [ ] I can list the six components of a complete set without peeking
- [ ] I can run the current/non-current gauntlet including covenant breaches and waivers
- [ ] I can sort any OCI item into Bucket A or Bucket B cold
- [ ] I can argue an offsetting rejection and a materiality judgment professionally
- [ ] I can state exactly when the third balance sheet appears

**Next:** IA4 crosses the bridge — Ind AS 101 first-time adoption: transition dates, the forbidden hindsight, the optional-exemption menu, and building an equity reconciliation that survives an audit.
