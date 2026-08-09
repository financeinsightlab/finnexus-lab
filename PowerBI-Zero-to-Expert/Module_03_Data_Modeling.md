# Module 03 — Data Modeling: The Star Schema (Where Experts Are Made)

> *Mediocre analysts fight DAX all day. Experts win before writing a single measure — because their model makes DAX simple.*

## 🎯 Objectives
Facts vs dimensions · star vs snowflake · relationships (cardinality, cross-filter, active/inactive) · the mandatory Date table · model hygiene (hide keys, sort-by, categories, hierarchies) · build the ShopKart star schema you will use for the rest of the course.

---

## 📘 3.1 Why modeling matters

Power BI's engine (**VertiPaq**) is a **columnar, compressed, in-memory** store. It adores *tall, narrow* tables and simple one-to-many relationships. A well-designed model means: fast reports, tiny files, simple DAX. A bad model means: 200-line DAX hacks, wrong totals, slow refreshes. **Modeling is the highest-leverage skill in this course.**

## 📘 3.2 Facts vs dimensions (the two kinds of tables)

| | **Fact table** (events/numbers) | **Dimension table** (who/what/where/when) |
|---|---|---|
| Examples | Sales, Orders, SensorReadings | Customers, Products, Date, Regions |
| Shape | Tall & narrow (many rows, few columns) | Short & wide (few rows, descriptive columns) |
| Content | Foreign keys + numbers to aggregate | One row per entity, attributes |
| In our data | `Sales` (and `Targets`) | `Customers`, `Products`, `Date` |

**Golden rule:** filter/slice by dimension columns, aggregate fact columns.

## 📘 3.3 Star schema vs snowflake

```
        Customers
            │
Products ── SALES ── Date          ← star: dims surround one fact (GOAL)
                      
Product → SubCategory → Category   ← snowflake: dims normalized further (avoid in Power BI)
```
Snowflaking (normalizing like a database) *feels* tidy but adds relationships, ambiguity risk, and slower queries. In Power BI: **denormalize dimensions into flat, wide tables and always aim for a star.** One star per business process; multiple facts are fine if they share dimensions.

## 📘 3.4 Relationships (Model view)

Power BI usually auto-detects relationships on load (by matching column names). **Expert settings (File → Options → Current File → Data Load):** turn OFF "Autodetect new relationships" — detect them once, verify by eye, then own them.

| Property | Options | Rules of thumb |
|---|---|---|
| **Cardinality** | Many-to-One (`*:1` — the good one), One-to-One, Many-to-Many | 95% of pro models are `*:1` from fact → dimension |
| **Cross-filter direction** | Single (dimension filters fact) / Both | Leave **Single**. Use Both only when you truly understand why (it creates ambiguity) |
| **Active vs Inactive** | Only one active path between two tables | Extra relationships stored inactive; awaken in DAX with `USERELATIONSHIP` (Module 5) |

- **Many-to-many** (`*:*`) exists (e.g., bridge tables for budgets at different granularity) but treat it as a calculated decision, never an accident.
- **Ambiguity:** if two paths could filter the same table, Power BI deactivates one. Symptoms = "can't determine relationship" errors or weird blanks.
- **Referential integrity:** fact rows with keys missing in the dimension land in an automatic **(Blank)** member in visuals. Clean data + Left Anti joins in Power Query guard against it.

## 📘 3.5 The Date table — non-negotiable

Time intelligence (YTD, YoY…) requires a **proper Date table**: one row per day, **continuous, no gaps**, covering your full date span, with a unique Date column. Never rely on Power BI's hidden *Auto date/time* tables (they bloat memory — disable in Options → Data Load).

Create it with DAX (**Modeling → New table**):

```dax
Date = 
ADDCOLUMNS (
    CALENDAR ( DATE ( 2023, 1, 1 ), DATE ( 2025, 12, 31 ) ),
    "Year", YEAR ( [Date] ),
    "Month Name", FORMAT ( [Date], "MMMM" ),
    "Month Number", MONTH ( [Date] ),
    "Year Month", FORMAT ( [Date], "YYYY-MM" ),
    "Quarter", "Q" & QUARTER ( [Date] ),
    "Year Quarter", YEAR ( [Date] ) & "-Q" & QUARTER ( [Date] ),
    "Weekday", FORMAT ( [Date], "dddd" ),
    "Weekday Number", WEEKDAY ( [Date], 2 )
)
```

Then: right-click the table → **Mark as date table** → choose the `Date` column → relate `Date[Date] (1) → Sales[OrderDate] (*)` and `Date[Date] (1) → Targets[MonthStart] (*)`.

## 📘 3.6 Model hygiene checklist (do these reflexively)

1. **Hide from Report View** all keys/IDs (`CustomerID`, `ProductID` in fact *and* dims unless needed), sort-helper columns (`Month Number`, `Weekday Number`).
2. **Sort By Column:** `Month Name` → sort by `Month Number`; `Weekday` → `Weekday Number`. (Fixes alphabetically sorted charts: Apr, Aug, Dec…)
3. **Default summarization:** keys/IDs → *Don't summarize*; currency/quantity → *Sum*.
4. **Formats:** set currency `₹ #,##0`, percentages `0.0%`, dates `dd-MMM-yyyy` — in the *model*, so every visual inherits them.
5. **Data Category** (Column tools): `City`→City, `State`→State or Province → maps geocode correctly.
6. **Hierarchies** (right-click column → Create hierarchy): `Category → SubCategory → ProductName`; `State → City`.
7. **Display folders** (Model view, select a measure → Properties) keep 50+ measures tidy: `_Time Intelligence`, `_KPIs`…
8. Rename everything for humans: `Units Sold`, not `SumOfQty_final2`.

---

## 🧪 LAB 3 — Build the ShopKart star schema (60 min)

1. New PBIX. Power Query: load **all four** CSVs (`Sales`, `Customers`, `Products`, `Targets`). Verify types (dates→Date, money/prices→Whole Number, `Discount`→Decimal). Close & Apply.
2. **Model view.** Verify: `Sales[CustomerID] → Customers[CustomerID]` and `Sales[ProductID] → Products[ProductID]` exist as *:1, single direction. If missing: drag key-to-key.
3. Create the **Date** table (code above), **mark as date table**, relate to `Sales[OrderDate]` and `Targets[MonthStart]`.
4. Add a tiny **Measures table** (the pro trick): Home → Enter Data → empty table named `_Measures` → in Report view create any measure; it must live in `_Measures`; then **delete the dummy column**. The table jumps to the top with a calculator icon. All future measures live here.
5. Apply hygiene: hide all ID columns; `Month Name` sort-by `Month Number`; formats (₹ on prices/costs); set `City`/`State` data categories; build hierarchies.
6. **Sanity visuals:** Card = Sum of `Quantity`; Bar = `Category` by Sum of Quantity; Table = `Region` + Customers count; Line = `Month Name` (sorted!) by Quantity. If "Sort by column" worked, months run Jan→Dec.
7. Save: `ShopKart_Model.pbix`. **This file is your base for Modules 4–8** — keep it safe.

**Granularity discussion (journal it):** `Sales` is at order-product-day grain; `Targets` is at region-month grain. They connect only through **shared dimensions** (`Date`, geography via Customers→…→Targets? — careful!). Notice: `Targets` has `Region` and *MonthStart* but no direct link to Customers. This forces correct, intentional filtering — and is why in Project 1 you'll relate `Targets` only to `Date` and filter region via its own column.

---

## 💪 Exercises

1. Draw (paper or visuals) the full schema with cardinalities and arrows of filter direction.
2. Add `UnitCost × Quantity` logic question: where should `COGS` be computed — Power Query column, calculated column, or measure? Defend each option's tradeoff.
3. Add a second Date relationship: `Customers[JoinDate]` → `Date[Date]`. Why is it **inactive**? (Hint: existing path Customers→Sales→Date.)
4. Create hierarchy `Product Drill`: Category → SubCategory → ProductName; use it in a matrix and drill down/up.
5. Fix this real-world smell: a colleague relates `Targets[Region]` directly to `Customers[Region]` (*:* relationship). Explain the risk (non-additivity, overcounting) and propose the star-correct alternative.
6. Set `Products[ProductName]` → Sort by… nothing needed; instead create `Products by PriceBand` exercise from Module 2 and sort `PriceBand` Low→Mid→High via a hidden order column. (Advanced: do it in Power Query with a conditional + index.)

## ❓ Quiz

1. Fact vs dimension — one-line definitions. 2. Why avoid snowflaking in Power BI? 3. Default cross-filter direction you trust, and why. 4. Two ways an inactive relationship can be used. 5. Three rules that make a valid Date table. 6. What creates a **(Blank)** row in a slicer from a dimension? 7. Why turn OFF auto date/time?

### ✅ Answers
1. Facts = measurable events (rows to aggregate). Dimensions = descriptive entities you filter/group by.
2. More relationships → more ambiguity, slower filters, harder DAX; VertiPaq compresses wide dims well, so normalization buys nothing.
3. **Single**. Bidirectional filters multiply filter paths → ambiguity and surprises; use DAX (`CROSSFILTER`) for the rare exception.
4. `USERELATIONSHIP` inside `CALCULATE`; or refresh/analysis in Power Query instead. (The relationship stays active=off in the UI.)
5. One row per date, contiguous/no gaps, unique Date column (and covering the model's full date range); then *Mark as date table*.
6. Fact keys with no matching dimension row (broken referential integrity).
7. Hidden auto date tables are created **per date column**, inflating file size and confusing time-intelligence behavior.

## ✅ Mastery checklist
- [ ] My ShopKart model is a clean star (screenshot it — portfolio piece #1)
- [ ] Date table marked, sorted, related twice; month names sort correctly
- [ ] Keys hidden, categories set, currency formatted at the model level
- [ ] I can articulate *why*: tall/narrow, single direction, shared dims

**Next: `Module_04_DAX_Fundamentals.md` — time to write the language.**
