import Link from 'next/link';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
}

export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ className, href, icon, label, isActive, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
          isActive
            ? 'bg-white/10 text-foreground'
            : 'text-foreground/60 hover:bg-white/5 hover:text-foreground',
          className
        )}
        {...props}
      >
        {icon && <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">{icon}</span>}
        <span>{label}</span>
      </Link>
    );
  }
);
NavItem.displayName = 'NavItem';
