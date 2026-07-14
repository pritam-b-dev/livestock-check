"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Search, RotateCcw } from "lucide-react";

const CATEGORIES = ["Livestock", "Feed", "Equipment", "Supplies", "Medicine"];
const STATUSES = ["In Stock", "Low Stock", "Out of Stock"];

export function ItemsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentStatus = searchParams.get("status") || "";
  const currentSort = searchParams.get("sort") || "";

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    startTransition(() => {
      router.push(`/items?${params.toString()}`);
    });
  };

  const resetFilters = () => {
    startTransition(() => {
      router.push("/items");
    });
  };

  return (
    <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm mb-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            defaultValue={currentSearch}
            onChange={(e) => updateFilters("search", e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <select
            value={currentCategory}
            onChange={(e) => updateFilters("category", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss/50 text-zinc-900 dark:text-zinc-100 cursor-pointer"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div>
          <select
            value={currentStatus}
            onChange={(e) => updateFilters("status", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss/50 text-zinc-900 dark:text-zinc-100 cursor-pointer"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div>
          <select
            value={currentSort}
            onChange={(e) => updateFilters("sort", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss/50 text-zinc-900 dark:text-zinc-100 cursor-pointer"
          >
            <option value="">Sort By: Default</option>
            <option value="price_asc">Price (Low-High)</option>
            <option value="price_desc">Price (High-Low)</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Reset & Loading Indicator */}
      {(currentSearch ||
        currentCategory ||
        currentStatus ||
        currentSort ||
        isPending) && (
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/60 text-xs">
          <span className="text-zinc-500">
            {isPending ? "Filtering results..." : "Filters active"}
          </span>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-moss dark:hover:text-moss transition-colors font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
