"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowLeft, Plus, Search, SlidersHorizontal,
    Download, Pencil, Trash2, Weight, DollarSign, Clock,
} from "lucide-react";
import { catchHistory, catchHistoryResponse, catchLogMetrics } from "@/app/lib/types";
import { dailyCatchHistory, dailycatchMetrics } from "@/app/services/logCatch";
import { Spinner } from "@/app/components/ui/spinner";

const gearColors: Record<string, string> = {
    Longline: "bg-[#A5F1E9] text-[#002B5B]",
    Trawl: "bg-[#A5F1E9] text-[#002B5B]",
    Gillnet: "bg-[#A5F1E9] text-[#002B5B]",
    "Purse Seine": "bg-[#A5F1E9] text-[#002B5B]",
};

export default function CatchHistoryPage() {
    const [catches, setCatches] = useState<catchHistory[]>([]);
    const [catchMetrics, setCatchMetrics] = useState<catchLogMetrics | null>(null);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const logMetrics = async () => {
        setIsLoading(true);
       try {
            const response = await dailycatchMetrics();
            setCatchMetrics(response.data);
        }

        catch (error) {
            console.error("Failed to load metrcis")
        } finally {
            setIsLoading(false);
        }
    }

    // useEffect(() => {
    //     logMetrics();
    // }, []);



    const getCatchHistory = async () => {
        setIsLoading(true);
          try {
            const response = await dailyCatchHistory();
            if (response.data) {
                setCatches(response.data);
            }
        } catch (error) {
            console.error("Failed to load history", error);
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect(() => {
    //     getCatchHistory();
    // }, []);

    const filtered = catches.filter((c) =>
        c.species?.toLowerCase().includes(search.toLowerCase()) ||
        c.gearType?.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id: number) => {
        setCatches((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <div className="p-8 bg-[#F5F5F5] min-h-screen">
            <Link
                href="/log-catch"
                className="flex items-center gap-1.5 text-sm font-semibold text-[#0091A3] hover:text-[#005F6B] transition-colors mb-5"
            >
                <ArrowLeft size={15} />
                Back to Log Catch
            </Link>

            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#1A1A1A]">Catch History</h1>
                    <p className="text-sm text-[#4F4F4F] mt-1">
                        Comprehensive log of all historical fishery operations
                    </p>
                </div>
                <Link
                    href="/log-catch"
                    className="flex items-center gap-2 bg-[#005F6B] hover:bg-[#00444D] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
                >
                    <Plus size={16} />
                    Log New Catch
                </Link>
            </div>

            {/* Search + Filter + Export */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 relative">
                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#BDBDBD]" />
                    <input
                        type="text"
                        placeholder="Search species, vessel, or gear type..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#BDBDBD33] rounded-xl text-sm text-[#1A1A1A] placeholder:text-[#BDBDBD] focus:outline-none focus:ring-2 focus:ring-[#005F6B] transition"
                    />
                </div>
                <button className="flex items-center justify-center w-10 h-10 bg-white border border-[#BDBDBD33] rounded-xl hover:bg-[#F5F5F5] transition">
                    <SlidersHorizontal size={16} className="text-[#4F4F4F]" />
                </button>
                <button className="flex items-center gap-2 bg-white border border-[#BDBDBD33] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#4F4F4F] hover:bg-[#F5F5F5] transition">
                    <Download size={15} />
                    Export CSV
                </button>
            </div>

            {/* Summary Stats */}

            {isLoading ? (
                <div className="justify-center items-center mx-auto flex mb-10 gap-5">
                    <h2 className="flex text-lg">Loading log metrics </h2>
                    <span className="flex justify-center items-center"><Spinner className="w-5 h-5"/></span>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-4 mb-6">

                    <div className="bg-white rounded-2xl border border-[#BDBDBD20] p-5 flex items-center gap-4 shadow-sm">
                        <span className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 bg-[#E3F2FD]">
                            <Weight size={22} className="text-[#002B5B]" />
                        </span>
                        <div>
                            <p className="text-[10px] font-semibold text-[#BDBDBD] uppercase tracking-widest mb-1">TOTAL WEIGHT ({catchMetrics?.month})</p>
                            <p className="text-2xl font-bold text-[#1A1A1A]">{catchMetrics?.totalCatchKg} kg</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#BDBDBD20] p-5 flex items-center gap-4 shadow-sm">
                        <span className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 bg-[#FFF3E0]">
                            <DollarSign size={22} className="text-[#7C4700]" />
                        </span>
                        <div>
                            <p className="text-[10px] font-semibold text-[#BDBDBD] uppercase tracking-widest mb-1">REVENUE EST.</p>
                            <p className="text-2xl font-bold text-[#1A1A1A]">{catchMetrics?.revenueEstimate}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#BDBDBD20] p-5 flex items-center gap-4 shadow-sm">
                        <span className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 bg-[#F5F5F5]">
                            <Clock size={22} className="text-[#4F4F4F]" />
                        </span>
                        <div>
                            <p className="text-[10px] font-semibold text-[#BDBDBD] uppercase tracking-widest mb-1">FISHING HOURS</p>
                            <p className="text-2xl font-bold text-[#1A1A1A]">{catchMetrics?.totalFishingHours}</p>
                        </div>
                    </div>
                </div>
            )}




            {/* Table */}
            <div className="bg-white rounded-2xl border border-[#BDBDBD20] shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[#F5F5F5]">
                            {["DATE", "SPECIES", "QUANTITY", "HOURS", "GEAR TYPE", "ACTIONS"].map((h) => (
                                <th key={h} className="text-left px-6 py-4 text-[10px] font-bold text-[#BDBDBD] uppercase tracking-widest">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-[#BDBDBD] text-sm">
                                    Loading catch history...
                                </td>
                            </tr>
                        )}

                        {!isLoading && filtered.map((row, i) => (
                            <tr
                                key={row.id}
                                className={`border-b border-[#F5F5F5] hover:bg-[#F5F5F5] transition-colors ${i === filtered.length - 1 ? "border-b-0" : ""
                                    }`}
                            >
                                <td className="px-6 py-4 text-[#4F4F4F] text-sm">{row.catchDate}</td>
                                <td className="px-6 py-4 font-semibold text-[#005F6B]">{row.species}</td>
                                <td className="px-6 py-4 text-[#4F4F4F]">{row.catchVolumeKg}</td>
                                <td className="px-6 py-4 text-[#4F4F4F]">{row.fishingHours}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${gearColors[row.gearType] ?? "bg-gray-100 text-gray-600"}`}>
                                        {row.gearType}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-1.5 text-xs font-semibold text-[#4F4F4F] hover:text-[#1A1A1A] transition-colors">
                                            <Pencil size={13} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(row.id)}
                                            className="flex items-center gap-1.5 text-xs font-semibold text-[#EB5757] hover:text-red-700 transition-colors"
                                        >
                                            <Trash2 size={13} />
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {!isLoading && filtered.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-[#BDBDBD] text-sm">
                                    No catches found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}