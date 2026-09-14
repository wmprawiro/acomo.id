'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, CurrencyCircleDollar, Wallet, CalendarCheck, Plus } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Home',        href: '/dashboard',    icon: House },
  { id: 'expenses',     label: 'Expenses',    href: '/expenses',     icon: CurrencyCircleDollar },
  { id: 'budget',       label: 'Budget',      href: '/budget',       icon: Wallet },
  { id: 'transactions', label: 'Transaction', href: '/transactions', icon: CalendarCheck },
];

interface BottomNavProps {
  onAddClick?: () => void;
}

export const BottomNav = ({ onAddClick }: BottomNavProps) => {
  const pathname = usePathname();

  return (
    <>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-[400px] flex items-center gap-3 z-50">
        
        {/* Left Pill (Navigation Links) */}
        <nav className="flex-1 h-[72px] bg-[#1C1C1E]/40 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] rounded-[36px] px-6 flex items-center justify-between">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-[5px] transition-all w-12 sm:w-14',
                  isActive ? 'text-white scale-110 drop-shadow-md' : 'text-white/40 hover:text-white/70'
                )}
              >
                <Icon size={24} weight={isActive ? 'fill' : 'regular'} />
                <span className="text-[10px] font-normal tracking-wide">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right Pill (Add Transaction Button) */}
        <button 
          onClick={onAddClick}
          className="w-[72px] h-[72px] shrink-0 bg-[#1C1C1E]/40 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-95"
        >
          <Plus size={32} weight="bold" />
        </button>
        
      </div>
    </>
  );
};
