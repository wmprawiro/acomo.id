'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Food & Dining', value: 2000000, color: '#FF453A' },
  { name: 'Transportation', value: 1200000, color: '#FF9F0A' },
  { name: 'Entertainment', value: 800000, color: '#32ADE6' },
  { name: 'Utilities', value: 500000, color: '#30D158' },
];

export const CategoryPieChart = () => {
  return (
    <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl p-6 rounded-[24px] border border-white/10 shadow-2xl mt-4">
      <div className="mb-4">
        <h3 className="text-white/60 text-sm font-medium">Spending by Category</h3>
      </div>
      
      <div className="h-[200px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#2C2C2E] px-3 py-2 rounded-xl shadow-xl border border-white/10">
                      <p className="text-white font-semibold text-sm">
                        {payload[0].name}
                      </p>
                      <p className="text-white/70 text-xs">
                        Rp {(payload[0].value as number).toLocaleString('id-ID')}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-white/40 text-xs">Total</span>
          <span className="text-white font-bold text-lg">4.5M</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-3">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-white/80">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-white">
              Rp {item.value.toLocaleString('id-ID')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
