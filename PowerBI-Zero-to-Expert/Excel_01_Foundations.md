# Excel 01 — Foundations: Interface, Data Entry & Formatting

> *Excel is where 90% of the world's data work actually happens. Master it and Power BI feels 2x easier — they share the same data brain.*

## 🎯 Objectives
Navigate Excel with confidence · enter and format data professionally · understand cell references (the #1 beginner skill) · finish your first clean ShopKart workbook.

---

## 📘 1.1 Why Excel, and how it pairs with Power BI

Excel = flexible grid for analysis; Power BI = powerful engine for modeled, shareable dashboards. Both use **Power Query** for cleaning (Excel → *Data → Get & Transform Data*). Typical pro workflow: **clean & shape in Excel/Power Query → model & visualize in Power BI**. Learn Excel first = shortcut to everything.

## 📘 1.2 The interface map (2-minute tour)

| Landmark | What it does |
|---|---|
| **Ribbon** | Command tabs: Home (format), Insert (tables/charts), Data (sort/filter/Power Query), Formulas, Review, View |
| **Name Box** (left of formula bar) | Shows selected cell (A1); type to jump or name ranges |
| **Formula Bar** | View/edit the contents of the active cell |
| **Grid** | Columns A–XFD (16,384), Rows 1–1,048,576 |
| **Sheet tabs** (bottom) | Multiple pages per workbook; right-click to add/rename/color |
| **Status bar** (bottom-right) | Instant Sum/Average/Count of any selection |
| **Quick Access Toolbar** (top-left) | Pin your 5 most-used buttons |

**Workbook** = the file (`.xlsx`), **worksheet** = each tab, **cell** = one box (A1), **range** = group (A1:D10).

## 📘 1.3 Data types — what Excel actually stores

| Type | Examples | Gotcha |
|---|---|---|
| Text | `Delhi`, `ORD-10018` | Left-aligned by default |
| Number | `499`, `0.05` | Right-aligned; text-numbers cause wrong sums |
| **Date** | `21-Jul-2026` | Secretly a **serial number** (days since 1-Jan-1900 = 1) — that's why date math works |
| Boolean | TRUE / FALSE | |
| Error | `#N/A`, `#DIV/0!` | Always fix, never ignore |

Leading apostrophe `'00123` forces text. Green triangle = Excel warning you (e.g., "number stored as text").

## 📘 1.4 Entering data like a pro

- **Enter** = confirm & move down · **Tab** = confirm & move right · **Ctrl+Enter** = fill all selected cells with same value
- **Fill Handle** (bottom-right square): drag to copy or extend series — `Jan` → Feb, Mar…; `1` → 2, 3 (hold Ctrl for copy-instead-of-series)
- **Flash Fill (Ctrl+E):** type one example of the pattern in the next column → Ctrl+E → Excel fills the rest (splitting names, combining codes — feels like magic)
- **AutoSum (Alt+=):** sums the column above instantly
- **Ctrl+Shift+Arrow** = select to edge of data · **Ctrl+Home** = top of sheet

## 📘 1.5 Formatting for humans

- **Number formats (Ctrl+1):** Currency (`₹ #,##0`), Percentage, Date `dd-mmm-yyyy`, thousands separators. *Format ≠ value:* 0.05 formatted as % shows 5%.
- **Format Painter** (paintbrush) copies formatting.
- **Cell Styles / Table styles** for consistent look; avoid manual rainbow chaos.
- **AutoFit column width:** double-click the column-edge; fix `#######` (= column too narrow, not an error).

## 📘 1.6 The reference system — the most important 10 minutes in Excel

| Reference | Written | When copied right/down, it… |
|---|---|---|
| Relative | `A1` | Moves with the formula (`B1`, `C1`…) |
| Absolute | `$A$1` | *Never* moves — locked cell |
| Mixed | `$A1` / `A$1` | Column locked / Row locked |

**F4 key** cycles A1 → $A$1 → A$1 → $A1 while editing. Rule of thumb: lock cells holding *assumptions* (tax rate, target price) so one copy-drag works for 1,000 rows.

---

## 🧪 LAB 1 — Your first clean workbook (30 min)

1. Open Excel → **Blank workbook** → **Data → Get Data → From Text/CSV** → `datasets/Sales.csv` → load. *(Alternative: File → Open the CSV directly.)*
2. Click any data cell → **Ctrl+T** → "My table has headers" ✔. Your range is now a real **Table** (banded, filterable, auto-expanding). Name it `tblSales` (Table Design tab).
3. Format `UnitPrice` column: select → Ctrl+1 → Currency → Symbol ₹ → `₹ #,##0`. Same for a new column we'll add.
4. New column: in first empty header cell type **Revenue**, Enter. In first data cell type:
   `=[@Quantity]*[@UnitPrice]*(1-[@Discount])` — watch the whole column auto-fill (structured references!). Format as ₹.
5. **Freeze the top row:** View → Freeze Panes → Freeze Top Row.
6. Table Design → check **Total Row** → set Revenue total to **Sum**.
7. Home tab: make header row bold if not, give Sheet1 a name: `Sales`. **Ctrl+S → Save As `ShopKart.xlsx`.** (.xlsx keeps formatting & tables; .csv loses everything.)

💡 You just did in ~15 minutes what managers pay analysts for: trusted, formatted, self-updating numbers.

## 💪 Exercises
1. Use **Flash Fill** to extract the last 5 characters of OrderID into a new column `OrderNum`.
2. Add a `Discount %` column formatted as percent; verify one row by mental math.
3. In an empty cell: Alt+= on Revenue; then change it to **Average** via the dropdown.
4. Practice F4: write `=B2*$E$1` referencing a tax cell E1=0.18 for a `GST` column; copy down 10 rows.
5. Jump practice: press Name Box, type `Z500`, Enter; then Ctrl+Home.

## ❓ Quiz
1. Difference between .csv and .xlsx? 2. What does `#######` mean and how do you fix it? 3. Why are dates secretly numbers, and what does that enable? 4. What does F4 do while editing a formula?

### ✅ Answers
1. CSV = plain text, one sheet, no formatting/formulas preserved; XLSX = full workbook (multiple sheets, formats, tables, charts).
2. Column too narrow to display the number — widen (double-click edge).
3. Dates = serial days since 1-Jan-1900, so `=A2-A1` gives days between dates, `+7` adds a week.
4. Cycles the reference through $A$1 → A$1 → $A1 → A1 (absolute/mixed locking).

## ✅ Mastery checklist
- [ ] I can move around without touching the mouse much
- [ ] Tables via Ctrl+T + structured refs feel natural
- [ ] I know when to lock with $ (and use F4)
- [ ] Lab 1 redone from a blank workbook

**Next: `Excel_02_Formulas_Core_Functions.md` — the formula engine room.**
