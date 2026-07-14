"use server";

import { serverMutation } from "../core/server";

export async function createCheckoutSession(planId: string) {
  try {
    const response = await serverMutation<{ url: string }>(
      "/api/payment/create-checkout-session",
      { planId },
    );

    return response;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to initiate payment checkout session.",
    );
  }
}
