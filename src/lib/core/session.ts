import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Server-side session retrieval
 */
export async function getUserSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

/**
 * Extract JWT Token from headers / session runtime
 */
export async function getUserToken(): Promise<string | null> {
  const reqHeaders = await headers();

  // Checking direct authorization header or set-auth-jwt header
  const authHeader =
    reqHeaders.get("authorization") || reqHeaders.get("set-auth-jwt");
  if (authHeader) {
    return authHeader.replace(/^Bearer\s+/i, "");
  }

  // Fallback to active session check
  const session = await getUserSession();
  if (session && "token" in session && typeof session.token === "string") {
    return session.token;
  }

  return null;
}

/**
 * Role-based protection guard for Server Components & Actions
 */
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
