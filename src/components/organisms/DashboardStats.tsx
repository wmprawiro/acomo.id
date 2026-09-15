"use client";

import { useMasking, usePreferences, useFinance } from "@/contexts";
import { formatCurrency, maskCurrency } from "@/lib/utils";
import { Eye, EyeClosed, ArrowUp, ArrowDown } from "@phosphor-icons/react";

export const DashboardStats = () => {
  const { isVisible, setIsVisible } = useMasking();
  const { currency } = usePreferences();
  const { totalBalance, totalIncome, totalExpense } = useFinance();

  return (
    <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl p-6 rounded-[24px] border border-white/10 shadow-2xl relative overflow-hidden">
      <h3 className="text-white/60 text-sm font-medium mb-2 relative z-10">Total Balance</h3>
      <div className="flex items-start justify-between gap-3 mb-4 relative z-10 w-full">
        <div className="text-[34px] font-bold text-white tracking-tight break-words flex-1 leading-none">
          {isVisible ? formatCurrency(totalBalance, currency) : maskCurrency(currency)}
        </div>
        <button onClick={() => setIsVisible(!isVisible)} className="text-white/60 hover:text-white transition-colors shrink-0 mt-1">
          {isVisible ? (
            <EyeClosed size={24} weight="regular" />
          ) : (
            <Eye size={24} weight="regular" />
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div className="bg-black/20 p-4 rounded-[16px] backdrop-blur-md min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ArrowUp size={14} weight="bold" />
            </div>
            <span className="text-white/60 text-xs font-medium truncate">Income</span>
          </div>
          <p className="text-white font-semibold break-words">{isVisible ? formatCurrency(totalIncome, currency) : maskCurrency(currency)}</p>
        </div>

        <div className="bg-black/20 p-4 rounded-[16px] backdrop-blur-md min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
              <ArrowDown size={14} weight="bold" />
            </div>
            <span className="text-white/60 text-xs font-medium truncate">Expenses</span>
          </div>
          <p className="text-white font-semibold break-words">{isVisible ? formatCurrency(totalExpense, currency) : maskCurrency(currency)}</p>
        </div>
      </div>
    </div>
  );
};
