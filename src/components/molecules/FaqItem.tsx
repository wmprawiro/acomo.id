"use client";

import React, { useState } from "react";

interface FaqItemProps {
  title: string;
  content: string;
  defaultOpen?: boolean;
}

export const FaqItem: React.FC<FaqItemProps> = ({
  title,
  content,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-card flex flex-col items-start px-6 py-2 rounded-2xl w-full transition-all">
      <div
        className="flex min-h-[76px] items-center justify-between py-6 w-full cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col items-start pr-4 flex-1">
          <p className="[word-break:break-word] font-semibold leading-7 text-lg text-white">
            {title}
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center justify-center size-6">
          <img
            alt="icon"
            className={`size-6 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
            src="/assets/icon.svg"
          />
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col items-start overflow-hidden pb-4 w-full animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="[word-break:break-word] font-normal leading-6 text-base text-slate-200 w-full">
            {content}
          </p>
        </div>
      )}
    </div>
  );
};
