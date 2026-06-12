"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { SpendingCategory } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface SpendingDonutProps {
  categories: SpendingCategory[];
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: SpendingCategory }> }) => {
  if (!active || !payload?.[0]) return null;
  const cat = payload[0].payload;
  return (
    <div className="bg-bg-card border border-border rounded-xl px-4 py-3 shadow-card">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base">{cat.icon}</span>
        <span className="text-sm font-medium text-text-primary">{cat.name}</span>
      </div>
      <p className="text-lg font-bold text-text-primary">{formatCurrency(cat.amount)}</p>
      <p className="text-xs text-text-muted">{cat.percentage.toFixed(1)}% of spending</p>
    </div>
  );
};

export default function SpendingDonut({ categories }: SpendingDonutProps) {
  const total = categories.reduce((s, c) => s + c.amount, 0);

  return (
    <div className="flex gap-6 items-center">
      {/* Donut */}
      <div className="relative flex-shrink-0 w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categories}
              cx="50%"
              cy="50%"
              innerRadius={56}
              outerRadius={80}
              paddingAngle={3}
              dataKey="amount"
              strokeWidth={0}
            >
              {categories.map((cat, i) => (
                <Cell key={i} fill={cat.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-[10px] text-text-muted uppercase tracking-wider">Total</p>
          <p className="text-lg font-bold text-text-primary">{formatCurrency(total, true)}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex-1 space-y-2.5 overflow-y-auto max-h-48">
        {categories.map((cat) => (
          <div key={cat.name} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
            <span className="text-xs text-text-secondary flex-1 truncate">{cat.icon} {cat.name}</span>
            <div className="text-right flex-shrink-0">
              <p className="text-xs font-semibold text-text-primary">{formatCurrency(cat.amount)}</p>
              <div className="flex items-center gap-0.5 justify-end">
                {cat.change > 0 ? (
                  <TrendingUp className="w-2.5 h-2.5 text-danger-DEFAULT" />
                ) : (
                  <TrendingDown className="w-2.5 h-2.5 text-success-DEFAULT" />
                )}
                <span className={`text-[10px] ${cat.change > 0 ? "text-danger-DEFAULT" : "text-success-DEFAULT"}`}>
                  {Math.abs(cat.change).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
