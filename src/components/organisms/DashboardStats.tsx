export const DashboardStats = () => {
  return (
    <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl p-6 rounded-[24px] border border-white/10 shadow-2xl relative overflow-hidden">
      <h3 className="text-white/60 text-sm font-medium mb-2 relative z-10">Total Balance</h3>
      <div className="text-[34px] font-bold text-white tracking-tight mb-8 relative z-10">
        Rp 15.500.000
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div className="bg-black/20 p-4 rounded-[16px] backdrop-blur-md">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </div>
            <span className="text-white/60 text-xs font-medium">Income</span>
          </div>
          <p className="text-white font-semibold">Rp 20.000.000</p>
        </div>

        <div className="bg-black/20 p-4 rounded-[16px] backdrop-blur-md">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
            <span className="text-white/60 text-xs font-medium">Expenses</span>
          </div>
          <p className="text-white font-semibold">Rp 4.500.000</p>
        </div>
      </div>
    </div>
  );
};
