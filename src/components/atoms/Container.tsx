import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={cn("w-full max-w-6xl mx-auto px-6", className)} {...props}>
      {children}
    </div>
  );
};
