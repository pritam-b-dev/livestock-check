import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "https://livestock-check-server.vercel.app";

const fetchSession = cache(async () => {
  const cookieHeader = (await headers()).get("cookie") || "";

  const res = await fetch(`${SERVER_URL}/api/auth/get-session`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) {
    return { session: null, token: null };
  }

  const session = await res.json().catch(() => null);
  const token = res.headers.get("set-auth-jwt");

  return { session, token };
});

export async function getUserSession() {
  const { session } = await fetchSession();
  return session;
}

export async function getUserToken(): Promise<string | null> {
  const { token } = await fetchSession();
  return token;
}

export async function requireRole(allowedRoles: string | string[]) {
  const session = await getUserSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  const userRole = (session.user as { role?: string }).role;
  const rolesArray = Array.isArray(allowedRoles)
    ? allowedRoles
    : [allowedRoles];

  if (!userRole || !rolesArray.includes(userRole)) {
    redirect("/unauthorized");
  }

  return session;
}
