import { redirect } from "next/navigation"
import { getCurrentUser, isStaff } from "@/lib/auth-guards"
import AdminLayoutClient from "./AdminLayoutClient"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Central guard for the whole /admin tree (Proxy also gates this). Using the
  // shared helper keeps the rule in one place — see lib/auth-guards.ts.
  const user = await getCurrentUser()

  if (!user) redirect("/auth/signin")
  if (!isStaff(user)) redirect("/")

  return (
    <AdminLayoutClient
      userName={user.name || "Admin"}
      userRole={user.role}
      userInitial={user.name?.[0] || "A"}
    >
      {children}
    </AdminLayoutClient>
  )
}
