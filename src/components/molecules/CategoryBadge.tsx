import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Badge, type BadgeProps } from '@/components/atoms';

export interface CategoryBadgeProps extends Omit<BadgeProps, 'children'> {
  label: string;
  icon?: React.ReactNode;
}

export const CategoryBadge = forwardRef<HTMLSpanElement, CategoryBadgeProps>(
  ({ className, label, icon, variant = 'neutral', ...props }, ref) => {
    return (
      <Badge ref={ref} variant={variant} className={cn('gap-1.5', className)} {...props}>
        {icon && (
          <span className="w-3.5 h-3.5 flex items-center justify-center">{icon}</span>
        )}
        {label}
      </Badge>
    );
  }
);
CategoryBadge.displayName = 'CategoryBadge';
