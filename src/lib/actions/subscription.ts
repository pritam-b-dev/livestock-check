"use server";

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getMySubscription() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    const res = await fetch(`${API_BASE_URL}/api/payment/subscription`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    return json?.data || json || null;
  } catch (error) {
    console.error("Failed to fetch subscription details:", error);
    return null;
  }
}
