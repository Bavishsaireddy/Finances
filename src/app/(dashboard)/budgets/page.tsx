"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import BudgetCard from "@/components/budget/BudgetCard";
import { MOCK_BUDGETS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Plus, Target, TrendingDown, CheckCircle2 } from "lucide-react";

export default function BudgetsPage() {
  const [budgets] = useState(MOCK_BUDGETS);

  const totalBudget = budgets.reduce((s, b) => s + b.limit_amount, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent_amount, 0);
  const overBudget = budgets.filter(b => b.spent_amount > b.limit_amount).length;
  const onTrack = budgets.filter(b => b.spent_amount / b.limit_amount < 0.8).length;

  return (
    <div className="animate-fade-in">
      <Header title="Budgets" subtitle="Set limits, stay in control" />

      <div className="px-6 py-6 space-y-6">

        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-accent-purple-light" />
              <p className="text-xs text-text-muted">Total Budget</p>
            </div>
            <p className="text-xl font-bold text-text-primary">{formatCurrency(totalBudget)}</p>
            <p className="text-[11px] text-text-muted mt-1">per month</p>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-danger-DEFAULT" />
              <p className="text-xs text-text-muted">Total Spent</p>
            </div>
            <p className="text-xl font-bold text-danger-DEFAULT">{formatCurrency(totalSpent)}</p>
            <p className="text-[11px] text-text-muted mt-1">{((totalSpent / totalBudget) * 100).toFixed(0)}% of budget</p>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-success-DEFAULT" />
              <p className="text-xs text-text-muted">On Track</p>
            </div>
            <p className="text-xl font-bold text-success-DEFAULT">{onTrack}</p>
            <p className="text-[11px] text-text-muted mt-1">categories</p>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-danger-DEFAULT text-sm">!</span>
              <p className="text-xs text-text-muted">Over Budget</p>
            </div>
            <p className="text-xl font-bold text-danger-DEFAULT">{overBudget}</p>
            <p className="text-[11px] text-text-muted mt-1">categories</p>
          </div>
        </div>

        {/* Overall progress */}
        <div className="bg-bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-text-primary">Monthly Budget Overview</h2>
              <p className="text-[11px] text-text-muted mt-0.5">{formatCurrency(totalSpent)} of {formatCurrency(totalBudget)} used</p>
            </div>
            <span className="text-sm font-bold text-text-primary">{((totalSpent / totalBudget) * 100).toFixed(0)}%</span>
          </div>
          <div className="h-3 rounded-full bg-bg-elevated overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-purple transition-all duration-700"
              style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-text-muted mt-2">
            <span>$0</span>
            <span className="text-success-DEFAULT font-medium">{formatCurrency(totalBudget - totalSpent)} remaining</span>
            <span>{formatCurrency(totalBudget)}</span>
          </div>
        </div>

        {/* Budget grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-text-primary">Category Budgets</h2>
            <button className="flex items-center gap-1.5 text-xs text-accent-purple-light hover:underline">
              <Plus className="w-3.5 h-3.5" />
              Add budget
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {budgets.map(b => (
              <BudgetCard key={b.id} budget={b} />
            ))}
            {/* Add new budget card */}
            <button className="rounded-xl border-2 border-dashed border-border hover:border-accent-purple/50 bg-bg-elevated hover:bg-bg-card transition-all p-5 flex flex-col items-center justify-center gap-3 group min-h-[140px]">
              <div className="w-9 h-9 rounded-xl bg-accent-purple/10 flex items-center justify-center group-hover:bg-accent-purple/20 transition-colors">
                <Plus className="w-4 h-4 text-accent-purple-light" />
              </div>
              <p className="text-xs font-medium text-text-muted group-hover:text-text-secondary transition-colors">New budget</p>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
