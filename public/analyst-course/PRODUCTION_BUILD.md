# SignalPath — Production Build Handoff

The current `index.html` is a functional local prototype with authored courses, practice labs, downloadable datasets, project workflows, case simulations, and browser-saved progress. It is intentionally free-first and can be previewed locally.

A reliable multi-user product requires a database, authentication, secure storage, and actual execution workers. This repository now includes `supabase/schema.sql`, which is the production data model and row-level-security baseline.

## What has already been implemented in the prototype

- Authored Level 0: Analytics Orientation, 10 chapters
- Authored Level 1: Spreadsheet Analyst, 12 chapters
- Authored Level 2: Statistics for Business Decisions, 14 chapters
- Authored Level 3: SQL Analyst, 15 chapters
- Spreadsheet, SQL, Python, and BI practice labs
- Downloadable synthetic datasets and starter workbook/notebook
- Portfolio handoffs and truthful project descriptions
- Five staged business/consulting cases with scoring feedback
- Timed SQL interview simulation
- Local progress persistence

## Production implementation sequence

### 1. Provision Supabase

1. Create a Supabase project.
2. Run `supabase/schema.sql` in SQL Editor.
3. Create a private `project-artifacts` Storage bucket and enforce owner-path access (`{user_id}/...`).
4. Enable email/password and/or Google GitHub OAuth.
5. Put public URL and anon key in environment variables, never directly in committed browser code.

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # server-side only
```

### 2. Migrate from static prototype to Next.js

```text
app/
  (app)/dashboard/page.tsx
  (app)/learn/[lessonId]/page.tsx
  (app)/labs/sql/page.tsx
  (app)/labs/python/page.tsx
  (app)/labs/spreadsheet/page.tsx
  (app)/labs/bi/page.tsx
  (app)/cases/page.tsx
  (app)/projects/[projectId]/page.tsx
  api/evaluate/route.ts
  api/labs/sql/route.ts
components/
lib/
  supabase/
  mastery.ts
  spaced-repetition.ts
  rubric.ts
content/
```

Do not put privileged Supabase keys or AI provider keys in browser code.

### 3. Replace structural checks with real execution

| Lab | Production execution choice | Required safety |
|---|---|---|
| SQL | DuckDB-WASM in browser for public exercises, isolated server worker for advanced tasks | read-only database, time/memory limits, no network/file system access |
| Python | JupyterLite/Pyodide browser sandbox or ephemeral isolated job | limits, package allowlist, no secrets, no outbound network |
| Spreadsheet | `.xlsx` parser and rule-based checker | scan uploads, validate expected sheets/ranges/formulas, never execute macros |
| BI | artifact URL/screenshot upload plus rubric review | validate links/files, no credential sharing |

### 4. Build the adaptive mastery engine

Use the schema score components rather than chapter clicks:

```text
mastery = 25% understanding + 30% practice + 30% project evidence + 15% interview
```

Only count evidence after a scored attempt. Schedule reviews using a simple SM-2-style interval:

- score >= 85: interval × 2.5
- score 70–84: interval × 1.7
- score < 70: due again in 1 day

Suggested lesson is the weakest high-impact prerequisite, not merely the next item in a linear list.

### 5. Complete remaining authored curriculum

The existing `curriculum.md` contains the full 15-level scope. Build Levels 4–14 with the same block format used in Levels 0–3:

```text
Outcome → why it matters → analogy → sections → worked example → attempted exercise → model response → interview prompt → project evidence
```

Prioritized release order:
1. Level 4 Python course chapters and executable notebook checks
2. Level 5 data-quality lab
3. Level 6 BI course chapters and dashboard reviews
4. Levels 7–9 business, finance, product analytics
5. Levels 10–12 advanced analytics, engineering, GenAI
6. Levels 13–14 production capstones, portfolio, interview system

### 6. Evaluation policy

Automated feedback must never invent project results. It should:
- cite learner-submitted evidence
- mark assumptions and missing artifacts
- distinguish query/code validity from business validity
- present a rubric, strengths, gaps, and a next action
- require human confirmation for high-stakes career claims

### 7. Definition of “Interview Ready”

Do not unlock this label on lesson completion. Require at minimum:
- 70+ mastery in spreadsheet, SQL, statistics, and business reasoning
- 5 validated projects across tools
- 2 end-to-end production projects
- one reviewed dashboard and one reviewed notebook/SQL project
- 70+ score in a technical screen and a business case
- complete, truthful portfolio artifacts

## Dataset quality standard

Every dataset must include source/license, business brief, grain statement, dictionary, relationship diagram, intended defects, expected skills, and no personal/sensitive real data.
