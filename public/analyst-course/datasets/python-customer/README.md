# Customer Segmentation — Python Analytics Lab

Synthetic data for learning.

## Tables
- `customers.csv`: one row intended per customer. Includes a small number of missing ages and inconsistent region labels.
- `transactions.csv`: one row intended per transaction. Includes a duplicate transaction, an orphan customer ID, and a small number of missing amounts.

## Business brief
The Growth Lead wants to understand customer value and engagement, identify meaningful customer segments, and select an appropriate retention or growth action.

## Required professional habits
- Keep raw source intact.
- Profile before cleaning.
- Document treatment of missing/orphan/duplicate records.
- Aggregate transactions to customer grain before joining to customer attributes.
- Treat unsupervised clusters as descriptive aids, not definitive identities.
