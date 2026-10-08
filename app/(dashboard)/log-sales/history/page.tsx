'use client';
import { useEffect, useState } from 'react';
import { ArrowLeft, Plus, DollarSign, Box, TrendingUp, Search, Download, Eye, Printer, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { logSalesHistory, logSalesMetrics } from '@/app/services/logSales';
import { logSalesHistoryData, LogSalesMetrics } from '@/app/lib/types';
import { Spinner } from '@/app/components/ui/spinner';

import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  change?: string;
  changeLabel: string;
  icon: ReactNode;
  iconBg: string;
}

interface TableRowProps {
  date: string;
  initial: string;
  buyer: string;
  species: string;
  qty: string;
  price: string;
  total: string;
}

export default function SalesHistory() {
const [salesData, setSalesData] = useState<logSalesHistoryData | []>([]);
const [salesMetrics, setSalesMetrics] = useState<LogSalesMetrics | null>(null);
const [isMetricsLoading, setIsMetricsLoading] = useState(true);
const [isHistoryLoading, setIsHistoryLoading] = useState(true);



    useEffect(() => {
    const loadMetrics = async () => {
        setIsMetricsLoading(true);

        try {
            const response = await logSalesMetrics();
            setSalesMetrics(response.data);
        } catch (error) {
            console.error("Failed to load metrics", error);
        } finally {
            setIsMetricsLoading(false);
        }
    };

    loadMetrics();
}, []);

  
  
      useEffect(() => {
        const getSalesHistory = async () => {
          setIsHistoryLoading(true);
          try {
              const response = await logSalesHistory();
              if (response.data?.logSalesHistoryData) {
                  setSalesData(response.data.logSalesHistoryData);
              }
          } catch (error) {
              console.error("Failed to load history", error);
          } finally {
              setIsHistoryLoading(false);
          }
      };
          getSalesHistory();
      }, []);

  return (
    <div className="p-8 bg-[#F5F5F5] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <Link href="/log-sales" className="flex items-center gap-2 text-teal-700 text-sm font-medium mb-4 hover:underline">
            <ArrowLeft size={16} />
            Back to Log Sales
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-slate-800">Sales History</h1>
            <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Historical Records</span>
          </div>
          <p className="text-slate-500 mt-1">Track all sales transactions and revenue performance</p>
        </div>
        <Link href="/log-sales" className="bg-[#005F6B] text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-[#00444C] transition-colors">
          <Plus size={18} />
          New Sale Entry
        </Link>
      </div>

      {/* Stats Cards */}
       {isMetricsLoading ? (
                <div className="justify-center items-center mx-auto flex mb-10 gap-5">
                    <h2 className="flex text-lg">Loading log metrics </h2>
                    <span className="flex justify-center items-center"><Spinner className="w-5 h-5"/></span>
                </div>
       ):(
      <div className="grid grid-cols-3 gap-6">
        <StatCard title="MONTHLY TOTAL REVENUE" value={salesMetrics?.totalRevenue || 0} change="+12.5%" changeLabel="vs last month" icon={<DollarSign className="text-teal-700" />} iconBg="bg-teal-100" />
        <StatCard title="TOTAL WEIGHT SOLD" value={salesMetrics?.totalWeightSoldKg || 0} change="+5.2%" changeLabel="volume increase" icon={<Box className="text-teal-700" />} iconBg="bg-teal-100" />
        <StatCard title="TOTAL TRANSACTIONS" value={salesMetrics?.totalTransactions || 0} changeLabel="Active selling period" icon={<TrendingUp className="text-teal-700" />} iconBg="bg-teal-100" />
      </div>
       )}

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-8">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-96">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input type="text" placeholder="Search by buyer, invoice # or species..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-teal-500 bg-white" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Filter by:</span>
            <select className="border border-slate-200 rounded-lg px-3 py-2 bg-white text-sm outline-none w-32"></select>
            <select className="border border-slate-200 rounded-lg px-3 py-2 bg-white text-sm outline-none w-32"></select>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 bg-white"><Download size={18} /></button>
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/80 text-slate-500 font-bold text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Buyer</th>
              <th className="px-6 py-4">Species</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Total Revenue</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
           {isHistoryLoading ? (
  <tbody><tr><td colSpan={7} className="py-10 text-center text-slate-500">Loading sales history…</td></tr></tbody>
) : (
  <tbody className="divide-y divide-slate-100"> ... </tbody>
)}
          
         
        </table>
      </div>
    </div>
  );
}

// Sub-components
function StatCard({ title, value, change, changeLabel, icon, iconBg }: StatCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between">
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">{title}</h3>
        <p className="text-3xl font-bold text-slate-800 mb-2">{value}</p>
        <p className="text-xs text-slate-500 flex items-center gap-1">
          {change && <span className="text-green-500 font-bold">↗ {change}</span>}
          {changeLabel}
        </p>
      </div>
      <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
    </div>
  );
}

function TableRow({ date, initial, buyer, species, qty, price, total }: TableRowProps) {
  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      <td className="px-6 py-4 text-slate-600">{date}</td>
      <td className="px-6 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#002B5B] text-white flex items-center justify-center text-xs font-bold">{initial}</div>
        <span className="font-medium text-slate-800">{buyer}</span>
      </td>
      <td className="px-6 py-4 text-slate-600">{species}</td>
      <td className="px-6 py-4 text-slate-600">{qty}</td>
      <td className="px-6 py-4 text-slate-600">{price}</td>
      <td className="px-6 py-4">
        <span className="bg-blue-50 text-blue-700 font-bold px-3 py-1.5 rounded-md">{total}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3 text-slate-400">
          <button className="hover:text-teal-600"><Eye size={18} /></button>
          <button className="hover:text-teal-600"><Printer size={18} /></button>
          <button className="hover:text-teal-600"><MoreVertical size={18} /></button>
        </div>
      </td>
    </tr>
  );
}