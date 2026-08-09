# Module 02 — Power Query: Get & Transform Data Like a Pro

> *80% of analytics time is data cleaning. Power Query is the machine that gives you that time back. Experts don't clean data by hand — they build repeatable recipes.*

## 🎯 Objectives
Connect to files, databases and web sources · master the 25 most-used transformations · understand Applied Steps and the M language · clean a genuinely filthy dataset · merge/append/unpivot with confidence.

---

## 📘 2.1 What Power Query is

**Power Query = ETL engine** (Extract, Transform, Load) built into Power BI (and Excel). You connect to a source, shape the data through a UI, and Power Query records every move as an **Applied Step**. Hit **Refresh** and it re-runs the whole recipe on new data automatically. *This idea — recipes, not manual edits — separates pros from spreadsheet janitors.*

**Open it:** Home → **Transform data**. It has its own window with: Ribbon (transform tools), **Queries pane** (left, your tables), **Query Settings → Applied Steps** (right, your recipe), **Formula bar** (the M code of the selected step).

## 📘 2.2 Connecting to data ("Get Data")

| Source type | Examples | Notes |
|---|---|---|
| Files | CSV, Excel, JSON, XML, PDF, Text, **Folder** | Folder connector = combine 100 files at once (pro move) |
| Databases | SQL Server, MySQL, PostgreSQL, Oracle, Snowflake, Databricks | Server + database + optional SQL statement |
| Cloud/Online | Azure SQL, SharePoint, Dataverse, Google BigQuery, Amazon Redshift | Needs org credentials |
| Web | `From Web` — URL to a CSV/JSON/API/HTML table | Great for open data (Project 3) |
| Fabric | Lakehouse, Warehouse, KQL | Module 08 |
| **Enter Data** | Type/paste a tiny table by hand | Perfect for lookup tables (we use it for RLS in Module 07) |

When you connect you choose **Load** (skip cleaning) or **Transform Data** (open Power Query). Default habit of experts: **Transform Data** — always at least verify types.

## 📘 2.3 The 25 transformations you'll use weekly

| # | Transform | Where (ribbon) | Why it matters |
|---|---|---|---|
| 1 | **Use First Row as Headers** | Home / Transform | Fixes `Column1 Column2…` |
| 2 | **Change Type** (with locale!) | Transform → Data Type | Dates & decimals parse correctly; "Using Locale" fixes `31/12/2025` vs `12/31/2025` |
| 3 | Remove / Keep Columns | Home | Smaller model = faster model |
| 4 | Rename column | Right-click | Clean names = clean reports |
| 5 | **Remove Duplicates** | Home → Remove Rows | On selected key column(s) |
| 6 | Remove **Errors** | Home → Remove Rows | After type changes create `Error` cells |
| 7 | Remove Blank/Alternate/Top/Bottom rows | Home → Remove Rows | Skips report junk rows |
| 8 | Keep Range/Top rows | Home → Keep Rows | Quick sampling while developing |
| 9 | **Replace Values** | Transform (+ right-click) | `₹`→nothing, fix typos, null→0 (right-click a *null* first) |
| 10 | Format: **Trim, Clean, Case** (Lower/Upper/**Capitalize Each Word**) | Transform → Format | Kills `"  laptop "` mismatches in joins |
| 11 | **Split Column** (delimiter, positions, digit↔text) | Transform | `ORD-10018` → prefix + number |
| 12 | Merge Columns | Transform | First + Last → Full name |
| 13 | Extract (First/Last N chars, text before delimiter…) | Transform → Extract | Codes like `2025-Q1` |
| 14 | **Conditional Column** | Add Column | IF/ELSE logic without code |
| 15 | Custom Column | Add Column | Full M formula power |
| 16 | **Column From Examples** | Add Column | AI guesses your intent — demo magic |
| 17 | Index Column (from 0/1/custom) | Add Column | Surrogate keys, ranking |
| 18 | Date tools (Year, Month, Quarter, Week, Age…) | Transform/Add Column → Date | Build calendar attributes |
| 19 | Fill **Down / Up** | Transform | Excel-style merged-cell fixes |
| 20 | **Unpivot Columns / Unpivot Others** | Transform | Turns wide Jan..Dec columns into rows — *the* most important reshape |
| 21 | Pivot Column | Transform | Rows → columns (reverse) |
| 22 | **Group By** | Transform | Aggregate in the query (Sum by Region) |
| 23 | Transpose | Transform | Swap rows/columns |
| 24 | **Merge Queries** (= SQL JOIN) | Home → Merge | Combine tables by key; choose join kind ↓ |
| 25 | **Append Queries** (= UNION ALL) | Home → Append | Stack tables with same shape (2023 + 2024 + 2025 files) |

**Join kinds in Merge (memorize 3, know 6):** **Left Outer** (keep all left + matches — the default, use 90% of the time) · **Inner** (only matches) · **Full Outer** (everything, nulls where unmatched) · Right Outer · Left/Right **Anti** (rows with *no* match — brilliant for quality checks). After merging, **expand** the new column's `⇆` icon to pick which columns to bring in.

### 📊 Data profiling (turn it on!)
View tab → **Column quality** (valid/error/empty %), **Column distribution** (distinct/unique), **Column profile**. Experts glance at these before doing anything else.

## 📘 2.4 Applied Steps & the M language

Every click = a step; every step = one line of **M** code:

```powerquery
let
    Source      = Csv.Document(File.Contents("C:\...\Messy_Sales_Raw.csv"), ...),
    Headers     = Table.PromoteHeaders(Source),
    Trimmed     = Table.TransformColumns(Headers, {{"Product", Text.Trim}}),
    TypedRows   = Table.TransformColumnTypes(Trimmed, {{"Qty", Int64.Type}}),
    NoDupes     = Table.Distinct(TypedRows, {"OrderNo"}),
    NoErrors    = Table.RemoveRowsWithErrors(NoDupes)
in
    NoErrors
```

**M survival kit:**
- `let … in …` — steps are named; `in` returns the final one. Steps reference *previous step names* — that's how the pipeline flows.
- `#"Step Name With Spaces"` — quoted identifiers.
- `each _ =` shorthand for "for every row, current row". `Text.Upper([Region])` inside `Table.TransformColumns` transforms a column.
- Errors: `try [Qty] otherwise 1` → default value instead of error.
- Right-click a step: **Rename** it like a professional (`Fix Product Case`, not `Changed Type1`), **Delete** it, or **Insert** after. *Deleting a step is how you undo.* Steps can be **reordered** (drag), and clicking any step shows the data *at that moment* — your built-in debugger.
- **Advanced Editor** (Home/View) shows full code. **Copy a query's M into a text file = documentation.**

**Query management the pro way (staging pattern):**
- Name queries properly: `stg_Sales_Raw` (staging, *don't load*), `Sales` (final, load).
- Right-click a query → uncheck **Enable load** for staging/intermediate queries → they refresh but don't bloat the model. Keep **Include in report refresh** on.
- **Reference** (right-click → Reference) = new query starting from this one (chain). **Duplicate** = independent copy. Use *Reference* almost always.

## 📘 2.5 Combine files from a folder (preview of pro life)
Get Data → **Folder** → point at a folder of monthly CSVs → **Combine & Transform** → Power Query builds a *sample query + function* and applies it to every file automatically, adding a `Source.Name` column. Filter that column to exclude temp files (`~$*`). New file dropped next month → **Refresh** and it flows in. *(Combine = module 8 refresher too.)*

---

## 🧪 LAB 2 — Rescue `Messy_Sales_Raw.csv` (60–75 min)

**Situation:** A legacy system exported garbage. Leadership wants Qty & Price by Region, monthly. Your job: a *repeatable* cleaning recipe.

1. Home → **Transform data → New Source → Text/CSV** → `datasets/Messy_Sales_Raw.csv` → OK. Note Power BI auto-added *Promoted Headers* + *Changed Type* steps.
2. **Profile first:** View → check Column quality/distribution. See the errors & empties appear under each column header.
3. **Clean Product names:** select `Product` → Transform → **Format → Trim**, then **Format → Capitalize Each Word**. (Whitespace + lowercase bugs were breaking any future join to `Products`.)
4. **Fix Region chaos:** select `Region` → Trim first (kills `" West"`). Then **Replace Values**: `north`→`North`, `NORTH`→`North`, repeat for south/east/west variants. *(Shortcut the experts use: Format → Capitalize Each Word does all of it in one step — try it and delete your replace steps!)*
5. **Fix Price:** right-click `Price` → Replace Values: `₹` → *(leave Replace With empty)*. Then Replace `,` → empty. Now Transform → **Data Type → Whole Number**. Watch **Errors** appear where rows said `N/A`/`error`:Home → **Remove Rows → Remove Errors**.
6. **Fix Qty:** Data Type → Whole Number (nulls & `N/A` become errors). We *keep* blanks-as-1 for empty, drop `N/A`: first **Replace Values** `N/A`→`1` *before* changing type, or replace errors afterward. Choose one; justify it in your journal.
7. **Fix the dates — the classic trap:** `Order Date` has both `2024-10-08` and `25-10-2024`. Correct method with mixed formats in one column is **Change Type → Using Locale** won't fully fix it; the robust pattern: Split the formats — add a **Conditional Column** flagging length, or simplest for this dataset: right-click `Order Date` → **Change Type → Using Locale** → Date, locale *English (United Kingdom)* handles `dd-MM-yyyy`; ISO strings still parse. Verify with column profile (Valid = 100%).
8. **Kill duplicates:** select `OrderNo` → Home → **Remove Rows → Remove Duplicates**. (148 → 140 rows.)
9. **Parse OrderNo:** Split Column → By Delimiter `-` → keep part 2, type Whole Number. Rename `OrderID`.
10. **Add a Revenue column:** Add Column → **Custom Column**: `[Qty] * [Price]` → name `LineTotal`.
11. **Group it like a boss:** (optional stretch) Group By → Region, new column `Revenue = Sum of LineTotal`. *Undo it after inspecting — we want row-level data in the model; aggregation belongs in DAX (Module 4).*
12. Rename the query `stg_MessySales_Clean`, rename steps meaningfully, then **Close & Apply**.

**Expected end state:** ~140 clean rows, `Order Date` = Date, `Qty`/`Price`/`LineTotal` = numbers, Region ∈ {North, South, East, West}.

---

## 💪 Exercises

1. Add a custom column `PriceBand`: `if [Price] >= 15000 then "High" else if [Price] >= 3000 then "Mid" else "Low"` (conditional column UI or custom column — do *both*).
2. Use **Column From Examples** on `Product` to extract the first word only. Inspect the M it generated.
3. `Customers.csv`: load it, split nothing, but create column `YearsAsCustomer` = number of full years between `JoinDate` and today. (Hint: Add Column → Date → Age, then Date → *Total Years*; or custom `DateTime.Date(DateTime.LocalNow())`.)
4. Load `Products.csv`; **Merge** it into your clean messy table on product name; expand `Category`. How many rows failed to match, and why might that happen in real life?
5. **Append** `Sales.csv` to itself (reference → keep 10 rows) — observe row count doubles. Then delete the step chain and explain Append vs Merge to your journal.
6. Load an Excel-style problem: type this in **Enter Data**, then unpivot it to rows (Month | Sales):
   `Region: North, South | Jan: 100,120 | Feb: 90,140 | Mar: 130,110`
7. Build a **parameter** (Manage Parameters): `pSourceFolder` (text, the datasets folder path). Advanced: rewrite your CSV source step to use it via Advanced Editor.
8. **Challenge:** modify the messy-clean query so any *new* unseen mess (e.g., `€` symbols) doesn't break refresh — use `try … otherwise` in a custom cleaning column.

### ✅ Selected answers
- **Ex 1 M:** `if [Price] >= 15000 then "High" else if [Price] >= 3000 then "Mid" else "Low"` — M `if` expressions are exactly this; note lowercase `if/then/else`.
- **Ex 6 unpivot:** select `Region` column → right-click → **Unpivot Other Columns** → rename `Attribute`→`Month`, `Value`→`Sales`.
- **Ex 4:** near-zero mismatches after trimming/case fix; in real life joins fail due to whitespace, case, spelling variants, and *type* mismatches (text "10018" vs number 10018).

---

## ❓ Quiz

1. Why is "Applied Steps" such a big deal — what happens on **Refresh**?
2. Merge vs Append — one line each.
3. Which join kind finds customers with *no* orders?
4. Unpivot solves what shape problem? Draw before/after.
5. What is a *staging query* and should it Load?
6. What does `each` mean in M?
7. Your column shows `Error` after a type change — give two fix strategies.

### ✅ Answers
1. Every applied step re-runs top-to-bottom on new data: cleaning becomes automatic and repeatable; nothing is done by hand twice.
2. Merge = join tables side-by-side on a key (adds columns). Append = stack tables vertically (adds rows).
3. Left **Anti** Join from Customers→Sales.
4. Wide → tall. Before: one column per month (Jan|Feb|Mar…). After: one `Month` column + one `Value` column — which models and DAX need.
5. An intermediate query used only to build others; **load disabled**, refresh enabled — keeps the model lean.
6. "For each row" — `_` is that row, e.g., `each [Qty] * [Price]`.
7. ① Fix the underlying text first (replace invalid tokens) then convert; ② convert, then *Remove Errors* (or *Replace Errors* with a default) — choosing is a business decision (keep vs drop bad data), which is why data profiles matter.

---

## ✅ Mastery checklist
- [ ] I can clean a messy file end-to-end without touching the original
- [ ] I can read & lightly edit the M in Advanced Editor
- [ ] I use staging queries with load disabled
- [ ] I can Merge (with the right join) and Append on command
- [ ] I redid Lab 2 *from scratch* and got close to the same steps

**Next: `Module_03_Data_Modeling.md` — the star schema, aka why your DAX will be easy.**
