import React from 'react';
import AnimatedNumber from './AnimatedNumber';

const ResultsDisplay = ({ results, formatINR }) => {
  return (
    <div className="bg-[#161b22] p-6 md:p-8 rounded-3xl border border-slate-700 shadow-lg">
      <div className="space-y-1 mb-6 md:mb-8">
        <p className="text-slate-400 font-medium text-[10px] md:text-sm uppercase tracking-widest">
          Expected Maturity Value
        </p>
        {/* Adjusted text size for mobile */}
        <h2 className="text-3xl md:text-5xl font-black">
          <AnimatedNumber value={results.totalMaturityValue} />
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-slate-700">
        <div className="space-y-1">
          <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
            Total Invested
          </p>
          <p className="text-lg md:text-xl font-bold">
            {formatINR(results.totalInvested)}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
            Est. Returns
          </p>
          <p className="text-lg md:text-xl font-bold text-emerald-300">
            +{formatINR(results.estimatedReturns)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;