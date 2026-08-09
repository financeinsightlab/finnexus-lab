# Executive Sales Dashboard — BI Lab Dataset
Synthetic model with dimension and fact tables.

## Model
- `fact_orders`: one row per order. Status must be defined before revenue reporting.
- `dim_customers`: one row per customer.
- `dim_products`: one row per product.
- Create a `dim_date` table in Power BI / Tableau / Looker Studio rather than relying only on the fact date.

## Relationships
- fact_orders[customer_id] → dim_customers[customer_id]: many-to-one
- fact_orders[product_id] → dim_products[product_id]: many-to-one
- fact_orders[order_date] → dim_date[date]: many-to-one

## Stakeholder brief
The CEO wants to review Q2 sales health: revenue, gross profit, margin, completed order volume, time trend, regional performance, category drivers, and exceptions needing action.
