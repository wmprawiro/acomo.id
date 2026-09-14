"use client";

import { IosSheet } from './IosSheet';
import { Sparkle, Circle, EnvelopeSimple } from '@phosphor-icons/react';

export type LegalSheetType = 'Terms of Service' | 'Privacy Policy' | 'Help & Support' | 'What\'s New';

export interface LegalSheetProps {
  isOpen: boolean;
  onClose: () => void;
  type: LegalSheetType | null;
}

import { useState, useEffect } from 'react';

export const LegalSheet = ({ isOpen, onClose, type }: LegalSheetProps) => {
  const [activeType, setActiveType] = useState<LegalSheetType | null>(type);

  useEffect(() => {
    if (type) {
      setActiveType(type);
    }
  }, [type]);

  if (!activeType) return null;

  let content = null;

  switch (activeType) {
    case 'Terms of Service':
      content = (
        <div className="p-5 text-white/80 space-y-4 pb-20">
          <h3 className="text-white font-bold text-lg">1. Introduction</h3>
          <p className="text-[15px] leading-relaxed">Welcome to Acomo. These terms govern your use of our application. By using Acomo, you agree to these terms.</p>
          
          <h3 className="text-white font-bold text-lg mt-6">2. User Data</h3>
          <p className="text-[15px] leading-relaxed">Your financial data is stored locally on your device by default. We do not have access to your transactions unless you explicitly opt-in to cloud backup features.</p>
          
          <h3 className="text-white font-bold text-lg mt-6">3. Prohibited Activities</h3>
          <p className="text-[15px] leading-relaxed">You agree not to modify, reverse engineer, or attempt to extract the source code of the application.</p>
          
          <h3 className="text-white font-bold text-lg mt-6">4. Changes to Terms</h3>
          <p className="text-[15px] leading-relaxed">We reserve the right to modify these terms at any time. We will notify users of any significant changes.</p>
        </div>
      );
      break;
    case 'Privacy Policy':
      content = (
        <div className="p-5 text-white/80 space-y-4 pb-20">
          <h3 className="text-white font-bold text-lg">Data Collection</h3>
          <p className="text-[15px] leading-relaxed">Acomo is designed with privacy in mind. We collect minimal analytics data to improve the application experience, and this data is entirely anonymized.</p>
          
          <h3 className="text-white font-bold text-lg mt-6">Data Usage</h3>
          <p className="text-[15px] leading-relaxed">Your data is used exclusively to provide and improve the Acomo app. We do not sell your personal information to third parties.</p>
          
          <h3 className="text-white font-bold text-lg mt-6">Data Security</h3>
          <p className="text-[15px] leading-relaxed">We use industry-standard security measures to protect your data. If you use cloud sync features, your data is encrypted during transit and at rest.</p>
        </div>
      );
      break;
    case "What's New":
      content = (
        <div className="p-5 space-y-6 pb-20">
          <div className="flex gap-4">
            <div className="mt-1">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                <Sparkle weight="fill" size={20} />
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">v1.0.0 - Initial Release</h3>
              <p className="text-[13px] text-white/50 mb-3">September 2026</p>
              <ul className="text-[15px] text-white/80 space-y-3">
                <li className="flex items-start gap-2.5">
                  <Circle weight="fill" size={6} className="text-emerald-500 mt-2 shrink-0" /> 
                  <span>Added Multi-currency support</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Circle weight="fill" size={6} className="text-emerald-500 mt-2 shrink-0" /> 
                  <span>Expense and Income tracking</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Circle weight="fill" size={6} className="text-emerald-500 mt-2 shrink-0" /> 
                  <span>Custom Categories and Icons</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Circle weight="fill" size={6} className="text-emerald-500 mt-2 shrink-0" /> 
                  <span>Multiple Wallets support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
      break;
    case 'Help & Support':
      content = (
        <div className="p-5 space-y-6 pb-20">
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Frequently Asked Questions</h3>
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="text-white font-medium mb-1.5">How do I export my data?</h4>
              <p className="text-[14px] text-white/60">You can export your data from the Profile page under Data Management. It will be saved as a CSV file.</p>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="text-white font-medium mb-1.5">Can I sync across devices?</h4>
              <p className="text-[14px] text-white/60">Currently, data is stored locally on your device. Cloud sync is planned for a future update.</p>
            </div>
          </div>

          <div className="pt-4">
            <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 border border-white/10">
              <EnvelopeSimple weight="bold" size={20} /> Contact Support
            </button>
          </div>
        </div>
      );
      break;
  }

  return (
    <IosSheet isOpen={isOpen} onClose={onClose} title={type}>
      <div className="h-full overflow-y-auto">
        {content}
      </div>
    </IosSheet>
  );
};
