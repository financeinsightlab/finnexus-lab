// FILE: app/case-studies/[slug]/download/route.ts
// GET /case-studies/:slug/download → generates & streams a PDF of the case study.
import { getCaseStudyBySlug } from '@/lib/content';
import { buildCaseStudyPdf } from '@/lib/case-study-pdf';

export const runtime = 'nodejs';

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    return new Response('Not found', { status: 404 });
  }

  try {
    const pdfBytes = await buildCaseStudyPdf(study);
    return new Response(new Uint8Array(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="kunwar-analytics-case-study-${study.slug}.pdf"`,
        'Content-Length': String(pdfBytes.byteLength),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (e) {
    console.error('PDF generation failed:', e);
    return new Response('Could not generate PDF', { status: 500 });
  }
}
