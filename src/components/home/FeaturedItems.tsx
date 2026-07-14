import Link from "next/link";
import { getItems } from "@/lib/api/items";
import { ItemCard } from "@/components/items/ItemCard";
import { ArrowRight, Sparkles } from "lucide-react";

export async function FeaturedItems() {
  const data = await getItems();

  const rawItems = Array.isArray(data) ? data : data?.items || [];
  const items = rawItems.slice(0, 4);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-zinc-50/50 dark:bg-zinc-900/30 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-moss/10 text-moss text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Inventory Preview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900 dark:text-zinc-100">
              Trending Items
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Explore recently added livestock, feed, and farm supplies across
              our platform.
            </p>
          </div>

          <Link
            href="/items"
            className="inline-flex items-center gap-2 text-sm font-semibold text-moss hover:text-moss/80 transition-colors group shrink-0"
          >
            <span>View All Items</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Item Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item: any) => (
            <ItemCard key={item._id || item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
