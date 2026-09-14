'use client';

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useMasking } from '@/contexts';

const data = [
  { day: 'Mon', amount: 150000 },
  { day: 'Tue', amount: 230000 },
  { day: 'Wed', amount: 80000 },
  { day: 'Thu', amount: 450000 },
  { day: 'Fri', amount: 120000 },
  { day: 'Sat', amount: 550000 },
  { day: 'Sun', amount: 300000 },
];

export const ExpenseChart = () => {
  const { isVisible } = useMasking();

  return (
    <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl p-6 rounded-[24px] border border-white/10 shadow-2xl mt-4">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-white/60 text-sm font-medium mb-1">This Week</h3>
          <p className="text-2xl font-bold text-white">{isVisible ? 'Rp 1.880.000' : 'Rp *********'}</p>
        </div>
        <div className="text-xs font-medium text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full">
          +12%
        </div>
      </div>
      
      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
              dy={10}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#2C2C2E] px-3 py-2 rounded-xl shadow-xl border border-white/10">
                      <p className="text-white font-semibold text-sm">
                        {isVisible ? `Rp ${(payload[0].value as number).toLocaleString('id-ID')}` : 'Rp *********'}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="amount" radius={[6, 6, 6, 6]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.amount > 400000 ? '#FF453A' : '#0A84FF'} 
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
