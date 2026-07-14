import { getAnalyticsSummary } from "@/lib/actions/analytics";
import {
  Boxes,
  Users,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const analytics = await getAnalyticsSummary();

  const totalItems = analytics?.totalItems ?? 0;
  const totalUsers = analytics?.totalUsers ?? 0;
  const totalValue = analytics?.totalValue ?? 0;
  const lowStockAlerts = analytics?.lowStockAlerts ?? 0;

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold font-heading text-zinc-900 dark:text-zinc-100">
          Analytics Overview
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Real-time system statistics and inventory health metrics.
        </p>
      </div>

      {/* StatCard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* StatCard 1: Total Items */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Total Items
            </span>
            <div className="p-2.5 rounded-xl bg-moss/10 text-moss">
              <Boxes className="w-5 h-5 stroke-[1.75]" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono text-zinc-900 dark:text-zinc-50">
              {totalItems.toLocaleString()}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Recorded across all farm accounts
            </p>
          </div>
        </div>

        {/* StatCard 2: Total Users */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Total Users
            </span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
              <Users className="w-5 h-5 stroke-[1.75]" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono text-zinc-900 dark:text-zinc-50">
              {totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Registered platform members
            </p>
          </div>
        </div>

        {/* StatCard 3: Total Value */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Total Inventory Value
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
              <DollarSign className="w-5 h-5 stroke-[1.75]" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono text-zinc-900 dark:text-zinc-50">
              $
              {totalValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Estimated total asset valuation
            </p>
          </div>
        </div>

        {/* StatCard 4: Low Stock Alerts */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Low Stock Alerts
            </span>
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500">
              <AlertTriangle className="w-5 h-5 stroke-[1.75]" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono text-rose-600 dark:text-rose-400">
              {lowStockAlerts.toLocaleString()}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Items requiring immediate restock
            </p>
          </div>
        </div>
      </div>

      {/* Admin Action Links */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="text-lg font-bold font-heading text-zinc-900 dark:text-zinc-100">
          Admin Quick Controls
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/items"
            className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-moss/40 bg-zinc-50/50 dark:bg-zinc-800/30 flex items-center justify-between transition-all group"
          >
            <div className="space-y-1">
              <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-moss transition-colors">
                System-Wide Items Directory
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                View and audit all items registered across farms
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-moss transition-colors" />
          </Link>

          <Link
            href="/items/manage"
            className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-moss/40 bg-zinc-50/50 dark:bg-zinc-800/30 flex items-center justify-between transition-all group"
          >
            <div className="space-y-1">
              <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-moss transition-colors">
                Inventory Management Portal
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Manage livestock stock levels and categories
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-moss transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
