"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  CaretRight,
  CurrencyCircleDollar,
  Check,
  Wallet,
  Tag,
  CalendarBlank,
  Bell,
  Download,
  Upload,
  CloudArrowUp,
  Question,
  Sparkle,
  FileText,
  Shield,
  SignOut,
  Trash,
} from "@phosphor-icons/react";
import { usePreferences, useFinance } from "@/contexts";
import {
  IosSheet,
  LegalSheet,
  type LegalSheetType,
} from "@/components/molecules";
import { Input } from "@/components/atoms";
import { cn } from "@/lib/utils";
import { CURRENCIES } from "@/constants/currencies";

export default function ProfilePage() {
  const {
    currency,
    setCurrency,
    firstDayOfMonth,
    setFirstDayOfMonth,
    notifications,
    setNotifications,
  } = usePreferences();
  const { wallets, categories, addWallet, addCategory } = useFinance();
  const router = useRouter();
  const [isCurrencySheetOpen, setIsCurrencySheetOpen] = useState(false);
  const [activeSheet, setActiveSheet] = useState<string | null>(null);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace('/');
  };

  const [newWallet, setNewWallet] = useState({
    name: "",
    type: "bank" as const,
    balance: "",
    color: "from-blue-500 to-blue-700",
  });
  const [newCategory, setNewCategory] = useState<{
    name: string;
    type: "expense" | "income";
    color: string;
    icon: string;
  }>({ name: "", type: "expense", color: "bg-orange-500", icon: "tag" });

  const CATEGORY_COLORS = [
    "bg-rose-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-fuchsia-500",
    "bg-pink-500",
    "bg-zinc-500",
  ];

  const { userProfile } = usePreferences();

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[20px] p-5 border border-white/10 shadow-2xl flex items-center gap-4">
        <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white/10 text-white border border-white/20 w-[72px] h-[72px] text-2xl shrink-0 shadow-xl">
          <span className="font-medium text-white/80">
            {userProfile.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-[22px] font-bold text-white tracking-tight leading-tight">
            {userProfile.name}
          </h2>
          <p className="text-[15px] text-white/50 mt-1">{userProfile.email}</p>
        </div>
      </div>

      {/* Card 1: Preferences */}
      <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[20px] overflow-hidden border border-white/10 shadow-2xl">
        <div
          onClick={() => setActiveSheet("Wallets")}
          className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-emerald-500 flex items-center justify-center text-white shadow-sm">
              <Wallet size={16} weight="fill" />
            </div>
            <span className="text-[17px] text-white tracking-tight">
              Wallets
            </span>
          </div>
          <CaretRight size={20} weight="bold" className="text-white/30" />
        </div>

        <div
          onClick={() => setActiveSheet("Categories")}
          className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-sky-500 flex items-center justify-center text-white shadow-sm">
              <Tag size={16} weight="fill" />
            </div>
            <span className="text-[17px] text-white tracking-tight">
              Categories
            </span>
          </div>
          <CaretRight size={20} weight="bold" className="text-white/30" />
        </div>

        <div
          onClick={() => setIsCurrencySheetOpen(true)}
          className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-amber-500 flex items-center justify-center text-white shadow-sm">
              <CurrencyCircleDollar size={16} weight="fill" />
            </div>
            <span className="text-[17px] text-white tracking-tight">
              Currency
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-[17px]">{currency}</span>
            <CaretRight size={20} weight="bold" className="text-white/30" />
          </div>
        </div>

        <div
          onClick={() => setActiveSheet("First Day of Month")}
          className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-indigo-500 flex items-center justify-center text-white shadow-sm">
              <CalendarBlank size={16} weight="fill" />
            </div>
            <span className="text-[17px] text-white tracking-tight">
              First Day of Month
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-[17px]">
              {firstDayOfMonth}
              {firstDayOfMonth === 1 ||
              firstDayOfMonth === 21 ||
              firstDayOfMonth === 31
                ? "st"
                : firstDayOfMonth === 2 || firstDayOfMonth === 22
                  ? "nd"
                  : firstDayOfMonth === 3 || firstDayOfMonth === 23
                    ? "rd"
                    : "th"}
            </span>
            <CaretRight size={20} weight="bold" className="text-white/30" />
          </div>
        </div>

        <div
          onClick={() => setActiveSheet("Notifications")}
          className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-rose-500 flex items-center justify-center text-white shadow-sm">
              <Bell size={16} weight="fill" />
            </div>
            <span className="text-[17px] text-white tracking-tight">
              Notifications
            </span>
          </div>
          <CaretRight size={20} weight="bold" className="text-white/30" />
        </div>
      </div>

      {/* Card 2: Data Management */}
      <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[20px] overflow-hidden border border-white/10 shadow-2xl">
        <div
          onClick={() => setActiveSheet("Export Data")}
          className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-blue-500 flex items-center justify-center text-white shadow-sm">
              <Download size={16} weight="fill" />
            </div>
            <span className="text-[17px] text-white tracking-tight">
              Export Data
            </span>
          </div>
          <CaretRight size={20} weight="bold" className="text-white/30" />
        </div>

        <div
          onClick={() => setActiveSheet("Import Data")}
          className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-teal-500 flex items-center justify-center text-white shadow-sm">
              <Upload size={16} weight="fill" />
            </div>
            <span className="text-[17px] text-white tracking-tight">
              Import Data
            </span>
          </div>
          <CaretRight size={20} weight="bold" className="text-white/30" />
        </div>

        <div
          onClick={() => setActiveSheet("Backup & Restore")}
          className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-fuchsia-500 flex items-center justify-center text-white shadow-sm">
              <CloudArrowUp size={16} weight="fill" />
            </div>
            <span className="text-[17px] text-white tracking-tight">
              Backup & Restore
            </span>
          </div>
          <CaretRight size={20} weight="bold" className="text-white/30" />
        </div>
      </div>

      {/* Card 3: About & Legal */}
      <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[20px] overflow-hidden border border-white/10 shadow-2xl">
        <div
          onClick={() => setActiveSheet("Help & Support")}
          className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-zinc-600 flex items-center justify-center text-white shadow-sm">
              <Question size={16} weight="fill" />
            </div>
            <span className="text-[17px] text-white tracking-tight">
              Help & Support
            </span>
          </div>
          <CaretRight size={20} weight="bold" className="text-white/30" />
        </div>

        <div
          onClick={() => setActiveSheet("What's New")}
          className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-yellow-500 flex items-center justify-center text-white shadow-sm">
              <Sparkle size={16} weight="fill" />
            </div>
            <span className="text-[17px] text-white tracking-tight">
              What&apos;s New
            </span>
          </div>
          <CaretRight size={20} weight="bold" className="text-white/30" />
        </div>

        <div
          onClick={() => setActiveSheet("Terms of Service")}
          className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-zinc-600 flex items-center justify-center text-white shadow-sm">
              <FileText size={16} weight="fill" />
            </div>
            <span className="text-[17px] text-white tracking-tight">
              Terms of Service
            </span>
          </div>
          <CaretRight size={20} weight="bold" className="text-white/30" />
        </div>

        <div
          onClick={() => setActiveSheet("Privacy Policy")}
          className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-zinc-600 flex items-center justify-center text-white shadow-sm">
              <Shield size={16} weight="fill" />
            </div>
            <span className="text-[17px] text-white tracking-tight">
              Privacy Policy
            </span>
          </div>
          <CaretRight size={20} weight="bold" className="text-white/30" />
        </div>
      </div>

      {/* Card 4: Log Out */}
      <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[20px] overflow-hidden border border-white/10 shadow-2xl">
        <div
          onClick={handleLogout}
          className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-rose-500/20 flex items-center justify-center text-rose-500 shadow-sm">
              <SignOut size={16} weight="bold" />
            </div>
            <span className="text-[17px] text-rose-500 font-medium tracking-tight">
              Log Out
            </span>
          </div>
        </div>
      </div>

      {/* Card 5: Delete Account */}
      <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[20px] overflow-hidden border border-white/10 shadow-2xl">
        <div
          onClick={() => setActiveSheet("Delete Account")}
          className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-rose-500 flex items-center justify-center text-white shadow-sm">
              <Trash size={16} weight="fill" />
            </div>
            <span className="text-[17px] text-rose-500 font-medium tracking-tight">
              Delete Account
            </span>
          </div>
        </div>
      </div>

      {/* App Version Info Footer */}
      <div className="flex flex-col items-center justify-center pt-4 pb-12 opacity-40">
        <p className="text-[13px] font-medium tracking-wide">acomo v1.0.0</p>
      </div>

      {/* Currency Sheet */}
      <IosSheet
        isOpen={isCurrencySheetOpen}
        onClose={() => setIsCurrencySheetOpen(false)}
        title="Select Currency"
      >
        <div className="flex flex-col bg-[#1C1C1E] border border-white/5 rounded-[20px] overflow-hidden">
          {CURRENCIES.map((c, i, arr) => (
            <div
              key={c.code}
              onClick={() => {
                setCurrency(c.code);
                setIsCurrencySheetOpen(false);
              }}
              className={cn(
                "flex items-center justify-between p-5 hover:bg-white/5 transition-colors cursor-pointer",
                i !== arr.length - 1 && "border-b border-white/5",
              )}
            >
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-[17px] tracking-tight",
                    currency === c.code
                      ? "text-emerald-400 font-semibold"
                      : "text-white",
                  )}
                >
                  {c.code}
                </span>
                <span className="text-[13px] text-white/50 mt-0.5">
                  {c.label}
                </span>
              </div>
              {currency === c.code && (
                <Check size={20} weight="bold" className="text-emerald-400" />
              )}
            </div>
          ))}
        </div>
      </IosSheet>

      {/* Legal Sheet */}
      <LegalSheet
        isOpen={[
          "Terms of Service",
          "Privacy Policy",
          "Help & Support",
          "What's New",
        ].includes(activeSheet || "")}
        onClose={() => setActiveSheet(null)}
        type={
          [
            "Terms of Service",
            "Privacy Policy",
            "Help & Support",
            "What's New",
          ].includes(activeSheet || "")
            ? (activeSheet as LegalSheetType)
            : null
        }
      />

      {/* Wallet Manager Sheet */}
      <IosSheet
        isOpen={activeSheet === "Wallets"}
        onClose={() => setActiveSheet(null)}
        title="Manage Wallets"
      >
        <div className="flex flex-col space-y-3">
          {wallets.map((w) => (
            <div
              key={w.id}
              className="flex items-center justify-between p-4 bg-[#1C1C1E] border border-white/5 rounded-[16px]"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-br",
                    w.color || "from-zinc-500 to-zinc-700",
                  )}
                >
                  <Wallet size={20} weight="duotone" />
                </div>
                <div>
                  <p className="text-white font-medium">{w.name}</p>
                  <p className="text-white/50 text-[13px] capitalize">
                    {w.type}
                  </p>
                </div>
              </div>
              <p className="text-white font-bold">
                {currency} {w.balance.toLocaleString("id-ID")}
              </p>
            </div>
          ))}
          <button
            onClick={() => setActiveSheet("Add Wallet")}
            className="mt-4 w-full py-4 bg-emerald-500/20 text-emerald-500 rounded-[16px] font-semibold hover:bg-emerald-500/30 transition-colors"
          >
            + Add New Wallet
          </button>
        </div>
      </IosSheet>

      {/* Category Manager Sheet */}
      <IosSheet
        isOpen={activeSheet === "Categories"}
        onClose={() => setActiveSheet(null)}
        title="Manage Categories"
      >
        <div className="flex flex-col space-y-3">
          {categories.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between p-4 bg-[#1C1C1E] border border-white/5 rounded-[16px]"
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-3 h-3 rounded-full", c.color)} />
                <div>
                  <p className="text-white font-medium">{c.name}</p>
                  <p className="text-white/50 text-[13px] capitalize">
                    {c.type}{" "}
                    {c.limit
                      ? `• Limit: ${c.limit.toLocaleString("id-ID")}`
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => setActiveSheet("Add Category")}
            className="mt-4 w-full py-4 bg-sky-500/20 text-sky-500 rounded-[16px] font-semibold hover:bg-sky-500/30 transition-colors"
          >
            + Add New Category
          </button>
        </div>
      </IosSheet>

      {/* First Day of Month Sheet */}
      <IosSheet
        isOpen={activeSheet === "First Day of Month"}
        onClose={() => setActiveSheet(null)}
        title="First Day of Month"
      >
        <div className="flex flex-col space-y-4">
          <p className="text-white/50 text-[13px] px-2">
            Select the day your monthly budget cycle starts. Usually the day you
            receive your salary.
          </p>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <button
                key={day}
                onClick={() => {
                  setFirstDayOfMonth(day);
                  setActiveSheet(null);
                }}
                className={cn(
                  "aspect-square rounded-[12px] flex items-center justify-center text-[15px] font-medium transition-all",
                  firstDayOfMonth === day
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                    : "bg-[#1C1C1E] border border-white/5 text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </IosSheet>

      {/* Notifications Sheet */}
      <IosSheet
        isOpen={activeSheet === "Notifications"}
        onClose={() => setActiveSheet(null)}
        title="Notifications"
      >
        <div className="flex flex-col bg-[#1C1C1E] border border-white/5 rounded-[20px] overflow-hidden">
          {Object.entries({
            dailyReminder: "Daily Reminder",
            budgetAlerts: "Budget Alerts",
            marketing: "Offers & Updates",
          }).map(([key, label], i, arr) => (
            <div
              key={key}
              className={cn(
                "flex items-center justify-between p-5",
                i !== arr.length - 1 && "border-b border-white/5",
              )}
            >
              <span className="text-white text-[17px] tracking-tight">
                {label}
              </span>
              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    [key]: !notifications[key as keyof typeof notifications],
                  })
                }
                className={cn(
                  "w-12 h-7 rounded-full relative transition-colors duration-300",
                  notifications[key as keyof typeof notifications]
                    ? "bg-emerald-500"
                    : "bg-white/10",
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-full bg-white absolute top-0.5 transition-transform duration-300 shadow-sm",
                    notifications[key as keyof typeof notifications]
                      ? "translate-x-[22px]"
                      : "translate-x-0.5",
                  )}
                />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => setActiveSheet(null)}
          className="mt-6 w-full py-4 bg-white/10 text-white rounded-[16px] font-semibold hover:bg-white/20 transition-colors"
        >
          Done
        </button>
      </IosSheet>

      {/* Export Data Sheet */}
      <IosSheet
        isOpen={activeSheet === "Export Data"}
        onClose={() => setActiveSheet(null)}
        title="Export Data"
      >
        <div className="flex flex-col space-y-4">
          <p className="text-white/50 text-[13px] px-2 text-center">
            Download all your transactions and budgets as a CSV file to your
            device.
          </p>
          <div className="bg-[#1C1C1E] border border-white/5 rounded-[20px] p-5 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 mb-2">
              <Download size={32} weight="duotone" />
            </div>
            <h4 className="text-white font-medium text-[17px]">
              acomo_export.csv
            </h4>
            <p className="text-white/40 text-[13px]">
              {useFinance().transactions.length} Transactions
            </p>
          </div>
          <button
            onClick={() => {
              // Mock export
              const a = document.createElement("a");
              a.href =
                "data:text/csv;charset=utf-8,id,title,amount,type,category,wallet,date\n";
              a.download = "acomo_export.csv";
              a.click();
              setActiveSheet(null);
            }}
            className="w-full py-4 bg-blue-500 text-white rounded-[16px] font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
          >
            Download CSV
          </button>
        </div>
      </IosSheet>

      {/* Import Data Sheet */}
      <IosSheet
        isOpen={activeSheet === "Import Data"}
        onClose={() => setActiveSheet(null)}
        title="Import Data"
      >
        <div className="flex flex-col space-y-4">
          <p className="text-white/50 text-[13px] px-2 text-center">
            Upload a CSV file to restore your transactions and budgets.
          </p>
          <div className="bg-[#1C1C1E] border border-dashed border-white/20 hover:bg-white/5 transition-colors rounded-[20px] p-8 flex flex-col items-center justify-center gap-3 cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/50 mb-2">
              <Upload size={32} weight="duotone" />
            </div>
            <h4 className="text-white font-medium text-[15px]">
              Tap to browse files
            </h4>
            <p className="text-white/40 text-[13px]">
              Only .csv files are supported
            </p>
          </div>
        </div>
      </IosSheet>

      {/* Backup & Restore Sheet */}
      <IosSheet
        isOpen={activeSheet === "Backup & Restore"}
        onClose={() => setActiveSheet(null)}
        title="Cloud Backup"
      >
        <div className="flex flex-col space-y-4">
          <p className="text-white/50 text-[13px] px-2 text-center">
            Securely back up your data to the cloud so you never lose your
            financial records.
          </p>
          <div className="bg-[#1C1C1E] border border-white/5 rounded-[20px] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-white font-medium">Auto Backup</span>
                <span className="text-white/50 text-[13px]">
                  Daily over Wi-Fi
                </span>
              </div>
              <button className="w-12 h-7 rounded-full bg-emerald-500 relative">
                <div className="w-6 h-6 rounded-full bg-white absolute top-0.5 translate-x-[22px] shadow-sm" />
              </button>
            </div>
            <div className="h-[1px] w-full bg-white/5 mb-4" />
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-[15px]">Last Backup</span>
              <span className="text-white text-[15px] font-medium">
                Today, 09:41 AM
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveSheet(null)}
            className="w-full py-4 bg-fuchsia-500 text-white rounded-[16px] font-semibold hover:bg-fuchsia-600 transition-colors shadow-lg shadow-fuchsia-500/20"
          >
            Back Up Now
          </button>
        </div>
      </IosSheet>

      {/* Add Wallet Sheet */}
      <IosSheet
        isOpen={activeSheet === "Add Wallet"}
        onClose={() => setActiveSheet("Wallets")}
        title="New Wallet"
      >
        <div className="flex flex-col space-y-4">
          <Input
            placeholder="Wallet Name (e.g. BCA, Gopay)"
            value={newWallet.name}
            onChange={(e) =>
              setNewWallet({ ...newWallet, name: e.target.value })
            }
          />

          <Input
            type="number"
            placeholder="Initial Balance"
            value={newWallet.balance}
            onChange={(e) =>
              setNewWallet({ ...newWallet, balance: e.target.value })
            }
          />
          <button
            onClick={() => {
              if (newWallet.name) {
                addWallet({
                  name: newWallet.name,
                  type: newWallet.type,
                  balance: Number(newWallet.balance) || 0,
                  color: newWallet.color,
                });
                setNewWallet({
                  name: "",
                  type: "bank",
                  balance: "",
                  color: "from-blue-500 to-blue-700",
                });
                setActiveSheet("Wallets");
              }
            }}
            className="w-full py-4 mt-2 bg-emerald-500 text-white rounded-[16px] font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
          >
            Save Wallet
          </button>
        </div>
      </IosSheet>

      {/* Add Category Sheet */}
      <IosSheet
        isOpen={activeSheet === "Add Category"}
        onClose={() => setActiveSheet("Categories")}
        title="New Category"
      >
        <div className="flex flex-col space-y-4">
          <Input
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
          <div className="grid grid-cols-2 gap-2">
            {(["expense", "income"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setNewCategory({ ...newCategory, type })}
                className={cn(
                  "py-3 rounded-[12px] text-[14px] font-medium capitalize transition-colors border",
                  newCategory.type === type
                    ? "bg-sky-500/20 border-sky-500 text-sky-500"
                    : "bg-white/5 border-white/10 text-white/50",
                )}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <label className="text-[13px] text-white/50 px-1">
              Category Color
            </label>
            <div className="grid grid-cols-8 gap-y-3 gap-x-2">
              {CATEGORY_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setNewCategory({ ...newCategory, color: c })}
                  className={cn(
                    "w-full aspect-square rounded-full transition-transform mx-auto max-w-[28px]",
                    c,
                    newCategory.color === c
                      ? "ring-2 ring-white ring-offset-2 ring-offset-[#1C1C1E] scale-110"
                      : "opacity-70 hover:opacity-100 hover:scale-105",
                  )}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              if (newCategory.name) {
                addCategory({
                  name: newCategory.name,
                  type: newCategory.type,
                  color: newCategory.color,
                  icon: "tag",
                });
                setNewCategory({
                  name: "",
                  type: "expense",
                  color: "bg-orange-500",
                  icon: "tag",
                });
                setActiveSheet("Categories");
              }
            }}
            className="w-full py-4 mt-2 bg-sky-500 text-white rounded-[16px] font-semibold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/20"
          >
            Save Category
          </button>
        </div>
      </IosSheet>

      {/* Generic Placeholder Sheet (Should technically never appear now) */}
      <IosSheet
        isOpen={
          !!activeSheet &&
          ![
            "Terms of Service",
            "Privacy Policy",
            "Help & Support",
            "What's New",
            "Wallets",
            "Add Wallet",
            "Categories",
            "Add Category",
            "First Day of Month",
            "Notifications",
            "Export Data",
            "Import Data",
            "Backup & Restore",
          ].includes(activeSheet)
        }
        onClose={() => setActiveSheet(null)}
        title={activeSheet || ""}
      >
        <div className="flex flex-col items-center justify-center py-10 opacity-70">
          <Sparkle
            size={48}
            weight="duotone"
            className="mb-4 text-emerald-400"
          />
          <p className="text-[17px] text-white font-medium tracking-tight text-center">
            Coming Soon
          </p>
          <p className="text-[13px] text-white/50 text-center mt-2 max-w-[200px]">
            This feature is currently under development. Stay tuned!
          </p>
        </div>
      </IosSheet>
    </div>
  );
}
