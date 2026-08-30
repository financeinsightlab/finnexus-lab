'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-teal-300 hover:bg-teal-500/20 transition-colors"
    >
      🖨️ Print / Save as PDF
    </button>
  );
}
