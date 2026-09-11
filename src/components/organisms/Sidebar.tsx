'use client';

import { usePathname } from 'next/navigation';
import { NavItem } from '@/components/molecules';
import { NAV_ITEMS } from '@/constants/navigation';

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-background border-r border-white/10 h-full flex flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <h1 className="text-xl font-bold text-foreground tracking-tight">acomo.</h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <NavItem
              key={item.id}
              href={item.href}
              label={item.label}
              isActive={isActive}
            />
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <NavItem
          href="/logout"
          label="Logout"
          className="text-red-400 hover:bg-red-400/10 hover:text-red-300"
        />
      </div>
    </aside>
  );
};
