"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { DayRow } from "@/lib/analytics";
import { formatCurrency } from "@/lib/utils";

interface DayOfWeekChartProps {
  data: DayRow[];
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: DayRow }> }) => {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-bg-card border border-border rounded-xl px-4 py-3 shadow-card">
      <p className="text-sm font-semibold text-text-primary">{d.day}</p>
      <p className="text-lg font-bold text-text-primary mt-1">{formatCurrency(d.amount)}</p>
      <p className="text-xs text-text-muted">{d.count} transaction{d.count !== 1 ? "s" : ""}</p>
    </div>
  );
};

export default function DayOfWeekChart({ data }: DayOfWeekChartProps) {
  const max = Math.max(...data.map(d => d.amount));

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }} barSize={32}>
        <CartesianGrid strokeDasharray="3 3" stroke="#262637" vertical={false} />
        <XAxis dataKey="short" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
          {data.map((d, i) => (
            <Cell
              key={i}
              fill={d.amount === max ? "#7c3aed" : "#1e1e2d"}
              fillOpacity={d.amount === max ? 1 : 0.9}
              stroke={d.amount === max ? "#a78bfa" : "transparent"}
              strokeWidth={1}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
