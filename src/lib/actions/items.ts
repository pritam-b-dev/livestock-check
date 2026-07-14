"use server";

import { Item } from "@/types";
import { serverMutation } from "@/lib/core/server";
import { revalidatePath } from "next/cache";

/**
 * Server Action: Create a new item
 */
export async function createItem(data: Partial<Item>) {
  const response = await serverMutation<Item>("/api/items", data, "POST");

  if (!response.error) {
    revalidatePath("/items");
    revalidatePath("/manage");
  }

  return response;
}

/**
 * Server Action: Update an existing item
 */
export async function updateItem(id: string, data: Partial<Item>) {
  const response = await serverMutation<Item>(`/api/items/${id}`, data, "PUT");

  if (!response.error) {
    revalidatePath("/items");
    revalidatePath("/manage");
  }

  return response;
}

/**
 * Server Action: Delete an item
 */
export async function deleteItem(id: string) {
  const response = await serverMutation<{ message: string }>(
    `/api/items/${id}`,
    undefined,
    "DELETE",
  );

  if (!response.error) {
    revalidatePath("/items");
    revalidatePath("/manage");
  }

  return response;
}
