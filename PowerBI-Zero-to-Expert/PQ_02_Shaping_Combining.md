# PQ 02 — Shaping & Combining: Pivots, Joins, Appends & Folders of Files

> *This is where analysts get dangerous: reshape anything, stitch everything, and let a whole folder of monthly files become one clean table.*

## 🎯 Objectives
Master the essential 20 transformations deeply · unpivot like breathing · all 6 join kinds incl. anti joins · Group By power · combine a folder of monthly files automatically.

---

## 📘 2.1 Column-surgery transformations (Transform tab)

Split Column (delimiter/positions/number of chars), Merge Columns, Format (Trim/Clean/Case), Replace Values, Extract (age/first chars), Fill Down (classic for "state-once-then-blank" exports), Replace Errors, Data Type (+locale), Rename. **Column from Examples** = pattern inferencing — try it on messy data before hand-coding.

## 📘 2.2 Reshaping rows ↔ columns (the mental flip)

| Transform | Before → After |
|---|---|
| **Unpivot Columns / Unpivot Others** | Wide (Jan,Feb,Mar as columns) → Tall (Month, Value rows) — **the** fix for report-shaped data |
| **Pivot Column** | Tall → Wide (rows of Month become columns), aggregation = Sum/Don't Aggregate |
| **Transpose** | Rotate entirely (rare) |
| **Group By** | Aggregate: Sum/Count by Region — with **All Rows** option to keep detail + aggregates |
| **Promote / Demote Headers** | Row 1 ↔ header row |

🎯 **Rule:** tall & narrow = model-friendly; wide = presentation-only. Model thinks in unpivoted data; humans like pivoted views — produce both from one source with two queries (Reference).

## 📘 2.3 Combining: Append & Merge (all 6 joins)

- **Append** = stack rows (same shape: 2024 file + 2025 file). *"as New"* vs in-place — prefer "as New".
- **Merge** = SQL JOIN on keys. The 6 kinds:
  | Kind | Keep |
  |---|---|
  | Left Outer (default) | all left + matching right |
  | Right Outer | mirror image |
  | Full Outer | everything, nulls to fill gaps |
  | Inner | only matches (great as a filter!) |
  | **Left Anti** | left rows with **no** match → orphan finder |
  | **Right Anti** | right-side orphans |
- After merge, **Expand** the `⇆` column to select fields; rename expanded columns to keep keys documented.
- **Fuzzy matching** (merge options): joins `"laptop pro"` ≈ `"Laptop Pro14"` with similarity threshold — rescue tool, not architecture; clean keys first, fuzzy second.

## 📘 2.4 Combining a FOLDER of files — the crown jewel

1. Get Data → **Folder** → browse → **Combine & Transform**.
2. Power Query builds a **Sample File + Transform Sample File (function)** + `fnInvoke` per file + appends results, adding `Source.Name`.
3. Edit the **sample transform** (not individual files!) — every file gets the same cleaning.
4. Gotchas: filter out temp files (`~$`), shredded columns from inconsistent headers (standardize upstream), chaos if a file has extra column (rename/reorder inside sample logic, or custom M with `Table.PromoteHeaders` after `Table.RenameColumns`…).
5. New month file lands → **Refresh** → flows in. This is the recipe for real business processes.

## 📘 2.5 Query hygiene at scale (_Sources → stg_ → Output)

Bronze/Silver/Gold in miniature: `_src_SalesCSV` (raw, load disabled) → `stg_Sales_Clean` (steps, load disabled) → `Sales` (ready, loads). Reference (chain) instead of Duplicate (fork) so fixes propagate. Group folders keep 20 queries navigable.

---

## 🧪 LAB 2 — The monthly-files machine (60 min) · data: `datasets/monthly/`

You have 24 monthly files `Sales-YYYY-MM.csv` dropped by a fictional ERP.
1. Get Data → **Folder** → `datasets/monthly` → **Combine & Transform**. Power Query shows sample + combined queries.
2. In **Transform Sample File**: verify types (OrderDate date, Qty/price numbers, Discount decimal). Keep the steps lean.
3. Back in combined query: remove `Source.Name` column? Keep it! Add column `MonthFile = [Source.Name]`… actually extract `YYYY-MM`: Split by `-`/`.` → keep part 1&2 → `FileMonth`.
4. Sanity: Group By → Region… wait — Region isn't in sales; Group By → `FileMonth`, `Revenue = Sum of Quantity × …` — instead: Group by FileMonth with **Sum of Quantity** + **All Rows**; inspect aggregated vs detailed; then **remove** the Group step (we load row-level, aggregation belongs in DAX — remember!).
5. Filter out any row where `Source.Name` contains `~$` or `temp`.
6. Close & Load. Drop `Sales-2025-99.csv`–new file later → Refresh → row count grows. That's the machine. ✅
7. **Stretch:** Merge combined sales with `Products` (name cleanup first on the product side if names messy) — validate with a Left Anti join to count orphans.

## 💪 Exercises
1. Unpivot this: convert `Region | Jan-Feb-Mar sales` wide table into Month/Value rows (build it via Enter Data first).
2. All 6 joins on Customers × Sales on `CustomerID`: record row counts for each; explain Anti results in your journal.
3. Group By with **two** aggregations + All Rows: per Region (from Customers): total qty + order count + detail.
4. Fuzzy-merge experiment: mess up 3 product names in a copy of Products; fuzzy match success rate at 0.6 vs 0.9 thresholds.
5. Pivot Column drill: turn monthly FileMonth rows into 12 month columns of summed Quantity.

### ✅ Selected answers
- Ex 2 (on our data): Inner = matching orders only; Left outer = all sales + customer info; Left Anti from Customers = customers who never bought (0 in our seed data… or count it yourself!); Full = everything with null gaps.
- Ex 1: Select `Region` → right-click → Unpivot Other Columns → rename `Attribute`→Month, `Value`→Sales.

## ❓ Quiz
1. Anti join's business use case (name two). 2. Why edit the sample-file transform and not a per-file output? 3. Wide vs tall for modeling? 4. Group By "All Rows" is useful because…?

### ✅ Answers
1. Orphan detection (orders without customers), "who didn't buy/report/submit" analysis, change-detection between snapshots.
2. The function applies the same cleaning to **every** file automatically — file-level edits don't propagate.
3. Tall/narrow; wide tables are for display, not relationships/DAX.
4. You can append aggregate columns *while keeping* row detail in one step (e.g., add Region-total to every row).

## ✅ Mastery checklist
- [ ] All 6 join kinds built + row counts documented
- [ ] Folder-combine machine working with my own sample edits
- [ ] Unpivot by muscle memory
- [ ] stg_/output naming used instinctively

**Next: `PQ_03_M_Language.md` — write the language itself: let/in, functions, lists, records, custom fx, error-handling M.**
