import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, className = "", ...props }, ref) => {
    return (
      <div
        className={cn(
          "bg-white/15 flex h-14 items-center px-6 rounded-full w-full",
          className,
        )}
      >
        <input
          ref={ref}
          placeholder={placeholder}
          className="bg-transparent outline-none font-normal leading-normal text-base text-white w-full placeholder:text-gray-400"
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";
