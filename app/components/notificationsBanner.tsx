"use client"

import { useState } from "react"
import { X, Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

interface NotificationBannerProps {
  onViewInsights?: () => void
}

export function NotificationBanner({ onViewInsights }: NotificationBannerProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="flex items-center justify-between rounded-xl bg-linear-to-t from-[#0091A3] to-[#005F6B] px-5 py-4 text-white">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-white/15">
          <Sparkles className="size-5" />
        </div>
        <div>
          <p className="font-semibold text-white">New Weekly Predictions Available</p>
          <p className="text-sm text-white/75">
            {"Updated: Feb 22, 2026 \u2022 AI has analyzed the latest data for this week"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link href='/predictions/weeklyInsights' 
          className="border-white/30 bg-white text-[#0d6e6e] hover:bg-white/90 hover:text-[#0d6e6e] rounded-lg items-center flex h-10 px-4 text-sm font-medium transition-colors"
        >
          View Updated Insights
        </Link >
        <button
          onClick={() => setVisible(false)}
          className="text-white/70 hover:text-white"
          aria-label="Dismiss notification"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  )
}
