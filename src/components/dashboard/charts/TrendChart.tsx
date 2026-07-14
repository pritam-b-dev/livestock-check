"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

interface TrendData {
  date: string;
  count: number;
}

interface TrendChartProps {
  data?: TrendData[];
}

export function TrendChart({ data = [] }: TrendChartProps) {
  const hasData =
    data && data.length > 0 && data.some((item) => item.count > 0);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col h-[380px]">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold font-heading text-zinc-900 dark:text-zinc-100">
            Registration Trend
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Items added over time
          </p>
        </div>
      </div>

      {!hasData ? (
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/20 text-center p-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            No registration history found over time.
          </p>
        </div>
      ) : (
        <div className="flex-1 w-full min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="trendColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#27272a"
                opacity={0.15}
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#a1a1aa" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#a1a1aa" }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  borderColor: "#27272a",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
                formatter={(value: any) => [`${value ?? 0} items`, "Added"]}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#16a34a"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#trendColor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
