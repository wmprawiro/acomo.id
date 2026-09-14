'use client';

import { useState } from 'react';
import { useMasking, usePreferences, useFinance } from '@/contexts';
import { formatCurrency, cn } from '@/lib/utils';
import { IosSheet } from '@/components/molecules';
import { Bank, Wallet as WalletIcon, Money } from '@phosphor-icons/react';

const getIconForType = (type: string) => {
  switch (type) {
    case 'bank': return <Bank size={24} weight="duotone" />;
    case 'e-wallet': return <WalletIcon size={24} weight="duotone" />;
    case 'cash': return <Money size={24} weight="duotone" />;
    default: return <WalletIcon size={24} weight="duotone" />;
  }
};

export const WalletCarousel = () => {
  const { isVisible } = useMasking();
  const { currency } = usePreferences();
  const { wallets, addWallet } = useFinance();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newWalletName, setNewWalletName] = useState('');
  
  const hiddenText = currency === 'IDR' ? 'Rp *********' : (currency === 'USD' ? '$ ***' : '€ ***');

  const handleAddWallet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWalletName.trim()) return;
    
    addWallet({
      name: newWalletName,
      type: 'e-wallet',
      balance: 0,
      color: 'from-purple-500/80 to-purple-800/80'
    });
    
    setNewWalletName('');
    setIsAddOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-[15px] font-semibold text-white/80 tracking-tight">My Wallets</h3>
      </div>
      
      {/* Horizontal scroll container */}
      <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-5 px-5 snap-x snap-mandatory">
        {wallets.map((wallet) => (
          <div 
            key={wallet.id}
            className={cn(
              "shrink-0 w-[160px] p-4 rounded-[20px] shadow-xl border border-white/10 relative overflow-hidden backdrop-blur-2xl bg-gradient-to-br snap-center",
              wallet.color
            )}
          >
            <div className="flex flex-col h-full relative z-10">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white mb-6 backdrop-blur-md border border-white/20">
                {getIconForType(wallet.type)}
              </div>
              <div className="mt-auto">
                <p className="text-white/80 text-[13px] font-medium mb-1 truncate">{wallet.name}</p>
                <p className="text-white font-bold text-[17px] tracking-tight truncate">
                  {isVisible ? formatCurrency(wallet.balance, currency) : hiddenText}
                </p>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-black/10 blur-xl pointer-events-none" />
          </div>
        ))}

        {/* Add New Wallet Card */}
        <div 
          onClick={() => setIsAddOpen(true)}
          className="shrink-0 w-[160px] p-4 rounded-[20px] border border-dashed border-white/20 bg-white/5 hover:bg-white/10 transition-colors flex flex-col items-center justify-center cursor-pointer snap-center group"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 group-hover:text-white transition-colors mb-2">
            <span className="text-2xl font-light leading-none mb-0.5">+</span>
          </div>
          <span className="text-[13px] text-white/50 font-medium group-hover:text-white transition-colors">Add Wallet</span>
        </div>
      </div>

      <IosSheet isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="New Wallet">
        <form onSubmit={handleAddWallet} className="space-y-6">
          <div className="bg-[#1C1C1E] border border-white/10 rounded-2xl p-4 flex flex-col gap-2">
            <label className="text-[13px] text-white/50">Wallet Name</label>
            <input 
              type="text" 
              placeholder="e.g. OVO, PayPal"
              value={newWalletName}
              onChange={(e) => setNewWalletName(e.target.value)}
              className="bg-transparent text-white text-[17px] outline-none"
              autoFocus
              required
            />
          </div>
          <button type="submit" className="w-full bg-white text-black font-semibold rounded-2xl py-4 hover:bg-gray-200 transition-colors">
            Create Wallet
          </button>
        </form>
      </IosSheet>
    </div>
  );
};
