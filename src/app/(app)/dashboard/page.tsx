import { DashboardStats, TransactionList, ExpenseChart } from '@/components/organisms';
import Link from 'next/link';
import { MaskingProvider } from '@/contexts';

export default function DashboardPage() {
  return (
    <MaskingProvider>
      <div className="space-y-8">
        {/* Overview Cards */}
        <section>
          <DashboardStats />
          <ExpenseChart />
        </section>

        {/* Recent Transactions */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-xl font-bold text-foreground tracking-tight">Recent</h2>
            <Link href="/transactions" className="text-emerald-400 text-sm font-medium hover:text-emerald-300">See All</Link>
          </div>
          <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[24px] border border-white/10 text-card-foreground shadow-2xl overflow-hidden">
            <TransactionList />
          </div>
        </section>
      </div>
    </MaskingProvider>
  );
}
