'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { Wallet } from '@/types/wallet';

// --- Domain Types ---
// (We should eventually move these to src/types, but for now they live here for simplicity)

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  limit?: number;
  color: string;
  icon: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  categoryId: string;
  walletId: string;
  date: string;
  notes?: string;
}

// --- Context Definition ---

interface FinanceContextValue {
  wallets: Wallet[];
  categories: Category[];
  transactions: Transaction[];
  
  // Computed
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;

  // Actions
  addWallet: (wallet: Omit<Wallet, 'id'>) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const FinanceContext = createContext<FinanceContextValue | undefined>(undefined);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Compute Total Balance (sum of all wallets)
  // Wait, if a transaction is added, it should reflect in the wallet balance!
  // In a real app, transactions modify the wallet balance. 
  // Let's compute actual wallet balances dynamically:
  const computedWallets = useMemo(() => {
    return wallets.map(wallet => {
      // Calculate net flow for this wallet
      const walletTxs = transactions.filter(t => t.walletId === wallet.id);
      const net = walletTxs.reduce((acc, tx) => {
        return tx.type === 'income' ? acc + tx.amount : acc - tx.amount;
      }, 0);
      
      return {
        ...wallet,
        balance: wallet.balance + net // Assuming initial balance is starting balance
      };
    });
  }, [wallets, transactions]);

  const totalBalance = useMemo(() => {
    return computedWallets.reduce((acc, w) => acc + w.balance, 0);
  }, [computedWallets]);

  const totalIncome = useMemo(() => {
    return transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  // Actions
  const addWallet = (wallet: Omit<Wallet, 'id'>) => {
    setWallets(prev => [...prev, { ...wallet, id: `w_${Date.now()}` }]);
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    setCategories(prev => [...prev, { ...category, id: `cat_${Date.now()}` }]);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    setTransactions(prev => [
      { ...transaction, id: `tx_${Date.now()}`, date: new Date().toISOString() },
      ...prev
    ]);
  };

  return (
    <FinanceContext.Provider 
      value={{ 
        wallets: computedWallets, 
        categories, 
        transactions,
        totalBalance,
        totalIncome,
        totalExpense,
        addWallet,
        addCategory,
        addTransaction
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
