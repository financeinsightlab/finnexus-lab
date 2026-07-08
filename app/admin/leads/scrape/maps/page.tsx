// ─── Scrape: Google Maps Page ──────────────────────────────────────────────────
// /admin/leads/scrape/maps — Discover leads from Google Maps

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import HeroBackground from "@/components/ui/HeroBackground"
import ScrapeMapsClient from "./ScrapeMapsClient"

export default async function ScrapeMapsPage() {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")
  const userRole = session.user.role as string
  if (!["ADMIN", "ANALYST"].includes(userRole)) redirect("/")

  return (
    <div className="min-h-screen bg-[#0A0F1A]">
      <HeroBackground />
      <ScrapeMapsClient />
    </div>
  )
}