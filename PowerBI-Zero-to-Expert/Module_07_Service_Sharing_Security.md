# Module 07 — Power BI Service: Publish, Share, Refresh & Secure

> *A report on your laptop helps one person. Published and governed right, it runs a company. This module is the "other half" of Power BI that interviewers always probe.*

## 🎯 Objectives
Publish & workspace lifecycle · apps & audiences · scheduled refresh & gateways · sharing models & permissions · **Row-Level Security (static + dynamic)** · endorsements, lineage, usage metrics, teamwork in the Service.

---

## 📘 7.1 Mental model

Publish (Desktop → **Publish**) uploads the `.pbix` as two sibling artifacts in a **workspace**: the **semantic model** (data + relationships + measures + security) and the **report** (pages/visuals). Many reports can sit on one semantic model — *one version of the truth*. **Dashboards** (Service-only boards of pinned tiles from many reports) still exist; apps are the modern distribution vehicle.

**Licenses (2026):** Free = build & personal *My workspace* only · **Pro** ($14/user/mo; in M365 E5) = collaborate/share in workspaces · **Premium Per User** ($24) = advanced features (large models, deployment pipelines, AI) per user · **Fabric capacity (F-SKUs)** = org-level; viewers with Free licenses can consume content hosted on F64+. Old Premium *P* SKUs retired for new purchases (Jul 2024) → Fabric F SKUs.

## 📘 7.2 Workspaces & lifecycle

- **Workspace** = container/team area for a project/domain (`Sales Analytics - Dev`). Roles:
  | Role | Can |
  |---|---|
  | Admin | everything incl. delete workspace, manage access |
  | Member | publish, update app, share, manage content |
  | Contributor | publish/edit content, no app updates/access mgmt |
  | Viewer | read only (no build) |
- **Apps**: the polished package of selected content with **audiences** (groups of users see different tab sets). Update app = push changes without resharing links. Audiences + RLS = "right people, right pages, right rows".
- Pro basics: **Lineage view** (model ← reports ← dashboards, incl. gateway/dataflows upstream) and **impact analysis** before changing a shared model.

## 📘 7.3 Refresh & gateways

**Scheduled refresh** (semantic model settings): up to 8/day on Pro (48 on Premium/PPU). Needs *working credentials* for each source: semantic model → Settings → Data source credentials → OAuth2/Windows/Basic + **privacy level** (Private/Org/Public — privacy levels stop data bleeding between sources; mismatches = the dreaded `Formula.Firewall` error).

| Source lives in… | Refresh needs |
|---|---|
| Cloud (SharePoint/OneDrive, Azure SQL, web) | Just stored credentials — no gateway |
| **OneDrive/SharePoint-hosted PBIX/XLSX** | Auto near-hourly sync — the simplest "always fresh" pattern for files |
| **On-prem** (local SQL Server, files on a company drive) | **Gateway**: *Standard mode* (shared, enterprise — centrally managed) vs *Personal mode* (only you, easy). Gateway = Windows service on an always-on machine reaching the source; cloud never gets the password raw |

Also know: **cloud connections** (shareable, managed in Service), mashup errors 101 (wrong privacy level, stale password), and **incremental refresh** (Module 08). **Subscriptions** email snapshots of report pages; **alerts** fire on dashboard KPI tiles crossing thresholds (dashboard tiles only).

## 📘 7.4 Sharing — choose the right door

| Method | For | Watch-outs |
|---|---|---|
| **Share link / grant access** | quick 1:1 | Can grant *Reshare* + **Build** on the model — manage or chaos ensues |
| Workspace Viewer role | small working team | They see everything in the workspace |
| **App** (per audience) | broad/business distribution ✅ | The professional default |
| Embed in Teams/SharePoint | meet people where they are | Pro still required (unless capacity) |
| Publish to web | **public internet only** | Never for internal/confidential data |
| Export: PDF/PPT/Excel, **Analyze in Excel**, API | downstream consumption | Set tenant/export permissions carefully |

**Build permission:** lets others create *new reports* on your model (or analyze in Excel). This is the backbone of governed self-service: certified central models + makers building on top.

## 📘 7.5 Row-Level Security (RLS) — the exam favorite & the enterprise must

**Static RLS (small scale):** Modeling → Manage roles → `West Role`: `Customers[Region] = "West"` → filter flows: Region→Customers→Sales. **Test in Desktop:** View as role. **Assign people:** Service → semantic model → Security → add users/groups to the role ( Viewers only; Admins see all).

**Dynamic RLS (the real world — one role, any user):** security table mapping users to what they may see; DAX on the *security table* filters by the signed-in user:

1. Enter Data → `RegionAccess` table: `Email` | `Region` (e.g., `amit@shopkart.in` | North). NO relationship is even needed (cleanest): role DAX on **RegionAccess**:
   ```dax
   [Email] = USERPRINCIPALNAME()
   ```
   and relate `RegionAccess[Region] → Customers[Region] (*:* is honest here; or filter via TREATAS variant) with security filters flowing RegionAccess→Customers (trim the *:* by giving Customers→RegionAccess direction both? — standard pattern: relationship RegionAccess(Region) *→* Customers(Region) with "apply security filter in both directions" OFF and single direction into Customers; the`*:*` on a 4-value region column is fine).
2. `USERPRINCIPALNAME()` = the login email (in Desktop, "View as → Other user" to simulate). `USERNAME()` = DOMAIN\user on-prem.
3. Test matrix: row per manager → only their region's sales; card totals change accordingly. **RLS + App audiences** = enterprise gold.
**OLS (Object-Level Security)** hides whole tables/measures (via Tabular Editor/XMLA) — RLS hides rows; OLS hides schema. Static vs dynamic + test-as-role are PL-300 certainties.

## 📘 7.6 Trust, scale & teamwork features
**Endorsements:** Promoted (team-validated) / **Certified** (org-blessed — needs tenant permissions). **Sensitivity labels** (Microsoft Purview) travel with exports to Excel/PPT. **Usage metrics report** per workspace: who views what — use it to kill zombie reports. **Deployment pipelines** (Module 08) manage dev→test→prod. **Notifications**: data-driven alerts, subscriptions, refresh-failure emails (check yours weekly as admin).

---

## 🧪 LAB 7 — Ship ShopKart to the world (90 min)
1. File → *Options* check nothing pending; **Publish** → create workspace `ShopKart Analytics - Dev` → select it.
2. In the Service: explore workspace; open report; pin 2 KPIs to a new **dashboard** `Exec Pulse`.
3. Set an **alert** on the Total Sales card tile (> ₹500,000) — watch the bell.
4. **Refresh:** Settings → Semantic model → credentials for the CSV sources (if local files: use gateway personal mode, or move files to OneDrive and repoint the source — *recommended*: repoint to OneDrive → auto sync). Schedule 2×/day refresh.
5. **Static RLS:** create `Region West` role; View as role; publish; in Service assign a colleague/test identity (or write the expected effect in journal if solo).
6. **Dynamic RLS:** build `RegionAccess` (Enter Data): two fake managers covering all 4 regions, plus *your* email on North. Role `DynamicManagers` with `[Email] = USERPRINCIPALNAME()`. Test as `[DynamicManagers, Other user = your own email]` → only North shows everywhere. Publish + verify in Service's *Test as role*.
7. **App:** Update app → include Report + Dashboard → audiences: "Leadership" (every page) & "Region Managers" (hide the margins page? create it first!) → set permissions → get the app link. Screenshot the app — **portfolio asset #3**.
8. Set **Promoted** endorsement on the semantic model; open **lineage view**; run **usage metrics**; subscribe yourself to a daily 8 AM email of page 1.

## 💪 Exercises
1. Explain to your journal why *apps* beat *links*: lifecycle, permissions, discoverability.
2. Design workspace strategy for a 3-region company: one workspace per region vs one with audiences+RLS — argue both, pick one.
3. Break refresh on purpose (bad path), read the full error email, fix it — note the 3 most common failure causes.
4. RLS puzzle: a manager owns two regions + should see own team only. Adjust RegionAccess/role DAX (multi-row per email — does anything need to change? why not?).
5. Research task: find in the tenant settings where "Publish to web" is disabled and why; and where Build permission is granted at model level.
6. Alerts vs subscriptions: one-line difference + one use case each.

## ❓ Quiz
1. Artifacts created on publish and why the split matters. 2. Standard vs personal gateway. 3. The DAX function powering dynamic RLS and how to test without a second human. 4. Who can be assigned to an RLS role in Service? 5. Certified vs Promoted. 6. What's a `Formula.Firewall` error about? 7. Why "one semantic model, many reports"?

### ✅ Answers
1. Semantic model + report; the split enables reuse (many reports/Excel on one governed model), separate security & refresh.
2. Standard = shared enterprise gateway, centrally managed, multiple sources/users; Personal = your machine, your account, quick and dirty (machine must be on at refresh time).
3. `USERPRINCIPALNAME()`; test with *View as roles → Other user* in Desktop and *Test as role* in Service.
4. Users/groups with Viewer access to the workspace (members/admins bypass RLS).
5. Promoted = endorsed by the owning team; Certified = governance-approved org-wide (controlled via tenant settings).
6. Privacy-level/data-source-combination blocking in the mashup engine — fix levels per source (typically Organizational for internal sources).
7. Single source of truth: measures fixed once, RLS uniform, one refresh, consistent numbers org-wide.

## ✅ Mastery checklist
- [ ] ShopKart live as an app with RLS + scheduled refresh (or OneDrive sync)
- [ ] I can diagram gateway architecture from memory
- [ ] Dynamic RLS built + tested with `View as`
- [ ] Portfolio asset #3 captured

**Next: `Module_08_Performance_Enterprise.md` — make it fast, big, and professional.**
