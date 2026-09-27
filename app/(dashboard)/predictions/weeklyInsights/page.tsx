"use client"

import {
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Menu,
  Info,
} from "lucide-react"
import {Card, CardContent} from "@/app/components/ui/card"
import { Button } from "@/app/components/button"
import { weeklyChanges, weeklyInsights } from "@/app/lib/predictions-data"
import type { AvailabilityLevel, WeeklyChange } from "@/app/lib/predictions-data"
import Link from "next/link"

function getAvailabilityBadge(level: AvailabilityLevel) {
  switch (level) {
    case "High":
      return { dot: "bg-emerald-500", bg: "bg-emerald-100", text: "text-emerald-700" }
    case "Medium":
      return { dot: "bg-amber-500", bg: "bg-amber-100", text: "text-amber-700" }
    case "Low":
      return { dot: "bg-red-500", bg: "bg-red-100", text: "text-red-700" }
  }
}

function getStatusInfo(status: WeeklyChange["status"]) {
  switch (status) {
    case "Improved Conditions":
      return { icon: <TrendingUp className="size-4 text-[#0d6e6e]" />, text: "text-[#0d6e6e]" }
    case "Conditions Declined":
      return { icon: <TrendingDown className="size-4 text-foreground" />, text: "text-foreground" }
    case "Remains Stable":
      return { icon: <CheckCircle2 className="size-4 text-muted-foreground" />, text: "text-muted-foreground" }
  }
}

export default function WeeklyInsightsPage() {
  const improved = weeklyChanges.filter((c) => c.status === "Improved Conditions").length
  const stable = weeklyChanges.filter((c) => c.status === "Remains Stable").length
  const declined = weeklyChanges.filter((c) => c.status === "Conditions Declined").length

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Menu Icon */}
      <div className="flex flex-col gap-4 rounded-2xl p-8  bg-linear-to-tr from-[#0091A3] to-[#005F6B] text-white">
      <div className="bg-[#005F6B] flex p-2 rounded-lg w-10 h-10 items-center justify-center">
        <Menu className="size-5 text-muted-foreground" />
      </div>

      {/* Header Banner */}
      <div className="flex items-center gap-3 rounded-xl px-5 text-white">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#0091A3]">
          <Sparkles className="size-5 " />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Weekly Predictions Updated!</h1>
          <p className="text-sm text-white/75">
            AI has analyzed the latest data for the week of Feb 22 - Feb 28, 2026
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center rounded-xl bg-[#0091A3] py-4 text-white">
          <div className="flex items-center gap-1">
            <TrendingUp className="size-5" />
            <span className="text-2xl font-bold text-white">{improved}</span>
          </div>
          <span className="text-sm text-white/75">Improved</span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-[#0091A3] py-4 text-white">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="size-5" />
            <span className="text-2xl font-bold text-white">{stable}</span>
          </div>
          <span className="text-sm text-white/75">Stable</span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-[#0091A3] py-4 text-white">
          <div className="flex items-center gap-1">
            <TrendingDown className="size-5" />
            <span className="text-2xl font-bold text-white">{declined}</span>
          </div>
          <span className="text-sm text-white/75">Declined</span>
        </div>
      </div>
      </div>

      {/* What's Changed This Week */}
      <h2 className="text-xl font-bold text-foreground">{"What's Changed This Week"}</h2>

      <div className="flex flex-col gap-4">
        {weeklyChanges.map((change) => {
          const statusInfo = getStatusInfo(change.status)
          const prevColors = getAvailabilityBadge(change.previous.availability)
          const updColors = getAvailabilityBadge(change.updated.availability)
          const changeSign = change.confidenceChange > 0 ? "+" : ""

          return (
            <Card key={change.id} className="gap-0 py-0">
              <CardContent className="flex flex-col gap-4 p-5">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{change.name}</h3>
                  <div className="mt-1 flex items-center gap-1.5">
                    {statusInfo.icon}
                    <span className={`text-sm font-medium ${statusInfo.text}`}>{change.status}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Previous */}
                  <div className="flex-1">
                    <p className="mb-1.5 text-xs text-muted-foreground">Previous</p>
                    <div
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${prevColors.bg} ${prevColors.text}`}
                    >
                      <span className={`size-2 rounded-full ${prevColors.dot}`} />
                      {change.previous.availability}
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {change.previous.confidence}% confidence
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="size-5 shrink-0 text-muted-foreground" />

                  {/* Updated */}
                  <div className="flex-1">
                    <p className="mb-1.5 text-xs text-muted-foreground">Updated</p>
                    <div
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${updColors.bg} ${updColors.text}`}
                    >
                      <span className={`size-2 rounded-full ${updColors.dot}`} />
                      {change.updated.availability}
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {change.updated.confidence}% confidence
                      <span
                        className={`ml-0.5 font-semibold ${
                          change.confidenceChange > 0 ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        ({changeSign}{change.confidenceChange}%)
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Key Insights This Week */}
      <Card className="gap-0 py-0">
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="flex items-center gap-2">
            <Info className="size-5 text-[#0d6e6e]" />
            <h3 className="text-lg font-bold text-foreground">Key Insights This Week</h3>
          </div>
          <div className="flex flex-col gap-3">
            {weeklyInsights.map((insight, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#0d6e6e] text-xs font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm text-foreground leading-relaxed" dangerouslySetInnerHTML={{
                  __html: insight
                    .replace(/North Bay Zone and Whale Point/g, "<strong>North Bay Zone and Whale Point</strong>")
                    .replace(/Coastal Ridge/g, "<strong>Coastal Ridge</strong>")
                    .replace(/Eastern Reef/g, "<strong>Eastern Reef</strong>")
                    .replace(/3 out of 6 locations/g, "<strong>3 out of 6 locations</strong>")
                }} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-3">
        <Link href="/predictions" className="w-full">
          <Button variant="ghost" className="w-full text-[#0d6e6e] hover:text-[#0b5c5c]">
            {"View All Predictions \u203A"}
          </Button>
        </Link>
        <Button variant="outline" className="w-full border-[#0d6e6e] text-[#0d6e6e] hover:bg-[#0d6e6e]/5">
          {"Log Today's Catch"}
        </Button>
      </div>
    </div>
  )
}
