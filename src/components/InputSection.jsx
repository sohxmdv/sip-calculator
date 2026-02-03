import React from 'react';
import { motion } from 'framer-motion';

const InputSection = ({ sip, formatINR }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
      
      {/* MODE TOGGLE: Toggles between SIP, Step-Up, and Lumpsum */}
      <div className="flex p-1 bg-slate-100 rounded-xl mb-10">
        {['SIP', 'Step-Up', 'Lumpsum'].map((m) => (
          <button
            key={m}
            onClick={() => sip.setMode(m)}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
              sip.mode === m 
                ? 'bg-white shadow-sm text-indigo-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        
        {/* INVESTMENT AMOUNT: Dynamic label based on mode */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">
              {sip.mode === 'Lumpsum' ? 'Total Investment' : 'Monthly SIP Amount'}
            </label>
            <span className="text-xl font-bold text-indigo-600">{formatINR(sip.amount)}</span>
          </div>
          <input 
            type="range" min="500" max="100000" step="500" 
            value={sip.amount} 
            onChange={(e) => sip.setAmount(Number(e.target.value))} 
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
          />
        </div>

        {/* EXPECTED RETURN RATE */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-sm font-bold text-slate-600 uppercase tracking-wider text-left">Expected Return (p.a)</label>
            <span className="text-xl font-bold text-indigo-600">{sip.rate}%</span>
          </div>
          <input 
            type="range" min="1" max="30" step="0.5" 
            value={sip.rate} 
            onChange={(e) => sip.setRate(Number(e.target.value))} 
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
          />
        </div>

        {/* INVESTMENT DURATION */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-sm font-bold text-slate-600 uppercase tracking-wider text-left">Time Period (Years)</label>
            <span className="text-xl font-bold text-indigo-600">{sip.years} Yr</span>
          </div>
          <input 
            type="range" min="1" max="40" 
            value={sip.years} 
            onChange={(e) => sip.setYears(Number(e.target.value))} 
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
          />
        </div>

        {/* BONUS: ANNUAL STEP-UP SLIDER */}
        {/* This section only renders when "Step-Up" mode is selected */}
        {sip.mode === 'Step-Up' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            className="space-y-4 pt-4 border-t border-slate-100"
          >
            <div className="flex justify-between items-end">
              <label className="text-sm font-bold text-indigo-600 uppercase tracking-wider text-left">Annual Step-Up %</label>
              <span className="text-xl font-bold text-indigo-600">{sip.stepUp}%</span>
            </div>
            <input 
              type="range" min="1" max="50" 
              value={sip.stepUp} 
              onChange={(e) => sip.setStepUp(Number(e.target.value))} 
              className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
            />
            <p className="text-[10px] text-slate-400 italic">Your investment will increase by {sip.stepUp}% every year.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InputSection;