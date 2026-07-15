export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getItems } from "@/lib/api/items";
import { ItemCard } from "@/components/items/ItemCard";
import { ItemsFilter } from "@/components/items/ItemsFilter";
import { Pagination } from "@/components/items/Pagination";
import { PackageX } from "lucide-react";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    status?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ItemsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const limit = 12;

  const query = new URLSearchParams();
  if (resolvedParams.search) query.set("search", resolvedParams.search);
  if (resolvedParams.category) query.set("category", resolvedParams.category);
  if (resolvedParams.status) query.set("status", resolvedParams.status);
  if (resolvedParams.sort) query.set("sort", resolvedParams.sort);
  query.set("page", page.toString());
  query.set("perPage", limit.toString());

  // Safe destructuring & fallback assignment
  const { items = [], total = 0 } = (await getItems(query.toString())) || {};

  const safeTotal = total || items.length;
  const totalPages = Math.max(1, Math.ceil(safeTotal / limit));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Section */}
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold font-heading text-zinc-900 dark:text-zinc-50">
          Inventory Catalog
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Explore and search available livestock, equipment, and farm supplies.
        </p>
      </div>

      {/* Interactive Filters Component */}
      <ItemsFilter />

      {/* Items Grid */}
      {items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination currentPage={page} totalPages={totalPages} />
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <PackageX className="w-12 h-12 mx-auto text-zinc-400 mb-3 stroke-[1.5]" />
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-heading">
            No items found
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
            We couldn't find anything matching your filters or search criteria.
            Try adjusting your selections.
          </p>
        </div>
      )}
    </div>
  );
}
