import { Metadata } from 'next';
import ResumeActions from './ResumeActions';

export const metadata: Metadata = {
  title: 'Resume | FinNexus Lab',
  description: 'Professional resume and CV for FinNexus Lab founder and research analyst.',
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 print:pt-0">

      {/* ✅ Client Component */}
      <ResumeActions />

      {/* CV Container */}
      <div className="wrap py-10">
        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-lg print:border-0 print:rounded-none print:shadow-none max-w-5xl mx-auto">

          {/* Header */}
          <header className="bg-brand-navy px-10 py-10 text-white">
            <h1 className="text-3xl font-bold mb-1">
              Your Full Name Here
            </h1>
            <p className="text-brand-teal font-medium mb-4">
              Finance & Business Analytics Professional
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-gray-300">
              <span>📧 your@email.com</span>
              <span>🔗 linkedin.com/in/your-profile</span>
              <span>🌐 finnexuslab.com</span>
              <span>📍 Your City, India</span>
            </div>
          </header>

          {/* Body */}
          <div className="p-10 grid md:grid-cols-3 gap-10">

            {/* LEFT */}
            <div className="md:col-span-2 space-y-8">

              <section>
                <h2 className="text-xl font-bold text-brand-navy mb-4">
                  Professional Summary
                </h2>
                <p className="text-brand-slate leading-relaxed">
                  Passionate finance professional with expertise in financial analysis,
                  business intelligence, and data-driven decision making.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-brand-navy mb-6">
                  Experience
                </h2>

                <div className="mb-6">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-brand-navy">
                        Founder & Research Analyst
                      </h3>
                      <p className="text-brand-teal">FinNexus Lab</p>
                    </div>
                    <span className="text-sm text-gray-500">2025–Present</span>
                  </div>

                  <ul className="mt-3 space-y-2 text-sm text-brand-slate">
                    <li>› Built financial research platform</li>
                    <li>› Conducted market analysis</li>
                    <li>› Developed financial models</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-brand-navy">
                        Finance Intern
                      </h3>
                      <p className="text-brand-teal">Company Name</p>
                    </div>
                    <span className="text-sm text-gray-500">2024–2025</span>
                  </div>

                  <ul className="mt-3 space-y-2 text-sm text-brand-slate">
                    <li>› Assisted in financial analysis</li>
                    <li>› Supported reporting tasks</li>
                    <li>› Worked on data analysis</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-brand-navy mb-6">
                  Education
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-brand-navy">
                      MBA in Finance
                    </h3>
                    <p className="text-brand-teal">Business School Name</p>
                    <p className="text-sm text-brand-slate">2023–2025</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-brand-navy">
                      Bachelor of Commerce
                    </h3>
                    <p className="text-brand-teal">University Name</p>
                    <p className="text-sm text-brand-slate">2019–2023</p>
                  </div>
                </div>
              </section>

            </div>

            {/* RIGHT */}
            <div className="space-y-8">

              <section>
                <h2 className="text-lg font-bold text-brand-navy mb-4">
                  Skills
                </h2>

                <div className="flex flex-wrap gap-2">
                  <span className="tag tag-silver">DCF Modeling</span>
                  <span className="tag tag-silver">Excel</span>
                  <span className="tag tag-silver">Power BI</span>
                  <span className="tag tag-silver">SQL</span>
                  <span className="tag tag-silver">Python</span>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold text-brand-navy mb-4">
                  Projects
                </h2>

                <div className="space-y-4 text-sm text-brand-slate">
                  <p><strong>FinNexus Platform:</strong> Built financial research platform.</p>
                  <p><strong>Market Analysis:</strong> Deep-dive sector research.</p>
                  <p><strong>Financial Models:</strong> Created reusable frameworks.</p>
                </div>
              </section>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}