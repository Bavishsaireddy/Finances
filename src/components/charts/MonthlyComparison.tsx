"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, LabelList,
} from "recharts";
import { ComparisonRow } from "@/lib/analytics";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MonthlyComparisonProps {
  data: ComparisonRow[];
  currentLabel?: string;
  previousLabel?: string;
}

const CustomTooltip = ({
  active, payload, label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  const cur = payload.find(p => p.name === "current");
  const prev = payload.find(p => p.name === "previous");
  const change = prev && prev.value > 0 ? ((( cur?.value || 0) - prev.value) / prev.value) * 100 : 0;

  return (
    <div className="bg-bg-card border border-border rounded-xl px-4 py-3 shadow-card min-w-[180px]">
      <p className="text-xs font-semibold text-text-primary mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-xs text-text-secondary capitalize">{p.name === "current" ? "This month" : "Last month"}</span>
          </div>
          <span className="text-xs font-bold text-text-primary">{formatCurrency(p.value)}</span>
        </div>
      ))}
      {prev && prev.value > 0 && (
        <div className={`flex items-center gap-1 mt-2 pt-2 border-t border-border text-xs font-medium ${change > 0 ? "text-danger-DEFAULT" : "text-success-DEFAULT"}`}>
          {change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change > 0 ? "+" : ""}{change.toFixed(1)}% vs last month
        </div>
      )}
    </div>
  );
};

export default function MonthlyComparison({
  data,
  currentLabel = "This Month",
  previousLabel = "Last Month",
}: MonthlyComparisonProps) {
  const chartData = data.map(d => ({
    ...d,
    name: d.icon + " " + (d.category.length > 10 ? d.category.slice(0, 9) + "…" : d.category),
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 40 }} barSize={12} barGap={2}>
        <CartesianGrid strokeDasharray="3 3" stroke="#262637" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: "#475569", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          interval={0}
          angle={-35}
          textAnchor="end"
          height={55}
        />
        <YAxis
          tick={{ fill: "#475569", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `$${v}`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <Legend
          wrapperStyle={{ fontSize: 11, color: "#94a3b8", paddingTop: 8 }}
          formatter={(v) => v === "current" ? currentLabel : previousLabel}
        />
        <Bar dataKey="previous" name="previous" fill="#334155" radius={[4, 4, 0, 0]} />
        <Bar dataKey="current" name="current" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, i) => (
            <Cell key={i} fill={entry.color} fillOpacity={0.9} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
