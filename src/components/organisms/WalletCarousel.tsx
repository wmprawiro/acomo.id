'use client';

import { useState } from 'react';
import { useMasking, usePreferences, useFinance } from '@/contexts';
import { formatCurrency, cn, maskCurrency } from '@/lib/utils';
import { IosSheet } from '@/components/molecules';
import { Input } from '@/components/atoms';
import type { Wallet } from '@/types/wallet';

export const WalletCarousel = () => {
  const { isVisible } = useMasking();
  const { currency } = usePreferences();
  const { wallets, addWallet, updateWallet } = useFinance();
  
  const [sheetMode, setSheetMode] = useState<'add' | 'edit' | null>(null);
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ name: string; type: 'bank' | 'e-wallet' | 'cash'; balance: string; color: string }>({
    name: '', type: 'e-wallet', balance: '', color: 'from-purple-500/80 to-purple-800/80'
  });
  
  const hiddenText = maskCurrency(currency);

  const openAddSheet = () => {
    setFormData({ name: '', type: 'e-wallet', balance: '', color: 'from-purple-500/80 to-purple-800/80' });
    setSheetMode('add');
  };

  const openEditSheet = (wallet: Wallet) => {
    setSelectedWalletId(wallet.id);
    setFormData({ name: wallet.name, type: wallet.type, balance: wallet.balance.toString(), color: wallet.color });
    setSheetMode('edit');
  };

  const handleSaveWallet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    if (sheetMode === 'add') {
      addWallet({
        name: formData.name,
        type: formData.type,
        balance: Number(formData.balance) || 0,
        color: formData.color
      });
    } else if (sheetMode === 'edit' && selectedWalletId) {
      updateWallet(selectedWalletId, {
        name: formData.name,
        type: formData.type,
        balance: Number(formData.balance) || 0,
        color: formData.color
      });
    }
    
    setSheetMode(null);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-[15px] font-semibold text-white/80 tracking-tight">My Wallets</h3>
      </div>
      
      {/* Horizontal scroll container */}
      <div className="flex overflow-x-auto gap-4 pb-1 no-scrollbar -mx-5 px-5 snap-x snap-mandatory">
        {wallets.map((wallet) => (
          <div 
            key={wallet.id}
            onClick={() => openEditSheet(wallet)}
            className="shrink-0 w-[160px] p-4 rounded-[20px] border border-white/10 bg-[#1C1C1E] snap-center cursor-pointer hover:bg-white/5 transition-colors flex flex-col justify-center"
          >
            <p className="text-white/80 text-[13px] font-medium mb-1 truncate">{wallet.name}</p>
            <p className="text-white font-bold text-[17px] tracking-tight truncate">
              {isVisible ? formatCurrency(wallet.balance, currency) : hiddenText}
            </p>
          </div>
        ))}

        {/* Add New Wallet Card */}
        <div 
          onClick={openAddSheet}
          className="shrink-0 w-[160px] p-4 rounded-[20px] border border-dashed border-white/20 bg-white/5 hover:bg-white/10 transition-colors flex flex-col items-center justify-center cursor-pointer snap-center group"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 group-hover:text-white transition-colors mb-2">
            <span className="text-2xl font-light leading-none mb-0.5">+</span>
          </div>
          <span className="text-[13px] text-white/50 font-medium group-hover:text-white transition-colors">Add Wallet</span>
        </div>
      </div>

      <IosSheet isOpen={sheetMode !== null} onClose={() => setSheetMode(null)} title={sheetMode === 'add' ? "New Wallet" : "Edit Wallet"}>
        <form onSubmit={handleSaveWallet} className="flex flex-col space-y-4">
          <Input 
            placeholder="Wallet Name (e.g. BCA, Gopay)" 
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input 
            type="number"
            placeholder="Balance (Amount)" 
            value={formData.balance}
            onChange={e => setFormData({ ...formData, balance: e.target.value })}
          />
          <button 
            type="submit" 
            className="w-full py-4 mt-2 bg-emerald-500 text-white rounded-[16px] font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
          >
            {sheetMode === 'add' ? "Save Wallet" : "Update Wallet"}
          </button>
        </form>
      </IosSheet>
    </div>
  );
};

