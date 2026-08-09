# PQ 01 — Power Query Foundations: Connect, Load, Clean, Repeat

> *Power Query is the invisible engine inside Power BI **and** Excel. Learn it once → use it in both. This track takes you deeper than Module 02 ever could.*

## 🎯 Objectives
Understand where Power Query lives and how it thinks · connect to any file · master the Editor's key areas · know your data types cold · reload with confidence.

---

## 📘 1.1 What Power Query really is

An **ETL engine** (Extract-Transform-Load) that records your clicks as **Applied Steps** and replays them on demand. Same engine in:
- **Power BI Desktop:** Home → Transform data
- **Excel:** Data → Get & Transform Data
- **Power BI Service (Dataflows), Fabric Data Factory:** cloud versions of the same brain

The magic contract: **connect once → clean via steps → refresh forever.** If you ever catch yourself manually fixing the same column monthly, Power Query is the answer you're ignoring.

## 📘 1.2 The Editor map (memorize these 7 zones)

| Zone | Purpose |
|---|---|
| **Ribbon** | Home (refresh, merge, append, load), Transform (shape columns), Add Column (new logic), View (formula bar, quality) |
| **Queries pane** (left) | All your queries; organize into Groups (folders!) like `_Sources`, `stg_` staging, `_Output` |
| **Data grid** (center) | Live preview of the selected step — there is **no undo panic**, only step edits |
| **Query Settings → Applied Steps** (right) | The recipe list. Click any step = time-travel to that state |
| **Formula bar** | The M code of the current step (View → enable it — always on for pros) |
| **Status bar** | Last refresh time + row count |
| **Column headers** | Data-type icons: `ABC` text, `123` whole, `1.2` decimal, 📅 date, `T/F` logical |

## 📘 1.3 Connecting: the sources you'll meet weekly

- **Files:** Text/CSV, Excel Workbook (sheet *or* named table), JSON, XML, PDF, **Folder** (the pro one — see PQ 02)
- **Databases:** SQL Server, PostgreSQL, MySQL… (server + credentials)
- **Web:** `https://...` URL to CSV/JSON/API
- **SharePoint/folders in the cloud**, Azure/Fabric items
- Load dialog has two buttons of consequence: **Load** (to destination) vs **Transform Data** (open editor). Experts *always* Transform first — even if just to verify types.

## 📘 1.4 Data types are contracts, not suggestions

Each column has one type. Wrong types = broken math, dates that won't sort, merges that silently fail.
- Type conversions live in Applied Steps as `Changed Type` — editable via the ⚙ gear icon.
- **Using Locale** (right-click a column → Change Type → Using Locale): critical for Indian date/number formats (`dd-MM-yyyy`, `1,20,000`).
- Text vs Number traps: `OrderID "10018"` looks fine but won't relate to numeric keys.
- Types cheat: `Int64.Type`, `type text`, `type date`, `type datetime`, `Currency.Type`, `Percentage.Type`, `Logical.Type`.

## 📘 1.5 Applied Steps thinking (the whole philosophy)

- Steps run **top to bottom, every refresh** → order matters (clean text *before* type change).
- Click a step → grid shows life *at that line*. Click ⚙ to edit the dialog that made it. Right-click → **Rename** (self-documenting steps like `Fix Region Case`), delete, reorder, **Extract Previous** (split query).
- Debug habit: when a number looks wrong, walk the steps from top, watching the grid change. You'll spot the culprit step in seconds.

## 📘 1.6 Load destinations & refresh

- Right-click query → **Enable Load** off = *staging* (refresh but don't store in model).
- **Include in report refresh** off = frozen snapshot (rare).
- Excel: **Close & Load To** → Table / PivotTable / Connection Only. Power BI: Close & Apply to the model.
- **Refresh** re-runs *all* queries source → steps → destination. One broken step fails its query.

---

## 🧪 LAB 1 — The 20-minute first clean (recap speed-run)

1. Power BI (or Excel) → Get Data → Text/CSV → `datasets/Messy_Sales_Raw.csv` → **Transform Data**.
2. Steps (name each one properly!): Trim+Proper `Product` → Trim `Region` → Capitalize-Each-Word `Region` → Replace `₹` & `,` in `Price` → type Price Whole Number → **Remove Errors** → type `Qty` → Replace Errors with null→1 (or fix first) → Change `Order Date` type **Using Locale** → Remove Duplicates on `OrderNo` → Split `OrderNo` on `-`.
3. View → turn ON Column quality & Column distribution. Confirm Valid = 100% where expected.
4. Rename query `stg_MessySales_Clean`, group it under folder `stg_Staging`. Close & Load… *(PQ 02 will combine monthly files like this one — automatically.)*

## 💪 Exercises
1. Import `Products.csv`; fix the `UnitCost`/`UnitPrice` types; count how many steps were auto-added vs yours.
2. Type experiment: deliberately change `UnitPrice` to Text → what breaks downstream? Delete that step to heal.
3. Rename auto steps of Lab 1 into human sentences; reload the file and narrate each step's effect.
4. Locale drill: type-ify `"31/01/2025"` in one query with Locale = English (India) vs English (United States). Record the difference.
5. Disable Load on a query; observe it vanish from the model view but still refresh.

## ❓ Quiz
1. What happens on every Refresh? 2. Why "Transform Data" before "Load" even for clean-looking files? 3. Steps you've renamed meaningfully serve what purpose? 4. What does "Using Locale" fix?

### ✅ Answers
1. Every Applied Step of every enabled query re-executes against current sources — cleaning replays automatically.
2. Types may be mis-detected (dates as text, numbers as text) even when data looks fine → verify/snap a `Changed Type` step explicitly.
3. Documentation + debugging: future-you reads `Fix Region Case` instead of decoding `Changed Type3`.
4. Culture-specific parsing: day-first dates and `,` thousands in Indian data — US locale mangles them.

## ✅ Mastery checklist
- [ ] Editor's 7 zones without thinking
- [ ] Every step named; I can debug by clicking steps
- [ ] Staging vs loaded decision made deliberately
- [ ] Lab 1 repeated in *both* Excel and Power BI

**Next: `PQ_02_Shaping_Combining.md` — pivots, joins, appends, and the legendary folder-combine.**
