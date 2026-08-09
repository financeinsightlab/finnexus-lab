# T1 · Tableau Foundations: From Zero to Your First Dashboard

> *If Power BI feels like an office suite, Tableau feels like an art studio for data. Same ShopKart story, new brush. By the end of this module you'll have connected the data, understood blue-vs-green (the ONE idea that makes Tableau click), and built three views.*

## 🎯 Objectives
Install Tableau Public (free) · connect the ShopKart CSVs · master Dimensions vs Measures, Discrete (blue) vs Continuous (green) · build bar + line + detail views · understand Relationships (the "noodle").

---

## 📘 1.1 The Tableau family — what to install

| Product | Cost | Use |
|---|---|---|
| **Tableau Public** (Desktop edition) | **FREE** | Full viz power; saves publish to your public Tableau Public gallery — perfect for learning & portfolio |
| Tableau Desktop | Paid | Saves locally, enterprise features |
| Tableau Prep | Paid/Builder | Cleaning (our Power Query track already covers the concept) |
| Tableau Server / Cloud | Paid | Sharing inside companies (like Power BI Service) |

👉 **We use Tableau Public.** Download from `public.tableau.com`, install, create a free account. Mac AND Windows both work (unlike Power BI!). Web authoring in a browser also works for quick edits.

## 📘 1.2 Connect to ShopKart

1. Open Tableau Public → left pane **"Connect → To a File → Text file"** → pick `datasets/Sales.csv`.
2. You're on the **Data Source page**: top = connection canvas, bottom = data grid preview.
3. Drag **Customers.csv** and **Products.csv** next to Sales. Tableau draws **relationships** (the "noodle") automatically:
   - Sales.CustomerID → Customers.CustomerID
   - Sales.ProductID → Products.ProductID
4. Fix data types in the grid header: click the icon on a column → set **OrderDate** and **JoinDate** to `Date`, numeric fields to `Number (whole/decimal)`.

> 💡 **Relationships ≠ Joins.** Modern Tableau relates *logical tables* with a noodle and only fetches what each viz needs — no duplicate-row explosions. You only need physical joins for special cases (we do one in T6).

## 📘 1.3 The mind-model: Dimensions slice, Measures sum

- **Dimensions** (blue header): how you cut the data — `Category`, `Region`, `City`, dates.
- **Measures** (green header): numbers that aggregate — `Quantity`, `UnitPrice`, `Discount`.
- Tableau auto-assigns roles by data type; drag a field between the two halves to convert (e.g., `CustomerID` counts are better as a Dimension + `CNTD`).

## 📘 1.4 Blue vs Green pills — the ONE idea that makes Tableau click

| Pill | Means | Result |
|---|---|---|
| **Blue (discrete)** | distinct labels / headers | Creates row/column **headers** (like a PivotTable row) |
| **Green (continuous)** | a range of values | Creates an **axis** (or gradient when it's a color) |

Examples to burn in: `MONTH(OrderDate)` **blue** → 12 labeled columns Jan…Dec. `MONTH(OrderDate)` **green** → a continuous timeline axis. `SUM(Quantity)` always green. Right-click any pill to flip discrete↔continuous, or change a date's part↔value.

## 📘 1.5 Your first three views (build these NOW)

1. **Sales by Category**: drag `Category` to **Columns**, `SUM(Quantity)` to **Rows** → vertical bars. Hit the **Sort** toolbar button to rank; drop `Category` on **Color** for polish.
2. **Monthly revenue trend**: make calc first (right-click in Data pane → Create Calculated Field):

```tableau
// Revenue — sales price net of discount
[Quantity] * [UnitPrice] * (1 - [Discount])
```

Then `OrderDate` (green, continuous MONTH) to Columns, `SUM(Revenue)` to Rows → a line. Right-click the date axis → **Exact Date / Month** as needed.
3. **Detail drill**: `Region` to Rows, `Category` to Rows (hello, hierarchy-free drill!), `SUM(Revenue)` to Text → quick crosstab. Swap axes with the ⇄ button.

**Marks card tour:** Color, Size, Label/Text, Detail, Tooltip — every drag to these channels literally re-paints the chart. **Show Me** (top-right) suggests 24 chart types from your selection.

## 📘 1.6 Filters & formatting basics

- Drag `OrderDate` → **Filters** → Years → right-click the filter → **Show Filter** = interactive sidebar.
- Drag `Region` to Filters, multi-select → this is how "slicers" work here.
- Format menu → choose clean fonts, drop borders, keep grid lines light (full design theory in T5).

---

## 🧪 LAB T1 — First contact with ShopKart (45 min)

1. Connect Sales + Customers + Products with relationships; set correct data types. Screenshot the noodle.
2. Bar: **Revenue by SubCategory**, sorted desc, bars colored by `Category`.
3. Line: **monthly Revenue** (continuous date), add `SUM(Quantity)` as a second row axis (two charts stacked — dual-axis comes in T2).
4. Crosstab: **Region × Segment** showing `SUM(Revenue)`; format currency to ₹ with the default properties (right-click Revenue → Default Properties → Number Format → Currency Custom → ₹).
5. Filter: show interactive quick filters for `Region` and `Category`; verify numbers change.
6. Save → **File → Save to Tableau Public** (title: "ShopKart T1"). Open your online gallery — you're published! 🎉

## 💪 Exercises
1. Make **average unit price by Category** — notice Tableau default-aggregates everything; try changing SUM→AVG from the pill's drop-down.
2. Blue MONTH vs green MONTH: build both versions of the trend and write 2 sentences on when each wins.
3. Convert `CustomerID` to a dimension, then build a view showing `CNTD(CustomerID)` by Region — why not put CustomerID on Text directly?
4. Use Show Me to turn the Category view into a **treemap** in 3 clicks.
5. Find where Tableau stores marks: drag `ProductName` onto **Detail** of a Revenue view — describe what happens to tooltips.

### ✅ Selected answers
- Ex 1: Right-click the pill → Measure (Sum) → Average. Blue pills slice; green pills always carry an aggregation (`SUM`, `AVG`, `MIN` …).
- Ex 3: Placing IDs on Text lists every customer as a mark — unreadable. `COUNTD` gives the *count of unique* customers per slice.
- Ex 5: Detail adds a mark per product → the tooltip now lists each product's revenue; the chart no longer has one bar per region.

## ❓ Quiz
1. Blue pill vs green pill — what's the core difference?
2. Relationships (noodle) vs physical joins — why is the noodle safer for multi-table data?
3. Dimensions vs Measures — how does Tableau decide, and can you override?
4. Where do you set a column's data type after connecting a CSV?

### ✅ Answers
1. Blue = discrete labels → headers; green = continuous values → an axis. Dates can be either; measures are (almost) always green.
2. Noodle = logical relationships resolved per-viz, preventing duplicate-row multiplication; physical joins materialize one fixed table (needed for some row-level cross-table calcs).
3. Roles come from data type (text/dates→dimensions, numbers→measures); drag the field across to convert or right-click → Convert to Dimension/Measure.
4. On the Data Source page, click the data-type icon in the column header (also possible later via the field's drop-down in the Data pane).

## ✅ Mastery checklist
- [ ] Connected 3 CSVs with relationships; data types corrected
- [ ] Can explain blue vs green without notes
- [ ] Built bar + line + crosstab and published to Tableau Public
- [ ] Created your first calculated field (Revenue)

**Next: T2 — every chart you'll actually use, and the Analytics pane magic (trend lines, forecasts, reference lines). 🚀**
