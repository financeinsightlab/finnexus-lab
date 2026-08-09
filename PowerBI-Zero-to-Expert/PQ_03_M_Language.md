# PQ 03 — The M Language: From Click-Recipes to Code Mastery

> *Everything the UI does is M code underneath. Learn M and there's no transformation on Earth you can't express — this is the point where you stop being a clicker.*

## 🎯 Objectives
Read & write M confidently · understand let/in, records, lists, tables · write custom functions & parameters · handle errors like an engineer.

---

## 📘 3.1 Anatomy of every query

```powerquery
let
    Source = Csv.Document(File.Contents("C:\data\sales.csv"), ...),
    Typed  = Table.TransformColumnTypes(Source, {{"Qty", Int64.Type}}),
    Added  = Table.AddColumn(Typed, "Revenue", each [Qty] * [Price], Currency.Type)
in
    Added
```

**The 5 laws of M:**
1. `let … in …` — each line names a value; `in` returns the final one.
2. Line names become **Applied Steps**; quoted identifiers use `#"Name With Spaces"`.
3. `each` is sugar for `(_) =>` — a function of one row; `[Qty]` reads that row's column.
4. M is **lazy & functional**: values immutable, evaluation on demand, no loops (functions recurse/iterate for you).
5. Types matter: `type table`, `type list`, `type record`, `Int64.Type`, `type date`, `nullable type text`.

## 📘 3.2 The three data structures you manipulate

```powerquery
record = [Name = "Aarav", City = "Delhi"]          -- dotted access: record[Name]
list   = {1, 2, 3}                                  -- ordinal: list{0} = 1, list{2} = 3
table  = #table({"ID","Price"}, {{1,999},{2,499}})  -- rows = list of lists
```
Key operators: `{1..5}` range list, `[field]` field access, `=`, `<>`, `and`, `or`, `not`, `if … then … else`.

## 📘 3.3 The 20 functions that cover 90% of real work

| Family | MVPs |
|---|---|
| Table | `Table.AddColumn`, `Table.TransformColumns/Types`, `Table.SelectRows/Columns`, `Table.RenameColumns`, `Table.Sort`, `Table.Group`, `Table.Distinct`, `Table.PromoteHeaders` |
| List | `List.Dates`, `List.Sum`, `List.Count`, `List.Transform`, `List.Max`, `List.Sort`, `List.Skip/Take` |
| Text | `Text.Trim`, `Text.Upper/Lower`, `Text.Replace`, `Text.Split`, `Text.Select`, `Text.BetweenDelimiters` |
| Date/type | `Date.Year/Month`, `Date.From`, `DateTime.LocalNow`, `Date.ToText(d,"yyyy-MM", "en-IN")`, `Duration.Days`, `Int64.From`, `Number.From` |
| Logic | `if/else`, `try … otherwise …`, `Record.FieldOrDefault`, `Value.Is`, `Comparer.OrdinalIgnoreCase` |

📝 Build blocks: a date column in M — `= Table.AddColumn(Source, "Month No", each Date.Month([Order Date]), Int64.Type)` — note the inline type on AddColumn keeps `Changed Type` steps unnecessary.

## 📘 3.4 Custom columns & transforms with `each` (the inner language)

`Add Column → Custom Column` is 95% each-logic:
```powerquery
each if [Qty] = null then 1 else [Qty]                     -- defaults
each try Number.From([Price]) otherwise 0                  -- error → fallback
each Text.Proper(Text.Trim([Product]))                     -- chain text ops
each if [Region] = "North" then [Revenue] * 1.05 else [Revenue] -- conditional math
eacheach = no — write ifs as above. Date: each Date.Year([JoinDate]) 
```
And whole-column operations: Transform Columns → `= Table.TransformColumns(prior, {{"Product", each Text.Proper(Text.Trim(_)), type text}})`.

## 📘 3.5 Functions — your own fx army

Custom function (right-click Queries pane → New Query → Blank → paste, then rename):
```powerquery
(payload as text) as text =>
let
    Clean = Text.Proper(Text.Trim(payload)),
    FirstWord = List.First(Text.Split(Clean, " "))
in
    FirstWord
```
Name it `fxFirstWord`. Call it anywhere: `= Table.AddColumn(T, "FirstWord", each fxFirstWord([Product]))`.
**Parameters** (Manage Parameters) = user-settable values (folder paths, thresholds) used inside queries: `File.Contents(pDataFolder & "\Monthly\sales.csv")` — re-point 2024→2025 without touching applied steps. *Interview gold: incremental refresh's RangeStart/RangeEnd are exactly this trick.*

## 📘 3.6 Error culture

Errors appear as `Error` cells with details under the hood. Behaviors:
- **Ignore:** Remove Errors (after logging root cause).
- **Rescue:** `try expr otherwise fallback` — surgical, keeps rows.
- **Document & audit:** add a flag `each [InError] = true/false` then replace with null — keep a quality summary query.
Bonus debugging: keep a `Nulls` count step, click Error cell details for message + record snapshot.

---

## 🧪 LAB 3 — Code your own Date table (60 min)

In Power BI, PQ creates a date table — but engineers write it in M for max control (fiscal years!):
```powerquery
let
    Start = #date(2023, 1, 1),
    End   = #date(2025, 12, 31),
    Days  = Duration.Days(End - Start) + 1,
    Dates = List.Dates(Start, Days, #duration(1, 0, 0, 0)),
    T0    = Table.FromList(Dates, Splitter.SplitByNothing(), {"Date"}),
    T1    = Table.TransformColumnTypes(T0, {{"Date", type date}}),
    Yr    = Table.AddColumn(T1, "Year", each Date.Year([Date]), Int64.Type),
    Mo    = Table.AddColumn(Yr, "Month Number", each Date.Month([Date]), Int64.Type),
    MName = Table.AddColumn(Mo, "Month Name", each Date.ToText([Date], "MMMM", "en-IN"), type text),
    FY    = Table.AddColumn(MName, "Fiscal Year", each if Date.Month([Date]) >= 4 then "FY" & Text.From(Date.Year([Date])) else "FY" & Text.From(Date.Year([Date])-1), type text)
in
    FY
```
Paste into a Blank Query → inspect → **India's April fiscal year** column in 3 lines. Then: make Start/End **parameters**: replace `#date(...)` with `pDateStart`, `pDateEnd` (Manage Parameters). Debug encounter: deliberately write `[NonexistentCol]` in one step, read the error message, fix it — the formula bar is your friend.

## 💪 Exercises
1. Write M adding `IsWeekend` = true on Sat/Sun (hint: `Date.DayOfWeek([Date], Day.Monday) >= 5`).
2. Custom column: `PriceBand` High ≥15000 / Mid ≥3000 / Low — in one `if` chain with `each`.
3. Function `fxFullName(first,last)` combining w/ proper case; apply to Customers' split names.
4. `List.Transform({"  north ","NORTH"}, each Text.Proper(Text.Trim(_)))` in a blank query; read each line aloud.
5. Implement folder-path parameter `pMonthlyFolder`; re-point Lab 2's Folder.Combine source step to it via Advanced Editor.

### ✅ Selected answers
- Ex 1: `Table.AddColumn(T, "IsWeekend", each Date.DayOfWeek([Date], Day.Monday) >= 5, Logical.Type)`
- Ex 5 (pattern): `= Folder.Files(pMonthlyFolder)` as the first step.

## ❓ Quiz
1. What does `each` compile to and when do you need `(_)=>` explicitly? 2. try/otherwise vs Remove Errors — data-loss tradeoff? 3. Why inline the type in Table.AddColumn? 4. Parameters exist to…?

### ✅ Answers
1. `each` = `(_) =>` taking the current row; the explicit form is needed for nested functions/columns comparisons.
2. try/otherwise rescues rows with fallback values; Remove Errors deletes them — choose by whether the row's other data is trustworthy.
3. It types the column at creation → avoids an extra Changed Type step and type flips later.
4. Externalize changeable values (paths, years, thresholds) so refreshing across environments = one parameter edit.

## ✅ Mastery checklist
- [ ] I wrote & explained the M date table *without pasting*
- [ ] A custom function + parameter live in my file
- [ ] try/otherwise used deliberately with documented fallback logic
- [ ] Formula bar always ON in my editor

**Next: `PQ_04_Pro_Enterprise.md` — folding, performance, dataflows, incremental refresh, real-world architecture.**
