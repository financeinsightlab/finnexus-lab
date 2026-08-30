import type { Subject } from '../types';

/* ═══════════════════════════════════════════════════════════════
   PGDM 302 — LEGAL & BUSINESS ENVIRONMENT · Core · Semester III
   ═══════════════════════════════════════════════════════════════ */

const envLayersSvg = `
<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
  <circle cx="380" cy="175" r="52" fill="#134e4a" stroke="#2dd4bf" stroke-width="1.5"/>
  <text x="380" y="171" fill="#5eead4" font-size="12" font-weight="700" text-anchor="middle">FIRM</text>
  <text x="380" y="187" fill="#64748b" font-size="9.5" text-anchor="middle">vision · strategy</text>

  <circle cx="380" cy="175" r="96" fill="none" stroke="#818cf8" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="380" y="92" fill="#a5b4fc" font-size="11" font-weight="700" text-anchor="middle">MICRO — task environment</text>
  <text x="290" y="128" fill="#94a3b8" font-size="9.5" text-anchor="middle">customers</text>
  <text x="470" y="128" fill="#94a3b8" font-size="9.5" text-anchor="middle">suppliers</text>
  <text x="285" y="228" fill="#94a3b8" font-size="9.5" text-anchor="middle">competitors</text>
  <text x="475" y="228" fill="#94a3b8" font-size="9.5" text-anchor="middle">lenders</text>

  <circle cx="380" cy="175" r="150" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="380" y="36" fill="#fbbf24" font-size="11" font-weight="700" text-anchor="middle">MACRO — remote environment</text>
  <text x="380" y="326" fill="#94a3b8" font-size="10" text-anchor="middle">economic · political/legal · socio-cultural · technological · demographic (PESTLE)</text>

  <text x="120" y="60" fill="#a5b4fc" font-size="10">direct, daily,</text>
  <text x="120" y="74" fill="#a5b4fc" font-size="10">negotiable</text>
  <text x="620" y="60" fill="#fbbf24" font-size="10">indirect, slow,</text>
  <text x="620" y="74" fill="#fbbf24" font-size="10">to be adapted to</text>

  <text x="380" y="308" fill="#64748b" font-size="10.5" text-anchor="middle">Environment scanning converts these rings into early warnings and strategy inputs</text>
</svg>`;

export const legalBusinessEnvironment: Subject = {
  slug: 'legal-business-environment',
  code: 'PGDM 302',
  name: 'Legal & Business Environment',
  track: 'CORE',
  credits: 3,
  hours: 30,
  semester: 3,
  tagline: 'The rules of the game — and the referee\'s handbook.',
  description:
    'Micro and macro business environments, the Indian economy\'s policy architecture (LPG, NITI Aayog, monetary-fiscal policy, competition law, ESG), the financial sector and its regulators, business law from contracts to the DPDP Act, and the full IPR map.',
  outcomes: [
    'Analyse the impact of micro and macro environments on operations and decision-making',
    'Evaluate the legal policy framework and its implications for business organisations',
    'Analyse the structure and functioning of the Indian financial sector and the regulatory roles of SEBI and RBI',
    'Apply key legal principles to real-world business scenarios',
    'Analyse the relevance of intellectual property rights in contemporary business',
  ],
  units: [
    'Unit 1 — Overview of Business Environment: nature & structure; micro & macro, economic & non-economic; environment interaction matrix; startup legalities — DPIIT recognition, IPR for startups, fundraising law',
    'Unit 2 — Indian Economy & Economic Policies: economic planning & NITI Aayog; LPG reforms; industrial policy; monetary & fiscal policy, Union Budget; Competition Act & CCI; BOP & foreign trade policy; ESG compliance, SEBI disclosures, green finance',
    'Unit 3 — Financial Sector in India: market structure; money & capital markets; SEBI & stock exchanges; banks, NBFCs, insurance, mutual funds; RBI\'s role; banking & financial-sector reforms',
    'Unit 4 — Legal Aspects of Business: Companies Act 2013 (incl. 2017 Amendment); contract law — formation, consideration, performance, discharge, breach, quasi-contracts; special contracts — indemnity, guarantee, agency, bailment, pledge; sale of goods; Consumer Protection Act 2019; digital-economy law — e-contracts, cyber law, DPDP Act, payment regulations',
    'Unit 5 — Intellectual Property Rights: trademarks, patents, copyright & neighbouring rights, plant variety protection, traditional knowledge, biodiversity, geographical indications',
  ],
  books: [
    { title: 'Company Law & Secretarial Practice', author: 'N.D. Kapoor — S. Chand' },
    { title: 'Business Law', author: 'M.C. Kuchal' },
    { title: 'Business Environment and Policy', author: 'Francis Cherunilam — Himalaya Publishing' },
    { title: 'Indian Economy', author: 'Gaurav Datt & Ashwani Mahajan — S. Chand' },
    { title: 'Legal Aspects of Business', author: 'Akhileshwar Pathak — McGraw Hill' },
  ],
  lectures: [
    /* ─────────── LECTURE 1 (Unit 1 · FULL) ─────────── */
    {
      slug: 'business-environment-foundations',
      number: 1,
      title: 'Business Environment: Micro, Macro & the Startup Legal Layer',
      minutes: 40,
      summary:
        'The nature and structure of the business environment, the micro/macro and economic/non-economic classifications, the interaction matrix that ties them together, environment scanning as a management discipline, and the legal runway for startups — DPIIT recognition, IPR fast-track and fundraising law.',
      status: 'live',
      objectives: [
        'Structure the environment into micro/task and macro/remote rings with examples',
        'Separate economic from non-environmental forces and explain their interaction',
        'Use the environment interaction matrix to trace a policy shock to firm-level impact',
        'Map the startup legal journey: incorporation → DPIIT → IPR → fundraising compliance',
      ],
      sections: [
        {
          heading: '1. What "environment" means for a manager',
          body: [
            'The business environment is the sum of all forces — internal and external — that influence a firm\'s choices and outcomes. The working distinction: **micro (task) environment** forces touch the firm daily and are partially negotiable — customers, suppliers, competitors, lenders, employees, regulators the firm actually meets. **Macro (remote/general) environment** forces act on ALL firms indirectly and are adapted to rather than negotiated — economic (growth, inflation, rates), political-legal, socio-cultural, technological, demographic, and increasingly environmental/green (the PESTLE frame).',
            'Economic vs non-economic: economic forces are measurable money-adjacent variables (GDP, repo rate, GST slabs, FX); non-economic are social values, demographics, technology shifts, legal culture. The two interact relentlessly: an ageing population (demographic, non-economic) reshapes pension liabilities (economic); a data-protection law (legal) changes digital business models (economic).',
          ],
          callout: {
            type: 'exam',
            text: 'Classification traps: "Repo rate change" = macro-economic. "Your biggest supplier demands 30-day payment" = micro. "GST rate on your product" = macro-legal but lands micro through pricing. When asked to classify, name the ring AND the transmission channel to the firm.',
          },
        },
        {
          heading: '2. The environment interaction matrix',
          body: [
            'The interaction matrix reads environmental forces two ways: (a) each force\'s **impact on the firm** (opportunity/threat, scored by severity × probability) and (b) the firm\'s **impact on the force** (influence, usually small for macro, real for micro). Plotting forces on an impact-vs-influence grid sorts strategy: high-impact/low-influence forces get monitoring and adaptation; high-impact/high-influence ones get lobbying, alliances and contracts.',
            'Scanning discipline: PESTLE checklist → early-warning indicators per force (e.g., rate decisions, draft regulations, commodity indices) → scenario framing → strategy response. The point is not prediction but **preparation lag reduction**: the firm that read the plastic ban draft six months early redesigned packaging while rivals drafted objections.',
          ],
          bullets: [
            'Monitor: assign each macro force an owner, two indicators, a review cadence',
            'Assess: severity × probability = exposure score in the matrix',
            'Adapt or act: adapt to low-influence forces; contract/lobby/ally on high-influence ones',
            'Feed strategy: environment inputs belong in every annual plan and every DPR (links to PGDM 301 Unit 1)',
          ],
        },
        {
          heading: '3. The startup legal runway (Unit 1\'s applied core)',
          body: [
            'India\'s startup stack, in order: **incorporation** (Pvt Ltd under Companies Act 2013 — see Unit 4) → **DPIIT recognition** via Startup India (eligibility: ≤ 10 years, ≤ ₹100 cr turnover, innovation-driven, not split from an existing business) → the benefits that actually matter: income-tax holiday (Section 80-IAC, subject to approval), self-certification under labour/environment laws, easier public-procurement norms, and **fast-track IPR** — 80% patent-fee rebate, expedited examination, and free facilitator support for patents and trademarks.',
            'Fundraising law is where young founders stumble: instrument choice (CCPS is the Indian VC standard — see PGDM 301 Unit 2\'s financing stack), valuation report requirements for share issues to residents, FEMA pricing guidelines when foreign money enters (FDI route check: automatic vs approval), and angel-tax documentation hygiene. One line every founder should memorise: compliance is cheaper than a down-round triggered by a messy cap table.',
          ],
          callout: {
            type: 'note',
            text: 'DPIIT recognition ≠ tax exemption. Recognition is automatic-ish and fast; the 80-IAC tax holiday needs a separate inter-ministerial committee approval. Confusing the two is the most common founder error in this unit.',
          },
        },
        {
          heading: '4. From scanning to strategy — the manager\'s loop',
          body: [
            'Close the loop: scanning produces signals; the interaction matrix prioritises them; strategy responds (adapt, hedge, contract, relocate, innovate); monitoring verifies. This loop is why environment study belongs in a PGDM: every specialisation you take — finance (rates, regulation), analytics (privacy law, data localisation), marketing (consumer law) — is applied environment reading.',
          ],
        },
      ],
      diagram: {
        title: 'The environment rings',
        caption:
          'Micro forces are direct and negotiable; macro forces are indirect and to be adapted to. Scanning converts the outer rings into early warnings.',
        svg: envLayersSvg,
      },
      formulas: [
        { name: 'Exposure score', expr: 'Severity (1–5) × Probability (1–5)', meaning: 'Prioritise forces in the interaction matrix' },
        { name: 'Preparation lag', expr: 'Signal date − Response date', meaning: 'The scanning metric that earns its budget' },
      ],
      examples: [
        {
          title: 'Trace a policy shock through the matrix',
          given: ['Draft regulation: 30% recycled-content mandate on plastic packaging within 18 months', 'You run a ₹200 cr FMCG brand'],
          steps: [
            { text: 'Classify', calc: 'Macro-legal (environmental regulation) — firm has low influence, high impact' },
            { text: 'Score exposure', calc: 'Severity 4 (packaging redesign + cost) × Probability 5 (draft already notified) = 20 → top-right of matrix' },
            { text: 'Transmission channels', calc: 'Cost: +8–12% packaging cost · Supply: recyclate availability risk · Marketing: green-claim scrutiny (ASCI + CCPA)' },
            { text: 'Response set', calc: 'Adapt: redesign + supplier contracts · Influence: industry-body representation on timeline · Hedge: price-pack architecture' },
          ],
          answer:
            'A macro-legal force with exposure 20 demands a task force, not a watching brief. Firms that began at draft stage face a manageable engineering problem; those waiting for notification face a supply scramble.',
        },
        {
          title: 'Startup runway sequencing',
          given: ['Two founders, deep-tech idea, plan to raise from an Indian seed fund in 9 months'],
          steps: [
            { text: 'Month 0 — incorporate', calc: 'Pvt Ltd, ESOP pool created at incorporation (cheapest now), founder agreements + vesting in place' },
            { text: 'Month 1 — DPIIT', calc: 'Apply on Startup India portal: recognition unlocks self-certification + IPR fast-lane' },
            { text: 'Months 2–4 — IPR', calc: 'Provisional patent (80% fee rebate) + trademark for brand — creates the defensible asset the seed fund will price' },
            { text: 'Months 5–9 — raise', calc: 'CCPS term sheet; valuation report; FEMA check if any foreign LP money; clean cap table = faster diligence' },
          ],
          answer:
            'Sequenced runway: the IP created months before the raise becomes the valuation anchor, and the legal hygiene compresses diligence from months to weeks.',
        },
      ],
      caseStudy: {
        title: 'Case — The ride-hailing regulatory decade',
        body: [
          'When app-based ride-hailing entered India, it sat in a legal grey zone: motor-vehicle law recognised taxis with permits, not platforms with driver-partners. The macro-legal environment was not hostile — it was silent. For a decade, the interaction between the industry and regulators wrote new law in real time: aggregator guidelines by state, seat-belt and panic-button mandates, commission caps in some cities, and eventually motor-vehicle aggregator rules at the Centre requiring licences and fare transparency.',
          'Each draft was an environment shock: high impact, and — unusually — high influence, because the platforms had users, data and lobbying scale. Firms that treated each draft as a negotiation (adapting product: SOS features, driver-ID display) survived; one global player that treated regulation as illegitimate friction exited the market.',
        ],
        questions: [
          'Place "aggregator licence requirement" on the impact/influence grid for (a) a market leader, (b) a 12-person startup — same force, different cells. Why?',
          'Which scanning indicators would have given a startup each draft 6 months early?',
          'What does this decade teach about "regulation as strategy input" rather than "regulation as tax"?',
        ],
        takeaways: [
          'Grey zones are temporary: law catches up with business models; position for the END state, not the gap',
          'The same environmental force lands differently by firm size — the matrix is firm-specific, not industry-generic',
          'For platforms, regulatory posture IS product strategy (safety features became brand assets)',
        ],
      },
      revision: [
        'Micro/task = direct, negotiable (customers, suppliers, competitors)',
        'Macro/remote = indirect, adapt (PESTLE forces)',
        'Economic forces are measurable money variables; non-economic are social/legal/tech',
        'Interaction matrix: impact on firm × firm\'s influence → monitor / adapt / act',
        'Exposure = severity × probability; assign owners and indicators per force',
        'DPIIT recognition: ≤10 yrs, ≤₹100 cr, innovation test — fast IPR + self-certification',
        '80-IAC tax holiday = separate approval, NOT automatic with DPIIT',
        'Fundraising: CCPS standard, valuation report, FEMA pricing for foreign money',
      ],
      practice: [
        {
          q: 'Classify with ring + channel: (i) RBI repo hike, (ii) your distributor refusing exclusivity, (iii) DPDP Act consent rules.',
          a: '(i) Macro-economic → borrowing cost & demand channel. (ii) Micro — direct negotiating counterpart. (iii) Macro-legal → lands micro via customer-data processes and consent architecture.',
        },
        {
          q: 'Force scored severity 3, probability 4. Another scored 5 and 2. Which gets the task force?',
          a: 'Exposures 12 vs 10 — close. Task force on the 12, but keep a cheap early-warning indicator on the 5×2 force; if its probability firms up to 4 (exposure 20), it leaps the queue.',
        },
        {
          q: 'A DPIIT-recognised startup assumes it pays no income tax for 3 years. Correct it.',
          a: 'Recognition gives process benefits (self-certification, IPR fast-lane). The 80-IAC holiday needs separate inter-ministerial approval and applies only to recognised startups meeting its criteria — apply, don\'t assume.',
        },
        {
          q: 'Why does the environment unit belong in a finance+analytics PGDM at all?',
          a: 'Every model runs on environment inputs: rates (WACC), regulation (compliance cost lines), privacy law (what data analytics may touch), policy incentives (PLI alters project cash flows). Environment reading is upstream of both specialisations.',
        },
        { q: 'Liberalisation removed QRs; a later budget raises customs duty. Contradiction or design?', a: 'Design - liberalisation is a direction, not a treaty. Tariffs remain a live policy lever (anti-dumping, infant industry, revenue), so an open-economy firm still models duty risk in sourcing plans.' },
        { q: 'Rank for a two-wheeler maker: political, technological, social forces - which moves fastest and which cuts deepest?', a: 'Technological moves fastest (BS-VI timelines, EV entry in a few years), social cuts deepest (urban mobility attitudes reshape demand itself). Political sits between: slow to shift, brutal when it does (subsidy swings).' },
      ],
    },

    /* outlines 2–5 */
    {
      slug: 'indian-economy-policies',
      number: 2,
      title: 'Indian Economy: Planning, LPG, Policy Toolkit & ESG',
      minutes: 50,
      summary:
        'Planning evolution to NITI Aayog, the 1991 LPG reform design, industrial policy, monetary & fiscal policy with the Union Budget, Competition Act and CCI including digital markets, BOP and foreign trade policy, and the ESG/green-finance regulation wave.',
      status: 'live',
      objectives: [
        'Narrate planning evolution and the role of NITI Aayog',
        'Explain the 1991 LPG logic and what it changed structurally',
        'Read monetary and fiscal policy like a practitioner',
        'Apply Competition Act thinking to digital markets',
        'Map ESG disclosure obligations and green finance instruments',
      ],
      sections: [
        {
          heading: '1. Planning to NITI Aayog',
          body: [
            'Indian planning ran from the Harrod–Domar-influenced First Plan (1951) through twelve Five-Year Plans: early emphasis on heavy industry and import substitution (Mahalanobis model), Green Revolution and poverty-removal phases, liberalisation beginnings in the 1980s, and the last Plan (2017–22) before the Planning Commission was replaced. The **NITI Aayog** (2015) shifted the state from allocation to strategy: no plan funds to distribute, but indicator frameworks (SDG localisation), competitive federalism indices, and sectoral missions (AIM, aspirational districts). The exam point: NITI is a think tank and coordination platform — states are partners, not plan-recipients.',
          ],
        },
        {
          heading: '2. LPG — the 1991 watershed',
          body: [
            'The 1991 crisis (forex reserves down to ~2 weeks of imports, pledged gold) forced **Liberalisation–Privatisation–Globalisation**: industrial licensing abolished except a short negative list, tariffs slashed from peak 300%+ toward single digits over the decade, the rupee devalued and moved to market determination, FDI opened (51% in many sectors), PSU disinvestment begun, and MRTP\'s size restrictions reframed from dominance to competition. Structural results: services-led growth acceleration, integration into global value chains, and a competitive manufacturing base in pockets. The reform DNA continues in PLI schemes, GST, and IBC — know one continuity example for answers.',
          ],
          bullets: [
            'Industrial policy today: PLI (production-linked incentives), sectoral gates, Make in India — incentives over licensing',
            'Monetary policy: RBI\'s MPC, inflation targeting 4% ± 2%, repo as the single policy rate, transmission via lending rates',
            'Fiscal policy: Union Budget = annual fiscal statement; deficits (fiscal ~5–6% of GDP era, revenue deficit), FRBM discipline, capital vs revenue spending distinction',
          ],
          callout: {
            type: 'exam',
            text: 'Monetary vs fiscal in one line each: monetary = RBI moving the cost of money (repo, CRR, OMOs) to manage inflation and liquidity; fiscal = government moving its own spending and taxes to manage demand. When asked "policy mix", show how a tight-monetary/easy-fiscal combination moves rates and the currency.',
          },
        },
        {
          heading: '3. Competition, trade and ESG',
          body: [
            'The **Competition Act 2002** (replacing MRTP) targets anti-competitive agreements, abuse of **dominance** (dominance itself is not illegal — its abuse is), and combinations (combinations review above thresholds; CCI clearance). Contemporary issues the syllabus names: **digital monopolies** — self-preferencing by platforms, killer acquisitions, data advantages — and the 2023 amendments (deal-value threshold for acquirer-side notifications, control broadened). Know one CCI case for colour (e.g., the Google Android abuse-of-dominance penalty).',
            '**BOP** records goods, services, income and transfers (current account) against capital/financial flows; the trade balance dominates India\'s current account, with services and remittances cushioning. The Foreign Trade Policy (2023 continuum) pushes export credit easing, e-commerce exports, and rupee-trade settlement. **ESG**: SEBI mandates BRSR (Business Responsibility & Sustainability Reporting) for the top listed firms — moving toward assured, core-taxonomy disclosures — while green finance instruments (green/masala bonds, sustainability-linked loans) fund the transition. For a finance-major, ESG disclosure is now valuation input, not ethics decoration.',
          ],
        },
      ],
      formulas: [
        { name: 'Repo transmission', expr: 'Repo ↓ → MCLR/EBLR ↓ → EMI ↓ → demand ↑', meaning: 'The channel every policy question walks through' },
        { name: 'Fiscal deficit', expr: 'Total expenditure − total receipts (excl. borrowings)', meaning: 'Government\'s annual borrowing need' },
        { name: 'Current account', expr: 'Goods + Services + Income + Transfers', meaning: 'BOP\'s earn-spend balance' },
      ],
      examples: [
        {
          title: 'Read a policy move end-to-end',
          given: ['RBI raises repo 50 bps citing inflation above the 6% tolerance band'],
          steps: [
            { text: 'Immediate', calc: 'Lending rates reprice (EBLR linked to repo within a quarter) → EMIs rise' },
            { text: 'Firms', calc: 'WACC rises (F06 L3) → marginal projects (IRR < new hurdle) shelved → capex cools' },
            { text: 'Markets/currency', calc: 'Higher yields attract flows → rupee support; equity valuations compress as discount rates rise' },
          ],
          answer: 'One 50-bps decision travels through household EMIs, corporate hurdle rates and asset prices — environment scanning (L1) with a finance toolkit.',
        },
      ],
      caseStudy: {
        title: 'Case — CCI and the app-store question',
        body: [
          'Developers allege a mobile OS platform abuses dominance: mandatory billing channel, 30% commission, and pre-installs that self-prefer. The platform argues it is not dominant — "users can switch" — and that the store funds OS maintenance. CCI\'s analysis: define the relevant market (OS for app distribution, not "all smartphones"), assess dominance (share + network effects + switching costs), then examine conduct (tying billing to distribution, denial of alternative payment rails). Penalty and remedies follow: allow third-party billing, cease anti-steering.',
          'The digital-economy twist: zero-price markets, data advantages, and ecosystem lock-in strain tools built for cement cartels — hence the 2023 amendment\'s deal-value threshold catching killer acquisitions the turnover test missed.',
        ],
        questions: [
          'Why is "dominance is not illegal" the pivot of the case?',
          'Which conduct would you classify as tie-in vs exclusionary vs exploitative?',
          'How should a startup read deal-value notification thresholds before its next raise?',
        ],
        takeaways: [
          'Competition law protects the process (competition), not competitors',
          'Relevant-market definition decides most digital cases before conduct is examined',
          'For business, antitrust is a design constraint on platform strategy, not a tail risk',
        ],
      },
      revision: [
        'Planning Commission → NITI Aayog (2015): allocation → strategy & cooperative federalism',
        '1991 LPG: de-licensing, tariff cuts, rupee devaluation, FDI opening',
        'Monetary: MPC, 4%±2% target, repo the policy rate; transmission = cost of credit',
        'Fiscal: Budget, fiscal vs revenue deficit, FRBM, capital > revenue spending quality',
        'Competition Act: agreements, abuse of dominance, combinations; CCI + 2023 digital amendments',
        'BOP: current (goods/services/income/transfers) vs capital account; FTP pushes exports',
        'ESG: BRSR disclosure; green/masala bonds; sustainability-linked loans',
      ],
      practice: [
        { q: 'Inflation at 7%. Sketch the monetary-fiscal mix you expect and its growth cost.', a: 'Tight money (repo up) to anchor expectations; fiscal may stay supportive on capex. Cost: rate-sensitive demand (housing, autos) cools; growth slows until inflation returns inside 2–6%.' },
        { q: 'A firm has 60% share. Illegal?', a: 'No — dominance is lawful; abuse of it (denial of access, discriminatory pricing, tying) is. CCI examines conduct, not size.' },
        { q: 'Revenue deficit vs fiscal deficit — which worries a bond investor more and why?', a: 'Revenue deficit (borrowing for consumption) — it worsens debt sustainability without creating assets; a fiscal deficit financing capex is more defensible.' },
        { q: 'Name two BRSR-style disclosures a steel company must get audit-ready.', a: 'GHG emissions (Scope 1/2, moving to value-chain 3) and social/employee metrics; plus governance and value-chain due diligence narratives.' },
        { q: 'Real GDP grows 7 percent, nominal 11 percent. What does the gap tell a CFO?', a: 'Deflator near 4 percent - plan price escalations, wage indexation and working capital accordingly. Real growth is the volume story for capacity; nominal is the rupee story for budgets and covenants.' },
        { q: 'Why did the 1991 crisis force reforms that earlier deficits did not?', a: 'Reserves fell to weeks of imports with a balance-of-payments stall - external illiquidity is the hard stop. Fiscal deficits can be financed for years; a reserves run forces devaluation and policy change within months.' },
      ],
    },
    {
      slug: 'financial-sector-structure',
      number: 3,
      title: 'Financial Sector: RBI, SEBI & the Market Map',
      minutes: 45,
      summary:
        'Money vs capital markets, the institutional map — banks, NBFCs, insurers, mutual funds — RBI\'s toolkit and SEBI\'s mandates, and the reform arc from nationalisation to UPI-era infrastructure.',
      status: 'live',
      objectives: [
        'Map the financial system: markets, instruments, institutions',
        'Separate RBI\'s jurisdiction from SEBI\'s precisely',
        'Explain what banks, NBFCs, insurers and mutual funds each do with savings',
        'Trace the post-1991 and UPI-era reform milestones',
      ],
      sections: [
        {
          heading: '1. The market map',
          body: [
            '**Money market** — short-term (overnight to 1 year): call money, T-bills (91/182/364-day), commercial paper, certificates of deposit, repo. Function: liquidity management for banks and corporates; RBI operates here daily. **Capital market** — long-term: the **primary market** (IPOs, FPOs, rights, private placement — where securities are created) and the **secondary market** (NSE/BSE — where they are priced and exchanged), plus the bond (G-sec + corporate) market. The financial structure question (bank-based vs market-based) matters: India is bank-dominated but market depth is rising fast — a theme your F06 valuation work assumes.',
            '**Institutions**: banks (take deposits, make loans, create payments money), **NBFCs** (lend without banking licences — no demand deposits; vehicle, gold, micro-finance, infra NBFCs; regulated lighter but converged post-IL&FS/DHFL), insurance (life and general; long-term savings pools), mutual funds (collective investment, NAV-priced, SARFAI-era growth in SIP culture), and pension (NPS/EPFO). Each is a channel moving household savings to firms and government — the "financial intermediation" the syllabus wants you to draw.',
          ],
          callout: {
            type: 'exam',
            text: 'RBI vs SEBI in one table row: RBI — monetary policy, banking system, money market, payment systems, G-sec market. SEBI — securities markets (primary + secondary), investors, intermediaries (brokers, MFs, merchant bankers), market abuse. Overlaps exist (corporate bonds, derivatives) — name the primary regulator and the instrument.',
          },
        },
        {
          heading: '2. Reform arc and the new infrastructure',
          body: [
            'Milestones to know in order: bank nationalisation (1969/80) → 1991 Narasimham Committee (capital adequacy, NPA recognition, entry of private banks) → interest-rate deregulation → IRDA (1999) and SEBI strengthening → FRBM (2003) → PCA framework for weak banks → IBC (2016) for credit discipline → UPI (2016 onward) rewiring payments → account aggregator and OCEN as data/rails for credit. The direction of travel: from state allocation to regulated markets, and from branch banking to platform finance.',
            'For the finance major, the sector map is a job map: equity research sits on SEBI\'s side; treasury and credit on RBI\'s; fintech straddles payment rails the RBI governs. For the BA minor, every institution here is a data problem (credit scoring, fraud, persistency analytics — F02 Unit 5 links).',
          ],
          bullets: [
            'Call money = interbank overnight; repo = RBI\'s liquidity injection against collateral',
            'Primary market creates securities (SEBI prospectus discipline); secondary market prices them',
            'NBFCs cannot accept demand deposits; scale came with regulation converging on banks',
          ],
        },
      ],
      formulas: [
        { name: 'Financial deepening', expr: 'Credit to GDP (or market cap to GDP)', meaning: 'How developed the system is' },
        { name: 'Bank creation of money', expr: 'Deposit → loan → redeposit', meaning: 'Why banks are special (and regulated)' },
      ],
      examples: [
        {
          title: 'Route the rupee: saver to borrower',
          given: ['A salaried saver with ₹20,000/month surplus; a mid-size company needing ₹50 cr'],
          steps: [
            { text: 'Bank route', calc: 'Saver\'s deposit → bank lends ₹50 cr term loan; company\'s balance sheet gets debt; saver holds a fixed claim' },
            { text: 'Market route', calc: 'Saver\'s SIP → mutual fund → fund subscribes the company\'s NCD/equity issue; saver holds a market-priced claim' },
            { text: 'Compare', calc: 'Bank: intermediated credit risk, no price risk to saver. Market: saver bears price risk, company gets disintermediated funding' },
          ],
          answer: 'Same savings, different risk routing — the entire financial-system map in one transaction.',
        },
      ],
      diagram: {
        title: 'The financial system map',
        caption: 'Savings flow from households through institutions to users of funds; RBI governs the bank/money side, SEBI the securities side.',
        svg: `<svg viewBox="0 0 720 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Financial system map">
  <defs><marker id="fa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="16" y="90" width="110" height="50" rx="10" fill="#fef9c3"/><text x="71" y="110" fill="#713f12" font-weight="600">Household</text><text x="71" y="126" fill="#713f12">savings</text>
    <rect x="180" y="20" width="130" height="46" rx="10" fill="#e0f2fe"/><text x="245" y="40" fill="#0c4a6e" font-weight="600">Banks / NBFCs</text><text x="245" y="56" fill="#075985">deposits → loans</text>
    <rect x="180" y="92" width="130" height="46" rx="10" fill="#dcfce7"/><text x="245" y="112" fill="#14532d" font-weight="600">Mutual funds</text><text x="245" y="128" fill="#166534">SIPs → securities</text>
    <rect x="180" y="164" width="130" height="46" rx="10" fill="#ede9fe"/><text x="245" y="184" fill="#4c1d95" font-weight="600">Insurers / NPS</text><text x="245" y="200" fill="#5b21b6">long-term pools</text>
    <rect x="380" y="20" width="150" height="46" rx="10" fill="#e0f2fe"/><text x="455" y="40" fill="#0c4a6e" font-weight="600">Money market</text><text x="455" y="56" fill="#075985">T-bills, CP, repo ≤1 yr</text>
    <rect x="380" y="92" width="150" height="46" rx="10" fill="#dcfce7"/><text x="455" y="112" fill="#14532d" font-weight="600">Capital market</text><text x="455" y="128" fill="#166534">equity + bonds, primary/secondary</text>
    <rect x="380" y="164" width="150" height="46" rx="10" fill="#ede9fe"/><text x="455" y="184" fill="#4c1d95" font-weight="600">Payments + data</text><text x="455" y="200" fill="#5b21b6">UPI, AA, bureaus</text>
    <rect x="590" y="92" width="116" height="46" rx="10" fill="#fee2e2"/><text x="648" y="112" fill="#7f1d1d" font-weight="600">Firms + Govt</text><text x="648" y="128" fill="#991b1b">users of funds</text>
    <line x1="126" y1="105" x2="178" y2="55" stroke="#475569" stroke-width="1.5" marker-end="url(#fa)"/>
    <line x1="126" y1="115" x2="178" y2="115" stroke="#475569" stroke-width="1.5" marker-end="url(#fa)"/>
    <line x1="126" y1="128" x2="178" y2="180" stroke="#475569" stroke-width="1.5" marker-end="url(#fa)"/>
    <line x1="310" y1="43" x2="378" y2="43" stroke="#475569" stroke-width="1.5" marker-end="url(#fa)"/>
    <line x1="310" y1="115" x2="378" y2="115" stroke="#475569" stroke-width="1.5" marker-end="url(#fa)"/>
    <line x1="310" y1="187" x2="378" y2="187" stroke="#475569" stroke-width="1.5" marker-end="url(#fa)"/>
    <line x1="530" y1="43" x2="640" y2="90" stroke="#475569" stroke-width="1.5" marker-end="url(#fa)"/>
    <line x1="530" y1="115" x2="588" y2="115" stroke="#475569" stroke-width="1.5" marker-end="url(#fa)"/>
    <line x1="530" y1="187" x2="640" y2="140" stroke="#475569" stroke-width="1.5" marker-end="url(#fa)"/>
    <text x="120" y="212" fill="#0369a1" font-weight="600">RBI regulates banks, money market, payments</text>
    <text x="120" y="226" fill="#166534" font-weight="600">SEBI regulates securities markets and intermediaries</text>
  </g>
</svg>`,
      },
      caseStudy: {
        title: 'Case — IL&FS: when the shadow bank casts one',
        body: [
          'IL&FS was an infrastructure financier and NBFC with ₹91,000 cr of debt funding long-gestation road and power assets. In September 2018 a subsidiary defaulted, and group entities began defaulting in cascade. Money-market funding to the entire NBFC sector froze overnight.',
          'Banks had lent to IL&FS directly and to other NBFCs; mutual funds held commercial paper. Real-estate and vehicle finance slowed nationally — a liquidity event transmitted into the real economy without a single bank failing.',
        ],
        questions: [
          'Why did one default freeze funding to the whole sector?',
          'Which regulator owned which piece of the problem?',
          'What structural fixes followed?',
        ],
        takeaways: [
          'Maturity transformation (short CP funding 15-year assets) plus opacity (SPVs layered on SPVs) made risk unpriceable — lenders fled the class, not the company',
          'RBI regulated the NBFCs and banks; SEBI the mutual funds holding the paper; resolution went to NCLT under IBC — the sector map in action',
          'Fixes: RBI scale-based NBFC regulation, liquidity-risk buffers, and tighter CP norms — regulation converging on bank-like supervision',
          'For analysts: never read an NBFC balance sheet without an asset-liability maturity ladder — F06 Unit 5 makes this a modelling exercise',
        ],
      },
      revision: [
        'Money market ≤ 1 yr (call, T-bills, CP, CD, repo); capital market beyond',
        'Primary creates; secondary prices; NSE/BSE + G-sec/corporate bonds',
        'RBI: monetary, banks, money market, payments. SEBI: securities, investors, intermediaries',
        'NBFCs lend but take no demand deposits',
        'Reforms: Narasimham \'91 → IRDA \'99 → IBC 2016 → UPI → account aggregator',
        'Bank-based vs market-based system — India bank-heavy, markets deepening',
      ],
      practice: [
        { q: 'Company issues 5-year NCDs. Which regulator\'s rulebook dominates and why?', a: 'SEBI (issue and disclosure) with RBI norms for eligible investors and listing of debt; if placed with banks, RBI\'s investment norms also bite — but the issuance discipline is SEBI\'s.' },
        { q: 'Why does an NBFC crisis transmit to banks?', a: 'Banks fund NBFCs (market borrowings + credit lines); an NBFC asset-quality shock freezes its refinancing, banks carry the exposure, and credit to the NBFC\'s borrowers (SMEs, vehicles) seizes — the 2018 IL&FS sequence.' },
        { q: 'One structural effect of UPI beyond convenience.', a: 'It moved payments off card networks\' rails into public infrastructure, cutting merchant costs and enabling small-ticket credit data trails — rails first, lending on top.' },
        { q: 'Your broker says: equity for the 3-year goal, debt for the 15-year goal. Correct the advice.', a: 'Inverted. Equity earns its risk premium over LONG horizons - 3-year money should sit in debt or liquid funds; 15-year compounding belongs in equity. Horizon-risk matching is allocation\'s first law.' },
        { q: 'SARFAESI lets a bank seize collateral without court interference. Why does that matter for loan pricing?', a: 'Faster, cheaper recovery raises the recovery rate, which cuts loss-given-default, which narrows spreads. Recovery law is credit pricing by another name - legal infrastructure moves lending rates.' },
      ],
    },
    {
      slug: 'contracts-and-business-law',
      number: 4,
      title: 'Contracts, Companies & the Digital-Economy Law',
      minutes: 55,
      summary:
        'Contract formation to breach, quasi-contracts, indemnity/guarantee/agency/bailment, sale of goods, Companies Act 2013 essentials, Consumer Protection Act 2019, and e-contracts, cyber law and DPDP.',
      status: 'live',
      objectives: [
        'Test a contract\'s validity element by element (offer → legality)',
        'Distinguish indemnity, guarantee, agency and bailment precisely',
        'Run the Companies Act 2013 essentials: incorporation, directors, fiduciary duties',
        'Apply CPA 2019 and DPDP 2023 to digital-business scenarios',
      ],
      sections: [
        {
          heading: '1. The Contract Act spine',
          body: [
            'Section 2(h): an agreement enforceable by law. Work every dispute through the elements in order: **offer** (proposal, communicated, distinguishable from invitation to treat — a price list or an IPO prospectus is not an offer), **acceptance** (absolute and unqualified, while the offer lives), **consideration** (Section 2(d) — something of value at the desire of the promisor; past consideration is good in India), **capacity** (majority, sound mind, not disqualified), **free consent** (Section 14 — coercion, undue influence, fraud, misrepresentation, mistake void/vary the contract), **lawful object**, **certainty**, and **intention to create legal relations** (social/domestic arrangements fail here).',
            'Breach and remedies: **damages** (Section 73 — compensate the loss that flowed naturally; *Hadley v Baxendale* remoteness), **specific performance** (court orders performance — rare, for unique land/rare goods), **injunction**, quantum meruit. Quasi-contracts (Sections 68–72) — law forces payment where none was promised: necessaries to incapacitated persons, non-gratuitous acts, money paid by mistake. **Indemnity** (2 parties: indemnifier/indemnity-holder) vs **guarantee** (3 parties: creditor, principal debtor, surety — "pay if he doesn\'t"; surety\'s right of subrogation). **Agency**: agent binds the principal; agency by express appointment, ratification, implication, necessity. **Bailment**: delivery of goods for a purpose with return — pledge is bailment as security.',
            '**Sale of Goods Act 1930**: conditions (essential — breach rescinds) vs warranties (minor — damages only); caveat emptor with its exceptions (merchantable quality, usage of trade, consent by fraud); risk passes with property, not with possession.',
          ],
          callout: {
            type: 'exam',
            text: 'Mini-scenario drills are the exam format. Method: (1) is there an offer or invitation to treat? (2) acceptance communicated? (3) consideration? (4) capacity and free consent? (5) lawful object? Then classify: valid / voidable (consent defects) / void (unlawful object, impossibility) / unenforceable. State the section number for at least the big five.',
          },
        },
        {
          heading: '2. Companies Act 2013 and the digital layer',
          body: [
            '**Companies Act 2013**: incorporation (SPICe+, memorandum & articles, doctrine of indoor management protects outsiders), separate legal personality with **limited liability** and **piercing the veil** exceptions (fraud, sham, agency), the board (director fiduciary duties codified in Sections 166 — act in good faith, avoid conflicts), independent directors, audit committee, related-party transactions (Section 188), class actions (Section 245), and NCLT as the forum. For a finance professional this is the plumbing of every deal: charges, share capital, buy-backs, and the SEBI Listing Regulations sitting on top for listed companies.',
            '**Consumer Protection Act 2019**: product and service defects, deficiency in service, unfair and restrictive trade practices; **CDRs at district/state/national** commissions; e-commerce and direct-selling and misleading-ads provisions; product liability for harm. **Digital layer**: IT Act 2000 (legal recognition of e-records, Section 43 penalties for unauthorized access, 66C/66D identity theft/cheating by personation), electronic contracts (click-wrap; Section 10A validity), and the **DPDP Act 2023** — consent/notice basis, data-fiduciary duties, significant data fiduciaries, data-principal rights (access, correction, erasure), penalties up to ₹250 cr for security failures. Payment and closing regulation (RBI/SEBI) completes the map.',
          ],
          bullets: [
            'Void ab initio (unlawful) vs voidable at the option of the aggrieved party (coercion, fraud)',
            'Damages compensate; they do not punish (penalties only where expressly stipulated)',
            'Guarantee = 3 parties; indemnity = 2; surety steps into the creditor\'s shoes on payment',
            'DPDP: consent must be free, specific, informed, unambiguous, withdrawable',
          ],
        },
      ],
      diagram: {
        title: 'Contract validity gate',
        caption: 'Validity gate: every contract walks this line',
        svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Contract validity flowchart">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="8" y="20" width="96" height="34" rx="8" fill="#e0f2fe"/><text x="56" y="41" fill="#0c4a6e">Offer</text>
    <rect x="120" y="20" width="96" height="34" rx="8" fill="#e0f2fe"/><text x="168" y="41" fill="#0c4a6e">Acceptance</text>
    <rect x="232" y="20" width="104" height="34" rx="8" fill="#e0f2fe"/><text x="284" y="41" fill="#0c4a6e">Consideration</text>
    <rect x="352" y="20" width="96" height="34" rx="8" fill="#e0f2fe"/><text x="400" y="41" fill="#0c4a6e">Capacity</text>
    <rect x="464" y="20" width="104" height="34" rx="8" fill="#e0f2fe"/><text x="516" y="41" fill="#0c4a6e">Free consent</text>
    <rect x="584" y="20" width="128" height="34" rx="8" fill="#e0f2fe"/><text x="648" y="41" fill="#0c4a6e">Lawful object</text>
    <line x1="104" y1="37" x2="118" y2="37" stroke="#475569" stroke-width="1.5" marker-end="url(#ar)"/>
    <line x1="216" y1="37" x2="230" y2="37" stroke="#475569" stroke-width="1.5" marker-end="url(#ar)"/>
    <line x1="336" y1="37" x2="350" y2="37" stroke="#475569" stroke-width="1.5" marker-end="url(#ar)"/>
    <line x1="448" y1="37" x2="462" y2="37" stroke="#475569" stroke-width="1.5" marker-end="url(#ar)"/>
    <line x1="568" y1="37" x2="582" y2="37" stroke="#475569" stroke-width="1.5" marker-end="url(#ar)"/>
    <line x1="648" y1="54" x2="648" y2="86" stroke="#475569" stroke-width="1.5" marker-end="url(#ar)"/>
    <rect x="470" y="88" width="356" height="0" fill="none"/>
    <rect x="300" y="88" width="180" height="34" rx="17" fill="#dcfce7"/><text x="390" y="109" fill="#14532d">VALID — enforceable</text>
    <line x1="648" y1="71" x2="392" y2="88" stroke="#475569" stroke-width="1.5" marker-end="url(#ar)"/>
    <line x1="390" y1="88" x2="220" y2="160" stroke="#475569" stroke-width="1.5" marker-end="url(#ar)" transform="translate(0,20)"/>
    <rect x="90" y="186" width="150" height="34" rx="17" fill="#fef9c3"/><text x="165" y="207" fill="#713f12">VOIDABLE (S.19)</text>
    <rect x="270" y="186" width="150" height="34" rx="17" fill="#fee2e2"/><text x="345" y="207" fill="#7f1d1d">VOID (S.23/24)</text>
    <rect x="450" y="186" width="160" height="34" rx="17" fill="#fee2e2"/><text x="530" y="207" fill="#7f1d1d">UNENFORCEABLE</text>
    <text x="165" y="240" fill="#475569">consent defects</text>
    <text x="345" y="240" fill="#475569">unlawful / impossible</text>
    <text x="530" y="240" fill="#475569">no legal intent</text>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'Remoteness rule (S.73)', expr: 'Damages = loss arising naturally OR in the contemplation of both parties', meaning: 'Cap on recoverable loss' },
        { name: 'Guarantee liability', expr: 'Surety liable only on principal debtor\'s default', meaning: 'Secondary, not primary liability' },
      ],
      examples: [
        {
          title: 'Scenario drill: five quick verdicts',
          given: [
            'A minor buys a motorcycle on credit',
            'A shop displays "Laptop ₹45,000" in the window; B says "I accept"',
            'C signs a supply contract after D threatens to expose an old affair',
            'E promises, in writing, to pay F\'s debt to G if F doesn\'t',
            'An app\'s terms are accepted by a single "I agree" click before install',
          ],
          steps: [
            { text: 'Minor', calc: 'Void — no capacity (Mohori Bibee); but necessaries → quasi-contract liability for reimbursement' },
            { text: 'Window display', calc: 'Invitation to treat, not an offer — no contract; the customer would make the offer at the counter' },
            { text: 'Threat', calc: 'Coercion (S.15) — contract voidable at C\'s option; restitution on rescission' },
            { text: 'E/F/G', calc: 'Three parties → guarantee (S.126); E is surety, liable only on F\'s default, then subrogated' },
            { text: 'Click-wrap', calc: 'Valid e-contract (IT Act s.10A) if terms were noticeably available pre-click; browse-wrap is weaker' },
          ],
          answer: 'Element-by-element testing resolves all five — exactly the exam pattern and the diligence pattern.',
        },
        {
          title: 'DPDP mini-audit of a loan app',
          given: ['A lending app collects contacts, location and repayment data; shares a score with two bureaus'],
          steps: [
            { text: 'Purpose limitation', calc: 'Contacts/location collected? Must serve a notified, consented purpose — blanket collection fails' },
            { text: 'Notice + consent', calc: 'Itemised notice in English/Indian languages; free, specific, withdrawable consent before processing' },
            { text: 'Sharing', calc: 'Bureaus are data processors — contractual obligations, breach notice to the Board and the data principal' },
            { text: 'Rights', calc: 'Grievance officer, access/correction/erasure workflows; children\'s data and tracking prohibitions apply' },
          ],
          answer: 'A compliance gap in any of the four is a penalty exposure (up to ₹250 cr for security failures) — this is the new baseline for analytics teams.',
        },
      ],
      caseStudy: {
        title: 'Case — Guarantee or indemnity: the bank\'s drafting error',
        body: [
          'A bank lends ₹2 cr to a company. The promoter signs a letter reading "I will make good any loss the bank suffers on this facility." The company defaults; the bank sues the promoter for the full ₹2 cr. The promoter argues the letter is a guarantee and the bank never first exhausted remedies against the company — and gave the company extra time without his consent.',
          'Counsel disagree on the instrument. The bank relies on the words "any loss the bank suffers"; the promoter relies on the presence of a principal debtor and the bank\'s forbearance.',
        ],
        questions: [
          'Is the letter an indemnity or a guarantee?',
          'Does the extension of time discharge the promoter?',
          'What drafting change removes the ambiguity?',
        ],
        takeaways: [
          'Two parties (bank/promoter) and "make good your loss" language → indemnity (S.124), not guarantee — the promisor is primarily liable on default, no prior exhaustion needed',
          'But if construed as a guarantee, S.135–137 variations without the surety\'s consent would discharge him — the bank drafted itself into a fight',
          'Fix: explicit "irrevocable and unconditional personal guarantee" clause, consent-to-extension carve-out, and a separate indemnity clause',
          'Lesson: the 2-vs-3 party distinction is not academic — it decides who pays when the drafting is loose',
        ],
      },
      revision: [
        'Agreement = offer + acceptance; contract = agreement + enforceability (2h)',
        'Consideration: past consideration valid in India; no consideration → no contract except S.25 exceptions',
        'Coercion/fraud/misrepresentation → voidable; unlawful object → void',
        'Damages are compensatory, remoteness per Hadley; specific performance for unique subject-matter',
        'Quasi-contracts (68–72) — restitution without agreement',
        'Indemnity 2 parties; guarantee 3; bailment = goods delivered; pledge = bailment for security',
        'Condition breach → rescind; warranty breach → damages only',
        'Companies Act: separate personality, S.166 fiduciary duties, NCLT forum',
        'CPA 2019: deficiency, product liability, three-tier commissions',
        'DPDP 2023: consent notice, fiduciary duties, erasure rights, ₹250 cr penalties',
      ],
      practice: [
        { q: 'A tender submission is withdrawn before the deadline. Offer or breach?', a: 'A tender is generally an offer the acceptor may keep open only per its terms; withdrawal before acceptance kills the offer — no breach unless a firm, irrevocable bid bond contract says otherwise.' },
        { q: 'Money is transferred to your account by mistake and spent. Liability?', a: 'Quasi-contract, S.72 — money paid by mistake must be repaid regardless of agreement; spending it is no defence.' },
        { q: 'Your analytics vendor scrapes public profiles to build a credit model. DPDP view?', a: 'Personal data still needs a lawful basis; "publicly available" is not consent — a notified purpose with itemised notice and grievance channel, or proper anonymisation, is required.' },
        { q: 'A supplier email says: ship 500 units at Rs 90, we can discuss price. Is a contract formed?', a: 'Arguably no - \'we can discuss\' signals the price term is not settled, so no consensus ad idem on essential terms. Vague-but-agreed prices can bind (reasonable price), but explicit openness to renegotiation undermines certainty.' },
        { q: 'Which remedies need no proof of loss, and why do parties negotiate them hardest?', a: 'Liquidated damages - pre-agreed sums payable on breach. They remove the burden of quantifying loss, so they are set (and capped) at signing: the negotiation IS the risk allocation.' },
      ],
    },
    {
      slug: 'intellectual-property-rights',
      number: 5,
      title: 'IPR: Trademarks, Patents, Copyright & GI',
      minutes: 40,
      summary:
        'The full IP map — trademarks, patents, copyright and neighbouring rights, plant variety, traditional knowledge, biodiversity, geographical indications — with Indian filing basics and business strategy.',
      status: 'live',
      objectives: [
        'Choose the right IP instrument for a given asset',
        'Test patentability: novelty, inventive step, industrial application',
        'Run a trademark clearance: classes, search, distinctiveness',
        'Explain GI and traditional-knowledge protection with Indian examples',
      ],
      sections: [
        {
          heading: '1. Patents and copyright',
          body: [
            '**Patents Act 1970**: protect inventions — products or processes that are **new** (not in the public domain anywhere), **inventive** (non-obvious to a person skilled in the art), and **capable of industrial application**. Exclusions (S.3) matter as much as the test: mathematical/business methods, computer programs per se, algorithms are not patentable in India — protect those with copyright + trade secret. Term **20 years**, renewal fees; first-to-file; **Compulsory licensing** (S.84, post-Natpharma/TRIPS flexibilities) for public-health and export cases; ever-greening blocked (Novartis/Glivec). filing flow: provisional → complete specification → publication → examination → pre-grant opposition → grant.',
            '**Copyright Act 1957**: protects original expression, not ideas (idea–expression dichotomy). Owner\'s rights: reproduction, adaptation, translation, communication to the public, rental. Term: lifetime of the author **+ 60 years** (India). Software is protected as a literary work; databases by compilation copyright. Fair dealing (S.52) covers research, review, reporting. The AI-era questions: training-data copying is reproduction, style is not protected, prompts alone confer no authorship — India follows a human-author orientation.',
          ],
          callout: {
            type: 'exam',
            text: 'Match instrument to asset in one line each: invention → patent; brand/sign → trademark; expression → copyright; industrial design (shape, config) → Designs Act; plant variety → PPVFR; place-bound craft → GI; secret method (Coca-Cola formula) → trade secret (contract, not statute).',
          },
        },
        {
          heading: '2. Trademarks, GI and traditional knowledge',
          body: [
            '**Trade Marks Act 1999**: any mark capable of graphical representation distinguishing goods/services — words, logos, shapes, sounds, even colour combinations. Requirements: **distinctiveness** (inherent or acquired through use), not descriptive, not deceptive, not confusingly similar to an earlier mark. **Nice classification: 45 classes** (34 goods, 11 services) — a fintech files class 36 (financial), 9 (software), 42 (SaaS). Registration flow: search (IPR Class 3 → TM database) → filing → examination → **opposition window** → registration; term **10 years, renewable indefinitely**; well-known marks get protection beyond their class; infringement and passing-off (common-law remedy for the unregistered). Use it or lose it: non-use for 5 years invites removal.',
            '**GI (Geographical Indications Act 1999)**: protects a name tied to a place and its qualities — **Darjeeling tea, Channapatna toys, Kancheepuram silk, Basmati, Alphonso mango**. Key logic: collective, community-owned, non-transferable (unlike a trademark which can be assigned) — a registered GI authorisation is given to authorised producers in the region. **PPVFR** protects plant varieties and farmers\' rights (farmers can save seed). **Biological Diversity Act 2002** governs access to Indian bio-resources and benefit-sharing. **TKDL (Traditional Knowledge Digital Library)** — a defensive publication database that stopped turmeric/neem patents abroad by placing prior art in searchable form; it protects by *preventing* bad patents rather than granting rights.',
          ],
          bullets: [
            'Patent: 20 yrs, first-to-file, S.3 exclusions (software per se, business methods)',
            'Trademark: 10 yrs renewable, 45 classes, distinctiveness is the battleground',
            'Copyright: life + 60; expression not ideas; S.52 fair dealing',
            'GI: collective, non-assignable, place-bound',
            'Trade secrets: protection by contract and NDA, no term limit',
          ],
        },
      ],
      diagram: {
        title: 'The IP instrument map',
        caption: 'Which instrument protects what',
        svg: `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="IP instrument map">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="20" y="16" width="150" height="46" rx="10" fill="#ede9fe"/><text x="95" y="36" fill="#4c1d95" font-weight="600">Invention</text><text x="95" y="52" fill="#5b21b6">method / product</text>
    <rect x="20" y="76" width="150" height="46" rx="10" fill="#e0f2fe"/><text x="95" y="96" fill="#0c4a6e" font-weight="600">Brand / sign</text><text x="95" y="112" fill="#075985">word, logo, sound</text>
    <rect x="20" y="136" width="150" height="46" rx="10" fill="#dcfce7"/><text x="95" y="156" fill="#14532d" font-weight="600">Expression</text><text x="95" y="172" fill="#166534">code, art, writing</text>
    <rect x="20" y="196" width="150" height="38" rx="10" fill="#fef9c3"/><text x="95" y="219" fill="#713f12">Secret method</text>
    <rect x="260" y="16" width="170" height="46" rx="10" fill="#ede9fe"/><text x="345" y="36" fill="#4c1d95" font-weight="600">PATENT</text><text x="345" y="52" fill="#5b21b6">20 yrs — S.3 exclusions</text>
    <rect x="260" y="76" width="170" height="46" rx="10" fill="#e0f2fe"/><text x="345" y="96" fill="#0c4a6e" font-weight="600">TRADEMARK</text><text x="345" y="112" fill="#075985">10 yrs × ∞, 45 classes</text>
    <rect x="260" y="136" width="170" height="46" rx="10" fill="#dcfce7"/><text x="345" y="156" fill="#14532d" font-weight="600">COPYRIGHT</text><text x="345" y="172" fill="#166534">life + 60 yrs</text>
    <rect x="260" y="196" width="170" height="38" rx="10" fill="#fef9c3"/><text x="345" y="219" fill="#713f12">TRADE SECRET — NDA</text>
    <line x1="170" y1="39" x2="258" y2="39" stroke="#475569" stroke-width="1.5"/>
    <line x1="170" y1="99" x2="258" y2="99" stroke="#475569" stroke-width="1.5"/>
    <line x1="170" y1="159" x2="258" y2="159" stroke="#475569" stroke-width="1.5"/>
    <line x1="170" y1="215" x2="258" y2="215" stroke="#475569" stroke-width="1.5"/>
    <rect x="480" y="16" width="220" height="46" rx="10" fill="#ffe4e6"/><text x="590" y="36" fill="#881337" font-weight="600">DESIGN — shape, 15 yrs</text><text x="590" y="52" fill="#9f1239">aesthetic, not functional</text>
    <rect x="480" y="76" width="220" height="46" rx="10" fill="#ffe4e6"/><text x="590" y="96" fill="#881337" font-weight="600">GI — place-bound</text><text x="590" y="112" fill="#9f1239">collective, non-assignable</text>
    <rect x="480" y="136" width="220" height="46" rx="10" fill="#ffe4e6"/><text x="590" y="156" fill="#881337" font-weight="600">PPVFR — plant varieties</text><text x="590" y="172" fill="#9f1239">farmers can reuse seed</text>
    <rect x="480" y="196" width="220" height="38" rx="10" fill="#ffe4e6"/><text x="590" y="219" fill="#881337">TKDL — defensive prior art</text>
    <line x1="430" y1="39" x2="478" y2="39" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3"/>
    <line x1="430" y1="99" x2="478" y2="99" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3"/>
    <line x1="430" y1="159" x2="478" y2="159" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3"/>
    <line x1="430" y1="215" x2="478" y2="215" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3"/>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'Patentability test', expr: 'Novel + inventive step + industrial application − S.3/S.4 exclusions', meaning: 'All three prongs, no exclusion' },
        { name: 'Trademark strength ladder', expr: 'Coined > arbitrary > suggestive > descriptive > generic', meaning: 'Left side registrable; right side not' },
      ],
      examples: [
        {
          title: 'Clear a fintech brand in 6 steps',
          given: ['Startup "PayNest" building a UPI-linked savings app'],
          steps: [
            { text: 'Identify classes', calc: '9 (app software), 36 (financial services), 42 (SaaS platform)' },
            { text: 'Search', calc: 'TM database for identical + phonetic near-matches (PayNext, PayNesst) in those classes' },
            { text: 'Distinctiveness', calc: '"Pay" is descriptive of payment; "Nest" is suggestive — combined mark likely registrable with a disclaimer on "Pay"' },
            { text: 'File + prosecute', calc: 'File → examination report → response → publication → 4-month opposition window → registration' },
            { text: 'Maintain', calc: 'Use continuously; renew every 10 years; watch for confusion; record assignments' },
          ],
          answer: 'A clearance search before branding costs a fraction of a rebrand after an infringement notice.',
        },
        {
          title: 'Patent or not: the algorithm question',
          given: ['A team builds a fraud-scoring algorithm using a new ensemble method on transaction streams'],
          steps: [
            { text: 'S.3(k)', calc: 'A mathematical method / computer program per se is excluded from patenting in India' },
            { text: 'Hardware tie', calc: 'If the claim is to a technical contribution — novel data structure tied to a specific fraud-detection apparatus — it may survive; a pure formula will not' },
            { text: 'Alternatives', calc: 'Copyright the code, keep the weights/features as a trade secret, patent the process only if genuinely technical' },
          ],
          answer: 'For most analytics IP in India, trade secret + copyright is the practical stack — patents for the apparatus, not the arithmetic.',
        },
      ],
      caseStudy: {
        title: 'Case — Darjeeling tea: the GI playbook',
        body: [
          'By the 1990s "Darjeeling" was being used on tea grown elsewhere (Japan, France), free-riding on a century of reputation built by ~87 gardens and their workers. The Tea Board moved to protect the name under the GI Act.',
          'Enforcement shifted from arguing generic reputation to asserting a registrable right: customs recordal, oppositions abroad, and certification of genuine Darjeeling output — roughly 10,000 tonnes a year against a world market that had been selling multiples of that as "Darjeeling".',
        ],
        questions: [
          'Why is a trademark the wrong tool and a GI the right one?',
          'How does registration change enforcement?',
          'Who owns the benefit?',
        ],
        takeaways: [
          'A trademark is individual and assignable; the name belongs to a place and community — the GI is collective and cannot be transferred',
          'Authorised producers in the region get the benefit; the Tea Board administers the logo and certification — the governance model Channapatna toys, Kancheepuram silk and Basmati followed',
          'Strategic lesson: IP is not only a legal object but a development tool — community rights, pricing power, export credibility',
          'Same logic scales down: a startup\'s brand (trademark) and a region\'s craft (GI) are different assets with different instruments',
        ],
      },
      revision: [
        'Patent: 20 yrs, novelty + inventive step + industrial application, S.3 exclusions, compulsory licensing (S.84)',
        'Trademark: 45 classes, 10-yr renewable terms, distinctiveness ladder, non-use removal after 5 yrs',
        'Copyright: life + 60, expression not idea, S.52 fair dealing, software = literary work',
        'Designs Act: aesthetic shape/config, 15 yrs',
        'GI: collective, non-assignable — Darjeeling, Channapatna, Kancheepuram, Basmati',
        'PPVFR: farmers\' seed-saving rights; Biodiversity Act: benefit-sharing',
        'TKDL: defensive publication defeating foreign patents on neem/turmeric',
        'Trade secret: perpetual if kept — contract is the protection',
      ],
      practice: [
        { q: 'A rival launches "PayNest+" with a near-identical nest logo. Remedies?', a: 'Infringement suit if registered (deceptively similar, same class); passing-off if unregistered (reputation + misrepresentation + damage); interim injunction plus damages/accounts.' },
        { q: 'Your team fine-tunes an LLM on licensed articles. Copyright exposure?', a: 'Copying in training is reproduction; licensed use may or may not cover training — check the licence; outputs substantially similar to source works can infringe; get indemnities and filter outputs.' },
        { q: 'Can a farmer replant patented-adjacent seed?', a: 'Under PPVFR, farmers may save, use, sow, exchange farm seed including protected varieties (research and farmers\' exemption); they cannot commercially brand-sell the variety as their own.' },
        { q: 'A rival registers your brand logo\'s name as a domain and trademark in another class. Options?', a: 'Oppose the registration (prior use, deceptive similarity), claim passing-off goodwill, pursue UDRP for bad-faith domain, and file your own marks in adjacent classes. Speed matters - IP rights favour the vigilant.' },
        { q: 'Why is a trade secret sometimes smarter than a patent?', a: 'Patents disclose the invention and expire (20 years); secrets (formula, process, client method) last indefinitely if guarded - Coca-Cola chose secrecy. Patent what competitors could reverse-engineer; keep truly hidden things hidden.' },
      ],
    },
  ],
};
