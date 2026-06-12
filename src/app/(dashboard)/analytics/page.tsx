"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import SpendingDonut from "@/components/charts/SpendingDonut";
import MonthlyComparison from "@/components/charts/MonthlyComparison";
import CategoryTrend from "@/components/charts/CategoryTrend";
import TopMerchantsBar from "@/components/charts/TopMerchantsBar";
import DayOfWeekChart from "@/components/charts/DayOfWeekChart";
import PaymentChannelPie from "@/components/charts/PaymentChannelPie";
import MonthlyTrend from "@/components/charts/MonthlyTrend";
import AddTransactionModal from "@/components/transactions/AddTransactionModal";
import {
  getMockSpendingCategories,
  getAvailableMonths,
  MOCK_MONTHLY_DATA,
  MOCK_TRANSACTIONS,
} from "@/lib/mock-data";
import {
  getMonthComparison,
  getCategoryTrend,
  getTopMerchants,
  getPaymentChannelSplit,
  getDayOfWeekPattern,
} from "@/lib/analytics";
import { formatCurrency } from "@/lib/utils";
import { BarChart3, TrendingDown, TrendingUp, Zap, Plus } from "lucide-react";

const MONTH_LABELS: Record<string, string> = {
  "2026-06": "June 2026", "2026-05": "May 2026", "2026-04": "April 2026",
  "2026-03": "March 2026", "2026-02": "February 2026", "2026-01": "January 2026",
};

export default function AnalyticsPage() {
  const months = getAvailableMonths();
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [addOpen, setAddOpen] = useState(false);

  const prevMonth = months[months.indexOf(selectedMonth) + 1] || months[months.length - 1];

  const categories = getMockSpendingCategories(selectedMonth);
  const comparison = getMonthComparison(selectedMonth, prevMonth);
  const { data: trendData, categories: trendCats } = getCategoryTrend(5);
  const topMerchants = getTopMerchants(8);
  const channelSplit = getPaymentChannelSplit();
  const dayPattern = getDayOfWeekPattern();

  const totalSpend = MOCK_TRANSACTIONS
    .filter(t => t.date.startsWith(selectedMonth) && t.amount > 0 && t.primary_category !== "Income")
    .reduce((s, t) => s + t.amount, 0);

  const prevSpend = MOCK_TRANSACTIONS
    .filter(t => t.date.startsWith(prevMonth) && t.amount > 0 && t.primary_category !== "Income")
    .reduce((s, t) => s + t.amount, 0);

  const spendChange = prevSpend > 0 ? ((totalSpend - prevSpend) / prevSpend) * 100 : 0;
  const avgTx = totalSpend / (MOCK_TRANSACTIONS.filter(t => t.date.startsWith(selectedMonth) && t.amount > 0).length || 1);
  const txCount = MOCK_TRANSACTIONS.filter(t => t.date.startsWith(selectedMonth)).length;
  const topCat = categories[0];

  const kpis = [
    { label: "Total Spent", value: formatCurrency(totalSpend), change: spendChange, icon: TrendingDown, positive: spendChange < 0 },
    { label: "Avg. Transaction", value: formatCurrency(avgTx), change: null, icon: BarChart3, positive: true },
    { label: "Transactions", value: txCount.toString(), change: null, icon: Zap, positive: true },
    { label: "Top Category", value: topCat?.name || "—", sub: topCat ? formatCurrency(topCat.amount) : "", icon: TrendingUp, positive: true },
  ];

  return (
    <div className="animate-fade-in">
      <Header title="Analytics" subtitle="Deep dive into your spending patterns" />

      <div className="px-6 py-6 space-y-6">

        {/* Controls row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted">Viewing:</span>
            <div className="flex gap-1">
              {months.map(m => (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(m)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    selectedMonth === m
                      ? "bg-accent-purple/20 border-accent-purple/40 text-accent-purple-light"
                      : "bg-bg-elevated border-border text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {MONTH_LABELS[m]?.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-purple text-white text-xs font-medium px-3 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-glow"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Transaction
          </button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map(k => (
            <div key={k.label} className="bg-bg-card border border-border rounded-xl p-4 hover:border-border-bright transition-colors">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-text-muted">{k.label}</p>
                <div className="w-7 h-7 rounded-lg bg-bg-elevated flex items-center justify-center">
                  <k.icon className="w-3.5 h-3.5 text-text-muted" />
                </div>
              </div>
              <p className="text-xl font-bold text-text-primary truncate">{k.value}</p>
              {k.sub && <p className="text-xs text-text-muted mt-0.5">{k.sub}</p>}
              {k.change !== null && k.change !== undefined && (
                <div className={`flex items-center gap-1 mt-1 text-[11px] font-medium ${k.positive ? "text-success-DEFAULT" : "text-danger-DEFAULT"}`}>
                  {k.positive ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                  {k.change > 0 ? "+" : ""}{k.change.toFixed(1)}% vs {MONTH_LABELS[prevMonth]?.split(" ")[0]}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Row 2: Donut + Monthly Comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-text-primary">Spending Breakdown</h2>
                <p className="text-[11px] text-text-muted mt-0.5">{MONTH_LABELS[selectedMonth]}</p>
              </div>
              <span className="text-xs font-bold text-text-primary">{formatCurrency(totalSpend)}</span>
            </div>
            <SpendingDonut categories={categories} />
          </div>

          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-text-primary">Month-over-Month</h2>
                <p className="text-[11px] text-text-muted mt-0.5">{MONTH_LABELS[selectedMonth]?.split(" ")[0]} vs {MONTH_LABELS[prevMonth]?.split(" ")[0]}</p>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-text-muted">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2 rounded-sm bg-[#334155] inline-block" />Prev</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2 rounded-sm bg-accent-purple inline-block" />Current</span>
              </div>
            </div>
            <MonthlyComparison
              data={comparison}
              currentLabel={MONTH_LABELS[selectedMonth]?.split(" ")[0]}
              previousLabel={MONTH_LABELS[prevMonth]?.split(" ")[0]}
            />
          </div>
        </div>

        {/* Row 3: 6-month cash flow — full width */}
        <div className="bg-bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-text-primary">6-Month Cash Flow</h2>
              <p className="text-[11px] text-text-muted mt-0.5">Income vs spending vs savings — Jan to Jun 2026</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-text-muted">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success-DEFAULT inline-block" />Income</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-danger-DEFAULT inline-block" />Spending</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-purple inline-block" />Savings</span>
            </div>
          </div>
          <MonthlyTrend data={MOCK_MONTHLY_DATA} />
        </div>

        {/* Row 4: Category trend + Payment channel */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-text-primary">Category Trends</h2>
              <p className="text-[11px] text-text-muted mt-0.5">Top 5 categories over 6 months</p>
            </div>
            <CategoryTrend data={trendData} categories={trendCats} />
          </div>

          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-text-primary">Payment Method Split</h2>
              <p className="text-[11px] text-text-muted mt-0.5">Online vs in-store vs other</p>
            </div>
            <PaymentChannelPie data={channelSplit} />
          </div>
        </div>

        {/* Row 5: Top merchants + Day of week */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-text-primary">Top Merchants</h2>
              <p className="text-[11px] text-text-muted mt-0.5">Where the most money goes</p>
            </div>
            <TopMerchantsBar data={topMerchants} />
          </div>

          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-text-primary">Spending by Day</h2>
              <p className="text-[11px] text-text-muted mt-0.5">Brightest bar = highest spend day</p>
            </div>
            <DayOfWeekChart data={dayPattern} />

            {/* Day summary */}
            <div className="mt-4 grid grid-cols-7 gap-1">
              {dayPattern.map(d => (
                <div key={d.day} className="text-center">
                  <div
                    className="w-full h-1.5 rounded-full mb-1"
                    style={{
                      backgroundColor: d.amount > 0 ? "#7c3aed" : "#262637",
                      opacity: d.amount > 0 ? 0.3 + (d.amount / Math.max(...dayPattern.map(x => x.amount))) * 0.7 : 1,
                    }}
                  />
                  <p className="text-[9px] text-text-muted">{d.short[0]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <AddTransactionModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
