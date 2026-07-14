import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { getItem } from "@/lib/api/items";
import { ItemForm } from "@/components/items/ItemForm";

interface EditItemPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: "Edit Item | Livestock Check",
  description: "Update inventory item details in Livestock Check",
};

export default async function EditItemPage({ params }: EditItemPageProps) {
  const { id } = await params;

  const session = await getUserSession();
  if (!session?.user) {
    redirect(`/signin?redirect=/items/manage/${id}/edit`);
  }

  const item = await getItem(id);

  if (!item) {
    redirect("/items/manage");
  }

  const itemOwnerId =
    (item as any).userId ||
    (item as any).ownerId ||
    (typeof (item as any).createdBy === "object"
      ? (item as any).createdBy?._id || (item as any).createdBy?.id
      : (item as any).createdBy);

  const currentUserId = session.user.id;

  const isOwner = Boolean(
    itemOwnerId && String(itemOwnerId) === String(currentUserId),
  );

  if (!isOwner) {
    redirect("/unauthorized");
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900 dark:text-zinc-100">
          Edit Item
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Update the inventory item details for{" "}
          <span className="font-semibold text-zinc-900 dark:text-zinc-200">
            &quot;{item.name}&quot;
          </span>
          .
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <ItemForm initialData={item} mode="edit" />
      </div>
    </div>
  );
}
