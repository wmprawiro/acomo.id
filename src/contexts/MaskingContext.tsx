"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MaskingContextType {
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
}

const MaskingContext = createContext<MaskingContextType | undefined>(undefined);

export const MaskingProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <MaskingContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </MaskingContext.Provider>
  );
};

export const useMasking = () => {
  const context = useContext(MaskingContext);
  if (context === undefined) {
    return { isVisible: true, setIsVisible: () => {} };
  }
  return context;
};
