import React from 'react';
import AnimatedNumber from './AnimatedNumber';

const ResultsDisplay = ({ results, formatINR }) => {
  return (
    <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200">
      <div className="space-y-1 mb-8">
        <p className="text-indigo-100 font-medium text-sm uppercase tracking-widest">
          Expected Maturity Value
        </p>
        <h2 className="text-4xl md:text-5xl font-black">
          <AnimatedNumber value={results.totalMaturityValue} />
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6 pt-8 border-t border-indigo-400/50">
        <div className="space-y-1">
          <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest">
            Total Invested
          </p>
          <p className="text-xl font-bold">
            {formatINR(results.totalInvested)}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest">
            Est. Returns
          </p>
          <p className="text-xl font-bold text-emerald-300">
            +{formatINR(results.estimatedReturns)}
          </p>
        </div>
      </div>

      {/* Trust Signal: Added for the "Professional" look */}
      <div className="mt-8 flex items-center gap-2 text-[10px] text-indigo-200 uppercase font-semibold tracking-tighter opacity-60">
        <div className="h-1 w-1 bg-emerald-400 rounded-full animate-pulse"></div>
        Live calculation based on compounding logic
      </div>
    </div>
  );
};

export default ResultsDisplay;