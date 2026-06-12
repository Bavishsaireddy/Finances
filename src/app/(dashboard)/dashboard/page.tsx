"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import BankCard from "@/components/cards/BankCard";
import SpendingDonut from "@/components/charts/SpendingDonut";
import MonthlyTrend from "@/components/charts/MonthlyTrend";
import MonthlyComparison from "@/components/charts/MonthlyComparison";
import TransactionRow from "@/components/transactions/TransactionRow";
import BudgetCard from "@/components/budget/BudgetCard";
import AddTransactionModal from "@/components/transactions/AddTransactionModal";
import { MOCK_ACCOUNTS, MOCK_TRANSACTIONS, MOCK_MONTHLY_DATA, getMockSpendingCategories, MOCK_BUDGETS } from "@/lib/mock-data";
import { getMonthComparison } from "@/lib/analytics";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, Plus, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const [addOpen, setAddOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"trend" | "compare">("trend");

  const accounts = MOCK_ACCOUNTS;
  const transactions = MOCK_TRANSACTIONS.slice(0, 7);
  const categories = getMockSpendingCategories();
  const budgets = MOCK_BUDGETS.slice(0, 3);
  const comparison = getMonthComparison("2026-06", "2026-05");

  const totalAssets = accounts.filter(a => a.type === "depository").reduce((s, a) => s + a.current_balance, 0);
  const totalDebt = accounts.filter(a => a.type === "credit").reduce((s, a) => s + Math.abs(a.current_balance), 0);
  const netWorth = totalAssets - totalDebt;
  const monthlySpend = MOCK_TRANSACTIONS.filter(t => t.date.startsWith("2026-06") && t.amount > 0 && t.primary_category !== "Income").reduce((s, t) => s + t.amount, 0);
  const monthlyIncome = Math.abs(MOCK_TRANSACTIONS.filter(t => t.date.startsWith("2026-06") && t.amount < 0).reduce((s, t) => s + t.amount, 0));
  const savingsRate = ((monthlyIncome - monthlySpend) / monthlyIncome) * 100;

  const stats = [
    { label: "Net Worth", value: formatCurrency(netWorth), change: "+3.2%", up: true, icon: Wallet, accent: "text-accent-purple-light", bg: "bg-accent-purple/10" },
    { label: "Monthly Income", value: formatCurrency(monthlyIncome), change: "+0%", up: true, icon: ArrowUpRight, accent: "text-success-DEFAULT", bg: "bg-success-muted" },
    { label: "Monthly Spend", value: formatCurrency(monthlySpend), change: "+8.4%", up: false, icon: ArrowDownRight, accent: "text-danger-DEFAULT", bg: "bg-danger-muted" },
    { label: "Savings Rate", value: `${savingsRate.toFixed(0)}%`, change: "+5.1%", up: true, icon: Sparkles, accent: "text-accent-blue", bg: "bg-accent-blue/10" },
  ];

  return (
    <div className="animate-fade-in">
      <Header title="Dashboard" subtitle="Your financial overview — June 2026" />

      <div className="px-6 py-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="bg-bg-card border border-border rounded-xl p-4 hover:border-border-bright transition-colors group">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-text-muted">{s.label}</p>
                <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`w-3.5 h-3.5 ${s.accent}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-text-primary">{s.value}</p>
              <div className="flex items-center gap-1 mt-1.5">
                {s.up
                  ? <TrendingUp className="w-3 h-3 text-success-DEFAULT" />
                  : <TrendingDown className="w-3 h-3 text-danger-DEFAULT" />}
                <span className={`text-[11px] font-medium ${s.up ? "text-success-DEFAULT" : "text-danger-DEFAULT"}`}>{s.change}</span>
                <span className="text-[11px] text-text-muted">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-text-primary">My Cards</h2>
            <a href="/cards" className="text-xs text-accent-purple-light hover:underline">View all →</a>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {accounts.map(acc => <BankCard key={acc.id} account={acc} />)}
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Spending donut */}
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-text-primary">Spending Breakdown</h2>
                <p className="text-[11px] text-text-muted mt-0.5">June 2026 · {formatCurrency(monthlySpend)}</p>
              </div>
              <a href="/analytics" className="text-[11px] text-accent-purple-light hover:underline">Full analysis →</a>
            </div>
            <SpendingDonut categories={categories} />
          </div>

          {/* Switchable chart */}
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-text-primary">
                  {activeTab === "trend" ? "Income vs Spending" : "June vs May"}
                </h2>
                <p className="text-[11px] text-text-muted mt-0.5">
                  {activeTab === "trend" ? "Last 6 months" : "Category comparison"}
                </p>
              </div>
              <div className="flex gap-1 p-0.5 bg-bg-elevated border border-border rounded-lg">
                {(["trend", "compare"] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${
                      activeTab === t
                        ? "bg-accent-purple/20 text-accent-purple-light"
                        : "text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    {t === "trend" ? "Trend" : "Compare"}
                  </button>
                ))}
              </div>
            </div>
            {activeTab === "trend" ? (
              <>
                <div className="flex items-center gap-3 text-[10px] text-text-muted mb-3">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success-DEFAULT inline-block" />Income</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-danger-DEFAULT inline-block" />Spending</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-purple inline-block" />Savings</span>
                </div>
                <MonthlyTrend data={MOCK_MONTHLY_DATA} />
              </>
            ) : (
              <MonthlyComparison data={comparison.slice(0, 5)} currentLabel="June" previousLabel="May" />
            )}
          </div>
        </div>

        {/* Bottom row: Transactions + Budgets */}
        <div className="grid grid-cols-3 gap-4">
          {/* Transactions */}
          <div className="col-span-2 bg-bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-text-primary">Recent Transactions</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAddOpen(true)}
                  className="flex items-center gap-1 text-[11px] text-accent-purple-light hover:underline"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </button>
                <a href="/transactions" className="text-xs text-accent-purple-light hover:underline">View all →</a>
              </div>
            </div>
            <div className="space-y-0.5">
              {transactions.map(t => <TransactionRow key={t.id} transaction={t} />)}
            </div>
          </div>

          {/* Budgets */}
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-text-primary">Budgets</h2>
              <a href="/budgets" className="text-xs text-accent-purple-light hover:underline">View all →</a>
            </div>
            <div className="space-y-3">
              {budgets.map(b => <BudgetCard key={b.id} budget={b} />)}
            </div>
          </div>
        </div>

      </div>

      <AddTransactionModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
