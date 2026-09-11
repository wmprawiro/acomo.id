'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

// Definisi item navigasi beserta SVG khusus (SF Symbol Replika)
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Home', href: '/dashboard', icon: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.63 2.5a.9.9 0 00-1.26 0l-8.5 8.16a.9.9 0 00-.28.66V20.5a1.5 1.5 0 001.5 1.5h4.4a.5.5 0 00.5-.5v-6.6a.4.4 0 01.4-.4h5.2a.4.4 0 01.4.4v6.6a.5.5 0 00.5.5h4.4a1.5 1.5 0 001.5-1.5v-9.18a.9.9 0 00-.28-.66l-8.5-8.16z"/>
    </svg>
  )},
  { id: 'transactions', label: 'Transactions', href: '/transactions', icon: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 3.5h15a2 2 0 012 2v13a2 2 0 01-2 2h-15a2 2 0 01-2-2v-13a2 2 0 012-2zm2.5 4a1 1 0 100 2 1 1 0 000-2zm0 4a1 1 0 100 2 1 1 0 000-2zm0 4a1 1 0 100 2 1 1 0 000-2zm4-7.5a.5.5 0 000 1h5a.5.5 0 000-1h-5zm0 4a.5.5 0 000 1h5a.5.5 0 000-1h-5zm0 4a.5.5 0 000 1h5a.5.5 0 000-1h-5z"/>
    </svg>
  )},
  { id: 'categories', label: 'Categories', href: '/categories', icon: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.5 12V5.5c0-1.1.9-2 2-2H12c.53 0 1.04.21 1.41.59l8 8a2 2 0 010 2.82l-6.5 6.5a2 2 0 01-2.82 0l-8-8A2 2 0 013.5 12zm4-4.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
    </svg>
  )},
  { id: 'reports', label: 'Reports', href: '/reports', icon: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 19V9.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V19a.5.5 0 01-.5.5H5a.5.5 0 01-.5-.5zm6 0V5.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V19a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5zm6 0v-6.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V19a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5z"/>
    </svg>
  )}
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
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-[5px] transition-all w-12 sm:w-14',
                  isActive ? 'text-white scale-110 drop-shadow-md' : 'text-white/40 hover:text-white/70'
                )}
              >
                {item.icon}
                <span className="text-[10px] font-bold tracking-wide">
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
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        
      </div>
    </>
  );
};
