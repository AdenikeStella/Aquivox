"use client";
import { useState } from "react";
import {
    AlertTriangle, ChevronDown, TrendingUp,
    X, Sparkles, Fish, RefreshCw,
} from "lucide-react";
import Http from "@/app/lib/utils/http";


export const AI_REGIONS = [
    "Mombasa", "Maputo", "Niger Delta", "Volta Lake", "Dakar Coast",
    "Lagos Coast", "Lake Victoria", "Kisumu", "Cape Coast", "Mwanza",
    "Lake Kyoga", "Dar es Salaam", "Lake Albert",
] as const;

export type AiRegion = (typeof AI_REGIONS)[number];
export const DEFAULT_AI_REGION: AiRegion = "Volta Lake";


export type AiInsightsResponse = {
    region: string;
    period: { startDate: string; endDate: string };
    speciesInsights: Array<{
        species: string;
        availability: "High" | "Medium" | "Low";
        confidencePct: number;
        explanation: string;
        currentStockKg: number;
        avgPrice: number;
    }>;
    summaryCounts: { high: number; medium: number; low: number; totalSpecies: number };
    incomeForecast: {
        riskLevel: "Low" | "Medium" | "High";
        confidencePct: number;
        explanation: string;
        projectedRange: { min: number; max: number; expectedAvg: number };
    };
    meta?: { forecastBasis?: { type?: string } };
};

export type AiInsightsUiModel = {
    filters: { region: string; startDate: string; endDate: string };
    summaryCards: { high: number; medium: number; low: number; totalSpecies: number };
    speciesCards: Array<{
        name: string;
        availability: "High" | "Medium" | "Low";
        stockKg: number;
        avgPrice: number;
        confidence: number;
        explanation: string;
    }>;
    incomeForecast: {
        riskLevel: "Low" | "Medium" | "High";
        confidence: number;
        explanation: string;
        min: number;
        max: number;
        expectedAvg: number;
    };
};


export function mapAiInsightsToUi(data: AiInsightsResponse): AiInsightsUiModel {
    return {
        filters: {
            region: data.region,
            startDate: data.period.startDate,
            endDate: data.period.endDate,
        },
        summaryCards: {
            high: data.summaryCounts.high,
            medium: data.summaryCounts.medium,
            low: data.summaryCounts.low,
            totalSpecies: data.summaryCounts.totalSpecies,
        },
        speciesCards: data.speciesInsights.map((item) => ({
            name: item.species,
            availability: item.availability,
            stockKg: item.currentStockKg,
            avgPrice: item.avgPrice,
            confidence: item.confidencePct,
            explanation: item.explanation,
        })),
        incomeForecast: {
            riskLevel: data.incomeForecast.riskLevel,
            confidence: data.incomeForecast.confidencePct,
            explanation: data.incomeForecast.explanation,
            min: data.incomeForecast.projectedRange.min,
            max: data.incomeForecast.projectedRange.max,
            expectedAvg: data.incomeForecast.projectedRange.expectedAvg,
        },
    };
}


const availabilityConfig = {
    High:   { dot: "bg-[#27AE60]", bg: "bg-[#E8F5E9]", text: "text-[#27AE60]" },
    Medium: { dot: "bg-[#F2C94C]", bg: "bg-[#FFF8E1]", text: "text-[#F59E0B]" },
    Low:    { dot: "bg-[#EF4444]", bg: "bg-[#FEE2E2]", text: "text-[#EF4444]" },
};

const riskConfig = {
    Low:    { bg: "bg-[#DCFCE7]", text: "text-[#16A34A]", icon: <TrendingUp size={16} className="text-[#16A34A]" /> },
    Medium: { bg: "bg-[#FEF9C3]", text: "text-[#F59E0B]", icon: <AlertTriangle size={16} className="text-[#F59E0B]" /> },
    High:   { bg: "bg-[#FEE2E2]", text: "text-[#EF4444]", icon: <AlertTriangle size={16} className="text-[#EF4444]" /> },
};


function RiskBreakdownModal({
    forecast,
    onClose,
}: {
    forecast: AiInsightsUiModel["incomeForecast"];
    onClose: () => void;
}) {
    const risk = riskConfig[forecast.riskLevel];
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm py-8"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between px-6 pt-6 pb-4">
                    <div>
                        <h2 className="font-bold text-[#1A1A1A] text-xl">Risk Breakdown</h2>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">AI-powered income risk analysis</p>
                    </div>
                    <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#4F4F4F] transition-colors mt-1">
                        <X size={18} />
                    </button>
                </div>

                <div className="px-6 pb-6 space-y-5">
                    {/* Risk Level */}
                    <div className={`rounded-xl p-5 text-center ${risk.bg}`}>
                        <p className="text-xs text-[#9CA3AF] mb-3">Current Risk Level</p>
                        <div className="inline-flex items-center gap-2 bg-white rounded-xl px-5 py-2.5 shadow-sm">
                            {risk.icon}
                            <span className={`font-bold text-lg ${risk.text}`}>{forecast.riskLevel} Risk</span>
                        </div>
                    </div>

                    {/* AI Explanation */}
                    <div className="bg-[#E6F7F9] rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles size={16} className="text-[#0091A3]" />
                            <p className="font-bold text-[#005F6B] text-sm">AI Analysis</p>
                        </div>
                        <p className="text-sm text-[#005F6B] leading-relaxed">{forecast.explanation}</p>
                    </div>

                    {/* Projected Range */}
                    <div>
                        <p className="font-bold text-[#1A1A1A] text-sm mb-3">Projected Income Range</p>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: "Minimum",  value: `$${forecast.min.toLocaleString()}`,         color: "text-[#EF4444]" },
                                { label: "Expected", value: `$${forecast.expectedAvg.toLocaleString()}`, color: "text-[#0091A3]" },
                                { label: "Maximum",  value: `$${forecast.max.toLocaleString()}`,         color: "text-[#27AE60]" },
                            ].map((item) => (
                                <div key={item.label} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 text-center">
                                    <p className="text-[10px] text-[#9CA3AF] mb-1">{item.label}</p>
                                    <p className={`text-base font-bold ${item.color}`}>{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Confidence */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-[#1A1A1A]">Forecast Confidence</p>
                            <p className="text-sm font-bold text-[#0091A3]">{forecast.confidence}%</p>
                        </div>
                        <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                            <div
                                className="h-2 rounded-full bg-[#0091A3] transition-all duration-500"
                                style={{ width: `${forecast.confidence}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IncomeForecastPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [insights, setInsights] = useState<AiInsightsUiModel | null>(null);

    const [selectedRegion, setSelectedRegion] = useState<AiRegion>(DEFAULT_AI_REGION);
    const [startDate, setStartDate] = useState("2026-02-18");
    const [endDate, setEndDate] = useState("2026-02-24");

    const fetchInsights = async () => {
        setIsLoading(true);
        setError("");
        try {
            const response = await Http.post("/api/ai/insights", {
                region: selectedRegion,
                startDate,
                endDate,
            });
            
            const mapped = mapAiInsightsToUi(response as AiInsightsResponse);
            setInsights(mapped);
        } catch (err: any) {
            console.error("AI insights error:", err);
            setError(err?.message || "Failed to load AI insights. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#F5F5F5] min-h-screen">

            {/* Risk Alert Banner */}
            {insights?.incomeForecast.riskLevel === "High" && (
                <div className="bg-[#00444D] px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <AlertTriangle size={18} className="text-[#F2C94C] shrink-0" />
                        <div>
                            <p className="text-[#F2C94C] font-bold text-sm">High Income Risk Predicted</p>
                            <p className="text-white/70 text-xs mt-0.5">
                                Market conditions may significantly impact your earnings
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-white text-[#1A1A1A] text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#F5F5F5] transition-colors shrink-0"
                    >
                        View Risk Breakdown
                    </button>
                </div>
            )}

            <div className="p-8 space-y-6">

                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1A1A1A]">Projected Income Forecast</h1>
                        <p className="text-sm text-[#4F4F4F] mt-1">AI-powered earnings predictions based on your region and activity</p>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                        <Sparkles size={15} className="text-[#0091A3]" />
                        <p className="text-xs text-[#0091A3] font-semibold">Powered by AI</p>
                    </div>
                </div>

                {/* Filters Card */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
                    <p className="text-sm font-bold text-[#1A1A1A] mb-4">Generate AI Insights</p>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#4F4F4F] mb-1.5">Region</label>
                            <div className="relative">
                                <select
                                    value={selectedRegion}
                                    onChange={(e) => setSelectedRegion(e.target.value as AiRegion)}
                                    className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#005F6B] bg-white appearance-none"
                                >
                                    {AI_REGIONS.map((r) => (
                                        <option key={r} value={r}>{r}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#4F4F4F] mb-1.5">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#005F6B]"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#4F4F4F] mb-1.5">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#005F6B]"
                            />
                        </div>
                    </div>
                    <button
                        onClick={fetchInsights}
                        disabled={isLoading}
                        className="mt-4 flex items-center gap-2 bg-[#005F6B] hover:bg-[#00444D] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors disabled:opacity-60"
                    >
                        {isLoading
                            ? <><RefreshCw size={15} className="animate-spin" /> Generating...</>
                            : <><Sparkles size={15} /> Generate Insights</>
                        }
                    </button>
                    {error && <p className="text-[#EF4444] text-sm mt-3">{error}</p>}
                </div>

                {/* Empty State */}
                {!insights && !isLoading && (
                    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-16 shadow-sm text-center">
                        <Sparkles size={36} className="text-[#A5F1E9] mx-auto mb-4" />
                        <p className="font-bold text-[#1A1A1A] text-lg">No insights yet</p>
                        <p className="text-sm text-[#9CA3AF] mt-1">
                            Select a region and date range above, then click Generate Insights
                        </p>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-16 shadow-sm text-center">
                        <RefreshCw size={36} className="text-[#0091A3] mx-auto mb-4 animate-spin" />
                        <p className="font-bold text-[#1A1A1A] text-lg">AI is analyzing data...</p>
                        <p className="text-sm text-[#9CA3AF] mt-1">This may take a few seconds</p>
                    </div>
                )}

                {insights && !isLoading && (
                    <>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { label: "High Availability",   value: insights.summaryCards.high,         color: "text-[#27AE60]", bg: "bg-[#E8F5E9]" },
                                { label: "Medium Availability", value: insights.summaryCards.medium,       color: "text-[#F59E0B]", bg: "bg-[#FFF8E1]" },
                                { label: "Low Availability",    value: insights.summaryCards.low,          color: "text-[#EF4444]", bg: "bg-[#FEE2E2]" },
                                { label: "Total Species",       value: insights.summaryCards.totalSpecies, color: "text-[#0091A3]", bg: "bg-[#E6F7F9]"  },
                            ].map((card) => (
                                <div key={card.label} className={`rounded-2xl border border-[#E5E7EB] p-5 shadow-sm ${card.bg}`}>
                                    <p className="text-xs font-semibold text-[#4F4F4F] mb-2">{card.label}</p>
                                    <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Income Forecast */}
                        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
                            <div className="flex items-start justify-between mb-5">
                                <div>
                                    <h2 className="font-bold text-[#1A1A1A]">Income Forecast</h2>
                                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                                        {insights.filters.region} · {insights.filters.startDate} – {insights.filters.endDate}
                                    </p>
                                </div>
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${riskConfig[insights.incomeForecast.riskLevel].bg}`}>
                                    {riskConfig[insights.incomeForecast.riskLevel].icon}
                                    <span className={`font-bold text-sm ${riskConfig[insights.incomeForecast.riskLevel].text}`}>
                                        {insights.incomeForecast.riskLevel} Risk
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-5">
                                {[
                                    { label: "Minimum",          value: `$${insights.incomeForecast.min.toLocaleString()}`,         color: "text-[#EF4444]" },
                                    { label: "Expected Average", value: `$${insights.incomeForecast.expectedAvg.toLocaleString()}`, color: "text-[#0091A3]" },
                                    { label: "Maximum",          value: `$${insights.incomeForecast.max.toLocaleString()}`,         color: "text-[#27AE60]" },
                                ].map((item) => (
                                    <div key={item.label} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
                                        <p className="text-xs text-[#9CA3AF] mb-1">{item.label}</p>
                                        <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Confidence Bar */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-1.5">
                                    <p className="text-xs font-semibold text-[#4F4F4F]">Forecast Confidence</p>
                                    <p className="text-xs font-bold text-[#0091A3]">{insights.incomeForecast.confidence}%</p>
                                </div>
                                <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full bg-[#0091A3] transition-all duration-700"
                                        style={{ width: `${insights.incomeForecast.confidence}%` }}
                                    />
                                </div>
                            </div>

                            {/* AI Explanation */}
                            <div className="bg-[#E6F7F9] rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles size={14} className="text-[#0091A3]" />
                                    <p className="text-xs font-bold text-[#005F6B]">AI Explanation</p>
                                </div>
                                <p className="text-sm text-[#005F6B] leading-relaxed">{insights.incomeForecast.explanation}</p>
                            </div>

                            {insights.incomeForecast.riskLevel === "High" && (
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="mt-4 w-full bg-[#005F6B] hover:bg-[#00444D] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                                >
                                    View Full Risk Breakdown
                                </button>
                            )}
                        </div>

                        {/* Species Cards */}
                        <div>
                            <h2 className="font-bold text-[#1A1A1A] mb-4">
                                Fish Availability Insights
                                <span className="ml-2 text-xs font-normal text-[#9CA3AF]">
                                    {insights.speciesCards.length} species analyzed
                                </span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {insights.speciesCards.map((card) => {
                                    const avail = availabilityConfig[card.availability];
                                    return (
                                        <div key={card.name} className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#E6F7F9]">
                                                        <Fish size={16} className="text-[#0091A3]" />
                                                    </span>
                                                    <p className="font-bold text-[#1A1A1A] text-sm">{card.name}</p>
                                                </div>
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${avail.bg} ${avail.text}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${avail.dot}`} />
                                                    {card.availability}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 mb-3">
                                                <div className="bg-[#F9FAFB] rounded-lg p-2.5">
                                                    <p className="text-[10px] text-[#9CA3AF]">Stock</p>
                                                    <p className="text-sm font-bold text-[#1A1A1A]">{card.stockKg.toLocaleString()} kg</p>
                                                </div>
                                                <div className="bg-[#F9FAFB] rounded-lg p-2.5">
                                                    <p className="text-[10px] text-[#9CA3AF]">Avg Price</p>
                                                    <p className="text-sm font-bold text-[#1A1A1A]">${card.avgPrice}/kg</p>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <div className="flex items-center justify-between mb-1">
                                                    <p className="text-[10px] text-[#9CA3AF]">Confidence</p>
                                                    <p className="text-[10px] font-bold text-[#0091A3]">{card.confidence}%</p>
                                                </div>
                                                <div className="w-full bg-[#E5E7EB] rounded-full h-1.5">
                                                    <div
                                                        className="h-1.5 rounded-full bg-[#0091A3]"
                                                        style={{ width: `${card.confidence}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <p className="text-xs text-[#4F4F4F] leading-relaxed">{card.explanation}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Risk Modal */}
            {modalOpen && insights && (
                <RiskBreakdownModal
                    forecast={insights.incomeForecast}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
}