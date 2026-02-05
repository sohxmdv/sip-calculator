import React from 'react';
import { motion } from 'framer-motion';
import { useSIP } from './hooks/useSIP';
import InputSection from './components/InputSection';
import ResultsDisplay from './components/ResultsDisplay';
import Visualizer from './components/Visualizer';
import GrowthChart from './components/GrowthChart';
import { getWealthInsight } from './utils/formatters';
import { RotateCcw, Share2, Download } from 'lucide-react';

function App() {
  const sip = useSIP();
  const formatINR = (val) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR', 
      maximumFractionDigits: 0 
    }).format(val);

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?amt=${sip.amount}&yr=${sip.years}&rt=${sip.rate}`;
    navigator.clipboard.writeText(url);
    alert("Plan link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200 p-4 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">

        <header className="mb-6 md:mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">FinCalc Pro</h1>
            <p className="text-slate-400 font-medium tracking-wide uppercase text-[10px] md:text-xs">Professional Investment Planner</p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            <button onClick={sip.reset} className="p-2.5 bg-[#161b22] border border-slate-700 text-slate-300 hover:bg-[#1c2128] transition-all flex items-center gap-2 text-sm font-bold">
              <RotateCcw size={16} /> <span className="hidden sm:inline">Reset</span>
            </button>
            <button onClick={handleShare} className="p-2.5 bg-[#161b22] border border-slate-700 text-slate-300 hover:bg-[#1c2128] transition-all flex items-center gap-2 text-sm font-bold">
              <Share2 size={16} /> <span className="hidden sm:inline">Copy Link</span>
            </button>
            <button onClick={() => window.print()} className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all flex items-center gap-2 text-sm font-bold shadow-lg shadow-black/30">
              <Download size={16} /> <span className="hidden sm:inline">Download PDF</span>
            </button>
          </div>
        </header>

        {/* The Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Sticky Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="lg:col-span-5 space-y-6 lg:sticky lg:top-8"
          >
            <InputSection sip={sip} formatINR={formatINR} />
            
            {/* NEW: Quick Tips Card to fill the 'Blank Space' beautifully */}
            <div className="hidden lg:block p-6 bg-[#161b22] rounded-3xl border border-slate-700">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Investment Pro-Tips</h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-slate-400">
                  <span className="text-emerald-400 font-bold">01.</span>
                  Start early to maximize the "hockey-stick" growth seen in your charts.
                </li>
                <li className="flex gap-3 text-sm text-slate-400">
                  <span className="text-emerald-400 font-bold">02.</span>
                  Try 'Step-Up' mode to see how small annual increases drastically change the outcome.
                </li>
              </ul>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Results & Charts */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="lg:col-span-7 space-y-6"
          >
            <ResultsDisplay results={sip.results} formatINR={formatINR} />

            <div className="bg-gradient-to-b from-[#161b22] to-[#11161c] p-6 md:p-8 rounded-3xl border border-slate-700">
              <div className="flex flex-col sm:flex-row items-center justify-around gap-8">
                <div className="w-full sm:w-1/2 flex justify-center">
                  <Visualizer invested={sip.results.totalInvested} returns={sip.results.estimatedReturns} />
                </div>
                <div className="w-full sm:w-1/2">
                  <GrowthChart monthlyAmount={sip.amount} rate={sip.rate} years={sip.years} />
                </div>
              </div>

              <div className="mt-8 p-4 md:p-6 bg-[#1c2128] rounded-2xl border border-slate-700">
                <h4 className="font-bold text-slate-200 flex items-center gap-2 text-sm">
                  <span>🚀</span> Wealth Insight
                </h4>
                <p className="text-slate-400 text-xs md:text-sm mt-2 leading-relaxed">
                  {getWealthInsight(sip.results, sip.years, sip.mode)}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default App;