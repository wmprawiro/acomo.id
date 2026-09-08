import React, { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <button 
        ref={ref}
        className={`bg-white hover:bg-gray-200 transition-colors flex h-[56px] items-center justify-center px-[32px] py-[8px] rounded-[999px] shrink-0 cursor-pointer w-full md:w-auto ${className}`}
        {...props}
      >
        <span className="font-medium leading-[20px] text-[14px] text-black text-center whitespace-nowrap">
          {children}
        </span>
      </button>
    );
  }
);
Button.displayName = 'Button';
