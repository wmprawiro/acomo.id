"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  DashboardStats,
  TransactionList,
  WalletCarousel,
} from "@/components/organisms";

// Disable SSR for chart components — they use Recharts which accesses browser APIs
const ExpenseChart = dynamic(
  () =>
    import("@/components/organisms/ExpenseChart").then((mod) => ({
      default: mod.ExpenseChart,
    })),
  { ssr: false },
);

const CategoryPieChart = dynamic(
  () =>
    import("@/components/organisms/CategoryPieChart").then((mod) => ({
      default: mod.CategoryPieChart,
    })),
  { ssr: false },
);

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Balance Overview */}
      <section>
        <DashboardStats />
      </section>

      {/* Wallets */}
      <section>
        <WalletCarousel />
      </section>

      {/* Weekly Expense Bar Chart */}
      <section>
        <ExpenseChart />
      </section>

      {/* Spending by Category Donut Chart */}
      <section>
        <CategoryPieChart />
      </section>

      {/* Recent Transactions */}
      <section>
        <div className="flex items-center mb-4 px-1">
          <Link
            href="/transactions"
            className="flex items-center gap-0.5 hover:opacity-80 transition-opacity"
          >
            <h3 className="text-[15px] font-semibold text-white/80 tracking-tight">
              Recent
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
              className="text-white/30"
            >
              <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
            </svg>
          </Link>
        </div>
        <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[20px] border border-white/10 text-card-foreground shadow-2xl overflow-hidden">
          <TransactionList limit={5} />
        </div>
      </section>
    </div>
  );
}
