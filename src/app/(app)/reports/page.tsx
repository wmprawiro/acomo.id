import { ExpenseChart, CategoryPieChart } from '@/components/organisms';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* iOS Segmented Control Mock */}
      <div className="bg-[#1C1C1E] p-1 rounded-lg flex w-full max-w-xs mx-auto border border-white/5">
        <button className="flex-1 py-1.5 bg-[#2C2C2E] rounded-md text-sm font-semibold text-white shadow-sm">
          Weekly
        </button>
        <button className="flex-1 py-1.5 text-sm font-medium text-white/50 hover:text-white transition-colors">
          Monthly
        </button>
        <button className="flex-1 py-1.5 text-sm font-medium text-white/50 hover:text-white transition-colors">
          Yearly
        </button>
      </div>

      <section>
        <div className="flex items-center justify-between mb-2 px-1">
          <h2 className="text-xl font-bold text-foreground tracking-tight">Trends</h2>
        </div>
        <ExpenseChart />
      </section>

      <section>
        <div className="flex items-center justify-between mb-2 px-1 mt-8">
          <h2 className="text-xl font-bold text-foreground tracking-tight">Categories</h2>
        </div>
        <CategoryPieChart />
      </section>
    </div>
  );
}
