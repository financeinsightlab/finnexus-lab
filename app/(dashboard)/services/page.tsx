import { Metadata } from 'next';
import Link from 'next/link';
import CardImageBanner from '@/components/ui/CardImageBanner';
import HeroBackground from '@/components/ui/HeroBackground';

interface EnquiryTopic {
  icon: string;
  title: string;
  description: string;
  contactTopic: string;
  color: string;
  accent: string;
}

const ENQUIRY_TOPICS: EnquiryTopic[] = [
  {
    icon: '📋',
    title: 'Market Research',
    description: 'Ask about the possibility of a scoped research project around a defined market or sector question.',
    contactTopic: 'Research Inquiry',
    color: 'bg-blue-50 border-blue-100',
    accent: 'text-blue-900',
  },
  {
    icon: '📐',
    title: 'Financial Modelling',
    description: 'Ask whether a modelling or valuation question could be considered for a future engagement.',
    contactTopic: 'Financial Modelling',
    color: 'bg-teal-50 border-teal-100',
    accent: 'text-teal-900',
  },
  {
    icon: '🔍',
    title: 'Competitive Analysis',
    description: 'Discuss whether a bounded comparison or competitor-research question may be suitable.',
    contactTopic: 'Research Inquiry',
    color: 'bg-amber-50 border-amber-100',
    accent: 'text-amber-900',
  },
  {
    icon: '📊',
    title: 'Data & Dashboards',
    description: 'Ask about a specific analytics or dashboard question; data, scope, and feasibility need separate review.',
    contactTopic: 'Data Analytics Project',
    color: 'bg-purple-50 border-purple-100',
    accent: 'text-purple-900',
  },
  {
    icon: '🧠',
    title: 'Strategy Research',
    description: 'Enquire about research related to a defined business question; this is not a promise of advisory work.',
    contactTopic: 'Research Inquiry',
    color: 'bg-green-50 border-green-100',
    accent: 'text-green-900',
  },
];

export const metadata: Metadata = {
  title: 'Research & Analytics Enquiries | Kunwar Analytics',
  description: 'Enquire about potential research, financial modelling, and analytics work. Availability and scope are confirmed separately.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden bg-brand-navy py-20">
        <HeroBackground />
        <div className="wrap relative z-10">
          <p className="section-label text-teal-300 mb-5">Enquiries</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Research & Analytics Enquiries
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            The topics below are prompts for an initial enquiry, not a catalogue of confirmed services. Listing a topic does not confirm availability, capability, or acceptance of work.
          </p>
        </div>
      </header>

      <section className="wrap py-20">
        <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950">
          Any potential engagement would require separate written agreement on scope, deliverables, fees, timing, and terms before work begins. Submitting an enquiry is not a booking or service-level commitment.
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {ENQUIRY_TOPICS.map((topic) => (
            <div
              key={topic.title}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-40 w-full border-b border-gray-200">
                <CardImageBanner
                  src={`/card-${topic.title.toLowerCase().replace(/\s+/g, '-')}.png`}
                  alt={topic.title}
                  icon={topic.icon}
                  gradientFrom="from-[#1a1f2e]"
                  gradientTo="to-[#2d3748]"
                  overlayOpacity="opacity-20"
                  blendMode="mix-blend-luminosity"
                />
              </div>

              <div className={`p-8 flex-1 flex flex-col ${topic.color}`}>
                <span className="text-4xl mb-6" aria-hidden="true">{topic.icon}</span>
                <h2 className={`text-xl font-bold mb-3 ${topic.accent}`}>
                  {topic.title}
                </h2>
                <p className="text-sm text-brand-slate mb-8 flex-1">{topic.description}</p>
                <div className="mt-auto pt-6 border-t border-black/10 text-center">
                  <Link
                    href={`/contact?service=${encodeURIComponent(topic.contactTopic)}`}
                    className={`inline-block font-semibold ${topic.accent} hover:opacity-70 transition-opacity`}
                  >
                    Enquire about this topic →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-silver py-20">
        <div className="wrap max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-brand-navy mb-6">How an enquiry works</h2>
          <p className="text-brand-slate leading-relaxed">
            Share the question you would like to explore. Any response, feasibility review, or next step depends on current capacity and a separate discussion. No price, delivery date, deliverable, or engagement is confirmed by this page or by submitting the form.
          </p>
        </div>
      </section>

      <section className="bg-brand-navy py-20">
        <div className="wrap text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Have a Research Question?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Send an enquiry to ask about current availability. Response timing is not guaranteed.
          </p>
          <Link href="/contact?service=Other" className="btn btn-white text-lg px-8 py-3">
            Submit an Enquiry →
          </Link>
        </div>
      </section>
    </div>
  );
}
