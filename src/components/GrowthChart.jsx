import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GrowthChart = ({ monthlyAmount, rate, years }) => {
    // Generate yearly data points for the chart
    const data = Array.from({ length: years + 1 }, (_, year) => {
        const i = rate / 100 / 12;
        const n = year * 12;
        const maturityValue = year === 0 ? 0 : monthlyAmount * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));

        return {
            year: `Yr ${year}`,
            value: Math.round(maturityValue),
        };
    });

    return (
        <div className="h-[250px] w-full mt-8">
            <h3 className="text-sm font-semibold text-slate-600 mb-4">Wealth Projection Over Time</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis hide />
                    <Tooltip
                        formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                        contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GrowthChart;