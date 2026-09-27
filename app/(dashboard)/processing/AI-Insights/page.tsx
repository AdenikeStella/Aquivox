import React from 'react';
import { 
  ArrowLeft, 
  AlertTriangle, 
  ChevronDown, 
  Wind, 
  Thermometer, 
  Droplets,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export default function AIInsights() {
  return (
    <div className="space-y-6">
      <div className="text-xs text-slate-400 mb-2">
        Processing &rsaquo; <span className="text-teal-800 font-medium">AI Insights</span>
      </div>

      <Link href="/processing" className="flex items-center gap-2 text-teal-700 text-sm font-bold hover:underline">
        <ArrowLeft size={16} /> Back to Processing & Spoilage
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-slate-800">AI-Powered Processing Insights</h1>
        <p className="text-sm text-slate-500">Al-driven recommendations to optimize storage, reduce waste, and prevent spoilage.</p>
      </div>

      {/* Oversupply Alert */}
      <div className="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-8 relative overflow-hidden">
         <div className="flex gap-6 relative z-10">
            <div className="text-orange-500"><AlertTriangle size={32} /></div>
            <div className="flex-1">
               <h2 className="text-lg font-bold text-slate-800">Oversupply Risk Detected</h2>
               <div className="grid grid-cols-2 gap-8 mt-4">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Risk Type</p>
                    <p className="text-sm font-bold text-orange-600">High Inventory vs Low Demand</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-4">Current Inventory</p>
                    <p className="text-lg font-bold text-slate-800">850 kg</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Affected Species</p>
                    <p className="text-sm font-bold text-slate-800">Tuna, Mackerel</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-4">Expected Demand</p>
                    <p className="text-lg font-bold text-slate-800">450 kg</p>
                  </div>
               </div>
               
               <div className="mt-8 bg-white/60 p-6 rounded-xl border border-orange-100">
                  <p className="text-sm font-bold text-slate-800 mb-3">Suggested Actions</p>
                  <ul className="text-xs space-y-2 text-slate-600 list-disc ml-4">
                    <li>Offer 15% discount to clear inventory within 48 hours</li>
                    <li>Contact bulk buyers for immediate sale</li>
                    <li>Consider freezing excess stock to prevent spoilage</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>

      {/* Storage Cards */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-slate-50 p-2 rounded-lg text-teal-700"><Zap size={20} /></div>
          <div>
            <h3 className="font-bold text-slate-800">AI Storage & Handling Recommendations</h3>
            <p className="text-[10px] text-slate-400">Optimized storage methods to reduce waste</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <StorageCard species="Tuna" risk="High Risk" riskColor="text-red-500 bg-red-50" storage="Flash freeze at -40°C" handling="Ice immediately after catch" reduction="18%" />
          <StorageCard species="Salmon" risk="Medium Risk" riskColor="text-orange-500 bg-orange-50" storage="Refrigerate at 0-2°C" handling="Gut within 2 hours" reduction="12%" />
          <StorageCard species="Mackerel" risk="Low Risk" riskColor="text-green-500 bg-green-50" storage="Ice storage 0-4°C" handling="Standard handling" reduction="8%" />
        </div>
      </div>

      {/* Accordion Spoilage Insights */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6">Species-Specific Spoilage Insights</h3>
        <div className="space-y-4">
          <div className="border border-red-100 rounded-xl overflow-hidden">
            <div className="bg-red-50/30 p-4 flex justify-between items-center cursor-pointer">
               <div className="flex items-center gap-4">
                  <div className="text-red-500"><AlertTriangle size={18} /></div>
                  <div>
                    <span className="font-bold text-slate-800">Tuna</span>
                    <span className="ml-4 text-xs text-red-500">High spoilage risk detected</span>
                  </div>
               </div>
               <ChevronDown size={18} className="text-slate-400" />
            </div>
            {/* Expanded Section */}
            <div className="p-6 border-t border-red-100 bg-white space-y-4">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Risk Reason</p>
                <p className="text-sm text-slate-700 font-medium">High ambient temperature combined with delayed processing. Current stock age: 18 hours.</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Handling Tip</p>
                <p className="text-sm text-slate-700 font-medium">Immediately transfer to flash freezer. Avoid room temperature exposure beyond 30 minutes.</p>
              </div>
              <div className="flex items-center gap-3">
                 <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">URGENT</span>
                 <span className="text-sm font-bold text-slate-800">Process within 6 hours</span>
              </div>
            </div>
          </div>
          
          <div className="border border-slate-100 rounded-xl p-4 flex justify-between items-center opacity-60">
             <div className="flex items-center gap-4">
                <div className="text-red-400"><AlertTriangle size={18} /></div>
                <span className="font-bold text-slate-800">Salmon</span>
                <span className="ml-4 text-xs text-slate-400 font-medium">High spoilage risk detected</span>
             </div>
             <ChevronDown size={18} className="text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StorageCard({ species, risk, riskColor, storage, handling, reduction }: any) {
  return (
    <div className="border border-slate-100 rounded-xl p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-slate-800 text-lg">{species}</h4>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${riskColor}`}>{risk}</span>
      </div>
      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Recommended Storage</p>
        <p className="text-sm font-bold text-slate-800">{storage}</p>
      </div>
      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Handling Practice</p>
        <p className="text-sm font-bold text-slate-800">{handling}</p>
      </div>
      <p className="text-xs font-bold text-teal-500 pt-2">Est. waste reduction: {reduction}</p>
    </div>
  );
}