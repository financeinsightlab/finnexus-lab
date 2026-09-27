import type { Metadata } from 'next';
import { CERTIFICATES, CERTIFICATE_CATEGORIES } from '@/lib/certificates';
import CertificatesClient from './CertificatesClient';

export const metadata: Metadata = {
    title: 'Certificates | Kunwar Analytics',
    description:
        'Verifiable finance, analytics and strategy credentials. Earn a certificate, add it to LinkedIn, and let anyone confirm it with a public verification record.',
    alternates: { canonical: 'https://kunwaranalytics.in/certificates' },
    openGraph: {
        title: 'Certificates | Kunwar Analytics',
        description:
            'Verifiable finance, analytics and strategy credentials with public verification records.',
        url: 'https://kunwaranalytics.in/certificates',
        type: 'website',
    },
};

export default function CertificatesPage() {
    return <CertificatesClient certificates={CERTIFICATES} categories={CERTIFICATE_CATEGORIES} />;
}
