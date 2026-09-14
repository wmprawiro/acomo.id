'use client';

import { TransactionItem } from '@/components/molecules';
import { useFinance } from '@/contexts';

export const TransactionList = () => {
  const { transactions, categories } = useFinance();

  return (
    <div className="flex flex-col">
      {transactions.length === 0 ? (
        <div className="py-8 text-center text-white/40 text-sm">No transactions yet.</div>
      ) : (
        transactions.map((trx) => {
          const category = categories.find(c => c.id === trx.categoryId);
          const dateObj = new Date(trx.date);
          const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

          return (
            <TransactionItem
              key={trx.id}
              title={trx.title}
              categoryName={category?.name || 'Unknown'}
              date={formattedDate}
              amount={trx.amount}
              type={trx.type}
            />
          );
        })
      )}
    </div>
  );
};
