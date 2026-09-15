import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-white hover:bg-gray-200 transition-colors flex h-14 items-center justify-center px-8 py-2 rounded-full shrink-0 cursor-pointer font-medium leading-tight text-sm text-black text-center",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
