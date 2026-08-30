import type { Subject } from '../types';

/* ═══════════════════════════════════════════════════════════════
   PGDM 301 — PROJECT MANAGEMENT · Core · Semester III
   ═══════════════════════════════════════════════════════════════ */

const lifecycleSvg = `
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
  <defs><marker id="parr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
    <path d="M0,0 L8,3 L0,6 Z" fill="#5eead4"/></marker></defs>
  <line x1="30" y1="150" x2="730" y2="150" stroke="#334155" stroke-width="2" marker-end="url(#parr)"/>
  <text x="700" y="140" fill="#64748b" font-size="11">effort →</text>

  <path d="M 60 150 C 140 30, 300 30, 380 80 C 440 118, 520 148, 660 150"
        fill="none" stroke="#2dd4bf" stroke-width="3"/>

  <circle cx="60" cy="150" r="7" fill="#0f172a" stroke="#2dd4bf" stroke-width="2"/>
  <text x="60" y="178" fill="#5eead4" font-size="11" font-weight="700" text-anchor="middle">Concept</text>
  <text x="60" y="193" fill="#64748b" font-size="9.5" text-anchor="middle">idea · screening</text>

  <circle cx="220" cy="62" r="7" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
  <text x="220" y="42" fill="#fbbf24" font-size="11" font-weight="700" text-anchor="middle">Definition</text>
  <text x="220" y="27" fill="#64748b" font-size="9.5" text-anchor="middle">DPR · appraisal · sanction</text>

  <circle cx="400" cy="92" r="7" fill="#0f172a" stroke="#a78bfa" stroke-width="2"/>
  <text x="400" y="72" fill="#a5b4fc" font-size="11" font-weight="700" text-anchor="middle">Execution</text>
  <text x="400" y="57" fill="#64748b" font-size="9.5" text-anchor="middle">organise · implement · control</text>

  <circle cx="600" cy="141" r="7" fill="#0f172a" stroke="#34d399" stroke-width="2"/>
  <text x="600" y="121" fill="#34d399" font-size="11" font-weight="700" text-anchor="middle">Termination</text>
  <text x="600" y="106" fill="#64748b" font-size="9.5" text-anchor="middle">commission · audit · review</text>

  <text x="380" y="230" fill="#64748b" font-size="11" text-anchor="middle">Cost of change is lowest at Concept and steepest at Execution —</text>
  <text x="380" y="247" fill="#64748b" font-size="11" text-anchor="middle">which is why screening (Unit 1) and the DPR (Unit 3) decide more than any site decision</text>
</svg>`;

const pertSvg = `
<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
  <defs><marker id="earr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
    <path d="M0,0 L8,3 L0,6 Z" fill="#94a3b8"/></marker>
    <marker id="earrT" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 Z" fill="#2dd4bf"/></marker></defs>

  <circle cx="80" cy="160" r="16" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/><text x="80" y="165" fill="#5eead4" font-size="12" font-weight="700" text-anchor="middle">1</text>
  <circle cx="250" cy="80" r="16" fill="#0f172a" stroke="#334155" stroke-width="2"/><text x="250" y="85" fill="#94a3b8" font-size="12" text-anchor="middle">2</text>
  <circle cx="250" cy="240" r="16" fill="#0f172a" stroke="#334155" stroke-width="2"/><text x="250" y="245" fill="#94a3b8" font-size="12" text-anchor="middle">3</text>
  <circle cx="440" cy="80" r="16" fill="#0f172a" stroke="#334155" stroke-width="2"/><text x="440" y="85" fill="#94a3b8" font-size="12" text-anchor="middle">4</text>
  <circle cx="440" cy="240" r="16" fill="#0f172a" stroke="#334155" stroke-width="2"/><text x="440" y="245" fill="#94a3b8" font-size="12" text-anchor="middle">5</text>
  <circle cx="640" cy="160" r="16" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/><text x="640" y="165" fill="#5eead4" font-size="12" font-weight="700" text-anchor="middle">6</text>

  <line x1="96" y1="150" x2="233" y2="88" stroke="#2dd4bf" stroke-width="3" marker-end="url(#earrT)"/>
  <text x="150" y="95" fill="#5eead4" font-size="11" font-weight="700">A · 4</text>

  <line x1="96" y1="172" x2="233" y2="232" stroke="#94a3b8" stroke-width="1.6" marker-end="url(#earr)"/>
  <text x="150" y="230" fill="#94a3b8" font-size="11">B · 5</text>

  <line x1="266" y1="80" x2="423" y2="80" stroke="#2dd4bf" stroke-width="3" marker-end="url(#earrT)"/>
  <text x="345" y="70" fill="#5eead4" font-size="11" font-weight="700">C · 6</text>

  <line x1="266" y1="240" x2="423" y2="240" stroke="#94a3b8" stroke-width="1.6" marker-end="url(#earr)"/>
  <text x="345" y="230" fill="#94a3b8" font-size="11">D · 3</text>

  <line x1="266" y1="68" x2="423" y2="228" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="5 4" marker-end="url(#earr)"/>
  <text x="330" y="160" fill="#64748b" font-size="10">E · 2 (dummy)</text>

  <line x1="456" y1="80" x2="623" y2="150" stroke="#2dd4bf" stroke-width="3" marker-end="url(#earrT)"/>
  <text x="530" y="95" fill="#5eead4" font-size="11" font-weight="700">F · 7</text>

  <line x1="456" y1="240" x2="623" y2="170" stroke="#94a3b8" stroke-width="1.6" marker-end="url(#earr)"/>
  <text x="530" y="230" fill="#94a3b8" font-size="11">G · 4</text>

  <rect x="30" y="278" width="700" height="30" rx="8" fill="#134e4a"/>
  <text x="380" y="298" fill="#5eead4" font-size="12" font-weight="600" text-anchor="middle">
    Critical path (teal): 1 →A→ 2 →C→ 4 →F→ 6 = 4 + 6 + 7 = 17 days — zero slack, decides the project
  </text>
</svg>`;

export const projectManagement: Subject = {
  slug: 'project-management',
  code: 'PGDM 301',
  name: 'Project Management',
  track: 'CORE',
  credits: 3,
  hours: 30,
  semester: 3,
  tagline: 'From the first idea to the final audit — one disciplined pipeline.',
  description:
    'The complete project discipline: identification and screening, organisation forms and financing, financial estimates and the detailed project report, social cost benefit analysis, and scheduling/control with PERT, CPM and spanning trees through post-implementation audit.',
  outcomes: [
    'Determine the scope and structure of project management',
    'Analyse different methods of project selection and their financing',
    'Appraise a project based on financial estimates and projections',
    'Rate projects on the basis of Social Cost Benefit Analysis',
    'Evaluate network control techniques for scheduling and resource management',
  ],
  units: [
    'Unit 1 — Introduction: definition, characteristics, importance, types; steps in project identification; project life cycle; experience curve; scouting for ideas; preliminary screening; project rating index',
    'Unit 2 — Project Organisation & Financing: cross-functional, dedicated, influence & matrix organisations — advantages/disadvantages; WBS; integration with responsibility matrix; financing — venture capital, private equity, new ventures & mergers',
    'Unit 3 — Financial Estimates & Projections: cost estimation & working capital; sources and composition of funds; projected balance sheet, income statement, funds & cash flow statements; detailed project report',
    'Unit 4 — Social Cost Benefit Analysis: meaning, rationale, approaches — UNIDO and Little–Mirrlees; public sector investment decisions in India',
    'Unit 5 — Implementation & Control: scheduling; PERT, CPM, decision & spanning trees; cost budgeting; implementation problems; project manager\'s role; monitoring and post-implementation audit',
  ],
  books: [
    { title: 'Projects: Planning, Analysis, Selection, Implementation & Review', author: 'Prasanna Chandra — Tata McGraw Hill' },
    { title: 'Project Management Essentials You Always Wanted to Know', author: 'Kalpesh Ashar — Vibrant' },
    { title: 'Project Management & Control', author: 'S. Choudhary — McGraw Hill' },
  ],
  lectures: [
    /* ─────────── LECTURE 1 (Unit 1 · FULL) ─────────── */
    {
      slug: 'project-identification-screening',
      number: 1,
      title: 'Project Identification, Life Cycle & the Rating Index',
      minutes: 45,
      summary:
        'What makes a project a project, the life cycle that governs every decision, where ideas come from (scouting), and the numbered discipline of preliminary screening — including the project rating index with full worked maths.',
      status: 'live',
      objectives: [
        'Define a project and distinguish it from routine operations using its characteristics',
        'Map the project life cycle and locate where decisions cost the least',
        'Generate and scout project ideas systematically',
        'Apply preliminary screening and compute a project rating index',
      ],
      sections: [
        {
          heading: '1. What is a project — and why the definition matters',
          body: [
            'A project is a scientifically evolved work plan to achieve a specific objective within a defined time, budget and quality frame. The exam-worthy characteristics: it has a **beginning and an end** (temporary), a **defined scope**, a **life cycle** with rising then falling effort, it is **unique** (not repeated output like operations), it consumes **resources under constraints**, and it involves **risk and uncertainty** that must be managed, not wished away.',
            'Importance: strategy execution happens through projects. A corporate plan without a pipeline of appraised projects is a wish list. Types you should be able to name and exemplify — greenfield (new capacity), modernisation/replacement, diversification (related/unrelated), expansion, backward/forward integration, R&D projects, and social/public projects. Each type answers a different strategic question and carries a different risk weight.',
          ],
          callout: {
            type: 'exam',
            text: 'One-mark trap: "Every work is a project." False — routine, repetitive operations (monthly payroll) are NOT projects: no uniqueness, no defined end. But "annual audit overhaul of payroll process" IS one. Look for uniqueness + temporariness + constraints.',
          },
        },
        {
          heading: '2. The project life cycle — where decisions are cheap',
          body: [
            'Every project moves through conceptualisation (idea → preliminary screening), definition (feasibility, DPR, sanction, commitment of funds), execution (organisation, implementation, monitoring — the longest and most expensive phase), and termination (commissioning, handover, post-implementation audit). Effort follows an S-curve: slow start, steep middle, tapering end.',
            'The management insight: the **cost of change explodes** as you move right. Moving a factory site at concept stage costs a meeting; at execution it costs crores and a schedule slip. That asymmetry is why Units 1 and 3 (screening and the DPR) matter more than any heroic firefighting later — and why experienced managers spend disproportionate time at the left of the curve.',
          ],
        },
        {
          heading: '3. Scouting for ideas — sources with a Indian bias',
          body: [
            'Project ideas do not arrive; they are scouted. Internal sources: company R&D, spare-capacity studies, performance gaps in existing lines, employee suggestions. External sources: government policy signals (PLI schemes, import bans, infrastructure corridors), industry associations and CII/FICCI studies, project consultants, market and trade fairs, licencing agents, foreign collaborations, and — critically for finance students — the **capital-market window**: what business models are getting funded, and at what multiples.',
            'The idea funnel then narrows: a longlist of ideas → consistency check with the promoter\'s strategy and resources → preliminary screening on quick, cheap criteria → shortlist for full feasibility (Unit 3\'s DPR). Most ideas should die early and cheaply.',
          ],
          bullets: [
            'Filter 1 — Strategy fit: does it belong in this company at all?',
            'Filter 2 — Resource fit: capital, skills, management bandwidth available?',
            'Filter 3 — Preliminary screening: market exists? technology proven? risk survivable? returns plausible?',
            'Survivors → full feasibility study → DPR → sanction (Unit 3)',
          ],
        },
        {
          heading: '4. Preliminary screening & the project rating index',
          body: [
            'When several shortlisted ideas compete for the same scarce capital, a project rating index (PRI) forces discipline: list the criteria that matter, weight them by importance (weights summing to 1), rate each project 1–10 on every criterion, multiply and sum. The output is a comparable score — not a decision by itself, but a structured debate starter.',
            'Typical criteria and weights: market potential 0.25, competitive position 0.15, technical feasibility 0.15, financial return (approximate IRR band) 0.20, risk 0.10, environmental/social acceptability 0.10, managerial fit 0.05. Weights are judgemental — which is exactly why they should be argued in writing before the ratings, not quietly tuned afterwards to favour a pet project.',
          ],
          callout: {
            type: 'note',
            text: 'The experience curve (Unit 1 syllabus): unit costs fall by a predictable % (often 15–30%) each time cumulative production doubles. Use it to test whether your cost projections are plausible — if your model shows costs falling faster than the curve without a reason (scale? learning? technology?), you have found a soft assumption.',
          },
        },
      ],
      diagram: {
        title: 'The project life cycle and the cost of change',
        caption:
          'Concept → Definition → Execution → Termination. Decisions at the left are cheap; the same decisions at the right cost crores.',
        svg: lifecycleSvg,
      },
      formulas: [
        { name: 'Project rating index', expr: 'PRI = Σ (weightᵢ × ratingᵢ)', meaning: 'Weighted multi-criteria screening score' },
        { name: 'Experience curve', expr: 'Cₙ = C₁ × n^(−log₂(1−k))', meaning: 'Cost falls by fraction k per doubling of cumulative volume' },
        { name: 'Learning check', expr: 'k implied = 1 − (C₂/C₁)^(1/doublings)', meaning: 'Back out the learning rate your forecast assumes' },
      ],
      examples: [
        {
          title: 'Project rating index — pick between two ideas',
          given: [
            'Criteria & weights: Market 0.25 · Return 0.20 · Technical 0.15 · Competitive 0.15 · Risk 0.10 · Social 0.10 · Managerial 0.05',
            'Cold-chain warehouse ratings (1–10): 8, 7, 9, 6, 5, 8, 7',
            'Co-working studios ratings: 6, 8, 8, 4, 4, 7, 5',
          ],
          steps: [
            { text: 'PRI — cold-chain warehouse', calc: '0.25×8 + 0.20×7 + 0.15×9 + 0.15×6 + 0.10×5 + 0.10×8 + 0.05×7 = 2.00 + 1.40 + 1.35 + 0.90 + 0.50 + 0.80 + 0.35 = 7.30' },
            { text: 'PRI — co-working studios', calc: '0.25×6 + 0.20×8 + 0.15×8 + 0.15×4 + 0.10×4 + 0.10×7 + 0.05×5 = 1.50 + 1.60 + 1.20 + 0.60 + 0.40 + 0.70 + 0.25 = 6.25' },
            { text: 'Compare and stress', calc: 'Cold-chain wins 7.30 vs 6.25. Sensitivity: co-working only wins if Return weight rises above ~0.35 — an indefensible re-weighting.' },
          ],
          answer:
            'Cold-chain warehouse proceeds to feasibility. The index did not decide — it showed WHERE the decision lives (return vs risk trade-off) and forced the debate into numbers.',
        },
        {
          title: 'Experience curve sanity check',
          given: ['Cumulative output doubling twice; costs must fall from ₹100 to ₹72.25', 'What learning rate does this imply?'],
          steps: [
            { text: 'Two doublings', calc: 'C₂/C₁ = 72.25/100 = 0.7225 = 0.85² — cost falls 15% per doubling' },
            { text: 'Check plausibility', calc: 'A 15% learning rate is standard for assembled products; 25%+ needs process redesign evidence' },
          ],
          answer: 'The forecast implies a 15% experience-curve rate — defensible. If your DPR had shown ₹60 by the same volume, it would imply a 22.5% rate: demand the justification.',
        },
      ],
      caseStudy: {
        title: 'Case — The screening that saved ₹40 crore',
        body: [
          'A mid-size auto-component maker with ₹120 cr revenue wants to enter "EV opportunities". The promoter\'s shortlist: (1) lithium-ion cell manufacturing, (2) precision machining of motor shafts, (3) EV two-wheeler charging network. The team rates all three on a PRI. Cell manufacturing scores highest on market potential (0.25 weight saves it) but bottoms on technical feasibility — the know-how is licensed by three global players, none of whom will license to a ₹120 cr company, and the viable scale needs ₹800 cr capex. The charging network scores well socially but the unit economics need 6 years of densification.',
          'Precision machining wins the index (7.6): existing customer relationships transfer, machines are financeable, capex ₹40 cr, and it rides EV growth without betting on chemistry. Cells are parked with a one-line reason in the minutes: "revisit at ₹500 cr revenue or a strategic partner."',
          'Eighteen months later a competitor entered cells at ₹1,100 cr and struggled 3 years to reach 60% utilisation. The promoter frames the PRI memo in his office.',
        ],
        questions: [
          'Which criteria weights did the promoter\'s team implicitly trust most — and was that defensible?',
          'Where does the PRI deliberately NOT capture information? (Hint: strategic options, learning value.)',
          'Re-rate the three ideas if the company had ₹1,000 cr and a licensing agreement in hand.',
        ],
        takeaways: [
          'Screening is capital protection: the best project decision is usually the one you did not fund',
          'A written PRI with fixed weights prevents post-hoc re-weighting to bless the boss\'s favourite',
          'Score high on paper ≠ fundable in reality — technical feasibility gates everything',
        ],
      },
      revision: [
        'Project = unique + temporary + constrained (scope, time, cost) + risky',
        'Life cycle: concept → definition (DPR, sanction) → execution → termination (commission + audit)',
        'Cost of change rises steeply rightward — spend analytic effort early',
        'Idea sources: R&D, policy signals (PLI), consultants, market gaps, funding windows',
        'Screening filters: strategy fit → resource fit → quick market/tech/return/risk tests',
        'PRI = Σ weight × rating; fix weights BEFORE rating',
        'Experience curve: cost falls 15–30% per doubling of cumulative output',
      ],
      practice: [
        {
          q: 'Weights 0.3 market, 0.3 return, 0.2 technical, 0.2 risk. Project X rates 7, 5, 9, 4. Compute PRI.',
          a: '0.3×7 + 0.3×5 + 0.2×9 + 0.2×4 = 2.1 + 1.5 + 1.8 + 0.8 = 6.2.',
        },
        {
          q: '"Annual maintenance of the same machines is a project." Comment.',
          a: 'No — repetitive, no defined end, no uniqueness: it is operations. Repainting the plant after 10 years, or overhauling the maintenance process itself, would qualify.',
        },
        {
          q: 'Costs fell from ₹200 to ₹140 as cumulative output doubled once. Learning rate?',
          a: '140/200 = 0.70 → a 30% learning rate — very aggressive; demand engineering evidence or scale-anchored reasoning before accepting it in projections.',
        },
        {
          q: 'Why does preliminary screening use cheap, approximate criteria instead of full feasibility numbers?',
          a: 'Because screening\'s job is to kill weak ideas cheaply and fast, conserving expensive analytic effort for survivors. Full feasibility (DPR-grade) work on all ideas would cost more than the information is worth.',
        },
        { q: 'A proposal clears every financial hurdle but needs a court case settled to own the land. Screen it in or out?', a: 'Out for now - feasibility screening covers technical, legal and market gates, not just NPV. A project with an unpriced legal blocker is a discount waiting to be discovered; return when certainty is bought.' },
        { q: 'Why do most project ideas die at identification, not approval?', a: 'Screening is cheap and ruthless by design: dozens of ideas meet two or three knockout criteria (no feedstock, no market, no clearance) before one earns an expensive feasibility study. Kill early, spend late.' },
      ],
      tools: [
        { label: 'NPV/IRR tools on the Tools page', href: '/tools' },
      ],
    },

    /* ─────────── LECTURE 2-4 (Units 2-4 · outlines) ─────────── */
    {
      slug: 'project-organisation-financing',
      number: 2,
      title: 'Project Organisation, WBS & Financing (VC/PE)',
      minutes: 40,
      summary:
        'The four organisation forms and when each wins, the work breakdown structure integrated with a responsibility matrix, and the financing stack from venture capital and private equity to new-venture and merger funding.',
      status: 'live',
      objectives: [
        'Choose among functional, dedicated, influence and matrix organisations by project profile',
        'Decompose a project into a WBS and bind every work package to an owner',
        'Distinguish VC from PE by stage, instrument and return expectation',
        'Read a term sheet\'s three clauses that actually matter',
      ],
      sections: [
        {
          heading: '1. Four ways to organise a project',
          body: [
            '**Functional organisation**: the project lives inside a department (production builds the new line). Deep expertise, clear careers, efficient use of specialists — but the project has no full-time owner, decisions queue behind departmental priorities, and cross-department coordination rots. Suits small, technical, single-department projects.',
            '**Dedicated (pure project) organisation**: a self-contained team reports to a project manager with real authority. Speed, focus, single-minded commitment — at the cost of duplicated resources, expertise fragmentation, and "projectitis" — the team dreads the day after completion. Suits large, long, strategically critical projects. **Influence organisation**: a coordinator with no formal authority facilitates across departments — cheap, keeps specialists home, works only when interests align.',
            '**Matrix organisation** is the hybrid the syllabus emphasises: people report to BOTH a functional manager (permanent home: skills, appraisal, career) and a project manager (current work). Weak matrix tilts power to the department; balanced shares it; strong tilts to the PM.',
          ],
          bullets: [
            'Matrix advantage: efficient specialist sharing across projects + project focus retained',
            'Matrix pain: **two-boss problem** — conflicting priorities, dotted-line appraisal disputes, stress on the individual',
            'Make it work: written priority rules, a single project charter, conflict-escalation path agreed in advance',
          ],
          callout: {
            type: 'exam',
            text: 'Classic one-liner: "Matrix violates unity of command." True — and deliberate: the matrix trades unity of command for efficient resource use. Examiners want the trade-off stated, not just the defect.',
          },
        },
        {
          heading: '2. WBS and the responsibility matrix',
          body: [
            'The Work Breakdown Structure decomposes the project into deliverables → sub-deliverables → **work packages** (the smallest unit assigned, budgeted and tracked). Rules: the 100% rule (the WBS contains ALL the work and nothing else), each package has ONE owner, and decompose until duration/cost can be estimated reliably — the 8/80 guide: no package smaller than a day or larger than two weeks at operating level.',
            'The WBS integrates with organisation through the **responsibility matrix** (RACI): for every work package, who is Responsible (does it), Accountable (owns the outcome — exactly one person), Consulted, Informed. WBS answers "what"; RACI answers "who"; together they kill the two classic failure modes — orphaned packages and double-owned packages.',
          ],
          callout: {
            type: 'excel',
            text: 'Practical pattern: WBS in column A (indented), RACI roles across row 1, initials in the grid, conditional formatting flagging any row with zero R or two A. Five minutes of formatting prevents the stand-up argument.',
          },
        },
        {
          heading: '3. Financing the project — the stack',
          body: [
            'Established projects (Unit 3 detail): promoter equity + rupee term loans in a debt:equity band near 2:1 (banks read higher leverage as thin promoter commitment), plus working-capital limits. New ventures cannot carry debt — no cash flows to service it — so the **venture capital** stack takes over: seed (angels, ₹50 lakh–5 cr), early VC (Series A/B), growth rounds, each stage pricing up as risk falls.',
            'VC vs PE (the distinction the syllabus wants): VC funds **early, unproven** companies — high failure risk, minority stakes, convertible preferred (CCPS in India), heavy mentoring, returns from a few outliers. PE funds **mature** companies — often control or large minority, leveraged structures (LBO), returns from operational improvement and deleveraging. Financing **mergers** extends the menu: cash, stock swap, or debt-funded acquisition — each signalling differently (cash = confidence; stock = sharing risk, and possibly overvaluation).',
          ],
          bullets: [
            'CCPS = compulsorily convertible preference shares: downside protection + upside conversion — the Indian VC standard',
            'Liquidation preference: who gets paid first at exit — 1× non-participating is "normal"; 2× participating is expensive money',
            'Anti-dilution, board seats, drag-along/tag-along: the clause trio that decides control at exit',
          ],
        },
      ],
      formulas: [
        { name: 'Post-money valuation', expr: 'Post-money = Pre-money + Investment', meaning: 'Ownership = Investment ÷ Post-money' },
        { name: 'Stake after round', expr: 'New% = Investment / Post-money', meaning: 'Dilution arithmetic every founder must run' },
        { name: 'Debt service coverage', expr: 'DSCR = (PAT + Dep + Int)/(Int + Principal)', meaning: 'Bank\'s project-loan comfort ≥ 1.5 avg' },
      ],
      examples: [
        {
          title: 'Dilution arithmetic across two rounds',
          given: ['Founder 100% · Series A: ₹4 cr at ₹16 cr pre-money · Series B: ₹20 cr at ₹60 cr pre-money'],
          steps: [
            { text: 'Series A post-money', calc: '16 + 4 = ₹20 cr → VC-A gets 4/20 = 20%, founder 80%' },
            { text: 'Series B post-money', calc: '60 + 20 = ₹80 cr → VC-B 20/80 = 25%; founder 80% × 75% = 60%' },
            { text: 'Value check', calc: 'Founder\'s 60% of ₹80 cr = ₹48 cr paper value — vs 100% of an under-funded idea' },
          ],
          answer:
            'After two rounds: founder 60%, VC-A 15%, VC-B 25%. Dilution is the price of survival.',
        },
        {
          title: 'Pick the organisation form',
          given: [
            '(i) 3-month ERP module upgrade, IT dept leads',
            '(ii) Greenfield plant, ₹400 cr, 30 months',
            '(iii) Cost-reduction drive across 5 departments, no full-time team',
          ],
          steps: [
            { text: 'Match to forms', calc: '(i) Functional — single department, short, technical. (ii) Dedicated — large, long, critical. (iii) Influence — cross-departmental, no task-force budget' },
            { text: 'Stress the boundary', calc: 'If (iii) grows into a funded transformation programme → move to balanced matrix with a coordinator of standing' },
          ],
          answer: 'Form follows size × novelty × duration × criticality — not fashion.',
        },
      ],
      caseStudy: {
        title: 'Case — The matrix that ate two projects',
        body: [
          'A machinery maker runs two strategic projects through a balanced matrix: an export-order crash job and a next-gen product. Six key engineers are shared. Both PMs escalate weekly; the export job (louder customer) wins every resource argument; the next-gen product slips 40% while its PM burns out playing internal politician. Two resignations follow — the exact human cost the two-boss problem predicts.',
          'The board\'s fix: a written priority rule ("export orders pre-empt up to 30% of shared hours; beyond that, MD arbitrates within 48 hours"), a shared-resource calendar both PMs must book against, and a dedicated core of three for the next-gen product with matrix support for the rest.',
        ],
        questions: [
          'Which matrix failure mode did the shared engineers embody — and which formal tool was missing?',
          'Draft the two-line priority rule you would have instituted BEFORE the projects started.',
          'When should the company have chosen dedicated over matrix for the next-gen product?',
        ],
        takeaways: [
          'Matrix without pre-agreed priority rules is organisational Russian roulette',
          'The resource calendar is the matrix\'s load-bearing wall — make bookings visible',
          'Re-visit form as projects grow: matrix today, dedicated tomorrow',
        ],
      },
      revision: [
        'Functional = expertise, slow · Dedicated = speed, costly · Influence = cheap, weak · Matrix = efficient + two-boss stress',
        'Matrix trades unity of command for resource efficiency — state the trade-off',
        'WBS: deliverable → work package; 100% rule; one owner; 8/80 guide',
        'RACI: one A per row; R does; C before; I after',
        'VC: early, minority, CCPS, outlier returns · PE: mature, control/LBO, improvement returns',
        'Post-money = pre-money + investment; stake = investment/post-money',
        'Cash deal signals confidence; stock deal shares (and signals) risk',
      ],
      practice: [
        {
          q: 'A project needs 40% of a shared designer\'s time; her boss wants her elsewhere. Both claim her. Fastest resolution in a functioning matrix?',
          a: 'The pre-agreed priority rule + booked resource calendar. Absent those, escalation up the chain — the exact failure those rules prevent.',
        },
        {
          q: 'Investor wants 25% for ₹5 cr. Post-money and pre-money?',
          a: 'Post = 5/0.25 = ₹20 cr → pre-money = ₹15 cr.',
        },
        {
          q: 'Why do new ventures not use term loans in their first years?',
          a: 'Debt services interest from cash flows; ventures have none. VC equity absorbs the uncertainty and shares the upside — instrument matched to cash-flow risk (Unit 3 link).',
        },
        { q: 'Why does a special purpose vehicle (SPV) make lenders comfortable in project finance?', a: 'The SPV ring-fences cash flows: no legacy debt, no dividend leakage before debt service, assets and contracts held in one clean box - lenders recover from the project, not the sponsor\'s other troubles.' },
        { q: 'Match: toll road, power plant, IT roll-out - which financing structure and why?', a: 'Toll road: project finance SPV on traffic cash flows. Power plant: project finance plus long-term PPA backing the offtake. IT roll-out: corporate budget and internal funds - banks do not lend on software that walks out the door.' },
      ],
      tools: [
        { label: 'Time-Value Machine', href: '/tools/time-value-machine' },
      ],
    },
    {
      slug: 'financial-estimates-dpr',
      number: 3,
      title: 'Financial Estimates, Projections & the Detailed Project Report',
      minutes: 50,
      summary:
        'Building the project cost estimate and working-capital requirement, designing the means of finance, and constructing the DPR\'s projected income statement, balance sheet, funds and cash-flow statements — with the DSCR and break-even tests lenders actually run.',
      status: 'live',
      objectives: [
        'Build a project cost estimate: land, building, plant, contingencies, margin for working capital',
        'Design the capital mix and defend the debt:equity choice',
        'Construct projected financial statements that hang together',
        'Compute DSCR, break-even and payback and read them as a lender does',
      ],
      sections: [
        {
          heading: '1. The cost estimate — no surprises allowed',
          body: [
            'Project cost has a structure examiners expect you to recite: land & site development, building & civil works, plant & machinery (delivered + erection), technical know-how and engineering fees, preliminary/pre-operative expenses (trials, recruitment, training), and **contingency** at 5–10% of the controllable items — the line separating a professional estimate from a wish. Every figure carries a basis (quotation, benchmark, derived) because the DPR will be audited by people who ask.',
            '**Margin for working capital** is the most-forgotten cost line: until receivables turn, the plant runs on a buffer — raw material, work-in-progress, finished stock, and the credit extended to customers. Estimate it with the operating cycle (links to F06 Lecture 2): WCR ≈ (RM days + WIP days + FG days + DSO − DPO) × daily cost of sales. Under-providing working capital is the classic cause of "commissioned successfully, bankrupt in month seven."',
          ],
          callout: {
            type: 'warning',
            text: 'Cost underestimation is systematic (optimism bias — F01 Lecture 4): reference-class forecasting beats bottom-up hope — start from what SIMILAR projects actually cost, then adjust.',
          },
        },
        {
          heading: '2. Means of finance — the composition',
          body: [
            'Sources: promoter equity (skin in the game), term loans (rupee/equipment/soft loans, sometimes subsidy-linked), deferred supplier credit, and for larger projects bonds or ECBs. Composition principles: **match tenor to asset life** (a 15-year plant should not carry 5-year money), keep debt:equity near the sector norm (2:1 as the psychological line), and hold a cushion — an overrun funded by a panicked top-up loan re-prices the whole project.',
          ],
          bullets: [
            'Term loan amortisation: equal principal (faster paydown) vs EMI-style (gentler early years)',
            'Interest during construction capitalises into project cost — a real cost with no revenue against it',
            'Moratorium matched to commissioning: repayments start when cash flows start',
          ],
        },
        {
          heading: '3. The projected statements — one system again',
          body: [
            'The DPR projects 7–10 years. The **projected income statement**: revenue on an honest utilisation ramp (year 1 at 50–60%), costs split variable/fixed, depreciation (state SLM or WDV), interest, tax, PAT. The **projected balance sheet**: gross fixed assets less depreciation; working-capital lines from the cycle; debt amortising per schedule; equity plus reserves rolling PAT forward — balancing every year with the same five-arrows discipline as F06 Lecture 2. The **projected funds flow** (sources/uses of long-term funds) and **projected cash flow** (operating/investing/financing — quarterly for years 1–2) close the set.',
            'The projections drive the appraisal ratios: **DSCR** per year and on average (banks want ≥ 1.5 average, no year under ~1.1 without a mitigant), **break-even** (fixed ÷ contribution margin — the utilisation at which the project feeds itself), payback and the discounted measures (NPV/IRR — F06 Unit 3 machinery). Sensitivity is mandatory: re-run at ±10% revenue and ±10% capex; if DSCR breaches 1.0, the project is fragile at sanction.',
          ],
          callout: {
            type: 'excel',
            text: 'DPR hygiene that wins sanctions: one assumptions sheet (ramp, price, variable %, WC days, interest, tax), everything else formula-linked; a DSCR row visible on the P&L sheet; a two-way sensitivity table (utilisation × capex) on the summary page.',
          },
        },
      ],
      diagram: {
        title: 'The DPR statement system',
        caption: 'Cost estimate + means of finance seed the projected statements; the ratios close the loop back to the financing decision.',
        svg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
<defs><marker id="dpr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#5eead4"/></marker></defs>
<rect x="20" y="30" width="220" height="100" rx="14" fill="#0f172a" stroke="#2dd4bf" stroke-width="1.5"/>
<text x="130" y="62" fill="#5eead4" font-size="13" font-weight="700" text-anchor="middle">Project cost estimate</text>
<text x="130" y="84" fill="#94a3b8" font-size="10.5" text-anchor="middle">land · civil · plant · know-how</text>
<text x="130" y="100" fill="#94a3b8" font-size="10.5" text-anchor="middle">pre-op · contingency 5–10%</text>
<text x="130" y="116" fill="#94a3b8" font-size="10.5" text-anchor="middle">+ working-capital margin</text>
<rect x="20" y="170" width="220" height="100" rx="14" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
<text x="130" y="202" fill="#fbbf24" font-size="13" font-weight="700" text-anchor="middle">Means of finance</text>
<text x="130" y="224" fill="#94a3b8" font-size="10.5" text-anchor="middle">equity · term loans · subsidy</text>
<text x="130" y="240" fill="#94a3b8" font-size="10.5" text-anchor="middle">D:E ≈ 2:1 · tenor matched</text>
<line x1="242" y1="80" x2="308" y2="130" stroke="#5eead4" stroke-width="2" marker-end="url(#dpr)"/>
<line x1="242" y1="220" x2="308" y2="170" stroke="#fbbf24" stroke-width="2" marker-end="url(#dpr)"/>
<rect x="310" y="105" width="200" height="95" rx="14" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="410" y="140" fill="#5eead4" font-size="13" font-weight="700" text-anchor="middle">Projected statements</text>
<text x="410" y="162" fill="#94a3b8" font-size="10.5" text-anchor="middle">P&amp;L · BS · funds flow · cash flow</text>
<text x="410" y="180" fill="#64748b" font-size="10" text-anchor="middle">7–10 years, must balance yearly</text>
<line x1="512" y1="152" x2="568" y2="152" stroke="#5eead4" stroke-width="2" marker-end="url(#dpr)"/>
<rect x="570" y="60" width="170" height="185" rx="14" fill="#0f172a" stroke="#a78bfa" stroke-width="1.5"/>
<text x="655" y="92" fill="#a5b4fc" font-size="12.5" font-weight="700" text-anchor="middle">Appraisal ratios</text>
<text x="655" y="118" fill="#94a3b8" font-size="10.5" text-anchor="middle">DSCR ≥ 1.5 avg</text>
<text x="655" y="136" fill="#94a3b8" font-size="10.5" text-anchor="middle">break-even utilisation</text>
<text x="655" y="154" fill="#94a3b8" font-size="10.5" text-anchor="middle">payback · NPV · IRR</text>
<text x="655" y="172" fill="#94a3b8" font-size="10.5" text-anchor="middle">±10% sensitivity</text>
<text x="655" y="200" fill="#64748b" font-size="9.5" text-anchor="middle">sanction or re-price →</text>
<text x="380" y="290" fill="#64748b" font-size="11" text-anchor="middle">One assumptions sheet drives everything — the DPR is a model, not a document</text>
</svg>`,
      },
      formulas: [
        { name: 'Working capital (operating cycle)', expr: '(RM + WIP + FG + DSO − DPO) days × daily cost', meaning: 'The forgotten capex line' },
        { name: 'DSCR', expr: '(PAT + Dep + Interest)/(Interest + Principal)', meaning: 'Lender\'s oxygen metric — ≥1.5 average' },
        { name: 'Break-even utilisation', expr: 'Fixed ÷ (Price − Variable cost) ÷ capacity', meaning: 'Self-feeding point' },
        { name: 'Payback', expr: 'Years to recover capex from cash flows', meaning: 'Liquidity lens — pair with NPV (ignores time value)' },
      ],
      examples: [
        {
          title: 'Mini-DPR core — one honest year',
          given: [
            'Capex ₹100 cr (incl. 7% contingency) · Term loan ₹60 cr @ 11%, 6-yr equal principal after 1-yr moratorium',
            'Year-3: utilisation 80% of 1 lakh units @ ₹15,000/unit; variable cost 55%; fixed ₹18 cr; depreciation ₹8 cr; tax 25%',
          ],
          steps: [
            { text: 'Revenue and margins', calc: 'Revenue = 80,000 × 15,000 = ₹120 cr · contribution 45% = ₹54 cr · EBIT = 54 − 18 − 8 = ₹28 cr' },
            { text: 'Interest and PAT', calc: 'Loan start Y3 = 60 − 20 = ₹40 cr → interest 4.4 → PBT 23.6 → PAT ₹17.7 cr' },
            { text: 'DSCR', calc: '(17.7 + 8 + 4.4)/(4.4 + 10) = 30.1/14.4 = 2.09' },
            { text: 'Break-even', calc: 'BEP = 18 cr ÷ 6,750/unit = 26,667 units = 26.7% utilisation' },
          ],
          answer:
            'Year-3: PAT ₹17.7 cr, DSCR 2.09, break-even at 26.7% capacity — the project services debt even if demand halves from plan.',
        },
        {
          title: 'The working-capital trap',
          given: ['Capex ₹50 cr fully funded · RM 45 d, WIP 15 d, FG 30 d, DSO 60 d, DPO 30 d · annual cost of sales ₹80 cr'],
          steps: [
            { text: 'Cycle', calc: '45 + 15 + 30 + 60 − 30 = 120 days of cost locked in operations' },
            { text: 'Working capital need', calc: '120/365 × 80 cr ≈ ₹26.3 cr — none of which the ₹50 cr capex covers' },
            { text: 'Consequence', calc: 'Month 4: cash box empties, production stops, the rescue facility prices at distress levels' },
          ],
          answer:
            'The "complete" ₹50 cr project needs ₹76 cr+. Working capital is capex\'s shadow — fund it at sanction or it funds itself from your solvency.',
        },
      ],
      caseStudy: {
        title: 'Case — DPR vs reality at a textile expansion',
        body: [
          'A textile major\'s DPR: capex ₹180 cr, 24 months, ramp 70/85/90%, IRR 18.4%, DSCR 1.9. Twenty months in, three divergences: cotton prices lift variable cost 6%; the vendor\'s "delivered" price excluded ₹11 cr of erection the DPR under-specified; the ramp lands at 55% because the anchor buyer deferred orders. Actual IRR 9.8% — below the 12% cost of capital; DSCR dips to 1.02 in year 2.',
          'The restructured sanction: contingency drawn fully (its purpose), promoter brings ₹15 cr unsecured to restore DSCR ≥ 1.3, moratorium extended two quarters to match the real ramp. The project survives — because the sensitivity table had pre-computed exactly this scenario and covenants anticipated it.',
        ],
        questions: [
          'Which DPR discipline saved the project — and which assumption class (cost/schedule/market) caused each divergence?',
          'Why ₹15 cr unsecured rather than a fresh term-loan tranche?',
          'What reference-class evidence should have tempered the 70% year-1 ramp?',
        ],
        takeaways: [
          'Sensitivity tables are the pre-negotiated survival plan, not decoration',
          'Cost, schedule and market risks arrive together; contingency must cover the joint event',
          'Ramps anchored on one anchor buyer carry counterparty risk — diversify the demand case',
        ],
      },
      revision: [
        'Cost structure: land · civil · plant · know-how · pre-op · contingency 5–10% · WC margin',
        'WCR = (RM+WIP+FG+DSO−DPO) days × daily cost — the forgotten capex',
        'Match financing tenor to asset life; D:E ~ 2:1; construction interest capitalises',
        'Ramp honesty: year-1 utilisation 50–60% beats heroic 85%',
        'DSCR ≥ 1.5 average, no year < ~1.1 without mitigant',
        'BEP utilisation = fixed ÷ contribution per unit ÷ capacity',
        '±10% revenue and capex sensitivity at sanction — non-negotiable',
      ],
      practice: [
        { q: 'PAT 12, Dep 6, Interest 4, Principal 8 (₹ cr). DSCR and verdict?', a: '(12+6+4)/(4+8) = 1.83 — comfortable; even a 20% PAT fall keeps DSCR ≈ 1.5.' },
        { q: 'Fixed ₹24 cr; price ₹2,000; variable ₹1,200; capacity 3 lakh units. Break-even utilisation?', a: 'BEP = 24 cr/800 = 30,000 units = 10% of capacity — but stress the variable-cost assumption before celebrating.' },
        { q: 'Why is payback incomplete despite its popularity?', a: 'It ignores time value and everything after payback. Use it as a liquidity screen alongside NPV/IRR.' },
        { q: 'DSCR 1.05 in year 2 base case. What do you fix before the banker asks?', a: 'Stretch principal to the ramp, add moratorium quarters, trim scope, or raise equity — and show the adjusted schedule next to the original.' },
        { q: 'Why does a DPR estimate costs in a base-year and then apply escalation, instead of using today\'s prices throughout?', a: 'Construction straddles years: steel bought in year 3 prices at today\'s rates understates CAPEX and overstates returns. Base cost plus year-wise escalation plus IDC builds the funding requirement honestly.' },
        { q: 'Two DPRs, same project: one shows 22 percent IRR, the other 14 percent. Name three places to look first.', a: 'Capacity utilisation ramp, raw material price and product price assumptions, and implementation delay (each shift IRR violently). The variance lives in assumptions, not arithmetic - audit sensitivity tables first.' },
      ],
      tools: [
        { label: 'Time-Value Machine', href: '/tools/time-value-machine' },
        { label: 'DCF Valuation Model', href: '/tools/dcf-valuation-model' },
      ],
    },
    {
      slug: 'social-cost-benefit-analysis',
      number: 4,
      title: 'Social Cost Benefit Analysis — UNIDO & Little–Mirrlees',
      minutes: 45,
      summary:
        'Why private NPV misprices public projects, shadow prices for distorted markets, the UNIDO five-stage method and the Little–Mirrlees border-price alternative, and how India actually appraises public investment.',
      status: 'live',
      objectives: [
        'Justify SCBA: externalities, taxes, shadow wages, distribution weights',
        'Compute a shadow wage rate and a simple shadow price',
        'Reproduce UNIDO\'s five stages on a small project',
        'Contrast UNIDO (domestic prices) with L–M (border prices)',
      ],
      sections: [
        {
          heading: '1. Why private arithmetic fails for public projects',
          body: [
            'A private DPR counts only cash to the investor. A public project creates **externalities** (cleaner air, decongestion, learning spillovers) and imposes costs (displaced livelihoods, emissions) that no invoice records. Market prices are distorted — taxes inflate inputs, duties and subsidies bend prices, and **surplus labour** in rural markets means the wage overstates the opportunity cost of employing a half-employed worker. And a rupee to the poorest quintile is socially worth more than a rupee to the richest — distribution matters to government though it is invisible to NPV.',
            'SCBA repairs each failure with a **shadow price** — the true economic value of a resource when its market price is distorted or absent: outputs at world prices, wages at forgone marginal output, foreign exchange at its scarcity value. The financial statements are translated into an **economic account**, discounted at the **social discount rate** — typically lower than commercial capital cost (government patience), but not zero.',
          ],
          callout: {
            type: 'exam',
            text: 'One-breath definition: "Shadow price = the true economic value of a resource when its market price is distorted or the market does not exist." Then prove it with the two canonical examples — shadow wage below market wage (surplus labour); land above acquisition cost when its next-best use is valuable.',
          },
        },
        {
          heading: '2. UNIDO approach — five stages',
          body: [
            '**(1) Financial profitability** — the conventional private NPV as baseline. **(2) Profitability net of distortions** — remove transfer payments (taxes, subsidies move money, not resources), re-price at shadow prices: traded goods at world prices via the shadow exchange rate, labour at the shadow wage. **(3) Saving impact** — value the project\'s contribution to saving/investment; a capital-scarce economy values a saved rupee above a consumed one. **(4) Income redistribution** — distribution weights by income group, weights falling as income rises. **(5) Externalities** — quantify and price the unpriced: pollution damages, time savings. The output is an NPV at EACH stage — showing where the social value comes from, not just whether it exists.',
          ],
          bullets: [
            'Transfer payments (tax, subsidy) leave the analysis — money moved, not resources used',
            'Shadow wage ≈ marginal product of labour elsewhere + recruitment/training cost',
            'Traded inputs/outputs → world (border) prices; non-traded → domestic price with conversion factor',
          ],
        },
        {
          heading: '3. Little–Mirrlees and Indian practice',
          body: [
            'The Little–Mirrlees approach prices EVERYTHING at **border prices** — world prices converted at the shadow exchange rate — so a tonne of steel is valued at import parity whether or not it is actually imported; a single numeraire keeps the account consistent. UNIDO works in domestic prices with the shadow exchange rate translating border values in. The two converge when conversion factors are consistent — the practical difference is bookkeeping direction.',
            'Indian public appraisal (NITI Aayog/DEA tradition): financial returns first, then **Economic IRR** with standard adjustments — shadow wage for unskilled labour (often 0.6–0.8 of market), world prices for traded goods, social discount rate historically 8–12%. Rail and road appraisals monetise time savings, accidents and fuel — externalities made countable.',
          ],
          callout: {
            type: 'note',
            text: 'Bridge to your specialisations: the BA minor builds the demand model feeding time-savings estimates; the Finance major runs the EIRR math. Public appraisal is a team sport between your two tracks.',
          },
        },
      ],
      diagram: {
        title: 'From financial to economic account',
        caption: 'UNIDO stages: start at private NPV, strip distortions, then layer saving, distribution and externality adjustments.',
        svg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
<defs><marker id="sc" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#5eead4"/></marker></defs>
<rect x="20" y="110" width="150" height="80" rx="12" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
<text x="95" y="142" fill="#fbbf24" font-size="12" font-weight="700" text-anchor="middle">Stage 1</text>
<text x="95" y="162" fill="#94a3b8" font-size="10" text-anchor="middle">Financial NPV</text>
<text x="95" y="177" fill="#94a3b8" font-size="10" text-anchor="middle">(private prices)</text>
<rect x="200" y="110" width="160" height="80" rx="12" fill="#0f172a" stroke="#2dd4bf" stroke-width="1.5"/>
<text x="280" y="142" fill="#5eead4" font-size="12" font-weight="700" text-anchor="middle">Stage 2</text>
<text x="280" y="162" fill="#94a3b8" font-size="10" text-anchor="middle">− transfers (tax/subsidy)</text>
<text x="280" y="177" fill="#94a3b8" font-size="10" text-anchor="middle">+ shadow prices</text>
<rect x="390" y="20" width="150" height="80" rx="12" fill="#0f172a" stroke="#a78bfa" stroke-width="1.5"/>
<text x="465" y="52" fill="#a5b4fc" font-size="12" font-weight="700" text-anchor="middle">Stage 3</text>
<text x="465" y="72" fill="#94a3b8" font-size="10" text-anchor="middle">saving premium</text>
<text x="465" y="87" fill="#94a3b8" font-size="10" text-anchor="middle">(capital scarcity)</text>
<rect x="390" y="200" width="150" height="80" rx="12" fill="#0f172a" stroke="#34d399" stroke-width="1.5"/>
<text x="465" y="232" fill="#6ee7b7" font-size="12" font-weight="700" text-anchor="middle">Stage 4</text>
<text x="465" y="252" fill="#94a3b8" font-size="10" text-anchor="middle">distribution weights</text>
<text x="465" y="267" fill="#94a3b8" font-size="10" text-anchor="middle">(whose income moves)</text>
<rect x="580" y="110" width="160" height="80" rx="12" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="660" y="142" fill="#5eead4" font-size="12" font-weight="700" text-anchor="middle">Stage 5</text>
<text x="660" y="162" fill="#94a3b8" font-size="10" text-anchor="middle">+ externalities priced</text>
<text x="660" y="177" fill="#94a3b8" font-size="10" text-anchor="middle">= Social NPV / EIRR</text>
<line x1="170" y1="150" x2="198" y2="150" stroke="#5eead4" stroke-width="2" marker-end="url(#sc)"/>
<line x1="360" y1="140" x2="388" y2="90" stroke="#a78bfa" stroke-width="2" marker-end="url(#sc)"/>
<line x1="360" y1="160" x2="388" y2="215" stroke="#34d399" stroke-width="2" marker-end="url(#sc)"/>
<line x1="540" y1="90" x2="578" y2="135" stroke="#a78bfa" stroke-width="2" marker-end="url(#sc)"/>
<line x1="540" y1="215" x2="578" y2="170" stroke="#34d399" stroke-width="2" marker-end="url(#sc)"/>
<text x="380" y="295" fill="#64748b" font-size="11" text-anchor="middle">Report the NPV at EVERY stage — the trail is the analysis</text>
</svg>`,
      },
      formulas: [
        { name: 'Shadow wage rate', expr: 'SWR = forgone marginal output + recruitment cost', meaning: 'Economic cost of employing labour (surplus-labour discount)' },
        { name: 'Economic price (traded)', expr: 'World price × shadow exchange rate', meaning: 'Border pricing for imports/exports' },
        { name: 'Distribution weight', expr: 'wᵢ = (ȳ/yᵢ)^η', meaning: 'Income-relative social value of a rupee' },
        { name: 'EIRR test', expr: 'EIRR ≥ social discount rate (8–12%)', meaning: 'Indian public-investment go/no-go' },
      ],
      examples: [
        {
          title: 'Shadow wage for a rural roads programme',
          given: ['Market wage ₹380/day · marginal output in village ≈ ₹220/day · recruitment/training ₹30/day'],
          steps: [
            { text: 'SWR', calc: '220 + 30 = ₹250/day vs ₹380 — a 34% economic discount on labour' },
            { text: 'Effect on a labour-heavy project', calc: 'Wages 50% of costs → economic cost ≈ 0.5 + 0.5×(250/380) = 0.83 of financial cost' },
            { text: 'The warning', calc: 'SWR < market wage does NOT mean pay less — it means COUNT cheaper; the wage paid remains a transfer to households' },
          ],
          answer:
            'SWR ₹250/day; economic cost 17% below financial. Precisely why rural works pass SCBA where they fail bank appraisal.',
        },
        {
          title: 'Taxing a transfer out of existence',
          given: ['Equipment import ₹100 cr, duty 20% · output replaces imports worth ₹120 cr'],
          steps: [
            { text: 'Financial cost', calc: '₹120 cr including ₹20 cr duty' },
            { text: 'Economic cost (Stage 2)', calc: '₹100 cr — the duty is a transfer to the exchequer, not a resource use' },
            { text: 'Output valuation', calc: 'Import replacement = ₹120 cr foreign-exchange saving at border prices — count fully' },
          ],
          answer: 'Economics: cost 100, benefit 120. The duty wrongly sank the project — transfers out, border prices in.',
        },
      ],
      caseStudy: {
        title: 'Case — Pricing a metro-rail corridor',
        body: [
          'Financial DPR: capex ₹8,400 cr; revenue NPV ₹6,100 cr — financial IRR 4.8%. The SCBA re-opens the account: 3.1 lakh daily commuters save 26 minutes on average, valued at shadow time values by income class (Stage 4 weights raise poorer commuters\' savings); 62,000 vehicle-trips shift off the road — fuel, accidents, emissions monetised at standard rates; land at opportunity value; construction labour at 0.7 shadow factor. EIRR: 13.6% against a 10% social discount rate — comfortably positive.',
          'The finance department\'s counter-case: ridership elasticities are guesses, time values are contestable, and EIRR is only as honest as its externality pricing. Sanction proceeds with a ridership-linked review clause — appraisal as a living document.',
        ],
        questions: [
          'Identify one input per UNIDO stage in this case and the distortion it corrects.',
          'Which single assumption, if halved, most likely kills the EIRR? Defend quantitatively.',
          'Why does the metro pass at 4.8% financial IRR while a private toll road at the same IRR would not?',
        ],
        takeaways: [
          'Public projects are justified by the account private NPV cannot see',
          'Time savings are the dominant "revenue" of urban transport SCBA — model them honestly',
          'EIRR is assumption-hungry: pair every externality price with a sensitivity band',
        ],
      },
      revision: [
        'SCBA rationale: externalities, transfer distortions, surplus labour, distribution',
        'Shadow price = economic value where the market price lies or is absent',
        'SWR ≈ forgone marginal output + recruitment cost (< market wage with surplus labour)',
        'Taxes/subsidies are transfers — remove at Stage 2',
        'UNIDO stages: financial → distortions → saving → distribution → externalities',
        'L–M: everything at border prices via shadow exchange rate',
        'India: EIRR vs 8–12% social discount rate; time/accident/fuel monetisation standard',
      ],
      practice: [
        { q: 'Project pays ₹40 cr income tax; a contractor bills ₹12 cr whose shadow value is ₹10 cr. Adjustments?', a: 'Remove the ₹40 cr transfer; reprice the contractor at ₹10 cr — economic costs fall ₹42 cr.' },
        { q: 'Why is the social discount rate lower than a 14% commercial hurdle?', a: 'Government borrows patient capital and society includes future generations; but capital scarcity keeps it at 8–12%, not zero.' },
        { q: '20 min/day saved, 300 days, ₹90/hr shadow time, 2 lakh commuters. Annual benefit?', a: '20/60 × 300 × 90 × 2,00,000 = ₹180 cr per year — one SCBA line reshaping the whole project.' },
        { q: 'One sentence each: UNIDO vs Little–Mirrlees.', a: 'UNIDO: stage-wise adjustment in DOMESTIC prices with a shadow exchange rate. L–M: the whole account at BORDER (world) prices with one numeraire — same economics, different bookkeeping.' },
        { q: 'A thermal plant is NPV-negative after a carbon shadow price. NPV-positive without it. What does SCBA tell the appraiser?', a: 'The project creates private value but destroys social value - the unpriced emissions exceed the profits. Decision depends on the objective function: ministries use shadow prices precisely to catch this divergence.' },
        { q: 'Why do SCBA shadow prices diverge from market prices in developing economies?', a: 'Distortions: taxes inflate, subsidies deflate, controlled interest rates understate capital scarcity, and unemployment undervalues labour at market wage. Shadow prices restate inputs at true opportunity cost to society.' },
      ],
      tools: [
        { label: 'DCF Valuation Model (economic flows)', href: '/tools/dcf-valuation-model' },
      ],
    },

    /* ─────────── LECTURE 5 (Unit 5 · FULL) ─────────── */
    {
      slug: 'pert-cpm-scheduling',
      number: 5,
      title: 'PERT & CPM: Networks, Critical Path, Crashing',
      minutes: 55,
      summary:
        'The network-control heart of Unit 5 — draw AOA networks, compute the critical path, float and slack, use PERT\'s three-time estimates for probability of completion, and crash the schedule at minimum cost.',
      status: 'live',
      objectives: [
        'Draw an activity-on-arrow network with dummies from a dependency list',
        'Compute ES/EF/LS/LF, total float, and identify the critical path',
        'Use PERT expected times and variance for probability-of-deadline questions',
        'Crash activities optimally: cost slope vs indirect-cost savings',
      ],
      sections: [
        {
          heading: '1. Why networks beat bar charts',
          body: [
            'A Gantt chart shows WHEN; a network shows WHY — the dependency logic that determines the schedule. CPM (deterministic, activity-oriented, born in chemical-plant maintenance) gives the longest path through the network: the **critical path**, whose length IS the project duration and whose activities have zero slack. PERT (probabilistic, born in the Polaris missile programme) adds uncertainty: three time estimates per activity, an expected time, and a variance for probability statements.',
            'Activity-on-arrow (AOA) convention: activities are arrows, nodes are events (milestones). AOA forces the beautiful awkwardness of **dummy activities** — zero-duration arrows that exist only to carry logic. When two activities share start and end nodes, or a dependency exists that no real arrow expresses, a dummy resolves it.',
          ],
          callout: {
            type: 'exam',
            text: 'Rules that earn marks: exactly one start node and one end node; no looping back; every event numbered so arrowheads point to larger numbers; dummies have zero duration. Networks that violate these lose the "draw" marks before any computation is checked.',
          },
        },
        {
          heading: '2. Forward pass, backward pass, float',
          body: [
            'Forward pass computes Earliest Start/Latest-allowed-by-logic: ES of an activity = max of EF of all predecessors; EF = ES + duration. At the end node, the latest finish is fixed (= project duration for critical path work). Backward pass computes Latest Start/Finish: LF of an activity = min of LS of all successors; LS = LF − duration.',
            '**Total float** = LS − ES = LF − EF: how long an activity can slip without delaying the PROJECT. **Free float** = how long it can slip without delaying the EARLIEST START of any successor. Critical activities have zero total float — they cannot slip at all, which is where a manager looks first and a student loses marks fastest.',
          ],
          bullets: [
            'Forward pass: take MAX of incoming EFs (you wait for the slowest predecessor)',
            'Backward pass: take MIN of outgoing LSs (you must satisfy the earliest successor)',
            'Total float 0 → critical; chain of zero-float activities = critical path',
            'Free float ≤ Total float always; free float is delay visible to NOBODY, total float borrows from the chain',
          ],
        },
        {
          heading: '3. PERT — three estimates and the probability of a promise',
          body: [
            'PERT replaces the single duration with optimistic (a), most likely (m), pessimistic (b): expected time **te = (a + 4m + b)/6** and variance **σ² = ((b − a)/6)²**. The project\'s expected duration is the sum of te along the critical path; its variance is the SUM OF VARIANCES of critical activities (variances add, standard deviations do not).',
            'The exam classic: "What is the probability of finishing in D days?" Compute Z = (D − TE)/σ(project), read Φ(Z) from the normal table. Z = 1.28 → 90%; Z = −0.25 → about 40%. The managerial punchline: a promised date at the expected duration TE has only a 50% probability — professional schedulers promise the date at their chosen confidence, not the expectation.',
          ],
          callout: {
            type: 'warning',
            text: 'Common error: adding standard deviations along the path. Variances add; σ is the square root of the summed variance. Also — probability logic uses only the critical path; a near-critical parallel path with high variance can bite you (merge bias), which exam setters love as a viva follow-up.',
          },
        },
        {
          heading: '4. Crashing — buying time at the cheapest price',
          body: [
            'Normal time/cost vs crash time/cost per activity: cost slope = (crash cost − normal cost)/(normal time − crash time) — the rupees per day saved. Since shortening the project saves indirect costs (overheads, penalties, early revenue), crash the cheapest-slope CRITICAL activity first, recompute the path structure (crashing can make a parallel path critical), and stop when crash cost per day > indirect saving per day. The optimum duration minimises total = direct + indirect cost.',
          ],
        },
      ],
      diagram: {
        title: 'AOA network with the critical path',
        caption:
          'Seven activities, one dummy. The teal chain 1→2→4→6 (4 + 6 + 7 = 17 days) is critical; every other route has slack.',
        svg: pertSvg,
      },
      formulas: [
        { name: 'Expected time (PERT)', expr: 'te = (a + 4m + b) / 6', meaning: 'Beta-weighted optimistic/most-likely/pessimistic' },
        { name: 'Activity variance', expr: 'σ² = ((b − a)/6)²', meaning: 'Spread of the time estimate' },
        { name: 'Project σ', expr: 'σ = √(Σ σ² critical activities)', meaning: 'Standard deviation of project duration' },
        { name: 'Probability of deadline', expr: 'Z = (D − TE)/σ → Φ(Z)', meaning: 'Normal-table lookup for promised dates' },
        { name: 'Total float', expr: 'TF = LS − ES = LF − EF', meaning: 'Slippable delay without project delay' },
        { name: 'Free float', expr: 'FF = min(ES successors) − EF', meaning: 'Delay invisible to successors' },
        { name: 'Cost slope (crashing)', expr: '(Crash cost − Normal cost)/(Normal time − Crash time)', meaning: 'Price of one day saved' },
      ],
      examples: [
        {
          title: 'Full CPM — find the critical path and floats',
          given: [
            'Activities (days): A(1→2) 4 · B(1→3) 5 · C(2→4) 6 · D(3→5) 3 · E(3→4, dummy) 0 · F(4→6) 7 · G(5→6) 4',
            'Dependencies: A then C; B then D; C/F on path via node 4; G after D',
          ],
          steps: [
            { text: 'Forward pass', calc: 'Node1 ES=0 → A: ES 0, EF 4 · B: ES 0, EF 5 → C: ES 4, EF 10 · D: ES 5, EF 8 · dummy E: ES 5, EF 5 → F: ES max(10, 5) = 10, EF 17 · G: ES 8, EF 12' },
            { text: 'Project duration', calc: 'End node EF = max(17, 12) = 17 days' },
            { text: 'Backward pass', calc: 'F: LF 17, LS 10 · G: LF 17, LS 13 → C: LF 10, LS 4 · D: LF 13, LS 10 · dummy: LF 10, LS 10 → A: LF 4, LS 0 · B: LF min(10, 10) = 10, LS 5' },
            { text: 'Floats', calc: 'A: 0 · C: 0 · F: 0 (critical) · B: TF = 5 − 0 = 5 · D: TF = 10 − 5 = 5 · G: TF = 13 − 8 = 5' },
          ],
          answer:
            'Critical path 1→A→2→C→4→F→6 = 17 days. Non-critical activities each carry 5 days of total float — B can slip to day 5 start, D to day 10, without moving completion.',
        },
        {
          title: 'PERT probability — can we promise 16 days?',
          given: [
            'Critical activities (a, m, b) days: A(3,4,5) · C(3,6,15) · F(4,7,12)',
            'Client asks for completion in 16 days',
          ],
          steps: [
            { text: 'Expected times', calc: 'A: (3+16+5)/6 = 4 · C: (3+24+15)/6 = 7 · F: (4+28+12)/6 ≈ 7.33 → TE = 18.33 days' },
            { text: 'Variances', calc: 'A: ((5−3)/6)² = 0.111 · C: ((15−3)/6)² = 4.0 · F: ((12−4)/6)² = 1.778 → Σσ² = 5.889 → σ = 2.43' },
            { text: 'Z for 16 days', calc: 'Z = (16 − 18.33)/2.43 = −0.96 → Φ(−0.96) ≈ 0.169' },
            { text: 'For 90% confidence', calc: 'D = TE + 1.28σ = 18.33 + 3.11 ≈ 21.4 days' },
          ],
          answer:
            'Probability of finishing in 16 days ≈ 17% — do not promise it. A 90%-safe promise is about 21–22 days. Notice C\'s huge uncertainty (b = 15) dominates σ: de-risking C helps the promise more than any pep talk.',
        },
        {
          title: 'Crashing at minimum cost',
          given: [
            'Critical path = 17 days · Indirect cost ₹50,000/day',
            'Crashable critical activities: C slope ₹20k/day (max 2 days) · F slope ₹45k/day (max 2 days)',
          ],
          steps: [
            { text: 'Cheapest first', calc: 'C slope 20k < 50k indirect saving → crash C by 2 days → duration 15, net saving 2×(50−20)k = ₹60k' },
            { text: 'Re-examine paths', calc: 'After crashing C, old path A-C-F = 15; check parallel B-D-G = 12 (still slack 3) — path unchanged' },
            { text: 'Next candidate', calc: 'F slope 45k < 50k → crash F by 2 → duration 13, extra saving 2×(50−45)k = ₹10k' },
            { text: 'Stop test', calc: 'No more crashable critical activities below ₹50k/day → optimum ≈ 13 days' },
          ],
          answer:
            'Crash C fully then F: 17 → 13 days, total cost saved ≈ ₹70k. Every crash step must re-check whether a parallel path became critical — crashing a non-critical activity buys nothing.',
        },
      ],
      caseStudy: {
        title: 'Case — The factory rollout that ignored its own network',
        body: [
          'Greenfield plant, promised commissioning in 11 months. The PM tracks progress by "% complete" meetings: civil 90%, machinery ordered, hiring underway. Month 9: machinery arrives but the bay it needs sits behind a substation delay nobody listed as a dependency. The network — never drawn — would have shown equipment installation depends on the substation, which depends on a utility approval with historic 75-day variability.',
          'Commissioning lands at month 13. Penalty clause: ₹8 lakh/week after month 11 — ₹1.28 cr. The post-mortem (which is Unit 5\'s "project audit" in action) draws the network in hindsight: substation sits on the critical path with te 70 days, σ 12 days. A promise made at TE carried a coin-flip of failure; the 90%-safe date was always month 12+.',
        ],
        questions: [
          'Which float did the substation dependency silently consume — and who should have owned it?',
          'Rebuild the promise: what duration should have been quoted at 90% confidence?',
          'What crashing options existed on the true critical path, and at what cost slope vs the ₹8 lakh/week penalty?',
        ],
        takeaways: [
          '"% complete" without a network is theatre — dependencies, not effort, set the end date',
          'High-variance approvals belong ON the critical-path risk register with buffers, not hope',
          'PERT\'s probability machinery exists precisely to price promises before signing penalty clauses',
        ],
      },
      revision: [
        'CPM deterministic; PERT adds (a,4m,b)/6 and ((b−a)/6)²',
        'Forward pass MAX of EFs; backward pass MIN of LSs',
        'TF = LS−ES; FF = successor ES − EF; TF = 0 → critical',
        'Project σ = √(Σ variances on critical path) — variances add, never σ',
        'Z = (D − TE)/σ; promise at chosen confidence, not at TE',
        'Crash lowest-slope critical activity first; re-check paths after each crash',
        'Dummy activity: zero duration, logic only — one per dependency that no real arrow carries',
      ],
      practice: [
        {
          q: 'Activity (a, m, b) = (2, 5, 14). te and σ²?',
          a: 'te = (2 + 20 + 14)/6 = 6 · σ² = ((14−2)/6)² = 4 → σ = 2.',
        },
        {
          q: 'ES 12, EF 20; successors\' earliest start 24. Total float and free float?',
          a: 'If LF = 26 → LS = 18 → TF = 18 − 12 = 6. FF = 24 − 20 = 4. Free float (4) ≤ total float (6) as always.',
        },
        {
          q: 'Critical path 30 days, σ = 4. Probability of finishing by 34 days?',
          a: 'Z = (34 − 30)/4 = 1.0 → Φ(1.0) ≈ 84%.',
        },
        {
          q: 'Why can crashing a non-critical activity never shorten the project?',
          a: 'Project duration = longest path. Shortening activities with float shortens paths that already finish early — the critical path still governs. Only critical (or path-tying) activities move the end date.',
        },
        { q: 'Path A: 12 days, float 0. Path B: 18 days, float 0. Path C: 15 days, float 3. Duration and the manager\'s focus?', a: 'Duration 18 days - two critical paths (A and B) both need watching; C can slip 3 days free. Multiple zero-float paths make a schedule fragile: one delay anywhere on either chain moves delivery.' },
        { q: 'PERT times: optimistic 4, most-likely 7, pessimistic 16. Expected time and variance?', a: 'te = (4 + 28 + 16)/6 = 8 days; variance = ((16-4)/6)^2 = 4 (SD 2). The wide spread says this activity is the risk concentration - monitor it, buffer it.' },
      ],
      tools: [
        { label: 'Critical Path Simulator', href: '/tools/critical-path-simulator' },
      ],
    },
  ],
};
