export function SkeletonCard() {
  return (
    <div className="flex flex-col justify-between h-full rounded-[12px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-0 overflow-hidden shadow-sm animate-pulse">
      <div>
        {/* Skeleton Image Area matching aspect-[16/10] */}
        <div className="aspect-[16/10] w-full bg-zinc-200 dark:bg-zinc-800 rounded-t-[12px]" />

        {/* Skeleton Content Body */}
        <div className="p-4 space-y-3">
          {/* Title & Status */}
          <div className="flex justify-between items-center gap-2">
            <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3" />
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full w-16" />
          </div>

          {/* Location */}
          <div className="h-3.5 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />

          {/* Meta Row */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex justify-between items-center">
            <div className="h-3.5 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
          </div>
        </div>
      </div>

      {/* Skeleton Action Button */}
      <div className="p-4 pt-0">
        <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-default w-full" />
      </div>
    </div>
  );
}
