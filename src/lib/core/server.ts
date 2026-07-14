"use server";

import { headers } from "next/headers";
import { getUserToken } from "./session";

const BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "https://livestock-check-server.vercel.app";

/**
 * Constructs standard authentication headers for backend requests
 */
export async function authHeader(): Promise<Record<string, string>> {
  const token = await getUserToken();
  const reqHeaders = await headers();
  const cookie = reqHeaders.get("cookie") || "";

  const headerObj: Record<string, string> = {
    "Content-Type": "application/json",
    ...(cookie ? { cookie } : {}),
  };

  if (token) {
    headerObj["Authorization"] = `Bearer ${token}`;
  }

  return headerObj;
}

/**
 * Generic Base Server Fetch wrapper
 */
export async function serverFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<{ data: T | null; error: string | null; status: number }> {
  try {
    const url = path.startsWith("http")
      ? path
      : `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const status = response.status;

    if (!response.ok) {
      const errBody = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      return {
        data: null,
        error:
          errBody.message || errBody.error || "An unexpected error occurred",
        status,
      };
    }

    const data: T = await response.json();
    return { data, error: null, status };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Network failure";
    return { data: null, error: errorMessage, status: 500 };
  }
}

/**
 * Protected Server Fetch — attaches Bearer token automatically
 */
export async function protectedFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<{ data: T | null; error: string | null; status: number }> {
  const authHeaders = await authHeader();

  return serverFetch<T>(path, {
    ...options,
    headers: {
      ...authHeaders,
      ...options.headers,
    },
  });
}

/**
 * Generic Server Mutation (POST, PUT, PATCH, DELETE)
 */
export async function serverMutation<T>(
  path: string,
  payload?: unknown,
  method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
): Promise<{ data: T | null; error: string | null; status: number }> {
  return protectedFetch<T>(path, {
    method,
    body: payload ? JSON.stringify(payload) : undefined,
  });
}
