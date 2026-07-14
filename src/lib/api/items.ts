import { Item } from "@/types";
import { serverFetch, protectedFetch } from "@/lib/core/server";

/**
 * Public: Fetch paginated / filtered items list
 */
export async function getItems(
  queryString: string = "",
): Promise<{ items: Item[]; total: number }> {
  const query = queryString ? `?${queryString.replace(/^\?/, "")}` : "";
  const response = await serverFetch<{ items: Item[]; total: number }>(
    `/api/items${query}`,
  );

  if (response.error || !response.data) {
    return { items: [], total: 0 };
  }

  return response.data;
}

/**
 * Public: Fetch a single item by ID
 */
export async function getItem(id: string): Promise<Item | null> {
  const response = await serverFetch<Item>(`/api/items/${id}`);

  if (response.error || !response.data) {
    return null;
  }

  return response.data;
}

/**
 * Protected: Fetch items owned by the logged-in user
 */
export async function getMyItems(): Promise<Item[]> {
  const response = await protectedFetch<Item[]>("/api/items/my-items");

  if (response.error || !response.data) {
    return [];
  }

  return response.data;
}
