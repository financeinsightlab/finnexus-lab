# Messy Enterprise Orders — Data Quality Lab

## Business request
Operations needs a reliable weekly view of completed orders, revenue and regional fulfillment workload. Finance will use a separate approved revenue report; this extract is for operational analysis only after validation.

## Intended grain
One row per order. The file contains deliberate violations.

## Rules to investigate
- `order_id` should be unique.
- Valid statuses: Completed, Cancelled, Returned. `Complete` is an inconsistent source value, not automatically Completed.
- Completed operational order quantity should be > 0.
- Order date should be valid, not future and parseable under documented locale rule.
- Approved regions: North, South, East, West; blank should not be guessed.
- `customer_id` must match approved customer reference in real use; `C-999` is an intentional orphan example.
- Revenue should reconcile to quantity × unit price only after a documented treatment of status/returns/discounts.

## Deliverable
Quality profile, cleaning log, exception table, cleaned analysis dataset, validation tests, reconciliation note and fitness-for-purpose statement.
