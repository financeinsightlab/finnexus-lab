// FILE: app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand border-t-transparent animate-spin mx-auto"></div>
        <p className="text-sm text-content-secondary mt-4">Loading…</p>
      </div>
    </div>
  );
}