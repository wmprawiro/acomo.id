'use client';

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useMasking, usePreferences, useFinance } from '@/contexts';
import { formatCurrency, maskCurrency } from '@/lib/utils';
import { useMemo } from 'react';

export const ExpenseChart = ({ title, period = 'Week' }: { title?: string, period?: 'Day' | 'Week' | 'Month' | 'Year' }) => {
  const { isVisible } = useMasking();
  const { currency } = usePreferences();
  const { transactions } = useFinance();
  
  const data = useMemo(() => {
    const now = new Date();
    let filteredTransactions = transactions.filter(t => t.type === 'expense');

    if (period === 'Day') {
      filteredTransactions = filteredTransactions.filter(t => {
        const d = new Date(t.date);
        return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });

      const dayData = [
        { label: '00:00', amount: 0 },
        { label: '04:00', amount: 0 },
        { label: '08:00', amount: 0 },
        { label: '12:00', amount: 0 },
        { label: '16:00', amount: 0 },
        { label: '20:00', amount: 0 },
      ];
      filteredTransactions.forEach(t => {
        const h = new Date(t.date).getHours();
        const index = Math.floor(h / 4);
        if (dayData[index]) dayData[index].amount += t.amount;
      });
      return dayData;
    } 
    
    if (period === 'Week') {
      const currentDay = now.getDay() === 0 ? 7 : now.getDay();
      const monday = new Date(now);
      monday.setDate(monday.getDate() - currentDay + 1);
      monday.setHours(0, 0, 0, 0);

      const nextMonday = new Date(monday);
      nextMonday.setDate(monday.getDate() + 7);

      filteredTransactions = filteredTransactions.filter(t => {
        const d = new Date(t.date);
        return d >= monday && d < nextMonday;
      });

      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const weekData = days.map(label => ({ label, amount: 0 }));
      filteredTransactions.forEach(t => {
        const d = new Date(t.date);
        let dayIndex = d.getDay() - 1;
        if (dayIndex === -1) dayIndex = 6;
        if (weekData[dayIndex]) weekData[dayIndex].amount += t.amount;
      });
      return weekData;
    }

    if (period === 'Month') {
      filteredTransactions = filteredTransactions.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });

      const monthData = [
        { label: 'W1', amount: 0 },
        { label: 'W2', amount: 0 },
        { label: 'W3', amount: 0 },
        { label: 'W4', amount: 0 },
        { label: 'W5', amount: 0 },
      ];
      filteredTransactions.forEach(t => {
        const d = new Date(t.date);
        const weekIndex = Math.floor((d.getDate() - 1) / 7);
        const idx = Math.min(weekIndex, 4);
        monthData[idx].amount += t.amount;
      });
      return monthData;
    }

    if (period === 'Year') {
      filteredTransactions = filteredTransactions.filter(t => {
        const d = new Date(t.date);
        return d.getFullYear() === now.getFullYear();
      });

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const yearData = months.map(label => ({ label, amount: 0 }));
      filteredTransactions.forEach(t => {
        const m = new Date(t.date).getMonth();
        if (yearData[m]) yearData[m].amount += t.amount;
      });
      return yearData;
    }

    return [];
  }, [transactions, period]);

  const hiddenText = maskCurrency(currency);
  const totalAmount = data.reduce((acc, curr) => acc + curr.amount, 0);
  const displayTitle = title || `This ${period}`;

  return (
    <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl p-6 rounded-[24px] border border-white/10 shadow-2xl">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-white/60 text-sm font-medium mb-1">{displayTitle}</h3>
          <p className="text-2xl font-bold text-white">{isVisible ? formatCurrency(totalAmount, currency) : hiddenText}</p>
        </div>
      </div>
      
      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="label" 
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
            <Bar dataKey="amount" radius={[6, 6, 6, 6]}>
              {data.map((entry) => (
                <Cell 
                  key={`cell-${entry.label}`} 
                  fill={entry.amount > 0 && entry.amount >= Math.max(...data.map(d => d.amount)) * 0.8 ? '#FF453A' : '#0A84FF'} 
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
