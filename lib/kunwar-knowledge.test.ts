import { describe, expect, it } from 'vitest';
import {
    getPlatformPassages,
    getPlatformSystemPrompt,
    searchPlatformTopics,
    synthesizeLocalPlatformAnswer,
} from './kunwar-knowledge';

describe('Ask Kunwar platform knowledge', () => {
    it('uses the current plan prices and manual approval policy', () => {
        const pricing = getPlatformPassages('What are Pro and Elite prices?');
        expect(pricing[0]?.title).toContain('Pricing');
        expect(pricing.map((source) => source.description).join(' ')).toContain('Pro: ₹999/month');
        expect(pricing.map((source) => source.description).join(' ')).toContain('Elite: ₹1,999/month');

        const payment = getPlatformPassages('How do I pay with UPI and renew?');
        const facts = payment.map((source) => source.description).join(' ');
        expect(facts).toContain('PENDING');
        expect(facts).toContain('administrator');
        expect(facts).toContain('one calendar month');
        expect(facts).not.toContain('within 30 minutes');
    });

    it('does not claim Brier scores, vector search, intraday quotes, or certificates as issued', () => {
        expect(getPlatformSystemPrompt()).toContain('Do not claim Brier scores');
        const ledger = searchPlatformTopics('Brier prediction ledger')[0];
        expect(ledger?.fullContent).toContain('no Brier score is calculated');
        expect(searchPlatformTopics('vector search')[0]?.fullContent).toContain('not a claim of embedding/vector search');
        expect(searchPlatformTopics('intraday quotes')[0]?.fullContent).toContain('They are not intraday quotes');
        const certificates = searchPlatformTopics('certificate issue')[0]?.fullContent ?? '';
        expect(certificates).toContain('catalogue listings only');
        expect(certificates).toContain('individual certificate issuance');
        expect(certificates).toContain('not currently available');

        const answerSources = getPlatformPassages('How do I verify a certificate?').map((source, index) => ({
            ...source,
            index: index + 1,
        }));
        const certificateAnswer = synthesizeLocalPlatformAnswer('How do I verify a certificate?', answerSources);
        expect(certificateAnswer).toContain('catalogue listings only');
        expect(certificateAnswer).not.toContain('issued credential');
    });

    it('creates local payment answers only with real platform passage references', () => {
        expect(synthesizeLocalPlatformAnswer('How does UPI payment work?', [])).toBeNull();
        const sources = getPlatformPassages('How does UPI payment work?').map((source, index) => ({
            ...source,
            index: index + 1,
        }));
        const answer = synthesizeLocalPlatformAnswer('How does UPI payment work?', sources);
        expect(answer).toContain('administrator');
        expect(answer).toContain('one calendar month');
        expect(answer).not.toContain('30 minutes');
    });
});
