import type { Metadata } from 'next';
import { CERTIFICATES, CERTIFICATE_CATEGORIES } from '@/lib/certificates';
import CertificatesClient from './CertificatesClient';

export const metadata: Metadata = {
    title: 'Certificate Pathways | Kunwar Analytics',
    description:
        'Explore finance, analytics and strategy pathway listings. These catalogue entries are not earned credentials. Eligible course completions are recorded privately after lesson criteria and a passing final test; no public or cryptographic verification is provided.',
    alternates: { canonical: 'https://kunwaranalytics.in/certificates' },
    openGraph: {
        title: 'Certificate Pathways | Kunwar Analytics',
        description:
            'Catalogue of finance, analytics and strategy learning pathways; listings are not credentials, and private course-completion records are unsigned and not publicly verifiable.',
        url: 'https://kunwaranalytics.in/certificates',
        type: 'website',
    },
};

export default function CertificatesPage() {
    return <CertificatesClient certificates={CERTIFICATES} categories={CERTIFICATE_CATEGORIES} />;
}
