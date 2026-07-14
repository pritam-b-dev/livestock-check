import { SkeletonCard } from "@/components/items/SkeletonCard";

export default function ItemsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8 space-y-2">
        <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-48" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-80" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="h-20 bg-zinc-200 dark:bg-zinc-800/60 rounded-xl mb-8" />

      {/* 4-column Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
