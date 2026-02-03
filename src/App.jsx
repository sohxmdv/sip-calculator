import React from 'react';
import { motion } from 'framer-motion';
import { useSIP } from './hooks/useSIP';
import InputSection from './components/InputSection';
import ResultsDisplay from './components/ResultsDisplay'; // Import the new component
import Visualizer from './components/Visualizer';
import GrowthChart from './components/GrowthChart';
import { getWealthInsight } from './utils/formatters'; // Logic explanation helper

function App() {
  const sip = useSIP();

  const formatINR = (val) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR', 
      maximumFractionDigits: 0 
    }).format(val);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">FinCalc Pro</h1>
          <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">
            Anuyog Software Assignment
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Inputs and Key Numbers */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="lg:col-span-5 space-y-6"
          >
            <InputSection sip={sip} formatINR={formatINR} />
            <ResultsDisplay results={sip.results} formatINR={formatINR} />
          </motion.div>

          {/* RIGHT COLUMN: Visualizations and Insights */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="lg:col-span-7"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 h-full flex flex-col">
              
              {/* Chart Grid */}
              <div className="flex flex-col md:flex-row items-center gap-4 flex-grow">
                <Visualizer invested={sip.results.totalInvested} returns={sip.results.estimatedReturns} />
                <GrowthChart monthlyAmount={sip.amount} rate={sip.rate} years={sip.years} />
              </div>

              {/* DYNAMIC INSIGHT CARD: Explains the logic */}
              <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <span>🚀</span> Wealth Insight
                </h4>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
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