'use client';

import { formatCurrency, cn } from '@/lib/utils';
import type { CurrencyCode } from '@/lib/utils';
import { WarningCircle } from '@phosphor-icons/react';

export interface BudgetProgressProps {
  title: string;
  spent: number;
  total: number;
  currency: CurrencyCode;
  icon?: React.ReactNode;
}

export const BudgetProgress = ({ title, spent, total, currency, icon }: BudgetProgressProps) => {
  const percentage = total > 0 ? Math.min((spent / total) * 100, 100) : 0;
  const isWarning = percentage >= 85;
  const isDanger = percentage >= 100;
  
  let progressColor = 'bg-emerald-500';
  if (isDanger) progressColor = 'bg-rose-500';
  else if (isWarning) progressColor = 'bg-amber-500';

  return (
    <div className="bg-white/5 border border-white/5 p-5 rounded-[20px] mb-4 hover:bg-white/10 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-[16px] font-semibold text-white tracking-tight">{title}</h3>
            <p className="text-[13px] text-white/50 mt-0.5">
              {formatCurrency(spent, currency)} / {formatCurrency(total, currency)}
            </p>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <span className={cn(
            "text-[15px] font-bold",
            isDanger ? "text-rose-400" : isWarning ? "text-amber-400" : "text-emerald-400"
          )}>
            {percentage.toFixed(0)}%
          </span>
        </div>
      </div>
      
      {/* Progress Bar Track */}
      <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden shadow-inner">
        <div 
          className={cn("h-full rounded-full transition-all duration-1000 ease-out", progressColor)}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {isDanger && (
        <div className="flex items-center gap-1.5 mt-3 text-rose-400">
          <WarningCircle size={14} weight="fill" />
          <span className="text-[12px] font-medium">Over budget!</span>
        </div>
      )}
      {!isDanger && percentage < 100 && percentage >= 85 && (
        <div className="flex items-center gap-1.5 mt-3 text-amber-400">
          <WarningCircle size={14} weight="fill" />
          <span className="text-[12px] font-medium">Almost reached limit.</span>
        </div>
      )}
    </div>
  );
};
