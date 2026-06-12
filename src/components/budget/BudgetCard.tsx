"use client";

import { Budget } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface BudgetCardProps {
  budget: Budget;
}

export default function BudgetCard({ budget }: BudgetCardProps) {
  const pct = (budget.spent_amount / budget.limit_amount) * 100;
  const over = pct > 100;
  const warning = pct > 80 && !over;
  const remaining = budget.limit_amount - budget.spent_amount;

  return (
    <div className="bg-bg-card border border-border rounded-xl p-4 hover:border-border-bright transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{budget.icon}</span>
          <div>
            <p className="text-sm font-medium text-text-primary">{budget.category}</p>
            <p className="text-[11px] text-text-muted capitalize">{budget.period}</p>
          </div>
        </div>
        {over && <AlertTriangle className="w-4 h-4 text-danger-DEFAULT" />}
        {warning && <AlertTriangle className="w-4 h-4 text-warning-DEFAULT" />}
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-bg-elevated mb-3 overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", over ? "bg-danger-DEFAULT" : warning ? "bg-warning-DEFAULT" : "bg-success-DEFAULT")}
          style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: over ? undefined : warning ? undefined : budget.color }}
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        <div>
          <span className="text-text-secondary">Spent </span>
          <span className="font-semibold text-text-primary">{formatCurrency(budget.spent_amount)}</span>
        </div>
        <div className="text-right">
          {over ? (
            <span className="text-danger-DEFAULT font-semibold">Over by {formatCurrency(Math.abs(remaining))}</span>
          ) : (
            <>
              <span className="text-text-secondary">Left </span>
              <span className="font-semibold text-success-DEFAULT">{formatCurrency(remaining)}</span>
            </>
          )}
        </div>
      </div>

      <div className="mt-2">
        <div className="flex items-center justify-between text-[10px] text-text-muted">
          <span>0</span>
          <span className={cn("font-medium", over ? "text-danger-light" : warning ? "text-warning-light" : "text-text-secondary")}>
            {pct.toFixed(0)}% used
          </span>
          <span>{formatCurrency(budget.limit_amount)}</span>
        </div>
      </div>
    </div>
  );
}
