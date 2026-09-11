import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';
import { Input, type InputProps } from '@/components/atoms';

export interface FormFieldProps extends InputProps {
  label: string;
  error?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className={cn('space-y-1.5 w-full', className)}>
        <label htmlFor={inputId} className="block text-sm font-medium text-white/80">
          {label}
        </label>
        <Input
          ref={ref}
          id={inputId}
          className={cn(
            'bg-background/50 border-white/20 text-white placeholder:text-white/40 focus:ring-white/30',
            error && 'border-rose-500 focus-visible:ring-rose-500'
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-rose-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormField.displayName = 'FormField';
