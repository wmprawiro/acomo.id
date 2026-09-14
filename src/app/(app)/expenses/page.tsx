'use client';

import { useState, useMemo } from 'react';
import { ExpenseChart, CategoryPieChart } from '@/components/organisms';
import { TransactionItem, IosSheet } from '@/components/molecules';
import { MaskingProvider, useFinance } from '@/contexts';
import { Funnel, Calendar } from '@phosphor-icons/react';

export default function ExpensesPage() {
  const [activeTab, setActiveTab] = useState<'Day' | 'Week' | 'Month' | 'Year'>('Week');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { transactions, categories } = useFinance();

  const TOP_SPENDING = useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense')
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
      .map(t => {
        const category = categories.find(c => c.id === t.categoryId);
        const dateObj = new Date(t.date);
        return {
          ...t,
          categoryName: category?.name || 'Unknown',
          formattedDate: dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        };
      });
  }, [transactions, categories]);

  return (
    <>
      <div className="space-y-6">
        
        {/* Header & Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/80">
            <Calendar size={20} weight="duotone" />
            <span className="font-medium">September 2026</span>
          </div>
          <button onClick={() => setIsFilterOpen(true)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors">
            <Funnel size={18} weight="fill" />
          </button>
        </div>

        {/* Date Filter Tabs */}
        <div className="flex bg-[#1C1C1E]/70 p-1 rounded-2xl backdrop-blur-md border border-white/10">
          {(['Day', 'Week', 'Month', 'Year'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-center py-2 text-[14px] font-medium transition-colors ${
                activeTab === tab
                  ? 'text-white bg-white/10 rounded-xl shadow-sm'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Chart */}
        <section>
          <ExpenseChart />
        </section>

        {/* Categories */}
        <section>
          <CategoryPieChart />
        </section>

        {/* Top Spending List */}
        <section className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[24px] border border-white/10 shadow-2xl overflow-hidden pb-2">
          <div className="p-6 pb-2">
            <h3 className="text-white/80 text-[15px] font-semibold tracking-tight">Top Spending</h3>
          </div>
          <div className="flex flex-col">
            {TOP_SPENDING.length === 0 ? (
              <div className="py-4 text-center text-white/40 text-sm">No expenses yet.</div>
            ) : (
              TOP_SPENDING.map((trx) => (
                <TransactionItem
                  key={trx.id}
                  title={trx.title}
                  categoryName={trx.categoryName}
                  date={trx.formattedDate}
                  amount={trx.amount}
                  type={trx.type}
                />
              ))
            )}
          </div>
        </section>

      </div>

      <IosSheet isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} title="Filter Transactions">
        <div className="space-y-6">
          <div className="bg-[#1C1C1E] border border-white/10 rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] text-white/50">Sort By</label>
              <select className="bg-transparent text-white text-[17px] outline-none">
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
            <div className="h-[1px] w-full bg-white/5" />
            <div className="flex flex-col gap-2">
              <label className="text-[13px] text-white/50">Category</label>
              <select className="bg-transparent text-white text-[17px] outline-none">
                <option value="all">All Categories</option>
                <option value="food">Food & Dining</option>
                <option value="transport">Transportation</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
          </div>
          <button 
            onClick={() => setIsFilterOpen(false)}
            className="w-full bg-white text-black font-semibold rounded-2xl py-4 hover:bg-gray-200 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </IosSheet>

    </>
  );
}
