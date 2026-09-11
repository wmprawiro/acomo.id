import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, title, value, trend, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl p-6 rounded-[24px] border border-white/10 shadow-2xl', className)}
        {...props}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-white/60">{title}</h3>
          {icon && <div className="text-white/40 flex items-center justify-center">{icon}</div>}
        </div>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {trend && (
          <p
            className={cn(
              'text-sm mt-2 font-medium',
              trend.isPositive ? 'text-emerald-400' : 'text-rose-400'
            )}
          >
            {trend.isPositive ? '+' : '-'}
            {trend.value} <span className="text-white/40 font-normal ml-1">dari bulan lalu</span>
          </p>
        )}
      </div>
    );
  }
);
StatCard.displayName = 'StatCard';
