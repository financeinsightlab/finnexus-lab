'use client';

export default function ResumeActions() {
  return (
    <div className="print:hidden bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="wrap py-4 flex items-center justify-between">

        <button
          onClick={() => window.print()}
          className="text-brand-teal hover:text-brand-navy font-medium"
        >
          🖨️ Print Resume
        </button>

        <a
          href="/assets/finnexus-lab-cv.pdf"
          download
          className="btn btn-primary"
        >
          Download PDF
        </a>

      </div>
    </div>
  );
}