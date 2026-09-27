'use client';
import React, { useEffect, useState } from 'react';
import { 
  AlertCircle, 
  X, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  Box, 
  Zap, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { processingEntry, processingHistoryList, processingMetrics } from '@/app/services/processing';
import { useToast } from '@/app/context/ToastContext';
import { processingHistory, processingMetricsData } from '@/app/lib/types';

export default function ProcessingTracking() {
  const [isLoading, setIsLoading] =  useState(false);
const [formData, setFormData] = useState({
  processingDate: "",
  volumeReceived: 0,
  volumeSpoiled: 0,
});
const [processingHistory, setProcessingHistory] = useState<processingHistory[] | []>([]);
const [dailyProcessingMetrics, setDailyProcessingMetrics] = useState<processingMetricsData | null>(null);
const {showToast} = useToast();


const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getProcessingMetrics = async () => {
            setIsLoading(true);
            try {
                const response = await processingMetrics();
                const items = response.data
                setDailyProcessingMetrics(items);
            }
    
            catch (error) {
                console.error("Failed to load metrcis")
            } finally {
                setIsLoading(false);
            }
        }
    
        useEffect(() => {
            getProcessingMetrics();
        }, []);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(false);

      try{
         const response = await processingEntry({
          processingDate: formData.processingDate,
          rawWeightKg: formData.volumeReceived,
          spoilageWeightKg: formData.volumeSpoiled
         });
         console.log(response);

         if (response.success) {
          showToast("Entry form filled successfully");
         } else if (response.success === false) {
          showToast ( "Processing Entry Failed. Please try again")
         }
      }
      catch(error) {
        console.error("Processing Entry Failed", error);
      } finally {
        setIsLoading(true);
      }
    };

    const getProcessingHistory = async () => {
      setIsLoading(true);
      
      try {
                  const response = await processingHistoryList();
                  if (response.data?.data) {
                      setProcessingHistory(response.data.data);
                  }
              } catch (error) {
                  console.error("Failed to load history", error);
              } finally {
                  setIsLoading(false);
              }
          };
      
          useEffect(() => {
              getProcessingHistory();
          }, []);

  return (
    <div className="space-y-6 pb-10 p-8">


      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Processing & Spoilage Tracking</h1>
          <p className="text-sm text-slate-500">Record daily processing volumes and track spoiled inventory.</p>
        </div>
        <Link href="/processing/AI-Insights" className="flex items-center gap-2 text-slate-600 font-bold text-sm">
          <Sparkles size={18} className="text-teal-600" /> AI Insights
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProcessStat label="Total Volume Processed" value= {dailyProcessingMetrics?.totalProcessedKg} change={dailyProcessingMetrics?.processedPercentChange} icon={<Box size={20} />} />
        <ProcessStat label="Total Spoilage (7 days)" value={dailyProcessingMetrics?.spoilageLast7DaysKg} change={dailyProcessingMetrics?.spoilagePercentChange} icon={<AlertCircle size={20} />} isAlert />
        <ProcessStat label="Average Yield Rate" value={dailyProcessingMetrics?.avgYieldRate} change={dailyProcessingMetrics?.avgYieldPercent} icon={<Zap size={20} />} isSuccess />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entry Form */}
        <div className="col-span-7 bg-white p-4 lg:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Processing Entry</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Processing Date<span className="text-red-500">*</span></label>
              <input onChange={handleChange} value={formData.processingDate} name='processingDate' type="date" className="w-full border border-slate-200 rounded-lg p-3" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Volume Received (kg)<span className="text-red-500">*</span></label>
              <input onChange={handleChange} value={formData.volumeReceived} name='volumeReceived' type="number" placeholder="0.00" className="w-full border border-slate-200 rounded-lg p-3" />
              <p className="text-[10px] text-slate-400">Total volume received for processing</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-red-500">Volume Spoiled (kg)<span className="text-red-500">*</span></label>
              <input onChange={handleChange} value={formData.volumeSpoiled} name='volumeSpoiled' type="number" placeholder="0.00" className="w-full border border-red-200 rounded-lg p-3 bg-red-50/30" />
              <p className="text-[10px] text-slate-400">Volume lost due to spoilage</p>
            </div>
            <div className="flex justify-between gap-4 pt-4">
              <button onClick={() => setFormData({ processingDate: "", volumeReceived: 0, volumeSpoiled: 0 })} type="button" className="text-slate-500 font-bold">Discard Draft</button>
              <button onClick={handleSubmit} type="submit" className="bg-[#005F6B] text-white px-4 lg:px-8 py-3 rounded-lg font-bold flex items-center gap-2">
                <Box size={18} /> Save Record
              </button>
            </div>
          </form>
        </div>

        {/* Efficiency Sidebar */}
        <div className="col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Live Efficiency Analysis</p>
            <p className="text-xs text-slate-500 mt-1">Calculated Loss %</p>
            <p className="text-6xl font-bold text-teal-500 my-4">0.0%</p>
            
            <div className="space-y-4 text-left mt-8">
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1">
                  <span>Current Yield</span>
                  <span>0.0%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full w-[2%]" />
                </div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-slate-400 uppercase">Target Yield</span>
                <span className="text-teal-600">92.0%</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 italic mt-6">Loss above 20% requires a mandatory quality report attachment.</p>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-3">
            <div className="bg-[#005F6B] text-white p-2 rounded-lg h-fit"><Info size={16} /></div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Calculation Logic</h4>
              <p className="text-[10px] text-slate-600 mt-1">Loss % is calculated as (Volume Spoiled / Volume Received) &times; 100. Values over 15% will appear <span className="text-orange-500 font-bold">Yellow</span>, and over 20% will appear <span className="text-red-500 font-bold">Red</span>.</p>
            </div>
          </div>
        </div>
      </div>

{/* processing history */}
                  <div className="bg-white rounded-2xl border border-[#BDBDBD20] shadow-sm overflow-x-auto">
                <table className="w-full text-sm overflow-x-auto">
                    <thead>
                        <tr className="border-b border-[#F5F5F5]">
                            {["DATE", "RECEIVED", "SPOILED", "LOSS %", "STATUS"].map((h) => (
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
                                    Loading processing history history...
                                </td>
                            </tr>
                        )}

                        {!isLoading && processingHistory.map((row, i) => (
                            <tr
                                className="border-b border-[#F5F5F5] hover:bg-[#F5F5F5] transition-colors "
                            >
                                <td className="px-6 py-4 text-[#4F4F4F] text-sm">{row.processingDate}</td>
                                <td className="px-6 py-4 font-semibold text-[#005F6B]">{row.processedWeightKg}</td>
                                <td className="px-6 py-4 text-[#4F4F4F]">{row.spoilageWeightKg}</td>
                                <td className="px-6 py-4 text-[#4F4F4F]">{row.lossPercent}</td>
                                <td className="px-6 py-4">
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${
      row.status === "GOOD"
        ? "bg-[#27AE60]/10 text-[#27AE60]"
        : "bg-[#EB5757]/10 text-[#EB5757]"
    }`}
  >
    {row.status}
  </span>
</td>
                            </tr>
                        ))}

                        {!isLoading && processingHistory.length === 0 && (
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

function ProcessStat({ label, value, change, icon, isAlert, isSuccess }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex gap-4">
      <div className={`p-3 rounded-lg h-fit ${isAlert ? 'bg-red-50 text-red-500' : isSuccess ? 'bg-teal-50 text-teal-600' : 'bg-slate-50 text-teal-800'}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className={`text-[10px] font-bold mt-1 ${isSuccess ? 'text-teal-600' : isAlert ? 'text-red-500' : 'text-teal-600'}`}>
          {change}
        </p>
      </div>
    </div>
  );
}