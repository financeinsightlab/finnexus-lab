import { FUTURE_SKILL_STACK, PORTFOLIO_PROJECTS, WEBSITE_AUDIT } from "../data/portfolio";

export function PortfolioLab() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-br from-slate-950 via-fuchsia-950 to-indigo-950 text-white p-6 shadow-lg">
        <div className="text-xs uppercase tracking-widest text-fuchsia-300 font-bold">Portfolio Upgrade Lab</div>
        <h2 className="text-2xl sm:text-3xl font-bold mt-2">Make kunwaranalytics.in recruiter-ready</h2>
        <p className="text-sm text-white/80 mt-2 max-w-4xl leading-relaxed">
          I checked the live website content. It currently looks like a corporate financial intelligence platform. That can look premium, but for placements the website should prove one thing fast: Sumit Singh can do finance + analytics work and is ready for an entry-level 15 LPA+ role.
        </p>
      </section>

      <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">Website Audit</div>
            <h3 className="text-xl font-bold text-slate-900">{WEBSITE_AUDIT.url}</h3>
            <p className="text-sm text-slate-600 mt-1">Observed title: <b>{WEBSITE_AUDIT.observedTitle}</b></p>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-100 text-amber-800">Needs repositioning</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">{WEBSITE_AUDIT.summary}</p>

        <div className="grid gap-4 md:grid-cols-3">
          <AuditList title="What is good" items={WEBSITE_AUDIT.strengths} color="emerald" />
          <AuditList title="Risks / gaps" items={WEBSITE_AUDIT.risks} color="rose" />
          <AuditList title="Fix first" items={WEBSITE_AUDIT.priorityFixes} color="indigo" />
        </div>
      </section>

      <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">Best Projects to Add</div>
            <h3 className="text-xl font-bold text-slate-900">Do 3 strong projects before placements, not 10 weak ones</h3>
          </div>
          <div className="text-xs font-bold text-violet-700 bg-violet-100 px-3 py-1.5 rounded-full">Priority: Project 1 + 2 + 6</div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <article key={project.title} className="rounded-xl border border-slate-200 p-4 bg-slate-50/70">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0">{index + 1}</div>
                <div>
                  <h4 className="font-bold text-slate-900">{project.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">{project.goal}</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                  <span key={tool} className="text-[11px] font-bold bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded-lg">{tool}</span>
                ))}
              </div>

              <div className="mt-3 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-2 rounded-lg">
                Recruiter value: {project.recruiterValue}
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <MiniList title="Deliverables" items={project.deliverables} />
                <MiniList title="Build steps" items={project.buildSteps} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
        <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">Future-Ready Skill Stack</div>
        <h3 className="text-xl font-bold text-slate-900 mt-1">Skills that can make recruiters value you more than average finance candidates</h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {FUTURE_SKILL_STACK.map((item) => (
            <div key={item.skill} className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/70 p-4">
              <h4 className="font-bold text-fuchsia-900">{item.skill}</h4>
              <p className="text-sm text-slate-700 mt-2"><b>Why it matters:</b> {item.why}</p>
              <p className="text-xs text-fuchsia-800 bg-white border border-fuchsia-200 rounded-lg px-2 py-1.5 mt-3"><b>Proof to show:</b> {item.proof}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-5 shadow-sm">
        <div className="text-xs uppercase tracking-wider text-amber-700 font-bold">Exact Website Structure I Recommend</div>
        <h3 className="text-xl font-bold text-slate-900 mt-1">Replace company-style claims with proof-style portfolio sections</h3>
        <div className="grid gap-3 md:grid-cols-2 mt-4">
          <MiniList title="Top navigation" items={["Home", "Projects", "Skills", "Resume", "Notes", "Contact"]} />
          <MiniList title="Hero section" items={["Sumit Singh | PGDM Finance + Business Analytics", "Target roles: Equity Research, Credit Risk, Financial Analyst, BFSI Analyst", "Buttons: Download Resume, View Projects, LinkedIn"]} />
          <MiniList title="Project section" items={["3 featured projects with screenshots", "Problem, tools, method, insights, recommendation", "Links to Excel/PBI/PDF/GitHub/Drive"]} />
          <MiniList title="Trust section" items={["Real certifications only", "College, internship, competitions", "No unverified SEBI/RBI/ISO/Fortune 500 claims"]} />
        </div>
      </section>
    </div>
  );
}

function AuditList({ title, items, color }: { title: string; items: string[]; color: "emerald" | "rose" | "indigo" }) {
  const styles = {
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-900",
    rose: "bg-rose-50 border-rose-200 text-rose-900",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-900",
  };
  return (
    <div className={`rounded-xl border p-4 ${styles[color]}`}>
      <h4 className="font-bold mb-2">{title}</h4>
      <ul className="space-y-2 text-sm list-disc list-inside">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg bg-white border border-slate-200 p-3">
      <div className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">{title}</div>
      <ul className="space-y-1.5 text-sm text-slate-700 list-disc list-inside">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}