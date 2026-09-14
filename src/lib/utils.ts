import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CurrencyCode = 'IDR' | 'USD' | 'EUR';

export function formatCurrency(amount: number, currency: CurrencyCode, compact: boolean = false) {
  const locales: Record<CurrencyCode, string> = {
    IDR: 'id-ID',
    USD: 'en-US',
    EUR: 'de-DE'
  };

  return new Intl.NumberFormat(locales[currency], {
    style: 'currency',
    currency: currency,
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0,
  }).format(amount);
}
