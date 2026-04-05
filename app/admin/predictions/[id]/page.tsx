import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { updatePredictionAction } from '../actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

const SECTORS = [
  'Quick Commerce', 'Fintech', 'EV', 'Food Delivery',
  'SaaS', 'D2C', 'Healthcare', 'EdTech', 'General',
];

export default async function EditPredictionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const userRole = session?.user?.role as string;
  if (!session?.user) redirect('/auth/signin');
  if (!['ADMIN', 'ANALYST'].includes(userRole)) redirect('/');

  const prediction = await prisma.prediction.findUnique({
    where: { id },
  });

  if (!prediction) notFound();

  // Analysts can only edit their own predictions
  if (userRole === 'ANALYST' && prediction.authorId !== session.user.id) {
    redirect('/admin/predictions');
  }

  // Format resolveDate to YYYY-MM-DD for the HTML date input
  const resolveDateValue = new Date(prediction.resolveDate).toISOString().split('T')[0];

  return (
    <div className="space-y-10 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/predictions" className="text-slate-400 hover:text-white pb-1">
          ← Back
        </Link>
        <div>
          <span className="section-label">Admin · Predictions Engine</span>
          <h1 className="text-4xl font-extrabold text-white mt-2">
            ✏️ Edit Prediction
          </h1>
        </div>
      </div>

      <section className="bg-[#1A1F2E] rounded-2xl border border-[#2D3748] p-6 shadow-xl">
        <form action={updatePredictionAction} className="space-y-6">
          <input type="hidden" name="id" value={prediction.id} />
          
          <div>
            <label className="text-xs text-slate-400 uppercase tracking-widest font-bold block mb-1.5">
              Prediction Claim *
            </label>
            <textarea
              name="claim"
              required
              defaultValue={prediction.claim}
              rows={3}
              className="w-full bg-[#0f1c2d] border border-[#2D3748] rounded-xl px-4 py-3 text-sm text-slate-300 focus:border-[#0D6E6E] focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest font-bold block mb-1.5">
                Sector *
              </label>
              <select
                name="sector"
                required
                defaultValue={prediction.sector}
                className="w-full bg-[#0f1c2d] border border-[#2D3748] rounded-xl px-4 py-3 text-sm text-slate-300 focus:border-[#0D6E6E] focus:outline-none"
              >
                {SECTORS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest font-bold block mb-1.5">
                Resolve Date *
              </label>
              <input
                type="date"
                name="resolveDate"
                required
                defaultValue={resolveDateValue}
                className="w-full bg-[#0f1c2d] border border-[#2D3748] rounded-xl px-4 py-3 text-sm text-slate-300 focus:border-[#0D6E6E] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 uppercase tracking-widest font-bold block mb-1.5">
              Source Report Slug (optional)
            </label>
            <input
              type="text"
              name="reportSlug"
              defaultValue={prediction.reportSlug || ''}
              className="w-full bg-[#0f1c2d] border border-[#2D3748] rounded-xl px-4 py-3 text-sm text-slate-300 focus:border-[#0D6E6E] focus:outline-none"
            />
          </div>

          <button type="submit" className="btn-primary w-full sm:w-auto">
            Save Changes
          </button>
        </form>
      </section>
    </div>
  );
}
