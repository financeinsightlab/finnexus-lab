import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { learningCourseHref } from '@/lib/learning-courses';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = {
  title: 'Private course completion certificate | Kunwar Analytics',
  robots: { index: false, follow: false, noarchive: true },
};

interface Props { params: Promise<{ certificateId: string }> }

export default async function IssuedCourseCertificatePage({ params }: Props) {
  const { certificateId } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(`/certificates/issued/${certificateId}`)}`);
  }

  const certificate = await prisma.courseCertificate.findFirst({
    where: { certificateId, userId: session.user.id, status: 'ACTIVE' },
    select: { certificateId: true, courseSlug: true, courseTitle: true, studentName: true, completedAt: true, issuedAt: true, status: true },
  });
  if (!certificate) notFound();

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-primary">Dashboard</Link><span className="px-2">/</span><span aria-current="page">Course completion certificate</span>
      </nav>
      <article className="overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-lg">
        <header className="border-b border-border bg-primary/5 p-6 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Kunwar Analytics · private learner certificate</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Course completion certificate</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">This record is visible only to the signed-in learner who earned it. It documents the stored course completion and does not claim a digital signature, cryptographic verification, accreditation, or external credential status.</p>
        </header>
        <dl className="grid gap-x-8 gap-y-6 p-6 sm:grid-cols-2 sm:p-10">
          <div><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Learner</dt><dd className="mt-2 font-semibold text-foreground">{certificate.studentName}</dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Course</dt><dd className="mt-2 font-semibold text-foreground">{certificate.courseTitle}</dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Completed</dt><dd className="mt-2 text-foreground">{certificate.completedAt.toLocaleDateString('en-IN', { dateStyle: 'long', timeZone: 'UTC' })}</dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Record issued</dt><dd className="mt-2 text-foreground">{certificate.issuedAt.toLocaleDateString('en-IN', { dateStyle: 'long', timeZone: 'UTC' })}</dd></div>
          <div className="sm:col-span-2"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Private record reference</dt><dd className="mt-2 break-all font-mono text-sm text-foreground">{certificate.certificateId}</dd></div>
        </dl>
        <footer className="flex flex-wrap gap-3 border-t border-border p-6 sm:px-10">
          <Link href={learningCourseHref(certificate.courseSlug)} className="inline-flex min-h-11 items-center rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-accent">Return to course</Link>
          <Link href="/dashboard" className="inline-flex min-h-11 items-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Back to dashboard</Link>
        </footer>
      </article>
    </div>
  );
}
