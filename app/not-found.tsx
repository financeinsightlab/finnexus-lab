// FILE: app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-content-primary">
      <div className="text-center px-6">
        <p className="text-8xl font-bold text-brand font-serif">
          404
        </p>
        <h1 className="text-2xl font-bold text-content-primary mb-3">Page Not Found</h1>
        <p className="text-content-secondary mb-8 max-w-sm mx-auto">
          This page does not exist or has been moved.
        </p>
        <Link href="/" className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Back to Home
        </Link>
      </div>
    </div>
  );
}