import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getItem, getItems } from "@/lib/api/items";
import { getUserSession } from "@/lib/core/session";
import { ItemCard } from "@/components/items/ItemCard";
import {
  MapPin,
  Package,
  Layers,
  Edit3,
  Trash2,
  ArrowLeft,
  Calendar,
  ImageOff,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) {
    return {
      title: "Item Not Found | Livestock Check",
    };
  }

  return {
    title: `${item.name} | Livestock Check`,
    description: `View details and stock info for ${item.name}`,
  };
}

export default async function ItemDetailsPage({ params }: PageProps) {
  const { id } = await params;

  // 1. Fetch main item directly as Item | null
  const item = await getItem(id);

  // Return 404 if item not found
  if (!item) {
    notFound();
  }

  // 2. Fetch User Session (to check owner authorization)
  const session = await getUserSession();
  const user = session?.user;

  // Check if current logged-in user is Owner
  const isOwner = user && user.id === item.ownerId;
  const canManage = isOwner;

  // 3. Fetch Related Items (same category, excluding current item)
  const query = new URLSearchParams({
    category: item.category,
    limit: "5",
  });

  const { items: rawRelatedItems } = await getItems(query.toString());
  const relatedItems = (rawRelatedItems || [])
    .filter((relItem) => relItem._id !== item._id)
    .slice(0, 4);

  // Status pulse badge styles
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "In Stock":
        return {
          badge:
            "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
          dot: "bg-emerald-500",
        };
      case "Low Stock":
        return {
          badge:
            "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
          dot: "bg-amber-500",
        };
      case "Out of Stock":
      default:
        return {
          badge:
            "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
          dot: "bg-rose-500",
        };
    }
  };

  const statusStyle = getStatusStyle(item.status);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Navigation & Owner Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <Link
          href="/items"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-moss dark:hover:text-moss transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>

        {/* Extra Edit/Delete Actions (Only visible for Owner) */}
        {canManage && (
          <div className="flex items-center gap-3">
            <Link
              href={`/items/${item._id}/edit`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-moss hover:text-moss transition-all shadow-sm"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Item
            </Link>

            <Link
              href={`/items/${item._id}/delete`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-all shadow-sm"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </Link>
          </div>
        )}
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Container */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 overflow-hidden shadow-sm">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                unoptimized={item.imageUrl.includes("picsum.photos")}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-2">
                <ImageOff className="w-10 h-10 stroke-[1.5]" />
                <span className="text-xs font-mono uppercase tracking-wider">
                  No Image Available
                </span>
              </div>
            )}

            {/* Floating Category Badge */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-medium text-white border border-white/10">
              {item.category}
            </div>
          </div>
        </div>

        {/* Right Column: Spec Sheet & Key Info */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header & Price */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusStyle.badge}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
                {item.status}
              </span>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                SKU: {item.sku}
              </span>
            </div>

            <h1 className="text-3xl font-bold font-heading text-zinc-900 dark:text-zinc-50">
              {item.name}
            </h1>

            <div className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 font-mono">
              $
              {item.unitPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>

          {/* Key Info / Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
            <div className="space-y-1">
              <span className="text-[11px] text-zinc-500 flex items-center gap-1 font-medium">
                <Package className="w-3.5 h-3.5" /> Quantity
              </span>
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-mono">
                {item.quantity ?? "N/A"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-zinc-500 flex items-center gap-1 font-medium">
                <Layers className="w-3.5 h-3.5" /> Category
              </span>
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                {item.category}
              </p>
            </div>

            <div className="space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-zinc-500 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5" /> Location
              </span>
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                {item.location || "Unspecified"}
              </p>
            </div>
          </div>

          {/* Additional Meta Details */}
          {item.createdAt && (
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono pt-2">
              <Calendar className="w-3.5 h-3.5" />
              Added on:{" "}
              {new Date(item.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}
        </div>
      </div>

      {/* Related Items Section */}
      {relatedItems.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-heading text-zinc-900 dark:text-zinc-100">
                Related Items in {item.category}
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Other available inventory matching this category
              </p>
            </div>
            <Link
              href={`/items?category=${encodeURIComponent(item.category)}`}
              className="text-xs font-semibold text-moss hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedItems.map((relItem) => (
              <ItemCard key={relItem._id} item={relItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
