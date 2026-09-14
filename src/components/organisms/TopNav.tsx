'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const TopNav = () => {
  const pathname = usePathname();
  
  const getTitle = () => {
    if (pathname.startsWith('/dashboard')) return 'Dashboard';
    if (pathname.startsWith('/transactions')) return 'Transactions';
    if (pathname.startsWith('/categories')) return 'Categories';
    if (pathname.startsWith('/reports')) return 'Reports';
    if (pathname.startsWith('/profile')) return 'Profile';
    return 'Acomo';
  };

  return (
    <header className="absolute top-0 left-0 right-0 h-[72px] flex items-center justify-between px-6 z-40 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
      <h2 className="text-[28px] font-bold text-white tracking-tight">{getTitle()}</h2>
      <div className="flex items-center gap-5">
        {/* Profile Avatar as Link */}
        <Link href="/profile" className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white/10 text-white border border-white/20 w-9 h-9 cursor-pointer hover:bg-white/20 transition-colors">
          <span className="font-medium text-white/80">WM</span>
        </Link>
      </div>
    </header>
  );
};
