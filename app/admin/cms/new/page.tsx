import { auth } from "@/auth"
import { redirect } from "next/navigation"
import EditorClient from "./EditorClient"
import React from "react"

export default async function NewPostPage() {
  const session = await auth()

  if (!session?.user || !["ADMIN", "ANALYST"].includes(session.user.role as string)) redirect("/")

  return (
    <div className="-mx-6 -my-6 h-[calc(100dvh-4rem)] min-w-0 overflow-hidden bg-[#0B1C2C] md:-mx-10 md:-my-10">
      <EditorClient />
    </div>
  )
}
