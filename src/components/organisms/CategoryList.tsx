import { cn } from '@/lib/utils';

const MOCK_CATEGORIES = [
  { id: '1', label: 'Food & Dining', spent: 2000000, limit: 3000000, color: 'bg-rose-500' },
  { id: '2', label: 'Transportation', spent: 1200000, limit: 1500000, color: 'bg-amber-500' },
  { id: '3', label: 'Entertainment', spent: 800000, limit: 1000000, color: 'bg-sky-500' },
  { id: '4', label: 'Utilities', spent: 500000, limit: 500000, color: 'bg-emerald-500' },
];

export const CategoryList = () => {
  return (
    <div className="space-y-4">
      {MOCK_CATEGORIES.map((cat) => {
        const percentage = Math.min((cat.spent / cat.limit) * 100, 100);
        const isNearLimit = percentage > 85;

        return (
          <div key={cat.id} className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl p-5 rounded-[24px] border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className={cn("w-3 h-3 rounded-full", cat.color)} />
                <span className="text-[17px] font-semibold text-white tracking-tight">{cat.label}</span>
              </div>
              <span className="text-[17px] text-white/50">
                {percentage.toFixed(0)}%
              </span>
            </div>
            
            <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden mb-3">
              <div 
                className={cn("h-full rounded-full transition-all duration-500", isNearLimit ? 'bg-rose-500' : cat.color)} 
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex justify-between text-[13px] font-medium">
              <span className="text-white">Rp {cat.spent.toLocaleString('id-ID')}</span>
              <span className="text-white/50">of Rp {cat.limit.toLocaleString('id-ID')}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
