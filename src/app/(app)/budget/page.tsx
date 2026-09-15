'use client';

import { useState, useMemo } from 'react';
import { usePreferences, useMasking, useFinance } from '@/contexts';
import { formatCurrency, maskCurrency, cn } from '@/lib/utils';
import { BudgetProgress, IosSheet } from '@/components/molecules';
import { ForkKnife, CarProfile, ShoppingBag, Plus, Tag, Money } from '@phosphor-icons/react';

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'hamburger': return <ForkKnife size={20} weight="duotone" />;
    case 'car': return <CarProfile size={20} weight="duotone" />;
    case 'money': return <Money size={20} weight="duotone" />;
    case 'shopping': return <ShoppingBag size={20} weight="duotone" />;
    default: return <Tag size={20} weight="duotone" />;
  }
};

export default function BudgetPage() {
  const { currency } = usePreferences();
  const { isVisible } = useMasking();
  const { categories, transactions, addCategory } = useFinance();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newBudgetTitle, setNewBudgetTitle] = useState('');
  const [newBudgetAmount, setNewBudgetAmount] = useState('');

  // Compute spent amount for each expense category that has a limit
  const budgets = useMemo(() => {
    return categories
      .filter(c => c.type === 'expense' && c.limit && c.limit > 0)
      .map(c => {
        const spent = transactions
          .filter(t => t.categoryId === c.id)
          .reduce((acc, t) => acc + t.amount, 0);
        return {
          id: c.id,
          title: c.name,
          spent,
          total: c.limit || 0,
          icon: getCategoryIcon(c.icon)
        };
      });
  }, [categories, transactions]);

  const totalBudget = budgets.reduce((acc, curr) => acc + curr.total, 0);
  const totalSpent = budgets.reduce((acc, curr) => acc + curr.spent, 0);

  const percentage = Math.min((totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0), 100) || 0;
  const isWarning = percentage >= 85;

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBudgetTitle || !newBudgetAmount) return;
    
    addCategory({
      name: newBudgetTitle,
      type: 'expense',
      limit: Number(newBudgetAmount),
      color: 'bg-indigo-500', // default color for new budgets
      icon: 'tag'
    });
    
    setNewBudgetTitle('');
    setNewBudgetAmount('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Total Budget Card */}
      <section className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl p-6 rounded-[24px] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <h3 className="text-white/60 text-sm font-medium mb-1">Total Monthly Budget</h3>
            <p className="text-2xl font-bold text-white tracking-tight">
              {isVisible ? formatCurrency(totalBudget, currency) : maskCurrency(currency)}
            </p>
          </div>
          <button onClick={() => setIsAddOpen(true)} className="bg-white/10 text-white p-2.5 rounded-full hover:bg-white/20 transition-colors backdrop-blur-md">
            <Plus size={20} weight="bold" />
          </button>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between text-[13px] text-white/70 mb-2">
            <span>Spent: {isVisible ? formatCurrency(totalSpent, currency) : maskCurrency(currency)}</span>
            <span className={isWarning ? "text-amber-400" : "text-emerald-400"}>{percentage.toFixed(0)}%</span>
          </div>
          <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden shadow-inner">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-1000 ease-out",
                percentage >= 100 ? 'bg-rose-500' : percentage >= 85 ? 'bg-amber-500' : 'bg-emerald-500'
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Decorative Background */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      </section>

      {/* Category Budgets */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-[15px] font-semibold text-white/80 tracking-tight">Budgets by Category</h3>
        </div>
        
        <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl p-2 rounded-[24px] border border-white/10">
          {budgets.length === 0 ? (
            <div className="py-8 px-4 text-center text-white/40 text-sm">
              No budgets created yet. Tap the <span className="text-white/60 font-medium">+</span> button to create one.
            </div>
          ) : (
            budgets.map((budget) => (
              <BudgetProgress
                key={budget.id}
                title={budget.title}
                spent={budget.spent}
                total={budget.total}
                currency={currency}
                icon={budget.icon}
              />
            ))
          )}
        </div>
      </section>

      <IosSheet isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="New Budget">
        <form onSubmit={handleAddBudget} className="space-y-6">
          <div className="bg-[#1C1C1E] border border-white/5 rounded-[24px] overflow-hidden">
            <div className="flex flex-col gap-2 p-5">
              <label className="text-[13px] text-white/50">Category Name</label>
              <input 
                type="text" 
                placeholder="e.g. Entertainment"
                value={newBudgetTitle}
                onChange={(e) => setNewBudgetTitle(e.target.value)}
                className="bg-transparent text-white text-[17px] outline-none"
                autoFocus
                required
              />
            </div>
            <div className="h-[1px] w-full bg-white/5" />
            <div className="flex flex-col gap-2 p-5">
              <label className="text-[13px] text-white/50">Limit Amount</label>
              <input 
                type="number" 
                placeholder="0"
                value={newBudgetAmount}
                onChange={(e) => setNewBudgetAmount(e.target.value)}
                className="bg-transparent text-white text-[17px] outline-none"
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full py-4 bg-emerald-500 text-white font-semibold rounded-[16px] hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
            Create Budget
          </button>
        </form>
      </IosSheet>

    </div>
  );
}
