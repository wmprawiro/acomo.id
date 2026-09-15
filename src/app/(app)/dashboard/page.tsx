import { DashboardStats, TransactionList, ExpenseChart, CategoryPieChart, WalletCarousel } from '@/components/organisms';
import Link from 'next/link';

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
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-[15px] font-semibold text-white/80 tracking-tight">Recent</h3>
          <Link href="/transactions" className="text-emerald-400 text-[13px] font-medium hover:text-emerald-300">See All</Link>
        </div>
        <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[24px] border border-white/10 text-card-foreground shadow-2xl overflow-hidden">
          <TransactionList limit={5} />
        </div>
      </section>
    </div>
  );
}
