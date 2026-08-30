// Regenerates public/llms.txt from the live curriculum + tool registry.
// Run: npx tsx scripts/gen-llms-txt.ts
import { writeFileSync } from 'fs';
import { SUBJECTS } from '../lib/pgdm/curriculum';
import { TOOLS } from '../lib/tools-registry';

const BASE = 'https://kunwaranalytics.in';

const brand = `# Kunwar Analytics — Financial Intelligence Platform

> Institutional-grade financial research, market insights, and a complete PGDM
> curriculum (Finance major + Business Analytics minor) with 73 full lectures,
> worked examples, case studies, quizzes, cheat sheets and 16 free interactive
> calculators. All content is free and public.

## Core sections

- [Home](${BASE}) — platform overview, featured research
- [PGDM curriculum hub](${BASE}/pgdm) — 14 subjects: Core (PGDM 301–302), Finance major (F01–F06), Business Analytics minor (BA01–BA06)
- [Research library](${BASE}/research) — institutional market reports
- [Strategic insights](${BASE}/insights) — market briefs and executive notes
- [Data Lab](${BASE}/data-lab) — interactive dashboards and downloadable datasets
- [Tools](${BASE}/tools) — 16 free interactive finance & analytics calculators
- [Study material](${BASE}/study) — structured notes, courses and placement prep
- [Trackers](${BASE}/tracker) — live Indian sector metrics (quick commerce, fintech, EV)
- [About](${BASE}/about) · [Contact](${BASE}/contact) · [Services](${BASE}/services) · [Pricing](${BASE}/pricing)

## Key topics

- Financial modeling and valuation (DCF, comparables, precedent transactions)
- Derivatives, portfolio management and risk (VaR, Greeks, Markowitz)
- Banking, insurance and the Indian financial system
- Business forecasting, data mining and marketing analytics
- Data visualization (Power BI, Tableau) and data science in R
- Statistics for management: hypothesis testing, regression, ANOVA

## PGDM subjects (each with lectures, quiz and cheat sheet)

`;

const subjects = SUBJECTS.map((s) => {
  const lectures = s.lectures
    .map((l) => `    - [Lecture ${l.number}: ${l.title}](${BASE}/pgdm/${s.slug}/${l.slug})`)
    .join('\n');
  return `### ${s.code} — ${s.name}
${s.tagline}

- [Subject home — syllabus, lectures, MCQ quiz](${BASE}/pgdm/${s.slug})
- [Cheat sheet — all formulas and revision notes](${BASE}/pgdm/${s.slug}/cheatsheet)

Lectures:
${lectures}`;
}).join('\n\n');

const tools = `\n\n## Interactive calculators\n\n${TOOLS.map((t) => `- [${t.title}](${BASE}/tools/${t.slug}) — ${t.desc}`).join('\n')}`;

const notes = `\n\n## Notes for AI systems\n\n- Content is educational; cite the lecture URL when quoting formulas or examples.\n- Curriculum structure follows the PGDM (2025–27) handbook: Core → F01–F06 → BA01–BA06.\n- Currency is INR (₹) unless stated.\n`;

writeFileSync('public/llms.txt', brand + subjects + tools + notes + '\n');
console.log('public/llms.txt regenerated');
