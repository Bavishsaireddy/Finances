"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Dot,
} from "recharts";
import { TrendPoint } from "@/lib/analytics";
import { CATEGORY_COLORS } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

interface CategoryTrendProps {
  data: TrendPoint[];
  categories: string[];
}

const CustomTooltip = ({
  active, payload, label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-card border border-border rounded-xl px-4 py-3 shadow-card min-w-[180px]">
      <p className="text-xs font-semibold text-text-secondary mb-2">{label}</p>
      {payload
        .filter(p => p.value > 0)
        .sort((a, b) => b.value - a.value)
        .map(p => (
          <div key={p.name} className="flex items-center justify-between gap-4 mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="text-xs text-text-secondary">{p.name.length > 14 ? p.name.slice(0, 13) + "…" : p.name}</span>
            </div>
            <span className="text-xs font-bold text-text-primary">{formatCurrency(p.value)}</span>
          </div>
        ))}
    </div>
  );
};

export default function CategoryTrend({ data, categories }: CategoryTrendProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#262637" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 10, color: "#94a3b8" }}
          formatter={v => v.length > 12 ? v.slice(0, 11) + "…" : v}
        />
        {categories.map(cat => (
          <Line
            key={cat}
            type="monotone"
            dataKey={cat}
            stroke={CATEGORY_COLORS[cat] || "#475569"}
            strokeWidth={2}
            dot={<Dot r={3} fill={CATEGORY_COLORS[cat] || "#475569"} />}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
