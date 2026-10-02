// FILE: components/ui/ClientShell.tsx
// Thin client-side wrapper that lazy-loads non-critical UI chrome.
// This exists because `dynamic({ ssr: false })` can only be used
// inside Client Components (not in Server Component layouts).
'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), {
  ssr: false,
})
const SmoothScroll = dynamic(() => import('@/components/ui/SmoothScroll'), {
  ssr: false,
})
const AskKunwarBubble = dynamic(() => import('@/components/ask/AskKunwarBubble'), {
  ssr: false,
})
const FloatingRightPromotion = dynamic(() => import('@/components/promotions/FloatingRightPromotion'), {
  ssr: false,
})

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        {children}
      </SmoothScroll>
      {/* Floating Ask Kunwar AI bubble — shown on every page */}
      <AskKunwarBubble />
      {/* Floating Right-Side Partner Promotion — elevated above chatbot icon */}
      <FloatingRightPromotion />
    </>
  )
}
