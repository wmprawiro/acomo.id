"use client";

import { TransactionItem } from "@/components/molecules";
import { useFinance, useMasking, usePreferences } from "@/contexts";
import type { Transaction } from "@/contexts";
import React, { useMemo } from "react";

interface TransactionListProps {
  limit?: number;
  transactions?: Transaction[];
}

export const TransactionList = ({
  limit,
  transactions: customTransactions,
}: TransactionListProps = {}) => {
  const { transactions: allTransactions, categories } = useFinance();
  const { isVisible } = useMasking();
  const { currency } = usePreferences();

  const sourceTransactions = customTransactions ?? allTransactions;
  const displayTransactions = limit
    ? sourceTransactions.slice(0, limit)
    : sourceTransactions;

  const groupedTransactions = useMemo(() => {
    return displayTransactions.reduce(
      (acc, trx) => {
        const dateObj = new Date(trx.date);
        const dateHeader = dateObj.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        if (!acc[dateHeader]) {
          acc[dateHeader] = [];
        }
        acc[dateHeader].push(trx);
        return acc;
      },
      {} as Record<string, Transaction[]>,
    );
  }, [displayTransactions]);

  return (
    <div className="flex flex-col">
      {displayTransactions.length === 0 ? (
        <div className="py-8 text-center text-white/40 text-sm">
          No transactions yet.
        </div>
      ) : (
        Object.entries(groupedTransactions).map(([dateHeader, group]) => (
          <React.Fragment key={dateHeader}>
            <div className="bg-white/5 px-5 py-2 border-b border-white/5 backdrop-blur-md sticky top-0 z-10 flex items-center">
              <span className="text-[12px] font-semibold text-white/60 tracking-wider uppercase">
                {dateHeader}
              </span>
            </div>
            {group.map((trx) => {
              const category = categories.find((c) => c.id === trx.categoryId);
              return (
                <TransactionItem
                  key={trx.id}
                  title={trx.title}
                  categoryName={category?.name || "Unknown"}
                  date=""
                  amount={trx.amount}
                  type={trx.type}
                  currency={currency}
                  isVisible={isVisible}
                />
              );
            })}
          </React.Fragment>
        ))
      )}
    </div>
  );
};
