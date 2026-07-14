import Link from "next/link";
import Image from "next/image";
import { Item } from "@/types";
import { MapPin, ArrowUpRight } from "lucide-react";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  // Signature status pulse dot configuration based on inventory status
  const getStatusPulse = (status: Item["status"]) => {
    switch (status) {
      case "In Stock":
        return {
          pingBg: "bg-moss",
          dotBg: "bg-moss",
          glowShadow: "shadow-[0_0_8px_var(--color-moss)]",
          textColor: "text-emerald-700 dark:text-moss",
        };
      case "Low Stock":
        return {
          pingBg: "bg-amber-500",
          dotBg: "bg-amber-500",
          glowShadow: "shadow-[0_0_8px_rgba(245,158,11,0.6)]",
          textColor: "text-amber-700 dark:text-amber-400",
        };
      case "Out of Stock":
      default:
        return {
          pingBg: "bg-red-500",
          dotBg: "bg-red-500",
          glowShadow: "shadow-[0_0_8px_rgba(239,68,68,0.6)]",
          textColor: "text-red-700 dark:text-red-400",
        };
    }
  };

  const statusConfig = getStatusPulse(item.status);

  return (
    <div className="group relative flex flex-col justify-between h-full rounded-[12px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 hover:border-moss/50 dark:hover:border-moss/50 transition-all duration-200 shadow-sm hover:shadow-md overflow-hidden">
      {/* Top Section: Image & Basic Info */}
      <div>
        {/* Aspect-ratio locked image container */}
        <div className="relative aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-800/60 overflow-hidden rounded-t-[12px]">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs font-mono">
              NO IMAGE
            </div>
          )}

          {/* Category Tag overlay */}
          <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-white border border-white/10">
            {item.category}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          {/* Title & Status Motif Row */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading font-semibold text-base text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-moss transition-colors">
              {item.name}
            </h3>

            {/* Recurring Signature Status Motif */}
            <div className="flex items-center gap-1.5 shrink-0 pt-1">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusConfig.pingBg}`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${statusConfig.dotBg} ${statusConfig.glowShadow}`}
                />
              </span>
              <span className={`text-xs font-medium ${statusConfig.textColor}`}>
                {item.status}
              </span>
            </div>
          </div>

          {/* Location in regular body text */}
          <div className="flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="truncate">{item.location || "Central Barn"}</span>
          </div>

          {/* Meta Row: SKU & Price in JetBrains Mono font-mono */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/60 font-mono text-xs">
            <div className="text-zinc-500 dark:text-zinc-400">
              SKU:{" "}
              <span className="text-zinc-900 dark:text-zinc-200 font-semibold">
                {item.sku}
              </span>
            </div>
            <div className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
              $
              {item.unitPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Action Link */}
      <div className="p-4 pt-0">
        <Link
          href={`/items/${item._id}`}
          className="w-full py-2 px-3 rounded-default border border-zinc-200 dark:border-zinc-700 hover:border-moss bg-zinc-50 dark:bg-zinc-800/50 hover:bg-moss hover:text-zinc-950 font-medium text-xs flex items-center justify-center gap-1.5 transition-all text-zinc-800 dark:text-zinc-200"
        >
          View Details
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
