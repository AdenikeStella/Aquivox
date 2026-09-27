"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { NotificationBanner } from "@/app/components/notificationsBanner"
import { ZoneCard } from "@/app/components/zoneCard"
import { ZoneDetailModal } from "@/app/components/zoneCardModal"
import { zonePredictions } from "@/app/lib/predictions-data"
import type { ZonePrediction } from "@/app/lib/predictions-data"
import Link from "next/link"

export default function PredictionsPage() {
  const [selectedZone, setSelectedZone] = useState<ZonePrediction | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  function handleViewDetails(zone: ZonePrediction) {
    setSelectedZone(zone)
    setModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <NotificationBanner onViewInsights={() => {}} />

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Fish Availability Predictions</h1>
        <p className="mt-1 text-sm text-muted-foreground">Based on your historical logs</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-[#0d6e6e]" />
          <span className="text-sm text-muted-foreground">Last Updated: Feb 22, 2026 at 6:00 AM</span>
        </div>
      </div>

      {/* Fish Species Availability Banner */}
      <Link
        href="/predictions/fishAvailability"
        className="flex items-center justify-between rounded-xl bg-linear-to-t from-[#005F6B] to-[#00444D] px-5 py-4 text-white transition-colors hover:bg-[#0b5c5c]"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-white/15">
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-white">Fish Species Availability</p>
            <p className="text-sm text-white/75">View current stock levels and market availability by species</p>
          </div>
        </div>
        <ChevronRight className="size-6 text-white/70" />
      </Link>

      {/* Zone Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {zonePredictions.map((zone) => (
          <ZoneCard key={zone.id} zone={zone} onViewDetails={handleViewDetails} />
        ))}
      </div>

      <ZoneDetailModal zone={selectedZone} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
