"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    History,
    X,
    Save,
    ScaleIcon,
    ShieldHalf,
    ChartColumnStacked,
} from "lucide-react";
import { dailyCatchLog } from "@/app/services/logCatch";
import { useToast } from "@/app/context/ToastContext";

const speciesOptions = [
    "Bluefin Tuna",
    "Atlantic Cod",
    "Haddock",
    "Yellowfin Tuna",
    "Pollock",
    "Salmon",
    "Mackerel",
    "Herring",
    "Sardine",
    "Tilapia",
];

const unitOptions = ["kg", "lbs", "tons"];

const gearOptions = [
    "Longline",
    "Trawl",
    "Gillnet",
    "Purse Seine",
    "Hook & Line",
    "Trap/Pot",
];



export default function LogCatchPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        species: "",
        dateOfCatch: "",
        quantityHarvested: 0,
        unit: "",
        fishingEffort: 0,
        gearType: "",
    });
    const { showToast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await dailyCatchLog({
                species: form.species,
                catchDate: form.dateOfCatch,
                quantity: form.quantityHarvested,
                unit: form.unit,
                fishingHours: form.fishingEffort,
                gearType: form.gearType,
            });
            if (response.success) {
                showToast("Your daily catch has been logged successfully");
                router.push("/log-catch/history");
            }
            else {
                showToast("Daily catch unable to log, please try again.")
            }
        }
        catch (error) {
            console.error("Unexpected error", error)
        }
        finally {
            setIsLoading(false);
        }
    };

    const inputClass =
        "w-full border border-[#BDBDBD] rounded-lg px-4 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#BDBDBD] focus:outline-none focus:ring-2 focus:ring-[#005F6B] focus:border-transparent bg-white transition";

    const selectClass =
        "w-full border border-[#BDBDBD] rounded-lg px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#005F6B] focus:border-transparent bg-white appearance-none transition";

    return (
        <div className="p-8 bg-[#F5F5F5] min-h-screen">

            {/* Breadcrumb */}
            <p className="text-xs text-[#4F4F4F] mb-4">
                Home{" "}
                <span className="mx-1 text-[#BDBDBD]">›</span>
                Logs{" "}
                <span className="mx-1 text-[#BDBDBD]">›</span>
                <span className="text-[#0091A3] font-medium">Log Daily Catch</span>
            </p>

            {/* Page Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#1A1A1A]">Log Daily Catch</h1>
                    <p className="text-sm text-[#4F4F4F] mt-1">
                        Enter the details of your latest harvest for accurate revenue tracking and regulatory compliance.
                    </p>
                </div>
                <Link
                    href="/log-catch/history"
                    className="flex items-center gap-2 text-sm font-semibold text-[#005F6B] hover:text-[#005F6B] transition-colors mt-1"
                >
                    <History size={16} className="text-[#005F6B]" />
                    View Catch History
                </Link>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl border border-[#BDBDBD20] shadow-sm p-8 mb-6">

                {/* Card Header */}
                <div className="flex items-center gap-3 mb-7">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#A5F1E9]">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.6667 2.5C13.1063 2.50626 13.5256 2.68598 13.8333 3L17 6.16667C17.314 6.47438 17.4937 6.89372 17.5 7.33333V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H12.6667Z" stroke="#002B5B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14.1654 17.4987V11.6654C14.1654 11.4444 14.0776 11.2324 13.9213 11.0761C13.765 10.9198 13.553 10.832 13.332 10.832H6.66536C6.44435 10.832 6.23239 10.9198 6.07611 11.0761C5.91983 11.2324 5.83203 11.4444 5.83203 11.6654V17.4987" stroke="#002B5B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.83203 2.5V5.83333C5.83203 6.05435 5.91983 6.26631 6.07611 6.42259C6.23239 6.57887 6.44435 6.66667 6.66536 6.66667H12.4987" stroke="#002B5B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                    <h2 className="text-xl font-bold text-[#1A1A1A]">Catch Information</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Row 1: Species + Date */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                                Target Species <span className="text-[#EB5757]">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="species"
                                    value={form.species}
                                    onChange={handleChange}
                                    required
                                    className={selectClass}
                                >
                                    <option value="" disabled />
                                    {speciesOptions.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#4F4F4F]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M4 6L8 10L12 6" stroke="#4F4F4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                                Date of Catch <span className="text-[#EB5757]">*</span>
                            </label>
                            <input
                                type="date"
                                name="dateOfCatch"
                                value={form.dateOfCatch}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Row 2: Quantity + Unit + Fishing Effort */}
                    <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-start">
                        <div>
                            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                                Quantity Harvested <span className="text-[#EB5757]">*</span>
                            </label>
                            <input
                                type="number"
                                name="quantityHarvested"
                                value={form.quantityHarvested}
                                onChange={handleChange}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div className="w-36">
                            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                                Unit
                            </label>
                            <div className="relative">
                                <select
                                    name="unit"
                                    value={form.unit}
                                    onChange={handleChange}
                                    className={selectClass}
                                >
                                    <option value="" disabled />
                                    {unitOptions.map((u) => (
                                        <option key={u} value={u}>{u}</option>
                                    ))}
                                </select>
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M4 6L8 10L12 6" stroke="#4F4F4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                                Fishing Effort (Hours) <span className="text-[#EB5757]">*</span>
                            </label>
                            <input
                                type="number"
                                name="fishingEffort"
                                value={form.fishingEffort}
                                onChange={handleChange}
                                placeholder="Total hours on water"
                                min="0"
                                required
                                className={inputClass}
                            />
                            <p className="text-xs text-[#4F4F4F] mt-1">Total hours spent fishing</p>
                        </div>
                    </div>

                    {/* Row 3: Gear Type */}
                    <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                            Gear Type Used <span className="text-[#EB5757]">*</span>
                        </label>
                        <div className="relative">
                            <select
                                name="gearType"
                                value={form.gearType}
                                onChange={handleChange}
                                required
                                className={selectClass}
                            >
                                <option value="" disabled />
                                {gearOptions.map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M4 6L8 10L12 6" stroke="#4F4F4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </div>
                        <p className="text-xs text-[#4F4F4F] mt-2 italic">
                            This data is used for sustainability reporting and gear efficiency analysis.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 pt-2">
                        <button
                            type="button"
                            onClick={() => router.push("/dashboard")}
                            className="flex items-center gap-2 text-sm font-semibold text-[#4F4F4F] hover:text-[#1A1A1A] transition-colors"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                        <button
                        onClick={handleSubmit}
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 bg-[#005F6B] hover:bg-[#00444D] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors disabled:opacity-60"
                        >
                            <Save size={16} />
                            {isLoading ? "Saving..." : "Save Catch Log"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-4">

                <div className="bg-[#E3F2FD] rounded-2xl border border-[#BDBDBD20] p-5 flex gap-4 items-start shadow-sm">
                    <span className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-[#002B5B]">
                        <ScaleIcon size={20} className="text-[#ffffff]" />
                    </span>
                    <div>
                        <p className="font-bold text-sm text-[#005F6B]">Accurate Weights</p>
                        <p className="text-xs text-[#4F4F4F] mt-1 leading-relaxed">Ensure catch is weighed at offload for final regulatory reporting accuracy.</p>
                    </div>
                </div>

                <div className="bg-[#FFF3E0] rounded-2xl border border-[#BDBDBD20] p-5 flex gap-4 items-start shadow-sm">
                    <span className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-[#F2C94C]">
                        <ShieldHalf size={20} className="text-[#7C4700]" />
                    </span>
                    <div>
                        <p className="font-bold text-sm text-[#005F6B]">Compliance Ready</p>
                        <p className="text-xs text-[#4F4F4F] mt-1 leading-relaxed">Logs are automatically encrypted and formatted for regional fisheries commission standards.</p>
                    </div>
                </div>

                <div className="bg-[#E8F5E9] rounded-2xl border border-[#BDBDBD20] p-5 flex gap-4 items-start shadow-sm">
                    <span className={`flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-[#27AE60]`}>
                        <ChartColumnStacked size={20} className="text-[#1B5E20]" />
                    </span>
                    <div>
                        <p className="font-bold text-sm text-[#005F6B]">Revenue Sync</p>
                        <p className="text-xs text-[#4F4F4F] mt-1 leading-relaxed">Catch data updates your revenue projections instantly on the dashboard.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}