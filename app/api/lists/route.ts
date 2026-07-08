// ─── Lists API ─────────────────────────────────────────────────────────────────
// GET /api/lists — list all lead lists
// POST /api/lists — create a new list

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const lists = await prisma.leadList.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { members: true } },
    },
  })

  return NextResponse.json({ lists })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { name, description, color } = body

  if (!name) return NextResponse.json({ error: "name required" }, { status: 400 })

  const list = await prisma.leadList.create({
    data: { name, description, color },
  })

  return NextResponse.json({ list }, { status: 201 })
}