# Excel 03 — Data Tools: Tables, Text, Dates, Validation & Conditional Formatting

> *Raw data is a swamp. These tools are your machete — the Excel equivalents of Power Query's cleaning power.*

## 🎯 Objectives
Sort/filter fluently · exploit Excel Tables fully · master 15 text & date functions · enforce clean input with Data Validation · make patterns pop with Conditional Formatting · clean the messy file — the Excel way.

---

## 📘 3.1 Sort, Filter, and the Table superpowers

- **Filter toggle: Ctrl+Shift+L** — dropdowns with search box ("contains 'lap'").
- **Multi-level sort:** Data → Sort → add levels (Region, then Revenue ↓). **Custom sort** for "High, Mid, Low" logic.
- **Tables (Ctrl+T) — always use them:** auto filters, banded rows, **structured references** (`tblSales[Revenue]` — readable & immune to row counts), **auto-expansion** (paste new rows at the bottom and formulas/formatting extend), **Total Row** (Table Design tab), **slicers** for tables.

## 📘 3.2 Text functions — the cleanup crew

```excel
TRIM(x)          -- kills extra spaces (join-breaker #1)
CLEAN(x)         -- removes invisible characters
UPPER/LOWER/PROPER(x)
LEFT/RIGHT/MID(text,n) / LEN(x)
CONCAT(a,b)  or  a&b
TEXTSPLIT(text,",")                -- 365: split to cells
TEXTJOIN(", ",TRUE,range)          -- 365: combine
SUBSTITUTE(text,"₹","")            -- targeted replace (vs REPLACE by position)
FIND("x",text) / SEARCH            -- position of a char (drives MID tricks)
```
Pattern: `=TRIM(PROPER("  laptop pro 14 "))` → `Laptop Pro 14`. Combine: `=LEFT(A2,FIND("-",A2)-1)` → text before the dash.

## 📘 3.3 No-code rescue tools

- **Remove Duplicates** (Data tab): select key column first (e.g., OrderNo) to dedupe whole rows.
- **Text to Columns** (Data tab): split delimited text or force column types — fixes stubborn dates.
- **Flash Fill (Ctrl+E)** for pattern-based splits/merges — zero formulas.
- **Find & Replace (Ctrl+H)** with `*`/`?` wildcards and "Match entire cell contents".

## 📘 3.4 Dates — serial-number ninja moves

```excel
TODAY() NOW()            -- volatile (recalc always)
YEAR/MONTH/DAY(date)
EOMONTH(date,0)          -- last day of month (+n/-n for other months)
NETWORKDAYS(start,end)   -- business days
DATEDIF(start,end,"Y")   -- full years/age ("M","D" also) — undocumented since Excel 2000, still works
date+7                   -- a week later (dates are numbers!)
```
Convert text-dates: `=DATEVALUE("21-Jul-2026")` or Text to Columns → Date (choose DMY for Indian formats!).

## 📘 3.5 Data Validation — guardrails on input

Data → **Data Validation** → Allow: **List** (type `North,South,East,West` or point at a range), Whole Number (min/max), Date, or **Custom formula** (`=LEN(A2)>3`). Add **Input Message** (help text) + **Error Alert** (block vs warn). Then Data → **Circle Invalid Data** to audit. Dropdowns = no more "West", "west", "WEST".

## 📘 3.6 Conditional Formatting — instant insight

Home → Conditional Formatting: **Data Bars, Color Scales, Icon Sets**, Top/Bottom rules, **Highlight Duplicates**. Power move — **New Rule → Use a formula**: `=$D2=""` (turn whole row amber when a price is missing) or `=AND($E2>TODAY()-30,$E2<>"")`. Rules evaluate top-to-bottom; **Manage Rules** to reorder/Stop-if-True.

---

## 🧪 LAB 3 — Clean `Messy_Sales_Raw.csv` the Excel way (45 min)

*(Same villain file from Power BI Module 02 — different weapon.)*

 Appeal: import **Data → From Text/CSV** → load to sheet → **Ctrl+T** → name `stg_MessySales`.
1. **Product names:** helper column `=TRIM(PROPER([@Product]))`; copy → Paste Special **Values** over itself; delete original, rename.
2. **Region chaos:** `=PROPER(TRIM([@Region]))` fixes case+spaces; then Data Validation list North, South, East, West + Circle Invalid Data to prove none left.
3. **Price:** `=VALUE(SUBSTITUTE(SUBSTITUTE([@Price],"₹",""),",",""))` → errors on the "error"/N/A rows? IFERROR→ blank, then filter blanks and delete those rows (document the choice!).
4. **Qty:** same approach; Fill blanks with 1 (business decision — journal it).
5. **Dates:** select column → Text to Columns → Delimited → Next → Next → **Date: DMY** → Finish. The `25-10-2024` vs `2024-10-08` mix — inspect: which ones misconverted? (Hint: ISO ones. Fix by correcting those rows with the same T2C on a copy, or Power Query instead — note *why PQ wins for mixed formats*.)
6. **Duplicates:** Data → Remove Duplicates on `OrderNo`. (148 → ~140.)
7. Add `LineTotal = [@Qty]*[@Price]`, format ₹, Save.

**Compare in your journal:** Excel-vs-PowerQuery — which records a replayable recipe for next month's file?

## 💪 Exercises
1. Extract the numeric part of `ORD-10018` with MID+FIND (no helper text-to-columns).
2. `=DATEDIF(JoinDate,TODAY(),"Y")` — add customer tenure to tblCustomers.
3. Data Validation: restrict Quantity to whole numbers 1–10; add an input message.
4. Conditional-format `Revenue` with 3-color scale; then a formula rule highlighting the **entire row** when Discount > 0.15.
5. Sort tblSales: Month ↑ (create Month col with `=TEXT([@OrderDate],"yyyy-mm")`), then LineTotal ↓.

### ✅ Selected answers
- Ex 1: `=MID(A2,FIND("-",A2)+1,99)*1` (the `*1` coerces text → number).
- Ex 4 formula rule (select full range, rule applies to row 2 top): `=$F2>0.15` — lock the **column** ($F), free the **row**.

## ❓ Quiz
1. Three Table superpowers. 2. TRIM vs CLEAN? 3. Why does `TEXT(date,"yyyy-mm")` sort correctly but "mmm-yyyy" doesn't? 4. In a conditional-format formula for whole-row highlighting, what do you lock?

### ✅ Answers
1. Structured references, auto-expansion, total row (+ built-in filters/formatting).
2. TRIM strips spaces; CLEAN strips non-printable characters — often chained together.
3. "yyyy-mm" alphabetizes chronologically (2025-01 < 2025-10); month names sort A-Z ≠ time order.
4. The column (`=$F2`) — so every cell in the row checks the same F-cell as the rule walks down rows.

## ✅ Mastery checklist
- [ ] Messy file cleaned twice: once with formulas, once with Ctrl+E/Replace/Validation
- [ ] I can build a validation dropdown + audit with Circle Invalid
- [ ] Formula-based conditional formatting with $-locking works first try

**Next: `Excel_04_Pivot_Charts_Analysis.md` — PivotTables: Excel's crown jewel.**
