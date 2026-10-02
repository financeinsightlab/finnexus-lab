import React from "react"
import { toPublicPredictionAuthor, type PredictionAuthorForPublicView } from "@/lib/public-prediction-author"
import { VerificationBadge } from "./VerificationBadge"

type TickerPredictionRow = {
  id: string
  claim: string
  status: string
  author: PredictionAuthorForPublicView
}

async function fetchTickerPredictions() {
  const { prisma } = await import("@/lib/prisma")
  const rows: TickerPredictionRow[] = await prisma.prediction.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
    select: {
      id: true,
      claim: true,
      status: true,
      author: {
        select: {
          id: true,
          name: true,
          role: true,
          customBadge: true,
          profile: { select: { isPublic: true } },
        },
      },
    },
  })

  return rows.map(({ author, ...prediction }) => ({
    ...prediction,
    author: toPublicPredictionAuthor(author),
  }))
}

export async function GlobalForecastingTicker() {
  // Degrade to an empty feed when the database or generated client is unavailable.
  let predictions: Awaited<ReturnType<typeof fetchTickerPredictions>> = []
  try {
    predictions = await fetchTickerPredictions()
  } catch {
    predictions = []
  }

  // Duplicate to ensure smooth continuous running marquee
  const tickerItems = [...predictions, ...predictions, ...predictions]

  return (
    <div className="w-full bg-surface-raised border-y border-white/5 py-4 overflow-hidden flex flex-col relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-raised to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-raised to-transparent z-10 pointer-events-none" />

      <div className="flex items-center gap-3 px-6 mb-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
        </span>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-400">Public prediction feed</span>
      </div>

      <div className="flex w-full overflow-hidden">
        <div className="flex animate-marquee items-center gap-6 whitespace-nowrap pl-6">
          {tickerItems.map((p, idx) => (
            <div key={`${p.id}-${idx}`} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 shrink-0">
              <span className="text-sm font-medium text-slate-300">"{p.claim}"</span>
              <span className="text-slate-500 text-sm">&mdash;</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{p.author.name ?? "Analyst"}</span>
                <VerificationBadge role={p.author.role} customBadge={p.author.customBadge} />
              </div>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                p.status === "CONFIRMED" ? "bg-green-500/10 text-green-400" :
                p.status === "INCORRECT" ? "bg-red-500/10 text-red-400" :
                p.status === "PARTIAL" ? "bg-amber-500/10 text-amber-400" :
                "bg-yellow-500/10 text-yellow-500"
              }`}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
