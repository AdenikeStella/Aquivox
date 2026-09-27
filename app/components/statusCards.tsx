"use client";
import { useState } from "react";
import {
    CloudSun,
    CloudRain,
    CloudLightning,
    Leaf,
    TrendingDown,
    X,
    Check,
} from "lucide-react";

// ── Shared Modal Shell ────────────────────────────────────────────────────────

function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

// ── Weather Card + Modal ──────────────────────────────────────────────────────

type WeatherSeverity = "mild" | "moderate" | "severe";

const weatherModalConfig: Record<WeatherSeverity, {
    statusLabel: string;
    statusColor: string;
    accentColor: string;
    iconBg: string;
    icon: React.ReactNode;
    causes: string[];
    actions: string[];
}> = {
    mild: {
        statusLabel: "Mild - Safe Conditions",
        statusColor: "text-[#16A34A]",
        accentColor: "#16A34A",
        iconBg: "bg-[#DCFCE7]",
        icon: <CloudSun size={22} className="text-[#16A34A]" />,
        causes: [
            "Clear skies with calm sea conditions",
            "Wind speeds within safe operational limits",
            "No weather warnings issued for fishing zones",
        ],
        actions: [
            "Proceed with normal fishing operations",
            "Monitor weather updates every 4 hours",
            "Keep communication channels open with shore",
        ],
    },
    moderate: {
        statusLabel: "Moderate - Exercise Caution",
        statusColor: "text-[#F59E0B]",
        accentColor: "#F59E0B",
        iconBg: "bg-[#FEF9C3]",
        icon: <CloudRain size={22} className="text-[#F59E0B]" />,
        causes: [
            "Choppy sea conditions forecasted for the next 6 hours",
            "Wind speeds approaching upper safety threshold",
            "Light rain reducing visibility in some zones",
        ],
        actions: [
            "Avoid operating in exposed offshore zones",
            "Reduce vessel speed and secure loose equipment",
            "Check updated forecast before heading out",
        ],
    },
    severe: {
        statusLabel: "Severe - Do Not Operate",
        statusColor: "text-[#EF4444]",
        accentColor: "#EF4444",
        iconBg: "bg-[#FEE2E2]",
        icon: <CloudLightning size={22} className="text-[#EF4444]" />,
        causes: [
            "Severe storm system approaching fishing zones",
            "Wind speeds exceeding safe operational limits",
            "High wave alerts issued by meteorological authority",
        ],
        actions: [
            "Halt all offshore fishing operations immediately",
            "Return all vessels to port and secure them",
            "Do not resume operations until all-clear is issued",
        ],
    },
};

const weatherCardConfig: Record<WeatherSeverity, {
    iconBg: string;
    icon: React.ReactNode;
    label: string;
    desc: string;
}> = {
    mild: {
        iconBg: "bg-[#DCFCE7]",
        icon: <CloudSun size={20} className="text-[#16A34A]" />,
        label: "Mild Weather",
        desc: "Clear skies, good fishing conditions",
    },
    moderate: {
        iconBg: "bg-[#FEF9C3]",
        icon: <CloudRain size={20} className="text-[#F59E0B]" />,
        label: "Moderate Weather Alert",
        desc: "Choppy conditions forecasted, exercise caution",
    },
    severe: {
        iconBg: "bg-[#FEE2E2]",
        icon: <CloudLightning size={20} className="text-[#EF4444]" />,
        label: "Severe Weather Warning",
        desc: "Dangerous conditions, avoid going out",
    },
};

export function WeatherCard({ severity = "moderate" }: { severity?: WeatherSeverity }) {
    const [open, setOpen] = useState(false);
    const card = weatherCardConfig[severity];
    const modal = weatherModalConfig[severity];

    return (
        <>
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm flex gap-4 items-start">
                <span className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${card.iconBg}`}>
                    {card.icon}
                </span>
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[#111827]">{card.label}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{card.desc}</p>
                    <div className="flex items-center justify-between mt-3">
                        <p className="text-[10px] text-[#9CA3AF]">Updated 2h ago</p>
                        <button
                            onClick={() => setOpen(true)}
                            className="text-xs font-semibold text-[#0091A3] hover:underline"
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>

            {open && (
                <Modal onClose={() => setOpen(false)}>
                    {/* Modal Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E7EB]">
                        <div className="flex items-center gap-3">
                            <span className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${modal.iconBg}`}>
                                {modal.icon}
                            </span>
                            <div>
                                <p className="font-bold text-[#111827] text-[15px]">Weather Analysis</p>
                                <p className="text-xs text-[#6B7280]">Live forecast assessment</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-[#9CA3AF] hover:text-[#374151] transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="px-6 py-5 space-y-5">
                        {/* Current Status */}
                        <div>
                            <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-widest mb-1">
                                Current Status
                            </p>
                            <p className={`text-base font-bold ${modal.statusColor}`}>
                                {modal.statusLabel}
                            </p>
                        </div>

                        {/* Causes */}
                        <div>
                            <p className="text-sm font-bold text-[#111827] mb-2">What Caused This Alert</p>
                            <ul className="space-y-2">
                                {modal.causes.map((cause) => (
                                    <li key={cause} className="flex items-start gap-2.5">
                                        <span
                                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                            style={{ backgroundColor: modal.accentColor }}
                                        />
                                        <p className="text-sm text-[#374151]">{cause}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Actions */}
                        <div>
                            <p className="text-sm font-bold text-[#111827] mb-2">Recommended Actions</p>
                            <ul className="space-y-2">
                                {modal.actions.map((action) => (
                                    <li key={action} className="flex items-start gap-2.5">
                                        <Check size={14} className="text-[#0091A3] mt-0.5 shrink-0" />
                                        <p className="text-sm text-[#374151]">{action}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="px-6 pb-6">
                        <button
                            onClick={() => setOpen(false)}
                            className="w-full bg-[#0D5C63] hover:bg-[#005F6B] text-white font-semibold py-3 rounded-xl transition-colors"
                        >
                            Got It
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
}

// ── Sustainability Card + Modal ───────────────────────────────────────────────

type SustainabilityStatus = "good" | "monitor" | "critical";

const sustainabilityModalConfig: Record<SustainabilityStatus, {
    statusLabel: string;
    statusColor: string;
    accentColor: string;
    iconBg: string;
    iconColor: string;
    causes: string[];
    actions: string[];
}> = {
    good: {
        statusLabel: "Good - Within Safe Limits",
        statusColor: "text-[#16A34A]",
        accentColor: "#16A34A",
        iconBg: "bg-[#DCFCE7]",
        iconColor: "text-[#16A34A]",
        causes: [
            "Catch volumes are within recommended seasonal levels",
            "Fishing locations fully comply with protected zone boundaries",
            "Weekly catch rate is 10% below sustainable quota",
        ],
        actions: [
            "Continue current fishing practices",
            "Monitor catch volumes on a weekly basis",
            "Maintain safe distance from all spawning zones",
        ],
    },
    monitor: {
        statusLabel: "Monitor - Approaching Threshold",
        statusColor: "text-[#F59E0B]",
        accentColor: "#F59E0B",
        iconBg: "bg-[#FEF9C3]",
        iconColor: "text-[#F59E0B]",
        causes: [
            "Increased catch volume of juvenile salmon (below recommended size)",
            "Catch locations overlap with protected spawning zones",
            "Weekly catch rate 15% above sustainable quota",
        ],
        actions: [
            "Shift fishing operations 5km north to avoid spawning zones",
            "Reduce daily catch by 20% for next 2 weeks",
            "Implement selective fishing to target larger specimens",
        ],
    },
    critical: {
        statusLabel: "Critical - Threshold Exceeded",
        statusColor: "text-[#EF4444]",
        accentColor: "#EF4444",
        iconBg: "bg-[#FEE2E2]",
        iconColor: "text-[#EF4444]",
        causes: [
            "Catch volumes significantly exceed recommended limits",
            "Multiple active fishing zones overlapping protected areas",
            "Weekly catch rate 40% above the sustainable quota",
        ],
        actions: [
            "Immediately halt all operations in protected zones",
            "Reduce total catch output by 50% for the next month",
            "Report status to fisheries authority and await guidance",
        ],
    },
};

const sustainabilityCardConfig: Record<SustainabilityStatus, {
    iconBg: string;
    iconColor: string;
    label: string;
    labelColor: string;
}> = {
    good: { iconBg: "bg-[#DCFCE7]", iconColor: "text-[#16A34A]", label: "Good", labelColor: "text-[#16A34A]" },
    monitor: { iconBg: "bg-[#FEF9C3]", iconColor: "text-[#F59E0B]", label: "Monitor", labelColor: "text-[#F59E0B]" },
    critical: { iconBg: "bg-[#FEE2E2]", iconColor: "text-[#EF4444]", label: "Critical", labelColor: "text-[#EF4444]" },
};

export function SustainabilityCard({ status = "monitor" }: { status?: SustainabilityStatus }) {
    const [open, setOpen] = useState(false);
    const card = sustainabilityCardConfig[status];
    const modal = sustainabilityModalConfig[status];

    return (
        <>
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm flex gap-4 items-start">
                <span className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${card.iconBg}`}>
                    <Leaf size={20} className={card.iconColor} />
                </span>
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[#111827]">Sustainability Status</p>
                    <p className={`text-sm font-semibold mt-1 ${card.labelColor}`}>{card.label}</p>
                    <div className="flex items-center justify-between mt-3">
                        <p className="text-[10px] text-[#9CA3AF]">Updated 1h ago</p>
                        <button
                            onClick={() => setOpen(true)}
                            className="text-xs font-semibold text-[#0091A3] hover:underline"
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>

            {open && (
                <Modal onClose={() => setOpen(false)}>
                    {/* Modal Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E7EB]">
                        <div className="flex items-center gap-3">
                            <span className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${modal.iconBg}`}>
                                <Leaf size={22} className={modal.iconColor} />
                            </span>
                            <div>
                                <p className="font-bold text-[#111827] text-[15px]">Sustainability Analysis</p>
                                <p className="text-xs text-[#6B7280]">AI-powered assessment</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-[#9CA3AF] hover:text-[#374151] transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="px-6 py-5 space-y-5">
                        {/* Current Status */}
                        <div>
                            <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-widest mb-1">
                                Current Status
                            </p>
                            <p className={`text-base font-bold ${modal.statusColor}`}>
                                {modal.statusLabel}
                            </p>
                        </div>

                        {/* Causes */}
                        <div>
                            <p className="text-sm font-bold text-[#111827] mb-2">What Caused This Status</p>
                            <ul className="space-y-2">
                                {modal.causes.map((cause) => (
                                    <li key={cause} className="flex items-start gap-2.5">
                                        <span
                                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                            style={{ backgroundColor: modal.accentColor }}
                                        />
                                        <p className="text-sm text-[#374151]">{cause}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Actions */}
                        <div>
                            <p className="text-sm font-bold text-[#111827] mb-2">Recommended Actions</p>
                            <ul className="space-y-2">
                                {modal.actions.map((action) => (
                                    <li key={action} className="flex items-start gap-2.5">
                                        <Check size={14} className="text-[#0091A3] mt-0.5 shrink-0" />
                                        <p className="text-sm text-[#374151]">{action}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="px-6 pb-6">
                        <button
                            onClick={() => setOpen(false)}
                            className="w-full bg-[#0D5C63] hover:bg-[#005F6B] text-white font-semibold py-3 rounded-xl transition-colors"
                        >
                            Got It
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
}

// ── Income Risk Card (no modal) ───────────────────────────────────────────────

type IncomeRisk = "low" | "moderate" | "high";

export function IncomeRiskCard({ risk = "low" }: { risk?: IncomeRisk }) {
    const config = {
        low: {
            label: "Stable",
            barColor: "bg-[#16A34A]",
            labelColor: "text-[#16A34A]",
            barWidth: "w-[30%]",
            iconBg: "bg-[#DCFCE7]",
            iconColor: "text-[#16A34A]",
        },
        moderate: {
            label: "Moderate",
            barColor: "bg-[#F59E0B]",
            labelColor: "text-[#F59E0B]",
            barWidth: "w-[60%]",
            iconBg: "bg-[#FEF9C3]",
            iconColor: "text-[#F59E0B]",
        },
        high: {
            label: "High Risk",
            barColor: "bg-[#EF4444]",
            labelColor: "text-[#EF4444]",
            barWidth: "w-[90%]",
            iconBg: "bg-[#FEE2E2]",
            iconColor: "text-[#EF4444]",
        },
    }[risk];

    return (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm flex gap-4 items-start">
            <span className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${config.iconBg}`}>
                <TrendingDown size={20} className={config.iconColor} />
            </span>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[#111827]">Income Risk Status</p>
                <p className={`text-sm font-semibold mt-1 ${config.labelColor}`}>{config.label}</p>
                <div className="w-full bg-[#E5E7EB] rounded-full h-1.5 mt-2">
                    <div className={`h-1.5 rounded-full transition-all duration-500 ${config.barColor} ${config.barWidth}`} />
                </div>
                <p className="text-[10px] text-[#9CA3AF] mt-2">Based on last 30 days</p>
            </div>
        </div>
    );
}