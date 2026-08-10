import type { Metadata, Viewport } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';
import Analytics from '@/components/ui/Analytics';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Providers from '@/components/ThemeProvider'
import AuthProvider from "@/components/providers/AuthProvider";
import PageTracker from "@/components/analytics/PageTracker";
import { Suspense } from "react";
import JsonLd, { organizationSchema, websiteSchema } from "@/components/seo/JsonLd";
import CustomCursor from '@/components/ui/CustomCursor';
import SmoothScroll from '@/components/ui/SmoothScroll';

export const metadata: Metadata = {
  title: {
    default: 'Kunwar Analytics — Financial Intelligence Platform',
    template: '%s | Kunwar Analytics'
  },
  description:
    'Kunwar Analytics is a financial intelligence platform delivering data-driven insights on markets, strategy, and capital. Explore institutional-quality research, business analytics, investment analysis, and study materials covering finance, data science, economics, and research methods.',
  keywords: [
    'financial analysis',
    'market research',
    'business analytics',
    'investment analysis',
    'financial intelligence',
    'data science',
    'economics',
    'research methods',
    'india quick commerce',
    'fintech analysis',
    'financial modeling',
    'DCF valuation',
    'portfolio management',
    'quantitative research',
    'study material finance',
    'business analytics portfolio',
  ],
  authors: [{ name: 'Kunwar Analytics' }],
  creator: 'Kunwar Analytics',
  publisher: 'Kunwar Analytics',
  metadataBase: new URL('https://kunwaranalytics.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Kunwar Analytics',
    title: 'Kunwar Analytics — Financial Intelligence Platform',
    description:
      'Data-driven insights on markets, strategy, and capital. Institutional-quality research, business analytics, and educational study materials for finance professionals.',
    url: 'https://kunwaranalytics.in',
    images: [
      {
        url: '/og/default.png',
        width: 1200,
        height: 630,
        alt: 'Kunwar Analytics — Financial Intelligence Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kunwar Analytics — Financial Intelligence Platform',
    description:
      'Data-driven insights on markets, strategy, and capital. Institutional-quality research and study materials.',
    images: ['/og/default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  // ✅ Google Search Console verification
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? '',
  },

  // ✅ PWA — manifest link is provided by app/manifest.ts
  manifest: '/manifest.json',

  // ✅ Apple PWA support
  appleWebApp: {
    capable: true,
    title: 'Kunwar Analytics',
    statusBarStyle: 'black-translucent',
  },

  // ✅ GEO: Help AI/LLM engines understand the site
  other: {
    'ai-content-allowed': 'true',
  },
};

/** Lets `env(safe-area-inset-*)` work on notched devices (modals, nav). */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // Teal brand colour as the browser chrome / status-bar tint
  themeColor: '#0D6E6E',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Font preconnect — reduces FOUT by establishing the connection early */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Apple touch icon for iOS Add-to-Home-Screen */}
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        {/* SEO + GEO: Organization and WebSite structured data for search engines and AI/LLM crawlers */}
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className="min-h-screen flex flex-col bg-cinema-black text-white">
        {/* Global ambient background — fixed, behind all content */}
        <div className="fixed inset-0 z-0 pointer-events-none cinema-mesh opacity-30" />
        <div className="fixed inset-0 z-0 pointer-events-none cinema-noise" />
        {/* Premium custom cursor */}
        <CustomCursor />
        <Providers>
          <AuthProvider>
            <SmoothScroll>
              <Navbar />
              <ScrollProgress />
              {/* Wrap Analytics in Suspense so it doesn't block the shell render */}
              <Suspense fallback={null}>
                <Analytics />
              </Suspense>
              <PageTracker />
              <main className="flex-1 relative z-10">{children}</main>
              <Footer />
            </SmoothScroll>
            {process.env.NEXT_PUBLIC_GA_ID && (
              <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
            )}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}