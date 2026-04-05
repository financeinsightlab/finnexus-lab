import React from "react"
import { prisma } from "@/lib/prisma"
import { VerificationBadge } from "./VerificationBadge"

export async function GlobalForecastingTicker() {
  // Fetch latest 20 predictions globally
  const predictions = await prisma.prediction.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      author: {
        select: { name: true, role: true, customBadge: true }
      }
    }
  })

  // Duplicate to ensure smooth continuous running marquee
  const tickerItems = [...predictions, ...predictions, ...predictions]

  return (
    <div className="w-full bg-[#0f1c2d] border-y border-white/5 py-4 overflow-hidden flex flex-col relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0f1c2d] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0f1c2d] to-transparent z-10 pointer-events-none" />
      
      <div className="flex items-center gap-3 px-6 mb-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
        </span>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-400">Global Forecasting Feed</span>
      </div>

      <div className="flex w-full overflow-hidden">
        <div className="flex animate-marquee items-center gap-6 whitespace-nowrap pl-6">
          {tickerItems.map((p, idx) => (
            <div key={`${p.id}-${idx}`} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 shrink-0">
              <span className="text-sm font-medium text-slate-300">"{p.claim}"</span>
              <span className="text-slate-500 text-sm">&mdash;</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{p.author.name}</span>
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
