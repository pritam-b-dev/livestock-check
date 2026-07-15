"use server";

import { getUserToken } from "@/lib/core/session";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function getMySubscription() {
  try {
    const token = await getUserToken();

    if (!token) {
      return null;
    }

    const res = await fetch(`${API_BASE_URL}/api/payment/subscription`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(await res.text());
      return null;
    }

    const json = await res.json();

    return json.data;
  } catch (error) {
    console.error("Failed to fetch subscription:", error);
    return null;
  }
}
