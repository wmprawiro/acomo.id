'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms';
import { FormField } from '@/components/molecules';

export const AddTransactionForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement Supabase Insert Transaction
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      
      {/* iOS Style Grouped Input List */}
      <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[24px] overflow-hidden border border-white/10 shadow-2xl">
        
        {/* Amount */}
        <div className="flex items-center justify-between p-5 border-b border-white/5 focus-within:bg-white/5 transition-colors">
          <span className="text-[17px] text-white tracking-tight shrink-0">Amount (Rp)</span>
          <input 
            type="number" 
            placeholder="0" 
            required 
            className="bg-transparent text-right text-[17px] text-white outline-none w-full ml-4 placeholder:text-white/30"
          />
        </div>

        {/* Date */}
        <div className="flex items-center justify-between p-5 border-b border-white/5 focus-within:bg-white/5 transition-colors">
          <span className="text-[17px] text-white tracking-tight shrink-0">Date</span>
          <input 
            type="date" 
            required 
            className="bg-transparent text-right text-[17px] text-white outline-none w-full ml-4 appearance-none"
          />
        </div>

        {/* Description */}
        <div className="flex items-center justify-between p-5 border-b border-white/5 focus-within:bg-white/5 transition-colors">
          <span className="text-[17px] text-white tracking-tight shrink-0">Description</span>
          <input 
            type="text" 
            placeholder="e.g., Grocery" 
            required 
            className="bg-transparent text-right text-[17px] text-white outline-none w-full ml-4 placeholder:text-white/30"
          />
        </div>

        {/* Type */}
        <div className="flex items-center justify-between p-5 border-b border-white/5 focus-within:bg-white/5 transition-colors relative">
          <span className="text-[17px] text-white tracking-tight shrink-0">Type</span>
          <select className="bg-transparent text-right text-[17px] text-white/70 outline-none w-full ml-4 appearance-none cursor-pointer pr-4 relative z-10" dir="rtl">
            <option value="expense" className="bg-[#1C1C1E] text-white text-left">Expense</option>
            <option value="income" className="bg-[#1C1C1E] text-white text-left">Income</option>
          </select>
          <svg className="w-4 h-4 text-white/30 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </div>

        {/* Category */}
        <div className="flex items-center justify-between p-5 focus-within:bg-white/5 transition-colors relative">
          <span className="text-[17px] text-white tracking-tight shrink-0">Category</span>
          <select className="bg-transparent text-right text-[17px] text-white/70 outline-none w-full ml-4 appearance-none cursor-pointer pr-4 relative z-10" dir="rtl">
            <option value="food" className="bg-[#1C1C1E] text-white text-left">Food & Dining</option>
            <option value="transport" className="bg-[#1C1C1E] text-white text-left">Transportation</option>
            <option value="salary" className="bg-[#1C1C1E] text-white text-left">Salary</option>
          </select>
          <svg className="w-4 h-4 text-white/30 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </div>

      </div>

      <Button type="submit" className="w-full mt-4 bg-white text-black hover:bg-gray-200 py-6 text-[17px] rounded-[16px] shadow-xl" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Transaction'}
      </Button>
    </form>
  );
};
