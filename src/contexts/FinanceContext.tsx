'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
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
  updateWallet: (id: string, updates: Partial<Wallet>) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'> & { date?: string }) => void;
}

const FinanceContext = createContext<FinanceContextValue | undefined>(undefined);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      const supabase = createClient();
      const [walletsRes, categoriesRes, transactionsRes] = await Promise.all([
        supabase.from('wallets').select('*').eq('user_id', userId),
        supabase.from('categories').select('*').eq('user_id', userId),
        supabase.from('transactions').select('*').eq('user_id', userId).order('date', { ascending: false })
      ]);

      if (walletsRes.data) {
        setWallets(walletsRes.data.map((w: any) => ({
          id: w.id,
          name: w.name,
          type: w.type,
          balance: w.balance,
          color: w.color
        })));
      }
      
      if (categoriesRes.data) {
        setCategories(categoriesRes.data.map((c: any) => ({
          id: c.id,
          name: c.name,
          type: c.type,
          limit: c.limit_amount,
          color: c.color,
          icon: c.icon
        })));
      }

      if (transactionsRes.data) {
        setTransactions(transactionsRes.data.map((t: any) => ({
          id: t.id,
          title: t.title,
          amount: t.amount,
          type: t.type,
          categoryId: t.category_id,
          walletId: t.wallet_id,
          date: t.date,
          notes: t.notes
        })));
      }
    };

    fetchData();
  }, [userId]);

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
  const addWallet = async (wallet: Omit<Wallet, 'id'>) => {
    if (!userId) return;
    const supabase = createClient();
    const { data, error } = await supabase
      .from('wallets')
      .insert({ ...wallet, user_id: userId })
      .select()
      .single();

    if (data && !error) {
      setWallets(prev => [...prev, {
        id: data.id,
        name: data.name,
        type: data.type,
        balance: data.balance,
        color: data.color
      }]);
    }
  };

  const updateWallet = async (id: string, updates: Partial<Wallet>) => {
    if (!userId) return;
    const supabase = createClient();
    
    let newInitialBalance: number | undefined = undefined;

    if (updates.balance !== undefined) {
      const wallet = wallets.find(w => w.id === id);
      if (wallet) {
        const walletTxs = transactions.filter(t => t.walletId === id);
        const net = walletTxs.reduce((acc, tx) => tx.type === 'income' ? acc + tx.amount : acc - tx.amount, 0);
        newInitialBalance = updates.balance - net;
      }
    }

    const dbUpdates = { ...updates };
    if (newInitialBalance !== undefined) {
      dbUpdates.balance = newInitialBalance;
    }

    const { error } = await supabase
      .from('wallets')
      .update(dbUpdates)
      .eq('id', id)
      .eq('user_id', userId);

    if (!error) {
      setWallets(prev => prev.map(w => {
        if (w.id === id) {
          return { ...w, ...updates, balance: newInitialBalance !== undefined ? newInitialBalance : w.balance };
        }
        return w;
      }));
    }
  };

  const addCategory = async (category: Omit<Category, 'id'>) => {
    if (!userId) return;
    const supabase = createClient();
    const dbCategory = {
      name: category.name,
      type: category.type,
      color: category.color,
      icon: category.icon,
      limit_amount: category.limit,
      user_id: userId
    };
    
    const { data, error } = await supabase
      .from('categories')
      .insert(dbCategory)
      .select()
      .single();

    if (data && !error) {
      setCategories(prev => [...prev, {
        id: data.id,
        name: data.name,
        type: data.type,
        limit: data.limit_amount,
        color: data.color,
        icon: data.icon
      }]);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'> & { date?: string }) => {
    if (!userId) return;
    const supabase = createClient();
    const date = transaction.date || new Date().toISOString();

    const dbTx = {
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category_id: transaction.categoryId,
      wallet_id: transaction.walletId,
      date,
      notes: transaction.notes,
      user_id: userId
    };

    const { data, error } = await supabase
      .from('transactions')
      .insert(dbTx)
      .select()
      .single();

    if (data && !error) {
      setTransactions(prev => [{
        id: data.id,
        title: data.title,
        amount: data.amount,
        type: data.type,
        categoryId: data.category_id,
        walletId: data.wallet_id,
        date: data.date,
        notes: data.notes
      }, ...prev]);
    }
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
        updateWallet,
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
