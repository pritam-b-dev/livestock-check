import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { ItemForm } from "../../../components/items/ItemForm";

export const metadata = {
  title: "Add New Item | Livestock Check",
  description: "Create and add a new inventory item to Livestock Check",
};

export default async function AddItemPage() {
  const session = await getUserSession();

  if (!session?.user) {
    redirect("/signin?redirect=/items/add");
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900 dark:text-zinc-100">
          Add New Item
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Fill in the details below to register a new livestock or inventory
          item.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <ItemForm mode="create" />
      </div>
    </div>
  );
}
