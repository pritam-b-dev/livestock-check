export default function AdminDashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-56 bg-zinc-200 dark:bg-zinc-800 rounded-[12px]" />
        <div className="h-4 w-80 bg-zinc-100 dark:bg-zinc-800/60 rounded-md" />
      </div>

      {/* Admin StatCards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-[12px] bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="w-10 h-10 rounded-[12px] bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="space-y-2">
              <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-3 w-32 bg-zinc-100 dark:bg-zinc-800/60 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Recharts Skeleton Section (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Chart Skeleton */}
        <div className="h-[380px] rounded-[12px] bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-2">
            <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-56 bg-zinc-100 dark:bg-zinc-800/60 rounded" />
          </div>
          <div className="w-44 h-44 rounded-full border-[12px] border-zinc-200 dark:border-zinc-800 mx-auto my-auto" />
          <div className="h-4 w-48 bg-zinc-100 dark:bg-zinc-800 rounded mx-auto" />
        </div>

        {/* Trend Chart Skeleton */}
        <div className="h-[380px] rounded-[12px] bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-2">
            <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-56 bg-zinc-100 dark:bg-zinc-800/60 rounded" />
          </div>
          <div className="w-full h-48 bg-zinc-100 dark:bg-zinc-800/40 rounded-[12px] my-auto" />
          <div className="h-4 w-48 bg-zinc-100 dark:bg-zinc-800 rounded" />
        </div>
      </div>
    </div>
  );
}
