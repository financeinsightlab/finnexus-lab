# Northstar Retail — Sales Performance Dataset

## Business context
The Sales Director needs to assess Q2 2026 performance before allocating Q3 sales-support effort. This is an intentionally imperfect learning dataset.

## Grain
Each row should represent one order. The supplied file contains a deliberate duplicate so you must validate this assumption.

## Columns
| Column | Definition | Notes |
|---|---|---|
| Order ID | Identifier intended to be unique per order | Check duplicates |
| Order Date | Date an order was placed | Includes a small number of blank and DD/MM/YYYY values |
| Region | Selling region | Has case/whitespace/missing-value issues |
| Salesperson | Account/sales owner | Text |
| Channel | Acquisition channel | Text |
| Category / Product | Product taxonomy | Text |
| Quantity | Units in order | One deliberate invalid value |
| Unit Price | Price per unit before discount | INR |
| Discount % | Percentage discount | 0–100 expected |
| Revenue | Net order revenue after discount | INR; check against expected calculation |
| Cost | Estimated direct cost | INR |
| Status | Completed, Canceled, Returned | Define which statuses count for your KPIs |

## Suggested project rules (use them only after documenting them)
- Preserve the raw sheet.
- Standardize Region with `TRIM` and consistent case; label blanks `Unknown`, do not guess.
- Convert dates into valid spreadsheet date values and flag blanks.
- Remove only exact duplicate Order IDs after documenting the rule.
- For the dashboard, use `Completed` orders; keep Returned/Canceled visible in quality checks.
- Gross profit = Revenue − Cost. Gross margin % = Gross profit ÷ Revenue.

## Important
This is synthetic learning data. It is not a real company dataset.
