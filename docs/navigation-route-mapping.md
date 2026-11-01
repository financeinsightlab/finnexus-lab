# KunwarAnalytics — Complete Navigation & Route Mapping
**Architecture Version:** 2.0  
**Repository:** `financeinsightlab/finnexus-lab`  
**Preservation Rule:** 100% of existing routes preserved.

---

## Complete Route Mapping Table

| Route Pattern | Primary Hub | Cluster / Section | Display Title | Breadcrumb Path | Access Tier |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Home | Public Portal | Kunwar Analytics — Financial Intelligence | Home | Public |
| `/research` | Research | Overview | Financial Research Library | Home > Research | Public |
| `/research/[slug]` | Research | Reports | [Report Title] | Home > Research > [Report Title] | Public / Pro |
| `/insights` | Research | Insights | Executive Strategy Notes | Home > Research > Insights | Public |
| `/insights/[slug]` | Research | Insights | [Insight Title] | Home > Research > Insights > [Title] | Public |
| `/data-lab` | Research | Data Lab | Reproducible Data Projects | Home > Research > Data Lab | Public |
| `/data-lab/[slug]` | Research | Data Lab | [Project Title] | Home > Research > Data Lab > [Project] | Public |
| `/case-studies` | Research | Case Studies | Corporate Case Studies | Home > Research > Case Studies | Public |
| `/case-studies/[slug]` | Research | Case Studies | [Case Study Title] | Home > Research > Case Studies > [Title] | Public |
| `/projects` | Research | Projects | Portfolio of Analytics Projects | Home > Research > Projects | Public |
| `/tools` | Tools | Overview | Financial Modelling & Analytics Hub | Home > Tools | Public |
| `/tools/[slug]` | Tools | Calculators | [Calculator / Model Name] | Home > Tools > [Tool Name] | Public / Pro |
| `/company` | Tools | Company Intel | Company Intelligence Platform | Home > Tools > Company Intelligence | Public / Pro |
| `/company/[symbol]` | Tools | Company Intel | [Company Symbol] Intelligence | Home > Tools > Company > [Symbol] | Public / Pro |
| `/startup-financials` | Tools | Startup | Startup Financials & Runway Engine | Home > Tools > Startup Financials | Pro / Elite |
| `/financial-intelligence` | Tools | Intelligence | Financial Intelligence & Data Pipeline | Home > Tools > Financial Intelligence | Enterprise / Admin |
| `/markets` | Markets | Overview | Global Financial Markets Terminal | Home > Markets | Public |
| `/markets/india` | Markets | Equities | Indian Equities & Indices | Home > Markets > Indian Equities | Public |
| `/markets/stocks` | Markets | Screener | Institutional Stock Screener | Home > Markets > Stock Screener | Public |
| `/markets/sector-heatmap` | Markets | Heatmap | Visual Sector Heatmap | Home > Markets > Sector Heatmap | Public |
| `/markets/forex` | Markets | Macro | Forex & Currency Cross-Rates | Home > Markets > Forex | Public |
| `/markets/commodities` | Markets | Macro | Commodities & Energy Board | Home > Markets > Commodities | Public |
| `/markets/bonds` | Markets | Macro | Sovereign Bond Yields & Spreads | Home > Markets > Bonds | Public |
| `/markets/derivatives` | Markets | Derivatives | Derivatives, Options Chain & FII/DII | Home > Markets > Derivatives | Public |
| `/markets/economy` | Markets | Macro | Macro Economic Indicators | Home > Markets > Macro Economy | Public |
| `/markets/calendar` | Markets | Macro | Global Economic Calendar | Home > Markets > Economic Calendar | Public |
| `/markets/news` | Markets | Intelligence | Market News Wire | Home > Markets > News Wire | Public |
| `/markets/company/[symbol]` | Markets | Equities | [Symbol] Market Terminal | Home > Markets > Company > [Symbol] | Public |
| `/tracker` | Markets | Intelligence | Sector KPI Trackers | Home > Markets > Sector Trackers | Public |
| `/tracker/[sector]` | Markets | Intelligence | [Sector] Tracker | Home > Markets > Trackers > [Sector] | Public |
| `/radar` | Markets | Intelligence | Contrarian Consensus Radar | Home > Markets > Contrarian Radar | Public |
| `/predictions` | Markets | Intelligence | Public Predictions Board | Home > Markets > Predictions | Public |
| `/predictions/ledger` | Markets | Intelligence | Public Scored Prediction Ledger | Home > Markets > Prediction Ledger | Public |
| `/data-freshness` | Markets | Operations | Data Operations & Provider SLAs | Home > Markets > Data Freshness | Public / Analyst |
| `/study` | Learn | Library | Finance Study Material & Courses | Home > Learn > Study Material | Public |
| `/study/[slug]` | Learn | Courses | [Course Title] | Home > Learn > Courses > [Course] | Public |
| `/study/[slug]/lessons/[lessonSlug]` | Learn | Courses | [Lesson Title] | Home > Learn > [Course] > [Lesson] | Public / Enrolled |
| `/study/skill-academy` | Learn | Courses | 54 Skill Academy Tracks | Home > Learn > Skill Academy | Pro / Elite |
| `/study/analyst-levels` | Learn | Pathways | Analyst Progression Levels | Home > Learn > Analyst Levels | Public |
| `/study/analyst-complete` | Learn | Curriculum | Complete Analyst Curriculum | Home > Learn > Analyst Complete | Pro / Elite |
| `/study/placement-prep` | Learn | Career | 60-Day Placement Prep Roadmap | Home > Learn > Placement Prep | Public |
| `/pgdm` | Learn | Academic | PGDM Academic Hub (14 Subjects) | Home > Learn > PGDM Hub | Public |
| `/pgdm/[subject]` | Learn | Academic | [Subject] Syllabus & Units | Home > Learn > PGDM > [Subject] | Public |
| `/pgdm/[subject]/[lecture]` | Learn | Academic | [Lecture Title] | Home > Learn > [Subject] > [Lecture] | Public |
| `/pgdm/[subject]/cheatsheet` | Learn | Academic | [Subject] Formula Cheatsheet | Home > Learn > [Subject] > Cheatsheet | Public |
| `/pgdm/search` | Learn | Academic | PGDM Academic Search | Home > Learn > PGDM > Search | Public |
| `/finance-terms` | Learn | Reference | Plain-Language Finance Terms | Home > Learn > Finance Terms | Public |
| `/finance-terms/[slug]` | Learn | Reference | [Term Title] Definition | Home > Learn > Terms > [Term] | Public |
| `/certificates` | Learn | Credentials | Issued Credentials Registry | Home > Learn > Certificates | Public |
| `/certificates/issued/[id]` | Learn | Credentials | Certificate Verification | Home > Learn > Certificates > [ID] | Public |
| `/placement-day-war-room` | Learn | Career | Placement Day War Room 2.0 | Home > Learn > Placement War Room | Unlimited Access |
| `/podcast` | Learn | Media | The Kunwar Analytics Podcast | Home > Learn > Podcast | Public |
| `/podcast/[slug]` | Learn | Media | [Episode Title] | Home > Learn > Podcast > [Episode] | Public |
| `/about` | Company | Overview | About Kunwar Analytics | Home > Company > About | Public |
| `/services` | Company | Offerings | Advisory, Modelling & Research | Home > Company > Services | Public |
| `/enterprise` | Company | Commercial | Institutional & Enterprise Solutions | Home > Company > Enterprise | Public |
| `/pricing` | Company | Plans | Transparent Pricing & Entitlements | Home > Company > Pricing | Public |
| `/speaking` | Company | Profile | Keynotes & Guest Lectures | Home > Company > Speaking | Public |
| `/resume` | Company | Profile | Professional Executive Résumé | Home > Company > Résumé | Public |
| `/contact` | Company | Engage | Direct Communication & Inquiries | Home > Company > Contact | Public |
| `/dashboard` | Dashboard | Workspace | Personal User Dashboard | Home > Dashboard | Authenticated |
| `/dashboard/edit` | Dashboard | Workspace | Edit Profile & Learning Goals | Home > Dashboard > Edit Profile | Authenticated |
| `/account` | Dashboard | Workspace | Account Settings & Credentials | Home > Account | Authenticated |
| `/admin` | Admin | Operations | Executive Command Centre | Home > Admin | Admin / Analyst |

