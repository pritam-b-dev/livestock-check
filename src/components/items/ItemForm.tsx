"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createItem, updateItem } from "@/lib/api/items";
import { Item } from "@/types";
import { Loader2, Plus, Save } from "lucide-react";

interface ItemFormProps {
  initialData?: Item;
  mode?: "create" | "edit";
}

const CATEGORIES = [
  "Cattle",
  "Poultry",
  "Feed & Nutrition",
  "Equipment & Machinery",
  "Medicine & Healthcare",
  "General Supplies",
];

export function ItemForm({ initialData, mode = "create" }: ItemFormProps) {
  const router = Router();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    sku: initialData?.sku || "",
    category: initialData?.category || CATEGORIES[0],
    quantity: initialData?.quantity ?? 0,
    unitPrice: initialData?.unitPrice ?? 0,
    location: initialData?.location || "",
    imageUrl: initialData?.imageUrl || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "edit" && initialData?._id) {
        await updateItem(initialData._id, formData);
        toast.success("Item updated successfully!");
      } else {
        await createItem(formData);
        toast.success("Item created successfully!");
      }

      router.push("/items/manage");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Item Name */}
        <div className="space-y-2 md:col-span-2">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
          >
            Item Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Premium Dairy Feed 25kg"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-moss/50 focus:border-moss transition-all"
          />
        </div>

        {/* SKU */}
        <div className="space-y-2">
          <label
            htmlFor="sku"
            className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
          >
            SKU Code <span className="text-rose-500">*</span>
          </label>
          <input
            id="sku"
            name="sku"
            type="text"
            required
            value={formData.sku}
            onChange={handleChange}
            placeholder="e.g. FD-2024-001"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-moss/50 focus:border-moss transition-all font-mono"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
          >
            Category <span className="text-rose-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-moss/50 focus:border-moss transition-all"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <label
            htmlFor="quantity"
            className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
          >
            Quantity <span className="text-rose-500">*</span>
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            required
            value={formData.quantity}
            onChange={handleChange}
            placeholder="0"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-moss/50 focus:border-moss transition-all font-mono"
          />
        </div>

        {/* Unit Price */}
        <div className="space-y-2">
          <label
            htmlFor="unitPrice"
            className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
          >
            Unit Price ($) <span className="text-rose-500">*</span>
          </label>
          <input
            id="unitPrice"
            name="unitPrice"
            type="number"
            min="0"
            step="0.01"
            required
            value={formData.unitPrice}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-moss/50 focus:border-moss transition-all font-mono"
          />
        </div>

        {/* Location */}
        <div className="space-y-2 md:col-span-2">
          <label
            htmlFor="location"
            className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
          >
            Location / Warehouse
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Warehouse A, Shed 3"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-moss/50 focus:border-moss transition-all"
          />
        </div>

        {/* Image URL (Optional) */}
        <div className="space-y-2 md:col-span-2">
          <label
            htmlFor="imageUrl"
            className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
          >
            Image URL{" "}
            <span className="text-xs text-zinc-400 font-normal">
              (Optional)
            </span>
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-moss/50 focus:border-moss transition-all"
          />
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 text-sm font-medium rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl bg-moss text-white hover:bg-moss/90 disabled:opacity-50 transition-all shadow-sm"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : mode === "edit" ? (
            <Save className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {mode === "edit" ? "Save Changes" : "Create Item"}
        </button>
      </div>
    </form>
  );
}
