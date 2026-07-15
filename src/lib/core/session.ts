import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { cache } from "react";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "https://livestock-check-server.vercel.app";

const JWKS = createRemoteJWKSet(new URL(`${SERVER_URL}/api/auth/jwks`));

interface SessionUser {
  id: string;
  email: string;
  name: string;
  role?: string;
  plan?: string;
}

const verifySession = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get("session_token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWKS);
    return payload as unknown as SessionUser;
  } catch {
    return null;
  }
});

export async function getUserSession() {
  const user = await verifySession();
  return user ? { user } : null;
}

export async function getUserToken(): Promise<string | null> {
  const token = (await cookies()).get("session_token")?.value;
  return token ?? null;
}

export async function requireRole(allowedRoles: string | string[]) {
  const session = await getUserSession();

  if (!session?.user) {
    redirect("/signin");
  }

  const userRole = session.user.role;
  const rolesArray = Array.isArray(allowedRoles)
    ? allowedRoles
    : [allowedRoles];

  if (!userRole || !rolesArray.includes(userRole)) {
    redirect("/unauthorized");
  }

  return session;
}
