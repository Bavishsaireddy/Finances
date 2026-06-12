"use client";

import { Transaction } from "@/types";
import { formatCurrency, formatDateShort, CATEGORY_COLORS, CATEGORY_ICONS } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface TransactionRowProps {
  transaction: Transaction;
}

export default function TransactionRow({ transaction: t }: TransactionRowProps) {
  const isIncome = t.amount < 0;
  const color = CATEGORY_COLORS[t.primary_category] || "#475569";
  const icon = CATEGORY_ICONS[t.primary_category] || "📦";

  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-bg-elevated transition-colors group">
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
        style={{ backgroundColor: color + "20" }}
      >
        {icon}
      </div>

      {/* Name + category */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-text-primary truncate">
            {t.merchant_name || t.name}
          </p>
          {t.pending && (
            <span className="flex items-center gap-0.5 text-[10px] text-warning-DEFAULT bg-warning-muted px-1.5 py-0.5 rounded-full flex-shrink-0">
              <Clock className="w-2.5 h-2.5" />
              Pending
            </span>
          )}
        </div>
        <p className="text-[11px] text-text-muted truncate mt-0.5">
          {t.primary_category} · {formatDateShort(t.date)}
        </p>
      </div>

      {/* Amount */}
      <div className="text-right flex-shrink-0">
        <p className={cn("text-sm font-semibold", isIncome ? "text-success-DEFAULT" : "text-text-primary")}>
          {isIncome ? "+" : "-"}{formatCurrency(Math.abs(t.amount))}
        </p>
        <p className="text-[10px] text-text-muted capitalize mt-0.5">{t.payment_channel}</p>
      </div>
    </div>
  );
}
