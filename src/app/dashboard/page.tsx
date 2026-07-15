import Link from "next/link";
import { getUserSession } from "@/lib/core/session";
import { getMySubscription } from "@/lib/actions/subscription";
import { getItems, getMyItems } from "@/lib/api/items";
import {
  PlusCircle,
  Boxes,
  Crown,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await getUserSession();
  const user = session?.user;

  const subscription = await getMySubscription();
  const myItems = await getMyItems();

  const itemLimit = subscription?.itemLimit || 20;
  const currentItemCount = subscription?.currentUsage ?? myItems.length;
  const planName = subscription?.planName || "Livestock-Check-Free";
  const usagePercentage = Math.min(
    Math.round((currentItemCount / itemLimit) * 100),
    100,
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900 dark:text-zinc-100">
            Welcome back, {user?.name || "Farmer"}!
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Here is an overview of your inventory activity and account status.
          </p>
        </div>

        {/* Quick Action: Add Item */}
        <Link
          href="/items/add"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-moss hover:bg-moss/90 text-white font-semibold text-sm transition-all shadow-md shadow-moss/15 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Item</span>
        </Link>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Active Subscription Plan */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Current Plan
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Crown className="w-5 h-5 stroke-[1.75]" />
            </div>
          </div>

          <div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {planName}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {subscription?.status === "active"
                ? "Active subscription"
                : "Free Tier Plan"}
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-moss hover:underline"
            >
              <span>Upgrade Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 2: Items Tracked */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Total Items
            </span>
            <div className="p-2 rounded-xl bg-moss/10 text-moss">
              <Boxes className="w-5 h-5 stroke-[1.75]" />
            </div>
          </div>

          <div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {currentItemCount}{" "}
              <span className="text-sm font-normal text-zinc-500">
                / {itemLimit === Infinity ? "∞" : itemLimit}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Items currently recorded in inventory
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/items/manage"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-moss hover:underline"
            >
              <span>Manage Items</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 3: Storage Usage Progress */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Plan Limit Usage
            </span>
            <span className="text-xs font-bold font-mono text-moss">
              {usagePercentage}%
            </span>
          </div>

          <div className="space-y-2">
            <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-moss rounded-full transition-all duration-300"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {itemLimit - currentItemCount > 0
                ? `${itemLimit - currentItemCount} items left on your current plan limit`
                : "Limit reached. Upgrade for more capacity."}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Access Navigation */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <h2 className="text-lg font-bold font-heading text-zinc-900 dark:text-zinc-100">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/items/add"
            className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-moss/40 bg-zinc-50/50 dark:bg-zinc-800/30 flex items-center justify-between transition-all group"
          >
            <div className="space-y-1">
              <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-moss transition-colors">
                Add New Inventory Item
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Record livestock, feeds, or equipment
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-moss transition-colors" />
          </Link>

          <Link
            href="/items/manage"
            className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-moss/40 bg-zinc-50/50 dark:bg-zinc-800/30 flex items-center justify-between transition-all group"
          >
            <div className="space-y-1">
              <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-moss transition-colors">
                Manage Stock & Items
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Edit, update quantity, or delete items
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-moss transition-colors" />
          </Link>

          <Link
            href="/items"
            className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-moss/40 bg-zinc-50/50 dark:bg-zinc-800/30 flex items-center justify-between transition-all group"
          >
            <div className="space-y-1">
              <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-moss transition-colors">
                Public Inventory Directory
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Browse and share public listings
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-moss transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
