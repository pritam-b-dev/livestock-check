"use server";

import { cookies } from "next/headers";

export async function storeSessionToken(token: string) {
  (await cookies()).set("session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSessionToken() {
  (await cookies()).delete("session_token");
}
