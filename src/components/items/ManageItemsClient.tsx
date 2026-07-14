"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Item } from "@/types";

import {
  Eye,
  Trash2,
  Edit3,
  ImageOff,
  Plus,
  Package,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { deleteItem } from "../../lib/actions/items";

interface ManageItemsClientProps {
  initialItems: Item[];
}

export function ManageItemsClient({ initialItems }: ManageItemsClientProps) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleOpenDeleteModal = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (deleting) return;
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    const previousItems = [...items];
    const targetId = selectedItem._id;

    // Optimistic Update: UI থেকে আইটেম রিমুভ
    setItems((prev) => prev.filter((item) => item._id !== targetId));
    setDeleting(true);

    try {
      await deleteItem(targetId);
      toast.success("Item deleted successfully!");
      handleCloseModal();
    } catch (error: any) {
      setItems(previousItems);
      toast.error(
        error?.message || "Failed to delete item. Reverting changes.",
      );
    } finally {
      setDeleting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl text-center space-y-4 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
          <Package className="w-8 h-8 stroke-[1.5]" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            No items found
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm">
            You haven&apos;t added any inventory items yet. Start by creating
            your first entry.
          </p>
        </div>
        <Link
          href="/items/add"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-moss text-white hover:bg-moss/90 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Item
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Item</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Quantity</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
              {items.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                >
                  {/* Thumbnail & Name */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                            unoptimized={item.imageUrl.includes(
                              "picsum.photos",
                            )}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-400">
                            <ImageOff className="w-5 h-5 stroke-[1.5]" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/items/${item._id}`}
                          className="font-medium text-zinc-900 dark:text-zinc-100 hover:text-moss dark:hover:text-moss truncate block max-w-50 sm:max-w-xs"
                        >
                          {item.name}
                        </Link>
                        <span className="text-xs font-mono text-zinc-400 block">
                          SKU: {item.sku}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400 font-medium">
                    {item.category}
                  </td>

                  {/* Quantity */}
                  <td className="py-3 px-4 font-mono text-zinc-800 dark:text-zinc-200">
                    {item.quantity}
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 font-mono font-medium text-zinc-900 dark:text-zinc-100">
                    $
                    {item.unitPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        item.status === "In Stock"
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                          : item.status === "Low Stock"
                            ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/items/${item._id}`}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/items/${item._id}/edit`}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-moss hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                        title="Edit Item"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleOpenDeleteModal(item)}
                        className="p-1.5 rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
                        title="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden p-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Confirm Deletion
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  This action is permanent and cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Are you sure you want to delete{" "}
              <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">
                &quot;{selectedItem.name}&quot;
              </strong>
              ?
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={deleting}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-sm disabled:opacity-50"
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Delete Item
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
