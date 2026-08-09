# SaaS Retention Investigation — SQL Lab Dataset

Synthetic data for guided practice. Import all CSV files to PostgreSQL, SQLite, DuckDB, or a local tool.

## Tables and grain
- `accounts`: one row per account. `account_id` is intended unique. `is_test` marks rows to exclude from business metrics.
- `subscriptions`: one row per subscription record; use status carefully.
- `product_events`: one row per product event; contains an intentional duplicate event.
- `support_tickets`: one row per ticket.

## Business request
Monthly paid-account retention has weakened. Identify which segment(s) require attention and create a defensible next action. Do not assume support tickets or activation cause churn from this observational data.

## Practice definition
For introductory tasks, an eligible paid account is `status = 'paid'` and `is_test = false`. For the capstone, write and document a more complete point-in-time retention definition.
