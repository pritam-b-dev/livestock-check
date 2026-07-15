import { SkeletonCard } from "../../components/items/SkeletonCard";

export default function ItemsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-3 animate-pulse">
        <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        <div className="h-4 w-72 bg-zinc-100 dark:bg-zinc-800/60 rounded-lg" />
      </div>

      {/* Search & Filter Bar Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 animate-pulse">
        <div className="h-10 w-full sm:w-80 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <div className="h-10 w-28 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
          <div className="h-10 w-28 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
        </div>
      </div>

      {/* Existing SkeletonCard Components Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
