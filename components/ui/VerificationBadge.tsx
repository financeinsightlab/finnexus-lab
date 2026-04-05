import React from "react"
import { ShieldCheck, Target, User as UserIcon, CheckCircle2 } from "lucide-react"

type VerificationBadgeProps = {
  role: string
  customBadge?: string | null
  className?: string
}

export function VerificationBadge({ role, customBadge, className = "" }: VerificationBadgeProps) {
  // If Admin assigned a specific custom badge string to this user
  if (customBadge) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-widest font-bold whitespace-nowrap bg-purple-500/10 text-purple-400 border-purple-500/30 ${className}`}>
        <CheckCircle2 className="w-3 h-3" />
        {customBadge}
      </span>
    )
  }

  // Default badges based on Role
  if (role === "ADMIN") {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-widest font-bold whitespace-nowrap bg-teal-500/10 text-teal-400 border-teal-500/30 ${className}`}>
        <ShieldCheck className="w-3 h-3" />
        Official Admin
      </span>
    )
  }

  if (role === "ANALYST") {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-widest font-bold whitespace-nowrap bg-blue-500/10 text-blue-400 border-blue-500/30 ${className}`}>
        <Target className="w-3 h-3" />
        Verified Analyst
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-widest font-bold whitespace-nowrap bg-slate-500/10 text-slate-400 border-slate-500/30 ${className}`}>
      <UserIcon className="w-3 h-3" />
      Community
    </span>
  )
}
