"use client";

import { useState, useMemo } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { TransactionList } from "@/components/organisms";
import { IosSheet } from "@/components/molecules";
import { useFinance } from "@/contexts";
import { cn } from "@/lib/utils";

type TypeFilter = "all" | "income" | "expense";
type DateFilter = "all" | "day" | "week" | "month" | "year";

export default function TransactionsPage() {
  const { transactions } = useFinance();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((trx) => {
      // 1. Search Filter
      const matchesSearch = trx.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // 2. Type Filter
      if (typeFilter !== "all" && trx.type !== typeFilter) return false;

      // 3. Date Filter
      if (dateFilter !== "all") {
        const txDate = new Date(trx.date);
        const today = new Date();

        if (dateFilter === "day") {
          if (txDate.toDateString() !== today.toDateString()) return false;
        } else if (dateFilter === "week") {
          // simple week logic: within last 7 days
          const diffTime = Math.abs(today.getTime() - txDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays > 7) return false;
        } else if (dateFilter === "month") {
          if (
            txDate.getMonth() !== today.getMonth() ||
            txDate.getFullYear() !== today.getFullYear()
          )
            return false;
        } else if (dateFilter === "year") {
          if (txDate.getFullYear() !== today.getFullYear()) return false;
        }
      }

      return true;
    });
  }, [transactions, searchQuery, typeFilter, dateFilter]);

  return (
    <div className="space-y-6">
      {/* Top Bar: Search & Filter Button */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
            <MagnifyingGlass size={20} weight="bold" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transactions..."
            className="w-full bg-white/10 border-none rounded-[12px] py-2.5 pl-10 pr-4 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500/50 outline-none"
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="w-10 h-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M227.81,66.76l-.08.09L160,139.17v55.49A16,16,0,0,1,152.87,208l-32,21.34A16,16,0,0,1,96,216V139.17L28.27,66.85l-.08-.09A16,16,0,0,1,40,40H216a16,16,0,0,1,11.84,26.76Z"></path>
          </svg>
        </button>
      </div>

      {/* History */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-[15px] font-semibold text-white/80 tracking-tight">
            History
          </h3>
          <span className="text-white/40 text-[12px]">
            {filteredTransactions.length} results
          </span>
        </div>
        <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[20px] border border-white/10 text-card-foreground shadow-2xl overflow-hidden">
          <TransactionList transactions={filteredTransactions} />
        </div>
      </div>

      {/* Filter Sheet */}
      <IosSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="Filter Transactions"
      >
        <div className="space-y-6">
          {/* Type Filter */}
          <div>
            <h4 className="text-white/60 text-sm font-medium mb-3">
              Transaction Type
            </h4>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {(["all", "expense", "income"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={cn(
                    "px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors border",
                    typeFilter === type
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10",
                  )}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Date Filter */}
          <div>
            <h4 className="text-white/60 text-sm font-medium mb-3">
              Time Period
            </h4>
            <div className="flex bg-[#1C1C1E]/70 p-1 rounded-2xl border border-white/10">
              {(["all", "day", "week", "month", "year"] as const).map(
                (date) => (
                  <button
                    key={date}
                    onClick={() => setDateFilter(date)}
                    className={cn(
                      "flex-1 text-center py-2 text-[12px] font-medium transition-colors capitalize",
                      dateFilter === date
                        ? "text-white bg-white/10 rounded-xl shadow-sm"
                        : "text-white/50 hover:text-white",
                    )}
                  >
                    {date === "all" ? "All" : date}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => setIsFilterOpen(false)}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-[14px] transition-colors mt-2"
          >
            Show {filteredTransactions.length} Results
          </button>
        </div>
      </IosSheet>
    </div>
  );
}
