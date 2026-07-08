// ─── New Lead Page ──────────────────────────────────────────────────────────────
// /admin/leads/new — Manual entry + bulk paste

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import HeroBackground from "@/components/ui/HeroBackground"
import NewLeadClient from "./NewLeadClient"

export default async function NewLeadPage() {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")
  const userRole = session.user.role as string
  if (!["ADMIN", "ANALYST"].includes(userRole)) redirect("/")

  return (
    <div className="min-h-screen bg-[#0A0F1A]">
      <HeroBackground />
      <NewLeadClient />
    </div>
  )
}