"use client";

import { cn, formatCurrency, maskCurrency } from "@/lib/utils";
import type { CurrencyCode } from "@/lib/utils";
import { forwardRef } from "react";
import { ArrowUp, ArrowDown } from "@phosphor-icons/react";

export interface TransactionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  categoryName: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  currency: CurrencyCode;
  isVisible: boolean;
  icon?: React.ReactNode;
}

export const TransactionItem = forwardRef<HTMLDivElement, TransactionItemProps>(
  (
    {
      className,
      title,
      categoryName,
      date,
      amount,
      type,
      currency,
      isVisible,
      icon,
      ...props
    },
    ref,
  ) => {
    const formattedAmount = formatCurrency(amount, currency);

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between px-5 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
              type === "income"
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-rose-500/20 text-rose-400",
            )}
          >
            {icon ||
              (type === "income" ? (
                <ArrowUp size={14} weight="bold" />
              ) : (
                <ArrowDown size={14} weight="bold" />
              ))}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] text-white tracking-tight font-medium truncate">
              {title}
            </p>
            <p className="text-[12px] text-white/50 mt-0.5 truncate">
              {categoryName}
              {date ? ` • ${date}` : ""}
            </p>
          </div>
        </div>
        <div
          className={cn(
            "text-[15px] font-semibold shrink-0 ml-4 text-right whitespace-nowrap",
            type === "income" ? "text-emerald-400" : "text-white",
          )}
        >
          {isVisible ? (
            <>
              {type === "income" ? "+" : "-"}
              {formattedAmount}
            </>
          ) : (
            maskCurrency(currency)
          )}
        </div>
      </div>
    );
  },
);
TransactionItem.displayName = "TransactionItem";
