import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CurrencyCode = string;

export function formatCurrency(
  amount: number,
  currency: CurrencyCode,
  compact: boolean = false,
) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency,
      notation: compact ? "compact" : "standard",
      maximumFractionDigits: compact ? 1 : 0,
    }).format(amount);
  } catch {
    // Fallback if currency is invalid
    return `${currency} ${amount.toLocaleString()}`;
  }
}

export function maskCurrency(currency: CurrencyCode): string {
  // Format a zero value to get the currency symbol/prefix, then replace digits with *
  const sample = formatCurrency(0, currency).replace(/0/g, "*");
  return sample;
}
