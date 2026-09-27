"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from 'react';
import { FileText, CheckCircle2, Clock, ChevronDown, Check } from 'lucide-react';
import { logSales } from "@/app/services/logSales";
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

export default function NewSaleEntry() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        species: "",
        quantitySold: "",
        pricePerUnit: "",
        fishingEffort: "",
        gearType: "",
        buyerName: "",
        transactionDate: "",
    });
    const {showToast} = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(false);
        try {
            const response = await logSales({
                buyerName: form.buyerName,
                species: form.species,
                quantitySoldKg: form.quantitySold,
                pricePerUnit: form.pricePerUnit,
                transactionDate: form.transactionDate,
            });
            console.log(response);
            if (response.success) {
                showToast("sales has been logged successfully")
                            router.push("/log-sales/history");
            } else {
                showToast("Unable to log sales. Please try again");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const totalRevenue = Number(form.quantitySold) * Number(form.pricePerUnit)

    const inputClass =
        "w-full border border-[#BDBDBD] rounded-lg px-4 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#BDBDBD] focus:outline-none focus:ring-2 focus:ring-[#005F6B] focus:border-transparent bg-white transition";

    const selectClass =
        "w-full border border-[#BDBDBD] rounded-lg px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#005F6B] focus:border-transparent bg-white appearance-none transition";
    return (
        <div className="p-8 bg-[#F5F5F5] min-h-screenspace-y-6">

            <p className="text-xs text-[#002B5B] mb-4">
                ⊕ Log Sales Transaction
            </p>

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1A1A1A]">New Sale Entry</h1>
                        <p className="text-sm text-[#4F4F4F] mt-1">Document the exchange of goods and update your revenue stream.</p>
                    </div>
                </div>

                <Link
                    href="/log-sales/history"
                    className="flex items-center gap-2 text-sm font-semibold text-[#005F6B] hover:text-[#005F6B] transition-colors mt-1"
                >
                    <FileText size={18} />
                    View Sales History
                </Link>
            </div>

            {/* Main Form Card */}

            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-7">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Species<span className="text-red-500">*</span></label>
                            
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
                                Transaction Date <span className="text-[#EB5757]">*</span>
                            </label>
                            <input
                                type="date"
                                name="transactionDate"
                                value={form.transactionDate}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Quantity Sold (kg)<span className="text-red-500">*</span></label>
                            <input onChange={handleChange} value={form.quantitySold} name="quantitySold"
                                type="number" placeholder="0.00" className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-teal-500" />
                            <p className="text-xs text-slate-500">kg</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Price per Unit ($)<span className="text-red-500">*</span></label>
                            <input onChange={handleChange} value={form.pricePerUnit} type="number" name="pricePerUnit" placeholder="0.00" className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-teal-500" />
                            <p className="text-xs text-slate-500">/kg</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Buyer Name<span className="text-red-500">*</span></label>
                        <input onChange={handleChange} value={form.buyerName} name="buyerName"
                            type="text" placeholder="Enter company or individual name" className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-teal-500" />
                    </div>

                    {/* Projection Box */}
                    <div className="bg-[#A5F1E9] rounded-xl p-6 flex items-center justify-between mt-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-teal-600/10 rounded-lg flex items-center justify-center text-teal-800">
                                <span className="text-xl font-bold">$</span>
                            </div>
                            <div>
                                <p className="text-teal-900 font-bold text-sm tracking-wide">PROJECTED TOTAL REVENUE</p>
                                <p className="text-teal-800 text-sm">Calculated based on current inputs</p>
                            </div>
                        </div>
                        <input onChange={handleChange} value={totalRevenue} readOnly name="totalRevenue"
                            type="text"  className="text-4xl font-bold text-teal-900" />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-8">
                        <button type="button" className="text-slate-500 font-medium hover:text-slate-800">Clear Fields</button>
                        <div className="flex items-center gap-4">
                            <button type="button" className="text-slate-600 font-medium hover:text-slate-800">Cancel</button>
                            <button type="submit" className="bg-[#005F6B] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-[#00444C] transition-colors">
                                <FileText size={18} />
                                Save Transaction
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#E3F2FD] p-4 rounded-xl flex gap-4 border border-blue-100">
                    <div className="bg-[#002B5B] text-white p-2 rounded-lg h-fit"><FileText size={20} /></div>
                    <div>
                        <h4 className="font-bold text-[#002B5B] text-sm">Catch ID Matching</h4>
                        <p className="text-xs text-slate-600 mt-1">Ensure the catch ID matches the processing batch before finalizing.</p>
                    </div>
                </div>
                <div className="bg-[#E8F5E9] p-4 rounded-xl flex gap-4 border border-green-100">
                    <div className="bg-[#27AE60] text-white p-2 rounded-lg h-fit"><Check size={20} /></div>
                    <div>
                        <h4 className="font-bold text-[#002B5B] text-sm">Verified Buyers</h4>
                        <p className="text-xs text-slate-600 mt-1">Verified buyers receive automatic e-invoices upon submission.</p>
                    </div>
                </div>
                <div className="bg-[#FFF3E0] p-4 rounded-xl flex gap-4 border border-orange-100">
                    <div className="bg-[#F2C94C] text-white p-2 rounded-lg h-fit"><Clock size={20} /></div>
                    <div>
                        <h4 className="font-bold text-[#002B5B] text-sm">24hr Edit Window</h4>
                        <p className="text-xs text-slate-600 mt-1">You can edit this entry for up to 24 hours in the Sales Log.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}