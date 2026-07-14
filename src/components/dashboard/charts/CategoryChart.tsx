"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { PieChart as PieIcon } from "lucide-react";

interface CategoryData {
  name: string;
  count: number;
}

interface CategoryChartProps {
  data?: CategoryData[];
}

const COLORS = [
  "#16a34a", // Moss/Green
  "#f59e0b", // Amber
  "#3b82f6", // Blue
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#14b8a6", // Teal
];

export function CategoryChart({ data = [] }: CategoryChartProps) {
  const hasData =
    data && data.length > 0 && data.some((item) => item.count > 0);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col h-[380px]">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-moss/10 text-moss">
          <PieIcon className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold font-heading text-zinc-900 dark:text-zinc-100">
            Items by Category
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Distribution across livestock categories
          </p>
        </div>
      </div>

      {!hasData ? (
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/20 text-center p-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            No category distribution data available yet.
          </p>
        </div>
      ) : (
        <div className="flex-1 w-full min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  borderColor: "#27272a",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
                formatter={(value: any) => [`${value ?? 0} items`, "Count"]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                    {value}
                  </span>
                )}
              />
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="count"
                nameKey="name"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="stroke-white dark:stroke-zinc-900 stroke-2"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
