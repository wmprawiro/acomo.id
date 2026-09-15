"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const ExpenseChart = dynamic(
  () =>
    import("@/components/organisms/ExpenseChart").then((mod) => ({
      default: mod.ExpenseChart,
    })),
  { ssr: false },
);

const CategoryPieChart = dynamic(
  () =>
    import("@/components/organisms/CategoryPieChart").then((mod) => ({
      default: mod.CategoryPieChart,
    })),
  { ssr: false },
);

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<"Week" | "Month" | "Year">("Week");

  const tabs = [
    { label: "Weekly", value: "Week" },
    { label: "Monthly", value: "Month" },
    { label: "Yearly", value: "Year" },
  ] as const;

  return (
    <div className="space-y-6">
      {/* iOS Segmented Control Mock */}
      <div className="bg-[#1C1C1E] p-1 rounded-lg flex w-full max-w-xs mx-auto border border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "flex-1 py-1.5 rounded-md text-sm transition-colors",
              activeTab === tab.value
                ? "bg-[#2C2C2E] font-semibold text-white shadow-sm"
                : "font-medium text-white/50 hover:text-white",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-[15px] font-semibold text-white/80 tracking-tight">
            Trends
          </h3>
        </div>
        <ExpenseChart period={activeTab} />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-[15px] font-semibold text-white/80 tracking-tight">
            Categories
          </h3>
        </div>
        <CategoryPieChart period={activeTab} />
      </section>
    </div>
  );
}
