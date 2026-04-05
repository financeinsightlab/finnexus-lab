import { auth } from "@/auth"
import { redirect } from "next/navigation"
import EditorClient from "./EditorClient"
import React from "react"

export default async function NewPostPage() {
  const session = await auth()

  if (!session?.user || !["ADMIN", "ANALYST"].includes(session.user.role as string)) redirect("/")

  return (
    <div className="-m-8 h-screen bg-[#0B1C2C]">
      <EditorClient />
    </div>
  )
}
