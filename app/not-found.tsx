// FILE: app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-navy">
      <div className="text-center px-6">
        <p className="text-8xl font-bold text-brand-teal font-serif">
          404
        </p>
        <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
          This page does not exist or has been moved.
        </p>
        <Link href="/" className="btn-white">
          Back to Home
        </Link>
      </div>
    </div>
  );
}