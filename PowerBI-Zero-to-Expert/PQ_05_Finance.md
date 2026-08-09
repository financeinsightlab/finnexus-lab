# P5 · Power Query for Finance: Trial Balances, Budgets, Fiscal Calendars & Consolidation

> *Finance data arrives as ugly exports: debit/credit columns, sign chaos, 12 tab files, entity per folder. These recipes turn that mess into governed, refreshable pipelines.*

## 🎯 Objectives
TB/GL cleaning patterns · sign-by-type logic · Actual+Budget merge done right · fiscal-year calendars in M · multi-file/entity consolidation · currency handling.

---

## 📘 FQ1. The finance shapes you'll meet

- **Trial balance / GL dump:** one row per account per period, sometimes Debit/Credit in *two* columns → normalize to one signed `Amount` (`= [Debit] - [Credit]` or type-driven sign).
- **Sign chaos:** some systems export revenue negative (credit convention). Fix once, centrally, with a **conditional column** — never in twelve downstream formulas.
- **Budget exports:** usually per account per month *separate files* or wide tables (Jan..Dec columns) → unpivot (P2 muscles!).
- **Bank/CC statements:** text amounts like `1,20,345.67 Cr` → Text.Remove/Select + locale typing.

**House pattern for signs:** keep raw `Amount` positive + keep `Type`; compute `SignedAmount = if List.Contains({"Revenue","Other Income","Liability","Equity"}, [Type]) then [Amount] else -[Amount]` — one step, documented, downstream math becomes natural (Income − Costs).

## 📘 FQ2. Actual ⟷ Budget merge — the correct join

Merge `stg_Finance_GL` ⟷ `stg_Finance_Budget` on **MonthStart + AccountCode** (multi-column merge: hold Ctrl to pick both) → join kind **Full Outer** (budget exists without spend and vice-versa — both must survive) → Expand Budget → `Variance = [Amount] - [Budget]` → Coalesce nulls → rename steps like `MERGE Actual+Budget`.

## 📘 FQ3. Fiscal calendar in M (April–March, India)

```powerquery
// Add to your M date table (from P3 lab):
FiscalYear = Table.AddColumn(prior, "Fiscal Year",
    each let m = Date.Month([Date]), y = Date.Year([Date])
         in if m >= 4 then "FY" & Text.From(y) & "-" & Text.End(Text.From(y+1),2)
            else "FY" & Text.From(y-1) & "-" & Text.End(Text.From(y),2), type text),
FiscalMonthNo = Table.AddColumn(FiscalYear, "Fiscal Month",
    each Number.Mod(Date.Month([Date]) + 8, 12) + 1, Int64.Type),   // Apr=1 … Mar=12
FiscalQtr = Table.AddColumn(FiscalMonthNo, "Fiscal Qtr",
    each "FQ" & Text.From(Number.RoundUp([Fiscal Month]/3)), type text)
```
Parameters `pFiscalStartMonth` (=4) generalize this for any country's fiscal year — that's the consultant-grade touch.

## 📘 FQ4. Multi-entity consolidation (folders of GLs)

Structure: `consolidation/EntityA_GL.csv`, `EntityB_GL.csv` … → Folder combine (P2 machine!) → add `Entity = Text.BetweenDelimiters([Source.Name], "_", ".")` → clean once in the sample transform → `Entity` becomes a column → later a dimension (`dim_Entity`) enabling entity slicers + RLS-by-entity. This is literally how group finance teams automate month-end packs.

## 📘 FQ5. Currency: FX rates into transactions

`datasets/Finance_FX.csv` (monthly avg USDINR/EURINR/GBPINR): type months → Unpivot currency columns → merge into transactions on *(MonthStart, Currency)* → `Amount_INR = [Amount] * [Rate]`. For daily rates: sort + **Fill Down** carries the last rate across weekends (the M equivalent of LOCF).

---

## 🧪 LAB P5 — The Finance engine (75 min)

1. Load `Finance_GL.csv` → `stg_Finance_GL`: types (`MonthStart` date, code text, amount currency); add **SignedAmount** conditional column (FQ1 pattern).
2. Load `Finance_Budget.csv` → `stg_Finance_Budget` (type months/amounts).
3. **Merge as New** `fact_Finance_Pack`: Full Outer on MonthStart+AccountCode → expand `Budget` → replace errors/nulls → add `Variance`, `Variance %` (guard divide) → polish names.
4. Append FY fields to your P3 date table code (FQ3) with parameter `pFiscalStartMonth`; relate in the model and sanity-check April rows show "FY24-25"-style labels.
5. FX mini-lab: build `stg_FX` unpivoted (MonthStart | Currency | Rate) — you'll merge it onto entity exports in the stretch.
6. Refresh choreography: bump one GL row's amount in the CSV → Refresh → watch Variance move. That's an auditable pipeline. ✅
7. **Stretch:** fabricate `EntityB_GL.csv` by copying the file, scaling amounts ×0.6 (`Table.TransformColumns`), and prove entity-split refresh works; document every decision in your README query.

## 💪 Exercises
1. TB variant: given Debit/Credit two-column input (create via custom columns from GL), normalize to signed Amount.
2. Write the Full-Outer coalesce step that turns null Budget/Amount into 0 without losing columns (M: `Table.ReplaceValue(..., null, 0, Replacer.ReplaceValue, {"Budget","Amount"})`).
3. Add `Half` = H1/H2 fiscal to the date table; group revenue Q-o-Q by Fiscal Qtr in a following query and inspect.
4. Journal: why Full Outer (not Left) for Actual⟷Budget — give the 2 real cases.
5. Fill-Down-days pattern: explain (or implement) how monthly FX becomes daily via a date-table merge + Fill Down.

### ✅ Selected answers
- Ex 4: budgeted cost with no actual spend yet (left-join would drop the row), and actual spend with no budget line (right-join would drop it) — Full Outer keeps both, nulls coalesce to zero variance rows.
- Ex 2 works because ReplaceValue with Replacer.ReplaceValue substitutes nulls in *both* listed columns in one recorded step.

## ❓ Quiz
1. Where should sign conventions be fixed and why centrally? 2. The two-column key for Actual⟷Budget merge? 3. What does Fill Down simulate for FX across weekends? 4. Parameterize fiscal start month to achieve…?

### ✅ Answers
1. In one conditional step in the staged query — downstream formulas stay natural, fixes happen once, audits read it instantly.
2. MonthStart + AccountCode (period × account granularity).
3. LOCF (last observation carried forward): the latest known rate covers non-trading days.
4. One calendar template reusable for any entity/country fiscal year (e.g., 4 for India, 7 for US-style FYJuly) — consultant portability.

## ✅ Mastery checklist
- [ ] SignedAmount pattern implemented + documented
- [ ] Full-Outer variance pack refreshes from CSV edits
- [ ] Fiscal date table parameterized (FY/FQ/H)
- [ ] I can whiteboard entity consolidation for a real finance team

**The 🧹 Power Query track is complete (5 modules). You now own the full pipeline: finance data in → governed pipelines → DAX P&L → CFO dashboards. 🏆**
