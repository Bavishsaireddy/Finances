"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Cell, ResponsiveContainer,
} from "recharts";
import { MerchantRow } from "@/lib/analytics";
import { formatCurrency } from "@/lib/utils";

interface TopMerchantsBarProps {
  data: MerchantRow[];
}

const CustomTooltip = ({
  active, payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: MerchantRow; value: number }>;
}) => {
  if (!active || !payload?.[0]) return null;
  const m = payload[0].payload;
  return (
    <div className="bg-bg-card border border-border rounded-xl px-4 py-3 shadow-card">
      <p className="text-sm font-semibold text-text-primary">{m.name}</p>
      <p className="text-xs text-text-muted mt-0.5">{m.category} · {m.count} transaction{m.count !== 1 ? "s" : ""}</p>
      <p className="text-lg font-bold text-text-primary mt-1">{formatCurrency(m.amount)}</p>
    </div>
  );
};

export default function TopMerchantsBar({ data }: TopMerchantsBarProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 60, left: 10, bottom: 0 }}
        barSize={18}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#262637" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: "#475569", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `$${v}`}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={90}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <Bar dataKey="amount" radius={[0, 6, 6, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
