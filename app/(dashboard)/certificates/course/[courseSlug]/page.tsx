import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = {
  title: 'Private course certificate | Kunwar Analytics',
  robots: { index: false, follow: false, noarchive: true },
};

type Props = { params: Promise<{ courseSlug: string }> };

/** Stable per-course certificate URL; it resolves only to the signed-in
 * learner's active completion record and never exposes another learner's ID. */
export default async function CourseCertificatePage({ params }: Props) {
  const { courseSlug } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    const callback = `/certificates/course/${encodeURIComponent(courseSlug)}`;
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(callback)}`);
  }

  const certificate = await prisma.courseCertificate.findFirst({
    where: { userId: session.user.id, courseSlug, status: 'ACTIVE' },
    select: { certificateId: true },
  });
  if (!certificate) notFound();
  redirect(`/certificates/issued/${encodeURIComponent(certificate.certificateId)}`);
}
