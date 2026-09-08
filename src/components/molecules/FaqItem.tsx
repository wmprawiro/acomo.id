"use client";

import React, { useState } from 'react';

interface FaqItemProps {
  title: string;
  content: string;
  defaultOpen?: boolean;
}

export const FaqItem: React.FC<FaqItemProps> = ({ title, content, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-[#1c1e2b] flex flex-col items-start px-[24px] py-[8px] rounded-[16px] w-full transition-all">
      <div 
        className="flex min-h-[76px] items-center justify-between py-[24px] w-full cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col items-start pr-[16px] flex-1">
          <p className="[word-break:break-word] font-semibold leading-[28px] text-[18px] text-white">
            {title}
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center justify-center size-[24px]">
          <img 
            alt="icon" 
            className={`w-[24px] h-[24px] transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} 
            src="/assets/icon.svg" 
          />
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col items-start overflow-hidden pb-[16px] w-full animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="[word-break:break-word] font-normal leading-[24px] text-[16px] text-[#e2e8f0] w-full">
            {content}
          </p>
        </div>
      )}
    </div>
  );
};
