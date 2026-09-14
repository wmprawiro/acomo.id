'use client';

import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface IosSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

import { X } from '@phosphor-icons/react';

export const IosSheet = ({ isOpen, onClose, title, children }: IosSheetProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  if (isOpen && !shouldRender) {
    setShouldRender(true);
  }

  const handleAnimationEnd = () => {
    if (!isOpen) setShouldRender(false);
  };

  if (!shouldRender) return null;

  return (
    <div className="absolute inset-0 z-[100] flex flex-col justify-end">
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/60 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      
      {/* Sheet Content */}
      <div 
        className={cn(
          "relative bg-[#1C1C1E] border-t border-white/10 shadow-2xl w-full rounded-t-[32px] flex flex-col transition-transform duration-300 ease-out max-h-[90%]",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
        onTransitionEnd={handleAnimationEnd}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4 pt-8 shrink-0">
          <h2 className="text-[28px] font-bold text-white tracking-tight">{title}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 py-6 no-scrollbar pb-12">
          {children}
        </div>
      </div>
    </div>
  );
};
