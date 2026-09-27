"use client"

import { TrendingUp, TrendingDown, Info, ChevronDown } from "lucide-react"
import { Card, CardContent} from "@/app/components/ui/card"
import { fishSpecies } from "@/app/lib/predictions-data"
import type { AvailabilityLevel } from "@/app/lib/predictions-data"
import Link from "next/link"

function getAvailabilityColor(level: AvailabilityLevel) {
  switch (level) {
    case "High":
      return { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" }
    case "Medium":
      return { dot: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" }
    case "Low":
      return { dot: "bg-red-500", bg: "bg-red-50", text: "text-red-700", border: "border-red-200" }
  }
}

function getSummaryIcon(level: AvailabilityLevel) {
  switch (level) {
    case "High":
      return (
        <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100">
          <svg className="size-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
      )
    case "Medium":
      return (
        <div className="flex size-10 items-center justify-center rounded-full bg-amber-100">
          <svg className="size-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
      )
    case "Low":
      return (
        <div className="flex size-10 items-center justify-center rounded-full bg-red-100">
          <svg className="size-5 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
      )
  }
}

export default function FishAvailabilityPage() {
  const highCount = fishSpecies.filter((s) => s.availability === "High").length
  const mediumCount = fishSpecies.filter((s) => s.availability === "Medium").length
  const lowCount = fishSpecies.filter((s) => s.availability === "Low").length

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground">
        <Link href="/predictions" className="hover:text-foreground">
          Predictions
        </Link>
        {" \u203A "}
        <span className="font-medium text-foreground underline">Fish Availability</span>
      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Fish Species Availability</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Current stock levels and market availability predictions
        </p>
      </div>

      {/* Current Week Dropdown */}
      <button className="inline-flex w-fit items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium text-foreground">
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Current Week
        <ChevronDown className="size-4" />
      </button>

      {/* Last Updated */}
      <div className="flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-[#0d6e6e]" />
        <span className="text-sm text-muted-foreground">Last Updated: Feb 24, 2026 at 8:00 AM</span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="gap-0 py-0">
          <CardContent className="flex items-center gap-3 p-5">
            {getSummaryIcon("High")}
            <div>
              <p className="text-sm text-muted-foreground">High Availability</p>
              <p className="text-2xl font-bold text-foreground">{highCount} Species</p>
              <p className="text-xs text-emerald-600">Good market conditions</p>
            </div>
          </CardContent>
        </Card>
        <Card className="gap-0 py-0">
          <CardContent className="flex items-center gap-3 p-5">
            {getSummaryIcon("Medium")}
            <div>
              <p className="text-sm text-muted-foreground">Medium Availability</p>
              <p className="text-2xl font-bold text-foreground">{mediumCount} Species</p>
              <p className="text-xs text-amber-600">Monitor closely</p>
            </div>
          </CardContent>
        </Card>
        <Card className="gap-0 py-0">
          <CardContent className="flex items-center gap-3 p-5">
            {getSummaryIcon("Low")}
            <div>
              <p className="text-sm text-muted-foreground">Low Availability</p>
              <p className="text-2xl font-bold text-foreground">{lowCount} Species</p>
              <p className="text-xs text-red-600">Limited supply</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fish Species Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {fishSpecies.map((species) => {
          const colors = getAvailabilityColor(species.availability)
          return (
            <Card key={species.id} className="gap-0 py-0">
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-foreground">{species.name}</h3>
                  {species.trendDirection === "down" ? (
                    <TrendingDown className="size-5 text-red-500" />
                  ) : (
                    <TrendingUp className="size-5 text-[#0d6e6e]" />
                  )}
                </div>

                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text} ${colors.border}`}
                >
                  <span className={`size-2 rounded-full ${colors.dot}`} />
                  {species.availability} Availability
                </span>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current Stock</span>
                    <span className="font-medium text-foreground">{species.currentStock}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Avg. Price</span>
                    <span className="font-medium text-foreground">{species.avgPrice}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">AI Confidence</span>
                    <span className="font-medium text-foreground">{species.confidence}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-[#0d6e6e] transition-all"
                      style={{ width: `${species.confidence}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Info Footer */}
      <div className="flex items-start gap-3 rounded-xl bg-[#e8f5f5] p-5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#0d6e6e]">
          <Info className="size-4 text-white" />
        </div>
        <div>
          <p className="font-semibold text-foreground">How Availability is Predicted</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Fish availability predictions are based on historical catch data, seasonal patterns, market
            demand trends, and current stock levels. The AI confidence score indicates the reliability
            of each prediction.
          </p>
        </div>
      </div>
    </div>
  )
}
