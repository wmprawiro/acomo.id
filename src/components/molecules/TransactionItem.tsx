"use client";

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { useMasking } from '@/contexts';

export interface TransactionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  categoryName: string;
  date: string;
  amount: string;
  type: 'income' | 'expense';
  icon?: React.ReactNode;
}

export const TransactionItem = forwardRef<HTMLDivElement, TransactionItemProps>(
  ({ className, title, categoryName, date, amount, type, icon, ...props }, ref) => {
    const { isVisible } = useMasking();
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between px-5 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 shrink-0 border border-white/5">
            {icon || <span className="w-5 h-5 block bg-white/20 rounded-full" />}
          </div>
          <div>
            <p className="text-[17px] text-white tracking-tight">{title}</p>
            <p className="text-[13px] text-white/50 mt-0.5">
              {categoryName} • {date}
            </p>
          </div>
        </div>
        <div
          className={cn(
            'text-[17px] font-semibold shrink-0 ml-4',
            type === 'income' ? 'text-emerald-400' : 'text-white'
          )}
        >
          {isVisible ? (
            <>
              {type === 'income' ? '+' : '-'}
              {amount}
            </>
          ) : (
            'Rp *********'
          )}
        </div>
      </div>
    );
  }
);
TransactionItem.displayName = 'TransactionItem';
