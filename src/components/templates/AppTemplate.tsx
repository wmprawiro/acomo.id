"use client";

import { useState } from "react";
import { TopNav, BottomNav } from "@/components/organisms";
import { IosSheet } from "@/components/molecules";
import { AddTransactionForm } from "@/components/organisms";

export const AppTemplate = ({ children }: { children: React.ReactNode }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="flex justify-center bg-black h-[100dvh] overflow-hidden">
      <div className="w-full max-w-[480px] h-full bg-background relative flex flex-col shadow-2xl border-x border-white/5 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto px-4 pt-[88px] pb-[120px] no-scrollbar">
          <div className="space-y-6">{children}</div>
        </main>

        <BottomNav onAddClick={() => setIsAddOpen(true)} />

        <IosSheet
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          title="New Transaction"
        >
          <AddTransactionForm onSuccess={() => setIsAddOpen(false)} />
        </IosSheet>
      </div>
    </div>
  );
};
