// FILE: app/data-lab/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import Tag from '@/components/ui/Tag';
import JsonLd from '@/components/seo/JsonLd';
import DataLabChart from '@/components/data-lab/DataLabChart';
import DataLabDownload from '@/components/data-lab/DataLabDownload';
import DataLabToc from '@/components/data-lab/DataLabToc';
import MobileToc from '@/components/data-lab/MobileToc';
import DataLabShare from '@/components/data-lab/DataLabShare';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { mdxComponents } from '@/components/data-lab/mdxComponents';
import QCommerceCalc from '@/components/calculators/QCommerceCalc';
import { formatDate } from '@/lib/utils';
import { getDataLabBySlug, getAllDataLab } from '@/lib/content';
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Wrench, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function extractToc(content: string) {
  const items: { id: string; text: string; level: number }[] = [];
  const lines = content.split('\n');
  for (const line of lines) {
    const m = line.match(/^(#{2,3})\s+(.+)/);
    if (!m) continue;
    const level = m[1].length;
    const text = m[2].trim();
    items.push({ id: slugify(text), text, level });
  }
  return items;
}

function readingTime(content: string) {
  const words = content.replace(/^---[\s\S]*?---\n/, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function generateStaticParams() {
  const projects = getAllDataLab();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getDataLabBySlug(slug);
  if (!project) return { title: 'Not Found' };
  const img = project.image ?? `/images/data-lab/${project.slug}.jpg`;
  return {
    title: `${project.title} | Data Lab`,
    description: project.businessQuestion,
    openGraph: {
      title: `${project.title} | Data Lab`,
      description: project.businessQuestion,
      url: `https://kunwaranalytics.in/data-lab/${project.slug}`,
      images: [{ url: `https://kunwaranalytics.in${img}`, width: 3840, height: 2160 }],
      type: 'article',
    },
  };
}

// Per-project interactive datasets (mirrors the MDX narrative)
const PROJECT_DATA: Record<string, { chart: any; download: Record<string, unknown>[]; simulator?: boolean }> = {
  'qcommerce-unit-economics-model': {
    chart: {
      title: 'Contribution Margin vs. Daily Order Volume',
      subtitle: 'Drag the model inputs in the simulator below to see live movement on this curve',
      xKey: 'orders',
      type: 'line',
      series: [
        { key: 'cm1', name: 'CM1 Margin %', color: '#22d3ee', kind: 'line' },
        { key: 'cm2', name: 'CM2 Margin %', color: '#a78bfa', kind: 'line' },
        { key: 'cogs', name: 'Product COGS ₹000s', color: '#f472b6', kind: 'bar' },
      ],
      data: [
        { orders: 200, cm1: -18.2, cm2: -34.5, cogs: 3348 },
        { orders: 260, cm1: -10.4, cm2: -24.1, cogs: 4352 },
        { orders: 320, cm1: -3.6, cm2: -14.8, cogs: 5357 },
        { orders: 380, cm1: 2.4, cm2: -6.4, cogs: 6361 },
        { orders: 410, cm1: 5.6, cm2: -1.2, cogs: 6863 },
        { orders: 450, cm1: 9.1, cm2: 4.9, cogs: 7533 },
        { orders: 520, cm1: 14.2, cm2: 11.6, cogs: 8705 },
        { orders: 600, cm1: 20.1, cm2: 19.2, cogs: 10044 },
      ],
    },
    download: [
      { orders_per_day: 200, revenue_inr: 133920, cm1_margin: -18.2, cm2_margin: -34.5, contribution_inr: -24373 },
      { orders_per_day: 260, revenue_inr: 174096, cm1_margin: -10.4, cm2_margin: -24.1, contribution_inr: -18106 },
      { orders_per_day: 320, revenue_inr: 214272, cm1_margin: -3.6, cm2_margin: -14.8, contribution_inr: -7714 },
      { orders_per_day: 380, revenue_inr: 254448, cm1_margin: 2.4, cm2_margin: -6.4, contribution_inr: 6107 },
      { orders_per_day: 410, revenue_inr: 274536, cm1_margin: 5.6, cm2_margin: -1.2, contribution_inr: 15374 },
      { orders_per_day: 450, revenue_inr: 301320, cm1_margin: 9.1, cm2_margin: 4.9, contribution_inr: 27420 },
      { orders_per_day: 520, revenue_inr: 348160, cm1_margin: 14.2, cm2_margin: 11.6, contribution_inr: 49438 },
      { orders_per_day: 600, revenue_inr: 401760, cm1_margin: 20.1, cm2_margin: 19.2, contribution_inr: 80753 },
    ],
    simulator: true,
  },
  'india-startup-funding-analysis': {
    chart: {
      title: 'Indian Startup Funding by Fiscal Year',
      subtitle: 'Total funding (₹ Bn) and deal count, FY20 → FY26',
      xKey: 'fy',
      type: 'bar',
      series: [
        { key: 'funding', name: 'Funding (₹ Bn)', color: '#8b5cf6', kind: 'bar' },
        { key: 'deals', name: 'Deals (#)', color: '#22d3ee', kind: 'line' },
      ],
      data: [
        { fy: 'FY20', funding: 421, deals: 1240 },
        { fy: 'FY21', funding: 683, deals: 1510 },
        { fy: 'FY22', funding: 1240, deals: 2050 },
        { fy: 'FY23', funding: 870, deals: 1680 },
        { fy: 'FY24', funding: 615, deals: 1290 },
        { fy: 'FY25', funding: 742, deals: 1450 },
        { fy: 'FY26E', funding: 520, deals: 980 },
      ],
    },
    download: [
      { fiscal_year: 'FY20', funding_inr_bn: 421, deals: 1240, avg_ticket_cr: 34, growth_ytd: null },
      { fiscal_year: 'FY21', funding_inr_bn: 683, deals: 1510, avg_ticket_cr: 45, growth_ytd: 62.2 },
      { fiscal_year: 'FY22', funding_inr_bn: 1240, deals: 2050, avg_ticket_cr: 60, growth_ytd: 81.6 },
      { fiscal_year: 'FY23', funding_inr_bn: 870, deals: 1680, avg_ticket_cr: 52, growth_ytd: -29.8 },
      { fiscal_year: 'FY24', funding_inr_bn: 615, deals: 1290, avg_ticket_cr: 48, growth_ytd: -29.3 },
      { fiscal_year: 'FY25', funding_inr_bn: 742, deals: 1450, avg_ticket_cr: 51, growth_ytd: 20.7 },
      { fiscal_year: 'FY26E', funding_inr_bn: 520, deals: 980, avg_ticket_cr: 53, growth_ytd: -29.9 },
    ],
  },
  'india-ev-penetration-model': {
    chart: {
      title: 'EV Penetration by Segment (Base Scenario)',
      subtitle: 'Share of annual sales, FY21 → FY30',
      xKey: 'fy',
      type: 'line',
      series: [
        { key: 'e2w', name: 'E2W Penetration %', color: '#10b981', kind: 'line' },
        { key: 'e4w', name: 'E4W Penetration %', color: '#22d3ee', kind: 'line' },
        { key: 'e3w', name: 'E3W Penetration %', color: '#f59e0b', kind: 'line' },
      ],
      data: [
        { fy: 'FY21', e2w: 1.0, e4w: 0.5, e3w: 7.0 },
        { fy: 'FY22', e2w: 3.4, e4w: 1.1, e3w: 15.0 },
        { fy: 'FY23', e2w: 5.3, e4w: 2.2, e3w: 28.0 },
        { fy: 'FY24', e2w: 9.0, e4w: 3.8, e3w: 42.0 },
        { fy: 'FY25', e2w: 12.5, e4w: 5.6, e3w: 55.0 },
        { fy: 'FY26E', e2w: 17.0, e4w: 7.5, e3w: 63.0 },
        { fy: 'FY28E', e2w: 28.0, e4w: 9.5, e3w: 72.0 },
        { fy: 'FY30E', e2w: 38.0, e4w: 12.0, e3w: 78.0 },
      ],
    },
    download: [
      { fiscal_year: 'FY21', e2w_pct: 1.0, e4w_pct: 0.5, e3w_pct: 7.0 },
      { fiscal_year: 'FY22', e2w_pct: 3.4, e4w_pct: 1.1, e3w_pct: 15.0 },
      { fiscal_year: 'FY23', e2w_pct: 5.3, e4w_pct: 2.2, e3w_pct: 28.0 },
      { fiscal_year: 'FY24', e2w_pct: 9.0, e4w_pct: 3.8, e3w_pct: 42.0 },
      { fiscal_year: 'FY25', e2w_pct: 12.5, e4w_pct: 5.6, e3w_pct: 55.0 },
      { fiscal_year: 'FY26E', e2w_pct: 17.0, e4w_pct: 7.5, e3w_pct: 63.0 },
      { fiscal_year: 'FY28E', e2w_pct: 28.0, e4w_pct: 9.5, e3w_pct: 72.0 },
      { fiscal_year: 'FY30E', e2w_pct: 38.0, e4w_pct: 12.0, e3w_pct: 78.0 },
    ],
  },
  'fintech-lending-risk-model': {
    chart: {
      title: 'Digital Lending Book Growth vs. Credit Risk',
      subtitle: 'Retail loan AUM (₹ Tn) and sector GNPA %, FY21 → FY26',
      xKey: 'fy',
      type: 'bar',
      series: [
        { key: 'aum', name: 'AUM (₹ Tn)', color: '#f59e0b', kind: 'bar' },
        { key: 'gnpa', name: 'GNPA %', color: '#ef4444', kind: 'line' },
      ],
      data: [
        { fy: 'FY21', aum: 1.1, gnpa: 3.9 },
        { fy: 'FY22', aum: 1.6, gnpa: 4.4 },
        { fy: 'FY23', aum: 2.4, gnpa: 3.6 },
        { fy: 'FY24', aum: 3.1, gnpa: 2.9 },
        { fy: 'FY25', aum: 3.7, gnpa: 2.7 },
        { fy: 'FY26E', aum: 4.2, gnpa: 2.9 },
      ],
    },
    download: [
      { fiscal_year: 'FY21', aum_inr_tn: 1.1, gnpa_pct: 3.9, loan_book_cagr: null },
      { fiscal_year: 'FY22', aum_inr_tn: 1.6, gnpa_pct: 4.4, loan_book_cagr: 45.5 },
      { fiscal_year: 'FY23', aum_inr_tn: 2.4, gnpa_pct: 3.6, loan_book_cagr: 50.0 },
      { fiscal_year: 'FY24', aum_inr_tn: 3.1, gnpa_pct: 2.9, loan_book_cagr: 29.2 },
      { fiscal_year: 'FY25', aum_inr_tn: 3.7, gnpa_pct: 2.7, loan_book_cagr: 19.4 },
      { fiscal_year: 'FY26E', aum_inr_tn: 4.2, gnpa_pct: 2.9, loan_book_cagr: 13.5 },
    ],
  },
  'mutual-fund-sip-analysis': {
    chart: {
      title: 'Monthly SIP Inflows (₹ Bn)',
      subtitle: 'Systematic investment plan inflows, FY20 → FY26',
      xKey: 'fy',
      type: 'bar',
      series: [
        { key: 'inflows', name: 'Monthly SIP (₹ Bn)', color: '#f59e0b', kind: 'bar' },
        { key: 'accounts', name: 'SIP Accounts (Mn)', color: '#22d3ee', kind: 'line' },
      ],
      data: [
        { fy: 'FY20', inflows: 82, accounts: 28 },
        { fy: 'FY21', inflows: 80, accounts: 35 },
        { fy: 'FY22', inflows: 106, accounts: 45 },
        { fy: 'FY23', inflows: 134, accounts: 59 },
        { fy: 'FY24', inflows: 173, accounts: 75 },
        { fy: 'FY25', inflows: 225, accounts: 91 },
        { fy: 'FY26E', inflows: 270, accounts: 110 },
      ],
    },
    download: [
      { fiscal_year: 'FY20', monthly_sip_inr_bn: 82, sip_accounts_mn: 28 },
      { fiscal_year: 'FY21', monthly_sip_inr_bn: 80, sip_accounts_mn: 35 },
      { fiscal_year: 'FY22', monthly_sip_inr_bn: 106, sip_accounts_mn: 45 },
      { fiscal_year: 'FY23', monthly_sip_inr_bn: 134, sip_accounts_mn: 59 },
      { fiscal_year: 'FY24', monthly_sip_inr_bn: 173, sip_accounts_mn: 75 },
      { fiscal_year: 'FY25', monthly_sip_inr_bn: 225, sip_accounts_mn: 91 },
      { fiscal_year: 'FY26E', monthly_sip_inr_bn: 270, sip_accounts_mn: 110 },
    ],
  },
  'stock-market-concentration': {
    chart: {
      title: 'Nifty Top-10 Weight Share',
      subtitle: 'Concentration of index returns in the top 10 stocks, FY15 → FY26',
      xKey: 'fy',
      type: 'line',
      series: [
        { key: 'top10', name: 'Top-10 Weight %', color: '#8b5cf6', kind: 'line' },
        { key: 'top50', name: 'Top-50 Weight %', color: '#22d3ee', kind: 'line' },
      ],
      data: [
        { fy: 'FY15', top10: 46, top50: 82 },
        { fy: 'FY17', top10: 48, top50: 84 },
        { fy: 'FY19', top10: 51, top50: 86 },
        { fy: 'FY21', top10: 49, top50: 85 },
        { fy: 'FY23', top10: 54, top50: 88 },
        { fy: 'FY25', top10: 57, top50: 90 },
        { fy: 'FY26E', top10: 58, top50: 91 },
      ],
    },
    download: [
      { fiscal_year: 'FY15', top10_weight_pct: 46, top50_weight_pct: 82 },
      { fiscal_year: 'FY17', top10_weight_pct: 48, top50_weight_pct: 84 },
      { fiscal_year: 'FY19', top10_weight_pct: 51, top50_weight_pct: 86 },
      { fiscal_year: 'FY21', top10_weight_pct: 49, top50_weight_pct: 85 },
      { fiscal_year: 'FY23', top10_weight_pct: 54, top50_weight_pct: 88 },
      { fiscal_year: 'FY25', top10_weight_pct: 57, top50_weight_pct: 90 },
      { fiscal_year: 'FY26E', top10_weight_pct: 58, top50_weight_pct: 91 },
    ],
  },
  'd2c-brand-unit-economics': {
    chart: {
      title: 'LTV:CAC vs. Repeat Rate',
      subtitle: 'Lifetime-value-to-CAC ratio at different repeat-purchase rates',
      xKey: 'repeat',
      type: 'bar',
      series: [
        { key: 'ltv', name: 'LTV:CAC', color: '#ec4899', kind: 'bar' },
        { key: 'margin', name: 'Contribution Margin %', color: '#22d3ee', kind: 'line' },
      ],
      data: [
        { repeat: '10%', ltv: 1.4, margin: 16 },
        { repeat: '20%', ltv: 2.1, margin: 19 },
        { repeat: '30%', ltv: 2.8, margin: 22 },
        { repeat: '40%', ltv: 3.4, margin: 24 },
        { repeat: '50%', ltv: 4.1, margin: 26 },
        { repeat: '60%', ltv: 4.8, margin: 28 },
      ],
    },
    download: [
      { repeat_rate_pct: '10%', ltv_cac: 1.4, contribution_margin_pct: 16 },
      { repeat_rate_pct: '20%', ltv_cac: 2.1, contribution_margin_pct: 19 },
      { repeat_rate_pct: '30%', ltv_cac: 2.8, contribution_margin_pct: 22 },
      { repeat_rate_pct: '40%', ltv_cac: 3.4, contribution_margin_pct: 24 },
      { repeat_rate_pct: '50%', ltv_cac: 4.1, contribution_margin_pct: 26 },
      { repeat_rate_pct: '60%', ltv_cac: 4.8, contribution_margin_pct: 28 },
    ],
  },
};

export default async function DataLabProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getDataLabBySlug(slug);
  if (!project) notFound();

  const visual = PROJECT_DATA[slug];
  const all = getAllDataLab();
  const related = all.filter(p => p.slug !== slug).slice(0, 3);
  const fallbackImg = `/images/data-lab/${project.slug}.jpg`;
  const tocItems = project.content ? extractToc(project.content) : [];
  const mins = project.content ? readingTime(project.content) : 0;
  const idx = all.findIndex(p => p.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  // Optional cross-link to a related calculator/tool
  const relatedTool = {
    'qcommerce-unit-economics-model': { label: 'Try the Q-Commerce Calculator', href: '/tools/q-commerce-model' },
    'd2c-brand-unit-economics': { label: 'Explore DCF Valuation Model', href: '/tools/dcf-valuation-model' },
    'stock-market-concentration': { label: 'Explore Market Sizing Framework', href: '/tools/market-sizing-framework' },
    'mutual-fund-sip-analysis': { label: 'Explore 3-Statement Model', href: '/tools/3-statement-model' },
  }[slug];

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: project.title,
    description: project.businessQuestion,
    url: `https://kunwaranalytics.in/data-lab/${project.slug}`,
    ...(project.image ? { image: `https://kunwaranalytics.in${project.image}` } : {}),
    datePublished: project.date,
    creator: { '@type': 'Organization', name: 'Kunwar Analytics', url: 'https://kunwaranalytics.in' },
    keywords: [...project.tools, project.sector].join(', '),
  };

  return (
    <div className="min-h-screen bg-cinema-ink">
      <JsonLd data={datasetSchema} />
      {/* Reading progress bar */}
      <ScrollProgress />
      {/* ===== CINEMATIC HEADER ===== */}
      <section className="relative overflow-hidden bg-cinema-ink">
        <div className="absolute inset-0 cinema-mesh opacity-25" />
        <div className="absolute inset-0 cinema-grid opacity-15" />
        <div className="absolute inset-0 cinema-noise" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-cinema-violet/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-cinema-glow-blue/20 blur-[120px]" />

        <div className="wrap relative z-10 max-w-6xl pt-16 pb-12 md:pt-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href="/data-lab" className="hover:text-white transition">Data Lab</Link>
            <span>/</span>
            <span className="text-cinema-cyan">{project.sector}</span>
          </nav>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
            <div>
              <div className="flex flex-wrap gap-2.5 mb-5">
                {project.tools.map(t => <Tag key={t} variant="silver" text={t} className="text-sm" />)}
                <Tag variant="teal" text={project.sector} className="text-sm" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-[1.08]">
                {project.title}
              </h1>
              <blockquote className="mt-6 border-l-4 border-cinema-cyan pl-5 py-1">
                <p className="text-lg text-gray-200 italic">{project.businessQuestion}</p>
              </blockquote>

              {/* Metadata */}
              <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-white/10 text-gray-300">
                <div className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cinema-cyan" />
                  <span className="text-sm text-gray-400">Published</span>
                  <span className="font-medium text-white">{formatDate(project.date)}</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cinema-cyan" />
                  <span className="text-sm text-gray-400">Duration</span>
                  <span className="font-medium text-white">{project.duration}</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-cinema-cyan" />
                  <span className="text-sm text-gray-400">Tools</span>
                  <span className="font-medium text-white">{project.tools.join(', ')}</span>
                </div>
                {mins > 0 && (
                  <div className="inline-flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cinema-cyan" />
                    <span className="text-sm text-gray-400">Read</span>
                    <span className="font-medium text-white">~{mins} min</span>
                  </div>
                )}
              </div>
              <div className="mt-6">
                <DataLabShare title={project.title} slug={project.slug} />
              </div>
            </div>

            {/* Hero image card */}
            <div className="glass-cinema rounded-2xl border border-white/10 overflow-hidden shadow-cinema-lg">
              <div className="relative overflow-hidden" style={{ height: 220 }}>
                <Image
                  src={project.image ?? fallbackImg}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  quality={90}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121419] via-transparent to-transparent" />
              </div>
              {project.kpis && project.kpis.length > 0 && (
                <div className="grid grid-cols-2 gap-3 p-5">
                  {project.kpis.map(k => (
                    <div key={k.label} className="rounded-xl bg-white/5 border border-white/10 p-3">
                      <div className="text-2xl font-bold cinema-text-glow">{k.value}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{k.label}</div>
                      {k.hint && <div className="text-[10px] text-cinema-cyan mt-0.5">{k.hint}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE LAB ===== */}
      {visual && (
        <section className="wrap max-w-6xl py-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-2 text-cinema-cyan text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-4 h-4" /> Interactive Lab
              </span>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">Explore the Model</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {visual.download && (
                <DataLabDownload filename={`kunwar-datalab-${slug}`} data={visual.download} />
              )}
              {relatedTool && (
                <Link
                  href={relatedTool.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-cinema-violet/15 border border-cinema-violet/30 text-cinema-violet px-4 py-2.5 text-sm font-medium hover:bg-cinema-violet/25 transition"
                >
                  <ArrowUpRight className="w-4 h-4" /> {relatedTool.label}
                </Link>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <DataLabChart
              title={visual.chart.title}
              subtitle={visual.chart.subtitle}
              data={visual.chart.data}
              xKey={visual.chart.xKey}
              series={visual.chart.series}
              type={visual.chart.type}
              height={380}
            />
          </div>
        </section>
      )}

      {/* ===== SIMULATOR ===== */}
      {visual?.simulator && (
        <section className="wrap max-w-6xl pb-12">
          <div className="glass-cinema rounded-2xl border border-white/10 p-6 md:p-8">
            <span className="inline-flex items-center gap-2 text-cinema-aurora text-xs font-semibold uppercase tracking-widest">
              <Wrench className="w-4 h-4" /> Live Simulator
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">Try the Unit Economics Model</h2>
            <p className="text-gray-400 mt-2 mb-6">Adjust the inputs — orders, AOV, costs — and watch contribution margin recompute live.</p>
            <QCommerceCalc slug={slug} isPremiumUser={false} />
          </div>
        </section>
      )}

      {/* ===== FULL ANALYSIS ===== */}
      <section className="wrap max-w-6xl pb-16">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start">
          {/* TOC — sticky on desktop, collapsible on mobile */}
          {tocItems.length > 0 && (
            <aside className="lg:sticky lg:top-24">
              <div className="hidden lg:block">
                <DataLabToc items={tocItems} />
              </div>
              <MobileToc items={tocItems} />
            </aside>
          )}

          <div className="glass-cinema rounded-2xl border border-white/10 p-6 md:p-10 min-w-0">
            {project.content ? (
              <div className="prose prose-lg max-w-none prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300 prose-h2:mt-10 prose-h2:mb-4">
                <MDXRemote source={project.content} components={mdxComponents} />
              </div>
            ) : (
              <p className="text-gray-400">Full content coming soon.</p>
            )}
          </div>
        </div>
      </section>

      {/* ===== RELATED ===== */}
      {related.length > 0 && (
        <section className="wrap max-w-6xl pb-24">
          <h2 className="text-2xl font-bold text-white mb-8">More from the Data Lab</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(r => (
              <Link
                key={r.slug}
                href={`/data-lab/${r.slug}`}
                className="glass-cinema group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="relative overflow-hidden" style={{ height: 140 }}>
                  <Image
                    src={r.image ?? `/images/data-lab/${r.slug}.jpg`}
                    alt={r.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={80}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121419] via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold text-cinema-cyan uppercase tracking-wider">{r.sector}</span>
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-cinema-cyan/20 backdrop-blur flex items-center justify-center text-white border border-cinema-cyan/30 group-hover:bg-cinema-cyan transition">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-white leading-snug group-hover:text-cinema-cyan transition-colors">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/data-lab"
            className="inline-flex items-center gap-2 mt-10 text-cinema-cyan hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> All Data Lab Projects
          </Link>

          {/* Prev / Next navigation */}
          {(prev || next) && (
            <div className="grid sm:grid-cols-2 gap-4 mt-14 pt-10 border-t border-white/10">
              {prev ? (
                <Link
                  href={`/data-lab/${prev.slug}`}
                  className="glass-cinema group rounded-2xl border border-white/10 p-5 hover:border-white/25 transition-all hover:-translate-y-0.5"
                >
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400 uppercase tracking-wider mb-2 group-hover:text-cinema-cyan transition">
                    <ChevronLeft className="w-3.5 h-3.5" /> Previous
                  </span>
                  <div className="text-sm font-semibold text-white leading-snug group-hover:text-cinema-cyan transition-colors line-clamp-2">
                    {prev.title}
                  </div>
                </Link>
              ) : <div />}
              {next && (
                <Link
                  href={`/data-lab/${next.slug}`}
                  className="glass-cinema group rounded-2xl border border-white/10 p-5 text-right hover:border-white/25 transition-all hover:-translate-y-0.5"
                >
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400 uppercase tracking-wider mb-2 justify-end group-hover:text-cinema-cyan transition">
                    Next <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                  <div className="text-sm font-semibold text-white leading-snug group-hover:text-cinema-cyan transition-colors line-clamp-2">
                    {next.title}
                  </div>
                </Link>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
