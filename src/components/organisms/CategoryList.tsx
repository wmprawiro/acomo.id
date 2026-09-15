"use client";

import { cn, formatCurrency } from "@/lib/utils";
import { useFinance, usePreferences } from "@/contexts";
import { useMemo } from "react";

export const CategoryList = () => {
  const { categories, transactions } = useFinance();
  const { currency } = usePreferences();

  const categoryStats = useMemo(() => {
    return categories
      .filter((c) => c.type === "expense")
      .map((c) => {
        const spent = transactions
          .filter((t) => t.categoryId === c.id)
          .reduce((acc, t) => acc + t.amount, 0);
        return {
          ...c,
          spent,
        };
      })
      .sort((a, b) => b.spent - a.spent); // sort by highest spent
  }, [categories, transactions]);

  return (
    <div className="space-y-4">
      {categoryStats.length === 0 && (
        <p className="text-white/50 text-center py-4 text-sm">
          No categories found.
        </p>
      )}
      {categoryStats.map((cat) => {
        const percentage =
          cat.limit && cat.limit > 0
            ? Math.min((cat.spent / cat.limit) * 100, 100)
            : 0;
        const isNearLimit = percentage > 85;

        return (
          <div
            key={cat.id}
            className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl p-5 rounded-[20px] border border-white/10 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className={cn("w-3 h-3 rounded-full", cat.color)} />
                <span className="text-[17px] font-semibold text-white tracking-tight">
                  {cat.name}
                </span>
              </div>
              <span className="text-[17px] text-white/50">
                {cat.limit ? `${percentage.toFixed(0)}%` : "No Limit"}
              </span>
            </div>

            {cat.limit && cat.limit > 0 && (
              <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden mb-3">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    isNearLimit ? "bg-rose-500" : cat.color,
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            )}

            <div className="flex justify-between text-[13px] font-medium">
              <span className="text-white">
                {formatCurrency(cat.spent, currency)}
              </span>
              {cat.limit && cat.limit > 0 && (
                <span className="text-white/50">
                  of {formatCurrency(cat.limit, currency)}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
