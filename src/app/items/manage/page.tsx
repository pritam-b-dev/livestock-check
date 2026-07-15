import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { getMyItems, getAllItemsAdmin } from "@/lib/api/items";
import { ManageItemsClient } from "../../../components/items/ManageItemsClient";

export const metadata = {
  title: "Manage Items | Livestock Check",
  description: "Manage and track your inventory items",
};

export default async function ManageItemsPage() {
  const session = await getUserSession();

  if (!session?.user) {
    redirect("/signin?redirect=/items/manage");
  }

  const isAdmin = session.user.role === "admin";
  const initialItems = isAdmin ? await getAllItemsAdmin() : await getMyItems();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900 dark:text-zinc-100">
          {isAdmin ? "Manage All Inventory (Admin)" : "Manage Inventory"}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          {isAdmin
            ? "Viewing items from every user on the platform. You can edit or remove any listing."
            : "View, edit, or remove the items you have listed in your inventory."}
        </p>
      </div>

      <ManageItemsClient initialItems={initialItems || []} isAdmin={isAdmin} />
    </div>
  );
}
