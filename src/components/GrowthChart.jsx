import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Label 
} from 'recharts';

// Custom Tooltip for detailed hover interaction
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { invested, gains, total } = payload[0].payload;
    return (
      <div className="bg-[#161b22] p-4 shadow-xl border border-slate-100 rounded-2xl">
        <p className="text-xs font-bold text-slate-400 uppercase mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-emerald-400">
            Invested: ₹{invested.toLocaleString('en-IN')}
          </p>
          <p className="text-sm font-semibold text-emerald-500">
            Gains: ₹{gains.toLocaleString('en-IN')}
          </p>
          <div className="pt-1 mt-1 border-t border-slate-100">
            <p className="text-sm font-bold text-slate-200">
              Total: ₹{total.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const GrowthChart = ({ monthlyAmount, rate, years }) => {
  // Logic to generate annual data points
  const data = Array.from({ length: years + 1 }, (_, year) => {
    const i = rate / 100 / 12;
    const n = year * 12;
    
    // SIP Calculation for the specific year
    const sipValue = year === 0 ? 0 : monthlyAmount * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    const invested = monthlyAmount * n;
    const gains = Math.max(0, sipValue - invested);

    return {
      year: `Year ${year}`,
      total: Math.round(sipValue),
      invested: Math.round(invested),
      gains: Math.round(gains),
    };
  });

  return (
    <div className="h-[300px] w-full mt-4">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Wealth Projection</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
          
          <XAxis 
            dataKey="year" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            tick={{ fill: '#94A3B8', fontWeight: 500 }}
            dy={10}
          >
            <Label value="Investment Duration (Years)" offset={-10} position="insideBottom" fontSize={10} fill="#9ca3af" />
          </XAxis>

          <YAxis 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
            tick={{ fill: '#94A3B8', fontWeight: 500 }}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '5 5' }} />
          
          <Area 
            type="monotone" 
            dataKey="total" 
            stroke="#10b981" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorTotal)" 
            isAnimationActive={true}
            animationDuration={800} // Smooth slider transition
            animationEasing="ease-in-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;