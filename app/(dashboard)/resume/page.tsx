import { Metadata } from 'next';
import Image from 'next/image';
import HeroBackground from '@/components/ui/HeroBackground';
import ResumeActions from './ResumeActions';

export const metadata: Metadata = {
  title: 'Resume | Sumit Singh - Kunwar Analytics',
  description: 'Professional resume of Sumit Singh, Finance & Business Analytics professional and founder of Kunwar Analytics.',
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#f1f5f9] pt-20 print:pt-0 font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .resume-sidebar { background-color: #f8fafc !important; color: #334155 !important; }
          .resume-main { background-color: #0f172a !important; color: #f8fafc !important; }
          .section-line { border-color: #334155 !important; }
          .resume-teal-text { color: #2dd4bf !important; }
          .resume-border-box { border: 1px solid #334155 !important; }
          .wrap { padding: 0 !important; width: 100% !important; max-width: none !important; }
          .shadow-2xl { shadow: none !important; }
        }
      `}} />

      {/* Client Actions */}
      <ResumeActions />

      {/* Resume Content */}
      <div className="wrap py-10 print:py-0">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none max-w-[1000px] mx-auto flex flex-col md:flex-row border border-gray-100 print:border-0 min-h-[1200px]">
          
          {/* Left Column (Sidebar) - Light Style */}
          <aside className="resume-sidebar md:w-[32%] bg-[#f8fafc] p-8 md:p-10 space-y-12 border-r border-gray-100 flex flex-col">
            
            {/* Profile Image */}
            <div className="relative w-48 h-48 mx-auto md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-xl mb-6">
              <Image 
                src="/images/sumit-profile.jpeg" 
                alt="Sumit Singh"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>

            {/* Contact */}
            <section>
              <h2 className="text-[12px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6 flex items-center gap-2">
                <span className="h-0.5 w-4 bg-brand-teal" />
                Contact
              </h2>
              <div className="space-y-4 text-[13px] text-slate-600 font-bold">
                <div className="flex items-center gap-3">
                  <span className="text-brand-teal text-lg">•</span>
                  <span>Noida, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-brand-teal text-lg">•</span>
                  <a href="mailto:sumit.singh.2025@absschool.in" className="hover:text-brand-teal transition-colors break-all underline decoration-slate-200 underline-offset-4">
                    sumit.singh.2025@absschool.in
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-brand-teal text-lg">•</span>
                  <span>8292140808</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-brand-teal text-lg">•</span>
                  <a href="https://kunwaranalytics.in" className="hover:text-brand-teal transition-colors underline decoration-slate-200 underline-offset-4">
                    kunwaranalytics.in
                  </a>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-[12px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6 flex items-center gap-2">
                <span className="h-0.5 w-4 bg-brand-teal" />
                Education
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-black text-[#0f172a] text-[13px] leading-tight">PGDM — Finance & Business Analytics</h3>
                  <p className="text-brand-teal text-[12px] font-bold mt-1">Asian Business School</p>
                  <p className="text-[11px] text-slate-400 font-black mt-0.5 uppercase tracking-tighter">2025 – 2027</p>
                </div>
                <div>
                  <h3 className="font-black text-[#0f172a] text-[13px] leading-tight font-serif italic placeholder:text-slate-400">BBA (69%)</h3>
                  <p className="text-brand-teal text-[12px] font-bold mt-1">IIMT College, Greater Noida</p>
                  <p className="text-[11px] text-slate-400 font-black mt-0.5 uppercase tracking-tighter">2021 – 2024</p>
                </div>
                <div>
                  <h3 className="font-black text-[#0f172a] text-[13px] leading-tight">Senior Secondary (12th) – 75%</h3>
                  <p className="text-brand-teal text-[12px] font-bold mt-1">Bihar Board</p>
                  <p className="text-[11px] text-slate-400 font-black mt-0.5 uppercase tracking-tighter">2019 – 2021</p>
                </div>
                <div>
                  <h3 className="font-black text-[#0f172a] text-[13px] leading-tight">Secondary (10th)</h3>
                  <p className="text-brand-teal text-[12px] font-bold mt-1 uppercase">CBSE Board</p>
                </div>
              </div>
            </section>

            {/* Technical Skills */}
            <section>
              <h2 className="text-[12px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6 flex items-center gap-2">
                <span className="h-0.5 w-4 bg-brand-teal" />
                Technical Skills
              </h2>
              <ul className="space-y-3 text-[13px] font-bold text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="h-px w-3 bg-brand-teal" />
                  Advanced Microsoft Excel
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-px w-3 bg-brand-teal" />
                  Power BI & Tableau
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-px w-3 bg-brand-teal" />
                  Python (Data Analysis)
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-px w-3 bg-brand-teal" />
                  Next.js 14 & TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-px w-3 bg-brand-teal" />
                  PostgreSQL & Prisma ORM
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-px w-3 bg-brand-teal" />
                  Tailwind CSS & Vercel
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-px w-3 bg-brand-teal" />
                  PowerPoint & Canva
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-px w-3 bg-brand-teal" />
                  WordPress & SEO Analytics
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-px w-3 bg-brand-teal" />
                  AI Tools for Business
                </li>
              </ul>
            </section>
          </aside>

          {/* Right Column (Main) - Dark Style */}
          <main className="resume-main flex-1 bg-[#0f172a] text-white flex flex-col">
            
            {/* Header */}
            <header className="p-10 md:p-14 pb-6 md:pb-8">
              <h1 className="text-[48px] md:text-5xl font-black mb-3 tracking-tighter leading-none text-white">
                SUMIT SINGH
              </h1>
              <p className="resume-teal-text text-brand-teal text-[20px] md:text-xl font-bold flex items-center gap-3">
                <span className="h-px w-6 bg-brand-teal" />
                PGDM (Finance & Business Analytics)
              </p>
            </header>

            {/* Body */}
            <div className="p-10 md:p-14 pt-0 space-y-12">
              
              {/* Professional Summary */}
              <section>
                <h2 className="text-[14px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-4 text-slate-100">
                  Professional Summary
                  <span className="section-line h-px flex-1 bg-slate-800" />
                </h2>
                <p className="text-slate-300 leading-[1.8] text-sm md:text-[15px] font-medium text-justify">
                  Finance & Analytics professional with a strong academic foundation in financial analysis, business analytics, and corporate reporting. Independently built Kunwar Analytics — a full-stack financial intelligence SaaS platform for Indian markets — demonstrating expertise in product development, data architecture, and sector research. Proficient in Excel, Power BI, Tableau, Python, and modern full-stack technologies. Driven to deliver actionable, data-driven outcomes.
                </p>
              </section>

              {/* Projects & Experience */}
              <section>
                <h2 className="text-[14px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-4 text-slate-100">
                  Projects & Experience
                  <span className="section-line h-px flex-1 bg-slate-800" />
                </h2>

                <div className="space-y-12">
                  {/* Kunwar Analytics */}
                  <div className="relative">
                    <div className="flex justify-between items-baseline mb-3">
                      <h3 className="text-xl font-black tracking-tight text-white">Kunwar Analytics</h3>
                      <div className="text-right">
                        <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none">kunwaranalytics.in</p>
                        <p className="text-[11px] text-brand-teal font-black italic mt-1">2026</p>
                      </div>
                    </div>
                    <p className="resume-teal-text text-brand-teal text-[13px] font-extrabold mb-4 uppercase tracking-widest">Founder & Solo Developer</p>
                    <ul className="space-y-4 text-[13px] text-slate-300 font-medium">
                      <li className="flex gap-4">
                        <span className="resume-teal-text text-brand-teal mt-1.5 h-1.5 w-1.5 rounded-full border-2 border-brand-teal shrink-0" />
                        Independently architected and deployed a full-stack financial intelligence SaaS platform using Next.js 14, TypeScript, Neon PostgreSQL, Prisma, NextAuth.js, Stripe, Algolia, and Vercel.
                      </li>
                      <li className="flex gap-4">
                        <span className="resume-teal-text text-brand-teal mt-1.5 h-1.5 w-1.5 rounded-full border-2 border-brand-teal shrink-0" />
                        Built live sector trackers (Quick Commerce, Fintech, EV, Food Delivery), Research, Data Lab, Podcast, and Financial Tools modules — covering 10+ reports and Rs. 1T+ market cap.
                      </li>
                      <li className="flex gap-4">
                        <span className="resume-teal-text text-brand-teal mt-1.5 h-1.5 w-1.5 rounded-full border-2 border-brand-teal shrink-0" />
                        Implemented Stripe subscription billing, enterprise authentication, Algolia search, and Contentful CMS — delivering a production-ready platform for investors and analysts.
                      </li>
                    </ul>
                  </div>

                  {/* GeoSEO Lab */}
                  <div className="relative">
                    <div className="flex justify-between items-baseline mb-3">
                      <h3 className="text-xl font-black tracking-tight text-white font-serif italic">GeoSEO Lab</h3>
                      <div className="text-right text-[11px] font-black text-slate-500 lowercase tracking-[0.2em] italic">
                        Jun 2025 — Mar 2026
                      </div>
                    </div>
                    <p className="resume-teal-text text-brand-teal text-[13px] font-extrabold mb-4 uppercase tracking-widest">Business Analytics & Finance Lead</p>
                    <ul className="space-y-4 text-[13px] text-slate-300 font-medium">
                      <li className="flex gap-4">
                        <span className="resume-teal-text text-brand-teal mt-1.5 h-1.5 w-1.5 rounded-full border-2 border-brand-teal shrink-0" />
                        Built financial models for cost analysis, budgeting, and performance reporting; developed Power BI & Tableau dashboards tracking revenue trends and operational efficiency metrics.
                      </li>
                      <li className="flex gap-4">
                        <span className="resume-teal-text text-brand-teal mt-1.5 h-1.5 w-1.5 rounded-full border-2 border-brand-teal shrink-0" />
                        Analyzed sales and operational data using Advanced Excel and Python for financial planning and decision support; delivered structured management-level presentations.
                      </li>
                      <li className="flex gap-4">
                        <span className="resume-teal-text text-brand-teal mt-1.5 h-1.5 w-1.5 rounded-full border-2 border-brand-teal shrink-0" />
                        Supported data-driven decision-making by creating actionable analytics and reporting frameworks across key business and financial functions.
                      </li>
                    </ul>
                  </div>

                  {/* HelpBix.Com */}
                  <div className="relative">
                    <div className="flex justify-between items-baseline mb-3">
                      <h3 className="text-xl font-black tracking-tight text-white">HelpBix.Com</h3>
                      <div className="text-right text-[11px] font-black text-slate-500 tracking-[0.2em] italic uppercase">
                        2025
                      </div>
                    </div>
                    <p className="resume-teal-text text-brand-teal text-[13px] font-extrabold mb-4 uppercase tracking-widest">Product Analytics & Finance Associate</p>
                    <ul className="space-y-4 text-[13px] text-slate-300 font-medium">
                      <li className="flex gap-4">
                        <span className="resume-teal-text text-brand-teal mt-1.5 h-1.5 w-1.5 rounded-full border-2 border-brand-teal shrink-0" />
                        Tracked product KPIs, user engagement, and conversion funnels; built reporting dashboards providing business performance insights for product and leadership teams.
                      </li>
                      <li className="flex gap-4">
                        <span className="resume-teal-text text-brand-teal mt-1.5 h-1.5 w-1.5 rounded-full border-2 border-brand-teal shrink-0" />
                        Applied Python and Excel for data cleaning, cohort analysis, and actionable reporting presented in stakeholder and leadership reviews.
                      </li>
                      <li className="flex gap-4">
                        <span className="resume-teal-text text-brand-teal mt-1.5 h-1.5 w-1.5 rounded-full border-2 border-brand-teal shrink-0" />
                        Aligned product analytics with financial reporting to support revenue evaluation and performance decisions across operational cycles.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Skills Grid */}
              <div className="grid md:grid-cols-2 gap-10">
                <section>
                  <h2 className="text-[12px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3 text-slate-100">
                    Core Skills
                    <span className="section-line h-px flex-1 bg-slate-800" />
                  </h2>
                  <ul className="space-y-3 text-[12px] text-slate-300 font-bold italic">
                    <li className="flex gap-2 items-center text-brand-teal">• <span className="text-slate-300">Financial Modeling & Valuation</span></li>
                    <li className="flex gap-2 items-center text-brand-teal">• <span className="text-slate-300">Business Data & Analytics</span></li>
                    <li className="flex gap-2 items-center text-brand-teal">• <span className="text-slate-300">Cost Analysis & Budgeting</span></li>
                    <li className="flex gap-2 items-center text-brand-teal">• <span className="text-slate-300">Market & Sector Research</span></li>
                    <li className="flex gap-2 items-center text-brand-teal">• <span className="text-slate-300">Performance Reporting & KPIs</span></li>
                    <li className="flex gap-2 items-center text-brand-teal">• <span className="text-slate-300">Strategic Decision Support</span></li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-[12px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3 text-slate-100">
                    Soft Skills
                    <span className="section-line h-px flex-1 bg-slate-800" />
                  </h2>
                  <ul className="grid grid-cols-2 gap-y-3 text-[12px] text-slate-300 font-bold italic">
                    <li className="text-brand-teal">• <span className="text-slate-300">Analytical Thinking</span></li>
                    <li className="text-brand-teal">• <span className="text-slate-300">Communication</span></li>
                    <li className="text-brand-teal">• <span className="text-slate-300">Presentation</span></li>
                    <li className="text-brand-teal">• <span className="text-slate-300">Time Mgmt</span></li>
                    <li className="text-brand-teal">• <span className="text-slate-300">Initiative</span></li>
                    <li className="text-brand-teal">• <span className="text-slate-300">Entre-mindset</span></li>
                    <li className="text-brand-teal">• <span className="text-slate-300">System Thinking</span></li>
                    <li className="text-brand-teal">• <span className="text-slate-300">Teamwork</span></li>
                  </ul>
                </section>
              </div>

              {/* Additional Information */}
              <section className="resume-border-box border border-slate-700 p-6 rounded-xl bg-slate-900/50 shadow-inner">
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 mb-3 ml-1">
                  Additional Information
                </h2>
                <p className="text-[13px] text-slate-400 font-bold leading-relaxed italic px-1">
                  Deep interest in finance-driven analytics, investment research, and strategic market intelligence for equity and startup ecosystems.
                </p>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}