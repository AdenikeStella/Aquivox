'use client'
import {
    DollarSign,
    TrendingUp,
    BarChart2,
    Package,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import { WeatherCard, SustainabilityCard, IncomeRiskCard } from "@/app/components/statusCards";
import { useEffect, useState } from "react";
import { dashboardMetrics} from "@/app/lib/types";
import { DashboardMetricsData } from "@/app/services/dashboard";





function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        Paid: "bg-[#DCFCE7] text-[#15803D]",
        Pending: "bg-[#FEF9C3] text-[#92400E]",
        Overdue: "bg-[#FEE2E2] text-[#B91C1C]",
    };
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status] ?? "bg-gray-100 text-gray-600"}`}>
            {status}
        </span>
    );
}

// ── Metric Pill ───────────────────────────────────────────────────────────────

function MetricPill({ label, value, bg, valueColor }: {
    label: string;
    value: string;
    bg: string;
    valueColor: string;
}) {
    return (
        <div className={`flex-1 rounded-xl p-4 ${bg}`}>
            <p className="text-xs text-[#6B7280] mb-1">{label}</p>
            <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        </div>
    );
}

// ── Transactions ──────────────────────────────────────────────────────────────

const transactions = [
    {
        id: "TRX-94821",
        vessel: "Arctic Voyager",
        species: "Salmon (Fresh)",
        date: "Oct 24, 2023",
        volume: "2,400 kg",
        amount: "$12,480.00",
        status: "Paid",
    },
];


export default function DashboardPage() {
    const [metricsData, setMetricsData] = useState<dashboardMetrics | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getMetricsData = async () => {

                try {
            const response = await DashboardMetricsData();
        }
        catch (err: unknown) {
            console.error("failed to load metrics", err);
        }
    };

    useEffect(() => {
        getMetricsData();
    }, []);


    return (

        <div className="p-8 space-y-6 bg-[#F9FAFB] min-h-screen">

            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#111827]">Monthly Revenue Summary</h1>
                <p className="text-sm text-[#6B7280] mt-0.5">
                    Overview of your fisheries operations and revenue performance
                </p>
            </div>

            {/* Stat Cards — CSS from your MetricCard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* total revenue */}
                <div
                    className="bg-white border border-[#8D8D8D33] rounded-xl p-6 font-inter"
                >
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <p className="text-[#4F4F4F] font-inter text-xs font-medium mb-3 pt-1">
                                Total Revenue (Month)                            </p>
                            <p className="text-3xl font-bold text-[#1A1A1A] mb-2">
                                $ {metricsData?.revenue.currentMonth}
                            </p>
                            <div className="flex gap-1 mt-3">
                                <p className={`text-xs font-medium flex items-center gap-0.5 ${Number(metricsData?.revenue.percentChange) < 40 ? "text-[#EB5757]" : "text-[#00A86B]"}`}>
                                    {Number(metricsData?.revenue.percentChange) < 40
                                        ? <ArrowDownRight className="w-4 h-4" />
                                        : <ArrowUpRight className="w-4 h-4" />
                                    }
                                    {metricsData?.revenue.percentChange}%{" "}
                                    <span className="text-[#4F4F4F] font-normal">vs last month</span>
                                </p>

                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="w-10 h-10 bg-[#A5F1E9] text-[#002B5B] rounded-lg flex items-center justify-center">
                                <DollarSign size={20} />
                            </div>
                        </div>
                    </div>
                    {isLoading ? (
  <tbody><tr><td colSpan={7} className="py-10 text-center text-slate-500">Loading sales history…</td></tr></tbody>
) : (
  <tbody className="divide-y divide-slate-100"> ... </tbody>
)}
                </div>

                {/* previous month */}
                <div
                    className="bg-white border border-[#8D8D8D33] rounded-xl p-6 font-inter"
                >
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <p className="text-[#4F4F4F] font-inter text-xs font-medium mb-3 pt-1">
                                Previous Month Revenue
                            </p>
                            <p className="text-3xl font-bold text-[#1A1A1A] mb-2">
                                $ {metricsData?.revenue.previousMonth}
                            </p>
                            <div className="flex gap-1 mt-3">
                                <p className={`text-xs font-medium flex items-center gap-0.5 ${Number(metricsData?.revenue.percentChange) < 40 ? "text-[#EB5757]" : "text-[#00A86B]"}`}>
                                    {Number(metricsData?.revenue.percentChange) < 40
                                        ? <ArrowDownRight className="w-4 h-4" />
                                        : <ArrowUpRight className="w-4 h-4" />
                                    }
                                    {metricsData?.revenue.percentChange}%{" "}
                                    <span className="text-[#4F4F4F] font-normal">vs last month</span>
                                </p>

                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="w-10 h-10 bg-[#A5F1E9] text-[#002B5B] rounded-lg flex items-center justify-center">
                                <TrendingUp size={20} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* total transaction */}
                <div
                    className="bg-white border border-[#8D8D8D33] rounded-xl p-6 font-inter"
                >
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <p className="text-[#4F4F4F] font-inter text-xs font-medium mb-3 pt-1">
                                Total Transactions
                            </p>
                            <p className="text-3xl font-bold text-[#1A1A1A] mb-2">
                                {metricsData?.transactions}
                            </p>
                            <div className="flex gap-1 mt-3">
                                <p className="text-xs text-[#4F4F4F] font-normal">Active selling period</p>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="w-10 h-10 bg-[#A5F1E9] text-[#002B5B] rounded-lg flex items-center justify-center">
                                <BarChart2 size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* catch volume */}
                <div
                    className="bg-white border border-[#8D8D8D33] rounded-xl p-6 font-inter"
                >
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <p className="text-[#4F4F4F] font-inter text-xs font-medium mb-3 pt-1">
                                Total Catch Volume
                            </p>
                            <p className="text-3xl font-bold text-[#1A1A1A] mb-2">
                                $ {metricsData?.catch.totalCatchTons} {""} Tons
                            </p>
                        </div>
                        <div className="mt-2">
                            <div className="w-10 h-10 bg-[#A5F1E9] text-[#002B5B] rounded-lg flex items-center justify-center">
                                <Package size={20} />                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-3 gap-4">
                {/* Pass the relevant prop to control the dynamic state */}
                <WeatherCard severity="mild" />
                <SustainabilityCard status="monitor" />
                <IncomeRiskCard risk="high" />
            </div>

            {/* Environmental Trends */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
                <h2 className="text-base font-bold text-[#111827]">Environmental Trends</h2>
                <p className="text-xs text-[#6B7280] mt-0.5 mb-4">Weather severity and water quality monitoring</p>
                <div className="flex gap-4">
                    <MetricPill label="Current Weather Severity" value="4/10" bg="bg-[#FEF2F2]" valueColor="text-[#EF4444]" />
                    <MetricPill label="Current Water Quality" value="7/10" bg="bg-[#F0FDF4]" valueColor="text-[#16A34A]" />
                </div>
            </div>

            {/* Post-Harvest Loss */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
                <h2 className="text-base font-bold text-[#111827]">Post-Harvest Loss</h2>
                <p className="text-xs text-[#6B7280] mt-0.5 mb-4">Loss, spoilage, and oversupply tracking</p>
                <div className="flex gap-4">
                    <MetricPill label="Loss %" value="7%" bg="bg-[#FEF2F2]" valueColor="text-[#EF4444]" />
                    <MetricPill label="Spoilage %" value="5%" bg="bg-[#FEF9C3]" valueColor="text-[#D97706]" />
                    <MetricPill label="Oversupply %" value="3%" bg="bg-[#E6F9FC]" valueColor="text-[#0091A3]" />
                </div>
            </div>

            {/* Revenue Trend */}
            <div className="bg-[#0D3B4F] rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-base font-bold text-white">Revenue Trend</h2>
                        <p className="text-xs text-white/60 mt-0.5">Last 6 months performance</p>
                    </div>
                    <span className="flex items-center gap-1 bg-[#0091A3] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        <ArrowUpRight size={12} />
                        -100.0%
                    </span>
                </div>
                <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-5">
                    {[
                        { label: "Average", value: "$92.7k" },
                        { label: "Peak", value: "$121.5k" },
                        { label: "Lowest", value: "$0.0k" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <p className="text-xs text-white/50">{stat.label}</p>
                            <p className="text-xl font-bold text-white mt-0.5">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Revenue Transactions */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
                    <h2 className="text-base font-bold text-[#111827]">Recent Revenue Transactions</h2>
                    <Link href="/dashboard/transactions" className="text-xs font-semibold text-[#0091A3] hover:underline">
                        View All Records
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                                {["TRANSACTION ID", "VESSEL", "SPECIES", "DATE", "VOLUME", "AMOUNT", "STATUS"].map((h) => (
                                    <th key={h} className="text-left px-6 py-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider whitespace-nowrap">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-[#374151]">{tx.id}</td>
                                    <td className="px-6 py-4 text-[#374151]">{tx.vessel}</td>
                                    <td className="px-6 py-4 text-[#374151]">{tx.species}</td>
                                    <td className="px-6 py-4 text-[#6B7280]">{tx.date}</td>
                                    <td className="px-6 py-4 text-[#374151]">{tx.volume}</td>
                                    <td className="px-6 py-4 font-semibold text-[#111827]">{tx.amount}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={tx.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}