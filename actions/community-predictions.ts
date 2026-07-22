"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// ─── Validation Schema ────────────────────────────────────────────────────────
const predictionSchema = z.object({
  claim: z.string().min(5, "Prediction must be at least 5 characters").max(500, "Prediction too long"),
  sector: z.string().max(50).optional().default("General"),
  resolveDate: z.string().optional().refine(
    (val) => !val || !isNaN(Date.parse(val)),
    "Invalid date format"
  ),
})

export async function createCommunityPrediction(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Must be logged in to predict")

  // Parse and validate input
  const raw = {
    claim: (formData.get('claim') as string)?.trim(),
    sector: (formData.get('sector') as string)?.trim() || "General",
    resolveDate: formData.get('resolveDate') as string,
  }

  const parsed = predictionSchema.safeParse(raw)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid input")
  }

  const { claim, sector, resolveDate: resolveDateStr } = parsed.data

  // Default resolve date to 3 months from now if not provided
  let resolveDate = new Date()
  if (resolveDateStr) {
    resolveDate = new Date(resolveDateStr)
  } else {
    resolveDate.setMonth(resolveDate.getMonth() + 3)
  }

  // Ensure resolve date is in the future
  if (resolveDate <= new Date()) {
    throw new Error("Resolve date must be in the future")
  }

  const slug = `${slugify(claim).slice(0, 40)}-${Date.now()}`;

  await prisma.prediction.create({
    data: {
      slug,
      authorId: session.user.id!,
      claim,
      sector,
      resolveDate,
      status: "PENDING",
    }
  })

  revalidatePath('/predictions')
}
