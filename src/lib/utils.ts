import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, compact = false): string {
  if (compact && Math.abs(amount) >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

// Parse YYYY-MM-DD as local time to avoid UTC-offset off-by-one day issues
function parseDateLocal(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parseDateLocal(dateStr));
}

export function formatDateShort(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(parseDateLocal(dateStr));
}

export function getChangeColor(change: number): string {
  if (change > 0) return "text-danger-DEFAULT";
  if (change < 0) return "text-success-DEFAULT";
  return "text-text-secondary";
}

export function getChangeLabel(change: number, inverse = false): string {
  const up = inverse ? change < 0 : change > 0;
  const symbol = change > 0 ? "+" : "";
  return `${symbol}${change.toFixed(1)}%`;
}

export const CATEGORY_COLORS: Record<string, string> = {
  "Food and Drink": "#f59e0b",
  Travel: "#3b82f6",
  Shopping: "#7c3aed",
  Entertainment: "#ec4899",
  Healthcare: "#10b981",
  Transportation: "#06b6d4",
  Utilities: "#64748b",
  Housing: "#8b5cf6",
  Education: "#f97316",
  Personal: "#a78bfa",
  Income: "#10b981",
  Transfer: "#475569",
  Other: "#334155",
};

export const CATEGORY_ICONS: Record<string, string> = {
  "Food and Drink": "🍔",
  Travel: "✈️",
  Shopping: "🛍️",
  Entertainment: "🎬",
  Healthcare: "💊",
  Transportation: "🚗",
  Utilities: "⚡",
  Housing: "🏠",
  Education: "📚",
  Personal: "👤",
  Income: "💰",
  Transfer: "↔️",
  Other: "📦",
};
