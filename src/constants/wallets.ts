import type { Wallet } from '@/types/wallet';

export const MOCK_WALLETS: Wallet[] = [
  { id: 'w1', name: 'BCA Utama', type: 'bank', balance: 12500000, color: 'from-blue-600/80 to-blue-900/80' },
  { id: 'w2', name: 'GoPay', type: 'e-wallet', balance: 2500000, color: 'from-sky-500/80 to-blue-600/80' },
  { id: 'w3', name: 'Cash', type: 'cash', balance: 500000, color: 'from-emerald-600/80 to-emerald-900/80' },
];
