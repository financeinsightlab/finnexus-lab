import type { Metadata } from 'next';
import AskKunwar from '@/components/ask/AskKunwar';

export const metadata: Metadata = {
    title: 'Ask Kunwar — sourced answers from our research',
    description:
        'Ask a question about markets, strategy or the study library and get an answer with citations to the exact Kunwar Analytics pages it came from.',
    alternates: { canonical: '/ask' },
};

export default function AskPage() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <header className="mx-auto mb-10 max-w-3xl text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                    Ask Kunwar
                </p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-content-primary sm:text-5xl">
                    Answers, with their sources
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-base text-content-secondary">
                    This assistant answers only from Kunwar Analytics content and cites every page it
                    uses. If it cannot find a source, it says so.
                </p>
            </header>

            <AskKunwar />

            <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-content-muted">
                Answers are assembled from our published research, insights, case studies and study
                material. Always verify against the cited source before making a decision.
            </p>
        </main>
    );
}
