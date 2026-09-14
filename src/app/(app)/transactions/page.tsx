'use client';

import { MagnifyingGlass } from '@phosphor-icons/react';
import { TransactionList } from '@/components/organisms';

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Search Bar / Filter Placeholder (Apple Style) */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
          <MagnifyingGlass size={20} weight="bold" />
        </div>
        <input 
          type="text" 
          placeholder="Search transactions..." 
          className="w-full bg-white/10 border-none rounded-[12px] py-2.5 pl-10 pr-4 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500/50 outline-none"
        />
      </div>

      {/* Riwayat */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xl font-bold text-foreground tracking-tight">History</h2>
        </div>
        <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[24px] border border-white/10 text-card-foreground shadow-2xl overflow-hidden">
          <TransactionList />
        </div>
      </div>
    </div>
  );
}
