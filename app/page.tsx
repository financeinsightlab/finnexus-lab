import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import JsonLd, { faqSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Home | Kunwar Analytics',
  description:
    'Kunwar Analytics is a financial intelligence platform delivering data-driven insights on markets, strategy, and capital. Explore institutional-quality research, business analytics, investment analysis, and study materials on finance, data science, and economics.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Kunwar Analytics — Financial Intelligence Platform',
    description:
      'Data-driven insights on markets, strategy, and capital. Institutional-quality research, business analytics, and educational study materials.',
    url: 'https://kunwaranalytics.in',
    type: 'website',
  },
};

import ResearchGrid from '@/components/research/ResearchGrid';
import InsightGrid from '@/components/insights/InsightGrid';
import NewsletterForm from '@/components/NewsletterForm';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GlassCard3D from '@/components/ui/GlassCard3D';
import MagneticButton3D from '@/components/ui/MagneticButton3D';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import RevealText from '@/components/ui/RevealText';
import CinematicHero from '@/components/home/CinematicHero';
import { getFeaturedResearch, getFeaturedInsights } from '@/lib/content';
import { prisma } from '@/lib/prisma';
import type { ResearchPost, InsightPost } from '@/types';
import { GlobalForecastingTicker } from '@/components/ui/GlobalForecastingTicker';
import CoursesSection from '@/components/study/CoursesSection';
import SectorVideo from '@/components/tracker/SectorVideo';

async function getHomePagePosts() {
  // Try to get DB-driven featured selections first
  const [dbResearch, dbInsights, dbHeroStats, dbTrackers] = await Promise.all([
    prisma.featuredContent.findMany({ where: { section: 'RESEARCH' }, orderBy: { order: 'asc' } }),
    prisma.featuredContent.findMany({ where: { section: 'INSIGHTS' }, orderBy: { order: 'asc' } }),
    prisma.homePageItem.findMany({ where: { section: 'HERO_STATS', enabled: true }, orderBy: { order: 'asc' } }),
    prisma.homePageItem.findMany({ where: { section: 'TRACKERS', enabled: true }, orderBy: { order: 'asc' } }),
  ]);

  let research: ResearchPost[];
  let insights: InsightPost[];

  if (dbResearch.length > 0) {
    const dbPosts = await prisma.post.findMany({
      where: { id: { in: dbResearch.map(r => r.contentId) } },
      select: { id: true, title: true, slug: true, excerpt: true, type: true, publishedAt: true, tags: true, viewCount: true },
    });
    const idToPost = Object.fromEntries(dbPosts.map(p => [p.id, p]));
    research = dbResearch
      .map(r => idToPost[r.contentId])
      .filter(Boolean)
      .map(p => ({
        slug: p.slug, title: p.title, date: p.publishedAt?.toISOString() ?? new Date().toISOString(),
        sector: 'General', tags: p.tags, summary: p.excerpt ?? '', pageCount: 0,
        author: 'Kunwar Analytics', featured: true,
      }));
  } else {
    research = getFeaturedResearch(3);
  }

  if (dbInsights.length > 0) {
    const dbPosts = await prisma.post.findMany({
      where: { id: { in: dbInsights.map(r => r.contentId) } },
      select: { id: true, title: true, slug: true, excerpt: true, type: true, publishedAt: true },
    });
    const idToPost = Object.fromEntries(dbPosts.map(p => [p.id, p]));
    insights = dbInsights
      .map(r => idToPost[r.contentId])
      .filter(Boolean)
      .map(p => ({
        slug: p.slug, title: p.title, date: p.publishedAt?.toISOString() ?? new Date().toISOString(),
        category: 'Sector Analysis' as InsightPost['category'],
        readingTime: 5, thesis: p.excerpt ?? '', author: 'Kunwar Analytics', featured: true,
      }));
  } else {
    insights = getFeaturedInsights(3);
  }

  return { research, insights, heroStats: dbHeroStats, trackers: dbTrackers };
}

export default async function HomePage() {
  const { research, insights, heroStats, trackers } = await getHomePagePosts();

  // FAQ schema for GEO
  const homeFaq = faqSchema([
    {
      question: 'What is Kunwar Analytics?',
      answer:
        'Kunwar Analytics is a financial intelligence platform that provides data-driven insights on markets, strategy, and capital. It offers institutional-quality research, business analytics, investment analysis, and educational study materials covering finance, data science, economics, and research methods.',
    },
    {
      question: 'What topics does Kunwar Analytics cover?',
      answer:
        'Kunwar Analytics covers financial analysis, market research, business analytics, investment analysis, data science, economics, quantitative research methods, and portfolio management — with a focus on Indian and global markets.',
    },
    {
      question: 'Is Kunwar Analytics free to use?',
      answer:
        'Yes, Kunwar Analytics provides free access to institutional-quality research, insights, and study materials. The platform also offers premium services and enterprise solutions for advanced analytics needs.',
    },
    {
      question: 'What study materials are available on Kunwar Analytics?',
      answer:
        'The Study Material section offers educational resources across categories including Finance, Business Analytics, Research Methods, Data Science, Economics, and Investment Analysis. Materials range from beginner to advanced difficulty and include articles, courses, videos, PDFs, and notes.',
    },
    {
      question: 'Who is Kunwar Analytics for?',
      answer:
        'Kunwar Analytics serves retail investors, financial analysts, business strategists, MBA students, and data science professionals seeking rigorous, data-backed financial intelligence and market analysis.',
    },
  ])

  const pillars = [
    { icon: '📊', title: 'Research Intelligence', desc: 'Deep-dive reports on market trends, competitive analysis, and strategic positioning.', href: '/research', glow: 'blue' as const },
    { icon: '📈', title: 'Data Analytics', desc: 'Quantitative insights with proprietary models and financial metrics.', href: '/about', glow: 'cyan' as const },
    { icon: '🧠', title: 'Strategic Insights', desc: 'Expert commentary on sector developments and investment opportunities.', href: '/insights', glow: 'violet' as const },
    { icon: '🔧', title: 'Financial Tools', desc: 'Practical frameworks and calculators for financial analysis.', href: '/tools', glow: 'amber' as const },
    { icon: '📊', title: 'Data Lab', desc: 'Analytics projects, Power BI dashboards, and Python data analyses.', href: '/data-lab', glow: 'aurora' as const },
    { icon: '📁', title: 'Case Studies', desc: 'Consulting-quality engagements — Challenge to Outcome narratives.', href: '/case-studies', glow: 'blue' as const },
    { icon: '🎓', title: 'Study Material', desc: 'Learn finance, business analytics, and research methods — from beginner to advanced.', href: '/study', glow: 'cyan' as const },
  ]

  const trackersData = [
    { emoji: '🚀', sector: 'Quick Commerce', metric: 'GMV Growth: 42% YoY', href: '/tracker/quick-commerce', value: 42, suffix: '%', label: 'YoY Growth' },
    { emoji: '💰', sector: 'Fintech', metric: 'Digital Payments: ₹12.4T', href: '/tracker/fintech', value: 12, prefix: '₹', suffix: 'T', label: 'Payment Volume' },
    { emoji: '⚡', sector: 'EV', metric: 'EV Adoption: 8.5%', href: '/tracker/ev', value: 8, suffix: '%', label: 'Adoption Rate' },
    { emoji: '🍔', sector: 'Food Delivery', metric: 'Order Volume: 18M/month', href: '/tracker/food-delivery', value: 18, suffix: 'M', label: 'Monthly Orders' },
    { emoji: '☁️', sector: 'SaaS', metric: 'Revenue: $15B', href: '/tracker/saas', value: 15, prefix: '$', suffix: 'B', label: 'SaaS Revenue' },
    { emoji: '🛍️', sector: 'D2C', metric: 'Market: ₹62,000 Cr', href: '/tracker/d2c', value: 62, prefix: '₹', suffix: 'K', label: 'Market Size (Cr)' },
    { emoji: '🏥', sector: 'HealthTech', metric: 'Digital Users: 310M', href: '/tracker/healthcare', value: 310, suffix: 'M', label: 'Active Users' },
    { emoji: '📚', sector: 'EdTech', metric: 'Learning Market: ₹53,000 Cr', href: '/tracker/edtech', value: 53, prefix: '₹', suffix: 'K', label: 'Market Size (Cr)' },
  ]

  return (
    <>
      {/* SEO + GEO: FAQ structured data for AI/LLM engines */}
      <JsonLd data={homeFaq} />

      {/* ===== CINEMATIC HERO ===== */}
      <CinematicHero />

      {/* ===== PLATFORM PILLARS ===== */}
      <section className="relative py-28 bg-cinema-ink overflow-hidden">
        <div className="absolute inset-0 cinema-grid opacity-30" />
        <div className="absolute inset-0 cinema-noise" />
        <div className="wrap relative z-10">
          <ScrollReveal>
            <SectionHeader
              label="What We Do"
              title="Platform Pillars of Financial Intelligence"
              align="center"
              light
            />
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-16">
            {pillars.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 80}>
                <GlassCard3D glow={pillar.glow} className="h-full">
                  <Link href={pillar.href} className="block p-7 h-full group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl glass-cinema-light flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300">
                      {pillar.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cinema-cyan transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed flex-1">
                      {pillar.desc}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-5 text-sm text-cinema-cyan group-hover:gap-2 transition-all">
                      Explore →
                    </span>
                  </Link>
                </GlassCard3D>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COURSES ===== */}
      <CoursesSection />

      {/* ===== FEATURED RESEARCH ===== */}
      <section className="relative py-24 bg-cinema-black overflow-hidden">
        <div className="absolute inset-0 cinema-mesh opacity-20" />
        <div className="wrap relative z-10">
          <ScrollReveal>
            <SectionHeader
              label="Research"
              title="Featured Research"
              subtitle="Deep dives into emerging trends and market dynamics"
              align="center"
              light
            />
          </ScrollReveal>
          <div className="mt-14">
            <ResearchGrid posts={research} />
          </div>
        </div>
      </section>

      {/* ===== SECTOR INTELLIGENCE TRACKERS ===== */}
      <section className="relative py-24 bg-cinema-ink overflow-hidden">
        <div className="absolute inset-0 cinema-grid opacity-20" />
        <div className="wrap relative z-10">
          <ScrollReveal>
            <SectionHeader
              label="Live Intelligence"
              title="Sector Intelligence Trackers"
              subtitle="Quarterly-updated data across 8 Indian market sectors"
              align="center"
              light
            />
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
            {trackersData.map((tracker, i) => (
              <ScrollReveal key={tracker.sector} delay={i * 80}>
                <GlassCard3D glow="cyan" className="h-full overflow-hidden">
                  <Link href={tracker.href} className="block h-full cursor-pointer">
                    <div className="relative h-44 w-full overflow-hidden bg-[#0b1623]">
                      <SectorVideo slug={(tracker.href.split('/').pop() as string) ?? 'fintech'} priority={i < 2} />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                      <div className="pointer-events-none absolute bottom-3 left-4 flex items-center gap-2">
                        <span className="text-xl">{tracker.emoji}</span>
                        <span className="text-lg font-bold text-white drop-shadow">{tracker.sector}</span>
                      </div>
                    </div>
                    <div className="p-6">
                    <p className="text-3xl font-bold cinema-text-gradient mb-2">
                      <AnimatedCounter
                        value={tracker.value}
                        prefix={tracker.prefix ?? ''}
                        suffix={tracker.suffix ?? ''}
                        duration={2000}
                      />
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">{tracker.label}</p>
                    <p className="text-sm text-gray-400 mb-4">{tracker.metric}</p>
                    <div className="inline-flex items-center gap-1 px-3 py-1 glass-cinema-light text-amber-300 text-xs rounded-full">
                      🔒 Full data: subscribers
                    </div>
                    </div>
                  </Link>
                </GlassCard3D>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-12">
            <MagneticButton3D href="/tracker" variant="outline" className="px-6 py-2.5 text-sm">
              View All Trackers →
            </MagneticButton3D>
          </div>
        </div>
      </section>

      {/* ===== LATEST INSIGHTS ===== */}
      <section className="relative py-24 bg-cinema-black overflow-hidden">
        <div className="absolute inset-0 cinema-mesh opacity-15" />
        <div className="wrap relative z-10">
          <ScrollReveal>
            <SectionHeader
              label="Insights"
              title="Latest Insights"
              subtitle="Timely analysis and market intelligence"
              align="center"
              light
            />
          </ScrollReveal>
          <div className="mt-14">
            <InsightGrid posts={insights} />
          </div>
        </div>
      </section>

      {/* ===== SERVICES CTA ===== */}
      <section className="relative py-28 overflow-hidden bg-cinema-ink">
        <div className="absolute inset-0 cinema-mesh opacity-50" />
        <div className="absolute inset-0 cinema-noise" />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cinema-glow-blue/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cinema-violet/20 blur-[120px]" />
        <div className="wrap text-center relative z-10">
          <ScrollReveal>
            <RevealText
              as="h2"
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              stagger={0.05}
            >
              Ready to Transform Your Financial Intelligence?
            </RevealText>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-300 leading-relaxed">
              Access our comprehensive suite of research tools, data analytics, and expert insights to stay ahead in the financial markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton3D href="/services" variant="solid" className="px-7 py-3 text-base">
                Explore Services
              </MagneticButton3D>
              <MagneticButton3D href="/contact" variant="outline" className="px-7 py-3 text-base">
                Get in Touch
              </MagneticButton3D>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PODCAST ===== */}
      <section className="relative py-24 bg-cinema-black overflow-hidden">
        <div className="absolute inset-0 cinema-grid opacity-20" />
        <div className="wrap relative z-10">
          <ScrollReveal>
            <SectionHeader
              label="Kunwar Analytics Podcast"
              title="Market Intelligence in 30 Minutes"
              align="center"
              light
            />
          </ScrollReveal>
          <div className="mt-12 max-w-4xl mx-auto">
            <ScrollReveal delay={100}>
              <GlassCard3D glow="aurora" className="h-full">
                <div className="p-8 flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="text-6xl font-bold cinema-text-glow">01</div>
                    <div className="mt-3 px-3 py-1 glass-cinema-light text-cinema-aurora text-xs font-medium rounded-full inline-block">
                      Deep Dive
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Episode 1: Blinkit EBITDA Breakdown
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      A detailed analysis of Blinkit's path to profitability, unit economics, and the broader quick‑commerce landscape in India. We break down the key drivers, competitive moats, and what it means for investors.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <MagneticButton3D href="/podcast/ep001-blinkit-ebitda-breakdown" variant="outline" className="px-5 py-2 text-sm">
                        Listen & Read Notes →
                      </MagneticButton3D>
                      <Link href="/podcast" className="text-sm text-cinema-cyan hover:underline self-center">
                        All Episodes →
                      </Link>
                    </div>
                  </div>
                </div>
              </GlassCard3D>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="relative py-24 bg-cinema-ink overflow-hidden">
        <div className="absolute inset-0 cinema-mesh opacity-30" />
        <div className="wrap relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollReveal>
              <SectionHeader
                label="Stay Updated"
                title="Subscribe to Our Newsletter"
                subtitle="Get the latest research, insights, and market analysis delivered to your inbox"
                align="center"
                light
              />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <NewsletterForm />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Global Forecasting Ticker */}
      <GlobalForecastingTicker />
    </>
  );
}
