import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, className = '', ...props }, ref) => {
    return (
      <div className={`bg-[rgba(255,255,255,0.15)] flex h-[56px] items-center px-[24px] rounded-[999px] w-full ${className}`}>
        <input 
          ref={ref}
          type="email" 
          placeholder={placeholder}
          className="bg-transparent outline-none font-normal leading-[normal] text-[16px] text-white w-full placeholder:text-gray-400"
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';
