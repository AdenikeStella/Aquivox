"use client"

import { useState } from "react"
import { X, ChevronUp, ChevronDown, CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog"
import type { ZonePrediction, AvailabilityLevel } from "@/app/lib/predictions-data"
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

function getAvailabilityStyle(level: AvailabilityLevel) {
  switch (level) {
    case "High":
      return { dot: "bg-emerald-500", text: "text-emerald-600" }
    case "Medium":
      return { dot: "bg-amber-500", text: "text-amber-600" }
    case "Low":
      return { dot: "bg-red-500", text: "text-red-600" }
  }
}

interface ZoneDetailModalProps {
  zone: ZonePrediction | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ZoneDetailModal({ zone, open, onOpenChange }: ZoneDetailModalProps) {
  const [howExpanded, setHowExpanded] = useState(true)

  if (!zone) return null

  const style = getAvailabilityStyle(zone.availability)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg bg-[#ffffff]" showCloseButton={false}>
        <DialogHeader className="relative">
          <DialogTitle className="text-xl">{zone.name}</DialogTitle>
          <DialogDescription>Prediction Details</DialogDescription>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-0 right-0 rounded-sm text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </DialogHeader>

        {/* Predicted Availability */}
        <div className="rounded-lg p-5 text-center">
          <p className="text-sm text-muted-foreground">Predicted Availability</p>
          <div className="mt-2 inline-flex items-center gap-2">
            <span className={`size-3 rounded-full ${style.dot}`} />
            <span className={`text-xl font-semibold ${style.text}`}>{zone.availability}</span>
          </div>
        </div>

        {/* 7-Day Trend Chart */}
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="mb-4 text-sm font-medium text-foreground">7-Day Trend</p>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={zone.trendData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d6e6e" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0d6e6e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis hide domain={[0, 100]} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0d6e6e"
                  strokeWidth={2}
                  fill="url(#trendGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* How is this predicted? */}
        <div className="rounded-lg border">
          <button
            onClick={() => setHowExpanded(!howExpanded)}
            className="flex w-full items-center justify-between p-4 text-left"
          >
            <span className="text-sm font-semibold text-foreground">How is this predicted?</span>
            {howExpanded ? (
              <ChevronUp className="size-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-5 text-muted-foreground" />
            )}
          </button>
          {howExpanded && (
            <div className="border-t px-4 pb-4 pt-3">
              <p className="mb-3 text-sm text-muted-foreground">This prediction is based on:</p>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Catch volume trends:</span>{" "}
                    {zone.predictions.catchVolume}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Weather patterns:</span>{" "}
                    {zone.predictions.weatherPatterns}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Seasonal migration patterns:</span>{" "}
                    {zone.predictions.seasonalMigration}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Key Factors */}
        <div>
          <h4 className="mb-3 font-semibold text-foreground">Key Factors</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Water Temperature</p>
              <p className="text-sm font-semibold text-foreground">{zone.factors.waterTemp}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Moon Phase</p>
              <p className="text-sm font-semibold text-foreground">{zone.factors.moonPhase}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Tide Conditions</p>
              <p className="text-sm font-semibold text-foreground">{zone.factors.tideConditions}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Wind Speed</p>
              <p className="text-sm font-semibold text-foreground">{zone.factors.windSpeed}</p>
            </div>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="rounded-lg bg-[#e8f5f5] p-4">
          <h4 className="mb-2 font-semibold text-foreground">Recommended Actions</h4>
          <ul className="flex flex-col gap-1.5">
            {zone.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
