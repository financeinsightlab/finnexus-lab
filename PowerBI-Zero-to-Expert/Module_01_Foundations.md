# Module 01 — Power BI Foundations & Your First Report

## 🎯 Objectives
By the end you will: explain what BI is and where Power BI fits, install and navigate Power BI Desktop, understand the 5-step workflow, and **build and save your first real report** using `Sales.csv`.

---

## 📘 1.1 What is Business Intelligence, really?

A shop owner asks: *"Which products actually make me money? Which city buys most? Are we better than last year?"* The answers are buried in spreadsheets. **Business Intelligence (BI)** is the discipline of turning raw data into answers a human can act on. A BI tool does four jobs: **Get data → Store/model it → Analyze it → Show it.**

**Power BI** is Microsoft's BI platform and the market leader (Gartner has ranked it #1 in Analytics & BI for years). Companies hire for it because it's everywhere: startups, banks, hospitals, the IPL, governments.

## 📘 1.2 The Power BI ecosystem

| Component | What it is | When you use it |
|---|---|---|
| **Power BI Desktop** | Free Windows app where you build everything | All development (Modules 1–6) |
| **Power BI Service** (app.powerbi.com) | Cloud platform to publish, share, refresh, secure | Module 07 |
| **Power BI Mobile** | iOS/Android apps to view reports | Module 06 (mobile layout) |
| **On-premises data gateway** | Bridge that lets the cloud refresh data from your company's internal servers | Module 07 |
| **Power BI Report Server** | On-prem hosting for orgs that can't use cloud | Awareness |
| **Power BI Embedded** | Put reports inside your own app/website | Awareness |
| **Microsoft Fabric** | Microsoft's unified data platform; Power BI lives inside it now | Module 08 |

**Licensing in one breath:** Power BI Desktop is free. A *Free* license lets you publish to your personal "My workspace". *Pro* (≈$14/user/mo, included in Microsoft 365 E5) is the standard for sharing with colleagues; *Premium Per User* (≈$24) adds large-model/AI features; *Fabric capacity* licenses cover big organizations. You can complete this entire course on free licenses.

## 📘 1.3 Install & tour

1. Microsoft Store → install **Power BI Desktop** → open it.
2. Close the splash screen. The app opens on the **Report view**.

**The mental map (learn these 8 landmarks):**

1. **Three views (left edge):** 📊 Report · 🗒 Table · 🔗 Model — plus **DAX query view** for writing queries.
2. **Ribbon (top):** like Office. Key tabs: *Home* (Get Data, Enter Data, Refresh, New measure), *Insert* (visuals, buttons, shapes), *Modeling* (relationships, calculations), *View* (themes, panes), *Optimize* (Performance Analyzer).
3. **Data/Fields pane (right):** your tables and columns.
4. **Visualizations pane:** the chart gallery + the **Build visual** wells (X-axis, Y-axis, Legend…) and the **Format** paintbrush.
5. **Filters pane:** filters for this visual / this page / all pages.
6. **Canvas:** the page you design on.
7. **Page tabs (bottom):** like Excel sheets — a report has pages.
8. **Power Query Editor:** Home → *Transform data* opens a whole second app for cleaning data (Module 02).

## 📘 1.4 The 5-step workflow (memorize this)

```
GET DATA  →  CLEAN (Power Query)  →  MODEL (tables + relationships)  →  VISUALIZE  →  SHARE
   CSV/DB/web        Module 02               Module 03                 Modules 4–6     Module 07
```
Every professional Power BI project follows this loop — often repeatedly.

---

## 🧪 LAB 1 — Build your first report (45 min)

> **Goal:** a one-page report of ShopKart India sales volume. Don't aim for pretty — aim for *finished*.

1. **Get data:** Open Desktop → **Get Data → Text/CSV** → select `datasets/Sales.csv` → preview window → click **Load** (not Transform yet).
   *Power BI shows "Applying query changes" — it's importing 1,300 rows into memory.*
2. **Inspect:** Click **Table view** (left edge). See the 7 columns. Note how Power BI guessed data types (123 = whole number, 📅 = date, Σ = numeric).
3. **Meet the Fields pane:** back in **Report view**, expand the **Sales** table on the right. These are your building blocks.
4. **Visual A — KPI card:** click empty canvas → in Visualizations pane click the **Card** icon → drag **Quantity** into *Fields*. It shows **Sum of Quantity**. Every number dragged in gets an **aggregation** (Sum here) — click the dropdown arrow on the field in the well to change it.
5. **Visual B — Column chart:** empty canvas → **Clustered column chart** → X-axis: **CustomerID** → Y-axis: **Quantity**. Too crowded? Good — that's a lesson; we'll fix in the exercises.
6. **Visual C — Donut chart:** Legend: **Discount** → Values: **Quantity**. See how discount buckets share the volume.
7. **Format:** select a visual → paintbrush icon (**Format**) → *General → Title* on, type *"Units by Customer"*; *Visual → Data labels* on. Set page size: click empty canvas → Format → *Canvas settings → 16:9*.
8. **Save:** `Module01_FirstReport.pbix`. **A `.pbix` file = data + model + report, all in one.**

💡 **What just happened conceptually:** You loaded a table (step 1 of the workflow) and built **implicit measures** (Power BI auto-summing). In Module 4 you'll outlaw implicit measures and write explicit DAX — one of the biggest beginner-to-pro jumps.

---

## 💪 Exercises (do all 5)

1. Change Visual B to a **bar chart**, then sort it descending (⋯ menu on the visual → Sort axis).
2. Visual B problem: 30 customers don't fit. Use the **Filters pane** → CustomerID → *Top N* → show **Top 10** by Sum of Quantity.
3. Add a **second page** (bottom `+`), put a **line chart** there: X = OrderDate, Y = Sum of Quantity. Drill: use the date axis arrows to move Year → Quarter → Month.
4. Add **UnitPrice** to the donut's *Tooltips* well — hover and confirm it appears in the hover card.
5. In the Fields pane, right-click **Quantity** → *Rename* → `Units Sold`. Notice visuals update everywhere. (In Module 3 we rename properly in the model.)

---

## ❓ Quiz

1. Name the 5-step Power BI workflow in order.
2. Which license do you need to *build* reports in Power BI Desktop?
3. What's the difference between Report view and Table view?
4. True/False: a `.pbix` stores only the report layout, not the data.
5. What is an ***implicit measure*** and why will we replace it later?
6. Where do you set a filter that applies to *all pages* of a report?

### ✅ Answers
1. Get Data → Clean (Power Query) → Model → Visualize → Share.
2. None — it's completely free (you only need licenses for *sharing* in the Service).
3. Report view = the canvas where you design pages; Table view = spreadsheet-style peek at the loaded data for a selected table.
4. False — an Import-mode `.pbix` embeds a compressed copy of the data + model + report.
5. An auto-aggregation Power BI creates when you drag a numeric column in (e.g., Sum of Quantity). We replace it with **explicit measures** (DAX) for control, reusability, and correctness.
6. The *Filters on all pages* section of the Filters pane.

---

## ✅ Mastery checklist
- [ ] I can name the ecosystem pieces and the 5-step workflow
- [ ] I can load a CSV and build card, column, donut, and line visuals
- [ ] I can format titles/labels and save a `.pbix`
- [ ] I redid Lab 1 from a blank file without looking

**Next: `Module_02_Power_Query.md` — where raw data meets its maker.**
