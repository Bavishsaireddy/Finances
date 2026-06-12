"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { ChannelSlice } from "@/lib/analytics";
import { formatCurrency } from "@/lib/utils";

interface PaymentChannelPieProps {
  data: ChannelSlice[];
}

const CustomTooltip = ({
  active, payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ChannelSlice; value: number }>;
}) => {
  if (!active || !payload?.[0]) return null;
  const s = payload[0].payload;
  const total = 0; // computed below
  return (
    <div className="bg-bg-card border border-border rounded-xl px-4 py-3 shadow-card">
      <p className="text-sm font-semibold text-text-primary">{s.name}</p>
      <p className="text-lg font-bold text-text-primary mt-1">{formatCurrency(s.value)}</p>
    </div>
  );
};

export default function PaymentChannelPie({ data }: PaymentChannelPieProps) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-36 h-36 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={42}
              outerRadius={64}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((s, i) => <Cell key={i} fill={s.color} />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-[10px] text-text-muted">Total</p>
          <p className="text-sm font-bold text-text-primary">${(total / 1000).toFixed(1)}k</p>
        </div>
      </div>

      <div className="flex-1 space-y-3">
        {data.map(s => (
          <div key={s.name}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-xs text-text-secondary">{s.name}</span>
              </div>
              <span className="text-xs font-semibold text-text-primary">{formatCurrency(s.value)}</span>
            </div>
            <div className="h-1.5 rounded-full bg-bg-elevated overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${(s.value / total) * 100}%`, backgroundColor: s.color }}
              />
            </div>
            <p className="text-[10px] text-text-muted mt-0.5 text-right">
              {((s.value / total) * 100).toFixed(0)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
