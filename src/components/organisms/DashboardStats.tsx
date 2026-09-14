"use client";

import { useMasking } from "@/contexts";

export const DashboardStats = () => {
  const { isVisible, setIsVisible } = useMasking();

  return (
    <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl p-6 rounded-[24px] border border-white/10 shadow-2xl relative overflow-hidden">
      <h3 className="text-white/60 text-sm font-medium mb-2 relative z-10">Total Balance</h3>
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className="text-[34px] font-bold text-white tracking-tight">
          {isVisible ? "Rp 15.500.000" : "Rp *********"}
        </div>
        <button onClick={() => setIsVisible(!isVisible)} className="text-white/60 hover:text-white transition-colors">
          {isVisible ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
              <line x1="2" y1="2" x2="22" y2="22"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
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
          <p className="text-white font-semibold">{isVisible ? "Rp 20.000.000" : "Rp *********"}</p>
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
          <p className="text-white font-semibold">{isVisible ? "Rp 4.500.000" : "Rp *********"}</p>
        </div>
      </div>
    </div>
  );
};
