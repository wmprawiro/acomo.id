import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "income" | "expense" | "neutral";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", children, ...props }, ref) => {
    const variants = {
      income: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      expense: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
      neutral: "bg-white/10 text-white/70 border border-white/10",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          variants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);
Badge.displayName = "Badge";
