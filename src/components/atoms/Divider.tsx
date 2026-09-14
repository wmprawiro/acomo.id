import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type DividerProps = React.HTMLAttributes<HTMLHRElement>;

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn('border-t border-gray-200 w-full my-4', className)}
        {...props}
      />
    );
  }
);
Divider.displayName = 'Divider';
