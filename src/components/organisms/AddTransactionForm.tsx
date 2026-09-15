'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms';
import { usePreferences, useFinance } from '@/contexts';
import { CaretRight } from '@phosphor-icons/react';

interface AddTransactionFormProps {
  onSuccess?: () => void;
}

export const AddTransactionForm = ({ onSuccess }: AddTransactionFormProps) => {
  const { currency } = usePreferences();
  const { wallets, categories, addTransaction } = useFinance();
  
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'expense' | 'income'>('expense');
  
  // Set default values if available
  const [walletId, setWalletId] = useState(wallets[0]?.id || '');
  
  // Filter categories by type
  const availableCategories = categories.filter(c => c.type === type);
  const [categoryId, setCategoryId] = useState(availableCategories[0]?.id || '');

  // Ensure category matches type when type changes
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as 'expense' | 'income';
    setType(newType);
    const filteredCats = categories.filter(c => c.type === newType);
    if (filteredCats.length > 0) {
      setCategoryId(filteredCats[0].id);
    } else {
      setCategoryId('');
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    if (rawValue.length > 15) return;
    if (!rawValue) {
      setAmount('');
      return;
    }
    const formatted = parseInt(rawValue, 10).toLocaleString('id-ID');
    setAmount(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Convert formatted amount back to number
    const numericAmount = parseInt(amount.replace(/\D/g, ''), 10) || 0;
    
    if (numericAmount > 0 && walletId && categoryId) {
      addTransaction({
        title: title.trim() || 'Untitled',
        amount: numericAmount,
        type,
        walletId,
        categoryId,
        date: new Date(date).toISOString(),
      });
      
      // Reset form
      setAmount('');
      setTitle('');
      if (onSuccess) onSuccess();
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      
      {/* iOS Style Grouped Input List */}
      <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[24px] overflow-hidden border border-white/10 shadow-2xl">
        
        {/* Amount */}
        <div className="flex items-center justify-between p-5 border-b border-white/5 focus-within:bg-white/5 transition-colors">
          <span className="text-[17px] text-white tracking-tight shrink-0">Amount ({currency})</span>
          <input 
            type="text"
            inputMode="numeric"
            placeholder="0" 
            required 
            value={amount}
            onChange={handleAmountChange}
            className="bg-transparent text-right text-[17px] text-white outline-none w-full ml-4 placeholder:text-white/30 truncate"
          />
        </div>

        {/* Date */}
        <div className="flex items-center justify-between p-5 border-b border-white/5 focus-within:bg-white/5 transition-colors">
          <span className="text-[17px] text-white tracking-tight shrink-0">Date</span>
          <input 
            type="date" 
            required 
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-right text-[17px] text-white outline-none w-full ml-4 placeholder:text-white/30"
          />
        </div>

        {/* Type */}
        <div className="flex items-center justify-between p-5 border-b border-white/5 focus-within:bg-white/5 transition-colors relative">
          <span className="text-[17px] text-white tracking-tight shrink-0">Type</span>
          <select value={type} onChange={handleTypeChange} className="bg-transparent text-right text-[17px] text-white/70 outline-none w-full ml-4 appearance-none cursor-pointer pr-4 relative z-10" dir="rtl">
            <option value="expense" className="bg-[#1C1C1E] text-white text-left">Expense</option>
            <option value="income" className="bg-[#1C1C1E] text-white text-left">Income</option>
          </select>
          <CaretRight size={16} weight="bold" className="text-white/30 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Wallet */}
        <div className="flex items-center justify-between p-5 border-b border-white/5 focus-within:bg-white/5 transition-colors relative">
          <span className="text-[17px] text-white tracking-tight shrink-0">Wallet</span>
          <select value={walletId} onChange={(e) => setWalletId(e.target.value)} required className="bg-transparent text-right text-[17px] text-white/70 outline-none w-full ml-4 appearance-none cursor-pointer pr-4 relative z-10" dir="rtl">
            <option value="" disabled className="bg-[#1C1C1E] text-white/30 text-left">Select Wallet</option>
            {wallets.map(w => (
              <option key={w.id} value={w.id} className="bg-[#1C1C1E] text-white text-left">{w.name}</option>
            ))}
          </select>
          <CaretRight size={16} weight="bold" className="text-white/30 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Category */}
        <div className="flex items-center justify-between p-5 focus-within:bg-white/5 transition-colors relative">
          <span className="text-[17px] text-white tracking-tight shrink-0">Category</span>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="bg-transparent text-right text-[17px] text-white/70 outline-none w-full ml-4 appearance-none cursor-pointer pr-4 relative z-10" dir="rtl">
            <option value="" disabled className="bg-[#1C1C1E] text-white/30 text-left">Select Category</option>
            {availableCategories.map(c => (
              <option key={c.id} value={c.id} className="bg-[#1C1C1E] text-white text-left">{c.name}</option>
            ))}
          </select>
          <CaretRight size={16} weight="bold" className="text-white/30 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

      </div>

      <Button type="submit" className="w-full mt-4 bg-white text-black hover:bg-gray-200 py-6 text-[17px] rounded-[16px] shadow-xl" disabled={isLoading || !walletId || !categoryId || !amount || parseInt(amount.replace(/\D/g, ''), 10) === 0}>
        {isLoading ? 'Saving...' : 'Save Transaction'}
      </Button>
    </form>
  );
};
