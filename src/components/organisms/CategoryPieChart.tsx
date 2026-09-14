'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useMasking, usePreferences, useFinance } from '@/contexts';
import { formatCurrency } from '@/lib/utils';
import { useMemo } from 'react';

// Tailwind color maps for pie chart
const TW_COLORS: Record<string, string> = {
  'bg-rose-500': '#FF453A',
  'bg-amber-500': '#FF9F0A',
  'bg-sky-500': '#32ADE6',
  'bg-emerald-500': '#30D158',
  'bg-blue-500': '#0A84FF',
  'bg-indigo-500': '#5E5CE6',
};

export const CategoryPieChart = () => {
  const { isVisible } = useMasking();
  const { currency } = usePreferences();
  const { transactions, categories } = useFinance();

  const data = useMemo(() => {
    return categories
      .filter(c => c.type === 'expense')
      .map(c => {
        const spent = transactions
          .filter(t => t.categoryId === c.id)
          .reduce((acc, t) => acc + t.amount, 0);
        return {
          name: c.name,
          value: spent,
          color: TW_COLORS[c.color] || '#5E5CE6'
        };
      })
      .filter(c => c.value > 0); // only show categories with actual spending
  }, [categories, transactions]);

  const hiddenText = currency === 'IDR' ? 'Rp *********' : (currency === 'USD' ? '$ ***' : '€ ***');
  const hiddenTextCompact = currency === 'IDR' ? 'Rp ***' : (currency === 'USD' ? '$ ***' : '€ ***');
  
  const totalAmount = data.reduce((acc, curr) => acc + curr.value, 0);

  if (data.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl p-6 rounded-[24px] border border-white/10 shadow-2xl">
        <h3 className="text-white/60 text-sm font-medium mb-4">Spending by Category</h3>
        <div className="h-[200px] flex items-center justify-center text-white/40 text-sm">
          No expenses this period
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl p-6 rounded-[24px] border border-white/10 shadow-2xl">
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
              innerRadius={75}
              outerRadius={95}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} />
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
                        {isVisible
                          ? formatCurrency(payload[0].value as number, currency)
                          : hiddenText}
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
          <span className="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">Total</span>
          <span className="text-white font-bold text-[13px] text-center max-w-[130px] break-words leading-tight">
            {isVisible ? formatCurrency(totalAmount, currency) : hiddenTextCompact}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-white/80">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-white">
              {isVisible ? formatCurrency(item.value, currency) : hiddenText}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
