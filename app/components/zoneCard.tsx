"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import type { ZonePrediction, AvailabilityLevel } from "@/app/lib/predictions-data"

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

interface ZoneCardProps {
  zone: ZonePrediction
  onViewDetails: (zone: ZonePrediction) => void
}

export function ZoneCard({ zone, onViewDetails }: ZoneCardProps) {
  const colors = getAvailabilityColor(zone.availability)
  const isDown = zone.availability === "Low"

  return (
    <Card className="gap-0 py-0 overflow-hidden">
      <CardContent className="flex flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{zone.name}</h3>
          <div className="mt-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text} ${colors.border} border`}
            >
              <span className={`size-2 rounded-full ${colors.dot}`} />
              {zone.availability} Availability
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground">AI Confidence</p>
            <p className="text-3xl font-bold text-foreground">{zone.confidence}%</p>
          </div>
          {isDown ? (
            <TrendingDown className="size-6 text-amber-500" />
          ) : (
            <TrendingUp className="size-6 text-[#0d6e6e]" />
          )}
        </div>

        <Button
          className="w-full bg-[#005F6B] text-white hover:bg-[#0b5c5c]"
          onClick={() => onViewDetails(zone)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}
