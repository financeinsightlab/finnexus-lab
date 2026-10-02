import Link from 'next/link';
import FloatingElement from '@/components/ui/FloatingElement';
import {
  Building2,
  Shield,
  Globe,
  Mail,
  Share2,
  MessageCircle,
  Video,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';
import { NAV_CLUSTERS } from '@/lib/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const enquiryTopics = [
    { name: 'Research enquiries', href: '/services#research' },
    { name: 'Financial modelling enquiries', href: '/services#modeling' },
    { name: 'Data and market questions', href: '/services#data' },
    { name: 'Organization access', href: '/enterprise' },
  ];

  const exploreClusters = NAV_CLUSTERS;
  const policies = [
    { name: 'Privacy information', href: '/privacy' },
    { name: 'Terms of Use', href: '/terms' },
    { name: 'Cookie information', href: '/cookies' },
    { name: 'Privacy rights', href: '/gdpr' },
    { name: 'Security information', href: '/security' },
    { name: 'Editorial & ethics', href: '/ethics' },
  ];
  const currentAvailability = [
    'Pro and Elite are the only self-service paid plans',
    'Manual UPI payment with administrator review',
    'Approval grants one calendar month of access',
    'No card billing or automatic renewal',
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-cinema-black text-white">
      <div className="absolute inset-0 cinema-grid opacity-20" />
      <div className="absolute inset-0 cinema-mesh opacity-30" />
      <div className="absolute inset-0 cinema-noise" />
      <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-cinema-glow-blue/10 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cinema-violet/10 blur-[120px]" />

      <div className="relative z-10">
        <div className="border-y border-white/5 bg-gradient-to-r from-cinema-glow-blue/10 to-cinema-violet/10">
          <div className="wrap flex flex-col items-center justify-between gap-3 py-5 text-center md:flex-row md:text-left">
            <span className="text-sm font-semibold">Finance research, analysis, and learning resources</span>
            <span className="text-xs text-gray-300">Paid access is manually reviewed; see current terms before paying.</span>
          </div>
        </div>

        <div className="wrap py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="space-y-6">
                <FloatingElement>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-8 w-8 text-brand-teal" />
                    <div>
                      <Link href="/" className="flex items-center space-x-1 text-2xl font-bold">
                        <span className="text-brand-teal">Kunwar</span>
                        <span className="text-brand-gold">Analytics</span>
                      </Link>
                      <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">FINANCE RESEARCH &amp; LEARNING</p>
                    </div>
                  </div>
                </FloatingElement>

                <p className="leading-relaxed text-gray-300">
                  Explore public research, sector pages, prediction outcomes, study material, and
                  interactive finance tools. Site content is general information, not personalized
                  investment advice.
                </p>

                <div className="space-y-3">
                  {[
                    'Public research and educational content',
                    'Prediction outcomes shown without fabricated probability scores',
                    'UPI payment references reviewed by an administrator',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-800 pt-6">
                  <h4 className="mb-4 text-sm font-semibold">CONTACT</h4>
                  <div className="flex items-center gap-4">
                    <a href="https://linkedin.com/company/kunwaranalytics" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-gray-800 p-2 transition-colors hover:bg-gray-700" aria-label="LinkedIn">
                      <Share2 className="h-5 w-5" />
                    </a>
                    <a href="https://twitter.com/kunwaranalytics" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-gray-800 p-2 transition-colors hover:bg-gray-700" aria-label="Twitter">
                      <MessageCircle className="h-5 w-5" />
                    </a>
                    <a href="https://youtube.com/@kunwaranalytics" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-gray-800 p-2 transition-colors hover:bg-gray-700" aria-label="YouTube">
                      <Video className="h-5 w-5" />
                    </a>
                    <a href="mailto:kunwaranalytics@gmail.com" className="rounded-lg bg-gray-800 p-2 transition-colors hover:bg-gray-700" aria-label="Email">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-4">
                <div>
                  <h3 className="mb-6 flex items-center gap-2 text-sm uppercase tracking-widest text-gray-400">
                    <Building2 className="h-4 w-4" /> ENQUIRY TOPICS
                  </h3>
                  <ul className="space-y-3">
                    {enquiryTopics.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className="group flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white">
                          <ChevronRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {exploreClusters.map((cluster) => (
                  <div key={cluster.id}>
                    <h3 className="mb-6 flex items-center gap-2 text-sm uppercase tracking-widest text-gray-400">
                      <span className="text-base leading-none">{cluster.icon}</span>
                      {cluster.label}
                    </h3>
                    <ul className="space-y-3">
                      {cluster.items.map((item) => (
                        <li key={`${cluster.id}-${item.href}`}>
                          <Link href={item.href} className="group flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white">
                            <ChevronRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div>
                  <h3 className="mb-6 flex items-center gap-2 text-sm uppercase tracking-widest text-gray-400">
                    <Shield className="h-4 w-4" /> POLICIES
                  </h3>
                  <ul className="space-y-3">
                    {policies.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className="group flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white">
                          <ChevronRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-gray-800 pt-8">
                    <h4 className="mb-4 text-xs uppercase tracking-widest text-gray-400">CURRENT PAID-ACCESS PROCESS</h4>
                    <ul className="space-y-2">
                      {currentAvailability.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-gray-400">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-gray-800 pt-10">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="text-sm text-gray-400">© {currentYear} Kunwar Analytics. For enquiries: <a className="underline hover:text-white" href="mailto:kunwaranalytics@gmail.com">kunwaranalytics@gmail.com</a></div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Globe className="h-4 w-4" />
                <span>Public pages and availability details may change; refer to the linked policies and plan pages.</span>
              </div>
            </div>
            <p className="mt-4 text-xs italic text-gray-500">
              Research, forecasts, and tools are informational and educational. They are not individualized financial advice, and no outcome is guaranteed.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
