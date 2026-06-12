"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { SpendingCategory } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface SpendingBarProps {
  categories: SpendingCategory[];
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: SpendingCategory; value: number }> }) => {
  if (!active || !payload?.[0]) return null;
  const cat = payload[0].payload;
  return (
    <div className="bg-bg-card border border-border rounded-xl px-4 py-3 shadow-card">
      <p className="text-sm font-medium text-text-primary">{cat.icon} {cat.name}</p>
      <p className="text-lg font-bold text-text-primary mt-1">{formatCurrency(cat.amount)}</p>
      <p className="text-xs text-text-muted">{cat.percentage.toFixed(1)}% of total</p>
    </div>
  );
};

export default function SpendingBar({ categories }: SpendingBarProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={categories} margin={{ top: 5, right: 10, left: -20, bottom: 5 }} barSize={28}>
        <CartesianGrid strokeDasharray="3 3" stroke="#262637" horizontal vertical={false} />
        <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} interval={0}
          tickFormatter={(v: string) => v.length > 8 ? v.slice(0, 7) + "…" : v} />
        <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
          {categories.map((cat, i) => (
            <Cell key={i} fill={cat.color} fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
