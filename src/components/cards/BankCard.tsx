"use client";

import { Account } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const CARD_GRADIENTS: Record<string, string> = {
  Chase: "from-[#117ACA] to-[#0a5a9e]",
  "American Express": "from-[#016FD0] to-[#004a8f]",
  "Goldman Sachs": "from-[#3a3a3a] to-[#1a1a1a]",
  default: "from-[#7c3aed] to-[#4f46e5]",
};

interface BankCardProps {
  account: Account;
  compact?: boolean;
}

export default function BankCard({ account, compact = false }: BankCardProps) {
  const gradient = CARD_GRADIENTS[account.institution_name] || CARD_GRADIENTS.default;
  const isCredit = account.type === "credit";
  const balance = Math.abs(account.current_balance);
  const usagePercent = isCredit && account.credit_limit
    ? (balance / account.credit_limit) * 100
    : null;

  if (compact) {
    return (
      <div className={cn("rounded-xl p-4 bg-gradient-to-br card-shine shadow-card", gradient)}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/70 text-xs font-medium">{account.institution_name}</span>
          <CreditCard className="w-4 h-4 text-white/50" />
        </div>
        <p className="text-white font-semibold text-lg">{formatCurrency(balance)}</p>
        <p className="text-white/60 text-xs mt-1">•••• {account.mask}</p>
      </div>
    );
  }

  return (
    <div className={cn("relative rounded-2xl p-5 bg-gradient-to-br card-shine shadow-card hover:shadow-card-hover transition-shadow duration-300 select-none", gradient)}>
      {/* Top row */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-white/60 text-xs font-medium uppercase tracking-wider">{account.institution_name}</p>
          <p className="text-white font-semibold text-sm mt-0.5">{account.name}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-white/80" />
          </div>
          {isCredit && (
            <span className="text-[10px] text-white/50 uppercase tracking-wider">Credit</span>
          )}
        </div>
      </div>

      {/* Card number */}
      <p className="text-white/50 text-sm font-mono tracking-widest mb-5">
        •••• •••• •••• {account.mask}
      </p>

      {/* Balance row */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">
            {isCredit ? "Current Balance" : "Available Balance"}
          </p>
          <p className="text-white text-2xl font-bold tracking-tight">{formatCurrency(balance)}</p>
        </div>
        {isCredit && account.credit_limit && (
          <div className="text-right">
            <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">Limit</p>
            <p className="text-white/80 text-sm font-semibold">{formatCurrency(account.credit_limit)}</p>
          </div>
        )}
        {!isCredit && account.available_balance !== null && (
          <div className="flex items-center gap-1 text-white/70">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs">Healthy</span>
          </div>
        )}
      </div>

      {/* Credit usage bar */}
      {usagePercent !== null && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/40 text-[10px]">Credit used</span>
            <span className="text-white/60 text-[10px]">{usagePercent.toFixed(0)}%</span>
          </div>
          <div className="h-1 rounded-full bg-white/10">
            <div
              className={cn("h-full rounded-full transition-all", usagePercent > 80 ? "bg-red-400" : usagePercent > 50 ? "bg-yellow-400" : "bg-green-400")}
              style={{ width: `${Math.min(usagePercent, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
