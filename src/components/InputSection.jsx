import React from 'react';
import { motion } from 'framer-motion';

const InputSection = ({ sip }) => {
  const handleInputChange = (e, setter, min, max) => {
    let value = e.target.value === '' ? '' : Number(e.target.value);
    if (value !== '' && value > max) value = max;
    setter(value);
  };

  // Reusable Preset Button Component
  const PresetButton = ({ value, label, current, onClick }) => (
    <button
      onClick={() => onClick(value)}
      className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${current === value
          ? 'bg-indigo-600 text-white'
          : 'bg-slate-100 text-slate-500 hover:bg-indigo-100'
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">

      {/* MODE TOGGLE */}
      <div className="flex p-1 bg-slate-100 rounded-xl mb-10">
        {['SIP', 'Step-Up', 'Lumpsum'].map((m) => (
          <button
            key={m}
            onClick={() => sip.setMode(m)}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${sip.mode === m ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="space-y-10">

        {/* AMOUNT INPUT */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {sip.mode === 'Lumpsum' ? 'Investment' : 'Monthly SIP'}
              </label>
              <div className="flex gap-1.5">
                {[1000, 5000, 10000, 25000, 50000].map(v => (
                  <PresetButton
                    key={v} value={v} label={`₹${v >= 1000 ? v / 1000 + 'K' : v}`}
                    current={sip.amount} onClick={sip.setAmount}
                  />
                ))}
              </div>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600 font-bold">₹</span>
              <input
                type="number" value={sip.amount}
                onChange={(e) => handleInputChange(e, sip.setAmount, 500, 1000000)}
                className="w-32 pl-7 pr-3 py-2 bg-indigo-50 border-none rounded-xl text-right font-bold text-indigo-600 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
          <input type="range" min="500" max="100000" step="500" value={sip.amount || 0} onChange={(e) => sip.setAmount(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </div>

        {/* RETURNS INPUT */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Expected Return (p.a)</label>
              <div className="flex gap-1.5">
                {[10, 12, 15, 18].map(v => (
                  <PresetButton key={v} value={v} label={`${v}%`} current={sip.rate} onClick={sip.setRate} />
                ))}
              </div>
            </div>
            <div className="relative">
              <input type="number" step="0.1" value={sip.rate} onChange={(e) => handleInputChange(e, sip.setRate, 1, 30)} className="w-24 pr-8 py-2 bg-indigo-50 border-none rounded-xl text-right font-bold text-indigo-600 focus:ring-2 focus:ring-indigo-500 outline-none" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600 font-bold">%</span>
            </div>
          </div>
          <input type="range" min="1" max="30" step="0.1" value={sip.rate || 0} onChange={(e) => sip.setRate(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </div>

        {/* YEARS INPUT */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Time Period</label>
              <div className="flex gap-1.5">
                {[5, 10, 15, 20, 25].map(v => (
                  <PresetButton key={v} value={v} label={`${v}Y`} current={sip.years} onClick={sip.setYears} />
                ))}
              </div>
            </div>
            <input type="number" value={sip.years} onChange={(e) => handleInputChange(e, sip.setYears, 1, 40)} className="w-20 px-3 py-2 bg-indigo-50 border-none rounded-xl text-right font-bold text-indigo-600 focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <input type="range" min="1" max="40" value={sip.years || 0} onChange={(e) => sip.setYears(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </div>

        {/* STEP-UP INPUT (Bonus Requirement 4a) */}
        {sip.mode === 'Step-Up' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Annual Step-Up</label>
              <div className="relative">
                <input type="number" value={sip.stepUp} onChange={(e) => handleInputChange(e, sip.setStepUp, 1, 50)} className="w-24 pr-8 py-2 bg-indigo-50 border-none rounded-xl text-right font-bold text-indigo-600 focus:ring-2 focus:ring-indigo-500 outline-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600 font-bold">%</span>
              </div>
            </div>
            <input type="range" min="1" max="50" value={sip.stepUp || 0} onChange={(e) => sip.setStepUp(Number(e.target.value))} className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InputSection;