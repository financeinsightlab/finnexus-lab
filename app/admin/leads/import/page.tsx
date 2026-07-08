// ─── CSV Import: Page ───────────────────────────────────────────────────────────
// /admin/leads/import — Server component: auth + render

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import HeroBackground from "@/components/ui/HeroBackground"
import ImportClient from "./ImportClient"

export default async function ImportPage() {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")
  const userRole = session.user.role as string
  if (!["ADMIN", "ANALYST"].includes(userRole)) redirect("/")

  return (
    <div className="min-h-screen bg-[#0A0F1A]">
      <HeroBackground />
      <ImportClient />
    </div>
  )
}