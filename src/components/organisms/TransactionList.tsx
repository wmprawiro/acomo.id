import { TransactionItem } from '@/components/molecules';

// Dummy data for now
const MOCK_TRANSACTIONS = [
  { id: '1', title: 'Gaji Bulanan', categoryName: 'Salary', date: '10 Sep 2026', amount: 'Rp 20.000.000', type: 'income' as const },
  { id: '2', title: 'Makan Siang', categoryName: 'Food & Dining', date: '11 Sep 2026', amount: 'Rp 50.000', type: 'expense' as const },
  { id: '3', title: 'Beli Kopi', categoryName: 'Food & Dining', date: '11 Sep 2026', amount: 'Rp 35.000', type: 'expense' as const },
  { id: '4', title: 'Tagihan Listrik', categoryName: 'Utilities', date: '12 Sep 2026', amount: 'Rp 500.000', type: 'expense' as const },
];

export const TransactionList = () => {
  return (
    <div className="flex flex-col">
      {MOCK_TRANSACTIONS.map((trx) => (
        <TransactionItem
          key={trx.id}
          title={trx.title}
          categoryName={trx.categoryName}
          date={trx.date}
          amount={trx.amount}
          type={trx.type}
        />
      ))}
    </div>
  );
};
