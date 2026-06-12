import { MOCK_TRANSACTIONS, MOCK_ACCOUNTS } from "./mock-data";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "./utils";
import type { Transaction } from "@/types";

// ── Month-over-month comparison ───────────────────────────────────────────────

export interface ComparisonRow {
  category: string;
  icon: string;
  color: string;
  current: number;
  previous: number;
  change: number; // percentage
}

export function getMonthComparison(
  current = "2026-06",
  previous = "2026-05",
  txns: Transaction[] = MOCK_TRANSACTIONS
): ComparisonRow[] {
  const bucket = (month: string) =>
    txns.reduce<Record<string, number>>((acc, t) => {
      if (t.date.startsWith(month) && t.amount > 0 && t.primary_category !== "Income") {
        acc[t.primary_category] = (acc[t.primary_category] || 0) + t.amount;
      }
      return acc;
    }, {});

  const cur = bucket(current);
  const prev = bucket(previous);
  const allCats = Array.from(new Set([...Object.keys(cur), ...Object.keys(prev)]));

  return allCats
    .map(cat => {
      const c = cur[cat] || 0;
      const p = prev[cat] || 0;
      return {
        category: cat,
        icon: CATEGORY_ICONS[cat] || "📦",
        color: CATEGORY_COLORS[cat] || "#475569",
        current: c,
        previous: p,
        change: p > 0 ? ((c - p) / p) * 100 : 0,
      };
    })
    .sort((a, b) => b.current - a.current);
}

// ── Category trend (6 months, top N categories) ───────────────────────────────

export interface TrendPoint {
  month: string;
  [category: string]: number | string;
}

export function getCategoryTrend(
  topN = 5,
  txns: Transaction[] = MOCK_TRANSACTIONS
): { data: TrendPoint[]; categories: string[] } {
  const months = ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06"];
  const monthLabels: Record<string, string> = {
    "2026-01": "Jan", "2026-02": "Feb", "2026-03": "Mar",
    "2026-04": "Apr", "2026-05": "May", "2026-06": "Jun",
  };

  // Find top N categories by total spend
  const totals: Record<string, number> = {};
  txns.forEach(t => {
    if (t.amount > 0 && t.primary_category !== "Income") {
      totals[t.primary_category] = (totals[t.primary_category] || 0) + t.amount;
    }
  });
  const topCats = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([cat]) => cat);

  const data: TrendPoint[] = months.map(month => {
    const point: TrendPoint = { month: monthLabels[month] };
    topCats.forEach(cat => {
      point[cat] = txns
        .filter(t => t.date.startsWith(month) && t.primary_category === cat && t.amount > 0)
        .reduce((s, t) => s + t.amount, 0);
    });
    return point;
  });

  return { data, categories: topCats };
}

// ── Top merchants ─────────────────────────────────────────────────────────────

export interface MerchantRow {
  name: string;
  amount: number;
  count: number;
  category: string;
  color: string;
}

export function getTopMerchants(
  n = 8,
  txns: Transaction[] = MOCK_TRANSACTIONS
): MerchantRow[] {
  const map: Record<string, MerchantRow> = {};
  txns.forEach(t => {
    if (t.amount <= 0 || t.primary_category === "Income") return;
    const key = t.merchant_name || t.name;
    if (!map[key]) {
      map[key] = { name: key, amount: 0, count: 0, category: t.primary_category, color: CATEGORY_COLORS[t.primary_category] || "#475569" };
    }
    map[key].amount += t.amount;
    map[key].count += 1;
  });
  return Object.values(map)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, n);
}

// ── Payment channel split ─────────────────────────────────────────────────────

export interface ChannelSlice {
  name: string;
  value: number;
  color: string;
}

export function getPaymentChannelSplit(txns: Transaction[] = MOCK_TRANSACTIONS): ChannelSlice[] {
  const map: Record<string, number> = {};
  txns.forEach(t => {
    if (t.amount > 0 && t.primary_category !== "Income") {
      map[t.payment_channel] = (map[t.payment_channel] || 0) + t.amount;
    }
  });
  const colors: Record<string, string> = {
    "online": "#7c3aed",
    "in store": "#3b82f6",
    "other": "#475569",
  };
  const labels: Record<string, string> = {
    "online": "Online",
    "in store": "In Store",
    "other": "Other",
  };
  return Object.entries(map).map(([k, v]) => ({
    name: labels[k] || k,
    value: v,
    color: colors[k] || "#475569",
  }));
}

// ── Day-of-week pattern ───────────────────────────────────────────────────────

export interface DayRow {
  day: string;
  short: string;
  amount: number;
  count: number;
}

export function getDayOfWeekPattern(txns: Transaction[] = MOCK_TRANSACTIONS): DayRow[] {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const shorts = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const map: Record<number, { amount: number; count: number }> = {};

  txns.forEach(t => {
    if (t.amount <= 0 || t.primary_category === "Income") return;
    const d = new Date(t.date + "T12:00:00").getDay();
    if (!map[d]) map[d] = { amount: 0, count: 0 };
    map[d].amount += t.amount;
    map[d].count += 1;
  });

  return days.map((day, i) => ({
    day,
    short: shorts[i],
    amount: map[i]?.amount || 0,
    count: map[i]?.count || 0,
  }));
}

// ── Account balances for donut ────────────────────────────────────────────────

export function getAccountBalanceSplit() {
  return MOCK_ACCOUNTS.map(a => ({
    name: a.name.split(" ").slice(0, 2).join(" "),
    value: Math.abs(a.current_balance),
    color: a.institution_color,
    type: a.type,
  }));
}
