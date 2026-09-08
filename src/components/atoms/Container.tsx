import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`w-full max-w-[1152px] mx-auto px-[24px] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
