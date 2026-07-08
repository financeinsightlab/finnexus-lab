// ─── List Detail API ───────────────────────────────────────────────────────────
// GET /api/lists/[id] — get list with members
// PATCH /api/lists/[id] — update list
// DELETE /api/lists/[id] — delete list

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  const list = await prisma.leadList.findUnique({
    where: { id },
    include: {
      members: {
        include: {
          lead: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              fullName: true,
              companyName: true,
              jobTitle: true,
              status: true,
              score: true,
              emails: true,
              phones: true,
            },
          },
        },
        orderBy: { addedAt: "desc" },
      },
      _count: { select: { members: true } },
    },
  })

  if (!list) return NextResponse.json({ error: "List not found" }, { status: 404 })

  return NextResponse.json({ list })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const list = await prisma.leadList.update({
    where: { id },
    data: body,
  })

  return NextResponse.json({ list })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  await prisma.leadList.delete({ where: { id } })

  return NextResponse.json({ success: true })
}