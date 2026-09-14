"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CurrencyCode } from "@/lib/utils";

export interface NotificationSettings {
  dailyReminder: boolean;
  budgetAlerts: boolean;
  marketing: boolean;
}

interface PreferencesContextType {
  currency: CurrencyCode;
  setCurrency: (val: CurrencyCode) => void;
  firstDayOfMonth: number;
  setFirstDayOfMonth: (val: number) => void;
  notifications: NotificationSettings;
  setNotifications: (val: NotificationSettings) => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('IDR');
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<number>(1);
  const [notifications, setNotifications] = useState<NotificationSettings>({
    dailyReminder: true,
    budgetAlerts: true,
    marketing: false,
  });
  
  return (
    <PreferencesContext.Provider value={{ 
      currency, setCurrency, 
      firstDayOfMonth, setFirstDayOfMonth,
      notifications, setNotifications 
    }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
