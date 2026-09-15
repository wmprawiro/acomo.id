"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CurrencyCode } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

export interface NotificationSettings {
  dailyReminder: boolean;
  budgetAlerts: boolean;
  marketing: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

interface PreferencesContextType {
  currency: CurrencyCode;
  setCurrency: (val: CurrencyCode) => void;
  firstDayOfMonth: number;
  setFirstDayOfMonth: (val: number) => void;
  notifications: NotificationSettings;
  setNotifications: (val: NotificationSettings) => void;
  userProfile: UserProfile;
  setUserProfile: (val: UserProfile) => void;
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
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Wahyu Maulana",
    email: "wahyump62@gmail.com",
    avatar: "WM"
  });

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile) {
          setUserProfile(prev => ({
            ...prev,
            name: profile.name || profile.full_name || prev.name,
            email: profile.email || user.email || prev.email,
            avatar: profile.avatar || profile.avatar_url || prev.avatar
          }));
        } else if (user.email) {
          setUserProfile(prev => ({
            ...prev,
            email: user.email!
          }));
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <PreferencesContext.Provider value={{ 
      currency, setCurrency, 
      firstDayOfMonth, setFirstDayOfMonth,
      notifications, setNotifications,
      userProfile, setUserProfile
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
