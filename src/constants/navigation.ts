// Need navigation types first, let's just define it inline or in types/navigation.ts
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'grid' },
  { id: 'transactions', label: 'Transactions', href: '/transactions', icon: 'list' },
  { id: 'categories', label: 'Categories', href: '/categories', icon: 'tag' },
  { id: 'reports', label: 'Reports', href: '/reports', icon: 'bar-chart' },
  { id: 'profile', label: 'Profile', href: '/profile', icon: 'user' },
];
